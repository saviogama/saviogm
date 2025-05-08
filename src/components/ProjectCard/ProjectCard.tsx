import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { SiAngular, SiJavascript, SiReact, SiTypescript } from 'react-icons/si';
import type { ProjectCardProps } from './ProjectCard.types';

export function ProjectCard({
  description,
  github,
  image,
  link,
  tags,
  title,
}: ProjectCardProps) {
  const tagIconMap: Record<string, React.ReactNode> = {
    react: <SiReact size={14} className="ml-1 text-sky-500" />,
    angular: <SiAngular size={14} className="ml-1 text-red-500" />,
    javascript: <SiJavascript size={14} className="ml-1 text-yellow-400" />,
    typescript: <SiTypescript size={14} className="ml-1 text-blue-500" />,
  };

  function getTagIcon(tag: string) {
    return tagIconMap[tag.toLowerCase()] ?? null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-zinc-800 shadow-md overflow-hidden transition-shadow"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div className="flex items-center bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1">
                <span key={tag} className="text-xs ">
                  {tag}
                </span>
                {getTagIcon(tag)}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              aria-label="GitHub"
              className="hover:opacity-75"
              href={github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github />
            </a>
            <a
              aria-label="Link"
              className="hover:opacity-75"
              href={link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
