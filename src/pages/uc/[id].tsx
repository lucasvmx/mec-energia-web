import { NextPage } from "next";
import { Box, Container } from "@mui/material";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

import { wrapper } from "@/store";
import { setActiveConsumerUnitId } from "@/store/appSlice";

import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import ConsumerUnitsCardGrid from "@/templates/ConsumerUnit/Grid";
import ConsumerUnitHeader from "@/templates/ConsumerUnit/Header";
import ConsumerUnitContent from "@/templates/ConsumerUnit/Content";
import ConsumerUnitCreateForm from "@/components/ConsumerUnit/Form/Create";
import ConsumerUnitEditForm from "@/components/ConsumerUnit/Form/Edit";
import ConsumerUnitRenewContractForm from "@/components/ConsumerUnit/Form/RenewContract";
import SucessNotification from "@/components/Notification/SucessNotification";

type ExpectedQuery = {
  id: string;
};

function isValidQuery(query: NextParsedUrlQuery): query is ExpectedQuery {
  return typeof query.id === "string" && query.id.indexOf(" ") < 0;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      if (!isValidQuery(query)) {
        return {
          notFound: true,
        };
      }

      const consumerUnitId = Number(query.id);

      if (!consumerUnitId || isNaN(consumerUnitId)) {
        return {
          notFound: true,
        };
      }

      store.dispatch(setActiveConsumerUnitId(consumerUnitId));

      return {
        props: {},
      };
    }
);

const ConsumerUnitPage: NextPage = () => {
  return (
    <Box display="flex" height="100vh">
      <Drawer />

      <Box flexGrow={1}>
        <Header />

        <Box display="flex">
          <Box height="calc(100vh - 64px)">
            <ConsumerUnitsCardGrid />
          </Box>

          <Box
            flexGrow={1}
            minHeight="calc(100vh - 64px)"
            maxHeight="calc(100vh - 64px)"
            overflow="scroll"
            position="relative"
            pb={5}
          >
            <Container>
              <ConsumerUnitHeader />
              <ConsumerUnitContent />
            </Container>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "primary.main" }} height="300px" />
      </Box>

      <ConsumerUnitCreateForm />
      <ConsumerUnitEditForm />
      <ConsumerUnitRenewContractForm />
      <SucessNotification />
    </Box>
  );
};

export default ConsumerUnitPage;
