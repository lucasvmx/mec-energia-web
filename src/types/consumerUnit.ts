import { TariffType } from "./supplier";

export interface CreateConsumerUnitForm {
  title: string;
  code: string;
  supplier: string;
  startDate: Date | null;
  supplied: number | "";
  tariffType: TariffType;
  contracted: number | "";
  peakContracted: number | "";
  outOfPeakContracted: number | "";
}

export interface EditConsumerUnitForm {
  isActive: boolean;
  title: string;
  code: string;
  supplier: string;
  startDate: Date | null;
  supplied: number | "";
  tariffType: TariffType;
  contracted: number | "";
  peakContracted: number | "";
  outOfPeakContracted: number | "";
}

export interface RenewConsumerUnitContractForm {
  supplier: string;
  startDate: Date | null;
  supplied: number | "";
  tariffType: TariffType;
  contracted: number | "";
  peakContracted: number | "";
  outOfPeakContracted: number | "";
}

export type ConsumerUnitCard = {
  id: number;
  title: string;
  postedCurrentInvoice: boolean;
  pendenciesCount: number;
  favorite: boolean;
  disabled: boolean;
};

export type ConsumerUnitCards = ConsumerUnitCard[];
