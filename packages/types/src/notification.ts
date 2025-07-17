/**
 * 알림 관련 타입 정의
 */

import { BaseEntity } from './common';
import { TransactionType } from './property';

/**
 * 알림 유형
 */
export type NotificationType = 
  | 'price_alert' 
  | 'new_transaction' 
  | 'market_trend' 
  | 'system' 
  | 'promotion';

/**
 * 알림 상태
 */
export type NotificationStatus = 'unread' | 'read' | 'archived';

/**
 * 알림 우선순위
 */
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * 푸시 토큰 정보
 */
export interface PushToken extends BaseEntity {
  userId: string;
  token: string;
  deviceType: 'web' | 'android' | 'ios';
  deviceId: string;
  isActive: boolean;
  lastUsed: Date;
}

/**
 * 알림 설정
 */
export interface NotificationSetting extends BaseEntity {
  userId: string;
  
  // 전역 알림 설정
  globalSettings: {
    email: boolean;
    push: boolean;
    inApp: boolean;
    quietHours: {
      enabled: boolean;
      startTime: string; // HH:mm
      endTime: string; // HH:mm
    };
  };
  
  // 유형별 알림 설정
  typeSettings: {
    priceAlert: {
      enabled: boolean;
      email: boolean;
      push: boolean;
      frequency: 'immediate' | 'daily' | 'weekly';
    };
    newTransaction: {
      enabled: boolean;
      email: boolean;
      push: boolean;
      frequency: 'immediate' | 'daily' | 'weekly';
    };
    marketTrend: {
      enabled: boolean;
      email: boolean;
      push: boolean;
      frequency: 'daily' | 'weekly' | 'monthly';
    };
    system: {
      enabled: boolean;
      email: boolean;
      push: boolean;
    };
    promotion: {
      enabled: boolean;
      email: boolean;
      push: boolean;
    };
  };
}

/**
 * 가격 알림 조건
 */
export interface PriceAlertCondition extends BaseEntity {
  userId: string;
  name: string;
  isActive: boolean;
  
  // 매물 조건
  criteria: {
    aptSeq?: number;
    complexName?: string;
    region?: {
      sidoCode?: string;
      sigunguCode?: string;
      dongCode?: string;
    };
    exclusiveUseArea?: {
      min?: number;
      max?: number;
    };
    transactionType: TransactionType[];
  };
  
  // 알림 조건
  alertConditions: {
    priceThreshold?: {
      operator: 'below' | 'above';
      value: number;
    };
    priceChange?: {
      operator: 'increase' | 'decrease';
      percentage: number;
      period: 'daily' | 'weekly' | 'monthly';
    };
    newListing: boolean;
  };
  
  // 실행 정보
  lastTriggered?: Date;
  triggerCount: number;
}

/**
 * 알림 메시지
 */
export interface Notification extends BaseEntity {
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  
  // 메시지 내용
  title: string;
  message: string;
  imageUrl?: string;
  
  // 액션 정보
  actionUrl?: string;
  actionType?: 'view_property' | 'view_sheet' | 'settings' | 'external';
  actionData?: Record<string, unknown>;
  
  // 발송 정보
  channels: {
    email?: {
      sent: boolean;
      sentAt?: Date;
      opened?: boolean;
      openedAt?: Date;
    };
    push?: {
      sent: boolean;
      sentAt?: Date;
      clicked?: boolean;
      clickedAt?: Date;
    };
    inApp: {
      sent: boolean;
      sentAt: Date;
      viewed?: boolean;
      viewedAt?: Date;
    };
  };
  
  // 관련 정보
  relatedId?: string; // 관련 매물, 시트 등의 ID
  relatedType?: 'property' | 'sheet' | 'alert' | 'system';
  
  // 만료 정보
  expiresAt?: Date;
  isArchived: boolean;
}

/**
 * 알림 템플릿
 */
export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  name: string;
  
  template: {
    title: string;
    message: string;
    variables: string[]; // 치환 가능한 변수 목록
  };
  
  channels: {
    email?: {
      subject: string;
      htmlTemplate: string;
      textTemplate: string;
    };
    push?: {
      title: string;
      body: string;
      icon?: string;
      badge?: number;
    };
    inApp: {
      title: string;
      message: string;
      icon?: string;
    };
  };
}

/**
 * 시장 동향 리포트
 */
export interface MarketTrendReport extends BaseEntity {
  reportType: 'daily' | 'weekly' | 'monthly';
  region: {
    sidoCode: string;
    sidoName: string;
    sigunguCode?: string;
    sigunguName?: string;
  };
  period: {
    startDate: Date;
    endDate: Date;
  };
  
  data: {
    transactionCount: number;
    averagePrice: number;
    priceChange: {
      amount: number;
      percentage: number;
    };
    popularComplexes: {
      aptSeq: number;
      name: string;
      transactionCount: number;
      averagePrice: number;
    }[];
    insights: string[];
  };
  
  recipients: string[]; // user IDs
  sentAt?: Date;
} 