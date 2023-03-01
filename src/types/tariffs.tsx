export interface SubGroup {
  subgroup: string;
  pending?: boolean;
}

export interface Tariff {
  id?: number;
  startDate: string;
  endDate: string;
  subgroup: string;
  distributor: number;
  overdue: boolean;
  blue: Blue;
  green: Green;
}

export interface CreateAndEditTariffForm {
  start_date: Date;
  end_date: Date;
  blue: Blue;
  green: Green;
}

export type TariffFlag = "G" | "B";

export interface CreateTariffRequestPayload {
  startDate: string;
  endDate: string;
  subgroup: string;
  distributor: number;
  blue: Blue;
  green: Green;
}

export interface CreateTariffResponsePayload {
  startDate: string;
  endDate: string;
  subgroup: string;
  distributor: number;
  blue: Blue;
  green: Green;
}

export interface EditTariffRequestPayload {
  id: number;
  startDate: string;
  endDate: string;
  subgroup: string;
  distributor: number;
  blue: Blue;
  green: Green;
}

export interface EditTariffResponsePayload {
  startDate: string;
  endDate: string;
  subgroup: string;
  distributor: number;
  blue: Blue;
  green: Green;
}

export interface Blue {
  peakTusdInReaisPerKw?: number | "";
  peakTusdInReaisPerMwh?: number | "";
  peakTeInReaisPerMwh?: number | "";
  offPeakTusdInReaisPerKw?: number | "";
  offPeakTusdInReaisPerMwh?: number | "";
  offPeakTeInReaisPerMwh?: number | "";
}

export interface Green {
  peakTusdInReaisPerMwh?: number | "";
  peakTeInReaisPerMwh?: number | "";
  offPeakTusdInReaisPerMwh?: number | "";
  offPeakTeInReaisPerMwh?: number | "";
  naTusdInReaisPerKw?: number | "";
}
