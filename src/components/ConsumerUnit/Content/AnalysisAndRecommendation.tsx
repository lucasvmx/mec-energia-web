import { Box, Grid, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useRecommendationQuery, useRecommendationSettingsQuery } from "@/api";

import format from "date-fns/format";

import { PlotBaseCostComparison } from "@/templates/Analysis/PlotBaseCostComparison";
import { PlotMeasuredConsumption } from "@/templates/Analysis/PlotMeasuredConsumption";
import { PlotMeasuredDemand } from "@/templates/Analysis/PlotMeasuredDemand";
import { CardRecommendation } from "@/templates/Analysis/CardRecommendation";
import { selectActiveConsumerUnitId } from "@/store/appSlice";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const AnalysisAndRecommendation = () => {
  const consumerUnitId = useSelector(selectActiveConsumerUnitId);
  const { data: recommendation, isLoading } = useRecommendationQuery(
    consumerUnitId ?? skipToken
  );
  const { data: recommendationSettings } = useRecommendationSettingsQuery();

  if (isLoading || !recommendation || !recommendationSettings)
    return (
      <Box>
        <Grid container>
          <Grid item>
            <Typography sx={{ color: "gray" }}>Carregando...</Typography>
          </Grid>
        </Grid>
      </Box>
    );

  const dates = recommendation.plotConsumptionHistory.date.map((d) => {
    const formatted = format(parseISO(d), "MMMM'-'yyyy", { locale: ptBR });
    const [month, year] = formatted.split("-");
    // MMM retorna o nome do mês com todas as letras em minúsculo. Capitalize
    // a 1ª letra:
    const monthFirstLetter = month[0].toUpperCase();
    return [monthFirstLetter + month.slice(1, 3), year];
  }) as string[][];

  const hasErrors = !!recommendation && recommendation.errors.length > 0;

  const {
    IDEAL_ENERGY_BILLS_FOR_RECOMMENDATION,
    MINIMUM_PERCENTAGE_DIFFERENCE_FOR_CONTRACT_RENOVATION,
  } = recommendationSettings;

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

      {recommendation.energyBillsCount <
        IDEAL_ENERGY_BILLS_FOR_RECOMMENDATION &&
        !hasErrors && (
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
        container
        spacing={2}
        direction="row"
        alignItems="stretch"
        justifyContent="center"
      >
        <Grid item xs={6}>
          <CardRecommendation
            recommendation={recommendation}
            hasErrors={hasErrors}
            minimumPercentageForContractRenovation={
              MINIMUM_PERCENTAGE_DIFFERENCE_FOR_CONTRACT_RENOVATION
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
