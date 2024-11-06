import axios from 'axios';

var api_token = 'bcade9a16e641328ce0445e6b32b861374577653c27150f2de78364e3645cbde';
var global_collection_id = '67288449c46837a60804f938';


const webflowAPI = axios.create({
    baseURL: 'https://api.webflow.com/v2',
    headers: {
        Authorization: `Bearer ${api_token}`,
    }
});

async function main() {
    const mainCollectionItems = await getMainCollectionItems();
    const finalCollectionItems = await referenceCollectionItems(mainCollectionItems);
    console.log("res", JSON.stringify(finalCollectionItems));
    return JSON.stringify(finalCollectionItems);
}
main()
async function getMainCollectionItems() {
    try {
        const response = await webflowAPI.get(`/collections/${global_collection_id}/items`);
        return response.data.items;
    } catch (err) {
        console.log("Error in main collection")
    }
}

async function fetchReferencedItems(collectionId, itemIds) {
    try {
        const items = await Promise.all(itemIds.map(async (itemId) => {
            const response = await webflowAPI.get(`/collections/${collectionId}/items/${itemId}`);
            return response.data;
        }));
        return items;
    } catch (err) {
        console.log("Error in  multi reference collection");
    }
}

async function referenceCollectionItems(items) {
    for (let item of items) {
        const { fieldData } = item;

        if (fieldData['keyfeatures-2']) {
            fieldData['keyfeatures-2'] = await fetchReferencedItems('672882dcdaab65b0f7e7e88f', fieldData['keyfeatures-2']);
        }

        if (fieldData['signup-page-card-content']) {
            fieldData['signup-page-card-content'] = await fetchReferencedItems('672884cfba522ff7ba996b55', fieldData['signup-page-card-content']);
        }

        if (fieldData['client-logo']) {
            fieldData['client-logo'] = await fetchReferencedItems('6728863a968984332438637a', fieldData['client-logo']);
        }
    }
    return items;
}


export default main;
