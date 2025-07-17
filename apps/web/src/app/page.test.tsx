import { render, screen } from '@testing-library/react';
import HomePage from './page';

// Next.js Link 컴포넌트 모킹
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('나만의 스마트 부동산 시트');
  });

  it('renders the description', () => {
    render(<HomePage />);
    const description = screen.getByText('현명한 부동산 결정을 위한 당신의 파트너');
    expect(description).toBeDefined();
  });

  it('renders navigation cards', () => {
    render(<HomePage />);
    
    // 카드 제목들이 있는지 확인
    expect(screen.getByText('매물 검색')).toBeDefined();
    expect(screen.getByText('나만의 시트')).toBeDefined();
    expect(screen.getByText('설정')).toBeDefined();
  });

  it('renders navigation links', () => {
    render(<HomePage />);
    
    // 링크들이 정확한 href를 가지는지 확인
    const searchLink = screen.getByText('검색하기').closest('a');
    const sheetLink = screen.getByText('시트 보기').closest('a');
    const settingsLink = screen.getByText('설정하기').closest('a');
    
    expect(searchLink?.getAttribute('href')).toBe('/search');
    expect(sheetLink?.getAttribute('href')).toBe('/my-sheet');
    expect(settingsLink?.getAttribute('href')).toBe('/settings');
  });
}); 