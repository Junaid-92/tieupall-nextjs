import { NextApiRequest, NextApiResponse } from "next";
const organizationList: { id: number; name: string }[] = [
  {
    id: 1,
    name: "Sundas Foundation",
  },
  {
    id: 2,
    name: "abc Foundation",
  },
  {
    id: 3,
    name: "xyz Foundation",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") res.status(200).json(organizationList);
  else if (req.method === "POST") {
    if (req.body?.id) {
      let data = organizationList.filter((i) => i.id === req.body.id);
      res.status(200).json(data);
    }
  }
}
