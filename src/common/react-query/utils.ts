export type QueryStringParams = {
  [key: string]: string | number | boolean;
};

export const getFormattedQueryStringParams = (
  queryStringParams: QueryStringParams
) => {
  const formattedQueryStringParams = Object.entries(queryStringParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return `&${formattedQueryStringParams}`;
};
