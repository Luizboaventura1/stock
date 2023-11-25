export const useCookie = () => {
  const set = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  };

  const get = (name) => {
    return JSON.parse(localStorage.getItem(name))
      ? JSON.parse(localStorage.getItem(name))
      : undefined;
  };

  return {
    get,
    set
  }
};
