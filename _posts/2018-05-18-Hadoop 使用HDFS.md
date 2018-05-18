---
title: Hadoop 使用HDFS
layout: post
tags: Hadoop
---
# Hadoop HDFS

# Hadoop分布式文件系统
![](https://i.imgur.com/GTcp7uN.jpg)
查看当地文件

    hdfs dfs –ls file:///bin
查看HDFS文件

    hdfs dfs –ls hdfs:///root
# 访问HDFS
![](https://i.imgur.com/hSKTWaw.jpg)
# Ambari文件视图
## 上面的所有命令，在UI中都能实现，而且很快捷方便
![](https://i.imgur.com/K4l1iPn.jpg)
## 当你删除或者创建文件的时候，发现没有权限，可以在UI中修改core-site.xml文件修改权限赋值（要先创建该用户）
Services > HDFS > Configs > Advanced > Custom coresite > Add Property

![](https://i.imgur.com/KwViIFa.jpg)
添加参数并重启所有受影响的组件

    hadoop.proxyuser.root.groups=* 
    hadoop.proxyuser.root.hosts=*

# 创建文件视图
## 作为ambari管理员，您必须创建一个文件视图的实例，以便用户能够使用它。
![](https://i.imgur.com/YfU13u8.jpg)

## 创建视图实例之后，可以进行编辑和更新。编辑实例的一个更重要的原因是授予对其他用户和组使用实例的权限
# 使用NameNode UI
### 另一种查看HDFS目录内容的方法是使用HDFS NameNode的基于web的NameNode UI。
### 两种方法能够访问NameNode UI
1. Through the Ambari Web UI. In the Ambari Web UI:
	Select the Services page
	Select the HDFS service
	Select NameNode UI from the Quick Links menu

2. Enter the URL http://<NameNode_host>:50070 in a browser window.	

# 使用WebHDFS
![](https://i.imgur.com/Gprt1Yx.png)
#### hdfs dfs 命令只是使用 Java 本机 API 库实现的许多命令中的一个。但是, 要使用这些命令, 您必须安装 Java 本机 API 库, 还要下载和配置 HDFS 配置文件
#### 创建 WebHDFS 是为了启用 HDFS 访问, 而无需安装和配置 Java 本机 API 库。WebHDFS 是一个 HTTP REST API。WebHDFS 使用 HTTP 操作, 如获取、张贴、放置和删除文件访问和管理。HDFS Shell 对用户或管理员很有用。HDFS shell 命令可以直接用于 command-line 提示或用于 shell 脚本或程序。WebHDFS 主要用于编写 HDFS Web 应用程序的程序员, 它们将由用户、管理员或其他程序使用。
## 打开WebHDFS的两种方法(默认是打开的)
![](https://i.imgur.com/QEuHOQN.png)
#### •	Check the hdfs-site.xml file
The property dfs.webhdfs.enabled must be set to true
#### •	Use Ambari
Ensure that WebHDFS enabled is selected for HDFS at Services > Config > Advanced > General
# 配置WebHDFS参数
## 如果启用了 Kerberos, 则 WebHDFS 需要配置两个附加的 
hdfs-site. xml 属性。dfs.web.authentication.kerberos.principal and dfs.web.authentication.kerberos.keytab.
![](https://i.imgur.com/aaeuXly.png)
# WebHDFS操作
![](https://i.imgur.com/CM39x7R.png)
## 所有 WebHDFS 操作 url 使用语法

	http://<NameNode>:50070/webhdfs/v1/<path>?op=operation_and_arguments>

对curl不熟悉请查看扫盲贴[Linux curl命令详解](Linux curl命令详解 "https://www.cnblogs.com/duhuo/p/5695256.html")

## 使用方法
	
创建文件夹

 	curl -i -X PUT "http://192.168.15.140:50070/webhdfs/v1/web/mydata?op=MKDIRS&user.name=hdfs"

查看文件
	
	curl -i "http://192.168.15.140:50070/webhdfs/v1/web/mydata?op=LISTSTATUS&user.name=hdfs"
....(具体查看文档)

# ACL（access control lists ）访问控制列表
## 打开ACL
添加配置hdfs-site.xml文件dfs.namenode.acls.enabled 为true
也可以使用UI设置：Services > HDFS > Configs > Advanced >
![](https://i.imgur.com/Nr55zdG.png)
## 管理ACL
![](https://i.imgur.com/tjmBrGR.png)

## 使用getfacl 
![](https://i.imgur.com/Pc1SEFS.png)
## 使用setfacl 
#### • Set (remove existing and replace) both permissions and ACL entries using a single command:

	$ hdfs dfs –setfacl --set user::rw-,group::r--,other::---,user:steve:rw-,user:jason:rw- fileA
Sets owner, group, and other permissions and adds ACL entries for steve and jason
#### •	Modify an existing ACL by adding a new entry for the group eng:

	$ hdfs dfs –setfacl –m group:eng:rw- fileA
#### •	Remove the specific ACL entry for the user jason:

	$ hdfs dfs –setfacl –x user:jason fileA
#### •	Remove all ACL entries, leaving only the base owner, group, and other permissions:

	$ hdfs dfs –setfacl –b fileA
The user steve and the group eng are removed.
# 创建一个文件用默认的ACL（目录一样的）
![](https://i.imgur.com/om9FByg.png)




# 常见错误

    17/11/30 02:12:20 WARN hdfs.DFSClient: DataStreamer Exception
    java.io.IOException: Failed to replace a bad datanode on the existing pipeline due to no more good datanodes being available to try. (Nodes: current=[DatanodeInfoWithStorage[192.168.15.140:50010,DS-c3c4f799-44e3-4ee8-be51-837cb38866bf,DISK]], original=[DatanodeInfoWithStorage[192.168.15.140:50010,DS-c3c4f799-44e3-4ee8-be51-837cb38866bf,DISK]]). The current failed datanode replacement policy is DEFAULT, and a client may configure this via 'dfs.client.block.write.replace-datanode-on-failure.policy' in its configuration.
    	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.findNewDatanode(DFSOutputStream.java:1059)
    	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.addDatanode2ExistingPipeline(DFSOutputStream.java:1122)
    	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.setupPipelineForAppendOrRecovery(DFSOutputStream.java:1280)
    	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.run(DFSOutputStream.java:570)
    17/11/30 02:12:20 ERROR hdfs.DFSClient: Failed to close inode 28244
    java.io.IOException: Failed to replace a bad datanode on the existing pipeline due to no more good datanodes being available to try. (Nodes: current=[DatanodeInfoWithStorage[192.168.15.140:50010,DS-c3c4f799-44e3-4ee8-be51-837cb38866bf,DISK]], original=[DatanodeInfoWithStorage[192.168.15.140:50010,DS-c3c4f799-44e3-4ee8-be51-837cb38866bf,DISK]]). The current failed datanode replacement policy is DEFAULT, and a client may configure this via 'dfs.client.block.write.replace-datanode-on-failure.policy' in its configuration.
    	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.findNewDatanode(DFSOutputStream.java:1059)
    	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.addDatanode2ExistingPipeline(DFSOutputStream.java:1122)
    	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.setupPipelineForAppendOrRecovery(DFSOutputStream.java:1280)
    	at org.apache.hadoop.hdfs.DFSOutputStream$DataStreamer.run(DFSOutputStream.java:570)
## 在/etc/hadoop/conf目录下中的hdfs-site.xml文件添加如下参数
	
    <property>
        <name>dfs.client.block.write.replace-datanode-on-failure.enable</name>
        <value>true</value>
    </property>
    <property>
    <name>dfs.client.block.write.replace-datanode-on-failure.policy</name>
        <value>NEVER</value>
    </property>

对于dfs.client.block.write.replace-datanode-on-failure.enable，客户端在写失败的时候，是否使用更换策略，默认是true没有问题

对于，dfs.client.block.write.replace-datanode-on-failure.policy，default在3个或以上备份的时候，是会尝试更换结点尝试写入datanode。而在两个备份的时候，不更换datanode，直接开始写。对于3个datanode的集群，只要一个节点没响应写入就会出问题，所以可以关掉。