import React from "react";
import cs from "classnames";

import "./Page.scss";
import { useRouter } from "../../lib/hooks/useRouter";

interface Props {
  className?: string;
  children: JSX.Element;
}
export const Page = (props: Props) => {
  const router = useRouter();
  const removePadding = ["/", "/carSearch"].includes(router.location.pathname);

  return (
    <div
      className={cs(
        "Page",
        props.className,
        removePadding && "Page--no_padding"
      )}
    >
      {props.children}
    </div>
  );
};
