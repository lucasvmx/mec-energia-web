import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDrawerOpen, setIsDrawerOpen } from "../store/appSlice";
import { Box, styled, useMediaQuery } from "@mui/material";
import theme from "../theme";
import Drawer, { drawerWidth } from "../components/Drawer";
import Header from "../components/Header";

const Main = styled("main", {
  shouldForwardProp: (prop) =>
    prop !== "isDrawerOpen" &&
    prop !== "isDesktop" &&
    prop !== "disableGutters",
})<{
  isDrawerOpen?: boolean;
  isDesktop?: boolean;
  disableGutters?: boolean;
}>(({ theme, isDrawerOpen, isDesktop, disableGutters }) => {
  return {
    height: `calc(100% - ${theme.breakpoints.up("sm") ? "64px" : "56px"})`,
    flexGrow: 1,
    padding: theme.spacing(disableGutters ? 0 : 3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(isDrawerOpen &&
      isDesktop && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
      }),
  };
});

interface DefaultTemplateProps {
  children: ReactNode;
  disableGutters?: boolean;
}

const DefaultTemplate = ({
  children,
  disableGutters,
}: DefaultTemplateProps) => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpen);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    dispatch(setIsDrawerOpen(true));
  }, [isDesktop]);
  return (
    <Box height="100vh">
      <Header />

      <Drawer />

      <Main
        isDrawerOpen={isDrawerOpen}
        isDesktop={isDesktop}
        disableGutters={disableGutters}
      >
        {children}
      </Main>
    </Box>
  );
};

export default DefaultTemplate;
