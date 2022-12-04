export interface InvoicesYear {
  year: number;
  invoicesYear: Array<Invoice>
}

export interface Invoice{
  mountNumber:number;
  analyzable:boolean;
  consumption_peak:number;
  consumptionoff_peak:number;
  demand:number;
  demand_off_peak:number;
  invoice_value: number;
}
