import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectCard } from './ProjectCard';

describe('ProjectCard', () => {
  const mockProps = {
    title: 'Test Project',
    description: 'A test project description',
    image: '/test-image.png',
    github: 'https://github.com/test/project',
    link: 'https://testproject.com',
    tags: ['react', 'typescript'],
  };

  it('should render title, description, and image', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    const image = screen.getByAltText(mockProps.title);
    expect(image).toHaveAttribute('src', mockProps.image);
    expect(image).toHaveAttribute('alt', mockProps.title);
  });

  it('should render all tags with their names', () => {
    render(<ProjectCard {...mockProps} />);
    mockProps.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('should contains GitHub and external link', () => {
    render(<ProjectCard {...mockProps} />);
    const githubLink = screen.getByLabelText('GitHub');
    const externalLink = screen.getByLabelText('Link');

    expect(githubLink).toHaveAttribute('href', mockProps.github);
    expect(externalLink).toHaveAttribute('href', mockProps.link);
  });
});
