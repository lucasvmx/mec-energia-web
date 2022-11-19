import { PersonAddAlt1 } from "@mui/icons-material";
import { DistributorConsumerUnits, DistributorPropsTariffs } from "../types/distributor";

export const mockedDistributor: Array<DistributorPropsTariffs> = [
  {
    id: 1,
    name: "CEMIG",
    cnpj: "07.523.555/0001-67",
    disabled: false,
    consumer_units: 10,
    tariffs: [
      {
        start_date: "2022-11-18",
        end_date: "2022-11-18",
        subgroup: "A4",
        overdue: true,
        blue: {
          peak_tusd_in_reais_per_kw: 0,
          peak_tusd_in_reais_per_mwh: 0,
          peak_te_in_reais_per_mwh: 0,
          off_peak_tusd_in_reais_per_kw: 0,
          off_peak_tusd_in_reais_per_mwh: 0,
          off_peak_te_in_reais_per_mwh: 0
        },
        green: {
          peak_tusd_in_reais_per_mwh: 0,
          peak_te_in_reais_per_mwh: 0,
          off_peak_tusd_in_reais_per_mwh: 0,
          off_peak_te_in_reais_per_mwh: 0,
          na_tusd_in_reais_per_kw: 0
        }
      }
    ]
  },
  {
    id: 2,
    name: "Enel",
    cnpj: "07.523.555/0001-61",
    disabled: false,
    consumer_units:0,
    tariffs:[]
  },
  {
    id: 3,
    name: "Neoenergia",
    cnpj: "07.523.555/0001-62",
    disabled: false,
    consumer_units:4,
    tariffs: [
      {
        start_date: "2022-11-18",
        end_date: "2022-11-18",
        subgroup: "A4",
        overdue: false,
        blue: {
          peak_tusd_in_reais_per_kw: 0,
          peak_tusd_in_reais_per_mwh: 0,
          peak_te_in_reais_per_mwh: 0,
          off_peak_tusd_in_reais_per_kw: 0,
          off_peak_tusd_in_reais_per_mwh: 0,
          off_peak_te_in_reais_per_mwh: 0
        },
        green: {
          peak_tusd_in_reais_per_mwh: 0,
          peak_te_in_reais_per_mwh: 0,
          off_peak_tusd_in_reais_per_mwh: 0,
          off_peak_te_in_reais_per_mwh: 0,
          na_tusd_in_reais_per_kw: 0
        }
      },
      {
        start_date: "2022-11-18",
        end_date: "2022-11-18",
        subgroup: "A3",
        overdue: true,
        blue: {
          peak_tusd_in_reais_per_kw: 0,
          peak_tusd_in_reais_per_mwh: 0,
          peak_te_in_reais_per_mwh: 0,
          off_peak_tusd_in_reais_per_kw: 0,
          off_peak_tusd_in_reais_per_mwh: 0,
          off_peak_te_in_reais_per_mwh: 0
        },
        green: {
          peak_tusd_in_reais_per_mwh: 0,
          peak_te_in_reais_per_mwh: 0,
          off_peak_tusd_in_reais_per_mwh: 0,
          off_peak_te_in_reais_per_mwh: 0,
          na_tusd_in_reais_per_kw: 0
        }
      }
    ],
  },
  {
    id: 4,
    name: "CEB",
    cnpj: "07.523.555/0001-63",
    disabled: true,
    consumer_units:2,
    tariffs:[]
  },
];


export const mockedDistributorComsumerUnit: Array<DistributorConsumerUnits> = [
  {
    "id": 1,
    "subgroups": [
       {
        "subgroup": "A3",
        "consumer_units":[
          {
           "name": "Unid Con 1",
            "id": 1,
           },
           {
            "name": "Unid Con 2",
            "id": 2,
            }, 
          ]
        },
     ],
  },

  {
    "id": 2,
    "subgroups": [
       {
        "subgroup": "A3",
        "consumer_units":[
          {
           "name": "Unid Con 1",
            "id": 1,
           },
           {
            "name": "Unid Con 2",
            "id": 2,
            }, 
          ]
        },
     ],
  },
  {
    "id": 3,
    "subgroups": [
       {
        "subgroup": "A4",
        "consumer_units":[
          {
           "name": "Unid Con 1",
            "id": 1,
           },
           {
            "name": "Unid Con 2",
            "id": 2,
            }, 
          ]
        },
     ],
  },
  {
    "id": 4,
    "subgroups": [
       {
        "subgroup": "A3",
        "consumer_units":[
          {
           "name": "Unid Con 1",
            "id": 1,
           },
           {
            "name": "Unid Con 2",
            "id": 2,
            }, 
          ]
        },
     ],
  },
]