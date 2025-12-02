// Global variables
let currentLang = 'ko';
let faqData = null;
let menuData = null;

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
  
  // Load menu data
  loadMenu();
  
  // Initialize chatbot
  initChatbot();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Smooth scrolling
  initSmoothScroll();
});

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
