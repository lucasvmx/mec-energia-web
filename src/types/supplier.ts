// TODO Rename to "distributors.ts"
export type TariffType = "green" | "blue";

export type DistributorCard = {
  id: number;
  title: string;
  hasPendencies: boolean;
  disabled: boolean;
};

export type DistributorCards = DistributorCard[];
