const firstLetterToUppercase = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const removePartString = (originalString, removePart) => {
  const lowerCaseString = originalString.toLowerCase();
  return lowerCaseString.replace(removePart.toLowerCase(), '').trim();
};

export {
  firstLetterToUppercase,
  removePartString,
};
