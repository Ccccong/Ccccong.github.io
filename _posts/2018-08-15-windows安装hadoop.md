---
title: windows安装hadoop
layout: post
---
## 00.背景
在学习sparkStreaming时遇见报错，不能远程连接服务器中的CDH环境，只能本地开发环境搭建个hadoop试试运气了

## 01.环境

JDK1.8  
    
[hadoop-2.6.5](https://www.apache.org/dist/hadoop/common/hadoop-2.6.5/hadoop-2.6.5.tar.gz)    
 
## 02.配置环境变量

把下载后的hadoop-2.6.g解压到你想安装的目录，配置环境变量

打开win的环境变量  

![TIM截图20180815112337](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180815112337.png)


![TIM截图20180815112450](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180815112450.png)


![TIM截图20180815112558](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180815112558.png)  

在命令提示符中输入hadoop或者hdfs等等命令验证配置是否成功，图中JAVA_HOME没有找到报错，我们稍后解决

![TIM截图20180815112703](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180815112703.png)