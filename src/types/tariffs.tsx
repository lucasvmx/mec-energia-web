export interface SubGroup {
  subgroup: number;
  pending?: boolean;
}

export interface Tariff {
  subgroup: number;
  start: string;
  end: string;
  overdue?: boolean;
}