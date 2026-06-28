<div align="center">

# HyperFrames Motion Director

**把 README、文章、产品介绍，做成一条中文竖版宣传片。**

先给你方向方案，确认后再生成画面、做动效、检查成片。适合开源项目、独立产品、工具发布、官网介绍和文章观点视频。

<img src="assets/banner.png" alt="HyperFrames Motion Director cinematic motion workflow" width="100%">

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](./LICENSE)
[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-HyperFrames-c96442.svg)](./SKILL.md)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-141413.svg)](https://nodejs.org/)

</div>

---

## 这是什么

HyperFrames Motion Director 是一个用来制作宣传短片的 Codex skill。

你可以把 README、文章、产品页或官网内容交给它。它会先整理成一版可确认的宣传片方向：讲什么、怎么拍、需要什么画面、每一屏放什么字。

你确认后，它再继续生成图片、制作动效、截图检查，并记录最后交付结果。

默认做中文竖版短片：9:16、1080x1920、大字清楚、画面克制，适合短视频平台传播。

## 为什么需要它

很多项目其实值得被看见，但 README、官网和产品介绍太容易被划走。

很多 AI 视频也不是输在动画少，而是输在一开始没有想清楚：第一屏抓不抓人，文字能不能读清，画面有没有质感，最后能不能交付。

这个 skill 的重点是：先把宣传片方向定准，再做画面和动效。不是随便生成一段动画，而是把项目讲清楚、拍出来、检查一遍。

## 你会得到什么

<img src="assets/features.png" alt="Background, typography, and motion layers working together" width="100%">

- **先看方向**：先给一版宣传片方案，确认后再制作，避免一开始就做偏。
- **中文竖版短片**：默认按 9:16、1080x1920、中文大字和短视频节奏来规划。
- **电影感画面**：默认黑底、低亮度、高对比、大留白，白/灰/暖金三色，不做廉价科技感。
- **完整交付检查**：从画面、文案、截图到最终结果，都有检查记录。

## 工作方式

```text
输入材料
  -> 先给宣传片方向
  -> 你确认
  -> 生成图片和分镜
  -> 制作动效短片
  -> 截图检查和交付记录
```

核心原则：先让每一屏静下来也能看懂，再让动效去引导视线。

## 快速开始

先安装 HyperFrames 官方 skill：

```bash
npx skills add heygen-com/hyperframes
```

再安装 HyperFrames Motion Director：

```bash
npx skills add https://github.com/geekjourneyx/hyperframes-motion-director
```

创建一个动效视频制作项目：

```bash
node scripts/create_project.mjs ./my-motion-film
```

如果项目需要精确节拍或复杂动画编排：

```bash
node scripts/create_project.mjs ./my-motion-film --with-timing --with-motion
```

## 产物结构

创建项目后，默认会生成四个核心文件：

```text
BRIEF_DESIGN_PROPOSAL.md  宣传片方向
DESIGN.md                 画面风格
STORYBOARD.md             分镜和文案
REVIEW_REPORT.md          检查和交付记录
```

复杂项目还可以额外生成：

```text
BEAT_MAP.json             节奏安排
MOTION_MAP.json           动效安排
```

## 质量检查

发布 skill 前检查结构：

```bash
node scripts/check-structure.mjs
```

检查具体项目的资源引用和 artifact 完整性：

```bash
node scripts/check_assets.mjs <project-dir>
node scripts/check_assets.mjs <project-dir> --strict
node scripts/validate_artifacts.mjs <project-dir>
```

已经实现 HyperFrames composition 后，再运行当前项目支持的 HyperFrames 检查和快照命令。

## 仓库结构

```text
SKILL.md             主指令、确认门和质量门
templates/           brief、design、storyboard、review 和可选 map 模板
references/          工作流、视觉标准、背景图、音频同步和稳定性指南
scripts/             脚手架、资源检查、结构检查和 artifact 完整性校验
evals/               触发词和评测用例
assets/              README 视觉资产
```

## 许可证

[GNU Affero General Public License v3.0](./LICENSE)

## 作者

| | |
|:---|:---|
| 个人主页 | [jieni.ai](https://jieni.ai) |
| GitHub | [geekjourneyx](https://github.com/geekjourneyx) |
| X | [@seekjourney](https://x.com/seekjourney) |
| 公众号 | 搜索「极客杰尼」 |
