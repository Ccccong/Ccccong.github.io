---
title: SparkStreaming学习
layout: post
categories: ''
tags: ''
---
## 01概述
我们继续看官网[spark.apache.org](http://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)，在官网上详细介绍了spark以及快速入门，版本修复，Bug存在等等

> 机器学习  


>图形处理

>spark sql交互查询

>spark Streaming 流处理 

![spark-stack](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/spark-stack.png)  
<!--more-->
SparkStreaming是核心Spark API的扩展,它支持可伸缩、高吞吐量、容错性处理实时数据流。数据可以从Kafka、Flume、Kinesis或TCP socket等许多来源中获取,可以使用像map、reduce、join和window等高级功能来处理复杂的算法来处理数据。最后,处理数据可以被推送到文件系统、数据库和live仪表板。事实上,您可以在数据流上应用Spark的机器学习和图形处理算法。 

![streaming-arch](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/streaming-arch.png)  

内部工作原理如下，Spark流接收实时输入数据流，并将数据划分为批，然后由Spark引擎处理这些批，以批量生成最终的结果流。  
 

![streaming-flow](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/streaming-flow.png)  

Spark流提供了一个高级抽象，称为离散流或DStream，它表示连续的数据流。DStreams可以从来自Kafka、Flume和Kinesis等源的输入数据流创建，也可以通过对其他DStreams应用高级操作创建。在内部，DStream被表示为一个RDDs序列。  



# 02应用场景
1. 交易过程中实时反欺诈检查
2. 电子设备实时反馈信息
3. 电商实时推荐营销
4. 实时监控安装
5. 日志收集分类统计，反馈系统实时状态

## 03集成spark生态系统的使用
## 04发展史
## 05词频统计功能着手入门  
在官网的[A Quick Example](http://spark.apache.org/docs/latest/streaming-programming-guide.html#a-quick-example)中已经有了详细的介绍  
![TIM截图20180805223520](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180805223520.png)  

如果要联调Kafka输出到控制台，参考这个命令`run-example streaming.KafkaWordCount localhost:2181  test test1 1 ` 
  
    
语法模式如下：  

            /opt/cloudera/parcels/CDH/lib/spark/bin/run-example streaming.KafkaWordCount <zkQuorum> <group> <topics> <numThreads>


## 06工作原理