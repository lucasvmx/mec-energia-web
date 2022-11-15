import DistributorProps from "../types/distributor";

export const mockedDistributor: Array<DistributorProps> = [
  {
    id: 1,
    title: "CEMIG",
    cnpj: "07.523.555/0001-67",
    disabled: false,
    linkedUC: ['Campos Planaltina'],
    tariffs: [
      {
        subgroup: 4,
        start: "21/10/2020",
        end: "21/11/2021",
        overdue: true,
      }
    ]
  },
  {
    id: 2,
    title: "Enel",
    cnpj: "07.523.555/0001-61",
    disabled: false,
    linkedUC: [],
    tariffs:[]
  },
  {
    id: 3,
    title: "Neoenergia",
    cnpj: "07.523.555/0001-62",
    disabled: false,
    linkedUC: ['Fazenda Agua Limpa'],
    tariffs: [
      {
        subgroup: 4,
        start: "22/09/2021",
        end: "22/10/2022",
        overdue: false,
      },
      {
        subgroup: 3,
        start: "16/03/2021",
        end: "16/03/2022",
        overdue: true,
      }
    ],
  },
  {
    id: 4,
    title: "CEB",
    cnpj: "07.523.555/0001-63",
    disabled: true,
    linkedUC: ['Estação meteorológica'],
    tariffs:[]
  },
];