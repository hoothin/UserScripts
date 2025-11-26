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

// ========== 新增测试:Array/Object 支持 ==========
console.log('========== Array/Object 测试 ==========\n');

// 测试 14: 转换数组(简体->繁体)
console.log('测试 14: 转换数组(简体->繁体)');
const arr1 = ['简体中文', '软件', '硬盘', 123, true, null];
const arr1Tc = traditionalized(arr1);
console.log('输入:', arr1);
console.log('输出:', arr1Tc);
console.log('');

// 测试 15: 转换数组(繁体->简体)
console.log('测试 15: 转换数组(繁体->简体)');
const arr2 = ['繁體中文', '軟體', '硬碟', 456, false];
const arr2Sc = simplized(arr2);
console.log('输入:', arr2);
console.log('输出:', arr2Sc);
console.log('');

// 测试 16: 转换对象(简体->繁体)
console.log('测试 16: 转换对象(简体->繁体)');
const obj1 = {
    title: '简体中文标题',
    description: '这是一个简体中文描述',
    count: 100,
    active: true,
    tags: ['软件', '网络', '服务器']
};
const obj1Tc = traditionalized(obj1);
console.log('输入:', JSON.stringify(obj1, null, 2));
console.log('输出:', JSON.stringify(obj1Tc, null, 2));
console.log('');

// 测试 17: 转换对象(繁体->简体)
console.log('测试 17: 转换对象(繁体->简体)');
const obj2 = {
    title: '繁體中文標題',
    description: '這是一個繁體中文描述',
    price: 99.99,
    items: ['軟體', '硬碟']
};
const obj2Sc = simplized(obj2);
console.log('输入:', JSON.stringify(obj2, null, 2));
console.log('输出:', JSON.stringify(obj2Sc, null, 2));
console.log('');

// 测试 18: 转换嵌套数组
console.log('测试 18: 转换嵌套数组');
const nestedArr = [
    '简体中文',
    ['软件', '硬盘'],
    [['网络', '服务器']]
];
const nestedArrTc = traditionalized(nestedArr);
console.log('输入:', JSON.stringify(nestedArr));
console.log('输出:', JSON.stringify(nestedArrTc));
console.log('');

// 测试 19: 转换嵌套对象
console.log('测试 19: 转换嵌套对象');
const nestedObj = {
    user: {
        name: '简体名称',
        profile: {
            bio: '这是简体中文简介',
            skills: ['软件开发', '网络管理']
        }
    },
    count: 42
};
const nestedObjTc = traditionalized(nestedObj);
console.log('输入:', JSON.stringify(nestedObj, null, 2));
console.log('输出:', JSON.stringify(nestedObjTc, null, 2));
console.log('');

// 测试 20: 数组转换 - BRACKET 格式
console.log('测试 20: 数组转换 - BRACKET 格式');
const arr3 = ['简体', '中文'];
const arr3Bracket = traditionalized(arr3, { format: OutputFormat.BRACKET });
console.log('输入:', arr3);
console.log('输出:', arr3Bracket);
console.log('');

// 测试 21: 对象转换 - RUBY 格式
console.log('测试 21: 对象转换 - RUBY 格式');
const obj3 = {
    text1: '简体',
    text2: '中文'
};
const obj3Ruby = traditionalized(obj3, { format: OutputFormat.RUBY });
console.log('输入:', JSON.stringify(obj3, null, 2));
console.log('输出:', JSON.stringify(obj3Ruby, null, 2));
console.log('');

// 测试 22: 处理 null 和 undefined
console.log('测试 22: 处理 null 和 undefined');
console.log('null 输入:', traditionalized(null));
console.log('undefined 输入:', traditionalized(undefined));
console.log('包含 null 的数组:', traditionalized(['简体', null, '中文']));
console.log('');

console.log('========== 测试完成 ==========');
