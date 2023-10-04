import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { Block, Textract } from "@aws-sdk/client-textract";

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const textract = new Textract({ region: "us-west-2" });
  if (event.body) {
    const requestBody = JSON.parse(event.body);
    const base64Bytes = requestBody.Bytes;
    const pdfBuffer = Buffer.from(base64Bytes, "base64");

    try {
      const response = await textract
        .detectDocumentText({ Document: { Bytes: pdfBuffer } })
        .catch((err) => {
          console.log(err);
        });
      const blocks: Block[] | undefined = response!.Blocks;
      const lines = blocks?.filter((block) => block.BlockType === "LINE");
      const text = lines?.map((line) => line.Text).join(" ");

      return {
        statusCode: 200,
        body: JSON.stringify(text),
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify("No body provided"),
    };
  }
};
