export enum UserRole {
  SUPER_USER = "super_user",
  UNIVERSITY_USER = "university_user",
  UNIVERSITY_ADMIN = "university_admin",
}

export interface CreatePersonForm {
  firstName: string;
  lastName: string;
  email: string;
  university: { label: string; id: number | null } | null;
  type: UserRole;
}

export interface GetPersonResponsePayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: UserRole;
  createOn: Date;
  university: number;
}

export type EditPersonForm = CreatePersonForm;

export interface CreatePersonRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  university: number;
  type: UserRole;
}

export interface EditPersonRequestPayload extends CreatePersonRequestPayload {
  id: number;
}

export type CreatePersonResponsePayload = GetPersonResponsePayload;

export type EditPersonResponsePayload = GetPersonResponsePayload;
