export interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  description: string;
  image_url: string;
  status: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
}

export interface Guide {
  id: number;
  title: string;
  content: string;
  icon: string;
  order_num: number;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  pet_name: string;
  image_url: string;
}

export interface Tip {
  id: number;
  category: string;
  title: string;
  content: string;
  image_url: string;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string;
  description: string;
  website: string;
}

export const pets: Pet[] = [
  {
    id: 1,
    name: "豆豆",
    type: "狗",
    breed: "金毛",
    age: "2岁",
    gender: "公",
    description: "性格温顺，喜欢玩球，已经打过疫苗。",
    image_url: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "咪咪",
    type: "猫",
    breed: "狸花猫",
    age: "1岁",
    gender: "母",
    description: "活泼好动，非常亲人，寻找温暖的家。",
    image_url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "雪球",
    type: "狗",
    breed: "萨摩耶",
    age: "3岁",
    gender: "公",
    description: "微笑天使，需要较大的活动空间。",
    image_url: "https://images.unsplash.com/photo-1529429617329-8a737053918e?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "花花",
    type: "猫",
    breed: "三花猫",
    age: "6个月",
    gender: "母",
    description: "文静的小猫，适合室内饲养。",
    image_url: "https://images.unsplash.com/photo-1573865668131-97417071f295?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    name: "阿黄",
    type: "狗",
    breed: "中华田园犬",
    age: "4岁",
    gender: "公",
    description: "非常忠诚，看家护院的好手。",
    image_url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    name: "小白",
    type: "猫",
    breed: "波斯猫",
    age: "2岁",
    gender: "母",
    description: "高冷优雅，喜欢安静的环境。",
    image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 7,
    name: "黑米",
    type: "狗",
    breed: "拉布拉多",
    age: "1.5岁",
    gender: "公",
    description: "聪明好学，适合作为导盲犬培养。",
    image_url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 8,
    name: "汤姆",
    type: "猫",
    breed: "英短蓝猫",
    age: "3岁",
    gender: "公",
    description: "胖乎乎的，非常懒散，喜欢睡觉。",
    image_url: "https://images.unsplash.com/photo-1513245538231-15454f746438?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 9,
    name: "可乐",
    type: "狗",
    breed: "柯基",
    age: "1岁",
    gender: "公",
    description: "腿短志气大，性格开朗，是大家的开心果。",
    image_url: "https://images.unsplash.com/photo-1513284499445-5da23aa25bc0?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 10,
    name: "芝麻",
    type: "猫",
    breed: "英短金渐层",
    age: "2岁",
    gender: "母",
    description: "性格安静，喜欢晒太阳，非常温顺。",
    image_url: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 11,
    name: "大白",
    type: "狗",
    breed: "大白熊犬",
    age: "3岁",
    gender: "公",
    description: "体型巨大但内心温柔，是个可靠的守护者。",
    image_url: "https://images.unsplash.com/photo-1520560321666-4b36560e79f9?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 12,
    name: "布丁",
    type: "猫",
    breed: "布偶猫",
    age: "1.5岁",
    gender: "母",
    description: "颜值担当，性格像小狗一样粘人。",
    image_url: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 13,
    name: "旺财",
    type: "狗",
    breed: "柴犬",
    age: "2岁",
    gender: "公",
    description: "行走的表情包，性格独立且忠诚。",
    image_url: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 14,
    name: "露露",
    type: "猫",
    breed: "暹罗猫",
    age: "4岁",
    gender: "母",
    description: "话痨属性，喜欢和主人交流，非常聪明。",
    image_url: "https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 15,
    name: "多多",
    type: "狗",
    breed: "贵宾犬",
    age: "5岁",
    gender: "母",
    description: "不掉毛，聪明伶俐，已经学会很多指令。",
    image_url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 16,
    name: "糯米",
    type: "猫",
    breed: "波斯猫",
    age: "1岁",
    gender: "公",
    description: "毛发雪白，像个小雪球，喜欢安静地呆着。",
    image_url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 17,
    name: "哈利",
    type: "狗",
    breed: "边境牧羊犬",
    age: "2.5岁",
    gender: "公",
    description: "智商担当，精力充沛，需要大量的运动。",
    image_url: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  },
  {
    id: 18,
    name: "团团",
    type: "猫",
    breed: "矮脚猫",
    age: "8个月",
    gender: "母",
    description: "超级可爱，虽然腿短但跑得很快。",
    image_url: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=800",
    status: "available",
    created_at: new Date().toISOString()
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: "公益帆布袋",
    price: 39.0,
    description: "印有救助中心Logo的环保帆布袋，所得款项全额用于宠物医疗。",
    image_url: "https://images.unsplash.com/photo-1544816153-16ad461465c8?auto=format&fit=crop&q=80&w=800",
    category: "生活用品"
  },
  {
    id: 2,
    name: "定制宠物项圈",
    price: 25.0,
    description: "手工编织的宠物项圈，舒适耐用。",
    image_url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800",
    category: "宠物用品"
  },
  {
    id: 3,
    name: "爱心明信片套装",
    price: 15.0,
    description: "一套12张，记录了救助中心宠物的感人瞬间。",
    image_url: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=800",
    category: "文创周边"
  },
  {
    id: 4,
    name: "宠物陶瓷碗",
    price: 45.0,
    description: "高品质陶瓷，防滑设计，呵护宠物颈椎。",
    image_url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
    category: "宠物用品"
  }
];

export const guides: Guide[] = [
  {
    id: 1,
    title: "领养条件",
    content: "年满22周岁，有稳定的工作 and 收入，家人同意，能够提供适宜的居住环境。",
    icon: "UserCheck",
    order_num: 1
  },
  {
    id: 2,
    title: "领养流程",
    content: "1. 在线提交申请 -> 2. 电话初筛 -> 3. 线下见面 -> 4. 签署领养协议 -> 5. 开启幸福生活。",
    icon: "ClipboardList",
    order_num: 2
  },
  {
    id: 3,
    title: "准备工作",
    content: "准备好宠物粮食、水碗、牵引绳、猫砂盆等基础用品，并对家里进行必要的安全加固。",
    icon: "Home",
    order_num: 3
  },
  {
    id: 4,
    title: "回访制度",
    content: "领养后的第一、三、六个月，我们会通过微信或电话进行回访，了解宠物的适应情况。",
    icon: "PhoneCall",
    order_num: 4
  }
];

export const stories: Story[] = [
  {
    id: 1,
    title: "豆豆的新家",
    content: "张女士领养了豆豆后，家里充满了欢声笑语。豆豆现在每天都会陪张女士散步。",
    pet_name: "豆豆",
    image_url: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "咪咪的幸福生活",
    content: "咪咪被一个温馨的家庭领养了，现在它有了一个漂亮的小窝和很多玩具。",
    pet_name: "咪咪",
    image_url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800"
  }
];

export const tips: Tip[] = [
  {
    id: 1,
    category: "养狗知识",
    title: "如何给狗狗洗澡",
    content: "洗澡前要准备好专用的沐浴露，水温要适中...",
    image_url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    category: "养猫知识",
    title: "猫咪的饮食禁忌",
    content: "猫咪不能吃巧克力、洋葱等食物...",
    image_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    category: "健康护理",
    title: "宠物驱虫的重要性",
    content: "定期驱虫可以预防多种疾病，保护宠物健康...",
    image_url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800"
  }
];

export const partners: Partner[] = [
  {
    id: 1,
    name: "爱宠宠物医院",
    logo_url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=200",
    description: "提供专业的医疗支持与绿色通道。",
    website: "https://example.com"
  },
  {
    id: 2,
    name: "萌宠食品有限公司",
    logo_url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=200",
    description: "长期捐赠高品质宠物粮食。",
    website: "https://example.com"
  },
  {
    id: 3,
    name: "温暖社区基金会",
    logo_url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?auto=format&fit=crop&q=80&w=200",
    description: "提供救助资金支持与社区宣传。",
    website: "https://example.com"
  }
];
