---
title: Kafka Producer API编程
layout: post
categories: 'kafka, java'
tags: Hadoop
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


### 03 kafka producer源码解释

{% highlight java %}

		package com.teradata.spark.kafka;
	
	
	import org.apache.kafka.clients.consumer.ConsumerRecord;
	import org.apache.kafka.clients.consumer.ConsumerRecords;
	
	import java.util.Arrays;
	import java.util.Properties;
	
	/**
	 * anthor ccc
	 * kafka 消费者
	 */
	public class KafkaConsumerSimpleTest {
	    private String topic;
	
	
	    public KafkaConsumerSimpleTest(String topic) {
	        this.topic = topic;
	    }
	
	
	    private org.apache.kafka.clients.consumer.KafkaConsumer getConsumer() {
	        Properties props = new Properties();
	        //设置集群，不必是群集中服务器的详尽列表（如果服务器关闭需要制定多个）
	        props.put("bootstrap.servers", KafkaProperties.BOOTSTRAP_SERVERS);
	        //设置consumer的group.id
	        props.put("group.id", "testgroup0");
	        //自动提交为true
	        props.put("enable.auto.commit", "true");
	        //配置控制时间间隔来自动提交偏移
	        props.put("auto.commit.interval.ms", "1000");
	        //反序列化
	        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
	        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
	        org.apache.kafka.clients.consumer.KafkaConsumer consumer = new org.apache.kafka.clients.consumer.KafkaConsumer(props);
	        //订阅主题test0和test1作为配置group.id=testgroup0的一部分
	        consumer.subscribe(Arrays.asList("test0", "test1"));
	        while (true) {
	            ConsumerRecords<String, String> records = consumer.poll(100);
	            for (ConsumerRecord<String, String> record : records)
	                System.out.printf("offset = %d, key = %s, value = %s%n", record.offset(), record.key(), record.value());
	        }
	
	    }
	
	    public static void main(String[] args) {
	        new KafkaConsumerSimpleTest("").getConsumer();
	    }
	}


{% endhighlight java %}

<!--more-->


### 04演示效果
##### producer实时消息发送给consumer打印在控制台，这里我就不演示了