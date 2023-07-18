export const deepCopyList = (list) => {
  let copy = {};

  if (Array.isArray(list)) {
    copy = [];
  } else {
    copy = {};
  }

  for (let key in list) {
    const elem = list[key];

    if (!isNaN(key - "")) {
      key = key - "";
    }

    if (elem !== null && typeof elem === "object") {
      copy[key] = deepCopyList(elem);
    } else {
      copy[key] = elem;
    }
  }
  return copy;
};
