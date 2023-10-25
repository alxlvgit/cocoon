// sample resumes for testing
// 1AxYfDetPKgx93CPd-XCUd1US9yB3evkvW_9TLrFUmSo
// 1PGljSiD0fphcWSfpkOpuw1tmIxtFfWSiYLOrmuuqTNU

const keysjson = {
  type: "service_account",
  project_id: "idyllic-mantis-375620",
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com",
};

import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library/build/src/auth/googleauth";

type googleDoc = {
  googleDocId: string;
};

// Read the google doc file and return the text
export const POST = async function handler(req: Request, res: Response) {

  // const keys = JSON.parse(keysjson);
  const keys = keysjson;

  // Initialize the Google Docs API
  const SCOPES = ["https://www.googleapis.com/auth/documents"];
  const body = await req.json();


  const docsBody = body as googleDoc;

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
        private_key: keys.private_key,
      },
      scopes: SCOPES,
    });

    const docs = google.docs({ version: "v1", auth: client });
    const onlyDocId = extractGoogleDocId(docsBody.googleDocId);
    const docsRes = await docs.documents.get({ documentId: onlyDocId });
    // console.log(docsRes);
    if (!docsRes.data.body) return new Response("No data", { status: 500 });
    const text = readStructuralElements(docsRes.data.body.content);
    console.log(text);
    return new Response(JSON.stringify(text), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify(e), { status: 500 });
  }
};
