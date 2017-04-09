---
layout: post
title: CSV to Markdown Table Generator
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-06 12:19:10
categories:
- Tool
tags:
- Markdown
---

介紹一個CSV轉Markdown Table的工具與函式庫

<!-- More -->

因為寫作上需要，常常會有要撰寫Markdown Table的需求，這邊分享一下最近找到的一個函式庫 - [CSV To Markdown Table](https://github.com/donatj/CsvToMarkdownTable)

# General Using #

原先都是使用[Markdown Tables Generator](http://www.tablesgenerator.com/markdown_tables)幫我產出Table後在一筆筆的放入資料，而今天介紹的[CSV To Markdown Table](https://github.com/donatj/CsvToMarkdownTable)則是可以幫我們直接將既有的CSV資料直接匯出markdown table格式，簡化我們的人工編輯時間．

從[Live Demo](https://donatstudios.com/CsvToMarkdownTable) 可以簡單地看到我們可以將CSV貼入網站後轉出對應的markdown語法後我們就可以貼入文章內做使用．

![intro](intro.png)

# Source Code and Library Reference #

這個函式庫的使用很簡單，只需要載入後使用下面這一行呼叫即可以轉出我們要的markdown語法結果

而我們進一步地看他的原始碼(.js),其實就是幫我們把語法做parsing後進行分割處理

    "use strict";

    /**
    * Converts CSV to Markdown Table
    *
    * @param {string} csvContent - The string content of the CSV
    * @param {string} delimiter - The character(s) to use as the CSV column delimiter
    * @param {boolean} hasHeader - Whether to use the first row of Data as headers
    * @returns {string}
    */
    function csvToMarkdown( csvContent, delimiter, hasHeader ) {
        if( delimiter != "\t" ) {
            csvContent = csvContent.replace(/\t/g, "    ");
        }
        var columns = csvContent.split("\n");

        var tabularData = [];
        var maxRowLen = [];

        columns.forEach(function( e, i ) {
            if( typeof tabularData[i] == "undefined" ) {
                tabularData[i] = [];
            }

            var row = e.split(delimiter);

            row.forEach(function( ee, ii ) {
                if( typeof maxRowLen[ii] == "undefined" ) {
                    maxRowLen[ii] = 0;
                }

                maxRowLen[ii] = Math.max(maxRowLen[ii], ee.length);
                tabularData[i][ii] = ee;
            });
        });

        var headerOutput = "";
        var seperatorOutput = "";

        maxRowLen.forEach(function( len ) {
            var spacer;
            spacer = Array(len + 1 + 2).join("-");
            seperatorOutput += "|" + spacer;

            spacer = Array(len + 1 + 2).join(" ");
            headerOutput += "|" + spacer;
        });

        headerOutput += "| \n";
        seperatorOutput += "| \n";

        if( hasHeader ) {
            headerOutput = "";
        }

        var rowOutput = "";
        var initHeader = true;
        tabularData.forEach(function( col ) {
            maxRowLen.forEach(function( len, y ) {
                var row = typeof col[y] == "undefined" ? "" : col[y];
                var spacing = Array((len - row.length) + 1).join(" ");

                if( hasHeader && initHeader ) {
                    headerOutput += "| " + row + spacing + " ";
                } else {
                    rowOutput += "| " + row + spacing + " ";
                }
            });

            if( hasHeader && initHeader ) {
                headerOutput += "| \n";
            } else {
                rowOutput += "| \n";
            }

            initHeader = false;
        });

        return headerOutput + seperatorOutput + rowOutput;
    }

    if(typeof module != "undefined") {
        module.exports = csvToMarkdown;
    }

這樣短小精幹的程式碼真是太棒了！有興趣的朋友請關注作者並給予肯定！