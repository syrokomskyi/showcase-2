import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';

export interface LegalEntryMetaItem {
    title: string;
    slug: string;
    text: string;
}

export interface LegalEntryMeta {
    en?: LegalEntryMetaItem;
}

export interface LegalEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: LegalEntryMeta;
    content: BCMSEntryContentParsed;
}