import { useFetchConsumerUnitsQuery } from "@/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { NextPage } from "next";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";
import { selectActiveConsumerUnitId } from "@/store/appSlice";
import { useSelector } from "react-redux";
import DefaultTemplateV2 from "@/templates/DefaultV2";
import { Box, CircularProgress } from "@mui/material";

const ConsumerUnitLoadingPage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const activeConsumerUnitId = useSelector(selectActiveConsumerUnitId);

  if (activeConsumerUnitId) {
    router.push(`/uc/${activeConsumerUnitId}`);
  }

  if (session && session.user.universityId === undefined) {
    router.push("/instituicoes");
  }

  const { data: consumerUnits } = useFetchConsumerUnitsQuery(
    session?.user.universityId ?? skipToken
  );

  useEffect(() => {
    if (consumerUnits) {
      router.push(`/uc/${consumerUnits[0].id}`);
    }
  }, [consumerUnits, router]);

  return (
    <DefaultTemplateV2>
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    </DefaultTemplateV2>
  );
};

export default ConsumerUnitLoadingPage;
