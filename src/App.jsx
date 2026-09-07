import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

/* ================================================================== */
/*  QUESTION BANK — answers are widely cited public estimates          */
/* ================================================================== */

const QUESTIONS = [
  // --- your disgusting body ---
  { q: "How many times will your heart beat before you die?", a: 2500000000, unit: "beats" },
  { q: "How many litres of spit will you produce in your lifetime?", a: 23000, unit: "litres" },
  { q: "How many times does the average person fart per day?", a: 15, unit: "farts" },
  { q: "How many kilograms of poop will you produce in your lifetime?", a: 3700, unit: "kg" },
  { q: "How many skin cells do you shed every hour?", a: 40000, unit: "cells" },
  { q: "How many sweat glands are on your body right now?", a: 3000000, unit: "glands" },
  { q: "How many hours will you spend asleep in an 80-year life?", a: 233000, unit: "hours" },
  { q: "How many kilometres will you walk in your lifetime?", a: 120000, unit: "km" },
  { q: "How many species of bacteria live in the average belly button?", a: 2368, unit: "species" },
  { q: "How many times do you blink in a day?", a: 28800, unit: "blinks" },
  { q: "How many breaths do you take in a day?", a: 22000, unit: "breaths" },
  { q: "How many litres of blood does your heart move in one day?", a: 7500, unit: "litres" },
  { q: "Laid end to end, how long are the blood vessels in your body?", a: 100000, unit: "km" },
  { q: "How many cells are in your body?", a: 37200000000000, unit: "cells" },
  { q: "How many bacteria are living in and on you right now?", a: 38000000000000, unit: "bacteria" },
  { q: "How many hairs do you shed on a completely normal day?", a: 100, unit: "hairs" },
  { q: "How many hairs are on your head?", a: 100000, unit: "hairs" },
  { q: "How many taste buds are on your tongue?", a: 10000, unit: "taste buds" },
  { q: "How many nerve endings are in a single fingertip?", a: 3000, unit: "nerve endings" },
  { q: "How many dust mites live in an average mattress?", a: 2000000, unit: "mites" },
  { q: "How many bacteria are on one square inch of your phone screen?", a: 25000, unit: "bacteria" },

  // --- animals being ridiculous ---
  { q: "A snail has teeth. How many?", a: 14000, unit: "teeth" },
  { q: "How much does a blue whale's heart weigh?", a: 180, unit: "kg" },
  { q: "How much does a blue whale's tongue weigh?", a: 2700, unit: "kg" },
  { q: "How many times per minute does a hummingbird's heart beat?", a: 1260, unit: "beats" },
  { q: "How many times per second does a hummingbird flap its wings?", a: 53, unit: "flaps" },
  { q: "How many eggs does an ocean sunfish release at once?", a: 300000000, unit: "eggs" },
  { q: "How many days does it take a sloth to digest one meal?", a: 30, unit: "days" },
  { q: "How many muscles are in an elephant's trunk?", a: 40000, unit: "muscles" },
  { q: "How much food does an elephant eat in a day?", a: 150, unit: "kg" },
  { q: "How many times does a woodpecker peck in a single day?", a: 12000, unit: "pecks" },
  { q: "How many teeth will one shark get through in its lifetime?", a: 30000, unit: "teeth" },
  { q: "How long is a giraffe's tongue?", a: 50, unit: "cm" },
  { q: "How many bones are in a giraffe's neck?", a: 7, unit: "bones" },
  { q: "How fast can a cheetah run, flat out?", a: 112, unit: "km/h" },
  { q: "How many ants live in one leafcutter colony?", a: 8000000, unit: "ants" },
  { q: "How many eggs does a queen bee lay in a single day?", a: 2000, unit: "eggs" },
  { q: "How many flowers do bees visit to fill one jar of honey?", a: 2000000, unit: "flowers" },
  { q: "How many species of beetle have been described by science?", a: 400000, unit: "species" },
  { q: "How many ants are there on planet Earth?", a: 20000000000000000, unit: "ants" },
  { q: "How many chickens are alive at this exact second?", a: 26000000000, unit: "chickens" },
  { q: "How many muscles does a cat have in each ear?", a: 32, unit: "muscles" },
  { q: "How many hearts does an octopus have?", a: 3, unit: "hearts" },
  { q: "How many times its own body length can a flea jump?", a: 100, unit: "times" },

  // --- food at absurd scale ---
  { q: "How many cups of coffee does the world drink in one day?", a: 2250000000, unit: "cups" },
  { q: "How many bananas does the world eat in a year?", a: 100000000000, unit: "bananas" },
  { q: "How many Oreos are made every year?", a: 40000000000, unit: "Oreos" },
  { q: "How many jars of Nutella are sold every year?", a: 365000000, unit: "jars" },
  { q: "How many Coca-Cola servings are drunk every day?", a: 2200000000, unit: "servings" },
  { q: "How many packs of instant noodles does the world eat in a year?", a: 120000000000, unit: "packs" },
  { q: "How many eggs does the world eat in a year?", a: 1500000000000, unit: "eggs" },
  { q: "How many Big Macs are sold every day worldwide?", a: 2500000, unit: "Big Macs" },
  { q: "How many Tic Tacs are in a standard box?", a: 38, unit: "Tic Tacs" },
  { q: "How many peanuts go into one jar of peanut butter?", a: 540, unit: "peanuts" },
  { q: "How many hot dogs do Americans eat on the 4th of July?", a: 150000000, unit: "hot dogs" },
  { q: "How many seeds are on the outside of one strawberry?", a: 200, unit: "seeds" },
  { q: "How many grains of rice are in one kilogram?", a: 50000, unit: "grains" },
  { q: "How many McDonald's are there on Earth?", a: 40000, unit: "restaurants" },
  { q: "How many Starbucks are there on Earth?", a: 40000, unit: "stores" },

  // --- money ---
  { q: "How much does one F-35 fighter jet cost?", a: 80000000, unit: "USD" },
  { q: "What does one million dollars in $100 bills weigh?", a: 10, unit: "kg" },
  { q: "How many $1 bills are in circulation right now?", a: 14500000000, unit: "bills" },
  { q: "How many Bitcoin will ever exist?", a: 21000000, unit: "bitcoin" },
  { q: "How many millionaires are there in the world?", a: 60000000, unit: "millionaires" },
  { q: "What does one second of Super Bowl ad time cost?", a: 233000, unit: "USD" },
  { q: "How many ATMs are there in the world?", a: 3000000, unit: "ATMs" },
  { q: "How many vending machines are there in Japan?", a: 4000000, unit: "machines" },

  // --- the internet ---
  { q: "How many emails get sent every single day?", a: 360000000000, unit: "emails" },
  { q: "How many Google searches happen in a day?", a: 8500000000, unit: "searches" },
  { q: "How many texts does the world send every day?", a: 23000000000, unit: "messages" },
  { q: "How many websites exist right now?", a: 1100000000, unit: "websites" },
  { q: "How many hours of video hit YouTube every minute?", a: 500, unit: "hours" },
  { q: "How many photos get posted to Instagram every day?", a: 95000000, unit: "photos" },
  { q: "How many songs are on Spotify?", a: 100000000, unit: "songs" },
  { q: "How many copies of Minecraft have been sold?", a: 300000000, unit: "copies" },
  { q: "How many emojis exist in Unicode?", a: 3800, unit: "emojis" },
  { q: "How many transistors are in a modern phone chip?", a: 19000000000, unit: "transistors" },
  { q: "How many smartphones are sold worldwide every year?", a: 1200000000, unit: "phones" },
  { q: "How many articles are on English Wikipedia?", a: 7000000, unit: "articles" },

  // --- space ---
  { q: "How many Earths would you need to weigh as much as the Sun?", a: 333000, unit: "Earths" },
  { q: "How hot is the core of the Sun?", a: 15000000, unit: "°C" },
  { q: "How many seconds does sunlight take to reach your face?", a: 499, unit: "seconds" },
  { q: "How fast is Earth moving around the Sun right now?", a: 107000, unit: "km/h" },
  { q: "How many satellites are orbiting Earth?", a: 12000, unit: "satellites" },
  { q: "How many pieces of space junk are being tracked?", a: 36000, unit: "pieces" },
  { q: "How far away is the Moon?", a: 384400, unit: "km" },
  { q: "How close does Mars get to Earth at its nearest?", a: 54600000, unit: "km" },
  { q: "How many stars are in the Milky Way?", a: 100000000000, unit: "stars" },

  // --- objects and buildings ---
  { q: "How many separate parts are in a Boeing 747?", a: 6000000, unit: "parts" },
  { q: "How many rivets hold the Eiffel Tower together?", a: 2500000, unit: "rivets" },
  { q: "What does the Eiffel Tower weigh?", a: 10100, unit: "tonnes" },
  { q: "How many lightbulbs are on the Eiffel Tower?", a: 20000, unit: "bulbs" },
  { q: "How many steps go to the top of the Eiffel Tower?", a: 1665, unit: "steps" },
  { q: "How many stairs are in the Empire State Building?", a: 1576, unit: "stairs" },
  { q: "How many bricks are in the Empire State Building?", a: 10000000, unit: "bricks" },
  { q: "How many blocks are in the Great Pyramid of Giza?", a: 2300000, unit: "blocks" },
  { q: "How tall is the Burj Khalifa?", a: 828, unit: "metres" },
  { q: "How many stitches are on a baseball?", a: 108, unit: "stitches" },
  { q: "How many dimples are on a golf ball?", a: 336, unit: "dimples" },
  { q: "How many ridges are around the edge of a US quarter?", a: 119, unit: "ridges" },
  { q: "How many holes are in a single Ritz cracker?", a: 7, unit: "holes" },
  { q: "How many keys are on a standard piano?", a: 88, unit: "keys" },
  { q: "How many Lego bricks are manufactured every year?", a: 36000000000, unit: "bricks" },
  { q: "How many pieces are in the largest official Lego set?", a: 11695, unit: "pieces" },

  // --- numbers that break your brain ---
  { q: "How many ways can a Rubik's cube be scrambled?", a: 43252003274489856000, unit: "positions" },
  { q: "What is the fewest moves that always solves a Rubik's cube?", a: 20, unit: "moves" },
  { q: "How many different ways can you tie a necktie?", a: 177147, unit: "ways" },
  { q: "How many chess games are possible after four moves each?", a: 288000000000, unit: "games" },
  { q: "How many humans have ever been born, in all of history?", a: 117000000000, unit: "people" },
  { q: "How many people are alive on Earth right now?", a: 8200000000, unit: "people" },
  { q: "How many trees are there on Earth?", a: 3000000000000, unit: "trees" },
  { q: "How many languages are spoken in the world today?", a: 7000, unit: "languages" },
  { q: "How many English words are in common use?", a: 170000, unit: "words" },

  // --- places ---
  { q: "How many lakes does Finland have?", a: 188000, unit: "lakes" },
  { q: "How many islands does Indonesia have?", a: 17000, unit: "islands" },
  { q: "How many pyramids are in Sudan?", a: 250, unit: "pyramids" },
  { q: "How many pyramids are in Egypt?", a: 118, unit: "pyramids" },
  { q: "How long is the Nile?", a: 6650, unit: "km" },
  { q: "How long is the Great Wall of China, every branch counted?", a: 21196, unit: "km" },
  { q: "How deep is the Mariana Trench at its lowest point?", a: 10935, unit: "metres" },
  { q: "How many people visit the Eiffel Tower every year?", a: 7000000, unit: "visitors" },
  { q: "How many passengers pass through Dubai airport in a year?", a: 92000000, unit: "passengers" },
  { q: "How many time zones does France technically span?", a: 12, unit: "time zones" },

  // --- weather and nature ---
  { q: "What does one fluffy cumulus cloud weigh?", a: 500000, unit: "kg" },
  { q: "How many lightning bolts hit the Earth every day?", a: 8000000, unit: "bolts" },
  { q: "How many centimetres does your hair grow in a year?", a: 15, unit: "cm" },
  { q: "How old is the oldest known living tree?", a: 4850, unit: "years" },
  { q: "How many years ago did the last mammoth die?", a: 4000, unit: "years" },
  { q: "How many earthquakes are recorded worldwide each year?", a: 500000, unit: "earthquakes" },

  // --- sport and endurance ---
  { q: "How many steps are in a marathon?", a: 55000, unit: "steps" },
  { q: "How many calories does running a marathon burn?", a: 2600, unit: "calories" },
  { q: "How many tennis balls get used at Wimbledon each year?", a: 55000, unit: "balls" },
  { q: "How fast was the fastest tennis serve ever recorded?", a: 263, unit: "km/h" },

  // --- history ---
  { q: "How many years ago was the Great Pyramid finished?", a: 4580, unit: "years" },
  { q: "How many people died building the Panama Canal?", a: 25000, unit: "people" },
];

/* ================================================================== */
/*  DAILY PUZZLE — deterministic, identical for everyone               */
/* ================================================================== */

const EPOCH = Date.UTC(2026, 0, 1);
const PER_DAY = 5;

function todayNumber() {
  const n = new Date();
  return Math.floor((Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) - EPOCH) / 86400000);
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Deal from a shuffled deck instead of drawing fresh each day, so no
   question repeats until the whole bank has been used. The deck is
   reshuffled with a new seed once it runs out. */
function puzzleFor(day) {
  const daysPerCycle = Math.floor(QUESTIONS.length / PER_DAY);
  const cycle = Math.floor(day / daysPerCycle);
  const slot = ((day % daysPerCycle) + daysPerCycle) % daysPerCycle;

  const rand = mulberry32((cycle + 1) * 2654435761);
  const deck = QUESTIONS.map((_, i) => i);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(slot * PER_DAY, slot * PER_DAY + PER_DAY).map((i) => QUESTIONS[i]);
}

/* ================================================================== */
/*  SCORING                                                            */
/* ================================================================== */

const TIERS = [
  { max: 1.25, key: "dead", label: "BULLSEYE", emoji: "🟢", points: 3, tone: 880,
    lines: ["Suspiciously good.", "Did you look that up?", "Okay, show off."] },
  { max: 2, key: "warm", label: "WARM", emoji: "🟡", points: 2, tone: 660,
    lines: ["Respectable.", "Right neighbourhood.", "You'd have got the pub quiz point."] },
  { max: 10, key: "cold", label: "COLD", emoji: "🟠", points: 1, tone: 440,
    lines: ["Same planet at least.", "Rough. But not lawless.", "Directionally hopeful."] },
  { max: Infinity, key: "what", label: "WHAT?!", emoji: "🔴", points: 0, tone: 160,
    lines: ["Genuinely incredible.", "That is not a number.", "Please seek help."] },
];

const RANKS = [
  { min: 15, title: "Human Calculator" },
  { min: 12, title: "Alarmingly Accurate" },
  { min: 9, title: "Solid Guesser" },
  { min: 6, title: "Roughly Right" },
  { min: 3, title: "Vibes Only" },
  { min: 0, title: "Menace to Statistics" },
];

function gradeGuess(guess, answer) {
  if (!guess || guess <= 0) return TIERS[3];
  const ratio = Math.max(guess, answer) / Math.min(guess, answer);
  return TIERS.find((t) => ratio <= t.max);
}

/* ================================================================== */
/*  NUMBERS                                                            */
/* ================================================================== */

const SUFFIX = { k: 1e3, m: 1e6, b: 1e9, t: 1e12, q: 1e15 };

function parseGuess(raw) {
  if (!raw) return null;
  const m = raw.toLowerCase().replace(/[\s,_]/g, "").match(/^(\d*\.?\d+)([kmbtq])?$/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (!isFinite(n) || n <= 0) return null;
  return m[2] ? n * SUFFIX[m[2]] : n;
}

function commas(n) {
  if (n == null || !isFinite(n)) return "";
  if (n >= 1e18) return n.toExponential(2);
  return Math.round(n).toLocaleString("en-US");
}

function gapPhrase(guess, answer) {
  const ratio = Math.max(guess, answer) / Math.min(guess, answer);
  const dir = guess > answer ? "over" : "under";
  if (ratio < 1.02) return "Basically exact";
  if (ratio < 1000) return `${ratio.toFixed(1)}× ${dir}`;
  return `${Math.round(Math.log10(ratio))} orders of magnitude ${dir}`;
}

function useCountUp(target, run, ms = 1000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return v;
}

/* ================================================================== */
/*  SOUND — tiny synth blips, user gesture only                        */
/* ================================================================== */

function useBlip(enabled) {
  const ctxRef = useRef(null);
  return useCallback((freq, dur = 0.14, type = "triangle") => {
    if (!enabled) return;
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur + 0.02);
    } catch { /* audio is garnish, never block play */ }
  }, [enabled]);
}

/* ================================================================== */
/*  CONFETTI                                                           */
/* ================================================================== */

function Confetti({ seed }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        dur: 1.5 + Math.random() * 1.1,
        rot: Math.random() * 720 - 360,
        w: 6 + Math.random() * 8,
        h: 9 + Math.random() * 12,
        c: ["var(--pop)", "var(--hot)", "var(--mint)", "var(--sky)"][i % 4],
      })),
    [seed]
  );
  return (
    <div className="bp-confetti" aria-hidden="true">
      {pieces.map((p) => (
        <i
          key={p.id}
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.h,
            background: p.c,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            "--spin": `${p.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}

/* ================================================================== */
/*  THE DIAL — hero moment                                             */
/* ================================================================== */

function Dial({ guess, answer, tier }) {
  const [swung, setSwung] = useState(false);
  const W = 520, H = 290, CX = 260, CY = 250, R = 200;

  const lo = Math.log10(Math.min(guess, answer)) - 0.7;
  const hiRaw = Math.log10(Math.max(guess, answer)) + 0.7;
  const span = Math.max(hiRaw - lo, 0.8);

  const angleOf = (v) => 180 - ((Math.log10(v) - lo) / span) * 180;
  const pt = (deg, r) => [
    CX + r * Math.cos((deg * Math.PI) / 180),
    CY - r * Math.sin((deg * Math.PI) / 180),
  ];

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setSwung(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const guessDeg = angleOf(guess);
  const ansDeg = angleOf(answer);
  const [gx, gy] = pt(guessDeg, R - 8);
  const [gx2, gy2] = pt(guessDeg, R - 46);

  const ticks = [];
  for (let i = 0; i <= 24; i++) {
    const deg = 180 - (i / 24) * 180;
    const major = i % 4 === 0;
    const [x1, y1] = pt(deg, R);
    const [x2, y2] = pt(deg, R - (major ? 20 : 11));
    ticks.push({ x1, y1, x2, y2, major, i });
  }

  return (
    <div className="bp-dialwrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="bp-dial" role="img"
        aria-label={`You guessed ${commas(guess)}. The answer is ${commas(answer)}.`}>
        <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none" stroke="var(--brass-d)" strokeWidth="26" strokeLinecap="round" />
        <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          fill="none" stroke="var(--brass)" strokeWidth="20" strokeLinecap="round" />

        {ticks.map((t) => (
          <line key={t.i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="var(--night)" strokeWidth={t.major ? 3 : 1.5} opacity={t.major ? 0.85 : 0.4} />
        ))}

        <line x1={gx} y1={gy} x2={gx2} y2={gy2}
          stroke="var(--cream)" strokeWidth="5" strokeLinecap="round" />
        <text x={pt(guessDeg, R - 62)[0]} y={pt(guessDeg, R - 62)[1]}
          textAnchor="middle" className="bp-dial-tag">YOU</text>

        <g className={`bp-needle ${swung ? "is-swung" : ""}`}
          style={{ "--from": "180deg", "--to": `${180 - ansDeg}deg`, transformOrigin: `${CX}px ${CY}px` }}>
          <polygon points={`${CX - 9},${CY} ${CX + 9},${CY} ${CX + 2},${CY - R + 26} ${CX - 2},${CY - R + 26}`}
            fill="var(--hot)" />
        </g>
        <circle cx={CX} cy={CY} r="17" fill="var(--night)" stroke="var(--brass)" strokeWidth="4" />
        <circle cx={CX} cy={CY} r="5" fill="var(--pop)" />
      </svg>
      <div className={`bp-answer bp-tone-${tier.key}`}>
        <span className="bp-answer-lbl">actual</span>
        <AnswerNumber value={answer} />
      </div>
    </div>
  );
}

function AnswerNumber({ value }) {
  const n = useCountUp(value, true, 1100);
  return <span className="bp-answer-num">{commas(n)}</span>;
}

/* ================================================================== */
/*  MAIN                                                               */
/* ================================================================== */

export default function Ballpark() {
  const dayNum = useMemo(() => todayNumber(), []);
  const puzzle = useMemo(() => puzzleFor(dayNum), [dayNum]);

  const [idx, setIdx] = useState(0);
  const [raw, setRaw] = useState("");
  const [results, setResults] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [copied, setCopied] = useState(false);
  const [sound, setSound] = useState(true);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  const blip = useBlip(sound);
  const current = puzzle[idx];
  const parsed = parseGuess(raw);
  const last = results[results.length - 1];
  const finished = idx >= PER_DAY;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const stored = localStorage.getItem("bp:streak");
        if (alive && stored) {
          const s = JSON.parse(stored);
          setStreak(s.lastDay === dayNum - 1 || s.lastDay === dayNum ? s.count : 0);
        }
      } catch { /* first visit, or storage blocked */ }
    })();
    return () => { alive = false; };
  }, [dayNum]);

  useEffect(() => {
    if (!finished && !revealed && inputRef.current) inputRef.current.focus();
  }, [idx, revealed, finished]);

  function bumpStreak() {
    try {
      const stored = localStorage.getItem("bp:streak");
      const s = stored ? JSON.parse(stored) : { count: 0, lastDay: null };
      const next = s.lastDay === dayNum ? s.count : s.lastDay === dayNum - 1 ? s.count + 1 : 1;
      localStorage.setItem("bp:streak", JSON.stringify({ count: next, lastDay: dayNum }));
      setStreak(next);
    } catch { /* storage optional */ }
  }

  function lockIn() {
    if (parsed === null) return;
    const tier = gradeGuess(parsed, current.a);
    const line = tier.lines[Math.floor(Math.random() * tier.lines.length)];
    setResults((r) => [...r, { guess: parsed, answer: current.a, tier, line, q: current.q }]);
    setRevealed(true);
    blip(tier.tone, tier.key === "what" ? 0.3 : 0.16, tier.key === "what" ? "sawtooth" : "triangle");
    if (tier.key === "what") {
      setShake(true);
      setTimeout(() => setShake(false), 460);
    }
  }

  function next() {
    blip(520, 0.08, "square");
    setRevealed(false);
    setRaw("");
    const n = idx + 1;
    setIdx(n);
    if (n >= PER_DAY) bumpStreak();
  }

  const total = results.reduce((s, r) => s + r.tier.points, 0);
  const maxScore = PER_DAY * 3;
  const rank = RANKS.find((r) => total >= r.min);
  const finalCount = useCountUp(total, finished, 800);

  async function share() {
    const grid = results.map((r) => r.tier.emoji).join("");
    try {
      await navigator.clipboard.writeText(
        `Ballpark #${dayNum} — ${total}/${maxScore}\n${grid}\n${rank.title}`
      );
      setCopied(true);
      blip(760, 0.1, "square");
      setTimeout(() => setCopied(false), 2200);
    } catch { /* clipboard blocked */ }
  }

  return (
    <div className={`bp-root ${shake ? "is-shaking" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Black&display=swap');

        .bp-root {
          --night:#2A1052; --night2:#3B1870; --deep:#1B0937;
          --pop:#FFD23F; --hot:#FF3D7F; --mint:#2BE8A5; --sky:#54D2FF;
          --orange:#FF8A3D; --cream:#FFF3DE;
          --brass:#E8B23C; --brass-d:#A9761C;
          font-family:'Archivo',ui-sans-serif,system-ui,sans-serif;
          font-variant-numeric:tabular-nums;
          background:
            radial-gradient(1200px 500px at 50% -12%, var(--night2) 0%, transparent 62%),
            var(--night);
          color:var(--cream); min-height:100vh; padding:22px 16px 60px;
          display:flex; justify-content:center; position:relative; overflow-x:hidden;
        }
        .bp-shell{width:100%;max-width:660px;position:relative;z-index:1}

        /* --- marquee header --- */
        .bp-stripe{height:12px;border-radius:99px;margin-bottom:16px;
          background:repeating-linear-gradient(115deg,var(--hot) 0 16px,var(--cream) 16px 32px);
          opacity:.9}
        .bp-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:6px}
        .bp-logo{font-family:'Archivo Black',sans-serif;font-size:clamp(34px,9vw,50px);
          margin:0;letter-spacing:-.03em;line-height:.95;color:var(--pop);
          text-shadow:3px 3px 0 var(--hot),6px 6px 0 rgba(0,0,0,.35);
          transform:rotate(-1.4deg)}
        .bp-sub{font-size:12px;font-weight:600;color:var(--cream);opacity:.6;margin:2px 0 0}
        .bp-mute{background:none;border:2px solid rgba(255,243,222,.28);color:var(--cream);
          border-radius:99px;width:38px;height:38px;font-size:15px;cursor:pointer;flex:0 0 auto}
        .bp-mute:focus-visible{outline:3px solid var(--pop);outline-offset:2px}

        /* --- bulbs --- */
        .bp-bulbs{display:flex;gap:10px;justify-content:center;margin:20px 0 26px}
        .bp-bulb{width:17px;height:17px;border-radius:50%;background:rgba(255,243,222,.14);
          border:2px solid rgba(255,243,222,.2);transition:all 220ms ease}
        .bp-bulb[data-t="dead"]{background:var(--mint);border-color:var(--mint);box-shadow:0 0 14px var(--mint)}
        .bp-bulb[data-t="warm"]{background:var(--pop);border-color:var(--pop);box-shadow:0 0 14px var(--pop)}
        .bp-bulb[data-t="cold"]{background:var(--orange);border-color:var(--orange);box-shadow:0 0 14px var(--orange)}
        .bp-bulb[data-t="what"]{background:var(--hot);border-color:var(--hot);box-shadow:0 0 14px var(--hot)}
        .bp-bulb[data-on="true"]{animation:bp-pulse 1.5s ease-in-out infinite}
        @keyframes bp-pulse{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.28);opacity:1}}

        /* --- card --- */
        .bp-card{background:var(--deep);border:3px solid var(--brass);border-radius:22px;
          padding:26px 22px;box-shadow:0 14px 0 rgba(0,0,0,.32);animation:bp-in 380ms cubic-bezier(.2,1.5,.4,1) both}
        @keyframes bp-in{from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:none}}
        .bp-count{font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--pop);margin:0 0 12px}
        .bp-q{font-family:'Archivo Black',sans-serif;font-size:clamp(21px,5.2vw,29px);
          line-height:1.18;letter-spacing:-.02em;margin:0 0 24px;max-width:24ch}

        .bp-inputrow{display:flex;gap:10px;flex-wrap:wrap}
        .bp-field{flex:1 1 190px;min-width:0}
        .bp-input{width:100%;box-sizing:border-box;font:inherit;font-size:25px;font-weight:700;
          padding:15px 16px;border-radius:13px;border:3px solid var(--brass);
          background:#120627;color:var(--cream)}
        .bp-input::placeholder{color:rgba(255,243,222,.34);font-weight:500;font-size:17px}
        .bp-input:focus-visible{outline:3px solid var(--pop);outline-offset:2px}
        .bp-echo{font-size:12.5px;font-weight:600;color:var(--pop);opacity:.85;margin-top:9px;min-height:17px}

        .bp-btn{font:inherit;font-family:'Archivo Black',sans-serif;font-size:16px;cursor:pointer;
          padding:16px 26px;border-radius:13px;border:none;background:var(--hot);color:#fff;
          letter-spacing:.02em;box-shadow:0 6px 0 #B31E56;transition:transform 80ms,box-shadow 80ms}
        .bp-btn:active:not(:disabled){transform:translateY(5px);box-shadow:0 1px 0 #B31E56}
        .bp-btn:disabled{opacity:.35;cursor:not-allowed}
        .bp-btn:focus-visible{outline:3px solid var(--pop);outline-offset:3px}
        .bp-btn-go{background:var(--pop);color:var(--deep);box-shadow:0 6px 0 #B8890F}
        .bp-btn-go:active:not(:disabled){box-shadow:0 1px 0 #B8890F}

        /* --- reveal --- */
        .bp-stamp{font-family:'Archivo Black',sans-serif;font-size:clamp(32px,8vw,46px);
          letter-spacing:-.02em;line-height:1;margin:2px 0 4px;
          animation:bp-slam 420ms cubic-bezier(.2,1.6,.35,1) both}
        @keyframes bp-slam{0%{transform:scale(2.6) rotate(-11deg);opacity:0}
          60%{transform:scale(.93) rotate(2deg);opacity:1}100%{transform:none;opacity:1}}
        .bp-tone-dead{color:var(--mint)} .bp-tone-warm{color:var(--pop)}
        .bp-tone-cold{color:var(--orange)} .bp-tone-what{color:var(--hot)}
        .bp-quip{font-size:15px;font-weight:600;opacity:.72;margin:0 0 6px}
        .bp-gap{font-size:13px;font-weight:700;letter-spacing:.1em;opacity:.55;margin:0 0 6px}

        .bp-dialwrap{margin:6px 0 18px}
        .bp-dial{width:100%;height:auto;display:block;overflow:visible}
        .bp-dial-tag{font-family:'Archivo Black',sans-serif;font-size:13px;fill:var(--cream);letter-spacing:.06em}
        .bp-needle{transform:rotate(var(--from))}
        .bp-needle.is-swung{transform:rotate(var(--to));
          transition:transform 1150ms cubic-bezier(.34,1.42,.5,1)}
        .bp-answer{text-align:center;margin-top:-6px}
        .bp-answer-lbl{display:block;font-size:11px;font-weight:700;letter-spacing:.18em;opacity:.5;margin-bottom:1px}
        .bp-answer-num{font-family:'Archivo Black',sans-serif;font-size:clamp(28px,7vw,40px);letter-spacing:-.03em}

        /* --- results --- */
        .bp-score{font-family:'Archivo Black',sans-serif;font-size:clamp(72px,20vw,116px);
          line-height:.88;letter-spacing:-.05em;color:var(--pop);margin:4px 0 0;
          text-shadow:4px 4px 0 var(--hot)}
        .bp-of{font-size:24px;color:var(--cream);opacity:.5;-webkit-text-fill-color:currentColor;text-shadow:none}
        .bp-rank{font-family:'Archivo Black',sans-serif;font-size:clamp(20px,5vw,27px);
          color:var(--mint);margin:10px 0 2px;letter-spacing:-.02em}
        .bp-tiles{display:flex;gap:9px;margin:20px 0 8px;flex-wrap:wrap}
        .bp-tile{width:44px;height:44px;border-radius:11px;display:grid;place-items:center;
          font-size:21px;background:rgba(255,243,222,.07);border:2px solid rgba(255,243,222,.16);
          animation:bp-pop 340ms cubic-bezier(.2,1.7,.4,1) both}
        @keyframes bp-pop{from{transform:scale(0) rotate(-25deg);opacity:0}to{transform:none;opacity:1}}
        .bp-streak{font-size:13.5px;font-weight:700;opacity:.6;margin:6px 0 20px}

        .bp-recap{margin-top:26px;border-top:2px dashed rgba(255,243,222,.18)}
        .bp-row{display:flex;gap:12px;align-items:baseline;padding:13px 0;
          border-bottom:1px dashed rgba(255,243,222,.13)}
        .bp-row-q{flex:1;font-size:13.5px;line-height:1.35;opacity:.82}
        .bp-row-n{font-size:13.5px;font-weight:700;white-space:nowrap;color:var(--pop)}
        .bp-row-n span{opacity:.45;font-weight:500;color:var(--cream)}
        .bp-foot{font-size:11.5px;opacity:.42;margin-top:24px;line-height:1.55}

        /* --- confetti --- */
        .bp-confetti{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:5}
        .bp-confetti i{position:absolute;top:-24px;border-radius:2px;
          animation-name:bp-fall;animation-timing-function:linear;animation-fill-mode:forwards}
        @keyframes bp-fall{to{transform:translateY(105vh) rotate(var(--spin));opacity:.15}}

        .is-shaking{animation:bp-shake 440ms cubic-bezier(.36,.07,.19,.97)}
        @keyframes bp-shake{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}
          30%,50%,70%{transform:translateX(-7px)}40%,60%{transform:translateX(7px)}}

        @media (prefers-reduced-motion:reduce){
          .bp-card,.bp-stamp,.bp-tile,.bp-confetti i,.is-shaking{animation:none!important}
          .bp-needle.is-swung{transition:none}
          .bp-bulb[data-on="true"]{animation:none}
        }
      `}</style>

      {revealed && last?.tier.key === "dead" && <Confetti seed={idx} />}

      <div className="bp-shell">
        <div className="bp-stripe" />
        <header className="bp-head">
          <div>
            <h1 className="bp-logo">BALLPARK</h1>
            <p className="bp-sub">Five wild numbers. How close can you get?</p>
          </div>
          <button className="bp-mute" onClick={() => setSound((s) => !s)}
            aria-label={sound ? "Mute sound" : "Unmute sound"}>
            {sound ? "🔊" : "🔇"}
          </button>
        </header>

        <div className="bp-bulbs">
          {Array.from({ length: PER_DAY }).map((_, i) => (
            <div key={i} className="bp-bulb" data-t={results[i]?.tier.key}
              data-on={i === idx && !finished} />
          ))}
        </div>

        {!finished ? (
          <section className="bp-card" key={idx}>
            <p className="bp-count">NO. {dayNum} · ROUND {idx + 1} OF {PER_DAY}</p>
            <h2 className="bp-q">{current.q}</h2>

            {!revealed ? (
              <div className="bp-inputrow">
                <div className="bp-field">
                  <input ref={inputRef} className="bp-input" inputMode="decimal"
                    placeholder={`How many ${current.unit}?`} value={raw}
                    onChange={(e) => setRaw(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && lockIn()}
                    aria-label={current.q} />
                  <div className="bp-echo">
                    {raw && parsed !== null
                      ? `${commas(parsed)} ${current.unit}`
                      : raw
                      ? "Numbers only. Try 40k or 2.5b."
                      : "Shorthand works: 40k · 2.5b · 3t"}
                  </div>
                </div>
                <button className="bp-btn" onClick={lockIn} disabled={parsed === null}>
                  LOCK IT IN
                </button>
              </div>
            ) : (
              <div>
                <p className="bp-gap">{gapPhrase(last.guess, last.answer)}</p>
                <h3 className={`bp-stamp bp-tone-${last.tier.key}`}>{last.tier.label}</h3>
                <p className="bp-quip">{last.line}</p>
                <Dial guess={last.guess} answer={last.answer} tier={last.tier} />
                <button className="bp-btn bp-btn-go" onClick={next}>
                  {idx === PER_DAY - 1 ? "SEE THE DAMAGE" : "NEXT ONE"}
                </button>
              </div>
            )}
          </section>
        ) : (
          <section className="bp-card">
            <p className="bp-count">BALLPARK NO. {dayNum}</p>
            <div className="bp-score">
              {Math.round(finalCount)}<span className="bp-of"> / {maxScore}</span>
            </div>
            <div className="bp-rank">{rank.title}</div>

            <div className="bp-tiles">
              {results.map((r, i) => (
                <div className="bp-tile" key={i} style={{ animationDelay: `${i * 90}ms` }}>
                  {r.tier.emoji}
                </div>
              ))}
            </div>
            <p className="bp-streak">
              {streak > 1 ? `🔥 ${streak} day streak` : "Come back tomorrow to start a streak"}
            </p>

            <button className="bp-btn" onClick={share}>
              {copied ? "COPIED ✓" : "SHARE RESULT"}
            </button>

            <div className="bp-recap">
              {results.map((r, i) => (
                <div className="bp-row" key={i}>
                  <div className="bp-row-q">{r.tier.emoji} {r.q}</div>
                  <div className="bp-row-n">
                    {commas(r.answer)} <span>· you said {commas(r.guess)}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="bp-foot">
              Answers are widely cited public estimates, rounded. Ballpark scores how close
              you got, never how exact you were.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
