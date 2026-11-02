import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '5mb' }));

// In-memory / persistent sync cache for cloud multi-device sync
interface SyncPayload {
  syncCode: string;
  updatedAt: string;
  data: any;
}

const syncStore = new Map<string, SyncPayload>();

// Default community forum topics seeded from PA drivers sharing PennDOT experiences
interface ForumComment {
  id: string;
  author: string;
  authorLocation: string;
  content: string;
  createdAt: string;
  likes: number;
}

interface ForumPost {
  id: string;
  title: string;
  category: 'exam_tips' | 'signs' | 'penndot_centers' | 'rules' | 'general';
  center?: string;
  content: string;
  author: string;
  authorCity: string;
  createdAt: string;
  likes: number;
  comments: ForumComment[];
}

const forumPosts: ForumPost[] = [
  {
    id: 'fp-1',
    title: 'Consejos para el examen en el centro PennDOT de Norristown',
    category: 'penndot_centers',
    center: 'Norristown Driver License Center',
    content: 'Pasé el examen teórico a la primera hoy (17/18). Les recomiendo repasar mucho las preguntas de autobuses escolares (la excepción de carretera dividida con barrera física) y la distancia para rebasar ciclistas (mínimo 4 pies). ¡Las computadoras de pantalla táctil permiten cambiar a español o inglés en cualquier momento!',
    author: 'Carlos M.',
    authorCity: 'Norristown, PA',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    likes: 24,
    comments: [
      {
        id: 'c-1',
        author: 'Elena R.',
        authorLocation: 'King of Prussia, PA',
        content: '¡Felicidades! ¿Te preguntaron sobre los puntos por exceso de velocidad en zona escolar?',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        likes: 5
      },
      {
        id: 'c-2',
        author: 'Carlos M.',
        authorLocation: 'Norristown, PA',
        content: 'Sí, exactamente: 15 mph cuando parpadea y son 3 puntos más multa en tu expediente.',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        likes: 8
      }
    ]
  },
  {
    id: 'fp-2',
    title: 'Tricky question: ¿Regla de 4 segundos vs 2 segundos en Pensilvania?',
    category: 'rules',
    content: 'Tengan mucho cuidado: a diferencia de otros estados que usan 3 segundos, en Pensilvania PennDOT la regla estándar oficial es la "Regla de los 4 Segundos" hacia adelante en clima seco. Y en lluvia se aumenta a 5-6 segundos, y en nieve compacta/hielo hasta 10 veces más.',
    author: 'David Rodriguez',
    authorCity: 'Philadelphia, PA',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    likes: 42,
    comments: [
      {
        id: 'c-3',
        author: 'Jessica Chen',
        authorLocation: 'Allentown, PA',
        content: 'Super helpful! Also remember for motorcycles PennDOT requires 4 seconds as well.',
        createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
        likes: 9
      }
    ]
  },
  {
    id: 'fp-3',
    title: 'Señales preventivas clave: El banderín amarillo No Passing Zone',
    category: 'signs',
    content: 'Recuerden que la señal de NO PASSING ZONE tiene forma única de banderín triangular horizontal (pennant) y se coloca en el lado IZQUIERDO de la carretera para advertir antes de la curva o cima donde no se ve el tráfico.',
    author: 'Mateo Gomez',
    authorCity: 'Lancaster, PA',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    likes: 31,
    comments: []
  },
  {
    id: 'fp-4',
    title: 'Penn Hills & Pittsburgh Testing Experience',
    category: 'penndot_centers',
    center: 'Penn Hills Driver License Center',
    content: 'Make sure you know Chapter 4 rules on BAC! For drivers under 21, BAC 0.02% or higher is considered DUI under PA Zero Tolerance Law, with suspension up to 1 year for 1st offense.',
    author: 'Sarah Jenkins',
    authorCity: 'Pittsburgh, PA',
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    likes: 19,
    comments: []
  }
];

// Cloud Sync Endpoints
app.get('/api/sync/:code', (req: Request, res: Response) => {
  const code = req.params.code.toUpperCase().trim();
  const entry = syncStore.get(code);
  if (!entry) {
    return res.status(404).json({ error: 'Sync code not found or expired', found: false });
  }
  return res.json({ found: true, syncCode: code, updatedAt: entry.updatedAt, data: entry.data });
});

app.post('/api/sync/:code', (req: Request, res: Response) => {
  const code = req.params.code.toUpperCase().trim();
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'No data payload provided' });
  }
  const entry: SyncPayload = {
    syncCode: code,
    updatedAt: new Date().toISOString(),
    data
  };
  syncStore.set(code, entry);
  return res.json({ success: true, syncCode: code, updatedAt: entry.updatedAt });
});

app.post('/api/sync-generate', (_req: Request, res: Response) => {
  // Generate random 6 character code like PA-8291
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomCode = 'PA-';
  for (let i = 0; i < 4; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res.json({ code: randomCode });
});

// Community Forum Endpoints
app.get('/api/forum', (_req: Request, res: Response) => {
  return res.json({ posts: forumPosts });
});

app.post('/api/forum/post', (req: Request, res: Response) => {
  const { title, category, center, content, author, authorCity } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  const newPost: ForumPost = {
    id: `fp-${Date.now()}`,
    title: title.trim(),
    category: category || 'general',
    center: center ? center.trim() : undefined,
    content: content.trim(),
    author: author.trim(),
    authorCity: authorCity ? authorCity.trim() : 'Pennsylvania',
    createdAt: new Date().toISOString(),
    likes: 1,
    comments: []
  };
  forumPosts.unshift(newPost);
  return res.status(201).json({ success: true, post: newPost });
});

app.post('/api/forum/like', (req: Request, res: Response) => {
  const { postId } = req.body;
  const post = forumPosts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  post.likes += 1;
  return res.json({ success: true, likes: post.likes });
});

app.post('/api/forum/comment', (req: Request, res: Response) => {
  const { postId, author, authorLocation, content } = req.body;
  const post = forumPosts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  if (!content || !author) {
    return res.status(400).json({ error: 'Faltan datos del comentario' });
  }
  const comment: ForumComment = {
    id: `c-${Date.now()}`,
    author: author.trim(),
    authorLocation: authorLocation || 'PA',
    content: content.trim(),
    createdAt: new Date().toISOString(),
    likes: 0
  };
  post.comments.push(comment);
  return res.status(201).json({ success: true, comment });
});

// Setup Vite or Static File Serving
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`PennDOT Driver Exam Pro server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
