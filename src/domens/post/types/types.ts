export const defaultCountPost = 30;

export type PagePostProps<POST> = {
  offset?: number;
  count?: number;
  filter?: Partial<Record<keyof POST, unknown>>;
};

export type ItemsPageProps = {
  total: number;
};

export type PagePostPropsResponseType<POST> = {
  items: POST[];
  props: ItemsPageProps;
};
