import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './header';

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock Zustand store
const mockSetAreaUnit = jest.fn();
const mockStore = {
  areaUnit: 'sqm' as 'sqm' | 'pyeong',
  setAreaUnit: mockSetAreaUnit,
  isAuthenticated: false,
  user: null as any,
};

jest.mock('@/store/use-app-store', () => ({
  useAppStore: () => mockStore,
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with logo', () => {
    render(<Header />);
    
    const logo = screen.getByText('스마트 부동산 시트');
    expect(logo).toBeDefined();
  });

  it('renders navigation links', () => {
    render(<Header />);
    
    expect(screen.getByText('매물 검색')).toBeDefined();
    expect(screen.getByText('나만의 시트')).toBeDefined();
    expect(screen.getByText('설정')).toBeDefined();
  });

  it('displays current area unit', () => {
    render(<Header />);
    
    const unitButton = screen.getByText('㎡');
    expect(unitButton).toBeDefined();
  });

  it('toggles area unit when button is clicked', () => {
    render(<Header />);
    
    const unitButton = screen.getByText('㎡');
    fireEvent.click(unitButton);
    
    expect(mockSetAreaUnit).toHaveBeenCalledWith('pyeong');
  });

  it('shows pyeong unit when area unit is pyeong', () => {
    mockStore.areaUnit = 'pyeong';
    
    render(<Header />);
    
    expect(screen.getByText('평')).toBeDefined();
  });

  it('shows login button when not authenticated', () => {
    mockStore.isAuthenticated = false;
    mockStore.user = null;
    
    render(<Header />);
    
    expect(screen.getByText('로그인')).toBeDefined();
  });

  it('shows user info when authenticated', () => {
    mockStore.isAuthenticated = true;
    mockStore.user = {
      id: 'test-id',
      email: 'test@example.com',
      name: 'Test User',
    };
    
    render(<Header />);
    
    expect(screen.getByText('Test User')).toBeDefined();
  });
}); 