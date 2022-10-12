import { Container, styled, Toolbar, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConsumerUnitCardGrid from "../components/ConsumerUnitCardGrid";
import Drawer, { drawerWidth } from "../components/Drawer";
import Header from "../components/Header";
import { selectIsDrawerOpen, setIsDrawerOpen } from "../store/appSlice";
import theme from "../theme";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "isDrawerOpen" && prop !== "isDesktop",
})<{
  isDrawerOpen?: boolean;
  isDesktop?: boolean;
}>(({ theme, isDrawerOpen, isDesktop }) => {
  return {
    flexGrow: 1,
    overflowY: "visible",
    padding: theme.spacing(3),
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

const DefaultTemplate = () => {
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
    <>
      <Header />

      <Drawer />

      <Main isDrawerOpen={isDrawerOpen} isDesktop={isDesktop}>
        <Container disableGutters>
          <ConsumerUnitCardGrid />
        </Container>
      </Main>
    </>
  );
};

export default DefaultTemplate;
