import { DoctorInfoDTO } from '@/common/dto';
import { eStatusCode } from '@/common/enums';
import { prisma } from '@/common/libs';
import { decodeJwt, restrictTo, sendError } from '@/common/utils';
import { user_role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return sendError('You are not authorised', eStatusCode.UNAUTHORIZED);
  }

  const decodedToken = await decodeJwt(token);

  if (restrictTo([user_role.Admin, user_role.Patient], decodedToken.decoded?.role as user_role)) {
    return sendError('You are not allowed', eStatusCode.FORBIDDEN);
  }
  const doctors = await prisma.doctor_info.findMany({
    include: {
      user: {
        select: {
          email: true,
          role: true,
        },
      },
    },
  });
  return NextResponse.json({
    data: doctors,
    status: 'success',
    count: doctors.length,
  });
}
