import React from "react";
import { Skeleton, rem } from "@mantine/core";

export const LoadingSkeleton = () => {
  return <Skeleton height={`calc((100vh - ${rem(84)}) / 3)`}></Skeleton>;
};
