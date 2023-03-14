// TODO Remove when integrated
import { NextApiRequest, NextApiResponse } from "next";
import { Tariff } from "@/types/tariffs";

const fakeTariffs: Tariff[] = [
  {
    startDate: "2022-06-17",
    endDate: "2023-05-12",
    overdue: false,
    subgroup: "A1",
    distributor: 1,
    pending: false,
    blue: {
      peakTusdInReaisPerKw: 89.29,
      peakTusdInReaisPerMwh: 117.13,
      peakTeInReaisPerMwh: 413.03,
      offPeakTusdInReaisPerKw: 31.53,
      offPeakTusdInReaisPerMwh: 117.13,
      offPeakTeInReaisPerMwh: 260.02,
    },
    green: {
      peakTusdInReaisPerMwh: 2280.15,
      peakTeInReaisPerMwh: 413.03,
      offPeakTusdInReaisPerMwh: 117.13,
      offPeakTeInReaisPerMwh: 260.02,
      naTusdInReaisPerKw: 31.53,
    },
  },
  {
    startDate: "2021-10-02",
    endDate: "2022-10-05",
    overdue: true,
    subgroup: "A3",
    distributor: 1,
    pending: false,
    blue: {
      peakTusdInReaisPerKw: 89.29,
      peakTusdInReaisPerMwh: 117.13,
      peakTeInReaisPerMwh: 413.03,
      offPeakTusdInReaisPerKw: 31.53,
      offPeakTusdInReaisPerMwh: 117.13,
      offPeakTeInReaisPerMwh: 260.02,
    },
    green: {
      peakTusdInReaisPerMwh: 2280.15,
      peakTeInReaisPerMwh: 413.03,
      offPeakTusdInReaisPerMwh: 117.13,
      offPeakTeInReaisPerMwh: 260.02,
      naTusdInReaisPerKw: 31.53,
    },
  },
  {
    startDate: "2021-10-02",
    endDate: "2022-10-05",
    overdue: true,
    subgroup: "A3a",
    distributor: 1,
    pending: true,
    blue: {
      peakTusdInReaisPerKw: 89.29,
      peakTusdInReaisPerMwh: 117.13,
      peakTeInReaisPerMwh: 413.03,
      offPeakTusdInReaisPerKw: 31.53,
      offPeakTusdInReaisPerMwh: 117.13,
      offPeakTeInReaisPerMwh: 260.02,
    },
    green: {
      peakTusdInReaisPerMwh: 2280.15,
      peakTeInReaisPerMwh: 413.03,
      offPeakTusdInReaisPerMwh: 117.13,
      offPeakTeInReaisPerMwh: 260.02,
      naTusdInReaisPerKw: 31.53,
    },
  },
  {
    startDate: "2022-06-17",
    endDate: "2023-05-12",
    overdue: false,
    subgroup: "A4",
    distributor: 1,
    pending: false,
    blue: {
      peakTusdInReaisPerKw: 89.29,
      peakTusdInReaisPerMwh: 117.13,
      peakTeInReaisPerMwh: 413.03,
      offPeakTusdInReaisPerKw: 31.53,
      offPeakTusdInReaisPerMwh: 117.13,
      offPeakTeInReaisPerMwh: 260.02,
    },
    green: {
      peakTusdInReaisPerMwh: 2280.15,
      peakTeInReaisPerMwh: 413.03,
      offPeakTusdInReaisPerMwh: 117.13,
      offPeakTeInReaisPerMwh: 260.02,
      naTusdInReaisPerKw: 31.53,
    },
  },
  {
    startDate: "2022-06-17",
    endDate: "2023-05-12",
    overdue: false,
    subgroup: "AS",
    distributor: 1,
    pending: false,
    blue: {
      peakTusdInReaisPerKw: 89.29,
      peakTusdInReaisPerMwh: 117.13,
      peakTeInReaisPerMwh: 413.03,
      offPeakTusdInReaisPerKw: 31.53,
      offPeakTusdInReaisPerMwh: 117.13,
      offPeakTeInReaisPerMwh: 260.02,
    },
    green: {
      peakTusdInReaisPerMwh: 2280.15,
      peakTeInReaisPerMwh: 413.03,
      offPeakTusdInReaisPerMwh: 117.13,
      offPeakTeInReaisPerMwh: 260.02,
      naTusdInReaisPerKw: 31.53,
    },
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(fakeTariffs);
}
