import * as odotnet from "../api/odotnet/fetch-api";
import * as enums from "../api/odotnet/enums";

export default async function Page() {
  // const result = await odotnet.odotnetKeyword(enums.JobKeyword.Software);
  const result = await odotnet.odotnetCareerOverview(
    enums.SOCcode.WebDevlopers
  );
  console.log(result);
  return <p>Check your console</p>;
}
