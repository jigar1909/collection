import axios from 'axios';
import { Octokit } from "@octokit/rest";
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_OWNER = 'jigar1909';
const GITHUB_REPO = 'collection';
const FILE_PATH = 'pulsewebflowResponse.ts';
const GLOBAL_COLLECTION_ID = '67288449c46837a60804f938';

const webflowCardType = {
    "e2b1708271f9fab690edf9972ba40c79": 'Plain Card',
    "5c476a199d1ccba7629b9c992c80af7c": 'Signup Card',
    "1c2e07edad93807346dd0b4b97cea662": 'Key Features',
    "0b331caea787bf6fc37c3346ce88f898": 'With Primary link only',
}

const cardTypeMapping = {
    "d63e518a9dd314cf7f7f2e116b3601fc": 'Personas',
    "badd89a958e3efb26be90c8a5ead8489": 'Testimonials',
    "e6a054d19d1e29292949ca06e19a29ae": 'Logo Only',
};


class WebflowApi {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://api.webflow.com/v2',
            headers: {
                Authorization: `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
            }
        });
    }

    async fetchMainCollectionItems() {
        try {
            const response = await this.api.get(`/collections/${GLOBAL_COLLECTION_ID}/items`);
            return response.data.items;
        } catch (error) {
            console.error("Error fetching main collection items:", error);
            throw error;
        }
    }

    async fetchReferencedItems(collectionId, itemIds) {
        try {
            const items = await Promise.all(itemIds.map(async (itemId) => {
                const response = await this.api.get(`/collections/${collectionId}/items/${itemId}`);
                return response.data;
            }));
            return items;
        } catch (error) {
            console.error("Error fetching referenced items:", error);
            throw error;
        }
    }

}

class GitHubApi {
    constructor() {
        this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    }

    async updateFile(content) {
        try {
            const fileContent = `export const webflowResponse = ${JSON.stringify(content, null, 2)};`;
            const contentEncoded = Buffer.from(fileContent).toString('base64');

            const { data: currentFile } = await this.octokit.repos.getContent({
                owner: GITHUB_OWNER,
                repo: GITHUB_REPO,
                path: FILE_PATH,
            }).catch(() => ({ data: null }));

            await this.octokit.repos.createOrUpdateFileContents({
                owner: GITHUB_OWNER,
                repo: GITHUB_REPO,
                path: FILE_PATH,
                message: 'Update Webflow data',
                content: contentEncoded,
                sha: currentFile ? currentFile.sha : undefined,
            });

            console.log('GitHub file updated successfully');
        } catch (error) {
            console.error('Error updating GitHub file:', error);
        }
    }
}

async function referenceCollectionItems(items, webflowApi) {
    for (let item of items) {
        const { fieldData } = item;
        console.log("fieldData",fieldData);
        if (fieldData['pulse-onboarding-product-pages']) {
            const productPages = await webflowApi.fetchReferencedItems('6756ccc87b6c382cf8677f0f', fieldData['pulse-onboarding-product-pages']);

            for (let productPage of productPages) {
                const productFieldData = productPage.fieldData;

                if (productFieldData['linked-card-2']) {
                    const linkedCards = productFieldData['linked-card-2'] = await webflowApi.fetchReferencedItems(
                        '6756998a632351aaddc2bb52',
                        productFieldData['linked-card-2']
                    );
                    for (let card of linkedCards) {
                        if (card.fieldData['card-type-internal-identifier']) {
                            try {
                                const cardTypeId = card.fieldData['card-type-internal-identifier'];
                                card.fieldData['card-type'] = webflowCardType[cardTypeId] || cardTypeId;
                            } catch (err) {
                                console.log("Error fetching card type data:", err);
                            }
                        }
                    }
                    productFieldData['linked-card-2'] = linkedCards;
                }

                // if (productFieldData['linked-client']) {
                //     productFieldData['linked-client'] = await webflowApi.fetchReferencedItems(
                //         '6728863a968984332438637a',
                //         productFieldData['linked-client']
                //     );
                // }
                if (productFieldData['linked-client']) {
                    const linkedClients = await webflowApi.fetchReferencedItems(
                        '6728863a968984332438637a',
                        productFieldData['linked-client']
                    );
                
                    // Map card types for linked clients
                    linkedClients.forEach(client => {
                        const clientFieldData = client.fieldData;
                        if (clientFieldData['card-type']) {
                            clientFieldData['card-type'] = cardTypeMapping[clientFieldData['card-type']] || clientFieldData['card-type'];
                        }
                    });
                
                    productFieldData['linked-client'] = linkedClients;
                }
            }

            fieldData['pulse-onboarding-product-pages'] = productPages;
        }
    }
    return items;
}



async function syncWebflowToGithub() {
    const webflowApi = new WebflowApi();
    const githubApi = new GitHubApi();

    try {
        const mainCollectionItems = await webflowApi.fetchMainCollectionItems();
        const pulseItem = mainCollectionItems.filter(item => item.fieldData.name === "Pulse");
        const finalCollectionItems = await referenceCollectionItems(pulseItem, webflowApi);
        await githubApi.updateFile(finalCollectionItems);
    } catch (error) {
        console.error('Error syncing Webflow to GitHub:', error);
    }
}

syncWebflowToGithub();

export default async function getMainCollectionItems() {
    const webflowApi = new WebflowApi();
    const items = await webflowApi.fetchMainCollectionItems();
    return items.filter(item => item.fieldData.name === "Pulse");
}