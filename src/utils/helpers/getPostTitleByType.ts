import { PostType } from '../../typings/enum';

export const getPostTitleByType = (type: PostType) => {
  switch (type) {
    case PostType.event:
      return 'событие';
    case PostType.item:
      return 'площадку';
    case PostType.artist:
      return 'артиста';
  }
};
