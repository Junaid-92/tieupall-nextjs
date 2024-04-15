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
    const token = req.headers.authorization
  if (req.method === "GET") {
    if (req.query.id) {
      let data = organizationList.filter((i) => {
        if (i.id === parseInt(req.query.id as string)) {
          return i;
        }
      });
      res.status(200).json(data);
    } else {
      res.status(401).json({ message: "id is missing" });
    }
  }
}
