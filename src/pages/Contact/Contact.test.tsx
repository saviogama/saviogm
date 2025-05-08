import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import emailjs from 'emailjs-com';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Contact from './Contact';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('emailjs-com', () => ({
  default: {
    send: vi.fn(),
  },
}));

describe('Contact page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all form fields', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText('contact.name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('contact.email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('contact.message')).toBeInTheDocument();
  });

  it('should render validation errors when submitting empty form', async () => {
    render(<Contact />);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findAllByText('contact.required')).toHaveLength(3);
  });

  it('should send the message successfully', async () => {
    const mockSend = emailjs.send as ReturnType<typeof vi.fn>;
    mockSend.mockResolvedValue({ status: 200 });

    render(<Contact />);

    await userEvent.type(
      screen.getByPlaceholderText('contact.name'),
      'John Doe'
    );
    await userEvent.type(
      screen.getByPlaceholderText('contact.email'),
      'john@example.com'
    );
    await userEvent.type(
      screen.getByPlaceholderText('contact.message'),
      'Hello!'
    );

    await userEvent.click(screen.getByRole('button'));

    expect(mockSend).toHaveBeenCalled();
    expect(
      await screen.findByText('contact.status.success')
    ).toBeInTheDocument();
  });

  it('should render error message when sending fails', async () => {
    const mockSend = emailjs.send as ReturnType<typeof vi.fn>;
    mockSend.mockRejectedValue(new Error('fail'));

    render(<Contact />);

    await userEvent.type(screen.getByPlaceholderText('contact.name'), 'Sávio');
    await userEvent.type(
      screen.getByPlaceholderText('contact.email'),
      'savio@email.com'
    );
    await userEvent.type(screen.getByPlaceholderText('contact.message'), 'Oi!');

    await userEvent.click(screen.getByRole('button'));

    expect(mockSend).toHaveBeenCalled();
    expect(await screen.findByText('contact.status.error')).toBeInTheDocument();
  });
});
