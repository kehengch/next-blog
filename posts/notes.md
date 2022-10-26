---
title: marked-note
date: "2022-10-26 17:09:52"
tags: note
author: 陈科衡
categories: note
---

## Usage

you can use `info` `danger` `warning` `success` `note`  as their theme;

```js
import { marked } from "marked";
import markedNote from "marked-note-extension";

marked.use(markedNote);

const content = marked.parse(`!!! info Publish ESM and CJS in a single package
In the past decade, due to the lack of a standard module system of \`JavaScript\`, **CommonJS** (a.k.a the \`require('xxx')\` and \`module.exports\` syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.
!!!`);

console.log(content);
```

or use markdown:
```text
::: info Publish ESM and CJS in a single package
In the past decade, due to the lack of a standard module system of \ `JavaScript\` , **CommonJS** (a.k.a the \ `require('xxx')\`  and \ `module.exports\`  syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.
:::
```

Output: 
```html
<div class="note note-info">
    <p class="note-title">Publish ESM and CJS in a single package</p>
    <div class="note-body">
        <p>In the past decade, due to the lack of a standard module system of <code>JavaScript</code>, <strong>CommonJS</strong> (a.k.a the <code>require(&#39;xxx&#39;)</code> and <code>module.exports</code> syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.</p>
    </div>
</div>
```

### reference resources
- [marked-admonition-extension](https://github.com/xiefucai/marked-admonition-extension)

## marked-note-extensin 使用示例
注意：样式需要自己设定哦！

### 示例

!!! note note 
In the past decade, due to the lack of a standard module system of \ `JavaScript\` , **CommonJS** (a.k.a the \ `require('xxx')\`  and \ `module.exports\`  syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.
!!!


!!! info info
In the past decade, due to the lack of a standard module system of \ `JavaScript\` , **CommonJS** (a.k.a the \ `require('xxx')\`  and \ `module.exports\`  syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.
!!!

!!! danger danger
In the past decade, due to the lack of a standard module system of \ `JavaScript\` , **CommonJS** (a.k.a the \ `require('xxx')\`  and \ `module.exports\`  syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.
!!!

!!! warning warning
In the past decade, due to the lack of a standard module system of \ `JavaScript\` , **CommonJS** (a.k.a the \ `require('xxx')\`  and \ `module.exports\`  syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.
!!!

!!! success success
In the past decade, due to the lack of a standard module system of \ `JavaScript\` , **CommonJS** (a.k.a the \ `require('xxx')\`  and \ `module.exports\`  syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.
!!!