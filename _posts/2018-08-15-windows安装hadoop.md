---
title: windows安装hadoop
layout: post
---
## 00.背景
在学习sparkStreaming时遇见报错，不能远程连接服务器中的CDH环境，只能本地开发环境搭建个hadoop试试运气了

## 01.环境

JDK1.8  
    
[hadoop-2.6.5](https://www.apache.org/dist/hadoop/common/hadoop-2.6.5/hadoop-2.6.5.tar.gz)   
 
## 02.下载hadoopwindow-master  

链接：`https://pan.baidu.com/s/1o7YTlJO`

复制解压开的bin文件和etc文件到hadoop-2.6.5文件中，并替换原有的bin和etc文件


## 03.配置环境变量

把下载后的hadoop-2.6.g解压到你想安装的目录，配置环境变量

打开win的环境变量  

![TIM截图20180815112337](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180815112337.png)

新建系统环境变量

![TIM截图20180815112450](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180815112450.png)

新增PATH变量  

![TIM截图20180815112558](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180815112558.png)  

在命令提示符中输入hadoop或者hdfs等等命令验证配置是否成功，图中JAVA_HOME没有找到报错，我们稍后解决

![TIM截图20180815112703](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180815112703.png)  

## 04.修改hadoop.env.cmd文件

在`E:\hadoop-2.6.5\etc\hadoop`目录下找到`hadoop.env.cmd`文件

修改1
    
        set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_171
        
如何上面的修改不成功是因为Program Files中有空格，改成如下：

        set JAVA_HOME=C:\PROGRA~1\Java\jdk1.8.0_171  
        
让我再次输入hadoop验证是否成功，看到如下结果就是成功了

![TIM截图20180815165830](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180815165830.png)  

## 05.修改hadoop核心配置文件

编辑`hdfs-site.xml`文件，hadoop路径根据自己实际路径配置

	<configuration>
	 <property>
	        <name>dfs.replication</name>
	        <value>1</value>
	    </property>
	    <property>
	        <name>dfs.namenode.name.dir</name>
	        <value>/E:/hadoop-2.6.5/namenode</value>
	    </property>
	    <property>
	        <name>dfs.datanode.data.dir</name>
	        <value>/E:/hadoop-2.6.5/datanode</value>
	    </property>
	</configuration>  
	
## 06.创建缺失的文件夹

>hadoop2.6.5/tmp

>hadoop2.6.5/namenode

>hadoop2.6.5/datanode

## 07.格式化HDFS
用管理员命令执行如下命令：  

        hdfs namenode -format 
 
格式化成功后刚创建的namenode目录下会多出个current文件  

## 08.启动hadoop

在`E:\hadoop-2.6.5\sbin`目录下有个`start-all.cmd`,双击启动

在命令提示符中输入可以看到已经启动了如下服务

![TIM截图20180815184739](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180815184739.png)