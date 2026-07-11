---
name: clink跨境支付官网首页视觉优化
overview: 严格基于Figma网站设计稿115_22512的页面结构与全部英文文案（Nav/Hero/Human-AI Agents切换/四大Feature卡片/Built for Scale/合作伙伴墙/Testimonials/Footer），完整实现静态原型；117_27203品牌手册中的点阵connect概念、橙-玫红色板、稳重扁平风格仅作为视觉样式（配色、点阵节点生长动效、字体气质）依据，不将其中文文案带入实际网站。核心交互为Human/AI Agents点击切换主题（浅色⇄暗夜代码感），配合点阵节点生长动效，并提供轻/重视觉密度对比开关。
todos:
  - id: setup-design-tokens
    content: 搭建index.html骨架与styles.css设计令牌，定义human/agent主题及light/bold密度的CSS变量体系
    status: completed
  - id: build-header-hero
    content: 实现顶部导航与Hero区：还原「Global payments for Humans and Agents」居中标题、Human/AI Agents切换开关与CTA按钮
    status: completed
    dependencies:
      - setup-design-tokens
  - id: build-node-network-animation
    content: 开发node-network.js点阵节点逐个亮起+连线生长动效模块，接入Hero背景并支持density/palette参数
    status: completed
    dependencies:
      - setup-design-tokens
  - id: build-agent-dark-mode
    content: 实现AI Agents暗夜态主题切换：左侧终端代码片段视觉、右侧Agent自动支付流程图形，标题居中不位移
    status: completed
    dependencies:
      - build-header-hero
      - build-node-network-animation
  - id: build-feature-cards
    content: 还原Features标题区与四大Feature卡片（Global Payments/Smart Routing/Billing/Your Data Any Processor）及对应UI mockup
    status: completed
    dependencies:
      - setup-design-tokens
  - id: build-capability-cards
    content: 还原三张能力小卡片（Global coverage/Secure & Stable/Simple integration/Unified Costs）
    status: completed
    dependencies:
      - setup-design-tokens
  - id: build-scale-partners-testimonials
    content: 实现Built for Scale过渡区、合作伙伴墙与客户评价墙的CSS marquee无限滚动
    status: completed
    dependencies:
      - setup-design-tokens
  - id: build-footer
    content: 实现Footer：logo、四列链接、标语、社交图标与版权信息
    status: completed
    dependencies:
      - setup-design-tokens
  - id: wire-interactions
    content: 开发main.js联调Human/Agent切换、轻重密度切换与滚动进入动效，接入IntersectionObserver
    status: completed
    dependencies:
      - build-agent-dark-mode
      - build-feature-cards
      - build-capability-cards
  - id: polish-and-review
    content: 整体视觉走查与响应式适配，核对115_22512文案与色值1:1还原，验证prefers-reduced-motion降级
    status: completed
    dependencies:
      - wire-interactions
      - build-scale-partners-testimonials
      - build-footer
---

## 用户需求

为clink跨境支付产品设计并实现官网首页原型，严格基于Figma网站设计稿（115_22512，纯英文，含完整页面结构与文案）进行还原与视觉优化，同时融入品牌手册（117_27203）中的点阵连接视觉语言、橙-玫红主色与稳重扁平的设计基调（仅作为视觉风格参考，不引入其中文文案）。

## 产品概述

一个现代科技感的跨境支付官网首页，核心叙事围绕"Global payments for Humans and Agents"，突出人类与AI Agent均可使用的全球支付能力。页面信息、板块顺序、文案全部来自115_22512设计稿，视觉呈现（配色、点阵动效、密度层级）按品牌概念与用户诉求优化。

## 核心功能

1. **顶部导航**：左侧clink logo，右侧Products/Resources/Pricing文字导航、EN语言切换、Get Started黑色胶囊按钮、Log in描边按钮。

2. **Hero主视觉区（Human / AI Agents 切换）**

- 居中标题「Global payments for Humans and Agents」+副标题「Sell to people today, and agents tomorrow — with one global payment platform.」，文案固定不变、居中构图不因切换而位移
- 居中胶囊开关：Human（默认，浅色科技感背景 #F6F6F6）/ AI Agents（点击后整屏切换为暗夜模式，参考Footer的#0A0A0A基调），暗夜态左右两侧展示终端代码风格图形与AI自动化支付流程可视化（纯视觉呈现，不新增营销文案）
- 两个CTA按钮：Start Building / Explore Agent Payments
- 切换及首次进入时触发"点阵节点逐个亮起+连线生长"动效，呼应clink点阵logo概念

3. **Features板块**：渐变文字标签"Features"+主标题+描述（沿用设计稿原占位文案），下接四张大卡片（Global Payments / Smart Routing / Billing / Your Data Any Processor），每张左侧文案+CTA、右侧还原对应UI mockup（支付方式网格、路由表单、营收图表+余额卡片、订阅计划卡片）

4. **三张能力小卡片**：Global coverage / Secure & Stable / Simple integration（含完整信用卡表单mockup）/ Unified Costs（四胶囊+迷你报表），浅灰背景区块内呈现

5. **过渡标题区**："Built for Scale." + 渐变"Ready for Anywhere."

6. **合作伙伴墙**：Cooperation partners标题+说明，双行logo卡片横向无限滚动，边缘白色渐变遮罩

7. **客户评价墙**：Trusted by Product Builders标题+说明，多列评价卡片纵向无限滚动

8. **Footer**：暗黑背景+白色clink logo，四列链接（Products/Resources/Company/Compare）、标语"Scale Global, Bill Local."、社交图标、版权信息

## 视觉与风格要求

- 现代科技感、扁平化、适量渐变（避免强光效/玻璃拟态厚重光效），主色沿用设计稿已有的橙→玫红渐变（#ED7039→#EC7193），与品牌手册色板一致
- AI Agents暗夜态可点缀品牌手册中的冷色（紫#9B79FB、蓝#2C4AFC）
- 背景不做过重图形装饰，以信息内容为主导
- 提供"轻量版/重量版"两种视觉密度，同页面一键切换对比（控制留白、渐变透明度、卡片阴影、节点动效密度）
- 字体体系融合设计稿字重分级（大标题/副标题/正文/按钮/图表小字），实际渲染使用英文无衬线字体替代Figma中的中文字体占位映射

## 技术栈

- 纯静态原型：HTML5 + CSS3（自定义属性做设计令牌）+ 原生JavaScript（无构建工程、无框架依赖），符合用户"快速可视化验证"的诉求
- 动效：Canvas 2D绘制点阵节点网络（自绘，逐节点淡入+连线生长），配合CSS transition做主题切换过渡
- 排版基准：以设计稿1440px为基准宽度，使用CSS clamp()/百分比与媒体查询做响应式（桌面1024px+/平板768-1024px/移动320-768px）

## 实现思路与关键决策

1. **信息来源单一化**：所有可见文案、板块结构、图标严格取自115_22512（画布HTML与assets/CodeBuddyAssets/115_22512/目录），不引入117_27203的中文品牌文案；117_27203仅提供三类可复用的"视觉语言"输入：点阵连线的动效逻辑参考、紫/蓝冷色点缀值、扁平稳重的整体基调判断依据。此举避免信息来源混淆导致的返工。

2. **Human/AI Agents双态机制**：在`<body>`或Hero容器上使用`data-mode="human|agent"`属性驱动一套CSS变量（背景色、文本色、卡片配色、左右信息区内容显隐），标题/副标题DOM结构保持不动、始终居中，只切换其背景层与两侧装饰层，从根本上保证"标题不位移"的要求。切换动画使用Vercel设计原则的缓动`cubic-bezier(0.175,0.885,0.32,1.1)`，时长200-300ms，柔和渐变而非闪烁。AI Agents态的左右信息区为原创视觉设计：左侧用等宽字体（JetBrains Mono/或系统mono字体）模拟API调用代码片段的静态展示卡片，右侧用点阵节点连线图形+简化流程图形表现"Agent自动支付"概念，均为纯视觉装饰，不新增文案语句。

3. **点阵节点生长动效模块化**：独立封装`node-network.js`，基于Canvas在指定容器内生成一组随机/网格分布的节点，通过`requestAnimationFrame`控制节点按时间序列fade-in，并向邻近节点绘制连线（用长度插值模拟"生长"过程），提供`density`参数（对接轻/重密度开关）与`palette`参数（对接human浅色/agent暗夜配色），一套逻辑同时服务于Hero背景装饰与Human/Agent切换转场，避免重复实现（DRY）。动效模块在组件卸载或页面切换时清理定时器/动画帧，避免内存泄漏；遵循`prefers-reduced-motion`时降级为静态点阵图案。

4. **轻/重视觉密度切换**：在`<html>`或`<body>`上维护`data-density="light|bold"`，驱动一组CSS变量（阴影强度、渐变不透明度、节点动效数量、区块留白倍数、卡片描边粗细）。"轻量版"更克制留白（接近Vercel Geist的低调质感），"重量版"渐变与节点连线存在感更强、卡片阴影更明显，但两版都不做强光效/玻璃拟态。用一份HTML+一套变量的两组取值实现，不维护两份页面，降低维护成本。

5. **复杂UI mockup的还原深度控制**：四张Feature大卡片与三张小卡片中的支付表单、图表卡片、余额卡片、路由表单等，按"简化静态视觉还原"策略实现——用HTML/CSS搭建卡片骨架、保留关键文案与图标位置关系、必要的图标直接引用assets/CodeBuddyAssets/115_22512/目录原有SVG素材，不做可交互的真实表单逻辑（无实际输入校验），以控制原型工作量同时保证视觉真实感。

6. **无限滚动实现**：合作伙伴墙（横向）与客户评价墙（纵向）使用CSS `@keyframes` + `animation: linear infinite`做纯CSS marquee循环滚动（复制一份内容首尾相接以实现无缝循环），避免JS定时器带来的性能开销，鼠标悬浮时`animation-play-state: paused`增强可交互感。

7. **性能与规范**：图片资源直接引用现有182个SVG/PNG原图（img标签统一加`onerror`容错处理，避免资源缺失导致布局塌陷）；Canvas节点动效限制节点数量上限（如轻量版≤40个、重量版≤80个）避免掉帧；CSS渐变与阴影参数控制在Vercel设计规范的"轻量阴影"范围内（如`0 2px 2px rgba(0,0,0,0.04)`量级），不引入强光效果。

## 目录结构

```
coding/
├── index.html                          # [NEW] 单页原型：Header + Hero(Human/Agent切换) + Features标题区 + 四大Feature卡片 + 三张能力小卡片 + Built for Scale过渡区 + 合作伙伴墙 + 客户评价墙 + Footer，内含轻/重密度切换按钮
├── assets/
│   ├── css/
│   │   └── styles.css                  # [NEW] 设计令牌(颜色/字体/间距/圆角/阴影) + human/agent主题变量 + light/bold密度变量 + 各板块布局样式 + marquee滚动动画
│   ├── js/
│   │   ├── main.js                     # [NEW] Human/Agent切换与轻重密度切换交互逻辑、data-mode/data-density状态管理、滚动进入动效触发(IntersectionObserver)
│   │   └── node-network.js             # [NEW] Canvas点阵节点逐个亮起+连线生长动效模块，支持density与palette参数，供Hero背景与切换转场复用
│   └── CodeBuddyAssets/115_22512/      # [REUSE] 现有1-182号svg图标与png素材，原样引用于导航/按钮/UI mockup/logo/社交图标
```