import axios from 'axios';
import { Octokit } from "@octokit/rest";
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_OWNER = 'jigar1909';
const GITHUB_REPO = 'collection';
const FILE_PATH = 'hubspotformResponse.ts';
const HUBSPOT_FORM_ID = '68eca543-afc8-43fc-8956-f2411bb6aa9c';
const HUBSPOT_PORTAL_ID = '22207066';

class hbFormApi {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://forms.hsforms.com/embed/v4/',
        });
    }

    async fetchHubspotFormData() {
        try {
            const response = await this.api.get(`/render-definition/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`);
            console.log("response",response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching main collection items:", error);
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
            const fileContent = `export const hbFormResponse = ${JSON.stringify(content, null, 2)};`;
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
                message: 'Update hbForm data',
                content: contentEncoded,
                sha: currentFile ? currentFile.sha : undefined,
            });

            console.log('GitHub file updated successfully');
        } catch (error) {
            console.error('Error updating GitHub file:', error);
        }
    }
}


async function syncWebflowToGithub() {
    const hbformApi = new hbFormApi();
    const githubApi = new GitHubApi();

    try {
        const hbFromData = await hbformApi.fetchHubspotFormData();
        await githubApi.updateFile(hbFromData);
    } catch (error) {
        console.error('Error syncing data to GitHub:', error);
    }
}

syncWebflowToGithub();

export default async function getHubspotFormData() {
    const hbformApi = new hbFormApi();
    const hubFormData = await hbformApi.fetchHubspotFormData();
    return hubFormData
}