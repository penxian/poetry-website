# 古诗词选集

React + Supabase 实现的古诗词选集网站，支持筛选、搜索和详情查看。

## 功能

- 📚 33+ 首经典古诗词
- 🔍 按朝代、作者、风格筛选
- ⭐ 必背篇目优先展示
- 📱 响应式设计，支持手机访问
- 🎯 弹窗查看详情

## 技术栈

- **React 19** + **TypeScript** + **Vite**
- **Supabase** 后端存储
- 部署到 **GitHub Pages**

## 开发

```bash
# 安装依赖
npm install

# 复制环境变量并填写你的 Supabase 信息
cp .env.example .env
# 编辑 .env 填入 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY

# 本地开发
npm run dev

# 构建
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 导入数据

```bash
# 需要先创建 /root/.supabase_config.json 包含 url 和 service_key
python import-with-supabase.py
```

## 在线访问

https://penxian.github.io/poetry-website/

##  License

MIT
