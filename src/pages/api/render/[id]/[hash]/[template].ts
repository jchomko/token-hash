import { Template, loadTemplateWithTokenHash } from "@/lib/templates";
import { NextApiRequest, NextApiResponse } from "next";

export default async function route(req: NextApiRequest, res: NextApiResponse) {
  const template = (req.query.template as string).replace(".html", "");
  // ^ this is pretty cursed but to make the url pretty...

  const id = req.query.id as string;
  const hash = req.query.hash as string;

  const content = await loadTemplateWithTokenHash(
    template as Template,
    id,
    hash
  );

  res.setHeader("Cache-Control", `public, s-maxage=${6 * 30 * 24 * 60 * 60}`);
  res.status(200).send(content);
  res.end();
}
