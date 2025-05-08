import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Home from './Home';

vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>(
    'react-i18next'
  );
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: { language: 'en' },
    }),
    Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  };
});

vi.mock('../../hooks/useMetadata', () => ({
  useMetadata: vi.fn(),
}));

vi.mock('../../data/projects', () => ({
  projects: [
    {
      id: 1,
      title: { en: 'Test Project', pt: 'Projeto de Teste' },
      description: { en: 'A test project', pt: 'Um projeto de teste' },
      github: 'https://github.com/test/project',
      link: 'https://testproject.com',
      image: '/test-image.png',
      tags: ['react', 'typescript'],
    },
  ],
}));

vi.mock('../../components/ProjectCard', () => ({
  ProjectCard: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe('Home', () => {
  it('should render the section title and intro', () => {
    render(<Home />);
    expect(screen.getByText('home.title')).toBeInTheDocument();
    expect(screen.getByText('home.intro.p1')).toBeInTheDocument();
    expect(screen.getByText('home.intro.p2')).toBeInTheDocument();
    expect(screen.getByText('home.intro.p3')).toBeInTheDocument();
    expect(screen.getByText('home.intro.p4')).toBeInTheDocument();
  });

  it('should render the list of projects', () => {
    render(<Home />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
});
