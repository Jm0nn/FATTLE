const getDday = (start, end) =>
  Math.floor(
    Math.abs((start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)),
  );
export default getDday;
