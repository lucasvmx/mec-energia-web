import { useEffect, useState } from "react";
import { useFetchDistributorsQuery } from "@/api";
import { DistributorsPayload } from "@/types/supplier";
import DistributorCard from "@/components/Distributor/Card";

const DashboardDistributorsCards = () => {
  const { data } = useFetchDistributorsQuery();
  const [distributors, setDistributors] = useState<DistributorsPayload>([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setDistributors(data.filter(({ hasPendencies }) => hasPendencies));
  }, [data]);

  return (
    <>
      {distributors?.map((card) => (
        <DistributorCard
          disabled={card.disabled}
          id={card.id}
          hasPendencies={card.hasPendencies}
          title={card.title}
          key={card.id}
        />
      ))}
    </>
  );
};

export default DashboardDistributorsCards;
