import { schedule } from "@netlify/functions";
import fetch from "node-fetch";

// Crontab for every four hours from 10:00-22:00 in Mountain Time
const handler = schedule("0 17,21,1,5 * * *", async () => {
  const BUILD_HOOK = process.env.PROJECT_BUILD_HOOK_URL;
  if (!BUILD_HOOK) {
    throw new Error("PROJECT_BUILD_HOOK_URL is not set");
  }

  const resp = await fetch(BUILD_HOOK, { method: "POST" });
  const data = await resp.text();
  console.log({ status: resp.status, data });
  return { statusCode: resp.status };
});

export { handler };
