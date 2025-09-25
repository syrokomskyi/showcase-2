import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';

export interface FooterEntryMetaItem {
    title: string;
    slug: string;
    copyright_note?: string;
}

export interface FooterEntryMeta {
    en?: FooterEntryMetaItem;
}

export interface FooterEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: FooterEntryMeta;
    content: BCMSEntryContentParsed;
}