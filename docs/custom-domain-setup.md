# getclips 子域名与 GitHub Pages 配置

目标网站：`https://getclips.clutchreframe.com/`。`getclips` 是现有 `clutchreframe.com` 下的子域名，无需另购域名。本指南提供操作步骤；文档和 workflow 已准备不表示账号内配置已经执行。部署状态请记录在本地忽略的 `tmp/` 中。

本次配置范围为新仓库 `ClutchReframe/GetClips-website` 的 Pages、新子域 `getclips` 的 DNS，以及必要的新子域验证 TXT。保留现有站点的代码、域名绑定和发布设置。共享域名的注册、NS、根域、`www`、其他子域、现有验证 TXT、全域 SSL 和重定向策略不在该范围内。

## 1. 确认目标和现有归属

在已登录的 GitHub 与 Cloudflare 中核对：

- GitHub owner 为 `ClutchReframe`，目标仓库为 `GetClips-website`，地址为 <https://github.com/ClutchReframe/GetClips-website>。
- 仓库名没有被其他项目占用；当前套餐和仓库可见性支持 Pages。公开仓库可使用 GitHub Free 的 Pages；私有仓库需适用的付费方案。
- Cloudflare 的 `clutchreframe.com` 区域内，`getclips` 是否已存在 A、AAAA、CNAME 或相关记录；GitHub 是否已有该域名的绑定。
- 若记录或域名已被占用，先确定用途与归属，不覆盖服务。公共 DNS 没有记录不证明 GitHub 后台没有绑定。

PowerShell 只读检查：

```powershell
gh repo view ClutchReframe/GetClips-website --json nameWithOwner,visibility,url
Resolve-DnsName getclips.clutchreframe.com -Type CNAME
```

若 `gh` 未安装或尚未登录，在 GitHub 网页完成对应检查。仓库不存在和权限不足可能都表现为无法访问，需在正确账户下确认。

## 2. 准备并发布新仓库

本地验收完成、确定公开仓库内容并收到发布指令后执行。进入本项目根目录，核对独立 Git 归属：

```powershell
git rev-parse --show-toplevel
git rev-parse --git-common-dir
git remote -v
git status --short
```

顶层与 common dir 应归属本项目。origin 为空或只指向新仓库，不能复用其他网站的 Git 目录、worktree 或 origin。不要将 `tmp/`、原始视频、来源 JSON 或本机文件纳入提交。

以下是首次发布的操作命令，不会因保存本指南而执行：

```powershell
git add .gitignore .github README.md docs site
git diff --cached --stat
git diff --cached
git commit -m "创建 Clips 双游戏官网"
gh repo create ClutchReframe/GetClips-website --public --source . --remote origin
```

创建仓库后，先完成下一节的 Pages source 设置，再推送：

```powershell
git push -u origin main
```

已存在并确认归属的空远端可用 `git remote add origin https://github.com/ClutchReframe/GetClips-website.git` 连接，跳过 `gh repo create`。已配置正确 origin 时无需重复添加。不要重置、覆盖已有历史或强制推送。

## 3. 设置 Pages source 并检查默认网址

打开新仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。若空仓库界面尚不可设置，先推送，在设置完成后从 Actions 手动重新运行 workflow。

`.github/workflows/pages.yml` 在 main push 或手动触发时执行，使用该仓库的 `GITHUB_TOKEN`；官方 actions 为 checkout、configure-pages、upload-pages-artifact 和 deploy-pages。只上传 `site/`，不需要 Jekyll 或 Node 构建。发布 job 使用 `contents: read`、`pages: write`、`id-token: write` 和 `github-pages` environment；确认 environment 的分支保护允许 main。

检查 Actions 成功、artifact 仅含 `site/` 的内容。根据 Pages 显示的默认地址，验证首页、`privacy.html`、`terms.html`、图片和字体。通常为 `https://clutchreframe.github.io/GetClips-website/`；若 owner 已设置自定义域名，以后台显示的实际地址为准。相对资源路径应支持子目录访问，SEO 的 canonical 仍为正式目标域名。

参考：[GitHub 自定义 Pages workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 4. 核对 owner 域名验证

在 GitHub owner 的 **Settings → Pages → Verified domains** 中只读核对 `clutchreframe.com` 的验证状态。个人 owner 用个人 Settings；组织 owner 用组织 Settings，不能在仓库设置中查找 owner 验证。

父域已在正确的 `ClutchReframe` owner 下验证时直接复用，保护覆盖其直接子域，保留现有 TXT。

若未验证，优先仅添加 `getclips.clutchreframe.com`。根据 GitHub 当次给出的完整名称和值添加验证 TXT；不要猜测或复用其他 owner 的验证码。Cloudflare 自动附加区域域名时，核对最终生成的完整记录名。等待解析生效后回到 GitHub 完成 Verify，并保留有效 TXT。

```powershell
# 用 GitHub 当前给出的完整 TXT 名称替换参数。
Resolve-DnsName '<GitHub 指定的完整 TXT 名称>' -Type TXT
```

如遇其他 owner 占用、要求转移父域或删除旧验证，停止域名操作并明确现有归属与影响。GitHub 对已被其他 owner 使用域名的验证可能释放对方站点绑定，不能为了新站重新认领父域。

参考：[GitHub 域名验证及直接子域保护](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)。

## 5. 先设置 GitHub 自定义域名

在新仓库 **Settings → Pages → Custom domain** 填入 `getclips.clutchreframe.com`，保存。随后再配置 DNS。

Custom Actions 发布不依赖 `CNAME` 文件；仅创建该文件不能完成后台绑定。不要复制其他网站的 CNAME、验证文件或重定向配置。

参考：[GitHub 自定义域名配置](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。

## 6. 添加 Cloudflare DNS

进入 **clutchreframe.com → DNS → Records → Add record**：

| 字段 | 值 |
| --- | --- |
| Type | `CNAME` |
| Name | `getclips` |
| Target | `clutchreframe.github.io`，前提是 GitHub owner 未变化 |
| Proxy status | `DNS only`，灰云 |
| TTL | `Auto` |

目标不带 `https://` 和仓库路径；不指向 `clutchreframe.com` 或其他子域。不要创建通配符。若同名 A／AAAA／CNAME 冲突，先核对其用途，不直接删除。保留 `clips`、根域和其他已有服务记录。

参考：[Cloudflare 子域记录](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/)。

## 7. 检查 DNS 与 HTTPS

```powershell
Resolve-DnsName getclips.clutchreframe.com -Type CNAME
curl.exe -I https://getclips.clutchreframe.com/
```

CNAME 应指向正确 owner 的 `github.io` 主机。等待 GitHub Pages 的 DNS 检查和证书签发完成，然后启用 **Enforce HTTPS**。DNS 缓存和证书签发可能需要等待，不承诺固定完成时间。不要为排查新站修改全域 SSL、根域重定向或其他站点。

## 8. 正式网址验收

在 `tmp/` 中记录执行时间、实际环境、URL、状态和截图，不将“文档已准备”写成“配置已完成”。至少检查：

- 首页、法律页、第三方声明、许可证、图片和字体能通过 HTTPS 打开，页面没有资源错误。
- 320／390／768／1440px 和 200% 缩放布局，键盘导航、移动菜单、FAQ 和无脚本访问。
- 商店链接打开正确的 ClutchReframe Clips 产品和安装入口。
- 两条视频实际播放，内容与选项对应；切换停止旧音频；首次加载不请求 YouTube，播放后才连接视频服务。
- 未登录浏览器从官网直接下载 `ffmpeg-8.1.2-r1` 对应的 `.tar.xz` 附件，无安装、付款或账户前置条件。核对当前分发版仍对应该源码；GitHub 自动生成的 Source code zip/tar.gz 不能替代它。
- canonical、Open Graph、Twitter 图片、robots、sitemap 均指向正式目标域名，分享图为双游戏内容。
- `/missing-page` 与 `/nested/missing-page` 返回 HTTP 404，显示可读错误页，其首页入口指向新站。
- 上线前后核对已有站点的首页、隐私页、条款页和既有验证入口，确认内容与跳转目标未受影响；私有验证内容仅保存在 `tmp/`。

## 排障与停用

按 **仓库 Pages 设置 → workflow artifact → DNS → HTTPS → 相对路径／缓存** 的顺序检查。默认项目网址下也应能加载相对资源。Python 简单服务器默认的未知路径响应不是 GitHub Pages 自定义 404；正式路径和状态必须在线上确认。

将来迁移到其他域名需单独处理占用、入口、canonical 和重定向。本次不预先改动既有站点。停用新站时，先妥善处理其 DNS，再解除 Pages 域名绑定或关闭站点，避免留下指向已停用服务的记录；保留有效的域名验证 TXT。
