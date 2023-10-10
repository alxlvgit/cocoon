import * as fakeDB from "../api/odotnet";

export default async function Page() {
  // const result = fakeDB.getAllSkillKeywords();

  const jobSearchKeywords = [
    "softwareengineer",
    "software",
    "uidesigner",
    "uxdesigner",
    "uxresearcher",
  ];

  let dataResult: any = {};

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
    const result = { [keyword]: data };

    dataResult = { ...dataResult, ...result };
  }

  await Promise.all(jobSearchKeywords.map((e) => fetchFunc(e)));

  return (
    <div>
      <p>Testing</p>
      {dataResult.uxresearcher.career.map((e) => (
        <p key={e.title}>{e.title}</p>
      ))}
    </div>
  );
}
