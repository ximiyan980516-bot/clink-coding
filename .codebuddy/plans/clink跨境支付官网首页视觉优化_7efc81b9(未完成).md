---
name: clink跨境支付官网首页视觉优化
overview: 基于Figma品牌手册（clink点阵连接概念、橙色/玫红主色+紫蓝点缀色、方正简体/PingFang字体体系），设计并实现一版跨境支付产品首页原型：Hero区支持human/ai agent点击切换（human=浅色现代科技感，ai agent=暗夜模式+左右代码/图片信息+居中标题构图），下方3-4张产品能力卡片，配合点阵节点亮起+连线生长的矢量动效；同一页面内置"轻/重"两种视觉密度的一键切换按钮供对比；纯静态HTML+CSS+JS实现，文案完全沿用Figma手册原文。
design:
  architecture:
    framework: html
  styleKeywords:
    - 现代科技感
    - 扁平化
    - 点阵连接
    - 适量渐变
    - 稳重克制
    - 信息优先
  fontSystem:
    fontFamily: PingFang SC
    heading:
      size: 96px
      weight: 600
    subheading:
      size: 40px
      weight: 400
    body:
      size: 18px
      weight: 400
  colorSystem:
    primary:
      - "#FF7042"
      - "#FF9F05"
      - "#FF9EF0"
    background:
      - "#FFFFFF"
      - "#FAFAFA"
      - "#0C0C0C"
      - "#171717"
    text:
      - "#171717"
      - "#FFFFFF"
      - "#6F6F6F"
    functional:
      - "#2C4AFC"
      - "#9B79FB"
todos:
  - id: setup-design-tokens
    content: 搭建index.html骨架与styles.css设计令牌，定义明暗主题及轻/重密度的CSS变量体系
    status: pending
  - id: build-hero-section
    content: 实现Hero主视觉区：居中还原"连接Connect"文案，开发human/ai agent点击切换明暗模式与左右图文
    status: pending
    dependencies:
      - setup-design-tokens
  - id: build-node-network-animation
    content: 开发node-network.js点阵节点逐个亮起+连线生长动效模块，接入Hero背景并支持密度参数
    status: pending
    dependencies:
      - setup-design-tokens
  - id: build-capability-cards
    content: 构建产品核心能力卡片区，复用Figma"块面重叠/几何穿插/点阵节点/光线轨迹"原文案与15/17/18图
    status: pending
    dependencies:
      - setup-design-tokens
  - id: build-brand-footer
    content: 实现品牌视觉收尾区与页脚，用14/16.png及品牌渐变条呈现氛围，不含说明性标注文字
    status: pending
    dependencies:
      - setup-design-tokens
  - id: wire-interactions
    content: 开发main.js联调human/agent切换与轻重密度切换交互，触发滚动进入动效
    status: pending
    dependencies:
      - build-hero-section
      - build-node-network-animation
      - build-capability-cards
  - id: polish-and-review
    content: 整体视觉走查与响应式适配，核对Figma文案与色值1:1还原，验证prefers-reduced-motion降级
    status: pending
    dependencies:
      - wire-interactions
      - build-brand-footer
---

## 产品概述

面向跨境支付产品的品牌官网首页优化，基于 Figma 提供的品牌手册（连接概念、clink 点阵 logo、品牌色板、视觉语言、品牌故事素材）进行视觉重设计，产出两种视觉轻重版本可供对比，页面文案 100% 复用 Figma 原文案，不新增任何营销话术。

## 核心功能

1. **Hero 主视觉区（human / ai agent 切换）**

- 默认 human 态：浅色背景，居中构图标题「连接　Connect」（还原 Figma 字重比例：中文 600 字重 + 英文 300 字重），下方竖分隔线与正文「我们以连接为核心，通过技术打破边界，链接多元场景，汇聚多方价值，持续构建开放、可信、共生的数字支付生态。」
- 点击切换至 ai agent 态：整屏进入暗夜模式（#0C0C0C/#171717 背景），标题保持居中不产生位移，左右两侧展示 Figma 素材中的节点连线图形（1-10.svg）与代码感/渐变图片（11-13.png），营造「信息化、智能化」的视觉差异
- 切换过程/首次进入触发「点阵节点逐个亮起 + 连线生长」动效，呼应 clink 点阵 logo 概念

2. **产品核心能力展示（3-4 张卡片）**

- 直接复用 Figma 视觉语言页四条原文案「块面重叠 / 几何穿插 / 点阵节点 / 光线轨迹」作为卡片标题，配合对应素材图（15/17/18.png、点阵 svg）做视觉呈现，不生造新文案

3. **品牌视觉收尾区**

- 使用品牌故事页素材（14.png、16.png）与橙—玫红品牌渐变，做纯视觉氛围收尾，不搬运"主色/辅助色"等说明性标注文字（那类内容属于品牌手册性质，仅转化为实际配色应用）

4. **视觉轻重对比切换**

- 同一页面内提供一个切换按钮，一键切换"轻量版"（更多留白、色彩与图形密度更克制）与"重量版"（色块/渐变/节点动效存在感更强）两种视觉密度，用于方案对比

## 视觉与风格要求

- 现代科技感，扁平化设计，适量渐变，不使用强光效/玻璃拟态等厚重光效
- 主色沿用 Figma 品牌色板：橙色渐变（#FF7042 → #FF9F05）与玫红 #FF9EF0；辅助/点缀采用冷色 #9B79FB（紫）、#2C4AFC（蓝），点缀比例克制
- 背景以信息内容为主导，避免图形装饰过重
- 字体体系需覆盖中文标题、正文、标签、按钮等分级，呼应 Figma 中 PingFang SC / HarmonyOS Sans SC 的使用习惯

## 技术栈

- 纯静态原型：HTML5 + CSS3（CSS 自定义属性做设计令牌）+ 原生 JavaScript（无构建工程，无框架依赖）
- 动效实现：Canvas 2D（或轻量 SVG 动态生成）绘制点阵节点网络，配合 CSS transition/requestAnimationFrame 控制生长节奏
- 资源直接复用 `/assets/CodeBuddyAssets/117_27203/` 下现有 1-10.svg（节点连线图形）与 11-18.png（渐变/像素背景图），不重新生成美术资源

## 实现思路与关键决策

1. **双态切换机制**：Hero 区域用一个顶层 `data-mode="human|agent"` 状态位控制主题（背景色、文字色、左右图文内容），标题 DOM 结构固定居中，仅切换其上下文的背景层与两侧图文层，避免标题位移；切换时用 CSS transition（参考 Vercel 设计动效原则：150-300ms、`cubic-bezier(0.175,0.885,0.32,1.1)`）做柔和过渡，而非强烈闪烁效果。
2. **点阵节点生长动效**：抽出独立模块 `node-network.js`，用 Canvas 绘制一组节点，初始不可见，按时间序列依次 fade-in 并向邻近节点绘制连线（用 `stroke-dashoffset` 思路模拟"生长"），可复用于 Hero 背景层与区块分隔处；提供 `density` 参数控制节点数量/透明度，与"轻重版"联动，避免为轻/重各写一套逻辑（DRY）。
3. **轻重视觉密度切换**：用 body 上的 `data-density="light|bold"` 类控制一组 CSS 变量（阴影强度、渐变透明度、节点动效密度、留白间距倍数），通过一个统一变量层实现「一份 HTML + 一套变量 + 两组取值」，而非维护两份页面，降低维护成本、便于后续正式实现时选定其中一版。
4. **色彩体系澄清与落地**：主色采用 Figma 品牌色板的橙色渐变与玫红（而非页面中出现的 #C7FA50，该色属于品牌手册示例色不作为本站主色），紫/蓝仅用于暗夜态节点连线、hover 态等低比例点缀，符合"冷色点缀"诉求且避免破坏橙 + 玫红的主调性。
5. **文案零改动**：所有可见文案（标题、正文、四条视觉语言关键词）严格从 Figma 画布 HTML 中原样提取，不生成新的营销文案；无法直接复用的品牌手册说明性文字（如"主色/辅助色/点缀色"标注、色值文本）不搬入网站，只转化为实际的颜色应用。
6. **性能与规范**：动效模块使用 `requestAnimationFrame` 并在切换/卸载时清理定时器，避免多次触发导致的内存泄漏；图片资源使用现有 png/svg 原图，避免重复请求；遵循 `prefers-reduced-motion` 时降级为静态呈现。

## 目录结构

```
coding/
├── index.html                          # [NEW] 单页原型：顶部导航 + Hero(human/agent切换+居中标题) + 能力卡片区 + 品牌视觉收尾 + 页脚，内含 轻/重密度切换按钮 与 human/agent 切换按钮
├── assets/
│   ├── css/
│   │   └── styles.css                  # [NEW] 设计令牌(颜色/字体/间距/圆角) + 明暗主题变量 + 轻重密度变量 + 各区块布局样式
│   ├── js/
│   │   ├── main.js                     # [NEW] human/agent 切换与轻重密度切换的交互逻辑、滚动进入动效触发、data-mode/data-density 状态管理
│   │   └── node-network.js             # [NEW] Canvas 点阵节点逐个亮起+连线生长动效模块，供 Hero 背景与分隔区复用，支持 density 参数
│   └── CodeBuddyAssets/117_27203/      # [REUSE] 现有 1-10.svg 节点图形、11-18.png 渐变/像素图，原样引用，不新增美术资源
```

## 设计方案（输出两种视觉密度，同页切换对比）

**轻量版（Light Density）**：更多留白、色块与渐变透明度更低、节点动效数量更少更细，整体克制、信息优先，接近 Vercel Geist 的克制留白气质，橙/玫红仅在关键节点（标题分隔线、按钮、节点连线）小面积点缀。

**重量版（Bold Density）**：渐变色块与节点连线存在感更强、卡片阴影/描边更明显、Hero 背景的橙—玫红渐变过渡更饱满，暗夜态代码/节点图形对比度更高，视觉更有冲击力但仍保持扁平不做强光效。

两版共享同一套栏目结构：

1. **顶部导航**：左侧 clink 点阵 logo（复用 8.svg 概念），右侧极简文字导航，滚动时背景轻微毛玻璃化（低透明度，非强光）
2. **Hero 区**：居中标题「连接　Connect」+ 正文，右上角/顶部放置 human｜ai agent 切换按钮；human 态浅色背景+留白构图；agent 态整屏切至 #0C0C0C 暗夜背景，左右对称展示节点连线图（1-10.svg）与代码感渐变图（11-13.png），标题始终居中不位移，切换时点阵节点逐个亮起+连线生长
3. **核心能力卡片区**：4 张卡片，标题分别为"块面重叠/几何穿插/点阵节点/光线轨迹"（Figma 原文案），配图分别对应 15/17/18.png 及点阵素材，横向等宽排布，桌面 4 列/平板 2 列
4. **品牌视觉收尾区**：深色背景（#171717）+ 14.png、16.png 大图并置，叠加橙—玫红品牌渐变条作氛围收尾，不含说明性文字
5. **页脚**：极简版权信息 + 二级导航

## 交互说明

- human/agent 切换按钮：胶囊形二态开关，滑块过渡 200-300ms，切换时触发对应态的节点生长动效重播
- 轻/重密度切换按钮：置于导航右侧或页面角落的小型文字开关（如"轻量｜厚重"），点击后全局 CSS 变量渐变过渡切换，不刷新页面