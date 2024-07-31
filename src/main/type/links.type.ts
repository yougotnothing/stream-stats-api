import { Links as LinksEnum } from 'enum/links';

export type Links = Record<
  keyof typeof LinksEnum,
  {
    isActive: boolean;
    link?: string;
  }
>;
