---
title: html
order: 1
---

## meta的用法？
    <meta> 标签通常位于 <head> 区域内。
元数据（Metadata）是数据的数据信息。

<meta> 标签提供了 HTML 文档的元数据。元数据不会显示在客户端，但是会被浏览器解析。

META元素通常用于指定网页的描述，关键词，文件的最后修改时间，作者及其他元数据。

元数据可以被使用浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 Web 服务调用。

## BFC和IFC
    BFC 的全称是 Block Formatting Context，名为 “块级格式化上下文”。
    
    IFC， inline Formatting Contexts, 也就是 ”内联格式化上下文“。

### 触发 BFC 方法？
- 根元素 <html>

        意味着整个 HTML 文档就是一个大的 BFC 容器

- float 的值不为 none
- position 的值不为 static  或者 relative
- display 的值为 table-cell、table-caption、inline-block、flex 和 inline-flex 中的其中一个
- overflow 的值不为 visible

### BFC会与float元素相互覆盖吗
BFC的区域不会与float的元素区域重叠计算BFC的高度时，浮动子元素也参与计算BFC

## 什么是BOM和DOM？
Javascript 由三部分构成，ECMAScript，DOM和BOM。根据宿主（浏览器）的不同，具体的表现形式也不尽相同，ie和其他的浏览器风格迥异,IE 扩展了 BOM，加入了 ActiveXObject 类，可以通过 JavaScript 实例化 ActiveX 对象。 

1. ECMAScript(核心) 　　描述了JS的语法和基本对象
2. DOM 是文档对象模型，处理网页内容的方法和接口。是W3C 的标准； [所有浏览器公共遵守的标准]
3. BOM 是浏览器对象模型，提供与浏览器交互的方法和接口。各个浏览器厂商根据 DOM在各自浏览器上的实现;[表现为不同浏览器定义有差别,实现方式不同]

### 属性
- Window对象包含属性：document、location、navigator、screen、history、frames
- Document根节点包含子节点：forms、embeds、anchors、images、links

从window.document已然可以看出，DOM的最根本的对象是BOM的window对象的子对象。


