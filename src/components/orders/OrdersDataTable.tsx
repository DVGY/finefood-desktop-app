import { useState, CSSProperties } from "react";

import { MantineTheme, Skeleton, rem, useMantineTheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";

import { ApiError } from "@common/components/error";
import {
  QueryStringParams,
  getFormattedQueryStringParams,
} from "@common/react-query/utils";
import { ResourceList } from "@common/route";

import { IOrdersResponse, Status } from "./types";

type TStatusStyles = { [x in Status]: CSSProperties };

const statusStyles = (theme: MantineTheme, status: Status) => {
  const mapStyles: TStatusStyles = {
    [Status.Delivered]: {
      backgroundColor: theme.colors.green[5],
      fontWeight: "bold",
    },
    [Status.OnTheWay]: {
      backgroundColor: theme.colors.gray[5],
      fontWeight: "bold",
      color: theme.colors.dark[4],
    },
    [Status.Cancelled]: {
      backgroundColor: theme.colors.red[3],
      fontWeight: "bold",
      color: theme.colors.dark[4],
    },
    [Status.Pending]: {
      backgroundColor: theme.colors.orange[3],
      fontWeight: "bold",
      color: theme.colors.dark[4],
    },
    [Status.Ready]: {
      backgroundColor: theme.colors.blue[2],
      fontWeight: "bold",
      color: theme.colors.dark[4],
    },
  };

  return mapStyles[status];
};

const fetchData = async (
  queryStringParams: QueryStringParams
): Promise<IOrdersResponse[]> => {
  const queryParams = getFormattedQueryStringParams(queryStringParams);

  const response = await fetch(
    `${import.meta.env.VITE_FINE_FOOD_API_URL}/${
      ResourceList.ORDERS
    }?${queryParams}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Data not found");
    } else {
      throw new Error("Failed to fetch data");
    }
  }
  return response.json();
};

const PAGE_SIZES = [10, 15, 20];

export const OrderDataTable = () => {
  const [page, setPaginationOptions] = useState({
    currentPage: 1,
    startPage: 0,
    endPage: 10,
    recordsPerPage: PAGE_SIZES[0],
  });

  const { currentPage, startPage, endPage, recordsPerPage } = page;

  const { data, isLoading, isError } = useQuery(
    ["orders", { _start: startPage, _end: endPage }],
    () => fetchData({ _start: startPage, _end: endPage }),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const theme = useMantineTheme();

  if (isLoading) {
    return <Skeleton height={`calc(100vh - ${rem(84)} - ${rem(30)})`} />;
  }

  if (isError) {
    return <ApiError />;
  }

  const getOrders = () => {
    const orders = data?.map(
      ({ orderNumber, status, amount, store, user, products, createdAt }) => ({
        orderNumber,
        status: status.text,
        amount,
        store: store.title,
        user: user.fullName,
        products: `${products.length} Item`,
        createdAt,
      })
    );

    return orders;
  };

  return (
    <DataTable
      columns={[
        { accessor: "orderNumber" },
        {
          accessor: "status",
          cellsStyle: ({ status }) => statusStyles(theme, status),
        },
        { accessor: "amount" },
        { accessor: "store" },
        { accessor: "user" },
        { accessor: "products" },
        { accessor: "createdAt" },
      ]}
      records={getOrders()}
      withBorder
      // No way to render infinte button ?
      totalRecords={299}
      paginationColor="grape"
      recordsPerPage={recordsPerPage}
      page={currentPage}
      onPageChange={(p) =>
        setPaginationOptions(() => ({
          currentPage: p,
          startPage: (p - 1) * recordsPerPage,
          endPage: (p - 1) * recordsPerPage + recordsPerPage,
          recordsPerPage,
        }))
      }
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={(selectedRecordPerPage) =>
        setPaginationOptions((prevState) => ({
          ...prevState,
          startPage: (currentPage - 1) * selectedRecordPerPage,
          endPage:
            (currentPage - 1) * selectedRecordPerPage + selectedRecordPerPage,
          recordsPerPage: selectedRecordPerPage,
        }))
      }
    />
  );
};
