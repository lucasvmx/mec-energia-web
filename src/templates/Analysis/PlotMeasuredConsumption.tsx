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

export const PlotMeasuredConsumption = ({ dates, recommendation }: Props) => {
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
      n === null ? 120_000 : null
    ) as number[];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Consumo medido</Typography>
        <Typography variant="body2">Últimos 12 meses</Typography>

        <Chart
          type="line"
          datasetIdKey="measured-consumption"
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
                type: "line" as const,
                label: "Fora ponta",
                data: recommendation?.plotConsumptionHistory
                  .offPeakConsumptionInKwh,
                backgroundColor: "#0E438C",
                borderColor: "#0E438C",
                pointStyle: "circle",
                pointRadius: 5,
                pointHoverRadius: 9,
              },
              {
                type: "line" as const,
                label: "Ponta",
                data: recommendation?.plotConsumptionHistory
                  .peakConsumptionInKwh,
                backgroundColor: "#296DCC",
                borderColor: "#296DCC",
                pointStyle: "triangle",
                pointRadius: 7,
                pointHoverRadius: 11,
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
