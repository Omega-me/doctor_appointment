import { user_role } from '@prisma/client';

export interface DecodedTokenDTO {
  id: number;
  email: string;
  role: user_role;
  iat: number;
  exp: number;
}
