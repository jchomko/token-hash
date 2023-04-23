import { Template } from "@/lib/templates";
import { loadTemplateWithTokenHash } from "@/lib/templates";
import type { NextApiRequest, NextApiResponse } from "next";

import edgeChromium from "chrome-aws-lambda";

// Importing Puppeteer core as default otherwise
// it won't function correctly with "launch()"
import puppeteer from "puppeteer-core";

// You may want to change this if you're developing
// on a platform different from macOS.
// See https://github.com/vercel/og-image for a more resilient
// system-agnostic options for Puppeteeer.
const LOCAL_CHROME_EXECUTABLE =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const VIEWPORT_FOR_TEMPLATE = {
  [Template.Fidenza]: { width: 1000, height: 1200 },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hash = req.query.hash as string;
  const template = (req.query.template as string).replace(".png", "");

  const html = await loadTemplateWithTokenHash(template as Template, hash);

  const executablePath =
    (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  });

  const page = await browser.newPage();

  await page.setViewport(VIEWPORT_FOR_TEMPLATE[template as Template]);
  await page.setContent(html);

  const content = await page.$("body");
  if (!content) return res.status(500).end();

  const imageBuffer = await content.screenshot({
    omitBackground: true,
    type: "png",
  });

  await browser.close();

  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="tokenhash-${hash}-${template}.png"`
  );
  res.setHeader("Cache-Control", `public, s-maxage=${6 * 30 * 24 * 60 * 60}`);
  return res.status(200).send(imageBuffer);
}
