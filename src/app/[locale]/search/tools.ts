type NavItem = {
  icon: string; // 图标URL或本地SVG
  title: string;
  url: string;
  desc?: string;
};

type NavGroup = {
  group: string;
  items: NavItem[];
};

export const navData: NavGroup[] = [
  {
    group: '常用',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/786768.jpg',
        title: 'x',
        url: 'https://x.com/home',
        desc: '世界',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/uyttuyt.jpeg',
        title: 'telegram',
        url: 'https://web.telegram.org/k/',
        desc: '世界',
      },

      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/443254%E7%AA%81%E7%84%B6%E5%8F%91%E7%AC%AC%E4%B8%89%E4%B8%AA.png',
        title: 'youtube',
        url: 'https://www.youtube.com/',
        desc: '观看影片',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/5644654654.png',
        title: 'perplexity',
        url: 'https://www.perplexity.ai/',
        desc: '韩国ai pro一年',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_2/inslogo.jpeg',
        title: 'ins',
        url: 'https://www.instagram.com/eallion',
        desc: 'ins',
      },
    ],
  },

  {
    group: 'ai',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/5644654654.png',
        title: 'perplexity',
        url: 'https://www.perplexity.ai/',
        desc: '韩国ai pro一年',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/765576557576.jpeg',
        title: 'claude',
        url: 'https://claude.ai/new',
        desc: '代码方面ai',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/65765765765.jpeg',
        title: 'chatgpt',
        url: 'https://chatgpt.com/',
        desc: 'chatgpt',
      },
    ],
  },
  {
    group: '文本',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/logo_blogger_40px.png',
        title: '博文',
        url: 'https://www.blogger.com/blog/posts/7101707795822442267?hl=zh-CN&tab=jj',
        desc: '博文 博客文记录',
      },
    ],
  },
  {
    group: '开发',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/5464654564.png',
        title: 'github',
        url: 'https://github.com/',
        desc: 'github',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/43254235%E9%AB%98%E8%BE%BE%E5%9B%9B%E7%82%B9%E5%8D%81%E5%88%86%E6%84%9F%E5%8A%A8.jpg',
        title: '码上掘金',
        url: 'https://code.juejin.cn/',
        desc: '在线开发编辑器',
      },

      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/756775g.jpeg',
        title: 'nextjs',
        url: 'https://nextjs.org/',
        desc: 'nextjs react',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/765757756ffgh.png',
        title: '阿里云',
        url: 'https://home.console.aliyun.com/home/dashboard/ProductAndService',
        desc: '服务器',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/tengxunyunlogo.png',
        title: '腾讯云',
        url: 'https://console.cloud.tencent.com/lighthouse/instance/index?rid=1',
        desc: '服务器',
      },
    ],
  },
  {
    group: '观看影片',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E4%B8%8B%E8%BD%BD.png',
        title: 'bilibili',
        url: 'https://www.bilibili.com/',
        desc: '观看影片',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E5%B9%85%E5%BA%A6%E8%90%A8%E8%8A%AC.jpg',
        title: '爱壹帆',
        url: 'https://www.iyf.tv/',
        desc: '观看影片',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/443254%E7%AA%81%E7%84%B6%E5%8F%91%E7%AC%AC%E4%B8%89%E4%B8%AA.png',
        title: 'youtube',
        url: 'https://www.youtube.com/',
        desc: '观看影片',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E9%A3%9E%E6%B4%92%E8%8C%83%E5%BE%B7%E8%90%A8%E5%85%AC%E5%8F%B8%E6%B3%95.png',
        title: 'vidhub',
        url: 'https://vidhub.me/',
        desc: '在线观看视频库',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/acfunimg.jpg',
        title: 'acfun',
        url: 'https://www.acfun.cn/',
        desc: '以前的b',
      },
    ],
  },
  {
    group: '金融',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/dapanyuntu.png',
        title: '大盘云图',
        url: 'ttps://dapanyuntu.com/',
        desc: '大股 大风向',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/576575dsse.png',
        title: '币安',
        url: 'https://www.binance.com/zh-CN/my/dashboard',
        desc: '比特币',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E9%95%BF%E6%A1%A5%E8%AF%81%E5%88%B8ico.jpg',
        title: '长桥',
        url: 'https://trade.longportapp.com/',
        desc: '买港美股',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/cbndata.jpg',
        title: 'cbndata',
        url: 'https://www.cbndata.com/',
        desc: '金融世界观 消息',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E7%8A%AF%E5%BE%97%E4%B8%8A%E5%B9%BF%E6%B3%9B%E5%A4%A7%E4%BD%BF%E9%A6%86%E5%92%8C%E5%8A%9F%E5%A4%AB%E5%A4%A7%E5%B8%88%E7%9A%84%E8%AF%9D%E5%A4%A7%E6%A6%82%E5%A6%82%E6%AD%A4.jpg',
        title: 'millennialmoney',
        url: 'https://millennialmoney.com/',
        desc: '金融世界观 消息',
      },
    ],
  },
  {
    group: '设计',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/565765.png',
        title: 'figma',
        url: 'https://www.figma.com/',
        desc: '软件原型设计',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/56456633gg.jpeg',
        title: '蓝湖',
        url: 'https://lanhuapp.com/',
        desc: '软件原型设计',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/zhanku.png',
        title: '站酷',
        url: 'https://www.zcool.com.cn/',
        desc: '图片素材',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E7%86%8A%E7%8C%AB%E5%8E%8B%E7%BC%A9.jpg',
        title: 'iloveimg压缩',
        url: 'https://www.iloveimg.com/zh-cn/compress-image/compress-jpg',
        desc: '图片压缩',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E9%A2%9C%E8%89%B2%E8%AF%86%E5%88%AB.jpg',
        title: '颜色识别',
        url: 'https://color.eallion.com/',
        desc: '认识颜色',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E7%B4%AB%E5%BE%AE%E6%96%97%E6%95%B0.jpg',
        title: '紫薇学习',
        url: 'https://iztro.com/',
        desc: '紫薇学习',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E5%85%A8%E7%BD%91%E7%83%AD%E7%82%B9.png',
        title: '全网热点',
        url: 'https://hot.eallion.com/#/',
        desc: '全网热点',
      },
    ],
  },
  {
    group: '社区',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%A2%B5%E8%92%82%E5%86%88%E6%98%AF%E5%BE%B7%E5%9B%BD%E6%94%BE43.png',
        title: '少数派',
        url: 'https://sspai.com/',
        desc: '社区 消息',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E6%AD%A4%E6%AC%A1%E5%85%85%E5%88%86%E7%9A%84%E5%8F%91%E5%A4%A7%E6%B0%B4%E8%8C%83%E5%BE%B7%E8%90%A8%E5%8F%91.jpg',
        title: 'classcentral',
        url: 'https://www.classcentral.com/?utm_source=gapis.money',
        desc: '学习 证书 外国大学',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/disco%E5%A6%82%E6%9E%9C%E5%A4%A7%E5%A4%A7%E6%92%92%E5%8F%91%E5%88%B0%E4%BB%98.png',
        title: 'discord',
        url: 'https://discord.com/channels/662267976984297473/952771221915840552',
        desc: '聊天室',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/bag_1/hkhkhkhkhk.jpeg',
        title: 'reddit',
        url: 'https://www.reddit.com/',
        desc: '美国红迪社区',
      },
    ],
  },

  {
    group: '摄影机器',
    items: [
      {
        icon: 'https://www.nikon-asia.com/media/logo/websites/17/Symbol_100x100mm.jpg',
        title: 'Nikon Asia',
        url: 'https://www.nikon-asia.com',
        desc: '尼康亚洲官网',
      },
      {
        icon: 'https://instax.com/common2/img/common/footer_logo_01.svg',
        title: '富士',
        url: 'https://instax.com',
        desc: '富士拍立得全球官网',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/gjj776.png',
        title: '索尼',
        url: 'https://alphauniverse.com',
        desc: '索尼官网',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E4%B8%8B%E8%BD%BD.jpeg',
        title: '佳能',
        url: 'https://www.canon.com.cn/',
        desc: '佳能官网',
      },
    ],
  },

  {
    group: '小小工具',
    items: [
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/sms-activat.jpg',
        title: '验证手机号',
        url: 'https://sms-activate.io',
        desc: '虚拟手机验证',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E5%98%BB%E5%98%BB%E5%98%BB%E5%98%BB%E5%98%BB%E5%98%BB%E5%98%BB%E5%9C%A8.jpg',
        title: 'youtube下载器',
        url: 'https://youtube.iiilab.com/',
        desc: '视频下载器',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/%E5%98%BB%E5%98%BB%E5%98%BB%E5%98%BB%E5%98%BB%E5%98%BB%E5%98%BB%E5%9C%A8.jpg',
        title: 'b站下载器',
        url: 'https://snapany.com/zh/bilibili',
        desc: '视频下载器',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/mac%E7%A0%B4%E8%A7%A3.jpg',
        title: '两元店',
        url: 'https://liangyuandian.club/#/dashboard',
        desc: 't',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/7lol.png',
        title: '7lol',
        url: 'https://7lol.lol/',
        desc: 't',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/mac%E7%A0%B4%E8%A7%A3.jpg',
        title: 'mac 软件',
        url: 'https://www.mac618.com/',
        desc: 'mac电脑破解软件',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/md%E5%9C%A8%E7%BA%BF.png',
        title: 'md在线样式',
        url: 'https://markdown.lovejade.cn/',
        desc: '在线查看md样式',
      },
      {
        icon: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/logottsminni.png',
        title: 'ttsomni',
        url: 'https://www.ttsomni.com/',
        desc: '免费文本转语音',
      },
    ],
  },
];
