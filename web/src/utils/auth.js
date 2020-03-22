const key = 'userData';

const Auth = {
  isAuthenticated() {
    const userData = this.getUser();
    return userData && userData.token !== '';
  },
  authenticate(user, token) {
    const userData = JSON.stringify({ user, token });
    localStorage.setItem(key, userData);
  },
  signOut() {
    localStorage.removeItem(key);
  },
  getUser() {
    const data = localStorage.getItem(key);
    if (data) {
      const userData = JSON.parse(data);
      return userData;
    }
    return null;
  },
};

export default Auth;
