import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Menu data API with multilingual support
app.get('/api/menu', (c) => {
  const lang = c.req.query('lang') || 'ko'
  
  const menuTranslations: Record<string, any> = {
    ko: {
      mainMenu: [
        { id: 'home', name: '홈', icon: 'fa-home', path: '/' },
        {
          id: 'nearby', name: '주변가게·배달', icon: 'fa-motorcycle', path: '/nearby',
          subMenu: [
            { id: 'delivery', name: '음식 배달', desc: '배달/포장/예약 주문', icon: 'fa-utensils' },
            { id: 'takeout', name: '포장 주문', desc: '픽업 서비스', icon: 'fa-shopping-bag' },
            { id: 'reservation', name: '예약 주문', desc: '사전 예약', icon: 'fa-clock' },
            { id: 'categories', name: '카테고리별 상점', desc: '동네 반찬/카페/마트', icon: 'fa-th-large' }
          ]
        },
        {
          id: 'market', name: '장보기·전통시장', icon: 'fa-shopping-basket', path: '/market',
          subMenu: [
            { id: 'traditional', name: '전통시장 장보기', desc: '재래시장 카테고리별', icon: 'fa-store-alt' },
            { id: 'combined', name: '합배송', desc: '묶음배송 시스템', icon: 'fa-boxes' },
            { id: 'local', name: '특산물·로컬푸드', desc: '지역 농산물 직거래', icon: 'fa-leaf' },
            { id: 'coupon', name: '시장 쿠폰', desc: '지자체 발행 상생쿠폰', icon: 'fa-ticket-alt' }
          ]
        },
        {
          id: 'group', name: '공동구매', icon: 'fa-users', path: '/group',
          subMenu: [
            { id: 'ongoing', name: '진행중 공동구매', desc: '실시간 참여율 표시', icon: 'fa-hourglass-half' },
            { id: 'completed', name: '마감된 공동구매', desc: '완료된 공동구매 내역', icon: 'fa-check-circle' }
          ]
        },
        {
          id: 'events', name: '지역행사·축제', icon: 'fa-calendar-alt', path: '/events',
          subMenu: [
            { id: 'list', name: '행사 목록', desc: '지역 축제 정보', icon: 'fa-list' },
            { id: 'tickets', name: '행사 티켓', desc: 'O2O 티켓 구매', icon: 'fa-ticket-alt' },
            { id: 'stamp', name: '스탬프 투어', desc: 'GPS 기반 스탬프 투어', icon: 'fa-stamp' }
          ]
        },
        {
          id: 'payment', name: '지역화폐 결제', icon: 'fa-credit-card', path: '/payment',
          subMenu: [
            { id: 'register', name: '지역화폐 등록', desc: '모바일형/카드형 등록', icon: 'fa-id-card' },
            { id: 'balance', name: '잔액조회', desc: '실시간 잔액 확인', icon: 'fa-wallet' },
            { id: 'history', name: '결제내역', desc: '거래 이력 조회', icon: 'fa-history' },
            { id: 'settlement', name: '정산내역', desc: '캐시백/정산 내역', icon: 'fa-file-invoice-dollar' }
          ]
        },
        {
          id: 'mypage', name: '마이페이지', icon: 'fa-user', path: '/mypage',
          subMenu: [
            { id: 'orders', name: '주문내역', desc: '주문/환불 내역', icon: 'fa-receipt' },
            { id: 'coupons', name: '쿠폰함', desc: '보유 쿠폰 관리', icon: 'fa-tags' },
            { id: 'balance', name: '지역화폐 잔액', desc: '실시간 잔액', icon: 'fa-coins' },
            { id: 'favorites', name: '즐겨찾기', desc: '즐겨찾는 상점', icon: 'fa-heart' },
            { id: 'support', name: '고객센터', desc: '문의/FAQ', icon: 'fa-headset' }
          ]
        },
        {
          id: 'merchant', name: '소상공인센터', icon: 'fa-store', path: '/merchant',
          subMenu: [
            { id: 'info', name: '상점 정보 관리', desc: '사업자 인증, 영업시간 설정', icon: 'fa-info-circle' },
            { id: 'menu', name: '메뉴 관리 (OCR)', desc: '사진·가격 자동 인식', icon: 'fa-camera' },
            { id: 'pos', name: 'POS 연동', desc: '자동 주문 수신', icon: 'fa-cash-register' },
            { id: 'orders', name: '주문·배차 관리', desc: '실시간 주문 접수', icon: 'fa-clipboard-list' },
            { id: 'stats', name: '매출·통계', desc: '요일별/시간대별 분석', icon: 'fa-chart-bar' },
            { id: 'settlement', name: '정산관리', desc: '수수료 1~2%, 익일 정산', icon: 'fa-calculator' }
          ]
        },
        {
          id: 'admin', name: '지자체관리자', icon: 'fa-shield-alt', path: '/admin',
          subMenu: [
            { id: 'dashboard', name: '정책 대시보드', desc: '지역경제 지표 시각화', icon: 'fa-tachometer-alt' },
            { id: 'analysis', name: '데이터 분석', desc: '상권 활성화 지표', icon: 'fa-chart-pie' },
            { id: 'coupons', name: '공공 쿠폰 발행', desc: '상생쿠폰 시스템', icon: 'fa-gift' },
            { id: 'notice', name: '설문·공지', desc: '긴급공지/정책 설문', icon: 'fa-bullhorn' },
            { id: 'merchants', name: '가맹점 관리', desc: '가맹점 승인/관리', icon: 'fa-store-alt' },
            { id: 'delivery', name: '배달대행 관리', desc: 'GPS 실시간 매핑', icon: 'fa-truck' }
          ]
        }
      ]
    },
    en: {
      mainMenu: [
        { id: 'home', name: 'Home', icon: 'fa-home', path: '/' },
        {
          id: 'nearby', name: 'Nearby Stores·Delivery', icon: 'fa-motorcycle', path: '/nearby',
          subMenu: [
            { id: 'delivery', name: 'Food Delivery', desc: 'Delivery/Takeout/Reservation', icon: 'fa-utensils' },
            { id: 'takeout', name: 'Takeout Order', desc: 'Pickup service', icon: 'fa-shopping-bag' },
            { id: 'reservation', name: 'Reservation', desc: 'Pre-order', icon: 'fa-clock' },
            { id: 'categories', name: 'Store Categories', desc: 'Local food/Cafe/Mart', icon: 'fa-th-large' }
          ]
        },
        {
          id: 'market', name: 'Shopping·Market', icon: 'fa-shopping-basket', path: '/market',
          subMenu: [
            { id: 'traditional', name: 'Traditional Market', desc: 'Market categories', icon: 'fa-store-alt' },
            { id: 'combined', name: 'Combined Delivery', desc: 'Bundle delivery system', icon: 'fa-boxes' },
            { id: 'local', name: 'Local Products', desc: 'Direct trade of local produce', icon: 'fa-leaf' },
            { id: 'coupon', name: 'Market Coupons', desc: 'Government-issued coupons', icon: 'fa-ticket-alt' }
          ]
        },
        {
          id: 'group', name: 'Group Buying', icon: 'fa-users', path: '/group',
          subMenu: [
            { id: 'ongoing', name: 'Ongoing Deals', desc: 'Real-time participation rate', icon: 'fa-hourglass-half' },
            { id: 'completed', name: 'Completed Deals', desc: 'Finished group buying history', icon: 'fa-check-circle' }
          ]
        },
        {
          id: 'events', name: 'Local Events·Festivals', icon: 'fa-calendar-alt', path: '/events',
          subMenu: [
            { id: 'list', name: 'Event List', desc: 'Local festival information', icon: 'fa-list' },
            { id: 'tickets', name: 'Event Tickets', desc: 'O2O ticket purchase', icon: 'fa-ticket-alt' },
            { id: 'stamp', name: 'Stamp Tour', desc: 'GPS-based stamp tour', icon: 'fa-stamp' }
          ]
        },
        {
          id: 'payment', name: 'Local Currency', icon: 'fa-credit-card', path: '/payment',
          subMenu: [
            { id: 'register', name: 'Register Currency', desc: 'Mobile/Card type registration', icon: 'fa-id-card' },
            { id: 'balance', name: 'Check Balance', desc: 'Real-time balance check', icon: 'fa-wallet' },
            { id: 'history', name: 'Payment History', desc: 'Transaction history inquiry', icon: 'fa-history' },
            { id: 'settlement', name: 'Settlement', desc: 'Cashback/settlement details', icon: 'fa-file-invoice-dollar' }
          ]
        },
        {
          id: 'mypage', name: 'My Page', icon: 'fa-user', path: '/mypage',
          subMenu: [
            { id: 'orders', name: 'Order History', desc: 'Orders/Refunds', icon: 'fa-receipt' },
            { id: 'coupons', name: 'My Coupons', desc: 'Coupon management', icon: 'fa-tags' },
            { id: 'balance', name: 'Currency Balance', desc: 'Real-time balance', icon: 'fa-coins' },
            { id: 'favorites', name: 'Favorites', desc: 'Favorite stores', icon: 'fa-heart' },
            { id: 'support', name: 'Support', desc: 'Inquiry/FAQ', icon: 'fa-headset' }
          ]
        },
        {
          id: 'merchant', name: 'Merchant Center', icon: 'fa-store', path: '/merchant',
          subMenu: [
            { id: 'info', name: 'Store Info', desc: 'Business certification, hours', icon: 'fa-info-circle' },
            { id: 'menu', name: 'Menu (OCR)', desc: 'Auto photo/price recognition', icon: 'fa-camera' },
            { id: 'pos', name: 'POS Integration', desc: 'Automatic order reception', icon: 'fa-cash-register' },
            { id: 'orders', name: 'Order Management', desc: 'Real-time order processing', icon: 'fa-clipboard-list' },
            { id: 'stats', name: 'Sales·Statistics', desc: 'Daily/hourly analysis', icon: 'fa-chart-bar' },
            { id: 'settlement', name: 'Settlement', desc: '1~2% fee, next-day settlement', icon: 'fa-calculator' }
          ]
        },
        {
          id: 'admin', name: 'Admin Dashboard', icon: 'fa-shield-alt', path: '/admin',
          subMenu: [
            { id: 'dashboard', name: 'Policy Dashboard', desc: 'Local economy indicators', icon: 'fa-tachometer-alt' },
            { id: 'analysis', name: 'Data Analysis', desc: 'Commercial district metrics', icon: 'fa-chart-pie' },
            { id: 'coupons', name: 'Public Coupons', desc: 'Coupon issuance system', icon: 'fa-gift' },
            { id: 'notice', name: 'Surveys·Notices', desc: 'Urgent notices/policy surveys', icon: 'fa-bullhorn' },
            { id: 'merchants', name: 'Merchant Management', desc: 'Merchant approval/management', icon: 'fa-store-alt' },
            { id: 'delivery', name: 'Delivery Management', desc: 'GPS real-time mapping', icon: 'fa-truck' }
          ]
        }
      ]
    },
    zh: {
      mainMenu: [
        { id: 'home', name: '首页', icon: 'fa-home', path: '/' },
        {
          id: 'nearby', name: '附近商店·配送', icon: 'fa-motorcycle', path: '/nearby',
          subMenu: [
            { id: 'delivery', name: '餐饮配送', desc: '配送/自提/预订', icon: 'fa-utensils' },
            { id: 'takeout', name: '自提订单', desc: '取餐服务', icon: 'fa-shopping-bag' },
            { id: 'reservation', name: '预约订单', desc: '提前预订', icon: 'fa-clock' },
            { id: 'categories', name: '商店分类', desc: '本地美食/咖啡/超市', icon: 'fa-th-large' }
          ]
        },
        {
          id: 'market', name: '购物·传统市场', icon: 'fa-shopping-basket', path: '/market',
          subMenu: [
            { id: 'traditional', name: '传统市场购物', desc: '市场分类购物', icon: 'fa-store-alt' },
            { id: 'combined', name: '合并配送', desc: '捆绑配送系统', icon: 'fa-boxes' },
            { id: 'local', name: '特产·本地食品', desc: '地方农产品直销', icon: 'fa-leaf' },
            { id: 'coupon', name: '市场优惠券', desc: '政府发行优惠券', icon: 'fa-ticket-alt' }
          ]
        },
        {
          id: 'group', name: '团购', icon: 'fa-users', path: '/group',
          subMenu: [
            { id: 'ongoing', name: '进行中团购', desc: '实时参与率显示', icon: 'fa-hourglass-half' },
            { id: 'completed', name: '已结束团购', desc: '完成的团购历史', icon: 'fa-check-circle' }
          ]
        },
        {
          id: 'events', name: '地区活动·节日', icon: 'fa-calendar-alt', path: '/events',
          subMenu: [
            { id: 'list', name: '活动列表', desc: '地区节日信息', icon: 'fa-list' },
            { id: 'tickets', name: '活动门票', desc: 'O2O门票购买', icon: 'fa-ticket-alt' },
            { id: 'stamp', name: '印章之旅', desc: '基于GPS的印章之旅', icon: 'fa-stamp' }
          ]
        },
        {
          id: 'payment', name: '地区货币支付', icon: 'fa-credit-card', path: '/payment',
          subMenu: [
            { id: 'register', name: '注册地区货币', desc: '手机/卡片类型注册', icon: 'fa-id-card' },
            { id: 'balance', name: '余额查询', desc: '实时余额查询', icon: 'fa-wallet' },
            { id: 'history', name: '支付记录', desc: '交易历史查询', icon: 'fa-history' },
            { id: 'settlement', name: '结算记录', desc: '返现/结算详情', icon: 'fa-file-invoice-dollar' }
          ]
        },
        {
          id: 'mypage', name: '我的页面', icon: 'fa-user', path: '/mypage',
          subMenu: [
            { id: 'orders', name: '订单记录', desc: '订单/退款记录', icon: 'fa-receipt' },
            { id: 'coupons', name: '优惠券', desc: '优惠券管理', icon: 'fa-tags' },
            { id: 'balance', name: '地区货币余额', desc: '实时余额', icon: 'fa-coins' },
            { id: 'favorites', name: '收藏夹', desc: '收藏的商店', icon: 'fa-heart' },
            { id: 'support', name: '客户服务', desc: '咨询/常见问题', icon: 'fa-headset' }
          ]
        },
        {
          id: 'merchant', name: '小企业中心', icon: 'fa-store', path: '/merchant',
          subMenu: [
            { id: 'info', name: '商店信息管理', desc: '营业执照认证,营业时间', icon: 'fa-info-circle' },
            { id: 'menu', name: '菜单管理(OCR)', desc: '自动识别照片·价格', icon: 'fa-camera' },
            { id: 'pos', name: 'POS集成', desc: '自动订单接收', icon: 'fa-cash-register' },
            { id: 'orders', name: '订单·调度管理', desc: '实时订单处理', icon: 'fa-clipboard-list' },
            { id: 'stats', name: '销售·统计', desc: '按日期/时间分析', icon: 'fa-chart-bar' },
            { id: 'settlement', name: '结算管理', desc: '手续费1~2%,次日结算', icon: 'fa-calculator' }
          ]
        },
        {
          id: 'admin', name: '地方政府管理', icon: 'fa-shield-alt', path: '/admin',
          subMenu: [
            { id: 'dashboard', name: '政策仪表板', desc: '地区经济指标可视化', icon: 'fa-tachometer-alt' },
            { id: 'analysis', name: '数据分析', desc: '商圈激活指标', icon: 'fa-chart-pie' },
            { id: 'coupons', name: '公共优惠券发行', desc: '优惠券发行系统', icon: 'fa-gift' },
            { id: 'notice', name: '调查·公告', desc: '紧急公告/政策调查', icon: 'fa-bullhorn' },
            { id: 'merchants', name: '商户管理', desc: '商户审批/管理', icon: 'fa-store-alt' },
            { id: 'delivery', name: '配送代理管理', desc: 'GPS实时映射', icon: 'fa-truck' }
          ]
        }
      ]
    },
    ja: {
      mainMenu: [
        { id: 'home', name: 'ホーム', icon: 'fa-home', path: '/' },
        {
          id: 'nearby', name: '近くの店舗·配達', icon: 'fa-motorcycle', path: '/nearby',
          subMenu: [
            { id: 'delivery', name: '食品配達', desc: '配達/テイクアウト/予約', icon: 'fa-utensils' },
            { id: 'takeout', name: 'テイクアウト注文', desc: 'ピックアップサービス', icon: 'fa-shopping-bag' },
            { id: 'reservation', name: '予約注文', desc: '事前予約', icon: 'fa-clock' },
            { id: 'categories', name: '店舗カテゴリ', desc: '地元料理/カフェ/マート', icon: 'fa-th-large' }
          ]
        },
        {
          id: 'market', name: '買い物·伝統市場', icon: 'fa-shopping-basket', path: '/market',
          subMenu: [
            { id: 'traditional', name: '伝統市場での買い物', desc: '市場カテゴリ別', icon: 'fa-store-alt' },
            { id: 'combined', name: '共同配送', desc: 'バンドル配送システム', icon: 'fa-boxes' },
            { id: 'local', name: '特産品·ローカルフード', desc: '地域農産物直取引', icon: 'fa-leaf' },
            { id: 'coupon', name: '市場クーポン', desc: '自治体発行クーポン', icon: 'fa-ticket-alt' }
          ]
        },
        {
          id: 'group', name: '共同購入', icon: 'fa-users', path: '/group',
          subMenu: [
            { id: 'ongoing', name: '進行中の共同購入', desc: 'リアルタイム参加率表示', icon: 'fa-hourglass-half' },
            { id: 'completed', name: '終了した共同購入', desc: '完了した共同購入履歴', icon: 'fa-check-circle' }
          ]
        },
        {
          id: 'events', name: '地域イベント·祭り', icon: 'fa-calendar-alt', path: '/events',
          subMenu: [
            { id: 'list', name: 'イベントリスト', desc: '地域祭り情報', icon: 'fa-list' },
            { id: 'tickets', name: 'イベントチケット', desc: 'O2Oチケット購入', icon: 'fa-ticket-alt' },
            { id: 'stamp', name: 'スタンプツアー', desc: 'GPSベースのスタンプツアー', icon: 'fa-stamp' }
          ]
        },
        {
          id: 'payment', name: '地域通貨決済', icon: 'fa-credit-card', path: '/payment',
          subMenu: [
            { id: 'register', name: '地域通貨登録', desc: 'モバイル/カード型登録', icon: 'fa-id-card' },
            { id: 'balance', name: '残高照会', desc: 'リアルタイム残高確認', icon: 'fa-wallet' },
            { id: 'history', name: '決済履歴', desc: '取引履歴照会', icon: 'fa-history' },
            { id: 'settlement', name: '精算履歴', desc: 'キャッシュバック/精算詳細', icon: 'fa-file-invoice-dollar' }
          ]
        },
        {
          id: 'mypage', name: 'マイページ', icon: 'fa-user', path: '/mypage',
          subMenu: [
            { id: 'orders', name: '注文履歴', desc: '注文/返金履歴', icon: 'fa-receipt' },
            { id: 'coupons', name: 'クーポン', desc: 'クーポン管理', icon: 'fa-tags' },
            { id: 'balance', name: '地域通貨残高', desc: 'リアルタイム残高', icon: 'fa-coins' },
            { id: 'favorites', name: 'お気に入り', desc: 'お気に入りの店舗', icon: 'fa-heart' },
            { id: 'support', name: 'カスタマーサポート', desc: 'お問い合わせ/FAQ', icon: 'fa-headset' }
          ]
        },
        {
          id: 'merchant', name: '小規模事業者センター', icon: 'fa-store', path: '/merchant',
          subMenu: [
            { id: 'info', name: '店舗情報管理', desc: '事業者認証,営業時間設定', icon: 'fa-info-circle' },
            { id: 'menu', name: 'メニュー管理(OCR)', desc: '写真·価格自動認識', icon: 'fa-camera' },
            { id: 'pos', name: 'POS連携', desc: '自動注文受信', icon: 'fa-cash-register' },
            { id: 'orders', name: '注文·配車管理', desc: 'リアルタイム注文処理', icon: 'fa-clipboard-list' },
            { id: 'stats', name: '売上·統計', desc: '曜日別/時間帯別分析', icon: 'fa-chart-bar' },
            { id: 'settlement', name: '精算管理', desc: '手数料1~2%,翌日精算', icon: 'fa-calculator' }
          ]
        },
        {
          id: 'admin', name: '自治体管理者', icon: 'fa-shield-alt', path: '/admin',
          subMenu: [
            { id: 'dashboard', name: '政策ダッシュボード', desc: '地域経済指標の可視化', icon: 'fa-tachometer-alt' },
            { id: 'analysis', name: 'データ分析', desc: '商圏活性化指標', icon: 'fa-chart-pie' },
            { id: 'coupons', name: '公共クーポン発行', desc: 'クーポン発行システム', icon: 'fa-gift' },
            { id: 'notice', name: 'アンケート·お知らせ', desc: '緊急お知らせ/政策アンケート', icon: 'fa-bullhorn' },
            { id: 'merchants', name: '加盟店管理', desc: '加盟店承認/管理', icon: 'fa-store-alt' },
            { id: 'delivery', name: '配達代行管理', desc: 'GPSリアルタイムマッピング', icon: 'fa-truck' }
          ]
        }
      ]
    },
    vi: {
      mainMenu: [
        { id: 'home', name: 'Trang chủ', icon: 'fa-home', path: '/' },
        {
          id: 'nearby', name: 'Cửa hàng·Giao hàng', icon: 'fa-motorcycle', path: '/nearby',
          subMenu: [
            { id: 'delivery', name: 'Giao đồ ăn', desc: 'Giao hàng/Mang đi/Đặt trước', icon: 'fa-utensils' },
            { id: 'takeout', name: 'Đơn mang đi', desc: 'Dịch vụ lấy hàng', icon: 'fa-shopping-bag' },
            { id: 'reservation', name: 'Đặt trước', desc: 'Đặt trước', icon: 'fa-clock' },
            { id: 'categories', name: 'Danh mục cửa hàng', desc: 'Đồ ăn địa phương/Quán cà phê/Chợ', icon: 'fa-th-large' }
          ]
        },
        {
          id: 'market', name: 'Mua sắm·Chợ truyền thống', icon: 'fa-shopping-basket', path: '/market',
          subMenu: [
            { id: 'traditional', name: 'Chợ truyền thống', desc: 'Danh mục chợ', icon: 'fa-store-alt' },
            { id: 'combined', name: 'Giao hàng kết hợp', desc: 'Hệ thống giao hàng gộp', icon: 'fa-boxes' },
            { id: 'local', name: 'Đặc sản·Thực phẩm địa phương', desc: 'Giao dịch trực tiếp nông sản địa phương', icon: 'fa-leaf' },
            { id: 'coupon', name: 'Phiếu giảm giá chợ', desc: 'Phiếu giảm giá do chính phủ phát hành', icon: 'fa-ticket-alt' }
          ]
        },
        {
          id: 'group', name: 'Mua nhóm', icon: 'fa-users', path: '/group',
          subMenu: [
            { id: 'ongoing', name: 'Đang tiến hành', desc: 'Hiển thị tỷ lệ tham gia theo thời gian thực', icon: 'fa-hourglass-half' },
            { id: 'completed', name: 'Đã kết thúc', desc: 'Lịch sử mua nhóm đã hoàn thành', icon: 'fa-check-circle' }
          ]
        },
        {
          id: 'events', name: 'Sự kiện·Lễ hội', icon: 'fa-calendar-alt', path: '/events',
          subMenu: [
            { id: 'list', name: 'Danh sách sự kiện', desc: 'Thông tin lễ hội địa phương', icon: 'fa-list' },
            { id: 'tickets', name: 'Vé sự kiện', desc: 'Mua vé O2O', icon: 'fa-ticket-alt' },
            { id: 'stamp', name: 'Tham quan tem', desc: 'Tham quan tem dựa trên GPS', icon: 'fa-stamp' }
          ]
        },
        {
          id: 'payment', name: 'Tiền tệ địa phương', icon: 'fa-credit-card', path: '/payment',
          subMenu: [
            { id: 'register', name: 'Đăng ký tiền tệ', desc: 'Đăng ký loại di động/thẻ', icon: 'fa-id-card' },
            { id: 'balance', name: 'Kiểm tra số dư', desc: 'Kiểm tra số dư theo thời gian thực', icon: 'fa-wallet' },
            { id: 'history', name: 'Lịch sử thanh toán', desc: 'Tra cứu lịch sử giao dịch', icon: 'fa-history' },
            { id: 'settlement', name: 'Quyết toán', desc: 'Chi tiết hoàn tiền/quyết toán', icon: 'fa-file-invoice-dollar' }
          ]
        },
        {
          id: 'mypage', name: 'Trang của tôi', icon: 'fa-user', path: '/mypage',
          subMenu: [
            { id: 'orders', name: 'Lịch sử đơn hàng', desc: 'Đơn hàng/Hoàn tiền', icon: 'fa-receipt' },
            { id: 'coupons', name: 'Phiếu giảm giá', desc: 'Quản lý phiếu giảm giá', icon: 'fa-tags' },
            { id: 'balance', name: 'Số dư tiền tệ', desc: 'Số dư theo thời gian thực', icon: 'fa-coins' },
            { id: 'favorites', name: 'Yêu thích', desc: 'Cửa hàng yêu thích', icon: 'fa-heart' },
            { id: 'support', name: 'Hỗ trợ', desc: 'Hỏi đáp/Câu hỏi thường gặp', icon: 'fa-headset' }
          ]
        },
        {
          id: 'merchant', name: 'Trung tâm thương nhân', icon: 'fa-store', path: '/merchant',
          subMenu: [
            { id: 'info', name: 'Quản lý thông tin cửa hàng', desc: 'Chứng nhận doanh nghiệp, giờ mở cửa', icon: 'fa-info-circle' },
            { id: 'menu', name: 'Quản lý thực đơn (OCR)', desc: 'Tự động nhận diện ảnh·giá', icon: 'fa-camera' },
            { id: 'pos', name: 'Tích hợp POS', desc: 'Tiếp nhận đơn hàng tự động', icon: 'fa-cash-register' },
            { id: 'orders', name: 'Quản lý đơn hàng·Điều phối', desc: 'Xử lý đơn hàng theo thời gian thực', icon: 'fa-clipboard-list' },
            { id: 'stats', name: 'Doanh số·Thống kê', desc: 'Phân tích theo ngày/giờ', icon: 'fa-chart-bar' },
            { id: 'settlement', name: 'Quản lý quyết toán', desc: 'Phí 1~2%, quyết toán ngày hôm sau', icon: 'fa-calculator' }
          ]
        },
        {
          id: 'admin', name: 'Quản trị viên', icon: 'fa-shield-alt', path: '/admin',
          subMenu: [
            { id: 'dashboard', name: 'Bảng điều khiển chính sách', desc: 'Trực quan hóa chỉ số kinh tế địa phương', icon: 'fa-tachometer-alt' },
            { id: 'analysis', name: 'Phân tích dữ liệu', desc: 'Chỉ số kích hoạt khu thương mại', icon: 'fa-chart-pie' },
            { id: 'coupons', name: 'Phát hành phiếu công cộng', desc: 'Hệ thống phát hành phiếu giảm giá', icon: 'fa-gift' },
            { id: 'notice', name: 'Khảo sát·Thông báo', desc: 'Thông báo khẩn cấp/khảo sát chính sách', icon: 'fa-bullhorn' },
            { id: 'merchants', name: 'Quản lý thương nhân', desc: 'Phê duyệt/quản lý thương nhân', icon: 'fa-store-alt' },
            { id: 'delivery', name: 'Quản lý giao hàng', desc: 'Ánh xạ GPS theo thời gian thực', icon: 'fa-truck' }
          ]
        }
      ]
    },
    th: {
      mainMenu: [
        { id: 'home', name: 'หน้าแรก', icon: 'fa-home', path: '/' },
        {
          id: 'nearby', name: 'ร้านค้าใกล้เคียง·จัดส่ง', icon: 'fa-motorcycle', path: '/nearby',
          subMenu: [
            { id: 'delivery', name: 'จัดส่งอาหาร', desc: 'จัดส่ง/รับเอง/จอง', icon: 'fa-utensils' },
            { id: 'takeout', name: 'สั่งกลับบ้าน', desc: 'บริการรับสินค้า', icon: 'fa-shopping-bag' },
            { id: 'reservation', name: 'จองล่วงหน้า', desc: 'สั่งจองล่วงหน้า', icon: 'fa-clock' },
            { id: 'categories', name: 'หมวดหมู่ร้านค้า', desc: 'อาหารท้องถิ่น/คาเฟ่/มาร์ท', icon: 'fa-th-large' }
          ]
        },
        {
          id: 'market', name: 'ช้อปปิ้ง·ตลาดดั้งเดิม', icon: 'fa-shopping-basket', path: '/market',
          subMenu: [
            { id: 'traditional', name: 'ตลาดดั้งเดิม', desc: 'หมวดหมู่ตลาด', icon: 'fa-store-alt' },
            { id: 'combined', name: 'จัดส่งรวม', desc: 'ระบบจัดส่งแบบรวม', icon: 'fa-boxes' },
            { id: 'local', name: 'ผลิตภัณฑ์ท้องถิ่น', desc: 'ซื้อขายตรงผลผลิตท้องถิ่น', icon: 'fa-leaf' },
            { id: 'coupon', name: 'คูปองตลาด', desc: 'คูปองที่ออกโดยรัฐบาล', icon: 'fa-ticket-alt' }
          ]
        },
        {
          id: 'group', name: 'ซื้อกลุ่ม', icon: 'fa-users', path: '/group',
          subMenu: [
            { id: 'ongoing', name: 'กำลังดำเนินการ', desc: 'แสดงอัตราการเข้าร่วมแบบเรียลไทม์', icon: 'fa-hourglass-half' },
            { id: 'completed', name: 'เสร็จสิ้นแล้ว', desc: 'ประวัติซื้อกลุ่มที่เสร็จสิ้น', icon: 'fa-check-circle' }
          ]
        },
        {
          id: 'events', name: 'กิจกรรมท้องถิ่น·เทศกาล', icon: 'fa-calendar-alt', path: '/events',
          subMenu: [
            { id: 'list', name: 'รายการกิจกรรม', desc: 'ข้อมูลเทศกาลท้องถิ่น', icon: 'fa-list' },
            { id: 'tickets', name: 'ตั๋วกิจกรรม', desc: 'ซื้อตั๋ว O2O', icon: 'fa-ticket-alt' },
            { id: 'stamp', name: 'ทัวร์แสตมป์', desc: 'ทัวร์แสตมป์ตาม GPS', icon: 'fa-stamp' }
          ]
        },
        {
          id: 'payment', name: 'เงินท้องถิ่น', icon: 'fa-credit-card', path: '/payment',
          subMenu: [
            { id: 'register', name: 'ลงทะเบียนเงินท้องถิ่น', desc: 'ลงทะเบียนแบบมือถือ/บัตร', icon: 'fa-id-card' },
            { id: 'balance', name: 'ตรวจสอบยอดเงิน', desc: 'ตรวจสอบยอดเงินแบบเรียลไทม์', icon: 'fa-wallet' },
            { id: 'history', name: 'ประวัติการชำระเงิน', desc: 'สอบถามประวัติธุรกรรม', icon: 'fa-history' },
            { id: 'settlement', name: 'การชำระบัญชี', desc: 'รายละเอียดการคืนเงิน/ชำระบัญชี', icon: 'fa-file-invoice-dollar' }
          ]
        },
        {
          id: 'mypage', name: 'หน้าของฉัน', icon: 'fa-user', path: '/mypage',
          subMenu: [
            { id: 'orders', name: 'ประวัติคำสั่งซื้อ', desc: 'คำสั่งซื้อ/การคืนเงิน', icon: 'fa-receipt' },
            { id: 'coupons', name: 'คูปองของฉัน', desc: 'การจัดการคูปอง', icon: 'fa-tags' },
            { id: 'balance', name: 'ยอดเงินท้องถิ่น', desc: 'ยอดเงินแบบเรียลไทม์', icon: 'fa-coins' },
            { id: 'favorites', name: 'รายการโปรด', desc: 'ร้านค้าที่ชื่นชอบ', icon: 'fa-heart' },
            { id: 'support', name: 'ฝ่ายสนับสนุน', desc: 'สอบถาม/คำถามที่พบบ่อย', icon: 'fa-headset' }
          ]
        },
        {
          id: 'merchant', name: 'ศูนย์พ่อค้า', icon: 'fa-store', path: '/merchant',
          subMenu: [
            { id: 'info', name: 'จัดการข้อมูลร้านค้า', desc: 'การรับรองธุรกิจ, เวลาทำการ', icon: 'fa-info-circle' },
            { id: 'menu', name: 'จัดการเมนู (OCR)', desc: 'รู้จักภาพ·ราคาอัตโนมัติ', icon: 'fa-camera' },
            { id: 'pos', name: 'การรวม POS', desc: 'รับคำสั่งซื้ออัตโนมัติ', icon: 'fa-cash-register' },
            { id: 'orders', name: 'จัดการคำสั่งซื้อ·การส่ง', desc: 'ประมวลผลคำสั่งซื้อแบบเรียลไทม์', icon: 'fa-clipboard-list' },
            { id: 'stats', name: 'ยอดขาย·สถิติ', desc: 'วิเคราะห์ตามวัน/เวลา', icon: 'fa-chart-bar' },
            { id: 'settlement', name: 'การจัดการชำระบัญชี', desc: 'ค่าธรรมเนียม 1~2%, ชำระบัญชีวันถัดไป', icon: 'fa-calculator' }
          ]
        },
        {
          id: 'admin', name: 'แดชบอร์ดผู้ดูแลระบบ', icon: 'fa-shield-alt', path: '/admin',
          subMenu: [
            { id: 'dashboard', name: 'แดชบอร์ดนโยบาย', desc: 'แสดงภาพตัวชี้วัดเศรษฐกิจท้องถิ่น', icon: 'fa-tachometer-alt' },
            { id: 'analysis', name: 'การวิเคราะห์ข้อมูล', desc: 'ตัวชี้วัดการเปิดใช้งานย่านการค้า', icon: 'fa-chart-pie' },
            { id: 'coupons', name: 'ออกคูปองสาธารณะ', desc: 'ระบบออกคูปอง', icon: 'fa-gift' },
            { id: 'notice', name: 'แบบสำรวจ·ประกาศ', desc: 'ประกาศเร่งด่วน/แบบสำรวจนโยบาย', icon: 'fa-bullhorn' },
            { id: 'merchants', name: 'การจัดการพ่อค้า', desc: 'การอนุมัติ/การจัดการพ่อค้า', icon: 'fa-store-alt' },
            { id: 'delivery', name: 'การจัดการการจัดส่ง', desc: 'การทำแผนที่ GPS แบบเรียลไทม์', icon: 'fa-truck' }
          ]
        }
      ]
    },
    ar: {
      mainMenu: [
        { id: 'home', name: 'الرئيسية', icon: 'fa-home', path: '/' },
        {
          id: 'nearby', name: 'المتاجر القريبة·التوصيل', icon: 'fa-motorcycle', path: '/nearby',
          subMenu: [
            { id: 'delivery', name: 'توصيل الطعام', desc: 'التوصيل/الطلبات الخارجية/الحجز', icon: 'fa-utensils' },
            { id: 'takeout', name: 'طلب الاستلام', desc: 'خدمة الاستلام', icon: 'fa-shopping-bag' },
            { id: 'reservation', name: 'الحجز المسبق', desc: 'الطلب المسبق', icon: 'fa-clock' },
            { id: 'categories', name: 'فئات المتاجر', desc: 'طعام محلي/مقهى/سوبر ماركت', icon: 'fa-th-large' }
          ]
        },
        {
          id: 'market', name: 'التسوق·الأسواق التقليدية', icon: 'fa-shopping-basket', path: '/market',
          subMenu: [
            { id: 'traditional', name: 'الأسواق التقليدية', desc: 'فئات السوق', icon: 'fa-store-alt' },
            { id: 'combined', name: 'التوصيل المشترك', desc: 'نظام التوصيل المجمع', icon: 'fa-boxes' },
            { id: 'local', name: 'المنتجات المحلية', desc: 'التجارة المباشرة للمنتجات المحلية', icon: 'fa-leaf' },
            { id: 'coupon', name: 'كوبونات السوق', desc: 'كوبونات صادرة عن الحكومة', icon: 'fa-ticket-alt' }
          ]
        },
        {
          id: 'group', name: 'الشراء الجماعي', icon: 'fa-users', path: '/group',
          subMenu: [
            { id: 'ongoing', name: 'قيد التنفيذ', desc: 'عرض معدل المشاركة في الوقت الفعلي', icon: 'fa-hourglass-half' },
            { id: 'completed', name: 'المكتمل', desc: 'تاريخ الشراء الجماعي المكتمل', icon: 'fa-check-circle' }
          ]
        },
        {
          id: 'events', name: 'الفعاليات المحلية·المهرجانات', icon: 'fa-calendar-alt', path: '/events',
          subMenu: [
            { id: 'list', name: 'قائمة الفعاليات', desc: 'معلومات المهرجانات المحلية', icon: 'fa-list' },
            { id: 'tickets', name: 'تذاكر الفعاليات', desc: 'شراء تذاكر O2O', icon: 'fa-ticket-alt' },
            { id: 'stamp', name: 'جولة الأختام', desc: 'جولة الأختام المستندة إلى GPS', icon: 'fa-stamp' }
          ]
        },
        {
          id: 'payment', name: 'العملة المحلية', icon: 'fa-credit-card', path: '/payment',
          subMenu: [
            { id: 'register', name: 'تسجيل العملة', desc: 'التسجيل عبر الجوال/البطاقة', icon: 'fa-id-card' },
            { id: 'balance', name: 'التحقق من الرصيد', desc: 'التحقق من الرصيد في الوقت الفعلي', icon: 'fa-wallet' },
            { id: 'history', name: 'سجل الدفع', desc: 'الاستعلام عن سجل المعاملات', icon: 'fa-history' },
            { id: 'settlement', name: 'التسوية', desc: 'تفاصيل الاسترداد النقدي/التسوية', icon: 'fa-file-invoice-dollar' }
          ]
        },
        {
          id: 'mypage', name: 'صفحتي', icon: 'fa-user', path: '/mypage',
          subMenu: [
            { id: 'orders', name: 'سجل الطلبات', desc: 'الطلبات/المبالغ المستردة', icon: 'fa-receipt' },
            { id: 'coupons', name: 'كوبوناتي', desc: 'إدارة الكوبونات', icon: 'fa-tags' },
            { id: 'balance', name: 'رصيد العملة', desc: 'الرصيد في الوقت الفعلي', icon: 'fa-coins' },
            { id: 'favorites', name: 'المفضلة', desc: 'المتاجر المفضلة', icon: 'fa-heart' },
            { id: 'support', name: 'الدعم', desc: 'الاستفسارات/الأسئلة الشائعة', icon: 'fa-headset' }
          ]
        },
        {
          id: 'merchant', name: 'مركز التاجر', icon: 'fa-store', path: '/merchant',
          subMenu: [
            { id: 'info', name: 'إدارة معلومات المتجر', desc: 'شهادة الأعمال، ساعات العمل', icon: 'fa-info-circle' },
            { id: 'menu', name: 'إدارة القائمة (OCR)', desc: 'التعرف التلقائي على الصورة·السعر', icon: 'fa-camera' },
            { id: 'pos', name: 'تكامل نقاط البيع', desc: 'استقبال الطلبات التلقائي', icon: 'fa-cash-register' },
            { id: 'orders', name: 'إدارة الطلبات·الإرسال', desc: 'معالجة الطلبات في الوقت الفعلي', icon: 'fa-clipboard-list' },
            { id: 'stats', name: 'المبيعات·الإحصائيات', desc: 'التحليل حسب اليوم/الوقت', icon: 'fa-chart-bar' },
            { id: 'settlement', name: 'إدارة التسوية', desc: 'رسوم 1~2%، التسوية في اليوم التالي', icon: 'fa-calculator' }
          ]
        },
        {
          id: 'admin', name: 'لوحة تحكم المسؤول', icon: 'fa-shield-alt', path: '/admin',
          subMenu: [
            { id: 'dashboard', name: 'لوحة معلومات السياسة', desc: 'تصور مؤشرات الاقتصاد المحلي', icon: 'fa-tachometer-alt' },
            { id: 'analysis', name: 'تحليل البيانات', desc: 'مؤشرات تفعيل المنطقة التجارية', icon: 'fa-chart-pie' },
            { id: 'coupons', name: 'إصدار الكوبونات العامة', desc: 'نظام إصدار الكوبونات', icon: 'fa-gift' },
            { id: 'notice', name: 'الاستطلاعات·الإشعارات', desc: 'الإشعارات العاجلة/استطلاعات السياسة', icon: 'fa-bullhorn' },
            { id: 'merchants', name: 'إدارة التجار', desc: 'الموافقة على التجار/الإدارة', icon: 'fa-store-alt' },
            { id: 'delivery', name: 'إدارة التوصيل', desc: 'رسم خرائط GPS في الوقت الفعلي', icon: 'fa-truck' }
          ]
        }
      ]
    }
  }
  
  const menuData = menuTranslations[lang] || menuTranslations['ko']
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
          q: 'What is the Local Currency O2O Platform?',
          a: 'A public-private O2O platform that supports digital transformation of local small businesses, strengthens local currency linkage, and creates new local jobs.'
        },
        {
          q: 'What are the benefits?',
          a: 'Consumers: Up to 10% cashback with local currency payment\nSmall Businesses: 1-2% commission (saving avg. ₩8M annually)\nLocal Government: Economic revitalization and job creation (80-150 jobs)'
        },
        {
          q: 'How to use?',
          a: '1. Download app and sign up\n2. Register local currency (card/mobile)\n3. Order from nearby merchants\n4. Pay with local currency and get benefits'
        },
        {
          q: 'How do merchants join?',
          a: 'Easy application via platform app or website. Start with low commission without advertising or enrollment fees.'
        }
      ]
    },
    zh: {
      title: '常见问题',
      questions: [
        {
          q: '什么是地区货币O2O平台？',
          a: '支持本地小企业数字化转型，通过地区货币连接增强商圈活力，创造新的地区就业机会的公私合作O2O平台。'
        },
        {
          q: '有什么优惠？',
          a: '消费者：使用地区货币支付最高10%返现\n小企业：手续费降至1-2%（年均节省800万韩元）\n地方政府：激活地区经济及创造就业（80-150个岗位）'
        },
        {
          q: '如何使用？',
          a: '1. 下载应用并注册\n2. 注册地区货币（卡片/移动）\n3. 在附近商家订购\n4. 用地区货币支付并获得优惠'
        },
        {
          q: '商家如何加入？',
          a: '通过平台应用或网站轻松申请加盟。无需广告费和入驻费，以低手续费开始。'
        }
      ]
    },
    ja: {
      title: 'よくある質問',
      questions: [
        {
          q: '地域通貨O2Oプラットフォームとは何ですか？',
          a: '地域の小規模事業者のデジタル転換を支援し、地域通貨連携で商圏の自生力を強化し、新しい地域雇用を創出する公民協力O2Oプラットフォームです。'
        },
        {
          q: 'どんなメリットがありますか？',
          a: '消費者：地域通貨決済時最大10%キャッシュバック\n小規模事業者：手数料1~2%に削減（年平均800万ウォン削減）\n地方自治体：地域経済活性化と雇用創出（80~150名）'
        },
        {
          q: '使い方は？',
          a: '1. アプリダウンロードと会員登録\n2. 地域通貨登録（カード/モバイル）\n3. 近くの加盟店で注文\n4. 地域通貨で決済してメリット獲得'
        },
        {
          q: '加盟店はどう参加しますか？',
          a: 'プラットフォームアプリまたはウェブサイトで簡単に加盟店申請が可能です。広告費や入店費なしで低い手数料で始められます。'
        }
      ]
    },
    vi: {
      title: 'Câu hỏi thường gặp',
      questions: [
        {
          q: 'Nền tảng O2O Tiền tệ Địa phương là gì?',
          a: 'Nền tảng O2O công-tư hỗ trợ chuyển đổi số cho doanh nghiệp nhỏ địa phương, tăng cường sức sống khu thương mại thông qua liên kết tiền tệ địa phương, và tạo việc làm mới.'
        },
        {
          q: 'Có lợi ích gì?',
          a: 'Người tiêu dùng: Hoàn tiền tối đa 10% khi thanh toán bằng tiền tệ địa phương\nDoanh nghiệp nhỏ: Phí hoa hồng 1-2% (tiết kiệm trung bình 8 triệu won/năm)\nChính quyền: Kích hoạt kinh tế và tạo việc làm (80-150 việc)'
        },
        {
          q: 'Làm thế nào để sử dụng?',
          a: '1. Tải ứng dụng và đăng ký\n2. Đăng ký tiền tệ địa phương (thẻ/di động)\n3. Đặt hàng tại cửa hàng gần đó\n4. Thanh toán bằng tiền tệ địa phương và nhận ưu đãi'
        },
        {
          q: 'Cửa hàng tham gia như thế nào?',
          a: 'Đăng ký đơn giản qua ứng dụng hoặc website. Bắt đầu với phí hoa hồng thấp không cần phí quảng cáo hay phí gia nhập.'
        }
      ]
    },
    th: {
      title: 'คำถามที่พบบ่อย',
      questions: [
        {
          q: 'แพลตฟอร์ม O2O สกุลเงินท้องถิ่นคืออะไร?',
          a: 'แพลตฟอร์ม O2O ภาครัฐ-เอกชนที่สนับสนุนการเปลี่ยนแปลงทางดิจิทัลของธุรกิจขนาดเล็กในท้องถิ่น เสริมสร้างความเข้มแข็งของย่านการค้า และสร้างงานใหม่'
        },
        {
          q: 'มีประโยชน์อะไรบ้าง?',
          a: 'ผู้บริโภค: แคชแบ็กสูงสุด 10% เมื่อชำระด้วยสกุลเงินท้องถิ่น\nธุรกิจขนาดเล็ก: ค่าคอมมิชชัน 1-2% (ประหยัดเฉลี่ย 8 ล้านวอนต่อปี)\nรัฐบาลท้องถิ่น: กระตุ้นเศรษฐกิจและสร้างงาน (80-150 ตำแหน่ง)'
        },
        {
          q: 'ใช้งานอย่างไร?',
          a: '1. ดาวน์โหลดแอพและสมัครสมาชิก\n2. ลงทะเบียนสกุลเงินท้องถิ่น (บัตร/มือถือ)\n3. สั่งซื้อจากร้านค้าใกล้เคียง\n4. ชำระด้วยสกุลเงินท้องถิ่นและรับสิทธิประโยชน์'
        },
        {
          q: 'ร้านค้าเข้าร่วมได้อย่างไร?',
          a: 'สมัครง่ายๆ ผ่านแอพหรือเว็บไซต์ เริ่มต้นด้วยค่าคอมมิชชันต่ำโดยไม่มีค่าโฆษณาหรือค่าเข้าร่วม'
        }
      ]
    },
    ar: {
      title: 'الأسئلة الشائعة',
      questions: [
        {
          q: 'ما هي منصة O2O للعملة المحلية؟',
          a: 'منصة O2O عامة-خاصة تدعم التحول الرقمي للشركات الصغيرة المحلية، وتعزز المناطق التجارية من خلال ربط العملة المحلية، وتخلق فرص عمل جديدة.'
        },
        {
          q: 'ما هي الفوائد؟',
          a: 'المستهلكون: استرداد نقدي يصل إلى 10٪ عند الدفع بالعملة المحلية\nالشركات الصغيرة: عمولة 1-2٪ (توفير متوسط 8 مليون وون سنويًا)\nالحكومة المحلية: تنشيط الاقتصاد وخلق وظائف (80-150 وظيفة)'
        },
        {
          q: 'كيف تستخدم المنصة؟',
          a: '1. تنزيل التطبيق والتسجيل\n2. تسجيل العملة المحلية (بطاقة/موبايل)\n3. الطلب من التجار القريبين\n4. الدفع بالعملة المحلية والحصول على الفوائد'
        },
        {
          q: 'كيف ينضم التجار؟',
          a: 'تقديم طلب سهل عبر التطبيق أو الموقع. ابدأ بعمولة منخفضة بدون رسوم إعلان أو اشتراك.'
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
                    <a href="#services" class="bg-white text-purple-600 px-4 md:px-8 py-2 md:py-4 rounded-full font-bold text-sm md:text-base hover:shadow-xl transition">
                        서비스 시작
                    </a>
                    <a href="#benefits" class="border-2 border-white px-4 md:px-8 py-2 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-white hover:text-purple-600 transition">
                        자세히 보기
                    </a>
                </div>
            </div>
        </section>

        <!-- Quick Menu Cards -->
        <section id="services" class="py-8 md:py-16 bg-white">
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
        <section id="allServices" class="py-10 md:py-20 bg-white">
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
                    <h3 class="font-bold text-lg" id="chatbotTitle">Benefit 챗봇</h3>
                    <p class="text-sm opacity-90" id="chatbotSubtitle">무엇을 도와드릴까요?</p>
                </div>
                <button id="closeChatbot" class="text-white hover:text-gray-200">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="chatbot-messages" id="chatbotMessages">
                <div class="message bot" id="welcomeMessage">안녕하세요! Benefit 플랫폼 도우미입니다.</div>
            </div>
            
            <div class="faq-list" id="faqList"></div>
        </div>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
