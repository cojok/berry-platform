import { UserEntity } from '../../users/entities/user.entity';

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: UserEntity;
}
