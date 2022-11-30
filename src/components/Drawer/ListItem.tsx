import { ComponentType, ReactNode } from "react";
import NextLink, { LinkProps } from "next/link";
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
  href?: LinkProps["href"];
  onClick?: () => void;
}

interface WrapperLinkProps {
  href?: LinkProps["href"];
  children: ReactNode;
}

const WrapperLink = ({ href, children }: WrapperLinkProps) => {
  if (href) {
    return (
      <NextLink href={href} passHref legacyBehavior>
        {children}
      </NextLink>
    );
  }

  return <>{children}</>;
};

const DrawerListItem = ({
  open,
  text,
  Icon,
  active,
  href,
  onClick,
}: DrawerListItemProps) => {
  return (
    <ListItem disablePadding sx={{ display: "block", p: 1 }}>
      <WrapperLink href={href}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 1.5,
          }}
          selected={active}
          onClick={onClick}
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
      </WrapperLink>
    </ListItem>
  );
};

export default DrawerListItem;
