export interface InvoicesYear {
  year: number;
  invoicesYear: Array<Invoice>;
}

export interface Invoice {
  mounthNumber: number;
  isAtypical: boolean;
  consumption_peak: number;
  consumption_off_peak: number;
  demand_peak: number;
  demand_off_peak: number;
  invoice_value: number;
  isPending: boolean;
}
