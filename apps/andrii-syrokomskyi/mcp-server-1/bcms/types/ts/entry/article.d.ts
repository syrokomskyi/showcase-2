import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';
import type { ArticleCategoryEntry } from '../entry/article-category';
import type { SeoGroup } from '../group/seo';
import type { PropRichTextDataParsed } from '@thebcms/types';

export interface ArticleEntryMetaItem {
    title: string;
    slug: string;
    magic?: string;
    text?: string;
    category?: Array<ArticleCategoryEntry>;
    seo?: SeoGroup;
    description?: PropRichTextDataParsed;
    goods?: string[];
}

export interface ArticleEntryMeta {
    en?: ArticleEntryMetaItem;
}

export interface ArticleEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: ArticleEntryMeta;
    content: BCMSEntryContentParsed;
}