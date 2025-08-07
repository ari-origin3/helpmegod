import React from "react";
import cn from "classnames";

interface Props {
  length: number;
  component: React.ComponentType<any>;
  className?: string;
}

export const BulkLoader = (props: Props) => {
  const LoaderComponent = props.component;

  const items = Array.from({ length: props.length }, (v, i) => {
    return { key: `item-${i}` };
  });

  return (
    <>
      {items.map((item) => (
        <LoaderComponent key={item.key} className={cn(props.className)} />
      ))}
    </>
  );
};
