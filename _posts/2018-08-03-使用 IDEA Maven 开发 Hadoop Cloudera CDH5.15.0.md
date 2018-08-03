---
title: 使用 IDEA Maven 开发 Hadoop Cloudera CDH5.15.0
layout: post
tags: Hadoop
categories: ''
---
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