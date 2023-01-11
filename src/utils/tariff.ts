import { TariffFlag } from "@/types/tariffs";

const tariffFlagMap = new Map([
  ["B", "Azul"],
  ["G", "Verde"],
]);

export const getTariffFlagName = (tariffFlag: TariffFlag) => {
  return tariffFlagMap.get(tariffFlag);
};
