import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useFetchConsumerUnitsQuery, useFetchDistributorsQuery } from "@/api/mocked";
import { selectDashboardActiveFilter } from "@/store/appSlice";
import { DistributorsPayload } from "@/types/supplier";
import { ConsumerUnitsPayload } from "@/types/consumerUnit";
import DistributorCard from "@/components/Distributor/Card";
import ConsumerUnitCard from "@/components/ConsumerUnit/CardV2";

const DashboardCardGrid = () => {
  const { data: distributorsData } = useFetchDistributorsQuery();
  const { data: consumerUnitsData } = useFetchConsumerUnitsQuery();

  const activeFilter = useSelector(selectDashboardActiveFilter);

  const [distributors, setDistributors] = useState<DistributorsPayload>([]);
  const [consumerUnits, setConsumerUnits] = useState<ConsumerUnitsPayload>([]);

  useEffect(() => {
    if (!distributorsData) {
      return;
    }

    setDistributors(
      distributorsData.filter(({ hasPendencies }) => hasPendencies)
    );
  }, [distributorsData]);

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
          ({ disabled }) => !disabled
        );
        filteredConsumerUnits.push(...activeConsumerUnits);
        break;

      case "pending":
        const pendingConsumerUnits = consumerUnitsData.filter(
          ({ pendenciesCount }) => pendenciesCount > 0
        );
        filteredConsumerUnits.push(...pendingConsumerUnits);
        break;
    }

    const sortedConsumerUnits = filteredConsumerUnits
      .sort(({ favorite }) => (favorite ? -1 : 1)) // favorites first
      .sort(({ disabled }) => (disabled ? 1 : -1)); // disabled last

    setConsumerUnits(sortedConsumerUnits);
  }, [activeFilter, consumerUnitsData]);

  return (
    <Grid container spacing={5} py={3}>
      {distributors?.map((card) => (
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
      ))}

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
            disabled={card.disabled}
            favorite={card.favorite}
            id={card.id}
            pendenciesCount={card.pendenciesCount}
            postedCurrentInvoice={card.postedCurrentInvoice}
            title={card.title}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCardGrid;
