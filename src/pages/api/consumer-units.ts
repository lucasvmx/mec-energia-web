// TODO Remove when integrated
import { NextApiRequest, NextApiResponse } from "next";
import { ConsumerUnitsPayload } from "@/types/consumerUnit";

const fakeConsumerUnits: ConsumerUnitsPayload = [
  {
    id: 0,
    title: "Campus Gama",
    postedCurrentInvoice: false,
    pendenciesCount: 3,
    favorite: true,
    disabled: false,
  },
  {
    id: 1,
    title: "Campus Darcy Ribeiro Gleba B",
    postedCurrentInvoice: false,
    pendenciesCount: 0,
    favorite: false,
    disabled: false,
  },
  {
    id: 2,
    title: "Campus Darcy Ribeiro Gleba D",
    postedCurrentInvoice: true,
    pendenciesCount: 3,
    favorite: false,
    disabled: false,
  },
  {
    id: 3,
    title: "Campus Planaltina",
    postedCurrentInvoice: true,
    pendenciesCount: 0,
    favorite: true,
    disabled: false,
  },
  {
    id: 4,
    title: "Campus Darcy Ribeiro Gleba A",
    postedCurrentInvoice: true,
    pendenciesCount: 0,
    favorite: false,
    disabled: false,
  },
  {
    id: 5,
    title: "Estação Meteorológica",
    postedCurrentInvoice: true,
    pendenciesCount: 0,
    favorite: false,
    disabled: true,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(fakeConsumerUnits);
}
