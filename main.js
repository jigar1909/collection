import main from './index.js';

async function fetchCollection() {
    try {
        const finalCollectionItems = await main();
        console.log(finalCollectionItems);
    } catch (err) {
        console.log('Error:', err);
    }
}

fetchCollection();
