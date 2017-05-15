---
layout: post
title: macOS upgrade Ruby to 2.4.0+
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-15 22:17:00
categories:
- Ruby
tags:
- macOS
- homebrew
- rbenv
---

分享 macOS 10.12 Sierra 如何透過 rbenv 升級到 2.4.0 版本

<!-- More -->

![cover](cover.png)

## rbenv Intro ##

[rbenv](https://github.com/rbenv/rbenv)，協助我們管理多個版本的的 ruby 在本機環境中交互運行．與 *RVM* 的功能相同．RVM 是另一個命令列工具，也可以提供多版本 Ruby 環境的管理與切換．*rbenv* 與 *RVM* 二擇一使用

## ruby-build Intro ##

[ruby-build](https://github.com/rbenv/ruby-build) 是 *rbenv* 上的一個插件(plugin)，提供我們 Ruby 安裝與編譯不同版本 Ruby 的指令

## Setup up ##

先安裝 homebrew:

    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

接著安裝透過剛剛安裝的 homebrew 安裝 rbenv 與 ruby-build

    brew install rbenv ruby-build

接著執行下面這行指令，將 rbenv 加入到 *bash* 中，讓 terminal 每次與執行都將正確的載入 rbenv．

    echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
    source ~/.bash_profile

透過 rbenv 安裝 Ruby

    rbenv install 2.4.0

將當前運行的 Ruby 版本指定到 2.4.0

    rbenv global 2.4.0

確認當前運行的 Ruby 版本

    ruby -v

![result](result.png)

這邊要注意如果先前沒有將 rbenv 加入到 *bash* 中，則當下查詢的版本會不正確需要重啟 terminal．