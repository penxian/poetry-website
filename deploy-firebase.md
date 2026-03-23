# Firebase Hosting 部署静态网站步骤

Firebase 是 Google 的平台，免费额度足够放静态网站，国内访问速度一般，如果受众是国内用户推荐 GitHub Pages 或 Vercel，海外用户用 Firebase 很不错。

## 前置要求

需要安装 Node.js 和 Firebase CLI：

```bash
# 检查是否已有 Node.js
node -v
npm -v

# 安装 Firebase CLI
npm install -g firebase-tools
```

## 部署步骤

### 1. 登录 Firebase
```bash
firebase login
```
会打开浏览器让你登录 Google 账号，授权即可。

### 2. 初始化项目
进入你的网站目录：
```bash
cd /path/to/poetry-website
firebase init
```

初始化过程会问几个问题：
- `Which Firebase features do you want to set up for this directory?` **选中 Hosting**（空格选中）
- `Please select an option` → **Use an existing project**（使用已有的项目）
- 选择你在 Firebase 控制台创建好的项目
- `What do you want to use as your public directory?` → 输入 **.** （当前目录，因为我们 index.html 就在根目录），或者 public 如果你把文件放 public 文件夹
- `Configure as a single-page app (rewrite all urls to /index.html)?` → **N** （我们是多文件静态站，不需要）
- `Set up automatic builds and deploys with GitHub?` → **N** （第一次可以先手动，后续可以配置自动部署）
- `File public/index.html already exists. Overwrite?` → **N** （不要覆盖我们自己的文件）

### 3. 部署
```bash
firebase deploy
```

部署完成后会输出你的网站地址，类似：
`https://你的项目名.web.app` 或者 `https://你的项目名.firebaseapp.com`

## 成本说明

Firebase Hosting 免费额度：
- 存储空间：10GB
- 流量：10GB/月
- 完全足够个人小网站用，不超流量不花钱

## 国内加速

如果需要国内访问更快，可以：
1. 绑定自己的域名
2. 开启 Cloudflare CDN（免费层），这样国内访问会快很多

## 常用命令

```bash
# 本地预览
firebase serve

# 重新部署
firebase deploy

# 查看项目状态
firebase status

# 退出登录
firebase logout
```
