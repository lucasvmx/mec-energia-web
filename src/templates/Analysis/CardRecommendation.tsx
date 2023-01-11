import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Recommendation } from "@/types/recommendation";
import { Box, Grid, Typography } from "@mui/material";

interface Props {
  hasErrors: boolean;
  recommendation: Recommendation | undefined;
  minimumPercentageForContractRenovation: number;
}

const tariffFlags = {
  G: "Verde",
  B: "Azul",
};

export const CardRecommendation = ({
  hasErrors,
  recommendation,
  minimumPercentageForContractRenovation,
}: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          Recomendação
        </Typography>
        {hasErrors && <p>Indisponível</p>}

        <Grid container direction="column" spacing={2}>
          {!!recommendation && recommendation?.shouldRenewContract ? (
            <>
              <Grid item>
                <ColoredText text="Renove o contrato" highlighted />
              </Grid>
              <CardRecommendationItem
                label="Modalidade tarifária"
                current={tariffFlags[recommendation.currentContract.tariffFlag]}
                recommended={
                  tariffFlags[recommendation.recommendedContract.tariffFlag]
                }
              />

              {recommendation.recommendedContract.tariffFlag === "B" ? (
                <>
                  <CardRecommendationItem
                    label="Demanda contratada ponta"
                    current={`${recommendation.currentContract.peakContractedDemandInKw} kW`}
                    recommended={`${recommendation.recommendedContract.peakDemandInKw} kW`}
                  />

                  <CardRecommendationItem
                    label="Demanda contratada fora ponta"
                    current={`${recommendation.currentContract.offPeakContractedDemandInKw} kW`}
                    recommended={`${recommendation.recommendedContract.offPeakDemandInKw} kW`}
                  />
                </>
              ) : (
                <CardRecommendationItem
                  label="Demanda contratada"
                  current={`${recommendation.currentContract.offPeakContractedDemandInKw} kW`}
                  recommended={`${recommendation.recommendedContract.offPeakDemandInKw} kW`}
                />
              )}
            </>
          ) : (
            <>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  sx={{
                    borderRadius: 1,
                    color: "white",
                    bgcolor: "primary.main",
                    p: 1,
                    display: "inline",
                  }}
                >
                  Manutenção do contrato
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  {/* FIXME: esse texto deve estar em uma badge rosa/vermelha */}
                  A alteração de contrato só é recomendada se a economia nominal
                  for igual ou superior a{" "}
                  {minimumPercentageForContractRenovation * 100}
                  %.
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Essa é uma margem de segurança que leva em consideração
                  possíveis mudanças no padrão de uso de energia da instituição,
                  bem como os custos operacionais relacionados ao processo de
                  alteração do contrato.
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

interface ColoredTextProps {
  text: string | undefined;
  highlighted: boolean;
}

const ColoredText = ({ text, highlighted }: ColoredTextProps) => {
  return (
    <Box>
      <Typography
        sx={{
          boxSizing: "initial",
          bgcolor: highlighted ? "warning.main" : "",
          cursor: "auto",
          borderRadius: 1,
          display: "inline",
          p: 0.5,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

interface CardRecommendationItemProps {
  label: string;
  // FIXME: só coloquei como undefined pq vem da API. Tem como mudar isso?
  current: string | undefined;
  recommended: string | undefined;
}

const CardRecommendationItem = ({
  label,
  current,
  recommended,
}: CardRecommendationItemProps) => {
  const areDifferent = current !== recommended;
  return (
    <>
      <Grid item>
        <Box>
          <Typography>{label} </Typography>
        </Box>
        <Box>
          <Grid container spacing={4}>
            <Grid item sx={{ color: "gray" }}>
              {/* FIXME: se é diferente tem que ser striked through */}
              <Typography variant="body2">Atual</Typography>
              <Typography
                sx={{ textDecoration: areDifferent ? "line-through" : "" }}
                variant="body1"
              >
                {current}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Proposto</Typography>
              <ColoredText text={recommended} highlighted={areDifferent} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
