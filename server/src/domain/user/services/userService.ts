import { injectable, inject } from 'inversify';
import { Repository } from 'typeorm';
import User from '../user';
import InjectTYPES from '../../../constants/types/injectTypes';
import LoginDTO from '../dtos/loginDTO';
import { ILike } from '../../shared/findOperatorWithExtras';
import { trimAndLower } from '../../../utils/stringUtils';
import authConfig from '../../../config/auth/authConfig';

@injectable()
export default class UserService {
  private userRepository: Repository<User>;

  constructor(
    @inject(InjectTYPES.repositories.UserRepository)
    userRepository: Repository<User>
  ) {
    this.userRepository = userRepository;
  }

  async signIn(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: ILike(`%${trimAndLower(loginDTO.email)}%`),
      },
    });

    if (!user) return null;

    const isPasswordMatch = await user.checkPassword(loginDTO.password);
    if (!isPasswordMatch) return null;

    user.signIn(authConfig.scretKey, authConfig.expiresIn);

    await this.userRepository.update({ id: user.id }, user);

    return user;
  }
}
