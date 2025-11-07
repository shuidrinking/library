#### deepseek解释“自注意力机制计算过程工作流程”

>1、 输入嵌入预处理（Input Embeddings）
<pre class="prettyprint lang-s">
数据来源：通常是词嵌入（word embeddings）或上一层 Transformer 的输出（也可能加上位置编码）。
通过分词器得到输入序列中每个token的索引，通过索引查找嵌入表（Embedding Table），将每个词索引映射为一个密集向量。产生输入序列对应的矩阵X，形状[序列长度, d_model]，其中d_model为模型隐藏维度。
注意力头数为 h，单头维度 d_k = d_v = d_model / h
</pre>
>2、 生成查询、键、值向量（Q，K，V）
<pre class="prettyprint lang-s">
这里会用到3个权重矩阵WQ、WK、WV，它们不是从嵌入表或预训练嵌入中查询得到的。它们是模型独立的可训练参数，在模型初始化时随机生成（如使用Xavier初始化），并在训练过程中通过反向传播学习。
WQ：形状为 [d_model, d_k]，用于生成查询向量。
WK：形状为 [d_model, d_k]，用于生成键向量。
WV ：形状为 [d_model, d_v]，用于生成值向量。
d_k和d_v是投影维度，d_model = 模型隐藏维度。通常设置为 d_k=d_v=d_model / h
通过线性变换将X其分别计算得到三个向量：
(1)Query（查询）：“What am I looking for？”
(2)Key（键）：“What features do I have？”
(3)Value（值）：“What information do I carry？”
线性变换计算如下：
Q= X×WQ，K = X×WK，V = X×WV
</pre>
>3、计算注意力得分（Attention Scores Calculation）
<pre class="prettyprint lang-s">
计算 Q 和 K的点积，得到原始注意力得分矩阵。Scores=Q×(K<sup style="vertical-align: super;font-size:0.1rem">T</sup>)，Scores[ij]表示位置查询与位置i的查询与位置j的键的相似度。点积操作衡量了序列中每个位置与其他位置的关联强度。得分越高，表示两个位置在语义上越相关。
</pre>
>4、缩放得分（Scaling Scores）
<pre class="prettyprint lang-s">
缩放后的得分矩阵 ScaledScores，形状不变，缩放是为了防止点积得分过大（尤其当d_k较大时），导致后续Softmax函数的梯度消失，从而提升训练稳定性。
</pre>
>5、应用Softmax（Softmax Normalization）
<pre class="prettyprint lang-s">
对ScaledScores的每一行应用Softmax函数，使得注意力权重非负且归一化，便于后续的加权求和。
计算后得到注意力权重矩阵 A=softmax(ScaledScores)
</pre>
>6、加权求和（Weighted Sum of Values）
<pre class="prettyprint lang-s">
计算输出矩阵 Z=A×V，Z为原序列变换后的新序列
</pre>
>7、输出（Output）
<pre class="prettyprint lang-s">
Z 是自注意力层的最终输出，形状 [序列长度, d_v]
</pre>