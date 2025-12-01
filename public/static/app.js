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

// Initialize chatbot
document.addEventListener('DOMContentLoaded', () => {
  const chatbotBtn = document.getElementById('chatbotBtn');
  const chatbotPanel = document.getElementById('chatbotPanel');
  const closeChatbot = document.getElementById('closeChatbot');
  const langButtons = document.querySelectorAll('.lang-btn');
  
  // Toggle chatbot panel
  chatbotBtn.addEventListener('click', () => {
    chatbotPanel.classList.toggle('active');
    if (chatbotPanel.classList.contains('active') && !faqData) {
      loadFAQ(currentLang);
    }
  });
  
  closeChatbot.addEventListener('click', () => {
    chatbotPanel.classList.remove('active');
  });
  
  // Language selection
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLang = btn.dataset.lang;
      loadFAQ(currentLang);
      updateChatbotUI();
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
});

// Update chatbot UI based on language
function updateChatbotUI() {
  const trans = translations[currentLang] || translations.ko;
  
  // Update header
  const header = document.querySelector('.chatbot-header');
  if (header) {
    header.querySelector('h3').textContent = trans.chatbotTitle;
    header.querySelector('p').textContent = trans.chatbotSubtitle;
  }
  
  // Update welcome message
  const messages = document.getElementById('chatbotMessages');
  if (messages) {
    messages.innerHTML = `
      <div class="message bot">
        ${trans.welcomeMessage}
      </div>
    `;
  }
}

// Load FAQ data
async function loadFAQ(lang) {
  try {
    const response = await fetch(`/api/faq?lang=${lang}`);
    faqData = await response.json();
    renderFAQ();
  } catch (error) {
    console.error('Failed to load FAQ:', error);
  }
}

// Render FAQ items
function renderFAQ() {
  const faqList = document.getElementById('faqList');
  if (!faqData || !faqData.questions) return;
  
  faqList.innerHTML = faqData.questions.map((item, index) => `
    <div class="faq-item" data-index="${index}">
      <i class="fas fa-question-circle mr-2 text-purple-600"></i>
      ${item.q}
    </div>
  `).join('');
  
  // Add click handlers
  faqList.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index);
      showAnswer(index);
    });
  });
}

// Show answer in chat
function showAnswer(index) {
  if (!faqData || !faqData.questions[index]) return;
  
  const messages = document.getElementById('chatbotMessages');
  const question = faqData.questions[index];
  
  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = question.q;
  messages.appendChild(userMsg);
  
  // Add bot response
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    botMsg.innerHTML = question.a.replace(/\n/g, '<br>');
    messages.appendChild(botMsg);
    
    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;
  }, 500);
  
  // Scroll to bottom
  messages.scrollTop = messages.scrollHeight;
}

// Add scroll animation for cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        entry.target.style.transition = 'all 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card-hover').forEach(card => {
    observer.observe(card);
  });
});
