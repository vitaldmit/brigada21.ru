import { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone, Mail, MapPin, Menu, X, ChevronDown, ChevronRight,
  Shield, Clock, Award, Users, Layers, CheckCircle,
  Home, Hammer, Warehouse, Wrench, Building2, HardHat,
  ArrowRight, Star, MessageCircle, Send, PlayCircle,
  TrendingUp, Calendar, FileText, Truck, Key,
  Instagram, Youtube
} from "lucide-react";

// ─── Utility ──────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, inView, duration]);
  return count;
}

// ─── Images ───────────────────────────────────────────────────────────────────

const IMG = {
  hero: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?w=1920&h=1080&fit=crop&auto=format",
  house2: "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?w=900&h=700&fit=crop&auto=format",
  house3: "https://images.unsplash.com/photo-1722421492323-eaf9c401befe?w=900&h=700&fit=crop&auto=format",
  house4: "https://images.unsplash.com/photo-1691425700585-c108acad6467?w=900&h=700&fit=crop&auto=format",
  workers: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=900&h=600&fit=crop&auto=format",
  site: "https://images.unsplash.com/photo-1694521787162-5373b598945c?w=900&h=600&fit=crop&auto=format",
  interior: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=900&h=600&fit=crop&auto=format",
  bricks: "https://images.unsplash.com/photo-1495578942200-c5f5d2137def?w=900&h=600&fit=crop&auto=format",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Процесс", href: "#process" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Контакты", href: "#contact" },
];

const WHY_ITEMS = [
  { icon: Award, title: "15 лет опыта", desc: "Построили более 300 домов по всей Чувашии. Каждый проект — наша гордость." },
  { icon: Shield, title: "Фиксированная цена", desc: "Стоимость зафиксирована в договоре. Никаких сюрпризов и скрытых платежей." },
  { icon: CheckCircle, title: "Гарантия 5 лет", desc: "Официальная гарантия на все виды работ. Устраним любой дефект за наш счёт." },
  { icon: Users, title: "Лицензированная бригада", desc: "Только штатные специалисты с допусками СРО. Без субподрядчиков." },
  { icon: Layers, title: "Премиум материалы", desc: "Работаем с сертифицированными поставщиками. Входной контроль каждой партии." },
  { icon: Clock, title: "Сдача в срок", desc: "98% объектов сданы точно в срок. Штрафные санкции за просрочку в договоре." },
];

const SERVICES = [
  { icon: Home, title: "Строительство домов", desc: "Индивидуальные проекты под ваш бюджет и образ жизни" },
  { icon: Warehouse, title: "Фундаментные работы", desc: "Ленточный, плитный, свайный фундамент с геологией" },
  { icon: Layers, title: "Кладка газобетона", desc: "AAC блоки — тепло, быстро, экономично" },
  { icon: Building2, title: "Кирпичная кладка", desc: "Облицовочный и строительный кирпич любых марок" },
  { icon: HardHat, title: "Кровельные работы", desc: "Металлочерепица, профнастил, мягкая кровля, вальма" },
  { icon: Wrench, title: "Ремонт и отделка", desc: "Капитальный ремонт под ключ с дизайн-проектом" },
  { icon: Hammer, title: "Пристройки", desc: "Расширение жилой площади без сноса и лишних затрат" },
  { icon: Key, title: "Под ключ", desc: "От проекта до регистрации — одна компания, один договор" },
];

const PROCESS_STEPS = [
  { icon: Phone, num: "01", title: "Консультация", desc: "Бесплатный выезд на участок. Обсуждаем ваши пожелания, бюджет и сроки." },
  { icon: FileText, num: "02", title: "Смета", desc: "Детальная смета в течение 3 дней. Фиксированная стоимость без изменений." },
  { icon: CheckCircle, num: "03", title: "Договор", desc: "Юридически защищённый договор с графиком платежей и этапами работ." },
  { icon: Truck, num: "04", title: "Строительство", desc: "Работы по утверждённому проекту. Еженедельные фотоотчёты на Telegram." },
  { icon: Key, num: "05", title: "Сдача объекта", desc: "Приёмка с вами. Документация, гарантийный паспорт, ключи в руки." },
];

const PORTFOLIO = [
  { img: IMG.hero, title: "Дом из кирпича", area: "180 м²", price: "от 4.2 млн ₽", tag: "Под ключ" },
  { img: IMG.house2, title: "Газобетонный дом", area: "142 м²", price: "от 2.8 млн ₽", tag: "Газобетон" },
  { img: IMG.house3, title: "Коттедж 2 этажа", area: "220 м²", price: "от 5.6 млн ₽", tag: "Кирпич" },
  { img: IMG.house4, title: "Дачный дом", area: "96 м²", price: "от 1.6 млн ₽", tag: "Брус" },
  { img: IMG.interior, title: "Отделка под ключ", area: "160 м²", price: "от 1.2 млн ₽", tag: "Ремонт" },
  { img: IMG.site, title: "Промышленный объект", area: "480 м²", price: "Индивидуально", tag: "Коммерция" },
];

const STATS = [
  { value: 300, suffix: "+", label: "Построенных домов" },
  { value: 15, suffix: " лет", label: "На рынке" },
  { value: 98, suffix: "%", label: "Сданы в срок" },
  { value: 5, suffix: " лет", label: "Гарантия" },
];

const TESTIMONIALS = [
  {
    name: "Алексей Петров",
    city: "Чебоксары",
    rating: 5,
    text: "Построили нам дом 160м² из газобетона за 7 месяцев. Всё точно по смете, никаких доплат. Бригада профессиональная, отчёты в Telegram каждую неделю. Рекомендую без сомнений!",
    project: "Дом 160 м²",
  },
  {
    name: "Марина Иванова",
    city: "Новочебоксарск",
    rating: 5,
    text: "Делали капитальный ремонт. Честная смета, хорошие материалы, сдали точно в срок. Больше всего понравилось, что не нужно было постоянно контролировать — всё делали сами.",
    project: "Ремонт квартиры",
  },
  {
    name: "Дмитрий Смирнов",
    city: "Чебоксары",
    rating: 5,
    text: "Заказывал фундамент и кладку. Геология, армирование — всё по проекту. Сосед уже строит — тоже порекомендовал эту компанию. Цена оказалась даже немного ниже сметы.",
    project: "Фундамент + кладка",
  },
];

const FAQS = [
  { q: "Сколько стоит строительство дома под ключ?", a: "Стоимость зависит от площади, материалов и сложности проекта. Примерный ориентир: дом из газобетона — от 18 000 ₽/м², из кирпича — от 24 000 ₽/м². Точную цену назовём после бесплатного выезда и составления сметы." },
  { q: "Как долго строится дом?", a: "Средний срок строительства дома 100–150 м² — 4–8 месяцев в зависимости от сложности и материала. Сроки фиксируются в договоре с поэтапным графиком работ." },
  { q: "Работаете ли вы по договору?", a: "Да, мы работаем исключительно по официальному договору подряда. В нём прописаны фиксированная стоимость, сроки, этапы оплаты, ответственность сторон и гарантийные обязательства." },
  { q: "Какие гарантии вы даёте?", a: "Мы предоставляем официальную гарантию 5 лет на все конструктивные элементы и 2 года на отделочные работы. При выявлении дефектов устраняем их за наш счёт." },
  { q: "Вы работаете с материнским капиталом и ипотекой?", a: "Да, мы работаем с материнским капиталом, сельской ипотекой и другими программами господдержки. Поможем с оформлением документов." },
  { q: "Можно ли посмотреть объекты в процессе строительства?", a: "Конечно! Мы организуем выезд на строящиеся объекты в любое удобное время. Также отправляем еженедельные фотоотчёты по Telegram." },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCounter({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(value, inView);
  return (
    <div className="text-center">
      <div className="text-5xl font-black text-white font-[Manrope] leading-none">
        {count}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-blue-200 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300",
        open ? "bg-blue-50" : "bg-white hover:bg-gray-50"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 font-[Manrope] text-lg leading-snug">{q}</span>
        <ChevronDown
          className={cn("shrink-0 text-blue-600 transition-transform duration-300 size-5", open && "rotate-180")}
        />
      </button>
      <div className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-gray-600 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100">
      <span className="size-1.5 rounded-full bg-orange-500 animate-pulse" />
      <span className="text-xs font-bold text-orange-600 uppercase tracking-[0.12em] font-[Manrope]">{children}</span>
    </div>
  );
}

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="size-9 rounded-xl bg-[#1E3A8A] flex items-center justify-center">
              <HardHat className="size-5 text-white" />
            </div>
            <div className="leading-none">
              <div className={cn("font-black text-base font-[Manrope] transition-colors", scrolled ? "text-[#1E3A8A]" : "text-white")}>
                СтройМастер
              </div>
              <div className={cn("text-[10px] uppercase tracking-widest font-medium transition-colors", scrolled ? "text-gray-400" : "text-blue-200")}>
                Чувашия
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-white/10",
                  scrolled ? "text-gray-700 hover:bg-gray-100 hover:text-[#1E3A8A]" : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+79530105335"
              className={cn(
                "flex items-center gap-1.5 text-sm font-semibold transition-colors",
                scrolled ? "text-gray-700 hover:text-[#1E3A8A]" : "text-white"
              )}
            >
              <Phone className="size-3.5" />
              +7 (953) 010-53-35
            </a>
            <button
              onClick={() => scrollTo("#estimate")}
              className="px-5 py-2.5 rounded-xl bg-[#F97316] text-white text-sm font-bold hover:bg-orange-500 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
            >
              Бесплатная смета
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn("lg:hidden p-2 rounded-xl transition-colors", scrolled ? "text-gray-900" : "text-white")}
            aria-label="Открыть меню"
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 pb-6 pt-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="w-full text-left px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:text-[#1E3A8A] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
            <a href="tel:+79530105335" className="flex items-center gap-2 px-4 py-3 text-gray-700 font-semibold">
              <Phone className="size-4 text-[#1E3A8A]" />
              +7 (953) 010-53-35
            </a>
            <button
              onClick={() => scrollTo("#estimate")}
              className="w-full px-5 py-3 rounded-xl bg-[#F97316] text-white font-bold hover:bg-orange-500 transition-colors"
            >
              Бесплатная смета
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#111827]">
      {/* Background image */}
      <img
        src={IMG.hero}
        alt="Современный дом — строительство в Чувашии"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/90 via-[#1E3A8A]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="size-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Принимаем заявки · Чувашская Республика</span>
          </div>

          <h1 className="font-[Manrope] font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight">
            Строим дома,{" "}
            <span className="relative inline-block">
              <span className="text-[#F97316]">которыми</span>
            </span>
            <br />
            гордятся годами
          </h1>

          <p className="mt-6 text-xl text-white/75 max-w-xl leading-relaxed">
            Фиксированная цена. Гарантия 5 лет. Сдача в срок.
            Строительство домов под ключ в Чувашской Республике с 2009 года.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#estimate")}
              className="group flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#F97316] text-white font-bold text-lg hover:bg-orange-500 transition-all shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              Получить бесплатную смету
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("#portfolio")}
              className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/25 text-white font-bold text-lg hover:bg-white/20 transition-all"
            >
              <PlayCircle className="size-5 text-orange-400" />
              Наши проекты
            </button>
          </div>

          {/* Trust stats */}
          <div className="mt-14 flex flex-wrap gap-6 sm:gap-10">
            {[
              { val: "300+", label: "построенных домов" },
              { val: "15 лет", label: "на рынке Чувашии" },
              { val: "5 лет", label: "официальная гарантия" },
            ].map((s) => (
              <div key={s.val} className="flex items-center gap-3">
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <div className="font-black text-2xl text-white font-[Manrope] leading-none">{s.val}</div>
                  <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs uppercase tracking-widest">Листайте</span>
        <div className="size-6 border border-white/20 rounded-full flex items-center justify-center">
          <ChevronDown className="size-3 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

function WhyUs() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Почему выбирают нас</SectionLabel>
          <h2 className="mt-4 font-[Manrope] font-black text-4xl lg:text-5xl text-gray-900 leading-tight">
            Строительство — это доверие
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Мы понимаем, что дом — это самое важное вложение в жизни.
            Поэтому каждый наш проект — это ответственность, а не просто работа.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_ITEMS.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 80}>
              <div className="group h-full p-8 rounded-3xl border border-gray-100 hover:border-blue-100 bg-white hover:bg-blue-50/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
                <div className="size-14 rounded-2xl bg-[#1E3A8A]/8 flex items-center justify-center mb-6 group-hover:bg-[#1E3A8A]/15 transition-colors">
                  <item.icon className="size-7 text-[#1E3A8A]" />
                </div>
                <h3 className="font-[Manrope] font-bold text-xl text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Banner */}
        <AnimatedSection className="mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-[#1E3A8A] p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="absolute inset-0 opacity-10">
              <img src={IMG.bricks} alt="" className="w-full h-full object-cover" aria-hidden="true" />
            </div>
            <div className="relative">
              <h3 className="font-[Manrope] font-black text-3xl lg:text-4xl text-white leading-tight max-w-lg">
                Готовы обсудить ваш проект?
              </h3>
              <p className="mt-3 text-blue-200 text-lg">Бесплатная консультация и выезд на участок</p>
            </div>
            <div className="relative shrink-0 flex flex-col sm:flex-row gap-3">
              <a href="tel:+79530105335"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#1E3A8A] font-bold hover:bg-blue-50 transition-colors">
                <Phone className="size-4" />
                Позвонить
              </a>
              <a href="https://t.me/vitaldmit"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F97316] text-white font-bold hover:bg-orange-500 transition-colors">
                <MessageCircle className="size-4" />
                Telegram
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Наши услуги</SectionLabel>
          <h2 className="mt-4 font-[Manrope] font-black text-4xl lg:text-5xl text-gray-900">
            Весь цикл строительства
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            От нулевого цикла до чистовой отделки — мы берём на себя каждый этап
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <AnimatedSection key={svc.title} delay={i * 60}>
              <div className="group h-full bg-white rounded-3xl p-7 border border-gray-100 hover:border-[#1E3A8A]/20 hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300 hover:-translate-y-1 cursor-default">
                <div className="size-12 rounded-xl bg-[#1E3A8A] flex items-center justify-center mb-5 group-hover:bg-[#F97316] transition-colors duration-300">
                  <svc.icon className="size-6 text-white" />
                </div>
                <h3 className="font-[Manrope] font-bold text-gray-900 text-lg mb-2">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[#F97316] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Узнать цену <ChevronRight className="size-4" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <button
            onClick={() => { document.querySelector("#estimate")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#1E3A8A] text-white font-bold text-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30"
          >
            Рассчитать стоимость вашего проекта
            <ArrowRight className="size-5" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Как мы работаем</SectionLabel>
          <h2 className="mt-4 font-[Manrope] font-black text-4xl lg:text-5xl text-gray-900">
            Прозрачный процесс
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Пять шагов от вашей идеи до готового дома
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 100}>
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  {/* Icon circle */}
                  <div className="relative mb-6">
                    <div className="size-24 rounded-full bg-[#1E3A8A] flex items-center justify-center shadow-xl shadow-blue-900/20">
                      <step.icon className="size-9 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 size-8 rounded-full bg-[#F97316] flex items-center justify-center">
                      <span className="text-white text-xs font-black font-[Manrope]">{step.num}</span>
                    </div>
                  </div>
                  <h3 className="font-[Manrope] font-bold text-xl text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

function Portfolio() {
  const [filter, setFilter] = useState("Все");
  const tags = ["Все", "Под ключ", "Газобетон", "Кирпич", "Ремонт"];
  const shown = filter === "Все" ? PORTFOLIO : PORTFOLIO.filter((p) => p.tag === filter);

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Портфолио</SectionLabel>
            <h2 className="mt-4 font-[Manrope] font-black text-4xl lg:text-5xl text-gray-900">
              Наши объекты
            </h2>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  filter === t
                    ? "bg-[#1E3A8A] text-white shadow-lg shadow-blue-900/20"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-[#1E3A8A]"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((proj, i) => (
            <AnimatedSection key={proj.title + i} delay={i * 80}>
              <div className="group relative overflow-hidden rounded-3xl bg-gray-900 aspect-[4/3] cursor-pointer">
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                />
                {/* Glassmorphism card overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#F97316]/90 backdrop-blur-sm text-white text-xs font-bold">
                    {proj.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-[Manrope] font-bold text-white text-xl">{proj.title}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-white/70 text-sm">{proj.area}</span>
                    <span className="text-[#F97316] font-semibold text-sm">{proj.price}</span>
                  </div>
                  {/* Hover button */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                    <button className="w-full py-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold hover:bg-white/30 transition-colors">
                      Подробнее о проекте
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold hover:bg-[#1E3A8A] hover:text-white transition-all">
            Смотреть все проекты
            <ArrowRight className="size-5" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats() {
  const { ref, inView } = useInView();

  return (
    <section className="py-20 bg-[#1E3A8A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img src={IMG.workers} alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 size-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 size-80 rounded-full bg-orange-500/10 blur-3xl" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <SectionLabel>Отзывы клиентов</SectionLabel>
          <h2 className="mt-4 font-[Manrope] font-black text-4xl lg:text-5xl text-gray-900">
            Говорят наши заказчики
          </h2>
          <div className="mt-3 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-5 fill-[#F97316] text-[#F97316]" />
            ))}
            <span className="ml-2 text-gray-500 text-sm">4.9 / 5 — 200+ отзывов</span>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 100}>
              <div
                onClick={() => setActive(i)}
                className={cn(
                  "h-full p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300",
                  active === i
                    ? "border-[#1E3A8A] bg-[#1E3A8A]/5 shadow-xl shadow-blue-900/10"
                    : "border-gray-100 bg-gray-50 hover:border-gray-200"
                )}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="size-4 fill-[#F97316] text-[#F97316]" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">"{t.text}"</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                  <div>
                    <div className="font-[Manrope] font-bold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{t.city}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] text-xs font-semibold">
                    {t.project}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full transition-all",
                active === i ? "w-8 h-2.5 bg-[#1E3A8A]" : "size-2.5 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Estimate Form ────────────────────────────────────────────────────────────

function EstimateForm() {
  const [form, setForm] = useState({ name: "", phone: "", area: "", type: "", comment: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-all text-sm";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <section id="estimate" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + info */}
          <AnimatedSection>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-gray-200">
                <img
                  src={IMG.site}
                  alt="Строительство дома в Чувашии"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Glassmorphism badge */}
              <div className="absolute -bottom-5 -right-5 sm:bottom-6 sm:right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-[#F97316] flex items-center justify-center shrink-0">
                    <TrendingUp className="size-6 text-white" />
                  </div>
                  <div>
                    <div className="font-[Manrope] font-black text-2xl text-gray-900">-15%</div>
                    <div className="text-xs text-gray-500">скидка при заключении<br />договора в этом месяце</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                { icon: Calendar, text: "Бесплатный выезд\nна участок" },
                { icon: FileText, text: "Смета за 3 рабочих\nдня" },
                { icon: Shield, text: "Фиксированная цена\nв договоре" },
                { icon: Phone, text: "Ответим в течение\n30 минут" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100">
                  <item.icon className="size-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 leading-snug whitespace-pre-line">{item.text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Form */}
          <AnimatedSection delay={150}>
            <SectionLabel>Бесплатная смета</SectionLabel>
            <h2 className="mt-4 font-[Manrope] font-black text-4xl lg:text-5xl text-gray-900 leading-tight">
              Рассчитайте стоимость вашего дома
            </h2>
            <p className="mt-4 text-gray-500">
              Оставьте заявку — перезвоним в течение 30 минут и назначим бесплатный выезд на участок
            </p>

            {sent ? (
              <div className="mt-8 p-8 rounded-3xl bg-green-50 border-2 border-green-200 text-center">
                <CheckCircle className="size-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-[Manrope] font-bold text-2xl text-gray-900">Заявка отправлена!</h3>
                <p className="mt-2 text-gray-500">Мы свяжемся с вами в течение 30 минут</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls} htmlFor="name">Ваше имя</label>
                    <input
                      id="name" type="text" placeholder="Александр" required
                      className={inputCls}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="phone">Телефон</label>
                    <input
                      id="phone" type="tel" placeholder="+7 (___) ___-__-__" required
                      className={inputCls}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="type">Тип работ</label>
                  <select
                    id="type"
                    className={cn(inputCls, "cursor-pointer")}
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="">Выберите тип работ</option>
                    <option>Строительство дома под ключ</option>
                    <option>Фундаментные работы</option>
                    <option>Кладка газобетона / кирпича</option>
                    <option>Кровельные работы</option>
                    <option>Ремонт и отделка</option>
                    <option>Пристройка</option>
                    <option>Другое</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls} htmlFor="area">Площадь (м²)</label>
                  <input
                    id="area" type="number" placeholder="например, 120"
                    className={inputCls}
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                  />
                </div>

                <div>
                  <label className={labelCls} htmlFor="comment">Комментарий (необязательно)</label>
                  <textarea
                    id="comment" rows={3} placeholder="Расскажите о вашем проекте..."
                    className={cn(inputCls, "resize-none")}
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#F97316] text-white font-bold text-lg hover:bg-orange-500 transition-all shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center gap-2"
                >
                  <Send className="size-5" />
                  Получить бесплатную смету
                </button>

                <p className="text-center text-xs text-gray-400">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="#" className="text-[#1E3A8A] hover:underline">политикой конфиденциальности</a>
                </p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function Faq() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimatedSection>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-4 font-[Manrope] font-black text-4xl lg:text-5xl text-gray-900 leading-tight">
              Часто задаваемые вопросы
            </h2>
            <p className="mt-6 text-gray-500 leading-relaxed">
              Не нашли ответа? Позвоните нам — мы с удовольствием ответим на любые вопросы
              о строительстве вашего будущего дома.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+79530105335"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1E3A8A] text-white font-semibold hover:bg-blue-800 transition-colors"
              >
                <Phone className="size-4" />
                Задать вопрос
              </a>
              <a
                href="https://t.me/vitaldmit"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors"
              >
                <MessageCircle className="size-4" />
                Telegram
              </a>
            </div>

            {/* Construction image */}
            <div className="mt-10 rounded-3xl overflow-hidden aspect-video bg-gray-200 hidden lg:block">
              <img
                src={IMG.workers}
                alt="Наша строительная бригада за работой"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const inputCls = "w-full px-4 py-3.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F97316]/40 focus:border-[#F97316]/60 transition-all text-sm";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Контакты</SectionLabel>
          <h2 className="mt-4 font-[Manrope] font-black text-4xl lg:text-5xl text-white">
            Свяжитесь с нами
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Работаем по всей Чувашской Республике. Бесплатный выезд на участок в любой день
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <AnimatedSection>
            <div className="space-y-6">
              {/* Contact cards */}
              {[
                {
                  icon: Phone,
                  label: "Телефон",
                  value: "+7 (953) 010-53-35",
                  sub: "Звонки ежедневно с 8:00 до 20:00",
                  href: "tel:+79530105335",
                  color: "bg-[#1E3A8A]",
                },
                {
                  icon: MessageCircle,
                  label: "Telegram",
                  value: "Написать в Telegram",
                  sub: "Отвечаем в течение 15 минут",
                  href: "https://t.me/vitaldmit",
                  color: "bg-green-600",
                },
                {
                  icon: Send,
                  label: "Telegram",
                  value: "@brigada21",
                  sub: "Быстрые ответы и фотоотчёты",
                  href: "https://t.me/brigada21",
                  color: "bg-sky-500",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@brigada21.ru",
                  sub: "Для документации и КП",
                  href: "mailto:info@brigada21.ru",
                  color: "bg-[#F97316]",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-gray-800/60 border border-gray-700 hover:border-gray-600 hover:bg-gray-800 transition-all group"
                >
                  <div className={cn("size-12 rounded-xl flex items-center justify-center shrink-0", c.color)}>
                    <c.icon className="size-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{c.label}</div>
                    <div className="font-semibold text-white group-hover:text-[#F97316] transition-colors truncate">{c.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{c.sub}</div>
                  </div>
                  <ChevronRight className="size-4 text-gray-600 group-hover:text-[#F97316] transition-colors shrink-0" />
                </a>
              ))}

              {/* Location */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-800/40 border border-gray-700">
                <div className="size-12 rounded-xl bg-gray-700 flex items-center justify-center shrink-0">
                  <MapPin className="size-5 text-gray-300" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Местоположение</div>
                  <div className="font-semibold text-white">Чувашская Республика, г. Чебоксары</div>
                  <div className="text-xs text-gray-500 mt-0.5">Работаем по всему региону</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <AnimatedSection delay={150}>
            <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8">
              <h3 className="font-[Manrope] font-bold text-2xl text-white mb-2">Оставить заявку</h3>
              <p className="text-gray-400 text-sm mb-8">Перезвоним в течение 30 минут в рабочее время</p>

              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle className="size-14 text-green-400 mx-auto mb-4" />
                  <h4 className="font-[Manrope] font-bold text-xl text-white">Сообщение отправлено!</h4>
                  <p className="mt-2 text-gray-400">Скоро свяжемся с вами</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">Ваше имя</label>
                    <input type="text" placeholder="Иван" required className={inputCls}
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">Телефон</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" required className={inputCls}
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">Сообщение</label>
                    <textarea rows={4} placeholder="Расскажите о вашем проекте..." className={cn(inputCls, "resize-none")}
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit"
                    className="w-full py-4 rounded-2xl bg-[#F97316] text-white font-bold text-lg hover:bg-orange-500 transition-all shadow-xl shadow-orange-500/20">
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B1423] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="size-9 rounded-xl bg-[#1E3A8A] flex items-center justify-center">
                <HardHat className="size-5 text-white" />
              </div>
              <div>
                <div className="font-black text-base font-[Manrope] text-white">СтройМастер</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">Чувашия</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Строим дома, которыми гордятся годами. Работаем по всей Чувашской Республике с 2009 года.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Youtube, MessageCircle].map((Icon, i) => (
                <a key={i} href="#"
                  className="size-9 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1E3A8A] hover:text-white transition-all">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-[Manrope] font-bold text-white mb-4">Навигация</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[Manrope] font-bold text-white mb-4">Услуги</h4>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-gray-400 hover:text-white text-sm transition-colors">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-[Manrope] font-bold text-white mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+79530105335" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors group">
                  <Phone className="size-4 text-[#F97316]" />
                  <span className="text-sm">+7 (953) 010-53-35</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@brigada21.ru" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
                  <Mail className="size-4 text-[#F97316]" />
                  <span className="text-sm">info@brigada21.ru</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400">
                <MapPin className="size-4 text-[#F97316] shrink-0 mt-0.5" />
                <span className="text-sm">Чувашская Республика,<br />г. Чебоксары</span>
              </li>
            </ul>
            <button
              onClick={() => scrollTo("#estimate")}
              className="mt-6 w-full py-3 rounded-xl bg-[#F97316] text-white text-sm font-bold hover:bg-orange-500 transition-colors"
            >
              Бесплатная смета
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2009–2026 СтройМастер. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating CTA ─────────────────────────────────────────────────────────────

function FloatingCta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <a
        href="https://t.me/vitaldmit"
        className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-green-500 text-white font-bold shadow-2xl shadow-green-500/40 hover:bg-green-600 transition-all hover:scale-105"
        aria-label="Написать в Telegram"
      >
        <MessageCircle className="size-5" />
        <span className="text-sm">Telegram</span>
      </a>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-[Inter] antialiased">
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Process />
        <Portfolio />
        <Stats />
        <Testimonials />
        <EstimateForm />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </div>
  );
}
