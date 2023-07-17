export const getData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const isAnUserLoggedIn = () => {
  const users = getData("users");
  let user = null;

  if (users) {
    user = users.find((user) => user.isLoggedIn);
  }
  return user;
};

export const getUser = (username) => {
  return getData("users").find((user) => user.username === username) || {};
};
