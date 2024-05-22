import { AppointmentDTO } from '@/common/dto';
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

  let appointments: any;
  const include = {
    customer_info: {
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    },
    doctor_info: {
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    },
  };
  if (decodedToken.decoded?.role === user_role.Doctor) {
    appointments = await prisma.appointment.findMany({
      where: {
        doctor_info: {
          user_id: decodedToken.decoded?.id,
        },
      },
      include,
    });
  }
  if (decodedToken.decoded?.role === user_role.Patient) {
    appointments = await prisma.appointment.findMany({
      where: {
        customer_info: {
          user_id: decodedToken.decoded?.id,
        },
      },
      include,
    });
  }
  return NextResponse.json({
    data: appointments,
    status: 'success',
    count: appointments.length,
  });
}
