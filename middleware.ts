import { ANALYTICS_OPT_OUT_COOKIE, isExcludedIp } from '@constants/analytics';
import { NextRequest, NextResponse } from 'next/server';

const ONE_YEAR = 60 * 60 * 24 * 365;

export const middleware = (request: NextRequest): NextResponse => {
  const response = NextResponse.next();
  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  const excluded = ip !== '' && isExcludedIp(ip, process.env.ANALYTICS_EXCLUDED_IPS ?? '');
  const optedOut = request.cookies.has(ANALYTICS_OPT_OUT_COOKIE);

  if (excluded && !optedOut) {
    response.cookies.set(ANALYTICS_OPT_OUT_COOKIE, '1', { path: '/', sameSite: 'lax', maxAge: ONE_YEAR });
  } else if (!excluded && optedOut) {
    response.cookies.delete(ANALYTICS_OPT_OUT_COOKIE);
  }

  return response;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)'],
};
