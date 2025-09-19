import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';
import type { SeoGroup } from '../group/seo';
import type { PropRichTextDataParsed, PropMediaDataParsed } from '@thebcms/types';
import type { ArticleEntry } from '../entry/article';

export interface HomePageEntryMetaItem {
    title: string;
    slug: string;
    seo?: SeoGroup;
    headline: PropRichTextDataParsed;
    description: PropRichTextDataParsed;
    cover_image: PropMediaDataParsed;
    browse_hero_button?: string;
    articles_title?: string;
    articles?: Array<ArticleEntry>;
    browse_articles_button?: string;
    previous_goods_button?: string;
    next_goods_button?: string;
    goods_singular_word?: string;
    goods_plural_word?: string;
}

export interface HomePageEntryMeta {
    en?: HomePageEntryMetaItem;
}

export interface HomePageEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: HomePageEntryMeta;
    content: BCMSEntryContentParsed;
}