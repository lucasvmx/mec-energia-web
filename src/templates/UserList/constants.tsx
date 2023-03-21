import { UserRole } from "@/types/person";

export const UserRoleLabelMap = {
  [UserRole.UNIVERSITY_ADMIN]: "Gestão",
  [UserRole.UNIVERSITY_USER]: "Operacional",
  [UserRole.SUPER_USER]: "Super",
};
