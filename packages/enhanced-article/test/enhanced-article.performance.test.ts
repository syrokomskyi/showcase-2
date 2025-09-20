/**
 * Тесты для основного класса EnhancedArticle
 */

import { describe, expect, it } from "vitest";
import { EnhancedArticle } from "../src/enhanced-article";

describe("EnhancedArticle", () => {
  describe("Performance", () => {
    it("should parse large content efficiently", () => {
      // Создаем большой контент
      const largeContent = Array(1000)
        .fill(0)
        .map((_, i) => `## Заголовок ${i}\n\nПараграф ${i} с текстом.\n\n`)
        .join("");

      const startTime = Date.now();
      const article = new EnhancedArticle(largeContent);
      const structures = article.splitted;
      const endTime = Date.now();

      expect(structures).toHaveLength(2000); // 1000 заголовков + 1000 параграфов
      expect(endTime - startTime).toBeLessThan(1000); // Должно выполниться менее чем за 1 секунду
    });
  });
});
