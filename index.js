import axios from 'axios';
import { Octokit } from "@octokit/rest";
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_OWNER = 'jigar1909';
const GITHUB_REPO = 'collection';
const FILE_PATH = 'webflowResponse.ts';
const GLOBAL_COLLECTION_ID = '67288449c46837a60804f938';
const webflowCardType = {
    "e2b1708271f9fab690edf9972ba40c79": 'Plain Card',
    "5c476a199d1ccba7629b9c992c80af7c": 'Signup Card',
    "1c2e07edad93807346dd0b4b97cea662": 'Key Features',
    "0b331caea787bf6fc37c3346ce88f898": 'With Primary link only',
}

const webflowProductName ={
    "6815bac69bbb40a9647e13d0f73b64f8": "Saras",
    "45e47a3dbd00061d0afdbe30f76cf6b9": "Pulse",
    "5abf557a175ba8f8c7cd98d270923bb6": "Daton"
}
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

        if (fieldData['product-pages']) {
            const productPages = await webflowApi.fetchReferencedItems('674861c25051b00627a16caa', fieldData['product-pages']);

            for (let productPage of productPages) {
                const productFieldData = productPage.fieldData;

                if (productFieldData['linked-card']) {
                    const linkedCards = productFieldData['linked-card'] = await webflowApi.fetchReferencedItems(
                        '67470f043d813be862c27ac3',
                        productFieldData['linked-card']
                    );
                    for (let card of linkedCards) {
                        try {
                            if (card.fieldData['card-type-internal-identifier']) {
                                const cardTypeId = card.fieldData['card-type-internal-identifier'];
                                card.fieldData['card-type'] = webflowCardType[cardTypeId] || cardTypeId;
                            }
                            
                            if (card.fieldData['product-name']) {
                                const productNameId = card.fieldData['product-name'];
                                card.fieldData['product-name'] = webflowProductName[productNameId] || productNameId;
                            }
                        } catch (err) {
                            console.log("Error mapping card data:", err);
                        }
                    }
                    productFieldData['linked-card'] = linkedCards;
                }

                if (productFieldData['linked-client']) {
                    productFieldData['linked-client'] = await webflowApi.fetchReferencedItems(
                        '6728863a968984332438637a',
                        productFieldData['linked-client']
                    );
                }
            }

            fieldData['product-pages'] = productPages;
        }
    }
    return items;
}



async function syncWebflowToGithub() {
    const webflowApi = new WebflowApi();
    const githubApi = new GitHubApi();

    try {
        const mainCollectionItems = await webflowApi.fetchMainCollectionItems();
        const sarasItem = mainCollectionItems.filter(item => item.fieldData.name === "Saras");
        const finalCollectionItems = await referenceCollectionItems(sarasItem, webflowApi);
        console.log("finalCollectionItems", finalCollectionItems);

        await githubApi.updateFile(finalCollectionItems);
    } catch (error) {
        console.error('Error syncing Webflow to GitHub:', error);
    }
}

syncWebflowToGithub();

export default async function getMainCollectionItems() {
    const webflowApi = new WebflowApi();
    const items = await webflowApi.fetchMainCollectionItems();
    return items.filter(item => item.fieldData.name === "Saras");
}