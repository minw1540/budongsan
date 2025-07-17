export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">매물 검색</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 검색 필터 */}
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">검색 조건</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">지역 선택</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">전체</option>
                  <option value="seoul">서울특별시</option>
                  <option value="gyeonggi">경기도</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">가격대</label>
                <div className="flex space-x-2">
                  <input 
                    type="number" 
                    placeholder="최소 가격" 
                    className="w-full p-2 border rounded-md"
                  />
                  <input 
                    type="number" 
                    placeholder="최대 가격" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90">
                검색
              </button>
            </div>
          </div>
        </div>
        
        {/* 검색 결과 */}
        <div className="lg:col-span-3">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">검색 결과</h2>
            <p className="text-muted-foreground">검색 조건을 설정하여 매물을 찾아보세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 