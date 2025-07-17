import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeDefined();
    expect(button.textContent).toBe('Click me');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole('button', { name: 'Test' });
    expect(button.className).toContain('custom-class');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    
    const button = screen.getByRole('button', { name: 'Clickable' });
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
}); 