'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/use-app-store';

export function Header() {
  const { areaUnit, setAreaUnit, isAuthenticated, user } = useAppStore();

  const toggleAreaUnit = () => {
    setAreaUnit(areaUnit === 'sqm' ? 'pyeong' : 'sqm');
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          스마트 부동산 시트
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/search" 
            className="text-foreground hover:text-primary transition-colors"
          >
            매물 검색
          </Link>
          <Link 
            href="/my-sheet" 
            className="text-foreground hover:text-primary transition-colors"
          >
            나만의 시트
          </Link>
          <Link 
            href="/settings" 
            className="text-foreground hover:text-primary transition-colors"
          >
            설정
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* 면적 단위 전환 토글 */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAreaUnit}
            className="text-xs"
          >
            {areaUnit === 'sqm' ? '㎡' : '평'}
          </Button>
          
          {/* 사용자 프로필 */}
          <Button variant="ghost" size="sm">
            로그인
          </Button>
        </div>
      </div>
    </header>
  );
} 