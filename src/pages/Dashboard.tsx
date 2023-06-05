import { Container, Grid, createStyles, rem } from '@mantine/core';

import { DailyOrdersChart } from '@components/dashboard/DailyOrdersChart';
import { DailyRevenueChart } from '@components/dashboard/DailyRevenueChart';
import { NewCustomersChart } from '@components/dashboard/NewCustomersChart';

const DashboardContainer = Container;
const ChartsContainer = Container;

const useStyles = createStyles({
  dashboardContainer: {
    paddingTop: rem(1),
    height: rem('100%'),
  },
  chartsContainer: {
    height: rem('40%'),
  },
  chartsGrid: {
    height: rem('100%'),
  },
});

export const Dashboard = () => {
  const { classes } = useStyles();

  return (
    <DashboardContainer fluid className={classes.dashboardContainer}>
      <ChartsContainer fluid className={classes.chartsContainer}>
        <Grid className={classes.chartsGrid}>
          <Grid.Col span={4}>
            <DailyRevenueChart />
          </Grid.Col>
          <Grid.Col span={4}>
            <DailyOrdersChart />
          </Grid.Col>
          <Grid.Col span={4}>
            <NewCustomersChart />
          </Grid.Col>
        </Grid>
      </ChartsContainer>
    </DashboardContainer>
  );
};
