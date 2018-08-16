export const fieldIsEmpty = (str) => {
  if (!str) return true;
  return false;
};

export const urlIsValid = (url) => {
  const reg = /(https?:\/\/.*\.(?:png|jpg))/;
  // Returns true if url matches regex, false otherwise
  return reg.test(url);
};
