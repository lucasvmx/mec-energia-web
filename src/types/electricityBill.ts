export interface CreateAndEditElectricityBillForm {
  date:                       Date;
  invoiceInReais?:            number | "";
  isAtypical:                 boolean;
  peakMeasuredDemandInKw?:    number | "";
  offPeakMeasuredDemandInKw?: number | "";
  peakConsumptionInKwh?:      number | "";
  offPeakConsumptionInKwh?:   number | "";
}

export interface PostElectricityBillRequestPayload {
  date:                     string;
  invoiceInReais?:          number;
  isAtypical:               boolean;
  peakMeasuredDemandInKw?:  number;
  offPeakMeasuredDemandInKw	:number;
  peakConsumptionInKwh?:    number;
  offPeakConsumptionInKwh?: number;
  contract:                 number;
  consumerUnit:             number;
}

export interface PostElectricityBillResponsePayload {
  id:                        number;
  date:	                     Date;
  invoiceInReais:            number;
  isAtypical:                boolean;
  peakConsumptionInKwh:	     number;
  offPeakConsumptionInKwh:	 number;
  peakMeasuredDemandInKw:	   number;
  offPeakMeasuredDemandInKw	:number;
  contract:                  string;
  consumerUnit:              string;
}