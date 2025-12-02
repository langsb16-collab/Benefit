import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Menu data API
app.get('/api/menu', (c) => {
  const menuData = {
    mainMenu: [
      {
        id: 'home',
        name: '홈',
        icon: 'fa-home',
        path: '/'
      },
      {
        id: 'nearby',
        name: '주변가게·배달',
        icon: 'fa-motorcycle',
        path: '/nearby',
        subMenu: [
          { id: 'delivery', name: '음식 배달', icon: 'fa-utensils' },
          { id: 'takeout', name: '포장 주문', icon: 'fa-shopping-bag' },
          { id: 'reservation', name: '예약 주문', icon: 'fa-clock' },
          { id: 'categories', name: '카테고리별 상점', icon: 'fa-th-large' }
        ]
      },
      {
        id: 'market',
        name: '장보기·전통시장',
        icon: 'fa-shopping-basket',
        path: '/market',
        subMenu: [
          { id: 'traditional', name: '전통시장 장보기', icon: 'fa-store-alt' },
          { id: 'combined', name: '합배송', icon: 'fa-boxes' },
          { id: 'local', name: '특산물·로컬푸드', icon: 'fa-leaf' },
          { id: 'coupon', name: '시장 쿠폰', icon: 'fa-ticket-alt' }
        ]
      },
      {
        id: 'group',
        name: '공동구매',
        icon: 'fa-users',
        path: '/group',
        subMenu: [
          { id: 'ongoing', name: '진행중 공동구매', icon: 'fa-hourglass-half' },
          { id: 'completed', name: '마감된 공동구매', icon: 'fa-check-circle' }
        ]
      },
      {
        id: 'events',
        name: '지역행사·축제',
        icon: 'fa-calendar-alt',
        path: '/events',
        subMenu: [
          { id: 'list', name: '행사 목록', icon: 'fa-list' },
          { id: 'tickets', name: '행사 티켓', icon: 'fa-ticket-alt' },
          { id: 'stamp', name: '스탬프 투어', icon: 'fa-stamp' }
        ]
      },
      {
        id: 'payment',
        name: '지역화폐 결제',
        icon: 'fa-credit-card',
        path: '/payment',
        subMenu: [
          { id: 'register', name: '지역화폐 등록', icon: 'fa-id-card' },
          { id: 'balance', name: '잔액조회', icon: 'fa-wallet' },
          { id: 'history', name: '결제내역', icon: 'fa-history' },
          { id: 'settlement', name: '정산내역', icon: 'fa-file-invoice-dollar' }
        ]
      },
      {
        id: 'mypage',
        name: '마이페이지',
        icon: 'fa-user',
        path: '/mypage',
        subMenu: [
          { id: 'orders', name: '주문내역', icon: 'fa-receipt' },
          { id: 'coupons', name: '쿠폰함', icon: 'fa-tags' },
          { id: 'balance', name: '지역화폐 잔액', icon: 'fa-coins' },
          { id: 'favorites', name: '즐겨찾기', icon: 'fa-heart' },
          { id: 'support', name: '고객센터', icon: 'fa-headset' }
        ]
      },
      {
        id: 'merchant',
        name: '소상공인센터',
        icon: 'fa-store',
        path: '/merchant',
        subMenu: [
          { id: 'info', name: '상점 정보 관리', icon: 'fa-info-circle' },
          { id: 'menu', name: '메뉴 관리 (OCR)', icon: 'fa-camera' },
          { id: 'pos', name: 'POS 연동', icon: 'fa-cash-register' },
          { id: 'orders', name: '주문·배차 관리', icon: 'fa-clipboard-list' },
          { id: 'stats', name: '매출·통계', icon: 'fa-chart-bar' },
          { id: 'settlement', name: '정산관리', icon: 'fa-calculator' }
        ]
      },
      {
        id: 'admin',
        name: '지자체관리자',
        icon: 'fa-shield-alt',
        path: '/admin',
        subMenu: [
          { id: 'dashboard', name: '정책 대시보드', icon: 'fa-tachometer-alt' },
          { id: 'analysis', name: '데이터 분석', icon: 'fa-chart-pie' },
          { id: 'coupons', name: '공공 쿠폰 발행', icon: 'fa-gift' },
          { id: 'notice', name: '설문·공지', icon: 'fa-bullhorn' },
          { id: 'merchants', name: '가맹점 관리', icon: 'fa-store-alt' },
          { id: 'delivery', name: '배달대행 관리', icon: 'fa-truck' }
        ]
      }
    ]
  }
  
  return c.json(menuData)
})

// API endpoint for chatbot FAQ data
app.get('/api/faq', (c) => {
  const lang = c.req.query('lang') || 'ko'
  
  const faqData: Record<string, any> = {
    ko: {
      title: '자주 묻는 질문',
      questions: [
        {
          q: '지역화폐 O2O 플랫폼이 무엇인가요?',
          a: '지역 소상공인의 디지털 전환을 지원하고, 지역화폐와 연계하여 골목 상권의 자생력을 강화하며, 새로운 지역 일자리를 창출하는 공공·민관협력 O2O 플랫폼입니다.'
        },
        {
          q: '어떤 혜택이 있나요?',
          a: '소비자: 지역화폐 결제 시 최대 10% 캐시백, 즉시 할인\n소상공인: 민간 플랫폼 대비 수수료 1~2%로 절감 (연간 평균 800만원 절감)\n지자체: 지역 경제 활성화 및 일자리 창출 (80~150명)'
        },
        {
          q: '어떻게 사용하나요?',
          a: '1. 앱 다운로드 및 회원가입\n2. 지역화폐 등록 (카드형/모바일형)\n3. 가까운 가맹점에서 주문\n4. 지역화폐로 결제하고 혜택 받기'
        },
        {
          q: '가맹점은 어떻게 참여하나요?',
          a: '플랫폼 앱 또는 웹사이트에서 간편하게 가맹점 신청이 가능합니다. 광고비 및 입점비 없이 낮은 수수료로 시작할 수 있습니다.'
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          q: 'What is a Local Currency O2O Platform?',
          a: 'A public-private O2O platform that supports digital transformation of local small businesses.'
        }
      ]
    }
  }
  
  return c.json(faqData[lang] || faqData.ko)
})

// Main page with new sitemap structure
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>지역화폐 O2O 플랫폼 Benefit</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/style.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <!-- Navigation Bar -->
        <nav class="gradient-bg text-white sticky top-0 z-50 shadow-lg">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="text-2xl font-bold">Benefit</a>
                    </div>
                    
                    <!-- Desktop: Language Selector + Mobile Menu Button -->
                    <div class="flex items-center gap-4">
                        <!-- Language Selector (Desktop & Mobile) -->
                        <div class="language-selector-wrapper relative">
                            <button id="languageToggle" class="language-toggle-btn flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
                                <i class="fas fa-globe"></i>
                                <span id="currentLangText">한국어</span>
                                <i class="fas fa-chevron-down text-xs"></i>
                            </button>
                            <div id="languageDropdown" class="language-dropdown hidden absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl overflow-hidden min-w-[160px]">
                                <button class="lang-option active" data-lang="ko" data-text="한국어">
                                    <i class="fas fa-check text-purple-600"></i>
                                    <span>한국어</span>
                                </button>
                                <button class="lang-option" data-lang="en" data-text="English">
                                    <i class="fas fa-check text-purple-600 invisible"></i>
                                    <span>English</span>
                                </button>
                                <button class="lang-option" data-lang="zh" data-text="中文">
                                    <i class="fas fa-check text-purple-600 invisible"></i>
                                    <span>中文</span>
                                </button>
                                <button class="lang-option" data-lang="ja" data-text="日本語">
                                    <i class="fas fa-check text-purple-600 invisible"></i>
                                    <span>日本語</span>
                                </button>
                                <button class="lang-option" data-lang="vi" data-text="Tiếng Việt">
                                    <i class="fas fa-check text-purple-600 invisible"></i>
                                    <span>Tiếng Việt</span>
                                </button>
                                <button class="lang-option" data-lang="th" data-text="ไทย">
                                    <i class="fas fa-check text-purple-600 invisible"></i>
                                    <span>ไทย</span>
                                </button>
                                <button class="lang-option" data-lang="ar" data-text="العربية">
                                    <i class="fas fa-check text-purple-600 invisible"></i>
                                    <span>العربية</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Mobile Menu Button -->
                        <button id="mobileMenuBtn" class="md:hidden text-white">
                            <i class="fas fa-bars text-2xl"></i>
                        </button>
                        
                        <!-- Desktop Main Navigation -->
                        <div id="mainNav" class="hidden md:flex items-center space-x-1">
                            <!-- Main menu will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Mobile Menu -->
            <div id="mobileMenu" class="hidden md:hidden bg-purple-800">
                <!-- Mobile menu items will be loaded here -->
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero-banner gradient-bg text-white py-12 md:py-20">
            <div class="container mx-auto px-4 md:px-6 text-center">
                <h1 class="text-3xl md:text-6xl font-bold mb-3 md:mb-6 animate-fadeIn">
                    지역화폐 O2O 플랫폼
                </h1>
                <h2 class="text-xl md:text-4xl font-light mb-4 md:mb-8">Benefit</h2>
                <p class="text-sm md:text-xl mb-6 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                    지역 소상공인의 디지털 전환 지원<br class="hidden md:inline">
                    지역화폐 연계로 상권 자생력 강화<br class="hidden md:inline">
                    새로운 지역 일자리 창출
                </p>
                <div class="flex gap-2 md:gap-4 justify-center flex-wrap px-2">
                    <a href="#features" class="bg-white text-purple-600 px-4 md:px-8 py-2 md:py-4 rounded-full font-bold text-sm md:text-base hover:shadow-xl transition">
                        서비스 시작
                    </a>
                    <a href="#benefits" class="border-2 border-white px-4 md:px-8 py-2 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-white hover:text-purple-600 transition">
                        자세히 보기
                    </a>
                </div>
            </div>
        </section>

        <!-- Quick Menu Cards -->
        <section class="py-8 md:py-16 bg-white">
            <div class="container mx-auto px-4 md:px-6">
                <h2 class="text-xl md:text-3xl font-bold text-center mb-6 md:mb-12">주요 서비스</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6" id="quickMenu">
                    <!-- Quick menu cards will be loaded here -->
                </div>
            </div>
        </section>

        <!-- Benefits Section -->
        <section id="benefits" class="py-10 md:py-20 bg-gray-100">
            <div class="container mx-auto px-4 md:px-6">
                <h2 class="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16">세 가지 핵심 혜택</h2>
                <div class="grid md:grid-cols-3 gap-4 md:gap-8">
                    <div class="card-hover bg-white p-5 md:p-8 rounded-2xl shadow-lg">
                        <div class="gradient-bg w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
                            <i class="fas fa-coins text-xl md:text-3xl text-white"></i>
                        </div>
                        <h3 class="text-lg md:text-2xl font-bold mb-2 md:mb-4">소상공인 부담 감소</h3>
                        <p class="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                            민간 플랫폼 대비 수수료 <strong>1~2%</strong>로 대폭 절감
                        </p>
                        <ul class="text-gray-600 space-y-1 md:space-y-2 text-sm md:text-base">
                            <li>✓ 광고비·입점비 제로</li>
                            <li>✓ 연간 평균 800만원 절감</li>
                            <li>✓ 실질 순이익 증가</li>
                        </ul>
                    </div>
                    
                    <div class="card-hover bg-white p-5 md:p-8 rounded-2xl shadow-lg">
                        <div class="gradient-bg-2 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
                            <i class="fas fa-chart-line text-xl md:text-3xl text-white"></i>
                        </div>
                        <h3 class="text-lg md:text-2xl font-bold mb-2 md:mb-4">지역경제 선순환</h3>
                        <p class="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                            지역화폐 이용률 확대 및 수수료 지역 내 환류
                        </p>
                        <ul class="text-gray-600 space-y-1 md:space-y-2 text-sm md:text-base">
                            <li>✓ 역외 유출 차단</li>
                            <li>✓ 전통시장 활성화</li>
                            <li>✓ 상권 데이터 분석</li>
                        </ul>
                    </div>
                    
                    <div class="card-hover bg-white p-5 md:p-8 rounded-2xl shadow-lg">
                        <div class="gradient-bg-3 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6">
                            <i class="fas fa-users text-xl md:text-3xl text-white"></i>
                        </div>
                        <h3 class="text-lg md:text-2xl font-bold mb-2 md:mb-4">일자리 창출</h3>
                        <p class="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                            1개 시군 기준 <strong>80~150명</strong> 직간접 고용
                        </p>
                        <ul class="text-gray-600 space-y-1 md:space-y-2 text-sm md:text-base">
                            <li>✓ 배달·픽업 인력</li>
                            <li>✓ 플랫폼 운영·IT</li>
                            <li>✓ 전통시장 물류센터</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-10 md:py-20 bg-white">
            <div class="container mx-auto px-4 md:px-6">
                <h2 class="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16">전체 서비스 메뉴</h2>
                <div class="grid md:grid-cols-3 gap-4 md:gap-8" id="featuresGrid">
                    <!-- Features will be loaded here -->
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">Benefit</h3>
                        <p class="text-gray-400">지역 소상공인과 함께 성장하는 공공·민관협력 플랫폼</p>
                    </div>
                    <div>
                        <h4 class="font-bold mb-3">서비스</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" class="hover:text-white">주변가게·배달</a></li>
                            <li><a href="#" class="hover:text-white">장보기·전통시장</a></li>
                            <li><a href="#" class="hover:text-white">공동구매</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-3">고객지원</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" class="hover:text-white">FAQ</a></li>
                            <li><a href="#" class="hover:text-white">공지사항</a></li>
                            <li><a href="#" class="hover:text-white">고객센터</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-3">소셜미디어</h4>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook text-2xl"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-2xl"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-2xl"></i></a>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>© 2024 Benefit Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <!-- Chatbot Button -->
        <button class="chatbot-button" id="chatbotBtn">
            <i class="fas fa-comments"></i>
        </button>

        <!-- Chatbot Panel -->
        <div class="chatbot-panel" id="chatbotPanel">
            <div class="chatbot-header">
                <div>
                    <h3 class="font-bold text-lg">Benefit 챗봇</h3>
                    <p class="text-sm opacity-90">무엇을 도와드릴까요?</p>
                </div>
                <button id="closeChatbot" class="text-white hover:text-gray-200">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="lang-selector">
                <button class="lang-btn active" data-lang="ko">한국어</button>
                <button class="lang-btn" data-lang="en">English</button>
                <button class="lang-btn" data-lang="zh">中文</button>
                <button class="lang-btn" data-lang="ja">日本語</button>
                <button class="lang-btn" data-lang="vi">Tiếng Việt</button>
                <button class="lang-btn" data-lang="th">ไทย</button>
                <button class="lang-btn" data-lang="ar">العربية</button>
            </div>
            
            <div class="chatbot-messages" id="chatbotMessages">
                <div class="message bot">안녕하세요! Benefit 플랫폼 도우미입니다.</div>
            </div>
            
            <div class="faq-list" id="faqList"></div>
        </div>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
