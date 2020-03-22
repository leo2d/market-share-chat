import LoginDTO from '../../domain/user/dtos/loginDTO';
import UserDTO from '../../domain/user/dtos/userDTO';
import User from '../../domain/user/user';

export const mapBodyToLoginDTO = (body: any): LoginDTO => {
  return {
    email: body.email,
    password: body.password,
  };
};

export const mapUserToUserDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    username: user.username,
  };
};
