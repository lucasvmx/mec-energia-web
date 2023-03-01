export interface CreateInstitutionForm {
  acronym: string;
  name: string;
  cnpj: string;
}

export interface CreateInstitutionRequestPayload {
  name: string;
  cnpj: string;
  acronym?: string;
}

export interface CreateInstitutionResponsePayload {
  id: number;
  name: string;
  cnpj: string;
  acronym?: string;
  createdOn: Date;
}

export interface EditInstitutionRequestPayload {
  name: string;
  cnpj: string;
  acronym?: string;
  id: number;
}

export interface EditInstitutionResponsePayload {
  id: number;
  name: string;
  cnpj: string;
  acronym?: string;
  createdOn: Date;
}
