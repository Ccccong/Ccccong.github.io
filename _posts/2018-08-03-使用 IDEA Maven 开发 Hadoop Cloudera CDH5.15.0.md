---
title: 使用 IDEA Maven 开发 Hadoop Cloudera CDH5.15.0
layout: post
tags: Hadoop
categories: ''
---
## 背景
在工作之余学习完Flume,kafka联调后，我们需要对kafka消息进行处理，用的架构就是sparkStreaming了，搭建了三个节点的hadoop环境如下

![TIM截图20180803101116](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180803101116.png)

## 01参考文档

使用的文档为cloudera官网的 [release-notes文档](https://www.cloudera.com/documentation/enterprise/release-notes/topics/cdh_vd_cdh5_maven_repo.html)

## 02详细信息截图

![TIM截图20180803095301](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180803095301.png)  

## 03添加到`pom.xml`文件中

{% highlight xml %}

     	<!--添加cloudera的repository-->
        <repository>
            <id>cloudera</id>
            <url>https://repository.cloudera.com/artifactory/cloudera-repos/</url>
        </repository>

{% endhighlight xml %}