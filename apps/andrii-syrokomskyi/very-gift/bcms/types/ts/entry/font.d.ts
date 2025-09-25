import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';

export interface FontEntryMetaItem {
    title: string;
    slug: string;
    preconnect?: string;
    crossorigin_preconnect?: string;
    stylesheet?: string;
}

export interface FontEntryMeta {
    en?: FontEntryMetaItem;
}

export interface FontEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: FontEntryMeta;
    content: BCMSEntryContentParsed;
}