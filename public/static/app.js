// Global variables
let currentLang = 'ko';
let faqData = null;
let menuData = null;
let platformTexts = {};

// Language translations
const translations = {
  ko: {
    chatbotTitle: 'Benefit 챗봇',
    chatbotSubtitle: '무엇을 도와드릴까요?',
    welcomeMessage: '안녕하세요! Benefit 플랫폼 도우미입니다. 궁금하신 점을 선택해주세요.'
  },
  en: {
    chatbotTitle: 'Benefit Chatbot',
    chatbotSubtitle: 'How can I help you?',
    welcomeMessage: 'Hello! I\'m the Benefit platform assistant. Please select a question.'
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing app...');
  
  // Initialize platform language selector
  initPlatformLanguage();
  
  // Load menu data
  loadMenu();
  
  // Initialize chatbot
  initChatbot();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Smooth scrolling
  initSmoothScroll();
});

// Platform language data
const platformLanguages = {
  ko: {
    heroTitle: '지역화폐 O2O 플랫폼',
    heroSubtitle: 'Benefit',
    heroDesc: '지역 소상공인의 디지털 전환 지원\n지역화폐 연계로 상권 자생력 강화\n새로운 지역 일자리 창출',
    btnStart: '서비스 시작',
    btnDetail: '자세히 보기',
    sectionServices: '주요 서비스',
    sectionBenefits: '세 가지 핵심 혜택',
    benefit1Title: '소상공인 부담 감소',
    benefit1Desc: '민간 플랫폼 대비 수수료 1~2%로 대폭 절감',
    benefit2Title: '지역경제 선순환',
    benefit2Desc: '지역화폐 이용률 확대 및 수수료 지역 내 환류',
    benefit3Title: '일자리 창출',
    benefit3Desc: '1개 시군 기준 80~150명 직간접 고용',
    sectionAllServices: '전체 서비스 메뉴'
  },
  en: {
    heroTitle: 'Local Currency O2O Platform',
    heroSubtitle: 'Benefit',
    heroDesc: 'Supporting digital transformation of local small businesses\nStrengthening commercial districts through local currency linkage\nCreating new local jobs',
    btnStart: 'Get Started',
    btnDetail: 'Learn More',
    sectionServices: 'Main Services',
    sectionBenefits: 'Three Core Benefits',
    benefit1Title: 'Reduced Burden for Small Businesses',
    benefit1Desc: 'Commission reduced to 1-2% compared to private platforms',
    benefit2Title: 'Local Economic Circulation',
    benefit2Desc: 'Increased local currency usage and fee recirculation',
    benefit3Title: 'Job Creation',
    benefit3Desc: '80-150 direct and indirect jobs per city/county',
    sectionAllServices: 'All Services'
  },
  zh: {
    heroTitle: '地区货币 O2O 平台',
    heroSubtitle: 'Benefit',
    heroDesc: '支持本地小企业数字化转型\n通过地区货币连接增强商圈活力\n创造新的地区就业机会',
    btnStart: '开始使用',
    btnDetail: '了解更多',
    sectionServices: '主要服务',
    sectionBenefits: '三大核心优势',
    benefit1Title: '减轻小企业负担',
    benefit1Desc: '手续费降至1-2%，远低于私营平台',
    benefit2Title: '地区经济良性循环',
    benefit2Desc: '扩大地区货币使用，手续费在地区内流通',
    benefit3Title: '创造就业',
    benefit3Desc: '每个市/县创造80-150个直接和间接就业',
    sectionAllServices: '所有服务'
  },
  ja: {
    heroTitle: '地域通貨 O2O プラットフォーム',
    heroSubtitle: 'Benefit',
    heroDesc: '地域の小規模事業者のデジタル転換を支援\n地域通貨連携で商圏の自生力を強化\n新しい地域雇用を創出',
    btnStart: 'サービス開始',
    btnDetail: '詳細を見る',
    sectionServices: '主要サービス',
    sectionBenefits: '3つの核心メリット',
    benefit1Title: '小規模事業者の負担軽減',
    benefit1Desc: '手数料を民間プラットフォームより1~2%に大幅削減',
    benefit2Title: '地域経済の好循環',
    benefit2Desc: '地域通貨利用率拡大および手数料の域内還流',
    benefit3Title: '雇用創出',
    benefit3Desc: '1つの市・郡基準で80~150名の直接・間接雇用',
    sectionAllServices: '全サービスメニュー'
  },
  vi: {
    heroTitle: 'Nền tảng O2O Tiền tệ Địa phương',
    heroSubtitle: 'Benefit',
    heroDesc: 'Hỗ trợ chuyển đổi số cho doanh nghiệp nhỏ địa phương\nTăng cường sức sống khu thương mại thông qua liên kết tiền tệ địa phương\nTạo việc làm mới cho địa phương',
    btnStart: 'Bắt đầu',
    btnDetail: 'Tìm hiểu thêm',
    sectionServices: 'Dịch vụ chính',
    sectionBenefits: 'Ba lợi ích cốt lõi',
    benefit1Title: 'Giảm gánh nặng cho doanh nghiệp nhỏ',
    benefit1Desc: 'Phí hoa hồng giảm xuống 1-2% so với nền tảng tư nhân',
    benefit2Title: 'Tuần hoàn kinh tế địa phương',
    benefit2Desc: 'Tăng tỷ lệ sử dụng tiền tệ địa phương và tái lưu thông phí',
    benefit3Title: 'Tạo việc làm',
    benefit3Desc: '80-150 việc làm trực tiếp và gián tiếp cho mỗi thành phố/huyện',
    sectionAllServices: 'Tất cả dịch vụ'
  },
  th: {
    heroTitle: 'แพลตฟอร์ม O2O สกุลเงินท้องถิ่น',
    heroSubtitle: 'Benefit',
    heroDesc: 'สนับสนุนการเปลี่ยนแปลงทางดิจิทัลของธุรกิจขนาดเล็กในท้องถิ่น\nเสริมสร้างความเข้มแข็งของย่านการค้าผ่านการเชื่อมโยงสกุลเงินท้องถิ่น\nสร้างงานใหม่ในท้องถิ่น',
    btnStart: 'เริ่มใช้งาน',
    btnDetail: 'เรียนรู้เพิ่มเติม',
    sectionServices: 'บริการหลัก',
    sectionBenefits: 'สามประโยชน์หลัก',
    benefit1Title: 'ลดภาระธุรกิจขนาดเล็ก',
    benefit1Desc: 'ค่าคอมมิชชันลดเหลือ 1-2% เมื่อเทียบกับแพลตฟอร์มเอกชน',
    benefit2Title: 'การหมุนเวียนเศรษฐกิจท้องถิ่น',
    benefit2Desc: 'เพิ่มการใช้สกุลเงินท้องถิ่นและค่าธรรมเนียมหมุนเวียนในพื้นที่',
    benefit3Title: 'สร้างงาน',
    benefit3Desc: 'สร้างงานทางตรงและทางอ้อม 80-150 ตำแหน่งต่อเมือง/อำเภอ',
    sectionAllServices: 'บริการทั้งหมด'
  },
  ar: {
    heroTitle: 'منصة O2O للعملة المحلية',
    heroSubtitle: 'Benefit',
    heroDesc: 'دعم التحول الرقمي للشركات الصغيرة المحلية\nتعزيز المناطق التجارية من خلال ربط العملة المحلية\nخلق فرص عمل محلية جديدة',
    btnStart: 'ابدأ الآن',
    btnDetail: 'معرفة المزيد',
    sectionServices: 'الخدمات الرئيسية',
    sectionBenefits: 'ثلاث فوائد أساسية',
    benefit1Title: 'تقليل العبء على الشركات الصغيرة',
    benefit1Desc: 'خفض العمولة إلى 1-2٪ مقارنة بالمنصات الخاصة',
    benefit2Title: 'الدورة الاقتصادية المحلية',
    benefit2Desc: 'زيادة استخدام العملة المحلية وإعادة تدوير الرسوم',
    benefit3Title: 'خلق فرص العمل',
    benefit3Desc: '80-150 وظيفة مباشرة وغير مباشرة لكل مدينة/مقاطعة',
    sectionAllServices: 'جميع الخدمات'
  }
};

// Initialize platform language selector
function initPlatformLanguage() {
  const languageToggle = document.getElementById('languageToggle');
  const languageDropdown = document.getElementById('languageDropdown');
  const langOptions = document.querySelectorAll('.lang-option');
  
  if (!languageToggle || !languageDropdown) return;
  
  // Toggle dropdown
  languageToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    languageDropdown.classList.toggle('show');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
      languageDropdown.classList.remove('show');
    }
  });
  
  // Language option click
  langOptions.forEach(function(option) {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const selectedLang = this.dataset.lang;
      const selectedText = this.dataset.text;
      
      // Update active state
      langOptions.forEach(function(opt) {
        opt.classList.remove('active');
        opt.querySelector('i').classList.add('invisible');
      });
      this.classList.add('active');
      this.querySelector('i').classList.remove('invisible');
      
      // Update button text
      document.getElementById('currentLangText').textContent = selectedText;
      
      // Close dropdown
      languageDropdown.classList.remove('show');
      
      // Update platform language
      currentLang = selectedLang;
      updatePlatformLanguage(selectedLang);
      
      console.log('Platform language changed to:', selectedLang);
    });
  });
}

// Update platform language
function updatePlatformLanguage(lang) {
  const texts = platformLanguages[lang] || platformLanguages.ko;
  platformTexts = texts;
  
  // Update Hero section
  const heroTitle = document.querySelector('.hero-banner h1');
  const heroSubtitle = document.querySelector('.hero-banner h2');
  const heroDesc = document.querySelector('.hero-banner p');
  
  if (heroTitle) heroTitle.textContent = texts.heroTitle;
  if (heroSubtitle) heroSubtitle.textContent = texts.heroSubtitle;
  if (heroDesc) {
    heroDesc.innerHTML = texts.heroDesc.split('\n').join('<br class="hidden md:inline">');
  }
  
  // Update buttons
  const btnStart = document.querySelector('a[href="#features"]');
  const btnDetail = document.querySelector('a[href="#benefits"]');
  if (btnStart) btnStart.textContent = texts.btnStart;
  if (btnDetail) btnDetail.textContent = texts.btnDetail;
  
  // Update section titles
  const sectionTitles = document.querySelectorAll('h2');
  if (sectionTitles[0]) sectionTitles[0].textContent = texts.sectionServices;
  if (sectionTitles[1]) sectionTitles[1].textContent = texts.sectionBenefits;
  if (sectionTitles[2]) sectionTitles[2].textContent = texts.sectionAllServices;
  
  // Update benefit cards
  const benefitCards = document.querySelectorAll('#benefits .card-hover');
  if (benefitCards[0]) {
    benefitCards[0].querySelector('h3').textContent = texts.benefit1Title;
    benefitCards[0].querySelector('p').textContent = texts.benefit1Desc;
  }
  if (benefitCards[1]) {
    benefitCards[1].querySelector('h3').textContent = texts.benefit2Title;
    benefitCards[1].querySelector('p').textContent = texts.benefit2Desc;
  }
  if (benefitCards[2]) {
    benefitCards[2].querySelector('h3').textContent = texts.benefit3Title;
    benefitCards[2].querySelector('p').textContent = texts.benefit3Desc;
  }
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Load menu from API
function loadMenu() {
  console.log('Loading menu...');
  
  fetch('/api/menu')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('Menu data loaded:', data);
      menuData = data;
      renderMainNav();
      renderQuickMenu();
      renderFeaturesGrid();
    })
    .catch(function(error) {
      console.error('Failed to load menu:', error);
    });
}

// Render main navigation
function renderMainNav() {
  const navEl = document.getElementById('mainNav');
  if (!navEl || !menuData) return;
  
  const navHTML = menuData.mainMenu.map(function(item) {
    if (item.subMenu) {
      return `
        <div class="nav-item relative px-3 py-2">
          <button class="text-white hover:text-gray-200 flex items-center gap-2">
            <i class="fas ${item.icon}"></i>
            <span>${item.name}</span>
            <i class="fas fa-chevron-down text-xs"></i>
          </button>
          <div class="nav-dropdown">
            ${item.subMenu.map(function(sub) {
              return `
                <div class="nav-dropdown-item flex items-center gap-3">
                  <i class="fas ${sub.icon} text-purple-600"></i>
                  <span>${sub.name}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else {
      return `
        <a href="${item.path}" class="px-3 py-2 text-white hover:text-gray-200 flex items-center gap-2">
          <i class="fas ${item.icon}"></i>
          <span>${item.name}</span>
        </a>
      `;
    }
  }).join('');
  
  navEl.innerHTML = navHTML;
}

// Render quick menu cards
function renderQuickMenu() {
  const quickMenuEl = document.getElementById('quickMenu');
  if (!quickMenuEl || !menuData) return;
  
  // Show first 4 main services
  const quickItems = menuData.mainMenu.slice(1, 5);
  
  const quickHTML = quickItems.map(function(item, index) {
    const gradients = [
      'gradient-bg',
      'gradient-bg-2',
      'gradient-bg-3',
      'gradient-bg'
    ];
    
    return `
      <div class="quick-menu-card">
        <div class="quick-menu-icon ${gradients[index]}">
          <i class="fas ${item.icon} text-white"></i>
        </div>
        <h3 class="font-bold text-lg mb-2">${item.name}</h3>
        <p class="text-gray-600 text-sm">
          ${item.subMenu ? item.subMenu.length + '개 서비스' : '바로 시작'}
        </p>
      </div>
    `;
  }).join('');
  
  quickMenuEl.innerHTML = quickHTML;
}

// Render features grid
function renderFeaturesGrid() {
  const featuresEl = document.getElementById('featuresGrid');
  if (!featuresEl || !menuData) return;
  
  // Show services with submenus
  const features = menuData.mainMenu.filter(function(item) {
    return item.subMenu && item.subMenu.length > 0;
  });
  
  const gradients = [
    'gradient-bg',
    'gradient-bg-2',
    'gradient-bg-3',
    'gradient-bg',
    'gradient-bg-2',
    'gradient-bg-3'
  ];
  
  const featuresHTML = features.map(function(item, index) {
    return `
      <div class="feature-card">
        <div class="feature-header">
          <div class="feature-icon ${gradients[index % gradients.length]}">
            <i class="fas ${item.icon}"></i>
          </div>
          <h3 class="text-xl font-bold">${item.name}</h3>
        </div>
        <ul class="submenu-list">
          ${item.subMenu.map(function(sub) {
            return `
              <li class="submenu-item">
                <i class="fas ${sub.icon}"></i>
                <span>${sub.name}</span>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `;
  }).join('');
  
  featuresEl.innerHTML = featuresHTML;
}

// Initialize chatbot
function initChatbot() {
  console.log('=== Initializing chatbot...');
  
  const chatbotBtn = document.getElementById('chatbotBtn');
  const chatbotPanel = document.getElementById('chatbotPanel');
  const closeChatbot = document.getElementById('closeChatbot');
  const langButtons = document.querySelectorAll('.lang-btn');
  
  console.log('Chatbot elements found:', {
    chatbotBtn: !!chatbotBtn,
    chatbotPanel: !!chatbotPanel,
    closeChatbot: !!closeChatbot,
    langButtons: langButtons.length
  });
  
  if (!chatbotBtn || !chatbotPanel) {
    console.error('!!! Chatbot elements not found');
    return;
  }
  
  chatbotBtn.addEventListener('click', function() {
    console.log('Chatbot button clicked');
    chatbotPanel.classList.toggle('active');
    const isActive = chatbotPanel.classList.contains('active');
    console.log('Panel is now active:', isActive);
    
    if (isActive && !faqData) {
      console.log('Loading FAQ on first open...');
      loadFAQ(currentLang);
    }
  });
  
  if (closeChatbot) {
    closeChatbot.addEventListener('click', function() {
      console.log('Close button clicked');
      chatbotPanel.classList.remove('active');
    });
  }
  
  langButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      console.log('Language button clicked:', this.dataset.lang);
      
      langButtons.forEach(function(b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      currentLang = this.dataset.lang;
      
      loadFAQ(currentLang);
      updateChatbotUI();
    });
  });
  
  console.log('=== Chatbot initialized successfully');
}

// Update chatbot UI
function updateChatbotUI() {
  const trans = translations[currentLang] || translations.ko;
  
  const header = document.querySelector('.chatbot-header');
  if (header) {
    const titleEl = header.querySelector('h3');
    const subtitleEl = header.querySelector('p');
    if (titleEl) titleEl.textContent = trans.chatbotTitle;
    if (subtitleEl) subtitleEl.textContent = trans.chatbotSubtitle;
  }
  
  const messages = document.getElementById('chatbotMessages');
  if (messages) {
    messages.innerHTML = '<div class="message bot">' + trans.welcomeMessage + '</div>';
  }
}

// Load FAQ data
function loadFAQ(lang) {
  console.log('=== Loading FAQ for language:', lang);
  
  fetch('/api/faq?lang=' + lang)
    .then(function(response) {
      console.log('FAQ API response status:', response.status);
      if (!response.ok) {
        throw new Error('API response not OK: ' + response.status);
      }
      return response.json();
    })
    .then(function(data) {
      console.log('=== FAQ data loaded successfully:', data);
      console.log('Number of questions:', data.questions ? data.questions.length : 0);
      faqData = data;
      renderFAQ();
    })
    .catch(function(error) {
      console.error('!!! Failed to load FAQ:', error);
      
      // Show error in FAQ list
      const faqList = document.getElementById('faqList');
      if (faqList) {
        faqList.innerHTML = '<div class="faq-item" style="color: red;">Failed to load FAQ</div>';
      }
    });
}

// Render FAQ items
function renderFAQ() {
  const faqList = document.getElementById('faqList');
  if (!faqList || !faqData || !faqData.questions) {
    console.error('FAQ rendering failed:', {faqList: !!faqList, faqData: !!faqData});
    return;
  }
  
  console.log('Rendering ' + faqData.questions.length + ' FAQ items');
  faqList.innerHTML = '';
  
  faqData.questions.forEach(function(item, index) {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';
    faqItem.setAttribute('data-index', String(index));
    faqItem.setAttribute('data-question', item.q);
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-question-circle mr-2 text-purple-600';
    icon.style.pointerEvents = 'none';
    
    const textSpan = document.createElement('span');
    textSpan.textContent = item.q;
    textSpan.style.pointerEvents = 'none';
    
    faqItem.appendChild(icon);
    faqItem.appendChild(textSpan);
    
    faqItem.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const idx = parseInt(this.getAttribute('data-index'));
      console.log('FAQ item clicked:', idx, this.getAttribute('data-question'));
      showAnswer(idx);
    });
    
    faqList.appendChild(faqItem);
  });
  
  console.log('FAQ items rendered successfully');
}

// Show answer in chat
function showAnswer(index) {
  console.log('showAnswer called with index:', index);
  
  if (!faqData || !faqData.questions) {
    console.error('FAQ data not available');
    return;
  }
  
  if (!faqData.questions[index]) {
    console.error('Question not found at index:', index);
    return;
  }
  
  const question = faqData.questions[index];
  const messages = document.getElementById('chatbotMessages');
  
  if (!messages) {
    console.error('Messages container not found');
    return;
  }
  
  console.log('Showing answer for:', question.q);
  
  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = question.q;
  messages.appendChild(userMsg);
  
  console.log('User message added');
  
  // Scroll to bottom
  setTimeout(function() {
    messages.scrollTop = messages.scrollHeight;
  }, 50);
  
  // Bot response with delay
  setTimeout(function() {
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    
    // Format answer text
    const answerText = question.a || 'No answer available';
    botMsg.innerHTML = answerText.replace(/\n/g, '<br>');
    
    messages.appendChild(botMsg);
    console.log('Bot message added');
    
    // Scroll to bottom again
    setTimeout(function() {
      messages.scrollTop = messages.scrollHeight;
    }, 100);
  }, 500);
}

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  mobileMenuBtn.addEventListener('click', function() {
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      renderMobileMenu();
    } else {
      mobileMenu.classList.add('hidden');
    }
  });
}

// Render mobile menu
function renderMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu || !menuData) return;
  
  const mobileHTML = menuData.mainMenu.map(function(item) {
    let html = `
      <div class="border-b border-purple-700">
        <a href="${item.path || '#'}" class="block px-4 py-3 text-white hover:bg-purple-700 flex items-center gap-3">
          <i class="fas ${item.icon}"></i>
          <span>${item.name}</span>
        </a>
    `;
    
    if (item.subMenu) {
      html += '<div class="bg-purple-900 px-8 py-2">';
      item.subMenu.forEach(function(sub) {
        html += `
          <a href="#" class="block py-2 text-sm text-gray-300 hover:text-white flex items-center gap-2">
            <i class="fas ${sub.icon} text-xs"></i>
            <span>${sub.name}</span>
          </a>
        `;
      });
      html += '</div>';
    }
    
    html += '</div>';
    return html;
  }).join('');
  
  mobileMenu.innerHTML = mobileHTML;
}

// Initialize smooth scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Add scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(20px)';
      
      setTimeout(function() {
        entry.target.style.transition = 'all 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards when loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.querySelectorAll('.card-hover, .quick-menu-card, .feature-card').forEach(function(card) {
      observer.observe(card);
    });
  }, 500);
});
