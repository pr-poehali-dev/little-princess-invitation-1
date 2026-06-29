import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Sparkles, Butterflies, Balloons, Clouds } from '@/components/invitation/decor';

// ===== РЕДАКТИРУЕМЫЕ ДАННЫЕ =====
const NAME = 'Аделина';
const EVENT_DATE = new Date('2026-08-23T13:00:00');
const PORTRAIT = 'https://cdn.poehali.dev/projects/2683f655-0fb3-4a59-82fa-222aac749eb5/files/2c3bc62d-501a-457b-95bb-3d0275fc1ed4.jpg';
const GARDEN_BG = 'https://cdn.poehali.dev/projects/2683f655-0fb3-4a59-82fa-222aac749eb5/files/bcd886c9-31e5-49b6-ac1e-6b36b695529a.jpg';
const DGIS_LINK = '#'; // вставьте ссылку на маршрут в 2ГИС
const MAP_LINK = '#'; // вставьте ссылку на карту
const carouselImages = [PORTRAIT, GARDEN_BG, PORTRAIT, GARDEN_BG, PORTRAIT, GARDEN_BG];

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

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-5xl md:text-6xl text-primary text-center mb-2">{children}</h2>
);

export default function Index() {
  const [opened, setOpened] = useState(false);
  const [music, setMusic] = useState(false);
  const [rsvp, setRsvp] = useState<'yes' | 'no' | null>(null);
  const [carIdx, setCarIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { d, h, m, s } = useCountdown(EVENT_DATE);

  useEffect(() => {
    const id = setInterval(() => setCarIdx((i) => (i + 1) % carouselImages.length), 3500);
    return () => clearInterval(id);
  }, []);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (music) {
      a.pause();
    } else {
      a.play().catch(() => {});
    }
    setMusic(!music);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const program = [
    { icon: 'MapPin', title: 'Сбор гостей', place: 'Село Григорьевка, ул. Победы, 3', note: 'Начало праздника' },
    { icon: 'Car', title: 'Переезд', place: 'К месту празднования', note: '' },
    { icon: 'PartyPopper', title: 'Основное мероприятие', place: 'г. Оренбург, проспект Победы, 114/4\nЛетняя веранда «Инфинити»', note: '' },
  ];

  return (
    <div className="relative font-body text-foreground overflow-x-hidden">
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_dba8b95caa.mp3?filename=relaxing-mood-amp-acoustic-guitar-110374.mp3" />

      {/* Музыка */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 glass rounded-full w-12 h-12 flex items-center justify-center hover-scale transition-transform"
        aria-label="музыка"
      >
        <Icon name={music ? 'Volume2' : 'VolumeX'} size={22} className="text-primary" />
      </button>

      {/* ===== 1. ГЛАВНЫЙ ===== */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-5"
        style={{ background: 'linear-gradient(180deg,#fdf3f7 0%,#f6ecfb 50%,#fdf4ec 100%)' }}
      >
        <Clouds />
        <Butterflies count={7} />
        {opened && <Sparkles count={28} />}
        <div className="relative z-10 text-center max-w-2xl animate-fade-in">
          <p className="font-serif italic text-lg md:text-xl text-muted-foreground mb-4">
            Приглашаем на первый День рождения
          </p>
          <h1 className="font-display text-7xl md:text-9xl gold-grad leading-none mb-3">{NAME}</h1>
          <p className="font-serif text-2xl md:text-3xl text-primary mb-2">Нам исполняется 1 годик!</p>
          <p className="font-body text-base md:text-lg text-muted-foreground tracking-widest mb-8">
            23 августа 2026 года
          </p>
          {!opened ? (
            <button
              onClick={() => {
                setOpened(true);
                setTimeout(() => scrollTo('about'), 1200);
              }}
              className="glass rounded-full px-9 py-4 text-primary font-body text-lg hover-scale transition-all shadow-lg"
            >
              ✨ Открыть приглашение
            </button>
          ) : (
            <button onClick={() => scrollTo('about')} className="text-primary/70 animate-soft-bob">
              <Icon name="ChevronDown" size={40} />
            </button>
          )}
        </div>
      </section>

      {/* ===== 2. О ПРАЗДНИКЕ ===== */}
      <section
        id="about"
        className="relative py-24 px-5 flex flex-col items-center"
        style={{ background: 'linear-gradient(180deg,#fdf4ec 0%,#fbeef4 100%)' }}
      >
        <Butterflies count={3} />
        <div className="relative z-10 max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="relative mx-auto">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#f6d98a] via-[#f6a5c0] to-[#d8b4f0] blur-sm opacity-70 animate-spin-slow" />
            <div className="relative rounded-[1.75rem] overflow-hidden border-4 border-white shadow-2xl w-72 h-80 md:w-80 md:h-96">
              <img src={PORTRAIT} alt="Аделина" className="w-full h-full object-cover" />
            </div>
            <Icon name="Crown" size={42} className="absolute -top-6 left-1/2 -translate-x-1/2 text-gold drop-shadow animate-soft-bob" />
          </div>
          <div className="glass rounded-[2rem] p-8 md:p-10">
            <SectionTitle>Наша принцесса</SectionTitle>
            <p className="font-serif text-lg md:text-xl text-foreground/80 leading-relaxed mt-4">
              Совсем недавно появилась наша маленькая принцесса, а сегодня ей уже исполняется целый год!
              <br /><br />
              Мы будем очень рады разделить этот счастливый день вместе с вами. Ваше присутствие станет
              самым дорогим подарком для нашей семьи.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Карусель ===== */}
      <section className="relative py-16 px-5 flex justify-center bg-[#fbeef4]">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          {carouselImages.map((src, i) => {
            const angle = (i / carouselImages.length) * 360 + carIdx * -60;
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 rounded-2xl overflow-hidden border-4 border-white shadow-xl transition-all duration-1000"
                style={{
                  width: 96,
                  height: 96,
                  transform: `translate(-50%,-50%) rotate(${angle}deg) translateY(-130px) rotate(${-angle}deg)`,
                }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            );
          })}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <Icon name="Heart" size={36} className="text-primary mx-auto animate-soft-bob" />
            <p className="font-display text-3xl text-primary">1 годик</p>
          </div>
        </div>
      </section>

      {/* ===== 3. ПРОГРАММА ===== */}
      <section
        className="relative py-24 px-5"
        style={{ background: 'linear-gradient(180deg,#fbeef4 0%,#eef3fb 100%)' }}
      >
        <Balloons count={9} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <SectionTitle>Программа дня</SectionTitle>
          <div className="mt-10 space-y-4">
            {program.map((p, i) => (
              <div key={i}>
                <div className="glass rounded-[1.75rem] p-6 flex items-start gap-4 animate-scale-in">
                  <div className="rounded-full bg-primary/15 w-12 h-12 flex items-center justify-center shrink-0">
                    <Icon name={p.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-body text-lg text-primary">{p.title}</h3>
                    <p className="font-serif text-base text-foreground/70 whitespace-pre-line">{p.place}</p>
                    {p.note && <p className="font-serif italic text-sm text-muted-foreground">{p.note}</p>}
                  </div>
                </div>
                {i < program.length - 1 && (
                  <div className="flex justify-center py-2 text-primary/50">
                    <Icon name="ArrowDown" size={26} className="animate-soft-bob" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. ОБРАТНЫЙ ОТСЧЁТ ===== */}
      <section className="relative py-24 px-5" style={{ background: 'linear-gradient(180deg,#eef3fb 0%,#f3eefb 100%)' }}>
        <Clouds />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <SectionTitle>До праздника осталось</SectionTitle>
          <div className="grid grid-cols-4 gap-3 md:gap-6 mt-10">
            {[
              { v: d, l: 'Дней' },
              { v: h, l: 'Часов' },
              { v: m, l: 'Минут' },
              { v: s, l: 'Секунд' },
            ].map((x) => (
              <div key={x.l} className="glass rounded-[1.5rem] py-6">
                <div className="font-display text-5xl md:text-6xl gold-grad">{String(x.v).padStart(2, '0')}</div>
                <div className="font-body text-xs md:text-sm text-muted-foreground mt-1">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. МАРШРУТ ===== */}
      <section className="relative py-24 px-5" style={{ background: 'linear-gradient(180deg,#f3eefb 0%,#fbeef4 100%)' }}>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <SectionTitle>Как добраться</SectionTitle>
          <div className="glass rounded-[2rem] p-8 mt-8">
            <Icon name="MapPin" size={40} className="text-primary mx-auto mb-3" />
            <p className="font-serif text-lg text-foreground/80 mb-1">Летняя веранда «Инфинити»</p>
            <p className="font-serif text-base text-muted-foreground mb-6">г. Оренбург, проспект Победы, 114/4</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
        <Sparkles count={14} />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <div className="glass rounded-[2rem] p-9">
            <SectionTitle>Будете с нами?</SectionTitle>
            <p className="font-serif text-lg text-foreground/80 mt-3 mb-7">
              Получится ли у вас разделить с нами этот замечательный день?
            </p>
            {rsvp === null ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setRsvp('yes')} className="bg-primary text-primary-foreground rounded-full px-8 py-4 font-body text-lg hover-scale transition-transform shadow-lg">
                  💗 Приду
                </button>
                <button onClick={() => setRsvp('no')} className="glass text-primary rounded-full px-8 py-4 font-body text-lg hover-scale transition-transform">
                  🤍 К сожалению, не смогу
                </button>
              </div>
            ) : (
              <div className="animate-scale-in">
                <Icon name={rsvp === 'yes' ? 'Heart' : 'Sparkles'} size={48} className="text-primary mx-auto mb-3 animate-soft-bob" />
                <p className="font-display text-3xl text-primary">
                  {rsvp === 'yes' ? 'Ура! Будем вас ждать ✨' : 'Будем скучать! Спасибо 🤍'}
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
      <section className="relative py-24 px-5" style={{ background: 'linear-gradient(180deg,#fdf4ec 0%,#fbeef4 100%)' }}>
        <div className="relative z-10 max-w-4xl mx-auto">
          <SectionTitle>Наши моменты</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-[1.5rem] overflow-hidden border-4 border-white shadow-lg group cursor-pointer">
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
      <section className="relative py-28 px-5 flex items-center justify-center min-h-[80vh]" style={{ backgroundImage: `linear-gradient(rgba(40,20,50,0.55),rgba(40,20,50,0.65)), url(${GARDEN_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Sparkles count={20} />
        <div className="relative z-10 max-w-xl text-center text-white">
          <Icon name="Sparkles" size={40} className="mx-auto mb-5 text-gold animate-soft-bob" />
          <p className="font-serif text-xl md:text-2xl leading-relaxed mb-6">
            Мы с нетерпением ждём встречи с вами! Пусть этот день будет наполнен улыбками, счастьем,
            тёплыми объятиями и самыми добрыми воспоминаниями.
          </p>
          <p className="font-serif text-lg text-white/85 mb-8">
            Спасибо, что разделяете самые важные моменты нашей жизни. До скорой встречи!
          </p>
          <p className="font-display text-4xl md:text-5xl text-gold">С любовью, семья Аделины ❤️</p>
        </div>
      </section>
    </div>
  );
}
