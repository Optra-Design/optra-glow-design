
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Edit3, Save, Plus, Trash2, Calendar, User, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  published: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showNewPost, setShowNewPost] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const savedPosts = localStorage.getItem('optra-blog-posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const defaultPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Welcome to Optra Design Blog',
          content: 'Hey there! I\'m Aniketh, the founder of Optra Design. This is where I share insights about design, creativity, and the journey of building exceptional digital experiences. From my studio in Bangalore, I craft hyper-premium designs that shape, style, and scale brands. Stay tuned for updates on our latest projects, design thinking, and the stories behind the pixels.',
          date: '2024-01-15',
          author: 'Aniketh',
          published: true
        },
        {
          id: '2',
          title: 'The Art of Digital Transformation',
          content: 'Digital transformation isn\'t just about technology—it\'s about reimagining how design can create meaningful connections between brands and their audiences. Every pixel tells a story, every interaction has intention. As the solo founder behind Optra, I believe in the power of exceptional design to transform businesses and create lasting impact.',
          date: '2024-01-10',
          author: 'Aniketh',
          published: true
        }
      ];
      setPosts(defaultPosts);
      localStorage.setItem('optra-blog-posts', JSON.stringify(defaultPosts));
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('optra-blog-posts', JSON.stringify(newPosts));
  };

  const handleSavePost = (id: string, title: string, content: string) => {
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, title, content } : post
    );
    savePosts(updatedPosts);
    setEditingPost(null);
  };

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post: BlogPost = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        date: new Date().toISOString().split('T')[0],
        author: 'Aniketh',
        published: true
      };
      savePosts([post, ...posts]);
      setNewPost({ title: '', content: '' });
      setShowNewPost(false);
    }
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      savePosts(updatedPosts);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <BookOpen className="w-12 h-12 text-gradient animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-bold text-gradient animate-fade-in">
                Design Blog
              </h1>
            </div>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              📝 Insights, stories, and thoughts from Aniketh, founder of Optra Design. 
              Where creativity meets strategy in the heart of Bangalore.
            </p>
          </div>

          {isLoggedIn && (
            <div className="mb-8 p-6 glass rounded-3xl glow-hover">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gradient">✨ Founder's Admin Panel</h3>
                <button
                  onClick={() => setShowNewPost(!showNewPost)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-all hover:scale-105 font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  New Post
                </button>
              </div>

              {showNewPost && (
                <div className="space-y-4 p-6 bg-white/10 rounded-2xl border border-white/20">
                  <input
                    type="text"
                    placeholder="Post title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-foreground placeholder-foreground/50 focus:border-white/40 transition-colors"
                  />
                  <textarea
                    placeholder="Write your post content here..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={6}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-foreground placeholder-foreground/50 focus:border-white/40 transition-colors resize-none"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleCreatePost}
                      className="px-6 py-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all hover:scale-105 font-semibold"
                    >
                      <Save className="w-4 h-4 inline mr-2" />
                      Publish Post
                    </button>
                    <button
                      onClick={() => setShowNewPost(false)}
                      className="px-6 py-3 bg-gray-500/20 text-gray-400 rounded-xl hover:bg-gray-500/30 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-8">
            {posts.map((post, index) => (
              <article 
                key={post.id}
                className="glass p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 glow-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {editingPost === post.id && isLoggedIn ? (
                  <EditPostForm 
                    post={post} 
                    onSave={handleSavePost}
                    onCancel={() => setEditingPost(null)}
                  />
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gradient mb-4 hover:scale-105 transition-transform cursor-pointer">
                          {post.title}
                        </h2>
                        <div className="flex items-center gap-4 text-foreground/60">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="font-semibold text-gradient">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      {isLoggedIn && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingPost(post.id)}
                            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-foreground/80 leading-relaxed text-lg">
                      {post.content.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16 glass rounded-3xl">
              <BookOpen className="w-16 h-16 text-gradient mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold text-gradient mb-2">No posts yet</h3>
              <p className="text-foreground/60">Check back soon for insights from Aniketh!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EditPostForm: React.FC<{
  post: BlogPost;
  onSave: (id: string, title: string, content: string) => void;
  onCancel: () => void;
}> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-foreground text-xl font-bold focus:border-white/40 transition-colors"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-foreground focus:border-white/40 transition-colors resize-none"
      />
      <div className="flex gap-3">
        <button
          onClick={() => onSave(post.id, title, content)}
          className="px-6 py-3 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-all hover:scale-105 font-semibold"
        >
          <Save className="w-4 h-4 inline mr-2" />
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-500/20 text-gray-400 rounded-xl hover:bg-gray-500/30 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Blog;
