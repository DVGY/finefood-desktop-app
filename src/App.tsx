import { createStyles, Container } from '@mantine/core';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { RouteList } from './common/route/routeList';
import { Orders } from './pages/Orders';

const useStyles = createStyles({
  container: {
    height: '100%',
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
