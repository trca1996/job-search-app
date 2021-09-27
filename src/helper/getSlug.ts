const getSlug = (string: string) => {
  return string.split(" ").join("+").trim().toLowerCase();
};

export default getSlug;
