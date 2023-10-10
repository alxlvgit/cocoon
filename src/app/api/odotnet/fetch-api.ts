//get the job titles by keyword api
//below are only valid keywords to search for design-related IT jobs.
const validJobSearchKeywords = [
    "softwareengineer",
    "software",
    "uidesigner",
    "uxdesigner",
    "uxresearcher",
  ];

async function odotnetKeyword(keyword: string) {
    const res = await fetch(
      `https://services.onetcenter.org/ws/mnm/search?keyword=${keyword}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${process.env.ODOTNET_CREDENTIALS}`,
        },
      }
    );

    const data = await res.json();
    return data;
  }

//get the career overview (description, tasks)
const validONetSOC2019 = ["15-1252.00", "15-1254.00", "15-1255.00", "15-1251.00"];

//15-1252.00: Sofware Developers, 
//15-1254.00: Web Devlopers, 
//15-1255.00: Web and Digital Interface Designers
//15-1251.00: Computer Programmers

async function odotnetCareerOverview(code: string, careerSecton: ) {
  const res = await fetch(
    `https://services.onetcenter.org/ws/mnm/careers/${code}/`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${process.env.ODOTNET_CREDENTIALS}`,
      },
    }
  );

  const data = await res.json();
  return data;
}