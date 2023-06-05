---
title: js
order: 3
---
## JavaScript和ECMAScript的关系
JavaScript是脚本语言，ECMAScript是规范。JavaScript是基于ECMAScript规范的脚本语言。

JavaScript只是ECMAScript的其中一种实现，除此之外还有其他的实现。

## 数据类型
### JS的数据类型
最新的 ECMAScript 标准定义了 8 种数据类型：

七种基本数据类型：

String、Number、Boolean、Undefined、Null、Symbol、Bigint

- 字符串（String），字符串是一串表示文本值的字符序列，例如："Howdy" 。
- 数字（Number），整数或浮点数，例如： 42 或者 3.14159。
- 布尔值（Boolean），有 2 个值分别是：true 和 false.
- undefined，和 null 一样是一个特殊的关键字，undefined 表示变量未赋值时的属性。
- null，一个表明 null 值的特殊关键字。JavaScript 是大小写敏感的，因此 null 与 Null、NULL或变体完全不同。
- 代表（Symbol）( 在 ECMAScript 6 中新添加的类型).。一种实例是唯一且不可改变的数据类型。
- 任意精度的整数 (BigInt) ，可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。

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

## 为什么 0.1 + 0.2 不等于 0.3 ？
由于计算机的资源是有限的，所以是没办法用二进制精确的表示 0.1，只能用「近似值」来表示，就是在有限的精度情况下，最大化接近 0.1 的二进制数，于是就会造成精度缺失的情况。

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
3. 可能获取到意外的值(captured value)(循环导致内存泄漏时，就是意外的值)

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
- 此后，被加上标记的变量被视为准备删除的变量；
- 最后，垃圾收集器完成内存清除，销毁那些带标记的值并回收其占用的内存空间。

垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象。

缺点: 那些无法从根对象查询到的对象都将被清除

(尽管这是一个限制，但实践中我们很少会碰到类似的情况，所以开发者不太会去关心垃圾回收机制。)

### 垃圾回收的性能问题
垃圾收集器是周期运行的，确定 垃圾收集的时间间隔是个重要的问题。

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

### V8引擎的JIT是什么？有什么作用？基本运作过程是怎样的？
要深入理解 V8 的工作原理，你需要搞清楚一些概念和原理，比如接下来我们要详细讲解的编译器（Compiler）、解释器（Interpreter）、抽象语法树（AST）、字节码（Bytecode）、即时编译器（JIT）等概念

JIT，全称是 Just In Time，即时编译

编译可以选择放在两个时机执行：
- 代码构建时，被称为AOT（Ahead Of Time，提前编译或预编译），宿主环境获得的是编译后的代码
- 代码在宿主环境执行时，被称为JIT（Just In Time，即时编译），代码在宿主环境编译并执行

---

**现在的v8引擎是解释器和编译器配合使用的，这种技术称为即时编译（JIT）**

- 编译器和解释器 
之所以存在编译器和解释器，是因为机器不能直接理解我们所写的代码，所以在执行程序之前，需要将我们所写的代码“翻译”成机器能读懂的机器语言。按语言的执行流程，可以把语言划分为编译型语言和解释型语言。

1. 在编译型语言的编译过程中，编译器首先会依次对源代码进行词法分析、语法分析，生成抽象语法树（AST），然后是优化代码，最后再生成处理器能够理解的机器码。
如果编译成功，将会生成一个可执行的文件。但如果编译过程发生了语法或者其他的错误，那么编译器就会抛出异常，最后的二进制文件也不会生成成功。

2. 在解释型语言的解释过程中，同样解释器也会对源代码进行词法分析、语法分析，并生成抽象语法树（AST），不过它会再基于抽象语法树生成字节码，最后再根据字节码来执行程序、输出结果。

## 关于javascript中的toString()和valueOf()

### js中toString方法重写
```
function Person(name , age , gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
}

//当我们直接在页面中打印一个对象时，事件上是输出的对象的toString()方法的返回值
//如果我们希望在输出对象时不输出[object Object]，可以为对象添加一个toString()方法

//修改Person原型的toString
Person.prototype.toString = function(){
    return "Person[name="+this.name+",age="+this.age+",gender="+this.gender+"]";
};


//创建一个Person实例
var per = new Person("孙悟空",18,"男");
var per2 = new Person("猪八戒",28,"男");

console.log(per2.toString());
console.log(per.toString());
```

### toString()和valueOf()
toString() 和 valueOf() 是对象的两个方法，你在浏览器后台输入Object.prototype就可以看到了它们是其中的两个。

先说一下两个东西的用途：(（undefined  和 null  的值就不举例了，因为它们都没有这两个方法，所以肯定会报错的）)

toString( ):返回对象的字符串表示。

valueOf( ):返回对象的字符串、数值或布尔值表示。

```
//先看看toString()方法的结果
var a = 3;
var b = '3';
var c = true;
var d = {test:'123',example:123}
var e = function(){console.log('example');}
var f = ['test','example'];

//先看看toString()方法的结果
a.toString();// "3"
b.toString();// "3"
c.toString();// "true"
d.toString();// "[object Object]"
e.toString();// "function (){console.log('example');}"
f.toString();// "test,example"

//再看看valueOf()方法的结果
a.valueOf();// 3
b.valueOf();// "3"
c.valueOf();// true
d.valueOf();// {test:'123',example:123}
e.valueOf();// function(){console.log('example');}
f.valueOf();// ['test','example']
```

### 操作符运算
```
//例子一
var example = {test:'123'};
console.log(+example);// NaN

//例子二 同时改写 toString 和 valueOf 方法
var example = {
    toString:function(){
        return '23';
    },
    valueOf:function(){
        return '32';
    }
};
console.log(+example);// 32

//例子三 只改写 toString 方法
var example = {
    toString:function(){
        return '23';
    }
};
console.log(+example);// 23
```

### 弹窗
```
//例子一
var example = {test:'123'};
alert(example);// "[object Object]"

//例子二 同时改写 toString 和 valueOf 方法
var example = {
    toString:function(){
        return '23';
    },
    valueOf:function(){
        return '32';
    }
};
alert(example);// "23"

//例子三 只改写 valueOf 方法
var example = {
    valueOf:function(){
        return '32';
    }
};
alert(example);// "[object Object]"
```

### 总结
一般用操作符单独对对象进行转换的时候，如果对象存在valueOf或toString改写的话，就先调用改写的方法，valueOf优先级更高，如果没有被改写，则直接调用对象原型的valueOf方法。

如果是弹窗的话，直接调用toString方法。至于其他情况，待续……

## new,call,apply,bind方法的实现原理
javascript中new,call,apply,bind等方法是我们经常要使用到，在伪数组转数组、函数传参、继承等场景中，都离不开他们。
### new
我们用new实例化一个构造函数，生成一个实例对象，而new到底做了什么呢，主要分为以下几步：

1. 创建一个空的简单 JavaScript 对象（即 {}）；
1. 然后将空对象的 ```__proto__``` 指向构造函数的原型，使得通过构造函数创建的所有对象可以共享相同的原型。
1. 改变 this 的指向，指向空对象
1. 如果该函数没有返回对象，则返回 this。

思路: <br>
- 那我们就可以用代码来实现了，其实只需要完成这几个功能。
    1. 让实例可以访问到私有属性；
    1. 让实例可以访问构造函数原型所在的原型链上的属性；
    1. 构造函数返回的最后结果是引用数据类型;

```
    function myNew(Fn, ...args) {
      // 创建一个新的空对象
      let obj = {};
      // 将这个空对象的__proto__指向构造函数的原型
      // obj.__proto__ = Fn.prototype;
      Object.setPrototypeOf(obj, Fn.prototype);
      // 将this指向空对象
      let res = Fn.apply(obj, args);
      // 对构造函数返回值做判断，然后返回对应的值
      return res instanceof Object ? res : obj;
    }
```
验证：
```
// 构造函数Person
function Person(name) {
  this.name = name;
}
let per = myNew(Person, '你好，new');
console.log(per); // {name: "你好，new"}
console.log(per.constructor === Person); // true
console.log(per.__proto__ === Person.prototype); // true
```
一般情况下构造函数是没有返回值的，但是作为函数，是可以有返回值的。

```
function Person(name) {
  this.name = name;
  return {
    age: 22
  }
}
let per = myNew(Person, '你好，new');
// 当构造函数返回对象类型的数据时，会直接返回这个数据， new 操作符无效
console.log(per); // {age: 22}
```

```
function Person(name) {
  this.name = name;
  return '十二点的程序员'
}
let per = myNew(Person, '你好，new');
// 而当构造函数返回基础类型的数据，则会被忽略
console.log(per); // {name: "你好，new"}
```

### call，apply，bind调用
```
func.call(thisArg, param1, param2, ...)
func.apply(thisArg, [param1,param2, ...])
func.bind(thisArg, param1,param2, ...)
```
其中func 是要调用的函数，thisArg 一般是this所指的对象，后面的为参数。

这三者的公共点就是，都是改变函数func的this指向。其中 call和apply 的区别在于传参的写法不同：

call 是一个一个参数传，而apply是以数组的形式传入。

然后bind 与这两者的区别在于：bind函数不会马上执行，而（call 与 apply）是在改变了函数的this指向后立马执行。

### call
call方法的实现主要有以下三步，比如 fn.call(obj, a, b) ：

1. 把调用函数fn的上下文指向obj
2. 形参a,b等是以逗号分隔传进去
3. 执行函数fn，并返回结果
```
    Function.prototype.call = function (context, ...args) {
      var context = context || window;
      context.fn = this;
      var res = eval('context.fn(...args)');
      delete context.fn
      return res;
    }
```

### apply
apply方法和call方法大同小异，唯一差别就是，apply传入的参数是数组格式。
```
    // apply 原理
    Function.prototype.apply = function (context, args) {
      let context = context || window;
      context.fn = this;
      let res = eval('context.fn(...args)');
      delete context.fn
      return res;
    }
```

### bind
bind方法和call、apply方法的差别是，他们都改变了上下文，但是bind没有立即执行函数。
```
   Function.prototype.myBind = function (context) {
     if (typeof this !== 'function') {
       throw TypeError('error');
     }
     // 缓存this
     const self = this;
     const args = [...arguments].slice(1);
     //返回一个函数
     return function fn() {
       // 判断调用方式
       if (this instanceof fn) {
         return new self(...args, ...arguments);
       }
       return self.apply(context, args.concat(...arguments));
     };
   };
```

### bind的优先级比较高
当我们使用bind方法创建一个新函数，这个新函数再使用call或者apply来更改this绑定时，还是以bind绑定的this为准。

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
- 想要弄清楚原型和原型链，这几个属性必须要搞清楚，```__proto__```、prototype、 constructor。
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

**1. ```__proto__```、 constructor属性是对象所独有的；**(**constructor属性是让"儿子"，"儿孙"们知道是谁创造了自己**)

**2. prototype属性是函数独有的(上面说过js中函数也是对象的一种，那么函数同样也有属性```__proto__```、 constructor)**

另:

![图片prototype](/assets/imgs/prototype.png "prototype")

### 原型详解
[Object详解](https://wangdoc.com/javascript/stdlib/object)

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

```Person.prototype.__proto__``` 指向内置对象，因为 Person.prototype 是个对象，默认是由 Object函数作为类创建的，而 Object.prototype 为内置对象

```Person.__proto__``` 指向内置匿名函数 anonymous，因为 Person 是个函数对象，默认由 Function 作为类创建

Function.prototype 和 Function.__proto__同时指向内置匿名函数 anonymous，这样原型链的终点就是 null

**```__proto_`_``作为不同对象之间的桥梁，用来指向创建它的构造函数的原型对象的**

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

另外：

```
Function.prototype.__proto__ === Object.prototype
// true

Person.prototype.__proto__ === Function.prototype.__proto__
// true
```

总结:

- 一切对象都是继承自Object对象，Object 对象直接继承根源对象null

- 一切的函数对象（包括 Object 对象），都是继承自 Function 对象

- Object 对象直接继承自 Function 对象

- Function对象的__proto__会指向自己的原型对象，最终还是继承自Object对象

即:

**```person.__proto__=== Person.prototype```**

**```Person.prototype.__proto__=== Object.prototype```**

**```Object.prototype.__proto__=== null```**

### 原型链
当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念

### hasOwnProperty
hasOwnProperty是"Object.prototype"的一个方法，该方法能判断一个对象是否包含自定义属性而不是原型链上的属性，因为"hasOwnProperty" 是 JavaScript 中唯一一个处理属性但是不查找原型链的函数。

### Object.keys() 和 Object.getOwnPropertyNames() 的区别
**可枚举性（enumerable）用来控制所描述的属性**

Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。

Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

共同点：都是返回自身的属性，不会返回原型链上的。

区别： Object.keys()返回可枚举的，Object.getOwnPropertyNames()返回所有的。

[什么是可枚举属性](jianshu.com/p/81deaf352f5c)

## js继承
对于使用过基于类的语言 (如 Java 或 C++) 的开发者们来说，JavaScript 实在是有些令人困惑 —— JavaScript 是动态的，本身不提供一个 class 的实现。即便是在 ES2015/ES6 中引入了 class 关键字，但那也只是语法糖，JavaScript 仍然是基于原型的。

当谈到继承时，JavaScript 只有一种结构：对象。每个实例对象（object）都有一个私有属性（称之为 __proto__）指向它的构造函数的原型对象（prototype）。该原型对象也有一个自己的原型对象（__proto__），层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

### 原型链继承
```
function Parent () {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()) // kevin
```

1.引用类型的属性被所有实例共享，举个例子：
```
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy", "yayu"]
```

### 原型式继承(实例继承)
```
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```
缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

```
var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.friends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]
```
注意：修改person1.name的值，person2.name的值并未发生改变，并不是因为person1和person2有独立的 name 值，而是因为person1.name = 'person1'，给person1添加了 name 值，并非修改了原型上的 name 值。

### 借用构造函数继承
```
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
```
优点：

1.避免了引用类型的属性被所有实例共享

2.可以在 Child 中向 Parent 传参

举个例子：
```
function Parent (name) {
    this.name = name;
}

function Child (name) {
    Parent.call(this, name);
}

var child1 = new Child('kevin');

console.log(child1.name); // kevin

var child2 = new Child('daisy');

console.log(child2.name); // daisy
```

缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法。

### 寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
```
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```
缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

### 寄生组合式继承
为了方便大家阅读，在这里重复一下组合继承的代码：
```
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent();

var child1 = new Child('kevin', '18');

console.log(child1)
```
...

这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

### ES6中class的继承
extends关键字主要用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类。其中constructor表示构造函数，一个类中只能有一个构造函数，有多个会报出SyntaxError错误,如果没有显式指定构造方法，则会添加默认的 constructor方法，使用例子如下。
```
class Rectangle {
    // constructor
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    
    // Getter
    get area() {
        return this.calcArea()
    }
    
    // Method
    calcArea() {
        return this.height * this.width;
    }
}

const rectangle = new Rectangle(10, 20);
console.log(rectangle.area);
// 输出 200

-----------------------------------------------------------------
// 继承
class Square extends Rectangle {

  constructor(length) {
    super(length, length);
    
    // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }
}

const square = new Square(10);
console.log(square.area);
// 输出 100
```

## eval()
eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。

eval() 是全局对象的一个函数属性。

```
console.log(eval('2 + 2'));
// expected output: 4

console.log(eval(new String('2 + 2')));
// expected output: 2 + 2

console.log(eval('2 + 2') === eval('4'));
// expected output: true

console.log(eval('2 + 2') === eval(new String('2 + 2')));
// expected output: false
```

## EventLoop
每个宏任务之后，引擎会立即执行微任务队列中的所有任务，然后再执行其他的宏任务，或渲染，或进行其他任何操作。

主线程只会做一件事情，就是从消息队列里面取消息、执行消息，再取消息、再执行。当消息队列为空时，就会等待直到消息队列变成非空。而且主线程只有在将当前的消息执行完成后，才会去取下一个消息。这种机制就叫做事件循环机制，取一个消息并执行的过程叫做一次循环。

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

### 怎么理解 js 语言的单线程特性？
JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。

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
事件冒泡和事件捕获好像存在一个就足够了，为什么会有这两套概念？答：因为事件冒泡是微软公司提出来了。而事件捕获是网景公司提出来了，删掉那个都不好，干脆就两个都留下来了。
### 事件流
dom的事件处理流程分为三个阶段，事件捕获，目标事件，事件冒泡。

先进行事件捕获 => 再到目标本身 => 最后再进行事件冒泡

### 事件冒泡
事件会从最内层的元素开始发生，逐级传播给祖先元素，直到document为止，有的浏览器可能到window。

p -> div -> body -> html -> document

### 事件捕获
与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。

document -> html -> body -> div -> p

### 怎么控制事件在冒泡阶段执行还是在捕获阶段执行。
addEventListener函数用于事件绑定，他有三个参数↓

- eventType 事件类型（"click之类的"）
- function 触发事件后所需要执行的函数
- bool   入参true/false,决定事件在冒泡阶段执行还是捕获阶段执行。true表示事件在捕获阶段执行，false表示事件在冒泡阶段执行。默认值是false。

### 事件委托
事件委托，也叫事件代理，主要是利用事件冒泡原理，从目标节点开始，逐渐向上传播事件，最终将事件委托给它的父级节点。

根据上面的描述，我们知道事件委托可以使代码逻辑更加简洁高效，并且减少操作dom的次数，把类似元素的事件绑定委托给其父元素进行统一的监听处理，方便动态的添加和修改元素。

### event.stopPropagation和event.preventDefault区别
event.preventDefault() 它停止浏览器的默认行为。

event.stopPropagation() 它防止事件传播（或“冒泡”）DOM。

**何时使用它们？**

防止默认浏览器的行为，使用preventDefault

阻止事件冒泡，stopPropagation

### stopPropagation包括捕获吗
stopPropagation 的功能是阻止事件传播，包括阻止捕获或冒泡，之前错误的认为只是阻止事件冒泡的。

### e.target和e.currentTarget之间的区别
e.target 是事件触发的真实元素

e.currentTarget 指向绑定监听事件的元素

## promise内部实现方式
### Promise 是什么
Promise是一个对象，从它可以获取一步操作的消息。Promise对象的状态不受外部影响。

### Promise 状态
Promise 必须为以下三种状态之一：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。一旦Promise被resolve或reject，不能再迁移至其他任何状态（即状态 immutable）。

### 静态方法
- Promise.all(iterable)
这个方法返回一个新的 promise 对象，等到所有的 promise 对象都成功或有任意一个 promise 失败。
  
如果所有的 promise 都成功了，它会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。
  
一旦有任意一个 iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。

- Promise.allSettled(iterable)
等到所有 promise 都已敲定（每个 promise 都已兑现或已拒绝）。

返回一个 promise，该 promise 在所有 promise 都敲定后完成，并兑现一个对象数组，其中的对象对应每个 promise 的结果。

- Promise.any(iterable)
该方法用于获取首个兑现的 promise 的值。只要有一个 promise 兑现了，那么此方法就会提前结束，而不会继续等待其他的 promise 全部敲定。

- Promise.race(iterable)
一个待定的 Promise 只要给定的迭代中的一个 promise 解决或拒绝，就采用第一个 promise 的值作为它的值。
[参考资料](https://segmentfault.com/a/1190000040022944)

### promise如何取消
通过reject拒绝

## await内部的原理？
### 基本原理
async / await 本质上就是 generator 的语法糖

内置执行器，无需手动执行 next() 方法

### generator
**基本用法**

generator函数跟普通函数在写法上的区别就是，多了一个星号*，并且只有在generator函数中才能使用yield，什么是yield呢，他相当于generator函数执行的中途暂停点，比如下方有3个暂停点。而怎么才能暂停后继续走呢？那就得使用到next方法，next方法执行后会返回一个对象，对象中有value 和 done两个属性

- value：暂停点后面接的值，也就是yield后面接的值
- done：是否generator函数已走完，没走完为false，走完为true

```
function* gen() {
  yield 1
  yield 2
  yield 3
}
const g = gen()
console.log(g.next()) // { value: 1, done: false }
console.log(g.next()) // { value: 2, done: false }
console.log(g.next()) // { value: 3, done: false }
console.log(g.next()) // { value: undefined, done: true }
```

## JavaScript中substring()、substr()、slice()的区别
- substring(start,end)返回指定下标间的字符，下标必须为正整数
- substr(start,length)返回从指定下标开始的长度为length的字符，可以为负数
- slice(start,end)返回指定下标间的字符，可以为负数

注意点：
- 不写结束下标默认到末尾
- 如果start=end则返回空字符串
- 如果任一参数小于0，则被当做0
- 如果任一参数大于字符串的长度，则被当做字符串的长度
```
var stringValue = "hello world";

console.log(stringValue.slice(3));          //”lo world”
console.log(stringValue.substring(3));      //”lo world”
console.log(stringValue.substr(3));        //”lo world”

console.log(stringValue.slice(3,7));         //”lo w”
console.log(stringValue.substring(3,7));    //”lo w”
console.log(stringValue.substr(3,7));       //”lo worl”

console.log(stringValue.slice(-3));         //"rld"　从后往前数3个开始
console.log(stringValue.substring(-3));     //"hello world" 为负，默认从0开始
console.log(stringValue.substr(-3));        //"rld"

console.log(stringValue.slice(3,-4));       //”lo w”　下标从3开始到-4(从后往前数4个)
console.log(stringValue.substring(3,-4));   //”hel”　
console.log(stringValue.substr(3,-4));      //””　长度为负，默认不显示
```

## 为什么 setTimeout 可以解决栈溢出问题
要真正的从底层原理理解这个问题，我们需要了解三个概念：主线程、调用栈、消息队列。

- 主线程：
我们都知道 JavaScript 是基于单线程设计的。为了方便使用 JavaScript 来操纵 DOM，所以从一开始，JavaScript 就被设计成了运行在 UI 线程中，UI线程是指运行窗口的线程，即当前窗口的主线程。

- 调用栈：
调用栈是用来管理主线程上函数调用关系的数据结构，和基本栈结构一样，先进后出。

- 消息队列：
消息队列用于存放当前窗口中待执行的事件。当运行一个窗口时，需要处理不同的事件，我们为 UI 线程提供一个消息队列，并将这些待执行的事件添加到消息队列中。

执行 setTimeout，setTimeout 会将 foo 函数封装成一个新的宏任务，并将其添加到消息队列中，等待执行, 所以就解决了栈溢出问题。
