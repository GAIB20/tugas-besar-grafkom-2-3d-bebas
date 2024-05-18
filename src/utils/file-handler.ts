export const readFile = async (path: string) => {
  const res = await fetch(path);
  const content = await res.text();
  return content;
};
