---
layout: post
title: prel脚本连接Teradata ODBC
published: 'true'
categories: Teradata perl
tags: Teradata
---
如下代码所示：
    用最简单的例子，明白关键代码，prel脚本如下

    use DBI;

    $userid='dbc';
    $passwd='dbc';
    $dsn='dbi:ODBC:testdsn';

    my $dbh=DBI->connect($dsn,$userid,$passwd); 

报错：
    
    TD-EXPRESS:~ # perl test.pl 
    install_driver(ODBC) failed: Can't locate DBD/ODBC.pm in @INC (@INC contains: /usr/lib64 /usr/lib/perl5/5.10.0/x86_64-linux-thread-multi /usr/lib/perl5/5.10.0 /usr/lib/perl    5/site_perl/5.10.0/x86_64-linux-thread-multi /usr/lib/perl5/site_perl/5.10.0 /usr/lib/perl5/vendor_perl/5.10.0/x86_64-linux-thread-multi /usr/lib/perl5/vendor_perl/5.10.0 /    usr/lib/perl5/vendor_perl .) at (eval 3) line 3.
    Perhaps the DBD::ODBC perl module hasn't been fully installed,
    or perhaps the capitalisation of 'ODBC' isn't right.
    Available drivers: DBM, ExampleP, File, Gofer, Proxy, SQLite, Sponge.
     at test.pl line 7	
     
DBI是一个用于Perl编程语言的标准数据库独立接口模块。它定义了一组方法、变量和约定，它们提供了与实际使用的数据库无关的一致的数据库接口。DBI是基于模块架构构建的——对于每个数据库，都有一个驱动程序，它实现了特定数据库的工作细节。DBI允许Perl应用程序使用特定的数据库驱动程序-DBD模块连接到数据库。DBD模块处理与各种数据库交互的复杂细节  

DBD::ODBC是DBI的ODBC驱动程序。它用于连接基于ODBC的数据源。为了验证DBI和DBD::ODBC模块被正确安装和操作，执行以下脚本行:    


    perl -MDBI -e "DBI->installed_versions"  
    
The response should include DBD::ODBC module and its version similar to the following example:  
![TIM截图20180116112658](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180116112658.png)

## 前期准备
下载：[DBD::ODBC](http://search.cpan.org/~mjevans/DBD-ODBC-1.52/ODBC.pm)

由于Teradata ODBC驱动程序是使用DataDirect驱动程序管理器分配的，因此需要使用一个与DataDirect驱动程序管理器构建的数据库来取代DBD::ODBC模块。

## Rebuild DBD::ODBC on UNIX
    
  

      cd /opt/ActivePerl-5.16/lib/auto/DBD
    mkdir ODBC.original
    mv ODBC/* ODBC.original
    cd /tmp
    tar -xvf DBD-ODBC-1.52.tar
    cd DBD-ODBC-1.52 
    
### Update the lines in Makefile.PL:
    

    $myodbc = 'intersolve'
    if !$myodbc && -f "$odbchome/include/qeodbc.h";
   
### As follows:

    $myodbc = 'intersolve'
    if !$myodbc && -f "$odbchome/include/sqlunx.h";  
    
### Move the updated lines before this line:

        ($myodbc, $odbclibdir) = find_iodbc($odbchome) if !$myodbc;  
        
### In addition, replace the following block:

    print {$sqlhfh} qq{#include <qeodbc.h>\n};
    if (-f "$odbcincdir/sql.h") {
        print "You seem to have the official header files.\n";
        $opts{INC} .= " -I$odbcincdir";
        print {$sqlhfh} qq{#include <sql.h>\n#include <sqltypes.h>\n#include <sqlext.h>\n
    }  
    
### With this update:

    $opts{DEFINE} = "";
    if (-f "$odbchome/include/sql.h") {
        print "You seem to have the official DataDirect header files.\n";
        $opts{INC} .= " -I$odbchome/include";
        print {$sqlhfh} qq{#include <sql.h>\n#include <sqltypes.h>\n#include <sqlext.h>\n#include <sqlucode.h>\n
    }  
    
#### Makefile.PL tries very hard to find any valid ODBC driver using the system tools odbc_config, and iodbc_config. We don't want it to try too hard, we want to force it to use DirectData driver manager. Comment out the following lines by prepending with the comment ‘#’ character:  

    	# # try and find unixODBC's odbc_config binary
	# if (!$myodbc) {
	#     ($myodbc, $myodbc_version, $odbchome, $odbcincdir, $odbclibdir) =
	#         unixodbc_config($odbchome);
	# }
	# if (!$myodbc) {
	#     # try and find iODBC's iodbc_config binary
	#     ($myodbc, $myodbc_version, $odbchome,
	#      $odbcincdir, $odbclibdir) = iodbc_config($odbchome);
	# }  
	
### Prepare the environment variables:  

    export ODBCINI=/opt/teradata/client/ODBC_64/odbc.ini	
    export ODBCHOME=/opt/teradata/client/15.10
    export DBI_DSN=dbi:ODBC:testdsn
    export DBI_USER=dbc
    export DBI_PASS=dbc  
    
### Finally, build and install:  

	/opt/ActivePerl-5.16/bin/perl Makefile.PL
	make
	make test          ### optional
	make instal  
	
##### 到这里就可以执行test.pl文件了  

###### Check that /opt/ActivePerl-5.16/lib/auto/DBD/ has as a newly built ODBC.so library file. If not, manually copy /tmp/DBD-ODBC-1.52/blib/arch/auto/DBD/ODBC/ODBC.so to /opt/ActivePerl-5.16/lib/auto/DBD/.

 


## 但是在完成安装并配置后，报错：  
![TIM截图20180116222849](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180116222849.png)  
看到的反应肯定是百度安装[DBI](http://search.cpan.org/~timb/DBI-1.634/Changes)了，首先下载[DBI](http://search.cpan.org/~timb/DBI-1.634/Changes)  
解压dbi:  ```tar -zxvf DIB压缩包.tar.gz```  
然后进入DBI目录，执行：    

        perl Makefile.PL
        make 
        make test
        make install
        
## 再次执行脚本,报错： 
 
        perl: symbol lookup error: /usr/lib/perl5/site_perl/5.10.0/x86_64-linux-thread-multi/auto/DBD/ODBC/ODBC.so: undefined symbol: SQLAllocHandle  
        
## 经过多方搜索终于找到解决办法： 添加*__$opts{LIBS} = "-L$odbclibdir -lodbc;__*在如下代码中

        ...
    elsif ($myodbc eq 'intersolve') {
    $opts{DEFINE} = "";
    #print {$sqlhfh} qq{#include <qeodbc.h>\n};
    if (-f "$odbchome/include/sql.h") {
    print "You seem to have the official header files set for DataDirect.\n";
    $opts{INC} .= " -I$odbchome/include";
    $opts{LIBS} = "-L$odbclibdir -lodbc;
    print {$sqlhfh} qq{#include <sql.h>\n#include <sqltypes.h>\n#include <sqlext.h>\n#include <sqlucode.h>\n};
    }