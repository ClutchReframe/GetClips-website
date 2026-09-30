# 把 Clips 官网发布到 getclips.clutchreframe.com

完成后，网站地址是 **https://getclips.clutchreframe.com/**。这个地址使用现有的 `clutchreframe.com` 域名，无需另买域名。

**如果代码已经推送到 GitHub，直接从第 3 步开始。**

## 1. 创建 GitHub 仓库

已有 [ClutchReframe/GetClips-website](https://github.com/ClutchReframe/GetClips-website) 仓库就跳过这一步。

1. 登录 GitHub，打开[新建仓库页面](https://github.com/new)。
2. **Owner** 选择 `ClutchReframe`，**Repository name** 填 `GetClips-website`。
3. 选择 **Public**。README 和 .gitignore 不勾选，License 选 **None**。
4. 点击 **Create repository**。

## 2. 推送本地网站代码

在本地网站项目根目录打开 Windows PowerShell。首次提交时运行：

```powershell
git add .gitignore .github README.md docs site
git commit -m "发布 Clips 官网"
```

如果已经提交过，跳过上面两条命令。尚未连接远端时，执行一次：

```powershell
git remote add origin https://github.com/ClutchReframe/GetClips-website.git
```

然后推送：

```powershell
git push -u origin main
```

刷新 GitHub 仓库首页，能看到 `site` 文件夹就说明代码已上传。首次推送后如果收到部署失败邮件，继续完成第 3 步。

## 3. 开启 GitHub Pages，让网站先能打开

1. 打开仓库的 [Settings → Pages](https://github.com/ClutchReframe/GetClips-website/settings/pages)。
2. 找到 **Build and deployment**，点击 **Source** 下拉框。
3. 选择 **GitHub Actions**。仓库已经带有发布流程，下方推荐的模板不用再创建。选完后刷新页面，确认 Source 仍显示 GitHub Actions。（[GitHub 设置说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)）
4. 打开仓库的 [Actions 发布页面](https://github.com/ClutchReframe/GetClips-website/actions/workflows/pages.yml)，点击最新一条运行记录。
5. 如果显示红色失败，点击右上角 **Re-run jobs → Re-run all jobs**，在弹窗中点击 **Re-run jobs**。如果已经显示绿色成功，跳过这一步。（[GitHub 重跑说明](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/re-run-workflows-and-jobs)）
6. 等待 `deploy` 显示绿色对勾。若仍然失败，点开 `deploy`，再展开红色的步骤查看具体错误。
7. 回到 **Settings → Pages**，点击 **Visit site**，打开页面上显示的网站地址。

**能看到网站首页，就完成了这一步。** 接下来再绑定 `getclips.clutchreframe.com`。

如果错误是 `Get Pages site failed` 或 `Error: Not Found`，先检查第 2、3 小步的 Source 设置，再重跑；不用重新提交代码。

## 4. 验证主域名 clutchreframe.com（可选，建议做一次）

**在 `ClutchReframe` 账号下验证主域名 `clutchreframe.com` 一次，就能保护该账号使用的 `getclips.clutchreframe.com`、`clips.clutchreframe.com` 等直接子域名。** 这是 GitHub 推荐的保护措施，不是上线的必需步骤。（[GitHub 域名验证说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)）

按下面操作：

1. 使用 `ClutchReframe` 账号登录，打开[账号的 Pages 设置](https://github.com/settings/pages)。入口是右上角头像 → **Settings → Pages**。
2. 查看 **Verified domains**。如果 `clutchreframe.com` 已显示 **Verified**，直接进入第 5 步。
3. 如果主域名还没有验证，点击 **Add a domain**，输入 `clutchreframe.com`，点击 **Add domain**。
4. 保留 GitHub 给出的 TXT 记录页面。另开 [Cloudflare](https://dash.cloudflare.com/)，选择 `clutchreframe.com` → **DNS → Records → Add record**。
5. **Type** 选 `TXT`，**Name** 和 **Content** 分别复制 GitHub 给出的记录名和验证码，**TTL** 选 `Auto`，点击 **Save**。
6. 回到 GitHub，点击 **Verify**。如果暂未通过，等 DNS 生效后再试；成功后保留这条 TXT 记录。

**这一节的 Add a domain 填 `clutchreframe.com`；下一节仓库里的 Custom domain 填 `getclips.clutchreframe.com`。**

## 5. 在 GitHub 填入网站域名

1. 回到仓库的 [Settings → Pages](https://github.com/ClutchReframe/GetClips-website/settings/pages)。
2. 找到 **Custom domain**，填入 `getclips.clutchreframe.com`。
3. 点击 **Save**。先保存这里，再去 Cloudflare 添加下一步的记录。（[GitHub 子域名设置说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain)）

这时 DNS 检查可能还未通过，继续第 6 步。

## 6. 在 Cloudflare 添加 getclips 记录

1. 打开 [Cloudflare](https://dash.cloudflare.com/)，选择 `clutchreframe.com`。
2. 左侧点击 **DNS → Records**。
3. 点击 **Add record**，按下表填写。（[Cloudflare 操作说明](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/)）

| 页面字段 | 填写内容 |
| --- | --- |
| Type | `CNAME` |
| Name | `getclips` |
| Target | `clutchreframe.github.io` |
| Proxy status | `DNS only`，云朵显示灰色 |
| TTL | `Auto` |

4. 点击 **Save**。

Target 就填表里的域名，不加 `https://` 或仓库名。保留原有的 `clips`、`@`、`www` 和其他记录；如果已经有 `getclips`，先核对它的用途，相同配置无需重复添加。

## 7. 开启 HTTPS

1. 回到仓库的 [Settings → Pages](https://github.com/ClutchReframe/GetClips-website/settings/pages)。
2. 等待域名旁的 DNS 检查通过。
3. 等 **Enforce HTTPS** 可以勾选后，将它勾上。DNS 和证书生效可能需要等待，按钮暂时灰色时稍后再看。（[GitHub HTTPS 说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain)）
4. 打开 **https://getclips.clutchreframe.com/**，确认能看到首页，浏览器没有证书警告。

## 8. 发布后检查一遍

- 用电脑和手机各打开一次首页，检查图片、菜单和按钮是否正常。
- 播放两段演示视频，切换时上一段应停止。
- 点击 **Get it on Overwolf**，确认打开正确的产品商店页。
- 点击页脚的 **Privacy Policy、EULA、Third-party notices**，确认都能正常阅读。
- 在未登录的浏览器里点击 **FFmpeg Source**，确认能直接下载与应用内 FFmpeg 版本对应的 `.tar.xz` 源码包。
- 打开 `/missing-page` 和 `/nested/missing-page`，确认显示网站自己的 404 页面，首页链接可用。
- 打开原来的 `clips.clutchreframe.com`，确认旧站仍正常。

## 遇到问题时看这里

| 看到的问题 | 怎么处理 |
| --- | --- |
| 部署报 `Get Pages site failed` / `Not Found` | 回到第 3 步，把 Source 设为 GitHub Actions，再重跑失败任务。 |
| DNS 检查一直未通过 | 核对第 6 步的 CNAME，尤其是 `getclips`、`clutchreframe.github.io` 和灰色云朵。 |
| Enforce HTTPS 暂时不能勾选 | 先确认 DNS 检查通过，再等待 GitHub 签发证书。 |
| 提示域名已被其他账号或网站使用 | 先查清现有绑定，不要为了新站删除旧站的域名设置。 |
| 部署仍然失败，但不是上面的错误 | 打开 Actions → 失败的运行记录 → deploy → 红色步骤，复制具体报错来排查。 |
