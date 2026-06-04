<div align="center">

# HyperFrames Motion Director

**面向 HyperFrames 的中文竖版电影感动效视频制作工作流。**

默认按 9:16、1080x1920、中文宣传片来规划，把文章、产品和官网故事导演成有画面、有节奏、可验证的动效视频。

<img src="assets/banner.png" alt="HyperFrames Motion Director cinematic motion workflow" width="100%">

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](./LICENSE)
[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-HyperFrames-c96442.svg)](./SKILL.md)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-141413.svg)](https://nodejs.org/)

</div>

---

## 这是什么

HyperFrames Motion Director 是一个面向 HyperFrames 的动效视频导演 skill。它默认把新任务当作中文竖版宣传片来处理：9:16、1080x1920、中文屏幕文案、竖屏安全区和短视频观看节奏。

它不会直接冲进动画代码，而是先把输入材料转成可确认的方向：核心观点、视觉隐喻、背景图计划、图文排版、运动节奏和验证标准。

确认之后，它再进入制作：生成必要图片，补齐设计、分镜和检查文档，协助完成 HyperFrames composition，并用快照、资源检查和审查报告把交付质量锁住。

适合做产品发布片、官网转视频、文章转短片、观点视频、动效字体片、节拍同步 motion graphics，以及需要明确 CTA 的宣传短片。

## 为什么需要它

很多 AI 视频看起来廉价，不是因为动画不够多，而是因为一开始没有导演判断：画面没有舞台，文字没有安全区，动画没有注意力目标，背景图和文案各说各话。

这个 skill 把视频先当成一组能站住的关键帧，再考虑运动。它默认要求背景图负责空间和隐喻，中文大字负责清晰表达，动画负责引导视线。

## 你会得到什么

<img src="assets/features.png" alt="Background, typography, and motion layers working together" width="100%">

- **可确认的方向**：先给 brief/design 方案，确认后再制作，避免一上来就生成错误素材。
- **默认中文竖版**：新视频默认按 9:16、1080x1920、中文宣传片、安全区和短视频节奏规划。
- **电影感视觉系统**：默认黑底、低亮度、高对比、大留白、白/灰/暖金三色，拒绝廉价科技感和信息堆叠。
- **完整交付链路**：背景图、设计规范、分镜、可选节拍图、可选运动图、资源检查、快照、渲染和审查报告。

## 工作方式

```text
输入材料
  -> 提炼核心观点和视觉隐喻
  -> 生成可确认的 brief/design 方案
  -> 确认后生成图片、设计文档和分镜
  -> 制作 HyperFrames composition
  -> 检查资源、快照、渲染和审查报告
```

核心原则：先让静态关键帧成立，再让动画为观看路径服务。

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

脚手架默认生成四个核心文档：

```text
BRIEF_DESIGN_PROPOSAL.md  先确认方向
DESIGN.md                 锁定视觉系统
STORYBOARD.md             拆分镜头和关键帧
REVIEW_REPORT.md          记录检查、问题和交付结论
```

复杂项目可以额外生成：

```text
BEAT_MAP.json             音乐、旁白或节拍控制
MOTION_MAP.json           GSAP 编排、转场、视线引导
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

[geekjourneyx](https://github.com/geekjourneyx) · [geekjourney.dev](https://geekjourney.dev) · [@seekjourney](https://x.com/seekjourney)
