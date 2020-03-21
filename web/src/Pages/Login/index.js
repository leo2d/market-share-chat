import React from 'react';
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

const Login = () => {
  return (
    <Container>
      <LoginContainer>
        <FormContainer>
          <Form>
            <TitleContainer>
              <ModalTitle>Sign In</ModalTitle>
            </TitleContainer>

            <FormGroup>
              <FormLabel>Email address</FormLabel>
              <FormControl required type="email" placeholder="Enter email" />
            </FormGroup>

            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl
                required
                type="password"
                placeholder="Enter password"
              />
            </FormGroup>

            <Button
              type="submit"
              variant={'primary'}
              onSubmit={() => {}}
              className="btn-block"
            >
              Submit
            </Button>
          </Form>
        </FormContainer>
      </LoginContainer>
    </Container>
  );
};

export default Login;
