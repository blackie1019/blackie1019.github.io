---
layout: post
title: Anaconda - Python Environment Management Tool
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-08-01 01:11:37
categories:
- Python
tags:
- Python2.7
- Python3.x
---

介紹如何使用 Anaconda 幫我們建立與即時切換 Python 2.7/Python 3.x 的環境與相關管理

<!-- More -->

![banner](banner.png)

Anaconda 是一種大蛇，也是Nicki Minaj的著名歌曲:

<iframe width='560' height='315' src='https://www.youtube.com/embed/LDZX4ooRsWs?ecver=2' frameborder='0' allowfullscreen></iframe>

但今天要介紹的 [Anaconda](https://www.continuum.io/what-is-anaconda) 則是管理 Python 開發環境、發佈工具與相依性的工具。

Python 的開發者長期被 Python 兩個開發版本所苦惱，而到底是要選 Python 2.7 還是 Python 3.x 做開發都無法避免，開發者需要支援兩個開發環境且即時切換也是基本環境設定的需求。

接著我們將來示範如何透過 Anaconda 來幫我們快速切換不同版本的開發環境。

## Anaconda General Command ##

Anaconda 在安裝最新版的 Pythone 3.x 版本內已經有包含在內，如果沒有的朋友請在自行至[官網下載](https://www.continuum.io/downloads)安裝。

Anaconda CLI 本身可以透過 *conda -h* 查詢常用指令:

- [conda clean](https://conda.io/docs/commands/conda-clean.html)
- [conda config](https://conda.io/docs/commands/conda-config.html)
- [conda create](https://conda.io/docs/commands/conda-create.html)
- [conda help](https://conda.io/docs/commands/conda-help.html)
- [conda info](https://conda.io/docs/commands/conda-info.html)
- [conda install](https://conda.io/docs/commands/conda-install.html)
- [conda list](https://conda.io/docs/commands/conda-list.html)
- [conda package](https://conda.io/docs/commands/conda-package.html)
- [conda remove](https://conda.io/docs/commands/conda-remove.html)
- [conda search](https://conda.io/docs/commands/conda-search.html)
- [conda uninstall](https://conda.io/docs/commands/conda-uninstall.html)
- [conda update](https://conda.io/docs/commands/conda-update.html)
- [conda upgrade](https://conda.io/docs/commands/conda-upgrade.html)

而其他更詳細的指令參考[conda.io](https://conda.io/docs/commands/)

### Anaconda Create Standalone Environment ###

而透過 Anaconda 建立一個新的環境(以 Python 2.7 環境為例)則需要透過下面指令:

    conda create --name test_py2 python=2.7

當然也可以獨立建立一個 Pyhon 3.x 的環境:

    conda create --name test_py3 python=3.6

這邊我們可以透過以下指令查看目前已建立的環境清單:

    conda env list

![python_env_list](python_env_list.png)

而當我們想切換至 Python 2.7 環境時則透過下方指令進行切換:

    activate test_py2

這邊可以看到前面指令會顯示當前的使用環境

![pythone_active](pythone_active.png)

而這邊我們也可以隨時將環境切換至其他環境:

    activate test_py3

則時我們可以做一些測試看看環境是否會顯示不支援 Python 2.7 的寫法:

![python_3](python_3.png)

而關閉當前環境則需透過下面指令:

    deactivate

![python_deactivate](python_deactivate.png)

## References ##

-[用 Anaconda 完美解决 Python2 和 python3 共存问题](https://foofish.net/compatible-py2-and-py3.html)