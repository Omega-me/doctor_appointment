import { CreateUserDTO } from '@/common/dto';
import { eStatusCode } from '@/common/enums';
import { prisma } from '@/common/libs';
import { passwordHash, sendError, signJWTToken } from '@/common/utils';
import { user_role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { isEmail } from 'validator';

export async function GET(_req: NextRequest) {
  return NextResponse.json({
    data: 'Use POST /api/auth/register to signup',
  });
}

export async function POST(req: NextRequest) {
  const body: CreateUserDTO = await req.json();
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user) {
    return sendError('Email already used', eStatusCode.BAD_REQUEST);
  }
  if (!isEmail(body.email)) {
    return sendError('Invalid Email', eStatusCode.BAD_REQUEST);
  }
  if (body.password !== body.passwordConfirm) {
    return sendError('Password and password confirm are not the same', eStatusCode.BAD_REQUEST);
  }

  const hashedPassword = await passwordHash.hashIt(body.password);
  const data = await prisma.user.create({
    data: { email: body.email, password: hashedPassword, role: user_role.Patient },
  });
  const token = signJWTToken(data);
  return NextResponse.json({ data: { token, status: 'success' } });
}
