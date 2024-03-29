export const deepCopyList = (list) => {
  let copy = {};

  if (Array.isArray(list)) {
    copy = [];
  }

  for (let key in list) {
    const elem = list[key];

    if (elem !== null && typeof elem === "object") {
      copy[key] = deepCopyList(elem);
    } else {
      copy[key] = elem;
    }
  }
  return copy;
};
