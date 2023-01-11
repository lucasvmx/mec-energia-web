export interface SubGroup {
  subgroup: string;
  pending?: boolean;
}

export interface Tariff {
  startDate: string;
  endDate: string;
  subgroup: string;
  distributor: number;
  overdue: boolean,
  blue: {
    peakTusdInReaisPerKw: number;
    peakTusdInReaisPerMwh: number;
    peakTeInReaisPerMwh: number;
    offPeakTusdInReaisPerKw: number;
    offPeakTusdInReaisPerMwh: number;
    offPeakTeInReaisPerMwh: number;
  },
  green: {
    peakTusdInReaisPerMwh: number;
    peakTeInReaisPerMwh: number;
    offPeakTusdInReaisPerMwh: number;
    offPeakTeInReaisPerMwh: number;
    naTusdInReaisPerKw: number;
  }
}

export interface CreateAndEditTariffForm {
  start_date: string;
  end_date: string;
  blue: {
    peakTusdInReaisPerKw?: number;
    peakTusdInReaisPerMwh?: number;
    peakTeInReaisPerMwh?: number;
    offPeakTusdInReaisPerKw?: number;
    offPeakTusdInReaisPerMwh?: number;
    offPeakTeInReaisPerMwh?: number;
  },
  green: {
    peakTusdInReaisPerMwh?: number;
    peakTeInReaisPerMwh?: number;
    offPeakTusdInReaisPerMwh?: number;
    offPeakTeInReaisPerMwh?: number;
    naTusdInReaisPerKw?: number;
  }
}

export type TariffFlag = "G" | "B";