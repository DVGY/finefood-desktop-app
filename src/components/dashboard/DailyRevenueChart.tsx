import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@common/components/error";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Label,
} from "recharts";
import { useMantineTheme } from "@mantine/core";
import { DailyOrdersChart } from "./DailyOrdersChart";
import { Loading } from "@common/components/loading";

import { ResourceList } from "@common/route";
import {
  QueryStringParams,
  getFormattedQueryStringParams,
} from "@common/react-query/utils";

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

  const { data, isLoading, isError } = useQuery(
    ["dailyRevenue", queryStringParams],
    () => fetchData(queryStringParams)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ApiError />;
  }
  return <DailyRevenueChartContainer data={data} />;
};

console.log("sdafads");

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
        {/*    Create SVG Icon
         */}
        <g>
          <g className="custom-p&l-number">
            <text
              x="15%"
              y="10%"
              dy={+12}
              style={{
                fontSize: 36,
                fontWeight: "bold",
                fill: theme.colors.green[7],
              }}
              width={200}
              textAnchor="middle"
            >
              ${(data.total / 1000).toFixed(1)}K
            </text>
          </g>
          <g className="custom-upward-trend-icon">
            <svg
              viewBox="0 0 25 25"
              height={100}
              width={100}
              x="20%"
              y="0%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 14.5L12.5 10L17 14.5"
                stroke={theme.colors.green[5]}
                stroke-width="1.5"
              />
            </svg>
          </g>
        </g>

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
