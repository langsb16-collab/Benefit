import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

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
        },
        {
          q: '배달은 어떻게 이루어지나요?',
          a: '지역 기반 배달 대행사와 협력하여 안전하고 빠른 배달 서비스를 제공합니다. 라이더는 지역 주민을 우선 고용하여 일자리를 창출합니다.'
        },
        {
          q: '지역화폐 외 다른 결제 수단도 사용 가능한가요?',
          a: '현재는 지역화폐 전용 플랫폼으로 운영되며, 지역 경제 활성화를 위해 지역화폐 사용을 우선합니다.'
        },
        {
          q: '민간 배달 앱과 차이점은?',
          a: '수수료: 민간 10~15% vs 우리 플랫폼 1~2%\n수익: 지역 내 순환 vs 수도권 본사 유출\n혜택: 지역화폐 인센티브 추가 제공\n일자리: 지역 주민 우선 고용'
        },
        {
          q: '어떤 서비스를 이용할 수 있나요?',
          a: '배달: 음식점, 카페 등\n포장 주문: 픽업 서비스\n전통시장 장보기: 신선식품 배달\n지역 특산품: 온라인 구매\n공동구매: 마을 단위 할인'
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          q: 'What is a Local Currency O2O Platform?',
          a: 'A public-private O2O platform that supports digital transformation of local small businesses, strengthens local commercial districts through integration with local currency, and creates new local jobs.'
        },
        {
          q: 'What benefits are available?',
          a: 'Consumers: Up to 10% cashback on local currency payments, instant discounts\nSmall businesses: 1~2% fee (vs 10~15% on private platforms), avg. ₩8M annual savings\nLocal government: Economic revitalization and 80~150 new jobs'
        },
        {
          q: 'How do I use it?',
          a: '1. Download app and sign up\n2. Register local currency (card/mobile)\n3. Order from nearby merchants\n4. Pay with local currency and enjoy benefits'
        },
        {
          q: 'How can merchants join?',
          a: 'Easy merchant application through the platform app or website. Start with low fees without advertising or enrollment costs.'
        },
        {
          q: 'How does delivery work?',
          a: 'We partner with local delivery agencies to provide safe and fast delivery services. Riders are hired from local residents to create jobs.'
        },
        {
          q: 'Can I use other payment methods besides local currency?',
          a: 'Currently operated as a local currency-exclusive platform to prioritize regional economic development.'
        },
        {
          q: 'What\'s the difference from private delivery apps?',
          a: 'Fees: Private 10~15% vs Our platform 1~2%\nRevenue: Circulates locally vs Goes to headquarters\nBenefits: Additional local currency incentives\nJobs: Priority hiring of local residents'
        },
        {
          q: 'What services are available?',
          a: 'Delivery: Restaurants, cafes, etc.\nPickup orders: Takeout service\nTraditional market shopping: Fresh food delivery\nLocal specialties: Online purchase\nGroup buying: Village-level discounts'
        }
      ]
    },
    zh: {
      title: '常见问题',
      questions: [
        {
          q: '什么是地方货币O2O平台？',
          a: '支持地方小企业数字化转型、通过与地方货币结合增强地方商业区活力、创造新的地方就业机会的公私合作O2O平台。'
        },
        {
          q: '有什么好处？',
          a: '消费者：使用地方货币支付最高10%返现、即时折扣\n小企业：手续费1~2%（私营平台10~15%）、年均节省800万韩元\n地方政府：经济活性化及创造80~150个就业岗位'
        },
        {
          q: '如何使用？',
          a: '1. 下载应用并注册\n2. 注册地方货币（卡/手机）\n3. 从附近商家订购\n4. 用地方货币支付并享受优惠'
        },
        {
          q: '商家如何加入？',
          a: '通过平台应用或网站简单申请成为商家。无广告费和入驻费，以低手续费开始。'
        },
        {
          q: '配送如何进行？',
          a: '与地方配送代理合作，提供安全快速的配送服务。优先雇用当地居民为骑手，创造就业。'
        },
        {
          q: '除了地方货币还能使用其他支付方式吗？',
          a: '目前作为地方货币专用平台运营，优先使用地方货币以促进地方经济发展。'
        },
        {
          q: '与私营配送应用有什么区别？',
          a: '手续费：私营10~15% vs 我们的平台1~2%\n收益：在地方循环 vs 流向总部\n优惠：额外提供地方货币激励\n就业：优先雇用当地居民'
        },
        {
          q: '可以使用哪些服务？',
          a: '配送：餐厅、咖啡厅等\n自取订单：外卖服务\n传统市场购物：新鲜食品配送\n地方特产：在线购买\n团购：村级折扣'
        }
      ]
    },
    ja: {
      title: 'よくある質問',
      questions: [
        {
          q: '地域通貨O2Oプラットフォームとは何ですか？',
          a: '地域の小規模事業者のデジタル転換を支援し、地域通貨と連携して地域商店街の自立力を強化し、新しい地域雇用を創出する官民協力O2Oプラットフォームです。'
        },
        {
          q: 'どんなメリットがありますか？',
          a: '消費者：地域通貨決済時最大10%キャッシュバック、即時割引\n小規模事業者：手数料1~2%（民間プラットフォーム比）、年平均800万ウォン節減\n自治体：地域経済活性化及び雇用創出（80~150人）'
        },
        {
          q: 'どのように使用しますか？',
          a: '1. アプリダウンロード及び会員登録\n2. 地域通貨登録（カード型/モバイル型）\n3. 近くの加盟店で注文\n4. 地域通貨で決済して特典を受ける'
        },
        {
          q: '加盟店はどのように参加できますか？',
          a: 'プラットフォームアプリまたはウェブサイトで簡単に加盟店申請が可能です。広告費及び入店費なしに低い手数料で始められます。'
        },
        {
          q: '配達はどのように行われますか？',
          a: '地域ベースの配達代行会社と協力して安全で速い配達サービスを提供します。ライダーは地域住民を優先採用して雇用を創出します。'
        },
        {
          q: '地域通貨以外の決済手段も使用可能ですか？',
          a: '現在は地域通貨専用プラットフォームとして運営され、地域経済活性化のため地域通貨使用を優先します。'
        },
        {
          q: '民間配達アプリとの違いは？',
          a: '手数料：民間10~15% vs 当プラットフォーム1~2%\n収益：地域内循環 vs 首都圏本社流出\n特典：地域通貨インセンティブ追加提供\n雇用：地域住民優先採用'
        },
        {
          q: 'どんなサービスを利用できますか？',
          a: '配達：レストラン、カフェなど\nテイクアウト注文：ピックアップサービス\n伝統市場での買い物：新鮮食品配達\n地域特産品：オンライン購入\n共同購入：村単位の割引'
        }
      ]
    },
    vi: {
      title: 'Câu hỏi thường gặp',
      questions: [
        {
          q: 'Nền tảng O2O Tiền tệ địa phương là gì?',
          a: 'Nền tảng O2O hợp tác công-tư hỗ trợ chuyển đổi số của các doanh nghiệp nhỏ địa phương, tăng cường sức sống của khu thương mại địa phương thông qua liên kết với tiền tệ địa phương và tạo việc làm mới.'
        },
        {
          q: 'Có những lợi ích gì?',
          a: 'Người tiêu dùng: Hoàn tiền tới 10% khi thanh toán bằng tiền địa phương, giảm giá tức thì\nDoanh nghiệp nhỏ: Phí 1~2% (so với nền tảng tư nhân 10~15%), tiết kiệm trung bình 8 triệu won/năm\nChính quyền: Kích hoạt kinh tế và tạo 80~150 việc làm'
        },
        {
          q: 'Làm thế nào để sử dụng?',
          a: '1. Tải ứng dụng và đăng ký\n2. Đăng ký tiền địa phương (thẻ/di động)\n3. Đặt hàng từ cửa hàng gần đó\n4. Thanh toán bằng tiền địa phương và nhận ưu đãi'
        },
        {
          q: 'Cửa hàng tham gia như thế nào?',
          a: 'Đăng ký cửa hàng đơn giản qua ứng dụng hoặc website. Bắt đầu với phí thấp, không có chi phí quảng cáo hay gia nhập.'
        },
        {
          q: 'Giao hàng được thực hiện như thế nào?',
          a: 'Hợp tác với các đại lý giao hàng địa phương để cung cấp dịch vụ giao hàng an toàn và nhanh chóng. Ưu tiên tuyển dụng người dân địa phương làm tài xế.'
        },
        {
          q: 'Có thể sử dụng phương thức thanh toán khác ngoài tiền địa phương không?',
          a: 'Hiện tại vận hành như nền tảng chuyên dụng tiền địa phương để ưu tiên phát triển kinh tế khu vực.'
        },
        {
          q: 'Khác biệt với ứng dụng giao hàng tư nhân?',
          a: 'Phí: Tư nhân 10~15% vs Nền tảng của chúng tôi 1~2%\nDoanh thu: Lưu chuyển nội địa vs Chảy về trụ sở\nƯu đãi: Khuyến khích tiền địa phương bổ sung\nViệc làm: Ưu tiên tuyển dụng người dân địa phương'
        },
        {
          q: 'Có thể sử dụng dịch vụ nào?',
          a: 'Giao hàng: Nhà hàng, quán cà phê, v.v.\nĐặt mang về: Dịch vụ lấy hàng\nMua sắm chợ truyền thống: Giao thực phẩm tươi\nĐặc sản địa phương: Mua hàng trực tuyến\nMua chung: Giảm giá cấp làng'
        }
      ]
    },
    th: {
      title: 'คำถามที่พบบ่อย',
      questions: [
        {
          q: 'แพลตฟอร์ม O2O สกุลเงินท้องถิ่นคืออะไร?',
          a: 'แพลตฟอร์ม O2O ความร่วมมือภาครัฐ-เอกชนที่สนับสนุนการเปลี่ยนผ่านดิจิทัลของธุรกิจขนาดเล็กในท้องถิ่น เสริมสร้างความเข้มแข็งของพื้นที่การค้าท้องถิ่นผ่านการเชื่อมโยงกับสกุลเงินท้องถิ่น และสร้างงานใหม่'
        },
        {
          q: 'มีสิทธิประโยชน์อะไรบ้าง?',
          a: 'ผู้บริโภค: คืนเงินสูงสุด 10% เมื่อชำระด้วยสกุลเงินท้องถิ่น ส่วนลดทันที\nธุรกิจขนาดเล็ก: ค่าธรรมเนียม 1~2% (เทียบกับแพลตฟอร์มเอกชน 10~15%) ประหยัดเฉลี่ย 8 ล้านวอนต่อปี\nรัฐบาลท้องถิ่น: กระตุ้นเศรษฐกิจและสร้างงาน 80~150 ตำแหน่ง'
        },
        {
          q: 'ใช้งานอย่างไร?',
          a: '1. ดาวน์โหลดแอปและลงทะเบียน\n2. ลงทะเบียนสกุลเงินท้องถิ่น (บัตร/มือถือ)\n3. สั่งซื้อจากร้านค้าใกล้เคียง\n4. ชำระด้วยสกุลเงินท้องถิ่นและรับสิทธิประโยชน์'
        },
        {
          q: 'ร้านค้าเข้าร่วมได้อย่างไร?',
          a: 'สมัครเป็นร้านค้าได้ง่ายผ่านแอปหรือเว็บไซต์ เริ่มต้นด้วยค่าธรรมเนียมต่ำ ไม่มีค่าโฆษณาหรือค่าสมัคร'
        },
        {
          q: 'การจัดส่งทำอย่างไร?',
          a: 'ร่วมมือกับตัวแทนจัดส่งท้องถิ่นเพื่อให้บริการจัดส่งที่ปลอดภัยและรวดเร็ว จ้างงานผู้ขับขี่จากคนในท้องถิ่นเป็นอันดับแรก'
        },
        {
          q: 'ใช้วิธีชำระเงินอื่นนอกจากสกุลเงินท้องถิ่นได้ไหม?',
          a: 'ปัจจุบันดำเนินการเป็นแพลตฟอร์มสกุลเงินท้องถิ่นเฉพาะเพื่อให้ความสำคัญกับการพัฒนาเศรษฐกิจในภูมิภาค'
        },
        {
          q: 'แตกต่างจากแอปจัดส่งเอกชนอย่างไร?',
          a: 'ค่าธรรมเนียม: เอกชน 10~15% vs แพลตฟอร์มของเรา 1~2%\nรายได้: หมุนเวียนในท้องถิ่น vs ไหลไปสำนักงานใหญ่\nสิทธิประโยชน์: จูงใจเพิ่มเติมด้วยสกุลเงินท้องถิ่น\nงาน: จ้างงานคนท้องถิ่นเป็นอันดับแรก'
        },
        {
          q: 'ใช้บริการอะไรได้บ้าง?',
          a: 'จัดส่ง: ร้านอาหาร คาเฟ่ ฯลฯ\nสั่งรับเอง: บริการรับสินค้า\nช็อปปิ้งตลาดดั้งเดิม: จัดส่งอาหารสด\nสินค้าพิเศษท้องถิ่น: ซื้อออนไลน์\nซื้อร่วม: ส่วนลดระดับหมู่บ้าน'
        }
      ]
    },
    ar: {
      title: 'الأسئلة الشائعة',
      questions: [
        {
          q: 'ما هي منصة O2O للعملة المحلية؟',
          a: 'منصة O2O للشراكة بين القطاعين العام والخاص تدعم التحول الرقمي للشركات الصغيرة المحلية، وتعزز حيوية المناطق التجارية المحلية من خلال الربط مع العملة المحلية، وتخلق فرص عمل جديدة.'
        },
        {
          q: 'ما هي الفوائد المتاحة؟',
          a: 'المستهلكون: استرداد نقدي يصل إلى 10٪ عند الدفع بالعملة المحلية، خصومات فورية\nالشركات الصغيرة: رسوم 1~2٪ (مقابل 10~15٪ في المنصات الخاصة)، توفير بمتوسط 8 مليون وون سنوياً\nالحكومة المحلية: تنشيط اقتصادي وخلق 80~150 وظيفة'
        },
        {
          q: 'كيف أستخدمها؟',
          a: '1. تنزيل التطبيق والتسجيل\n2. تسجيل العملة المحلية (بطاقة/محمول)\n3. الطلب من المتاجر القريبة\n4. الدفع بالعملة المحلية والحصول على المزايا'
        },
        {
          q: 'كيف يمكن للتجار الانضمام؟',
          a: 'تسجيل بسيط للتجار من خلال التطبيق أو الموقع الإلكتروني. ابدأ برسوم منخفضة بدون تكاليف إعلان أو تسجيل.'
        },
        {
          q: 'كيف يتم التوصيل؟',
          a: 'نتعاون مع وكالات التوصيل المحلية لتقديم خدمات توصيل آمنة وسريعة. يتم توظيف السائقين من السكان المحليين بالأولوية.'
        },
        {
          q: 'هل يمكن استخدام وسائل دفع أخرى غير العملة المحلية؟',
          a: 'حالياً يعمل كمنصة حصرية للعملة المحلية لإعطاء الأولوية لتنمية الاقتصاد الإقليمي.'
        },
        {
          q: 'ما الفرق عن تطبيقات التوصيل الخاصة؟',
          a: 'الرسوم: خاص 10~15٪ مقابل منصتنا 1~2٪\nالإيرادات: تدور محلياً مقابل تذهب للمقر الرئيسي\nالمزايا: حوافز إضافية بالعملة المحلية\nالوظائف: أولوية توظيف السكان المحليين'
        },
        {
          q: 'ما هي الخدمات المتاحة؟',
          a: 'التوصيل: المطاعم، المقاهي، إلخ.\nطلبات الاستلام: خدمة الاستلام\nالتسوق من السوق التقليدي: توصيل طعام طازج\nمنتجات محلية خاصة: شراء عبر الإنترنت\nالشراء الجماعي: خصومات على مستوى القرية'
        }
      ]
    }
  }
  
  return c.json(faqData[lang] || faqData.ko)
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>지역화폐 O2O 플랫폼-Benefit</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
          
          * {
            font-family: 'Noto Sans KR', sans-serif;
          }
          
          .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          .gradient-bg-2 {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          }
          
          .gradient-bg-3 {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          }
          
          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          
          .chatbot-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            z-index: 1000;
            transition: all 0.3s ease;
          }
          
          .chatbot-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(102, 126, 234, 0.7);
          }
          
          .chatbot-panel {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 380px;
            max-width: calc(100vw - 60px);
            height: 550px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 50px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            z-index: 999;
            overflow: hidden;
          }
          
          .chatbot-panel.active {
            display: flex;
            animation: slideUp 0.3s ease;
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .chatbot-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .chatbot-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f7f7f7;
          }
          
          .message {
            margin-bottom: 15px;
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 80%;
            animation: fadeIn 0.3s ease;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .message.bot {
            background: white;
            color: #333;
            margin-right: auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          
          .message.user {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin-left: auto;
          }
          
          .faq-list {
            padding: 15px;
            background: white;
            border-top: 1px solid #e0e0e0;
          }
          
          .faq-item {
            padding: 12px;
            margin: 5px 0;
            background: #f5f5f5;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 14px;
          }
          
          .faq-item:hover {
            background: #e8e8ff;
            transform: translateX(5px);
          }
          
          .lang-selector {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            padding: 10px 20px;
            background: rgba(255,255,255,0.1);
            border-top: 1px solid rgba(255,255,255,0.2);
          }
          
          .lang-btn {
            padding: 6px 12px;
            background: rgba(255,255,255,0.2);
            border: none;
            border-radius: 15px;
            color: white;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s ease;
          }
          
          .lang-btn:hover, .lang-btn.active {
            background: white;
            color: #667eea;
          }
          
          .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }
          
          .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            z-index: 0;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .float-animation {
            animation: float 3s ease-in-out infinite;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Hero Section -->
        <section class="hero-section gradient-bg text-white relative">
            <div class="container mx-auto px-6 text-center relative z-10">
                <h1 class="text-5xl md:text-7xl font-bold mb-6 float-animation">
                    지역화폐 O2O 플랫폼
                </h1>
                <h2 class="text-3xl md:text-4xl font-light mb-8">Benefit (베네핏)</h2>
                <p class="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
                    지역 소상공인의 디지털 전환을 지원하고<br>
                    지역화폐와 연계하여 골목 상권의 자생력을 강화하며<br>
                    새로운 지역 일자리를 창출하는 공공·민관협력 플랫폼
                </p>
                <div class="flex gap-4 justify-center flex-wrap">
                    <a href="#features" class="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
                        주요 기능 보기
                    </a>
                    <a href="#benefits" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all hover:scale-105">
                        혜택 알아보기
                    </a>
                </div>
            </div>
        </section>

        <!-- Benefits Section -->
        <section id="benefits" class="py-20 bg-white">
            <div class="container mx-auto px-6">
                <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
                    세 가지 핵심 혜택
                </h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="card-hover bg-white p-8 rounded-2xl shadow-lg">
                        <div class="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-coins text-3xl text-white"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 text-gray-800">소상공인 부담 감소</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            민간 플랫폼 대비 수수료 <strong>1~2%</strong>로 대폭 절감
                        </p>
                        <ul class="text-gray-600 space-y-2">
                            <li>✓ 광고비·입점비 제로</li>
                            <li>✓ 연간 평균 800만원 절감</li>
                            <li>✓ 실질 순이익 증가</li>
                        </ul>
                    </div>
                    
                    <div class="card-hover bg-white p-8 rounded-2xl shadow-lg">
                        <div class="gradient-bg-2 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-chart-line text-3xl text-white"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 text-gray-800">지역경제 선순환</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            지역화폐 이용률 확대 및 수수료 지역 내 환류
                        </p>
                        <ul class="text-gray-600 space-y-2">
                            <li>✓ 역외 유출 차단</li>
                            <li>✓ 전통시장 활성화</li>
                            <li>✓ 상권 데이터 분석 제공</li>
                        </ul>
                    </div>
                    
                    <div class="card-hover bg-white p-8 rounded-2xl shadow-lg">
                        <div class="gradient-bg-3 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-users text-3xl text-white"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 text-gray-800">일자리 창출</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            1개 시군 기준 <strong>80~150명</strong> 직간접 고용
                        </p>
                        <ul class="text-gray-600 space-y-2">
                            <li>✓ 배달·픽업 인력</li>
                            <li>✓ 플랫폼 운영·IT 유지보수</li>
                            <li>✓ 전통시장 물류센터</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-20 bg-gray-100">
            <div class="container mx-auto px-6">
                <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
                    주요 기능
                </h2>
                <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 class="text-2xl font-bold mb-6 text-purple-600">
                            <i class="fas fa-user-circle mr-3"></i>소비자 기능
                        </h3>
                        <ul class="space-y-3 text-gray-700">
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>지역화폐 결제 (카드/모바일)</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>즉시 할인·캐시백 (최대 10%)</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>가까운 소상공인 우선 노출</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>배달·포장·전통시장 장보기</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>마을 단위 공동구매</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>지역행사/축제 연계 쿠폰</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 class="text-2xl font-bold mb-6 text-purple-600">
                            <i class="fas fa-store mr-3"></i>소상공인 기능
                        </h3>
                        <ul class="space-y-3 text-gray-700">
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>수수료 1~2% 고정</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>광고비·입점비 무료</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>POS/PDA 연동</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>지역화폐 신규 등록 자동 안내</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>메뉴 자동 등록 (사진·가격 OCR)</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>익일 정산 시스템</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 class="text-2xl font-bold mb-6 text-purple-600">
                            <i class="fas fa-building mr-3"></i>행정 기능
                        </h3>
                        <ul class="space-y-3 text-gray-700">
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>데이터 기반 상권 분석</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>지역화폐 소비 분석</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>시장/골목상권 활성화 지표</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>설문·긴급 공지 발송</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>정책 연계 대시보드</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 class="text-2xl font-bold mb-6 text-purple-600">
                            <i class="fas fa-shield-alt mr-3"></i>보안·안정성
                        </h3>
                        <ul class="space-y-3 text-gray-700">
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>TLS/SSL 전송 암호화</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>이중 서버/Failover 시스템</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>결제 이력 암호화 저장</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>24시간 장애 모니터링</li>
                            <li><i class="fas fa-check-circle text-green-500 mr-3"></i>자동 환불/취소 처리</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Success Cases Section -->
        <section class="py-20 bg-white">
            <div class="container mx-auto px-6">
                <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
                    성공 사례
                </h2>
                <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg">
                        <h3 class="text-2xl font-bold mb-4 text-purple-700">경기도 '배달특급'</h3>
                        <ul class="space-y-3 text-gray-700">
                            <li><i class="fas fa-star text-yellow-500 mr-2"></i>29개 시군 서비스 제공</li>
                            <li><i class="fas fa-star text-yellow-500 mr-2"></i>누적 거래액 <strong>3,800억원</strong> 돌파</li>
                            <li><i class="fas fa-star text-yellow-500 mr-2"></i>가맹점 <strong>5.2만개</strong> 확보</li>
                            <li><i class="fas fa-star text-yellow-500 mr-2"></i>회원 수 <strong>150만명</strong> 돌파</li>
                            <li><i class="fas fa-star text-yellow-500 mr-2"></i>소상공인 수수료 절감 <strong>380억원</strong></li>
                        </ul>
                    </div>
                    
                    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg">
                        <h3 class="text-2xl font-bold mb-4 text-blue-700">대구 '대구로'</h3>
                        <ul class="space-y-3 text-gray-700">
                            <li><i class="fas fa-star text-yellow-500 mr-2"></i>중개 수수료 <strong>1%</strong> 운영</li>
                            <li><i class="fas fa-star text-yellow-500 mr-2"></i>소상공인 총 <strong>105억원</strong> 수수료 절감</li>
                            <li><i class="fas fa-star text-yellow-500 mr-2"></i>지역화폐 연계 최대 10% 할인</li>
                            <li><i class="fas fa-star text-yellow-500 mr-2"></i>농특산물 라이브 커머스 연계</li>
                            <li><i class="fas fa-star text-yellow-500 mr-2"></i>전통시장 장보기 서비스</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 gradient-bg text-white">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-8">
                    지역 경제의 새로운 미래를 함께 만들어가세요
                </h2>
                <p class="text-xl mb-12 max-w-3xl mx-auto">
                    지역화폐 O2O 플랫폼 Benefit과 함께<br>
                    소상공인의 성공과 지역 경제 활성화를 실현하세요
                </p>
                <div class="flex gap-4 justify-center flex-wrap">
                    <button class="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
                        <i class="fas fa-phone mr-2"></i>문의하기
                    </button>
                    <button class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all hover:scale-105">
                        <i class="fas fa-download mr-2"></i>제안서 다운로드
                    </button>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="container mx-auto px-6 text-center">
                <h3 class="text-2xl font-bold mb-4">지역화폐 O2O 플랫폼 Benefit</h3>
                <p class="text-gray-400 mb-6">
                    지역 소상공인과 함께 성장하는 공공·민관협력 플랫폼
                </p>
                <div class="flex justify-center gap-6 mb-6">
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">
                        <i class="fab fa-facebook text-2xl"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">
                        <i class="fab fa-twitter text-2xl"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">
                        <i class="fab fa-instagram text-2xl"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">
                        <i class="fab fa-youtube text-2xl"></i>
                    </a>
                </div>
                <p class="text-gray-500 text-sm">
                    © 2024 Benefit Platform. All rights reserved.
                </p>
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
            
            <div class="lang-selector" id="langSelector">
                <button class="lang-btn active" data-lang="ko">한국어</button>
                <button class="lang-btn" data-lang="en">English</button>
                <button class="lang-btn" data-lang="zh">中文</button>
                <button class="lang-btn" data-lang="ja">日本語</button>
                <button class="lang-btn" data-lang="vi">Tiếng Việt</button>
                <button class="lang-btn" data-lang="th">ไทย</button>
                <button class="lang-btn" data-lang="ar">العربية</button>
            </div>
            
            <div class="chatbot-messages" id="chatbotMessages">
                <div class="message bot">
                    안녕하세요! Benefit 플랫폼 도우미입니다. 궁금하신 점을 선택해주세요.
                </div>
            </div>
            
            <div class="faq-list" id="faqList">
                <!-- FAQ items will be loaded here -->
            </div>
        </div>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
