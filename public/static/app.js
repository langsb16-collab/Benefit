// Chatbot functionality
let currentLang = 'ko';
let faqData = null;

// Language translations for UI
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
  },
  zh: {
    chatbotTitle: 'Benefit 聊天机器人',
    chatbotSubtitle: '我能帮您什么？',
    welcomeMessage: '您好！我是Benefit平台助手。请选择一个问题。'
  },
  ja: {
    chatbotTitle: 'Benefit チャットボット',
    chatbotSubtitle: 'どのようにお手伝いしましょうか？',
    welcomeMessage: 'こんにちは！Benefitプラットフォームアシスタントです。質問を選択してください。'
  },
  vi: {
    chatbotTitle: 'Benefit Chatbot',
    chatbotSubtitle: 'Tôi có thể giúp gì cho bạn?',
    welcomeMessage: 'Xin chào! Tôi là trợ lý nền tảng Benefit. Vui lòng chọn câu hỏi.'
  },
  th: {
    chatbotTitle: 'Benefit Chatbot',
    chatbotSubtitle: 'ฉันช่วยอะไรคุณได้บ้าง?',
    welcomeMessage: 'สวัสดี! ฉันเป็นผู้ช่วยแพลตฟอร์ม Benefit กรุณาเลือกคำถาม'
  },
  ar: {
    chatbotTitle: 'Benefit Chatbot',
    chatbotSubtitle: 'كيف يمكنني مساعدتك؟',
    welcomeMessage: 'مرحباً! أنا مساعد منصة Benefit. يرجى اختيار سؤال.'
  }
};

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing chatbot...');
  
  const chatbotBtn = document.getElementById('chatbotBtn');
  const chatbotPanel = document.getElementById('chatbotPanel');
  const closeChatbot = document.getElementById('closeChatbot');
  const langButtons = document.querySelectorAll('.lang-btn');
  
  if (!chatbotBtn || !chatbotPanel || !closeChatbot) {
    console.error('Chatbot elements not found');
    return;
  }
  
  // Toggle chatbot panel
  chatbotBtn.addEventListener('click', function() {
    console.log('Chatbot button clicked');
    const isActive = chatbotPanel.classList.toggle('active');
    console.log('Panel active:', isActive);
    
    if (isActive && !faqData) {
      console.log('Loading FAQ for first time');
      loadFAQ(currentLang);
    }
  });
  
  // Close chatbot
  closeChatbot.addEventListener('click', function() {
    console.log('Close button clicked');
    chatbotPanel.classList.remove('active');
  });
  
  // Language selection
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
  
  // Smooth scroll for anchor links
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
  
  console.log('Chatbot initialized successfully');
});

// Update chatbot UI based on language
function updateChatbotUI() {
  console.log('Updating chatbot UI for language:', currentLang);
  
  const trans = translations[currentLang] || translations.ko;
  
  // Update header
  const header = document.querySelector('.chatbot-header');
  if (header) {
    const titleEl = header.querySelector('h3');
    const subtitleEl = header.querySelector('p');
    
    if (titleEl) titleEl.textContent = trans.chatbotTitle;
    if (subtitleEl) subtitleEl.textContent = trans.chatbotSubtitle;
  }
  
  // Update welcome message
  const messages = document.getElementById('chatbotMessages');
  if (messages) {
    messages.innerHTML = '<div class="message bot">' + trans.welcomeMessage + '</div>';
  }
}

// Load FAQ data from API
function loadFAQ(lang) {
  console.log('Loading FAQ for language:', lang);
  
  fetch('/api/faq?lang=' + lang)
    .then(function(response) {
      console.log('FAQ API response status:', response.status);
      return response.json();
    })
    .then(function(data) {
      console.log('FAQ data loaded:', data);
      faqData = data;
      renderFAQ();
    })
    .catch(function(error) {
      console.error('Failed to load FAQ:', error);
    });
}

// Render FAQ items
function renderFAQ() {
  console.log('Rendering FAQ...');
  
  const faqList = document.getElementById('faqList');
  if (!faqList) {
    console.error('FAQ list element not found');
    return;
  }
  
  if (!faqData || !faqData.questions) {
    console.error('No FAQ data available');
    return;
  }
  
  console.log('Rendering', faqData.questions.length, 'FAQ items');
  
  // Clear existing content
  faqList.innerHTML = '';
  
  // Create FAQ items
  faqData.questions.forEach(function(item, index) {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';
    faqItem.setAttribute('data-index', index);
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-question-circle mr-2 text-purple-600';
    
    const text = document.createTextNode(item.q);
    
    faqItem.appendChild(icon);
    faqItem.appendChild(text);
    
    // Add click event
    faqItem.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-index'));
      console.log('FAQ item clicked, index:', idx);
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
    console.error('No FAQ data available');
    return;
  }
  
  const question = faqData.questions[index];
  if (!question) {
    console.error('Invalid question index:', index);
    return;
  }
  
  console.log('Question:', question.q);
  console.log('Answer:', question.a);
  
  const messages = document.getElementById('chatbotMessages');
  if (!messages) {
    console.error('Messages container not found');
    return;
  }
  
  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = question.q;
  messages.appendChild(userMsg);
  
  console.log('User message added');
  
  // Scroll to bottom
  messages.scrollTop = messages.scrollHeight;
  
  // Add bot response with delay
  setTimeout(function() {
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    
    // Replace newlines with <br> tags
    const answerHtml = question.a.replace(/\n/g, '<br>');
    botMsg.innerHTML = answerHtml;
    
    messages.appendChild(botMsg);
    
    console.log('Bot message added');
    
    // Scroll to bottom again
    setTimeout(function() {
      messages.scrollTop = messages.scrollHeight;
    }, 100);
  }, 500);
}

// Add scroll animation for cards
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

// Observe all cards when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.card-hover').forEach(function(card) {
    observer.observe(card);
  });
});
