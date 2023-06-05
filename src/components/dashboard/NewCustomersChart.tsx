import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Label,
} from 'recharts';

import { ResourceList } from '@common/route';
import { Loading } from '@common/components/loading';
import { ApiError } from '@common/components/error';
import { useMantineTheme } from '@mantine/core';

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
      throw new Error('Data not found');
    } else {
      throw new Error('Failed to fetch data');
    }
  }
  return response.json();
};

const NewCustomersPresentation = () => {
  const { data, isLoading, isError } = useQuery(['newCustomers'], fetchData);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ApiError />;
  }

  return <NewCustomersChartContainer data={data} />;
};

const NewCustomersChartContainer = ({ data }: { data: IDailOrderResponse }) => {
  const theme = useMantineTheme();

  return (
    <ResponsiveContainer width='100%' height='100%'>
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
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip
          formatter={(value) => `${value}`}
          labelFormatter={() => ''}
          itemStyle={{ color: theme.colors.dark[9] }}
        />
        <g>
          <g className='custom-p&l-number'>
            <text
              x='11%'
              y='9%'
              dy={+12}
              style={{
                fontSize: 36,
                fontWeight: 'bold',
                fill: theme.colors.green[7],
              }}
              width={200}
              textAnchor='middle'
            >
              {data.trend} %
            </text>
          </g>
          <g className='custom-upward-trend-icon'>
            <svg
              viewBox='0 0 25 25'
              height={50}
              width={50}
              x='17%'
              y='4%'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 14.5L12.5 10L17 14.5'
                stroke={theme.colors.green[7]}
                stroke-width='1.5'
              />
            </svg>
          </g>
        </g>
        <Bar dataKey='value' fill={theme.colors.violet[4]} />
        <XAxis dataKey='name'>
          <Label value='New Customers' offset={0} position='insideBottom' />
        </XAxis>
      </BarChart>
    </ResponsiveContainer>
  );
};

export const NewCustomersChart = NewCustomersPresentation;
