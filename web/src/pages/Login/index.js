import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthContainer } from './styles';
import Api from '../../services/api';
import Auth from '../../utils/auth';
import AuthForm from '../../components/AuthForm';

const Login = () => {
  const history = useHistory();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    window.document.title = isLogin
      ? 'Log In - Market share'
      : 'Sign Up - Market share';
  });

  const onResponseSuccess = response => {
    const token = response.headers['access-token'];
    const user = response?.data?.data[0];
    if (token && user) {
      Auth.authenticate(user, token);
      history.push('/chat');
    }
  };

  const loginSubmit = async _ => {
    const { email, password } = userData;
    const response = await Api.post('/auth/sign_in', { email, password }).catch(
      error => {
        if (error?.response?.status === 401) {
          window.alert('Invalid login credentials. Please try again.');
          return;
        } else return error;
      }
    );

    if (response && response.status === 200) {
      onResponseSuccess(response);
    }
  };

  const signUpSubmit = async _ => {
    const response = await Api.post('/auth/sign_up', userData).catch(error => {
      if (error?.response?.status === 400) {
        const errors = error.response.data.errors;

        for (let i = 0; i < errors.length; i++) window.alert(`${errors[i]}`);

        return;
      } else return error;
    });

    if (response && response.status === 200) {
      onResponseSuccess(response);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (isLogin) await loginSubmit();
    else await signUpSubmit();
  };

  return (
    <Container>
      <AuthContainer>
        <AuthForm
          handleSubmit={handleSubmit}
          userData={userData}
          setUserData={setUserData}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      </AuthContainer>
    </Container>
  );
};

export default Login;
