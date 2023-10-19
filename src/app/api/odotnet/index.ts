import * as odotnet from "./fetch-api";
import * as enums from "./enums";

const algoliasearch = require("algoliasearch");

async function main() {
  try {
    // const result = await odotnet.odotnetCareerOverview(
    //   enums.SOCcode.WebandDigitalInterfaceDesigners
    // );

    const result2 = await odotnet.odotnetKeyword(enums.JobKeyword.UIDesigner);
    console.log(result2);

    //Connect and authenticate with your Algolia app
    const client = algoliasearch(
      "TNENUUALTH",
      "cf0a6c95af88580bc3a831abdc3653e3"
    );
    // Create a new index. An index stores the data that you want to make searchable in Algolia.
    const index = client.initIndex("odotnetIndex");

    // Save the result object to Algolia index
    // await index.saveObjects([result], {
    // Set autoGenerateObjectIDIfNotExist to false if your records contain an ObjectID
    // autoGenerateObjectIDIfNotExist: true,
    // });

    console.log("Record saved successfully");
  } catch (err) {
    console.error(err);
  }
}

//main();

export default main;
