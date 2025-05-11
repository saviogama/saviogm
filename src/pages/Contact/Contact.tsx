import emailjs from 'emailjs-com';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { useMetadata } from '../../hooks/useMetadata';
import type { FormData } from './Contact.types';

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormData>();

  useMetadata({
    title: 'Sávio Gama',
    description: t('home.intro.p4'),
    image: '/favicon.svg',
    url: 'https://saviogama.dev/',
  });

  const onSubmit = async (data: FormData) => {
    setStatus('sending');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          reply_to: data.email,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      setStatus('success');
      reset();
    } catch (error) {
      void error;
      setStatus('error');
    }
  };

  return (
    <>
      <section className="flex flex-col gap-4 md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row md:space-x-4 items-center justify-center md:justify-start">
          <h1 className="text-3xl font-bold tracking-wider">Sávio Gama</h1>
          <h2 className="font-dm-serif-display text-sm">{t('contact.role')}</h2>
        </div>

        <div className="flex items-center gap-x-4">
          <a
            aria-label="GitHub"
            className="flex items-center hover:opacity-75"
            href="https://github.com/saviogama"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="text-base font-bold">LinkedIn</span>
            <SiLinkedin size={18} className="ml-1 text-dark-500" />
          </a>
          <a
            aria-label="GitHub"
            className="flex items-center hover:opacity-75"
            href="https://linkedin.com/in/saviogama"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="text-base font-bold">GitHub</span>
            <SiGithub size={18} className="ml-1 text-dark-500" />
          </a>
        </div>
      </section>

      <section className="flex flex-col items-center mt-14">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2">{t('contact.title')}</h3>
          <span className="font-dm-serif-display text-base mb-6">
            {t('contact.info')}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full">
          <div className="w-full mt-4">
            <label htmlFor="name">{t('contact.name')}</label>
            <input
              id="name"
              type="text"
              placeholder={t('contact.name')}
              className="w-full p-2 my-2 border dark:bg-zinc-800"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {t('contact.required')}
              </span>
            )}
          </div>
          <div className="w-full mt-4">
            <label htmlFor="email">{t('contact.email')}</label>
            <input
              id="email"
              type="email"
              placeholder={t('contact.email')}
              className="w-full p-2 my-2 border dark:bg-zinc-800"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {t('contact.required')}
              </span>
            )}
          </div>
          <div className="w-full mt-4">
            <label htmlFor="message">{t('contact.message')}</label>
            <textarea
              id="message"
              placeholder={t('contact.message')}
              className="w-full p-2 my-2 border dark:bg-zinc-800 h-32 resize-none"
              {...register('message', { required: true })}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">
                {t('contact.required')}
              </span>
            )}
          </div>

          <div className="w-full mt-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-4 py-2 mt-4 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition disabled:opacity-50 cursor-pointer"
            >
              {status === 'sending'
                ? t('contact.status.sending')
                : t('contact.submit')}
            </button>
            {status === 'success' && (
              <p className="text-green-600 mt-2">
                {t('contact.status.success')}
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-500 mt-2">{t('contact.status.error')}</p>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
