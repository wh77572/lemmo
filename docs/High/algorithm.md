---
title: 算法
order: 7
---

## 实现 检查二叉树中是否存在一条路径，使路径上节点和等于给出值

## 实现翻转单项链表

## 实现DOM2JSON

## 快速排序

## 转化下划线命名到驼峰命名
```
// 下划线转换驼峰
function toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}

// 驼峰转换下划线
function toLine(name) {
  return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}

// 测试
var a = 'a_b2_345_c2345';
console.log(toHump(a));

var b = 'aBdaNf';
console.log(toLine(b));
```

## canvas写个在页面上可以拖拽的球
是不是有点抽象，那，可以想象一下百度/高德地图上的效果，绘制了一些地形和路标：
- 拖动：可以查看相邻位置和更远位置的地形；
- 缩放：可以更清晰的查看当前位置。

关键点分析：
- 利用 canvas.getContext(“2d”)获取2D模型上下文ctx；
- 利用ctx.arc()方法绘制圆形；
- onmousedown，onmousemove, onmouseout分别鼠标的按下事件，移动事件，移开事件。分别捕获按下事件和移动事件产生的x，y坐标（dx, dy // mx, my ），计算偏移量mx - dx , my - dy。
- 鼠标移开事件时，重置鼠标事件。
- 每次绘制之前，都要清空画布区域ctx.clearRect()

## 给定一个字符串如下，请统计字符串中出现最多的字母和次数
