import cs from "classnames";
import { Maybe } from "graphql/jsutils/Maybe";
import { useRouter } from "../../lib/hooks/useRouter";
import { useSkeleton } from "../../lib/hooks/useSkeleton";

import "./BreadCrumbs.scss";

type BreadCrumb = {
  label: Maybe<string> | undefined;
  path: string;
};
interface Props {
  data: BreadCrumb[];
  disableLast?: boolean;
  loading?: boolean;
}
export const BreadCrumbs = (props: Props) => {
  const router = useRouter();
  const s = useSkeleton(props.loading, { width: "50px" });

  const handleClick = (path: string) => {
    router.history.push(path);
  };

  return (
    <div
      className={cs(
        "BreadCrumbs",
        props.disableLast && "BreadCrumbs--disable-last"
      )}
    >
      {props.data.map((breadCrumb, index) => (
        <span
          className="BreadCrumbs__item"
          onClick={() => handleClick(breadCrumb.path)}
          key={`BreadCrumb--${index}`}
        >
          {s(breadCrumb.label)}
        </span>
      ))}
    </div>
  );
};
