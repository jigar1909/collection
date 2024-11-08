import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

// var api_token = 'bcade9a16e641328ce0445e6b32b861374577653c27150f2de78364e3645cbde';

const GITHUB_OWNER = 'jigar1909';
const GITHUB_REPO = 'collection';
const FILE_PATH = 'responase.json';

var global_collection_id = '67288449c46837a60804f938';
const webflowAPI = axios.create({
    baseURL: 'https://api.webflow.com/v2',
    headers: {
        Authorization: `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
    }
});
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

// async function main() {
//     const mainCollectionItems = await getMainCollectionItems();
//     const finalCollectionItems = await referenceCollectionItems(mainCollectionItems);
//     console.log("res", JSON.stringify(finalCollectionItems));
//     return JSON.stringify(mainCollectionItems);
// }
// main()


async function getMainCollectionItems() {
    try {
        const response = await webflowAPI.get(`/collections/${global_collection_id}/items`);
        console.log("data", response.data)
        return response.data.items;
    } catch (err) {
        console.log("Error in main collection")
    }
}


async function updateGithubFile(content) {
    try {
        // Get the current file (if it exists)
        const { data: currentFile } = await octokit.repos.getContent({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            path: FILE_PATH,
        }).catch(() => ({ data: null }));

        const contentEncoded = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');

        await octokit.repos.createOrUpdateFileContents({
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

async function syncWebflowToGithub() {
    try {
        const webflowData = await getMainCollectionItems();
        console.log("webflowdatas",webflowData)
        await updateGithubFile(webflowData);
    } catch (error) {
        console.error('Error syncing Webflow to GitHub:', error);
    }
}

syncWebflowToGithub();



// async function fetchReferencedItems(collectionId, itemIds) {
//     try {
//         const items = await Promise.all(itemIds.map(async (itemId) => {
//             const response = await webflowAPI.get(`/collections/${collectionId}/items/${itemId}`);
//             return response.data;
//         }));
//         return items;
//     } catch (err) {
//         console.log("Error in  multi reference collection");
//     }
// }

// async function referenceCollectionItems(items) {
//     for (let item of items) {
//         const { fieldData } = item;

//         if (fieldData['keyfeatures-2']) {
//             fieldData['keyfeatures-2'] = await fetchReferencedItems('672882dcdaab65b0f7e7e88f', fieldData['keyfeatures-2']);
//         }

//         if (fieldData['signup-page-card-content']) {
//             fieldData['signup-page-card-content'] = await fetchReferencedItems('672884cfba522ff7ba996b55', fieldData['signup-page-card-content']);
//         }

//         if (fieldData['client-logo']) {
//             fieldData['client-logo'] = await fetchReferencedItems('6728863a968984332438637a', fieldData['client-logo']);
//         }
//     }
//     return items;
// }


// export default getMainCollectionItems;
