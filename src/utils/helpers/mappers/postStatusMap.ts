import { PostStatus } from '../../../typings/enum';

export const postStatusMap: Record<PostStatus, string> = {
  [PostStatus.temp]: 'временный',
  [PostStatus.publish]: 'опубликовано',
  [PostStatus.pending]: 'на модерации',
  [PostStatus.draft]: 'черновик',
  [PostStatus.future]: 'запланировано',
  [PostStatus.private]: 'приватный',
  [PostStatus.trash]: 'в корзине',
};
