import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicRoot = join(root, "public");
const canonicalHost = "https://www.aicodebackup.com";
const gaId = "G-6HCDQVXH36";
const contactEmail = "hello@aicodebackup.com";
const npmUrl = "https://www.npmjs.com/package/aicodebackup";
const repoUrl = "https://github.com/GazeAfar/aicodebackup";

const guideCards = [
  {
    path: "/guides/backup-ai-generated-code/",
    zhPath: "/zh-CN/guides/backup-ai-generated-code/",
    title: "如何备份 AI 生成的代码",
    summary: "保护 Codex、Claude Code、Cursor、Trae 和 Gemini CLI 生成的本地项目。",
  },
  {
    path: "/guides/github-backup-for-vibe-coders/",
    zhPath: "/zh-CN/guides/github-backup-for-vibe-coders/",
    title: "面向 vibe coder 的 GitHub 备份",
    summary: "不用先成为 Git 专家，也能理解私有 GitHub 备份为什么重要。",
  },
  {
    path: "/guides/github-backup-without-git/",
    zhPath: "/zh-CN/guides/github-backup-without-git/",
    title: "不用学习 Git 也能做 GitHub 备份",
    summary: "把 GitHub 当成私有安全层，而不是先背熟每一条 Git 命令。",
  },
  {
    path: "/guides/how-to-not-lose-ai-generated-code/",
    zhPath: "/zh-CN/guides/how-to-not-lose-ai-generated-code/",
    title: "如何避免丢失 AI 生成的代码",
    summary: "围绕高速 AI 编程会话建立备份节奏和恢复点习惯。",
  },
  {
    path: "/guides/private-github-backup-for-ai-code/",
    zhPath: "/zh-CN/guides/private-github-backup-for-ai-code/",
    title: "AI 代码的私有 GitHub 备份",
    summary: "理解为什么 AI 项目默认应该进入私有仓库，而不是公开暴露。",
  },
  {
    path: "/guides/automatic-github-backup-for-ai-coding/",
    zhPath: "/zh-CN/guides/automatic-github-backup-for-ai-coding/",
    title: "AI 编程的自动 GitHub 备份",
    summary: "了解自动提醒、健康检查和可见恢复点如何降低丢代码风险。",
  },
  {
    path: "/guides/backup-codex-projects/",
    zhPath: "/zh-CN/guides/backup-codex-projects/",
    title: "安全备份 Codex 项目",
    summary: "在会话结束、上下文变化或本地文件丢失前建立私有恢复点。",
  },
  {
    path: "/guides/backup-claude-code-projects/",
    zhPath: "/zh-CN/guides/backup-claude-code-projects/",
    title: "备份 Claude Code 项目",
    summary: "用私有 GitHub 备份保护 Claude Code 带来的大范围终端编辑。",
  },
  {
    path: "/guides/backup-cursor-projects/",
    zhPath: "/zh-CN/guides/backup-cursor-projects/",
    title: "自动备份 Cursor 项目",
    summary: "给 Cursor 项目和 AI 生成改动加上一层私有 GitHub 安全网。",
  },
  {
    path: "/guides/ai-coding-safety-layer/",
    zhPath: "/zh-CN/guides/ai-coding-safety-layer/",
    title: "AI 编程安全层",
    summary: "理解更安全的 AI 编程流程背后的备份层、检查层和恢复习惯。",
  },
];

const articlePages = [
  {
    slug: "backup-ai-generated-code",
    title: "如何备份 AI 生成的代码 | AICodeBackup",
    description: "学习如何把 AI 生成的代码备份到私有 GitHub 仓库，保护本地项目，避免 AI 编程会话结束后丢失重要工作。",
    ogDescription: "用私有 GitHub 备份保护 AI 生成代码的实用指南。",
    h1: "如何备份 AI 生成的代码。",
    intro: "AI 编程工具可以很快产出有价值的代码。更安全的习惯，是在会话结束前把本地项目变成私有 GitHub 恢复点。",
    quick: [
      "备份 AI 生成代码的关键，是在本地项目变得有价值后尽快创建一份私有远端副本。AICodeBackup 会把项目连接到私有 GitHub 仓库，并提供一个可重复执行的 backup 命令。",
      "这很重要，因为 AI 编程的改动速度通常快过传统开发习惯。一次提示词可能同时改动源码、测试、配置、文档和生成资源，而你还没有一个清晰的恢复点。",
    ],
    sections: [
      {
        heading: "没有备份时容易出什么问题",
        body: "项目文件夹可能是唯一副本；AI 重构可能破坏几分钟前还能运行的版本；会话结束后编辑路径很难复现；重要文件可能一直停留在本地；公开仓库或普通同步盘也可能暴露不该公开的代码。",
      },
      {
        heading: "简单的备份流程",
        list: [
          "安装 AICodeBackup alpha 版本。",
          "在项目目录中运行 aicodebackup setup。",
          "让 setup 连接 GitHub 并创建私有仓库。",
          "每次重要 AI 改动完成后运行 aicodebackup backup。",
          "长时间 AI 编程时使用 aicodebackup watch 监控风险。",
          "用 aicodebackup doctor 确认备份链路健康。",
          "需要恢复时，用 aicodebackup restore --to ../project-restored 恢复到新目录。",
        ],
      },
      {
        heading: "什么时候应该备份",
        body: "功能刚跑通、准备做跨文件改动、安装依赖前、结束长会话前、切换 AI 工具前，都适合创建恢复点。这些节点会把高速 AI 工作变成一串可回退的私有记录。",
      },
    ],
    related: ["backup-cursor-projects", "backup-claude-code-projects", "backup-codex-projects"],
  },
  {
    slug: "github-backup-for-vibe-coders",
    title: "面向 Vibe Coders 的 GitHub 备份 | AICodeBackup",
    description: "面向 vibe coding 用户的入门指南：不用先学习复杂 Git 命令，也能用私有 GitHub 仓库保护 AI 编程项目。",
    ogDescription: "给 vibe coders 的私有 GitHub 备份入门说明。",
    h1: "面向 vibe coders 的 GitHub 备份。",
    intro: "Vibe coding 的重点是快速试想法，但项目一旦只存在本地目录里，任何误删、重置或失败实验都会变成风险。",
    quick: [
      "GitHub 备份可以把 vibe coding 项目从单机文件夹变成私有远端恢复点。AICodeBackup 把常见 Git 操作包装成 setup、backup、doctor、watch 和 restore。",
      "你仍然拥有自己的 GitHub 仓库和代码。这个工具只是帮你把第一条安全路径搭起来，减少因为不熟悉 Git 而迟迟不备份的情况。",
    ],
    sections: [
      {
        heading: "为什么 vibe coding 更需要备份",
        body: "AI 可以快速生成可运行原型，也可以快速把一个可运行版本改坏。你可能还没来得及整理分支、提交信息或文档，项目就已经跨过了几个重要阶段。",
      },
      {
        heading: "适合非传统开发者的流程",
        list: [
          "先在测试项目中安装并运行 setup。",
          "确认 GitHub 私有仓库已经创建。",
          "每次完成一个可用版本后运行 backup。",
          "用 doctor 看当前目录是否已经推送到远端。",
          "需要新副本时恢复到当前项目外的新文件夹。",
        ],
      },
      {
        heading: "隐私默认值",
        body: "AICodeBackup 创建新仓库时默认使用私有仓库。这样更适合还在实验阶段的 AI 代码、配置文件和业务逻辑，避免未准备好时公开。",
      },
    ],
    related: ["github-backup-without-git", "private-github-backup-for-ai-code", "how-to-not-lose-ai-generated-code"],
  },
  {
    slug: "github-backup-without-git",
    title: "不用学习 Git 也能做 GitHub 备份 | AICodeBackup",
    description: "了解如何在不先掌握 Git 命令的情况下，把 AI 编程项目备份到私有 GitHub 仓库，并用健康检查确认备份状态。",
    ogDescription: "不用先背 Git 命令，也能建立私有 GitHub 备份。",
    h1: "不用学习 Git 也能做 GitHub 备份。",
    intro: "很多 AI 编程用户知道应该备份，但不想在第一个恢复点之前先学习一整套 Git 工作流。",
    quick: [
      "AICodeBackup 不替代 Git 和 GitHub，而是把最常用的安全路径包装成少量命令。你可以先建立私有备份习惯，再逐步学习更完整的 Git 工作流。",
      "setup 会检查环境、连接 GitHub、创建或连接私有仓库；backup 会提交并推送当前项目；doctor 会告诉你当前工作是否已经被远端保护。",
    ],
    sections: [
      {
        heading: "你不需要先记住的内容",
        body: "第一次备份前，你不必先记住 init、remote、add、commit、push 的所有细节。AICodeBackup 仍然使用这些基础能力，但把它们放进更清晰的命令里。",
      },
      {
        heading: "推荐命令顺序",
        list: [
          "npm install -g aicodebackup@alpha",
          "aicodebackup setup",
          "aicodebackup backup",
          "aicodebackup doctor",
          "aicodebackup watch",
          "aicodebackup restore --to ../safe-copy",
        ],
      },
      {
        heading: "什么时候再深入学习 Git",
        body: "当你开始协作、需要分支、需要代码评审或要发布正式版本时，应该学习更完整的 Git 工作流。备份层解决的是第一阶段的丢代码风险。",
      },
    ],
    related: ["github-backup-for-vibe-coders", "ai-coding-safety-layer", "private-github-backup-for-ai-code"],
  },
  {
    slug: "how-to-not-lose-ai-generated-code",
    title: "如何避免丢失 AI 生成的代码 | AICodeBackup",
    description: "建立不丢失 AI 生成代码的实用习惯：私有 GitHub 备份、明确检查点、健康检查、安全恢复目录和长会话提醒。",
    ogDescription: "用检查点和私有备份降低 AI 代码丢失风险。",
    h1: "如何避免丢失 AI 生成的代码。",
    intro: "避免丢代码不是靠记忆，而是靠固定动作：有价值的阶段要有远端恢复点，危险改动前要有可回退版本。",
    quick: [
      "最小可行习惯是：开始前确认备份链路健康，关键节点运行 backup，长会话用 watch，恢复时永远恢复到新目录。",
      "这套习惯能覆盖最常见的 AI 编程风险：误删、坏重构、会话中断、工具切换、依赖失败和本地目录混乱。",
    ],
    sections: [
      {
        heading: "建立检查点习惯",
        body: "把每个能运行的功能、每次大改前、每次结束会话前，都当成检查点。检查点不需要完美，但必须能让你回到一个已知状态。",
      },
      {
        heading: "推荐节奏",
        list: [
          "每天第一次打开项目时运行 doctor。",
          "大提示词或跨文件改动前运行 backup。",
          "功能跑通后立刻运行 backup。",
          "长会话中开启 watch。",
          "恢复时使用新目录，避免覆盖当前工作。",
        ],
      },
      {
        heading: "不要依赖临时复制",
        body: "把文件夹复制成 project-final、project-final-2 只会让版本越来越难判断。私有 GitHub 恢复点更适合长期追踪变化和恢复。",
      },
    ],
    related: ["backup-ai-generated-code", "automatic-github-backup-for-ai-coding", "ai-coding-safety-layer"],
  },
  {
    slug: "private-github-backup-for-ai-code",
    title: "AI 代码的私有 GitHub 备份 | AICodeBackup",
    description: "了解为什么 AI 生成代码应该默认备份到私有 GitHub 仓库，以及 AICodeBackup 如何降低公开暴露风险。",
    ogDescription: "为什么 AI 项目的备份默认应该是私有 GitHub 仓库。",
    h1: "AI 代码的私有 GitHub 备份。",
    intro: "AI 生成代码经常包含还未清理的业务逻辑、配置、实验代码和依赖选择。默认私有备份可以先保护工作，再决定是否公开。",
    quick: [
      "私有 GitHub 备份的目标不是隐藏开源项目，而是在项目准备好之前避免提前暴露。AICodeBackup 创建新仓库时默认使用私有仓库。",
      "代码仍然保存在你的 GitHub 账号下，AICodeBackup 不提供托管代码存储服务，也不会接收你的源码内容。",
    ],
    sections: [
      {
        heading: "为什么不要默认公开",
        body: "AI 编程早期阶段可能包含未审查的提示词产物、临时文件、实验依赖和敏感业务上下文。公开仓库适合准备好的项目，不适合所有中间态。",
      },
      {
        heading: "私有备份适合哪些场景",
        list: [
          "还在验证产品方向的原型。",
          "包含私有业务逻辑的工具。",
          "尚未清理 README、许可证或安全边界的项目。",
          "需要先稳定再决定开源的代码库。",
        ],
      },
      {
        heading: "仍然要检查本地文件",
        body: "私有仓库不是忽略安全卫生的理由。备份前仍应避免提交密钥、令牌、cookie、恢复码和真实用户数据。",
      },
    ],
    related: ["backup-ai-generated-code", "github-backup-for-vibe-coders", "ai-coding-safety-layer"],
  },
  {
    slug: "automatic-github-backup-for-ai-coding",
    title: "AI 编程的自动 GitHub 备份 | AICodeBackup",
    description: "学习 AI 编程项目的自动 GitHub 备份习惯：何时自动提醒、何时手动确认，以及如何用 doctor 检查健康状态。",
    ogDescription: "用 watch、backup 和 doctor 让 AI 编程备份更自动化。",
    h1: "AI 编程的自动 GitHub 备份。",
    intro: "自动化的价值不是盲目提交所有东西，而是在风险升高时提醒你保存恢复点，并让备份状态可见。",
    quick: [
      "AICodeBackup 的 watch 模式可以监控文件变化、diff 大小和备份年龄。达到风险阈值时，你可以选择运行备份，或用 --auto 在合适场景自动备份。",
      "对于 AI 编程，自动化应该配合人工判断：有意义的阶段保存，危险改动前保存，敏感文件先排除再保存。",
    ],
    sections: [
      {
        heading: "自动化适合解决什么",
        body: "它适合解决忘记备份、长会话无恢复点、项目变化过大却没有提醒的问题。它不适合替你判断哪些代码已经准备好发布。",
      },
      {
        heading: "推荐使用方式",
        list: [
          "先运行 setup 建立私有仓库。",
          "正常节点手动运行 backup。",
          "长时间 AI 会话时运行 watch。",
          "确认阈值适合你的项目后再考虑 --auto。",
          "定期运行 doctor 检查远端状态。",
        ],
      },
      {
        heading: "自动备份边界",
        body: "自动备份不应该提交密钥、个人数据或不该进入仓库的构建产物。项目仍然需要 .gitignore 和基本安全检查。",
      },
    ],
    related: ["how-to-not-lose-ai-generated-code", "backup-ai-generated-code", "ai-coding-safety-layer"],
  },
  {
    slug: "backup-codex-projects",
    title: "安全备份 Codex 项目 | AICodeBackup",
    description: "学习如何在 Codex 编程会话结束、上下文变化或本地文件丢失前，把项目备份到私有 GitHub 仓库并保留恢复点。",
    ogDescription: "在 Codex 会话结束前创建私有 GitHub 恢复点。",
    h1: "安全备份 Codex 项目。",
    intro: "Codex 可以快速修改项目结构、测试和实现细节。会话越高效，越需要清晰的远端恢复点。",
    quick: [
      "Codex 项目的备份重点，是在上下文切换、长任务结束、重构开始前创建私有 GitHub 恢复点。AICodeBackup 提供 setup、backup、watch、doctor 和 restore。",
      "这样即使本地目录出错，或你需要比较某次 AI 修改前后的状态，也可以从自己的 GitHub 仓库恢复。",
    ],
    sections: [
      {
        heading: "Codex 项目的常见风险",
        body: "一次任务可能同时改动多个模块、脚本、文档和测试。若没有恢复点，很难判断哪些修改来自哪一轮会话，也很难回退。",
      },
      {
        heading: "推荐备份节点",
        list: [
          "开始大范围重构前。",
          "测试通过后。",
          "合并或整理多文件修改前。",
          "长会话结束前。",
          "准备继续新方向之前。",
        ],
      },
      {
        heading: "恢复时不要覆盖当前目录",
        body: "restore MVP 的安全原则是恢复到当前项目外的新目录。这样你可以比较版本，而不是把当前工作直接覆盖掉。",
      },
    ],
    related: ["backup-ai-generated-code", "how-to-not-lose-ai-generated-code", "automatic-github-backup-for-ai-coding"],
  },
  {
    slug: "backup-claude-code-projects",
    title: "备份 Claude Code 项目 | AICodeBackup",
    description: "用私有 GitHub 备份、清晰恢复点和命令行检查，保护 Claude Code 项目中的大范围 AI 编程修改。",
    ogDescription: "保护 Claude Code 项目的私有 GitHub 备份流程。",
    h1: "备份 Claude Code 项目。",
    intro: "Claude Code 适合在终端里做大范围项目编辑。越是能一次处理很多文件，越需要稳定的备份节奏。",
    quick: [
      "备份 Claude Code 项目的核心，是在大提示词前后建立恢复点。AICodeBackup 可以把当前目录连接到私有 GitHub 仓库，并用 doctor 检查远端状态。",
      "这能减少长会话结束后才发现本地版本混乱、重要文件没保存或重构路径无法回退的情况。",
    ],
    sections: [
      {
        heading: "Claude Code 会话为什么需要恢复点",
        body: "终端驱动的 AI 编辑经常跨越源码、测试、配置和文档。没有恢复点时，回到上一个可运行状态会变得很困难。",
      },
      {
        heading: "建议流程",
        list: [
          "会话开始前运行 doctor。",
          "输入大范围修改请求前运行 backup。",
          "测试通过后再次运行 backup。",
          "长会话中使用 watch 观察备份年龄。",
          "恢复到新目录后再比较差异。",
        ],
      },
      {
        heading: "和手动 Git 的关系",
        body: "如果你已经熟悉 Git，可以继续使用自己的分支和提交习惯。AICodeBackup 更适合需要简单安全层、或还没形成固定 Git 流程的用户。",
      },
    ],
    related: ["backup-ai-generated-code", "backup-codex-projects", "backup-cursor-projects"],
  },
  {
    slug: "backup-cursor-projects",
    title: "自动备份 Cursor 项目 | AICodeBackup",
    description: "使用 AICodeBackup 为 Cursor 项目建立私有 GitHub 备份，保存 AI 生成代码改动并检查恢复点状态。",
    ogDescription: "给 Cursor 项目添加私有 GitHub 备份安全层。",
    h1: "自动备份 Cursor 项目。",
    intro: "Cursor 让本地项目里的 AI 改动非常快。备份层要跟上这个速度，避免只有编辑器里的本地文件可用。",
    quick: [
      "Cursor 项目适合使用私有 GitHub 仓库作为远端恢复点。AICodeBackup 负责 setup、backup、watch、doctor 和 restore，让备份动作保持简单。",
      "每当 Cursor 完成一个可运行功能、准备大范围修改或结束会话时，都应该创建一次恢复点。",
    ],
    sections: [
      {
        heading: "Cursor 项目的备份风险",
        body: "AI 可以同时修改很多文件，用户可能还没来得及判断哪些变更最重要。如果没有远端恢复点，误删、坏重构或目录损坏都会扩大损失。",
      },
      {
        heading: "推荐使用方式",
        list: [
          "在 Cursor 项目根目录运行 setup。",
          "确认 GitHub 私有仓库创建成功。",
          "每个可运行阶段运行 backup。",
          "跨文件改动前先备份。",
          "用 doctor 检查最新工作是否已经推送。",
        ],
      },
      {
        heading: "适合配合 Cursor 的习惯",
        body: "把 AI 提示词分成更小阶段，并在每个阶段跑通后备份。这样即使下一轮提示词效果不好，也能回到上一个稳定版本。",
      },
    ],
    related: ["backup-ai-generated-code", "backup-claude-code-projects", "backup-codex-projects"],
  },
  {
    slug: "ai-coding-safety-layer",
    title: "AI 编程安全层：备份和恢复 | AICodeBackup",
    description: "理解 AI 编程安全层如何通过私有 GitHub 备份、健康检查、watch 监控和安全恢复目录保护本地项目。",
    ogDescription: "用备份、健康检查和恢复流程构建 AI 编程安全层。",
    h1: "AI 编程安全层。",
    intro: "AI 编程安全层不是一个单点功能，而是一组固定保护动作：备份、检查、监控和安全恢复。",
    quick: [
      "AICodeBackup 的安全层覆盖项目初始化、备份、健康检查、风险监控和恢复。它的目标是让用户在高速 AI 编程时仍然知道代码是否被保护。",
      "这层保护默认使用用户自己的私有 GitHub 仓库，不把源码托管到 AICodeBackup 的服务器。",
    ],
    sections: [
      {
        heading: "安全层包含什么",
        list: [
          "setup：建立 Git、GitHub 和私有远端仓库。",
          "backup：保存当前项目恢复点。",
          "doctor：检查认证、远端和本地状态。",
          "watch：监控变化规模和备份年龄。",
          "restore：恢复到新目录，避免覆盖当前工作。",
        ],
      },
      {
        heading: "它解决的核心问题",
        body: "AI 让代码变化更快，但本地文件仍然脆弱。安全层把一次次临时改动变成可确认、可检查、可恢复的私有记录。",
      },
      {
        heading: "它不替代什么",
        body: "它不替代代码审查、测试、密钥管理、正式发布流程或团队协作规范。它先解决个人 AI 编程阶段最常见的丢代码问题。",
      },
    ],
    related: ["backup-ai-generated-code", "automatic-github-backup-for-ai-coding", "private-github-backup-for-ai-code"],
  },
];

const englishPaths = [
  "/",
  "/about/",
  "/guides/",
  ...guideCards.map((guide) => guide.path),
  "/privacy/",
  "/terms/",
];

function zhPathFor(enPath) {
  return enPath === "/" ? "/zh-CN/" : `/zh-CN${enPath}`;
}

function enPathFor(zhPath) {
  const path = zhPath.replace(/^\/zh-CN/, "");
  return path === "" ? "/" : path;
}

function filePathFor(urlPath) {
  if (urlPath === "/") {
    return join(publicRoot, "index.html");
  }
  return join(publicRoot, urlPath, "index.html");
}

function writePage(urlPath, html) {
  const filePath = filePathFor(urlPath);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${html.trim()}\n`, "utf8");
}

function languageIcon() {
  return `<svg class="language-switch-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg>`;
}

function languageSwitch(lang, targetPath) {
  if (lang === "zh-CN") {
    return `<a class="language-switch" href="${targetPath}" hreflang="en" lang="en" aria-label="Switch to English" title="English">${languageIcon()}<span class="sr-only">English</span></a>`;
  }

  return `<a class="language-switch" href="${targetPath}" hreflang="zh-CN" lang="zh-CN" aria-label="Switch to Chinese" title="Chinese">${languageIcon()}<span class="sr-only">Chinese</span></a>`;
}

function analyticsScripts() {
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    </script>
    <script src="/analytics-events.js" defer></script>`;
}

function head({ lang, title, description, keywords, path, ogType = "website", ogDescription, preloadProduct = false, jsonLd = "" }) {
  const url = `${canonicalHost}${path}`;
  const enPath = lang === "zh-CN" ? enPathFor(path) : path;
  const zhPath = lang === "zh-CN" ? path : zhPathFor(path);
  const enUrl = `${canonicalHost}${enPath}`;
  const zhUrl = `${canonicalHost}${zhPath}`;
  const alternates = lang === "zh-CN"
    ? `<link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="x-default" href="${enUrl}" />`
    : `<link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
    <link rel="alternate" hreflang="x-default" href="${enUrl}" />`;
  const preload = preloadProduct ? `\n    <link rel="preload" href="/assets/product-preview.svg" as="image" type="image/svg+xml" />` : "";
  const jsonLdBlock = jsonLd ? `\n\n    <script type="application/ld+json">\n${jsonLd}\n    </script>` : "";

  return `<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords}" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="AICodeBackup" />
    <link rel="canonical" href="${url}" />
    ${alternates}
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />${preload}
    <link rel="stylesheet" href="/styles.css" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="AICodeBackup" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${ogDescription ?? description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${canonicalHost}/assets/social-preview.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${ogDescription ?? description}" />
    <meta name="twitter:image" content="${canonicalHost}/assets/social-preview.png" />${jsonLdBlock}
    ${analyticsScripts()}
  </head>`;
}

function header(path) {
  const enPath = enPathFor(path);

  return `<header class="site-header">
      <nav class="nav" aria-label="主导航">
        <a class="brand" href="/zh-CN/" aria-label="AICodeBackup 中文首页">
          <span class="brand-mark" aria-hidden="true">AC</span>
          <span>AICodeBackup</span>
        </a>
        <div class="nav-links">
          <a href="/zh-CN/#how-it-works">工作流程</a>
          <a href="/zh-CN/#commands">命令</a>
          <a href="/zh-CN/guides/">指南</a>
          <a href="/zh-CN/#faq">FAQ</a>
          <a href="mailto:${contactEmail}">联系</a>
        </div>
        ${languageSwitch("zh-CN", enPath)}
      </nav>
    </header>`;
}

function footer() {
  return `<footer id="site-footer" class="site-footer">
      <div class="footer-main">
        <div class="footer-brand">
          <a class="brand" href="/zh-CN/" aria-label="AICodeBackup 中文首页">
            <span class="brand-mark" aria-hidden="true">AC</span>
            <span>AICodeBackup</span>
          </a>
          <p>自动把 AI 编程项目备份到私有 GitHub 仓库。</p>
          <div class="social-links" aria-label="社交链接">
            <a href="${repoUrl}" aria-label="GitHub">GitHub</a>
            <a href="${npmUrl}" aria-label="npm">npm</a>
            <a href="mailto:${contactEmail}" aria-label="Email">Email</a>
          </div>
        </div>
        <div class="footer-column">
          <strong>产品</strong>
          <a href="/zh-CN/#how-it-works">工作流程</a>
          <a href="/zh-CN/#commands">命令</a>
          <a href="/zh-CN/guides/">指南</a>
          <a href="/zh-CN/#faq">FAQ</a>
        </div>
        <div class="footer-column">
          <strong>资源</strong>
          <a href="/zh-CN/guides/github-backup-without-git/">无 Git 备份</a>
          <a href="/zh-CN/guides/private-github-backup-for-ai-code/">私有备份</a>
          <a href="/zh-CN/guides/how-to-not-lose-ai-generated-code/">避免丢代码</a>
          <a href="${repoUrl}/releases">更新记录</a>
        </div>
        <div class="footer-column">
          <strong>项目</strong>
          <a href="/zh-CN/about/">关于</a>
          <a href="mailto:${contactEmail}">联系</a>
          <a href="/zh-CN/privacy/">隐私政策</a>
          <a href="/zh-CN/terms/">使用条款</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 AICodeBackup. 保留所有权利。</span>
      </div>
    </footer>`;
}

function page({ path, title, description, keywords, ogType, ogDescription, main, preloadProduct = false, jsonLd = "" }) {
  return `<!doctype html>
<html lang="zh-CN">
  ${head({ lang: "zh-CN", title, description, keywords, path, ogType, ogDescription, preloadProduct, jsonLd })}
  <body>
    ${header(path)}
    <main>
${main}
    </main>
    ${footer()}
  </body>
</html>`;
}

function installPanel(id = "install-zh") {
  return `<section class="guide-install-panel" aria-labelledby="${id}">
          <h2 id="${id}">试用备份流程</h2>
          <p>
            先用测试项目验证。安装 alpha 版本，在项目目录中运行 setup，再创建私有恢复点。
          </p>
          <div class="guide-install-actions">
            <div class="command-line" aria-label="npm 安装命令" role="button" tabindex="0" data-analytics-copy="install-command">
              <code id="install-command">npm install -g aicodebackup@alpha</code>
              <span class="copy-button" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="9" y="9" width="10" height="10" rx="2" />
                  <path d="M5 15V7a2 2 0 0 1 2-2h8" />
                </svg>
              </span>
            </div>
            <a class="button primary" href="${npmUrl}">安装 alpha</a>
          </div>
        </section>`;
}

function resourceIcon(path) {
  if (path.includes("github-backup-without-git")) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 6.5A5.5 5.5 0 0 0 6.5 4H4v15h2.5A5.5 5.5 0 0 1 12 21" />
              <path d="M12 6.5A5.5 5.5 0 0 1 17.5 4H20v15h-2.5A5.5 5.5 0 0 0 12 21" />
              <path d="M12 6.5V21" />
            </svg>`;
  }

  if (path.includes("private-github-backup-for-ai-code")) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>`;
  }

  if (path.includes("backup-ai-generated-code") || path.includes("automatic-github-backup-for-ai-coding")) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4 5 7v5c0 4.5 2.9 7 7 8 4.1-1 7-3.5 7-8V7z" />
              <path d="m9 12 2 2 4-5" />
            </svg>`;
  }

  return `<svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9a2.8 2.8 0 0 1 5 1.7c0 1.8-2.5 2.1-2.5 3.8" />
              <path d="M12 17h.01" />
            </svg>`;
}

function renderHome() {
  const jsonLd = `      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "AICodeBackup",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Windows, macOS",
        "inLanguage": "zh-CN",
        "description": "一个把 AI 编程项目备份到私有 GitHub 仓库的 CLI 工具，帮助用户不用先学习 Git 也能创建恢复点。",
        "url": "https://www.aicodebackup.com/zh-CN/",
        "downloadUrl": "${npmUrl}",
        "softwareVersion": "0.2.0-alpha.2",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "publisher": {
          "@type": "Organization",
          "name": "AICodeBackup",
          "url": "https://www.aicodebackup.com/",
          "email": "${contactEmail}"
        }
      }`;

  const main = `      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-grid">
          <div class="hero-copy">
            <h1 id="hero-title">别让 AI 生成的代码丢失</h1>
            <p>
              AICodeBackup 是一个 AI 代码备份 CLI，把本地项目保存为私有 GitHub 恢复点。
              在崩溃、重置或长时间 AI 编程会话结束前，先给重要工作留下一份安全副本。
            </p>
            <div class="command-line" aria-label="npm 安装命令" role="button" tabindex="0" data-analytics-copy="install-command">
              <code id="install-command">npm install -g aicodebackup@alpha</code>
              <span class="copy-button" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="9" y="9" width="10" height="10" rx="2" />
                  <path d="M5 15V7a2 2 0 0 1 2-2h8" />
                </svg>
              </span>
            </div>
            <div class="hero-actions">
              <a class="button primary" href="${npmUrl}">安装 alpha</a>
              <a class="button secondary" href="${repoUrl}">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.7.6-3.3-1.1-3.3-1.1-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.3-2.2-.2-4.5-1.1-4.5-4.8 0-1.1.4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 4.9 0c1.8-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.8-2.3 4.6-4.5 4.8.4.3.8 1 .8 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
                </svg>
                查看 GitHub
              </a>
            </div>
            <ul class="proof-list" aria-label="产品保证">
              <li>默认私有</li>
              <li>支持 Windows 和 macOS</li>
            </ul>
          </div>
          <figure class="hero-visual">
            <img
              src="/assets/product-preview.svg"
              width="1120"
              height="780"
              alt="AICodeBackup 终端显示 setup、私有 GitHub 仓库创建、backup 和 doctor 状态"
            />
          </figure>
        </div>
      </section>

      <section class="risk-strip" aria-labelledby="risk-title">
        <div class="risk-panel">
          <div class="risk-lead">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3 5 6v5c0 4.5 2.9 7 7 8 4.1-1 7-3.5 7-8V6z" />
              <path d="M12 8v5" />
              <path d="M12 16h.01" />
            </svg>
            <h2 id="risk-title"><span>AI 写代码很快</span><span>丢代码也很快</span></h2>
          </div>
          <div class="risk-items">
            <article>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h16" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M6 7l1 14h10l1-14" />
                <path d="M9 7V4h6v3" />
              </svg>
              <strong>工作丢失</strong>
              <p>崩溃、重置或误删都可能让项目消失。</p>
            </article>
            <article>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5h16v12H4z" />
                <path d="M9 9h6" />
                <path d="M9 13h6" />
                <path d="M8 21h8" />
              </svg>
              <strong>没有备份</strong>
              <p>AI 工具不会自动替你保存源码。</p>
            </article>
            <article>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 7 10 10" />
                <path d="M17 7h-4a5 5 0 0 0-5 5v5" />
                <path d="M7 17h4a5 5 0 0 0 5-5V7" />
              </svg>
              <strong>副本混乱</strong>
              <p>散落的文件夹和版本会让恢复变困难。</p>
            </article>
            <article>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              <strong>隐私风险</strong>
              <p>公开仓库或普通同步盘可能暴露敏感代码。</p>
            </article>
          </div>
        </div>
      </section>

      <section id="how-it-works" class="steps-section" aria-labelledby="how-title">
        <div class="section-heading">
          <h2 id="how-title">四步建立安全备份</h2>
          <p>第一次连接 GitHub，之后在终端里重复备份。</p>
        </div>
        <div class="workflow">
          <article class="workflow-step">
            <div class="icon-shell" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M13 4c3.5.8 5.2 2.5 6 6l-4.8 4.8-4.9-4.9z" />
                <path d="M9.3 9.9 5.5 11l-1.2 3.9 4.3-.8" />
                <path d="m14.2 14.8-.8 4.3 3.9-1.2 1.1-3.8" />
                <path d="M7 17c-1.1.3-2 .9-2.8 1.8C5.1 18 5.7 17.1 6 16" />
              </svg>
            </div>
            <strong>安装安全层</strong>
            <p>AICodeBackup 检查 Git 和 GitHub CLI，并在可行时安装缺失工具。</p>
          </article>
          <article class="workflow-step">
            <div class="icon-shell" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M17.5 17a4.5 4.5 0 0 0-1-8.9 6 6 0 0 0-11.3 2.2A3.7 3.7 0 0 0 6.7 17" />
                <path d="M12 19V9" />
                <path d="m8 13 4-4 4 4" />
              </svg>
            </div>
            <strong>连接 GitHub</strong>
            <p>新用户可以创建账号，已有用户通过默认浏览器完成授权。</p>
          </article>
          <article class="workflow-step">
            <div class="icon-shell" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 4 5 7v5c0 4.5 2.9 7 7 8 4.1-1 7-3.5 7-8V7z" />
                <path d="m9 12 2 2 4-5" />
              </svg>
            </div>
            <strong>安全备份</strong>
            <p>项目默认备份到私有 GitHub 仓库，为每个有价值阶段留下恢复点。</p>
          </article>
          <article class="workflow-step">
            <div class="icon-shell" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 12a8 8 0 0 1 13.7-5.7" />
                <path d="M20 6v5h-5" />
                <path d="M20 12a8 8 0 0 1-13.7 5.7" />
                <path d="M4 18v-5h5" />
              </svg>
            </div>
            <strong>持续监控</strong>
            <p>使用 watch 检测长会话、较大改动和过久未备份的风险。</p>
          </article>
        </div>
      </section>

      <section id="commands" class="commands-panel" aria-labelledby="commands-title">
        <div class="section-heading">
          <h2 id="commands-title">覆盖完整流程的核心命令</h2>
          <p>初始化、备份、恢复、健康检查和风险监控都覆盖 AI 编程项目的关键保护流程。</p>
        </div>
        <div class="command-grid">
          <article class="command-card"><code>aicodebackup setup</code><p>初始化项目，安装或检查依赖，连接 GitHub，并创建私有仓库。</p></article>
          <article class="command-card"><code>aicodebackup backup</code><p>保存当前项目状态，提交并推送到 GitHub，形成安全恢复点。</p></article>
          <article class="command-card"><code>aicodebackup doctor</code><p>检查 Git、GitHub CLI、登录状态、远程仓库和最近备份状态。</p></article>
          <article class="command-card"><code>aicodebackup watch</code><p>监控文件变更、Diff 大小和备份间隔；也可使用 <code>--auto</code> 自动备份。</p></article>
          <article class="command-card"><code>aicodebackup restore</code><p>列出最近远程备份，或恢复到当前项目外的新目录，避免覆盖本地工作。</p></article>
        </div>
      </section>

      <section id="platforms" class="platform-section" aria-labelledby="platforms-title">
        <div class="section-heading">
          <h2 id="platforms-title">支持 Windows 和 macOS</h2>
          <p>面向日常使用平台的顺滑安装和备份体验。</p>
        </div>
        <div class="platform-list">
          <article>
            <svg class="platform-logo" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 5.2 10.7 4v7.4H3z" />
              <path d="M12 3.8 21 2.5v8.9h-9z" />
              <path d="M3 12.6h7.7V20L3 18.8z" />
              <path d="M12 12.6h9v8.9L12 20.2z" />
            </svg>
            <div>
              <strong>Windows PowerShell</strong>
              <p>setup 会在工具缺失时尝试通过 winget 安装 Git 和 GitHub CLI。</p>
              <a href="/zh-CN/guides/">查看 Windows 指南</a>
            </div>
          </article>
          <article>
            <svg class="platform-logo filled" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16.8 12.8c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.3.7-2.9.7-.6 0-1.5-.7-2.5-.7-1.3 0-2.5.8-3.2 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.2 2.6 2.1 1 0 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.7 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4 0 0-2.8-1.1-2.8-3Zm-2-6c.6-.7 1-1.6.9-2.6-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.5 1 0 2-.5 2.5-1.2Z" />
            </svg>
            <div>
              <strong>macOS Terminal</strong>
              <p>setup 会在可用时使用 Homebrew，并启动安全的 GitHub 浏览器登录。</p>
              <a href="/zh-CN/guides/">查看 macOS 指南</a>
            </div>
          </article>
        </div>
      </section>

      <section class="resources-section" aria-labelledby="guides-title">
        <div class="section-heading">
          <h2 id="guides-title">指南和资源</h2>
          <p>开始使用并保持安全所需的关键说明。</p>
        </div>
        <div class="resource-grid">
          ${guideCards.slice(2, 6).map((guide) => `<a class="resource-card" href="${guide.zhPath}">
            ${resourceIcon(guide.zhPath)}
            <strong>${guide.title}</strong>
            <p>${guide.summary}</p>
            <span>阅读指南</span>
          </a>`).join("\n          ")}
        </div>
      </section>

      <section id="faq" class="faq-section" aria-labelledby="faq-title">
        <div class="section-heading">
          <h2 id="faq-title">常见问题</h2>
        </div>
        <div class="faq-list">
          <details><summary>我需要会 Git 吗？</summary><p>不需要。AICodeBackup 把常见 Git 设置、提交和推送包装成简单命令。</p></details>
          <details><summary>我需要 GitHub 账号吗？</summary><p>需要。如果还没有账号，setup 会打开 GitHub 注册；登录后通过 GitHub CLI 授权。</p></details>
          <details><summary>我的代码真的是私有的吗？</summary><p>是。创建新仓库时默认使用 GitHub 私有仓库。</p></details>
          <details><summary>代码保存在哪里？</summary><p>代码保存在你自己的私有 GitHub 仓库中，而不是 AICodeBackup 托管的代码存储服务。</p></details>
          <details><summary>什么时候应该备份？</summary><p>功能跑通后、危险跨文件 AI 改动前，以及长时间编码会话结束前都应该备份。</p></details>
          <details><summary>卸载后会怎样？</summary><p>你的 GitHub 仓库和备份仍然保留在你的 GitHub 账号中。</p></details>
          <details><summary>AICodeBackup 免费吗？</summary><p>alpha CLI 免费，并以 MIT License 开源。</p></details>
        </div>
      </section>`;

  writePage("/zh-CN/", page({
    path: "/zh-CN/",
    title: "AI 代码备份到私有 GitHub 仓库 | AICodeBackup",
    description: "AICodeBackup 帮助 AI 编程用户把本地项目备份到私有 GitHub 仓库，提供 setup、backup、doctor、watch 和 restore 命令，支持 Windows 和 macOS。",
    keywords: "AI 代码备份, AI 编程备份, 备份 AI 生成代码, Cursor 备份, Claude Code 备份, Codex 备份",
    ogDescription: "不用先学习 Git，也能把 AI 编程项目备份到私有 GitHub 仓库。",
    main,
    preloadProduct: true,
    jsonLd,
  }));
}

function renderGuidesIndex() {
  const main = `      <section class="page-hero">
        <h1>AI 代码备份指南。</h1>
        <p>
          面向 AI 编程用户的实用指南：保护 AI 生成代码，设置私有 GitHub 备份，并避免本地项目丢失。
        </p>
      </section>
      <section class="content-page">
        <div class="content-card-list">
          ${guideCards.map((guide) => `<a href="${guide.zhPath}"><strong>${guide.title}</strong><p>${guide.summary}</p></a>`).join("\n          ")}
        </div>
      </section>`;

  writePage("/zh-CN/guides/", page({
    path: "/zh-CN/guides/",
    title: "AI 代码备份指南 | AICodeBackup",
    description: "阅读 AICodeBackup 中文指南，学习如何保护 AI 生成代码、设置私有 GitHub 备份，并避免本地 AI 项目丢失。",
    keywords: "AI 代码备份指南, GitHub 备份指南, Cursor 备份, Claude Code 备份, Codex 备份",
    ogDescription: "保护 AI 生成代码和私有 GitHub 备份的中文指南。",
    main,
  }));
}

function renderInfoPages() {
  const pages = [
    {
      path: "/zh-CN/about/",
      title: "关于 AICodeBackup | 私有 AI 代码备份",
      description: "了解 AICodeBackup 的维护方式、开源 CLI 的目标，以及它如何帮助 AI 编程用户把本地项目备份到私有 GitHub 仓库。",
      keywords: "关于 AICodeBackup, AI 代码备份项目, 私有 GitHub 备份 CLI",
      h1: "关于 AICodeBackup。",
      intro: "AICodeBackup 是一个开源 CLI，面向使用 AI 编程工具构建软件的人，帮助他们在本地工作消失前建立简单的私有 GitHub 备份习惯。",
      sections: [
        ["项目为什么存在", "AI 编程工具可以快速创建和修改代码，但本地项目仍可能因为重置、误删、失败实验或混乱副本而丢失。AICodeBackup 让项目更容易进入私有 GitHub 仓库，不要求用户在第一次备份前先学会完整 Git 工作流。"],
        ["AICodeBackup 做什么", "CLI 会检查本地依赖，帮助连接 GitHub，创建或连接私有仓库，并在终端中运行备份。它关注实用恢复点：setup、backup、doctor、watch 和 restore。"],
        ["项目状态", "AICodeBackup 目前是 alpha 软件，以 MIT License 开源发布。源代码在 GitHub，安装包在 npm。"],
        ["维护和支持", `公开项目通过 <a href="${repoUrl}">AICodeBackup GitHub 仓库</a> 维护。支持、隐私问题或项目反馈请联系 <a href="mailto:${contactEmail}">${contactEmail}</a>。`],
      ],
    },
    {
      path: "/zh-CN/privacy/",
      title: "AICodeBackup 用户隐私政策",
      description: "阅读 AICodeBackup 隐私政策，了解网站和 alpha CLI 可能处理哪些信息，以及如何联系项目维护者。",
      keywords: "AICodeBackup 隐私政策, AI 代码备份隐私",
      h1: "隐私政策。",
      intro: "最后更新：2026 年 6 月 17 日。",
      sections: [
        ["概述", "AICodeBackup 是一个开源 alpha CLI 和静态网站。本政策说明公共网站和 CLI 的基本隐私边界。"],
        ["网站信息", "网站托管在 Vercel。托管服务可能为了安全、分发和运维处理标准请求信息，例如 IP 地址、user agent、请求 URL 和时间戳。"],
        ["网站分析", "网站使用 Google Analytics 了解汇总流量和 product-interest events，例如页面浏览、安装命令复制、npm、GitHub、邮件点击、主要 CTA 点击和语言切换。这些分析不会收集源代码（source code）、本地项目文件、GitHub 仓库内容或 CLI 备份数据。"],
        ["CLI 行为", "alpha CLI 在你的机器上运行，并在你选择 setup 或 backup 时使用本地 Git、GitHub CLI 和 GitHub。仓库创建、认证和代码推送由 GitHub 工具和 GitHub 服务处理。"],
        ["联系", `隐私问题请联系 <a href="mailto:${contactEmail}">${contactEmail}</a>。`],
      ],
    },
    {
      path: "/zh-CN/terms/",
      title: "AICodeBackup 用户使用条款",
      description: "阅读 AICodeBackup 网站和 alpha CLI 的使用条款，包括 alpha 状态、用户责任、开源许可和联系方式。",
      keywords: "AICodeBackup 使用条款, AI 代码备份条款",
      h1: "使用条款。",
      intro: "最后更新：2026 年 6 月 17 日。",
      sections: [
        ["Alpha 状态", "AICodeBackup 目前是 alpha 软件，可能包含缺陷、限制或行为变化。请先在测试项目中验证，再用于重要工作。"],
        ["用户责任", "你需要负责自己的项目文件、GitHub 账号、认证状态、仓库设置和备份验证。不要把密钥、令牌、cookie、恢复码或真实用户数据提交到仓库。"],
        ["开源许可", "AICodeBackup CLI 以 MIT License 开源发布。请查看 GitHub 仓库中的许可证和源码。"],
        ["无保证", "工具按现状提供，不承诺适合特定用途，也不保证能防止所有数据丢失。你仍应根据项目重要性保留额外备份。"],
        ["联系", `条款问题请联系 <a href="mailto:${contactEmail}">${contactEmail}</a>。`],
      ],
    },
  ];

  for (const infoPage of pages) {
    const main = `      <section class="page-hero">
        <h1>${infoPage.h1}</h1>
        <p>${infoPage.intro}</p>
      </section>
      <article class="content-page">
        ${infoPage.sections.map(([heading, body]) => `<h2>${heading}</h2>\n        <p>${body}</p>`).join("\n        ")}
      </article>`;

    writePage(infoPage.path, page({
      path: infoPage.path,
      title: infoPage.title,
      description: infoPage.description,
      keywords: infoPage.keywords,
      ogDescription: infoPage.description,
      main,
    }));
  }
}

function renderArticle(article) {
  const guide = guideCards.find((item) => item.zhPath.endsWith(`/${article.slug}/`));
  const path = guide.zhPath;
  const related = article.related
    .map((slug) => guideCards.find((item) => item.zhPath.endsWith(`/${slug}/`)))
    .filter(Boolean);
  const main = `      <section class="page-hero">
        <h1>${article.h1}</h1>
        <p>${article.intro}</p>
      </section>
      <article class="content-page guide-article">
        <h2>快速答案</h2>
        ${article.quick.map((paragraph) => `<p>${paragraph}</p>`).join("\n        ")}
        ${installPanel(`install-${article.slug}`)}
        ${article.sections.map((section) => {
          if (section.list) {
            return `<h2>${section.heading}</h2>\n        <ol>\n          ${section.list.map((item) => `<li>${item}</li>`).join("\n          ")}\n        </ol>`;
          }

          return `<h2>${section.heading}</h2>\n        <p>${section.body}</p>`;
        }).join("\n        ")}
        <section class="related-guides" aria-labelledby="related-${article.slug}">
          <h2 id="related-${article.slug}">相关指南</h2>
          <div class="related-guide-grid">
            ${related.map((item) => `<a href="${item.zhPath}"><strong>${item.title}</strong><span>${item.summary}</span></a>`).join("\n            ")}
          </div>
        </section>
        <h2>FAQ</h2>
        <h3>我需要先学会 Git 吗？</h3>
        <p>不需要。AICodeBackup 仍然使用 Git 和 GitHub，但日常流程是 setup、backup、watch、doctor 和 restore。</p>
        <h3>备份会让仓库公开吗？</h3>
        <p>不会。为项目创建新仓库时，setup 默认创建私有 GitHub 仓库。</p>
        <h3>这能替代专业 Git 工作流吗？</h3>
        <p>不能。它是 AI 编程用户的安全层，用来在完整 Git 习惯建立之前先获得可靠的私有恢复点。</p>
      </article>`;

  writePage(path, page({
    path,
    title: article.title,
    description: article.description,
    keywords: `${guide.title}, AI 代码备份, GitHub 私有备份, AICodeBackup`,
    ogType: "article",
    ogDescription: article.ogDescription,
    main,
  }));
}

function updateEnglishPages() {
  for (const enPath of englishPaths) {
    const filePath = filePathFor(enPath);
    const zhPath = zhPathFor(enPath);
    const enUrl = `${canonicalHost}${enPath}`;
    const zhUrl = `${canonicalHost}${zhPath}`;
    let html = readFileSync(filePath, "utf8");
    const alternateBlock = `    <link rel="canonical" href="${enUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
    <link rel="alternate" hreflang="x-default" href="${enUrl}" />`;

    html = html.replace(
      / {4}<link rel="canonical" href="https:\/\/www\.aicodebackup\.com\/[^"]*" \/>\r?\n(?: {4}<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>\r?\n)*/u,
      `${alternateBlock}\n`,
    );
    html = html.replace(
      /<a class="language-switch"[\s\S]*?<\/a>/u,
      languageSwitch("en", zhPath),
    );
    writeFileSync(filePath, html, "utf8");
  }
}

function renderSitemap() {
  const entryMeta = new Map([
    ["/", ["weekly", "1.0"]],
    ["/zh-CN/", ["weekly", "0.8"]],
    ["/about/", ["monthly", "0.6"]],
    ["/zh-CN/about/", ["monthly", "0.6"]],
    ["/guides/", ["weekly", "0.8"]],
    ["/zh-CN/guides/", ["weekly", "0.8"]],
    ["/privacy/", ["yearly", "0.4"]],
    ["/zh-CN/privacy/", ["yearly", "0.4"]],
    ["/terms/", ["yearly", "0.4"]],
    ["/zh-CN/terms/", ["yearly", "0.4"]],
  ]);
  const paths = [
    "/",
    "/zh-CN/",
    "/about/",
    "/zh-CN/about/",
    "/guides/",
    "/zh-CN/guides/",
    ...guideCards.flatMap((guide) => [guide.path, guide.zhPath]),
    "/privacy/",
    "/zh-CN/privacy/",
    "/terms/",
    "/zh-CN/terms/",
  ];
  const urls = paths.map((path) => {
    const [changefreq, priority] = entryMeta.get(path) ?? ["monthly", path.startsWith("/zh-CN/") ? "0.7" : "0.75"];
    return `  <url>
    <loc>${canonicalHost}${path}</loc>
    <lastmod>2026-06-21</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  writeFileSync(
    join(publicRoot, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`,
    "utf8",
  );
}

updateEnglishPages();
renderHome();
renderGuidesIndex();
renderInfoPages();
for (const article of articlePages) {
  renderArticle(article);
}
renderSitemap();
