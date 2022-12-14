export interface InvoicesYear {
  year: number;
  invoicesYear: Array<Invoice>;
}

export interface Invoice {
  mounthNumber: number;
  mounth: string;
  analyzable: boolean;
  consumption_peak: number;
  consumption_off_peak: number;
  demand_peak: number;
  demand_off_peak: number;
  invoice_value: number;
}
