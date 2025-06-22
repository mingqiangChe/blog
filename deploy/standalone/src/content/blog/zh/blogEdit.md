---
title: '博客md语法格式'
date: '2025-06-21'
description: '本博客使用md写博客的一些语法'
tags: ['md语法']
author: 'Thomas che'
cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
---

# 语法

## 里面嵌套视频

```
<video controls width="720" style="max-width: 100%;">
  <source src="https://v0.stream.tencentmusic.com/0b536uaxyaab24ak4lvz2bt2b5odpt2qc7aa.f160030.mp4?dis_k=a1498656aead1de61b6fb3347289576c&dis_t=1750513461&local=1&fromtag=1231014" type="video/mp4" />
  您的浏览器不支持视频播放。
</video>
```

<video controls width="720" style="max-width: 100%;">
  <source src="https://v0.stream.tencentmusic.com/0b536uaxyaab24ak4lvz2bt2b5odpt2qc7aa.f160030.mp4?dis_k=a1498656aead1de61b6fb3347289576c&dis_t=1750513461&local=1&fromtag=1231014" type="video/mp4" />
  您的浏览器不支持视频播放。
</video>

## 图片

```
![替代文字](图片链接)
```

![Perplexity Logo](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800)

## 代码块

````
``` 一般就是这样  ```
````

## 高亮文本

```
<mark>高亮文本</mark>
```

<mark>高亮文本</mark>

## 无序列表

```
- 项目1
- 项目2

```

- 项目 1
- 项目 2

## 有序列表

```
1. 第一项
2. 第二项

```

1. 第一项
2. 第二项

## 引用

```
> 这是引用内容
```

> 这是引用内容

## 链接

```
[显示文本](https://example.com)
```

[这是链接](https://markdown.lovejade.cn/)

## 高亮代码片段

```
`代码片段`

```

`代码片段`

## 指定高亮语言

```js
console.log('Hello world');
```

## 加粗 斜体

**这是加粗文本**
_这是斜体文本_
**_这是加粗且斜体文本_**
~~这是删除线文本~~
