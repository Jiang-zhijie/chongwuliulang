import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { pets, stories, tips, products, guides, partners } from "./src/data.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// In-memory storage for applications (will reset on restart)
const applications: any[] = [];

// API Routes
app.get("/api/pets", (req, res) => {
  res.json(pets);
});

app.get("/api/stories", (req, res) => {
  res.json(stories);
});

app.get("/api/tips", (req, res) => {
  res.json(tips);
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/guides", (req, res) => {
  res.json(guides);
});

app.get("/api/partners", (req, res) => {
  res.json(partners);
});

app.get("/api/pets/:id", (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ error: "Pet not found" });
  }
});

app.post("/api/applications", (req, res) => {
  const application = {
    id: applications.length + 1,
    ...req.body,
    created_at: new Date().toISOString()
  };
  applications.push(application);
  console.log("New application received:", application);
  res.json({ id: application.id });
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
