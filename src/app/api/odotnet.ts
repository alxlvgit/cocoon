//get the job titles by keyword api

const validJobSearchKeywords = [
    "softwareengineer",
    "software",
    "uidesigner",
    "uxdesigner",
    "uxresearcher",
  ];

async function fetchFunc(keyword: string) {
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

//get the 