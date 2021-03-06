---
title: SparkStreaming学习
layout: post
categories: SparkStreaming
tags: Hadoop
---
## 00背景

    在阅读完公司的PPT文档后，继续深入学习sparkStreaming,完成官网的Quick Start,理解先关概念，架构
    
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



[单词计数GitHub源码scala版](https://github.com/apache/spark/blob/v2.3.0/examples/src/main/scala/org/apache/spark/examples/streaming/NetworkWordCount.scala)
当然我也找到了我们以后会用着的[kafka java版本](https://github.com/apache/spark/blob/v2.3.0/examples/src/main/java/org/apache/spark/examples/streaming/JavaDirectKafkaWordCount.java)，在这里先做下笔记  

{% highlight scala %}

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one or more
	 * contributor license agreements.  See the NOTICE file distributed with
	 * this work for additional information regarding copyright ownership.
	 * The ASF licenses this file to You under the Apache License, Version 2.0
	 * (the "License"); you may not use this file except in compliance with
	 * the License.  You may obtain a copy of the License at
	 *
	 *    http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	// scalastyle:off println
	package org.apache.spark.examples.streaming
	
	import org.apache.spark.SparkConf
	import org.apache.spark.storage.StorageLevel
	import org.apache.spark.streaming.{Seconds, StreamingContext}
	
	/**
	 * Counts words in UTF8 encoded, '\n' delimited text received from the network every second.
	 *
	 * Usage: NetworkWordCount <hostname> <port>
	 * <hostname> and <port> describe the TCP server that Spark Streaming would connect to receive data.
	 *
	 * To run this on your local machine, you need to first run a Netcat server
	 *    `$ nc -lk 9999`
	 * and then run the example
	 *    `$ bin/run-example org.apache.spark.examples.streaming.NetworkWordCount localhost 9999`
	 */
	object NetworkWordCount {
	  def main(args: Array[String]) {
	    if (args.length < 2) {
	      System.err.println("Usage: NetworkWordCount <hostname> <port>")
	      System.exit(1)
	    }
	
	    StreamingExamples.setStreamingLogLevels()
	
	    // Create the context with a 1 second batch size
	    val sparkConf = new SparkConf().setAppName("NetworkWordCount")
	    val ssc = new StreamingContext(sparkConf, Seconds(1))
	
	    // Create a socket stream on target ip:port and count the
	    // words in input stream of \n delimited text (eg. generated by 'nc')
	    // Note that no duplication in storage level only for running locally.
	    // Replication necessary in distributed scenario for fault tolerance.
	    val lines = ssc.socketTextStream(args(0), args(1).toInt, StorageLevel.MEMORY_AND_DISK_SER)
	    val words = lines.flatMap(_.split(" "))
	    val wordCounts = words.map(x => (x, 1)).reduceByKey(_ + _)
	    wordCounts.print()
	    ssc.start()
	    ssc.awaitTermination()
	  }
	}
	// scalastyle:on println
{% endhighlight scala %}
 
    

## 06工作原理