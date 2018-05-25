---
title: 如何在Linux中运行java程序
layout: post
tags: Java
---
本人得到个任务，找出所有作业中库名“写死”的作业名，在不太熟悉perl,shell的情况下，我做了简单的尝试，然后放弃了，该用java写程序，拿到生产机房获取数据，公司用java写程序的估计我还是第一个，大部分人是用shell和perl写脚本，但是熟悉面向对象的我来说，面向过程的语言使用起来太难受了。这里定个目标，学会python语言，适合写脚本和开发（数据分析，机器学习等等）；

## 1. 有java环境
自己看我另一篇博客
## 2. 有个java项目
 自己随便写个Hello world也行
 
## 3. javac编译
“-d”表示指定生成class文件的位置
 > javac ./src/getScriptNameNoParameter/Main.java -d ./bin/getScriptNameNoParameter

## java运行

> java -cp ./bin/getScriptNameWithNoParameter getScriptNameNoParameter getScriptNameNoParameter.Main

getScriptNameNoParameter.Main中getScriptNameNoParameter是包名，Main是类名