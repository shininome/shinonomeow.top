import{_ as s,c as a,b as n,o as t}from"./app-DfUU0Aw0.js";const e={};function h(l,i){return t(),a("div",null,i[0]||(i[0]=[n(`<h2 id="ippo-与-mappo-的不同" tabindex="-1"><a class="header-anchor" href="#ippo-与-mappo-的不同"><span>IPPO 与 MAPPO 的不同</span></a></h2><p>在 hands-on-rl 这书中, 采用了共享参数的方式来训练多个 agent。</p><p>这时候，唯一的不同就是 critic 的网络了，在 IPPO 中，critic 网络接收的是每一个 agent 单独的 observation，而在 MAPPO 中，critic 网络接收的是所有 agent 的 observation。</p><h2 id="多智能体的归一化是怎么做的" tabindex="-1"><a class="header-anchor" href="#多智能体的归一化是怎么做的"><span>多智能体的归一化是怎么做的</span></a></h2><p>单智能体的归一化只用对单个智能体的数据进行归一化即可， 但是多智能体的归一化 要怎么对待呢？ 是每个智能体单独归一化，还是所有智能体一起归一化呢？</p><p>就我理解, 归一化是要保证数据的波动不是很大, 而且所有的 agent 都是接的一个 actor 网络 所以是所有智能体一起归一化。</p><h2 id="light-ppo-改动" tabindex="-1"><a class="header-anchor" href="#light-ppo-改动"><span>light ppo 改动</span></a></h2><p>light ppo 输出的动作是 tuple(list(int),list(int)) ,但是ma-gym 要的是 list(int) ,所以要改动一下。</p><h3 id="actor" tabindex="-1"><a class="header-anchor" href="#actor"><span>actor</span></a></h3><p>原文件在 <code>/algorithms/utils/mlp</code></p><p>有意思的一点在于 fc2 的构件, 他是一个 相同 layer 的复制, 通过 loop layerN 来快速构建重复的 layer 同时让不同的 layer 参数不同</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">    self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">fc_h </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> nn</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">Sequential</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        init_</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">nn</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">Linear</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">hidden_size</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> hidden_size</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)),</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        active_func</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        nn</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">LayerNorm</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">hidden_size</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">),</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    )</span></span>
<span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">    self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">fc2 </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> get_clones</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">fc_h</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">_layer_N</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> forward</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    x </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">fc1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">      # 默认为 1</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> range</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">_layer_N</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        x </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">fc2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">](</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> x</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="train" tabindex="-1"><a class="header-anchor" href="#train"><span>train</span></a></h3><p>每个 agent 都有一个 actor 先pre train 再 train</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> agent_id </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">in</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> range</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">_n_agents</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">):</span></span>
<span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">        self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">_actor</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">agent_id</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">].</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">train</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">        self</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">_actor</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">[</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">agent_id</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">].</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">pre_train</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="share-obs" tabindex="-1"><a class="header-anchor" href="#share-obs"><span>share obs</span></a></h3><p>把每个 agent 的 obs 连了起来,像是 concat 一样</p>`,17)]))}const k=s(e,[["render",h]]),r=JSON.parse('{"path":"/learn/hoRL/rfasfo03/","title":"from ppo to mappo","lang":"zh-CN","frontmatter":{"title":"from ppo to mappo","createTime":"2025/02/25 17:40:07","permalink":"/learn/hoRL/rfasfo03/","description":"IPPO 与 MAPPO 的不同 在 hands-on-rl 这书中, 采用了共享参数的方式来训练多个 agent。 这时候，唯一的不同就是 critic 的网络了，在 IPPO 中，critic 网络接收的是每一个 agent 单独的 observation，而在 MAPPO 中，critic 网络接收的是所有 agent 的 observation...","head":[["meta",{"property":"og:url","content":"https://shinonomoew.top/learn/hoRL/rfasfo03/"}],["meta",{"property":"og:site_name","content":"東雲研究所"}],["meta",{"property":"og:title","content":"from ppo to mappo"}],["meta",{"property":"og:description","content":"IPPO 与 MAPPO 的不同 在 hands-on-rl 这书中, 采用了共享参数的方式来训练多个 agent。 这时候，唯一的不同就是 critic 的网络了，在 IPPO 中，critic 网络接收的是每一个 agent 单独的 observation，而在 MAPPO 中，critic 网络接收的是所有 agent 的 observation..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-31T05:48:36.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-31T05:48:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"from ppo to mappo\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-31T05:48:36.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":1.27,"words":381},"git":{"updatedTime":1743400116000,"contributors":[{"name":"東雲柊","username":"","email":"gtx2shino@gmail.com","commits":1,"avatar":"https://gravatar.com/avatar/a85c5cf42a533c53c895373652a8b15621ed6ecb8411d8e1b58c894a5ac91de9?d=retro"}]},"autoDesc":true,"filePathRelative":"learning_note/02.Hands_On_Reinforcement_Learnng/20.2.from ppo to mappo.md","categoryList":[{"id":"987a5d","sort":10002,"name":"learning_note"},{"id":"a246d3","sort":2,"name":"Hands_On_Reinforcement_Learnng"}]}');export{k as comp,r as data};
