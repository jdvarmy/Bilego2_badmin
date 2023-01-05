export enum UserRole {
  admin = 'bilego_admin',
  manager = 'admin_panel_manager',
  organizer = 'event_ceo',
  subscriber = 'subscriber',
}
export enum BaseRecordStatus {
  create = 'create',
  edit = 'edit',
}

export enum PostStatus {
  temp = 'temp', // - временный шаблон.
  publish = 'publish', // - опубликованный.
  pending = 'pending', // - на модерации.
  draft = 'draft', // - черновик.
  future = 'future', // - запланированный.
  private = 'private', // - личный.
  trash = 'trash', // - удаленный (в корзине)
}

export enum EventHeaderType {
  image = 'image',
  video = 'video',
  filter = 'filter',
}

export enum City {
  moscow = 'moscow',
  petersburg = 'petersburg',
}

export enum TicketType {
  simple = 'simple',
  map = 'map',
}

export enum CircleColors {
  default = '#c7c7c7',
  hovered = '#b490ca',
  selectedOuter = '#ffffff',
  selectedInner = '#f5576c',
}

export enum TermType {
  eventCategory = 'category',
  eventGenre = 'genre',
  eventSelection = 'selection',
  eventFeeling = 'feeling',
  itemType = 'type',
}

export enum TermTypeLink {
  event = 'event',
  item = 'item',
}

export enum ButtonType {
  edit = 'edit',
  save = 'save',
}
