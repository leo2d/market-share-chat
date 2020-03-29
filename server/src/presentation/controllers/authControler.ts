import {
  controller,
  httpPost,
  response,
  requestBody,
  interfaces,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Response } from 'express';
import {
  mapBodyToLoginDTO,
  mapUserToUserDTO,
  mapBodyToSignUpDTO,
} from '../mappers/userMappings';
import { stringIsValid } from '../../utils/stringUtils';
import InjectTYPES from '../../constants/types/injectTypes';
import UserService from '../../domain/user/services/userService';
import CustomResponse from '../responses/customResponse';
import User from '../../domain/user/user';

@controller('/auth')
export default class AuthController implements interfaces.Controller {
  private userService: UserService;

  constructor(
    @inject(InjectTYPES.services.UserService)
    userService: UserService
  ) {
    this.userService = userService;
  }

  @httpPost('/sign_up')
  async signUP(
    @requestBody() body: any,
    @response() res: Response
  ): Promise<void> {
    try {
      const signUpDTO = mapBodyToSignUpDTO(body);

      if (!stringIsValid(body?.email) || !stringIsValid(body?.password)) {
        this.returnInvalidCredentials(res);
      } else {
        const successOnCreate = await this.userService.signUp(signUpDTO);

        if (successOnCreate) {
          const { email, password } = signUpDTO;
          const user = await this.userService.signIn({ email, password });

          this.returnAuthenticated(res, user);
        } else {
          this.returnInvalidData(res, true);
        }
      }
    } catch (error) {
      res.status(500).json(new CustomResponse(false, null, [error.message]));
    }
  }

  @httpPost('/sign_in')
  async signIn(
    @requestBody() body: any,
    @response() res: Response
  ): Promise<void> {
    try {
      const loginDTO = mapBodyToLoginDTO(body);

      if (!stringIsValid(body?.email) || !stringIsValid(body?.password)) {
        this.returnInvalidCredentials(res);
      } else {
        const user = await this.userService.signIn(loginDTO);

        if (user) this.returnAuthenticated(res, user);
        else this.returnInvalidCredentials(res);
      }
    } catch (error) {
      res.status(500).json(new CustomResponse(false, null, [error.message]));
    }
  }

  private returnInvalidCredentials(res: Response): void {
    res
      .status(401)
      .json(
        new CustomResponse(false, null, [
          'Invalid login credentials. Please try again.',
        ])
      );
  }

  private returnInvalidData(res: Response, existingData: boolean): void {
    const errorMsg = existingData
      ? `The username or the email provided is already in use.`
      : 'Invalid login data. Please try again.';
    res.status(400).json(new CustomResponse(false, null, [errorMsg]));
  }

  private returnAuthenticated(res: Response, user: User): void {
    res.set({
      'access-token': user.token,
    });

    const userDTO = mapUserToUserDTO(user);
    res.status(200).json(new CustomResponse(true, [userDTO], null));
  }
}
