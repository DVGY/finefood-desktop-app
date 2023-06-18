import { useMantineTheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Label,
} from "recharts";

import { ApiError } from "@common/components/error";
import { LoadingSkeleton } from "@common/components/loading";
import {
  QueryStringParams,
  getFormattedQueryStringParams,
} from "@common/react-query/utils";
import { ResourceList } from "@common/route";

type DailyRevenue = {
  date: string;
  value: number;
};

interface IDailyRevenueResponse {
  data: DailyRevenue[];
  total: number;
  trend: number;
}

const fetchData = async (
  queryStringParams: QueryStringParams
): Promise<IDailyRevenueResponse> => {
  const queryParams = getFormattedQueryStringParams(queryStringParams);

  const response = await fetch(
    `${import.meta.env.VITE_FINE_FOOD_API_URL}/${
      ResourceList.DAILY_REVENUE
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

const DailyRevenuePresentation = () => {
  const start = "Sun, 28 May 2023 18:30:00 GMT";
  const end = "Sun, 04 Jun 2023 18:30:00 GMT";
  const queryStringParams = {
    start,
    end,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dailyRevenue", queryStringParams],
    queryFn: () => fetchData(queryStringParams),
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ApiError />;
  }
  return <DailyRevenueChartContainer data={data} />;
};

const DailyRevenueChartContainer = ({
  data,
}: {
  data: IDailyRevenueResponse;
}) => {
  const theme = useMantineTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
          formatter={(value) => `$ ${value}`}
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
            $ {(data.total / 1000).toFixed(1)} K
          </text>
          <path d="M100 20 L90 30 L110 30 Z" fill={theme.colors.green[7]} />
        </svg>

        <Line
          type="monotone"
          dataKey="value"
          fill={theme.colors.green[4]}
          stroke={theme.colors.green[8]}
        />
        <XAxis dataKey="name">
          <Label value="Daily Revenue" offset={0} position="insideBottom" />
        </XAxis>
      </LineChart>
    </ResponsiveContainer>
  );
};

export const DailyRevenueChart = DailyRevenuePresentation;
