import React, { useState, useRef } from 'react';
import { 
  X, Settings, Plus, Trash2, Edit3, Save, Check, Gamepad2, Tag, 
  Wrench, MessageSquare, PhoneCall, Sparkles, Image, Tv, HelpCircle, Star, HardDrive, Smartphone, Laptop, Flame, Upload, Camera, FolderOpen 
} from 'lucide-react';

const AVAILABLE_PLATFORMS = [
  'PS5', 
  'PS4', 
  'PS3',
  'PC Gaming', 
  'Xbox Series X/S', 
  'Xbox One', 
  'Xbox 360',
  'Nintendo Switch', 
  'Rétrogaming',
  'Android / iOS'
];

const AVAILABLE_GENRES = [
  'Action / Aventure',
  'RPG / Rôle',
  'FPS / Tir',
  'Course / Automobile',
  'Sport / Football',
  'Combat',
  'Simulation / Hack & Slash',
  'Horreur / Survival'
];

const AVAILABLE_BADGES = [
  '🔥 TOP VENTES #1',
  '✨ NOUVEAUTÉ',
  '⚡ BEST-SELLER PC',
  '🏆 CHEF D\'ŒUVRE GOTY',
  '🎮 EXCLUSIVITÉ NEXT-GEN',
  '🏎️ RACING ULTRA 4K',
  '⚽ SPORT #1',
  '⭐ POPULAIRE'
];

const AVAILABLE_YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2015];

const STEAM_POPULAR_GAMES = [
  {
    appId: "2358720",
    title: "Black Myth: Wukong",
    genre: "Action / Aventure",
    year: 2024,
    size: "130 GB",
    rating: 4.9,
    platforms: ["PS5", "PC Gaming"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_hero.jpg",
    description: "Incarnez le Prédestiné dans ce chef-d'œuvre RPG d'action inspiré de la mythologie chinoise."
  },
  {
    appId: "1245620",
    title: "Elden Ring: Shadow of the Erdtree",
    genre: "RPG / Rôle",
    year: 2024,
    size: "60 GB",
    rating: 5.0,
    platforms: ["PS5", "PS4", "PC Gaming", "Xbox Series X/S"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg",
    description: "Le chef-d'œuvre acclamé de FromSoftware avec son extension monumentale."
  },
  {
    appId: "1778820",
    title: "Tekken 8",
    genre: "Combat",
    year: 2024,
    size: "100 GB",
    rating: 4.8,
    platforms: ["PS5", "PC Gaming", "Xbox Series X/S"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/library_hero.jpg",
    description: "La référence du jeu de combat sous Unreal Engine 5 avec système Heat dynamique."
  },
  {
    appId: "271590",
    title: "Grand Theft Auto V: Enhanced",
    genre: "Action / Aventure",
    year: 2023,
    size: "110 GB",
    rating: 5.0,
    platforms: ["PS5", "PS4", "PC Gaming", "Xbox One"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_hero.jpg",
    description: "Explorez Los Santos en 4K 60FPS avec temps de chargement ultra-rapides."
  },
  {
    appId: "1091500",
    title: "Cyberpunk 2077: Phantom Liberty",
    genre: "RPG / Rôle",
    year: 2023,
    size: "75 GB",
    rating: 4.9,
    platforms: ["PS5", "PC Gaming", "Xbox Series X/S"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg",
    description: "Night City en Ultra Ray-Tracing avec l'extension Phantom Liberty et les mods graphiques."
  },
  {
    appId: "1174180",
    title: "Red Dead Redemption 2",
    genre: "Action / Aventure",
    year: 2019,
    size: "115 GB",
    rating: 5.0,
    platforms: ["PS4", "PS5", "PC Gaming", "Xbox One"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg",
    description: "L'épopée western inoubliable d'Arthur Morgan en monde ouvert somptueux."
  },
  {
    appId: "2050650",
    title: "Resident Evil 4 Remake",
    genre: "Horreur / Survival",
    year: 2023,
    size: "70 GB",
    rating: 4.9,
    platforms: ["PS5", "PS4", "PC Gaming", "Xbox Series X/S"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/library_hero.jpg",
    description: "Leon S. Kennedy dans une mission de survie terrifiante réinventée sous RE Engine."
  },
  {
    appId: "1593500",
    title: "God of War Ragnarök & Saga",
    genre: "Action / Aventure",
    year: 2024,
    size: "80 GB",
    rating: 5.0,
    platforms: ["PS5", "PS4", "PC Gaming"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_hero.jpg",
    description: "Kratos & Atreus dans la mythologie nordique avec combat viscéral en 60FPS."
  },
  {
    appId: "1817070",
    title: "Marvel's Spider-Man Remastered",
    genre: "Action / Aventure",
    year: 2022,
    size: "75 GB",
    rating: 4.9,
    platforms: ["PS5", "PC Gaming"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_hero.jpg",
    description: "Voltigez à travers New York en Ray-Tracing natif et combattez les plus grands vilains."
  },
  {
    appId: "2215430",
    title: "Ghost of Tsushima DIRECTOR'S CUT",
    genre: "Action / Aventure",
    year: 2024,
    size: "75 GB",
    rating: 5.0,
    platforms: ["PS5", "PS4", "PC Gaming"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/library_hero.jpg",
    description: "Incarnez Jin Sakai, le Fantôme de Tsushima, dans un Japon féodal somptueux en 4K."
  },
  {
    appId: "1551360",
    title: "Forza Horizon 5",
    genre: "Course / Simulation",
    year: 2021,
    size: "110 GB",
    rating: 4.9,
    platforms: ["PC Gaming", "Xbox Series X/S", "Xbox One"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_hero.jpg",
    description: "700+ Bolides Hypercars sur les routes ouvertes et photoréalistes du Mexique."
  },
  {
    appId: "2195250",
    title: "EA SPORTS FC 24",
    genre: "Sport / Football",
    year: 2024,
    size: "50 GB",
    rating: 4.7,
    platforms: ["PS5", "PS4", "PC Gaming", "Xbox"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_hero.jpg",
    description: "Le football universel avec technologie HyperMotionV et licences officielles."
  },
  {
    appId: "1888930",
    title: "The Last of Us Part I",
    genre: "Action / Aventure",
    year: 2023,
    size: "80 GB",
    rating: 4.9,
    platforms: ["PS5", "PC Gaming"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_hero.jpg",
    description: "L'épopée post-apocalyptique poignante d'Ellie et Joel entièrement reconstruite."
  },
  {
    appId: "990080",
    title: "Hogwarts Legacy: L'Héritage de Poudlard",
    genre: "RPG / Rôle",
    year: 2023,
    size: "85 GB",
    rating: 4.8,
    platforms: ["PS5", "PS4", "PC Gaming", "Xbox Series X/S", "Switch"],
    cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900_2x.jpg",
    banner: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_hero.jpg",
    description: "Vivez votre propre aventure de sorcier dans le monde magique de Poudlard au XIXe siècle."
  }
];

const PRESET_SERVICE_SLIDES = [
  {
    type: 'service',
    title: 'Jailbreak & Déblocage Consoles Pro',
    subtitle: 'PS4 GoldHEN, PS3 HEN/CFW, Switch Atmosphere & Xbox RGH',
    description: 'Débridez tout le potentiel de votre console en atelier : installation Homebrew Store, émulateurs rétro, jeux et personnalisations sans risque matériel.',
    platforms: ['PS4', 'PS3', 'Switch', 'Xbox 360'],
    badge: '🔓 ATELIER & FLASH EXPERT',
    ctaText: 'Commander un Déblocage WhatsApp',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop',
    targetSection: 'consoles'
  },
  {
    type: 'service',
    title: 'Formatage & Réinstallation PC Gaming',
    subtitle: 'Windows 11 Pro Propre, Drivers GPU Optimisés & Boost FPS',
    description: 'Remise à neuf complète de votre ordinateur portable ou fixe : suppression des virus, optimisation des performances graphiques et pack logiciels essentiels.',
    platforms: ['PC Gaming', 'Laptops', 'Bureautique'],
    badge: '💻 MAINTENANCE & OPTIMISATION',
    ctaText: 'Optimiser mon PC sur WhatsApp',
    banner: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1920&auto=format&fit=crop',
    targetSection: 'services'
  },
  {
    type: 'service',
    title: 'Dépannage, Réparation & Nettoyage Thermique',
    subtitle: 'Pâte Thermique Noctua, Métal Liquide PS5, Port HDMI & Alimentation',
    description: 'Votre console fait du bruit ou surchauffe ? Nous réalisons le dépoussiérage intégral, le remplacement de pâte thermique et la réparation micro-électronique.',
    platforms: ['PS5', 'PS4', 'PS3', 'Xbox', 'PC'],
    badge: '🔧 RÉPARATION ATELIER GARANTIE',
    ctaText: 'Demander un Dépannage WhatsApp',
    banner: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop',
    targetSection: 'services'
  },
  {
    type: 'service',
    title: 'Déblocage Compte Google (FRP) & Flash GSM',
    subtitle: 'Samsung, iPhone, Xiaomi, Tecno, Infinix, Huawei & Restauration Système',
    description: 'Contournement FRP sécurisé, déverrouillage réseau tous opérateurs, suppression code/schéma oublié et réinstallation firmware d\'origine.',
    platforms: ['Android', 'iOS', 'Smartphones', 'Tablettes'],
    badge: '📱 DÉVERROUILLAGE GSM RAPIDE',
    ctaText: 'Débloquer mon Téléphone',
    banner: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1920&auto=format&fit=crop',
    targetSection: 'services'
  },
  {
    type: 'service',
    title: 'Remplissage Disques Durs & Packs Jeux Clés en Main',
    subtitle: 'Disques Externes & Internes 500GB, 1TB, 2TB & 4TB Prêts à Jouer',
    description: 'Choisissez vos jeux favoris et repartez avec votre disque dur externe ou console entièrement chargée et configurée par nos techniciens.',
    platforms: ['PS4', 'PS3', 'PC Gaming', 'Rétrogaming'],
    badge: '📦 PACKS TOUT COMPRIS',
    ctaText: 'Composer mon Pack de Jeux',
    banner: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1920&auto=format&fit=crop',
    targetSection: 'pack-builder'
  }
];

const QUICK_POPULAR_GAMES = STEAM_POPULAR_GAMES;

/**
 * Reusable Image Picker with direct Gallery / Camera / PC upload + URL + Google Images 1-click search
 */
function ImagePickerField({ 
  label, 
  value, 
  onChange, 
  placeholder = "Coller un lien URL ou choisir un fichier...", 
  aspect = "16/9",
  searchTitle = "", 
  searchType = "banner",
  required = false
}) {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide (JPG, PNG, WebP, etc.).');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const maxDim = 1280;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        onChange(compressedDataUrl);
        setIsProcessing(false);
      };
      img.onerror = () => {
        onChange(event.target.result);
        setIsProcessing(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const openGoogleImages = () => {
    if (!searchTitle || !searchTitle.trim()) {
      alert("Veuillez d'abord taper le titre dans le champ ci-dessus.");
      return;
    }
    const query = searchType === 'banner' 
      ? `${searchTitle.trim()} wallpaper 16:9 4k` 
      : `${searchTitle.trim()} cover poster 3:4`;
    window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-bold text-slate-300">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        {searchTitle && (
          <button
            type="button"
            onClick={openGoogleImages}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline font-cyber"
          >
            🔍 Trouver sur Google Images
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        {/* URL / Path input */}
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required && !value}
          className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm font-mono placeholder:font-sans placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
        />

        {/* Local File Upload Button from Phone Gallery / Camera / PC */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-bold flex items-center justify-center gap-2 shrink-0 transition-all active:scale-95 shadow"
        >
          <Upload className="w-3.5 h-3.5 text-purple-300" />
          <span>{isProcessing ? 'Compression...' : '📁 Galerie / PC'}</span>
        </button>
      </div>

      {/* Image Preview with delete/status */}
      {value && (
        <div className="relative mt-2 rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 group">
          <img
            src={value}
            alt="Aperçu"
            className={`w-full object-cover ${aspect === '3/4' ? 'max-h-56 object-contain bg-black/60' : 'h-36 sm:h-44'}`}
          />
          <div className="absolute top-2 right-2 flex items-center gap-1.5">
            <span className="px-2 py-1 rounded bg-black/80 text-[10px] text-cyan-300 font-mono border border-cyan-500/40">
              {value.startsWith('data:image') ? '📷 Fichier Galerie / Appareil' : '🔗 Image Web / URL'}
            </span>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs shadow transition-all"
              title="Supprimer l'image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard({ 
  onClose, 
  games, 
  onUpdateGames, 
  consoles,
  onUpdateConsoles,
  services, 
  onUpdateServices,
  heroSlides = [],
  onUpdateHeroSlides,
  flashDeals = [],
  onUpdateFlashDeals,
  faqs,
  onUpdateFaqs,
  reviews,
  onUpdateReviews,
  messages,
  config,
  onUpdateConfig
}) {
  const [activeTab, setActiveTab] = useState('slides'); // 'slides' | 'games' | 'deals' | 'consoles' | 'services' | 'faqs' | 'reviews' | 'messages' | 'config'
  
  // Flash Deals editing state
  const [editingDeal, setEditingDeal] = useState(null);
  const [dealFormData, setDealFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    badge: '🔥 OFFRE SPÉCIALE',
    originalPrice: 45,
    promoPrice: 35,
    discountPercentage: 22,
    image: '',
    platforms: ['PS5', 'PS4'],
    features: []
  });
  
  // Game editing form state
  const [editingGame, setEditingGame] = useState(null);
  const [gameFormData, setGameFormData] = useState({
    title: '',
    platforms: ['PS5', 'PS4'],
    genre: 'Action / Aventure',
    year: 2024,
    size: '50 GB',
    rating: 4.8,
    popularity: 90,
    badges: ['Populaire'],
    cover: '',
    banner: '',
    screenshots: [],
    trailerUrl: '',
    description: '',
    features: []
  });
  const [isAutoFetching, setIsAutoFetching] = useState(false);

  const openGoogleImages = (title, type = 'cover') => {
    if (!title || !title.trim()) {
      alert('Veuillez d\'abord saisir le titre du jeu.');
      return;
    }
    const query = type === 'banner' ? `${title} wallpaper 16:9 4k` : `${title} cover poster 3:4`;
    window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleAutoFetchInfo = async (title) => {
    if (!title || !title.trim()) {
      alert('Veuillez d\'abord taper le titre du jeu (ex: Tekken 8, Spider-Man 2, GTA V...).');
      return;
    }
    setIsAutoFetching(true);
    try {
      const cleanTitle = encodeURIComponent(title.trim());
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=0&gsrlimit=1&gsrsearch=${cleanTitle}+video+game&prop=pageimages|extracts&pithumbsize=1000&exintro=1&explaintext=1`);
      const data = await res.json();
      if (data?.query?.pages) {
        const pageId = Object.keys(data.query.pages)[0];
        const page = data.query.pages[pageId];
        if (page?.thumbnail?.source) {
          setGameFormData(prev => ({
            ...prev,
            cover: page.thumbnail.source,
            banner: prev.banner || page.thumbnail.source,
            description: prev.description || (page.extract ? page.extract.slice(0, 300) + '...' : prev.description)
          }));
        } else {
          alert('Informations trouvées. Utilisez le bouton Google Images en 1 clic pour choisir la jaquette HD.');
        }
      }
    } catch (err) {
      console.log('Fetch helper error:', err);
    } finally {
      setIsAutoFetching(false);
    }
  };

  const [steamAppIdInput, setSteamAppIdInput] = useState('');

  const handleImportBySteamAppId = (appIdToImport) => {
    const id = (appIdToImport || steamAppIdInput || '').trim();
    if (!id) {
      alert("Veuillez entrer un Steam AppID (ex: 2358720 pour Black Myth Wukong, 1245620 pour Elden Ring, 1778820 pour Tekken 8...)");
      return;
    }

    const coverUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/library_600x900_2x.jpg`;
    const bannerUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/library_hero.jpg`;

    // Check if in preset
    const matched = STEAM_POPULAR_GAMES.find(g => g.appId === id);

    setGameFormData(prev => ({
      ...prev,
      title: matched ? matched.title : (prev.title || `Jeu Steam #${id}`),
      genre: matched ? matched.genre : prev.genre,
      year: matched ? matched.year : prev.year,
      size: matched ? matched.size : prev.size,
      rating: matched ? matched.rating : prev.rating,
      platforms: matched ? matched.platforms : prev.platforms,
      cover: coverUrl,
      banner: bannerUrl,
      description: matched ? matched.description : (prev.description || "Jeu haute performance optimisé pour consoles et PC Gaming.")
    }));

    setSteamAppIdInput('');
  };

  const handleQuickFillGame = (preset) => {
    setGameFormData(prev => ({
      ...prev,
      title: preset.title,
      genre: preset.genre,
      year: preset.year,
      size: preset.size,
      rating: preset.rating,
      platforms: preset.platforms,
      cover: preset.cover,
      banner: preset.banner,
      description: preset.description
    }));
  };

  // Hero Slide editing form state
  const [editingSlide, setEditingSlide] = useState(null);
  const [slideSteamAppIdInput, setSlideSteamAppIdInput] = useState('');
  const [slideFormData, setSlideFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    platforms: ['PS5', 'PC Gaming'],
    badge: '🔥 HIT MONDIAL',
    image: ''
  });

  const handleQuickFillSlideFromSteam = (preset) => {
    setSlideFormData(prev => ({
      ...prev,
      title: preset.title,
      subtitle: preset.subtitle || `Disponible en 4K 60FPS optimisé sur console & PC Gaming`,
      badge: preset.badge || '🔥 TOP HIT',
      platforms: preset.platforms || ['PS5', 'PC Gaming'],
      image: preset.banner || `https://cdn.cloudflare.steamstatic.com/steam/apps/${preset.appId}/library_hero.jpg`,
      description: preset.description
    }));
  };

  const handleImportSlideBySteamAppId = () => {
    const id = (slideSteamAppIdInput || '').trim();
    if (!id) {
      alert("Veuillez entrer un Steam AppID (ex: 2358720 pour Wukong, 1245620 pour Elden Ring, 1778820 pour Tekken 8...)");
      return;
    }
    const bannerUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/library_hero.jpg`;
    const matched = STEAM_POPULAR_GAMES.find(g => g.appId === id);

    setSlideFormData(prev => ({
      ...prev,
      title: matched ? matched.title : (prev.title || `Jeu Steam #${id}`),
      subtitle: prev.subtitle || "Expérience 4K Ultra Haute Définition",
      image: bannerUrl,
      description: matched ? matched.description : prev.description
    }));
    setSlideSteamAppIdInput('');
  };

  // Console editing form state
  const [editingConsole, setEditingConsole] = useState(null);
  const [consoleFormData, setConsoleFormData] = useState({
    id: '',
    name: '',
    brand: '',
    badge: '',
    compatibilityStatus: '',
    image: '',
    description: '',
    availableServices: []
  });

  // Service editing form state
  const [editingService, setEditingService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    id: '',
    title: '',
    category: 'Consoles',
    badge: 'Populaire',
    price: 'Sur devis',
    iconName: 'Wrench',
    description: '',
    details: [],
    consoles: []
  });

  // FAQ editing form state
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqFormData, setFaqFormData] = useState({
    id: '',
    question: '',
    answer: ''
  });

  // Review editing form state
  const [editingReview, setEditingReview] = useState(null);
  const [reviewFormData, setReviewFormData] = useState({
    id: '',
    name: '',
    console: '',
    rating: 5,
    comment: '',
    date: ''
  });

  // Config form state
  const [configForm, setConfigForm] = useState(config || {});

  // Save Config
  const handleSaveConfig = (e) => {
    e.preventDefault();
    onUpdateConfig(configForm);
    alert('Configuration générale du site enregistrée avec succès !');
  };

  // Toggle platform helper for Game form
  const toggleGamePlatform = (plat) => {
    const current = Array.isArray(gameFormData.platforms) ? gameFormData.platforms : [];
    if (current.includes(plat)) {
      setGameFormData({ ...gameFormData, platforms: current.filter(p => p !== plat) });
    } else {
      setGameFormData({ ...gameFormData, platforms: [...current, plat] });
    }
  };

  // Toggle platform helper for Slide form
  const toggleSlidePlatform = (plat) => {
    const current = Array.isArray(slideFormData.platforms) ? slideFormData.platforms : [];
    if (current.includes(plat)) {
      setSlideFormData({ ...slideFormData, platforms: current.filter(p => p !== plat) });
    } else {
      setSlideFormData({ ...slideFormData, platforms: [...current, plat] });
    }
  };

  // --- SLIDE HANDLERS ---
  const handleOpenSlideForm = (slide = null) => {
    if (slide) {
      setEditingSlide(slide);
      setSlideFormData(slide);
    } else {
      setEditingSlide('NEW');
      setSlideFormData({
        id: `slide-${Date.now()}`,
        title: '',
        subtitle: '',
        description: '',
        platforms: ['PS5', 'PC Gaming'],
        badge: '🔥 TOP VENTES #1',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop'
      });
    }
  };

  const handleSaveSlide = (e) => {
    e.preventDefault();
    const updated = editingSlide === 'NEW' ? [slideFormData, ...heroSlides] : heroSlides.map(s => s.id === slideFormData.id ? slideFormData : s);
    onUpdateHeroSlides(updated);
    setEditingSlide(null);
  };

  const handleDeleteSlide = (id) => {
    if (window.confirm('Effacer cette image paysage du carrousel Netflix ?')) {
      onUpdateHeroSlides(heroSlides.filter(s => s.id !== id));
    }
  };

  // --- GAME HANDLERS ---
  const handleOpenGameForm = (game = null) => {
    if (game) {
      setEditingGame(game);
      setGameFormData(game);
    } else {
      setEditingGame('NEW');
      setGameFormData({
        id: `game-${Date.now()}`,
        title: '',
        platforms: ['PS5', 'PS4'],
        genre: 'Action / Aventure',
        year: 2024,
        size: '50 GB',
        rating: 4.8,
        popularity: 90,
        badges: ['Nouveau'],
        cover: '/images/catalog/cover-sample.jpg',
        banner: '/images/hero/hero-sample.jpg',
        screenshots: [],
        trailerUrl: '',
        description: '',
        features: ['Installation rapide']
      });
    }
  };

  const handleSaveGame = (e) => {
    e.preventDefault();
    const updated = editingGame === 'NEW' ? [gameFormData, ...games] : games.map(g => g.id === gameFormData.id ? gameFormData : g);
    onUpdateGames(updated);
    setEditingGame(null);
  };

  const handleDeleteGame = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce jeu du catalogue ?')) {
      onUpdateGames(games.filter(g => g.id !== id));
    }
  };

  // --- CONSOLE HANDLERS ---
  const handleOpenConsoleForm = (c = null) => {
    if (c) {
      setEditingConsole(c);
      setConsoleFormData(c);
    } else {
      setEditingConsole('NEW');
      setConsoleFormData({
        id: `console-${Date.now()}`,
        name: '',
        brand: 'Sony',
        badge: 'Nouveau',
        compatibilityStatus: 'Compatible 100%',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop',
        description: '',
        availableServices: ['Configuration & Assistance']
      });
    }
  };

  const handleSaveConsole = (e) => {
    e.preventDefault();
    const cToSave = {
      ...consoleFormData,
      availableServices: typeof consoleFormData.availableServices === 'string'
        ? consoleFormData.availableServices.split('\n').map(s => s.trim()).filter(Boolean)
        : consoleFormData.availableServices
    };
    const updated = editingConsole === 'NEW' ? [cToSave, ...consoles] : consoles.map(c => c.id === cToSave.id ? cToSave : c);
    onUpdateConsoles(updated);
    setEditingConsole(null);
  };

  const handleDeleteConsole = (id) => {
    if (window.confirm('Supprimer cet équipement ?')) {
      onUpdateConsoles(consoles.filter(c => c.id !== id));
    }
  };

  // --- SERVICE HANDLERS ---
  const handleOpenServiceForm = (s = null) => {
    if (s) {
      setEditingService(s);
      setServiceFormData(s);
    } else {
      setEditingService('NEW');
      setServiceFormData({
        id: `serv-${Date.now()}`,
        title: '',
        category: 'Consoles',
        badge: 'Service Expert',
        price: 'Sur devis',
        iconName: 'Wrench',
        description: '',
        details: ['Inclus dans la prestation'],
        consoles: ['PS5', 'PC Gaming']
      });
    }
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    const sToSave = {
      ...serviceFormData,
      details: typeof serviceFormData.details === 'string'
        ? serviceFormData.details.split('\n').map(d => d.trim()).filter(Boolean)
        : serviceFormData.details,
      consoles: typeof serviceFormData.consoles === 'string'
        ? serviceFormData.consoles.split(',').map(c => c.trim())
        : serviceFormData.consoles
    };
    const updated = editingService === 'NEW' ? [sToSave, ...services] : services.map(s => s.id === sToSave.id ? sToSave : s);
    onUpdateServices(updated);
    setEditingService(null);
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Supprimer ce service ?')) {
      onUpdateServices(services.filter(s => s.id !== id));
    }
  };

  // --- FAQ HANDLERS ---
  const handleOpenFaqForm = (faq = null) => {
    if (faq) {
      setEditingFaq(faq);
      setFaqFormData(faq);
    } else {
      setEditingFaq('NEW');
      setFaqFormData({ id: `faq-${Date.now()}`, question: '', answer: '' });
    }
  };

  const handleSaveFaq = (e) => {
    e.preventDefault();
    const updated = editingFaq === 'NEW' ? [faqFormData, ...faqs] : faqs.map(f => f.id === faqFormData.id ? faqFormData : f);
    onUpdateFaqs(updated);
    setEditingFaq(null);
  };

  const handleDeleteFaq = (id) => {
    if (window.confirm('Supprimer cette question FAQ ?')) {
      onUpdateFaqs(faqs.filter(f => f.id !== id));
    }
  };

  // --- REVIEW HANDLERS ---
  const handleOpenReviewForm = (rev = null) => {
    if (rev) {
      setEditingReview(rev);
      setReviewFormData(rev);
    } else {
      setEditingReview('NEW');
      setReviewFormData({
        id: `rev-${Date.now()}`,
        name: '',
        console: 'PlayStation 5 / PC',
        rating: 5,
        comment: '',
        date: 'Récemment'
      });
    }
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    const updated = editingReview === 'NEW' ? [reviewFormData, ...reviews] : reviews.map(r => r.id === reviewFormData.id ? reviewFormData : r);
    onUpdateReviews(updated);
    setEditingReview(null);
  };

  // Flash Deals Handlers
  const handleOpenDealForm = (deal = null) => {
    if (deal) {
      setEditingDeal(deal.id);
      setDealFormData(deal);
    } else {
      setEditingDeal('NEW');
      setDealFormData({
        id: `deal-${Date.now()}`,
        title: '',
        subtitle: '',
        badge: '🔥 OFFRE SPÉCIALE',
        originalPrice: 45,
        promoPrice: 35,
        discountPercentage: 22,
        image: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?q=80&w=800&auto=format&fit=crop',
        platforms: ['PS5', 'PS4'],
        features: ['4 Jeux récents au choix', 'Derniers patchs & DLCs installés', 'Garantie atelier']
      });
    }
  };

  const handleSaveDeal = (e) => {
    e.preventDefault();
    if (!onUpdateFlashDeals) return;
    const updated = editingDeal === 'NEW' 
      ? [dealFormData, ...flashDeals] 
      : flashDeals.map(d => d.id === dealFormData.id ? dealFormData : d);
    onUpdateFlashDeals(updated);
    setEditingDeal(null);
  };

  const handleDeleteDeal = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette offre flash ?')) {
      if (!onUpdateFlashDeals) return;
      const updated = flashDeals.filter(d => d.id !== id);
      onUpdateFlashDeals(updated);
    }
  };



  // Lock body scroll when admin modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl animate-fadeIn">
      
      <div className="relative w-full max-w-6xl h-[92vh] sm:h-[88vh] bg-[#090d16] border-t sm:border border-purple-500/40 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(157,0,255,0.25)] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-950/80 via-slate-900 to-cyan-950/80 border-b border-purple-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base sm:text-2xl font-black text-white font-heading">
                TABLEAU DE BORD <span className="text-gradient-purple">ADMIN</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 font-cyber tracking-wider uppercase hidden xs:block">
                Gestion totale du site, jeux, services et bannières
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-rose-500/80 transition-all border border-slate-700"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Mobile Quick Dropdown Selector for instant switching without scrolling */}
        <div className="sm:hidden px-4 py-2.5 bg-[#070a12] border-b border-slate-800 flex items-center justify-between gap-2.5 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Section :</span>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="flex-1 bg-slate-900 border border-purple-500/40 text-white font-bold text-xs py-2 px-3 rounded-xl focus:outline-none focus:border-cyan-400"
          >
            <option value="slides">🎬 Hero Netflix ({heroSlides.length})</option>
            <option value="games">🎮 Jeux Vidéo ({games.length})</option>
            <option value="deals">🔥 Offres Flash ({flashDeals.length})</option>
            <option value="consoles">💾 Équipements ({consoles.length})</option>
            <option value="services">🛠️ Services Atelier ({services.length})</option>
            <option value="faqs">❓ FAQ ({faqs.length})</option>
            <option value="reviews">⭐ Avis Clients ({reviews.length})</option>
            <option value="messages">💬 Messages Reçus ({messages.length})</option>
            <option value="config">⚙️ Contact & Infos Site</option>
          </select>
        </div>

        {/* Admin Navigation Tabs (Scrollable Pills) */}
        <div className="flex items-center gap-2 p-2.5 sm:px-6 sm:py-3.5 bg-slate-950/90 border-b border-slate-800 text-xs sm:text-sm font-bold overflow-x-auto custom-scrollbar shrink-0 shadow-inner">
          <button
            type="button"
            onClick={() => { setActiveTab('slides'); setEditingSlide(null); }}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all shrink-0 border ${
              activeTab === 'slides' 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_12px_rgba(0,240,255,0.25)] scale-[1.02]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <Tv className="w-4 h-4 text-cyan-400" />
            <span>Hero ({heroSlides.length})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('games'); setEditingGame(null); }}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all shrink-0 border ${
              activeTab === 'games' 
                ? 'bg-purple-500/20 text-purple-300 border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.25)] scale-[1.02]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-purple-400" />
            <span>Jeux ({games.length})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('deals'); setEditingDeal(null); }}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all shrink-0 border ${
              activeTab === 'deals' 
                ? 'bg-rose-500/20 text-rose-300 border-rose-400/60 shadow-[0_0_12px_rgba(244,63,94,0.25)] scale-[1.02]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Offres Flash ({flashDeals.length})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('consoles'); setEditingConsole(null); }}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all shrink-0 border ${
              activeTab === 'consoles' 
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/60 shadow-[0_0_12px_rgba(59,130,246,0.25)] scale-[1.02]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <HardDrive className="w-4 h-4 text-blue-400" />
            <span>Équipements ({consoles.length})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('services'); setEditingService(null); }}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all shrink-0 border ${
              activeTab === 'services' 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.25)] scale-[1.02]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>Services ({services.length})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('faqs'); setEditingFaq(null); }}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all shrink-0 border ${
              activeTab === 'faqs' 
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.25)] scale-[1.02]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>FAQ ({faqs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('reviews'); setEditingReview(null); }}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all shrink-0 border ${
              activeTab === 'reviews' 
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/60 shadow-[0_0_12px_rgba(234,179,8,0.25)] scale-[1.02]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <Star className="w-4 h-4 text-yellow-400" />
            <span>Avis ({reviews.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all shrink-0 border ${
              activeTab === 'messages' 
                ? 'bg-rose-500/20 text-rose-300 border-rose-400/60 shadow-[0_0_12px_rgba(244,63,94,0.25)] scale-[1.02]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-rose-400" />
            <span>Messages ({messages.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all shrink-0 border ${
              activeTab === 'config' 
                ? 'bg-teal-500/20 text-teal-300 border-teal-400/60 shadow-[0_0_12px_rgba(20,184,166,0.25)] scale-[1.02]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-teal-300" />
            <span>Contact & Site</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          
          {/* TAB 0: HERO SLIDES (NETFLIX CAROUSEL BANNER) */}
          {activeTab === 'slides' && (
            <div>
              {editingSlide ? (
                <form onSubmit={handleSaveSlide} className="glass-panel p-6 rounded-2xl border-cyan-500/30 space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="font-heading font-bold text-lg text-white">
                      {editingSlide === 'NEW' ? '➕ Ajouter une Image Paysage au Hero Netflix' : `✏️ Modifier : ${slideFormData.title}`}
                    </h3>
                    <button type="button" onClick={() => setEditingSlide(null)} className="text-xs text-slate-400 hover:text-white underline">Annuler</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Titre Principal du Jeu *</label>
                      <input type="text" required value={slideFormData.title} onChange={(e) => setSlideFormData({ ...slideFormData, title: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: Grand Theft Auto V" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Sous-titre / Baseline *</label>
                      <input type="text" required value={slideFormData.subtitle} onChange={(e) => setSlideFormData({ ...slideFormData, subtitle: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: Explorez Los Santos en 4K 60FPS Ray-Tracing" />
                    </div>
                  </div>

                  {/* SELECTABLE BADGES LIST */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Cliquez pour choisir un Badge Promo :</label>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_BADGES.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSlideFormData({ ...slideFormData, badge: b })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            slideFormData.badge === b 
                              ? 'bg-purple-600 text-white border-purple-400 shadow-md scale-105' 
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CHECKBOXES FOR PLATFORMS */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Cochez les Plateformes Disponibles :</label>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_PLATFORMS.map((plat) => {
                        const isChecked = Array.isArray(slideFormData.platforms) && slideFormData.platforms.includes(plat);
                        return (
                          <button
                            key={plat}
                            type="button"
                            onClick={() => toggleSlidePlatform(plat)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                              isChecked
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px] ${isChecked ? 'bg-cyan-400 border-cyan-400 text-black font-black' : 'border-slate-600'}`}>
                              {isChecked && '✓'}
                            </span>
                            <span>{plat}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEAM 16:9 4K BANNER IMPORTER (SANS CLÉ) */}
                  <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40 space-y-3 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/30 text-cyan-300 font-bold text-[10px] font-cyber tracking-wider border border-blue-400/30">
                          STEAM 16:9 HERO BANNER
                        </span>
                        <span className="text-xs font-bold text-white">Import Automatique Gratuit (Bannière 4K)</span>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-mono">Format 1920x1080 sans clé</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Entrez un AppID Steam (ex: 2358720 pour Wukong, 1245620 pour Elden Ring, 1778820 pour Tekken 8...)"
                        value={slideSteamAppIdInput}
                        onChange={(e) => setSlideSteamAppIdInput(e.target.value)}
                        className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-blue-500/30 text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="button"
                        onClick={handleImportSlideBySteamAppId}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 hover:from-blue-500 hover:to-cyan-400 shrink-0 shadow-lg active:scale-95 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Importer Bannière</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] text-purple-400 uppercase font-bold mr-1 self-center">🛠️ Prestations Services :</span>
                      {PRESET_SERVICE_SLIDES.map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setSlideFormData({
                            id: `slide-custom-${Date.now()}`,
                            type: 'service',
                            title: preset.title,
                            subtitle: preset.subtitle,
                            description: preset.description,
                            badge: preset.badge,
                            platforms: preset.platforms,
                            ctaText: preset.ctaText,
                            image: preset.banner,
                            targetSection: preset.targetSection
                          })}
                          className="px-2.5 py-1 rounded-lg bg-purple-950/80 text-purple-200 hover:text-white hover:bg-purple-800/80 text-[11px] border border-purple-500/40 font-medium transition-all"
                        >
                          + {preset.title.split(' ')[0]} {preset.title.split(' ')[1] || ''}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] text-cyan-400 uppercase font-bold mr-1 self-center">🎮 Jeux Vidéo Steam :</span>
                      {STEAM_POPULAR_GAMES.map((preset) => (
                        <button
                          key={preset.appId}
                          type="button"
                          onClick={() => handleQuickFillSlideFromSteam(preset)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 hover:text-cyan-300 hover:bg-blue-900/40 text-[11px] border border-slate-700 font-medium transition-all"
                          title={`Steam AppID: ${preset.appId}`}
                        >
                          + {preset.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <ImagePickerField
                    label="Image Paysage 16:9 (Bannière Hero Netflix)"
                    value={slideFormData.image}
                    onChange={(img) => setSlideFormData({ ...slideFormData, image: img })}
                    searchTitle={slideFormData.title}
                    searchType="banner"
                    aspect="16/9"
                    required
                  />

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Description / Résumé du Jeu</label>
                    <textarea rows={3} value={slideFormData.description} onChange={(e) => setSlideFormData({ ...slideFormData, description: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Résumé pour le grand bandeau Netflix..." />
                  </div>

                  <button type="submit" className="py-3 px-6 rounded-xl btn-cyber-primary font-bold text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder la bannière</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white">Carrousel Netflix Hero ({heroSlides.length} bannières)</h3>
                      <p className="text-xs text-slate-400">Ajoutez, modifiez ou supprimez autant d'images paysages que vous le souhaitez sans limite.</p>
                    </div>
                    <button onClick={() => handleOpenSlideForm()} className="w-full sm:w-auto py-2.5 px-4 rounded-xl btn-cyber-primary text-xs font-bold flex items-center justify-center gap-2 shrink-0">
                      <Plus className="w-4 h-4" />
                      <span>Ajouter une image paysage</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {heroSlides.map((slide, idx) => (
                      <div key={slide.id || idx} className="glass-panel rounded-2xl overflow-hidden border-slate-800 flex flex-col justify-between group">
                        <div className="relative h-40 overflow-hidden">
                          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-purple-600/90 text-white text-[10px] font-bold">{slide.badge}</span>
                          <span className="absolute bottom-2 left-2 text-white font-bold text-sm drop-shadow">#{idx + 1} {slide.title}</span>
                        </div>
                        <div className="p-4 space-y-2">
                          <p className="text-xs text-cyan-300 font-mono">{Array.isArray(slide.platforms) ? slide.platforms.join(' • ') : slide.platforms}</p>
                          <p className="text-xs text-slate-400 line-clamp-2">{slide.subtitle}</p>
                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                            <button onClick={() => handleOpenSlideForm(slide)} className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-bold text-xs flex items-center gap-1">
                              <Edit3 className="w-3.5 h-3.5" /> <span>Modifier</span>
                            </button>
                            <button onClick={() => handleDeleteSlide(slide.id)} className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white font-bold text-xs flex items-center gap-1">
                              <Trash2 className="w-3.5 h-3.5" /> <span>Supprimer</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 1: GAMES MANAGEMENT */}
          {activeTab === 'games' && (
            <div>
              {editingGame ? (
                <form onSubmit={handleSaveGame} className="glass-panel p-6 rounded-2xl border-cyan-500/30 space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="font-heading font-bold text-lg text-white">
                      {editingGame === 'NEW' ? '➕ Ajouter un Nouveau Jeu' : `✏️ Modifier : ${gameFormData.title}`}
                    </h3>
                    <button type="button" onClick={() => setEditingGame(null)} className="text-xs text-slate-400 hover:text-white underline">Annuler</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Titre du Jeu *</label>
                      <input type="text" required value={gameFormData.title} onChange={(e) => setGameFormData({ ...gameFormData, title: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: God of War Ragnarök" />
                    </div>

                    {/* SELECT DROPDOWN FOR GENRE */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Genre du Jeu (Faites défiler) *</label>
                      <select
                        value={gameFormData.genre}
                        onChange={(e) => setGameFormData({ ...gameFormData, genre: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold"
                      >
                        {AVAILABLE_GENRES.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    {/* SELECT DROPDOWN FOR YEAR */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Année de Sortie (Dérouler) *</label>
                      <select
                        value={gameFormData.year}
                        onChange={(e) => setGameFormData({ ...gameFormData, year: parseInt(e.target.value) || 2024 })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold"
                      >
                        {AVAILABLE_YEARS.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Taille d'Espace Stockage (ex: 85 GB)</label>
                      <input type="text" value={gameFormData.size} onChange={(e) => setGameFormData({ ...gameFormData, size: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: 50 GB" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Note de la Presse (1.0 à 5.0)</label>
                      <input type="number" step="0.1" value={gameFormData.rating} onChange={(e) => setGameFormData({ ...gameFormData, rating: parseFloat(e.target.value) || 4.8 })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                    </div>
                  </div>

                  {/* CHECKBOXES FOR PLATFORMS */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Plateformes Compatibles (Cochez pour choisir) :</label>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_PLATFORMS.map((plat) => {
                        const isChecked = Array.isArray(gameFormData.platforms) && gameFormData.platforms.includes(plat);
                        return (
                          <button
                            key={plat}
                            type="button"
                            onClick={() => toggleGamePlatform(plat)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                              isChecked
                                ? 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-[0_0_15px_rgba(157,0,255,0.3)]'
                                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px] ${isChecked ? 'bg-purple-400 border-purple-400 text-black font-black' : 'border-slate-600'}`}>
                              {isChecked && '✓'}
                            </span>
                            <span>{plat}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEAM API & CDN DIRECT IMPORTER (100% GRATUIT SANS CLÉ) */}
                  <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40 space-y-3 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/30 text-cyan-300 font-bold text-[10px] font-cyber tracking-wider border border-blue-400/30">
                          STEAM API & CDN HD
                        </span>
                        <span className="text-xs font-bold text-white">Import Automatique en 1 Clic (Sans Clé d'API)</span>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-mono">Format Jaquette 600x900 + Fond 16:9 4K</span>
                    </div>

                    {/* Quick Steam AppID Manual Input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Entrez un AppID Steam (ex: 2358720 pour Wukong, 1245620 pour Elden Ring, 1778820 pour Tekken 8...)"
                        value={steamAppIdInput}
                        onChange={(e) => setSteamAppIdInput(e.target.value)}
                        className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-blue-500/30 text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleImportBySteamAppId()}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 hover:from-blue-500 hover:to-cyan-400 shrink-0 shadow-lg active:scale-95 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Importer via Steam</span>
                      </button>
                    </div>

                    {/* Quick Steam Presets Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold mr-1 self-center">Hits Disponibles :</span>
                      {STEAM_POPULAR_GAMES.map((preset) => (
                        <button
                          key={preset.appId}
                          type="button"
                          onClick={() => handleQuickFillGame(preset)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 hover:text-cyan-300 hover:bg-blue-900/40 text-[11px] border border-slate-700 font-medium transition-all"
                          title={`Steam AppID: ${preset.appId}`}
                        >
                          + {preset.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ImagePickerField
                      label="Affiche Verticale du Jeu (Poster 3:4)"
                      value={gameFormData.cover}
                      onChange={(img) => setGameFormData({ ...gameFormData, cover: img })}
                      searchTitle={gameFormData.title}
                      searchType="cover"
                      aspect="3/4"
                      placeholder="Ex: https://... ou choisir une photo"
                      required
                    />

                    <ImagePickerField
                      label="Bannière Paysage 16:9 (Fiche Détail)"
                      value={gameFormData.banner}
                      onChange={(img) => setGameFormData({ ...gameFormData, banner: img })}
                      searchTitle={gameFormData.title}
                      searchType="banner"
                      aspect="16/9"
                      placeholder="Ex: https://... ou choisir une photo"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Description du Jeu</label>
                    <textarea rows={3} value={gameFormData.description} onChange={(e) => setGameFormData({ ...gameFormData, description: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Présentation du jeu..." />
                  </div>

                  <button type="submit" className="py-3 px-6 rounded-xl btn-cyber-primary font-bold text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder le jeu</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-heading font-bold text-lg text-white">Catalogue Actuel ({games.length} jeux)</h3>
                    <button onClick={() => handleOpenGameForm()} className="w-full sm:w-auto py-2.5 px-4 rounded-xl btn-cyber-primary text-xs font-bold flex items-center justify-center gap-2 shrink-0">
                      <Plus className="w-4 h-4" />
                      <span>Ajouter un jeu</span>
                    </button>
                  </div>
                  <div className="glass-panel rounded-2xl overflow-hidden border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 text-slate-400 font-cyber">
                        <tr>
                          <th className="p-3">Cover</th>
                          <th className="p-3">Titre</th>
                          <th className="p-3">Plateformes</th>
                          <th className="p-3">Genre</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {games.map((g) => (
                          <tr key={g.id} className="hover:bg-slate-800/50">
                            <td className="p-3"><img src={g.cover} alt={g.title} className="w-10 h-12 object-cover rounded" /></td>
                            <td className="p-3 font-bold text-white">{g.title}</td>
                            <td className="p-3 font-mono text-cyan-300">{Array.isArray(g.platforms) ? g.platforms.join(', ') : g.platforms}</td>
                            <td className="p-3 text-purple-300">{g.genre}</td>
                            <td className="p-3 text-right space-x-2">
                              <button onClick={() => handleOpenGameForm(g)} className="p-1.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black"><Edit3 className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleDeleteGame(g.id)} className="p-1.5 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white"><Trash2 className="w-3.5 h-3.5" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: FLASH DEALS & PROMOTIONS MANAGEMENT */}
          {activeTab === 'deals' && (
            <div>
              {editingDeal ? (
                <form onSubmit={handleSaveDeal} className="glass-panel p-6 rounded-2xl border-rose-500/30 space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="font-heading font-bold text-lg text-white">
                      {editingDeal === 'NEW' ? '🔥 Créer une Nouvelle Offre Flash' : `✏️ Modifier : ${dealFormData.title}`}
                    </h3>
                    <button type="button" onClick={() => setEditingDeal(null)} className="text-xs text-slate-400 hover:text-white underline">Annuler</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Titre de l'Offre *</label>
                      <input type="text" required value={dealFormData.title} onChange={(e) => setDealFormData({ ...dealFormData, title: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: Pack Promo Flash 4 Jeux PS4/PS5" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Badge Promotionnel *</label>
                      <input type="text" required value={dealFormData.badge} onChange={(e) => setDealFormData({ ...dealFormData, badge: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: 🔥 PROMO FLASH (4 JEUX)" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Sous-titre / Description de l'Offre *</label>
                    <input type="text" required value={dealFormData.subtitle} onChange={(e) => setDealFormData({ ...dealFormData, subtitle: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: 4 Blockbusters récents au choix (FC 25, GTA V, etc.)" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Prix Promo ($ USD) *</label>
                      <input type="number" required value={dealFormData.promoPrice} onChange={(e) => setDealFormData({ ...dealFormData, promoPrice: parseFloat(e.target.value) || 0 })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono font-bold text-emerald-400" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Prix Normal ($ USD)</label>
                      <input type="number" value={dealFormData.originalPrice} onChange={(e) => setDealFormData({ ...dealFormData, originalPrice: parseFloat(e.target.value) || 0 })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Pourcentage Réduction (%)</label>
                      <input type="number" value={dealFormData.discountPercentage} onChange={(e) => setDealFormData({ ...dealFormData, discountPercentage: parseInt(e.target.value) || 0 })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono" />
                    </div>
                  </div>

                  <ImagePickerField
                    label="Image Bannière de l'Offre Promotionnelle"
                    value={dealFormData.image}
                    onChange={(img) => setDealFormData({ ...dealFormData, image: img })}
                    searchTitle={dealFormData.title}
                    searchType="banner"
                    aspect="16/9"
                    required
                  />

                  <button type="submit" className="py-3 px-6 rounded-xl btn-cyber-primary font-bold text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" /> <span>Sauvegarder l'Offre Flash</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white">Offres Flash & Packs Promotionnels ({flashDeals.length})</h3>
                      <p className="text-xs text-slate-400">Gérez les réductions, les prix promo et les avantages affichés sur le site.</p>
                    </div>
                    <button onClick={() => handleOpenDealForm()} className="w-full sm:w-auto py-2.5 px-4 rounded-xl btn-cyber-primary text-xs font-bold flex items-center justify-center gap-2 shrink-0">
                      <Plus className="w-4 h-4" /> <span>Créer une offre flash</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {flashDeals.map((d) => (
                      <div key={d.id} className="glass-panel rounded-2xl overflow-hidden border-slate-800 flex flex-col justify-between group">
                        <div className="relative h-36 overflow-hidden">
                          <img src={d.image} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold">-{d.discountPercentage}%</span>
                          <span className="absolute bottom-2 left-2 text-white font-bold text-sm drop-shadow">{d.title}</span>
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex items-baseline justify-between text-xs">
                            <span className="text-slate-400 line-through font-mono">{d.originalPrice} $</span>
                            <span className="font-black text-emerald-400 text-base font-mono">{d.promoPrice} $</span>
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-2">{d.subtitle}</p>
                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                            <button onClick={() => handleOpenDealForm(d)} className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-bold text-xs flex items-center gap-1">
                              <Edit3 className="w-3.5 h-3.5" /> <span>Modifier</span>
                            </button>
                            <button onClick={() => handleDeleteDeal(d.id)} className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white font-bold text-xs flex items-center gap-1">
                              <Trash2 className="w-3.5 h-3.5" /> <span>Supprimer</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CONSOLES & EQUIPMENTS */}
          {activeTab === 'consoles' && (
            <div>
              {editingConsole ? (
                <form onSubmit={handleSaveConsole} className="glass-panel p-6 rounded-2xl border-blue-500/30 space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="font-heading font-bold text-lg text-white">{editingConsole === 'NEW' ? '➕ Ajouter un Équipement' : `✏️ Modifier : ${consoleFormData.name}`}</h3>
                    <button type="button" onClick={() => setEditingConsole(null)} className="text-xs text-slate-400 hover:text-white underline">Annuler</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nom du Matériel / Console *</label>
                      <input type="text" required value={consoleFormData.name} onChange={(e) => setConsoleFormData({ ...consoleFormData, name: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: PlayStation 5" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Marque *</label>
                      <select value={consoleFormData.brand} onChange={(e) => setConsoleFormData({ ...consoleFormData, brand: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold">
                        <option value="Sony">Sony (PlayStation)</option>
                        <option value="Microsoft">Microsoft (Xbox)</option>
                        <option value="Nintendo">Nintendo (Switch)</option>
                        <option value="PC Gaming">PC Gaming (Windows)</option>
                        <option value="Smartphone">Smartphone (Samsung/iPhone)</option>
                      </select>
                    </div>
                  </div>

                  <ImagePickerField
                    label="Image / Photo de l'Équipement ou Console"
                    value={consoleFormData.image}
                    onChange={(img) => setConsoleFormData({ ...consoleFormData, image: img })}
                    searchTitle={consoleFormData.name}
                    searchType="cover"
                    aspect="16/9"
                    placeholder="Ex: https://... ou choisir une photo"
                  />

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                    <textarea rows={3} value={consoleFormData.description} onChange={(e) => setConsoleFormData({ ...consoleFormData, description: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>

                  <button type="submit" className="py-3 px-6 rounded-xl btn-cyber-primary font-bold text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder l'équipement</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-heading font-bold text-lg text-white">Équipements et Consoles ({consoles.length})</h3>
                    <button onClick={() => handleOpenConsoleForm()} className="w-full sm:w-auto py-2.5 px-4 rounded-xl btn-cyber-primary text-xs font-bold flex items-center justify-center gap-2 shrink-0">
                      <Plus className="w-4 h-4" /> <span>Ajouter un équipement</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {consoles.map((c) => (
                      <div key={c.id} className="glass-panel p-4 rounded-xl border-slate-800 flex items-start gap-4">
                        <img src={c.image} alt={c.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm">{c.name}</span>
                            <span className="text-xs text-cyan-400 font-cyber font-bold">{c.badge}</span>
                          </div>
                          <p className="text-xs text-slate-400">{c.brand} • {c.compatibilityStatus}</p>
                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                            <button onClick={() => handleOpenConsoleForm(c)} className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold">Modifier</button>
                            <button onClick={() => handleDeleteConsole(c.id)} className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-bold">Supprimer</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SERVICES */}
          {activeTab === 'services' && (
            <div>
              {editingService ? (
                <form onSubmit={handleSaveService} className="glass-panel p-6 rounded-2xl border-emerald-500/30 space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="font-heading font-bold text-lg text-white">{editingService === 'NEW' ? '➕ Ajouter un Service' : `✏️ Modifier : ${serviceFormData.title}`}</h3>
                    <button type="button" onClick={() => setEditingService(null)} className="text-xs text-slate-400 hover:text-white underline">Annuler</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Titre du Service *</label>
                      <input type="text" required value={serviceFormData.title} onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Catégorie du Service (Faites défiler)</label>
                      <select value={serviceFormData.category} onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold">
                        <option value="Consoles">Consoles (PS5, PS4, Xbox, Switch)</option>
                        <option value="PC Gaming">PC Gaming (Formatage & Maintenance)</option>
                        <option value="GSM Mobile">GSM Mobile (FRP & Déblocage)</option>
                        <option value="Logiciels">Vente Logiciels & Windows</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                    <textarea rows={3} value={serviceFormData.description} onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>

                  <button type="submit" className="py-3 px-6 rounded-xl btn-cyber-primary font-bold text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder le service</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-heading font-bold text-lg text-white">Services et Prestations ({services.length})</h3>
                    <button onClick={() => handleOpenServiceForm()} className="w-full sm:w-auto py-2.5 px-4 rounded-xl btn-cyber-primary text-xs font-bold flex items-center justify-center gap-2 shrink-0">
                      <Plus className="w-4 h-4" /> <span>Ajouter un service</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((serv) => (
                      <div key={serv.id} className="glass-panel p-4 rounded-xl border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">{serv.title}</span>
                          <span className="text-cyan-400 font-bold text-xs px-2 py-0.5 rounded bg-cyan-500/20">{serv.badge}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{serv.description}</p>
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                          <button onClick={() => handleOpenServiceForm(serv)} className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold">Modifier</button>
                          <button onClick={() => handleDeleteService(serv.id)} className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-bold">Supprimer</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}



          {/* TAB 4: FAQS MANAGEMENT */}
          {activeTab === 'faqs' && (
            <div>
              {editingFaq ? (
                <form onSubmit={handleSaveFaq} className="glass-panel p-6 rounded-2xl border-amber-500/30 space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="font-heading font-bold text-lg text-white">{editingFaq === 'NEW' ? '➕ Ajouter une Question FAQ' : '✏️ Modifier la Question'}</h3>
                    <button type="button" onClick={() => setEditingFaq(null)} className="text-xs text-slate-400 hover:text-white underline">Annuler</button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Question Posee par le Client *</label>
                    <input type="text" required value={faqFormData.question} onChange={(e) => setFaqFormData({ ...faqFormData, question: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Réponse Officielle *</label>
                    <textarea rows={4} required value={faqFormData.answer} onChange={(e) => setFaqFormData({ ...faqFormData, answer: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>

                  <button type="submit" className="py-3 px-6 rounded-xl btn-cyber-primary font-bold text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" /> <span>Sauvegarder la FAQ</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-heading font-bold text-lg text-white">Foire Aux Questions ({faqs.length})</h3>
                    <button onClick={() => handleOpenFaqForm()} className="w-full sm:w-auto py-2.5 px-4 rounded-xl btn-cyber-primary text-xs font-bold flex items-center justify-center gap-2 shrink-0">
                      <Plus className="w-4 h-4" /> <span>Ajouter une question</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {faqs.map((f) => (
                      <div key={f.id} className="glass-panel p-4 rounded-xl border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">❓ {f.question}</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleOpenFaqForm(f)} className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold">Modifier</button>
                            <button onClick={() => handleDeleteFaq(f.id)} className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-bold">Supprimer</button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: REVIEWS MANAGEMENT */}
          {activeTab === 'reviews' && (
            <div>
              {editingReview ? (
                <form onSubmit={handleSaveReview} className="glass-panel p-6 rounded-2xl border-yellow-500/30 space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="font-heading font-bold text-lg text-white">{editingReview === 'NEW' ? '➕ Ajouter un Avis Client' : `✏️ Modifier : ${reviewFormData.name}`}</h3>
                    <button type="button" onClick={() => setEditingReview(null)} className="text-xs text-slate-400 hover:text-white underline">Annuler</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nom du Client *</label>
                      <input type="text" required value={reviewFormData.name} onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Console / Matériel *</label>
                      <input type="text" required value={reviewFormData.console} onChange={(e) => setReviewFormData({ ...reviewFormData, console: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Note (1-5 Étoiles)</label>
                      <select value={reviewFormData.rating} onChange={(e) => setReviewFormData({ ...reviewFormData, rating: parseInt(e.target.value) || 5 })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold">
                        <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ (4/5)</option>
                        <option value="3">⭐⭐⭐ (3/5)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Commentaire / Témoignage *</label>
                    <textarea rows={3} required value={reviewFormData.comment} onChange={(e) => setReviewFormData({ ...reviewFormData, comment: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>

                  <button type="submit" className="py-3 px-6 rounded-xl btn-cyber-primary font-bold text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" /> <span>Sauvegarder l'avis</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-heading font-bold text-lg text-white">Avis et Témoignages Clients ({reviews.length})</h3>
                    <button onClick={() => handleOpenReviewForm()} className="w-full sm:w-auto py-2.5 px-4 rounded-xl btn-cyber-primary text-xs font-bold flex items-center justify-center gap-2 shrink-0">
                      <Plus className="w-4 h-4" /> <span>Ajouter un avis</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.map((r) => (
                      <div key={r.id} className="glass-panel p-4 rounded-xl border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">⭐ {r.name} ({r.console})</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleOpenReviewForm(r)} className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold">Modifier</button>
                            <button onClick={() => handleDeleteReview(r.id)} className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-bold">Supprimer</button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300">"{r.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">Demandes Clients & Devis ({messages.length})</h3>
                  <p className="text-xs text-slate-400">Historique des commandes et demandes reçues depuis le site.</p>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center glass-panel rounded-2xl border-slate-800 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                    <MessageSquare className="w-7 h-7 text-rose-400" />
                  </div>
                  <h4 className="text-white font-bold text-sm">Aucun message pour le moment</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Toutes les demandes de packs, devis et diagnostics générés par les clients apparaîtront ici.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="glass-panel p-4 rounded-xl border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-cyan-300">{m.name} ({m.phone})</span>
                        <span className="text-slate-400 font-mono">{m.date}</span>
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <p><strong>Console :</strong> {m.console}</p>
                        <p><strong>Service :</strong> {m.service}</p>
                        {m.game && <p><strong>Jeu :</strong> {m.game}</p>}
                        {m.message && <p className="italic text-slate-400">"{m.message}"</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: CONFIG & SITE INFOS */}
          {activeTab === 'config' && (
            <form onSubmit={handleSaveConfig} className="glass-panel p-6 rounded-2xl border-slate-800 space-y-5">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Informations Générales & Contact</h3>
                <p className="text-xs text-slate-400">Configurez le numéro WhatsApp pour recevoir les commandes et modifier les textes du site.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Numéro WhatsApp de Réception *</label>
                  <input type="text" required value={configForm.phone || ''} onChange={(e) => setConfigForm({ ...configForm, phone: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono" placeholder="Ex: +243821780077" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Texte Bannière Supérieure Promo</label>
                  <input type="text" value={configForm.promoBanner || ''} onChange={(e) => setConfigForm({ ...configForm, promoBanner: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: ⚡ PROMO FLASH : -15% sur la Maintenance" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Texte Localisation / Prise en Charge</label>
                  <input type="text" value={configForm.location || ''} onChange={(e) => setConfigForm({ ...configForm, location: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: Atelier & Dépôt sécurisé (Kinshasa)" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Horaires d'Ouverture</label>
                  <input type="text" value={configForm.hours || ''} onChange={(e) => setConfigForm({ ...configForm, hours: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" placeholder="Ex: Lun - Sam : 08h00 - 20h00" />
                </div>
              </div>

              <button type="submit" className="py-3 px-6 rounded-xl btn-cyber-primary font-bold text-sm flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Enregistrer la configuration globale</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
