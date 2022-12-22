// TODO Rename to "distributors.ts"
export type TariffType = "green" | "blue";

export type Distributor = {
  id: number;
  title: string;
  hasPendencies: boolean;
  disabled: boolean;
};

export type DistributorsPayload = Distributor[];
