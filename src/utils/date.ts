import { format, parseISO } from "date-fns";

export const getFormattedDate = (stringDate: string) => {
  return format(parseISO(stringDate), "dd/MM/yyyy");
};

export const sendFormattedDate = (stringDate: Date) => {
  return format(stringDate, "yyyy-MM-dd");
};
