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

  if (restrictTo([user_role.Admin], decodedToken.decoded?.role as user_role)) {
    return sendError('You are not allowed', eStatusCode.FORBIDDEN);
  }

  let isReq: boolean | null = req.nextUrl.searchParams.get('isRequest') === null ? null : req.nextUrl.searchParams.get('isRequest') === '' ? true : false;

  const query =
    isReq === null
      ? {
          include: {
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
          },
        }
      : {
          where: {
            request: isReq,
          },
          include: {
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
          },
        };

  const appointments = await prisma.appointment.findMany(query as any);

  return NextResponse.json({
    data: appointments,
    status: 'success',
    count: appointments.length,
  });
}
