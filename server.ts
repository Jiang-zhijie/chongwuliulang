import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { pets as initialPets, stories as initialStories, tips as initialTips, products as initialProducts, guides as initialGuides, partners as initialPartners, layout as initialLayout } from "./src/data.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// In-memory storage (resets on restart/Vercel sleep)
let pets = [...initialPets];
let stories = [...initialStories];
let tips = [...initialTips];
let products = [...initialProducts];
let guides = [...initialGuides];
let partners = [...initialPartners];
let layout = { ...initialLayout };
const applications: any[] = [];

// API Routes
app.get("/api/layout", (req, res) => res.json(layout));
app.post("/api/layout", (req, res) => {
  layout = { ...layout, ...req.body };
  res.json(layout);
});

app.get("/api/pets", (req, res) => res.json(pets));
app.post("/api/pets", (req, res) => {
  const pet = { ...req.body, id: Date.now(), created_at: new Date().toISOString() };
  pets.push(pet);
  res.json(pet);
});
app.put("/api/pets/:id", (req, res) => {
  const index = pets.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    pets[index] = { ...pets[index], ...req.body };
    res.json(pets[index]);
  } else res.status(404).json({ error: "Not found" });
});
app.delete("/api/pets/:id", (req, res) => {
  pets = pets.filter(p => p.id !== parseInt(req.params.id));
  res.json({ success: true });
});

app.get("/api/stories", (req, res) => res.json(stories));
app.post("/api/stories/:id/comments", (req, res) => {
  const storyId = parseInt(req.params.id);
  const index = stories.findIndex(s => s.id === storyId);
  if (index !== -1) {
    const comment = {
      id: Date.now(),
      user_name: req.body.user_name || "匿名用户",
      content: req.body.content,
      created_at: new Date().toISOString()
    };
    if (!stories[index].comments) stories[index].comments = [];
    stories[index].comments.push(comment);
    res.json(comment);
  } else {
    res.status(404).json({ error: "Story not found" });
  }
});
app.delete("/api/stories/:storyId/comments/:commentId", (req, res) => {
  const storyId = parseInt(req.params.storyId);
  const commentId = parseInt(req.params.commentId);
  const storyIndex = stories.findIndex(s => s.id === storyId);
  if (storyIndex !== -1) {
    if (stories[storyIndex].comments) {
      stories[storyIndex].comments = stories[storyIndex].comments.filter(c => c.id !== commentId);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "No comments found" });
    }
  } else {
    res.status(404).json({ error: "Story not found" });
  }
});
app.post("/api/stories", (req, res) => {
  const story = { ...req.body, id: Date.now() };
  stories.push(story);
  res.json(story);
});
app.put("/api/stories/:id", (req, res) => {
  const index = stories.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    stories[index] = { ...stories[index], ...req.body };
    res.json(stories[index]);
  } else res.status(404).json({ error: "Not found" });
});
app.delete("/api/stories/:id", (req, res) => {
  stories = stories.filter(s => s.id !== parseInt(req.params.id));
  res.json({ success: true });
});

app.get("/api/tips", (req, res) => res.json(tips));
app.post("/api/tips", (req, res) => {
  const tip = { ...req.body, id: Date.now() };
  tips.push(tip);
  res.json(tip);
});
app.put("/api/tips/:id", (req, res) => {
  const index = tips.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tips[index] = { ...tips[index], ...req.body };
    res.json(tips[index]);
  } else res.status(404).json({ error: "Not found" });
});
app.delete("/api/tips/:id", (req, res) => {
  tips = tips.filter(t => t.id !== parseInt(req.params.id));
  res.json({ success: true });
});

app.get("/api/products", (req, res) => res.json(products));
app.post("/api/products", (req, res) => {
  const product = { ...req.body, id: Date.now() };
  products.push(product);
  res.json(product);
});
app.put("/api/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else res.status(404).json({ error: "Not found" });
});
app.delete("/api/products/:id", (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.json({ success: true });
});

app.get("/api/guides", (req, res) => res.json(guides));
app.post("/api/guides", (req, res) => {
  const guide = { ...req.body, id: Date.now() };
  guides.push(guide);
  res.json(guide);
});
app.put("/api/guides/:id", (req, res) => {
  const index = guides.findIndex(g => g.id === parseInt(req.params.id));
  if (index !== -1) {
    guides[index] = { ...guides[index], ...req.body };
    res.json(guides[index]);
  } else res.status(404).json({ error: "Not found" });
});
app.delete("/api/guides/:id", (req, res) => {
  guides = guides.filter(g => g.id !== parseInt(req.params.id));
  res.json({ success: true });
});

app.get("/api/partners", (req, res) => res.json(partners));
app.post("/api/partners", (req, res) => {
  const partner = { ...req.body, id: Date.now() };
  partners.push(partner);
  res.json(partner);
});
app.put("/api/partners/:id", (req, res) => {
  const index = partners.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    partners[index] = { ...partners[index], ...req.body };
    res.json(partners[index]);
  } else res.status(404).json({ error: "Not found" });
});
app.delete("/api/partners/:id", (req, res) => {
  partners = partners.filter(p => p.id !== parseInt(req.params.id));
  res.json({ success: true });
});

app.get("/api/pets/:id", (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (pet) res.json(pet);
  else res.status(404).json({ error: "Pet not found" });
});

app.post("/api/applications", (req, res) => {
  const application = { id: applications.length + 1, ...req.body, created_at: new Date().toISOString() };
  applications.push(application);
  res.json({ id: application.id });
});

app.get("/api/applications", (req, res) => res.json(applications));
app.delete("/api/applications/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = applications.findIndex(a => a.id === id);
  if (index !== -1) {
    applications.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Application not found" });
  }
});

// Simple Admin Auth
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === "admin123") {
    res.json({ success: true, token: "fake-jwt-token" });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
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
