// sample resumes for testing
// 1AxYfDetPKgx93CPd-XCUd1US9yB3evkvW_9TLrFUmSo
// 1PGljSiD0fphcWSfpkOpuw1tmIxtFfWSiYLOrmuuqTNU

import fs from "fs";
import { google } from "googleapis";
import { auth } from "google-auth-library";
import { GoogleAuth } from "google-auth-library/build/src/auth/googleauth";
import { NextApiRequest, NextApiResponse } from "next";

type googleDoc = {
    googleDocId: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }


    // Load the JSON key file you downloaded when creating the service account.
    const keysjson = fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS!, 'utf-8');
    const keys = JSON.parse(keysjson);

    // Initialize the Google Docs API
    const SCOPES = ["https://www.googleapis.com/auth/documents"];
    // const docId = "11eRgAkKBHOu1zMj0nWCgwXb8shs5AkLOFeU0KhzLeDo";
    const docsBody = JSON.parse(req.body) as googleDoc;
    // console.log(docsBody.googleDocId)


    function readParagraphElement(element: any) {
        if (!element.textRun) return "";
        return element.textRun.content;
    }

    function readStructuralElements(elements: any) {
        let text = "";
        for (const value of elements) {
            if (value.paragraph) {
                const paragraphElements = value.paragraph.elements;
                for (const elem of paragraphElements) {
                    text += readParagraphElement(elem);
                }
            } else if (value.table) {
                for (const row of value.table.tableRows) {
                    for (const cell of row.tableCells) {
                        text += readStructuralElements(cell.content);
                    }
                }
            } else if (value.tableOfContents) {
                text += readStructuralElements(value.tableOfContents.content);
            }
        }
        return text;
    }

    const extractGoogleDocId = (url: string): string | undefined => {
        // Regular expression to match Google Docs URL and extract document ID
        const regex = /\/document\/d\/([^\/]+)\//;
        const match = url.match(regex);

        // If there is a match, return the extracted document ID, otherwise, return null
        return match ? match[1] : undefined;
    };
    
    
    try {
        const client = new GoogleAuth({
            credentials: {
                client_email: keys.client_email,
                private_key: keys.private_key
            },
            scopes: SCOPES
        });
        
        const docs = google.docs({ version: "v1", auth: client });
        const onlyDocId = extractGoogleDocId(docsBody.googleDocId);
        const docsRes = await docs.documents.get({ documentId: onlyDocId });
        // console.log(docsRes);
        if(!docsRes.data.body) return res.status(500).json({ message: 'No data' });
        const text = readStructuralElements(docsRes.data.body.content);
        console.log(text);
        return res.status(200).json({ message: text });
    } catch (e) {
        return res.status(500).json({ message: e });
    }



};