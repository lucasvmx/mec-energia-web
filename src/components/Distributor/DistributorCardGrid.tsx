import { Box, Container, Grid } from "@mui/material";
import ConsumerUnitCard from "../ConsumerUnit/Card";
import { useRouter } from "next/router";
import DistributorCard from "./DistributorCard";
import DistributorProps from "../../types/distributor";
import { mockedDistributor } from "../../mocks/mockedDistributor";

const DistributorCardGrid = () => {
  return (
    // Can't use Grid componente https://github.com/mui/material-ui/issues/34605
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      gap={2}
    >
      {mockedDistributor.map((distributor) => (
        <DistributorCard
          key={distributor.id}
          id={distributor.id}
          title={distributor.title}
          disabled={distributor.disabled}
          linkedUC={distributor.linkedUC}
          tariffs={distributor.tariffs}
        />
      ))}
    </Box>
  );
};

export default DistributorCardGrid;