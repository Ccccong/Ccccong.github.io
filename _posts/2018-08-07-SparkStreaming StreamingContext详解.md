---
title: SparkStreaming StreamingContext详解
layout: post
tags: Hadoop
categories: SparkStreaming
---
## 00初始化StreamingContext
要初始化SparkStreaming程序，必须创建一个StreamingContext对象，它是所有Spark流功能的主要入口点。  
### 00.1两种方法初始化
#### 00.11可以从SparkConf对象创建JavaStreamingContext对象。