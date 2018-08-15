---
title: SparkStreaming 详解
layout: post
tags: Hadoop
categories: SparkStreaming
---
## 00.StreamingContext
要初始化SparkStreaming程序，必须创建一个StreamingContext对象，它是所有Spark流功能的主要入口点。  
### 两种方法初始化
#### 可以从SparkConf对象创建JavaStreamingContext对象。 

{% highlight java%}  

    SparkConf conf = new SparkConf().setAppName(appName).setMaster(master);
    JavaStreamingContext ssc = new JavaStreamingContext(conf, new Duration(1000));  
    
{% endhighlight java%}    
#### JavaStreamingContext对象也可以从现有的JavaSparkContext中创建。

{% highlight java%}  

    JavaSparkContext sc = ...   //existing JavaSparkContext  
    JavaStreamingContext ssc = new JavaStreamingContext(sc, Durations.seconds(1));
    
{% endhighlight java%} 
<!--more-->
其中的具体参数请查看源码（idea点击右上角的放大镜图标，搜索StreamingContext,download source）  

##### 在定义了content之后，您必须执行以下操作：

1. Define the input sources by creating input DStreams.(定义输入源通过创建输入的DStreams)
2. Define the streaming computations by applying transformation and output operations to DStreams.(定义流计算通过对DStreams应用转换和输出操作。)
3. Start receiving data and processing it using streamingContext.start(开始接收数据并使用streamingContext.start()处理数据).
4. Wait for the processing to be stopped (manually or due to any error) using streamingContext.awaitTermination().(使用streamingContext.awaitTermination()等待进程停止(手动或由于错误调用)。)
5. The processing can be manually stopped using streamingContext.stop().（可以使用StreamingContext手动停止进程）

##### 需要记住的点：

- Once a context has been started, no new streaming computations can be set up or added to it.
- 一旦启动Context，新的流计算就不能启动或添加
- Once a context has been stopped, it cannot be restarted.
- 一旦Context停止就不能重新启动
- Only one StreamingContext can be active in a JVM at the same time.
- 在JVM中只能只能同时调用一个StreamingContext
- stop() on StreamingContext also stops the SparkContext. To stop only the StreamingContext, set the optional parameter of stop() called stopSparkContext to false.
- stop()在StreamingContext中也停止了SparkContext。要仅停止StreamingContext，请将stopSparkContext()的可选参数设置为false
- A SparkContext can be re-used to create multiple StreamingContexts, as long as the previous StreamingContext is stopped (without stopping the SparkContext) before the next StreamingContext is created.
- 可以重用SparkContext来创建多个StreamingContext，只要在创建下一个StreamingContext之前停止前面的StreamingContext(不停止SparkContext)。  

## 01.Discretized Streams (DStreams)
Discretized Stream 或者是 DStream 是Spark流提供的基本抽象。它表示一个连续的数据流，要么是从源接收的输入数据流，要么通过转换输入流生成的经过处理的数据流。在内部，DStream由一系列连续的RDDs表示，这是Spark对不可变的分布式数据集的抽象(请参阅Spark编程指南了解更多细节)。DStream中的每个RDD都包含来自某个间隔的数据，如下图所示。  

![DStreaming RDD](http://spark.apache.org/docs/2.3.0/img/streaming-dstream.png)

应用于DStream的任何操作都转换为底层RDD上的操作。例如，在先前将行流转换为字的示例中，flatMap操作应用于linesDStream中的每个RDD 以生成DStream的 wordsRDD。如下图所示。  

![](http://spark.apache.org/docs/2.3.0/img/streaming-dstream-ops.png)