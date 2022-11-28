import { ComponentType } from "react";
import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
} from "@mui/material";

interface DrawerListItemProps {
  open: boolean;
  text: string;
  Icon: ComponentType<SvgIconProps>;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

const DrawerListItem = ({
  open,
  text,
  Icon,
  active,
  href,
  onClick,
}: DrawerListItemProps) => (
  <ListItem disablePadding sx={{ display: "block", p: 1 }}>
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 1.5,
      }}
      selected={active}
      onClick={onClick}
      {...(href && { href, LinkComponent: Link })}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        <Icon color={active ? "primary" : "inherit"} />
      </ListItemIcon>

      <ListItemText
        sx={{
          whiteSpace: "normal",
          opacity: open ? 1 : 0,
        }}
        primary={text}
        primaryTypographyProps={{
          color: active ? "primary" : "inherit",
        }}
      />
    </ListItemButton>
  </ListItem>
);

export default DrawerListItem;
