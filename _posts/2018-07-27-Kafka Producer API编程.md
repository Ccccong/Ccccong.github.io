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

### 03 kafka producer代码解释 

{% highlight javascript %}

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

{% endhighlight javascript %}

<!--more-->
`bootstrap.servers`是kafka集群，可以不用全部写上，只要配置的不宕机会自动发现集群中的所有主机，但是高可用性的话记得配置多个确保服务的可用性  

生产者由缓冲空间池组成，缓冲空间池保存尚未传输到服务器的记录，以及后台I/O线程，该线程负责将这些记录转换为请求并将它们传输到集群。未在使用后关闭生产者将泄漏资源  

`send(ProducerRecord)`方法是异步的。调用时，它将记录添加到挂起记录发送的缓冲区，并立即返回。这使得生产者可以将单个记录批量处理以提高效率。  

`acks`控制着认为请求完成的条件,我们指定的“all”设置将导致阻塞记录的全部提交，这是最慢但最持久的设置。  

如果请求失败，生产者可以自动重试，我们已经指定了<code>retries=0</code>就不会了。启用retries并且打开复制的可能性(请参阅文档<a href=" http://kafka.apache.org/document.html #semantic ">消息传递语义</a> for details)。