import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import SignInTemplate from "@/templates/Auth/SignIn";
import DashboardTemplate from "@/templates/Dashboard";
import LoadingTemplate from "@/templates/Loading";

const DashboardPage: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return <SignInTemplate />;
  }

  if (session) {
    return <DashboardTemplate />;
  }

  return <LoadingTemplate />;
};

export default DashboardPage;
