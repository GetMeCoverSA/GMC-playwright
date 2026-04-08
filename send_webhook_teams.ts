import fs from 'fs';
import path from 'path';
import axios from 'axios';

const WEBHOOK_URL = process.env.AZURE_WEBHOOK_URL || "";
const PIPELINE_RUN_ID = process.env.GITHUB_RUN_ID || "Unknown";
const BRANCH_NAME = process.env.GITHUB_REF?.replace("refs/heads/", "") || "Unknown";
const TRIGGERED_BY = process.env.GITHUB_ACTOR || "Unknown";
const AUTHOR = process.env.GITHUB_TRIGGERING_ACTOR || "Unknown";
const START_TIME = process.env.PIPELINE_START_TIME || "Unknown";
const END_TIME = new Date().toISOString();

const summaryPath = path.join("full-allure-report", "widgets", "summary.json");
const suitesPath = path.join("full-allure-report", "data", "suites.json");

try {
    const summaryData = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
    const suitesData = JSON.parse(fs.readFileSync(suitesPath, "utf8"));
    
    const totalTests = summaryData.statistic?.total || 0;
    const passed = summaryData.statistic?.passed || 0;
    const failed = summaryData.statistic?.failed || 0;
    const skipped = summaryData.statistic?.skipped || 0;
    const broken = summaryData.statistic?.broken || 0;

    const failedTests: string[] = [];
    const brokenTests: string[] = [];

    suitesData.children?.forEach((suite: any) => {
        suite.children?.forEach((test: any) => {
            if (test.status === "failed") {
                failedTests.push(test.name);
            } else if (test.status === "broken") {
                brokenTests.push(test.name);
            }
        });
    });

    const failedTestsText = failedTests.length ? failedTests.map(test => `- ${test}`).join('\n') : "None";
    const brokenTestsText = brokenTests.length ? brokenTests.map(test => `- ${test}`).join('\n') : "None";

    const payload = {
        type: "message",
        attachments: [
            {
                contentType: "application/vnd.microsoft.card.adaptive",
                content: {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.4",
                    "body": [
                        { "type": "TextBlock", "size": "Large", "weight": "Bolder", "text": "🧪 Test Execution Summary" },
                        { "type": "TextBlock", "text": `👤 **Triggered By:** ${TRIGGERED_BY}` },
                        { "type": "TextBlock", "text": `🌿 **Branch:** ${BRANCH_NAME}` },
                        { "type": "TextBlock", "text": `📧 **Commit Author:** ${AUTHOR}` },
                        { "type": "TextBlock", "text": `📊 **Total Tests:** ${totalTests}` },
                        { "type": "TextBlock", "text": `✅ **Passed:** ${passed}` },
                        { "type": "TextBlock", "text": `❌ **Failed:** ${failed}` },
                        { "type": "TextBlock", "text": `⚠️ **Skipped:** ${skipped}` },
                        { "type": "TextBlock", "text": `🐞 **Broken:** ${broken}` },
                        { "type": "TextBlock", "text": `⏱️ **Start Time:** ${START_TIME}` },
                        { "type": "TextBlock", "text": `⏱️ **End Time:** ${END_TIME}` },
                        { "type": "TextBlock", "text": `🔗 **Pipeline Run ID:** ${PIPELINE_RUN_ID}` }
                    ]
                }
            }
        ]
    };

    if (failedTests.length) {
        payload.attachments[0].content.body.push(
            { "type": "TextBlock", "text": "❗ **Failed Tests:**" },
            { "type": "TextBlock", "text": failedTestsText, "wrap": true } as any
        );
    }

    if (brokenTests.length) {
        payload.attachments[0].content.body.push(
            { "type": "TextBlock", "text": "🐞 **Broken Tests:**" },
            { "type": "TextBlock", "text": brokenTestsText, "wrap": true } as any
        );
    }

    console.log("INFO: Sending webhook payload:", JSON.stringify(payload, null, 4));
    
    axios.post(WEBHOOK_URL, payload)
        .then(response => console.log(`INFO: Webhook sent successfully (Status: ${response.status})`))
        .catch(error => console.error(`ERROR: Failed to send webhook | ${error.message}`));

} catch (error: any) {
    console.error(`ERROR: Unable to process test results | ${error.message}`);
  }  