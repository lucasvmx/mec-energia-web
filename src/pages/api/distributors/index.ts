// TODO Remove when integrated
import { NextApiRequest, NextApiResponse } from "next";
import { DistributorResponsePayload } from "@/types/distributor";

const fakeDistributors: DistributorResponsePayload[] = [
  {
    id: 1,
    universityId: 0,
    name: "Neoenergia 1",
    cnpj: "34343",
    isActive: true,
    pendingTariffsCount: 0,
    consumerUnitsCount: 0,
  },
  {
    id: 2,
    universityId: 0,
    name: "Neoenergia 2",
    cnpj: "34343",
    isActive: true,
    pendingTariffsCount: 1,
    consumerUnitsCount: 1,
  },
  {
    id: 3,
    universityId: 0,
    name: "Neoenergia 3",
    cnpj: "34343",
    isActive: false,
    pendingTariffsCount: 2,
    consumerUnitsCount: 2,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(fakeDistributors);
}
