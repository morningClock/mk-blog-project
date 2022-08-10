const { defaultTheme } = require('vuepress')

module.exports = {
  base: '/mk-blog-project/', // github-page部署站点的基础路径
  head: [
    // favicon
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  markdown: {
    // 解决中文资源路径问题
    extendMarkdown: md => {
      md.use(require("markdown-it-disable-url-encode"));
    }
  },
  lang: 'zh-CN',
  title: '项目开发笔记',
  description: 'MorningClock 项目笔记汇总',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      {
        text: 'MK商城',
        link: '/myproject/mk-shop/项目简介'
      },
      {
        text: 'WRAM ERP管理系统',
        link: '/myproject/wram-erp/项目简介'
      }
    ],
    sidebar: {
      // MK商城页面
      '/myproject/mk-shop/': [
        {
          title: 'MK-Shop 简介',
          path: '项目简介',
        },
        {
          title: '商城数据库设计',
          children: [
            '商城数据库设计/商品模块ER图',
            '商城数据库设计/设计店铺表',
            '商城数据库设计/设计品牌与分类表',
            '商城数据库设计/商品模块表设计',
          ]
        },
        {
          title: '前端开发总结',
          collapsible: true,
          children: [
            '前端开发总结/页面需求分析',
            '前端开发总结/关键代码总结',
            '前端开发总结/兼容性问题及处理'
          ]
        },
        {
          title: '项目优化',
          collapsible: true,
          children: [
            '项目优化/资源加载优化',
            '项目优化/用户体验优化',
            '项目优化/代码可维护性优化'
          ]
        },
        {
          title: '思考与拓展',
          collapsible: true,
          children: []
        },
      ],
      // WRAM-ERP页面
      '/myproject/wram-erp/': [
        {
          title: 'WRAM-ERP简介',
          path: '项目简介',
        },
        {
          title: '项目分析',
          children: [
            '项目分析/什么是ERP系统',
            '项目分析/功能模块需求分析',
          ]
        },
        {
          title: '前端开发总结',
          collapsible: true,
          children: [
            '前端开发总结/登录流程',
            '前端开发总结/请求封装',
            '前端开发总结/权限路由',
            '前端开发总结/路由动态生成侧边栏',
            '前端开发总结/数据看板实现',
            '前端开发总结/常见问题',
          ]
        },
        {
          title: '组件的封装与增强',
          collapsible: true,
          children: [
            '组件的封装与增强/svg-icon',
            '组件的封装与增强/树形下拉选择组件封装',
            '组件的封装与增强/配置式表格组件封装',
            '组件的封装与增强/配置式表单组件封装',
            '组件的封装与增强/封装技巧与优化总结',
          ]
        },
        {
          title: '项目优化',
          collapsible: true,
          children: [
            // '项目优化/优化概述',
            '项目优化/项目性能监控',
            '项目优化/项目打包优化',
            '项目优化/优化加载资源策略',
            // '项目优化/虚拟列表的应用与实践',
            // '项目优化/webWorker优化表单打印',
            // '项目优化/项目版本管理',
            // '项目优化/代码规范ESLint的应用'
          ]
        },
        {
          title: '思考与拓展',
          collapsible: true,
          children: [
            // '思考与拓展/埋点',
            // '思考与拓展/引导页功能',
            '思考与拓展/主题换肤',
          ]
        },
        {
          title: '日志',
          collapsible: true,
          children: [
            '开发随笔/开发记录与随笔'
          ]
        },
      ]
    }
  }
}