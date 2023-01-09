import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
// import { useFetchDistributorsQuery } from "@/api/mocked";
import { selectDashboardActiveFilter } from "@/store/appSlice";
// import { DistributorsPayload } from "@/types/supplier";
import { ConsumerUnitsPayload } from "@/types/consumerUnit";
// import DistributorCard from "@/components/Distributor/Card";
import ConsumerUnitCard from "@/components/ConsumerUnit/CardV2";
import { useFetchConsumerUnitsQuery } from "@/api";
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const DashboardCardGrid = () => {
  const { data: session } = useSession();

  // const { data: distributorsData } = useFetchDistributorsQuery();
  const { data: consumerUnitsData } = useFetchConsumerUnitsQuery(
    session?.user.universityId ?? skipToken
  );

  const activeFilter = useSelector(selectDashboardActiveFilter);

  // const [distributors, setDistributors] = useState<DistributorsPayload>([]);
  const [consumerUnits, setConsumerUnits] = useState<ConsumerUnitsPayload>([]);

  // useEffect(() => {
  //   if (!distributorsData) {
  //     return;
  //   }

  //   setDistributors(
  //     distributorsData.filter(({ hasPendencies }) => hasPendencies)
  //   );
  // }, [distributorsData]);

  useEffect(() => {
    if (!consumerUnitsData) {
      return;
    }

    const filteredConsumerUnits = [];

    switch (activeFilter) {
      case "all":
        filteredConsumerUnits.push(...consumerUnitsData);
        break;

      case "active":
        const activeConsumerUnits = consumerUnitsData.filter(
          ({ isActive }) => isActive
        );
        filteredConsumerUnits.push(...activeConsumerUnits);
        break;

      case "pending":
        const pendingConsumerUnits = consumerUnitsData.filter(
          ({ pendingEnergyBillsNumber }) => pendingEnergyBillsNumber > 0
        );
        filteredConsumerUnits.push(...pendingConsumerUnits);
        break;
    }

    const sortedConsumerUnits = filteredConsumerUnits
      .sort(({ isFavorite }) => (isFavorite ? -1 : 1)) // favorites first
      .sort(({ isActive }) => (isActive ? -1 : 1)); // disabled last

    setConsumerUnits(sortedConsumerUnits);
  }, [activeFilter, consumerUnitsData]);

  return (
    <Grid container spacing={5} py={3}>
      {/* {distributors?.map((card) => (
        <Grid
          key={card.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display="flex"
          justifyContent="center"
        >
          <DistributorCard
            disabled={card.disabled}
            id={card.id}
            hasPendencies={card.hasPendencies}
            title={card.title}
          />
        </Grid>
      ))} */}

      {consumerUnits?.map((card) => (
        <Grid
          key={card.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display="flex"
          justifyContent="center"
        >
          <ConsumerUnitCard
            isActive={card.isActive}
            isFavorite={card.isFavorite}
            id={card.id}
            pendingEnergyBillsNumber={card.pendingEnergyBillsNumber}
            isCurrentEnergyBillFilled={card.isCurrentEnergyBillFilled}
            name={card.name}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCardGrid;
