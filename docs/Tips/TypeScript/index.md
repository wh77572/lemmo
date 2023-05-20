---  
title: 怎么使用
order: 1
---

## 安装TypeScript
```
npm install -g typescript
> or
yarn global add typescript
```

安装完成后我们可以使用 tsc 命令来执行 TypeScript 的相关代码，以下是查看版本号：

```
$ tsc -v
```

**使用以下命令初始化一个 tsconfig.json 文件**
```
tsc --init
```

---

> 附：几种换源方式

- 修改成腾讯云镜像源:
```
npm config set registry http://mirrors.cloud.tencent.com/npm/
```

- 修改成淘宝镜像源:
```
npm config set registry https://registry.npmmirror.com
```

- 修改成华为云镜像源
```
npm config set registry https://mirrors.huaweicloud.com/repository/npm/
```

- 使用淘宝定制的cnpm安装
```
npm install -g cnpm --registry=https://registry.npmmirror.com
> then
cnpm install xxx
```
> check  验证命令  镜像是否配置成功

```
npm config get registry
```

- [临时]通过 npm 命令指定下载源
```
npm install 软件xxx --registry https://registry.npmmirror.com
```

- 再换回来
```
npm config set registry https://registry.npmjs.org/
```

- **http://npm.taobao.org 和 http://registry.npm.taobao.org 域名将于 2022 年 05 月 31 日零时起停止服务。**

---

## Hello Ts
遵循程序猿新学语言规范，先从```Hello  World```开始：

> 新建一个hello.ts
```
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

> 然后执行
```
tsc hello.ts
```

然后这时候会生成一个编译好的文件 hello.js：
```
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

### 总结
TypeScript 编译的时候即使报错了，还是会生成编译结果,我们仍然可以使用这个编译之后的文件。

> 如果要在报错的时候终止 js 文件的生成，可以在 tsconfig.json 中配置 noEmitOnError


附：常用配置项
```
{
  "compilerOptions": {
    // 指定输出的 JS 代码所使用的 ECMAScript 版本，可选值为：ES3、ES5、ES2015、ES2016、ES2017、ES2018 和 ESNEXT。请根据具体的兼容性要求选择。
    "target": "es5",
    // 指定输出的 JS 代码所使用的模块化方案，可选值为：none、commonjs、amd、system、umd、es2015 或 ESNext。
    "module": "commonjs",
    // 指定编译过程中要使用的库，视具体情况而定。
    "lib": [],
    // 是否编译 JS 文件。
    "allowJs": true,
    // 是否报告 JS 源码中的错误。
    "checkJs": true,
    // 启用 JSX 语法，可选值为 perserve、react-native、react。
    "jsx": "preserve",
    // 是否生成相关的 '.d.ts' 声明文件。
    "declaration": true,
    // 是否生成 sourceMap 文件
    "sourceMap": true,
    // 将输出的 JS 代码整合为单个文件
    // "outFile": "./",
    // 指定输出目录
    "outDir": "./",
    // 指定源码根目录
    "rootDir": "./",
    // 是否引入 tslib
    "importHelpers": true,
    // 当目标版本为 'ES5' 或 'ES3'，用以提供完整的解构、'for-of iterable' 支持
    "downlevelIteration": true,

    // 启用所有严格类型检查，区别于 JS 的 strict mode。
    "strict": true,
    // 使用 any 类型时必须明确声明
    // "noImplicitAny": true,
    // 严格检查 null 类型
    // "strictNullChecks": true,
    // 严格检查函数类型
    // "strictFunctionTypes": true,
    // 严格检查 bind、call、apply 类型
    // "strictBindCallApply": true,
    // 严格检查类属性初始化
    // "strictPropertyInitialization": true,
    // 当 this 具有隐含 any 类型时报错
    // "noImplicitThis": true,
    // 始终使用严格模式（指 JS 中的严格模式）
    // "alwaysStrict": true,

    /* 实验性选项 */
    // 对 ES7 中的修饰器 decorator 提供实验性支持
    "experimentalDecorators": true,
  }
}
```

## 怎么在老项目里面使用ts
下次再讲



