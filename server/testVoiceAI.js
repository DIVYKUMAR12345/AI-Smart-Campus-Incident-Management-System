require("dotenv").config();

const {
    analyzeComplaintVoice
} = require("./services/voiceAnalysisService");

const voiceFilename = "voice_test.ogg";

const testVoiceAI = async () => {

    console.log(
        "========== STARTING VOICE AI TEST =========="
    );

    const result =
        await analyzeComplaintVoice(
            voiceFilename
        );

    console.log(
        "========== VOICE AI TEST RESULT =========="
    );

    console.log(
        JSON.stringify(
            result,
            null,
            2
        )
    );

};

testVoiceAI();