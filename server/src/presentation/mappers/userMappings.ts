import LoginDTO from "../../domain/user/dtos/loginDTO";

export const mapBodyToLoginDTO = (body: any): LoginDTO => {
  return {
    email: body.email,
    password: body.password,
  };
};
