/**
 * 인증 관련 타입 정의
 */

import { BaseEntity } from './common';

/**
 * 소셜 로그인 제공자
 */
export type SocialProvider = 'kakao' | 'naver' | 'google';

/**
 * 사용자 역할
 */
export type UserRole = 'user' | 'admin';

/**
 * 사용자 프로필 정보
 */
export interface UserProfile extends BaseEntity {
  email: string;
  nickname: string;
  profileImage?: string;
  socialProvider: SocialProvider;
  socialId: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
}

/**
 * 로그인 요청
 */
export interface LoginRequest {
  provider: SocialProvider;
  authCode: string;
  redirectUri?: string;
}

/**
 * 로그인 응답
 */
export interface AuthResponse {
  user: UserProfile;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * 토큰 갱신 요청
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * JWT 토큰 페이로드
 */
export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

/**
 * 소셜 로그인 사용자 정보
 */
export interface SocialUserInfo {
  socialId: string;
  email: string;
  nickname: string;
  profileImage?: string;
  provider: SocialProvider;
}

/**
 * 사용자 설정
 */
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'ko' | 'en';
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    priceAlert: boolean;
  };
} 