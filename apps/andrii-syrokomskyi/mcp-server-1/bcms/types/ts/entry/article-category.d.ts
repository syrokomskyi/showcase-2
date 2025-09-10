import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';

export interface ArticleCategoryEntryMetaItem {
    title: string;
    slug: string;
}

export interface ArticleCategoryEntryMeta {
    en?: ArticleCategoryEntryMetaItem;
}

export interface ArticleCategoryEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: ArticleCategoryEntryMeta;
    content: BCMSEntryContentParsed;
}