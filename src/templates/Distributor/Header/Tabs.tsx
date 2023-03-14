import {
  Fragment,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { Divider, Tab, Tabs } from "@mui/material";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

import { useGetDistributorSubgroupsQuery } from "@/api";
import {
  selectActiveDistributorId,
  selectActiveSubgroup,
  setActiveSubgroup,
} from "@/store/appSlice";

const getTabLabel = (subgroup: string) => {
  return `Subgrupo ${subgroup}`;
};

const DistributorContentHeaderTabs = () => {
  const dispatch = useDispatch();
  const distributorId = useSelector(selectActiveDistributorId);
  const selectedTariffSubgroup = useSelector(selectActiveSubgroup);

  const { data: tariffsSubgroups } = useGetDistributorSubgroupsQuery(
    distributorId ?? skipToken
  );

  useEffect(() => {
    if (!tariffsSubgroups || tariffsSubgroups.length === 0) {
      dispatch(setActiveSubgroup(null));

      return;
    }

    const firstPendingTariff = tariffsSubgroups.findIndex(
      ({ pending }) => pending
    );

    if (firstPendingTariff >= 0) {
      dispatch(
        setActiveSubgroup(tariffsSubgroups[firstPendingTariff].subgroup)
      );

      return;
    }

    dispatch(setActiveSubgroup(tariffsSubgroups[0].subgroup));
  }, [dispatch, tariffsSubgroups]);

  const selectedTabIndex = useMemo(() => {
    if (!tariffsSubgroups || tariffsSubgroups.length === 0) {
      return false;
    }

    const selectedTariffSubgroupIndex = tariffsSubgroups.findIndex(
      ({ subgroup }) => subgroup === selectedTariffSubgroup
    );

    return selectedTariffSubgroupIndex >= 0 ? selectedTariffSubgroupIndex : 0;
  }, [selectedTariffSubgroup, tariffsSubgroups]);

  const handleTabChange = useCallback(
    (_event: SyntheticEvent, tabIndex: number) => {
      const selectedSubgroup = tariffsSubgroups?.[tabIndex].subgroup ?? null;

      dispatch(setActiveSubgroup(selectedSubgroup));
    },
    [tariffsSubgroups, dispatch]
  );

  return (
    <Fragment>
      <Tabs
        value={selectedTabIndex}
        variant="fullWidth"
        onChange={handleTabChange}
      >
        {tariffsSubgroups?.map(({ subgroup, pending }) => (
          <Tab
            key={subgroup}
            label={getTabLabel(subgroup)}
            iconPosition="start"
            {...(pending && {
              icon: <WarningRoundedIcon color="warning" />,
            })}
          />
        ))}
      </Tabs>

      <Divider />
    </Fragment>
  );
};

export default DistributorContentHeaderTabs;
