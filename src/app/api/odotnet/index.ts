import * as odotnet from "./fetch-api";
import * as enums from "./enums";

async function main() {
  const result = await odotnet.odotnetCareerOverview(
    enums.SOCcode.WebandDigitalInterfaceDesigners
  );
  return result;
}

export default main;
