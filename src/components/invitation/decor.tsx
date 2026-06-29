import { useMemo } from 'react';
import Icon from '@/components/ui/icon';

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export const Sparkles = ({ count = 16 }: { count?: number }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: rand(0, 100),
        top: rand(0, 100),
        size: rand(6, 16),
        delay: rand(0, 4),
        dur: rand(2.5, 5),
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s, i) => (
        <Icon
          key={i}
          name="Sparkles"
          className="absolute text-gold animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
};

export const Butterflies = ({ count = 6 }: { count?: number }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: rand(5, 90),
        top: rand(10, 80),
        size: rand(22, 40),
        delay: rand(0, 6),
        dur: rand(8, 14),
        hue: ['#f6a5c0', '#d8b4f0', '#f9c79a', '#f7d6e0'][Math.floor(rand(0, 4))],
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((b, i) => (
        <Icon
          key={i}
          name="Bird"
          fallback="Sparkle"
          className="absolute animate-flutter"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            color: b.hue,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export const Balloons = ({ count = 8 }: { count?: number }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: rand(2, 92),
        size: rand(34, 64),
        delay: rand(0, 10),
        dur: rand(11, 18),
        hue: ['#f6a5c0', '#d8b4f0', '#f9c79a', '#fbe1e8', '#e9d5f5'][Math.floor(rand(0, 5))],
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
          }}
        >
          <div
            className="rounded-full shadow-lg"
            style={{
              width: b.size,
              height: b.size * 1.2,
              background: `radial-gradient(circle at 35% 30%, #ffffffcc, ${b.hue})`,
            }}
          />
          <div className="mx-auto h-10 w-px bg-white/50" />
        </div>
      ))}
    </div>
  );
};

export const Fireflies = ({ count = 18 }: { count?: number }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: rand(0, 100),
        top: rand(0, 100),
        size: rand(3, 7),
        delay: rand(0, 6),
        dur: rand(5, 9),
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((f, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-firefly"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
            background: 'radial-gradient(circle,#fff7cc,#f6d98a)',
            boxShadow: '0 0 8px 2px #f6d98a',
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.dur}s`,
          }}
        />
      ))}
    </div>
  );
};

export const HeartBurst = () => {
  const items = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        left: rand(20, 80),
        size: rand(16, 32),
        delay: rand(0, 0.8),
        dur: rand(1.6, 2.4),
        hue: ['#f6a5c0', '#f7d6e0', '#e9d5f5', '#f9c79a'][Math.floor(rand(0, 4))],
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((hb, i) => (
        <Icon
          key={i}
          name="Heart"
          className="absolute bottom-10 animate-heart-burst"
          style={{
            left: `${hb.left}%`,
            width: hb.size,
            height: hb.size,
            color: hb.hue,
            animationDelay: `${hb.delay}s`,
            animationDuration: `${hb.dur}s`,
          }}
        />
      ))}
    </div>
  );
};

export const Clouds = () => {
  const items = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        top: rand(5, 70),
        size: rand(120, 240),
        delay: -rand(0, 40),
        dur: rand(40, 70),
        opacity: rand(0.4, 0.8),
        key: i,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((c) => (
        <div
          key={c.key}
          className="absolute animate-drift"
          style={{
            top: `${c.top}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.dur}s`,
            opacity: c.opacity,
          }}
        >
          <div
            className="rounded-full bg-white blur-xl"
            style={{ width: c.size, height: c.size * 0.45 }}
          />
        </div>
      ))}
    </div>
  );
};