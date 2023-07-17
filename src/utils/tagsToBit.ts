export const tagsToBit = (tags: string[]) => {
  const arr = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
  tags.forEach((index: string) => {
    arr[parseInt(index)] = "1";
  });
  return arr.join("");
};
