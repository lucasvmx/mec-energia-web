import { ComponentType, ReactNode } from "react";

import {
  Badge,
  BadgeProps,
  Box,
  IconButton,
  SvgIconProps,
  Typography,
  useTheme,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

import { CardWrapperProps } from "@/types/app";
import CardWrapper from "@/components/Card/CardWrapper";

interface CardProps extends CardWrapperProps {
  title: string;
  favorite?: boolean;
  BackgroundIcon?: ComponentType<SvgIconProps>;
  action: ReactNode;
  ActionIcon?: ComponentType<SvgIconProps>;
  actionIconBadgeContent?: BadgeProps["badgeContent"];
}

const Card = ({
  title,
  selected,
  dense,
  variant,
  favorite,
  // BackgroundIcon,
  action,
  ActionIcon,
  actionIconBadgeContent,
}: CardProps) => {
  const theme = useTheme();
  const isActive = variant !== "disabled";
  const isWarning = variant === "warning";
  const canFavorite = favorite !== undefined;
  const shouldShowFavoriteIconButton = canFavorite && isActive;

  const shouldShowActionIconButton = ActionIcon && !dense && isActive;

  return (
    <CardWrapper selected={selected} dense={dense} variant={variant}>
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
              {favorite ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}
            </IconButton>
          )}
        </Box>

        <Box display="flex" flexDirection="column" justifyContent="end">
          <Box mb={1.5}>
            <Typography fontWeight={400} fontSize="20px" lineHeight="24px">
              {title}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="end"
            {...(!dense && { minHeight: "30.75px" })}
          >
            {action}

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