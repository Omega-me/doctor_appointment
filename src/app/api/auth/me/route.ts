import { CustomerInfoDTO, DoctorInfoDTO } from '@/common/dto';
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

  if (restrictTo([user_role.Doctor, user_role.Patient], decodedToken.decoded?.role as user_role)) {
    return sendError('You are not allowed', eStatusCode.FORBIDDEN);
  }

  if (decodedToken.decoded?.role === user_role.Patient) {
    const customerInfo = await prisma.customer_info.findFirst({
      where: {
        user_id: decodedToken.decoded.id,
      },
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json({ data: customerInfo, status: 'success' });
  }

  if (decodedToken.decoded?.role === user_role.Doctor) {
    const doctorInfo = await prisma.doctor_info.findFirst({
      where: {
        user_id: decodedToken.decoded.id,
      },
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json({ data: doctorInfo, status: 'success' });
  }

  return NextResponse.json(null);
}
