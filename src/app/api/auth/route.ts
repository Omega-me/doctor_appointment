import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    data: 'Go to /api/auth/login to login, /api/auth/signup to register, /api/auth/me to loged in user info',
  });
}
