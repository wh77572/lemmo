---
order: 1
---

## 什么是TypeScript

> 定义：Typed JavaScript at Any Scale. 即添加了类型系统的 JavaScript，适用于任何规模的项目。

### 优点
> 增加代码的可读性和可维护性
- Ts是静态类型，用TypeScript编写的代码更容易把控、更易于调试。

- 类型系统是最好的文档注释

- 在编译阶段就发现错误，比运行时发现错误好

- 增加了编辑器和ide的功能，代码不全、接口提示、跳转到定义、重构

> 包容性
- .js文件可重命名为.ts文件

- 不显式的定义类型，也能自动作出类型推论

- 可定义一切类型

- 即使typescript编译报错，也可生成js文件

- 兼容第三方库，即使第三方库不是用ts写的，也可编写单独的类型文件供ts读取

### 缺点
- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念

- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本

- 集成到构建流程需要工作量

- 可能和一些库结合的不是很完美

---

### JavaScript 与 TypeScript 的区别

TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

<div style="display: flex">
  <img src="/ts-lemmo-1.png" width="130" style="margin-right: 30px">
  <img src="/ts-lemmo-2.png" width="130">
</div>  

---

## Ts语法
> TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。 TypeScript扩展了JavaScript的句法，所以任何现有的JavaScript程序可以不加改变的在TypeScript下工作。TypeScript是为大型应用之开发而设计，而编译时它产生 JavaScript 以确保兼容性。 TypeScript 支持为已存在的 JavaScript 库添加类型信息的头文件，扩展了它对于流行的库如 jQuery，MongoDB，Node.js 和 D3.js 的支持。

### 语言特性
> TypeScript 是一种给 JavaScript 添加特性的语言扩展。增加的功能包括：

- 类型批注和编译时类型检查
- 类型推断
- 类型擦除
- 接口
- 枚举
- Mixin
- 泛型编程
- 名字空间
- 元组
- Await

以下功能是从 ECMA 2015 反向移植而来：

- 类
- 模块
- lambda 函数的箭头语法
- 可选参数以及默认参数



- 类 Classes
- 接口 Interfaces
- 模块 Modules 
- 类型注解 Type annotations
- 编译时类型检查 Compile time type checking 
- Arrow 函数 (类似 C# 的 Lambda 表达式)

### 简单数据类型
- Number
```
TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。

let num: number = 123
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744
```

---

- String
```
let name: string = 'achang'
let name1: string = `Hello ${name}`
```

---

- Boolean
```
let isBoolean: boolean = false
```

---

- undefined 和 null
```
TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：
默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。

let u: undefined = undefined
let n: null = null
let num: number = null
```

---

- bigInt
> BigInt是ES6中新引入的数据类型，它是一种内置对象，它提供了一种方法来表示大于 2- 1 的整数，BigInt可以表示任意大的整数。
  
> 使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了JavaScript构造函数 Number 能够表示的安全整数范围。
  
```
const max = Number.MAX_SAFE_INTEGER;
const max1 = max + 1
const max2 = max + 2
max1 === max2     // true
```

可以看到，最终返回了true，这就是超过精读范围造成的问题，而BigInt正是解决这类问题而生的:
```
const max = BigInt(Number.MAX_SAFE_INTEGER);
const max1 = max + 1n
const max2 = max + 2n
max1 === max2    // false
```

这里需要用 BigInt(number) 把 Number 转化为 BigInt，同时如果类型是 BigInt ，那么数字后面需要加 n。

在TypeScript中，number 类型虽然和 BigInt 都表示数字，但是实际上两者类型是完全不同的:

```
declare let foo: number;
declare let bar: bigint;
foo = bar; // error: Type 'bigint' is not assignable to type 'number'.
bar = foo; // error: Type 'number' is not assignable to type 'bigint'.
```

---

- Symbol

> symbol我们平时用的比较少，所以可能了解也不是很多，这里就详细来说说symbol。

1. symbol 基本使用

symbol 是 ES6 新增的一种基本数据类型，它用来表示独一无二的值，可以通过 Symbol 构造函数生成。
```
const s = Symbol(); 
typeof s; // symbol
```

> 注意：Symbol 前面不能加 new关键字，直接调用即可创建一个独一无二的 symbol 类型的值。

可以在使用 Symbol 方法创建 symbol 类型值的时候传入一个参数，这个参数需要是一个字符串。如果传入的参数不是字符串，会先自动调用传入参数的 toString 方法转为字符串：
```
const s1 = Symbol("TypeScript"); 
const s2 = Symbol("Typescript"); 
console.log(s1 === s2); // false
```
上面代码的第三行可能会报一个错误：This condition will always return 'false' since the types 'unique symbol' and 'unique symbol' have no overlap. 这是因为编译器检测到这里的 s1 === s2 始终是false，所以编译器提醒这代码写的多余，建议进行优化。

上面使用Symbol创建了两个symbol对象，方法中都传入了相同的字符串，但是两个symbol值仍然是false，这就说明了 Symbol 方法会返回一个独一无二的值。Symbol 方法传入的这个字符串，就是方便我们区分 symbol 值的。可以调用 symbol 值的 toString 方法将它转为字符串：

```
const s1 = Symbol("Typescript"); 
console.log(s1.toString());  // 'Symbol(Typescript)'
console.log(Boolean(s));     // true 
console.log(!s);             // false
```

在TypeScript中使用symbol就是指定一个值的类型为symbol类型：
```
let a: symbol = Symbol()
```

TypeScript 中还有一个 unique symbol 类型，它是symbol的子类型，这种类型的值只能由Symbol()或Symbol.for()创建，或者通过指定类型来指定变量是这种类型。这种类型的值只能用于常量的定义和用于属性名。需要注意，定义unique symbol类型的值，必须用 const 而不能用let来声明。下面来看在TypeScript中使用Symbol值作为属性名的例子：
```
const key1: unique symbol = Symbol()
let key2: symbol = Symbol()
const obj = {
    [key1]: 'value1',
    [key2]: 'value2'
}
console.log(obj[key1]) // value1
console.log(obj[key2]) // error 类型“symbol”不能作为索引类型使用。
```

2.symbol 作为属性名

在ES6中，对象的属性是支持表达式的，可以使用于一个变量来作为属性名，这对于代码的简化有很多用处，表达式必须放在大括号内：
```
let prop = "name"; 
const obj = { 
  [prop]: "TypeScript" 
};
console.log(obj.name); // 'TypeScript'
```
symbol 也可以作为属性名，因为symbol的值是独一无二的，所以当它作为属性名时，不会与其他任何属性名重复。当需要访问这个属性时，只能使用这个symbol值来访问（必须使用方括号形式来访问）：
```
let name = Symbol(); 
let obj = { 
  [name]: "TypeScript" 
};
console.log(obj); // { Symbol(): 'TypeScript' }

console.log(obj[name]); // 'TypeScript' 
console.log(obj.name);  // undefined
```
在使用obj.name访问时，实际上是字符串name，这和访问普通字符串类型的属性名是一样的，要想访问属性名为symbol类型的属性时，必须使用方括号。方括号中的name才是我们定义的symbol类型的变量name。

3.symbol 属性名遍历
使用 Symbol 类型值作为属性名，这个属性是不会被 for…in遍历到的，也不会被 Object.keys() 、 Object.getOwnPropertyNames() 、 JSON.stringify() 等方法获取到：
```
const name = Symbol("name"); 
const obj = { 
  [name]: "TypeScript", 
  age: 18 
};
for (const key in obj) { 
  console.log(key); 
}  
// => 'age' 
console.log(Object.keys(obj));  // ['age'] 
console.log(Object.getOwnPropertyNames(obj));  // ['age'] 
console.log(JSON.stringify(obj)); // '{ "age": 18 }
```
虽然这些方法都不能访问到Symbol类型的属性名，但是Symbol类型的属性并不是私有属性，可以使用 Object.getOwnPropertySymbols 方法获取对象的所有symbol类型的属性名：
```
const name = Symbol("name"); 
const obj = { 
  [name]: "TypeScript", 
  age: 18 
};
const SymbolPropNames = Object.getOwnPropertySymbols(obj); 
console.log(SymbolPropNames); // [ Symbol(name) ] 
console.log(obj[SymbolPropNames[0]]); // 'TypeScript' 
```
除了这个方法，还可以使用ES6提供的 Reflect 对象的静态方法 Reflect.ownKeys ，它可以返回所有类型的属性名，Symbol 类型的也会返回：
```
const name = Symbol("name"); 
const obj = { 
  [name]: "TypeScript", 
  age: 18 
};
console.log(Reflect.ownKeys(obj)); // [ 'age', Symbol(name) ]
```

4.symbol 静态方法
Symbol 包含两个静态方法， for 和 keyFor 。

    1. Symbol.for()
 
用Symbol创建的symbol类型的值都是独一无二的。使用 Symbol.for 方法传入字符串，会先检查有没有使用该字符串调用 Symbol.for 方法创建的 symbol 值。如果有，返回该值；如果没有，则使用该字符串新创建一个。使用该方法创建 symbol 值后会在全局范围进行注册。
```
const iframe = document.createElement("iframe"); 
iframe.src = String(window.location); 
document.body.appendChild(iframe); 
iframe.contentWindow.Symbol.for("TypeScript") === Symbol.for("TypeScript"); // true // 注意：如果你在JavaScript环境中这段代码是没有问题的，但是如果在TypeScript开发环境中，可能会报错：类型“Window”上不存在属性“Symbol”。 // 因为这里编译器推断出iframe.contentWindow是Window类型，但是TypeScript的声明文件中，对Window的定义缺少Symbol这个字段，所以会报错，
```

上面代码中，创建了一个iframe节点并把它放在body中，通过这个 iframe 对象的 contentWindow 拿到这个 iframe 的 window 对象，在 iframe.contentWindow上添加一个值就相当于在当前页面定义一个全局变量一样。可以看到，在 iframe 中定义的键为 TypeScript 的 symbol 值在和在当前页面定义的键为'TypeScript'的symbol 值相等，说明它们是同一个值。

    2.Symbol.keyFor()
 
该方法传入一个 symbol 值，返回该值在全局注册的键名：
```
const sym = Symbol.for("TypeScript"); 
console.log(Symbol.keyFor(sym)); // 'TypeScript'
```

--- 

* ts写法
```
// 自定义Symbol
const key: symbol = Symbol();

// Well-Known Symbol
const symbolHasInstance: symbol = Symbol.hasInstance;

“unique symbol”类型的主要用途是用作接口、类等类型中的可计算属性名。因为如果使用可计算属性名在接口中添加了一个类型成员，那么必须保证该类型成员的名字是固定的，否则接口定义将失去意义。

下例中，允许将“unique symbol”类型的常量x作为接口的类型成员，而symbol类型的常量y不能作为接口的类型成员，因为symbol类型不止包含一个可能值：

const x: unique symbol = Symbol();
const y: symbol = Symbol();

interface Foo {
     [x]: string; // 正确
     [y]: string;
//  ~~~
//  错误：接口中的计算属性名称必须引用类型为字面量类型
//  或'unique symbol'的表达式
}
```

### 复杂数据类型
- Array
```
一维数组：
let arr: Array<number> = [1,3,4]
let arr2: number[] = [1,3,4] // 必须是number类型
let arr3: Array<number|string> = [1,2,3, '4'] // 可以是number 或 string 类型

二维数组：
let twoM : string[][]
let twoM : Array<Array<string>>

复杂数组：
let 变量名:<type>{} = {...}
let 变量名:Array<type> = [...]
```

---

- Object
```
首先，object类型不单单可以指定对象，还可以指定数组或函数：
const foo1: object = {};
const foo2: object = [];
const foo3: object = function(){};
如果只想指定为对象，如下，对象属性都要提前声明好类型：
const obj: {name: string,age: number} = {
  name: '北极光',
  age:18
}
```

---

- Function
> 函数声明式：指定函数传入参数类型，指定返回值类型，调用时传入参数个数与类型都必须相同：
>括号里指定每个参数类型，括号右边指定返回值的类型。

```
function fun (name:string,age:number):string{
  return 'sss'
}

fun('auroras',18);
```
> 如果传入参数不确定传不传，那么可以给参数加个‘？’表明它是可选的：
```
function fun (name:string,age?:number):string{
  return 'sss'
}

fun('auroras');
```
> 或者给参数添加默认值，那也会成为可选参数：
>
```
function fun (name:string,age:number=666):string{
  return 'sss'
}

fun('auroras');
```
> 如果参数个数不确定，可以用扩展运算符加解构赋值表示，当然要传入与指定类型一致的：
```
function fun (name:string,age:number=666,...res:number[]):string{
  return 'sss'
}

fun('auroras',1,2,3);
```

> 函数表达式：
```
const fun2:(name:string,age:number)=> string = (name:string,age:number) => {
  return 'sss'
}

fun2('auroras',11);
```

---

- void
```
某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
// void 表示没有任何返回值的类型
let noReturn = () => {}
function warnUser(): void {
  console.log("This is my warning message")
}

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：

let unusable: void = undefined
// void 0 --> undefined,
```

---

- any
```
任何类型，加 Any 就跟 JavaScript 效果一样。
有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量：
```

---

- never
```
never 永远不会有返回值的类型
never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

let err = () => {
  new Error()
}
```

---

- 元组 Tuple
```
就是要提前指定数组里每个元素的类型，严格一一对应：

// 不能添加元素
let tuple: [number, string] = [0, '1']
// 可以手动添加新元素，可以添加进去
tuple.push('1')
tuple[2] // 但是可添加不能访问

let x: [string, number]
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```

---

- 枚举 enum
```
// 枚举
enum Direction {
  Up,
  Down,
  Left,
  Right
}
// 会从0索引开始取值
console.log(Direction.Up) // 0
console.log(Direction[0]) // Up
```

---

- unknown

> unknown 是TypeScript在3.0版本新增的类型，主要用来描述类型并不确定的变量。它看起来和any很像，但是还是有区别的，unknown相对于any更安全。

对于any，来看一个例子：
```
let value: any
console.log(value.name)
console.log(value.toFixed())
console.log(value.length)
```
上面这些语句都不会报错，因为value是any类型，所以后面三个操作都有合法的情况，当value是一个对象时，访问name属性是没问题的；当value是数值类型的时候，调用它的toFixed方法没问题；当value是字符串或数组时获取它的length属性是没问题的。

当指定值为unknown类型的时候，如果没有缩小类型范围的话，是不能对它进行任何操作的。总之，unknown类型的值不能随便操作。那什么是类型范围缩小呢？下面来看一个例子：
```
function getValue(value: unknown): string {
  if (value instanceof Date) { 
    return value.toISOString();
  }
  return String(value);
}
```
这里由于把value的类型缩小为Date实例的范围内，所以进行了value.toISOString()，也就是使用ISO标准将 Date 对象转换为字符串。

使用以下方式也可以缩小类型范围：
```
let result: unknown;
if (typeof result === 'number') {
  result.toFixed();
}
```
关于 unknown 类型，在使用时需要注意以下几点：

   - 任何类型的值都可以赋值给 unknown 类型：

```
let value1: unknown;
value1 = "a";
value1 = 123;
```

   - unknown 不可以赋值给其它类型，只能赋值给 unknown 和 any 类型：

```
let value2: unknown;
let value3: string = value2; // error 不能将类型“unknown”分配给类型“string”
value1 = value2;
```

   - unknown 类型的值不能进行任何操作：

```
let value4: unknown;
value4 += 1; // error 对象的类型为 "unknown"
```

   - 只能对 unknown 进行等或不等操作，不能进行其它操作：

```
value1 === value2;
value1 !== value2;
value1 += value2;  // error
```

   - unknown 类型的值不能访问其属性、作为函数调用和作为类创建实例：

```
let value5: unknown;
value5.age;   // error
value5();     // error
new value5(); // error
```

在实际使用中，如果有类型无法确定的情况，要尽量避免使用 any，因为 any 会丢失类型信息，一旦一个类型被指定为 any，那么在它上面进行任何操作都是合法的，所以会有意想不到的情况发生。因此如果遇到无法确定类型的情况，要先考虑使用 unknown。

### 高级类型
> 当应用越来越复杂，我们很容易把一些变量设置为 any 类型，TypeScript 写着写着也就成了 AnyScript。为了让大家能更加深入的了解 TypeScript 的类型系统，本文将重点介绍其高级类型，帮助大家摆脱 AnyScript

    了解什么是泛型
    
    
#### 交叉类型（&）

#### 联合类型（|）

#### 别名类型（type）

#### 索引类型（keyof）

#### 约束类型（extends）

#### 映射类型（in）

#### 条件类型（U ? X : Y）

#### 映射类型（in）
