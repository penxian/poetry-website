# 古诗词选集网站

一个低成本、纯静态的古诗词展示网站，以中国九年义务教育必背古诗词为核心，按朝代、作者、风格、流行度和传唱度分类筛选。

## 特点

- 🆓 **零成本**：纯静态 HTML/CSS/JS，可免费部署在 GitHub Pages、Vercel 等平台
- 📱 **响应式**：适配手机和桌面
- 🔍 **多维度筛选**：朝代 / 作者 / 风格 / 必背优先级
- ⭐ **优先级排序**：九年义务教育必背篇目优先展示
- 📊 **排序规则**：必背 > 传唱度 > 流行度

## 项目结构

```
.
├── index.html      # 主页
├── style.css       # 样式
├── script.js       # 交互逻辑
├── data.js         # 古诗词数据（在这里添加新诗词）
└── README.md       # 说明文件
```

## 如何添加新诗词

编辑 `data.js`，在 `poetryData` 数组中按照格式添加：

```javascript
{
    title: "诗名",
    author: "作者",
    dynasty: "朝代（先秦/汉魏/唐代/宋代/元明清）",
    style: "风格（山水田园/边塞征战/思乡怀人/咏史怀古/抒情言志等）",
    popularity: 90,      // 流行度 0-100
    spread: 95,         // 传唱度 0-100
    compulsory: true,   // 是否九年义务教育必背
    content: "正文...分行用 \\n",
    notes: "说明文字"
}
```

## 本地预览

```bash
# 使用 Python 简易服务器
python3 -m http.server 8000

# 或使用 Node.js http-server
npx http-server .
```

然后访问 `http://localhost:8000`

## 免费部署

### GitHub Pages（推荐，完全免费）

1. 将代码推送到 GitHub 仓库
2. 进入仓库 → Settings → Pages
3. Source 选择 `Deploy from a branch`
4. 选择分支（一般是 main），点击 Save
5. 几分钟后你的网站就会在 `https://你的用户名.github.io/仓库名/` 上线

### Vercel（也免费）

1. 导入 GitHub 仓库
2. 直接部署，零配置，自动 HTTPS

### Netlify

同上，导入仓库即可一键部署

## 成本说明

- GitHub Pages：个人公共仓库完全免费，无流量限制
- 域名：可选，如果需要自定义域名，每年约 5-20 元（也可以用 GitHub 默认域名，完全免费）
- 服务器：不需要，纯静态托管，零成本

## 数据说明

目前已收录 **24** 首经典古诗词，包含大部分九年义务教育必背篇目。可以根据需要继续添加。

排序优先级：
1. **九年义务教育必背**（最高优先级）
2. 传唱度（越高越靠前）
3. 流行度
