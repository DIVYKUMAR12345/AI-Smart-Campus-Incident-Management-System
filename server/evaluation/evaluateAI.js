require("dotenv").config();

const { analyzeComplaint } = require("../services/aiService");
const testComplaints = require("./testComplaints");
const fs = require("fs");
const path = require("path");

async function evaluateAI() {
  console.log("==============================================");
  console.log(" AI COMPLAINT CLASSIFICATION EVALUATION");
  console.log("==============================================");
  console.log(`Total test complaints: ${testComplaints.length}`);
  console.log("");

  let categoryCorrect = 0;
  let priorityCorrect = 0;
  let emergencyCorrect = 0;

  let totalProcessingTime = 0;

  const results = [];

  for (let i = 0; i < testComplaints.length; i++) {
    const testCase = testComplaints[i];

    console.log(
      `\n[${i + 1}/${testComplaints.length}] Testing: ${testCase.complaint}`
    );

    const startTime = Date.now();

    try {
      const aiResult = await analyzeComplaint(testCase.complaint);

      const processingTime = Date.now() - startTime;
      totalProcessingTime += processingTime;

      const categoryMatch =
        aiResult.category === testCase.expectedCategory;

      const priorityMatch =
        aiResult.priority === testCase.expectedPriority;

      const emergencyMatch =
        Boolean(aiResult.emergency) === testCase.expectedEmergency;

      if (categoryMatch) categoryCorrect++;
      if (priorityMatch) priorityCorrect++;
      if (emergencyMatch) emergencyCorrect++;

      results.push({
        id: testCase.id,
        complaint: testCase.complaint,

        expectedCategory: testCase.expectedCategory,
        predictedCategory: aiResult.category,
        categoryCorrect: categoryMatch,

        expectedPriority: testCase.expectedPriority,
        predictedPriority: aiResult.priority,
        priorityCorrect: priorityMatch,

        expectedEmergency: testCase.expectedEmergency,
        predictedEmergency: Boolean(aiResult.emergency),
        emergencyCorrect: emergencyMatch,

        confidence: aiResult.confidence ?? null,
        processingTimeMs: processingTime,

        summary: aiResult.summary ?? "",
        reason: aiResult.reason ?? ""
      });

      console.log(
        `   Category:  ${aiResult.category} ${
          categoryMatch ? "✓" : "✗"
        }`
      );

      console.log(
        `   Priority:  ${aiResult.priority} ${
          priorityMatch ? "✓" : "✗"
        }`
      );

      console.log(
        `   Emergency: ${Boolean(aiResult.emergency)} ${
          emergencyMatch ? "✓" : "✗"
        }`
      );

      console.log(
        `   Confidence: ${aiResult.confidence ?? "N/A"}`
      );

      console.log(`   Time: ${processingTime} ms`);
    } catch (error) {
      const processingTime = Date.now() - startTime;
      totalProcessingTime += processingTime;

      console.log(`   ERROR: ${error.message}`);

      results.push({
        id: testCase.id,
        complaint: testCase.complaint,

        expectedCategory: testCase.expectedCategory,
        predictedCategory: null,
        categoryCorrect: false,

        expectedPriority: testCase.expectedPriority,
        predictedPriority: null,
        priorityCorrect: false,

        expectedEmergency: testCase.expectedEmergency,
        predictedEmergency: null,
        emergencyCorrect: false,

        confidence: null,
        processingTimeMs: processingTime,

        error: error.message
      });
    }
  }

  const total = testComplaints.length;

  const categoryAccuracy =
    total > 0 ? (categoryCorrect / total) * 100 : 0;

  const priorityAccuracy =
    total > 0 ? (priorityCorrect / total) * 100 : 0;

  const emergencyAccuracy =
    total > 0 ? (emergencyCorrect / total) * 100 : 0;

  const averageProcessingTime =
    total > 0 ? totalProcessingTime / total : 0;

  console.log("\n");
  console.log("==============================================");
  console.log(" FINAL EVALUATION RESULTS");
  console.log("==============================================");

  console.log(
    `Category Accuracy:   ${categoryCorrect}/${total} = ${categoryAccuracy.toFixed(2)}%`
  );

  console.log(
    `Priority Accuracy:   ${priorityCorrect}/${total} = ${priorityAccuracy.toFixed(2)}%`
  );

  console.log(
    `Emergency Accuracy:  ${emergencyCorrect}/${total} = ${emergencyAccuracy.toFixed(2)}%`
  );

  console.log(
    `Average Processing Time: ${averageProcessingTime.toFixed(2)} ms`
  );

  console.log("==============================================");

  const outputPath = path.join(
    __dirname,
    "evaluationResults.json"
  );

  const evaluationReport = {
    evaluationDate: new Date().toISOString(),

    totalTestCases: total,

    metrics: {
      categoryCorrect,
      categoryAccuracy: Number(categoryAccuracy.toFixed(2)),

      priorityCorrect,
      priorityAccuracy: Number(priorityAccuracy.toFixed(2)),

      emergencyCorrect,
      emergencyAccuracy: Number(emergencyAccuracy.toFixed(2)),

      averageProcessingTimeMs: Number(
        averageProcessingTime.toFixed(2)
      )
    },

    results
  };

  fs.writeFileSync(
    outputPath,
    JSON.stringify(evaluationReport, null, 2)
  );

  console.log("\nResults saved to:");
  console.log(outputPath);

  console.log("\nEvaluation completed.");
}

evaluateAI();