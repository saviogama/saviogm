import { useEffect } from 'react';

type MetadataOptions = {
  description?: string;
  image?: string;
  title: string;
  url?: string;
};

export function useMetadata({
  description,
  image,
  title,
  url,
}: MetadataOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let meta =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');

        if (name.startsWith('og:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }

        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    if (description) {
      setMeta('description', description);
      setMeta('og:description', description);
    }

    setMeta('og:title', title);

    if (image) {
      setMeta('og:image', image);
    }

    if (url) {
      setMeta('og:url', url);
    }

    setMeta('og:type', 'website');
  }, [title, description, image, url]);
}
