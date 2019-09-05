---


---

<h2 id="简介">简介</h2>
<ul>
<li>CocosCreator虚拟摇杆v2.0</li>
<li>2D 45度视角</li>
<li>上下左右四向</li>
<li>只负责发送四向和停止消息给player节点，player节点的移动逻辑自行编写</li>
</ul>
<h2 id="使用方法">使用方法</h2>
<ol>
<li>
<p>下载根目录下的<a href="https://github.com/1783492844/virtual_rocker_2/raw/master/virtual_rocker_2.zip">virtual_rocker_2.zip</a></p>
</li>
<li>
<p>导入到你的项目，具体操作参考官方文档——<a href="https://docs.cocos.com/creator/manual/zh/asset-workflow/import-export.html#%E8%B5%84%E6%BA%90%E5%AF%BC%E5%85%A5">资源导入</a></p>
</li>
<li>
<p>将导入的预制体拖拽到节点树上</p>
</li>
<li>
<p>配置好rocker节点的属性（<strong>重点是rocker组件</strong>）</p>
</li>
<li>
<p>打开rocker.js，设置第一行的<strong>eventName参数</strong></p>
</li>
<li>
<p>在自己的player节点设置接收消息，<br>
<code>this.node.on('eventName', function(msg){}, this)</code><br>
传递的参数<br>
<code>msg = ‘STOP’/'UP'/'DOWN'/'LEFT'/'RIGHT'</code></p>
</li>
<li>
<p>自行实现player移动</p>
</li>
</ol>
<h2 id="rocker组件">rocker组件</h2>
<p><img src="https://lh3.googleusercontent.com/2p4OIh-_e6wY4J3aX7_LanHjZNsG0Hci1XP-kMcnGvfSe9cV6A9T4rSFEaMlVvPBgxo3DpOzcb2X" alt="enter image description here"></p>
<ul>
<li><strong>Player</strong>：玩家节点，用于给player节点发送消息</li>
<li><strong>Sensitivity</strong>：灵敏度，用于缓解因方向的频繁切换而导致的消息频繁发送问题，<strong>范围[0, 1]</strong><br>
<strong>原理</strong>：根据灵敏度<strong>sensitivity</strong>参数和rocker.js中设置的<strong>FPS</strong>参数（第4行）设置消息发送间隔<strong>msgInterval</strong></li>
</ul>
<h2 id="所有版本">所有版本</h2>
<ul>
<li><a href="https://github.com/1783492844/virtual_rocker">v1.0</a>：2D、鸟瞰、全向、实现player的移动</li>
<li><a href="https://github.com/1783492844/virtual_rocker_2">v2.0</a>：2D、45°、4向、只发消息，不实现移动</li>
</ul>

