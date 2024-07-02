---
title: "blog2本地搭建hugo网站"
description: "hugo--本地部署网页。本篇博客的篇幅较短"
date: 2024-07-01T22:27:20+08:00
lastmod: 2024-07-01T22:27:20+08:00
hidden: false
license: ""
comments: true
draft: flase
slug: hugo02
image: /cover/R (2).jpg
categories: 
- hugo博客搭建
tags:
- blog 
- hugo
- win10
---
# 本地搭建hugo网站

## 1.初始化hugo

```
hugo new site 博客路径
//
cd 博客路径

//博客路径文件夹的结构如下
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

## 2. 配置主题themes

方式一： git

```
cd themes/
git clone https://github.com/author/theme-name.git themes/theme-name
```

方式二： 下载包手动解压

把主题的包压到themes/文件夹下，之后对`hugo.toml`文件进行一点过的修改。个人推荐stack主题。

修改 hugo.toml文件

```
theme = "my-theme"
// my-theme是你下载的theme的主题名，要和你解压的文件名一致
```

## 3.生成网站和第一篇博客

```
cd myblog/      -->博客路径

# 打开cmd输入以下命令：
hugo #之后博客文件路径会产生一个public/文件夹，里面保存生成的静态页面。
# 生成一篇 .md 博客
hugo new content_type/content_name.md
```

上述步骤后会在\myblog\content\content_type\ 文件夹中生成 我们的第一篇博客 content_name.md，
博客内容在文件 content_name.md 中编辑即可。

## 4.本地浏览器预览网页



```
hugo server
# 打开以下网页预览
http://localhost:1313
```

## 5.放在最后！

### 5.1配置hugo.toml 

下载好主题后，主题的 exampleSite 目录一般会有一个 config.toml 配置文件，根据注释做一些基本的修改，再复制到你的根目录下的 config.tmol 文件。[博客原文](https://stilig.me/posts/building-hugo/#%E4%BD%BF%E7%94%A8-hugo)这个博客直接给出修改后的 config 文件，可以拿来学习配置的注释。注意到这个博客用的是LoveIt主题，而我建站使用的是stack主题，所以后续个性化我的博客后，我会在后面贴出我的配置以供参考。持续更新中...

```
baseURL = "https://your-domain.org"

# 更改使用 Hugo 构建网站时使用的默认主题
theme = "LoveIt"

# 网站标题
title = "Stilig"
defaultContentLanguage = "zh-cn"
# 网站语言, 仅在这里 CN 大写 ["en", "zh-CN", "fr", "pl", ...]
languageCode = "zh-CN"
# 语言名称 ["English", "简体中文", "Français", "Polski", ...]
languageName = "简体中文"

# 是否包括中日韩文字
hasCJKLanguage = true

# 默认每页列表显示的文章数目
paginate = 12
# 谷歌分析代号 [UA-XXXXXXXX-X]
googleAnalytics = ""
# 版权描述，仅仅用于 SEO
copyright = ""

# 是否使用 robots.txt
enableRobotsTXT = true
# 是否使用 git 信息
#enableGitInfo = true
# 是否使用 emoji 代码
enableEmoji = true

# 忽略一些构建错误
ignoreErrors = ["error-remote-getjson", "error-missing-instagram-accesstoken"]

# 作者配置
[author]
  name = "Stilig"
  email = "your_email"

# 菜单配置
[menu]
  [[menu.main]]
    weight = 1
    identifier = "posts"
    # 你可以在名称 (允许 HTML 格式) 之前添加其他信息, 例如图标
    pre = ""
    # 你可以在名称 (允许 HTML 格式) 之后添加其他信息, 例如图标
    post = ""
    name = "文章"
    url = "/posts/"
    # 当你将鼠标悬停在此菜单链接上时, 将显示的标题
    title = ""
  [[menu.main]]
    weight = 2
    identifier = "tags"
    pre = ""
    post = ""
    name = "标签"
    url = "/tags/"
    title = ""
  [[menu.main]]
    weight = 3
    identifier = "categories"
    pre = ""
    post = ""
    name = "分类"
    url = "/categories/"
    title = ""

# Hugo 解析文档的配置
[markup]
  # 语法高亮设置 (https://gohugo.io/content-management/syntax-highlighting)
  [markup.highlight]
    # false 是必要的设置 (https://github.com/dillonzq/LoveIt/issues/158)
    codeFences = true
    guessSyntax = true
    lineNos = true
    lineNumbersInTable = true
    # false 是必要的设置
    # (https://github.com/dillonzq/LoveIt/issues/158)
    # Goldmark 是 Hugo 0.60 以来的默认 Markdown 解析库
    noClasses = false
  # Goldmark 是 Hugo 0.60 以来的默认 Markdown 解析库
  [markup.goldmark]
    [markup.goldmark.extensions]
      definitionList = true
      footnote = true
      linkify = true
      strikethrough = true
      table = true
      taskList = true
      typographer = true
    [markup.goldmark.renderer]
      # 是否在文档中直接使用 HTML 标签
      unsafe = true
  # 目录设置
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 6
[params]
  # 网站默认主题样式 ["auto", "light", "dark"]
  defaultTheme = "light"
  # 公共 git 仓库路径，仅在 enableGitInfo 设为 true 时有效
  #gitRepo = ""
  # LoveIt 新增 | 0.1.1 哪种哈希函数用来 SRI, 为空时表示不使用 SRI
  # ["sha256", "sha384", "sha512", "md5"]
  fingerprint = "sha256"
  # LoveIt 新增 | 0.2.0 日期格式
  dateFormat = "2006-01-02"
  # 网站标题, 用于 Open Graph 和 Twitter Cards
  title = "Stilig的博客"
  # 网站描述, 用于 RSS, SEO, Open Graph 和 Twitter Cards
  description = "Stilig的博客"
  # 网站图片, 用于 Open Graph 和 Twitter Cards
  images = ["首页中间的图片"]

# 页面头部导航栏配置
[params.header]
  # 桌面端导航栏模式 ["fixed", "normal", "auto"]
  desktopMode = "normal"
  # 移动端导航栏模式 ["fixed", "normal", "auto"]
  mobileMode = "normal"
  # LoveIt 新增 | 0.2.0 页面头部导航栏标题配置
  [params.header.title]
    # LOGO 的 URL
    logo = ""
    # 标题名称
    name = "Stilig"
    # 你可以在名称 (允许 HTML 格式) 之前添加其他信息, 例如图标
    pre = ""
    # 你可以在名称 (允许 HTML 格式) 之后添加其他信息, 例如图标
    post = ""
    # LoveIt 新增 | 0.2.5 是否为标题显示打字机动画
    typeit = false

# 页面底部信息配置
[params.footer]
  enable = true
  # LoveIt 新增 | 0.2.0 自定义内容 (支持 HTML 格式)
  custom = ''
  # LoveIt 新增 | 0.2.0 是否显示 Hugo 和主题信息
  hugo = false
  # LoveIt 新增 | 0.2.0 是否显示版权信息
  copyright = true
  # LoveIt 新增 | 0.2.0 是否显示作者
  author = true
  # 网站创立年份
  since = 2022
  # ICP 备案信息，仅在中国使用 (支持 HTML 格式)
  icp = ''
  # 许可协议信息 (支持 HTML 格式)
  license = '<a rel="license external nofollow noopener noreffer" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>'

# LoveIt 新增 | 0.2.0 Section (所有文章) 页面配置
[params.section]
  # section 页面每页显示文章数量
  paginate = 20
  # 日期格式 (月和日)
  dateFormat = "01-02"
  # RSS 文章数目
  rss = 10

# LoveIt 新增 | 0.2.0 List (目录或标签) 页面配置
[params.list]
  # list 页面每页显示文章数量
  paginate = 20
  # 日期格式 (月和日)
  dateFormat = "01-02"
  # RSS 文章数目
  rss = 10

# LoveIt 新增 | 0.2.0 应用图标配置
[params.app]
  # 当添加到 iOS 主屏幕或者 Android 启动器时的标题, 覆盖默认标题
  title = ""
  # 是否隐藏网站图标资源链接
  noFavicon = false
  # 更现代的 SVG 网站图标, 可替代旧的 .png 和 .ico 文件
  svgFavicon = ""
  # Android 浏览器主题色
  themeColor = "#ffffff"
  # Safari 图标颜色
  iconColor = "#5bbad5"
  # Windows v8-10磁贴颜色
  tileColor = "#da532c"

# LoveIt 新增 | 0.2.0 搜索配置
[params.search]
  enable = true
  # 搜索引擎的类型 ["lunr", "algolia"]
  type = "algolia"
  # 文章内容最长索引长度
  contentLength = 4000
  # 搜索框的占位提示语
  placeholder = ""
  # LoveIt 新增 | 0.2.1 最大结果数目
  maxResultLength = 10
  # LoveIt 新增 | 0.2.3 结果内容片段长度
  snippetLength = 50
  # LoveIt 新增 | 0.2.1 搜索结果中高亮部分的 HTML 标签
  highlightTag = "em"
  # LoveIt 新增 | 0.2.4 是否在搜索索引中使用基于 baseURL 的绝对路径
  absoluteURL = false
  ##注册使用，前往：https://www.algolia.com/
  [params.search.algolia]
    index = ""
    appID = ""
    searchKey = ""

# 主页配置
[params.home]
  # LoveIt 新增 | 0.2.0 RSS 文章数目
  rss = 10
  # 主页个人信息
  [params.home.profile]
    enable = true
    # Gravatar 邮箱，用于优先在主页显示的头像
    gravatarEmail = ""
    # 主页显示头像的 URL
    avatarURL = ""
    # LoveIt 更改 | 0.2.7 主页显示的网站标题 (支持 HTML 格式)
    title = ""
    # 主页显示的网站副标题 (允许 HTML 格式)
    subtitle = "欢迎来到我的博客"
    # 是否为副标题显示打字机动画
    typeit = true
    # 是否显示社交账号
    social = true
    # LoveIt 新增 | 0.2.0 免责声明 (支持 HTML 格式)
    disclaimer = ""
  # 主页文章列表
  [params.home.posts]
    enable = true
    # 主页每页显示文章数量
    paginate = 6
    # LoveIt 删除 | 0.2.0 被 params.page 中的 hiddenFromHomePage 替代
    # 当你没有在文章前置参数中设置 "hiddenFromHomePage" 时的默认行为
    defaultHiddenFromHomePage = false

# 作者的社交信息设置
[params.social]
  GitHub = ""
  Linkedin = ""
  Twitter = ""
  Instagram = ""
  Facebook = ""
  Telegram = ""
  Medium = ""
  Gitlab = ""
  Youtubelegacy = ""
  Youtubecustom = ""
  Youtubechannel = ""
  Tumblr = ""
  Quora = ""
  Keybase = ""
  Pinterest = ""
  Reddit = ""
  Codepen = ""
  FreeCodeCamp = ""
  Bitbucket = ""
  Stackoverflow = ""
  Weibo = ""
  Odnoklassniki = ""
  VK = ""
  Flickr = ""
  Xing = ""
  Snapchat = ""
  Soundcloud = ""
  Spotify = ""
  Bandcamp = ""
  Paypal = ""
  Fivehundredpx = ""
  Mix = ""
  Goodreads = ""
  Lastfm = ""
  Foursquare = ""
  Hackernews = ""
  Kickstarter = ""
  Patreon = ""
  Steam = ""
  Twitch = ""
  Strava = ""
  Skype = ""
  Whatsapp = ""
  Zhihu = ""
  Douban = ""
  Angellist = ""
  Slidershare = ""
  Jsfiddle = ""
  Deviantart = ""
  Behance = ""
  Dribbble = ""
  Wordpress = ""
  Vine = ""
  Googlescholar = ""
  Researchgate = ""
  Mastodon = ""
  Thingiverse = ""
  Devto = ""
  Gitea = ""
  XMPP = ""
  Matrix = ""
  Bilibili = ""
  Discord = ""
  DiscordInvite = ""
  Lichess = ""
  ORCID = ""
  Pleroma = ""
  Kaggle = ""
  MediaWiki= ""
  Plume = ""
  HackTheBox = ""
  RootMe= ""
  Phone = ""
  Email = ""
  RSS = true # LoveIt 新增 | 0.2.0

# LoveIt 更改 | 0.2.0 文章页面全局配置
[params.page]
  # LoveIt 新增 | 0.2.0 是否在主页隐藏一篇文章
  hiddenFromHomePage = false
  # LoveIt 新增 | 0.2.0 是否在搜索结果中隐藏一篇文章
  hiddenFromSearch = false
  # LoveIt 新增 | 0.2.0 是否使用 twemoji
  twemoji = false
  # 是否使用 lightgallery
  lightgallery = false
  # LoveIt 新增 | 0.2.0 是否使用 ruby 扩展语法
  ruby = true
  # LoveIt 新增 | 0.2.0 是否使用 fraction 扩展语法
  fraction = true
  # LoveIt 新增 | 0.2.0 是否使用 fontawesome 扩展语法
  fontawesome = true
  # 是否在文章页面显示原始 Markdown 文档链接
  linkToMarkdown = false
  # LoveIt 新增 | 0.2.4 是否在 RSS 中显示全文内容
  rssFullText = false
  # LoveIt 新增 | 0.2.0 目录配置
  [params.page.toc]
    # 是否使用目录
    enable = true
    # LoveIt 新增 | 0.2.9 是否保持使用文章前面的静态目录
    keepStatic = false
    # 是否使侧边目录自动折叠展开
    auto = true
  # LoveIt 新增 | 0.2.0 代码配置
  [params.page.code]
    # 是否显示代码块的复制按钮
    copy = true
    # 默认展开显示的代码行数
    maxShownLines = 50
# LoveIt 更改 | 0.2.0 KaTeX 数学公式
[params.page.math]
  enable = true
  # LoveIt 更改 | 0.2.11 默认行内定界符是 $ ... $ 和 \( ... \)
  inlineLeftDelimiter = ""
  inlineRightDelimiter = ""
  # LoveIt 更改 | 0.2.11 默认块定界符是 $$ ... $$, \[ ... \], \begin{equation} ... \end{equation} 和一些其它的函数
  blockLeftDelimiter = ""
  blockRightDelimiter = ""
  # KaTeX 插件 copy_tex
  copyTex = true
  # KaTeX 插件 mhchem
  mhchem = true
# LoveIt 新增 | 0.2.0 Mapbox GL JS 配置
[params.page.mapbox]
  # Mapbox GL JS 的 access token
  accessToken = ""
  # 浅色主题的地图样式
  lightStyle = "mapbox://styles/mapbox/light-v10?optimize=true"
  # 深色主题的地图样式
  darkStyle = "mapbox://styles/mapbox/dark-v10?optimize=true"
  # 是否添加 NavigationControl
  navigation = true
  # 是否添加 GeolocateControl
  geolocate = true
  # 是否添加 ScaleControl
  scale = true
  # 是否添加 FullscreenControl
  fullscreen = true
# LoveIt 更改 | 0.2.0 文章页面的分享信息设置
[params.page.share]
  enable = true
  Twitter = true
  Facebook = true
  Linkedin = true
  Whatsapp = false
  Pinterest = false
  Tumblr = false
  HackerNews = false
  Reddit = false
  VK = false
  Buffer = false
  Xing = false
  Line = true
  Instapaper = false
  Pocket = false
  Flipboard = false
  Weibo = true
  Blogger = false
  Baidu = false
  Odnoklassniki = false
  Evernote = false
  Skype = false
  Trello = false
  Mix = false
# LoveIt 更改 | 0.2.0 评论系统设置
[params.page.comment]
  enable = false
  # Disqus 评论系统设置
  [params.page.comment.disqus]
    # LoveIt 新增 | 0.1.1
    enable = false
    # Disqus 的 shortname，用来在文章中启用 Disqus 评论系统
    shortname = ""
  # Gitalk 评论系统设置
  [params.page.comment.gitalk]
    # LoveIt 新增 | 0.1.1
    enable = false
    owner = ""
    repo = ""
    clientId = ""
    clientSecret = ""
  # Valine 评论系统设置
  [params.page.comment.valine]
    enable = false
    appId = ""
    appKey = ""
    placeholder = ""
    avatar = "mp"
    meta= ""
    pageSize = 10
    # 为空时自动适配当前主题 i18n 配置
    lang = ""
    visitor = true
    recordIP = true
    highlight = true
    enableQQ = false
    serverURLs = ""
    # LoveIt 新增 | 0.2.6 emoji 数据文件名称, 默认是 "google.yml"
    # ["apple.yml", "google.yml", "facebook.yml", "twitter.yml"]
    # 位于 "themes/LoveIt/assets/lib/valine/emoji/" 目录
    # 可以在你的项目下相同路径存放你自己的数据文件:
    # "assets/lib/valine/emoji/"
    emoji = ""
  # Facebook 评论系统设置
  [params.page.comment.facebook]
    enable = false
    width = "100%"
    numPosts = 10
    appId = ""
    # 为空时自动适配当前主题 i18n 配置
    languageCode = "zh_CN"
# LoveIt 新增 | 0.2.0 Telegram Comments 评论系统设置
[params.page.comment.telegram]
  enable = false
  siteID = ""
  limit = 5
  height = ""
  color = ""
  colorful = true
  dislikes = false
  outlined = false
# LoveIt 新增 | 0.2.0 Commento 评论系统设置
[params.page.comment.commento]
  enable = false
# LoveIt 新增 | 0.2.5 utterances 评论系统设置
[params.page.comment.utterances]
  enable = false
  # owner/repo
  repo = ""
  issueTerm = "pathname"
  label = ""
  lightTheme = "github-light"
  darkTheme = "github-dark"
# giscus comment 评论系统设置 (https://giscus.app/zh-CN)
[params.page.comment.giscus]
  # 你可以参考官方文档来使用下列配置
  enable = false
  repo = ""
  repoId = ""
  category = "Announcements"
  categoryId = ""
  # 为空时自动适配当前主题 i18n 配置
  lang = ""
  mapping = "pathname"
  reactionsEnabled = "1"
  emitMetadata = "0"
  inputPosition = "bottom"
  lazyLoading = false
  lightTheme = "light"
  darkTheme = "dark"
# LoveIt 新增 | 0.2.7 第三方库配置
[params.page.library]
  [params.page.library.css]
    # someCSS = "some.css"
    # 位于 "assets/"
    # 或者
    # someCSS = "https://cdn.example.com/some.css"
  [params.page.library.js]
    # someJavascript = "some.js"
    # 位于 "assets/"
    # 或者
    # someJavascript = "https://cdn.example.com/some.js" 
# LoveIt 更改 | 0.2.10 页面 SEO 配置
[params.page.seo]
  # 图片 URL
  images = []
  # 出版者信息
  [params.page.seo.publisher]
    name = ""
    logoUrl = ""

# LoveIt 新增 | 0.2.5 TypeIt 配置
[params.typeit]
  # 每一步的打字速度 (单位是毫秒)
  speed = 100
  # 光标的闪烁速度 (单位是毫秒)
  cursorSpeed = 1000
  # 光标的字符 (支持 HTML 格式)
  cursorChar = "|"
  # 打字结束之后光标的持续时间 (单位是毫秒, "-1" 代表无限大)
  duration = -1

# 网站验证代码，用于 Google/Bing/Yandex/Pinterest/Baidu
[params.verification]
  google = ""
  bing = ""
  yandex = ""
  pinterest = ""
  baidu = ""

# LoveIt 新增 | 0.2.10 网站 SEO 配置
[params.seo]
  # 图片 URL
  image = ""
  # 缩略图 URL
  thumbnailUrl = ""

# LoveIt 新增 | 0.2.0 网站分析配置
[params.analytics]
  enable = true
  [params.analytics.google]
    id = ""
    # whether to anonymize IP
    # 是否匿名化用户 IP
    anonymizeIP = true
   # Fathom Analytics
   # 百度统计,自己配置的
  [params.analytics.baidu]
    id = ""
#  Cookie 许可配置
#[params.cookieconsent]
  #enable = true
  # 用于 Cookie 许可横幅的文本字符串
  #[params.cookieconsent.content]
    #message = ""
    #dismiss = ""
    #link = ""

#  第三方库文件的 CDN 设置
[params.cdn]
  # CDN 数据文件名称, 默认不启用
  # ["jsdelivr.yml"]
  # 位于 "themes/LoveIt/assets/data/cdn/" 目录
  # 可以在你的项目下相同路径存放你自己的数据文件:
  # "assets/data/cdn/"
  data = ""

#  兼容性设置
[params.compatibility]
  # 是否使用 Polyfill.io 来兼容旧式浏览器
  polyfill = false
  # 是否使用 object-fit-images 来兼容旧式浏览器
  objectFit = false
# 网站地图配置
[sitemap]
  changefreq = "weekly"
  filename = "sitemap.xml"
  priority = 0.5

# Permalinks 配置
[Permalinks]
  # posts = ":year/:month/:filename"
  posts = ":filename"

# 隐私信息配置
[privacy]
  #  Google Analytics 相关隐私 (被 params.analytics.google 替代)
  [privacy.googleAnalytics]
    # ...
  [privacy.twitter]
    enableDNT = true
  [privacy.youtube]
    privacyEnhanced = true

# 用于输出 Markdown 格式文档的设置
[mediaTypes]
  [mediaTypes."text/plain"]
    suffixes = ["md"]

# 用于输出 Markdown 格式文档的设置
[outputFormats.MarkDown]
  mediaType = "text/plain"
  isPlainText = true
  isHTML = false

# 用于 Hugo 输出文档的设置
[outputs]
  home = ["HTML", "RSS", "JSON"]
  page = ["HTML", "MarkDown"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]
  taxonomyTerm = ["HTML"]
```

### 5.2 修改默认markdown编译模板

```
cd \myblog\archetypes\ 

修改里面的default.md文件
```

```
---
title: "{{ replace .TranslationBaseName "-" " " | title }}"
subtitle: ""
date: {{ .Date }}
lastmod: {{ .Date }}
draft: true
author: ""
authorLink: ""
license: ""

tags: [""]
categories: [""]

featuredImage: ""
featuredImagePreview: ""

summary: ""

hiddenFromHomePage: false
hiddenFromSearch: false

toc:
  enable: true
  auto: true

mapbox:
share:
  enable: true
comment:
  enable: true
---
```

