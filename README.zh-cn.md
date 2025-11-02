# Qi Design System

描述一次设计系统, 输出多套框架配置（Tailwind、Chakra UI、Ant Design 等等）。

Languages: [中文](./README.zh-cn.md) | [English](./README.md)

## 快速上手

1. 安装
   - `npm install -D @qiqi1996/design-system`
   - `pnpm install -D @qiqi1996/design-system`
   - `bun add -D @qiqi1996/design-system`
2. 创建 `design-system.json`
   - 注意：
   - 你可以将 `$schema` 改为 `schema-zh.json` 或 `schema-en.json` 以查看多语言的 JSON 字段注释。（目前支持：中文、英语）
   - 以下示例为：定义了 8px 的空间系统，和基于 Ant Design 的色板算法生成 品牌色（克莱因蓝） 色板，并将此色板应用到了 Chakra UI 的语义化命名。此设计系统配置将生成 Tailwind V4 版本的配置到 `./src-doc/src/theme.css` 文件中。
```json
{
    "$schema": "./node_modules/@qiqi1996/design-system/schema-zh.json",
    "output": {
        "tailwind-v4": "./src-doc/src/theme.css"
    },
    "space": {
        "base": 8,
        "unit": "px"
    },
    "color": {
        "palettes": [
            {
                "type": "monochromatic",
                "name": "brand",
                "base": "#002FA7"
            }
        ],
        "semantic": {
            "primary": {
                "default": {
                    "solid": "brand-600"
                }
            }
        }
    }
}
```
3. 执行生成：qi-design-system --config /path/to/your/design-system.json

## 特性和计划

### 颜色系统定义

- [ ] 颜色系统
  - [ ] 单色色板生成
    - [x] Ant Design Color
    - [ ] Mantine Colors Generator
  - [ ] 三元群配色方案
  - [x] 语义化（基于 Chakra UI Semantic 定义）
  - [ ] 暗黑模式
- [ ] 字体系统
  - [x] 字号（仅语义化定义）
  - [x] 行高
    - [x] 线性自动生成
  - [x] 字重（仅语义化定义）
- [x] 空间系统 
- [ ] 圆角
- [ ] 阴影

### 内置配置生成器

- [x] Talwind V4
- [ ] Talwind V3
- [ ] Ant Design
- [ ] Chakra UI
- [ ] Mantine

## 贡献

* 需要 Bun 运行环境（v1.3.0+）