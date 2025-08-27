簡繁自由切換
===
> 切換正體/簡體中文，超輕量級，支援自訂詞彙與「一簡多繁」轉換，無任何相依性

[![NPM](https://img.shields.io/npm/v/switch-chinese.svg)](https://www.npmjs.com/package/switch-chinese) [![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://www.npmjs.com/package/switch-chinese)

Install
---
``` shell
npm install switch-chinese
```

演示
---
+ 基礎用法

``` js
const stcasc = Stcasc();
const sc = "简繁转换 繁简切换 香烟 香烟袅袅 烟雾里 里长面子 吃干面 干 把考卷发回来 卷发 知识产权";
const tc = stcasc.traditionalized(sc);
console.log(tc);
//簡繁轉換 繁簡切換 香菸 香煙裊裊 煙霧裡 里長面子 吃乾麵 幹 把考卷發回來 捲髮 智慧財產權
```


+ Import

``` shell
import Stcasc from 'switch-chinese';
```

+ 轉正體中文

``` js
stcasc.traditionalized("简体中文");
//簡體中文
```

+ 轉簡體中文

``` js
stcasc.simplized("繁體中文");
//繁体中文
```

+ 添加快取，避免重複生成字典

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
const stcasc = Stcasc(cache, custom);
```

+ 禁用用語轉換

``` js
const stcasc = Stcasc({}, {}, true);
const sc = "知识产权";
console.log(stcasc.traditionalized(sc));
//知識産權
```
