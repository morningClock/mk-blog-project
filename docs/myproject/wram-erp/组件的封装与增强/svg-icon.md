# SVG-ICON

> 在项目中，我们经常会遇到图标的需求，一般的图标处理的方案
>
> - image引入
> - 雪碧图
> - 图标字体iconfont/font-awesome
> - SVG Sprite icon
>
> 此处我们使用的svg来进行图标处理，svg的好处在于占用内存相对较小，清晰度较好，无尺寸限制，可以动态修改图标等优点。
>
> 参考文章： 
>
> - https://juejin.cn/post/6981836039463632932
> - https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/
> - https://www.zhangxinxu.com/wordpress/2016/02/svg-compress-tool-svgo-experience/
> - https://juejin.cn/post/6844903517564436493

## 前置知识

### svg sprite概念

- `symbol`

  ```html
  <!-- 第1个图标集合 -->
  <svg>
      <symbol>
          <!-- 第1个图标路径形状之类代码 -->
      </symbol>
      <symbol>
          <!-- 第2个图标路径形状之类代码 -->
      </symbol>
      <symbol>
          <!-- 第3个图标路径形状之类代码 -->
      </symbol>
  </svg>
  ```

- `use`

  1. 使用`<symbol>`定义图标
  2. 在使用处通过`<use xlink:href="#symbolId">`放置元素

  ```html
   <!-- 1.定义的图标集合 -->
  <svg>
      <symbol id="myicon">
          <!-- 第1个图标路径形状之类代码 -->
      </symbol>
  </svg>
   <!-- 2.放置 -->
  <svg>
  	<use xlink:href="#myicon"></use>
  </svg>
  ```

### svg-sprite-loader

#### 作用

`svg-sprite-loader`将`svg`资源加载，并生成`<symbol>`图标集合，只要在指定的地方`<use>`即可使用。

#### 原理

- svg-sprite-loader会把你的icon塞到一个个symbol中，

- symbol的id如果不特别指定，就是你的文件名。

- 它最终会在你的html中嵌入一个大的svg

  例：

  ```html
  <body>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="__SVG_SPRITE_NODE__">
        <symbol xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" id="icon1">// id 是 icon 名
  		<!-- 这块是 path -->
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" id="icon2">// id 是 icon 名
  		<!-- 这块是 path -->
        </symbol>
      </svg>
  </body>
  ```

#### 使用和配置

1. 安装

   ```bash
   npm i -D svg-sprite-loader
   yarn add --dev svg-sprite-loader
   ```

2. webpack配置

   ```js
   {
     test: /\.svg$/,
     loader: 'svg-sprite-loader',
     options: {
     	...
     }
   }
   ```

3. icon使用

   ```html
   <svg>
     <use xlink:href="#svgName"/> 
   </svg>
   ```

### svgo-loader

> - [参考张鑫旭大佬的博客](https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2016%2F02%2Fsvg-compress-tool-svgo-experience%2F)
> - [github](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsvg%2Fsvgo)

#### 作用

- 改变svg-icon元素的样式和颜色等
- 是 svg 优化器，包含很多插件。
- 主要用于删除和修改SVG元素，折叠内容，移动属性等等等等。

#### 原理

- SVGO 将 SVG-as-XML 数据转换为 SVG-as-JS AST 表示形式。
- 然后在所有AST数据项上运行并执行一些操作，最后，SVGO 再将 AST 转换回 SVG-as-XML 数据字符串。

#### 使用和配置

1. 安装

```bash
yarn add --dev svgo-loader
复制代码
```

2. webpack

```js
 {
      test: /\.svg$/,
      use: [
        {loader: 'svg-sprite-loader', options: {}},
        {
          loader: 'svgo-loader', options: {
            // plugins: [
            //   {removeAttrs: {attrs: 'fill'}}
            // ]
          }
        }
      ]
},
复制代码
```

- 注意：先svgo-loader，再svg-sprite-loader。先处理svg图像，在生成雪碧图

3. 改颜色通过fill属性实现



### requireContext批量引入

> [require.context 批量引入依赖](https://webpack.docschina.org/guides/dependency-management/#requirecontext)

- `require.context(directory, useSubdirectories, regExp, mode = 'sync')`
  - **directory**:表示检索的目录
  - **useSubdirectories**：表示是否检索子文件夹
  - **regExp**:匹配文件的正则表达式,一般是文件名
  - **mode**:加载模式，同步/异步

使用案例：

```js
// 获取引入上下文
const req = require.context('./svg', true, /\.svg$/)
// 导入函数
const requireAll = (requireContext) => requireContext.keys().forEach(requireContext);
// 引入
requireAll(req);
```



## SvgIcon组件封装

1. `vue.config.js`配置loader

   ```js
     chainWebpack: (config) => {
       // 避免指定目录svg资源被其它loader加载编译
       config.module
         .rule('svg')
         .exclude.add(resolve('src/icons'))
         .end()
       // 加载资源
       config.module
         .rule('icons')
         .test(/\.svg$/)
         // 配置匹配src/icon下svg
         .include
         .add(resolve('src/icons'))
         .end()
         // loader选项
         .use('svg-sprite-loader')
         .loader('svg-sprite-loader')
         .options({
           symbolId: 'icon-[name]'
         })
         .end()
     },
   ```

2. `svg-icon`组件封装

   `SvgIcon.vue`

   ```vue
   <template>
     <svg class="svg-icon">
       <use :xlink:href="iconName"></use>
     </svg>
   </template>
   
   <script>
   export default {
     props: {
       icon: {
         type: String,
         required: true,
       },
     },
     computed: {
       iconName() {
         return "#icon-" + this.icon;
       },
     },
   };
   </script>
   
   <style scoped>
   .svg-icon {
     width: 1em;
     height: 1em;
     vertical-align: -0.15em;
     fill: currentColor;
     overflow: hidden;
   }
   </style>
   ```

3. 注册并引入`svg`资源

   `icons/index.js`

   ```js
   import Vue from 'vue'
   import SvgIcon from '@/components/SvgIcon'// svg component
   
   // 全局注册svg-icon组件
   Vue.component('svg-icon', SvgIcon)
   
   // ## reference: https://webpack.docschina.org/guides/dependency-management/#context-module-api
   // request: 获取所有svg/目录下所有svg引入所需的上下文
   const req = require.context('./svg', true, /\.svg$/)
   // 导入函数
   const requireAll = (requireContext) => requireContext.keys().forEach(requireContext);
   // 引入
   requireAll(req);
   ```

   

## svgo优化图标

> [SVG精简压缩工具svgo简介和初体验 - 张鑫旭](https://www.zhangxinxu.com/wordpress/2016/02/svg-compress-tool-svgo-experience/)
>
> [svgo 在线压缩与配置](https://jakearchibald.github.io/svgomg/)

​	因为导出的SVG，通常包含大量的无用信息，例如编辑器源信息，注释，因此元素，默认或者非最优值，以及其他一些不会影响渲染结果的可以移除或转换的内容。

​	而SVGO就是专门用于优化svg结构与信息的一个插件，它基于插件模式构建，基本上所有的优化都是一个分离的插件。

### 优化实现

#### 配置loader加载时压缩

> 建议：由于加载该loader，默认配置项实在是太少，需要手动去编写多项配置项，不推荐此方法实现，推荐使用方案二的`svgo`指令进行默认打包，其默认项可以优化大概50%的性能问题，简化svg结构，而且配置也十分方便。

- 安装

  ```bash
  cnpm i svgo-loader -D
  ```

- 配置

  ```js
      config.module
        .rule('icons')
        .test(/\.svg$/)
        // 配置匹配src/icon下svg
        .include.add(resolve('src/icons'))
        .end()
        // loader选项
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
        .use('svgo-loader')
        .loader('svgo-loader')
        .options({
          // 1.内部配置
          // plugins: [
          //   {
          //     // 配置参考: https://github.com/svg/svgo/blob/main/plugins/removeAttrs.js
          //     name: 'removeAttrs',
          //     params: {
          //       attrs: 'fill'
          //     }
          //   }
          // ],
          // 2.外部配置
          configFile: resolve('src/icons/svgo.config.js')
        })
        .end()
  ```

- `svgo.config.js`

  ```js
  // reference: https://github.com/svg/svgo#configuration
  module.exports = {
    plugins: [
      'preset-default', // 应用默认配置
      {
        name: "removeAttrs", // 移除属性
        params: {
          attrs: "fill"
        }
      }
    ],
  };
  ```



#### 使用`svgo`预压缩（推荐）

- 安装

  ```bash
  // 安装
  cnpm i svgo -D
  ```

- 指令详解

  ```sql
    svgo [OPTIONS] [ARGS]
  
  Options:
    -h, --help : Help 帮助
    -v, --version : Version版本
    -i INPUT, --input=INPUT : 输入的文件, "-" 为标准输入
    -s STRING, --string=STRING : 输入SVG数据字符串
    -f FOLDER, --folder=FOLDER : 输入的文件夹，会优化与重写所有的*.svg文件
    -o OUTPUT, --output=OUTPUT : 输入的文件或文件夹 (默认同输入), "-" 标准输出
    -p PRECISION, --precision=PRECISION : 设置数字的小数部分，重写插件参数
    --config=CONFIG : 配置文件扩展或替换默认设置
    --disable=DISABLE : 根据名字禁用插件
    --enable=ENABLE : 根据名字开启插件
    --datauri=DATAURI : 输入文件以Data URI字符串形式(base64, URI encoded or unencoded)
    -q, --quiet : 仅输出错误信息，不包括正常状态消息
    --pretty : 让SVG漂亮的打印
    --show-plugins : 显示可用和存在的插件
  
  Arguments:
    INPUT : 别名 --input
    OUTPUT : 别名 --output
  ```

- 配置文件

  ```yml
  module.exports = {
    plugins: [
      'preset-default',
      {
        name: "removeAttrs",
        params: {
          attrs: "fill"
        }
      }
    ],
  };
  ```

- 配置指令

  `package.json`

  ```js
  // 压缩
  scripts: {
  	// 同样可以使用config.js作为配置项
      // 配置为覆盖源文件，并使用yml作为压缩配置
  	"svgo" : "svgo -f src/icons/svg --config=src/icons/svgo.yml"
  }
  ```

### 优化效果

- 优化前

  ```svg
  <?xml version="1.0" encoding="utf-8"?>
  
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg version="1.1" id="Layer_3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  	 width="50px" height="49.68px" viewBox="0 4.83 50 49.68" enable-background="new 0 4.83 50 49.68" xml:space="preserve">
  <rect x="1.438" y="6.232" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" width="47.125" height="46.875"/>
  <polyline fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" points="1.755,44.13 14.375,31.875 
  	23.5,38.625 37.25,23.125 48.25,31.625 "/>
  <path fill="none" stroke="#F45389" stroke-linecap="round" stroke-linejoin="round" d="M42.169,24.085
  	c0.364-0.791,0.567-1.67,0.567-2.598c0-3.444-2.792-6.236-6.236-6.236s-6.236,2.792-6.236,6.236c0,1.51,0.537,2.895,1.431,3.975"/>
  </svg>
  
  ```

- 优化后

  ```bash
  test.svg:
  Done in 8 ms!
  0.908 KiB - 51.4% = 0.441 KiB
  ```

  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="49.68" viewBox="0 4.83 50 49.68"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M1.438 6.232h47.125v46.875H1.438z"/><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M1.755 44.13l12.62-12.255 9.125 6.75 13.75-15.5 11 8.5"/><path stroke="#F45389" stroke-linecap="round" stroke-linejoin="round" d="M42.169 24.085a6.236 6.236 0 1 0-10.474 1.377"/></svg>
  ```

### 