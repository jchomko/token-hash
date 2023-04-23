import { Template } from "@/lib/templates";
import { loadTemplateWithTokenHash } from "@/lib/templates";
import type { NextApiRequest, NextApiResponse } from "next";
import { webkit } from "playwright";

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

  const browser = await webkit.launch();
  const page = await browser.newPage();

  await page.setViewportSize(VIEWPORT_FOR_TEMPLATE[template as Template]);
  await page.setContent(html);

  const content = await page.$("body");
  if (!content) return res.status(500).end();

  const imageBuffer = await content.screenshot({ omitBackground: true });
  res.setHeader(
    "Content-Disposition",
    `inline; filename="tokenhash-${hash}-${template}.png"`
  );
  res.setHeader("Cache-Control", `public, s-maxage=${6 * 30 * 24 * 60 * 60}`);
  return res.status(200).send(imageBuffer);
}
