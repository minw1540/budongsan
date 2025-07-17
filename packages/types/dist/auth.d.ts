import { BaseEntity } from './common';
/**
 * 소셜 로그인 제공자
 */
export type SocialProvider = 'kakao' | 'naver' | 'google';
/**
 * 사용자 정보
 */
export interface User extends BaseEntity {
    socialId: string;
    socialProvider: SocialProvider;
    nickname: string;
    email?: string;
    unitPreference: 'sqm' | 'pyeong';
}
/**
 * 로그인 요청
 */
export interface LoginRequest {
    provider: SocialProvider;
    code: string;
    redirectUri: string;
}
/**
 * 로그인 응답
 */
export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
/**
 * JWT 토큰 페이로드
 */
export interface JwtPayload {
    userId: string;
    socialId: string;
    socialProvider: SocialProvider;
    iat: number;
    exp: number;
}
/**
 * 토큰 갱신 요청
 */
export interface RefreshTokenRequest {
    refreshToken: string;
}
/**
 * 토큰 갱신 응답
 */
export interface RefreshTokenResponse {
    accessToken: string;
    expiresIn: number;
}
/**
 * 인증 상태
 */
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}
/**
 * 사용자 프로필 업데이트 요청
 */
export interface UpdateProfileRequest {
    nickname?: string;
    unitPreference?: 'sqm' | 'pyeong';
}
//# sourceMappingURL=auth.d.ts.map