# Authorization

Setup an env variable `DEVREV_TOKEN` It will be used as an auth token by default, You can also pass in the url and token in `client.setup()` as a param (see below). It is also required to run tests.

# Installation

```
npm install @devrev/typescript-sdk
```
The version can be found in package.json. The SDK is currently beta.
Make sure that your project's **package.json** contains `"type":"module"` setting.

# Example Usage of the Beta SDK

```
import {client, betaSDK} from "@devrev/typescript-sdk";

const devrevBetaSDK = client.setupBeta({ endpoint: "https://api.devrev.ai",
token: process.env.DEVREV_TOKEN });

async function test(){
    const response = await devrevBetaSDK.worksCreate({title:"New work item!",
    applies_to_part: "PROD-1",
    owned_by:["DEVU-1"],
    type: betaSDK.WorkType.Issue})
    console.log(response)
}

test()

```

# Example Usage of the Public SDK

```
import {client, publicSDK} from "@devrev/typescript-sdk";

const devrevSDK = client.setup({ endpoint: "https://api.devrev.ai", token: process.env.DEVREV_TOKEN });

async function test(){
    const response = await devrevSDK.worksCreate({title:"New work item!", applies_to_part: "PROD-1", owned_by:["DEVU-16"], type: publicSDK.WorkType.Issue})
    console.log(response.status)
}

test()
```

# Execute tests in the repo
```
npm test
```

