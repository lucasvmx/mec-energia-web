import { format, parseISO } from "date-fns";

export const getFormattedDate = (stringDate: string) => {
  return format(parseISO(stringDate), "dd/MM/yyyy");
};
