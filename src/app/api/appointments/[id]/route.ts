import { eStatusCode } from '@/common/enums';
import { prisma } from '@/common/libs';
import { decodeJwt, restrictTo, sendError } from '@/common/utils';
import { user_role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (isNaN(Number(params.id))) {
    return sendError(`Invalid id ${params.id}`, eStatusCode.BAD_REQUEST);
  }

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return sendError('You are not authorised', eStatusCode.UNAUTHORIZED);
  }

  const data = await prisma.appointment.findUnique({
    where: {
      id: Number(params.id),
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
  });
  if (!data) {
    return sendError(`No data with id ${params.id} found`, eStatusCode.NOT_FOUND);
  }

  return NextResponse.json({ data, status: 'success' });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (isNaN(Number(params.id))) {
    return sendError(`Invalid id ${params.id}`, eStatusCode.BAD_REQUEST);
  }

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return sendError('You are not authorised', eStatusCode.UNAUTHORIZED);
  }

  const decodedToken = await decodeJwt(token);

  if (restrictTo([user_role.Admin, user_role.Patient], decodedToken.decoded?.role as user_role)) {
    return sendError('You are not allowed', eStatusCode.FORBIDDEN);
  }

  const body = await req.json();

  const data = await prisma.appointment.update({
    data: body,
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (isNaN(Number(params.id))) {
    return sendError(`Invalid id ${params.id}`, eStatusCode.BAD_REQUEST);
  }

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return sendError('You are not authorised', eStatusCode.UNAUTHORIZED);
  }

  const decodedToken = await decodeJwt(token);

  if (restrictTo([user_role.Admin, user_role.Patient], decodedToken.decoded?.role as user_role)) {
    return sendError('You are not allowed', eStatusCode.FORBIDDEN);
  }

  await prisma.appointment.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(
    {},
    {
      status: eStatusCode.NO_CONTENT,
    },
  );
}
