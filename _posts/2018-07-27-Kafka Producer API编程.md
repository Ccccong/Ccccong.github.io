---
title: Kafka Producer API编程
layout: post
categories: ''
tags: ''
---
### 00参考文档
[Kafka Documentament](http://kafka.apache.org/documentation/ "kafka官网文档")

### 01使用版本  
    
> kafka_version 1.0.1  
 
> scala_version 2.11.8

### 02前期准备
1. 搭建好了kafka 环境、zookeeper环境  
2. 对kafka有基本的架构了解
3. 进行了kafka命令行实验，明白其基本的运行原理
4. idea 安装完善，manven,jdk，scala(查看源码用)等等

### 03 kafka producer简单测试代码 

{% highlight java %}

	/**
	 * 源码里面有解释
	 */
	public class KafkaClientSimpleTest {
	
	    public KafkaClientSimpleTest() {
	
	        Properties props = new Properties();
	        props.put("bootstrap.servers", "192.168.221.12:9092");
	        props.put("acks", "all");
	        props.put("retries", 0);
	        props.put("batch.size", 16384);
	        props.put("linger.ms", 1);
	        props.put("buffer.memory", 33554432);
	        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
	        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
	
	        Producer<String, String> producer = new KafkaProducer<String, String>(props);
	        for (int i = 0; i < 100; i++){
	            System.out.println("start send ... ...");
	            producer.send(new ProducerRecord<String, String>("test0", Integer.toString(i), Integer.toString(i)));
	            System.out.println("send over");
	        }
	        producer.close();
	    }
	
	    public static void main(String[] args) {
	        new KafkaClientSimpleTest();
	    }
	}

{% endhighlight java %}

<!--more-->
`bootstrap.servers`是kafka集群，可以不用全部写上，只要配置的不宕机会自动发现集群中的所有主机，但是高可用性的话记得配置多个确保服务的可用性  

生产者由缓冲空间池组成，缓冲空间池保存尚未传输到服务器的记录，以及后台I/O线程，该线程负责将这些记录转换为请求并将它们传输到集群。未在使用后关闭生产者将泄漏资源  

`send(ProducerRecord)`方法是异步的。调用时，它将记录添加到挂起记录发送的缓冲区，并立即返回。这使得生产者可以将单个记录批量处理以提高效率。  

`acks`控制着认为请求完成的条件,我们指定的“all”设置将导致阻塞记录的全部提交，这是最慢但最持久的设置。  

如果请求失败，生产者可以自动重试，我们已经指定了<code>retries=0</code>就不会了。启用retries并且打开复制的可能性(请参阅文档<a href=" http://kafka.apache.org/document.html #semantic ">消息传递语义</a>了解详情)。  

通过提供一组键值对作为配置来实例化producer,详情参考官网文档<a href="http://kafka.apache.org/documentation.html#producerconfigs">here</a> 


### 04 重构kafka producer代码  

我们写一个配置类，将所有producer加入进来，便于后期编程  

{% highlight java%} 

	/**
	 * @author CCC
	 * kafka常用配置文件
	 */
	public class KfkProperties {
	    final static String ZK = "192.168.221.12:2181";
	    final static String TOPIC = "test0";
	    final static String BOOTSTRAP_SERVERS = "192.168.221.12:9092,192.168.221.12:9092,192.168.221.12:9092";
	    final static String ACKS = "all";
	    final static Integer RETRIES = 0;
	    final static Integer BATCH_SIZE = 16384;
	    final static Integer LINGER_MS = 1;
	    final static Integer BUFFER_MEMORY = 33554432;
	    final static String KEY_SERIALIZER = "org.apache.kafka.common.serialization.StringSerializer";
	    final static String VALUE_SERIALIZER = "org.apache.kafka.common.serialization.StringSerializer";
	}

{% endhighlight java%}  

我们编写一个生产者，用于发送消息，此次调用的是kafka 源码里面的方法，提供回调函数，开启线程，控制发送时间 

{% highlight java %}  

        	/**
	 * @author ccc
	 * kafka producer properties
	 */
	public class KfkProducer extends Thread {
	    private String topic;
	    private Producer<String, String> producer;
	    private final Boolean isAsync;
	
	
	    public KfkProducer(String topic, Boolean isAsync) {
	        System.out.println("start producer");
	        this.topic = topic;
	        this.isAsync = isAsync;
	
	        Properties properties = new Properties();
	
	        properties.put("bootstrap.servers", KfkProperties.BOOTSTRAP_SERVERS);
	        properties.put("acks", KfkProperties.ACKS);
	        properties.put("retries", KfkProperties.RETRIES);
	        properties.put("batch.size", KfkProperties.BATCH_SIZE);
	        properties.put("linger.ms", KfkProperties.LINGER_MS);
	        properties.put("buffer.memory", KfkProperties.BUFFER_MEMORY);
	        properties.put("key.serializer", KfkProperties.KEY_SERIALIZER);
	        properties.put("value.serializer", KfkProperties.VALUE_SERIALIZER);
	
	
	        producer = new KafkaProducer<String, String>(properties);
	    }
	
	
	    @Override
	    public void run() {
	        super.run();
	        int messageNo = 0;
	        while (true) {
	            String message = "message_" + messageNo;
	            long startTime = System.currentTimeMillis();
	            if (isAsync) {
	                producer.send(new ProducerRecord<String, String>(topic, messageNo + "", message), new DemoCallback(startTime, messageNo, message));
	            } else {
	                try {
	                    producer.send(new ProducerRecord<String, String>(topic, messageNo + "", message)).get();
	                    System.out.println("Sent message: (" + messageNo + ", " + message + ")");
	                } catch (Exception e) {
	                    e.printStackTrace();
	                }
	            }
	            ++messageNo;
	
	            try {
	                Thread.sleep(2000);
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	
	    }
	}
	
	class DemoCallback implements Callback {
	    private final long startTime;
	    private final int key;
	    private final String message;
	
	    public DemoCallback(long startTime, int key, String message) {
	        this.startTime = startTime;
	        this.key = key;
	        this.message = message;
	    }
	
	    public void onCompletion(RecordMetadata metadata, Exception exception) {
	        long elapsedTime = System.currentTimeMillis() - startTime;
	        if (metadata != null) {
	            System.out.println(
	                    "message(" + key + ", " + message + ") sent to partition(" + metadata.partition() +
	                            "), " +
	                            "offset(" + metadata.offset() + ") in " + elapsedTime + " ms");
	        } else {
	            exception.printStackTrace();
	        }
	    }
	
	}

{% endhighlight java %}


我们最后再写一个main方法启动改producer  

{% highlight java %}

	
	package com.teradata.spark.kafka;
	
	/**
	 *kafka api 测试
	 */
	public class KfkClientAPP {
	    public static void main(String[] args) {
	
	        System.out.println("start kafka test");
	
	        new KfkProducer(KfkProperties.TOPIC,true).start();
	    }
	}

{% endhighlight java %}

### 05演示效果
##### 实时发送消息到后台消费端

1. 启动上面编写的java producer clinet  

2. 开启后台消费端  
  
        kafka-console-consumer --bootstrap-server 192.168.221.12:9092 --topic test0
3. 结果展示  

![TIM截图20180727125050](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180727125050.png)

##### 注：版本不同，使用方法不同，上面的是最新版本的时间截止2018.7。