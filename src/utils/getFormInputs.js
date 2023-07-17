export const getFormInputs = (form) => {
  const formData = new FormData(form);
  const usernameInput = formData.get("username");
  const passwordInput = formData.get("password");

  return { usernameInput, passwordInput };
};
