/**
 * Тесты для всех классов структур статьи
 */

import { describe, expect, it } from "vitest";
import {
  Code,
  Guest,
  MarkedList,
  NumericList,
  Paragraph,
  Separator,
  Table,
  Title1,
  Title2,
  Title3,
  Title4,
  Title5,
  Title6,
} from "../src/enhanced-article";
import { simpleTestCases } from "./fixture";

describe("Article Structures", () => {
  describe("Title Classes", () => {
    it("should create Title1 with correct type and content", () => {
      const title = new Title1(simpleTestCases.title1);

      expect(title.getType()).toBe("title1");
      expect(title.getClassName()).toBe("Title");
      expect(title.getContent()).toBe("Заголовок первого уровня");
      expect(title.raw).toBe(simpleTestCases.title1);
    });

    it("should create Title2 with correct type and content", () => {
      const title = new Title2(simpleTestCases.title2);

      expect(title.getType()).toBe("title2");
      expect(title.getClassName()).toBe("Title");
      expect(title.getContent()).toBe("Заголовок второго уровня");
      expect(title.raw).toBe(simpleTestCases.title2);
    });

    it("should create Title3 with correct type and content", () => {
      const title = new Title3(simpleTestCases.title3);

      expect(title.getType()).toBe("title3");
      expect(title.getClassName()).toBe("Title");
      expect(title.getContent()).toBe("Заголовок третьего уровня");
      expect(title.raw).toBe(simpleTestCases.title3);
    });

    it("should create Title4 with correct type and content", () => {
      const title = new Title4(simpleTestCases.title4);

      expect(title.getType()).toBe("title4");
      expect(title.getClassName()).toBe("Title");
      expect(title.getContent()).toBe("Заголовок четвертого уровня");
      expect(title.raw).toBe(simpleTestCases.title4);
    });

    it("should create Title5 with correct type and content", () => {
      const title = new Title5(simpleTestCases.title5);

      expect(title.getType()).toBe("title5");
      expect(title.getClassName()).toBe("Title");
      expect(title.getContent()).toBe("Заголовок пятого уровня");
      expect(title.raw).toBe(simpleTestCases.title5);
    });

    it("should create Title6 with correct type and content", () => {
      const title = new Title6(simpleTestCases.title6);

      expect(title.getType()).toBe("title6");
      expect(title.getClassName()).toBe("Title");
      expect(title.getContent()).toBe("Заголовок шестого уровня");
      expect(title.raw).toBe(simpleTestCases.title6);
    });

    it("should handle titles with emojis and special characters", () => {
      const titleWithEmoji = new Title2(
        "## 🍂 Warum gerade jetzt die richtige Zeit ist",
      );

      expect(titleWithEmoji.getContent()).toBe(
        "🍂 Warum gerade jetzt die richtige Zeit ist",
      );
      expect(titleWithEmoji.getType()).toBe("title2");
    });
  });

  describe("Title without space is paragraph", () => {
    it("should create paragraph from Title1 with correct type and content", () => {
      const title = new Paragraph(simpleTestCases.notitle1);

      expect(title.getType()).toBe("paragraph");
      expect(title.getClassName()).toBe("Paragraph");
      expect(title.raw).toBe(simpleTestCases.notitle1);
    });

    it("should create paragraph from Title2 with correct type and content", () => {
      const title = new Paragraph(simpleTestCases.notitle2);

      expect(title.getType()).toBe("paragraph");
      expect(title.getClassName()).toBe("Paragraph");
      expect(title.raw).toBe(simpleTestCases.notitle2);
    });

    it("should create paragraph from Title3 with correct type and content", () => {
      const title = new Paragraph(simpleTestCases.notitle3);

      expect(title.getType()).toBe("paragraph");
      expect(title.getClassName()).toBe("Paragraph");
      expect(title.raw).toBe(simpleTestCases.notitle3);
    });

    it("should create paragraph from Title4 with correct type and content", () => {
      const title = new Paragraph(simpleTestCases.notitle4);

      expect(title.getType()).toBe("paragraph");
      expect(title.getClassName()).toBe("Paragraph");
      expect(title.raw).toBe(simpleTestCases.notitle4);
    });

    it("should create paragraph from Title5 with correct type and content", () => {
      const title = new Paragraph(simpleTestCases.notitle5);

      expect(title.getType()).toBe("paragraph");
      expect(title.getClassName()).toBe("Paragraph");
      expect(title.raw).toBe(simpleTestCases.notitle5);
    });

    it("should create paragraph from Title6 with correct type and content", () => {
      const title = new Paragraph(simpleTestCases.notitle6);

      expect(title.getType()).toBe("paragraph");
      expect(title.getClassName()).toBe("Paragraph");
      expect(title.raw).toBe(simpleTestCases.notitle6);
    });
  });

  describe("Paragraph Class", () => {
    it("should create Paragraph with correct type and content", () => {
      const paragraph = new Paragraph(simpleTestCases.paragraph);

      expect(paragraph.getType()).toBe("paragraph");
      expect(paragraph.getClassName()).toBe("Paragraph");
      expect(paragraph.raw).toBe(simpleTestCases.paragraph);
    });

    it("should handle multiline paragraphs", () => {
      const multilineParagraph = `Первая строка параграфа.
Вторая строка параграфа.
Третья строка параграфа.`;

      const paragraph = new Paragraph(multilineParagraph);

      expect(paragraph.getType()).toBe("paragraph");
      expect(paragraph.raw).toBe(multilineParagraph);
    });
  });

  describe("Table Class", () => {
    it("should create Table with correct type and parse rows", () => {
      const table = new Table(simpleTestCases.table);

      expect(table.getType()).toBe("table");
      expect(table.getClassName()).toBe("Table");

      const rows = table.getRows();
      expect(rows).toHaveLength(3);
      expect(rows[0]).toBe("|Колонка 1|Колонка 2|Колонка 3|");
      expect(rows[1]).toBe("|---|---|---|");
      expect(rows[2]).toBe("|Значение 1|Значение 2|Значение 3|");
    });

    it("should handle table with empty lines", () => {
      const tableWithEmptyLines = `|Col1|Col2|
|---|---|

|Val1|Val2|`;

      const table = new Table(tableWithEmptyLines);
      const rows = table.getRows();

      expect(rows).toHaveLength(3);
      expect(rows[0]).toBe("|Col1|Col2|");
      expect(rows[1]).toBe("|---|---|");
      expect(rows[2]).toBe("|Val1|Val2|");
    });
  });

  describe("Code Class", () => {
    it("should create Code with language detection", () => {
      const code = new Code(simpleTestCases.codeWithLanguage);

      expect(code.getType()).toBe("code");
      expect(code.getClassName()).toBe("Code");
      expect(code.getLanguage()).toBe("javascript");

      const codeContent = code.getCodeContent();
      expect(codeContent).toBe(`function hello() {
  console.log('Hello, World!');
}`);
    });

    it("should handle code without language", () => {
      const code = new Code(simpleTestCases.codeWithoutLanguage);

      expect(code.getLanguage()).toBe("");

      const codeContent = code.getCodeContent();
      expect(codeContent).toBe(`const x = 42;
const y = 'test';`);
    });

    it("should handle inline code blocks", () => {
      const inlineCode = "```\nconst x = 1;\n```";
      const code = new Code(inlineCode);

      expect(code.getCodeContent()).toBe("const x = 1;");
      expect(code.getLanguage()).toBe("");
    });
  });

  describe("NumericList Class", () => {
    it("should create NumericList and parse items", () => {
      const list = new NumericList(simpleTestCases.numericList);

      expect(list.getType()).toBe("numeric-list");
      expect(list.getClassName()).toBe("List");

      const items = list.getItems();
      expect(items).toHaveLength(3);
      expect(items[0]).toBe("Первый элемент списка");
      expect(items[1]).toBe("Второй элемент списка");
      expect(items[2]).toBe("Третий элемент списка");
    });

    it("should handle numeric list with different numbering", () => {
      const customList = `5. Пятый элемент
10. Десятый элемент
100. Сотый элемент`;

      const list = new NumericList(customList);
      const items = list.getItems();

      expect(items).toHaveLength(3);
      expect(items[0]).toBe("Пятый элемент");
      expect(items[1]).toBe("Десятый элемент");
      expect(items[2]).toBe("Сотый элемент");
    });
  });

  describe("MarkedList Class", () => {
    it("should create MarkedList with dash markers", () => {
      const list = new MarkedList(simpleTestCases.markedList);

      expect(list.getType()).toBe("marked-list");
      expect(list.getClassName()).toBe("List");

      const items = list.getItems();
      expect(items).toHaveLength(3);
      expect(items[0]).toBe("Первый элемент");
      expect(items[1]).toBe("Второй элемент");
      expect(items[2]).toBe("Третий элемент");
    });

    it("should handle asterisk markers", () => {
      const list = new MarkedList(simpleTestCases.markedListWithAsterisk);

      const items = list.getItems();
      expect(items).toHaveLength(3);
      expect(items[0]).toBe("Первый элемент");
      expect(items[1]).toBe("Второй элемент");
      expect(items[2]).toBe("Третий элемент");
    });

    it("should handle plus markers", () => {
      const list = new MarkedList(simpleTestCases.markedListWithPlus);

      const items = list.getItems();
      expect(items).toHaveLength(3);
      expect(items[0]).toBe("Первый элемент");
      expect(items[1]).toBe("Второй элемент");
      expect(items[2]).toBe("Третий элемент");
    });
  });

  describe("Separator Class", () => {
    it("should create Separator with dash", () => {
      const separator = new Separator(simpleTestCases.separatorDash);

      expect(separator.getType()).toBe("separator");
      expect(separator.getClassName()).toBe("Separator");
      expect(separator.raw).toBe("---");
    });

    it("should handle different separator types", () => {
      const separators = [
        simpleTestCases.separatorEqual,
        simpleTestCases.separatorUnderscore,
        simpleTestCases.separatorAsterisk,
      ];

      separators.forEach((sep) => {
        const separator = new Separator(sep);
        expect(separator.getType()).toBe("separator");
        expect(separator.getClassName()).toBe("Separator");
      });
    });
  });

  describe("Guest Class", () => {
    it("should create Guest with 1 guest and extract guest ID", () => {
      const guest = new Guest(simpleTestCases.guest1a);

      expect(guest.getType()).toBe("guest");
      expect(guest.getClassName()).toBe("Guest");
      expect(guest.getGuestIds()).toStrictEqual([
        "olm-g-e56b84bb-b432-4bcb-a9a2-fef7afd58c8c",
      ]);
      expect(guest.raw).toBe(simpleTestCases.guest1a);
    });

    it("should create Guest with 2 guests and extract guest IDs", () => {
      const guest = new Guest(simpleTestCases.guest2a);

      expect(guest.getType()).toBe("guest");
      expect(guest.getClassName()).toBe("Guest");
      expect(guest.getGuestIds()).toStrictEqual([
        "olm-g-e56b84bb-b432-4bcb-a9a2-fef7afd58c8c",
        "olm-g-768af193-e254-4c27-ab58-c614434872b1",
      ]);
      expect(guest.raw).toBe(simpleTestCases.guest2a);
    });

    it("should handle different guest ID formats", () => {
      const customGuest = "[[custom-guest-id-123]]";
      const guest = new Guest(customGuest);

      expect(guest.getGuestIds()).toStrictEqual(["custom-guest-id-123"]);
    });

    it("should handle guest blocks with special characters", () => {
      const specialGuest = "[[guest-id-with-special-chars_123-abc]]";
      const guest = new Guest(specialGuest);

      expect(guest.getGuestIds()).toStrictEqual([
        "guest-id-with-special-chars_123-abc",
      ]);
    });

    it("should return empty string for malformed guest blocks", () => {
      const malformedGuest = "[guest-without-double-brackets]";
      const guest = new Guest(malformedGuest);

      expect(guest.getGuestIds()).toStrictEqual([]);
    });
  });
});
