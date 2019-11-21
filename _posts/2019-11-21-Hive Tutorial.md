---
title: Hive Tutorial
layout: post
categories: Hive
tags: hive Tutorial
---
## 什么是hive
Hive是一个基于Apache Hadoop的数据仓库基础架构。Hadoop为数据存储和处理提供了大规模扩展和容错能力。
Hive的设计是为了方便的数据汇总，特别的查询和分析大量的数据。它提供了SQL，使用户能够方便地进行特别查询、汇总和数据分析。同时，Hive的SQL为用户提供了多个地方来集成他们自己的功能来进行定制分析，比如用户定义函数(udf)。 


## hive 不能干什么

Hive不是为在线事务处理而设计的。它最适合用于传统的数据仓库任务。  

## hive基本概念

### __Databases:__    数据库-命名空间的使用，区别表相同，视图相同等等 
### __Tables:__       表 
### __Partitions: __  分区 
### __Buckets：__     同一分区的数据可以细分，将想同的key再分至一个bucket中。类似Hash分区 

### 数据类型
#### 简单数据类型

- TINYINT—1 byte integer
- SMALLINT—2 byte integer
- INT—4 byte integer
- BIGINT—8 byte integer
- BOOLEAN—TRUE/FALSE
- FLOAT—single precision
- DOUBLE—Double precision
- DECIMAL—a fixed point value of user defined scale and precisio
- STRING—sequence of characters in a specified character set
- VARCHAR—sequence of characters in a specified character set with a maximum length
- CHAR—sequence of characters in a specified character set with a defined length
- TIMESTAMP — A date and time without a timezone ("LocalDateTime" semantics)
- TIMESTAMP WITH LOCAL TIME ZONE — A point in time measured down to nanoseconds ("Instant" semantics)
- DATE—a date
- BINARY—a sequence of bytes

参考文档：https://cwiki.apache.org/confluence/display/Hive/Tutorial