import { NextPage } from "next";
import DefaultTemplateV2 from "@/templates/DefaultV2";
import ProfileTemplate from "@/templates/Profile";

const ProfilePage: NextPage = () => {
  return (
    <DefaultTemplateV2>
      <ProfileTemplate />
    </DefaultTemplateV2>
  );
};

export default ProfilePage;
