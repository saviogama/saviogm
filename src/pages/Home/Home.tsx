import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { projects } from '../../data/projects';
import { useMetadata } from '../../hooks/useMetadata';

function Home() {
  const { t, i18n } = useTranslation();
  const lang = ['pt-BR', 'en'].includes(i18n.language)
    ? (i18n.language as 'pt-BR' | 'en')
    : 'en';

  useMetadata({
    title: 'Sávio Gama',
    description: t('home.intro.p1'),
    image: '/favicon.svg',
    url: 'https://saviogama.dev/',
  });

  return (
    <section className="mt-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">{t('home.title')}</h1>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="flex-1">
            <p className="font-lora text-base mb-8 text-neutral-800 dark:text-neutral-200 tracking-wide">
              {t('home.intro.p1')}
            </p>
            <p className="font-lora text-base mb-8 text-neutral-800 dark:text-neutral-200 tracking-wide">
              {t('home.intro.p2')}
            </p>
            <p className="font-lora text-base mb-8 text-neutral-800 dark:text-neutral-200 tracking-wide">
              {t('home.intro.p3')}
            </p>
            <p className="font-lora text-base tracking-wide">
              <Trans
                i18nKey="home.intro.p4"
                components={{
                  CustomLink: (
                    <Link
                      to="/contact"
                      className="text-base text-blue-500 hover:underline"
                    />
                  ),
                }}
              />
            </p>
          </div>

          <img
            src="/assets/profile-pic.png"
            alt="Foto de perfil"
            className="w-full max-w-[300px] md:max-w-[350px] aspect-square object-cover"
          />
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-xl font-bold mb-6">{t('home.projects')}</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              link={project.link}
              github={project.github}
              image={project.image}
              key={project.id}
              tags={project.tags}
              title={project.title[lang]}
              description={project.description[lang]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
