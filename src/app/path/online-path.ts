"use server";

// Find the courses based on the search term
export const findUdemyCourses = async (
  searchTerm: string,
  pageSize: number
) => {
  const results = await fetch(
    `https://www.udemy.com/api-2.0/courses/?page=1&page_size=${pageSize}&search=${searchTerm}`,
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
  if (data.results && data.results.length > 0) {
    return data.results;
  }
  return null;
};

// Find the cheapest courses based on the search term
export const findTheCheapestUdemyCourses = async (
  searchTerm: string,
  pageSize: number
) => {
  const results = await fetch(
    `https://www.udemy.com/api-2.0/courses/?page=1&page_size=${pageSize}&search=${searchTerm}&price=price-free`,
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
  if (data.results && data.results.length > 0) {
    return data.results;
  }
  return null;
};
