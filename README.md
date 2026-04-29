# 风从哪来：0 元静态文章站

这是一个不需要云服务器的个人文章网站，用来记录小发现、分享有帮助的信息、打破信息差。它可以直接部署到 Cloudflare Pages、GitHub Pages、Netlify 等免费静态托管平台。

## 本地预览

直接双击 `index.html` 就能看首页。文章页需要通过首页点击进入。

如果你电脑上有 Python，也可以在这个文件夹运行：

```powershell
python -m http.server 8080
```

然后打开：

```text
http://localhost:8080
```

## 发新文章

这个网站没有公开投稿入口，文章只由站长本人维护和发布。打开 `posts.js`，复制一个文章对象，修改这些字段：

```js
{
  slug: "my-new-post",
  title: "你的文章标题",
  date: "2026-04-29",
  author: "你的名字",
  summary: "文章摘要",
  tags: ["标签1", "标签2"],
  readingTime: "5 分钟",
  content: `
    <p>这里写正文。</p>
    <h2>小标题</h2>
    <p>继续写内容。</p>
  `
}
```

注意：`slug` 只能用英文、数字和短横线，比如 `my-first-note`。

## 免费部署建议

优先用 Cloudflare Pages：

1. 注册 GitHub 账号，把这些文件上传到一个新仓库。
2. 注册 Cloudflare，进入 Workers & Pages。
3. 选择 Pages，连接 GitHub 仓库。
4. Build command 留空，Output directory 填 `/` 或留空。
5. 部署成功后，会得到一个 `pages.dev` 结尾的网址。

也可以同步开启 GitHub Pages，作为备用访问地址。

## 可以改哪里

- 站名：改 `index.html`、`article.html` 里的 `风从哪来`
- 颜色：改 `assets/site.css` 开头的 `:root`
- 文章：改 `posts.js`
- 首页介绍：改 `index.html` 的 hero 区域
