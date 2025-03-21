export const getReadableName = (name: string) => {
  return name.replace(/-/g, ' ').replace(/^./, (char) => char.toUpperCase());
};
