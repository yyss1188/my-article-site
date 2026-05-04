window.SITE_POSTS = [
  {
    slug: "openai-vs-claude-code-prompting",
    title: "OpenAI 和 Claude Code 的提示词方法为什么不一样",
    date: "2026-05-04",
    author: "站长",
    summary: "同样是让 AI 帮你做事，OpenAI 更强调目标、验证和可复用工作流，Claude Code 更强调项目记忆、交互节奏和工具化约束。",
    tags: ["AI", "提示词", "工具"],
    readingTime: "7 分钟",
    content: `
      <p>最近很多人会把 OpenAI 的 Codex、ChatGPT，和 Anthropic 的 Claude Code 放在一起比较。它们看起来都能写代码、读文件、改项目、回答问题，但如果你真的想把它们用顺手，会发现提示词的方向并不完全一样。</p>
      <p>一句话概括：OpenAI 这边更像是在训练一个“可验证的执行代理”，你要告诉它目标、上下文、成功标准和验证方式；Claude Code 这边更像是在和一个住在终端里的结对工程师合作，你要善用 CLAUDE.md、计划模式、斜杠命令、子代理和 hooks，把习惯沉淀到工具环境里。</p>

      <h2>OpenAI：少一点咒语，多一点任务规格</h2>
      <p>OpenAI 官方对新一代推理模型的建议很明确：提示词要简单、直接，不需要反复要求模型“think step by step”。更有用的是把任务讲清楚：我要什么结果、有哪些限制、哪些文件或资料是上下文、最后怎么验证。</p>
      <p>如果是 Codex 这种编码代理，提示词尤其应该包含“怎么判断做完了”。例如：复现 bug 的步骤、要跑的测试、lint 或 pre-commit 检查、验收条件。官方 Codex 文档也强调，Codex 在能验证自己工作时通常会产出更好的结果；复杂任务最好拆成更小、更聚焦的步骤。</p>
      <p>所以给 OpenAI/Codex 的好提示，通常像一张小任务单：</p>
      <blockquote>请修复登录页在移动端按钮换行的问题。先检查相关组件和样式，只改必要文件；完成后运行前端测试和 lint；最后告诉我改了哪些文件、如何验证。</blockquote>

      <h2>Claude Code：把提示词变成项目习惯</h2>
      <p>Claude Code 的特色是很多“提示词”不一定只写在聊天框里。它鼓励你把长期规则放进 CLAUDE.md，把常用动作做成 slash commands，把专门任务交给 subagents，把必须执行的约束交给 hooks。</p>
      <p>这意味着 Claude Code 的方法更偏“环境配置”。你不是每次都重新解释团队规范，而是让项目自己带着说明书。比如在 CLAUDE.md 里写清楚架构、常用测试命令、代码风格、哪些目录不能乱动；在 .claude/commands 里放常用提示；在 hooks 里规定改完某类文件自动格式化或阻止危险命令。</p>
      <p>Claude Code 也很适合先探索再动手。它的 Plan Mode 明确适合多文件改动、复杂重构和安全分析：先让 Claude 只读代码、梳理方案，再决定是否开始改。</p>

      <h2>两家的差异，不是“谁更会听话”</h2>
      <p>更准确地说，它们的产品假设不同。OpenAI 的 Codex 更强调代理循环里的任务完成、上下文压缩、验证闭环、可复用 skills，以及 AGENTS.md 这类分层指令。它适合把一次任务说清楚，然后让代理读代码、改文件、跑命令、汇报结果。</p>
      <p>Claude Code 更强调终端里的长期协作体验。CLAUDE.md 是项目记忆，settings 控制权限和工具行为，slash commands 固化常用提示，hooks 把“最好这样做”升级成“每次都会执行”。它适合把团队习惯沉到仓库里，让 AI 像加入项目的新人一样读规则。</p>

      <h2>实际使用时怎么选提示方式</h2>
      <p>如果你在用 OpenAI 或 Codex，我建议这样写：明确任务目标，给相关文件或截图，说明限制，要求它自己验证，并让它最后汇报改动和测试结果。重点是“结果可检查”。</p>
      <p>如果你在用 Claude Code，我建议这样做：先维护好 CLAUDE.md，再把重复工作做成 slash commands；复杂任务先开 Plan Mode；对于安全、格式化、测试这类不能靠模型自觉的事项，用 settings 或 hooks 固化。重点是“习惯可复用”。</p>
      <p>如果你只是日常聊天、写作、总结资料，两家都适合清楚表达目标和上下文。但如果进入代码仓库，差别就会变明显：OpenAI 更像你给它一张验收清晰的工单；Claude Code 更像你把一位同事放进配置好的开发环境里。</p>

      <h2>一个简单模板</h2>
      <p>给 OpenAI/Codex 可以这样写：</p>
      <blockquote>目标：完成 X。背景：相关文件是 A/B/C。限制：不要改公共 API，不要新增依赖。验证：运行 npm test 和 npm run lint。输出：总结改动、测试结果、剩余风险。</blockquote>
      <p>给 Claude Code 可以这样写：</p>
      <blockquote>先进入 Plan Mode，阅读 CLAUDE.md 和相关模块，给出修改方案。确认方案后再改代码。请遵守项目记忆里的测试命令和代码风格；如果发现规则缺失，建议补充到 CLAUDE.md 或 slash command。</blockquote>

      <h2>我的判断</h2>
      <p>提示词正在从“写一句神奇的话”变成“设计一个工作流”。OpenAI 的路线提醒我们：把目标、约束和验证说清楚；Claude Code 的路线提醒我们：把重复的提示变成项目记忆和工具规则。真正好用的 AI 技巧，不是背模板，而是让 AI 知道它在什么环境里、要交付什么、怎样才算交付完成。</p>

      <h2>参考来源</h2>
      <p>OpenAI Codex 文档：<a href="https://developers.openai.com/codex/prompting" target="_blank" rel="noopener">Prompting</a>、<a href="https://developers.openai.com/codex/guides/agents-md" target="_blank" rel="noopener">AGENTS.md</a>、<a href="https://developers.openai.com/codex/skills" target="_blank" rel="noopener">Agent Skills</a>；OpenAI API 文档：<a href="https://developers.openai.com/api/docs/guides/reasoning-best-practices" target="_blank" rel="noopener">Reasoning best practices</a>。</p>
      <p>Anthropic 文档：<a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" rel="noopener">Claude Code memory</a>、<a href="https://docs.anthropic.com/en/docs/claude-code/tutorials" target="_blank" rel="noopener">Common workflows</a>、<a href="https://docs.anthropic.com/en/docs/claude-code/slash-commands" target="_blank" rel="noopener">Slash commands</a>、<a href="https://docs.anthropic.com/en/docs/claude-code/hooks-guide" target="_blank" rel="noopener">Hooks guide</a>。</p>
    `
  },
  {
    slug: "why-this-site-exists",
    title: "建站初心：把小发现留在风里",
    date: "2026-04-29",
    author: "站长",
    summary: "这个网站用来记录自己的小发现、分享真正帮到过我的东西，也尽量把信息差说清楚。",
    tags: ["初心", "建站"],
    readingTime: "3 分钟",
    content: `
      <p>我做这个网站，不是为了把自己包装成什么意见领袖，而是想给一些小发现留一个稳定的位置。</p>
      <p>有些东西不够宏大，不适合写成长篇论文；也不够即时，不适合只发在社交平台里一闪而过。但它们确实有用：一个工具、一条路径、一种理解问题的角度，或者某个被很多人忽略的背景。</p>
      <h2>我想写什么</h2>
      <p>这里会放三类内容：第一是我自己观察到的小发现；第二是我实际用过、确认有帮助的方法和资源；第三是把复杂信息重新讲清楚，尽量减少读者因为不知道入口而浪费的时间。</p>
      <blockquote>写作不是把风装进口袋，而是告诉别人风大概从哪里吹来。</blockquote>
      <p>如果一篇文章能让人少查半小时资料、少踩一个坑，或者突然明白某件事背后的逻辑，它就完成了自己的任务。</p>
    `
  },
  {
    slug: "how-i-share-useful-things",
    title: "我会怎样分享有帮助的东西",
    date: "2026-04-29",
    author: "站长",
    summary: "有用的信息不只是链接清单，还应该包括适用场景、限制条件和我自己的判断。",
    tags: ["方法", "分享"],
    readingTime: "4 分钟",
    content: `
      <p>我希望这里的分享尽量克制一点。不是看到什么热门就转发什么，也不是把一堆链接堆给读者，而是尽量说清楚：它解决什么问题，适合谁，不适合谁，我为什么觉得它值得被看见。</p>
      <h2>先说使用场景</h2>
      <p>同一个工具或方法，对不同的人价值差别很大。所以我会尽量先写清楚它适合的场景，比如学习、写作、数据处理、资料整理，或者某个具体问题的入门。</p>
      <h2>再说限制</h2>
      <p>真正有帮助的分享，不能只写优点。它的门槛、成本、替代方案、可能踩坑的地方，也应该一起写出来。这样读者才能判断它是不是适合自己。</p>
      <h2>最后给出判断</h2>
      <p>我会尽量把自己的判断摆在明处：哪些是事实，哪些是经验，哪些只是我目前的理解。这样即使你不同意，也能知道分歧在哪里。</p>
    `
  },
  {
    slug: "bridging-information-gaps",
    title: "打破信息差：把入口讲清楚",
    date: "2026-04-29",
    author: "站长",
    summary: "很多信息差并不是能力差距，而是入口、语境和关键词没有被讲明白。",
    tags: ["信息差", "观察"],
    readingTime: "3 分钟",
    content: `
      <p>很多时候，人和人之间的差距并不是谁更聪明，而是谁更早知道入口在哪里。</p>
      <p>一个专业名词、一个正确的搜索关键词、一个可靠的资料源，都会让问题突然变得可处理。反过来，如果不知道这些入口，再努力也可能只是在外围打转。</p>
      <h2>我想补上的部分</h2>
      <p>我会尽量把文章写成可以进入某个领域的小路标：先解释背景，再给出关键词，然后说明下一步可以去哪里看。不是替读者完成所有判断，而是让判断有一个更公平的起点。</p>
      <h2>信息也需要语境</h2>
      <p>单独的信息很容易变成碎片。把它放回语境里，说明它为什么重要、从哪里来、会影响什么，读者才更容易真正使用它。</p>
      <p>这也是“风从哪来”这个名字对我的意义：不只是看见风吹过，还想追问它从哪里起势。</p>
    `
  }
];
