import { Template, loadTemplateWithTokenHash } from "@/lib/templates";
import { NextApiRequest, NextApiResponse } from "next";

export default async function route(req: NextApiRequest, res: NextApiResponse) {
  const hash = req.query.hash as string;
  const template = (req.query.template as string).replace(".html", "");
  // ^ this is pretty cursed but to make the url pretty...

  const content = await loadTemplateWithTokenHash(template as Template, hash);

  res.setHeader("Cache-Control", `public, s-maxage=${6 * 30 * 24 * 60 * 60}`);
  res.status(200).send(content);
  res.end();
}
