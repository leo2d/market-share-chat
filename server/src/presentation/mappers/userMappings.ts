import LoginDTO from '../../domain/user/dtos/loginDTO';
import UserDTO from '../../domain/user/dtos/userDTO';
import User from '../../domain/user/user';
import SignUpDTO from '../../domain/user/dtos/signUpDTO';

export const mapBodyToLoginDTO = (body: any): LoginDTO => {
  return {
    email: body.email,
    password: body.password,
  };
};

export const mapBodyToSignUpDTO = (body: any): SignUpDTO => {
  return {
    email: body.email,
    password: body.password,
    username : body.username
  };
};

export const mapUserToUserDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    username: user.username,
  };
};
