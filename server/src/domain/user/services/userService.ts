import { injectable, inject } from 'inversify';
import { Repository } from 'typeorm';
import User from '../user';
import InjectTYPES from '../../../constants/types/injectTypes';
import LoginDTO from '../dtos/loginDTO';
import { ILike } from '../../shared/findOperatorWithExtras';
import { trimAndLower } from '../../../utils/stringUtils';
import { AUTH_CONFIG } from '../../../config/config';
import SignUpDTO from '../dtos/signUpDTO';

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

    user.signIn(AUTH_CONFIG.scretKey, AUTH_CONFIG.expiresIn);

    await this.userRepository.update({ id: user.id }, user);

    return user;
  }

  async signUp(signUpDTO: SignUpDTO): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: [
        {
          username: ILike(`%${trimAndLower(signUpDTO.username)}%`),
        },
        {
          email: ILike(`%${trimAndLower(signUpDTO.email)}%`),
        },
      ],
    });

    if (existingUser) return false;

    const newUser = new User();
    newUser.email = signUpDTO.email;
    newUser.username = signUpDTO.username;

    await newUser.setPassword(signUpDTO.password);

    await this.userRepository.insert(newUser);

    return true;
  }

  async signOut(userId: string): Promise<boolean> {
    const updated = await this.userRepository.update(
      { id: userId },
      { token: null }
    );

    return updated.affected ? true : false;
  }
}
