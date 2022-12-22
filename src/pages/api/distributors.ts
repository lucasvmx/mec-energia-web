// TODO Remove when integrated
import { NextApiRequest, NextApiResponse } from "next";
import { DistributorsPayload } from "@/types/supplier";

const fakeDistributors: DistributorsPayload = [
  {
    id: 0,
    title: "Mocked Enel",
    hasPendencies: false,
    disabled: false,
  },
  {
    id: 1,
    title: "Neoenergia",
    hasPendencies: true,
    disabled: false,
  },
  {
    id: 2,
    title: "CEB",
    hasPendencies: false,
    disabled: true,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(fakeDistributors);
}
