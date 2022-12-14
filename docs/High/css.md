---
title: css
order: 2
---

## less和sass的区别
### less和sass的相同之处
Less和Sass在语法上有些共性，比如下面这些：
1. 混入(Mixins)——class中的class；
2. 参数混入——可以传递参数的class，就像函数一样；
3. 嵌套规则——Class中嵌套class，从而减少重复的代码；
4. 运算——CSS中用上数学；
5. 颜色功能——可以编辑颜色；
6. 名字空间(namespace)——分组样式，从而可以被调用；
7. 作用域——局部修改样式；
8. JavaScript 赋值——在CSS中使用JavaScript表达式赋值。

### less和sass的区别
Less和Sass的主要不同就是他们的实现方式。
1. Less是基于JavaScript，是在客户端处理的。
1. Sass是基于Ruby的，是在服务器端处理的。
1. 关于变量在Less和Sass中的唯一区别就是Less用@，Sass用$。

## grid的所有属性
grid 是一个 CSS 简写属性，可以用来设置以下属性： 
- 显式网格属性 grid-template-rows、grid-template-columns 和 grid-template-areas，
- 隐式网格属性 grid-auto-rows、grid-auto-columns 和 grid-auto-flow， 间距属性 grid-column-gap (en-US) 和 grid-row-gap (en-US)。

### 语法
```
/* <'grid-template'> values */
grid: none;
grid: "a" 100px "b" 1fr;
grid: [linename1] "a" 100px [linename2];
grid: "a" 200px "b" min-content;
grid: "a" minmax(100px, max-content) "b" 20%;
grid: 100px / 200px;
grid: minmax(400px, min-content) / repeat(auto-fill, 50px);

/* <'grid-template-rows'> /
   [ auto-flow && dense? ] <'grid-auto-columns'>? values */
grid: 200px / auto-flow;
grid: 30% / auto-flow dense;
grid: repeat(3, [line1 line2 line3] 200px) / auto-flow 300px;
grid: [line1] minmax(20em, max-content) / auto-flow dense 40%;

/* [ auto-flow && dense? ] <'grid-auto-rows'>? /
   <'grid-template-columns'> values */
grid: auto-flow / 200px;
grid: auto-flow dense / 30%;
grid: auto-flow 300px / repeat(3, [line1 line2 line3] 200px);
grid: auto-flow dense 40% / [line1] minmax(20em, max-content);

/* Global values */
grid: inherit;
grid: initial;
grid: unset;
```

## position定位
position属性用来指定一个元素在网页上的位置，一共有5种定位方式，即position属性主要有五个值。
- static
- relative
- absolute
- fixed
- sticky

### static
static是position属性的默认值。如果省略position属性，浏览器就认为该元素是static定位。

这时，浏览器会按照源码的顺序，决定每个元素的位置，这称为"正常的页面流"（normal flow）。每个块级元素占据自己的区块（block），元素与元素之间不产生重叠，这个位置就是元素的默认位置。

> 注意，static定位所导致的元素位置，是浏览器自主决定的，所以这时top、bottom、left、right这四个属性无效。
###  relative
relative表示，相对于默认位置（即static时的位置）进行偏移，即定位基点是元素的默认位置。

###  fixed
fixed表示，相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口。这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。

###  absolute
- 元素会相对于第一个不是static的父元素定位
- 在父元素没有设置相对定位或绝对定位的情况下，元素相对于根元素定位（即html元素）（是父元素没有设置）。

###  sticky
粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。

须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

## 清除浮动
1. 使用带clear属性的空元素
在浮动元素后使用一个空元素如`<div class="clear"></div>`，并在CSS中赋予.clear{clear:both;}属性即可清理浮动

2. 使用CSS的overflow属性
3. 给浮动的元素的容器添加浮动
影响布局，不推荐使用。

4. 使用邻接元素处理
给浮动元素后面的元素添加clear属性。

5. 使用CSS的:after伪元素

## ::before 和:after 中双冒号和单冒号有什么区别
单冒号（:）用于CSS3伪类，
双冒号（::）用于CSS3伪元素。（伪元素由双冒号和伪元素名称组成）

### 伪类与伪元素的区别
伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的
元素时，我们可以通过:hover来描述这个元素的状态。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过::be
fore来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

## 怎么让 Chrome 支持小于 12px 的文字？
（1）可以使用Webkit的内核的-webkit-text-size-adjust的私有CSS属性来解决，只要加了-webkit-text-size
-adjust:none;字体大小就不受限制了。但是chrome更新到27版本之后就不可以用了。所以高版本chrome谷歌浏览器
已经不再支持-webkit-text-size-adjust样式，所以要使用时候慎用。

（2）还可以使用css3的transform缩放属性-webkit-transform:scale(0.5);注意-webkit-transform:scale(0.
75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用display：block/
inline-block/...；

（3）使用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。

## 五个li，宽高固定，竖直方向间距固定，要求水平方向间距由剩余宽度均分
```
 <style type="text/css">
        ul {
            width: 100%;
            height: 210px;
            display: flex;
        }
        
        li {
            width: 100%;
            height: 100%;
            list-style: none;
            width: calc((100%-80px)/5);
            margin-right: 20px;
        }
 
        li>div {
            width: 100%;
            height: 100%;
        }
 
        li:last-child {
            margin: 0;
        }
    </style>
```
方法二：
```
 <style type="text/css">
        ul {
            width: 100%;
            height: 210px;
            background: orange;
            display: flex
        }
 
        li {
            width: 100%;
            height: 100%;
            list-style: none;
            width: calc(100%/5);
            margin-right: 20px;
            box-sizing: border-box;
 
        }
 
        li>div {
            width: 100%;
            height: 100%;
            background: red;
        }
 
        li:nth-last-child(1) {
            margin-right: 0;
        }
    </style>
```

## rem以及如何实现移动端适配
rem是CSS3新增的一个相对单位（root em，根em），它的相对是相对于HTML根元素来说的，假如我们设置HTML根节点的字体大小fontSize为10px，那么在这个HTML里面所有设置rem单位的DOM元素的像素值为y(px)=x(rem) * 10
```
body {
   fontSize: 10px
 }
 p {
   width: 10rem
 }
 则p标签的宽度为y(px) = 10(rem) * 10(body fontSize) = 100(px)
```

### rem实现移动端适配
```
const uiWidth = 1080;
//设置html默认字体为100px body字体为16px
document.body.style.fontSize = "16px";
    
//监听浏览器缩放事件
window.addEventListener("resize", resizeHandler);

//计算html字体大小
resizeHandler() {
   let contW = Math.floor(document.documentElement.clientWidth);
   let fontS = (contW / uiWidth) * 100;
   document.documentElement.style.fontSize = fontS + "px";
}
```
第二步，利用postcss-pxtorem插件，将所有px尺寸转换为rem尺寸
```
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100,//根元素字体大小或根据输入参数返回根元素字体大小，此时，ui稿的1080px（全部宽度），会被转换为10.8rem,其他尺寸y(rem) = 10.8(rem) * x(px) / 1080(px)
      propList: [],// 需要做转换的属性
      selectorBlackList:[]， // 忽略的选择器
    }
  }
}
```
### vw实现移动端适配
vw是视口单位，视口单位中的“视口”，在桌面端指的是浏览器的可视区域；在移动端指的就是Viewport中的Layout Viewport（布局适口）。

计算每一个dom元素的vw尺寸又是很繁琐的，不要担心，我们可以利用（postcss-px-to-viewport）插件来帮我们完成这项计算工作
```
module.exports = {
  css: {
     loaderOptions: {
        postcss: {
       	    plugins: [
               new PxtoVw({
                  unitToConvert: 'px', // 需要转换的单位，默认为"px"；
                  viewportWidth: 1080, // 设计稿的视口宽度，进行比例换算
                  unitPrecision: 2, // 单位转换后保留的小数位数
                  propList: ['*'], // 要进行转换的属性列表,*表示匹配所有,!表示不转换
                  viewportUnit: 'vw', // 转换后的视口单位
                  fontViewportUnit: 'vw', // 转换后字体使用的视口单位
                  selectorBlackList: [], // 不进行转换的css选择器，继续使用原有单位
                  minPixelValue: 1, // 设置最小的转换数值
                  mediaQuery: false, // 设置媒体查询里的单位是否需要转换单位
                  replace: true // 是否直接更换属性值，而不添加备用属性
                  exclude: [/node_modules/] // 忽略某些文件夹下的文件  由于引用了game/vui的toast组件，需要对其进行vm转换适配
              })
            ]
         }
      }
   }
}
```

## 层叠上下文
我们在编写 CSS 样式时不少遇到这样的疑惑：“为什么这个元素会被覆盖？”、“为什么设置较高的 z-index 值还是不起效果？”

不妨先想想这个问题，当多个 HTML 元素在浏览器视窗中发生重叠时，浏览器会怎么安排哪个元素显示在上、哪个显示在下呢？其实所有元素在发生层叠时的表现都是按照一定的优先级顺序的，这些顺序规则都是建立在 层叠上下文（The Stacking Context） 这个三维概念中，我们一起来了解下。

### 层叠上下文特性
在同一个层叠上下文中，子元素按照 层叠顺序 规则进行层叠；

```
<style>
.wrapper {
  position: relative;
  z-index: 1;
}
.wrapper div:nth-of-type(1) {
  position: relative;
  z-index: -1;
}
.wrapper div:nth-of-type(2) { display: block; }
.wrapper div:nth-of-type(3) { float: left; }
.wrapper div:nth-of-type(4) { display: inline-block; }
.wrapper div:nth-of-type(5) { position: relative; }
.wrapper div:nth-of-type(6) {
  position: absolute;
  z-index: 1;
}
</style>

<body>
  <div class="wrapper">
    <div>position: relative;<br>z-index: -1;</div>
    <div>display: block;</div>
    <div>float: left;</div>
    <div>display: inline-block;</div>
    <div>position: relative;</div>
    <div>position: absolute;<br>z-index: 1;</div>
  </div>
</body>
```
![图片zIndex](/assets/imgs/zIndex.png "zIndex")

#### 在同一个层叠上下文中，当元素的层叠顺序相同时，按照 元素在 HTML 中出现的顺序 进行层叠；
     
### 创建层叠上下文
满足以下 12 个条件中任意一个的元素会创建一个层叠上下文（摘自 MDN ）：

1. 根元素 <html>；
2. z-index 值不为 auto 的相对定位（position: relative）和绝对定位（position: absolute）；
3. 固定定位（position：fixed）；
4. z-index 值不为 auto 的伸缩盒模型中的 flex 项目；
5. opacity 属性值小于 1；
6. transform 属性值不为 none；
7. filter 属性值不为 none；
8. mix-blend-mode 属性值不为 normal；
9. perspective 属性值不为 none；
10. isolation 属性值为 isolate；
11. will-change 属性 指定了上述任意一个 CSS 属性（即便没有直接指定这些属性的值）；
12. -webkit-overflow-scrolling 属性值为 touch；

## flex了解吗？讲一下
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

在 flex 容器中默认存在两条轴，水平主轴(main axis) 和垂直的交叉轴(cross axis)

在容器中的每个单元块被称之为 flex item，每个项目占据的主轴空间为 (main size), 占据的交叉轴的空间为 (cross size)。

### 基本属性
- 有下面六种属性可以设置在容器上，它们分别是：

1. flex-direction  决定主轴的方向(即项目的排列方向)
1. flex-wrap  决定容器内项目是否可换行
1. flex-flow flex-direction 和 flex-wrap 的简写形式
1. justify-content  定义了项目在主轴的对齐方式。
1. align-items 定义了项目在交叉轴上的对齐方式
1. align-content 定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用

- 有六种属性可运用在 item 项目上：

1. order  定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 0         
1. flex-grow  定义项目的放大比例
1. flex-shrink
定义了项目的缩小比例, 默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。

如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。

如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

4. flex-basis   定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间

5. flex  flex-grow, flex-shrink 和 flex-basis的简写
有关快捷值：auto (1 1 auto) 和 none (0 0 auto)

6. align-self  允许单个项目有与其他项目不一样的对齐方式

### box-sizing 属性
盒模型可以通过 box-sizing 来设置：

语法：`box-sizing: content-box | border-box | inherit;`

- content-box：标准盒模型，CSS 定义的宽高只是 content 内容区的宽高。盒子实际宽高是内容区、内边距与边框的尺寸之和。内边距 padding 和边框 border 的尺寸改变不会影响内容区的宽高，但会影响盒子的总尺寸。
- border-box：IE盒模型，CSS 定义的宽高包括了 content，padding 和 border。内边距 padding 和边框 border 的尺寸改变会影响内容区的宽高，但不会影响盒子的总尺寸。

### flex:1;代表什么意思
flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。

flex-grow 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
    
flex-shrink 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
    
flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
    
flex 属性属性有两个快捷值：auto(1 1 auto) 和 none (0 0 auto)。
    
所以flex: 1表示的含义是等分剩余空间。

## display属性有哪些？
block 块对象的默认值。用该值为对象之后添加新行

inline 内联对象的默认值。用该值将从对象中删除行

inline-block 行内块元素。这个属性值融合了inline 和 block 的特性，即是它既是内联元素，又可以设置width和height。

none 隐藏对象。与visibility属性的hidden值不同，其不为被隐藏的对象保留其物理空间

## css中引入样式有哪几种方法，不考虑预处理和正常的三种方法，有没有其他的方法？
在 HTML 样式中有 4 种 CSS 引用方式，分别为：行内样式（行间样式、内联样式、行嵌样式）、内部样式、链入外部样式、导入外部样式。

### 行内样式（行间样式、内联样式、行嵌样式）： 
在网页元素上通过 style="" 属性直接写样式。如：
```
<div style="color: green; margin-top: 30px;border: 1px solid red;width: 500px">行内样式实例1</div>
```
### 内部样式表： 
在网页上创建嵌入的样式表，通常写在 <head></head> 里面。如：
```
<style>
    p {
        color: #6478de;
        border: red 1px solid;
    }
</style>
```    

### 链入外部样式表：
将网页链接到外部样式表。先创建一个 CSS 文件，再在 HTML 中通过 <link> 链接此 CSS 文件。一般写在 <style></style> 的前面。如：
```
<link rel="stylesheet" type="text/css" href="qt_02_style.css">
```

### 导入外部样式表： 
通过 @import 引入其他的 CSS 文件（不建议使用）。如：
```
<style>
    @import "qt_02_style.css";
</style>
```

### 4 种 CSS 引用方式的区别：
- 行内样式只作用于当前标签。HTML页面不纯净，后期维护不方便。
- 内部样式作用于当前文件。CSS 代码写在 HTML 文档中，如果一个网站有很多 HTML 页面，每个文件都会变大，后期维护难度也大，如果 HTML 文件很少，CSS 代码也不多，也可以使用这种方式。
- 外部样式可以被多个 HTML 文件引用。实现了 HTML 代码与 CSS 的完全分离，使得前期开发和后期维护都十分方便。

**_外部样式分为 <link> 引入和 @import 引入两种方式。这两种方式的区别为：_**

- <link> 是 XHTML 标签，除了可以加载 CSS 外，还可以定义 RSS 等其他事务，通过 <link> 标签中的 href="" 属性来引入外部文件。@import 属于 CSS 范畴，只能加载 CSS ，应该写在 CSS 中，且导入语句应写在样式表的开头，否则无法正确导入外部文件。
    
- <link> 引用 CSS 时，在页面载入的时候可以同时加载样式，样式加载和结构加载是异步操作。可以防止访问网页时先加载完文字、图片等结构数据，然后再加载样式的问题。@import 需要网页结构完全载入以后加载样式文件。
    
- <link> 是 XHTML 标签，无兼容问题。@import 是在 CSS2.1 提出的，低版本浏览器不支持。
    
- <link> 支持使用 JavaScript 控制 DOM 来改变样式。@import 不支持。

## CSS文件没下载完会影响CSS树吗？
QA：js执行会阻塞DOM树的解析和渲染，那么css加载会阻塞DOM树的解析和渲染吗？

总结：
1. css加载不会阻塞DOM树的解析
1. css加载会阻塞DOM树的渲染
1. css加载会阻塞后面js语句的执行

### 优化方法
1. 使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
1. 对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
1. 合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)
1. 减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)

[CSS加载](https://zhuanlan.zhihu.com/p/43282197)
