/**
 * Интеграционные тесты с реальными данными
 * Основаны на функциональности из test-enhanced-article.ts
 */

import { beforeEach, describe, expect, it } from "vitest";
import {
  type ArticleStructure,
  EnhancedArticle,
  type Guest,
  type MarkedList,
  type Table,
  type Title1,
} from "../src/enhanced-article";
import { fullTestText } from "./fixture";

describe("Integration Tests", () => {
  describe("Full Article Processing", () => {
    let article: EnhancedArticle;
    let structures: ArticleStructure[];

    beforeEach(() => {
      article = new EnhancedArticle(fullTestText);
      structures = article.splitted;
    });

    it("should process the full test article correctly", () => {
      expect(structures.length).toBeGreaterThan(20);

      // Проверяем наличие всех основных типов структур
      const types = new Set(structures.map((s) => s.getType()));

      expect(types.has("paragraph")).toBe(true);
      expect(types.has("guest")).toBe(true);
      expect(types.has("title2")).toBe(true);
      expect(types.has("title3")).toBe(true);
      expect(types.has("marked-list")).toBe(true);
      expect(types.has("table")).toBe(true);
      expect(types.has("separator")).toBe(true);
    });

    it("should extract guest blocks with correct IDs", () => {
      const guestBlocks = structures.filter((s) => s.getType() === "guest");

      expect(guestBlocks).toHaveLength(2);

      const guestIds = guestBlocks.map((g) => (g as Guest).getGuestId());
      expect(guestIds).toContain("olm-g-e56b84bb-b432-4bcb-a9a2-fef7afd58c8c");
      expect(guestIds).toContain("olm-g-768af193-e254-4c27-ab58-c614434872b1");
    });

    it("should parse titles with emojis correctly", () => {
      const titles = structures.filter((s) => s.getType().startsWith("title"));

      // Находим заголовок с эмодзи
      const emojiTitle = titles.find((t) =>
        (t as Title1).getContent().includes("🍂"),
      );
      expect(emojiTitle).toBeDefined();
      expect((emojiTitle as Title1).getContent()).toBe(
        "🍂 Warum gerade jetzt die richtige Zeit ist",
      );
    });

    it("should parse table with correct structure", () => {
      const tables = structures.filter((s) => s.getType() === "table");

      expect(tables).toHaveLength(1);

      const table = tables[0];
      const rows = (table as Table).getRows();

      // Проверяем структуру таблицы
      expect(rows.length).toBeGreaterThan(5);

      // Проверяем заголовок таблицы
      expect(rows[0]).toContain("Küchenhelfer");
      expect(rows[0]).toContain("Preisspanne");
      expect(rows[0]).toContain("Wichtigster Vorteil");
      expect(rows[0]).toContain("Herbst-Einsatz");

      // Проверяем разделитель
      expect(rows[1]).toMatch(/^\|[-\s|]+\|$/);

      // Проверяем данные
      expect(rows[2]).toContain("Dosenöffner");
      expect(rows[2]).toContain("15-25€");
    });

    it("should parse marked lists correctly", () => {
      const markedLists = structures.filter(
        (s) => s.getType() === "marked-list",
      );

      expect(markedLists.length).toBeGreaterThan(0);

      // Проверяем один из списков
      const list = markedLists[0];
      const items = (list as MarkedList).getItems();

      expect(items.length).toBeGreaterThan(1);
      expect(items.some((item) => item.includes("Preis:"))).toBe(true);
    });

    it("should maintain correct order of structures", () => {
      // Проверяем, что первая структура - параграф (введение)
      expect(structures[0].getType()).toBe("paragraph");
      expect(structures[0].content).toContain("Der erste Herbstnebel");

      // Проверяем, что guest блоки идут после введения
      const firstGuestIndex = structures.findIndex(
        (s) => s.getType() === "guest",
      );
      expect(firstGuestIndex).toBeGreaterThan(0);

      // Проверяем, что заголовки идут в логическом порядке
      const titleIndices = structures
        .map((s, i) => ({
          type: s.getType(),
          index: i,
          content: (s as Title1).getContent?.() || "",
        }))
        .filter((item) => item.type.startsWith("title"));

      expect(titleIndices.length).toBeGreaterThan(5);

      // Проверяем иерархию заголовков
      const mainTitle = titleIndices.find((t) =>
        t.content.includes("🍂 Warum gerade jetzt"),
      );
      const subTitle = titleIndices.find((t) =>
        t.content.includes("Der Dosenöffner"),
      );

      expect(mainTitle).toBeDefined();
      expect(subTitle).toBeDefined();
      expect(mainTitle?.type).toBe("title2");
      expect(subTitle?.type).toBe("title3");
    });

    it("should handle complex paragraph content", () => {
      const paragraphs = structures.filter((s) => s.getType() === "paragraph");

      expect(paragraphs.length).toBeGreaterThan(5);

      // Проверяем параграф с жирным текстом
      const boldParagraph = paragraphs.find((p) =>
        p.content.includes("**Kleiner Tipp von mir:**"),
      );
      expect(boldParagraph).toBeDefined();
      expect(boldParagraph.content).toContain(
        "Bevor Sie neue Küchenhelfer kaufen",
      );

      // Проверяем параграф с эмодзи
      const emojiParagraph = paragraphs.find((p) => p.content.includes("💡"));
      expect(emojiParagraph).toBeDefined();
    });

    it("should parse separator correctly", () => {
      const separators = structures.filter((s) => s.getType() === "separator");

      expect(separators).toHaveLength(1);
      expect(separators[0].content).toBe("---");
    });

    it("should provide detailed structure information", () => {
      // Имитируем функциональность из test-enhanced-article.ts
      const typeStats = structures.reduce(
        (acc, structure) => {
          const type = structure.getType();
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Проверяем статистику
      expect(typeStats.paragraph).toBeGreaterThan(5);
      expect(typeStats.guest).toBe(2);
      expect(typeStats.title2).toBeGreaterThan(2);
      expect(typeStats.title3).toBeGreaterThan(3);
      expect(typeStats["marked-list"]).toBeGreaterThan(0);
      expect(typeStats.table).toBe(1);
      expect(typeStats.separator).toBe(1);

      // Проверяем общее количество типов
      const totalTypes = Object.keys(typeStats).length;
      expect(totalTypes).toBeGreaterThanOrEqual(7);
    });
  });

  describe("Content Extraction", () => {
    it("should extract meaningful content from each structure", () => {
      const article = new EnhancedArticle(fullTestText);
      const structures = article.splitted;

      structures.forEach((structure, _index) => {
        // Каждая структура должна иметь непустое содержимое
        expect(structure.content.trim().length).toBeGreaterThan(0);

        // Проверяем специфичные методы для разных типов
        if (structure.getType().startsWith("title")) {
          const titleContent = (structure as any).getContent();
          expect(titleContent.length).toBeGreaterThan(0);
          expect(titleContent).not.toMatch(/^#+\s/); // Не должно содержать markdown символы
        }

        if (structure.getType() === "guest") {
          const guestId = (structure as any).getGuestId();
          expect(guestId.length).toBeGreaterThan(0);
          expect(guestId).toMatch(/^[a-z0-9-]+$/); // Должно быть валидным ID
        }

        if (structure.getType() === "table") {
          const rows = (structure as any).getRows();
          expect(rows.length).toBeGreaterThan(2); // Минимум заголовок + разделитель + данные
        }

        if (structure.getType().includes("list")) {
          const items = (structure as any).getItems();
          expect(items.length).toBeGreaterThan(0);
          items.forEach((item: string) => {
            expect(item.trim().length).toBeGreaterThan(0);
          });
        }
      });
    });

    it("should handle German text correctly", () => {
      const article = new EnhancedArticle(fullTestText);
      const structures = article.splitted;

      // Проверяем, что немецкие символы сохраняются
      const germanChars = ["ä", "ö", "ü", "ß"];
      const hasGermanContent = structures.some((s) =>
        germanChars.some((char) => s.content.includes(char)),
      );

      expect(hasGermanContent).toBe(true);

      // Проверяем конкретные немецкие слова
      const allContent = structures.map((s) => s.content).join(" ");
      expect(allContent).toContain("Küche");
      expect(allContent).toContain("Linkshänder");
      expect(allContent).toContain("Küchenhelfer");
    });
  });

  describe("Error Handling", () => {
    it("should handle malformed content gracefully", () => {
      const malformedContent = `# Title
      
[[malformed-guest
      
|incomplete|table
      
\`\`\`unclosed-code
const x = 1;
      
1. incomplete list`;

      expect(() => {
        const article = new EnhancedArticle(malformedContent);
        const structures = article.splitted;

        // Должно обработать корректные части
        expect(structures.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

    it("should handle very long content", () => {
      const longContent = fullTestText.repeat(10);

      expect(() => {
        const article = new EnhancedArticle(longContent);
        const structures = article.splitted;

        expect(structures.length).toBeGreaterThan(200);
      }).not.toThrow();
    });
  });
});
