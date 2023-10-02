"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const typescript_sdk_1 = require("@devrev/typescript-sdk");
// Creating Ticket for a received call
function create_ticket(event, bodi, tikt_title) {
    return __awaiter(this, void 0, void 0, function* () {
        const devrevPAT = event.context.secrets.service_account_token;
        const API_BASE = event.execution_metadata.devrev_endpoint;
        const devrevSDK = typescript_sdk_1.client.setup({
            endpoint: API_BASE,
            token: devrevPAT,
        });
        const response = yield devrevSDK.worksCreate({ title: `Ticket created for caller ${tikt_title}`, body: bodi, applies_to_part: "PROD-1", owned_by: ["DEVU-1"], type: typescript_sdk_1.publicSDK.WorkType.Ticket });
        console.log(response);
        return response;
    });
}
const run = (events) => __awaiter(void 0, void 0, void 0, function* () {
    // Function to make the program stop excecuting for a given time[Used for enusring that the promise is non-null by twilio and OpenAI]
    function sleep(miliseconds) {
        var currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {
        }
    }
    const OpenAI = require("openai");
    const open_key = events[0].input_data.global_values.openai_api_key;
    // Function to generate response from ChatGPT with a prompt
    const openai = new OpenAI({
        apiKey: open_key,
    });
    function runCompletion(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatCompletion = yield openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": prompt }],
            });
            var gptext = chatCompletion.choices[0].message;
            return gptext;
        });
    }
    const accountSid = events[0].input_data.global_values.twilio_account_sid;
    const authToken = events[0].input_data.global_values.twilio_auth_token;
    const twil_client = require('twilio')(accountSid, authToken);
    // Getiing Transcription form twilio
    function getTrans() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transcriptions = yield twil_client.transcriptions.list({ limit: 1 });
                if (transcriptions.length > 0) {
                    const trans_id = transcriptions[0].sid;
                    const transcription = yield twil_client.transcriptions(trans_id).fetch();
                    return transcription;
                }
                else {
                    console.log("No Transcription found.");
                    return null; // Indicate that no transcription was found
                }
            }
            catch (error) {
                console.error("Error fetching Trascription:", error);
                return null; // Handle errors and indicate no transcription was found
            }
        });
    }
    // Getting the URL for call recording from twilio
    function getRecUrl() {
        return twil_client.recordings.list({ limit: 1 })
            .then(recordings => {
            if (recordings.length > 0) {
                const record_id = recordings[0].sid;
                const dog_url = `Call Recording URL: https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Recordings/${record_id}`;
                return dog_url;
            }
            else {
                console.log("No recordings found.");
                return null; // Indicate that no recording was found
            }
        })
            .catch(error => {
            console.error("Error fetching recordings:", error);
            return null; // Handle errors and indicate no recording was found
        });
    }
    //Getting caller ID from Twilio
    function getNextTwelveCharacters(inputString) {
        var index = inputString.indexOf("Caller=%2B");
        return inputString.substring(index + 10, index + 22);
    }
    var tikt_json = JSON.stringify(events[0]);
    var tikt_obj = JSON.parse(tikt_json).payload;
    var tikt_bodi = JSON.stringify(tikt_obj);
    var tikt_number = "+" + getNextTwelveCharacters(tikt_bodi);
    sleep(25000);
    const trans_body = yield getTrans();
    const rec_url = yield getRecUrl();
    const trans_text = yield trans_body.transcriptionText;
    // // Title
    const tilte_prompt = `Here is the transcription of a voice call "${trans_text}", give me a title for customer support management ticket from it.`;
    const title_result = yield runCompletion(tilte_prompt);
    const tikt_title = title_result.content + ` | Ticket generated for caller ${tikt_number}`;
    // // Summary
    const summary_prompt = `Here is the transcription of a voice call "${trans_text}", give me a summary from it.`;
    const summary_result = yield runCompletion(summary_prompt);
    // // Action Items
    const action_prompt = `Here is the transcription of a voice call "${trans_text}", give me a list of action items from it, and say none if there are no action items.`;
    const action_result = yield runCompletion(action_prompt);
    // // CSAT
    const csat_prompt = `Here is the transcription of a voice call "${trans_text}", give me customer satisfiaction on a scale of 1 to 10, and say none if you cannot determine it.`;
    const csat_result = yield runCompletion(csat_prompt);
    sleep(10000);
    const tikt_body = "Call Transcription : " + trans_body.transcriptionText + "\n" + "\n" + "Summary : " + summary_result.content + "\n" + "\n" + "Action Items : " + action_result.content + "\n" + "\n" + "CSAT: " + csat_result.content + "\n" + "\n" + rec_url;
    create_ticket(events[0], tikt_body, tikt_title);
});
exports.run = run;
exports.default = exports.run;
