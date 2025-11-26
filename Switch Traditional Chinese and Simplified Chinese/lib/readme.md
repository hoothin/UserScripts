# switch-chinese

[简体中文](#简体中文) | [繁體中文](#繁體中文) | [English](#english)

---

## 简体中文

简繁体中文转换库 - 支持简体中文与繁体中文双向转换，基于词组的智能分词处理「一简多繁」问题

[![NPM](https://img.shields.io/npm/v/switch-chinese.svg)](https://www.npmjs.com/package/switch-chinese) [![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://www.npmjs.com/package/switch-chinese)

### 特性

- **轻量级**：零依赖，体积小，性能优异
- **智能转换**：支持基于词组的智能分词和「一简多繁」精准转换
- **多种数据类型**：支持字符串、数组、对象的转换，自动递归处理嵌套结构
- **自定义词库**：允许用户自定义简繁转换词汇
- **缓存机制**：支持字典缓存，避免重复初始化
- **简繁检测**：自动检测文本是简体中文、繁体中文还是未知类型
- **术语转换**：内置大陆简体与台湾正体的常用术语转换
- **无依赖**：纯 JavaScript 实现，无需任何第三方依赖

### 安装

使用 npm 安装：

```bash
npm install switch-chinese
```

使用 yarn 安装：

```bash
yarn add switch-chinese
```

### 快速开始

#### 基础用法

```javascript
import stcasc from 'switch-chinese';

const { traditionalized, simplized, detect } = stcasc();

// 简体转繁体
const tc = traditionalized('简繁转换 繁简切换 香烟 香烟袅袅');
console.log(tc);
// 输出: 簡繁轉換 繁簡切換 香菸 香煙裊裊

// 繁体转简体
const sc = simplized('繁體中文');
console.log(sc);
// 输出: 繁体中文
```

#### 检测中文类型

```javascript
import stcasc, { ChineseType } from 'switch-chinese';

const { detect } = stcasc();

const type1 = detect('简体中文');
if (type1 === ChineseType.SIMPLIFIED) {
    console.log('检测到简体中文');
}

const type2 = detect('繁體中文');
if (type2 === ChineseType.TRADITIONAL) {
    console.log('检测到繁体中文');
}

const type3 = detect('English');
if (type3 === ChineseType.UNKNOWN) {
    console.log('未检测到中文');
}
```

ChineseType 枚举值：
- `ChineseType.SIMPLIFIED` (0): 简体中文
- `ChineseType.TRADITIONAL` (1): 繁体中文
- `ChineseType.UNKNOWN` (2): 未知类型

#### 转换数组和对象

库支持转换数组和对象中的所有字符串，非字符串值保持原样：

```javascript
import stcasc from 'switch-chinese';

const { traditionalized, simplized } = stcasc();

// 转换数组
const arr = ['简体中文', '软件', '网络', 123, true, null];
const arrTc = traditionalized(arr);
console.log(arrTc);
// 输出: ['簡體中文', '軟體', '網路', 123, true, null]

// 转换对象
const obj = {
    title: '简体中文标题',
    description: '这是一个简体中文描述',
    count: 100,
    active: true,
    tags: ['软件', '网络', '服务器']
};
const objTc = traditionalized(obj);
console.log(objTc);
// 输出: {
//   title: '簡體中文標題',
//   description: '這是一個簡體中文描述',
//   count: 100,
//   active: true,
//   tags: ['軟體', '網路', '伺服器']
// }

// 转换嵌套结构
const nested = {
    user: {
        name: '简体名称',
        profile: {
            bio: '这是简体中文简介',
            skills: ['软件开发', '网络管理']
        }
    },
    count: 42
};
const nestedTc = traditionalized(nested);
// 所有字符串属性值都会被转换，数字等其他类型保持不变
```

### 高级用法

#### 使用缓存优化性能

在多次调用时，建议使用缓存机制避免重复生成字典，提升性能：

```javascript
import stcasc from 'switch-chinese';

// 第一次调用，生成字典
let converter = stcasc();
const cache = converter.cache;

// 保存缓存到持久化存储（如 localStorage、文件等）
localStorage.setItem('stcasc-cache', JSON.stringify(cache));

// 后续调用，直接使用缓存
const cachedData = JSON.parse(localStorage.getItem('stcasc-cache'));
converter = stcasc(cachedData);

// 现在可以直接使用，无需重新生成字典
const result = converter.traditionalized('简体中文');
```

#### 自定义简繁转换词库

可以根据业务需求自定义简繁转换规则：

```javascript
import stcasc from 'switch-chinese';

const customDict = {
    '身份': '身分',
    '转义': '跳脫',
    '转换': '轉檔',
    '软件': '軟體',
    '硬件': '硬體',
    '网络': '網路',
    '服务器': '伺服器'
};

const { traditionalized, simplized } = stcasc({}, customDict);

console.log(traditionalized('软件转换'));
// 输出: 軟體轉檔（使用自定义词库）
```

#### 禁用术语转换

默认情况下，库会转换一些特定术语（如「知识产权」→「智慧財產權」）。如需禁用此功能：

```javascript
import stcasc from 'switch-chinese';

// 第三个参数设置为 true 以禁用术语转换
const { traditionalized } = stcasc({}, {}, true);

console.log(traditionalized('知识产权'));
// 输出: 知識産權（仅做字符转换，不转换术语）
```

#### 输出格式选项

库支持多种输出格式：

```javascript
import stcasc, { OutputFormat } from 'switch-chinese';

const { traditionalized } = stcasc();

// 普通格式（默认）
const normal = traditionalized('简体中文');
// 输出: 簡體中文

// 括号格式：同时显示原文和转换后的文本
const bracket = traditionalized('简体中文', { format: OutputFormat.BRACKET });
// 输出: 簡(简)體(体)中文

// Ruby 注音格式：适用于 HTML 显示
const ruby = traditionalized('简体中文', { format: OutputFormat.RUBY });
// 输出: <ruby>簡<rt>简</rt></ruby><ruby>體<rt>体</rt></ruby>中文
```

OutputFormat 枚举值：
- `OutputFormat.NORMAL` (0): 只输出转换后的结果（默认）
- `OutputFormat.BRACKET` (1): 输出「转换(原文)」格式
- `OutputFormat.RUBY` (2): 输出 `<ruby>` HTML 标签格式

### API 文档

#### stcasc(cache?, custom?, disableTerms?)

主函数，用于创建转换器实例。

**参数：**

- `cache` (Object, 可选): 缓存对象，用于避免重复生成字典
- `custom` (Object, 可选): 自定义简繁转换词库
- `disableTerms` (Boolean, 可选): 是否禁用术语转换，默认 `false`

**返回值：**

返回包含以下方法的对象：

- `traditionalized(input, options?)`: 将简体中文转换为繁体中文
  - `input`: 可以是字符串、数组或对象
  - 字符串：直接转换返回新字符串
  - 数组：转换所有字符串元素，其他类型保持不变
  - 对象：递归转换所有字符串属性值，其他类型保持不变
- `simplized(input, options?)`: 将繁体中文转换为简体中文
  - `input`: 可以是字符串、数组或对象
  - 支持的数据类型同 `traditionalized`
- `detect(text)`: 检测文本的中文类型，返回 ChineseType 枚举值
- `cache`: 字典缓存对象

**Options 参数：**

- `format` (Number, 可选): 输出格式，使用 `OutputFormat` 常量

#### ChineseType

导出的常量对象，用于表示中文类型检测结果：

```javascript
export const ChineseType = {
    SIMPLIFIED: 0,      // 简体中文
    TRADITIONAL: 1,     // 繁体中文
    UNKNOWN: 2          // 未知类型
};
```

#### OutputFormat

导出的常量对象，用于表示输出格式选项：

```javascript
export const OutputFormat = {
    NORMAL: 0,      // 只输出转换后的结果
    BRACKET: 1,     // 输出「转换(原文)」格式
    RUBY: 2         // 输出 <ruby> HTML 标签格式
};
```

### 转换示例

#### 智能词组转换

该库支持基于上下文的智能词组转换，能够正确处理「一简多繁」的情况：

```javascript
const { traditionalized } = stcasc();

// 智能识别词组边界
console.log(traditionalized('香烟袅袅'));
// 输出: 香煙裊裊

console.log(traditionalized('里长面子'));
// 输出: 里長面子（「里长」是职务名称）

console.log(traditionalized('吃干面'));
// 输出: 吃乾麵（「干面」是食物）

console.log(traditionalized('把考卷发回来'));
// 输出: 把考卷發回來（「发」是动词）

console.log(traditionalized('卷发'));
// 输出: 捲髮（「卷发」是发型）
```

#### 术语转换

内置常用的大陆简体与台湾正体术语转换：

```javascript
const { traditionalized } = stcasc();

console.log(traditionalized('知识产权'));
// 输出: 智慧財產權

console.log(traditionalized('计算机软件'));
// 输出: 計算機軟體

console.log(traditionalized('网络服务器'));
// 输出: 網路伺服器
```

### 技术特点

#### 高性能

- 使用字典树（Trie）优化词组匹配
- 支持缓存机制，避免重复初始化
- 纯 JavaScript 实现，执行效率高

#### 准确转换

- 内置大量简繁对照字符
- 支持「一简多繁」智能识别
- 基于词组的上下文分析

#### 易于集成

- ES Module 标准导出
- TypeScript 类型支持（通过常量枚举）
- 零依赖，兼容性好

### 浏览器支持

支持所有现代浏览器及 Node.js 环境：

- Chrome
- Firefox
- Safari
- Edge
- Node.js 12+

### 开源协议

MIT License

### 相关链接

- [GitHub 仓库](https://github.com/hoothin/UserScripts/tree/master/Switch%20Traditional%20Chinese%20and%20Simplified%20Chinese/lib)
- [NPM 包地址](https://www.npmjs.com/package/switch-chinese)
- [问题反馈](https://github.com/hoothin/UserScripts/issues)

### 关键词

简繁转换, 繁简转换, 简体中文, 繁体中文, 正体中文, 中文转换, 一简多繁, 简繁切换, 繁简切换, 中文检测, 智能分词, 自定义词库, 零依赖, 轻量级

---

## English

Lightweight Chinese converter library for bidirectional conversion between Simplified and Traditional Chinese with intelligent word segmentation and one-to-many character mapping support.

[![NPM](https://img.shields.io/npm/v/switch-chinese.svg)](https://www.npmjs.com/package/switch-chinese) [![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://www.npmjs.com/package/switch-chinese)

### Features

- **Lightweight**: Zero dependencies, small footprint, excellent performance
- **Intelligent Conversion**: Context-aware word segmentation and accurate one-to-many character mapping
- **Multiple Data Types**: Supports string, array, and object conversion with automatic recursive processing
- **Custom Dictionary**: User-defined conversion rules support
- **Caching Mechanism**: Dictionary caching to avoid repeated initialization
- **Text Detection**: Automatic detection of Simplified Chinese, Traditional Chinese, or unknown text
- **Term Conversion**: Built-in mainland China and Taiwan terminology mapping
- **Zero Dependencies**: Pure JavaScript implementation, no third-party dependencies required

### Installation

Install via npm:

```bash
npm install switch-chinese
```

Install via yarn:

```bash
yarn add switch-chinese
```

### Quick Start

#### Basic Usage

```javascript
import stcasc from 'switch-chinese';

const { traditionalized, simplized, detect } = stcasc();

// Simplified to Traditional
const tc = traditionalized('简繁转换 繁简切换 香烟 香烟袅袅');
console.log(tc);
// Output: 簡繁轉換 繁簡切換 香菸 香煙裊裊

// Traditional to Simplified
const sc = simplized('繁體中文');
console.log(sc);
// Output: 繁体中文
```

#### Text Detection

```javascript
import stcasc, { ChineseType } from 'switch-chinese';

const { detect } = stcasc();

const type1 = detect('简体中文');
if (type1 === ChineseType.SIMPLIFIED) {
    console.log('Detected Simplified Chinese');
}

const type2 = detect('繁體中文');
if (type2 === ChineseType.TRADITIONAL) {
    console.log('Detected Traditional Chinese');
}

const type3 = detect('English');
if (type3 === ChineseType.UNKNOWN) {
    console.log('No Chinese text detected');
}
```

ChineseType enumeration values:
- `ChineseType.SIMPLIFIED` (0): Simplified Chinese
- `ChineseType.TRADITIONAL` (1): Traditional Chinese
- `ChineseType.UNKNOWN` (2): Unknown type

#### Converting Arrays and Objects

The library supports converting all strings in arrays and objects, while preserving non-string values:

```javascript
import stcasc from 'switch-chinese';

const { traditionalized, simplized } = stcasc();

// Convert array
const arr = ['简体中文', '软件', '网络', 123, true, null];
const arrTc = traditionalized(arr);
console.log(arrTc);
// Output: ['簡體中文', '軟體', '網路', 123, true, null]

// Convert object
const obj = {
    title: '简体中文标题',
    description: '这是一个简体中文描述',
    count: 100,
    active: true,
    tags: ['软件', '网络', '服务器']
};
const objTc = traditionalized(obj);
console.log(objTc);
// Output: {
//   title: '簡體中文標題',
//   description: '這是一個簡體中文描述',
//   count: 100,
//   active: true,
//   tags: ['軟體', '網路', '伺服器']
// }

// Convert nested structures
const nested = {
    user: {
        name: '简体名称',
        profile: {
            bio: '这是简体中文简介',
            skills: ['软件开发', '网络管理']
        }
    },
    count: 42
};
const nestedTc = traditionalized(nested);
// All string property values will be converted, other types remain unchanged
```

### Advanced Usage

#### Performance Optimization with Caching

For multiple conversions, use caching mechanism to improve performance:

```javascript
import stcasc from 'switch-chinese';

// First call, generate dictionary
let converter = stcasc();
const cache = converter.cache;

// Save cache to persistent storage (e.g., localStorage, file system)
localStorage.setItem('stcasc-cache', JSON.stringify(cache));

// Subsequent calls, use cached data
const cachedData = JSON.parse(localStorage.getItem('stcasc-cache'));
converter = stcasc(cachedData);

// Now you can use it directly without regenerating dictionary
const result = converter.traditionalized('简体中文');
```

#### Custom Conversion Dictionary

Customize conversion rules according to your needs:

```javascript
import stcasc from 'switch-chinese';

const customDict = {
    '身份': '身分',
    '转义': '跳脫',
    '转换': '轉檔',
    '软件': '軟體',
    '硬件': '硬體',
    '网络': '網路',
    '服务器': '伺服器'
};

const { traditionalized, simplized } = stcasc({}, customDict);

console.log(traditionalized('软件转换'));
// Output: 軟體轉檔 (using custom dictionary)
```

#### Disable Term Conversion

By default, the library converts specific terms (e.g., "知识产权" → "智慧財產權"). To disable this feature:

```javascript
import stcasc from 'switch-chinese';

// Set the third parameter to true to disable term conversion
const { traditionalized } = stcasc({}, {}, true);

console.log(traditionalized('知识产权'));
// Output: 知識産權 (character conversion only, no term conversion)
```

#### Output Formats

The library supports multiple output formats:

```javascript
import stcasc, { OutputFormat } from 'switch-chinese';

const { traditionalized } = stcasc();

// Normal format (default)
const normal = traditionalized('简体中文');
// Output: 簡體中文

// Bracket format: shows both original and converted text
const bracket = traditionalized('简体中文', { format: OutputFormat.BRACKET });
// Output: 簡(简)體(体)中文

// Ruby annotation format: for HTML display
const ruby = traditionalized('简体中文', { format: OutputFormat.RUBY });
// Output: <ruby>簡<rt>简</rt></ruby><ruby>體<rt>体</rt></ruby>中文
```

OutputFormat enumeration values:
- `OutputFormat.NORMAL` (0): Output converted result only (default)
- `OutputFormat.BRACKET` (1): Output in "converted(original)" format
- `OutputFormat.RUBY` (2): Output in `<ruby>` HTML tag format

### API Reference

#### stcasc(cache?, custom?, disableTerms?)

Main function to create a converter instance.

**Parameters:**

- `cache` (Object, optional): Cache object to avoid regenerating dictionary
- `custom` (Object, optional): Custom Simplified-Traditional conversion dictionary
- `disableTerms` (Boolean, optional): Whether to disable term conversion, default `false`

**Returns:**

An object containing the following methods:

- `traditionalized(input, options?)`: Convert Simplified Chinese to Traditional Chinese
  - `input`: Can be a string, array, or object
  - String: Directly converts and returns a new string
  - Array: Converts all string elements, other types remain unchanged
  - Object: Recursively converts all string property values, other types remain unchanged
- `simplized(input, options?)`: Convert Traditional Chinese to Simplified Chinese
  - `input`: Can be a string, array, or object
  - Supports the same data types as `traditionalized`
- `detect(text)`: Detect Chinese text type, returns ChineseType enumeration value
- `cache`: Dictionary cache object

**Options parameter:**

- `format` (Number, optional): Output format, use `OutputFormat` constants

#### ChineseType

Exported constant object representing text detection results:

```javascript
export const ChineseType = {
    SIMPLIFIED: 0,      // Simplified Chinese
    TRADITIONAL: 1,     // Traditional Chinese
    UNKNOWN: 2          // Unknown type
};
```

#### OutputFormat

Exported constant object representing output format options:

```javascript
export const OutputFormat = {
    NORMAL: 0,      // Output converted result only
    BRACKET: 1,     // Output "converted(original)" format
    RUBY: 2         // Output <ruby> HTML tag format
};
```

### Conversion Examples

#### Intelligent Word Segmentation

The library supports context-aware intelligent word segmentation, accurately handling one-to-many character mappings:

```javascript
const { traditionalized } = stcasc();

// Intelligent phrase boundary recognition
console.log(traditionalized('香烟袅袅'));
// Output: 香煙裊裊

console.log(traditionalized('里长面子'));
// Output: 里長面子 ("里长" is a position title)

console.log(traditionalized('吃干面'));
// Output: 吃乾麵 ("干面" is a food)

console.log(traditionalized('把考卷发回来'));
// Output: 把考卷發回來 ("发" is a verb in this context)

console.log(traditionalized('卷发'));
// Output: 捲髮 ("卷发" is a hairstyle)
```

#### Term Conversion

Built-in conversion for common mainland China and Taiwan terminology:

```javascript
const { traditionalized } = stcasc();

console.log(traditionalized('知识产权'));
// Output: 智慧財產權

console.log(traditionalized('计算机软件'));
// Output: 計算機軟體

console.log(traditionalized('网络服务器'));
// Output: 網路伺服器
```

### Technical Highlights

#### High Performance

- Dictionary tree (Trie) optimization for phrase matching
- Caching mechanism support to avoid repeated initialization
- Pure JavaScript implementation for high execution efficiency

#### Accurate Conversion

- Extensive built-in Simplified-Traditional character mappings
- Intelligent recognition for one-to-many character conversions
- Context-based phrase analysis

#### Easy Integration

- ES Module standard export
- TypeScript support through constant enumerations
- Zero dependencies, excellent compatibility

### Browser Support

Supports all modern browsers and Node.js environments:

- Chrome
- Firefox
- Safari
- Edge
- Node.js 12+

### License

MIT License

### Links

- [GitHub Repository](https://github.com/hoothin/UserScripts/tree/master/Switch%20Traditional%20Chinese%20and%20Simplified%20Chinese/lib)
- [NPM Package](https://www.npmjs.com/package/switch-chinese)
- [Issue Tracker](https://github.com/hoothin/UserScripts/issues)

### Keywords

Chinese Converter, Simplified Chinese, Traditional Chinese, Chinese Translation, Character Detection, Text Converter, Language Converter, i18n, Localization, Ruby Annotation, One-to-Many Mapping, Intelligent Word Segmentation, Custom Dictionary, Zero Dependencies, Lightweight

---

## 繁體中文

簡繁體中文智能轉換庫 - 支援簡體中文與正體中文雙向轉換，基於詞組的智能分詞處理「一簡多繁」問題

[![NPM](https://img.shields.io/npm/v/switch-chinese.svg)](https://www.npmjs.com/package/switch-chinese) [![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://www.npmjs.com/package/switch-chinese)

### 特色

- **輕量級**：零依賴，體積小，效能優異
- **智能轉換**：支援基於詞組的智能分詞和「一簡多繁」精準轉換
- **多種資料類型**：支援字串、陣列、物件的轉換，自動遞迴處理巢狀結構
- **自訂詞庫**：允許使用者自訂簡繁轉換詞彙
- **快取機制**：支援字典快取，避免重複初始化
- **簡繁檢測**：自動檢測文字是簡體中文、繁體中文還是未知類型
- **術語轉換**：內建大陸簡體與台灣正體的常用術語轉換
- **無依賴**：純 JavaScript 實現，無需任何第三方依賴

### 安裝

使用 npm 安裝：

```bash
npm install switch-chinese
```

使用 yarn 安裝：

```bash
yarn add switch-chinese
```

### 快速開始

#### 基礎用法

```javascript
import stcasc from 'switch-chinese';

const { traditionalized, simplized, detect } = stcasc();

// 簡體轉繁體
const tc = traditionalized('简繁转换 繁简切换 香烟 香烟袅袅');
console.log(tc);
// 輸出: 簡繁轉換 繁簡切換 香菸 香煙裊裊

// 繁體轉簡體
const sc = simplized('繁體中文');
console.log(sc);
// 輸出: 繁体中文
```

#### 檢測中文類型

```javascript
import stcasc, { ChineseType } from 'switch-chinese';

const { detect } = stcasc();

const type1 = detect('简体中文');
if (type1 === ChineseType.SIMPLIFIED) {
    console.log('檢測到簡體中文');
}

const type2 = detect('繁體中文');
if (type2 === ChineseType.TRADITIONAL) {
    console.log('檢測到繁體中文');
}

const type3 = detect('English');
if (type3 === ChineseType.UNKNOWN) {
    console.log('未檢測到中文');
}
```

ChineseType 列舉值：
- `ChineseType.SIMPLIFIED` (0): 簡體中文
- `ChineseType.TRADITIONAL` (1): 繁體中文
- `ChineseType.UNKNOWN` (2): 未知類型

#### 轉換陣列和物件

函式庫支援轉換陣列和物件中的所有字串，非字串值保持原樣：

```javascript
import stcasc from 'switch-chinese';

const { traditionalized, simplized } = stcasc();

// 轉換陣列
const arr = ['简体中文', '软件', '网络', 123, true, null];
const arrTc = traditionalized(arr);
console.log(arrTc);
// 輸出: ['簡體中文', '軟體', '網路', 123, true, null]

// 轉換物件
const obj = {
    title: '简体中文标题',
    description: '这是一个简体中文描述',
    count: 100,
    active: true,
    tags: ['软件', '网络', '服务器']
};
const objTc = traditionalized(obj);
console.log(objTc);
// 輸出: {
//   title: '簡體中文標題',
//   description: '這是一個簡體中文描述',
//   count: 100,
//   active: true,
//   tags: ['軟體', '網路', '伺服器']
// }

// 轉換巢狀結構
const nested = {
    user: {
        name: '简体名称',
        profile: {
            bio: '这是简体中文简介',
            skills: ['软件开发', '网络管理']
        }
    },
    count: 42
};
const nestedTc = traditionalized(nested);
// 所有字串屬性值都會被轉換，數字等其他類型保持不變
```

### 進階用法

#### 使用快取最佳化效能

在多次呼叫時，建議使用快取機制避免重複生成字典，提升效能：

```javascript
import stcasc from 'switch-chinese';

// 第一次呼叫，生成字典
let converter = stcasc();
const cache = converter.cache;

// 將快取儲存至持久化儲存（如 localStorage、檔案等）
localStorage.setItem('stcasc-cache', JSON.stringify(cache));

// 後續呼叫，直接使用快取
const cachedData = JSON.parse(localStorage.getItem('stcasc-cache'));
converter = stcasc(cachedData);

// 現在可以直接使用，無需重新生成字典
const result = converter.traditionalized('简体中文');
```

#### 自訂簡繁轉換詞庫

可以根據業務需求自訂簡繁轉換規則：

```javascript
import stcasc from 'switch-chinese';

const customDict = {
    '身份': '身分',
    '转义': '跳脫',
    '转换': '轉檔',
    '软件': '軟體',
    '硬件': '硬體',
    '网络': '網路',
    '服务器': '伺服器'
};

const { traditionalized, simplized } = stcasc({}, customDict);

console.log(traditionalized('软件转换'));
// 輸出: 軟體轉檔（使用自訂詞庫）
```

#### 停用術語轉換

預設情況下，函式庫會轉換一些特定術語（如「知识产权」→「智慧財產權」）。如需停用此功能：

```javascript
import stcasc from 'switch-chinese';

// 第三個參數設定為 true 以停用術語轉換
const { traditionalized } = stcasc({}, {}, true);

console.log(traditionalized('知识产权'));
// 輸出: 知識産權（僅做字元轉換，不轉換術語）
```

#### 輸出格式選項

函式庫支援多種輸出格式：

```javascript
import stcasc, { OutputFormat } from 'switch-chinese';

const { traditionalized } = stcasc();

// 普通格式（預設）
const normal = traditionalized('简体中文');
// 輸出: 簡體中文

// 括號格式：同時顯示原文和轉換後的文字
const bracket = traditionalized('简体中文', { format: OutputFormat.BRACKET });
// 輸出: 簡(简)體(体)中文

// Ruby 注音格式：適用於 HTML 顯示
const ruby = traditionalized('简体中文', { format: OutputFormat.RUBY });
// 輸出: <ruby>簡<rt>简</rt></ruby><ruby>體<rt>体</rt></ruby>中文
```

OutputFormat 列舉值：
- `OutputFormat.NORMAL` (0): 只輸出轉換後的結果（預設）
- `OutputFormat.BRACKET` (1): 輸出「轉換(原文)」格式
- `OutputFormat.RUBY` (2): 輸出 `<ruby>` HTML 標籤格式

### API 文件

#### stcasc(cache?, custom?, disableTerms?)

主函式，用於建立轉換器實例。

**參數：**

- `cache` (Object, 可選): 快取物件，用於避免重複生成字典
- `custom` (Object, 可選): 自訂簡繁轉換詞庫
- `disableTerms` (Boolean, 可選): 是否停用術語轉換，預設 `false`

**回傳值：**

回傳包含以下方法的物件：

- `traditionalized(input, options?)`: 將簡體中文轉換為繁體中文
  - `input`: 可以是字串、陣列或物件
  - 字串：直接轉換並回傳新字串
  - 陣列：轉換所有字串元素，其他類型保持不變
  - 物件：遞迴轉換所有字串屬性值，其他類型保持不變
- `simplized(input, options?)`: 將繁體中文轉換為簡體中文
  - `input`: 可以是字串、陣列或物件
  - 支援的資料類型同 `traditionalized`
- `detect(text)`: 檢測文字的中文類型，回傳 ChineseType 列舉值
- `cache`: 字典快取物件

**Options 參數：**

- `format` (Number, 可選): 輸出格式，使用 `OutputFormat` 常數

#### ChineseType

匯出的常數物件，用於表示中文類型檢測結果：

```javascript
export const ChineseType = {
    SIMPLIFIED: 0,      // 簡體中文
    TRADITIONAL: 1,     // 繁體中文
    UNKNOWN: 2          // 未知類型
};
```

#### OutputFormat

匯出的常數物件，用於表示輸出格式選項：

```javascript
export const OutputFormat = {
    NORMAL: 0,      // 只輸出轉換後的結果
    BRACKET: 1,     // 輸出「轉換(原文)」格式
    RUBY: 2         // 輸出 <ruby> HTML 標籤格式
};
```

### 轉換範例

#### 智能詞組轉換

本函式庫支援基於上下文的智能詞組轉換，能夠正確處理「一簡多繁」的情況：

```javascript
const { traditionalized } = stcasc();

// 智能識別詞組邊界
console.log(traditionalized('香烟袅袅'));
// 輸出: 香煙裊裊

console.log(traditionalized('里长面子'));
// 輸出: 里長面子（「里長」是職務名稱）

console.log(traditionalized('吃干面'));
// 輸出: 吃乾麵（「乾麵」是食物）

console.log(traditionalized('把考卷发回来'));
// 輸出: 把考卷發回來（「發」是動詞）

console.log(traditionalized('卷发'));
// 輸出: 捲髮（「捲髮」是髮型）
```

#### 術語轉換

內建常用的大陸簡體與台灣正體術語轉換：

```javascript
const { traditionalized } = stcasc();

console.log(traditionalized('知识产权'));
// 輸出: 智慧財產權

console.log(traditionalized('计算机软件'));
// 輸出: 計算機軟體

console.log(traditionalized('网络服务器'));
// 輸出: 網路伺服器
```

### 技術特點

#### 高效能

- 使用字典樹（Trie）最佳化詞組比對
- 支援快取機制，避免重複初始化
- 純 JavaScript 實現，執行效率高

#### 精準轉換

- 內建大量簡繁對照字元
- 支援「一簡多繁」智能識別
- 基於詞組的上下文分析

#### 易於整合

- ES Module 標準匯出
- TypeScript 類型支援（透過常數列舉）
- 零依賴，相容性佳

### 瀏覽器支援

支援所有現代瀏覽器及 Node.js 環境：

- Chrome
- Firefox
- Safari
- Edge
- Node.js 12+

### 開源授權

MIT License

### 相關連結

- [GitHub 儲存庫](https://github.com/hoothin/UserScripts/tree/master/Switch%20Traditional%20Chinese%20and%20Simplified%20Chinese/lib)
- [NPM 套件位址](https://www.npmjs.com/package/switch-chinese)
- [問題回報](https://github.com/hoothin/UserScripts/issues)

### 關鍵字

簡繁轉換, 繁簡轉換, 簡體中文, 繁體中文, 正體中文, 中文轉換, 一簡多繁, 簡繁切換, 繁簡切換, 中文檢測, 智能分詞, 自訂詞庫, 零依賴, 輕量級
