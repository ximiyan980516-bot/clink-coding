# Clink Design System

> **Source**: Figma 设计规范稿（2026-07）
> 覆盖：色彩系统、字体系统、按钮系统
> 使用 AI Agent 开发新页面时，将本文档注入 context。

---

## 1. Typography System · 字体系统

### 1.1 Font Family · 字体族

| Token | Font Family | Weight | 用途 |
|---|---|---|---|
| `font_family_display` | Zalando Sans SemiExpanded | Medium | 品牌展示标题、Hero 大标题、模块标题 |
| `font_family_primary` | PingFang HK | Regular · Medium | 主 UI 字体、正文、按钮、表单 |

---

### 1.2 Type Scale · 字号分级

| Token | Style Name | Size / Line Height | Letter Spacing | Weight | 用途 |
|---|---|---|---|---|---|
| `font_display_xl` | Display Xl | 90px / 75px | -4% | Medium | 首页 Hero 大标题 |
| `font_display_lg` | Display Lg | 84px / 90px | -4% | Medium | 二级页面 Hero 大标题 |
| `font_heading_xl` | Heading Xl | 48px / 150% | -4% | Medium | 首页 Hero 区下方大标题 |
| `font_heading_lg` | Heading Lg | 40px / 150% | -4% | Medium | 分区标题 |
| `font_heading_md` | Heading Md | 36px / 150% | — | Medium | 二级标题 |
| `font_heading_sm` | Heading Sm | 24px / 150% | — | Medium | 三级标题、卡片标题 |
| `font_body_lg` | Body Large | 20px / 28px | — | Regular / Medium | 大号正文、特色段落 |
| `font_body_md` | Body Medium | 18px / 24px | — | Regular | 品牌强调按钮文字、大按钮文字 |
| `font_body_sm` | Body Medium | 16px / 24px | — | Regular | 默认正文、中按钮文字、列表项、幽灵按钮文字 |
| `font_body_mini` | Body Small | 14px / 20px | — | Regular | 辅助文字、表单标签、小按钮文字 |
| `font_caption` | Caption | 12px / 16px | — | Regular | 图注、时间戳、微型标签 |

---

## 2. Color System · 色彩系统

### 2.1 Brand · 品牌色

| Token | Value | 用途 |
|---|---|---|
| `brand_pink` | `#F794AF` | 品牌粉，用于标题中高亮信息、主视觉装饰色 |
| `brand_orange` | `#FAAF69` | 品牌橙、主视觉装饰色 |
| `brand_orange_light` | `#F8E1CC` | 品牌橙浅变体、品牌强调按钮 / 特殊 CTA 按钮等的背景色 |
| `brand_blue` | `#3346DD` | 仅 agent 模式（深色背景）下的品牌蓝色、用于标题中高亮信息 |
| `brand_purple` | `#5044AC` | 仅 agent 模式（深色背景）下的品牌紫色、主视觉点缀色 |

---

### 2.2 Text · 中性色 / 文本色

| Token | Value | 用途 |
|---|---|---|
| `text_primary` | `#161616` | 标题、导航文字、强调文案 |
| `text_primary_dark` | `#FFFFFF` | 仅 agent 模式下 Hero 大标题、分区标题、主操作按钮文字色 |
| `text_primary_dark` | `#B3B3B3` | 仅 agent 模式下的正文、幽灵按钮文字色 |
| `text_secondary` | `#3F3F46` | 正文段落、描述信息 |
| `text_tertiary` | `#71717A` | 三级文字、图注、占位符文案 |
| `text_placeholder` | `#71717A` alpha 40% | 输入框占位符、禁用文字 |

---

### 2.3 Background & Surface · 背景色 / 填充色

| Token | Value | 用途 |
|---|---|---|
| `bg_primary` | `#F7F7F7` | 页面主背景、导航栏背景 |
| `bg_primary_dark` | `#0A0A0A` | 仅 agent 模式下的深色背景、导航栏背景 |
| `bg_light` | `#FDFDFD` | 亮色模块背景，主要用于模块分区 |
| `bg_btn` | `#161616` | 主操作按钮背景色 |
| `bg_btn_dark` | `#FFFFFF` | 仅 agent 模式下的主操作按钮背景色 |
| `surface_card` | `#FFFFFF` | 卡片表面、导航栏弹窗背景 |
| `surface_card_dark` | `#101010` | 仅 agent 模式下的导航栏弹窗背景 |
| `surface_input` | `#FFFFFF` | 输入框背景、表单控件底色 |

---

### 2.4 Border · 描边色

| Token | Value | 用途 |
|---|---|---|
| `border_primary` | `#E7E7E7` | 卡片描边、暖灰边框 |
| `border_primary_dark` | `#E7E7E7` | 仅 agent 模式下的卡片描边、边框 |
| `border_secondary` | `#000000` alpha 10% | 上下分割线 |
| `border_secondary_dark` | `#FFFFFF` alpha 10% | 仅 agent 模式下的上下分割线 |
| `border_btn_secondary` | `#000000` alpha 50% | 次级按钮的描边色 |
| `border_btn_secondary_dark` | `#FFFFFF` alpha 50% | 仅 agent 模式下的次级按钮描边色 |

---

## 3. Button System · 按钮系统

### 3.1 Primary Buttons · 主要按钮

> 默认操作、表单提交

| Token | Fill | Text | Height | Font | Radius | Padding | 用途 |
|---|---|---|---|---|---|---|---|
| `btn_primary_sm` | `#161616` | `#FFFFFF` | 36px | 14px Medium | Full | 0 16px | 小尺寸默认操作（如导航栏最右侧按钮） |
| `btn_primary_md` | `#161616` | `#FFFFFF` | 48px | 16px Medium | Full | 0 16px | 默认尺寸默认操作 |
| `btn_primary_dark` | `#FFFFFF` | `#161616` | 48px | 16px Medium | Full | 0 16px | 仅 agent 模式默认尺寸默认操作 |
| `btn_primary_lg` | `#161616` | `#FFFFFF` | 56px | 18px Medium | 10px | — | 大按钮、表单提交 |

---

### 3.2 Secondary Buttons · 次要按钮

> 辅助操作、取消、返回

| Token | Fill | Text | Border | Height | Font | Radius | 用途 |
|---|---|---|---|---|---|---|---|
| `btn_secondary_sm` | none | `#161616` | 1px `#000000` 50% | 36px | 14px Medium | Full | 小尺寸次要操作（如导航栏最右侧按钮） |
| `btn_secondary_sm_dark` | none | `#FFFFFF` | 1px `#FFFFFF` 50% | 36px | 14px Medium | Full | 仅 agent 模式小尺寸次要操作 |
| `btn_secondary_md` | none | `#161616` | 1px `#000000` 50% | 48px | 16px Medium | 24px | 默认次要操作，一般与主要按钮并排 |

---

### 3.3 Accent Buttons · 品牌强调按钮

> 品牌色操作、Hero 区主操作

> **⚠️ 使用限制（`btn_accent_orange`）**：仅用于需要额外吸引注意力的场景（如 Hero 区的核心行动入口）。**每页最多出现 2 处**，避免滥用导致强调失效。常规操作按钮请使用 `btn_primary_md` 或 `btn_secondary_md`。

| Token | Fill | Text | Border | Height | Font | Radius | Padding | 用途 |
|---|---|---|---|---|---|---|---|---|
| `btn_accent_orange` | `#F8E1CC` | `#000000` | — | 40px | 18px Regular | 20px | 0 16px | 品牌橙强调，**仅限 Hero 区或全页最醒目的单一行动入口** |
| `btn_accent_primary` | `#161616` | `#FFFFFF` | — | 38px | 18px Medium | 20px | 0 16px | 品牌强调主操作，Hero 区 |
| `btn_accent_secondary` | none | `#161616` | 1px `#000000` 50% | 38px | 18px Regular | 20px | 0 16px | 品牌辅助操作，Hero 区（浅色背景） |
| `btn_accent_secondary_dark` | none | `#FFFFFF` | 1px `#FFFFFF` 50% | 38px | 18px Regular | 20px | 0 16px | 品牌辅助操作，Hero 区（深色背景） |

---

### 3.4 Ghost / Chip Buttons · 幽灵按钮与标签按钮

> 导航项、筛选器、低优先操作

| Token | Fill | Text | Height | Font | Radius | Padding | 用途 |
|---|---|---|---|---|---|---|---|
| `btn_ghost_sm` | none | `#71717A` | 22px | 14px Regular | none | none | 小号幽灵按钮 |
| `btn_ghost_md` | none | `#161616` | 40px | 16px Regular | Full | none | 默认幽灵按钮、导航项 |
