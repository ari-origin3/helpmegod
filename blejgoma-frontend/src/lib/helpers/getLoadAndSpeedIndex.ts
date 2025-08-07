import { Maybe } from "graphql/jsutils/Maybe";

export const getLoadAndSpeedIndex = (lisi: Maybe<string>) => {
  return {
    loadIndex: lisi?.slice(0, -1),
    speedIndex: lisi?.split("").pop(),
  };
};
