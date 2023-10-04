export default async function Page() {
  const res = await fetch(
    "https://services.onetcenter.org/ws/mnm/search?keyword=software",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${process.env.ODOTNET_CREDENTIALS}`,
      },
    }
  );
  const data = await res.json();

  return (
    <div>
      <p>Testing</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
// fetch("http://localhost:3000/api/getJson")
