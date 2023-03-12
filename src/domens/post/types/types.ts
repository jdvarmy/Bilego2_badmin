export const defaultCountPost = 30;

export type PagePostProps<POST> = {
  // todo: удалить
  search?: string;
  offset?: number;
  count?: number;
  filter?: Record<keyof POST, string>;
};

export type ItemsPageProps = {
  total: number;
};

export type PagePostPropsResponseType<POST> = {
  items: POST[];
  props: ItemsPageProps;
};
