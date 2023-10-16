"use server";

// send request to lambda function to extract text from pdf
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

// send request to lambda function to extract text from docx
export const extractTextFromDocx = async (
  requestBody: string
): Promise<string | undefined> => {
  try {
    const extractedText = await fetch(process.env.LAMBDA_ENDPOINT_DOCXTRACT!, {
      method: "POST",
      body: JSON.stringify({ file: requestBody }),
    });
    const data = await extractedText.json();
    if (data.trim().length === 0) {
      return undefined;
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

// extract keywords from the text
export const getKeyPhrases = async (
  text: string
): Promise<string | undefined> => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Describe the main skills of the person. \n\n" + text + "\n\n",
        temperature: 0.1,
        max_tokens: 200,
        frequency_penalty: 0.8,
      }),
    };
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      options
    );

    const json = await response.json();
    const data = json.choices[0].text.trim();
    if (data.length === 0) {
      return undefined;
    }
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
