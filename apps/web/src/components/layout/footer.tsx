export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 나만의 스마트 부동산 시트. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              개인정보처리방침
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              이용약관
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              고객지원
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 