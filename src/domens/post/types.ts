export const defaultCountPost = 10;

export type PagePostProps<POST> = {
  offset?: number;
  count?: number;
  filter?: Partial<Record<keyof POST, unknown>>;
};

export type ItemsPageProps = {
  total: number;
  offset?: number;
};

export type PagePostPropsResponseType<POST> = {
  items: POST[];
  props: ItemsPageProps;
};
