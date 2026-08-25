// 拍照秘籍数据 - 24个分类
const POSE_DATA = [
  {
    id: 1,
    name: "室内探店半身姿势",
    icon: "☕",
    tags: ["咖啡", "甜品", "半身", "探店", "韩系"],
    color: "#D4A574",
    actionPoints: "借助咖啡甜品当道具，手捧杯子、勺子吃甜品；手托脸颊、比手势，肩膀放松；身体微微侧一点，不要正对镜头死盯。",
    outfitTips: "温柔韩系选针织、小吊带、衬衫，低饱和度颜色；复古店铺选皮衣、格纹、短裙；搭配包包、发箍、帽子增加氛围感。",
    photoTips: "优先利用窗边自然光，避开顶光黑脸；动作幅度大一点，抬腿、歪头，照片不死板。",
    images: [
      "https://aka.doubaocdn.com/s/5CACvqXm0W",
      "https://aka.doubaocdn.com/s/2SO2fkLoEU",
      "https://aka.doubaocdn.com/s/Z3OJE5KaZu",
      "https://aka.doubaocdn.com/s/e3a1x4Ctf0"
    ]
  },
  {
    id: 2,
    name: "室内探店全身姿势",
    icon: "🏠",
    tags: ["全身", "探店", "仰拍", "走路抓拍"],
    color: "#C49A6C",
    actionPoints: "蹲姿、倚靠门框、椅子；走路抓拍自然动态；手插口袋、撩头发；侧身回头看镜头。",
    outfitTips: "同半身姿势穿搭，全身照注意上下装比例协调，高腰显腿长。",
    photoTips: "手机放低一点仰拍显腿长；利用店铺楼梯、门口、落地窗做背景。",
    images: [
      "https://aka.doubaocdn.com/s/fVCXFd1Vfn",
      "https://aka.doubaocdn.com/s/dF7WUMXImd",
      "https://aka.doubaocdn.com/s/Ahfpk0UEIr",
      "https://aka.doubaocdn.com/s/0o63VG2Nmy",
      "https://aka.doubaocdn.com/s/QK9bEY2VyE",
      "https://aka.doubaocdn.com/s/ooIIeXP2Av",
      "https://aka.doubaocdn.com/s/zfoStNME2Z",
      "https://aka.doubaocdn.com/s/hjQxdse2Vm",
      "https://aka.doubaocdn.com/s/Mg0NyR8CWx"
    ]
  },
  {
    id: 3,
    name: "双人拍照姿势",
    icon: "👯",
    tags: ["双人", "闺蜜", "情侣", "互动", "搞怪"],
    color: "#E8B4B8",
    actionPoints: "一近一远高低错落，不要并排站一样高度；互动！碰杯、互相看对方，不要同时看镜头；搞怪动作：比心、抬腿、对镜自拍、拿饮料道具。",
    outfitTips: "同色系或风格统一，不用穿一模一样；甜妹选浅色系，酷飒选黑灰深色系。",
    photoTips: "吃饭场景抓拍吃东西更自然；全身照一人跳一人站，动态感拉满。",
    images: [
      "https://aka.doubaocdn.com/s/XHryFq7jDd",
      "https://aka.doubaocdn.com/s/HK0AfNocB9",
      "https://aka.doubaocdn.com/s/O2OXYLfAx9",
      "https://aka.doubaocdn.com/s/r5K5s0xBwY",
      "https://aka.doubaocdn.com/s/8tRRiZUmnu",
      "https://aka.doubaocdn.com/s/IiAr7tUrSR",
      "https://aka.doubaocdn.com/s/UsXDkjBfWF",
      "https://aka.doubaocdn.com/s/BPob6BCaIv"
    ]
  },
  {
    id: 4,
    name: "春日氛围姿势",
    icon: "🌸",
    tags: ["春天", "花", "清新", "连衣裙", "草地"],
    color: "#F5B8C8",
    actionPoints: "抬手挡阳光、回头笑、捧花、歪头wink；轻嗅花朵、坐在草地上；转圈抓拍裙摆飘动。",
    outfitTips: "浅蓝、米白、浅粉连衣裙，草帽加分；碎花裙、针织开衫很春天。",
    photoTips: "拿花朵做前景，人放在画面三分线；上午或傍晚柔和光线最佳。",
    images: [
      "https://aka.doubaocdn.com/s/LEuLP031K2",
      "https://aka.doubaocdn.com/s/6yHyCzWQqM",
      "https://aka.doubaocdn.com/s/4adA7a8kaz",
      "https://aka.doubaocdn.com/s/b7pw7ow0FP"
    ]
  },
  {
    id: 5,
    name: "夏日氛围姿势",
    icon: "🌻",
    tags: ["夏天", "清凉", "奔跑", "草地", "阳光"],
    color: "#F2C14E",
    actionPoints: "坐草地、躺草坪、奔跑抬手、抬腿比耶；拿冰淇淋/饮料当道具；树荫下乘凉抓拍。",
    outfitTips: "吊带、短裙、浅色T恤，清爽简单；牛仔短裤、碎花吊带很夏日。",
    photoTips: "下午4-6点黄金光，避开正午强光；利用水面反光补光。",
    images: [
      "https://aka.doubaocdn.com/s/vhFItbOYGr",
      "https://aka.doubaocdn.com/s/xiamP9HNdA",
      "https://aka.doubaocdn.com/s/scMF4TrjLx",
      "https://aka.doubaocdn.com/s/CTRHVm0oVJ"
    ]
  },
  {
    id: 6,
    name: "秋日氛围姿势",
    icon: "🍂",
    tags: ["秋天", "落叶", "银杏", "枫叶", "风衣"],
    color: "#C97B4A",
    actionPoints: "抛落叶、捡树叶、靠树、坐台阶；把落叶撒向空中抓拍；手插大衣口袋低头笑。",
    outfitTips: "焦糖、米黄、棕色毛衣，围巾氛围感神器；风衣、格纹大衣很秋天。",
    photoTips: "银杏林、枫叶林是绝佳背景；逆光拍摄发丝发光效果。",
    images: [
      "https://aka.doubaocdn.com/s/ll1YHKPKlX",
      "https://aka.doubaocdn.com/s/KQrvGzwjDi",
      "https://aka.doubaocdn.com/s/D9837stvLA"
    ]
  },
  {
    id: 7,
    name: "冬日氛围姿势",
    icon: "❄️",
    tags: ["冬天", "雪地", "围巾", "大衣", "圣诞"],
    color: "#A8C8E4",
    actionPoints: "捧雪、抬手接雪花、原地跳跃、捂围巾；哈气暖手；穿厚外套裹紧自己。",
    outfitTips: "厚大衣、毛衣，耳罩、手套做道具；白色、米色、红色在雪景中很出片。",
    photoTips: "注意保暖，风大时抓拍表情不要僵住；雪地反光强，适当降低曝光。",
    images: [
      "https://aka.doubaocdn.com/s/nVNas8zsNo",
      "https://aka.doubaocdn.com/s/OIKUsGVrVm",
      "https://aka.doubaocdn.com/s/Ll7WxjAfnN",
      "https://aka.doubaocdn.com/s/UN98eeVa9W"
    ]
  },
  {
    id: 8,
    name: "可爱汉服姿势",
    icon: "🎀",
    tags: ["汉服", "可爱", "团扇", "古风", "少女"],
    color: "#E8B8D4",
    actionPoints: "比耶、wink、甩袖子、拿扇子、蹲下微笑；提裙摆小跑；歪头看镜头。",
    outfitTips: "可爱款汉服选浅粉、浅蓝、鹅黄；搭配团扇、花灯、花枝做道具。",
    photoTips: "汉服注意整理裙摆不要皱巴巴；园林、古窗、假山做背景。",
    images: [
      "https://aka.doubaocdn.com/s/uBXCeUvbn2",
      "https://aka.doubaocdn.com/s/naiF6tUqOo",
      "https://aka.doubaocdn.com/s/pQNQVRBbsp",
      "https://aka.doubaocdn.com/s/1TOd8WhFk7"
    ]
  },
  {
    id: 9,
    name: "文静汉服姿势",
    icon: "📜",
    tags: ["汉服", "文静", "典雅", "古风", "园林"],
    color: "#B8A8D4",
    actionPoints: "回眸、扶栏杆、持书卷，眼神温柔少大笑；低头抚琴/看书；倚柱远望。",
    outfitTips: "文静款选素色、淡雅色系；搭配油纸伞、玉笛、书卷。",
    photoTips: "场景选园林、古窗、假山、长廊；动作放慢，抓拍自然瞬间。",
    images: [
      "https://aka.doubaocdn.com/s/ZEh7EBMJJ1",
      "https://aka.doubaocdn.com/s/oJKPMa7bqi",
      "https://aka.doubaocdn.com/s/8clPeQM93j",
      "https://aka.doubaocdn.com/s/PEhmoC9u2Z"
    ]
  },
  {
    id: 10,
    name: "可爱萌妹姿势",
    icon: "🐰",
    tags: ["可爱", "萌妹", "歪头", "wink", "JK"],
    color: "#F5A8C8",
    actionPoints: "歪头、wink、抬腿蹦跳，双手比可爱手势；猫爪手势、歪头；利用玩偶、发箍做道具。",
    outfitTips: "百褶裙、针织、卡通配饰，色彩明亮；洛丽塔、JK制服也很合适。",
    photoTips: "表情要灵动，多拍几张选最自然的；利用彩色背景增加可爱感。",
    images: [
      "https://aka.doubaocdn.com/s/W52clO4XwG",
      "https://aka.doubaocdn.com/s/EILbHrwCza",
      "https://aka.doubaocdn.com/s/UCEk8BoOw0",
      "https://aka.doubaocdn.com/s/atSyGTQlsM"
    ]
  },
  {
    id: 11,
    name: "辣妹御姐姿势",
    icon: "🔥",
    tags: ["辣妹", "御姐", "酷飒", "街拍", "气场"],
    color: "#D9534F",
    actionPoints: "靠墙倚靠、叉腰、撩头发，眼神酷一点；侧身回眸；手插口袋；大长腿坐姿。",
    outfitTips: "短上衣、皮衣、牛仔短裙，配饰项链包包；紧身连衣裙、高跟鞋增加气场。",
    photoTips: "场景选街头、夜晚街拍、工业风店铺；低角度仰拍显气场。",
    images: [
      "https://aka.doubaocdn.com/s/HtUUx8KXHV",
      "https://aka.doubaocdn.com/s/ouUwvl2JPD",
      "https://aka.doubaocdn.com/s/LVsCDqrTHP",
      "https://aka.doubaocdn.com/s/7uTjMGw6lQ",
      "https://aka.doubaocdn.com/s/7zKjvLgBVl",
      "https://aka.doubaocdn.com/s/w3PN7Lkbmh",
      "https://aka.doubaocdn.com/s/WM3rU346rB",
      "https://aka.doubaocdn.com/s/s4Yr2xcosc",
      "https://aka.doubaocdn.com/s/gFhmniNGxY",
      "https://aka.doubaocdn.com/s/y6pY2Lo0ts",
      "https://aka.doubaocdn.com/s/cVPUQ5Yd8v",
      "https://aka.doubaocdn.com/s/ar75zRVQqC"
    ]
  },
  {
    id: 12,
    name: "熟女成熟姿势",
    icon: "💋",
    tags: ["成熟", "优雅", "知性", "轻熟", "气质"],
    color: "#8B5A7C",
    actionPoints: "坐姿优雅，手轻托下巴，回眸，身体侧转；端咖啡杯；倚靠窗边远望。",
    outfitTips: "修身连衣裙、大衣，配色高级低饱和；真丝衬衫、阔腿裤。",
    photoTips: "光线柔和，利用窗边自然光；表情从容自信，不要过度摆拍。",
    images: [
      "https://aka.doubaocdn.com/s/6yIt2EKyR6",
      "https://aka.doubaocdn.com/s/TBt07o5tVO",
      "https://aka.doubaocdn.com/s/FQ2fZXOyGw",
      "https://aka.doubaocdn.com/s/DPbu2ZnITr"
    ]
  },
  {
    id: 13,
    name: "端庄大气姿势",
    icon: "👑",
    tags: ["端庄", "大气", "商务", "西装", "正式"],
    color: "#5C6B7C",
    actionPoints: "站姿挺拔，双手自然交叠于身前；侧身45度；手搭椅背；端庄坐姿。",
    outfitTips: "西装套装、风衣、剪裁利落的大衣；珍珠配饰增加端庄感。",
    photoTips: "背景简洁大气，建筑、美术馆、酒店大堂；注意体态，挺胸收腹。",
    images: [
      "https://aka.doubaocdn.com/s/03qwV35DZ4",
      "https://aka.doubaocdn.com/s/9srQV4dN20",
      "https://aka.doubaocdn.com/s/7uXaAELlmW",
      "https://aka.doubaocdn.com/s/bgP1iaUMJz"
    ]
  },
  {
    id: 14,
    name: "旗袍拍照姿势",
    icon: "🏮",
    tags: ["旗袍", "复古", "民国风", "东方", "优雅"],
    color: "#A84444",
    actionPoints: "坐姿腰背挺直，腿侧放不要正对镜头；倚门框、墙边回眸；手轻扶团扇；撑油纸伞。",
    outfitTips: "发型盘起来，耳环配饰增加复古气质；搭配油纸伞、折扇、小花做道具。",
    photoTips: "旗袍避免驼背，侧拍更显身材曲线；老上海街景、园林、古建筑做背景。",
    images: [
      "https://aka.doubaocdn.com/s/OKezY5IDiG",
      "https://aka.doubaocdn.com/s/QHq4wSBAmI",
      "https://aka.doubaocdn.com/s/7fuOjEKMKU",
      "https://aka.doubaocdn.com/s/m9cMf7SkjF"
    ]
  },
  {
    id: 15,
    name: "自拍拍照姿势",
    icon: "🤳",
    tags: ["自拍", "对镜", "手势", "表情", "特写"],
    color: "#E07A5F",
    actionPoints: "托腮、手比C、比耶、wink、捂嘴笑、手指点脸颊；猫爪手势、歪头；利用玩偶、发箍做道具。",
    outfitTips: "自拍重点在上半身，选好看的上衣和耳饰；发型整理好很重要。",
    photoTips: "手机稍微高于眼睛，微微低头脸型更好看；找柔和的室内灯光；多尝试微侧脸，不要死死正对镜头。",
    images: [
      "https://aka.doubaocdn.com/s/qsVPlIGYtc",
      "https://aka.doubaocdn.com/s/5f3vCIlps4",
      "https://aka.doubaocdn.com/s/wkcUB4VNUb",
      "https://aka.doubaocdn.com/s/da5rJUZpnM",
      "https://aka.doubaocdn.com/s/5UxbJXzSC0",
      "https://aka.doubaocdn.com/s/KaCWDgevXc",
      "https://aka.doubaocdn.com/s/S8k8D4b6ny",
      "https://aka.doubaocdn.com/s/MegVHMFgfO"
    ]
  },
  {
    id: 16,
    name: "古镇拍照姿势",
    icon: "🏯",
    tags: ["古镇", "水乡", "石板路", "新中式", "旅行"],
    color: "#7A8B6B",
    actionPoints: "倚靠木门、老墙，走石板路抓拍动态；坐台阶、临水栏杆，回眸看向远方；拿伞、扇子、小花做道具。",
    outfitTips: "新中式、棉麻长裙、汉服、浅色系长裙；避开颜色太杂乱的衣服。",
    photoTips: "利用门框、圆窗做框架构图；避开大量游客，利用建筑遮挡人群；小桥流水、青石板路是经典机位。",
    images: [
      "https://aka.doubaocdn.com/s/PpdtHCteVY",
      "https://aka.doubaocdn.com/s/zUFnpsWXp6",
      "https://aka.doubaocdn.com/s/OTVBsZmGFQ",
      "https://aka.doubaocdn.com/s/qWsfnDuOSu",
      "https://aka.doubaocdn.com/s/eFM4vU0HPj",
      "https://aka.doubaocdn.com/s/QVtNlUXZDE",
      "https://aka.doubaocdn.com/s/Xj16VSBPNd",
      "https://aka.doubaocdn.com/s/tFjomq2Z61"
    ]
  },
  {
    id: 17,
    name: "酒馆拍照姿势",
    icon: "🍸",
    tags: ["酒馆", "酒吧", "微醺", "夜景", "氛围感"],
    color: "#6B4E7B",
    actionPoints: "举酒杯、靠吧台、坐高脚凳；微醺状态抓拍；和朋友碰杯。",
    outfitTips: "小礼服、丝质吊带、亮片元素；红唇增加氛围感。",
    photoTips: "酒馆光线偏暗，利用吧台灯光、霓虹灯做光源；开大光圈虚化背景。",
    images: [
      "https://aka.doubaocdn.com/s/L0McpOzgoQ",
      "https://aka.doubaocdn.com/s/Aa6ObuInem"
    ]
  },
  {
    id: 18,
    name: "旅游拍照姿势",
    icon: "✈️",
    tags: ["旅游", "旅行", "风景", "景点", "打卡"],
    color: "#5B9BD5",
    actionPoints: "张开双臂拥抱风景、背影走向远方、跳跃抓拍；坐在景点高处；利用当地特色道具。",
    outfitTips: "舒适又上镜的穿搭，亮色衣服在风景中更突出；帽子、墨镜必备。",
    photoTips: "人小景大的构图更有旅行感；早起或傍晚避开人群；和当地特色建筑/景物互动。",
    images: [
      "https://aka.doubaocdn.com/s/1p1pIOnX3C",
      "https://aka.doubaocdn.com/s/DHFDaYhXmr"
    ]
  },
  {
    id: 19,
    name: "雪山拍照姿势",
    icon: "🏔️",
    tags: ["雪山", "滑雪", "高原", "冬季", "壮阔"],
    color: "#7BA3C4",
    actionPoints: "张开双臂、回头、坐在雪地、跳跃抓拍；捧雪撒向空中。",
    outfitTips: "亮色外套在白雪中更加突出人物；滑雪服、厚羽绒服、毛线帽。",
    photoTips: "注意保暖，风大时抓拍表情不要僵住；雪地反光强，戴墨镜防止眯眼。",
    images: [
      "https://aka.doubaocdn.com/s/EJvsMJsxL1"
    ]
  },
  {
    id: 20,
    name: "吃饭拍照姿势",
    icon: "🍜",
    tags: ["吃饭", "美食", "餐桌", "日常", "朋友"],
    color: "#D4956A",
    actionPoints: "抓拍吃东西，不要摆拍僵硬对着镜头；手举杯子碰杯，把美食放进画面做前景；多人吃饭高低错落，部分人看食物。",
    outfitTips: "日常休闲穿搭即可，避免太正式；颜色和餐厅风格协调。",
    photoTips: "美食当前先拍照再吃；利用餐桌美食做前景增加氛围感；暖光餐厅很出片。",
    images: [
      "https://aka.doubaocdn.com/s/aDwHvZGC3Y",
      "https://aka.doubaocdn.com/s/i4paCZhXNb",
      "https://aka.doubaocdn.com/s/0dZXrAfOg0",
      "https://aka.doubaocdn.com/s/CXu7oagyYD"
    ]
  },
  {
    id: 21,
    name: "男生拍照姿势",
    icon: "🕶️",
    tags: ["男生", "男士", "帅气", "街拍", "松弛感"],
    color: "#4A5568",
    actionPoints: "插口袋、倚靠墙面，身体轻微倾斜，拒绝僵硬立正；走路抓拍、坐台阶、手搭膝盖，不看镜头更松弛；道具：帽子、饮料、背包。",
    outfitTips: "简约T恤、衬衫、夹克，版型干净利落；颜色黑白灰、卡其、牛仔蓝，少复杂大印花。",
    photoTips: "男生拍照自然最重要，不要过度摆拍；利用街头、建筑、咖啡店做背景。",
    images: [
      "https://aka.doubaocdn.com/s/kUUCIIdLxR",
      "https://aka.doubaocdn.com/s/kYdWUT0fCD",
      "https://aka.doubaocdn.com/s/ZvSewnYK1g",
      "https://aka.doubaocdn.com/s/5EvOWOOlBD"
    ]
  },
  {
    id: 22,
    name: "名媛风姿势",
    icon: "💎",
    tags: ["名媛", "贵妇", "高级", "下午茶", "精致"],
    color: "#C9A86C",
    actionPoints: "优雅坐姿、手托香槟杯、倚靠豪车/酒店大门；下午茶场景；侧身回眸。",
    outfitTips: "小香风套装、真丝连衣裙、大衣；珍珠项链、丝巾、精致手包。",
    photoTips: "场景选高端酒店、下午茶餐厅、艺术展；光线柔和，表情从容优雅。",
    images: [
      "https://aka.doubaocdn.com/s/ISUl80eKNK",
      "https://aka.doubaocdn.com/s/WpxdxfVgdn",
      "https://aka.doubaocdn.com/s/dmmM7jTrh9",
      "https://aka.doubaocdn.com/s/Z1eUOEA4ob",
      "https://aka.doubaocdn.com/s/JF8pLQfEiA"
    ]
  },
  {
    id: 23,
    name: "花海拍照姿势",
    icon: "🌷",
    tags: ["花海", "花田", "浪漫", "自然", "春天"],
    color: "#D47FA6",
    actionPoints: "蹲在花丛中、轻嗅花朵、转圈抓拍裙摆、躺在花海里；拿花挡一只眼睛。",
    outfitTips: "白色、浅色连衣裙在花海中最出片；避免穿和花同色的衣服。",
    photoTips: "低角度拍摄，花海做前景；上午或傍晚光线柔和；注意不要踩踏花草。",
    images: [
      "https://aka.doubaocdn.com/s/Azmtv7ek3c",
      "https://aka.doubaocdn.com/s/p0jrEBWE9i",
      "https://aka.doubaocdn.com/s/OWGy2oi0Om",
      "https://aka.doubaocdn.com/s/YG0y29f8GR",
      "https://aka.doubaocdn.com/s/YiIuOCDJxx"
    ]
  },
  {
    id: 24,
    name: "多人搞笑姿势",
    icon: "🤪",
    tags: ["多人", "搞笑", "搞怪", "朋友", "欢乐"],
    color: "#F2A93B",
    actionPoints: "集体跳跃、搞怪表情、排成一排做相同动作、叠罗汉、互相推搡打闹抓拍。",
    outfitTips: "统一风格或颜色，闺蜜装/兄弟装更有团队感；也可以故意穿反差色增加搞笑效果。",
    photoTips: "连拍模式抓最佳瞬间；动作越大越搞笑；不要怕丑，自然最有趣。",
    images: [
      "https://aka.doubaocdn.com/s/HessMGJuZn",
      "https://aka.doubaocdn.com/s/SikWgQVoOR",
      "https://aka.doubaocdn.com/s/bRCdU7kk8B",
      "https://aka.doubaocdn.com/s/HWxhLkx8Ka",
      "https://aka.doubaocdn.com/s/ClGFwkFXfo"
    ]
  }
];

// 拍照万能口诀
const UNIVERSAL_TIPS = [
  "肩膀放松，身体微微侧转，不要正对镜头",
  "多利用道具：包包、饮品、花、帽子，手不会无处安放",
  "能动态就不要摆死，走路、转头、撩头发抓拍更自然",
  "优先找自然光，窗边、下午4-6点光线最柔和",
  "构图把人物放在三分线，不要永远放画面正中间"
];

// 导出到window供其他文件使用
window.POSE_DATA = POSE_DATA;
window.UNIVERSAL_TIPS = UNIVERSAL_TIPS;
