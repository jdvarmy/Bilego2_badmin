export const ticketsScope = 'tickets' as const;

// todo: нужно рассчитывать максимальное приближение исходя из размеров карты
export const maxScale = 0.85 as const;

export type Scale = {
  x: null | number;
  y: null | number;
};

export type ViewBoxSizes = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};
