export interface SubGroup {
  subgroup: string;
  pending?: boolean;
}

export interface Tariff {
  start_date: string;
  end_date: string;
  subgroup: string;
  overdue: boolean;
  blue: {
    peak_tusd_in_reais_per_kw: number;
    peak_tusd_in_reais_per_mwh: number;
    peak_te_in_reais_per_mwh: number;
    off_peak_tusd_in_reais_per_kw: number;
    off_peak_tusd_in_reais_per_mwh: number;
    off_peak_te_in_reais_per_mwh: number;
  };
  green: {
    peak_tusd_in_reais_per_mwh: number;
    peak_te_in_reais_per_mwh: number;
    off_peak_tusd_in_reais_per_mwh: number;
    off_peak_te_in_reais_per_mwh: number;
    na_tusd_in_reais_per_kw: number;
  };
}

export interface CreateAndEditTariffForm {
  start_date: string;
  end_date: string;
  blue: {
    peak_tusd_in_reais_per_kw?: number;
    peak_tusd_in_reais_per_mwh?: number;
    peak_te_in_reais_per_mwh?: number;
    off_peak_tusd_in_reais_per_kw?: number;
    off_peak_tusd_in_reais_per_mwh?: number;
    off_peak_te_in_reais_per_mwh?: number;
  };
  green: {
    peak_tusd_in_reais_per_mwh?: number;
    peak_te_in_reais_per_mwh?: number;
    off_peak_tusd_in_reais_per_mwh?: number;
    off_peak_te_in_reais_per_mwh?: number;
    na_tusd_in_reais_per_kw?: number;
  };
}

export type TariffFlag = "G" | "B";
