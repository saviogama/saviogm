import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageSwitcher } from './LanguageSwitcher';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: mockLanguage.current,
      changeLanguage: mockLanguage.change,
    },
  }),
}));

const mockLanguage = {
  current: 'pt-BR',
  change: vi.fn((lang) => {
    mockLanguage.current = lang;
  }),
};

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockLanguage.current = 'pt-BR';
    mockLanguage.change.mockClear();
  });

  it('should show "EN" when current language is pt-BR', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('button')).toHaveTextContent('EN');
  });

  it('should show "PT" when current language is en', () => {
    mockLanguage.current = 'en';
    render(<LanguageSwitcher />);
    expect(screen.getByRole('button')).toHaveTextContent('PT');
  });

  it('should call changeLanguage with "en" when current is pt-BR', async () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockLanguage.change).toHaveBeenCalledWith('en');
  });

  it('should call changeLanguage with "pt-BR" when current is en', async () => {
    mockLanguage.current = 'en';
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockLanguage.change).toHaveBeenCalledWith('pt-BR');
  });
});
