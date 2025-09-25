import type { BCMSEntryContentParsed } from '../content';
import type { BCMSEntryStatuses } from '../status';

export interface GoodsEntryMetaItem {
    title: string;
    slug: string;
    magic?: string;
    price_value?: number;
    price_currency?: string;
    image?: string[];
    clear_link_to_market?: string;
    affiliate_link_to_market?: string;
}

export interface GoodsEntryMeta {
    en?: GoodsEntryMetaItem;
}

export interface GoodsEntry {
    _id: string;
    createdAt: number;
    updatedAt: number;
    instanceId: string;
    templateId: string;
    userId: string;
    statuses: BCMSEntryStatuses;
    meta: GoodsEntryMeta;
    content: BCMSEntryContentParsed;
}