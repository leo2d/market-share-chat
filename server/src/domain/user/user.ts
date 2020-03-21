import { Column, Entity } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import BaseEntity from '../shared/entities/baseEntity';


@Entity()
export default class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  username: string;
  @Column({ type: 'varchar', nullable: false })
  email: string;
  @Column({ type: 'varchar', nullable: false })
  password: string;
  @Column({ type: 'varchar', nullable: true })
  token: string;

  signIn(key: string, expirationTime: string): void {
    const token = sign({ userId: this.id }, key, { expiresIn: expirationTime });
    this.token = token;
  }

  async checkPassword(inputPassWord: string): Promise<boolean> {
    const isPasswordMatch = await compare(inputPassWord, this.password);
    return isPasswordMatch;
  }
}
