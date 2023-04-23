import { Template } from "@/lib/templates";
import type { NextApiRequest, NextApiResponse } from "next";

const NAME_FOR_TEMPLATE = {
  [Template.Fidenza]: "Fidenza",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const hash = req.query.hash as string;
  const template = req.query.template as string;

  const templateName = NAME_FOR_TEMPLATE[template as Template];

  res.setHeader("Cache-Control", `public, s-maxage=${6 * 30 * 24 * 60 * 60}`);
  res.json({
    name: `Wrapped Token Hash #${id} — ${templateName}`,
    description: `This Token Hash is represented as a ${templateName} with token_hash ${hash}.`,
    image: `https://tokenhash.jonathanchomko.com/api/image/${hash}/${template}.png`,
    animation_url: `https://tokenhash.jonathanchomko.com/api/render/${hash}/${template}.html`,
  });
}
