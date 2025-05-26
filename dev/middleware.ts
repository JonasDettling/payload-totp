import { NextResponse } from 'next/server.js'
import type { NextRequest } from 'next/server.js'

export function middleware(request: NextRequest) {
	const { pathname, searchParams } = request.nextUrl

	if (pathname === '/admin/verify-totp' && searchParams.get('back') === 'null') {
		const url = request.nextUrl.clone()
		url.searchParams.delete('back')
		// If there are no other search params, remove the '?'
		if (Array.from(url.searchParams.keys()).length === 0) {
			url.search = ''
		}
		return NextResponse.redirect(url)
	}

	const response = NextResponse.next()
	response.headers.append('x-pathname', pathname)
	return response
}
