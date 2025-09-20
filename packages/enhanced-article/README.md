# @enhanced-article

Enhanced Article Parser - a powerful tool for parsing article text into structured parts.

## Description

The `@enhanced-article` package provides functionality for parsing Markdown-like content and special Guest blocks into structured objects. It supports all basic markup elements and ensures type safety with TypeScript.

## Installation

```bash
pnpm install @enhanced-article
```

## Key Features

- ✅ Parsing headers of all levels (H1-H6)
- ✅ Processing paragraphs
- ✅ Support for Guest blocks `[[guest-id]]`
- ✅ Table parsing
- ✅ Code block processing with language detection
- ✅ Numbered and bulleted lists
- ✅ Separators (---, ===, ___, ***)
- ✅ Full type safety with TypeScript
- ✅ High performance

## Quick Start

```typescript
import { EnhancedArticle } from '@enhanced-article';

const text = `# Article Title

This is a paragraph of text.

[[guest-block-id]]

## Subheading

- List item 1
- List item 2

\`\`\`javascript
console.log('Hello, World!');
\`\`\``;

const article = new EnhancedArticle(text);
const structures = article.splitted();

console.log(`Found structures: ${structures.length}`);

structures.forEach(structure => {
  console.log(`Type: ${structure.getType()}`);
  console.log(`CSS class: ${structure.getClassName()}`);
  console.log(`Content: ${structure.content}`);
});
```

## API Reference

### EnhancedArticle

Main class for parsing articles.

#### Constructor

```typescript
new EnhancedArticle(text: string)
```

#### Methods

- `splitted(): ArticleStructure[]` - returns an array of parsed structures

### Article Structures

All structures inherit from the base `ArticleStructure` class:

#### Headers (Title1-Title6)

```typescript
const title = new Title1('# Header');
title.getType();      // 'title1'
title.getClassName(); // 'title-1'
title.getContent();   // 'Header' (without markup symbols)
```

#### Paragraph

```typescript
const paragraph = new Paragraph('Paragraph text');
paragraph.getType();      // 'paragraph'
paragraph.getClassName(); // 'paragraph'
```

#### Guest Block

```typescript
const guest = new Guest('[[guest-id-123]]');
guest.getType();      // 'guest'
guest.getClassName(); // 'guest-block'
guest.getGuestId();   // 'guest-id-123'
```

#### Table

```typescript
const table = new Table('|Col1|Col2|\n|---|---|\n|Val1|Val2|');
table.getType();      // 'table'
table.getClassName(); // 'table'
table.getRows();      // ['|Col1|Col2|', '|---|---|', '|Val1|Val2|']
```

#### Code Block

```typescript
const code = new Code('```javascript\nconsole.log("Hello");\n```');
code.getType();         // 'code'
code.getClassName();    // 'code-block'
code.getLanguage();     // 'javascript'
code.getCodeContent();  // 'console.log("Hello");'
```

#### Lists (NumericList, MarkedList)

```typescript
// Numbered list
const numList = new NumericList('1. First\n2. Second');
numList.getType();    // 'numeric-list'
numList.getItems();   // ['First', 'Second']

// Bulleted list
const markedList = new MarkedList('- First\n- Second');
markedList.getType(); // 'marked-list'
markedList.getItems(); // ['First', 'Second']
```

#### Separator

```typescript
const separator = new Separator('---');
separator.getType();      // 'separator'
separator.getClassName(); // 'separator'
```

## Supported Formats

### Headers

```markdown
# Level 1 Header
## Level 2 Header
### Level 3 Header
#### Level 4 Header
##### Level 5 Header
###### Level 6 Header
```

### Guest Blocks

```markdown
[[guest-id]]
[[olm-g-e56b84bb-b432-4bcb-a9a2-fef7afd58c8c]]
```

### Tables

```markdown
|Header 1|Header 2|
|---|---|
|Value 1|Value 2|
```

### Code Blocks

```markdown
```javascript
function hello() {
  console.log('Hello, World!');
}
```

```

### Lists
```markdown
1. Numbered list
2. Second item

- Bulleted list
- Second item

* Alternative markers
+ Also supported
```

### Separators

```markdown
---
===
___
***
```

## Testing

The package includes a comprehensive test suite using Vitest:

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

- `test/article-structures.test.ts` - tests for all structure classes
- `test/enhanced-article.test.ts` - tests for the main class
- `test/integration.test.ts` - integration tests with real data
- `test/test-data.ts` - test data

## Usage Examples

### Processing a Real Article

```typescript
import { EnhancedArticle } from '@enhanced-article';

const articleText = `# Kitchen Tools for Left-Handed People

First paragraph of the article describing the problem.

[[product-showcase-123]]

## Essential Tools

### 1. Can Opener

Description of the can opener.

**Features:**
- Ergonomic handle
- Left-sided blade
- Price: 15-25€

|Tool|Price|Advantage|
|---|---|---|
|Can Opener|15-25€|Convenience|
|Knife|10-20€|Precision|

---

Concluding paragraph.`;

const article = new EnhancedArticle(articleText);
const structures = article.splitted();

// Filter by types
const titles = structures.filter(s => s.getType().startsWith('title'));
const guests = structures.filter(s => s.getType() === 'guest');
const tables = structures.filter(s => s.getType() === 'table');

console.log(`Headers: ${titles.length}`);
console.log(`Guest blocks: ${guests.length}`);
console.log(`Tables: ${tables.length}`);
```

### Extracting Specific Information

```typescript
// Get all Guest IDs
const guestIds = structures
  .filter(s => s.getType() === 'guest')
  .map(s => (s as Guest).getGuestId());

// Get all headers
const titleTexts = structures
  .filter(s => s.getType().startsWith('title'))
  .map(s => (s as Title1).getContent());

// Get table data
const tableData = structures
  .filter(s => s.getType() === 'table')
  .map(s => (s as Table).getRows());
```

## Performance

The package is optimized for working with large amounts of text:

- Processing 1000 structures: < 100ms
- Support for texts up to several MB in size
- Minimal memory consumption
- Efficient single-pass parsing

## License

MIT

## Support

If you have questions or suggestions, please create an issue in the project repository.
