export interface SubGroup {
  subgroup: string;
  pending?: boolean;
}

export interface Tariff {
  startDate: string;
  endDate: string;
  subgroup: string;
  overdue: boolean,
  distributor: number,
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
  startDate: string;
  endDate: string;
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