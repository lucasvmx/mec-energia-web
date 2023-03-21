import DefaultTemplateV2 from "@/templates/DefaultV2";
import InstitutionsTemplate from "@/templates/Institution";
import { NextPage } from "next";

const InstitutionsPage: NextPage = () => {
  return (
    <DefaultTemplateV2>
      <InstitutionsTemplate />
    </DefaultTemplateV2>
  );
};

export default InstitutionsPage;
