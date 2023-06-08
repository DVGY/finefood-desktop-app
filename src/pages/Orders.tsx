import { Container, createStyles } from "@mantine/core";

import { OrderDataTable } from "@components/orders";

const OrdersContainer = Container;

const useStyles = createStyles(() => ({
  ordersContainer: {},
}));

export const Orders = () => {
  const { classes } = useStyles();

  return (
    <OrdersContainer fluid className={classes.ordersContainer}>
      <OrderDataTable />
    </OrdersContainer>
  );
};
