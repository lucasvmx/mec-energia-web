export interface CreatePersonForm {
  firstName: string;
  lastName: string;
  email: string;
  university: { label: string; id: number | null } | null;
  type: "super_user" | "university_user" | "university_admin";
}

export interface GetPersonResponsePayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  createOn: Date;
  university: number;
}

export interface EditPersonForm extends CreatePersonForm {
  id: number;
}

export interface CreatePersonRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  university: number;
  type: "super_user" | "university_user" | "university_admin";
}

export type EditPersonRequestPayload = EditPersonForm;

export type CreatePersonResponsePayload = GetPersonResponsePayload;

export type EditPersonResponsePayload = GetPersonResponsePayload;
