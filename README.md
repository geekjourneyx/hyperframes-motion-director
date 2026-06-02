<div align="center">

# Video Ad Director

**面向 HyperFrames 视频广告的 AI 制片导演工作流**

<img src="assets/banner.jpg" alt="Video Ad Director 信息图：创意简报、分镜、运动图、审查包和 HyperFrames 平台标签" width="100%">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Skill](https://img.shields.io/badge/Agent%20Skill-HyperFrames-c96442.svg)](./SKILL.md)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-141413.svg)](https://nodejs.org/)

</div>

---

## 这是什么

Video Ad Director 是一个用于制作 HyperFrames 视频广告的 agent skill。它把模糊的视频广告需求，转成可审查、可验证、可交付的生产链路：创意简报、设计系统、脚本、分镜、节拍图、运动图、验证、快照、渲染和审查报告。

```text
输入："给 AI 编程助手 Forge 做一个高级感产品发布广告，使用动效大字和 CTA"
输出：一套 HyperFrames 视频广告生产工作流，包括制片文档、分镜、运动编排、验证门和审查交付
```

它适用于短视频广告、产品发布片、官网转视频、YouTube 宣传片、字幕驱动产品视频、动效字体广告和音乐节拍同步的 motion graphics。

---

## 核心能力

<img src="assets/features.jpg" alt="核心能力：简报、设计、脚本、分镜、运动和审查" width="100%">

这个 skill 强调先做静态关键帧，再做动画；先建立生产文档，再写代码；先验证可读性、时间线和渲染稳定性，再交付成片。

---

## 工作流程

<img src="assets/workflow.jpg" alt="工作流程：需求采集、简报、构建、验证和渲染" width="100%">

工作方式是从最终观看体验倒推：观众要记住什么，哪个画面证明方向成立，哪个节拍承载 hook、揭示、证明和 CTA，哪些验证能证明渲染是确定性的。

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

## 安装 Video Ad Director

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

Video Ad Director 负责把“要做什么视频”拆成可审查的制片文档和验证链路。创建一个生产项目：

```bash
node scripts/create_project.mjs ./my-product-ad
```

然后按顺序填写生成的文档：

```text
CREATIVE_BRIEF.md
DESIGN.md
SCRIPT.md
STORYBOARD.md
BEAT_MAP.json
MOTION_MAP.json
```

发布 skill 或检查项目结构时运行：

```bash
node scripts/check-structure.mjs
node scripts/check_assets.mjs <project-dir>
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
SKILL.md                         skill 主指令和质量门
templates/                       创意简报、设计、脚本、分镜、节拍图、运动图等模板
references/                      工作流、字体排版、运动语言、音频同步、稳定性和审查指南
scripts/create_project.mjs       新建视频广告项目脚手架
scripts/check-structure.mjs      skill 发布前结构检查
scripts/check_assets.mjs         项目资源检查
scripts/score_artifacts.mjs      生产文档完整度评分
evals/                           触发词和评测用例
assets/                          README 使用的压缩信息图
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
