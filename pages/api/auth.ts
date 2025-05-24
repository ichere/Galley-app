
export const login = (username: string) => {
  localStorage.setItem('user', username);
};
export const logout = () => localStorage.removeItem('user');
export const getCurrentUser = () => localStorage.getItem('user');
