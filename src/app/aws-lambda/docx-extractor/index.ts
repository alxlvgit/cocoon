import mammoth from "mammoth";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (event.body) {
    const body = JSON.parse(event.body);
    const { file } = body;
    const buffer = Buffer.from(file, "base64");

    try {
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value;
      // console.log(text);
      return {
        statusCode: 200,
        body: JSON.stringify(text),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    }
  } else {
    console.log("No body provided");
    return {
      statusCode: 500,
      body: JSON.stringify("No body provided"),
    };
  }
};
