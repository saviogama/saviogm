import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should initialize in dark mode when matchMedia matches', () => {
    mockMatchMedia(true);

    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should initialize in light mode when matchMedia does not match', () => {
    mockMatchMedia(false);

    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle theme when button is clicked', async () => {
    mockMatchMedia(true);

    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await userEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
