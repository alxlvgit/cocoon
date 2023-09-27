"use server";

export const summarizeTheText = async (text: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt:
        "Use the data below to suggest the most suitable career choices in Canada. Analyze the possible job market situation in Canada. \n\n" +
        text +
        "\n\n",
      temperature: 0.1,
      max_tokens: 150,
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
};
