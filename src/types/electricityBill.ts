export interface CreateAndEditElectricityBillForm {
  month_reference: Date;
  amount?: number;
  isAtypical: boolean;
  measured_demand?: number;
  measured_consumption_peak?: number;
  measured_consumption_off_peak?: number;
}
