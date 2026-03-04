import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, PawPrint, Info, Phone, Mail, MapPin, Search, Filter, 
  ChevronRight, ChevronDown, X, CheckCircle2, BookOpen, Star, 
  Users, Gift, LogOut, Upload, Plus, Image as ImageIcon, Edit2, Trash2,
  Menu, Clock, MessageSquare
} from 'lucide-react';

// Types
interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  description: string;
  image_url: string;
  status: string;
}

interface Comment {
  id: number;
  user_name: string;
  content: string;
  created_at: string;
}

interface Story {
  id: number;
  title: string;
  content: string;
  pet_name: string;
  image_url: string;
  category?: string;
  created_at?: string;
  comments?: Comment[];
}

interface Tip {
  id: number;
  category: string;
  title: string;
  content: string;
  image_url: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
}

interface Guide {
  id: number;
  title: string;
  content: string;
  icon: string;
}

interface Partner {
  id: number;
  name: string;
  logo_url: string;
  description: string;
  website: string;
}

// Utility functions
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
  const file = e.target.files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const isImageField = (key: string) => key.toLowerCase().includes('url') || key.toLowerCase().includes('image');

const ArticleModal = ({ 
  article, 
  type, 
  onClose, 
  onCommentAdded 
}: { 
  article: Story | Tip, 
  type: 'story' | 'tip', 
  onClose: () => void,
  onCommentAdded?: () => void
}) => {
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/stories/${article.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment, user_name: userName })
      });
      setComment('');
      setUserName('');
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto">
          <div className="h-64 md:h-96 w-full">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {(article as any).category || (type === 'story' ? '救助动态' : '养宠知识')}
                </span>
                {type === 'story' && (article as Story).created_at && (
                  <span className="text-stone-400 text-xs flex items-center gap-1">
                    <Clock size={12} /> {(article as Story).created_at}
                  </span>
                )}
              </div>
              <h2 className="text-4xl font-serif font-bold text-stone-800 mb-6 leading-tight">{article.title}</h2>
              <div className="prose prose-stone max-w-none">
                <p className="text-stone-600 text-lg leading-relaxed whitespace-pre-wrap">{article.content}</p>
              </div>
            </div>

            {type === 'story' && (
              <div className="border-t border-stone-100 pt-12 mt-12">
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-8 flex items-center gap-2">
                  <MessageSquare className="text-orange-500" size={24} /> 
                  评论交流 ({(article as Story).comments?.length || 0})
                </h3>

                <div className="space-y-8 mb-12">
                  {(article as Story).comments?.map((c) => (
                    <div key={c.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 shrink-0">
                        <Users size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-stone-800 text-sm">{c.user_name}</span>
                          <span className="text-stone-400 text-[10px]">{new Date(c.created_at).toLocaleString()}</span>
                        </div>
                        <p className="text-stone-600 text-sm leading-relaxed">{c.content}</p>
                      </div>
                    </div>
                  ))}
                  {(!(article as Story).comments || (article as Story).comments?.length === 0) && (
                    <p className="text-stone-400 italic text-center py-4">暂无评论，快来抢沙发吧！</p>
                  )}
                </div>

                <form onSubmit={handlePostComment} className="bg-stone-50 p-6 rounded-3xl space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="您的昵称" 
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-400 outline-none bg-white transition-all"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                    />
                  </div>
                  <textarea 
                    placeholder="写下您的感想..." 
                    rows={3} 
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-400 outline-none bg-white resize-none transition-all"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    required
                  ></textarea>
                  <button 
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? '提交中...' : '发表评论'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Components
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div className="relative w-14 h-14 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* House Shape */}
        <path 
          d="M10 40 L50 10 L90 40 L90 90 L10 90 Z" 
          fill="#FEF08A" 
          stroke="#1E293B" 
          strokeWidth="6" 
          strokeLinejoin="round"
        />
        {/* Smiling Faces */}
        <circle cx="35" cy="65" r="12" fill="white" stroke="#1E293B" strokeWidth="3" />
        <circle cx="35" cy="62" r="1.5" fill="#1E293B" />
        <circle cx="41" cy="62" r="1.5" fill="#1E293B" />
        <path d="M32 68 Q35 71 38 68" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        
        <circle cx="65" cy="65" r="12" fill="white" stroke="#1E293B" strokeWidth="3" />
        <circle cx="59" cy="62" r="1.5" fill="#1E293B" />
        <circle cx="65" cy="62" r="1.5" fill="#1E293B" />
        <path d="M56 68 Q59 71 62 68" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    <div className="flex flex-col leading-tight">
      <span className="text-2xl font-black tracking-tight text-slate-800">流浪动物救助中心</span>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
        <span className="text-xs font-bold text-slate-500 tracking-wider">以爱为家，终止流浪</span>
      </div>
    </div>
  </div>
);

const NavItem = ({ 
  label, 
  onClick, 
  isActive, 
  dropdownItems 
}: { 
  label: string, 
  onClick?: () => void, 
  isActive?: boolean,
  dropdownItems?: { label: string, onClick: () => void }[],
  key?: React.Key
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        onClick={onClick}
        className={`flex items-center gap-1 py-2 ${isActive ? 'text-emerald-600' : 'text-stone-600'} hover:text-emerald-600 transition-colors font-medium text-sm`}
      >
        {label}
        {dropdownItems && <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
      </button>
      
      {dropdownItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-[calc(100%-1rem)] left-0 w-40 bg-white shadow-xl rounded-2xl border border-stone-100 py-2 z-50 overflow-hidden"
            >
              {dropdownItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: string) => void, currentPage: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '首页', page: 'home' },
    { 
      label: '领养宠物', 
      page: 'browse',
      dropdown: [
        { label: '领养宠物', page: 'browse' },
        { label: '领养指南', page: 'guide' }
      ]
    },
    { label: '爱心义卖', page: 'shop' },
    { label: '救助动态', page: 'stories' },
    { label: '养宠知识', page: 'tips' },
    { 
      label: '关于我们', 
      page: 'about',
      dropdown: [
        { label: '关于我们', page: 'about' },
        { label: '联系我们', page: 'contact' },
        { label: '加入志愿', page: 'volunteer' },
        { label: '合作伙伴', page: 'partners' },
        { label: '物资捐赠', page: 'donate' }
      ]
    }
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 h-20 lg:h-24 flex items-center justify-between">
        <div 
          className="cursor-pointer" 
          onClick={() => handleNavigate('home')}
        >
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          {navLinks.map((link, idx) => (
            <NavItem 
              key={idx}
              label={link.label} 
              onClick={link.dropdown ? undefined : () => handleNavigate(link.page)} 
              isActive={currentPage === link.page || (link.dropdown?.some(d => currentPage === d.page))} 
              dropdownItems={link.dropdown?.map(d => ({ label: d.label, onClick: () => handleNavigate(d.page) }))}
            />
          ))}
          <button 
            onClick={() => handleNavigate('donate')}
            className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm font-medium ml-2"
          >
            <Gift size={16} /> 捐赠支持
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-stone-600 hover:text-emerald-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link, idx) => (
                <div key={idx} className="flex flex-col">
                  {link.dropdown ? (
                    <>
                      <div className="px-4 py-2 text-xs font-bold text-stone-400 uppercase tracking-wider mt-2">
                        {link.label}
                      </div>
                      {link.dropdown.map((d, dIdx) => (
                        <button
                          key={dIdx}
                          onClick={() => handleNavigate(d.page)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentPage === d.page ? 'bg-emerald-50 text-emerald-600' : 'text-stone-600 hover:bg-stone-50'}`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavigate(link.page)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentPage === link.page ? 'bg-emerald-50 text-emerald-600' : 'text-stone-600 hover:bg-stone-50'}`}
                    >
                      {link.label}
                    </button>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <button 
                  onClick={() => handleNavigate('donate')}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <Gift size={20} /> 捐赠支持
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBrowse, onVolunteer, layout }: { onBrowse: () => void, onVolunteer: () => void, layout: any }) => (
  <section className="relative h-[80vh] flex items-center overflow-hidden bg-stone-100">
    <div className="absolute inset-0 z-0">
      <img 
        src={layout?.heroImage || "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2000"} 
        alt="Hero Background" 
        className="w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-100 via-stone-100/80 to-transparent"></div>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <h1 className="text-6xl md:text-7xl font-serif font-light leading-tight text-stone-900 mb-6 whitespace-pre-line">
          {layout?.heroTitle?.split('\n')[0] || "守护生命"}<br />
          <span className="font-bold text-emerald-700 italic">{layout?.heroTitle?.split('\n')[1] || "开启幸福新篇章"}</span>
        </h1>
        <p className="text-xl text-stone-600 mb-8 leading-relaxed">
          {layout?.heroSubtitle || "流浪动物救助中心致力于为每一只流浪宠物寻找最温暖的归宿。在这里，爱心不仅是拯救，更是陪伴的开始。"}
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onBrowse}
            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all transform hover:-translate-y-1"
          >
            立即领养
          </button>
          <button 
            onClick={onVolunteer}
            className="px-8 py-4 bg-white text-stone-800 border border-stone-200 rounded-2xl font-semibold hover:bg-stone-50 transition-all"
          >
            加入我们
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const PetCard = ({ pet, onClick }: { pet: Pet; onClick: () => void; key?: any }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -8 }}
    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative aspect-[4/5] overflow-hidden">
      <img 
        src={pet.image_url} 
        alt={pet.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 uppercase tracking-wider">
        {pet.type}
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-2xl font-serif font-bold text-stone-800">{pet.name}</h3>
        <span className="text-stone-400"><Heart size={20} /></span>
      </div>
      <p className="text-stone-500 text-sm mb-4">{pet.breed} • {pet.age} • {pet.gender}</p>
      <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
        <span>查看详情</span>
        <ChevronRight size={16} />
      </div>
    </div>
  </motion.div>
);

const PetDetailModal = ({ pet, onClose }: { pet: Pet, onClose: () => void }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, pet_id: pet.id, applicant_name: formData.name })
      });
      setFormStatus('success');
      setTimeout(onClose, 3000);
    } catch (err) {
      console.error(err);
      setFormStatus('idle');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="md:w-1/2 h-64 md:h-auto">
          <img 
            src={pet.image_url} 
            alt={pet.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
          {formStatus === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">申请已提交</h2>
              <p className="text-stone-600">感谢您的爱心！我们的工作人员会尽快与您联系进行后续沟通。</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-4xl font-serif font-bold text-stone-800 mb-2">{pet.name}</h2>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">{pet.breed}</span>
                  <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">{pet.age}</span>
                  <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">{pet.gender}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">{pet.description}</p>
              </div>

              <div className="border-t border-stone-100 pt-8">
                <h3 className="text-lg font-bold text-stone-800 mb-6">领养申请</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    required
                    type="text" 
                    placeholder="您的姓名" 
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required
                      type="email" 
                      placeholder="电子邮箱" 
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <input 
                      required
                      type="tel" 
                      placeholder="联系电话" 
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <textarea 
                    placeholder="为什么想领养它？" 
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                  <button 
                    disabled={formStatus === 'submitting'}
                    className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? '提交中...' : '提交领养申请'}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Admin = ({ onLogout, data, onUpdate }: { onLogout: () => void, data: any, onUpdate: () => void }) => {
  const [activeTab, setActiveTab] = useState('layout');
  const [editItem, setEditItem] = useState<any>(null);
  const [layoutForm, setLayoutForm] = useState(data.layout);
  const [managingCommentsFor, setManagingCommentsFor] = useState<number | null>(null);

  const handleSaveLayout = async () => {
    await fetch('/api/layout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(layoutForm)
    });
    onUpdate();
    alert('布局已保存');
  };

  const handleDelete = async (type: string, id: number) => {
    if (!confirm('确定删除吗？')) return;
    await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
    onUpdate();
  };

  const handleSaveItem = async (type: string, item: any) => {
    const method = item.id ? 'PUT' : 'POST';
    const url = item.id ? `/api/${type}/${item.id}` : `/api/${type}`;
    
    // Ensure numeric fields are numbers
    const processedItem = { ...item };
    if (processedItem.price !== undefined) processedItem.price = parseFloat(processedItem.price);
    if (processedItem.order_num !== undefined) processedItem.order_num = parseInt(processedItem.order_num);

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(processedItem)
    });
    setEditItem(null);
    onUpdate();
  };

  const handleDeleteComment = async (storyId: number, commentId: number) => {
    if (!confirm('确定删除这条评论吗？')) return;
    await fetch(`/api/stories/${storyId}/comments/${commentId}`, { method: 'DELETE' });
    onUpdate();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-stone-800">管理后台</h1>
        <button onClick={onLogout} className="px-4 py-2 text-stone-500 hover:text-red-600 font-bold flex items-center gap-2">
          <LogOut size={18} /> 退出登录
        </button>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {['layout', 'pets', 'products', 'stories', 'tips', 'partners', 'applications'].map(tab => (
          <button 
            key={tab}
            onClick={() => { setActiveTab(tab); setEditItem(null); }}
            className={`px-6 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`}
          >
            {tab === 'layout' && '页面布局'}
            {tab === 'pets' && '宠物管理'}
            {tab === 'products' && '义卖商品'}
            {tab === 'stories' && '成功故事'}
            {tab === 'tips' && '养宠知识'}
            {tab === 'partners' && '合作伙伴'}
            {tab === 'applications' && '领养申请'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-stone-200">
        {activeTab === 'layout' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif font-bold text-stone-800">编辑页面内容</h3>
              <button onClick={handleSaveLayout} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">保存布局修改</button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">首页标题</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 outline-none focus:border-emerald-500 h-32 resize-none"
                  value={layoutForm?.heroTitle}
                  onChange={e => setLayoutForm({...layoutForm, heroTitle: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">首页副标题</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 outline-none focus:border-emerald-500 h-32 resize-none"
                  value={layoutForm?.heroSubtitle}
                  onChange={e => setLayoutForm({...layoutForm, heroSubtitle: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">首页背景图</label>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-64 h-40 rounded-2xl overflow-hidden border border-stone-200 bg-stone-50">
                    <img src={layoutForm?.heroImage} alt="Hero Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="px-6 py-3 bg-stone-100 text-stone-700 rounded-xl font-bold cursor-pointer hover:bg-stone-200 transition-all border border-stone-200">
                        <Upload size={18} className="inline mr-2" /> 上传新图片
                        <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, (base64) => setLayoutForm({...layoutForm, heroImage: base64}))} />
                      </label>
                      <span className="text-xs text-stone-400">建议尺寸: 1920x1080px</span>
                    </div>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500 text-sm"
                      value={layoutForm?.heroImage}
                      onChange={e => setLayoutForm({...layoutForm, heroImage: e.target.value})}
                      placeholder="或输入图片 URL"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">关于我们标题</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500"
                  value={layoutForm?.aboutTitle}
                  onChange={e => setLayoutForm({...layoutForm, aboutTitle: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">联系地址</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500"
                  value={layoutForm?.contactAddress}
                  onChange={e => setLayoutForm({...layoutForm, contactAddress: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">联系电话</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500"
                  value={layoutForm?.contactPhone}
                  onChange={e => setLayoutForm({...layoutForm, contactPhone: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">联系邮箱</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500"
                  value={layoutForm?.contactEmail}
                  onChange={e => setLayoutForm({...layoutForm, contactEmail: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">开放时间</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500"
                  value={layoutForm?.openingHours}
                  onChange={e => setLayoutForm({...layoutForm, openingHours: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">关于我们内容</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 outline-none focus:border-emerald-500 h-48 resize-none"
                  value={layoutForm?.aboutContent}
                  onChange={e => setLayoutForm({...layoutForm, aboutContent: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}

        {['pets', 'products', 'stories', 'tips', 'partners'].includes(activeTab) && (
          <div>
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-serif font-bold text-stone-800">
                {activeTab === 'pets' && '宠物列表'}
                {activeTab === 'products' && '商品列表'}
                {activeTab === 'stories' && '故事列表'}
                {activeTab === 'tips' && '知识列表'}
                {activeTab === 'partners' && '伙伴列表'}
              </h3>
              {!editItem && (
                <button 
                  onClick={() => {
                    const template = data[activeTab][0] || {};
                    const newItem = Object.keys(template).reduce((acc: any, key) => {
                      acc[key] = key === 'id' ? null : '';
                      return acc;
                    }, {});
                    setEditItem(newItem);
                  }}
                  className="px-6 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-stone-900/10 flex items-center gap-2"
                >
                  <Plus size={18} /> 新增内容
                </button>
              )}
            </div>

            {editItem ? (
              <div className="space-y-8 border-t border-stone-100 pt-10">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-serif font-bold text-emerald-600">{editItem.id ? '编辑项目' : '创建新项目'}</h4>
                  <div className="flex gap-4">
                    <button onClick={() => handleSaveItem(activeTab, editItem)} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">保存</button>
                    <button onClick={() => setEditItem(null)} className="px-8 py-3 bg-stone-100 text-stone-600 rounded-xl font-bold hover:bg-stone-200 transition-all">取消</button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {Object.keys(editItem).filter(k => k !== 'id' && k !== 'created_at').map(key => (
                    <div key={key} className={key === 'description' || key === 'content' ? 'md:col-span-2 space-y-4' : 'space-y-4'}>
                      <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">{key}</label>
                      {isImageField(key) ? (
                        <div className="space-y-4">
                          <div className="w-40 h-40 rounded-2xl overflow-hidden border border-stone-200 bg-stone-50">
                            {editItem[key] ? (
                              <img src={editItem[key]} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-300">
                                <ImageIcon size={40} />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <label className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-sm font-bold cursor-pointer hover:bg-stone-200 transition-all border border-stone-200">
                              <Upload size={14} className="inline mr-2" /> 上传图片
                              <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, (base64) => setEditItem({...editItem, [key]: base64}))} />
                            </label>
                            <input 
                              className="flex-1 px-4 py-2 rounded-lg border border-stone-200 outline-none focus:border-emerald-500 text-sm"
                              value={editItem[key] || ''}
                              onChange={e => setEditItem({...editItem, [key]: e.target.value})}
                              placeholder="或输入图片 URL"
                            />
                          </div>
                        </div>
                      ) : key === 'category' ? (
                        <select 
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500 bg-white"
                          value={editItem[key] || ''}
                          onChange={e => setEditItem({...editItem, [key]: e.target.value})}
                        >
                          <option value="">请选择分类</option>
                          {activeTab === 'stories' && ['救助动态', '领养成功', '志愿活动'].map(c => <option key={c} value={c}>{c}</option>)}
                          {activeTab === 'products' && ['生活用品', '宠物用品', '文创周边'].map(c => <option key={c} value={c}>{c}</option>)}
                          {activeTab === 'tips' && ['养狗知识', '养猫知识', '健康护理'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      ) : key === 'description' || key === 'content' ? (
                        <textarea 
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 outline-none focus:border-emerald-500 h-40 resize-none"
                          value={editItem[key] || ''}
                          onChange={e => setEditItem({...editItem, [key]: e.target.value})}
                        />
                      ) : (
                        <input 
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-emerald-500"
                          value={editItem[key] || ''}
                          onChange={e => setEditItem({...editItem, [key]: e.target.value})}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-stone-400 text-xs uppercase tracking-wider border-b border-stone-100">
                      <th className="pb-6 font-bold">预览</th>
                      <th className="pb-6 font-bold">名称/标题</th>
                      <th className="pb-6 font-bold">详情</th>
                      <th className="pb-6 font-bold text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {data[activeTab].map((item: any) => (
                      <React.Fragment key={item.id}>
                        <tr className="group hover:bg-stone-50 transition-colors">
                        <td className="py-6">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-stone-100">
                            <img 
                              src={item.image_url || item.logo_url} 
                              alt={item.name || item.title} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                        </td>
                        <td className="py-6">
                          <div className="font-bold text-stone-800">{item.name || item.title}</div>
                          <div className="text-xs text-stone-400">{item.breed || item.category || item.pet_name}</div>
                        </td>
                        <td className="py-6">
                          <div className="text-sm text-stone-500 line-clamp-1 max-w-xs">{item.description || item.content}</div>
                        </td>
                        <td className="py-6 text-right">
                          <div className="flex justify-end gap-3">
                            {activeTab === 'stories' && (
                              <button 
                                onClick={() => setManagingCommentsFor(managingCommentsFor === item.id ? null : item.id)} 
                                className={`p-2 rounded-lg transition-colors ${managingCommentsFor === item.id ? 'bg-orange-100 text-orange-600' : 'text-stone-400 hover:bg-stone-100'}`}
                                title="管理评论"
                              >
                                <MessageSquare size={18} />
                              </button>
                            )}
                            <button onClick={() => setEditItem(item)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="编辑">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(activeTab, item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="删除">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {managingCommentsFor === item.id && activeTab === 'stories' && (
                        <tr className="bg-stone-50/50">
                          <td colSpan={4} className="px-10 py-6">
                            <div className="space-y-4">
                              <h5 className="font-bold text-stone-800 flex items-center gap-2">
                                <MessageSquare size={16} className="text-orange-500" /> 评论管理
                              </h5>
                              <div className="space-y-3">
                                {item.comments?.map((c: any) => (
                                  <div key={c.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-sm text-stone-800">{c.user_name}</span>
                                        <span className="text-[10px] text-stone-400">{new Date(c.created_at).toLocaleString()}</span>
                                      </div>
                                      <p className="text-sm text-stone-600">{c.content}</p>
                                    </div>
                                    <button 
                                      onClick={() => handleDeleteComment(item.id, c.id)}
                                      className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                                      title="删除评论"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                ))}
                                {(!item.comments || item.comments.length === 0) && (
                                  <p className="text-stone-400 text-sm italic">暂无评论</p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">领养申请列表</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-stone-400 text-xs uppercase tracking-wider border-b border-stone-100">
                    <th className="pb-6 font-bold">申请人</th>
                    <th className="pb-6 font-bold">联系方式</th>
                    <th className="pb-6 font-bold">留言</th>
                    <th className="pb-6 font-bold">时间</th>
                    <th className="pb-6 font-bold text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {data.applications?.map((app: any) => (
                    <tr key={app.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-6">
                        <div className="font-bold text-stone-800">{app.applicant_name}</div>
                        <div className="text-xs text-stone-400">申请 ID: #{app.id}</div>
                      </td>
                      <td className="py-6 text-sm text-stone-500">
                        <div className="flex items-center gap-2 mb-1"><Phone size={14} /> {app.phone}</div>
                        <div className="flex items-center gap-2"><Mail size={14} /> {app.email}</div>
                      </td>
                      <td className="py-6 text-sm text-stone-600 max-w-xs">
                        <div className="bg-stone-100 p-3 rounded-xl italic">"{app.message}"</div>
                      </td>
                      <td className="py-6 text-xs text-stone-400">
                        {new Date(app.created_at).toLocaleString()}
                      </td>
                      <td className="py-6 text-right">
                        <button 
                          onClick={() => handleDelete('applications', app.id)} 
                          className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                          title="删除申请"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!data.applications || data.applications.length === 0) && (
                    <tr>
                      <td colSpan={5} className="py-20 text-center text-stone-400 italic">暂无申请记录</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [page, setPage] = useState('home');
  const [pets, setPets] = useState<Pet[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [layout, setLayout] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [filter, setFilter] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedArticle, setSelectedArticle] = useState<Story | Tip | null>(null);
  const [articleType, setArticleType] = useState<'story' | 'tip'>('story');

  const [isPublishingProduct, setIsPublishingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '生活用品', description: '', image_url: '' });
  const [storyFilter, setStoryFilter] = useState('全部动态');

  const fetchData = async () => {
    try {
      const [petsRes, storiesRes, tipsRes, productsRes, guidesRes, partnersRes, layoutRes, appsRes] = await Promise.all([
        fetch('/api/pets'),
        fetch('/api/stories'),
        fetch('/api/tips'),
        fetch('/api/products'),
        fetch('/api/guides'),
        fetch('/api/partners'),
        fetch('/api/layout'),
        fetch('/api/applications')
      ]);

      if (petsRes.ok) setPets(await petsRes.json());
      if (storiesRes.ok) setStories(await storiesRes.json());
      if (tipsRes.ok) setTips(await tipsRes.json());
      if (productsRes.ok) setProducts(await productsRes.json());
      if (guidesRes.ok) setGuides(await guidesRes.json());
      if (partnersRes.ok) setPartners(await partnersRes.json());
      if (layoutRes.ok) setLayout(await layoutRes.json());
      if (appsRes.ok) setApplications(await appsRes.json());
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onUpdate = fetchData;

  const filteredPets = filter === 'all' ? pets : pets.filter(p => p.type === filter);

  const filteredStories = stories.filter(story => {
    if (storyFilter === '全部动态') return true;
    const category = (story as any).category || '救助动态';
    return category === storyFilter;
  });

  const currentArticle = selectedArticle 
    ? (articleType === 'story' 
        ? stories.find(s => s.id === selectedArticle.id) 
        : tips.find(t => t.id === selectedArticle.id)) 
    : null;

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <Navbar onNavigate={setPage} currentPage={page} />

      <main className="pt-24">
        {page === 'home' && (
          <>
            <Hero 
              onBrowse={() => setPage('browse')} 
              onVolunteer={() => setPage('volunteer')}
              layout={layout}
            />
            
            <section className="max-w-7xl mx-auto px-4 py-24">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">寻找那个让您心动的它</h2>
                  <p className="text-stone-500 max-w-xl">每一双清澈的眼睛背后，都藏着一个渴望被爱的心。浏览待领养名单，开启一段奇妙的缘分。</p>
                </div>
                <button 
                  onClick={() => setPage('browse')}
                  className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
                >
                  查看全部宠物 <ChevronRight size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {pets.slice(0, 4).map(pet => (
                  <PetCard key={pet.id} pet={pet} onClick={() => setSelectedPet(pet)} />
                ))}
              </div>
            </section>

            {/* Quick Tips Section on Home */}
            <section className="bg-stone-100 py-24">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">养宠小贴士</h2>
                  <p className="text-stone-500">在迎接新成员之前，了解这些知识非常重要。</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {tips.slice(0, 3).map(tip => (
                    <div key={tip.id} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200/50 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                        <BookOpen size={24} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2 block">{tip.category}</span>
                      <h4 className="text-xl font-bold text-stone-800 mb-4">{tip.title}</h4>
                      <p className="text-stone-500 text-sm line-clamp-3 mb-6">{tip.content}</p>
                      <button onClick={() => setPage('tips')} className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                        阅读更多 <ChevronRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-emerald-900 text-white py-24">
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000" 
                    alt="Success Story" 
                    className="rounded-[3rem] shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2rem] shadow-xl text-stone-800 hidden lg:block max-w-xs">
                    <p className="italic mb-4">"领养了豆豆之后，我的生活充满了欢笑。它不仅仅是一只宠物，更是我的家人。"</p>
                    <p className="font-bold">— 张女士</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">爱，是它们<br />唯一的语言</h2>
                  <div className="space-y-8">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center shrink-0">
                        <Heart className="text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">领养代替买卖</h4>
                        <p className="text-emerald-100/70">给流浪动物第二次机会，让爱心在领养中延续。</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center shrink-0">
                        <Info className="text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">专业的医疗保障</h4>
                        <p className="text-emerald-100/70">所有宠物在领养前均经过健康检查和必要的疫苗接种。</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center shrink-0">
                        <Phone className="text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">终身指导支持</h4>
                        <p className="text-emerald-100/70">我们提供专业的养宠咨询，陪伴您和宠物的每一个成长时刻。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {page === 'browse' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
              <h1 className="text-5xl font-serif font-bold text-stone-800 mb-6">寻找你的新朋友</h1>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-stone-100">
                <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-2xl w-full md:w-96">
                  <Search size={20} className="text-stone-400" />
                  <input type="text" placeholder="搜索品种、性格..." className="bg-transparent outline-none w-full text-sm" />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['all', '狗', '猫'].map(type => (
                      <button 
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${filter === type ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}`}
                      >
                        {type === 'all' ? '全部' : type}
                      </button>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded-xl text-sm font-bold">
                    <Filter size={16} /> 筛选
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPets.map(pet => (
                  <PetCard key={pet.id} pet={pet} onClick={() => setSelectedPet(pet)} />
                ))}
              </AnimatePresence>
            </div>
            
            {filteredPets.length === 0 && (
              <div className="py-24 text-center">
                <div className="w-20 h-20 bg-stone-100 text-stone-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">没有找到匹配的宠物</h3>
                <p className="text-stone-500">试着更换筛选条件或搜索关键词。</p>
              </div>
            )}
          </section>
        )}

        {page === 'shop' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif font-bold text-stone-800 mb-4">爱心义卖</h1>
              <p className="text-stone-500 mb-8">义卖所得款项将全额用于流浪动物的医疗与救助。</p>
              <button 
                onClick={() => setIsPublishingProduct(true)}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 mx-auto"
              >
                <Plus size={18} /> 我要发布商品
              </button>
            </div>

            <AnimatePresence>
              {isPublishingProduct && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
                >
                  <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-y-auto max-h-[90vh]">
                    <button onClick={() => setIsPublishingProduct(false)} className="absolute top-8 right-8 text-stone-400 hover:text-stone-600 transition-colors">
                      <X size={24} />
                    </button>
                    <h2 className="text-3xl font-serif font-bold text-stone-800 mb-8">发布义卖商品</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">商品名称</label>
                        <input 
                          type="text" 
                          value={newProduct.name}
                          onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none" 
                          placeholder="例如：爱心猫粮"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">价格 (元)</label>
                        <input 
                          type="number" 
                          value={newProduct.price}
                          onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none" 
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">分类</label>
                        <select 
                          value={newProduct.category}
                          onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none bg-white"
                        >
                          <option>生活用品</option>
                          <option>宠物零食</option>
                          <option>医疗保健</option>
                          <option>爱心周边</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">商品图片</label>
                        <div className="flex items-center gap-4">
                          <label className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-sm font-bold cursor-pointer hover:bg-stone-200 transition-all border border-stone-200">
                            <Upload size={14} className="inline mr-2" /> 上传
                            <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, (base64) => setNewProduct({...newProduct, image_url: base64}))} />
                          </label>
                          <input 
                            type="text" 
                            value={newProduct.image_url}
                            onChange={e => setNewProduct({...newProduct, image_url: e.target.value})}
                            className="flex-1 px-4 py-2 rounded-lg border border-stone-200 outline-none focus:border-emerald-500 text-sm" 
                            placeholder="或图片 URL"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-8">
                      <label className="text-sm font-bold text-stone-500 uppercase tracking-wider">商品描述</label>
                      <textarea 
                        value={newProduct.description}
                        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none h-32 resize-none" 
                        placeholder="请详细描述商品的规格、用途等..."
                      ></textarea>
                    </div>
                    <button 
                      onClick={async () => {
                        if (!newProduct.name || !newProduct.price) return alert('请填写完整信息');
                        await fetch('/api/products', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) })
                        });
                        setIsPublishingProduct(false);
                        setNewProduct({ name: '', price: '', category: '生活用品', description: '', image_url: '' });
                        onUpdate();
                      }}
                      className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
                    >
                      确认发布
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map(product => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 block">{product.category}</span>
                    <h3 className="text-lg font-bold text-stone-800 mb-2">{product.name}</h3>
                    <p className="text-stone-500 text-xs mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-stone-900">¥{Number(product.price || 0).toFixed(2)}</span>
                      <button className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-colors">
                        立即购买
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {page === 'guide' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif font-bold text-stone-800 mb-4">领养指南</h1>
              <p className="text-stone-500">了解领养流程，为迎接新成员做好准备。</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guides.map((guide, idx) => (
                <motion.div 
                  key={guide.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-200 relative overflow-hidden"
                >
                  <div className="absolute -top-4 -right-4 text-stone-50 font-black text-8xl select-none">
                    0{idx + 1}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6">{guide.title}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{guide.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-24 bg-emerald-50 rounded-[3rem] p-12 md:p-20 text-center">
              <h2 className="text-3xl font-serif font-bold text-stone-800 mb-6">准备好给它一个家了吗？</h2>
              <p className="text-stone-600 mb-10 max-w-2xl mx-auto">
                领养是一个长期的承诺。如果您已经阅读并同意以上指南，请点击下方按钮开始浏览待领养宠物。
              </p>
              <button 
                onClick={() => setPage('browse')}
                className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
              >
                开始浏览
              </button>
            </div>
          </section>
        )}

        {page === 'donate' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif font-bold text-stone-800 mb-4">支持我们</h1>
              <p className="text-stone-500">您的每一份爱心，都是流浪动物重获新生的希望。</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-stone-200">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                  <Heart size={32} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-stone-800 mb-6">资金捐赠</h2>
                <p className="text-stone-600 mb-8 leading-relaxed">
                  捐赠资金将直接用于流浪动物的医疗救治、疫苗接种、绝育手术以及日常伙食开支。您可以选择单次捐赠或成为我们的月度守护者。
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {['¥10', '¥50', '¥100'].map(amount => (
                    <button key={amount} className="py-3 border-2 border-stone-100 rounded-xl font-bold hover:border-emerald-600 hover:text-emerald-600 transition-all">
                      {amount}
                    </button>
                  ))}
                </div>
                <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all">
                  立即捐赠
                </button>
              </div>
              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-stone-200">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-8">
                  <Gift size={32} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-stone-800 mb-6">物资捐赠</h2>
                <p className="text-stone-600 mb-8 leading-relaxed">
                  除了资金，我们也急需宠物粮食、猫砂、牵引绳、旧毛毯、清洁用品等。如果您有闲置的宠物用品，欢迎捐赠给救助中心。
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-stone-600">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>宠物粮食（猫粮、狗粮、罐头）</span>
                  </div>
                  <div className="flex items-center gap-4 text-stone-600">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>保暖用品（旧衣服、毛毯、垫子）</span>
                  </div>
                  <div className="flex items-center gap-4 text-stone-600">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>医疗用品（消毒液、棉签、纱布）</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-stone-800 text-white rounded-2xl font-bold hover:bg-stone-900 transition-all">
                  联系捐赠物资
                </button>
              </div>
            </div>
          </section>
        )}

        {page === 'partners' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif font-bold text-stone-800 mb-4">合作伙伴</h1>
              <p className="text-stone-500">感谢这些企业与机构对流浪动物救助事业的大力支持。</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {partners.map(partner => (
                <div key={partner.id} className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-200 text-center hover:shadow-md transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-4 border-stone-50">
                    <img src={partner.logo_url} alt={partner.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">{partner.name}</h3>
                  <p className="text-stone-500 text-sm mb-8 leading-relaxed">{partner.description}</p>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">
                    访问官网
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-24 text-center">
              <h2 className="text-3xl font-serif font-bold text-stone-800 mb-6">成为合作伙伴</h2>
              <p className="text-stone-600 mb-10 max-w-2xl mx-auto">
                如果您也想为流浪动物救助贡献一份力量，欢迎联系我们洽谈合作。
              </p>
              <button className="px-10 py-4 border-2 border-stone-800 text-stone-800 rounded-2xl font-bold hover:bg-stone-800 hover:text-white transition-all">
                联系我们
              </button>
            </div>
          </section>
        )}

        {page === 'stories' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif font-bold text-stone-800 mb-4">救助动态</h1>
              <p className="text-stone-500">了解我们的最新救助情况和温暖故事</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {['全部动态', '救助动态', '领养成功', '志愿活动'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setStoryFilter(cat)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${storyFilter === cat ? 'bg-orange-400 text-white shadow-lg shadow-orange-400/20' : 'bg-white text-stone-600 border border-stone-200 hover:border-orange-400 hover:text-orange-400'}`}
                >
                  {cat === '全部动态' && <Heart size={16} fill={storyFilter === cat ? "white" : "none"} />}
                  {cat === '救助动态' && <PawPrint size={16} />}
                  {cat === '领养成功' && <CheckCircle2 size={16} />}
                  {cat === '志愿活动' && <Users size={16} />}
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {filteredStories.map(story => (
                <motion.div 
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group cursor-pointer"
                  onClick={() => { setSelectedArticle(story); setArticleType('story'); }}
                >
                  <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6">
                    <img src={story.image_url} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 px-4 py-1 bg-white/90 backdrop-blur-sm text-orange-500 text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm">
                      {(story as any).category || '救助动态'}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-stone-800 group-hover:text-orange-500 transition-colors line-clamp-1">{story.title}</h3>
                    <div className="flex items-center gap-4 text-stone-400 text-xs font-medium">
                      <span className="flex items-center gap-1"><Clock size={12} /> {story.created_at || '2024-03-15'}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={12} /> {Math.floor(Math.random() * 20) + 5}</span>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">{story.content}</p>
                    <button className="text-orange-500 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all pt-2">
                      阅读全文 <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <button className="px-8 py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-all">
                加载更多动态
              </button>
            </div>
          </section>
        )}

        {page === 'tips' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif font-bold text-stone-800 mb-4">养宠知识库</h1>
              <p className="text-stone-500">专业的养宠建议，助您成为更好的铲屎官。</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {tips.map(tip => (
                <motion.div 
                  key={tip.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200 group cursor-pointer"
                  onClick={() => { setSelectedArticle(tip); setArticleType('tip'); }}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={tip.image_url} alt={tip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-8">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">{tip.category}</span>
                    <h3 className="text-xl font-bold text-stone-800 mb-4">{tip.title}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-4">{tip.content}</p>
                    <button className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      阅读全文 <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {page === 'volunteer' && (
          <section className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-5xl font-serif font-bold text-stone-800 mb-8 leading-tight">加入我们<br /><span className="text-emerald-600 italic">成为志愿救助者</span></h1>
                <p className="text-xl text-stone-600 mb-12 leading-relaxed">
                  我们需要您的力量！无论是线下救助、临时寄养，还是线上宣传，您的每一份努力都能让流浪动物离家更近一步。
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 text-emerald-600">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800">线下救助团队</h4>
                      <p className="text-stone-500 text-sm">协助救助流浪动物，参与日常喂养和清洁工作。</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 text-emerald-600">
                      <Heart size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800">临时寄养家庭</h4>
                      <p className="text-stone-500 text-sm">为等待领养的宠物提供一个临时的避风港。</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-8">志愿者申请表</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="姓名" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none" />
                    <input type="tel" placeholder="电话" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none" />
                  </div>
                  <input type="email" placeholder="邮箱" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none" />
                  <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none bg-white">
                    <option>意向领域</option>
                    <option>线下救助</option>
                    <option>临时寄养</option>
                    <option>媒体宣传</option>
                    <option>活动策划</option>
                  </select>
                  <textarea placeholder="您的相关经验或想说的话" rows={4} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none resize-none"></textarea>
                  <button className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                    提交申请
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {page === 'about' && (
          <section className="max-w-4xl mx-auto px-4 py-24">
            <h1 className="text-5xl font-serif font-bold text-stone-800 mb-12 text-center">{layout?.aboutTitle || "关于我们"}</h1>
            <div className="prose prose-stone lg:prose-xl mx-auto">
              <p className="text-xl text-stone-600 leading-relaxed mb-8 whitespace-pre-wrap">
                {layout?.aboutContent || "流浪动物救助中心成立于 2020 年，是一个由志愿者发起的非营利性宠物救助组织。我们的使命是减少流浪动物的数量，并为每一只受难的生命提供医疗、庇护和寻找新家的机会。"}
              </p>
              <div className="grid md:grid-cols-2 gap-12 my-16">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                  <h3 className="text-2xl font-bold text-emerald-700 mb-4">我们的愿景</h3>
                  <p className="text-stone-600">创造一个没有流浪动物、人与动物和谐共处的社会。</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                  <h3 className="text-2xl font-bold text-emerald-700 mb-4">我们的核心</h3>
                  <p className="text-stone-600">尊重生命、科学救助、透明公开、持续关怀。</p>
                </div>
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-800 mb-6">联系我们</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-stone-600">
                  <MapPin className="text-emerald-600" />
                  <span>{layout?.contactAddress || "北京市朝阳区爱心路 88 号"}</span>
                </div>
                <div className="flex items-center gap-4 text-stone-600">
                  <Phone className="text-emerald-600" />
                  <span>{layout?.contactPhone || "400-123-4567"}</span>
                </div>
                <div className="flex items-center gap-4 text-stone-600">
                  <Mail className="text-emerald-600" />
                  <span>{layout?.contactEmail || "contact@pawrescue.org"}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === 'contact' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif font-bold text-stone-800 mb-4">联系我们</h1>
              <p className="text-stone-500">任何问题或建议，欢迎随时与我们联系</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: <Phone className="text-orange-500" size={32} />, title: '联系电话', content: layout?.contactPhone || '400-123-4567', sub: '工作时间：9:00-18:00' },
                { icon: <Mail className="text-orange-500" size={32} />, title: '邮箱地址', content: layout?.contactEmail || 'rescue@doghelp.com', sub: '我们会在24小时内回复' },
                { icon: <MapPin className="text-orange-500" size={32} />, title: '收容所地址', content: layout?.contactAddress || '北京市朝阳区爱心路123号', sub: '欢迎预约参观' },
                { icon: <Clock className="text-orange-500" size={32} />, title: '开放时间', content: layout?.openingHours || '周二至周日 9:00-17:00', sub: '周一休息，节假日正常开放' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm text-center flex flex-col items-center">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-lg font-bold text-stone-800 mb-2">{item.title}</h3>
                  <p className="text-stone-900 font-bold mb-1">{item.content}</p>
                  <p className="text-stone-400 text-xs">{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100">
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-8 flex items-center gap-2">
                  <MessageSquare className="text-orange-500" size={24} /> 在线留言
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-stone-500">姓名 *</label>
                      <input type="text" placeholder="请输入您的姓名" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-400 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-stone-500">手机号码 *</label>
                      <input type="tel" placeholder="请输入手机号码" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-400 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-500">邮箱地址 *</label>
                    <input type="email" placeholder="请输入邮箱地址" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-400 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-500">咨询主题 *</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-400 outline-none bg-white transition-all">
                      <option>请选择咨询主题</option>
                      <option>领养咨询</option>
                      <option>志愿申请</option>
                      <option>捐赠咨询</option>
                      <option>其他建议</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-500">留言内容 *</label>
                    <textarea placeholder="请详细描述您的问题或建议" rows={5} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-400 outline-none resize-none transition-all"></textarea>
                  </div>
                  <button className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                    发送留言
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100">
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-8">收容所位置</h3>
                  <div className="aspect-video bg-stone-100 rounded-3xl flex flex-col items-center justify-center text-stone-400 mb-6 border border-stone-200">
                    <MapPin size={48} className="mb-4" />
                    <p className="text-sm">地图加载中...</p>
                    <p className="text-xs mt-1">北京市朝阳区爱心路123号</p>
                  </div>
                  <div className="space-y-4 text-sm text-stone-600">
                    <p><span className="font-bold text-stone-800">公交路线：</span> 乘坐123路、456路至爱心路站下车</p>
                    <p><span className="font-bold text-stone-800">地铁路线：</span> 地铁5号线至爱心站，A出口步行500米</p>
                    <p><span className="font-bold text-stone-800">自驾路线：</span> 导航至“流浪狗救助中心”</p>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100">
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-8">常见问题</h3>
                  <div className="space-y-6">
                    {[
                      { q: '如何申请领养流浪狗？', a: '您可以在线填写领养申请表，我们会在24小时内联系您进行后续流程。' },
                      { q: '可以直接到收容所看狗吗？', a: '为了确保安全，建议您提前预约参观时间。' },
                      { q: '捐助的物资有什么要求？', a: '请确保物资为全新或九成新以上，狗粮需在保质期内。' },
                      { q: '如何成为志愿者？', a: '填写志愿者申请表，我们会安排培训和岗位分配。' },
                    ].map((faq, idx) => (
                      <div key={idx} className="space-y-2">
                        <p className="font-bold text-stone-800 text-sm">Q: {faq.q}</p>
                        <p className="text-stone-500 text-sm">A: {faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {page === 'admin' && (
          !isAdmin ? (
            <section className="max-w-md mx-auto px-4 py-32">
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
                <h2 className="text-3xl font-serif font-bold text-stone-800 mb-8 text-center">管理员登录</h2>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const password = (e.target as any).password.value;
                  const res = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                  });
                  if (res.ok) setIsAdmin(true);
                  else alert('密码错误');
                }} className="space-y-6">
                  <input 
                    name="password"
                    type="password" 
                    placeholder="请输入管理密码" 
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none" 
                  />
                  <button className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all">
                    登录
                  </button>
                </form>
              </div>
            </section>
          ) : (
            <Admin 
              onLogout={() => setIsAdmin(false)} 
              data={{ pets, stories, tips, products, guides, partners, layout, applications }} 
              onUpdate={() => {
                fetch('/api/pets').then(res => res.json()).then(setPets);
                fetch('/api/stories').then(res => res.json()).then(setStories);
                fetch('/api/tips').then(res => res.json()).then(setTips);
                fetch('/api/products').then(res => res.json()).then(setProducts);
                fetch('/api/guides').then(res => res.json()).then(setGuides);
                fetch('/api/partners').then(res => res.json()).then(setPartners);
                fetch('/api/layout').then(res => res.json()).then(setLayout);
                fetch('/api/applications').then(res => res.json()).then(setApplications);
              }}
            />
          )
        )}
      </main>

      <footer className="bg-stone-900 text-stone-400 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <Logo className="brightness-0 invert" />
              </div>
              <p className="max-w-sm mb-8">
                以爱为家，终止流浪。我们相信每一只宠物都值得拥有一个充满爱的家。
              </p>
              <div className="flex gap-4">
                {/* Social Icons Placeholder */}
                <div className="w-10 h-10 bg-stone-800 rounded-full hover:bg-emerald-600 transition-colors cursor-pointer"></div>
                <div className="w-10 h-10 bg-stone-800 rounded-full hover:bg-emerald-600 transition-colors cursor-pointer"></div>
                <div className="w-10 h-10 bg-stone-800 rounded-full hover:bg-emerald-600 transition-colors cursor-pointer"></div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">快速链接</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setPage('home')} className="hover:text-white transition-colors">首页</button></li>
                <li><button onClick={() => setPage('browse')} className="hover:text-white transition-colors">寻找宠物</button></li>
                <li><button onClick={() => setPage('about')} className="hover:text-white transition-colors">关于我们</button></li>
                <li><button onClick={() => setPage('guide')} className="hover:text-white transition-colors">领养指南</button></li>
                <li><button onClick={() => setPage('admin')} className="hover:text-white transition-colors">管理员后台</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">支持我们</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setPage('donate')} className="hover:text-white transition-colors">捐赠资金</button></li>
                <li><button onClick={() => setPage('volunteer')} className="hover:text-white transition-colors">成为志愿者</button></li>
                <li><button onClick={() => setPage('donate')} className="hover:text-white transition-colors">物资捐赠</button></li>
                <li><button onClick={() => setPage('partners')} className="hover:text-white transition-colors">合作伙伴</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 流浪动物救助中心. All rights reserved.</p>
            <div className="flex gap-8">
              <button className="hover:text-white transition-colors">隐私政策</button>
              <button className="hover:text-white transition-colors">服务条款</button>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedPet && (
          <PetDetailModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
        )}
        {currentArticle && (
          <ArticleModal 
            article={currentArticle} 
            type={articleType} 
            onClose={() => setSelectedArticle(null)} 
            onCommentAdded={fetchData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
