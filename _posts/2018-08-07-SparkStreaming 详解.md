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

## 02.Input DStreams and Receivers  

input DStream是表示从流源接收的输入数据流的DStream。在[快速示例](http://spark.apache.org/docs/2.3.0/streaming-programming-guide.html#a-quick-example)中，lines输入DStream是表示从netcat服务器接收的数据流。每个input DStream（文件流除外，本节稍后讨论）都与Receiver （Scala doc， Java doc）对象相关联，该对象从源接收数据并将其存储在Spark的内存中进行处理。 

Spark Streaming提供两类内置流媒体源
- 基本源：StreamingContext API中直接提供的源。示例：文件系统和套接字连接。
- 高级源：Kafka，Flume，Kinesis等资源可通过额外的实用程序类获得。这些需要链接额外的依赖关系，如 链接部分所述。
  
  
>请注意，如果要在流应用程序中并行接收多个数据流，可以创建多个输入DStream（在“ [性能调整](http://spark.apache.org/docs/2.3.0/streaming-programming-guide.html#level-of-parallelism-in-data-receiving)”部分中进一步讨论）。这将创建多个接收器，这些接收器将同时接收多个数据流。但请注意，Spark worker / executor是一个长期运行的任务，因此它占用了分配给Spark Streaming应用程序的其中一个核心。因此，重要的是要记住，Spark Streaming应用程序需要分配足够的内核（或线程，如果在本地运行）来处理接收的数据，以及运行接收器。  

#### 要点

- 在本地运行Spark Streaming程序时，请勿使用“local”或“local [1]”作为主URL。这两种方法都意味着只有一个线程将用于本地运行任务。如果您正在使用基于接收器的输入DStream（例如套接字，Kafka，Flume等），则单线程将用于运行接收器，不会留下任何线程来处理接收到的数据。因此，在本地运行时，始终使用“local [ n ]”作为主URL，其中n >要运行的接收器数量（有关如何设置主服务器的信息，请参阅[Spark属性](http://spark.apache.org/docs/2.3.0/configuration.html#spark-properties)）。   

- 将逻辑扩展到在集群上运行，分配给Spark Streaming应用程序的核心数必须大于接收器数。否则系统将接收数据，但无法处理数据。  
-