const key = 'user';

const Auth = {
  isAuthenticated() {
    const token = localStorage.getItem(key);
    return token && token !== '';
  },
  authenticate(token) {
    localStorage.setItem(key, token);
  },
  signOut() {
    localStorage.removeItem(key);
  },
};

export default Auth;
