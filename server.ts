import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.VERCEL ? "/tmp/pets.db" : path.join(__dirname, "pets.db");
let db: Database.Database;

try {
  db = new Database(dbPath);
} catch (err) {
  console.error("Failed to open database, falling back to in-memory:", err);
  db = new Database(":memory:");
}

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    breed TEXT,
    age TEXT,
    gender TEXT,
    description TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS guides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    icon TEXT,
    order_num INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    website TEXT
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pet_id INTEGER,
    applicant_name TEXT,
    email TEXT,
    phone TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed data if empty or using old URLs
const petCount = db.prepare("SELECT COUNT(*) as count FROM pets").get() as { count: number };
const hasOldUrls = db.prepare("SELECT COUNT(*) as count FROM pets WHERE image_url LIKE '%picsum.photos%'").get() as { count: number };
if (petCount.count < 18 || hasOldUrls.count > 0) {
  db.prepare("DELETE FROM pets").run();
  const insert = db.prepare(`
    INSERT INTO pets (name, type, breed, age, gender, description, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insert.run("豆豆", "狗", "金毛", "2岁", "公", "性格温顺，喜欢玩球，已经打过疫苗。", "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800");
  insert.run("咪咪", "猫", "狸花猫", "1岁", "母", "活泼好动，非常亲人，寻找温暖的家。", "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800");
  insert.run("雪球", "狗", "萨摩耶", "3岁", "公", "微笑天使，需要较大的活动空间。", "https://images.unsplash.com/photo-1529429617329-8a737053918e?auto=format&fit=crop&q=80&w=800");
  insert.run("花花", "猫", "三花猫", "6个月", "母", "文静的小猫，适合室内饲养。", "https://images.unsplash.com/photo-1573865668131-97417071f295?auto=format&fit=crop&q=80&w=800");
  insert.run("阿黄", "狗", "中华田园犬", "4岁", "公", "非常忠诚，看家护院的好手。", "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800");
  insert.run("小白", "猫", "波斯猫", "2岁", "母", "高冷优雅，喜欢安静的环境。", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800");
  insert.run("黑米", "狗", "拉布拉多", "1.5岁", "公", "聪明好学，适合作为导盲犬培养。", "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800");
  insert.run("汤姆", "猫", "英短蓝猫", "3岁", "公", "胖乎乎的，非常懒散，喜欢睡觉。", "https://images.unsplash.com/photo-1513245538231-15454f746438?auto=format&fit=crop&q=80&w=800");
  insert.run("可乐", "狗", "柯基", "1岁", "公", "腿短志气大，性格开朗，是大家的开心果。", "https://images.unsplash.com/photo-1513284499445-5da23aa25bc0?auto=format&fit=crop&q=80&w=800");
  insert.run("芝麻", "猫", "英短金渐层", "2岁", "母", "性格安静，喜欢晒太阳，非常温顺。", "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&q=80&w=800");
  insert.run("大白", "狗", "大白熊犬", "3岁", "公", "体型巨大但内心温柔，是个可靠的守护者。", "https://images.unsplash.com/photo-1520560321666-4b36560e79f9?auto=format&fit=crop&q=80&w=800");
  insert.run("布丁", "猫", "布偶猫", "1.5岁", "母", "颜值担当，性格像小狗一样粘人。", "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800");
  insert.run("旺财", "狗", "柴犬", "2岁", "公", "行走的表情包，性格独立且忠诚。", "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800");
  insert.run("露露", "猫", "暹罗猫", "4岁", "母", "话痨属性，喜欢和主人交流，非常聪明。", "https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?auto=format&fit=crop&q=80&w=800");
  insert.run("多多", "狗", "贵宾犬", "5岁", "母", "不掉毛，聪明伶俐，已经学会很多指令。", "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800");
  insert.run("糯米", "猫", "波斯猫", "1岁", "公", "毛发雪白，像个小雪球，喜欢安静地呆着。", "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=800");
  insert.run("哈利", "狗", "边境牧羊犬", "2.5岁", "公", "智商担当，精力充沛，需要大量的运动。", "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=800");
  insert.run("团团", "猫", "矮脚猫", "8个月", "母", "超级可爱，虽然腿短但跑得很快。", "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=800");
}

const partnerCount = db.prepare("SELECT COUNT(*) as count FROM partners").get() as { count: number };
const partnerOldUrls = db.prepare("SELECT COUNT(*) as count FROM partners WHERE logo_url LIKE '%picsum.photos%'").get() as { count: number };
if (partnerCount.count === 0 || partnerOldUrls.count > 0) {
  db.prepare("DELETE FROM partners").run();
  const insert = db.prepare(`
    INSERT INTO partners (name, logo_url, description, website)
    VALUES (?, ?, ?, ?)
  `);
  insert.run("爱宠宠物医院", "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=200", "提供专业的医疗支持与绿色通道。", "https://example.com");
  insert.run("萌宠食品有限公司", "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=200", "长期捐赠高品质宠物粮食。", "https://example.com");
  insert.run("温暖社区基金会", "https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?auto=format&fit=crop&q=80&w=200", "提供救助资金支持与社区宣传。", "https://example.com");
}

const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
const productOldUrls = db.prepare("SELECT COUNT(*) as count FROM products WHERE image_url LIKE '%picsum.photos%'").get() as { count: number };
if (productCount.count === 0 || productOldUrls.count > 0) {
  db.prepare("DELETE FROM products").run();
  const insert = db.prepare(`
    INSERT INTO products (name, price, description, image_url, category)
    VALUES (?, ?, ?, ?, ?)
  `);
  insert.run("公益帆布袋", 39.0, "印有救助中心Logo的环保帆布袋，所得款项全额用于宠物医疗。", "https://images.unsplash.com/photo-1544816153-16ad461465c8?auto=format&fit=crop&q=80&w=800", "生活用品");
  insert.run("定制宠物项圈", 25.0, "手工编织的宠物项圈，舒适耐用。", "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800", "宠物用品");
  insert.run("爱心明信片套装", 15.0, "一套12张，记录了救助中心宠物的感人瞬间。", "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=800", "文创周边");
  insert.run("宠物陶瓷碗", 45.0, "高品质陶瓷，防滑设计，呵护宠物颈椎。", "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800", "宠物用品");
}

const guideCount = db.prepare("SELECT COUNT(*) as count FROM guides").get() as { count: number };
if (guideCount.count === 0) {
  const insert = db.prepare(`
    INSERT INTO guides (title, content, icon, order_num)
    VALUES (?, ?, ?, ?)
  `);
  insert.run("领养条件", "年满22周岁，有稳定的工作和收入，家人同意，能够提供适宜的居住环境。", "UserCheck", 1);
  insert.run("领养流程", "1. 在线提交申请 -> 2. 电话初筛 -> 3. 线下见面 -> 4. 签署领养协议 -> 5. 开启幸福生活。", "ClipboardList", 2);
  insert.run("准备工作", "准备好宠物粮食、水碗、牵引绳、猫砂盆等基础用品，并对家里进行必要的安全加固。", "Home", 3);
  insert.run("回访制度", "领养后的第一、三、六个月，我们会通过微信或电话进行回访，了解宠物的适应情况。", "PhoneCall", 4);
}

const storyCount = db.prepare("SELECT COUNT(*) as count FROM stories").get() as { count: number };
const storyOldUrls = db.prepare("SELECT COUNT(*) as count FROM stories WHERE image_url LIKE '%picsum.photos%'").get() as { count: number };
if (storyCount.count === 0 || storyOldUrls.count > 0) {
  db.prepare("DELETE FROM stories").run();
  const insert = db.prepare(`
    INSERT INTO stories (title, content, pet_name, image_url)
    VALUES (?, ?, ?, ?)
  `);
  insert.run("豆豆的新家", "张女士领养了豆豆后，家里充满了欢声笑语。豆豆现在每天都会陪张女士散步。", "豆豆", "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800");
  insert.run("咪咪的幸福生活", "咪咪被一个温馨的家庭领养了，现在它有了一个漂亮的小窝和很多玩具。", "咪咪", "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800");
}

const tipCount = db.prepare("SELECT COUNT(*) as count FROM tips").get() as { count: number };
const tipOldUrls = db.prepare("SELECT COUNT(*) as count FROM tips WHERE image_url LIKE '%picsum.photos%'").get() as { count: number };
if (tipCount.count === 0 || tipOldUrls.count > 0) {
  db.prepare("DELETE FROM tips").run();
  const insert = db.prepare(`
    INSERT INTO tips (category, title, content, image_url)
    VALUES (?, ?, ?, ?)
  `);
  insert.run("养狗知识", "如何给狗狗洗澡", "洗澡前要准备好专用的沐浴露，水温要适中...", "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800");
  insert.run("养猫知识", "猫咪的饮食禁忌", "猫咪不能吃巧克力、洋葱等食物...", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800");
  insert.run("健康护理", "宠物驱虫的重要性", "定期驱虫可以预防多种疾病，保护宠物健康...", "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800");
}

const app = express();
app.use(express.json());

// API Routes
app.get("/api/pets", (req, res) => {
  const pets = db.prepare("SELECT * FROM pets WHERE status = 'available' ORDER BY created_at DESC").all();
  res.json(pets);
});

app.get("/api/stories", (req, res) => {
  const stories = db.prepare("SELECT * FROM stories ORDER BY created_at DESC").all();
  res.json(stories);
});

app.get("/api/tips", (req, res) => {
  const tips = db.prepare("SELECT * FROM tips ORDER BY created_at DESC").all();
  res.json(tips);
});

app.get("/api/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
  res.json(products);
});

app.get("/api/guides", (req, res) => {
  const guides = db.prepare("SELECT * FROM guides ORDER BY order_num ASC").all();
  res.json(guides);
});

app.get("/api/partners", (req, res) => {
  const partners = db.prepare("SELECT * FROM partners ORDER BY id ASC").all();
  res.json(partners);
});

app.get("/api/pets/:id", (req, res) => {
  const pet = db.prepare("SELECT * FROM pets WHERE id = ?").get(req.params.id);
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ error: "Pet not found" });
  }
});

app.post("/api/applications", (req, res) => {
  const { pet_id, applicant_name, email, phone, message } = req.body;
  const info = db.prepare(`
    INSERT INTO applications (pet_id, applicant_name, email, phone, message)
    VALUES (?, ?, ?, ?, ?)
  `).run(pet_id, applicant_name, email, phone, message);
  res.json({ id: info.lastInsertRowid });
});

// Vite middleware for development
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
