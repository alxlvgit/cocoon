"use server";

// test function. Not used in the app yet
const fetchUdemy = async () => {
  const results = await fetch(
    "https://www.udemy.com/api-2.0/courses/?page=2&page_size=40",
    {
      method: "GET",
      headers: new Headers({
        Authorization: `Basic ${Buffer.from(
          process.env.UDEMY_CLIENT_ID + ":" + process.env.UDEMY_CLIENT_SECRET
        ).toString("base64")}`,
      }),
    }
  );
  const data = await results.json();
  console.log(data);
  return data;
};

export default fetchUdemy;
