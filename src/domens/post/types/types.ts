export const defaultCountPost = 30;

export type PagePostProps<ITEM> = {
  search?: string;
  offset?: number;
  count?: number;
  filter?: Record<keyof ITEM, string>;
};

export type ItemsPageProps = {
  total: number;
};

export type PagePostPropsResponseType<ITEM> = {
  items: ITEM[];
  props: ItemsPageProps;
};
