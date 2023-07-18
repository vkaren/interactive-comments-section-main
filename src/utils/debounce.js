export const debounce = (callback, wait) => {
  let timer;

  return (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => callback(e), wait);
  };
};
