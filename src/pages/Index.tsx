import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Sparkles, Butterflies, Balloons, Clouds, Fireflies, HeartBurst } from '@/components/invitation/decor';

// ===== РЕДАКТИРУЕМЫЕ ДАННЫЕ =====
const NAME = 'Аделина';
const EVENT_DATE = new Date('2026-08-23T13:00:00');
const PORTRAIT = 'https://cdn.poehali.dev/projects/2683f655-0fb3-4a59-82fa-222aac749eb5/files/2c3bc62d-501a-457b-95bb-3d0275fc1ed4.jpg';
const GARDEN_BG = 'https://cdn.poehali.dev/projects/2683f655-0fb3-4a59-82fa-222aac749eb5/files/a501edf3-4c47-4653-8f5d-4e7a819827a8.jpg';
const CAROUSEL_IMG = 'https://cdn.poehali.dev/projects/2683f655-0fb3-4a59-82fa-222aac749eb5/files/b9c84de9-3192-4aa7-8f51-c739727c7c8f.jpg';
const DGIS_LINK = '#'; // вставьте ссылку на маршрут в 2ГИС
const MAP_LINK = '#'; // вставьте ссылку на карту

const useCountdown = (target: Date) => {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
};

const useReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
};

const SectionTitle = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <h2 className={`font-display text-5xl md:text-6xl text-center ${dark ? 'text-white' : 'text-primary'}`}>{children}</h2>
);

export default function Index() {
  const [opened, setOpened] = useState(false);
  const [intro, setIntro] = useState(0);
  const [music, setMusic] = useState(false);
  const [rsvp, setRsvp] = useState<'yes' | 'no' | null>(null);
  const [burst, setBurst] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { d, h, m, s } = useCountdown(EVENT_DATE);

  const about = useReveal();
  const program = useReveal();
  const timer = useReveal();
  const gallery = useReveal();

  useEffect(() => {
    const t1 = setTimeout(() => setIntro(1), 800);
    const t2 = setTimeout(() => setIntro(2), 2200);
    const t3 = setTimeout(() => setIntro(3), 3400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (music) a.pause();
    else a.play().catch(() => {});
    setMusic(!music);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const choose = (v: 'yes' | 'no') => {
    setRsvp(v);
    if (v === 'yes') {
      setBurst(true);
      setTimeout(() => setBurst(false), 2400);
    }
  };

  const steps = [
    { icon: 'MapPin', title: 'Начало', place: 'Село Григорьевка\nул. Победы, 3', time: 'Сбор гостей' },
    { icon: 'Car', title: 'Переезд', place: 'К месту празднования', time: '' },
    { icon: 'PartyPopper', title: 'Основной праздник', place: 'г. Оренбург, проспект Победы, 114/4\nЛетняя веранда «Инфинити»', time: '' },
  ];

  const timeBlocks = [
    { v: d, l: 'Дней' },
    { v: h, l: 'Часов' },
    { v: m, l: 'Минут' },
    { v: s, l: 'Секунд' },
  ];

  return (
    <div className="relative font-body text-foreground overflow-x-hidden">
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_dba8b95caa.mp3?filename=relaxing-mood-amp-acoustic-guitar-110374.mp3" />

      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 glass rounded-full w-12 h-12 flex items-center justify-center hover-scale transition-transform"
        aria-label="музыка"
      >
        <Icon name={music ? 'Volume2' : 'VolumeX'} size={22} className="text-primary" />
      </button>

      {/* ===== 1. ИНТРО ===== */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-5"
        style={{ background: 'linear-gradient(180deg,#eef4ff 0%,#fdf3f7 45%,#fdf4ec 100%)' }}
      >
        <Clouds />
        <Butterflies count={4} />
        {opened && <Sparkles count={22} />}
        <div className="relative z-10 text-center max-w-2xl">
          <p className={`font-display text-4xl md:text-5xl text-primary/80 mb-6 opacity-0 ${intro >= 1 ? 'animate-blur-reveal' : ''}`}>
            Добро пожаловать в сказку
          </p>
          <p className={`font-serif italic text-lg md:text-xl text-muted-foreground mb-3 opacity-0 ${intro >= 2 ? 'animate-blur-reveal' : ''}`} style={{ animationDelay: '0.1s' }}>
            Приглашаем на первый День рождения
          </p>
          <div className={`opacity-0 ${intro >= 3 ? 'animate-blur-reveal' : ''}`} style={{ animationDelay: '0.2s' }}>
            <h1 className="font-display text-7xl md:text-9xl gold-grad leading-none mb-2">{NAME}</h1>
            <p className="font-serif text-xl md:text-2xl text-primary mb-2">✨ Нам исполняется 1 годик ✨</p>
            <p className="font-body text-sm md:text-base text-muted-foreground tracking-[0.3em] mb-8">23 АВГУСТА 2026</p>
            {!opened ? (
              <button
                onClick={() => {
                  setOpened(true);
                  setTimeout(() => scrollTo('about'), 1000);
                }}
                className="relative overflow-hidden rounded-full px-10 py-4 text-white font-body text-lg shadow-xl hover-scale transition-all"
                style={{ background: 'linear-gradient(135deg,#f6a5c0,#e3b04b)' }}
              >
                <span className="relative z-10">Открыть приглашение</span>
              </button>
            ) : (
              <button onClick={() => scrollTo('about')} className="text-primary/70 animate-soft-bob">
                <Icon name="ChevronDown" size={40} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ===== 2. КАРУСЕЛЬ + ФОТО ===== */}
      <section
        id="about"
        ref={about.ref}
        className="relative py-24 px-5 overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#fdf4ec 0%,#fbeef4 100%)' }}
      >
        <Sparkles count={10} />
        <div className={`relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${about.seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Фото именинницы */}
          <div className="relative mx-auto">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-[#f6d98a] via-[#f6a5c0] to-[#d8b4f0] blur opacity-60 animate-spin-slow" />
            <div className="relative rounded-[2.25rem] overflow-hidden border-[6px] border-white shadow-2xl w-72 h-80 md:w-80 md:h-96">
              <img src={PORTRAIT} alt="Аделина" className="w-full h-full object-cover" />
            </div>
            <Icon name="Crown" size={44} className="absolute -top-7 left-1/2 -translate-x-1/2 text-gold drop-shadow animate-soft-bob" />
          </div>
          {/* Карусель + текст */}
          <div>
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/70 to-[#fbe1e8]/70 blur-md" />
              <img src={CAROUSEL_IMG} alt="карусель" className="relative w-full h-full object-contain animate-spin-slow drop-shadow-xl" style={{ animationDuration: '24s' }} />
            </div>
            <div className="glass rounded-[2rem] p-7">
              <p className="font-serif text-lg md:text-xl text-foreground/80 leading-relaxed">
                Совсем недавно появилась наша маленькая принцесса, а сегодня ей уже исполняется целый год.
                <br /><br />
                Этот день станет ещё счастливее, если вы разделите его вместе с нами. Мы будем очень рады видеть вас!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. ПРОГРАММА — ТАЙМЛАЙН ===== */}
      <section
        ref={program.ref}
        className="relative py-24 px-5"
        style={{ background: 'linear-gradient(180deg,#fbeef4 0%,#eef3fb 100%)' }}
      >
        <Balloons count={9} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <SectionTitle>Программа дня</SectionTitle>
          <div className="relative mt-12 pl-10">
            <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#f6a5c0] via-[#e3b04b] to-[#d8b4f0]" />
            {steps.map((p, i) => (
              <div
                key={i}
                className={`relative mb-8 transition-all duration-700 ${program.seen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="absolute -left-[34px] top-1 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#f6a5c0]">
                  <Icon name={p.icon} size={18} className="text-primary" />
                </div>
                <div className="glass rounded-[1.5rem] p-5">
                  <h3 className="font-body text-lg text-primary">{p.title}</h3>
                  {p.time && <p className="font-serif italic text-sm text-muted-foreground">{p.time}</p>}
                  <p className="font-serif text-base text-foreground/70 whitespace-pre-line mt-1">{p.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. ТАЙМЕР ===== */}
      <section
        ref={timer.ref}
        className="relative py-24 px-5"
        style={{ background: 'linear-gradient(180deg,#eef3fb 0%,#f3eefb 100%)' }}
      >
        <Clouds />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <SectionTitle>До праздника осталось</SectionTitle>
          <div className="grid grid-cols-4 gap-3 md:gap-6 mt-12">
            {timeBlocks.map((x, i) => (
              <div
                key={x.l}
                className={`glass rounded-[1.5rem] py-6 transition-all duration-700 ${timer.seen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="font-display text-5xl md:text-6xl gold-grad">{String(x.v).padStart(2, '0')}</div>
                <div className="font-body text-xs md:text-sm text-muted-foreground mt-1">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. КАРТА ===== */}
      <section className="relative py-24 px-5" style={{ background: 'linear-gradient(180deg,#f3eefb 0%,#fbeef4 100%)' }}>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <SectionTitle>Как добраться</SectionTitle>
          <div className="glass rounded-[2rem] p-3 mt-8 overflow-hidden">
            <div className="relative rounded-[1.5rem] overflow-hidden h-60 bg-gradient-to-br from-[#eaf2ec] to-[#e9d5f5] flex items-center justify-center">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 28px),repeating-linear-gradient(90deg,#fff,#fff 1px,transparent 1px,transparent 28px)' }} />
              <div className="relative text-center animate-soft-bob">
                <Icon name="MapPin" size={48} className="text-primary mx-auto" />
                <p className="font-serif text-lg text-foreground/80 mt-2">Летняя веранда «Инфинити»</p>
                <p className="font-serif text-sm text-muted-foreground">пр. Победы, 114/4, Оренбург</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center p-4">
              <a href={DGIS_LINK} target="_blank" rel="noreferrer" className="bg-primary text-primary-foreground rounded-full px-7 py-3 font-body hover-scale transition-transform inline-flex items-center justify-center gap-2">
                <Icon name="Navigation" size={18} /> Построить маршрут в 2ГИС
              </a>
              <a href={MAP_LINK} target="_blank" rel="noreferrer" className="glass text-primary rounded-full px-7 py-3 font-body hover-scale transition-transform inline-flex items-center justify-center gap-2">
                <Icon name="Map" size={18} /> Открыть на карте
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. ПОДТВЕРЖДЕНИЕ ===== */}
      <section className="relative py-24 px-5" style={{ background: 'linear-gradient(180deg,#fbeef4 0%,#fdf4ec 100%)' }}>
        {burst && <HeartBurst />}
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <div className="glass rounded-[2rem] p-9">
            <SectionTitle>Будете с нами?</SectionTitle>
            <p className="font-serif text-lg text-foreground/80 mt-3 mb-7">
              Сможете ли вы разделить с нами этот чудесный день?
            </p>
            {rsvp === null ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => choose('yes')} className="bg-primary text-primary-foreground rounded-full px-8 py-4 font-body text-lg hover-scale transition-transform shadow-lg">
                  💗 С удовольствием приду
                </button>
                <button onClick={() => choose('no')} className="glass text-primary rounded-full px-8 py-4 font-body text-lg hover-scale transition-transform">
                  🤍 К сожалению, не смогу
                </button>
              </div>
            ) : (
              <div className="animate-scale-in">
                <Icon name={rsvp === 'yes' ? 'Heart' : 'Sparkles'} size={48} className="text-primary mx-auto mb-3 animate-soft-bob" />
                <p className="font-display text-3xl text-primary">Спасибо за ваш ответ!</p>
                <p className="font-serif text-base text-muted-foreground mt-1">
                  {rsvp === 'yes' ? 'Будем вас ждать ✨' : 'Будем скучать 🤍'}
                </p>
                <button onClick={() => setRsvp(null)} className="mt-4 text-sm text-muted-foreground underline">
                  изменить ответ
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== 7. ГАЛЕРЕЯ ===== */}
      <section
        ref={gallery.ref}
        className="relative py-24 px-5"
        style={{ background: 'linear-gradient(180deg,#fdf4ec 0%,#fbeef4 100%)' }}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <SectionTitle>Наши моменты</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-[1.5rem] overflow-hidden border-[5px] border-white shadow-lg group cursor-pointer transition-all duration-700 ${gallery.seen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-full h-full bg-gradient-to-br from-[#fbe1e8] to-[#e9d5f5] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <Icon name="ImagePlus" size={36} className="text-primary/40" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-serif italic text-muted-foreground mt-6">Здесь скоро появятся наши фотографии</p>
        </div>
      </section>

      {/* ===== 8. ФИНАЛ ===== */}
      <section className="relative py-32 px-5 flex items-center justify-center min-h-screen" style={{ backgroundImage: `linear-gradient(rgba(30,15,40,0.6),rgba(30,15,40,0.72)), url(${GARDEN_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Гирлянда */}
        <div className="absolute top-0 left-0 right-0 flex justify-around px-4 pt-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full animate-garland-glow"
              style={{
                color: ['#f6d98a', '#f6a5c0', '#d8b4f0', '#f9c79a'][i % 4],
                background: 'currentColor',
                marginTop: i % 2 ? 14 : 0,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <Fireflies count={22} />
        <div className="relative z-10 max-w-xl text-center text-white">
          <Icon name="Sparkles" size={40} className="mx-auto mb-5 text-gold animate-soft-bob" />
          <p className="font-serif text-xl md:text-2xl leading-relaxed mb-5">
            Мы с нетерпением ждём встречи с вами! Пусть этот день будет наполнен счастьем, тёплыми улыбками
            и самыми добрыми воспоминаниями.
          </p>
          <p className="font-serif text-lg text-white/85 mb-8">
            Спасибо, что будете рядом с нами в этот важный день.
          </p>
          <p className="font-display text-4xl md:text-5xl text-gold">С любовью, семья Аделины ❤️</p>
        </div>
      </section>
    </div>
  );
}
