# hugo博客推送到服务器

```
//先回顾一下博客路径文件夹的结构
myblog/
├── archetypes/
│   └── default.md
├── assets/
├── public/           <-- 步骤3后生成的文件夹，里面存放对外展示的静态博客网页
├── content/
├── data/
├── i18n/
├── layouts/
├── static/
├── themes/           <-- 主题
└── hugo.toml         <-- 网站参数
```

## 1.推送到git服务器

```
cd public/
git init
git add .
git commit -m "备注"
//使用 git remote add 命令将远程仓库添加到仓库配置中
git remote add origin https://github.com/your-username/your-repo.git  //-->仓库链接
//（非固定方式，确保能提交过去就行）使用 SSH 连接后，可以使用 SSH URL 推送到 GitHub 仓库
git remote set-url origin git@github.com:your-username/your-repo.git
//推送文件
git push -u origin master
```

> `注意事项：`
>
> 推送的文件过大时，需要自己去action那里找到pages-build-deployment选项，选择重新构建。

## 2.后续提交其他内容

```
#检查是否有改变
git status
#提交到缓存区
git add .
#提交到版本库，并备注修改内容
git commit -m "new"
#推送到远程仓库
git push

```

