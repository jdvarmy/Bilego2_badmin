import { PostStatus } from '../../typings/enum';

export function getPostStatusColor(
  status: PostStatus,
): 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' {
  switch (status) {
    case PostStatus.trash:
    case PostStatus.temp:
      return 'error';
    case PostStatus.publish:
      return 'success';
    case PostStatus.private:
    case PostStatus.pending:
      return 'warning';
    case PostStatus.future:
      return 'info';
    case PostStatus.draft:
      return 'primary';
    default:
      return 'primary';
  }
}
