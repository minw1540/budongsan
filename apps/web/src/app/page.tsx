import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          나만의 스마트 부동산 시트
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          현명한 부동산 결정을 위한 당신의 파트너
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">매물 검색</h3>
            <p className="text-muted-foreground mb-4">
              지역별 매물을 검색하고 비교해보세요
            </p>
            <Link 
              href="/search" 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              검색하기
            </Link>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">나만의 시트</h3>
            <p className="text-muted-foreground mb-4">
              관심 매물을 저장하고 관리해보세요
            </p>
            <Link 
              href="/my-sheet" 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              시트 보기
            </Link>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">설정</h3>
            <p className="text-muted-foreground mb-4">
              알림 및 개인 설정을 관리해보세요
            </p>
            <Link 
              href="/settings" 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              설정하기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 