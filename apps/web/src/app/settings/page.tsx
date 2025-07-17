export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">설정</h1>
      
      <div className="space-y-6">
        {/* 알림 설정 */}
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">알림 설정</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">가격 변동 알림</h3>
                <p className="text-sm text-muted-foreground">
                  관심 매물의 가격이 변동될 때 알림을 받습니다
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">주간 리포트</h3>
                <p className="text-sm text-muted-foreground">
                  매주 관심 매물의 시장 동향을 요약해서 보내드립니다
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* 개인 정보 */}
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">개인 정보</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">이메일</label>
              <input 
                type="email" 
                value="user@example.com" 
                disabled
                className="w-full p-3 border rounded-md bg-muted"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">이름</label>
              <input 
                type="text" 
                value="홍길동" 
                className="w-full p-3 border rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
              변경사항 저장
            </button>
          </div>
        </div>
        
        {/* 계정 관리 */}
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">계정 관리</h2>
          
          <div className="space-y-4">
            <button className="text-destructive hover:underline">
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 