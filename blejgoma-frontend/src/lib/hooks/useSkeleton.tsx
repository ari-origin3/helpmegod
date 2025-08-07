import React, { CSSProperties, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

interface SkeletonOptions {
  count?: number;
  duration?: number;
  delay?: number;
  width?: string | number;
  wrapper?: ReactNode;
  height?: string | number;
  circle?: boolean;
  style?: CSSProperties;
  className?: string;
}

export const useSkeleton = (
  loading?: boolean,
  defaultOptions?: SkeletonOptions
) => (content?: ReactNode, options?: SkeletonOptions) => {
  if (loading) return <Skeleton {...defaultOptions} {...options} />;

  return content;
};
