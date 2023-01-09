import { Badge, Box, IconButton, Typography, useTheme } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

import { CardProps } from "@/types/app";
import CardWrapper from "@/components/Card/Wrapper";

const Card = ({
  name,
  selected,
  dense,
  variant,
  isFavorite,
  // TODO BackgroundIcon,
  action,
  ActionIcon,
  actionIconBadgeContent,
  onClick,
}: CardProps) => {
  const theme = useTheme();
  const isActive = variant !== "disabled";
  const isDisabled = variant === "disabled";
  const isWarning = variant === "warning";
  const canFavorite = isFavorite !== undefined;
  const shouldShowFavoriteIconButton = canFavorite && isActive;

  const shouldShowActionIconButton = ActionIcon && !dense && isActive;

  return (
    <CardWrapper
      selected={selected}
      dense={dense}
      variant={variant}
      onClick={onClick}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Box display="flex">
          {shouldShowFavoriteIconButton && (
            <IconButton
              edge="start"
              sx={{
                color: isWarning ? "black" : "primary.main",
                mt: -1.5,
              }}
            >
              {isFavorite ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}
            </IconButton>
          )}
        </Box>

        <Box display="flex" flexDirection="column" justifyContent="end">
          <Box mb={1.5}>
            <Typography fontWeight={400} fontSize="20px" lineHeight="24px">
              {name}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="end"
            {...(!dense && { minHeight: "30.75px" })}
          >
            {isDisabled ? (
              <Typography color="text.secondary">Desativada</Typography>
            ) : (
              action
            )}

            {shouldShowActionIconButton && (
              <Box alignSelf="center">
                <Badge badgeContent={actionIconBadgeContent} color="primary">
                  <ActionIcon
                    sx={{
                      color: isWarning ? "black" : theme.palette.action.active,
                    }}
                  />
                </Badge>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default Card;
