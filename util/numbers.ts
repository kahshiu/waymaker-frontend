export const generateSerial = (seed: number) => {
  return () => {
    seed = seed + 1;
    return seed;
  };
};
