(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{301:function(e,t,a){e.exports=a.p+"assets/img/image-20220801170251162.7839b93f.png"},302:function(e,t,a){e.exports=a.p+"assets/img/路由动态生成侧边栏流程图.c7828806.jpg"},345:function(e,t,a){"use strict";a.r(t);var s=a(13),v=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"路由动态生成侧边栏原理与实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#路由动态生成侧边栏原理与实现"}},[e._v("#")]),e._v(" 路由动态生成侧边栏原理与实现")]),e._v(" "),t("h2",{attrs:{id:"sidebar侧边栏实现分析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sidebar侧边栏实现分析"}},[e._v("#")]),e._v(" SideBar侧边栏实现分析")]),e._v(" "),t("h3",{attrs:{id:"功能需求"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#功能需求"}},[e._v("#")]),e._v(" 功能需求")]),e._v(" "),t("p",[t("img",{attrs:{src:a(301),alt:"image-20220801170251162"}})]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("1. PC端侧边栏可以通过点击侧边栏控制按钮，改变侧边栏的占位宽度。\n   - 展开状态：显示侧边栏选项图标及标题\n   - 收缩状态：仅显示选项图标\n2. Mobile端侧边栏不占位显示，通过点击侧边栏控制按钮改变状态\n   - 展开状态：显示侧边栏，并有灰色蒙层，点击蒙层可以隐藏侧边栏\n   - 收缩状态：什么也不显示\n")])])]),t("h3",{attrs:{id:"实现分析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实现分析"}},[e._v("#")]),e._v(" 实现分析")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("侧边栏的占位样式设计")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("定义一个"),t("code",[e._v("$sideBarWidth")]),e._v("控制侧边栏占位宽度。")])]),e._v(" "),t("li",[t("p",[e._v("侧边栏使用"),t("code",[e._v("fixed")]),e._v("定位布局，使其浮动起来。")])]),e._v(" "),t("li",[t("p",[e._v("内容区域使用"),t("code",[e._v("margin-left")]),e._v("撑开一个"),t("code",[e._v("$sideBarWidth")]),e._v("，提供给sidebar展示。")])])]),e._v(" "),t("p",[e._v("设计说明：由于需要考虑到移动端时，侧边栏需要浮动起来，干脆直接使用定位布局，避免大量CSS的变动。")])]),e._v(" "),t("li",[t("p",[e._v("切换显隐状态")]),e._v(" "),t("p",[e._v("父级容器使用样式接管sidebar的显示和隐藏状态")])]),e._v(" "),t("li",[t("p",[e._v("检测设备，使用不同的显示方案")]),e._v(" "),t("p",[e._v("​\t使用"),t("code",[e._v("resize")]),e._v("事件，监听浏览器窗口的宽度变化"),t("code",[e._v("body.getBoundingClientRect()")]),e._v("，设计宽度阈值，达到阈值时标记为移动设备，使用"),t("code",[e._v("mobile")]),e._v("样式，进行CSS盖写实现切换状态。")])])]),e._v(" "),t("h2",{attrs:{id:"路由动态生成侧边栏"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#路由动态生成侧边栏"}},[e._v("#")]),e._v(" 路由动态生成侧边栏")]),e._v(" "),t("h3",{attrs:{id:"功能需求-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#功能需求-2"}},[e._v("#")]),e._v(" 功能需求")]),e._v(" "),t("ul",[t("li",[e._v("[x] 根据路由表生成菜单")]),e._v(" "),t("li",[e._v("[x] 嵌套路由渲染")]),e._v(" "),t("li",[e._v("[x] 外链型菜单选项实现")])]),e._v(" "),t("h3",{attrs:{id:"实现思路"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实现思路"}},[e._v("#")]),e._v(" 实现思路")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('思路：\n1.获取路由表(store/promise.js)\n2.根据路由表，进行递归渲染组件\n\t路由表设置了hidden为true时，不渲染该路由的导航\n\t路由表中路由信息，只有一个children的时候，作为一级路由渲染导航\n\t\n情况分析：\n一、路由无child，且不需要生成导航\n\t路由配置hidden:true\n二、路由无子节点，只有根节点\n\t渲染生成<el-menu-item>\n三、路由需要生成导航，但只有一个“可见”child\n\t渲染生成<el-menu-item>\n\t组件使用：\n        <i class="el-icon-menu"></i>\n        <span slot="title">导航二</span>\n四、路由由多个child组成\n\t1.渲染<el-submenu>生成子菜单\n\t\t菜单项使用<el-menu-item>渲染\n\t2.如果child-route还有child就是子菜单还包含子菜单\n\t\t递归渲染该submenu\n\t\t\n注意: element-ui 导航router模式 需要配置<el-menu-item :index> index必须为路由的完整path，所以嵌套路由的子路由是需要拼接的\nelement-admin中的方式 是使用递归渲染时，每次都传入baseUrl用作拼接，使用path库的resolve可以确保路径的拼写正确性。\n')])])]),t("h3",{attrs:{id:"流程图"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#流程图"}},[e._v("#")]),e._v(" 流程图")]),e._v(" "),t("p",[t("img",{attrs:{src:a(302),alt:"路由动态生成侧边栏流程图"}})]),e._v(" "),t("h3",{attrs:{id:"遇到的问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#遇到的问题"}},[e._v("#")]),e._v(" 遇到的问题")]),e._v(" "),t("ul",[t("li",[t("p",[t("code",[e._v("submenu")]),e._v("关闭定位异常闪动")]),e._v(" "),t("p",[e._v("解决方案：子级菜单使用"),t("code",[e._v("popper-append-to-body")]),e._v("是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性。")]),e._v(" "),t("p",[e._v("原因：由于菜单是由elementui编写的一个js动画，由于我们样式的覆盖，可能会导致offsetParent参考对象不正常，导致动画事件和样式参考对象发生变化，从而导致一些定位错误。使用"),t("code",[e._v("popper-append-to-body")]),e._v("可以让元素根据body进行参考，避免定位错误。")])]),e._v(" "),t("li",[t("p",[e._v("如何让"),t("code",[e._v("menuItem")]),e._v("组件跳转外链")]),e._v(" "),t("p",[e._v("解决方案: 在"),t("code",[e._v("menuItem")]),e._v("外添加a标签包裹，并使用动态属性绑定，检测路由如果是外链则不绑定"),t("code",[e._v("index")]),e._v("属性（"),t("code",[e._v("menu")]),e._v("路由模式会路由跳转到"),t("code",[e._v("index")]),e._v("）。")])])])])}),[],!1,null,null,null);t.default=v.exports}}]);