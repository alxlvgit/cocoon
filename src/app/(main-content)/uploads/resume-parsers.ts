"use server";

// Invoke lambda function to extract text from pdf
export const extractTextFromPdf = async (
  requestBody: string
): Promise<string | undefined> => {
  try {
    const extractedText = await fetch(process.env.LAMBDA_ENDPOINT_TEXTRACT!, {
      method: "POST",
      body: JSON.stringify({ Bytes: requestBody }),
    });
    if (extractedText.status !== 200) {
      return undefined;
    }
    const data = await extractedText.json();
    if (Object.keys(data).length === 0) {
      return undefined;
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

// Invoke lambda function to extract text from docx
export const extractTextFromDocx = async (
  requestBody: string
): Promise<string | undefined> => {
  try {
    const extractedText = await fetch(process.env.LAMBDA_ENDPOINT_DOCXTRACT!, {
      method: "POST",
      body: JSON.stringify({ file: requestBody }),
    });
    if (extractedText.status !== 200) {
      console.log(
        "Error: " + extractedText.statusText + " " + extractedText.status
      );
      return undefined;
    }
    const data = await extractedText.json();
    if (data && data.trim().length !== 0) {
      return data;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
