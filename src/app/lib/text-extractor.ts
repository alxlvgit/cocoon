"use server";

// extract keywords from the text
export const getKeyPhrases = async (requestBody: { Bytes: string }) => {
  try {
    const text = await extractText(requestBody);
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
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// send request to lambda function to extract text from pdf
const extractText = async (requestBody: { Bytes: string }) => {
  try {
    const test = await fetch(process.env.LAMBDA_ENDPOINT_TEXTRACT!, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
    const data = await test.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
