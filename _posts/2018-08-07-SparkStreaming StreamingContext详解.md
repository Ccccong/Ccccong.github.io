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

{% highlight java%}  

    SparkConf conf = new SparkConf().setAppName(appName).setMaster(master);
    JavaStreamingContext ssc = new JavaStreamingContext(conf, new Duration(1000));  
    
{% endhighlight java%}    
#### 00.12JavaStreamingContext对象也可以从现有的JavaSparkContext中创建。

{% highlight java%}  

    JavaSparkContext sc = ...   //existing JavaSparkContext  
    JavaStreamingContext ssc = new JavaStreamingContext(sc, Durations.seconds(1));
    
{% endhighlight java%}