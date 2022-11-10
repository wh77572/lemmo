---
title: js
order: 3
---

## 数据类型
### JS的数据类型
最新的 ECMAScript 标准定义了 8 种数据类型：

七种基本数据类型：
- 布尔值（Boolean），有 2 个值分别是：true 和 false.
- null，一个表明 null 值的特殊关键字。JavaScript 是大小写敏感的，因此 null 与 Null、NULL或变体完全不同。
- undefined，和 null 一样是一个特殊的关键字，undefined 表示变量未赋值时的属性。
- 数字（Number），整数或浮点数，例如： 42 或者 3.14159。
- 任意精度的整数 (BigInt) ，可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。
- 字符串（String），字符串是一串表示文本值的字符序列，例如："Howdy" 。
- 代表（Symbol）( 在 ECMAScript 6 中新添加的类型).。一种实例是唯一且不可改变的数据类型。
复杂类型：
- 对象（Object）。
> Object 下还有很多细分的类型, 如Array、Function、Date、RegExp、Error 等。

### JS的类型检测
- typeof
> typeof 是一元操作符，放在其单个操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串。

- instanceof
instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
```
let o = new Object();
let a = new Array();
console.log(o instanceof Array);
console.log(a instanceof Array);
```
使用Array.isArray
```
console.log(Array.isArray(a))
```

- Object.prototype.toString.call()
当 toString 方法被调用的时候，下面的步骤会被执行：

1. 如果 this 值是 undefined，就返回 [object Undefined]
2. 如果 this 的值是 null，就返回 [object Null]
3. 让 O 成为 ToObject(this) 的结果
4. 让 class 成为 O 的内部属性 [[Class]] 的值
5. 最后返回由 "[object " 和 class 和 "]" 三个部分组成的字符串.
通过规范，我们至少知道了调用 Object.prototype.toString 会返回一个由 "[object " 和 class 和 "]" 组成的字符串，而 class 是要判断的对象的内部属性。
```
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(null)) // [object Null]

var date = new Date();
console.log(Object.prototype.toString.call(date)) // [object Date]
```

```
// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]
```

*[参考资料](https://github.com/mqyqingfeng/Blog/issues/28)*.

## 类型转换
将值从一种类型转换为另一种类型通常称为类型转换。

### 原始值转布尔
我们使用 Boolean 函数将类型转换成布尔类型，在 JavaScript 中，只有 6 种值可以被转换成 false，其他都会被转换成 true。
```
console.log(Boolean()) // false

console.log(Boolean(false)) // false

console.log(Boolean(undefined)) // false
console.log(Boolean(null)) // false
console.log(Boolean(+0)) // false
console.log(Boolean(-0)) // false
console.log(Boolean(NaN)) // false
console.log(Boolean("")) // false
```
### 原始值转数字
我们可以使用 Number 函数将类型转换成数字类型，如果参数无法被转换为数字，则返回 NaN。
```
console.log(Number()) // +0

console.log(Number(undefined)) // NaN
console.log(Number(null)) // +0

console.log(Number(false)) // +0
console.log(Number(true)) // 1

console.log(Number("123")) // 123
console.log(Number("-123")) // -123
console.log(Number("1.2")) // 1.2
console.log(Number("000123")) // 123
console.log(Number("-000123")) // -123

console.log(Number("0x11")) // 17

console.log(Number("")) // 0
console.log(Number(" ")) // 0

console.log(Number("123 123")) // NaN
console.log(Number("foo")) // NaN
console.log(Number("100a")) // NaN
```
如果通过 Number 转换函数传入一个字符串，它会试图将其转换成一个整数或浮点数，而且会忽略所有前导的 0，如果有一个字符不是数字，结果都会返回 NaN，鉴于这种严格的判断，我们一般还会使用更加灵活的 parseInt 和 parseFloat 进行转换。

parseInt 只解析整数，parseFloat 则可以解析整数和浮点数，如果字符串前缀是 "0x" 或者"0X"，parseInt 将其解释为十六进制数，parseInt 和 parseFloat 都会跳过任意数量的前导空格，尽可能解析更多数值字符，并忽略后面的内容。如果第一个非空格字符是非法的数字直接量，将最终返回 NaN：

```
console.log(parseInt("3 abc")) // 3
console.log(parseFloat("3.14 abc")) // 3.14
console.log(parseInt("-12.34")) // -12
console.log(parseInt("0xFF")) // 255
console.log(parseFloat(".1")) // 0.1
console.log(parseInt("0.1")) // 0
```
### 原始值转字符
我们使用 String 函数将类型转换成字符串类型
```
console.log(String()) // 空字符串

console.log(String(undefined)) // undefined
console.log(String(null)) // null

console.log(String(false)) // false
console.log(String(true)) // true

console.log(String(0)) // 0
console.log(String(-0)) // 0
console.log(String(NaN)) // NaN
console.log(String(Infinity)) // Infinity
console.log(String(-Infinity)) // -Infinity
console.log(String(1)) // 1
```
### 原始值转对象
原始值到对象的转换非常简单，原始值通过调用 String()、Number() 或者 Boolean() 构造函数，转换为它们各自的包装对象。

null 和 undefined 属于例外，当将它们用在期望是一个对象的地方都会造成一个类型错误 (TypeError) 异常，而不会执行正常的转换。
```
var a = 1;
console.log(typeof a); // number
var b = new Number(a);
console.log(typeof b); // object
```
### 对象转布尔值
对象到布尔值的转换非常简单：所有对象(包括数组和函数)都转换为 true。对于包装对象也是这样
```
console.log(Boolean({}))// true
console.log(Boolean(new Boolean(false))) // true
```
### 对象转字符串和数字
对象到字符串和对象到数字的转换都是通过调用待转换对象的一个方法来完成的。而 JavaScript 对象有两个不同的方法来执行转换，一个是 toString，一个是 valueOf。注意这个跟上面所说的 ToString 和 ToNumber 是不同的，这两个方法是真实暴露出来的方法。

所有的对象除了 null 和 undefined 之外的任何值都具有 toString 方法，通常情况下，它和使用 String 方法返回的结果一致。toString 方法的作用在于返回一个反映这个对象的字符串，然而这才是情况复杂的开始。
上面说到讲到过 Object.prototype.toString 方法会根据这个对象的[[class]]内部属性，返回由 "[object " 和 class 和 "]" 三个部分组成的字符串。举个例子：
```
Object.prototype.toString.call({a: 1}) // "[object Object]"
({a: 1}).toString() // "[object Object]"
({a: 1}).toString === Object.prototype.toString // true
```
我们可以看出当调用对象的 toString 方法时，其实调用的是 Object.prototype 上的 toString 方法。

然而 JavaScript 下的很多类根据各自的特点，定义了更多版本的 toString 方法。例如:

1. 数组的 toString 方法将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串。
2. 函数的 toString 方法返回源代码字符串。
3. 日期的 toString 方法返回一个可读的日期和时间字符串。
4. RegExp 的 toString 方法返回一个表示正则表达式直接量的字符串。

例子：
```
console.log(({}).toString()) // [object Object]

console.log([].toString()) // ""
console.log([0].toString()) // 0
console.log([1, 2, 3].toString()) // 1,2,3
console.log((function(){var a = 1;}).toString()) // function (){var a = 1;}
console.log((/\d+/g).toString()) // /\d+/g
console.log((new Date(2010, 0, 1)).toString()) // Fri Jan 01 2010 00:00:00 GMT+0800 (CST)
```

另一个转换对象的函数是 valueOf，表示对象的原始值。默认的 valueOf 方法返回这个对象本身，数组、函数、正则简单的继承了这个默认方法，也会返回对象本身。日期是一个例外，它会返回它的一个内容表示: 1970 年 1 月 1 日以来的毫秒数。

```
var date = new Date(2017, 4, 21);
console.log(date.valueOf()) // 1495296000000
```
### 对象转字符串
所以总结下，对象转字符串(就是 Number() 函数)可以概括为：

1. 如果对象具有 toString 方法，则调用这个方法。如果他返回一个原始值，JavaScript 将这个值转换为字符串，并返回这个字符串结果。
2. 如果对象没有 toString 方法，或者这个方法并不返回一个原始值，那么 JavaScript 会调用 valueOf 方法。如果存在这个方法，则 JavaScript 调用它。如果返回值是原始值，JavaScript 将这个值转换为字符串，并返回这个字符串的结果。
3. 否则，JavaScript 无法从 toString 或者 valueOf 获得一个原始值，这时它将抛出一个类型错误异常。

### 对象转数字
对象转数字的过程中，JavaScript 做了同样的事情，只是它会首先尝试 valueOf 方法

1. 如果对象具有 valueOf 方法，且返回一个原始值，则 JavaScript 将这个原始值转换为数字并返回这个数字
2. 否则，如果对象具有 toString 方法，且返回一个原始值，则 JavaScript 将其转换并返回。
3. 否则，JavaScript 抛出一个类型错误异常。

举个例子：
```
console.log(Number({})) // NaN
console.log(Number({a : 1})) // NaN

console.log(Number([])) // 0
console.log(Number([0])) // 0
console.log(Number([1, 2, 3])) // NaN
console.log(Number(function(){var a = 1;})) // NaN
console.log(Number(/\d+/g)) // NaN
console.log(Number(new Date(2010, 0, 1))) // 1262275200000
console.log(Number(new Error('a'))) // NaN
```

*[参考资料](https://github.com/mqyqingfeng/Blog/issues/159)*

## 闭包
*[对闭包的看法，为什么要用闭包？说一下闭包原理以及应用场景](https://github.com/lgwebdream/FE-Interview/issues/17)*

利用函数作用域来保护私有变量，并且返回了对被保护变量的引用，这样的行为就是闭包.

- 优点:
1. 可以从内部函数访问外部函数的作用域中的变量，且访问到的变量长期驻扎在内存中，可供之后使用
2. 避免变量污染全局
3. 把变量存到独立的作用域，作为私有成员存在

- 缺点:
1. 对内存消耗有负面影响。因内部函数保存了对外部变量的引用，导致无法被垃圾回收，增大内存使用量，所以使用不当会导致内存泄漏
2. 对处理速度具有负面影响。闭包的层级决定了引用的外部变量在查找时经过的作用域链长度
3. 可能获取到意外的值(captured value)

- 应用场景:
1. 典型应用是模块封装，在各模块规范出现之前，都是用这样的方式防止变量污染全局。
```
var Yideng = (function () {
    // 这样声明为模块私有变量，外界无法直接访问
    var foo = 0;

    function Yideng() {}
    Yideng.prototype.bar = function bar() {
        return foo;
    };
    return Yideng;
}());
```

2. 在循环中创建闭包，防止取到意外的值。
```
for (var i = 0; i < 3; i++) {
    document.getElementById('id' + i).onfocus = function() {
      alert(i);
    };
}
//可用闭包解决
function makeCallback(num) {
  return function() {
    alert(num);
  };
}
for (var i = 0; i < 3; i++) {
    document.getElementById('id' + i).onfocus = makeCallback(i);
}
```

3. 缓存一些结果
```
function funcParent(){
    let memo = []
    function funcTwo(i){
        memo.push(i)
        console.log(memo.join(','))
    }
    return funcTwo
}
```

## 作用域和作用域链

### 作用域
作用域是指程序源代码中定义变量的区域。

作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。

#### 静态作用域与动态作用域
因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。

而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。

让我们认真看个例子就能明白之间的区别：
```
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// 结果是 ???
```
执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

*[词法作用域](https://github.com/mqyqingfeng/Blog/issues/3)*

### 作用域链

**当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。**

### 作用域与执行上下文

JavaScript属于解释型语言，JavaScript的执行分为：解释和执行两个阶段,这两个阶段所做的事并不一样：

**解释阶段：**
- 词法分析
- 语法分析
- 作用域规则确定

**执行阶段：**
- 创建执行上下文
- 执行函数代码
- 垃圾回收

JavaScript解释阶段便会确定作用域规则，因此作用域在函数定义时就已经确定了，而不是在函数调用时确定，但是执行上下文是函数执行之前创建的。执行上下文最明显的就是this的指向是执行时确定的。而作用域访问的变量是编写代码的结构确定的。

作用域和执行上下文之间最大的区别是：<br>
执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变。

一个作用域下可能包含若干个上下文环境。有可能从来没有过上下文环境（函数从来就没有被调用过）；有可能有过，现在函数被调用完毕后，上下文环境被销毁了；有可能同时存在一个或多个（闭包）。同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。

## 内存管理
### JS内存生命周期
1. 内存分配：当我们申明变量、函数、对象的时候，系统会自动为他们分配内存
2. 内存使用：即读写内存，也就是使用变量、函数等
3. 内存回收：使用完毕，由垃圾回收机制自动回收不再使用的内存

### 垃圾回收机制
1. 引用计数垃圾收集

如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收。

缺点: 引用计数算法是个简单有效的算法。但它却存在一个致命的问题：循环引用。

如果两个对象相互引用，尽管他们已不再使用，垃圾回收不会进行回收，导致内存泄露。

2. 标记清除算法

标记清除采用的收集策略为：

- JavaScript中的垃圾收集器运行时会给存储在内存中的所有变量都加上标记；
- 然后去掉环境中的变量以及被环境中的变量引用的变量的标记；
- 此后，再被加上标记的变量被视为准备删除的变量；
- 最后，垃圾收集器完成内存清除，销毁那些带标记的值并回收其占用的内存空间。

垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象。

缺点: 那些无法从根对象查询到的对象都将被清除
(尽管这是一个限制，但实践中我们很少会碰到类似的情况，所以开发者不太会去关心垃圾回收机制。)

### 垃圾回收的性能问题
垃圾收集器是周期运行的，确定 垃圾收集的时间间隔 是个重要的问题。

### JavaScript V8 引擎的垃圾回收机制
在JavaScript脚本中，绝大多数对象的生存期很短，只有部分对象的生存期较长。所以，V8 中的垃圾回收主要使用的是 分代回收 (Generational collection)机制。

#### 分代回收机制
V8 引擎将保存对象的 堆 (heap) 进行了分代:

- 对象最初会被分在 新生区(New Space) (1~8M)，新生区的内存分配只需要保有一个指向内存区的指针，不断根据内存大小进行递增，当指针达到新生区的末尾，会有一次垃圾回收清理(小周期)，清理掉新生区中不再活跃的死对象。
- 对于超过 2 个小周期的对象，则需要将其移动至 老生区(Old Space)。老生区在 标记-清除 或 标记-紧缩 的过程(大周期) 中进行回收。

#### Scavenge 算法
由于垃圾清理发生的比较频繁，清理的过程必须很快。V8 中的清理过程使用的是 Scavenge 算法，按照 经典的 Cheney 算法 实现的。Scavenge 算法的主要过程是：

- 新生区被分为两个等大小的子区(semi-spaces)：to-space 和 from-space；
- 大多数的内存分配都是在 to-space 发生 (某些特定对象是在老生区)；
- 当 to-space 耗尽时，交换 to-space 和 from-space, 此时所有的对象都在 from-space；
- 然后将 from-space 中活跃的对象复制到 to-space 或者老生区中;
- 这些对象被直接压到 to-space，提升了 Cache 的内存局部性，可使内存分配简洁快速。

因为新生区的内存一般都不大，所以使用 Scavenge 算法进行垃圾回收效果比较好。老生区一般占用内存较大，因此采用的是 标记-清除(Mark-Sweep)算法 与 标记-紧缩(Mark-Compact)算法。
两种算法都包括两个阶段：标记阶段，清除或紧缩阶段。

1. **标记阶段**

标记算法的核心是 深度优先搜索，具体过程为：

- 在标记的初期，位图是空的，所有对象也都是白的。
- 从根可达的对象会被染色为灰色，并被放入标记用的一个单独分配的双端队列。
- 标记阶段的每次循环，GC会将一个对象从双端队列中取出，染色为黑，然后将它的邻接对象染色为灰，并把邻接对象放入双端队列。
- 这一过程在双端队列为空且所有对象都变黑时结束。
- 特别大的对象，如长数组，可能会在处理时分片，以防溢出双端队列。如果双端队列溢出了，则对象仍然会被染为灰色，但不会再被放入队列（这样他们的邻接对象就没有机会再染色了）。
- 因此当双端队列为空时，GC仍然需要扫描一次，确保所有的灰对象都成为了黑对象。对于未被染黑的灰对象，GC会将其再次放入队列，再度处理。

标记算法结束后，所有的活跃对象都被染成黑色，所有的死对象仍是白的。下一步就可以清除或者紧缩了。

2. **清除 或 紧缩 算法**
标记算法执行后，可以选择清除 或是紧缩，这两个算法都可以收回内存，而且两者都作用于页级(V8 中的内存页是 1MB 的连续内存块)

— 清除算法扫描连续存放的死对象，将其变为空闲空间，并将其添加到空闲内存链表中。清除算法只需要遍历页的位图，搜索连续的白对象。[每一页都包含数个空闲内存链表，其分别代表小内存区（<256字）、中内存区（<2048字）、大内存区（<16384字）和超大内存区（其它更大的内存）]

- 紧缩算法会尝试将对象从碎片页(包含大量小空闲内存的页)中迁移整合在一起，来释放内存。这些对象会被迁移到另外的页上，因此也可能会新分配一些页。而迁出后的碎片页就返还给操作系统。
  
#### 增量标记 与 惰性清除
对于一个堆很大，活跃对象有很多的脚本时，标记-清除 与 标记-紧缩 的效率可能会很慢，为减少垃圾回收引起的停顿，引入了 增量标记(Incremental marking) 和 惰性清理(lazy sweeping)。
- 增量标记在堆的大小达到一定的阈值时启用，启用之后每当一定量的内存分配后，脚本的执行就会停顿并进行一次增量标记。就像普通的标记一样，增量标记也是一个深度优先搜索，并同样采用白灰黑机制来分类对象。

- 惰性清理是指在标记完成后，并不急着释放空间，无需一次清理所有的页，垃圾回收器会视情况逐一清理，直到所有页都清理完成。

[参考文档](https://juejin.cn/post/6844903858972409869)

## new,call,apply,bind方法的实现原理
### new
### call
### apply
### bind

## 深拷贝和浅拷贝
深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的。

### 浅拷贝
浅拷贝是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。即默认拷贝构造函数只是对对象进行浅拷贝复制(逐个成员依次拷贝)，即只复制对象空间而不复制资源。

常见浅拷贝方法：Object.assign、 扩展运算符、 Array.prototype.slice()、 Array.prototype.concat() 等

### 深拷贝
拷贝所有的属性,并且地址也与原来的不同,这样的话,你改变当前的属性也不会影响原来的
- JSON.parse(JSON.stringify())
可以实现数组或对象深拷贝,但不能处理函数

- 递归赋值
```
function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            //判断是否为自身属性
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}
```

- lodash(_.cloneDeep())

### 区别
浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

## 原型和原型链
原型是一个prototype对象，用于表示对象之间的关系。

### 前置知识

- 想要弄清楚原型和原型链，这几个属性必须要搞清楚，__proto__、prototype、 constructor。
- 其次你要知道js中对象和函数的关系，函数其实是对象的一种。
- 最后你要知道函数、构造函数的区别，任何函数都可以作为构造函数，但是并不能将任意函数叫做构造函数，只有当一个函数通过new关键字调用的时候才可以成为构造函数。如：

```
var Parent = function(){

}
//定义一个函数，那它只是一个普通的函数，下面我们让这个函数变得不普通
var p1 = new Parent();
//这时这个Parent就不是普通的函数了，它现在是一个构造函数。因为通过new关键字调用了它
//创建了一个Parent构造函数的实例 p1
```

记住两点:

**1. __proto__、 constructor属性是对象所独有的；**(**constructor属性是让"儿子"，"儿孙"们知道是谁创造了自己**)

**2. prototype属性是函数独有的(上面说过js中函数也是对象的一种，那么函数同样也有属性__proto__、 constructor)**

另:

![图片prototype](/assets/imgs/prototype.png "prototype")

### 原型详解

例子:

```
function Person(name) {
    this.name = name;
    this.age = 18;
    this.sayName = function() {
        console.log(this.name);
    }
}
// 第二步 创建实例
var person = new Person('person')
```

根据代码，我们可以得到下图

![图片proto](/assets/imgs/proto.png "proto")

构造函数Person存在原型对象Person.prototype

构造函数生成实例对象person，person的__proto__指向构造函数Person原型对象

Person.prototype.__proto__ 指向内置对象，因为 Person.prototype 是个对象，默认是由 Object函数作为类创建的，而 Object.prototype 为内置对象

Person.__proto__ 指向内置匿名函数 anonymous，因为 Person 是个函数对象，默认由 Function 作为类创建

Function.prototype 和 Function.__proto__同时指向内置匿名函数 anonymous，这样原型链的终点就是 null

**__proto__作为不同对象之间的桥梁，用来指向创建它的构造函数的原型对象的**

![图片up_proto](/assets/imgs/up_proto.png "proto")

每个对象的__proto__都是指向它的构造函数的原型对象prototype的
```
person.__proto__ === Person.prototype
```
构造函数是一个函数对象，是通过 Function构造器产生的
```
Person.__proto__ === Function.prototype
```
所有的构造器都是函数对象，函数对象都是 Function构造产生的
```
Object.__proto__ === Function.prototype
```
Object的原型对象也有__proto__属性指向null，null是原型链的顶端
```
Object.prototype.__proto__ === null
```

总结:

- 一切对象都是继承自Object对象，Object 对象直接继承根源对象null

- 一切的函数对象（包括 Object 对象），都是继承自 Function 对象

- Object 对象直接继承自 Function 对象

- Function对象的__proto__会指向自己的原型对象，最终还是继承自Object对象

即:

**person.__proto__ === Person.prototype**

**Person.prototype.__proto__ === Object.prototype**

**Object.prototype.__proto__ === null**

### 原型链
当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念

## js继承

## EventLoop
每个宏任务之后，引擎会立即执行微任务队列中的所有任务，然后再执行其他的宏任务，或渲染，或进行其他任何操作。

- 宏任务包括有：setTimeOut、setInterval、setImmediate、I/O、用户交互操作，UI渲染，<script>标签中的运行代码
- 微任务包括有：Promise(重点)、process.nextTick(nodejs)、Object.observe(不推荐使用)

### javascript中script整体代码属于宏任务怎么理解呢？
因为代码不是任务，所以 console.log()这句代码也不是任务，更不是宏任务。<br>
“script整体代码块”的特殊之处，在于它的入口不是回调函数，但是我们可以想象它被装在一个隐形的函数里，作为回调函数被注册到某个事件里（大概是它解析完成之后会触发的一个事件），这时候这个隐形的函数就成为了一个任务。
```
<script>
    console.log(1);
    async function fnOne() {
        console.log(2);
        await fnTwo(); // 右结合先执行右侧的代码, 然后等待
        console.log(3);
    }
    async function fnTwo() {
        console.log(4);
    }
    fnOne();

    setTimeout(() => {
        console.log(5);
    }, 2000);

    let p = new Promise((resolve, reject) => { // new Promise()里的函数体会马上执行所有代码
        console.log(6);
        resolve();
        console.log(7);
    })

    setTimeout(() => {
        console.log(8)
    }, 0)

    p.then(() => {
        console.log(9);
    })
    console.log(10);
</script>

// 1,2,4,6,7,10,3,9,8,5

<script>
    console.log(11);
    let b = new Promise((resolve, reject) => { // new Promise()里的函数体会马上执行所有代码
        resolve(33);
    })
    b.then(res => {
        console.log(res)
    })
    setTimeout(() => {
        console.log(12);
        let p = new Promise((resolve) => {
            resolve(13);
        })
        p.then(res => {
            console.log(res);
        })
        console.log(15);
    }, 0)
    console.log(14);
</script>

// 11,14,33,12,15,13
```

所以可以理解<script></script> 成 setTimeout，是一个函数包装，是一个宏任务。

### 为什么要使用process.nextTick()?

有两个主要原因：

1. 允许用户处理错误，清理任何不需要的资源，或者在事件循环继续之前重试请求。 
2. 有时有让回调在栈展开后，但在事件循环继续之前运行的必要

### 微任务和宏任务在Node的执行顺序
Node 10以前：
* 执行完一个阶段的所有任务
* 执行完nextTick队列里面的内容
* 然后执行完微任务队列的内容
Node 11以后：
* 和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列。

[参考文档](https://zhuanlan.zhihu.com/p/78113300)

## 强缓存和协商缓存
### 强缓存
强缓存通过Expires和Cache-Control两种响应头实现

1、Expires
Expires是http1.0提出的一个表示资源过期时间的header，它描述的是一个绝对时间，由服务器返回。
Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效

    Expires: Wed, 11 May 2018 07:20:00 GMT

2、Cache-Control
Cache-Control 出现于 HTTP / 1.1，**优先级高于 Expires** ,表示的是相对时间

    Cache-Control: max-age=315360000
    
#### 题外tips
- Cache-Control: no-cache不会缓存数据到本地的说法是错误的，详情《HTTP权威指南》P182
![图片cacheImg](/assets/imgs/cache_img.png "cacheImg")

- Cache-Control: no-store才是真正的不缓存数据到本地
- Cache-Control: public可以被所有用户缓存（多用户共享），包括终端和CDN等中间代理服务器
- Cache-Control: private只能被终端浏览器缓存（而且是私有缓存），不允许中继缓存服务器进行缓存

### 协商缓存
当浏览器对某个资源的请求没有命中强缓存，就会发一个请求到服务器，验证协商缓存是否命中，如果协商缓存命中，请求响应返回的http状态为304并且会显示一个Not Modified的字符串

协商缓存是利用的是【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】这两对Header来管理的

1、Last-Modified，If-Modified-Since
Last-Modified 表示本地文件最后修改日期，浏览器会在request header加上If-Modified-Since（上次返回的Last-Modified的值），询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来

但是如果在本地打开缓存文件，就会造成 Last-Modified 被修改，所以在 HTTP / 1.1 出现了 ETag

2、ETag、If-None-Match
Etag就像一个指纹，资源变化都会导致ETag变化，跟最后修改时间没有关系，ETag可以保证每一个资源是唯一的

If-None-Match的header会将上次返回的Etag发送给服务器，询问该资源的Etag是否有更新，有变动就会发送新的资源回来

**ETag的优先级比Last-Modified更高**

具体为什么要用ETag，主要出于下面几种情况考虑：

- 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET；
- 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
- 某些服务器不能精确的得到文件的最后修改时间。

大致的顺序

- Cache-Control —— 请求服务器之前
- Expires —— 请求服务器之前
- If-None-Match (Etag) —— 请求服务器
- If-Modified-Since (Last-Modified) —— 请求服务器
协商缓存需要配合强缓存使用，如果不启用强缓存的话，协商缓存根本没有意义

大部分web服务器都默认开启协商缓存，而且是同时启用【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】

### 怎么设置强缓存与协商缓存
1. 后端服务器设置
2. nginx配置
### 当发新包的时候，怎么避免加载老的缓存资源
使用协商缓存，每次请求index.html不拿浏览器缓存，直接请求服务器，这样就保证资源更新了，用户能马上访问到新资源

[参考资料](https://github.com/amandakelake/blog/issues/41)

## 事件捕获与冒泡的区别

### e.target和e.currentTarget之间的区别

## promise内部实现方式
 

## http 2.0

## http的属性以及https的区别

## 前端安全

## hybrid怎么跟APP通信

## js的设计模式

## CSR 和 SSR 的区别

## 前端性能优化

### 基于防抖和节流的性能优化

## 柯里化


