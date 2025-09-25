import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';
import type { PropMediaDataParsed } from '@thebcms/types';

export interface ThumbnailEntryMetaItem {
    title: string;
    slug: string;
    image: PropMediaDataParsed;
}

export interface ThumbnailEntryMeta {
    en?: ThumbnailEntryMetaItem;
}

export interface ThumbnailEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: ThumbnailEntryMeta;
    content: BCMSEntryContentParsed;
}