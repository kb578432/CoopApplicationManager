console.log("background.js is running");
const SUPABASE_URL = "https://xdhbbzyluaxwjosurggh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkaGJienlsdWF4d2pvc3VyZ2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMTc0NDIsImV4cCI6MjA0NDY5MzQ0Mn0.07yOFnNTVTxJWCqCZcPhA8ohMG3E9gtvhCuPFC2Pdmg";
const TABLE_NAME = "JobApplications";
// listen for when the tab changes to a job details page and insert the content script into the dom
// the content script will listen for a message from the popup to scrape the data
// the content script will then send a message to this backgroudn script
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (details.url.includes("/students/app/jobs/detail/")) {
        console.log("tab changed to a job details page");
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ["dist/content.js"],
        });
    }
});
// listen for a message from the content script to add job details to supabase
// the message should include a property `jobDetails` associated with an object with the following properties:
// - title: string
// - company: string
// - location: string
// - type: string
// - deadline: Date
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("message received", message);
    switch (message.action) {
        case "addJobDetailsToSupabase":
            addJobDetailsToSupabase(message.jobDetails);
            break;
        case "addJobDetailsToNotion":
            addJobDetailsToNotion(message.jobDetails);
            break;
        default:
            throw new Error("Unknown action: " + message.action);
    }
});
async function addJobDetailsToNotion(jobDetails) {
    console.log("adding data to notion");
    const NOTION_API_URL = "https://api.notion.com/v1/pages";
    const NOTION_TOKEN = "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"; // Replace with your integration token
    const DATABASE_ID = "146f4ff45bcf80d78916c458b1ed1793"; // Replace with your database ID
    const requestBody = {
        parent: { database_id: DATABASE_ID },
        properties: {
            title: {
                title: [
                    {
                        type: "text",
                        text: {
                            content: jobDetails.title,
                            link: {
                                url: jobDetails.url,
                            },
                        },
                    },
                ],
            },
            status: jobDetails.status
                ? {
                    select: {
                        name: jobDetails.status,
                    },
                }
                : undefined,
            notes: jobDetails.notes
                ? {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: jobDetails.notes,
                            },
                        },
                    ],
                }
                : undefined,
            company: jobDetails.company
                ? {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: jobDetails.company,
                            },
                        },
                    ],
                }
                : undefined,
            pay_per_hour: jobDetails.pay_per_hour !== undefined
                ? {
                    number: jobDetails.pay_per_hour,
                }
                : undefined,
            type: jobDetails.type
                ? {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: jobDetails.type,
                            },
                        },
                    ],
                }
                : undefined,
            deadline: jobDetails.deadline
                ? {
                    date: {
                        start: jobDetails.deadline,
                    },
                }
                : undefined,
            location: jobDetails.location
                ? {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: jobDetails.location,
                            },
                        },
                    ],
                }
                : undefined,
        },
    };
    try {
        const response = await fetch(NOTION_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${NOTION_TOKEN}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28",
            },
            body: JSON.stringify(requestBody),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Row added successfully:", data);
            return data;
        }
        else {
            const error = await response.json();
            console.error("Failed to add row:", error);
        }
    }
    catch (error) {
        console.error("Error:", error);
    }
}
// adds the given data to the supabase table
// data should be an object with the following properties:
// - title: string
// - company: string
// - location: string
// - type: string
// - deadline: Date
async function addJobDetailsToSupabase(data) {
    console.log("adding data to supabase");
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log("Data added successfully!");
        }
        else {
            console.error("Error adding data:", response.statusText);
            const json = await response.json();
            console.error(json);
        }
    }
    catch (error) {
        console.error("Request failed:", error);
    }
}
export {};
