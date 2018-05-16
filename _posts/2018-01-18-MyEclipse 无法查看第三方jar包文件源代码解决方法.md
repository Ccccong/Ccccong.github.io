---
title: MyEclipse 无法查看第三方jar包文件源代码解决方法
layout: post
categories: ''
tags: Notes
---
1. 下载反编译插件[jadClipse](https://sourceforge.net/projects/jadclipse/files/)
<!--more-->
2. 然后，将net.sf.jadclipse_3.3.0.jar拷贝到eclipse的plugins目录下
3. 再删除eclipse的configuration目录下org.eclipse.update文件
4. 关闭重新启动MyElipse
5. 下载[jad的可执行文件](http://varaneckas.com/jad/ ),解压后放在你喜欢的路径（我下载的是windows平台的）
6. 打开MyEclipse，prefrence，设置jad的可执行文件路径以及生成的临时文件路径，如图所示：  
![TIM截图20180118211732](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180118211732.png)
8. 接着，设置*.class文件类型默认打开方式，如图所示：  
![TIM截图20180118211946](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180118211946.png)
9. 然后，设置*.class without source文件类型打开方式，如图所示：  
![TIM截图20180118212053](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180118212053.png)

打完，收工！