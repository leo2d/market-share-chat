import React from 'react';

import {
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Form,
  ModalTitle,
} from 'react-bootstrap';
import { TitleContainer, ActionLink, FormContainer } from './styles';

const AuthForm = ({
  handleSubmit,
  userData,
  setUserData,
  isLogin,
  setIsLogin,
}) => {
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <TitleContainer>
          <ModalTitle>{isLogin ? 'Log In' : 'Sign Up'}</ModalTitle>
        </TitleContainer>

        {!isLogin ? (
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl
              value={userData.username}
              onChange={e =>
                setUserData({ ...userData, username: e.target.value })
              }
              required
              type="text"
              placeholder="Enter username"
            />
          </FormGroup>
        ) : (
          <br />
        )}

        <FormGroup>
          <FormLabel>Email address</FormLabel>
          <FormControl
            value={userData.email}
            onChange={e => setUserData({ ...userData, email: e.target.value })}
            required
            type="email"
            placeholder="Enter email"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl
            minLength={8}
            value={userData.password}
            onChange={e =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
            type="password"
            placeholder="Enter password"
          />
        </FormGroup>

        <Button type="submit" variant={'primary'} className="btn-block">
          {isLogin ? 'Log In' : 'Sign Up'}
        </Button>
      </Form>
      <br />
      <FormGroup>
        <FormLabel
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? (
            <>
              New to Chat? <ActionLink>Sign up</ActionLink>
            </>
          ) : (
            <>
              Already have an account? <ActionLink>Log in</ActionLink>
            </>
          )}
        </FormLabel>
      </FormGroup>
    </FormContainer>
  );
};

export default AuthForm;
