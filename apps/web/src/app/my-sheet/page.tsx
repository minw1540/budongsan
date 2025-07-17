export default function MySheetPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">나만의 시트</h1>
        <div className="flex space-x-2">
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80">
            내보내기
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
            매물 추가
          </button>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">관심 매물 목록</h2>
            <div className="flex items-center space-x-2">
              <select className="p-2 border rounded-md text-sm">
                <option value="recent">최근 추가순</option>
                <option value="price">가격순</option>
                <option value="area">면적순</option>
              </select>
            </div>
          </div>
          
          {/* 테이블 헤더 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="text-left py-3 px-4">단지명</th>
                  <th className="text-left py-3 px-4">면적</th>
                  <th className="text-left py-3 px-4">최근 거래가</th>
                  <th className="text-left py-3 px-4">변동률</th>
                  <th className="text-left py-3 px-4">메모</th>
                  <th className="text-left py-3 px-4">액션</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    아직 추가된 매물이 없습니다.
                    <br />
                    <button className="text-primary hover:underline mt-2">
                      첫 번째 매물을 추가해보세요
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 