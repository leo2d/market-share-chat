import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Form,
  ModalTitle,
} from 'react-bootstrap';
import { FormContainer, LoginContainer, TitleContainer } from './styles';
import Api from '../../services/api';
import Auth from '../../utils/auth';

const Login = () => {
  const history = useHistory();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await Api.post('/auth/sign_in', loginData).catch(error => {
      if (error?.response?.status === 401) {
        window.alert('Invalid login credentials. Please try again.');
        return;
      } else return error;
    });

    if (response && response.status === 200) {
      const token = response.headers['access-token'];
      if (token) {
        Auth.authenticate(token);
        history.push('/chat');
      }
    }
  };

  return (
    <Container>
      <LoginContainer>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <TitleContainer>
              <ModalTitle>Sign In</ModalTitle>
            </TitleContainer>

            <FormGroup>
              <FormLabel>Email address</FormLabel>
              <FormControl
                value={loginData.email}
                onChange={e =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
                type="email"
                placeholder="Enter email"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl
                value={loginData.password}
                onChange={e =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
                type="password"
                placeholder="Enter password"
              />
            </FormGroup>

            <Button type="submit" variant={'primary'} className="btn-block">
              Submit
            </Button>
          </Form>
        </FormContainer>
      </LoginContainer>
    </Container>
  );
};

export default Login;
