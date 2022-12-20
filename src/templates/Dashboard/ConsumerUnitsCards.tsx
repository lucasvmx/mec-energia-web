import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchConsumerUnitsQuery } from "@/api";
import { selectDashboardActiveFilter } from "@/store/appSlice";
import { ConsumerUnitsPayload } from "@/types/consumerUnit";
import ConsumerUnitCard from "@/components/ConsumerUnit/Card";

const DashboardConsumerUnitsCards = () => {
  const { data } = useFetchConsumerUnitsQuery();
  const activeFilter = useSelector(selectDashboardActiveFilter);
  const [consumerUnits, setConsumerUnits] = useState<ConsumerUnitsPayload>([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const filteredConsumerUnits = [];

    switch (activeFilter) {
      case "all":
        filteredConsumerUnits.push(...data);
        break;

      case "active":
        const activeConsumerUnits = data.filter(({ disabled }) => !disabled);
        filteredConsumerUnits.push(...activeConsumerUnits);
        break;

      case "pending":
        const pendingConsumerUnits = data.filter(
          ({ pendenciesCount }) => pendenciesCount > 0
        );
        filteredConsumerUnits.push(...pendingConsumerUnits);
        break;
    }

    const sortedConsumerUnits = filteredConsumerUnits
      .sort(({ favorite }) => (favorite ? -1 : 1)) // favorites first
      .sort(({ disabled }) => (disabled ? 1 : -1)); // disabled last

    setConsumerUnits(sortedConsumerUnits);
  }, [activeFilter, data]);

  return (
    <>
      {consumerUnits?.map((card) => (
        <ConsumerUnitCard
          disabled={card.disabled}
          favorite={card.favorite}
          id={card.id}
          pendenciesCount={card.pendenciesCount}
          postedCurrentInvoice={card.postedCurrentInvoice}
          title={card.title}
          key={card.id}
        />
      ))}
    </>
  );
};

export default DashboardConsumerUnitsCards;
