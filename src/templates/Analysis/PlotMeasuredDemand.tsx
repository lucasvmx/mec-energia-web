/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Recommendation } from "@/types/recommendation";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";

interface Props {
  dates: string[][];
  recommendation: Recommendation | undefined;
}

export const PlotMeasuredDemand = ({ dates, recommendation }: Props) => {
  ChartJS.register(
    CategoryScale,
    ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend
  );

  const missingData =
    recommendation?.plotConsumptionHistory.offPeakConsumptionInKwh.map((n) =>
      n === null ? 600 : null
    ) as number[];

  const contractPeakDemands = Array(12).fill(
    recommendation?.currentContract.peakContractedDemandInKw
  );
  const contractOffPeakDemands = Array(12).fill(
    recommendation?.currentContract.offPeakContractedDemandInKw
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Demanda medida</Typography>
        <Typography variant="body2">Últimos 12 meses</Typography>

        <Chart
          type="line"
          datasetIdKey="measured-demand"
          options={{
            aspectRatio: 1,
            responsive: true,
            interaction: {
              intersect: false,
              mode: "nearest",
              axis: "x",
            },
            plugins: {
              title: {
                display: true,
                text: "Consumo medido",
                font: {
                  size: 16,
                },
              },
              legend: {
                position: "top",
                labels: {
                  usePointStyle: true,
                },
              },
              tooltip: {
                usePointStyle: true,
                callbacks: {
                  title: function (context) {
                    const title = context[0].label || "";
                    return title.replace(",", "/");
                  },
                  // @ts-ignore
                  label: function (context) {
                    let label = context.dataset.label || "";

                    if (label == "Indisponível") {
                      if (context.parsed.y == null) {
                        return null;
                      }
                      return "Informações indisponíveis";
                    }
                    if (label) {
                      label = "Consumo " + label + ": ";
                    }
                    if (context.parsed.y !== null) {
                      label +=
                        new Intl.NumberFormat("pt-BR").format(
                          context.parsed.y
                        ) + " kWh";
                    }

                    return label;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  maxRotation: 0,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "kWh",
                },
                grid: {
                  color: "#C3C3C3",
                },
              },
            },
            datasets: {
              bar: {
                barPercentage: 1.2,
              },
            },
          }}
          data={{
            labels: dates,
            datasets: [
              {
                label: "Med. Fora Ponta",
                data: recommendation?.plotConsumptionHistory
                  .offPeakMeasuredDemandInKw,
                backgroundColor: "#0E438C",
                borderColor: "#0E438C",
                pointStyle: "circle",
                pointRadius: 5,
                pointHoverRadius: 9,
                type: "line" as const,
              },
              {
                label: "Med. Fora Ponta",
                data: recommendation?.plotConsumptionHistory
                  .peakMeasuredDemandInKw,
                backgroundColor: "#296DCC",
                borderColor: "#296DCC",
                pointStyle: "triangle",
                pointRadius: 7,
                pointHoverRadius: 11,
                type: "line" as const,
              },
              {
                label: "Contrat. Fora Ponta",
                data: contractPeakDemands,
                backgroundColor: "#CC443D",
                borderColor: "#CC443D",
                pointStyle: "rect",
                pointRadius: 4,
                pointHoverRadius: 7,
              },
              {
                label: "Contrat. Ponta",
                data: contractOffPeakDemands,
                backgroundColor: "#FB736C",
                borderColor: "#FB736C",
                pointStyle: "rectRot",
                pointRadius: 4,
                pointHoverRadius: 7,
              },
              {
                label: "Indisponível",
                data: missingData,
                type: "bar" as const,
                backgroundColor: "#F5F5F5",
                borderColor: "#C3C3C3",
                borderWidth: 1,
                pointStyle: "star",
                // FIXME: Essa propriedade cria um segundo eixo Y
                // yAxisID: "y-axis-3",
              },
            ],
          }}
        />
      </CardContent>
    </Card>
  );
};
