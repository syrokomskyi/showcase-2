import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';

export interface HeaderEntryMetaItem {
    title: string;
    slug: string;
}

export interface HeaderEntryMeta {
    en?: HeaderEntryMetaItem;
}

export interface HeaderEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: HeaderEntryMeta;
    content: BCMSEntryContentParsed;
}