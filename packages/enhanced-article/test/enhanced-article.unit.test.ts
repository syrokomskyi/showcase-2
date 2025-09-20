/**
 * Тесты для основного класса EnhancedArticle
 */

import { describe, expect, it } from "vitest";
import {
  type Code,
  EnhancedArticle,
  type Guest,
  type MarkedList,
  type NumericList,
  type Table,
} from "../src/enhanced-article";
import {
  complexTestCases,
  expectedResults,
  fullTestText,
  simpleTestCases,
} from "./fixture";

describe("EnhancedArticle", () => {
  describe("Basic Functionality", () => {
    it("should create EnhancedArticle instance", () => {
      const article = new EnhancedArticle("Simple text");

      expect(article).toBeInstanceOf(EnhancedArticle);
      expect(article.splitted).toHaveLength(1);
    });

    it("should handle empty text", () => {
      const article = new EnhancedArticle("");

      expect(article.splitted).toHaveLength(0);
    });

    it("should handle whitespace-only text", () => {
      const article = new EnhancedArticle("   \n\n   \t   ");

      expect(article.splitted).toHaveLength(0);
    });

    it("should trim input text", () => {
      const article = new EnhancedArticle("  \n  Simple text  \n  ");
      const structures = article.splitted;

      expect(structures).toHaveLength(1);
      expect(structures[0].getType()).toBe("paragraph");
      expect(structures[0].content).toBe("Simple text");
    });
  });

  describe("Single Structure Parsing", () => {
    it("should parse single title correctly", () => {
      const article = new EnhancedArticle(simpleTestCases.title1);
      const structures = article.splitted;

      expect(structures).toHaveLength(1);
      expect(structures[0].getType()).toBe("title1");
      expect(structures[0].getClassName()).toBe("title-1");
    });

    it("should parse single paragraph correctly", () => {
      const article = new EnhancedArticle(simpleTestCases.paragraph);
      const structures = article.splitted;

      expect(structures).toHaveLength(1);
      expect(structures[0].getType()).toBe("paragraph");
    });

    it("should parse single guest block correctly", () => {
      const article = new EnhancedArticle(simpleTestCases.guest);
      const structures = article.splitted;

      expect(structures).toHaveLength(1);
      expect(structures[0].getType()).toBe("guest");
      expect((structures[0] as Guest).getGuestId()).toBe(
        "olm-g-e56b84bb-b432-4bcb-a9a2-fef7afd58c8c",
      );
    });

    it("should parse single table correctly", () => {
      const article = new EnhancedArticle(simpleTestCases.table);
      const structures = article.splitted;

      expect(structures).toHaveLength(1);
      expect(structures[0].getType()).toBe("table");
      expect((structures[0] as Table).getRows()).toHaveLength(3);
    });

    it("should parse single code block correctly", () => {
      const article = new EnhancedArticle(simpleTestCases.codeWithLanguage);
      const structures = article.splitted;

      expect(structures).toHaveLength(1);
      expect(structures[0].getType()).toBe("code");
      expect((structures[0] as Code).getLanguage()).toBe("javascript");
    });

    it("should parse single numeric list correctly", () => {
      const article = new EnhancedArticle(simpleTestCases.numericList);
      const structures = article.splitted;

      expect(structures).toHaveLength(1);
      expect(structures[0].getType()).toBe("numeric-list");
      expect((structures[0] as NumericList).getItems()).toHaveLength(3);
    });

    it("should parse single marked list correctly", () => {
      const article = new EnhancedArticle(simpleTestCases.markedList);
      const structures = article.splitted;

      expect(structures).toHaveLength(1);
      expect(structures[0].getType()).toBe("marked-list");
      expect((structures[0] as MarkedList).getItems()).toHaveLength(3);
    });

    it("should parse single separator correctly", () => {
      const article = new EnhancedArticle(simpleTestCases.separatorDash);
      const structures = article.splitted;

      expect(structures).toHaveLength(1);
      expect(structures[0].getType()).toBe("separator");
    });
  });

  describe("Multiple Guest Blocks", () => {
    it("should parse multiple guest blocks correctly", () => {
      const article = new EnhancedArticle(simpleTestCases.guestMultiple);
      const structures = article.splitted;

      expect(structures).toHaveLength(2);
      expect(structures[0].getType()).toBe("guest");
      expect(structures[1].getType()).toBe("guest");
      expect((structures[0] as Guest).getGuestId()).toBe(
        "olm-g-e56b84bb-b432-4bcb-a9a2-fef7afd58c8c",
      );
      expect((structures[1] as Guest).getGuestId()).toBe(
        "olm-g-768af193-e254-4c27-ab58-c614434872b1",
      );
    });
  });

  describe("Complex Content Parsing", () => {
    it("should parse mixed content correctly", () => {
      const article = new EnhancedArticle(complexTestCases.mixedContent);
      const structures = article.splitted;

      // Проверяем, что все типы структур присутствуют
      const types = structures.map((s) => s.getType());

      expect(types).toContain("title1");
      expect(types).toContain("title2");
      expect(types).toContain("title3");
      expect(types).toContain("paragraph");
      expect(types).toContain("guest");
      expect(types).toContain("numeric-list");
      expect(types).toContain("marked-list");
      expect(types).toContain("code");
      expect(types).toContain("table");
      expect(types).toContain("separator");

      // Проверяем общее количество структур
      expect(structures.length).toBeGreaterThan(10);
    });

    it("should handle nested structures correctly", () => {
      const article = new EnhancedArticle(complexTestCases.nestedStructures);
      const structures = article.splitted;

      // Проверяем последовательность структур
      expect(structures[0].getType()).toBe("title1");
      expect(structures[1].getType()).toBe("title2");
      expect(structures[2].getType()).toBe("paragraph");
      expect(structures[3].getType()).toBe("title3");
      expect(structures[4].getType()).toBe("marked-list");
      expect(structures[5].getType()).toBe("title3");
      expect(structures[6].getType()).toBe("numeric-list");
      expect(structures[7].getType()).toBe("title2");
      expect(structures[8].getType()).toBe("guest");
      expect(structures[9].getType()).toBe("paragraph");
    });

    it("should handle content with empty lines correctly", () => {
      const article = new EnhancedArticle(complexTestCases.withEmptyLines);
      const structures = article.splitted;

      expect(structures).toHaveLength(4);
      expect(structures[0].getType()).toBe("title1");
      expect(structures[1].getType()).toBe("paragraph");
      expect(structures[2].getType()).toBe("title2");
      expect(structures[3].getType()).toBe("paragraph");
    });
  });

  describe("Edge Cases", () => {
    it("should handle malformed markdown correctly", () => {
      const malformedContent = `#Not a title 1 (no space)
#Not a title 2 (no space, glue as paragraph)

###Also not a title

### This is a title

1.Not a list (no space)
- This is a list

|Not|A|Table (no separator row)
|---|---|---|
|This|Is|Table|`;

      const article = new EnhancedArticle(malformedContent);
      const structures = article.splitted;

      // Первые две строки должны быть параграфами
      expect(structures[0].getType()).toBe("paragraph");
      expect(structures[1].getType()).toBe("paragraph");
      expect(structures[2].getType()).toBe("title3");
      expect(structures[3].getType()).toBe("paragraph");
      expect(structures[4].getType()).toBe("marked-list");
      expect(structures[5].getType()).toBe("table");
    });

    it("should handle code blocks with various languages", () => {
      const codeContent = `\`\`\`python
def hello():
    print("Hello")
\`\`\`

\`\`\`
No language specified
\`\`\`

\`\`\`typescript
const x: number = 42;
\`\`\``;

      const article = new EnhancedArticle(codeContent);
      const structures = article.splitted;

      expect(structures).toHaveLength(3);
      expect(structures[0].getType()).toBe("code");
      expect(structures[1].getType()).toBe("code");
      expect(structures[2].getType()).toBe("code");

      expect((structures[0] as Code).getLanguage()).toBe("python");
      expect((structures[1] as Code).getLanguage()).toBe("");
      expect((structures[2] as Code).getLanguage()).toBe("typescript");
    });

    it("should handle different separator styles", () => {
      const separatorContent = `---

===

___

***

****`;

      const article = new EnhancedArticle(separatorContent);
      const structures = article.splitted;

      expect(structures).toHaveLength(5);
      structures.forEach((structure) => {
        expect(structure.getType()).toBe("separator");
      });
    });

    it("should handle mixed list types", () => {
      const mixedLists = `1. First numbered item
2. Second numbered item

- First bullet item
- Second bullet item

* First asterisk item
* Second asterisk item

+ First plus item
+ Second plus item`;

      const article = new EnhancedArticle(mixedLists);
      const structures = article.splitted;
      console.log(structures);

      expect(structures).toHaveLength(4);
      expect(structures[0].getType()).toBe("numeric-list");
      expect(structures[1].getType()).toBe("marked-list");
      expect(structures[2].getType()).toBe("marked-list");
      expect(structures[3].getType()).toBe("marked-list");
    });
  });

  describe("Real Data Test", () => {
    it("should parse full test text correctly", () => {
      const article = new EnhancedArticle(fullTestText);
      const structures = article.splitted;

      // Проверяем общее количество структур
      expect(structures.length).toBe(expectedResults.fullTextStructureCount);

      // Подсчитываем типы структур
      const typeStats = structures.reduce(
        (acc, structure) => {
          const type = structure.getType();
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Проверяем статистику по типам
      Object.entries(expectedResults.fullTextTypes).forEach(
        ([type, expectedCount]) => {
          expect(typeStats[type]).toBe(expectedCount);
        },
      );

      // Проверяем, что guest блоки правильно распознаны
      const guestBlocks = structures.filter((s) => s.getType() === "guest");
      expect(guestBlocks).toHaveLength(2);

      const guestIds = guestBlocks.map((g) => (g as Guest).getGuestId());
      expect(guestIds).toContain("olm-g-e56b84bb-b432-4bcb-a9a2-fef7afd58c8c");
      expect(guestIds).toContain("olm-g-768af193-e254-4c27-ab58-c614434872b1");

      // Проверяем, что таблица правильно распознана
      const tables = structures.filter((s) => s.getType() === "table");
      expect(tables).toHaveLength(1);

      const tableRows = (tables[0] as Table).getRows();
      expect(tableRows.length).toBeGreaterThan(5); // Заголовок + разделитель + данные
    });

    it("should preserve structure order in full text", () => {
      const article = new EnhancedArticle(fullTestText);
      const structures = article.splitted;

      // Проверяем, что первая структура - параграф
      expect(structures[0].getType()).toBe("paragraph");

      // Проверяем, что guest блоки идут в правильном порядке
      const guestIndices = structures
        .map((s, i) => (s.getType() === "guest" ? i : -1))
        .filter((i) => i !== -1);

      expect(guestIndices).toHaveLength(2);
      expect(guestIndices[0]).toBeLessThan(guestIndices[1]);

      // Проверяем, что заголовки присутствуют
      const titleIndices = structures
        .map((s, i) => (s.getType().startsWith("title") ? i : -1))
        .filter((i) => i !== -1);

      expect(titleIndices.length).toBeGreaterThan(0);
    });
  });
});
