---
title: 算法
order: 7
---

## 实现检查二叉树中是否存在一条路径，使路径上节点和等于给出值
![图片tree](/assets/imgs/tree.png "tree")

```
const hasPathSum = (root, sum) => {
    if (root == null) {//递归终止条件
        return false;
    }
    if (root.left == null && root.right == null) {//遍历到叶子节点
        return sum - root.val == 0;                 //sum正好减少到了0 返回ture 否则返回false
    }
    //递归左右子树，有一个返回true就找到了一条这样的路径
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
}
```

## 实现翻转单项链表
```
var reverseList = function (head) {
    // 闭包
    if (head === undefined || head === null) return null
    var originalHead = head
    var reverseHead
    var reverse = function (head) {
        if (head.next === null) {
            reverseHead = head
            return head
        } else {
            var node = reverse(head.next)
            node.next = head
            if (originalHead === head) {
                head.next = null
                return reverseHead
            } else {
                return head
            }
        }
    }
    return reverse(head)
};
```

## 实现DOM2JSON
```
function dom2Json(domtree) {
  let obj = {}
  obj.name = domtree.tagName
  obj.children = []
  domtree.childNodes.forEach(
    child => obj.children.push(dom2Json(child))
    )
  return obj
}
```

## 快速排序
快速排序的3个基本步骤：
1. 从数组中选择一个元素作为基准点
1. 排序数组，所有比基准值小的元素摆放在左边，而大于基准值的摆放在右边。每次分割结束以后基准值会插入到中间去。
1. 最后利用递归，将摆放在左边的数组和右边的数组在进行一次上述的1和2操作。

```
var quickSort = function(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};
```

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
```
function fn(str) {
  var hash = {}
  for(let i = 0; i < str.length; i++) {
    if(hash[str[i]]) {
      hash[str[i]]++
    } else {
      hash[str[i]] = 1
    }
  }
  let keys = Object.keys(hash)
  let maxValue = 0, maxKey = ''
  for(let i = 0; i < keys.length; i++) {
    if(hash[keys[i]] > maxValue) {
      maxValue = hash[keys[i]]
      maxKey = keys[i]
    }
  }
  console.log(maxKey, maxValue)
}
fn('aaaaaaabbbc')
```

## css实现一个模态窗口，要从窗口下面向上弹的动画
```
<div class="dialog-root">
    <div class="dialog-wrapper">
        <div class="dialog-content">
            <p>This is a modal window.</p>
        </div>
    </div>
</div>
```
```
/*------弹窗布局样式----------*/
    .dialog-root{
        position: fixed;
        left: 50%;
        top: 100%;
    }
    /*弹窗容器*/
    .dialog-wrapper{
        background: #cd8194;
        width: 600px;
        height: 400px;
        overflow: hidden;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        animation: dialogSlipToUP 500ms ease 1 forwards;//结束时保留最后一帧的状态
    }
    /*弹窗内容*/
    .dialog-content{
        font-size: 1.1em;
        color:#fff;
    }
    /*透明度从0.3渐变到1并且元素从浏览器底部出现。*/
    @keyframes dialogSlipToUP {
        0%{
            opacity: 0.3;
        }
        100%{
            transform: translate(-50%,-100%);
            opacity:1;
        }
    }
```

## tcp在哪一层？让你实现一个基于tcp协议之上的协议，你怎么实现
TCP协议在传输层，IP在网络层，http在应用层

### 创建TCP服务器端
利用net.createServer(listener)创建一个TCP服务器
```
const net = require("net");
// 通过net.createServer(listeber)即可创建一个TCP服务器
const server = net.createServer(function (socket) {
  // 新的连接
  socket.on("data", function (data) {
    socket.write("你好");
  });
  socket.on("end", function () {
    console.log("连接断开");
  });
  socket.write("学习TCP");
});
// listener是连接事件connection的侦听器
server.listen(8124, function () {
  console.log("server bound");
```

### 创建客户端测试
通过net模块自行构造客户端进行会话，测试上面构建的TCP服务代码如下：
```
const net = require("net");
const client = net.connect({ port: 8124 }, function () {
  //'connect' listener
  console.log("client connected");
  client.write("world!\r\n");
});
client.on("data", function (data) {
  console.log(data.toString());
  client.end();
});
client.on("end", function () {
  console.log("client disconnected");
```
