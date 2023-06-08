import "./App.css";

import { createStyles, Container } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

import { RouteList } from "@common/route";
import { Orders, Dashboard } from "@pages/index";

const useStyles = createStyles({
  container: {
    height: "100%",
    // backgroundColor: 'gray',
  },
});

function App() {
  const { classes } = useStyles();
  return (
    <Container className={classes.container} fluid>
      <Routes>
        <Route path={RouteList.DASHBOARD} element={<Dashboard />} />
        <Route path={RouteList.ORDERS} element={<Orders />} />
      </Routes>
    </Container>
  );
}

export default App;
