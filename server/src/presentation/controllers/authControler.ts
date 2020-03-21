import {
  controller,
  httpPost,
  response,
  requestBody,
  interfaces,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Response } from 'express';
import { mapBodyToLoginDTO } from '../mappers/userMappings';
import { stringIsValid } from '../../utils/stringUtils';
import InjectTYPES from '../../constants/types/injectTypes';
import UserService from '../../domain/user/services/userService';
import CustomResponse from '../responses/customResponse';

@controller('/auth')
export default class AuthController implements interfaces.Controller {
  private userService: UserService;

  constructor(
    @inject(InjectTYPES.services.UserService)
    userService: UserService
  ) {
    this.userService = userService;
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

        if (user) {
          res.set({
            'access-token': user.token,
          });

          res.status(200).json(new CustomResponse(true, [], []));
        } else {
          this.returnInvalidCredentials(res);
        }
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
}
