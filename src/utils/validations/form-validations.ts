import { EditConsumerUnitForm } from "@/types/consumerUnit";
import { Subgroup } from "@/types/subgroups";

export const isInSomeSubgroups = (
  supplied: EditConsumerUnitForm["supplyVoltage"],
  subgroups: Subgroup[]
) => {
  if (!subgroups) return true;
  const isValidValue = subgroups?.some(
    (subgroup: Subgroup) => supplied >= subgroup.min && supplied <= subgroup.max
  );
  const isGreaterMax = supplied >= subgroups[subgroups?.length - 1].min;
  if (!isValidValue && !isGreaterMax) {
    return "Insira um valor conforme os intervalos ao lado";
  }
  return true;
};
