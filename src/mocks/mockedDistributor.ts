import {
  DistributorConsumerUnits,
  DistributorPropsTariffs,
} from "../types/distributor";

export const mockedDistributor: Array<DistributorPropsTariffs> = [
  {
    id: 1,
    name: "CEMIG",
    cnpj: "07.523.555/0001-67",
    is_active: true,
    consumer_units: 1,
    tariffs: [
      {
        start_date: "",
        end_date: "",
        subgroup: "A4",
        overdue: true,
        blue: {
          peak_tusd_in_reais_per_kw: 0,
          peak_tusd_in_reais_per_mwh: 0,
          peak_te_in_reais_per_mwh: 0,
          off_peak_tusd_in_reais_per_kw: 0,
          off_peak_tusd_in_reais_per_mwh: 0,
          off_peak_te_in_reais_per_mwh: 0,
        },
        green: {
          peak_tusd_in_reais_per_mwh: 0,
          peak_te_in_reais_per_mwh: 0,
          off_peak_tusd_in_reais_per_mwh: 0,
          off_peak_te_in_reais_per_mwh: 0,
          na_tusd_in_reais_per_kw: 0,
        },
      },
    ],
  },
  {
    id: 2,
    name: "Enel",
    cnpj: "07.523.555/0001-61",
    is_active: true,
    consumer_units: 0,
    tariffs: [],
  },
  {
    id: 3,
    name: "Neoenergia",
    cnpj: "07.523.555/0001-62",
    is_active: true,
    consumer_units: 4,
    tariffs: [
      {
        start_date: "2022-11-18",
        end_date: "2022-11-18",
        subgroup: "A4",
        overdue: false,
        blue: {
          peak_tusd_in_reais_per_kw: 90.45,
          peak_tusd_in_reais_per_mwh: 100.67,
          peak_te_in_reais_per_mwh: 22.9,
          off_peak_tusd_in_reais_per_kw: 1.2,
          off_peak_tusd_in_reais_per_mwh: 99.55,
          off_peak_te_in_reais_per_mwh: 34.97,
        },
        green: {
          peak_tusd_in_reais_per_mwh: 76.65,
          peak_te_in_reais_per_mwh: 22.88,
          off_peak_tusd_in_reais_per_mwh: 66.22,
          off_peak_te_in_reais_per_mwh: 44.77,
          na_tusd_in_reais_per_kw: 33.44,
        },
      },
      {
        start_date: "2020-08-18",
        end_date: "2021-09-18",
        subgroup: "A3",
        overdue: true,
        blue: {
          peak_tusd_in_reais_per_kw: 0,
          peak_tusd_in_reais_per_mwh: 0,
          peak_te_in_reais_per_mwh: 0,
          off_peak_tusd_in_reais_per_kw: 0,
          off_peak_tusd_in_reais_per_mwh: 0,
          off_peak_te_in_reais_per_mwh: 0,
        },
        green: {
          peak_tusd_in_reais_per_mwh: 0,
          peak_te_in_reais_per_mwh: 0,
          off_peak_tusd_in_reais_per_mwh: 0,
          off_peak_te_in_reais_per_mwh: 0,
          na_tusd_in_reais_per_kw: 0,
        },
      },
    ],
  },
  {
    id: 4,
    name: "CEB",
    cnpj: "07.523.555/0001-63",
    is_active: false,
    consumer_units: 2,
    tariffs: [],
  },
];

export const mockedDistributorComsumerUnit: Array<DistributorConsumerUnits> = [
  {
    id: 1,
    subgroups: [
      {
        subgroup: "A3",
        consumer_units: [
          {
            name: "Unid Con 1",
            id: 1,
          },
          {
            name: "Unid Con 2",
            id: 2,
          },
        ],
      },
    ],
  },

  {
    id: 2,
    subgroups: [
      {
        subgroup: "A3",
        consumer_units: [
          {
            name: "Unid Con 3",
            id: 1,
          },
          {
            name: "Unid Con 4",
            id: 2,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    subgroups: [
      {
        subgroup: "A4",
        consumer_units: [
          {
            name: "Unid Con 5",
            id: 1,
          },
          {
            name: "Unid Con 6",
            id: 2,
          },
        ],
      },
      {
        subgroup: "A3",
        consumer_units: [
          {
            name: "Unid Con 10",
            id: 1,
          },
          {
            name: "Unid Con 20",
            id: 2,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    subgroups: [
      {
        subgroup: "A3",
        consumer_units: [
          {
            name: "Unid Con 7",
            id: 1,
          },
          {
            name: "Unid Con 8",
            id: 2,
          },
        ],
      },
    ],
  },
];
