import { NextPage } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

import { wrapper } from "@/store";
import { setActiveDistributorId } from "@/store/appSlice";
import DefaultTemplateV2 from "@/templates/DefaultV2";
import DistributorsCardGrid from "@/templates/Distributor/Grid";
import DistributorContentHeader from "@/templates/Distributor/Header";
import DistributorEditForm from "@/components/Distributor/Form/DistributorEditForm";
import DistributorContent from "@/templates/Distributor/Content";

type ExpectedQuery = {
  distributorId: string;
};

function isValidQuery(query: NextParsedUrlQuery): query is ExpectedQuery {
  return (
    typeof query.distributorId === "string" &&
    query.distributorId.indexOf(" ") < 0
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      if (!isValidQuery(query)) {
        return {
          notFound: true,
        };
      }

      const distributorId = Number(query.distributorId);

      if (!distributorId || isNaN(distributorId)) {
        return {
          notFound: true,
        };
      }

      store.dispatch(setActiveDistributorId(distributorId));

      return {
        props: {},
      };
    }
);

const DistributorPage: NextPage = () => {
  return (
    <DefaultTemplateV2
      secondaryDrawer={<DistributorsCardGrid />}
      contentHeader={<DistributorContentHeader />}
    >
      <DistributorContent />

      <DistributorEditForm />
    </DefaultTemplateV2>
  );
};

export default DistributorPage;
