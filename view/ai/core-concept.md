#### 1、人工智能基础概念
>1.1 核心的神经网络
>1.2 大语言模型 Large Language Model
>1.3 提示词 Prompt
<pre class="prettyprint lang-s">
语义明确的指令或文案
</pre>
>1.4 token
<pre class="prettyprint lang-s">
AI处理文字的最小单元
</pre>
>1.5 上下文窗口 
<pre class="prettyprint lang-s">
#即：Context Window
AI能记住对话的长度，决定它能记住多少上下文，与计算量成平方关系
</pre>
>1.6 模态
<pre class="prettyprint lang-s">
AI处理的信息类型，如：文本、图像、视频、音频、NL2SQL、NL2API等
</pre>
>1.7 模型的幻觉 Hallucination
<pre class="prettyprint lang-s">
AI有编造虚假信息的能力，模型越强大，虚假信息越逼真
</pre>
>1.8 基于人类反馈的强化学习 RLHF
<pre class="prettyprint lang-s">
#RLHF 即：Reinforcement Learning for Human Feedback
人工反馈答案的置信度，使AI学习改进输出对齐人类期望
</pre>
>1.9 检索增强生成 RAG 
<pre class="prettyprint lang-s">
#RAG 即：Retrieval Augmented Generation
其核心流程包括：
1) 检索：从外部知识库中查找相关文本片段；
2) 生成：将检索结果与用户查询输入给大语言模型生成回答。
RAG利用Embedding模型将文本转为向量，通过语义匹配实现高效检索，提供更准确、实时的回答。
</pre>
>1.9 微调
<pre class="prettyprint lang-s">
#即：Fine-tuning
对特定领域用专业数据训练模型，让模型成为某个专业领域的“专属AI”，训练ai成为某领域的专家。
</pre>