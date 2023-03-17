import CyrillicToTranslit from 'cyrillic-to-translit-js';

export const translitSlug = (slug: string): string => {
  if (!slug) {
    return '';
  }

  // @ts-ignore
  const cyrillicToTranslit = new CyrillicToTranslit();
  return cyrillicToTranslit.transform(slug, '-').toLowerCase();
};
