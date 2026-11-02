import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  MapPin,
  Send,
  PlusCircle,
  HelpCircle,
  Sparkles,
  User,
  Clock,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { ForumPost, Language, ForumComment } from '../types';
import { sound } from '../utils/sound';

interface CommunityForumProps {
  language: Language;
}

const LOCAL_FORUM_KEY = 'penndot_forum_posts_v1';

export const CommunityForum: React.FC<CommunityForumProps> = ({ language }) => {
  const isEs = language === 'es';

  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [commentAuthor, setCommentAuthor] = useState<string>('');

  // Form state for new post
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('penndot_centers');
  const [newCenter, setNewCenter] = useState<string>('Norristown Driver License Center');
  const [newContent, setNewContent] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newCity, setNewCity] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Load forum posts from API or local fallback
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/forum');
        if (res.ok) {
          const data = await res.json();
          if (data.posts && Array.isArray(data.posts)) {
            setPosts(data.posts);
            localStorage.setItem(LOCAL_FORUM_KEY, JSON.stringify(data.posts));
            setLoading(false);
            return;
          }
        }
      } catch {
        // Offline or backend unreachable, read from localStorage
      }

      const cached = localStorage.getItem(LOCAL_FORUM_KEY);
      if (cached) {
        try {
          setPosts(JSON.parse(cached));
        } catch {}
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    sound.playCorrect();
    // Optimistic UI update
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );

    try {
      await fetch('/api/forum/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
      });
    } catch {}
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) return;

    setSubmitting(true);
    const postPayload = {
      title: newTitle.trim(),
      category: newCategory,
      center: newCategory === 'penndot_centers' ? newCenter : undefined,
      content: newContent.trim(),
      author: newAuthor.trim(),
      authorCity: newCity.trim() || 'Pennsylvania'
    };

    try {
      const res = await fetch('/api/forum/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload)
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(prev => [data.post, ...prev]);
      } else {
        throw new Error();
      }
    } catch {
      // Offline fallback: save locally
      const offlinePost: ForumPost = {
        id: `offline-${Date.now()}`,
        ...postPayload,
        createdAt: new Date().toISOString(),
        likes: 1,
        comments: []
      };
      setPosts(prev => [offlinePost, ...prev]);
    }

    sound.playCorrect();
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setNewCity('');
    setShowNewPostModal(false);
    setSubmitting(false);
  };

  const handleAddComment = async (postId: string) => {
    if (!commentText.trim() || !commentAuthor.trim()) return;

    const payload = {
      postId,
      author: commentAuthor.trim(),
      authorLocation: 'PA',
      content: commentText.trim()
    };

    try {
      const res = await fetch('/api/forum/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(prev =>
          prev.map(p =>
            p.id === postId
              ? { ...p, comments: [...p.comments, data.comment] }
              : p
          )
        );
      }
    } catch {
      // Local fallback
      const offlineComment: ForumComment = {
        id: `c-off-${Date.now()}`,
        author: commentAuthor.trim(),
        authorLocation: 'PA',
        content: commentText.trim(),
        createdAt: new Date().toISOString(),
        likes: 0
      };
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? { ...p, comments: [...p.comments, offlineComment] }
            : p
        )
      );
    }

    sound.playCorrect();
    setCommentText('');
    setCommentingPostId(null);
  };

  const categories = [
    { id: 'all', labelEs: 'Todas las Conversaciones', labelEn: 'All Topics' },
    { id: 'penndot_centers', labelEs: 'Centros PennDOT de Examen', labelEn: 'PennDOT Testing Centers' },
    { id: 'exam_tips', labelEs: 'Consejos de Examen', labelEn: 'Exam Tips' },
    { id: 'rules', labelEs: 'Dudas sobre Reglas & Leyes', labelEn: 'Rules & Laws' },
    { id: 'signs', labelEs: 'Señales Difíciles', labelEn: 'Tricky Signs' }
  ];

  const filteredPosts = posts.filter(
    p => filterCategory === 'all' || p.category === filterCategory
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>{isEs ? 'Comunidad de Conductores de Pensilvania' : 'Pennsylvania Driver Community'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {isEs ? 'Foro de Discusión y Consejos PennDOT' : 'PennDOT Community & Discussion Board'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isEs
              ? 'Comparte experiencias en centros de licencias, preguntas difíciles del manual y consejos para aprobar.'
              : 'Share center experiences, tricky manual questions, and test-day tips with fellow PA learners.'}
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isEs ? 'Crear Publicación' : 'New Discussion'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => {
          const active = filterCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                active
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
              }`}
            >
              {isEs ? cat.labelEs : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6"
          >
            {/* Post meta */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {post.author}
                  </span>
                  <span className="text-[11px] text-slate-400 block sm:inline sm:ml-2">
                    {post.authorCity}
                  </span>
                </div>
              </div>

              {post.center && (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                  <MapPin className="w-3 h-3" />
                  <span>{post.center}</span>
                </div>
              )}
            </div>

            {/* Title & Body */}
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-2">
              {post.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-4">
              {post.content}
            </p>

            {/* Like and Comment Controls */}
            <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{post.likes}</span>
              </button>

              <button
                onClick={() =>
                  setCommentingPostId(commentingPostId === post.id ? null : post.id)
                }
                className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>
                  {post.comments.length} {isEs ? 'Comentarios' : 'Replies'}
                </span>
              </button>
            </div>

            {/* Comments List */}
            {post.comments.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 space-y-3">
                {post.comments.map(c => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {c.author}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {c.authorLocation}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{c.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Comment input box */}
            {commentingPostId === post.id && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={isEs ? 'Tu nombre...' : 'Your name...'}
                    value={commentAuthor}
                    onChange={e => setCommentAuthor(e.target.value)}
                    className="col-span-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder={isEs ? 'Escribe tu respuesta...' : 'Write your reply...'}
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    className="col-span-2 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>{isEs ? 'Publicar Respuesta' : 'Post Reply'}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowNewPostModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">
              {isEs ? 'Crear Nueva Publicación en el Foro' : 'Create New Forum Discussion'}
            </h2>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  {isEs ? 'Título de la Publicación' : 'Post Title'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEs ? 'Ej: ¿Qué tan estricto es el examen en Norristown?' : 'E.g., How strict is the Norristown center?'}
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    {isEs ? 'Categoría' : 'Category'}
                  </label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as ForumPost['category'])}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="penndot_centers">
                      {isEs ? 'Centro PennDOT' : 'PennDOT Center'}
                    </option>
                    <option value="exam_tips">
                      {isEs ? 'Consejos de Examen' : 'Exam Tips'}
                    </option>
                    <option value="rules">
                      {isEs ? 'Dudas de Reglas & Leyes' : 'Rules & Laws'}
                    </option>
                    <option value="signs">
                      {isEs ? 'Señales Difíciles' : 'Tricky Signs'}
                    </option>
                    <option value="general">
                      {isEs ? 'General' : 'General'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    {isEs ? 'Centro PennDOT (Opcional)' : 'PA Driver Center'}
                  </label>
                  <input
                    type="text"
                    placeholder="Norristown, Penn Hills, etc."
                    value={newCenter}
                    onChange={e => setNewCenter(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    {isEs ? 'Tu Nombre' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Carlos R."
                    value={newAuthor}
                    onChange={e => setNewAuthor(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    {isEs ? 'Ciudad / Condado en PA' : 'City / County in PA'}
                  </label>
                  <input
                    type="text"
                    placeholder="Philadelphia, PA"
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  {isEs ? 'Mensaje / Contenido' : 'Message Content'}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={isEs ? 'Escribe aquí tu experiencia, pregunta o consejo...' : 'Write your experience, question or tip here...'}
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  {isEs ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  {isEs ? 'Publicar' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
