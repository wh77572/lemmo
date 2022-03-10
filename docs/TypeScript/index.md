---
nav:
  title: TypeScript
  order: 4
  
title: 怎么使用
order: 1
---

## 安装TypeScript
```
npm install -g typescript
> or
yarn add typescript
```

附：使用国内镜像：
```
npm config set registry https://registry.npmmirror.com
```

安装完成后我们可以使用 tsc 命令来执行 TypeScript 的相关代码，以下是查看版本号：

```
$ tsc -v
```

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



