簡繁自由切換
===
> 切換正體/簡體中文，超輕量級，支援自訂詞彙與「一簡多繁」轉換，無任何相依性

[![NPM](https://img.shields.io/npm/v/switch-chinese.svg)](https://www.npmjs.com/package/switch-chinese) [![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://www.npmjs.com/package/switch-chinese)


演示
---
+ 基礎用法

``` js
import Stcasc from './stcasc.lib.js';
const stcasc = Stcasc();
const sc = "香烟 香烟袅袅 烟雾里 里长面子 吃干面 干 把考卷发回来 卷发 知识产权";
console.log(stcasc.traditionalized(sc));
//香菸 香煙裊裊 煙霧裡 里長面子 吃乾麵 幹 把考卷發回來 捲髮 智慧財產權
```

``` js
const stcasc = Stcasc({}, {}, true);
const sc = "知识产权";
console.log(stcasc.traditionalized(sc));
//知識産權
```

+ 透過 npm 安裝

``` 
npm install switch-chinese
import Stcasc from 'switch-chinese';
```

+ 轉正體中文

``` js
stcasc.traditionalized("简体中文");
//簡體中文
```

+ 轉簡體中文

``` js
stcasc.simplized("正體中文");
//正体中文
```

+ 添加快取

``` js
let cache = loadCacheAtYourWay();
let stcasc = Stcasc(cache);
saveCacheAtYourWay(stcasc.cache);
```

+ 自訂簡繁切換

``` js
const custom = {
	"身份": "身分",
	"转义": "跳脫",
	"转换": "轉檔",
	"软件": "軟體"
};
let stcasc = Stcasc(cache, custom);
```

+ 禁用用語轉換

``` js
let stcasc = Stcasc({}, {}, true);
```
