import * as odotnet from "../odotnet/fetch-api";
import * as enums from "../odotnet/enums";

async function getData() {
  try {
    const result = await odotnet.odotnetKeyword(enums.JobKeyword.Software);
    console.log(result); 
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
}

export default async function fetchData() {
  try {
    const data = await getData();
    return data;
  } catch (error) {
    console.error("Error getting data:", error);
    return null; 
  }
}


(async () => {
  const data = await fetchData();
  console.log(data); 
})();
