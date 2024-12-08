const NOTION_API_URL = "https://api.notion.com/v1/databases/";
const NOTION_TOKEN = "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"; // Replace with your integration token
const DATABASE_ID = "146f4ff45bcf80d78916c458b1ed1793"; // Replace with your database ID

async function getDatabaseSchema() {
  const response = await fetch(`${NOTION_API_URL}${DATABASE_ID}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Database Schema:", data);
    return data;
  } else {
    const error = await response.json();
    console.error("Failed to retrieve database schema:", error);
  }
}

getDatabaseSchema();
