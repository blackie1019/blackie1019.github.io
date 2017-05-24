---
layout: post
title: NPM Execute Scripts without Error Logs
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-24 23:49:14
categories:
- Development&Coding
tags:
- npm
---

分享如何關閉 npm 執行指令時的 err 紀錄

<!-- More -->

使用 npm 時都會在 package.json 內的 *scripts* 建立更便捷快速的替代指令，如下：

![npm_scripts](npm_scripts.png)

如此即可在 terminal 輸入我們建立的簡單指令 npm run <scriptname> 的方式來運行，如下：

![npm_run_script](npm_run_script.png)

但往往在執行指令時，會有出錯的情形．此時就會拋出很多看不懂也沒有幫助的預設錯誤協助方式：

![npm_run_error](npm_run_error.png)

這裡可藉由在預執行的指令後方加入 -s 的方式運行 *silent mode* ，來幫我們過濾掉這些不必要的資訊．運行結果如下：

![npm_run_error_silent](npm_run_error_silent.png)

如果確定所有指令都要運行 *silent mode* ，你也可以修改 ~/.npmrc，加入以下設定：

    [run]
    silent=true

而另外一種方法是建立 linux/windows 指令別名(alias)，以 linux 為例：

    alias npm='npm -s '

這樣所有運行 npm run <scriptname> 的指令都會跑在*silent mode*

## References ##

- [how to run a script without logging that that stupid npm error if it doesn't exit with code 0](https://github.com/npm/npm/issues/6124)
- [default npm run to silent](https://github.com/npm/npm/issues/5452)
- [鳥哥的 Linux 私房菜 ：10.3.1 命令別名設定： alias, unalias](http://linux.vbird.org/linux_basic/0320bash.php#alias)