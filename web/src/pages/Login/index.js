import React, { useState } from 'react';
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

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await Api.post('/auth/sigin', loginData);

    if (response.status === 200) {
      const token = response.headers['access-token'];
      if (token) {
        localStorage.setItem(`u-${loginData.email}`, token);
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
