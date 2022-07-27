const { defaultTheme } = require('vuepress')

module.exports = {
  base: '/mk-blog-project/',
  markdown: {
    // 解决中文资源路径问题
    extendMarkdown: md => {
      md.use(require("markdown-it-disable-url-encode"));
    }
  },
  lang: 'zh-CN',
  title: 'MorningClock 笔记',
  description: 'MorningClock 项目笔记汇总',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      {
        text: '个人项目总结笔记',
        items: [
          {
            text: 'MK商城',
            link: '/myproject/mk-shop/项目简介'
          },
          {
            text: 'WRAM ERP管理系统',
            link: '/myproject/wram-erp/项目简介'
          }
        ]
      },
    ],
    sidebar: {
      // MK商城页面
      '/myproject/mk-shop/': [
        {
          title: '总结大纲',
          path: '总结大纲',
          collapsible: false,
        },
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
          children: []
        },
        {
          title: '后端开发总结',
          collapsible: true,
          children: []
        },
        {
          title: '项目优化',
          collapsible: true,
          children: []
        },
        {
          title: '思考与拓展',
          collapsible: true,
          children: []
        },
      ]
    }
  }
}