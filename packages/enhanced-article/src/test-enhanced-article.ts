/**
 * Тестовый файл для проверки функциональности EnhancedArticle
 */

import { EnhancedArticle } from './enhanced-article';

// Пример текста из задания
const testText = `Der erste Herbstnebel legt sich morgens über die Gärten, und in der Küche beginnt die schönste Zeit des Jahres – zumindest für alle, die gerne kochen. Doch während Rechtshänder einfach zum Dosenöffner greifen, kämpfen wir Linkshänder noch immer mit Werkzeugen, die uns das Leben unnötig schwer machen. Zeit, das zu ändern.

[[olm-g-e56b84bb-b432-4bcb-a9a2-fef7afd58c8c]]
[[olm-g-768af193-e254-4c27-ab58-c614434872b1]]

## 🍂 Warum gerade jetzt die richtige Zeit ist

Die Herbstküche mit ihren Suppen, Eintöpfen und selbstgebackenen Broten verlangt nach Präzision und Freude am Kochen. Kürbisse wollen geschält, Äpfel entkernt und Marmeladen eingekocht werden. Für Linkshänder kann das zur Geduldsprobe werden – es sei denn, man hat die richtigen Helfer zur Hand.
**Kleiner Tipp von mir:** Bevor Sie neue Küchenhelfer kaufen, räumen Sie einmal Ihre Schubladen durch. Sie werden überrascht sein, wie viele "normale" Werkzeuge Sie jahrelang frustriert benutzt haben.

## Die wichtigsten Küchenhelfer für Ihre Herbstküche

### 1. Der Dosenöffner – Endlich ohne Verrenkungen 🥫

Ein guter Linkshänder-Dosenöffner öffnet sich wie von selbst in die richtige Richtung. Das Schneidrad sitzt links, der Griff rechts – so wie es für uns natürlich ist. Besonders praktisch für die Kürbissuppen-Saison, wenn Kokosmilch und Tomaten aus der Dose kommen.
**Mein Favorit:** Modelle mit ergonomischem Griff und rutschfester Unterseite
- Preis: 15-25 Euro
- Wichtig: Auf rostfreies Material achten
### 2. Das Schälmesser – Ihr neuer bester Freund 🥔
Kartoffeln, Äpfel, Butternut-Kürbis – im Herbst wird viel geschält. Ein Linkshänder-Schälmesser mit umgekehrter Klinge macht aus der lästigen Pflicht ein entspanntes Ritual. Die Klinge ist so angeschliffen, dass sie beim Ziehen mit der linken Hand optimal schneidet.
💡 **Kleine Details:** Achten Sie auf einen leicht gebogenen Griff – er entlastet das Handgelenk bei längeren Schälaktionen.
### 3. Die Suppenkelle – Elegantes Servieren ohne Kleckern 🍲
Eine Linkshänder-Suppenkelle hat den Ausguss auf der richtigen Seite. Klingt banal? Ist es nicht! Gerade bei festlichen Herbstessen macht es den Unterschied zwischen elegantem Servieren und peinlichen Flecken auf der Tischdecke.

**Praktische Features:**
- Ausguss links positioniert
- Oft mit Messmarkierungen im Inneren
- Ideal für portionsgenaues Servieren

### 4. Der Korkenzieher – Für gemütliche Weinabende 🍷

Wenn der Federweißer Platz macht für kräftige Rotweine, brauchen Linkshänder einen Korkenzieher, der sich natürlich in die linke Richtung dreht. Die Hebelwirkung funktioniert dann optimal, und der Korken gleitet mühelos aus der Flasche.
### 5. Die Küchenschere – Multitalent für Kräuter und mehr ✂️
Eine gute Linkshänder-Küchenschere ist im Herbst unverzichtbar: Frische Kräuter für die Kürbissuppe schneiden, Backpapier zuschneiden oder Marmeladengläser-Etiketten ausschneiden. Die Klingen sind spiegelverkehrt geschliffen, sodass Sie präzise schneiden können.
**Mein Geheimtipp:** Modelle mit integriertem Nussknacker – perfekt für die Walnuss-Saison!

## 🌿 Kleine Rituale, große Wirkung

Es geht nicht nur um die Werkzeuge selbst. Es geht darum, endlich mit Freude zu kochen. Stellen Sie sich vor: Sie bereiten einen Apfelkuchen zu, und zum ersten Mal flutscht das Schälen wie von selbst. Die Äpfel landen in gleichmäßigen Spiralen in der Schüssel, und Sie summen dabei Ihr Lieblingslied.

## Vergleich: Die Top 5 im Überblick

|Küchenhelfer|Preisspanne|Wichtigster Vorteil|Herbst-Einsatz|
|---|---|---|---|
|Dosenöffner|15-25€|Kraftersparnis|Suppen, Eintöpfe|
|Schälmesser|10-20€|Präzision|Obst, Gemüse|
|Suppenkelle|8-15€|Sauberes Servieren|Alle Suppen|
|Korkenzieher|20-35€|Müheloses Öffnen|Weinabende|
|Küchenschere|15-30€|Vielseitigkeit|Kräuter, Backprojekte|

## 💭 Ein persönlicher Gedanke zum Schluss

Manchmal sind es die kleinen Dinge, die den großen Unterschied machen. Ein Dosenöffner, der in die richtige Richtung funktioniert, mag banal klingen. Aber für uns Linkshänder bedeutet er ein Stück Normalität in einer rechtshändigen Welt. Und gerade in der gemütlichen Herbstzeit, wenn wir mehr Zeit in der Küche verbringen, sollten wir uns diesen kleinen Luxus gönnen.
Die Investition in gute Linkshänder-Küchenhelfer ist eine Investition in Ihre Kochfreude. Und wer weiß – vielleicht entdecken Sie dabei Ihre Liebe zum Einkochen neu oder wagen sich endlich an das Familienrezept für Apfelstrudel.
**Kleine Erinnerung:** 🍁 Die besten Küchenhelfer für Linkshänder finden Sie in spezialisierten Online-Shops oder gut sortierten Haushaltswarengeschäften. Fragen Sie gezielt nach – oft haben die Verkäufer diese Produkte vorrätig, zeigen sie aber nicht prominent.

_Der Herbst wartet nicht. Ihre neue, linkshänderfreundliche Küche auch nicht._
---`;

/**
 * Функция для тестирования EnhancedArticle
 */
export function testEnhancedArticle(): void {
  console.log('🧪 Тестирование EnhancedArticle...\n');
  
  const article = new EnhancedArticle(testText);
  const structures = article.splitted();
  
  console.log(`📊 Всего найдено структур: ${structures.length}\n`);
  
  structures.forEach((structure, index) => {
    console.log(`${index + 1}. ${structure.getType().toUpperCase()} (${structure.getClassName()})`);
    
    // Показываем первые 100 символов содержимого
    const preview = structure.content.length > 100 
      ? structure.content.substring(0, 100) + '...'
      : structure.content;
    
    console.log(`   Содержимое: "${preview}"`);
    
    // Дополнительная информация для специфических типов
    if (structure.getType().startsWith('title')) {
      console.log(`   Заголовок: "${(structure as any).getContent()}"`);
    } else if (structure.getType() === 'guest') {
      console.log(`   Guest ID: "${(structure as any).getGuestId()}"`);
    } else if (structure.getType() === 'table') {
      const rows = (structure as any).getRows();
      console.log(`   Строк в таблице: ${rows.length}`);
    } else if (structure.getType() === 'code') {
      const language = (structure as any).getLanguage();
      console.log(`   Язык кода: "${language || 'не указан'}"`);
    } else if (structure.getType().includes('list')) {
      const items = (structure as any).getItems();
      console.log(`   Элементов в списке: ${items.length}`);
    }
    
    console.log('');
  });
  
  // Статистика по типам
  const typeStats = structures.reduce((acc, structure) => {
    const type = structure.getType();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('📈 Статистика по типам структур:');
  Object.entries(typeStats).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
  });
}

// Запуск теста, если файл выполняется напрямую
if (require.main === module) {
  testEnhancedArticle();
}
