export class AuthRouteConstants {
    static readonly LOGIN: string = '/api/auth/login';
    static readonly LOGOUT: string = '/api/auth/logout';
    static readonly SIGNUP: string = '/api/auth/signup';
    static readonly AUTH0_CALLBACK: string = '/api/auth/callback';
}


export class PublicRouteConstants {
    static readonly HOME: string = '/';
    static readonly ABOUT: string = '/about';
}

export class PrivateDashboardRouteConstants {
    static readonly DASHBOARD: string = '/dashboard';
    static readonly DASHBOARD_PROFILE: string = '/dashboard/profile';
}