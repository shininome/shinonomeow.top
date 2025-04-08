import{_ as s,c as a,b as i,o as t}from"./app-DfUU0Aw0.js";const n={};function h(r,e){return t(),a("div",null,e[0]||(e[0]=[i(`<h2 id="acme-sh" tabindex="-1"><a class="header-anchor" href="#acme-sh"><span>acme.sh</span></a></h2><p>目前我还不知道续签有没有用,设置太简单了</p><p>主要步骤:</p><p>1.申请阿里的OPENAPI</p><p>2.安装<a href="https://github.com/acmesh-official/acme.sh" target="_blank" rel="noopener noreferrer">acme.sh</a></p><p>3.生成证书</p><p>3.复制证书到你配置好的nginx路径</p><p>4.更新证书</p><h2 id="申请阿里云云账号accesskey-id和accesskey-secret" tabindex="-1"><a class="header-anchor" href="#申请阿里云云账号accesskey-id和accesskey-secret"><span>申请阿里云云账号AccessKey ID和AccessKey Secret</span></a></h2><p><a href="https://help.aliyun.com/zh/ram/user-guide/create-an-accesskey-pair" target="_blank" rel="noopener noreferrer">如何获取阿里云云账号AccessKey ID和AccessKey Secret - 阿里云</a></p><p>之后授予DNS解析权限就可以正常运行了</p><h2 id="安装acme-sh" tabindex="-1"><a class="header-anchor" href="#安装acme-sh"><span>安装acme.sh</span></a></h2><p><code>curl https://get.acme.sh | sh -s email=my@example.com</code></p><p>并创建 一个 shell 的 alias, 例如 .bashrc，方便你的使用: alias acme.sh=~/.acme.sh/acme.sh</p><p>目前默认的CA机构是ZEROSSL, 没啥特殊需求就不换了,也麻烦</p><h3 id="生成证书" tabindex="-1"><a class="header-anchor" href="#生成证书"><span>生成证书</span></a></h3><p><code>acme.sh --issue --dns dns_ali -d shinonomeow.fun -d &quot;*.shinonomeow.fun&quot;</code></p><div class="hint-container warning"><p class="hint-container-title">注意</p><p>*.shinonomeow.fun 要加&quot;&quot;</p><p>zsh是这样的,早上运行 alist也报错</p></div><p>之后将你生成的证书复制到你需要的位置,虽然指令是Insall,干的却是复制的事情</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">acme.sh</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --install-cert</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -d</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> shinonomeow.fun</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -d</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> *</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">.shinonomeow.fun</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">--key-file       </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/etc/ngxin/ssl/shinonomeow.fun.key</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">  \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">--fullchain-file </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/etc/ngxin/ssl/fullchain.cer</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">--reloadcmd     </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">sudo service nginx force-reload</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>生成了4个证书, 只需要key和fullchain</p></div><h3 id="查看已安装证书信息" tabindex="-1"><a class="header-anchor" href="#查看已安装证书信息"><span>查看已安装证书信息</span></a></h3><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">acme.sh</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --info</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -d</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> shinonomeow.fun</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="更新证书" tabindex="-1"><a class="header-anchor" href="#更新证书"><span>更新证书</span></a></h2><p><code>0 0 1,20 * * &quot;/root/.acme.sh&quot;/acme.sh --cron --home &quot;/root/.acme.sh&quot; &gt; /dev/null</code></p><p>虽然查看了一下发现是生效了, 但是完全不知道到时候更新是什么结果,毕竟我用的是zsh 不是bash</p><blockquote><p><a href="https://ubock.com/archives/1707099513246" target="_blank" rel="noopener noreferrer">acme.sh申请Let’s Encrypt的https证书 (阿里云DNS)</a></p></blockquote><h2 id="疑问" tabindex="-1"><a class="header-anchor" href="#疑问"><span>疑问</span></a></h2><p>我很好奇如果不是 root 权限的话,到底如何重启 ngxin 呢, 明明说可以用 root 用户和其他用户安装的.</p><div style="text-align:center;"><p><img src="https://gcore.jsdelivr.net/gh/shininome/blog_imgs@blog/blog/tools/dev/01-1-acme-noroot.png" alt="git原文"></p></div>`,30)]))}const c=s(n,[["render",h]]),o=JSON.parse('{"path":"/tools/fee1c4/","title":"acme","lang":"zh-CN","frontmatter":{"title":"acme","createTime":"2024-04-23T22:02:40.000Z","permalink":"/tools/fee1c4/","categories":["工具","开发工具"],"tags":["ssl","acme.sh","自动续签"],"feed":{"enable":true},"description":"自动续签ssl,上天保佑一定要有用呀","head":[["meta",{"property":"og:url","content":"https://shinonomoew.top/tools/fee1c4/"}],["meta",{"property":"og:site_name","content":"東雲研究所"}],["meta",{"property":"og:title","content":"acme"}],["meta",{"property":"og:description","content":"自动续签ssl,上天保佑一定要有用呀"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-27T11:13:57.000Z"}],["meta",{"property":"article:tag","content":"ssl"}],["meta",{"property":"article:tag","content":"acme.sh"}],["meta",{"property":"article:tag","content":"自动续签"}],["meta",{"property":"article:modified_time","content":"2025-01-27T11:13:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"acme\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-01-27T11:13:57.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":1.48,"words":444},"git":{"updatedTime":1737976437000,"contributors":[{"name":"東雲柊","username":"","email":"gtx2shino@gmail.com","commits":1,"avatar":"https://gravatar.com/avatar/a85c5cf42a533c53c895373652a8b15621ed6ecb8411d8e1b58c894a5ac91de9?d=retro"}]},"filePathRelative":"tools/1.acme.md","categoryList":[{"id":"4a9315","sort":10005,"name":"tools"}]}');export{c as comp,o as data};
