import { useMantineTheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Label,
} from "recharts";

import { ApiError } from "@common/components/error";
import { LoadingSkeleton } from "@common/components/loading";
import { ResourceList } from "@common/route";

type NewCustomers = {
  date: string;
  value: number;
};

interface IDailOrderResponse {
  data: NewCustomers[];
  total: number;
  trend: number;
}

const fetchData = async (): Promise<IDailOrderResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_FINE_FOOD_API_URL}/${ResourceList.NEW_CUSTOMERS}`
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

const NewCustomersPresentation = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["newCustomers"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ApiError />;
  }

  return <NewCustomersChartContainer data={data} />;
};

const NewCustomersChartContainer = ({ data }: { data: IDailOrderResponse }) => {
  const theme = useMantineTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          formatter={(value) => `${value}`}
          labelFormatter={() => ""}
          itemStyle={{ color: theme.colors.dark[9] }}
        />
        <svg
          width="200"
          height="100"
          x="-5%"
          y="-1%"
          className="responsive-text"
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fontWeight="bold"
            dominantBaseline="middle"
          >
            {data.trend} %
          </text>
          <path d="M100 20 L90 30 L110 30 Z" fill={theme.colors.green[7]} />
        </svg>
        <Bar dataKey="value" fill={theme.colors.violet[4]} />
        <XAxis dataKey="name">
          <Label value="New Customers" offset={0} position="insideBottom" />
        </XAxis>
      </BarChart>
    </ResponsiveContainer>
  );
};

export const NewCustomersChart = NewCustomersPresentation;
