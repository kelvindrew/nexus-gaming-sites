export const INITIAL_CONSOLES = [
  {
    id: 'ps5',
    name: 'PlayStation 5 / PS5 Pro',
    brand: 'Sony',
    badge: 'Consoles Récentes',
    compatibilityStatus: 'Compatible (firmware <= 4.51 / 3.xx / 7.61 selon méthode)',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop',
    description: 'Services d\'optimisation, transfert de sauvegarde, configuration SSD M.2 et maintenance thermique haute performance.',
    availableServices: [
      'Configuration SSD M.2 NVMe Gen4',
      'Transfert & sauvegarde de données',
      'Nettoyage & remplacement métal liquide',
      'Installation de jeux possédés',
      'Support à distance & assistance'
    ]
  },
  {
    id: 'ps4',
    name: 'PlayStation 4 / PS4 Pro',
    brand: 'Sony',
    badge: '100% Compatible',
    compatibilityStatus: 'Modifiable (FW <= 9.00 USB / 11.00 PPPwn) | Entretien FW 11.02 à 13.52',
    image: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?q=80&w=800&auto=format&fit=crop',
    description: 'Le choix ultime pour débloquer le potentiel Homebrew, émulation rétro, custom themes et gestion de sauvegardes.',
    availableServices: [
      'Jailbreak / Déverrouillage GoldHEN',
      'Installation Homebrew Store & PKG',
      'Changement disque dur SSD 1TB / 2TB',
      'Changement pâte thermique noctua',
      'Packs de jeux possédés configurés'
    ]
  },
  {
    id: 'ps3',
    name: 'PlayStation 3 (Fat/Slim/SuperSlim)',
    brand: 'Sony',
    badge: 'CFW & HEN Ready',
    compatibilityStatus: 'Compatible 100% (CFW Evilnat / HEN Latest)',
    image: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?q=80&w=800&auto=format&fit=crop',
    description: 'La console vintage idéale pour le retrogaming PS1, PS2 et PS3 en 60FPS avec contrôle du ventilateur (WebMAN).',
    availableServices: [
      'Installation Custom Firmware (CFW 4.91)',
      'Installation PS3HEN + PKGi Direct Store',
      'Configuration Emulateurs (RetroArch/PS2)',
      'Optimisation vitesse ventilateur (WebMAN)',
      'Remplacement Pâte Thermique'
    ]
  },
  {
    id: 'pc-gaming',
    name: 'PC Gaming & Laptops',
    brand: 'Windows / Linux',
    badge: 'Maintenance & Software',
    compatibilityStatus: 'Prise en charge toutes marques (ASUS, MSI, HP, Dell, Custom Build)',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop',
    description: 'Maintenance matérielle PC, remplacement pâte thermique, formatage propre Windows 11 et installation de logiciels/licences officiels.',
    availableServices: [
      'Formatage & Réinstallation Windows 11 Pro',
      'Installation Pack Office (Word, Excel, PPT)',
      'Nettoyage & Changement Pâte Thermique',
      'Optimisation FPS & Drivers Graphiques',
      'Vente Clés d\'Activation Logiciels'
    ]
  },
  {
    id: 'smartphones',
    name: 'Smartphones & Tablettes',
    brand: 'Android & iOS',
    badge: 'Déverrouillage & Flash',
    compatibilityStatus: 'Compatible Samsung, iPhone, Xiaomi, Tecno, Infinix, Huawei...',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    description: 'Services de déverrouillage réseau, déblocage compte Google (FRP), réinitialisation mot de passe et flashage système d\'origine.',
    availableServices: [
      'Déblocage Compte Google (Contournement FRP)',
      'Déverrouillage Réseau tout opérateur',
      'Flashage & Restauration Firmware d\'origine',
      'Suppression Schéma / Code oublié',
      'Restauration Système iOS & Android'
    ]
  },
  {
    id: 'xbox-series',
    name: 'Xbox Series X / Series S',
    brand: 'Microsoft',
    badge: 'Mode Développeur',
    compatibilityStatus: 'Configuration Dev Mode / Retrogaming Emulation',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=800&auto=format&fit=crop',
    description: 'Transformez votre Xbox Series en station d\'émulation ultime 4K 60FPS sans perte de garantie.',
    availableServices: [
      'Activation & Setup Mode Développeur',
      'Installation RetroArch / XBSX2 / Dolphin',
      'Configuration du stockage externe USB 3.0',
      'Optimisation des profils & jeux',
      'Assistance & tutoriaux détaillés'
    ]
  },
  {
    id: 'handhelds',
    name: 'Nintendo Switch & Steam Deck',
    brand: 'Nintendo / Valve',
    badge: 'Portables & Modding',
    compatibilityStatus: 'Compatible (Atmosphère / SteamOS Custom)',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=800&auto=format&fit=crop',
    description: 'Modification consoles portables, cartes MicroSD haute vitesse, double boot EmuNAND et plugins sur-mesure.',
    availableServices: [
      'Installation Atmosphere / Hekate / EmuNAND',
      'Configuration MicroSD 256GB / 512GB / 1TB',
      'Installation Dual-Boot SteamOS / Windows',
      'Custom Themes & Plugins de Performance',
      'Protection ban & sécurité réseau'
    ]
  }
];

export const INITIAL_SERVICES = [
  {
    id: 'phone-unlock',
    title: 'Déverrouillage Téléphones & FRP',
    category: 'Mobile',
    badge: 'Déblocage Réseau',
    price: '15 $',
    iconName: 'Smartphone',
    description: 'Déblocage réseau tout opérateur, déverrouillage de compte Google FRP après réinitialisation et suppression de code/schéma oublié.',
    details: [
      'Déblocage Compte Google (Bypass FRP)',
      'Déverrouillage SIM tout opérateur',
      'Flashage ROM officielle d\'origine',
      'Suppression mot de passe / motif oublié'
    ],
    consoles: ['Samsung', 'iPhone', 'Xiaomi', 'Tecno', 'Infinix', 'Huawei']
  },
  {
    id: 'pc-maintenance',
    title: 'Maintenance PC & Formatage',
    category: 'PC',
    badge: 'Hardware & OS',
    price: '15 $',
    iconName: 'Laptop',
    description: 'Formatage et réinstallation propre de Windows 10/11 Pro avec pilotes officiels, dépoussiérage et changement de pâte thermique.',
    details: [
      'Installation propre Windows 11/10 Pro 64-bit',
      'Mise à jour intégrale des pilotes graphiques & carte mère',
      'Nettoyage interne & dépoussiérage ventilateurs',
      'Optimisation temps de démarrage & FPS'
    ],
    consoles: ['PC Gaming', 'Laptops', 'Bureautique']
  },
  {
    id: 'pc-game-setup',
    title: 'Installation de Jeux PC & Config',
    category: 'PC',
    badge: 'Optimisé 4K / FPS',
    price: '10 $',
    iconName: 'Gamepad2',
    description: 'Installation et optimisation de la bibliothèque de jeux PC possédés légalement. Configuration des pilotes DirectX, Visual C++, GPU Nvidia/AMD et répertoriage SSD.',
    details: [
      'Installation propre des jeux PC sur SSD NVMe/SATA',
      'Mise à jour DirectX, VCRedist & pilotes graphiques',
      'Optimisation des graphismes & FPS selon votre carte graphique',
      'Configuration des launchers & sauvegardes'
    ],
    consoles: ['PC Gaming', 'PC Portable', 'Windows 11/10']
  },
  {
    id: 'software-licences',
    title: 'Vente Licences & Logiciels',
    category: 'Software',
    badge: 'Clés Officielles',
    price: '10 $',
    iconName: 'KeyRound',
    description: 'Vente et activation de clés officielles pour Windows 11/10 Pro, Microsoft Office, Antivirus premium et logiciels de création.',
    details: [
      'Licences à vie Windows 11/10 Pro',
      'Suite Microsoft Office (Word, Excel, PowerPoint, Outlook)',
      'Antivirus & Sécurité Réseau 1 An',
      'Support & activation garantie'
    ],
    consoles: ['PC', 'Mac', 'Tablettes']
  },
  {
    id: 'modding',
    title: 'Déverrouillage & Custom Firmware',
    category: 'Modification',
    badge: 'Populaire',
    price: '20 $',
    iconName: 'Unlock',
    description: 'Modification et jailbreak sécurisé des consoles compatibles (PS4 GoldHEN, PS3 CFW/HEN, Switch Atmosphere, Xbox Dev Mode).',
    details: [
      'Installation de la version la plus stable du firmware',
      'Configuration des protections anti-bannissement',
      'Sauvegarde des clés uniques de la console (NAND/NOR)',
      'Notice explicative et vidéo de prise en main'
    ],
    consoles: ['PS4', 'PS3', 'Xbox Series', 'Switch']
  },
  {
    id: 'game-setup',
    title: 'Installation de Jeux & Remplissage',
    category: 'Jeux',
    badge: 'Service Clé en Main',
    price: '15 $',
    iconName: 'Gamepad2',
    description: 'Installation, transfert et configuration de votre sélection de jeux sur disque dur interne ou externe.',
    details: [
      'Copie et transfert haute vitesse sur SSD/HDD',
      'Mise à jour des jeux au dernier patch',
      'Installation des DLC et contenus additionnels',
      'Vérification de la fluidité et des sauvegardes'
    ],
    consoles: ['PS5', 'PS4', 'PS3', 'Xbox Series', 'Xbox One']
  },
  {
    id: 'homebrew',
    title: 'Logiciels & Homebrew Store',
    category: 'Software',
    badge: 'Custom Apps',
    price: '10 $',
    iconName: 'Cpu',
    description: 'Installation d\'applications indépendantes, lecteurs multimédia (Kodi, Apollo), gestionnaires de fichiers (FTP, WebMAN) et émulateurs.',
    details: [
      'RetroArch configuré avec BIOS optimisés',
      'Magasins d\'applications alternatifs',
      'Gestionnaire de ventilateur et températures',
      'Support du streaming PC vers console'
    ],
    consoles: ['PS4', 'PS3', 'Xbox Series', 'Switch']
  },
  {
    id: 'maintenance',
    title: 'Nettoyage & Pâte Thermique Console',
    category: 'Hardware',
    badge: 'Silencieux & Frais',
    price: '15 $',
    iconName: 'Wrench',
    description: 'Dépoussiérage intégral aux ultrasons et remplacement de la pâte thermique / métal liquide pour réduire le bruit des ventilateurs.',
    details: [
      'Démontage minutieux composant par composant',
      'Nettoyage du radiateur et des pales de ventilateur',
      'Application de pâte thermique de qualité premium (Arctic / Thermal Grizzly)',
      'Tests de stress température sous charge intense'
    ],
    consoles: ['PS5', 'PS4', 'PS3', 'Xbox Series', 'Xbox One']
  },
  {
    id: 'troubleshoot',
    title: 'Dépannage & Restauration Système',
    category: 'Réparation',
    badge: 'Urgence',
    price: '15 $',
    iconName: 'ShieldAlert',
    description: 'Résolution des boucles de démarrage, briques partielles, erreurs de mise à jour et remplacement de disque dur défectueux.',
    details: [
      'Diagnostic approfondi des codes erreurs',
      'Réinstallation propre du système officiel ou custom',
      'Récupération de données et sauvegardes si possible',
      'Optimisation des partitions de stockage'
    ],
    consoles: ['PS5', 'PS4', 'PS3', 'Xbox Series', 'Xbox One', 'Switch', 'PC', 'Téléphones']
  }
];

export const getDefaultPcRequirements = (game) => {
  const title = (game?.title || '').toLowerCase();
  const size = game?.size || '70 GB';
  const year = game?.year || 2024;
  const isHighEnd = year >= 2023 || (game?.popularity || 90) >= 95;

  let baseRequirements = {
    minimum: {
      resolution: '1080p @ 30 FPS (Paramètres Bas / Équilibré)',
      os: 'Windows 10 64-bit (Version 21H2 ou ultérieure)',
      cpu: isHighEnd ? 'Intel Core i5-8400 / AMD Ryzen 5 1600' : 'Intel Core i5-4460 / AMD FX-6300',
      gpu: isHighEnd ? 'NVIDIA GeForce GTX 1060 (6GB) / AMD Radeon RX 580 (8GB)' : 'NVIDIA GeForce GTX 960 (4GB) / AMD RX 470',
      ram: isHighEnd ? '16 GB RAM' : '8 GB RAM',
      storage: `${size} d'espace disponible (SSD recommandé)`,
      directx: 'DirectX 12'
    },
    recommended: {
      resolution: '1080p / 1440p @ 60 FPS (Paramètres Élevés)',
      os: 'Windows 10 / 11 64-bit',
      cpu: isHighEnd ? 'Intel Core i7-9700 / AMD Ryzen 5 5600X' : 'Intel Core i7-7700K / AMD Ryzen 5 3600',
      gpu: isHighEnd ? 'NVIDIA GeForce RTX 3060 (12GB) / AMD Radeon RX 6700 XT (12GB)' : 'NVIDIA GeForce RTX 2060 (6GB) / AMD RX 5600 XT',
      ram: '16 GB RAM Haute Vitesse Dual-Channel',
      storage: `${size} d'espace SSD NVMe M.2 requis`,
      directx: 'DirectX 12'
    },
    ultra: {
      resolution: '4K 2160p @ 60+ FPS (Ultra Ray-Tracing / DLSS 3.5 & FSR 3)',
      os: 'Windows 11 64-bit avec DirectStorage',
      cpu: 'Intel Core i7-14700K / AMD Ryzen 7 7800X3D',
      gpu: 'NVIDIA GeForce RTX 4080 / 4090 (16GB+) / AMD Radeon RX 7900 XTX',
      ram: '32 GB RAM DDR5',
      storage: `${size} d'espace SSD NVMe Gen4 Ultra-Rapide`,
      directx: 'DirectX 12 Ultimate'
    }
  };

  // Custom official specs for famous blockbusters
  if (title.includes('black myth') || title.includes('wukong')) {
    baseRequirements = {
      minimum: {
        resolution: '1080p @ 30 FPS (Low Settings / FSR)',
        os: 'Windows 10 / 11 64-bit',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 5 1600',
        gpu: 'NVIDIA GeForce GTX 1060 (6GB) / AMD Radeon RX 580 (8GB)',
        ram: '16 GB RAM',
        storage: '130 GB d\'espace SSD requis',
        directx: 'DirectX 12'
      },
      recommended: {
        resolution: '1080p @ 60 FPS (Medium/High Settings)',
        os: 'Windows 10 / 11 64-bit',
        cpu: 'Intel Core i7-9700 / AMD Ryzen 5 5500',
        gpu: 'NVIDIA GeForce RTX 2060 / RTX 3060 / AMD Radeon RX 5700 XT',
        ram: '16 GB RAM Dual-Channel',
        storage: '130 GB SSD M.2 NVMe',
        directx: 'DirectX 12'
      },
      ultra: {
        resolution: '4K @ 60 FPS (Ultra Full Ray-Tracing / DLSS 3.5 Frame Gen)',
        os: 'Windows 11 64-bit DirectStorage',
        cpu: 'Intel Core i7-14700K / AMD Ryzen 7 7800X3D',
        gpu: 'NVIDIA GeForce RTX 4080 Super (16GB) / RTX 4090',
        ram: '32 GB RAM DDR5',
        storage: '130 GB SSD NVMe Gen4',
        directx: 'DirectX 12 Ultimate'
      }
    };
  } else if (title.includes('cyberpunk')) {
    baseRequirements = {
      minimum: {
        resolution: '1080p @ 30 FPS (Low Settings)',
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i7-6700 / AMD Ryzen 5 1600',
        gpu: 'NVIDIA GeForce GTX 1060 (6GB) / AMD Radeon RX 580',
        ram: '12 GB RAM',
        storage: '75 GB SSD requis',
        directx: 'DirectX 12'
      },
      recommended: {
        resolution: '1080p / 1440p @ 60 FPS (High Settings)',
        os: 'Windows 10 / 11 64-bit',
        cpu: 'Intel Core i7-12700 / AMD Ryzen 7 7800X',
        gpu: 'NVIDIA GeForce RTX 2060 Super / RTX 3060 (12GB) / RX 5700 XT',
        ram: '16 GB RAM Dual-Channel',
        storage: '75 GB SSD NVMe',
        directx: 'DirectX 12'
      },
      ultra: {
        resolution: '4K @ 60+ FPS (Ray Tracing Overdrive / Path Tracing)',
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i9-13900K / AMD Ryzen 7 7800X3D',
        gpu: 'NVIDIA GeForce RTX 4080 / RTX 4090 (24GB)',
        ram: '32 GB RAM DDR5',
        storage: '75 GB SSD NVMe Gen4',
        directx: 'DirectX 12 Ultimate'
      }
    };
  } else if (title.includes('gta') || title.includes('grand theft auto')) {
    baseRequirements = {
      minimum: {
        resolution: '720p / 1080p @ 30 FPS (Normal)',
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core 2 Quad Q6600 / AMD Phenom 9850',
        gpu: 'NVIDIA GeForce 9800 GT 1GB / AMD HD 4870 1GB',
        ram: '4 GB RAM (8 GB Recommandés)',
        storage: '110 GB d\'espace disque',
        directx: 'DirectX 10 / 11'
      },
      recommended: {
        resolution: '1080p @ 60 FPS (Very High 60FPS)',
        os: 'Windows 10 / 11 64-bit',
        cpu: 'Intel Core i5-3470 / AMD FX-8350',
        gpu: 'NVIDIA GeForce GTX 1650 4GB / GTX 1060 / AMD RX 580',
        ram: '8 GB - 16 GB RAM',
        storage: '110 GB SSD Recommandé',
        directx: 'DirectX 11'
      },
      ultra: {
        resolution: '4K @ 60+ FPS (Ultra Settings + NVE & QuantV Mods 4K)',
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-10700K / AMD Ryzen 7 5800X',
        gpu: 'NVIDIA GeForce RTX 3070 / RTX 4070 (12GB) / RX 6800 XT',
        ram: '16 GB - 32 GB RAM',
        storage: '110 GB SSD NVMe M.2',
        directx: 'DirectX 12'
      }
    };
  } else if (title.includes('fc 24') || title.includes('fc 25') || title.includes('fifa')) {
    baseRequirements = {
      minimum: {
        resolution: '1080p @ 30-60 FPS (Low/Medium)',
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
        gpu: 'NVIDIA GeForce GTX 1050 Ti (4GB) / AMD Radeon RX 570 (4GB)',
        ram: '8 GB RAM',
        storage: '100 GB d\'espace disque',
        directx: 'DirectX 12'
      },
      recommended: {
        resolution: '1080p / 1440p @ 60-120 FPS (Ultra 60FPS)',
        os: 'Windows 10 / 11 64-bit',
        cpu: 'Intel Core i7-6700 / AMD Ryzen 7 2700X',
        gpu: 'NVIDIA GeForce GTX 1660 / RTX 2060 / AMD Radeon RX 5600 XT',
        ram: '12 GB - 16 GB RAM Dual-Channel',
        storage: '100 GB SSD M.2',
        directx: 'DirectX 12'
      },
      ultra: {
        resolution: '4K @ 120 FPS (Ultra HyperMotion V)',
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-12700 / AMD Ryzen 7 5700X',
        gpu: 'NVIDIA GeForce RTX 3070 / RTX 4070 / RX 6800',
        ram: '16 GB - 32 GB RAM',
        storage: '100 GB SSD NVMe M.2',
        directx: 'DirectX 12'
      }
    };
  }

  // Merge any custom game.pcRequirements safely
  if (game?.pcRequirements && typeof game.pcRequirements === 'object') {
    return {
      minimum: { ...baseRequirements.minimum, ...(game.pcRequirements.minimum || {}) },
      recommended: { ...baseRequirements.recommended, ...(game.pcRequirements.recommended || {}) },
      ultra: { ...baseRequirements.ultra, ...(game.pcRequirements.ultra || {}) }
    };
  }

  return baseRequirements;
};

import { MASSIVE_GAMES_CATALOG } from './massiveGameDatabase.js';

export const INITIAL_GAMES = MASSIVE_GAMES_CATALOG;

export const INITIAL_PACKS = {
  consolePacks: [
    {
      id: 'pack-ps4-goldhen',
      name: 'Formule PS4 GoldHEN VIP',
      target: 'PlayStation 4 (FAT / Slim / Pro)',
      price: '20 $',
      badge: 'Bestseller Atelier',
      features: [
        'Déverrouillage GoldHEN / PPPwn stable',
        'Installation ItemzFlow & PKGi Store Direct',
        'Protection anti-mise à jour & DNS sécurisés',
        'Pack 5 jeux inclus au choix',
        'Sauvegarde intégrale de vos données'
      ]
    },
    {
      id: 'pack-ps3-ultimate',
      name: 'Pack Rétrogaming PS3 Evilnat',
      target: 'PlayStation 3 (Toutes versions)',
      price: '15 $',
      badge: '100% Rétro',
      features: [
        'Custom Firmware Evilnat 4.91 / PS3HEN',
        'WebMAN MOD + Contrôle ventilateur actif',
        'Installation PKGi Store (Jeux PS1/PS2/PS3)',
        'RetroArch avec +5000 jeux rétro d\'arcade',
        'Remplacement pâte thermique inclus'
      ]
    },
    {
      id: 'pack-pc-gaming-pro',
      name: 'Forfait PC Gaming Master',
      target: 'PC Gamer & PC Portables',
      price: '25 $',
      badge: 'Performance Max',
      features: [
        'Formatage propre Windows 11 Pro 64-bit',
        'Licence Officielle Windows 11 Pro à vie',
        'Pack Microsoft Office 2024 Professionnel',
        'Optimisation Drivers GPU & Overclocking RAM',
        'Nettoyage physique & Pâte thermique Arctic'
      ]
    },
    {
      id: 'pack-phone-unlock-frp',
      name: 'Forfait Déblocage Smartphone & FRP',
      target: 'Samsung / Xiaomi / Tecno / Infinix / iPhone',
      price: '15 $',
      badge: 'Flash 30min',
      features: [
        'Contournement Compte Google (Bypass FRP)',
        'Déblocage Réseau SIM tout opérateur',
        'Suppression Code / Schéma oublié sans perte',
        'Flashage ROM d\'origine officielle',
        'Garantie de fonctionnement'
      ]
    }
  ],
  gamePacks: [
    {
      id: 'game-single',
      name: 'Unité (1 Jeu)',
      price: '5 $',
      unit: '/ jeu',
      features: [
        'Installation propre sur SSD/HDD/Console',
        'Dernière mise à jour et patchs inclus',
        'Vérification du fonctionnement'
      ]
    },
    {
      id: 'game-pack-3',
      name: 'Pack 3 Jeux',
      price: '15 $',
      unit: 'pack (5$/jeu)',
      features: [
        'Choix de 3 jeux au choix',
        'Installation des patchs et DLCs',
        'Transfert haute vitesse'
      ]
    },
    {
      id: 'game-pack-4-promo',
      name: 'Pack Promo 4 Gros Jeux Récentes',
      price: '35 $',
      unit: 'pack promo',
      popular: true,
      features: [
        '4 Blockbusters récents au choix (FC 25, GTA V, etc.)',
        'Mises à jour et DLCs complets',
        'Transfert ultra-rapide offert',
        'Économie de 10 $'
      ]
    },
    {
      id: 'game-custom-storage',
      name: 'Remplissage Disque Dur (500Go / 1To / 2To)',
      price: '60 $',
      unit: 'forfait 1 To',
      features: [
        '500 Go (~8-10 jeux) : 35 $',
        '1 To (~18-25 jeux) : 60 $',
        '2 To (~40-50 jeux) : 100 $',
        'Support & transfert atelier'
      ]
    }
  ]
};

export const INITIAL_FLASH_DEALS = [
  {
    id: 'deal-ps4-4games',
    title: 'Pack Promo Flash 4 Jeux PS4 / PS5',
    subtitle: '4 Nouveautés & Blockbusters au Choix (FC 25, GTA V, Spider-Man 2, Black Myth, etc.)',
    badge: '🔥 PROMO WEEK-END (4 JEUX)',
    originalPrice: 45,
    promoPrice: 35,
    discountPercentage: 22,
    expiresInHours: 48,
    image: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?q=80&w=800&auto=format&fit=crop',
    platforms: ['PS5', 'PS4 Fat', 'PS4 Slim', 'PS4 Pro'],
    features: ['4 Jeux récents au choix', 'Derniers patchs & DLCs installés', 'Transfert haute vitesse', 'Garantie atelier']
  },
  {
    id: 'deal-ps3-hen',
    title: 'Pack Flash PS3 HEN + 5 Jeux',
    subtitle: 'Flash HEN 4.91 / CFW Evilnat + Multiman + 5 Jeux PS3 / PS2 au Choix',
    badge: '⚡ FLASH RÉTRO PS3',
    originalPrice: 30,
    promoPrice: 20,
    discountPercentage: 33,
    expiresInHours: 24,
    image: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?q=80&w=800&auto=format&fit=crop',
    platforms: ['PS3 Fat', 'PS3 Slim', 'PS3 Super Slim'],
    features: ['Flash HEN 4.91 officiel', 'Boutique PKGi en direct', 'Contrôle ventilateur WebMAN', '5 Jeux installés au choix']
  },
  {
    id: 'deal-pc-gamer',
    title: 'Pack Renaissance PC & Laptop',
    subtitle: 'Formatage Windows 11 Pro + Suite Office 2024 + Nettoyage + Pâte Thermique',
    badge: '🏆 PACK MASTER PC',
    originalPrice: 35,
    promoPrice: 25,
    discountPercentage: 28,
    expiresInHours: 72,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop',
    platforms: ['PC Portable', 'PC Fixe Gaming', 'Toutes Marques'],
    features: ['Windows 11 Pro activé', 'Pack Office Pro complet', 'Nettoyage & Arctic MX-4', 'Pilotes optimisés']
  }
];

export const INITIAL_FAQS = [
  {
    id: 1,
    question: "Proposez-vous le déverrouillage de smartphones (Samsung, iPhone, Tecno, Xiaomi...) ?",
    answer: "Oui ! Nous proposons le déblocage réseau tout opérateur, le contournement des comptes Google (Bypass FRP après réinitialisation), la suppression des mots de passe/schémas oubliés ainsi que le flashage de firmwares d'origine officiels."
  },
  {
    id: 2,
    question: "Quels sont vos services de maintenance PC & ordinateurs ?",
    answer: "Nous assurons le formatage propre de Windows 10/11 Pro, la réinstallation des pilotes, le dépoussiérage complet, le changement de pâte thermique pour réduire la chauffe, ainsi que la vente et l'activation de licences officielles (Windows Pro, Pack Office Word/Excel/PowerPoint, Antivirus)."
  },
  {
    id: 3,
    question: "Est-ce légal d'installer des jeux sur ma console ou mon PC ?",
    answer: "Oui, à condition que vous possédiez légalement la copie originale ou la licence du jeu. Nos prestations consistent exclusivement en des services d'assistance technique, de modification logicielle, de maintenance matérielle et de configuration pour vos propres copies de jeux légitimement acquises."
  },
  {
    id: 4,
    question: "Combien de temps prend une intervention ?",
    answer: "Pour un déblocage smartphone, une installation de jeux ou un formatage PC, l'intervention dure généralement entre 1 et 3 heures. Pour un nettoyage complet avec remplacement de pâte thermique ou une modification complexe, comptez 24h ouvrées."
  },
  {
    id: 5,
    question: "Comment se déroule la prise en charge sur WhatsApp ?",
    answer: "Vous sélectionnez votre équipement (Console, PC, Téléphone), votre service ou votre pack, puis vous cliquez sur 'Demander un service' ou 'WhatsApp'. Un message pré-rempli s'ouvre automatiquement dans WhatsApp avec vos informations vers le +243821780077."
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Alexandre M.',
    console: 'PlayStation 4 Pro (GoldHEN)',
    rating: 5,
    comment: 'Service ultra rapide et pro ! Ma PS4 Pro ne fait plus aucun bruit après le changement de pâte thermique et la config GoldHEN est parfaite.',
    date: 'Il y a 3 jours'
  },
  {
    id: 2,
    name: 'Michel K.',
    console: 'Samsung Galaxy & PC Gaming',
    rating: 5,
    comment: 'Déblocage FRP du compte Google sur mon Samsung en 30min et formatage Windows 11 Pro sur mon PC portable. Contact au top sur WhatsApp !',
    date: 'Il y a 5 jours'
  },
  {
    id: 3,
    name: 'Karim B.',
    console: 'Xbox Series X (Dev Mode)',
    rating: 5,
    comment: 'J\'ai pu faire installer le mode développeur et RetroArch avec tous mes émulateurs rétro. C\'est juste magique en 4K 60FPS !',
    date: 'Il y a 1 semaine'
  },
  {
    id: 4,
    name: 'Julien D.',
    console: 'PlayStation 5 (Pack SSD 2TB)',
    rating: 5,
    comment: 'Installation du SSD M.2 2TB et transfert de ma bibliothèque en 1h. Contact super agréable sur WhatsApp et explications très claires.',
    date: 'Il y a 2 semaines'
  }
];

export const INITIAL_CONFIG = {
  phone: '+243821780077',
  whatsappMessageHeader: 'Bonjour NEXUS GAMING, je souhaite demander une prestation :',
  location: 'Atelier & Dépôt sécurisé (Livraison et expédition disponibles)',
  hours: 'Lun - Sam : 08h00 - 20h00',
  promoBanner: '⚡ PROMO FLASH : -15% sur la Maintenance PC, Déblocage Téléphone & Packs Jeux avec le code NEXUS15 !'
};

export const INITIAL_HERO_SLIDES = [
  {
    id: 'slide-jailbreak',
    type: 'service',
    targetSection: 'consoles',
    title: 'Jailbreak & Déblocage Consoles Pro',
    subtitle: 'PS4 GoldHEN, PS3 HEN/CFW, Switch Atmosphere & Xbox RGH',
    description: 'Débridez tout le potentiel de votre console en atelier : installation Homebrew Store, émulateurs rétro, jeux et personnalisations sans risque matériel.',
    platforms: ['PS4', 'PS3', 'Switch', 'Xbox 360'],
    badge: 'ATELIER & FLASH EXPERT',
    ctaText: 'Commander un Déblocage WhatsApp',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop'
  },
  {
    id: 'slide-wukong',
    type: 'game',
    targetSection: 'catalog',
    title: 'Black Myth: Wukong',
    subtitle: 'Incarnez le Prédestiné sous Unreal Engine 5 en 4K 60FPS',
    description: 'Le chef-d\'œuvre RPG d\'action légendaire inspiré de la mythologie chinoise avec des combats de boss monumentaux et optimisation PC & PS5.',
    platforms: ['PS5', 'PC Gaming'],
    badge: 'HIT MONDIAL 2024',
    ctaText: 'Demander ce jeu sur WhatsApp',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_hero.jpg'
  },
  {
    id: 'slide-reinstallation-pc',
    type: 'service',
    targetSection: 'services',
    title: 'Formatage & Réinstallation PC Gaming',
    subtitle: 'Windows 11 Pro Propre, Drivers GPU Optimisés & Boost FPS',
    description: 'Remise à neuf complète de votre ordinateur portable ou fixe : suppression des virus, optimisation des performances graphiques et pack logiciels essentiels.',
    platforms: ['PC Gaming', 'Laptops', 'Bureautique'],
    badge: 'MAINTENANCE & OPTIMISATION',
    ctaText: 'Optimiser mon PC sur WhatsApp',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1920&auto=format&fit=crop'
  },
  {
    id: 'slide-gta-v',
    type: 'game',
    targetSection: 'catalog',
    title: 'Grand Theft Auto V: Enhanced',
    subtitle: 'Explorez Los Santos en 4K 60FPS Ray-Tracing & Temps Réduit',
    description: 'La version ultime optimisée pour PS5, PS4 et PC avec des temps de chargement ultra-rapides, graphismes 4K et packs mods exclusifs.',
    platforms: ['PS5', 'PC Gaming', 'Xbox Series X/S', 'PS4'],
    badge: 'TOP VENTES #1',
    ctaText: 'Demander GTA V sur WhatsApp',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_hero.jpg'
  },
  {
    id: 'slide-depannage-thermique',
    type: 'service',
    targetSection: 'services',
    title: 'Dépannage, Réparation & Nettoyage Thermique',
    subtitle: 'Pâte Thermique Noctua, Métal Liquide PS5, Port HDMI & Alimentation',
    description: 'Votre console fait du bruit ou surchauffe ? Nous réalisons le dépoussiérage intégral, le remplacement de pâte thermique et la réparation micro-électronique.',
    platforms: ['PS5', 'PS4', 'PS3', 'Xbox', 'PC'],
    badge: 'RÉPARATION ATELIER GARANTIE',
    ctaText: 'Demander un Dépannage WhatsApp',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop'
  },
  {
    id: 'slide-fc-25',
    type: 'game',
    targetSection: 'catalog',
    title: 'EA SPORTS FC 25',
    subtitle: 'FC IQ Tactique & Moteur Frostbite Nouvelle Génération',
    description: 'La référence du football mondial avec modes Carrière et Clubs repensés, effectifs 2024/2025 actualisés et gameplay ultra-réaliste.',
    platforms: ['PS5', 'PS4', 'PC Gaming', 'Xbox', 'Switch'],
    badge: 'FOOTBALL #1',
    ctaText: 'Demander EA FC sur WhatsApp',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_hero.jpg'
  },
  {
    id: 'slide-deblocage-frp',
    type: 'service',
    targetSection: 'services',
    title: 'Déblocage Compte Google (FRP) & Flash GSM',
    subtitle: 'Samsung, iPhone, Xiaomi, Tecno, Infinix, Huawei & Restauration Système',
    description: 'Contournement FRP sécurisé, déverrouillage réseau tous opérateurs, suppression code/schéma oublié et réinstallation firmware d\'origine.',
    platforms: ['Android', 'iOS', 'Smartphones', 'Tablettes'],
    badge: 'DÉVERROUILLAGE GSM RAPIDE',
    ctaText: 'Débloquer mon Téléphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1920&auto=format&fit=crop'
  },
  {
    id: 'slide-packs-disques',
    type: 'service',
    targetSection: 'pack-builder',
    title: 'Remplissage Disques Durs & Packs Jeux Clés en Main',
    subtitle: 'Disques Externes & Internes 500GB, 1TB, 2TB & 4TB Prêts à Jouer',
    description: 'Choisissez vos jeux favoris et repartez avec votre disque dur externe ou console entièrement chargée et configurée par nos techniciens.',
    platforms: ['PS4', 'PS3', 'PC Gaming', 'Rétrogaming'],
    badge: 'PACKS TOUT COMPRIS',
    ctaText: 'Composer mon Pack de Jeux',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1920&auto=format&fit=crop'
  },
  {
    id: 'slide-gow-ragnarok',
    type: 'game',
    targetSection: 'catalog',
    title: 'God of War Ragnarök',
    subtitle: 'Kratos & Atreus dans la saga nordique légendaire en 120Hz',
    description: 'Parcourez les Neuf Royaumes dans ce chef-d\'œuvre PlayStation acclamé avec mode performance 120Hz et doublage VF intégral.',
    platforms: ['PS5', 'PS4', 'PC Gaming'],
    badge: 'HÉRITAGE PLAYSTATION',
    ctaText: 'Demander God of War sur WhatsApp',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_hero.jpg'
  },
  {
    id: 'slide-cyberpunk-2077',
    type: 'game',
    targetSection: 'catalog',
    title: 'Cyberpunk 2077: Phantom Liberty',
    subtitle: 'Night City en Ultra Ray-Tracing & DLSS 3.5 avec Mods Graphiques',
    description: 'Devenez V dans la mégapole obsédée par le pouvoir, avec l\'extension d\'espionnage Phantom Liberty et pack de mods graphiques.',
    platforms: ['PC Gaming', 'PS5', 'Xbox Series X/S'],
    badge: 'BEST-SELLER PC 4K',
    ctaText: 'Demander Cyberpunk sur WhatsApp',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg'
  }
];
