import stcasc, { ChineseType, OutputFormat } from './stcasc.lib.js';

console.log('========== 简繁转换库测试 ==========\n');

// 初始化
const { traditionalized, simplized, detect } = stcasc();

// 测试 1: 基础简体转繁体
console.log('测试 1: 基础简体转繁体');
const sc1 = '简繁转换 繁简切换 香烟 香烟袅袅 烟雾里 里长面子';
const tc1 = traditionalized(sc1);
console.log('输入:', sc1);
console.log('输出:', tc1);
console.log('');

// 测试 2: 基础繁体转简体
console.log('测试 2: 基础繁体转简体');
const tc2 = '繁體中文 簡體中文';
const sc2 = simplized(tc2);
console.log('输入:', tc2);
console.log('输出:', sc2);
console.log('');

// 测试 3: 检测简体中文
console.log('测试 3: 检测简体中文');
const text1 = '这是简体中文';
const type1 = detect(text1);
console.log('文本:', text1);
console.log('类型:', type1 === ChineseType.SIMPLIFIED ? '简体中文' : '未知');
console.log('枚举值:', type1);
console.log('');

// 测试 4: 检测繁体中文
console.log('测试 4: 检测繁体中文');
const text2 = '這是繁體中文';
const type2 = detect(text2);
console.log('文本:', text2);
console.log('类型:', type2 === ChineseType.TRADITIONAL ? '繁体中文' : '未知');
console.log('枚举值:', type2);
console.log('');

// 测试 5: 检测非中文
console.log('测试 5: 检测非中文');
const text3 = 'English Text';
const type3 = detect(text3);
console.log('文本:', text3);
console.log('类型:', type3 === ChineseType.UNKNOWN ? '未知' : '中文');
console.log('枚举值:', type3);
console.log('');

// 测试 6: 输出格式 - BRACKET（括号格式）
console.log('测试 6: 输出格式 - BRACKET（括号格式）');
const sc3 = '简体中文转换';
const tc3 = traditionalized(sc3, { format: OutputFormat.BRACKET });
console.log('输入:', sc3);
console.log('输出:', tc3);
console.log('');

// 测试 7: 输出格式 - RUBY（HTML ruby标签格式）
console.log('测试 7: 输出格式 - RUBY（HTML ruby标签格式）');
const sc4 = '简体中文';
const tc4 = traditionalized(sc4, { format: OutputFormat.RUBY });
console.log('输入:', sc4);
console.log('输出:', tc4);
console.log('');

// 测试 8: 繁体转简体 - BRACKET格式
console.log('测试 8: 繁体转简体 - BRACKET格式');
const tc5 = '繁體中文';
const sc5 = simplized(tc5, { format: OutputFormat.BRACKET });
console.log('输入:', tc5);
console.log('输出:', sc5);
console.log('');

// 测试 9: 繁体转简体 - RUBY格式
console.log('测试 9: 繁体转简体 - RUBY格式');
const tc6 = '繁體中文';
const sc6 = simplized(tc6, { format: OutputFormat.RUBY });
console.log('输入:', tc6);
console.log('输出:', sc6);
console.log('');

// 测试 10: 复杂文本转换 - 正常格式
console.log('测试 10: 复杂文本转换 - 正常格式');
const complex = '吃干面 把考卷发回来 卷发 知识产权';
const complexTc = traditionalized(complex);
console.log('输入:', complex);
console.log('输出:', complexTc);
console.log('');

// 测试 11: 复杂文本转换 - BRACKET格式
console.log('测试 11: 复杂文本转换 - BRACKET格式');
const complexBracket = traditionalized(complex, { format: OutputFormat.BRACKET });
console.log('输入:', complex);
console.log('输出:', complexBracket);
console.log('');

// 测试 12: 术语转换
console.log('测试 12: 术语转换');
const terms = '软件 硬盘 网络 服务器 鼠标';
const termsTc = traditionalized(terms);
console.log('输入:', terms);
console.log('输出:', termsTc);
console.log('');

// 测试 13: 混合文本
console.log('测试 13: 混合文本');
const mixed = 'This is 简体中文 and English';
const mixedTc = traditionalized(mixed);
console.log('输入:', mixed);
console.log('输出:', mixedTc);
console.log('');

console.log('========== 测试完成 ==========');
