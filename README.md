目录结构

```
├── dist                             
|   ├── pro
|   └── dev
├── src
│   ├── lib                          # 第三方插件
│   │   └── jquery
|   |       └── 1.11.3
│   │           └── src
│   │               └── jquery.js
│   └── 模块名                   
│       └── 子模块名   
|           └── 版本号               
│               ├── src
|               |   ├── style.css/scss
|               |   └── script.js/es6
│               └── html
│                   └── page.html
└── ...
```


```shell
npm run dev
```

```shell
npm run build
```

```shell
gulp watch
```
