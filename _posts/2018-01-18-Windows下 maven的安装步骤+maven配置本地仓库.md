---
layout: post
title: Windows下 maven的安装步骤+maven配置本地仓库
published: 'true'
categories: ''
tags: Notes
---
1. 下载[maven](http://maven.apache.org/download.cgi)
2. 把apache-maven-3.5.2-bin.zip解压目录D:\MyApplication\maven\apache-maven-3.5.2
3. 配置maven的环境变量：先配置M2_HOME的环境变量，新建一个系统变量：M2_HOME , 路径是：D:\MyApplication\maven\apache-maven-3.5.2，如图所示:  
![TIM截图20180118153529](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180118153529.png)  
4. 再配置path环境变量，在path值的末尾添加"%M2_HOME%\bin"，如下图所示：  
![TIM截图20180118153513](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180118153513.png)  
5. 点击确定之后，打开cmd窗口：输入 mvn -version,出现如下内容表示安装成功:   
![TIM截图20180118154124](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180118154124.png)   

给maven添加本地仓库

1.打开本地存放maven目录（或者maven安装目录，我的安装目录是：D:\MyApplication\maven\apache-maven-3.5.2，这里没多大影响，我只是不同的项目有不同的仓库）：
比如我的本地存放目录是：D:\MyApplication\maven\apache-maven-3.5.2
2.打开conf文件夹下的settings.xml文件，找到第53行，把注释去掉，修改成：
<localRepository>D:/Util/maven/maven-dependcies</localRepository>
当然了，前提是在某个路径下，手动建立了一个名为 maven-dependcies的文件夹，然后把本地仓库指向该路径
