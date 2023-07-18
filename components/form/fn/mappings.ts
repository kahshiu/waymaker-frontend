type TState = { num: number; short: string; long: string }[];

export const mapMYStates = (
  statesData: TState,
  value: number,
  key?: "long" | "short"
) => {
  const arr = statesData.filter((item) => item.num === value);
  if (arr.length === 0) return "";
  const result = arr[0];
  return result[key ?? "long"];
};
