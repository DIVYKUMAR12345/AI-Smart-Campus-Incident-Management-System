require("dotenv").config();

const { analyzeComplaint } = require("../services/aiService");

async function run() {

    try {

        const result = await analyzeComplaint(
            "There is water leakage in Block B near classroom 302."
        );

        console.log(result);

    } catch (error) {

        console.log(error);

    }

}

run();