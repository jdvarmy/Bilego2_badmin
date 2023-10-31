import React, { memo } from 'react';

import TextFieldImage from '../../../../components/TextFieldImage/TextFieldImage';
import { PostType } from '../../../../typings/enum';
import { useChangeFnMediaPostField } from '../../../post/hooks/useChangeFnMediaPostField';
import { useDeleteFnPostField } from '../../../post/hooks/useDeleteFnPostField';
import { IItem } from '../../types';

type Props = {
  image: IItem['image'];
};

export const ItemInfoMediaField = memo(function ItemInfoMediaField({ image }: Props) {
  const handleChangeImage = useChangeFnMediaPostField({ field: 'image', type: PostType.item });
  const handleDeleteImage = useDeleteFnPostField({ field: 'image', type: PostType.item });

  return <TextFieldImage size='small' value={image} onSelect={handleChangeImage} onDelete={handleDeleteImage} />;
});
