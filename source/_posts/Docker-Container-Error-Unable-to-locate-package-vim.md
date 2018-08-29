---
layout: post
title: 'Docker Container Error : Unable to locate package vim'
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-09 14:17:54
categories:
- Virtualization
tags:
- Docker
- Linux
- Container
---

分享如何解決 Docker Container 內遇到 vi 指令找不到的問題

<!-- More -->

在 Linux 環境下常常會使用到的 vim 編輯器在部分 Docker Container 內會顯示錯誤：*bash: vi: command not found*

而解決這個問題的步驟如下：

1. 更新 apt-get

        apt-get update

    ![apt_get_update](apt_get_update.png)

2. 安裝 vim

        apt-get install vim

    ![install_vim](install_vim.png)

3. 查詢 vim 當前版本，確認 vim 已安裝

        vim --version

    ![cmd_vi](cmd_vi.png)

## References ##

-[E: Unable to locate package vim on Debian jessie simplified Docker container](https://unix.stackexchange.com/questions/336392/e-unable-to-locate-package-vim-on-debian-jessie-simplified-docker-container)