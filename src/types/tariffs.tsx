export interface SubGroup {
  subgroup: number;
  pending: boolean;
}

export interface Tariff {
  subgroup: number;
  start: Date;
  end: Date;
  overdue?: boolean;
}