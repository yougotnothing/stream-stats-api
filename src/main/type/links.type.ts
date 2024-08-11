import { Links as LinksEnum } from 'utils/links';

export type Links = Record<
  keyof typeof LinksEnum,
  {
    isActive: boolean;
    link?: string;
  }
>;
