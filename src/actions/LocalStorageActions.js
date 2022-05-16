export const storeUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const retrieveUser = () => JSON.parse(localStorage.getItem('user'));

export const clearUser = () => {
  localStorage.removeItem('user');
};

export const clearStorage = () => {
  localStorage.clear();
};
