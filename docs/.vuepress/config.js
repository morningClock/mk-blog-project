const { defaultTheme } = require('vuepress')

module.exports = {
  lang: 'zh-CN',
  title: 'MorningClock 笔记',
  description: 'MorningClock 项目笔记汇总',
  theme: defaultTheme({
    navbar: [
      { text: '主页', link: '/' },
      {
        text: '个人项目总结笔记',
        children: [
          {
            text: 'MK商城',
            link: '/myproject/mk-shop/项目简介.md',
            // 该元素将一直处于激活状态
            activeMatch: '/myproject/mk-shop',
          },
          {
            text: 'WRAM ERP管理系统',
            link: '/myproject/wram-erp/项目总结.md',
            // 该元素将一直处于激活状态
            activeMatch: '/myproject/wram-erp',
          }
        ]
      },
    ],
    sidebar: {
      '/myproject/mk-shop/': [
        {
          text: 'MK-Shop 简介',
          collapsible: true,
          children: ['总结大纲', '项目简介']
        },
        {
          text: '项目总结',
          collapsible: true,
          children: []
        },
        {
          text: '项目优化',
          collapsible: true,
          children: []
        },
        {
          text: '思考与拓展',
          collapsible: true,
          children: []
        },
      ]
    }
  })
}