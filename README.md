# Claude Code (Source)

Claude Code CLI 的源代码，从发布包中提取并补全了缺失的类型定义，重构为 Bun monorepo 结构。

## 项目结构

```
apps/
  claude-code/          # 主应用
packages/
  claude-for-chrome-mcp/  # @ant/claude-for-chrome-mcp mock 包
  color-diff-napi/        # color-diff-napi workspace 包
```

## 前置要求

- [Bun](https://bun.sh/) >= 1.1

## 安装依赖

```bash
bun install
```

## 使用

```bash
# 启动交互式 REPL
cd apps/claude-code
bun src/dev-entry.ts

# 单次提问（非交互模式）
bun src/dev-entry.ts -p "你的问题"
```

需要设置 `ANTHROPIC_API_KEY` 环境变量，或已通过 `claude` CLI 登录。

## 开发

`dev-entry.ts` 是开发入口，它会在运行时 polyfill Bun 编译器注入的宏（`MACRO`、`feature()`），使源码无需打包即可直接运行。

```bash
# 启动开发模式
cd apps/claude-code
bun run start

# 快速测试
bun run hello
```

### 类型检查

```bash
# 使用 oxlint 做快速 lint
bunx oxlint apps/claude-code/src/

# TypeScript 类型检查（有大量已知错误，仅供参考）
bunx tsc --noEmit -p apps/claude-code/tsconfig.json
```

### 补全的文件

所有相对原始发布包新增或修改的文件清单见 [CHANGES.md](./CHANGES.md)。
