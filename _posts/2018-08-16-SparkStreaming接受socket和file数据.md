---
title: SparkStreaming接受socket和file数据
layout: post
tags: Hadoop
categories: SparkStreaming
---
## 背景

学习完SparkStreaming相应的基本概念后，我们来做下官网上的案例 

## 代码

废话不多说，直接上代码，需要解释话把环境搭建起来，ctrl+鼠标右键查看源码,搭建环境不容易这个环境不容易，记得运行程序一直报错，解决了一个个bug后才有如下成果（基本是版本依赖和maven jar包冲突的问题）  

>架构，代码，概念不清楚的请查看上几篇笔记


<!--more-->	
{% highlight java%} 

	package com.teradata.springStreaming;
	
	import org.apache.spark.SparkConf;
	import org.apache.spark.streaming.Duration;
	import org.apache.spark.streaming.api.java.JavaDStream;
	import org.apache.spark.streaming.api.java.JavaPairDStream;
	import org.apache.spark.streaming.api.java.JavaReceiverInputDStream;
	import org.apache.spark.streaming.api.java.JavaStreamingContext;
	import scala.Tuple2;
	import java.util.Arrays;
	
	public class NetworkWordCount {
	    public static void main(String[] args) {
	        // Create a local StreamingContext with two working thread and batch interval of 1 second
	        SparkConf conf = new SparkConf().setAppName("MyApp").setMaster("local[2]");
	        JavaStreamingContext jssc = new JavaStreamingContext(conf, new Duration(1000));
	
	        // Create a DStream that will connect to hostname:port, like localhost:9999
	        JavaReceiverInputDStream<String> lines = jssc.socketTextStream("192.168.221.12", 9998);
	        JavaDStream<String> words = lines.flatMap(x -> Arrays.asList(x.split(" ")).iterator());
	
	        // Count each word in each batch
	        JavaPairDStream<String, Integer> pairs = words.mapToPair(s -> new Tuple2<>(s, 1));
	        JavaPairDStream<String, Integer> wordCounts = pairs.reduceByKey((i1, i2) -> i1 + i2);
	
	        // Print the first ten elements of each RDD generated in this DStream to the console
	        wordCounts.print();
	
	        jssc.start();              // Start the computation
	        try {
	            jssc.awaitTermination();   // Wait for the computation to terminate
	        } catch (InterruptedException e) {
	            e.printStackTrace();
	        }
	    }
	}


{% endhighlight java %}


#### 在控制台输入如下命令开放端口，输入单词计数：

![TIM截图20180816104521](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180816104521.png)

#### 结果

![TIM截图20180816105338](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180816105338.png)



#### 也可以改造成文件单词计数，如下见官网

![TIM截图20180816110535](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180816110535.png)