/* eslint-disable @typescript-eslint/ban-ts-comment */

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Recommendation } from "@/types/recommendation";
import { Box, Link, Typography } from "@mui/material";

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
  BarController,
  LineController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useState } from "react";
import { BaseCostInfoModal } from "@/components/BaseCostInfoModal";

interface Props {
  dates: string[][];
  hasErrors: boolean;
  recommendation: Recommendation;
}

export const PlotBaseCostComparison = ({
  dates,
  hasErrors,
  recommendation,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  ChartJS.register(
    CategoryScale,
    ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    BarController,
    LineController,
    Tooltip,
    Legend
  );

  const moneyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // FIXME: deve ser investigado pq esse valor pode vir menor que zero
  const nominalSavings = Math.max(
    0,
    recommendation.costsPercentageDifference * 100
  );

  const KnowMore = () => (
    <>
      {/* FIXME: tá certo colorir assim? */}
      <Typography sx={{ color: "gray" }} variant="body2">
        *O custo-base é sempre menor que do valor da fatura,{" "}
        <Link
          sx={{ textTransform: "lowercase", cursor: "pointer" }}
          onClick={() => setIsModalOpen(true)}
          variant="button"
        >
          saiba mais
        </Link>
      </Typography>

      <BaseCostInfoModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );

  if (hasErrors)
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            Comparativo custo-base
          </Typography>

          <Typography sx={{ color: "gray" }}>Indisponível</Typography>

          <KnowMore />
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Comparativo custo-base</Typography>

        <Typography sx={{ color: "gray" }} variant="body2">
          Últimos 12 meses
        </Typography>

        <Chart
          type="bar"
          data={{
            labels: dates,
            datasets: [
              {
                label: "Custo-base atual",
                data: recommendation?.plotCurrentVsEstimatedCosts
                  .totalCostInReaisInCurrent,
                backgroundColor: "#0A5C67",
                pointStyle: "rect",
                stack: "Atual",
              },
              {
                label: "Custo-base proposto",
                data: recommendation?.plotCurrentVsEstimatedCosts
                  .totalCostInReaisInRecommended,
                backgroundColor: "#FB736C",
                pointStyle: "circle",
                stack: "Proposto",
              },
            ],
          }}
          options={{
            responsive: true,
            interaction: {
              intersect: false,
              mode: "nearest",
              axis: "x",
            },
            plugins: {
              title: {
                display: true,
                text: "Custo-base: atual x proposto",
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
                    let title = context[0].label || "";
                    title = title.replace(",", "/");
                    if (context[0].parsed.y == null) {
                      title += " - Indisponível";
                    }
                    return title;
                  },
                  // @ts-ignore
                  label: function (context) {
                    if (context.parsed.y == null) {
                      return null;
                    } else {
                      let label = context.dataset.label || "";
                      label +=
                        ": " +
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(context.parsed.y);
                      return label;
                    }
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
                  text: "R$",
                },
                grid: {
                  color: "#C3C3C3",
                },
              },
            },
          }}
        />

        <br />
        <Typography>
          Total atual:{" "}
          {moneyFormatter.format(
            recommendation.plotCurrentVsEstimatedCosts
              .totalTotalCostInReaisInCurrent
          )}
        </Typography>

        <Box>
          <Typography sx={{ display: "inline", marginRight: 0.5 }}>
            Total proposto:{" "}
            {moneyFormatter.format(
              recommendation.plotCurrentVsEstimatedCosts
                .totalTotalCostInReaisInRecommended
            )}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              bgcolor: "warning.main",
              p: 0.5,
              borderRadius: 1,
              display: "inline",
            }}
          >
            {nominalSavings}% de economia nominal
          </Typography>
        </Box>

        <br />
        <KnowMore />
      </CardContent>
    </Card>
  );
};
