# 12-Factor Agents - 寫給初學者的可靠 LLM 應用程式開發指南 (正體中文版)

<div align="center">
<a href="https://www.apache.org/licenses/LICENSE-2.0">
        <img src="https://img.shields.io/badge/Code-Apache%202.0-blue.svg" alt="Code License: Apache 2.0"></a>
<a href="https://creativecommons.org/licenses/by-sa/4.0/">
        <img src="https://img.shields.io/badge/Content-CC%20BY--SA%204.0-lightgrey.svg" alt="Content License: CC BY-SA 4.0"></a>
<a href="https://humanlayer.dev/discord">
    <img src="https://img.shields.io/badge/chat-discord-5865F2" alt="Discord Server"></a>
</div>

<p></p>

## TL;DR (懶人包) & 初學者導覽

哈囉，你好！歡迎來到「12-Factor Agent」的中文世界。

本專案的原作者是 [Dex](https://github.com/dexhorthy)，他提出了 12 個關於建構可靠、可擴展、可維護的 LLM 應用程式的設計原則，深受軟體工程界的經典「[12 Factor Apps](https://12factor.net/zh_cn/)」所啟發。

這個 repo 的 `zh-tw` 版本，旨在將這些寶貴的原則，以更**適合初學者**、更**貼近台灣開發者習慣**的方式呈現。我們不僅會用正體中文來說明，更會加入使用 **Claude** 和 **Gemini** 等最新模型的**動手實作範例**，讓你從零開始，一步步學會如何打造高品質的 AI Agent。

### 學習路徑

我們建議你按照以下順序學習：

1.  **[AI Agent 入門指南：寫給完全初學者的第一堂課](./content/zh-tw/introduction-to-agents.md)**
    *   在開始之前，我們先用最簡單的方式搞懂什麼是 AI Agent。

2.  **The 12 Factors (12 個原則)**
    *   接下來，我們會逐一探索這 12 個核心原則。每個原則都會有概念說明和程式碼範例。

*   **[Factor 1：自然語言轉換為工具呼叫](./content/zh-tw/factor-01-natural-language-to-tool-calls.md)**
*   **[Factor 2：掌握你的提示](./content/zh-tw/factor-02-own-your-prompts.md)**
*   **[Factor 3：掌握你的情境視窗](./content/zh-tw/factor-03-own-your-context-window.md)**
*   **[Factor 4：工具即結構化輸出](./content/zh-tw/factor-04-tools-are-structured-outputs.md)**
*   **[Factor 5：統一執行狀態與業務狀態](./content/zh-tw/factor-05-unify-execution-state.md)**
*   **[Factor 6：透過簡單的 API 啟動/暫停/恢復](./content/zh-tw/factor-06-launch-pause-resume.md)**
*   **[Factor 7：透過工具與人類聯繫](./content/zh-tw/factor-07-contact-humans-with-tools.md)**
*   **[Factor 8：掌握你的控制流程](./content/zh-tw/factor-08-own-your-control-flow.md)**
*   **[Factor 9：精簡化錯誤](./content/zh-tw/factor-09-compact-errors.md)**
*   **[Factor 10：專注、小型的 Agent](./content/zh-tw/factor-10-small-focused-agents.md)**
*   **[Factor 11：從任何地方觸發](./content/zh-tw/factor-11-trigger-from-anywhere.md)**
*   **[Factor 12：將你的 Agent 當作一個無狀態的 Reducer](./content/zh-tw/factor-12-stateless-reducer.md)**

### 為什麼要關心這個？

你是否也曾滿腔熱血地想打造一個 AI Agent，卻發現：
- 隨便套用一個現成的 Agent 框架，效果不如預期？
- 想微調 Agent 的行為，卻不知從何下手？
- Agent 的表現時好時壞，非常不穩定？

這份指南就是為了解決這些問題而生。我們相信，與其追求一個能解決所有問題的萬能框架，不如回歸軟體工程的本質，掌握那些能讓你的 LLM 應用程式變得更可靠、更強大的核心原則。

準備好開始了嗎？讓我們一起動手，打造出真正能上線服務的 AI Agent 吧！

---
---

## 英文版 README 完整翻譯

以下為對英文版 [README.md](README.md) 的完整翻譯，保留了原作者的觀點和心路歷程，供想深入了解的讀者參考。

<br>

*秉持 [12-Factor Apps](https://12factor.net/zh_cn/) 的精神*。 *本專案的原始碼公開於 https://github.com/humanlayer/12-factor-agents，歡迎您的回饋與貢獻。讓我們一起搞定它！*

> [!TIP]
> 錯過了 AI 工程師世界博覽會嗎？[在這裡觀看演講](https://www.youtube.com/watch?v=8kMaTybvDUw)
>
> 在找情境工程 (Context Engineering) 的資料嗎？[直接跳到 Factor 3](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-03-own-your-context-window.md)
>
> 想為 `npx/uvx create-12-factor-agent` 做出貢獻嗎？ - [看看這個討論串](https://github.com/humanlayer/12-factor-agents/discussions/61)

嗨，我是 Dex。我[鑽研](https://youtu.be/8bIHcttkOTE) [AI agent](https://theouterloop.substack.com) 已經有[一段時間](https://humanlayer.dev)了。

**我試過了市面上所有的 agent 框架**，從隨插即用的 crew/langchains，到「極簡主義」的 smolagents，再到「生產級別」的 langraph、griptape 等等。

**我跟很多非常優秀的創辦人聊過**，無論是否來自 YC，他們都在用 AI 打造令人驚豔的東西。他們中的大多數人都是自己打造技術棧。我沒看到太多框架被用在生產環境中直接面對客戶的 agent。

**我驚訝地發現**，市面上那些自稱為「AI Agent」的產品，其實並沒有那麼「agentic」（具備自主性）。它們中的很多，主要還是確定性的程式碼，只是在恰到好處的地方撒上一些 LLM 的魔法，讓體驗變得神奇。

Agent，至少是好的那些，並不會遵循「給你一個提示、一堆工具，然後迴圈直到達成目標」這種模式。相反地，它們主要就是由軟體所構成。

所以，我開始回答這個問題：

> ### **我們可以用哪些原則，來打造出真正好到可以交給生產環境客戶使用的、由 LLM 驅動的軟體？**

歡迎來到 12-Factor Agents。

*特別感謝 [@iantbutler01](https://github.com/iantbutler01), [@tnm](https://github.com/tnm), [@hellovai](https://www.github.com/hellovai), [@stantonk](https://www.github.com/stantonk), [@balanceiskey](https://www.github.com/balanceiskey), [@AdjectiveAllison](https://www.github.com/AdjectiveAllison), [@pfbyjy](https://www.github.com/pfbyjy), [@a-churchill](https://www.github.com/a-churchill), 以及舊金山 MLOps 社群對本指南的早期回饋。*

### 長話短說：12 個原則

即使 LLM [持續以指數級增長變得更強大](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-10-small-focused-agents.md#what-if-llms-get-smarter)，仍然會有一些核心的工程技術，能讓 LLM 驅動的軟體更可靠、更具擴展性、且更容易維護。

（註：此處的連結指向英文原版文件，您也可以從上方的**學習路徑**進入中文版。）
- [我們是如何走到這一步的：軟體簡史](https://github.com/humanlayer/12-factor-agents/blob/main/content/brief-history-of-software.md)
- [Factor 1: 自然語言轉換為工具呼叫](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-01-natural-language-to-tool-calls.md)
- [Factor 2: 掌握你的提示](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-02-own-your-prompts.md)
- [Factor 3: 掌握你的情境視窗](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-03-own-your-context-window.md)
- [Factor 4: 工具即結構化輸出](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-04-tools-are-structured-outputs.md)
- [Factor 5: 統一執行狀態與業務狀態](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-05-unify-execution-state.md)
- [Factor 6: 透過簡單的 API 啟動/暫停/恢復](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-06-launch-pause-resume.md)
- [Factor 7: 透過工具與人類聯繫](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-07-contact-humans-with-tools.md)
- [Factor 8: 掌握你的控制流程](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-08-own-your-control-flow.md)
- [Factor 9: 精簡化錯誤](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-09-compact-errors.md)
- [Factor 10: 專注、小型的 Agent](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-10-small-focused-agents.md)
- [Factor 11: 從任何地方觸發](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-11-trigger-from-anywhere.md)
- [Factor 12: 將你的 Agent 當作一個無狀態的 Reducer](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-12-stateless-reducer.md)
