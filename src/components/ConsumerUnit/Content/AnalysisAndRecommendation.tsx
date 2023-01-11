import { Box, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useRecommendationQuery, useRecommendationSettingsQuery } from "@/api";

import format from "date-fns/format";

import { PlotBaseCostComparison } from "@/templates/Analysis/PlotBaseCostComparison";
import { PlotMeasuredConsumption } from "@/templates/Analysis/PlotMeasuredConsumption";
import { PlotMeasuredDemand } from "@/templates/Analysis/PlotMeasuredDemand";
import { CardRecommendation } from "@/templates/Analysis/CardRecommendation";

export const AnalysisAndRecommendation = () => {
  const consumerUnitId = 1;
  const { data: recommendation } = useRecommendationQuery(consumerUnitId);
  // FIXME: essa query causa 8 renderizações do componente AnalysisAndRecommendation!!!
  const { data: recommendationSettings } = useRecommendationSettingsQuery();

  const dates = recommendation?.plotConsumptionHistory.date.map((d) => {
    const date = new Date(d);
    const formatted = format(date, "MMM'-'yyyy");
    const [month, year] = formatted.split("-");
    return [month, year];
  }) as string[][];

  const hasErrors = !!recommendation && recommendation.errors.length > 0;
  const minimumPercentageForContractRenovation =
    recommendationSettings?.MINIMUM_PERCENTAGE_DIFFERENCE_FOR_CONTRACT_RENOVATION ??
    0;
  const idealEnergyBillsForRecommendation =
    recommendationSettings?.IDEAL_ENERGY_BILLS_FOR_RECOMMENDATION ?? 0;

  return (
    <Box>
      {hasErrors && (
        <Grid container spacing={1} sx={{ my: 2 }}>
          {recommendation.errors.map((error, i) => (
            <Grid key={i} item xs={12}>
              <Alert key={i} severity="warning">
                {error}
              </Alert>
            </Grid>
          ))}
        </Grid>
      )}

      {!!recommendation &&
        recommendation.energyBillsCount < idealEnergyBillsForRecommendation && (
          <>
            <Grid container>
              <Grid item>
                <Alert variant="outlined" severity="info">
                  Lance todas as faturas dos últimos 12 meses para aumentar a
                  precisão da análise. Foram lançadas apenas{" "}
                  {recommendation.energyBillsCount} faturas.
                </Alert>
              </Grid>
            </Grid>
            <br />
          </>
        )}

      <Grid
        direction="row"
        container
        spacing={2}
        alignItems="stretch"
        justifyContent="center"
      >
        <Grid item xs={6}>
          <CardRecommendation
            recommendation={recommendation}
            hasErrors={hasErrors}
            minimumPercentageForContractRenovation={
              minimumPercentageForContractRenovation
            }
          />
        </Grid>

        <Grid item xs={6}>
          <PlotBaseCostComparison
            dates={dates}
            recommendation={recommendation}
            hasErrors={hasErrors}
          />
        </Grid>

        <Grid item xs={6}>
          <PlotMeasuredConsumption
            dates={dates}
            recommendation={recommendation}
          />
        </Grid>
        <Grid item xs={6}>
          <PlotMeasuredDemand dates={dates} recommendation={recommendation} />
        </Grid>
      </Grid>
    </Box>
  );
};
