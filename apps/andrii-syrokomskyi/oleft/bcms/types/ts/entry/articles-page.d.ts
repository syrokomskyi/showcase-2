import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';
import type { SeoGroup } from '../group/seo';
import type { PropRichTextDataParsed } from '@thebcms/types';

export interface ArticlesPageEntryMetaItem {
    title: string;
    slug: string;
    seo?: SeoGroup;
    headline?: PropRichTextDataParsed;
}

export interface ArticlesPageEntryMeta {
    en?: ArticlesPageEntryMetaItem;
}

export interface ArticlesPageEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: ArticlesPageEntryMeta;
    content: BCMSEntryContentParsed;
}