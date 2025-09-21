/**
 * Enhanced Article Parser - разбивает текст статьи на структурированные части
 * Поддерживает все основные структуры Markdown и специальные Guest блоки
 */

// Базовый абстрактный класс для всех структур
export abstract class ArticleStructure {
  constructor(public raw: string) {}

  abstract getType(): string;
  abstract getClassName(): string;
}

export class Title extends ArticleStructure {
  getType(): string {
    return "title";
  }

  getClassName(): string {
    return "Title";
  }

  getContent(): string {
    return this.raw.replace(/^#{1,6}\s+/, "");
  }
}

export class Title1 extends Title {
  getType(): string {
    return "title1";
  }

  getContent(): string {
    return this.raw.replace(/^#\s+/, "");
  }
}

export class Title2 extends Title {
  getType(): string {
    return "title2";
  }

  getContent(): string {
    return this.raw.replace(/^##\s+/, "");
  }
}

export class Title3 extends Title {
  getType(): string {
    return "title3";
  }

  getContent(): string {
    return this.raw.replace(/^###\s+/, "");
  }
}

export class Title4 extends Title {
  getType(): string {
    return "title4";
  }

  getContent(): string {
    return this.raw.replace(/^####\s+/, "");
  }
}

export class Title5 extends Title {
  getType(): string {
    return "title5";
  }

  getContent(): string {
    return this.raw.replace(/^#####\s+/, "");
  }
}

export class Title6 extends Title {
  getType(): string {
    return "title6";
  }

  getContent(): string {
    return this.raw.replace(/^######\s+/, "");
  }
}

// Обычный параграф
export class Paragraph extends ArticleStructure {
  getType(): string {
    return "paragraph";
  }

  getClassName(): string {
    return "Paragraph";
  }
}

// Таблица
export class Table extends ArticleStructure {
  getType(): string {
    return "table";
  }

  getClassName(): string {
    return "Table";
  }

  getRows(): string[] {
    return this.raw.split("\n").filter((line) => line.trim().length > 0);
  }
}

// Блок кода
export class Code extends ArticleStructure {
  getType(): string {
    return "code";
  }

  getClassName(): string {
    return "Code";
  }

  getLanguage(): string {
    const match = this.raw.match(/^```(\w+)/);
    return match ? match[1] : "";
  }

  getCodeContent(): string {
    return this.raw.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
  }
}

// Cписок
export class List extends ArticleStructure {
  getType(): string {
    return "list";
  }

  getClassName(): string {
    return "List";
  }

  getItems(): string[] {
    return this.raw
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => line.replace(/^[-*+]|\d+\.\s+/, ""));
  }
}

// Нумерованный список
export class NumericList extends List {
  getType(): string {
    return "numeric-list";
  }

  getItems(): string[] {
    return this.raw
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => line.replace(/^\d+\.\s+/, ""));
  }
}

// Маркированный список
export class MarkedList extends List {
  getType(): string {
    return "marked-list";
  }

  getItems(): string[] {
    return this.raw
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => line.replace(/^[-*+]\s+/, ""));
  }
}

// Разделитель
export class Separator extends ArticleStructure {
  getType(): string {
    return "separator";
  }

  getClassName(): string {
    return "Separator";
  }
}

// Guest блок [[...]]
export class Guest extends ArticleStructure {
  getType(): string {
    return "guest";
  }

  getClassName(): string {
    return "Guest";
  }

  getGuestIds(): string[] {
    return this.raw
      .split("\n")
      .map((line) => line.match(/\[\[(.+?)\]\]/))
      .map((m) => m?.[1].trim() ?? null)
      .filter((s) => s !== null);
  }
}

/**
 * Основной класс для разбора статьи на структурированные части
 */
export class EnhancedArticle {
  readonly text: string;

  constructor(text: string) {
    this.text = text.trim();
  }

  private _cachedStructures: ArticleStructure[] | null = null;

  /**
   * Возвращает массив разобранных структур с кэшированием
   */
  get splitted(): ArticleStructure[] {
    // Если структуры уже разобраны, возвращаем кэшированный результат
    if (this._cachedStructures !== null) {
      return this._cachedStructures;
    }

    // Парсим текст и кэшируем результат
    this._cachedStructures = this.parseText();
    return this._cachedStructures;
  }

  /**
   * Основная логика парсинга текста
   */
  private parseText(): ArticleStructure[] {
    const structures: ArticleStructure[] = [];
    const lines = this.text.split("\n");
    let currentBlock: string[] = [];
    let inCodeBlock = false;
    let inTable = false;
    let inList = false;
    let listType:
      | "numeric"
      | "marked-dash"
      | "marked-asterisk"
      | "marked-plus"
      | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Обработка Guest блоков [[...]]
      if (this.isGuestLine(trimmedLine)) {
        this.flushCurrentBlock(
          structures,
          currentBlock,
          inCodeBlock,
          inTable,
          inList,
          listType,
        );
        currentBlock = [];
        inCodeBlock = inTable = inList = false;
        listType = null;

        // Собираем все подряд идущие Guest-строки в один блок
        const guestLines = [trimmedLine];
        let nextIndex = i + 1;
        
        // Проверяем следующие строки на наличие Guest-блоков
        while (nextIndex < lines.length) {
          const nextLine = lines[nextIndex].trim();
          if (this.isGuestLine(nextLine)) {
            guestLines.push(nextLine);
            nextIndex++;
          } else if (nextLine === "") {
            // Пропускаем пустые строки между Guest-блоками
            nextIndex++;
          } else {
            // Встретили не-Guest строку, прерываем сбор
            break;
          }
        }
        
        // Создаем один Guest-блок из всех собранных строк
        structures.push(new Guest(guestLines.join("\n")));
        
        // Пропускаем обработанные строки
        i = nextIndex - 1;
        continue;
      }

      // Обработка блоков кода
      if (trimmedLine.startsWith("```")) {
        if (inCodeBlock) {
          // Конец блока кода
          currentBlock.push(line);
          structures.push(new Code(currentBlock.join("\n")));
          currentBlock = [];
          inCodeBlock = false;
        } else {
          // Начало блока кода
          this.flushCurrentBlock(
            structures,
            currentBlock,
            false,
            inTable,
            inList,
            listType,
          );
          currentBlock = [line];
          inCodeBlock = true;
          inTable = inList = false;
          listType = null;
        }
        continue;
      }

      // Если мы внутри блока кода, просто добавляем строку
      if (inCodeBlock) {
        currentBlock.push(line);
        continue;
      }

      // Обработка разделителей
      if (this.isSeparator(trimmedLine)) {
        this.flushCurrentBlock(
          structures,
          currentBlock,
          false,
          inTable,
          inList,
          listType,
        );
        currentBlock = [];
        inTable = inList = false;
        listType = null;

        structures.push(new Separator(trimmedLine));
        continue;
      }

      // Обработка заголовков
      if (this.isTitle(trimmedLine)) {
        this.flushCurrentBlock(
          structures,
          currentBlock,
          false,
          inTable,
          inList,
          listType,
        );
        currentBlock = [];
        inTable = inList = false;
        listType = null;

        structures.push(this.createTitleStructure(trimmedLine));
        continue;
      }

      // Обработка таблиц
      if (this.isTableLine(trimmedLine)) {
        if (!inTable) {
          this.flushCurrentBlock(
            structures,
            currentBlock,
            false,
            false,
            inList,
            listType,
          );
          currentBlock = [];
          inTable = true;
          inList = false;
          listType = null;
        }
        currentBlock.push(line);
        continue;
      } else if (inTable && trimmedLine.length === 0) {
        // Конец таблицы
        structures.push(new Table(currentBlock.join("\n")));
        currentBlock = [];
        inTable = false;
        continue;
      } else if (inTable) {
        // Конец таблицы (встретили не-табличную строку)
        structures.push(new Table(currentBlock.join("\n")));
        currentBlock = [];
        inTable = false;
        // Продолжаем обработку текущей строки
      }

      // Обработка списков
      const currentListType = this.getListType(trimmedLine);
      if (currentListType) {
        if (!inList || listType !== currentListType) {
          this.flushCurrentBlock(
            structures,
            currentBlock,
            false,
            false,
            false,
            null,
          );
          currentBlock = [];
          inList = true;
          listType = currentListType;
        }
        currentBlock.push(line);
        continue;
      } else if (inList && trimmedLine.length === 0) {
        // Пустая строка в списке - завершаем список
        this.flushListBlock(structures, currentBlock, listType);
        currentBlock = [];
        inList = false;
        listType = null;
        continue;
      } else if (inList) {
        // Конец списка
        this.flushListBlock(structures, currentBlock, listType);
        currentBlock = [];
        inList = false;
        listType = null;
        // Продолжаем обработку текущей строки
      }

      // Обработка обычных параграфов
      if (trimmedLine.length === 0) {
        // Пустая строка - завершаем текущий блок
        this.flushCurrentBlock(
          structures,
          currentBlock,
          false,
          false,
          false,
          null,
        );
        currentBlock = [];
      } else {
        // Добавляем строку к текущему блоку
        currentBlock.push(line);
      }
    }

    // Обрабатываем последний блок
    this.flushCurrentBlock(
      structures,
      currentBlock,
      inCodeBlock,
      inTable,
      inList,
      listType,
    );

    return structures;
  }

  /**
   * Завершает текущий блок и добавляет соответствующую структуру
   */
  private flushCurrentBlock(
    structures: ArticleStructure[],
    currentBlock: string[],
    inCodeBlock: boolean,
    inTable: boolean,
    inList: boolean,
    listType:
      | "numeric"
      | "marked-dash"
      | "marked-asterisk"
      | "marked-plus"
      | null,
  ): void {
    if (currentBlock.length === 0) return;

    const content = currentBlock.join("\n").trim();
    if (content.length === 0) return;

    if (inCodeBlock) {
      structures.push(new Code(content));
    } else if (inTable) {
      structures.push(new Table(content));
    } else if (inList) {
      this.flushListBlock(structures, currentBlock, listType);
    } else {
      structures.push(new Paragraph(content));
    }
  }

  /**
   * Завершает блок списка
   */
  private flushListBlock(
    structures: ArticleStructure[],
    currentBlock: string[],
    listType:
      | "numeric"
      | "marked-dash"
      | "marked-asterisk"
      | "marked-plus"
      | null,
  ): void {
    if (currentBlock.length === 0) return;

    const content = currentBlock.join("\n").trim();
    if (content.length === 0) return;

    if (listType === "numeric") {
      structures.push(new NumericList(content));
    } else if (
      listType === "marked-dash" ||
      listType === "marked-asterisk" ||
      listType === "marked-plus"
    ) {
      structures.push(new MarkedList(content));
    }
  }

  /**
   * Проверяет, является ли строка Guest блоком
   */
  private isGuestLine(line: string): boolean {
    return /^\[\[.+\]\]$/.test(line);
  }

  /**
   * Проверяет, является ли строка заголовком
   */
  private isTitle(line: string): boolean {
    return /^#{1,6}\s+/.test(line);
  }

  /**
   * Создает соответствующую структуру заголовка
   */
  private createTitleStructure(line: string): ArticleStructure {
    const level = line.match(/^(#{1,6})\s+/)?.[1].length || 1;

    switch (level) {
      case 1:
        return new Title1(line);
      case 2:
        return new Title2(line);
      case 3:
        return new Title3(line);
      case 4:
        return new Title4(line);
      case 5:
        return new Title5(line);
      case 6:
        return new Title6(line);
      default:
        return new Title1(line);
    }
  }

  /**
   * Проверяет, является ли строка частью таблицы
   */
  private isTableLine(line: string): boolean {
    return line.includes("|") && line.trim().length > 0;
  }

  /**
   * Проверяет, является ли строка разделителем
   */
  private isSeparator(line: string): boolean {
    return /^[-=_*]{3,}$/.test(line);
  }

  /**
   * Определяет тип списка
   */
  private getListType(
    line: string,
  ): "numeric" | "marked-dash" | "marked-asterisk" | "marked-plus" | null {
    const trimmed = line.trim();
    if (/^\d+\.\s+/.test(trimmed)) {
      return "numeric";
    }
    if (/^-\s+/.test(trimmed)) {
      return "marked-dash";
    }
    if (/^\*\s+/.test(trimmed)) {
      return "marked-asterisk";
    }
    if (/^\+\s+/.test(trimmed)) {
      return "marked-plus";
    }
    return null;
  }
}

// Экспорт всех классов для удобства использования
export type ArticleStructureType =
  | Title1
  | Title2
  | Title3
  | Title4
  | Title5
  | Title6
  | Paragraph
  | Table
  | Code
  | NumericList
  | MarkedList
  | Separator
  | Guest;
