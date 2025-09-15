import type {
  Entry,
  PropMediaDataParsed,
  PropRichTextDataParsed,
} from "@thebcms/types";
import { marked } from "marked";
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
  categories: string[];
}

export const articleToLight = (
  article: ArticleEntry,
  language: string,
): ArticleLight => {
  const meta = getEntryMeta<ArticleEntryMetaItem>(article as Entry, language);

  return {
    title: meta.title,
    slug: meta.slug,
    cover: meta.cover_image,
    categories:
      meta.categories?.map(
        (e) =>
          getEntryMeta<ArticleEntryMetaItem>(e as Entry, language).title ?? "",
      ) ?? [],
    description: meta.description,
  };
};

export async function markdownToHtml(markdown: string): Promise<string> {
  return marked(markdown.replaceAll("\n", "\n\n"));
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
