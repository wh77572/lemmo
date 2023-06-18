---
nav:
  title: GO
  order: 6
title: 快速上手
order: 1
---

## 怎么搭建一个go项目
零基础通过开发Web服务学习Go语言

除却脚手架之外怎么搭建一个最简单的go框架，以便于了解基础，后面用脚手架一键生成。

## 配置环境
## 下载 [官网地址](golang.org/dl/)

### Mac
#### bash
打开 .bash_profile，我们可以在终端输入open ~/.bash_profile 或者 vim ~/.bash_profile 对该文件进行编辑

1. 添加配置，在配置文件末尾添加

```
export GOPATH=$HOME/go
export GOBIN=$GOPATH/bin
export PATH=PATH:PATH:GOBIN
```

2. source ~/.bash_profile 重载配置
3. 使用go env查看是否修改

#### zsh
mac的默认shell是zsh，所以修改bash的配置文件还是不够的，这时候我们就要根据上面的操作打开zsh的配置文件再来一次

### Windows
#### 系统变量

安装完成后，在系统变量的Path一栏，会自动配置Go语言的GOROOT变量，值为C:\Go\bin。一般情况下，系统变量不需要修改。

#### 用户变量

在用户变量一栏，会自动配置一个GOPATH变量，默认值为%USERPROFILE%\go，而且在用户变量的Path里会自动配置%USERPROFILE%\bin。这个GOPATH就是我们的工作目录，如果你不希望使用默认路径，可以将其进行修改，例如：

1. 创建自己想要的目录，并在此目录下，创建三个子文件夹，分别为bin、pkg、src
1. 编辑GOPATH，将%USERPROFILE%\go值改为自定义的目录
1. 编辑用户变量的Path,将%USERPROFILE%\bin修改为%GOPATH%\bin。

## 配置Go镜像
```
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

## 启用go mod

### 什么是go.mod?
Go.mod是Golang1.11版本新引入的官方包管理工具用于解决之前没有地方记录依赖包具体版本的问题，方便依赖包的管理。

Go.mod其实就是一个Modules，关于Modules的官方定义为：

Modules是相关Go包的集合，是源代码交换和版本控制的单元。go命令直接支持使用Modules，包括记录和解析对其他模块的依赖性。Modules替换旧的基于GOPATH的方法，来指定使用哪些源文件。

Modules和传统的GOPATH不同，不需要包含例如src，bin这样的子目录，一个源代码目录甚至是空目录都可以作为Modules，只要其中包含有go.mod文件。

### 如何在项目中使用 go.mod ?
1. 新建项目，在GOPATH/src 目录之外

go.mod文件一旦创建后，它的内容将会被go toolchain全面掌控。go toolchain会在各类命令执行时，比如go get、go build、go mod等修改和维护go.mod文件。

go.mod 文件内提供了module, require、replace和exclude四个关键字

- module语句指定包的名字（路径）
- require语句指定的依赖项模块
- replace语句可以替换依赖项模块
- exclude语句可以忽略依赖项模块

2.在当前目录下，命令行运行 go mod init + 模块名称 来初始化模块

初始化之后，会在当前目录下生成一个go.mod文件，这是一个go用来管理包的关键文件

**注1:** 为了确保一致性构建，Go引入了go.mod文件来标记每个依赖包的版本，在构建过程中go命令会下载go.mod中的依赖包，下载的依赖包会缓存在本地，以便下次构建。 考虑到下载的依赖包有可能是被黑客恶意篡改的，以及缓存在本地的依赖包也有被篡改的可能，单单一个go.mod文件并不能保证一致性构建。

为了解决Go module的这一安全隐患，Go开发团队在引入go.mod的同时也引入了go.sum文件，用于记录每个依赖包的哈希值，在构建时，如果本地的依赖包hash值与go.sum文件中记录得不一致，则会拒绝构建。

**注2:** go.sum 不需要手工维护，所以可以不用太关注。

**注3:** 子目录里是不需要init的，所有的子目录里的依赖都会组织在根目录的go.mod文件里

**注4:** 使用Go的包管理方式，依赖的第三方包被下载到了$GOPATH/pkg/mod路径下。

**注5:** 版本是在go.mod中指定的。如果，在go.mod中没有指定，go命令会自动下载代码中的依赖的最新版本。如果，在go.mod用require语句指定包和版本 ，go命令会根据指定的路径和版本下载包，指定版本时可以用latest，这样它会自动下载指定包的最新版本；

**注6:** go mod init 模块名 生成的go.mod文件里的第一行会申明 module 模块名

作用：例如在项目下新建目录 utils，创建一个tools.go文件

在根目录下的hello.go文件就可以 import “hello/utils” 引用utils

```
package main
 
import (
	"hello/utils"
	"github.com/astaxie/beego"
)
 
func main() {
	utils.PrintText("Hi")
}
```

### go.mod 命令
1. go mod download 下载模块到本地缓存，缓存路径是 $GOPATH/pkg/mod/cache
1. go mod edit 是提供了命令版编辑 go.mod 的功能，例如 go mod edit -fmt go.mod 会格式化go.mod
1. go mod graph 把模块之间的依赖图显示出来
1. go mod init 初始化模块（例如把原本dep管理的依赖关系转换过来）
1. go mod tidy 增加缺失的包，移除没用的包
1. go mod vendor 把依赖拷贝到 vendor/ 目录下
1. go mod verify 确认依赖关系
1. go mod why 解释为什么需要包和模块

### go 相关命令
1. 指定module的根目录并生成go.mod文件

        go mod init example.com/hello
        
2. 下载并添加依赖到go.mod文件中

        go build, go test

3. 查看module下的所有依赖

        go list -m all

4. 更新稳定版依赖

        go get rsc.io/sampler
 
5. 清理无用的依赖
        
        go mod tidy

6. 将依赖复制到项目路径的vendor文件夹中

        go mod vendor

7. 忽略cache里的包，只使用vendor目录里的依赖进行编译

        go build -mod=vendor

8. 校验依赖并查看是否有修改

        go mod verify
        
## 新建项目目录及初始化
### 新建项目目录
首先，我们可以选择一个心仪的文件夹，在它下面新建一个项目目录，名字的话可以根据自己的喜好来选择，就如下图一样，我新建了一个名为 go_server的项目目录，此刻它的下面空空如也。

### 初始化项目
新建项目后我们要做的第一件事情就是初始化项目，新建go.mod 文件对项目中依赖进行管理，具体方法可以参考上面文档进行，我这里 执行了
```
go mod init myblog-server
```
生成了一个go.mod 文件

### 导入Gin框架
#### 什么是Gin
Gin 是一个用 Go (Golang) 编写的 HTTP web 框架。 它是一个类似于 martini 但拥有更好性能的 API 框架, 优于 httprouter，速度提高了近 40 倍。(以上为官网描述)
       
#### 使用前提
使用gin需要Go的版本号为1.6或更高 

#### 安装gin
```
go get -u github.com/gin-gonic/gin
```

#### 创建入口文件 main.go
在根目录下新建一个入口文件 main.go，并输入以下代码
```
package main

import (
  "fmt"
  "github.com/gin-gonic/gin"
)

func main() {
  S := gin.Default()
  S.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{"msg": "服务启动成功"})
  })
  err := S.Run(":8080")
  if err != nil {
    fmt.Println("服务器启动失败！")
  }
}
```

#### 在根目录下使用 go run main.go 启动服务
这时候我们在浏览器中访问localhost:8080 或者 127.0.0.1:8080 就可以看到服务启动成功了

## 怎么连接可视化工具Navicat(这里使用MySQL，主要为了事务)

### Go原生就支持连接数据库，所以在使用 `Golang` 开发时，当需要数据库交互时，即可使用`database/sql`包。
```
import (
    "database/sql"
)
```

### Go不提供具体的数据库驱动，所以使用`database/sql`包时必须注入（至少）一个数据库驱动。
```
import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)
```

### Go连接MYSQL数据库
1. 下载依赖
```
go get -u github.com/go-sql-driver/mysql
```

2. 使用MySQL驱动
```
func Open(driverName, dataSourceName string) (*DB, error)
```
Open打开一个dirverName指定的数据库，dataSourceName指定数据源，一般至少包括数据库文件名和其它连接必要的信息。

```
import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
   // DSN:Data Source Name
	dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}

	defer db.Close()  // 注意这行代码要写在上面err判断的下面
}
```

<font color=red>思考题</font>： 为什么上面代码中的`defer db.Close()`语句不应该写在`if err != nil`的前面呢？

3. 初始化连接

Open函数可能只是验证其参数格式是否正确，实际上并不创建与数据库的连接。如果要检查数据源的名称是否真实有效，应该调用Ping方法。

返回的DB对象可以安全地被多个goroutine并发使用，并且维护其自己的空闲连接池。因此，Open函数应该仅被调用一次，很少需要关闭这个DB对象。

接下来，我们定义一个全局变量db，用来保存数据库连接对象。将上面的示例代码拆分出一个独立的initDB函数，只需要在程序启动时调用一次该函数完成全局变量db的初始化，其他函数中就可以直接使用全局变量db了。

```
// 定义一个全局对象db
var db *sql.DB

// 定义一个初始化数据库的函数
func initDB() (err error) {
	// DSN:Data Source Name
	dsn := "user:password@tcp(127.0.0.1:3306)/sql_test?charset=utf8mb4&parseTime=True"
	// 不会校验账号密码是否正确
	// 注意！！！这里不要使用:=，我们是给全局变量赋值，然后在main函数中使用全局变量db
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		return err
	}
	// 尝试与数据库建立连接（校验dsn是否正确）
	err = db.Ping()
	if err != nil {
		return err
	}
	return nil
}

func main() {
	err := initDB() // 调用输出化数据库的函数
	if err != nil {
		fmt.Printf("init db failed,err:%v\n", err)
		return
	}
}
```
其中sql.DB是表示连接的数据库对象（结构体实例），它保存了连接数据库相关的所有信息。它内部维护着一个具有零到多个底层连接的连接池，它可以安全地被多个goroutine同时使用。

4. SetConnMaxLifetime (最大连接数), SetMaxIdleConns (最大闲置连接数)
```
func (db *DB) SetMaxIdleConns(n int)
```
`SetMaxIdleConns`设置连接池中的最大闲置连接数。 如果n大于最大开启连接数，则新的最大闲置连接数会减小到匹配最大开启连接数的限制。 如果n<=0，不会保留闲置连接。

```
//设置数据库最大连接数
db.SetConnMaxLifetime(10)

//设置上数据库最大闲置连接数
db.SetMaxIdleConns(5)
```

## CRUD

## 提供接口

## 跟前端联调
