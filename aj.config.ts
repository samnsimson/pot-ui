import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/next";

export const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR", "CATEGORY:PREVIEW"] }),
        slidingWindow({ mode: "LIVE", interval: "1m", max: 120 }),
    ],
});
