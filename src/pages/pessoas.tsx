import { NextPage } from "next";
import DefaultTemplateV2 from "@/templates/DefaultV2";
import UserListTemplate from "@/templates/UserList";
import SuccessNotification from "@/components/Notification/SuccessNotification";
import FailNotification from "@/components/Notification/FailNotification";

const UserListPage: NextPage = () => (
  <DefaultTemplateV2>
    <UserListTemplate />
    <SuccessNotification />
    <FailNotification />
  </DefaultTemplateV2>
);

export default UserListPage;
