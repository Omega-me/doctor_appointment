import { prisma } from '@/common/libs';
import { LoginUserDTO } from '@/common/dto';
import { eStatusCode } from '@/common/enums';
import { passwordHash, sendError, signJWTToken } from '@/common/utils';
import { NextRequest, NextResponse } from 'next/server';
import { isEmail } from 'validator';

export async function GET(_req: NextRequest) {
  return NextResponse.json({
    data: 'Use POST /api/auth/login to login',
  });
}

export async function POST(req: NextRequest) {
  const body: LoginUserDTO = await req.json();
  if (!isEmail(body.email)) {
    return sendError('Invalid Email', eStatusCode.BAD_REQUEST);
  }

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return sendError('Incorret email or password', eStatusCode.BAD_REQUEST);
  }
  const isSamePassword = passwordHash.compareIt(body.password, user.password);
  if (!isSamePassword) {
    return sendError('Incorret email or password', eStatusCode.BAD_REQUEST);
  }

  const token = signJWTToken(user);

  return NextResponse.json({ data: { token, status: 'success' } });
}
