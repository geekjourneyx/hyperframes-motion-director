<div align="center">

# HyperFrames Motion Director

**面向 HyperFrames 的电影感动效视频制作工作流**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Skill](https://img.shields.io/badge/Agent%20Skill-HyperFrames-c96442.svg)](./SKILL.md)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-141413.svg)](https://nodejs.org/)

</div>

---

## 这是什么

HyperFrames Motion Director 是一个用于制作 HyperFrames 动效视频和电影感短片的 agent skill。它把文章、主题、产品、官网或发布信息，先转成可确认的 brief/design 方案；用户确认后，才进入背景图/主视觉生成、HyperFrames 制作、验证、快照、渲染和审查报告。

```text
输入："把这篇关于 AI 替代焦虑的文章做成 12 秒宣传片，不要画机器人办公室，要画本质隐喻"
输出：先给一份可确认的黑底极简电影风 brief/design 方案；确认后再生成设计规范、分镜、必要图片、HyperFrames composition 和审查报告
```

它适用于产品发布片、官网转视频、文章转视频、观点短片、字幕驱动产品视频、动效字体短片、音乐节拍同步 motion graphics，以及需要清晰 CTA 的宣传视频。

默认风格是严格的黑底电影隐喻风：`#050505` 极深黑背景，白/灰/暖金三色，高对比，大留白，电影打光，纸张颗粒，浅景深，体积雾，细窄轮廓光，局部金属质感。它不做普通插画、电商 Banner、图标堆、廉价科技感、多色渐变或解释性信息图。

---

## 核心能力

这个 skill 强调先确认方向，再制作视频；默认先规划背景图舞台，再做静态关键帧，再做动画；先验证排版、安全边界、时间线和渲染稳定性，再交付成片。

核心能力：

- 提炼文章或主题的核心观点、最大冲突、情绪重心、关键词和视觉隐喻。
- 将抽象观点转译为克制符号，例如被擦除的人影、即将断裂的细线、黑暗倒计时、裂缝里的微光、被吸入黑洞的数据碎片。
- 自动选择中心符号、超大标题、人物锚点或巨大数字作为主结构。
- 判断是否需要生成图片；需要时先生成视觉素材，再用 HyperFrames 负责字体、构图、动效、节奏和最终渲染。
- 把背景图、文字和动画绑定在一起：背景图负责舞台和隐喻，文字负责清晰信息，动画负责引导视线。

---

## 工作流程

工作方式是从最终观看体验倒推：观众要记住什么，文章的本质隐喻是什么，视频尺寸和文字布局是否成立，哪些图片需要生成，哪些元素必须留给 HyperFrames 排版和动画，哪些验证能证明画面不溢出、不跑版、可确定渲染。

当前核心规则：新视频默认要有背景舞台；背景图负责空间和隐喻，文字负责清晰信息，动画负责引导视线。

---

## 前置依赖

使用前请确认本机具备：

- Node.js 18 或更高版本。
- 可通过 `npx` 执行 `skills` 和 `hyperframes` CLI。
- 已安装或可使用 HyperFrames 官方 skill。

```bash
npx skills add heygen-com/hyperframes
```

---

## 安装 HyperFrames Motion Director

推荐通过 `skills` CLI 安装本 skill：

```bash
npx skills add https://github.com/geekjourneyx/video-ad-director
```

使用 skill 本身不需要额外依赖。仓库中的辅助脚本使用 Node.js。

---

## 快速开始

### 手动使用 HyperFrames CLI

```bash
npx hyperframes init my-video
cd my-video
npx hyperframes preview
npx hyperframes render
```

命令含义：

- `npx hyperframes init my-video`：初始化一个 HyperFrames 视频项目。
- `npx hyperframes preview`：在浏览器中预览，并支持 live reload。
- `npx hyperframes render`：渲染输出 MP4。

### 使用本仓库脚手架补齐生产文档

HyperFrames Motion Director 负责把“要做什么视频”拆成可审查的制片文档和验证链路。创建一个生产项目：

```bash
node scripts/create_project.mjs ./my-motion-film
```

然后按顺序填写生成的文档：

```text
BRIEF_DESIGN_PROPOSAL.md
DESIGN.md
STORYBOARD.md
REVIEW_REPORT.md
```

`BEAT_MAP.json` 和 `MOTION_MAP.json` 只在音乐/旁白/复杂 GSAP 时间线需要时生成。

发布 skill 或检查项目结构时运行：

```bash
node scripts/check-structure.mjs
node scripts/check_assets.mjs <project-dir>
node scripts/check_assets.mjs <project-dir> --strict
node scripts/score_artifacts.mjs <project-dir>
```

如果已经实现 HyperFrames composition，继续运行当前项目支持的最强验证命令：

```bash
npx hyperframes doctor
npx hyperframes lint
npx hyperframes validate
npx hyperframes inspect
npx hyperframes snapshot <composition> --at <times>
```

---

## 仓库结构

```text
SKILL.md                         skill 主指令、确认门和质量门
templates/                       确认方案、设计、分镜、审查报告和可选节拍/运动图模板
references/                      工作流、统一视觉标准、音频同步和稳定性指南
scripts/create_project.mjs       新建 HyperFrames 动效视频项目脚手架
scripts/check-structure.mjs      skill 发布前结构检查
scripts/check_assets.mjs         项目资源检查
scripts/score_artifacts.mjs      本质隐喻、风格门和生产文档评分
scripts/build_review_pack.mjs    汇总产物、快照、渲染和审查报告
references/motion-background-system.md  背景图、图文关系和动效预算规则
evals/                           触发词和评测用例
```

---

## 许可证

[MIT](./LICENSE) — 可自由使用、修改和分发。

---

## 关于作者

| | |
|:---|:---|
| 个人主页 | [geekjourney.dev](https://geekjourney.dev) |
| GitHub | [geekjourneyx](https://github.com/geekjourneyx) |
| Twitter | [@seekjourney](https://x.com/seekjourney) |
| 公众号 | 微信搜「极客杰尼」 |
