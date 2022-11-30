import { Box, Container, Grid } from "@mui/material";
import ConsumerUnitCard from "../ConsumerUnit/Card";
import { useRouter } from "next/router";
import DistributorCard from "./DistributorCard";
import { mockedDistributor } from "../../mocks/mockedDistributor";

const DistributorCardGrid = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      gap={2}
    >
      {mockedDistributor.map((distributor) => (
        <DistributorCard
          key={distributor.id}
          id={distributor.id}
          name={distributor.name}
          is_active={distributor.is_active}
          tariffs={distributor.tariffs}
          consumer_units={distributor.consumer_units}
        />
      ))}
    </Box>
  );
};

export default DistributorCardGrid;