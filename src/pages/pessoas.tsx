import { NextPage } from "next";
import DefaultTemplateV2 from "@/templates/DefaultV2";
import UserListTemplate from "@/templates/UserList";

const UserListPage: NextPage = () => (
  <DefaultTemplateV2>
    <UserListTemplate />
  </DefaultTemplateV2>
);

export default UserListPage;
