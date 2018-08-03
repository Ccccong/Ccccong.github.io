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

## 02repository官网信息

![TIM截图20180803095301](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180803095301.png)  

## 03添加到`pom.xml`文件中

{% highlight xml %}

     	<!--添加cloudera的repository-->
        <repository>
            <id>cloudera</id>
            <url>https://repository.cloudera.com/artifactory/cloudera-repos/</url>
        </repository>

{% endhighlight xml %}

## 04配置hadoop manven依赖

还是在这份[文档](https://www.cloudera.com/documentation/enterprise/release-notes/topics/cdh_vd_cdh5_maven_repo_515x.html)中有写  

![TIM截图20180803101503](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180803101503.png)  

{% highlight xml %}

    	<dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>${hadoop.version}</version>
        </dependency>

{%  endhighlight xml %}

其中hadoop.version为`<hadoop.version>2.6.0-mr1-cdh5.15.0</hadoop.version>`

## 05配置hbase依赖
同理配置hbase依赖，用于存储sparkStreaming的数据
{% highlight xml %}

      <!--hbase 依赖-->
        <dependency>
            <groupId>org.apache.hbase</groupId>
            <artifactId>hbase-client</artifactId>
            <version>${hbase.version}</version>
        </dependency>

{% endhighlight xml %}

其中hbase.version为`<hadoop.version>2.6.0-mr1-cdh5.15.0</hadoop.version>`

## 06配置sparkStreaming依赖

参考[spark官网](http://spark.apache.org/docs/latest/streaming-programming-guide.html)


![TIM截图20180803125541](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180803125541.png)  

{% highlight xml %}

        <!--SparkStreaming依赖-->
        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-streaming_2.11</artifactId>
            <version>${spark.version}</version>
        </dependency>
        
{% endhighlight xml %}

其中spark.version为` <spark.version>2.3.0</spark.version>`

#### 自此几个顶级的依赖就添加完成了，以后需要什么依赖我们再添加到pom.xml文件就行了