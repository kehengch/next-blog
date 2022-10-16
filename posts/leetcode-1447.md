---
title: LeetCode每日一题-1447. 最简分数（2022-2-10）
date: "2022-02-10 14:09:52"
tags: 
- JavaScript
- leetcode
author: 陈科衡
categories:
- JavaScript
- leetcode

slug: leetcode1447
---
## 题目

> 给你一个整数 n ，请你返回所有 0 到 1 之间（不包括 0 和 1）满足分母小于等于  n 的 最简 分数 。分数可以以 任意 顺序返回。

其中： `1 <= n <= 100`


示例 1：
> 输入：n = 2  
> 输出：["1/2"]  
> 解释："1/2" 是唯一一个分母小于等于 2 的最简分数。  

示例 2：
> 输入：n = 4  
> 输出：["1/2","1/3","1/4","2/3","3/4"]  
> 解释："2/4" 不是最简分数，因为它可以化简为 "1/2" 。  

<!--more-->

## 题解

这一题并不难，关键在于 **最简分数** ，在于如何排除分子分母可以相互约去的分数；

### 数学法
利用最大公约数的办法，求分子分母的最大公约数；如果最大公约数是1，则证明分子分母不可以相互约去，是**最简分数**。
求最大公约数（Greatest Common Divisor，缩写为GCD）可以使用`gcd`函数，有的语言内置 `gcd` 函数 ；

js里没有，需要创建一个`gcd`函数来求最大公约数（[辗转相除法](https://baike.baidu.com/item/%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E7%AE%97%E6%B3%95/1647675?fr=aladdin)）；

#### 代码
JavaScript:
```javascript
var simplifiedFractions = function(n) {
    // gcd求最大公约数
    const gcd = (a,b)=>{
        return b===0?a:gcd(b,a%b);
    }
    let re = [];
    for(let i = 2;i<=n;i++){
        for(let j = 1;j<i;j++){
            // 如果最大公约数是1，则证明分子分母不可以相互约去，是最简分数
            if(gcd(j,i) == 1){
                re.push(`${j}/${i}`);
            }
        }
    }
    return re;
};
```
Python3:
``` python
class Solution:
    def simplifiedFractions(self, n: int) -> List[str]:
        re = []
        for i in range(2,n+1):
            for j in range(1,i):
                if math.gcd(j,i) == 1:
                    re.append('{}/{}'.format(j,i));
        return re
```

### 哈希表法
利用哈希表，用 `分子/分母` 当做键，可以完美去除 分子分母可以相互约去的分数。

#### 代码
JavaScript:
```javascript
var simplifiedFractions = function(n) {
    const map = new Map();
    for(let i = 2;i<=n;i++){
        for(let j = 1;j<i;j++){
            if(!map.has(j/i)){
                map.set(j/i,`${j}/${i}`);
            }
        }
    }
    return [...map.values()];
};
```
