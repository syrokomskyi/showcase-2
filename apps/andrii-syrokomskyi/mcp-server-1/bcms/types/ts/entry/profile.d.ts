import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';

export interface ProfileEntryMetaItem {
    title: string;
    slug: string;
    theme?: string;
    country: string[];
    language: string[];
}

export interface ProfileEntryMeta {
    en?: ProfileEntryMetaItem;
}

export interface ProfileEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: ProfileEntryMeta;
    content: BCMSEntryContentParsed;
}