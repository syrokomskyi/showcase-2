import type {
  EntryParsed,
  PropMediaDataParsed,
  PropRichTextDataParsed,
} from "@thebcms/types";
import { type ArticleStructure, EnhancedArticle } from "enhanced-article";
import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import type {
  ArticleEntry,
  ArticleEntryMetaItem,
} from "../../bcms/types/ts/entry/article";
import { getEntryMeta } from "./localization";

export interface ArticleLight {
  title: string;
  slug: string;
  cover?: PropMediaDataParsed;
  description?: PropRichTextDataParsed;
}

export const articleToLight = (
  article: ArticleEntry,
  language: string,
): ArticleLight => {
  const meta = getEntryMeta<ArticleEntryMetaItem>(
    article as EntryParsed,
    language,
  );

  return {
    title: meta.title,
    slug: meta.slug,
    cover: meta.cover_image,
    description: meta.description,
  };
};

marked.use({
  ...gfmHeadingId(),
  async: true,
  pedantic: false,
  gfm: true,
  breaks: true,
});

export async function markdownToHtml(markdown: string): Promise<string> {
  return await marked(markdown);
}

// Transform markdown to structured article data for Astro components
export function markdownToStructures(markdown: string): ArticleStructure[] {
  return new EnhancedArticle(markdown).splitted;
}

// Remove the line with `title` from `text`.
export function removeTitle(text: string, title: string): string {
  return text.length > 0 && title.length > 0
    ? text
        .split("\n")
        .filter((line) => !line.includes(title))
        .join("\n")
        .trim()
    : text;
}
