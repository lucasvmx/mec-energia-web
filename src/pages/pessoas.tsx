import { NextPage } from "next";
import DefaultTemplateV2 from "@/templates/DefaultV2";
import UniversityUserTemplate from "@/templates/UniversityUser";

const PeoplePage: NextPage = () => (
  <DefaultTemplateV2>
    <UniversityUserTemplate />
  </DefaultTemplateV2>
);

export default PeoplePage;
