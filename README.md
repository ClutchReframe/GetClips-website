# ClutchReframe Clips 网站

ClutchReframe Clips 的双游戏静态官网，介绍 League of Legends 与 Dota 2 的自动高光捕获和竖屏生成。

正式地址：<https://getclips.clutchreframe.com/>。页面使用英文；维护文档使用中文。

## 本地预览

无需构建或安装 Node 依赖。在项目根目录打开 Windows PowerShell，运行：

```powershell
py -m http.server 8080 --bind 127.0.0.1 --directory site
```

打开 <http://localhost:8080/>。使用 HTTP 预览视频，避免使用 `file://`。按 `Ctrl+C` 结束服务。端口占用时更换端口并使用对应地址。

## 文件布局

- `site/`：唯一的公开发布目录，包含首页、隐私政策、EULA、自包含 404、SEO 文件和第三方声明。
- `site/assets/`：本地图片、字体、共享 CSS 和少量原生 JavaScript。
- `site/licenses/`：应用所用 FFmpeg 的完整 LGPL 2.1 文本。
- `.github/workflows/pages.yml`：发布 `site/` 的 GitHub Pages workflow。
- `docs/custom-domain-setup.md`：GitHub Pages、Cloudflare 子域名和 HTTPS 操作指南。
- `tmp/`：本地预览证据与临时文件，已忽略，不发布。

## 维护

首页顺序为首屏、Demo、核心功能、使用流程、FAQ 和下载入口。权益和操作说明与当前应用保持一致；价格和结账条件由应用显示。应用隐私政策和 EULA 静态保存在本站，更新时应完整核对当前应用正式文本，保留生效日期和各章节。

Demo 使用本地海报，仅点击播放后才创建 YouTube privacy-enhanced iframe。切换选项会销毁旧播放器；禁用脚本时仍保留视频外链。字体均本地托管。

修改后在 320、390、768、1440px 和 200% 缩放下检查首页与法律页；检查移动菜单、键盘导航、视频播放/切换、无脚本访问、全部本地链接以及首次加载网络请求。保持首屏的完整游戏画面、HUD、水印和原有黑色区域。无缓存、未点击视频时的本站传输量目标约为 1.2 MiB。

修改正式域名时同步所有 HTML 元信息、404 首页链接、robots、sitemap、第三方声明和分享图。仓库内容可能公开；不要加入凭据、私有通信、原始素材来源记录或诊断文件。发布前按[子域名指南](docs/custom-domain-setup.md)验证 `site/` artifact 和正式网址。

## 许可证与归属

[第三方声明](site/third-party-notices.html)分开记录应用软件和网站字体，并提供完整的[文本下载](site/third-party-notices.txt)。Inter、Outfit 使用 [SIL OFL 1.1](site/assets/fonts/OFL-1.1.txt)。ClutchReframe Clips 使用修改版 FFmpeg 8.1.2，适用 [LGPL 2.1 或更新版本](site/licenses/ffmpeg-lgpl-2.1.txt)；[对应源码、修改和构建说明](https://github.com/ClutchReframe/clutchreframe-clips-ffmpeg-sources/releases/download/ffmpeg-8.1.2-r1/clutchreframe-clips-ffmpeg-8.1.2-r1-source.tar.xz)可直接下载。每个应用下载入口所在页面都保留许可和源码链接。

升级应用所用 FFmpeg 时同步网站版本、许可、对应源码链接，并保留旧版本的稳定源码入口。游戏画面和商标属于各自权利人；页面和应用 EULA 保留相关归属与非背书声明。网站素材及品牌不因公开托管而获得额外的再分发许可。
