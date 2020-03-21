import { getConnection, Repository } from 'typeorm';
import User from '../../../domain/user/user';

export function getUserRepository(): Repository<User> {
  const conn = getConnection();
  const userRepository = conn.getRepository(User);
  return userRepository;
}
