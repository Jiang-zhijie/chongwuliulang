import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, PawPrint, Info, Phone, Mail, MapPin, Search, Filter, ChevronRight, ChevronDown, X, CheckCircle2, BookOpen, Star, Users, Gift } from 'lucide-react';

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

interface Story {
  id: number;
  title: string;
  content: string;
  pet_name: string;
  image_url: string;
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
  dropdownItems?: { label: string, onClick: () => void }[]
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

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: string) => void, currentPage: string }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
    <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
      <div 
        className="cursor-pointer" 
        onClick={() => onNavigate('home')}
      >
        <Logo />
      </div>
      <div className="hidden md:flex items-center gap-8 h-full">
        <NavItem 
          label="首页" 
          onClick={() => onNavigate('home')} 
          isActive={currentPage === 'home'} 
        />
        <NavItem 
          label="领养宠物" 
          isActive={currentPage === 'browse' || currentPage === 'guide'} 
          dropdownItems={[
            { label: '领养宠物', onClick: () => onNavigate('browse') },
            { label: '领养指南', onClick: () => onNavigate('guide') }
          ]}
        />
        <NavItem 
          label="爱心义卖" 
          onClick={() => onNavigate('shop')} 
          isActive={currentPage === 'shop'} 
        />
        <NavItem 
          label="成功故事" 
          onClick={() => onNavigate('stories')} 
          isActive={currentPage === 'stories'} 
        />
        <NavItem 
          label="养宠知识" 
          onClick={() => onNavigate('tips')} 
          isActive={currentPage === 'tips'} 
        />
        <NavItem 
          label="关于我们" 
          isActive={currentPage === 'about' || currentPage === 'volunteer' || currentPage === 'partners' || currentPage === 'donate'} 
          dropdownItems={[
            { label: '关于我们', onClick: () => onNavigate('about') },
            { label: '加入志愿', onClick: () => onNavigate('volunteer') },
            { label: '合作伙伴', onClick: () => onNavigate('partners') },
            { label: '物资捐赠', onClick: () => onNavigate('donate') }
          ]}
        />
        <button 
          onClick={() => onNavigate('donate')}
          className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm font-medium ml-2"
        >
          <Gift size={16} /> 捐赠支持
        </button>
      </div>
    </div>
  </nav>
);

const Hero = ({ onBrowse, onVolunteer }: { onBrowse: () => void, onVolunteer: () => void }) => (
  <section className="relative h-[80vh] flex items-center overflow-hidden bg-stone-100">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2000" 
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
        <h1 className="text-6xl md:text-7xl font-serif font-light leading-tight text-stone-900 mb-6">
          守护生命<br />
          <span className="font-bold text-emerald-700 italic">开启幸福新篇章</span>
        </h1>
        <p className="text-xl text-stone-600 mb-8 leading-relaxed">
          流浪动物救助中心致力于为每一只流浪宠物寻找最温暖的归宿。在这里，爱心不仅是拯救，更是陪伴的开始。
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

// Main App
export default function App() {
  const [page, setPage] = useState('home');
  const [pets, setPets] = useState<Pet[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/pets').then(res => res.json()).then(data => setPets(data));
    fetch('/api/stories').then(res => res.json()).then(data => setStories(data));
    fetch('/api/tips').then(res => res.json()).then(data => setTips(data));
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
    fetch('/api/guides').then(res => res.json()).then(data => setGuides(data));
    fetch('/api/partners').then(res => res.json()).then(data => setPartners(data));
  }, []);

  const filteredPets = filter === 'all' ? pets : pets.filter(p => p.type === filter);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <Navbar onNavigate={setPage} currentPage={page} />

      <main className="pt-24">
        {page === 'home' && (
          <>
            <Hero 
              onBrowse={() => setPage('browse')} 
              onVolunteer={() => setPage('volunteer')}
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
              <p className="text-stone-500">义卖所得款项将全额用于流浪动物的医疗与救助。</p>
            </div>
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
                      <span className="text-xl font-black text-stone-900">¥{product.price.toFixed(2)}</span>
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
              <h1 className="text-5xl font-serif font-bold text-stone-800 mb-4">成功故事</h1>
              <p className="text-stone-500">见证爱心的传递，感受每一个幸福的瞬间。</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {stories.map(story => (
                <motion.div 
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-stone-200 flex flex-col md:flex-row"
                >
                  <div className="md:w-1/2 h-64 md:h-auto">
                    <img src={story.image_url} alt={story.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-2 text-emerald-600 mb-4">
                      <Star size={16} fill="currentColor" />
                      <span className="text-xs font-bold uppercase tracking-widest">领养故事</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-stone-800 mb-4">{story.title}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-6">{story.content}</p>
                    <div className="flex items-center gap-3 border-t border-stone-100 pt-6">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        <PawPrint size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-stone-400">主角</p>
                        <p className="text-sm font-bold text-stone-800">{story.pet_name}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200 group"
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
            <h1 className="text-5xl font-serif font-bold text-stone-800 mb-12 text-center">关于我们</h1>
            <div className="prose prose-stone lg:prose-xl mx-auto">
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                流浪动物救助中心成立于 2020 年，是一个由志愿者发起的非营利性宠物救助组织。我们的使命是减少流浪动物的数量，并为每一只受难的生命提供医疗、庇护和寻找新家的机会。
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
                  <span>北京市朝阳区爱心路 88 号</span>
                </div>
                <div className="flex items-center gap-4 text-stone-600">
                  <Phone className="text-emerald-600" />
                  <span>400-123-4567</span>
                </div>
                <div className="flex items-center gap-4 text-stone-600">
                  <Mail className="text-emerald-600" />
                  <span>contact@pawrescue.org</span>
                </div>
              </div>
            </div>
          </section>
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
      </AnimatePresence>
    </div>
  );
}
