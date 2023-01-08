import { TariffFlag } from "./supplier";

export type Contract = {
  url:                         string;
  id:                          number;
  consumerUnit:                number;
  distributor:                 number;
  startDate:                   Date;
  endDate:                     Date;
  tariffFlag:                  TariffFlag;
  subgroup:                    string;
  supplyVoltage:               number;
  peakContractedDemandInKw:    number;
  offPeakContractedDemandInKw: number;
}

export type GetContractsResponsePayload = Array<Contract>