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