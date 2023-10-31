import { TextField } from '@mui/material';
import { StandardTextFieldProps, TextFieldProps } from '@mui/material/TextField/TextField';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import React, { useMemo, useState } from 'react';

import TextFieldImage, { MediaTextFieldProps } from '../../../components/TextFieldImage/TextFieldImage';
import { TermType, TermTypeLink } from '../../../typings/enum';
import { MediaSelectData } from '../../../typings/types';
import { ITaxonomy } from '../types';

type Props = {
  type: TermType;
  link: TermTypeLink;
  fields?: (keyof ITaxonomy)[];
};

const defaultFieldProps: StandardTextFieldProps = { type: 'text', size: 'small', fullWidth: true };

export function useTaxonomyHeaderFields({ type, link, fields }: Props) {
  const cyrillicToTranslit = CyrillicToTranslit();

  const initialState: ITaxonomy = useMemo(
    () => ({ name: '', type, link, slug: '', icon: undefined, image: undefined }),
    [type, link],
  );
  const [taxonomy, setTaxonomy] = useState<ITaxonomy>(initialState);

  const handleChangeText = (field: keyof ITaxonomy) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaxonomy((taxonomy: ITaxonomy) => ({ ...taxonomy, [field]: event.target.value }));
  };
  const handleChangeMedia = (field: keyof ITaxonomy) => (image: MediaSelectData) => {
    setTaxonomy((taxonomy: ITaxonomy) => ({ ...taxonomy, [field]: image }));
  };
  const handleDeleteMedia = (field: keyof ITaxonomy) => () => {
    setTaxonomy((taxonomy: ITaxonomy) => ({ ...taxonomy, [field]: undefined }));
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const slug = cyrillicToTranslit.transform(event.target.value, '-').toLowerCase();
    setTaxonomy((taxonomy: ITaxonomy) => ({ ...taxonomy, slug }));
  };

  const standardFields: (TextFieldProps & {
    Component: (props: TextFieldProps) => JSX.Element;
  })[] = useMemo(
    () => [
      {
        name: 'name',
        Component: TextField,
        ...defaultFieldProps,
        label: 'Название',
        value: taxonomy.name || '',
        focused: !!taxonomy.name,
        onChange: handleChangeText('name'),
      },
      {
        name: 'slug',
        Component: TextField,
        ...defaultFieldProps,
        label: 'Ярлык',
        value: taxonomy.slug || '',
        focused: !!taxonomy.slug,
        onChange: handleChangeText('slug'),
        inputProps: { pattern: '[A-Za-z]' },
        onBlur: handleBlur,
      },
      {
        name: 'description',
        Component: TextField,
        ...defaultFieldProps,
        label: 'Описание',
        value: taxonomy.description || '',
        focused: !!taxonomy.description,
        onChange: handleChangeText('description'),
      },
    ],
    [handleBlur, taxonomy.description, taxonomy.name, taxonomy.slug],
  );
  const mediaFields: (MediaTextFieldProps & {
    name: keyof ITaxonomy;
    Component: (props: MediaTextFieldProps) => JSX.Element;
  })[] = useMemo(
    () => [
      {
        name: 'icon',
        Component: TextFieldImage,
        label: 'Иконка',
        size: 'small',
        value: taxonomy.icon as MediaSelectData,
        onSelect: handleChangeMedia('icon'),
        onDelete: handleDeleteMedia('icon'),
      },
      {
        name: 'image',
        Component: TextFieldImage,
        label: 'Картинка',
        size: 'small',
        value: taxonomy.image as MediaSelectData,
        onSelect: handleChangeMedia('image'),
        onDelete: handleDeleteMedia('image'),
      },
    ],
    [taxonomy.icon, taxonomy.image],
  );

  return {
    taxonomy,
    initialTaxonomy: initialState,
    setTaxonomy,
    fields: [...standardFields, ...mediaFields].filter((item) => fields.includes(item?.name as keyof ITaxonomy)),
  };
}
