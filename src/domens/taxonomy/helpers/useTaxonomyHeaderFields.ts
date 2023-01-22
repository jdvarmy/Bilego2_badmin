import { MediaSelectData, Taxonomy } from '../../../typings/types';
import React, { useMemo, useState } from 'react';
import { StandardTextFieldProps, TextFieldProps } from '@mui/material/TextField/TextField';
import { TextField } from '@mui/material';
import { TermType, TermTypeLink } from '../../../typings/enum';
import TextFieldImage, { MediaTextFieldProps } from '../../../components/TextFieldImage/TextFieldImage';

type Props = {
  type: TermType;
  link: TermTypeLink;
  fields?: (keyof Taxonomy)[];
};

const defaultFieldProps: StandardTextFieldProps = { type: 'text', size: 'small', fullWidth: true };

export function useTaxonomyHeaderFields({ type, link, fields }: Props) {
  const initialState: Taxonomy = useMemo(
    () => ({ name: '', type, link, slug: '', icon: undefined, image: undefined }),
    [type, link],
  );
  const [taxonomy, setTaxonomy] = useState<Taxonomy>(initialState);

  const handleChangeText = (field: keyof Taxonomy) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaxonomy((taxonomy: Taxonomy) => ({ ...taxonomy, [field]: event.target.value }));
  };
  const handleChangeMedia = (field: keyof Taxonomy) => (image: MediaSelectData) => {
    setTaxonomy((taxonomy: Taxonomy) => ({ ...taxonomy, [field]: image }));
  };
  const handleDeleteMedia = (field: keyof Taxonomy) => () => {
    setTaxonomy((taxonomy: Taxonomy) => ({ ...taxonomy, [field]: undefined }));
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
    [taxonomy.description, taxonomy.name, taxonomy.slug],
  );
  const mediaFields: (MediaTextFieldProps & {
    name: keyof Taxonomy;
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
    fields: [...standardFields, ...mediaFields].filter((item) => fields.includes(item?.name as keyof Taxonomy)),
  };
}
