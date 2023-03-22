import { NextPage } from "next";
import DefaultTemplateV2 from "@/templates/DefaultV2";
import InstitutionsTemplate from "@/templates/Institution";
import InstitutionHeaderAction from "@/templates/Institution/HeaderAction";

const InstitutionsPage: NextPage = () => {
  return (
    <DefaultTemplateV2 headerAction={<InstitutionHeaderAction />}>
      <InstitutionsTemplate />
    </DefaultTemplateV2>
  );
};

export default InstitutionsPage;
