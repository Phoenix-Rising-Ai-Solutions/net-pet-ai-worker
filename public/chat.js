// chat.js — Natural English Training Magic Chat
// English-first. Vietnamese is a rescue rope, not a crutch.
// Obi = Michael Hobbs in AI form: high-energy, anti-shame, tough love.
// Mouse Voice → Tiger Voice. Volume + Velocity > Grammar.

const DEFAULTS = {
  birthplace:      "Ho Chi Minh City",
  confidenceAreas: "speaking",
  occupation:      "student",
  fearTrigger:     "making mistakes",
  learningHistory: "school"
};

// ── Crisis detection ───────────────────────────────────────
// ALWAYS checked before any lesson logic. Safety > English.
function isCrisisSignal(text) {
  return /\b(jump off|kill myself|killing myself|suicide|suicidal|end my life|hurt myself|self.?harm|want to die|don.?t want to live|can.?t go on|no reason to live|give up on life|jump from a|want to jump)\b/i.test(text);
}

function handleCrisis() {
  stopAudio();
  obi("Hey \u2014 stop. I heard that.\n\nThat matters more than any English lesson. If something real is going on, please reach out:\n\n\uD83C\uDDFB\uD83C\uDDF3 Vietnam support line: 1800 599 920 (free, 24/7)\n\uD83D\uDCAC Or talk to a teacher, parent, or friend you trust.\n\nI'm here when you're ready. No judgment.");
}

let state   = "boot";
let profile = {};
let chatHistory = [];         // student messages for pronunciation analysis
let chatRound = 0;            // current exchange count
const CHAT_ROUNDS = 5;        // exchanges before pronunciation tips
let ttsOn   = true;
let obiVoice = null;          // best available SpeechSynthesis voice
let struggles = {};           // { [stateKey]: count } — tracks repeat confusion per step

const feed      = document.getElementById("feed");
const form      = document.getElementById("form");
const input     = document.getElementById("msg");
const micBtn    = document.getElementById("mic");
const sendBtn   = document.getElementById("sendBtn");
const dot       = document.getElementById("dot");
const speakBtn  = document.getElementById("speakToggle");

// ── TTS — Deepgram Aura (natural voice) with browser fallback ──

function pickVoice() {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;

  const prefs = [
    v => /natural|neural|online|enhanced/i.test(v.name) && /en.US/i.test(v.lang),
    v => /google us english|samantha|karen|daniel|zira|aria|jenny|guy/i.test(v.name),
    v => /en.US/i.test(v.lang) && !v.localService,
    v => /en.US/i.test(v.lang),
    v => /en/i.test(v.lang)
  ];

  for (const test of prefs) {
    const match = voices.find(test);
    if (match) return match;
  }
  return voices[0];
}

function initVoices() {
  obiVoice = pickVoice();
  if (!obiVoice) {
    speechSynthesis.addEventListener("voiceschanged", () => { obiVoice = pickVoice(); }, { once: true });
  }
}

if (window.speechSynthesis) {
  initVoices();
  speechSynthesis.addEventListener("voiceschanged", () => { obiVoice = pickVoice(); }, { once: true });
}

// Deepgram Aura TTS — queued playback
let audioQueue = [];
let isPlaying  = false;
let currentAudio = null;

function playNext() {
  if (!audioQueue.length) { isPlaying = false; return; }
  isPlaying = true;
  const url = audioQueue.shift();
  currentAudio = new Audio(url);
  currentAudio.onended  = () => { URL.revokeObjectURL(url); currentAudio = null; playNext(); };
  currentAudio.onerror  = () => { URL.revokeObjectURL(url); currentAudio = null; playNext(); };
  currentAudio.play().catch(() => { URL.revokeObjectURL(url); currentAudio = null; playNext(); });
}

function stopAudio() {
  audioQueue = [];
  isPlaying = false;
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  speechSynthesis?.cancel();
}

function fallbackSpeak(text) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (obiVoice) u.voice = obiVoice;
  u.lang = "en-US";
  u.rate = 0.9;
  u.pitch = 1.05;
  speechSynthesis.speak(u);
}

async function speak(text) {
  if (!ttsOn) return;
  const clean = text.replace(/\([^)]*\)/g, "").replace(/\s{2,}/g, " ").trim();
  if (!clean) return;

  try {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: clean })
    });
    if (!res.ok) throw new Error(`TTS ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    audioQueue.push(url);
    if (!isPlaying) playNext();
  } catch {
    // Deepgram down? Fall back to browser voice
    fallbackSpeak(clean);
  }
}

if (speakBtn) {
  speakBtn.addEventListener("click", () => {
    ttsOn = !ttsOn;
    speakBtn.textContent = ttsOn ? "\uD83D\uDD0A" : "\uD83D\uDD07";
    speakBtn.title = ttsOn ? "Obi voice ON" : "Obi voice OFF";
    if (!ttsOn) stopAudio();
  });
}

// ── Adaptive Vietnamese rescue rope ────────────────────────
// Canon: "Vietnamese fallback when student drowns, pushes back to English fast."
// Rule: try English 3X. On the 3rd struggle, offer Vietnamese. Then push back.

function trackStruggle(key) {
  struggles[key] = (struggles[key] || 0) + 1;
  return struggles[key];
}

function clearStruggle(key) {
  struggles[key] = 0;
}

const VI_HINTS = {
  ask_name:  "Tên bạn là gì?",
  ask_city:  "Bạn sống ở đâu?",
  ask_level: "1 = Mới học, 2 = Trung bình, 3 = Khá giỏi",
  ask_goal:  "Bạn muốn luyện tập gì? Ví dụ: nói chuyện với bạn bè, gọi đồ ăn",
  chat:      "Cứ nói bất cứ điều gì! Không cần hoàn hảo.",
  error:     "Xin lỗi, có lỗi. Thử lại nhé."
};

// Returns Vietnamese hint bubble if student has struggled 3+ times on this key
function rescueIfNeeded(key) {
  if (struggles[key] >= 3 && VI_HINTS[key]) {
    obi(`🇻🇳 ${VI_HINTS[key]}`);
    struggles[key] = 0; // reset — push back to English
  }
}

// ── Render ─────────────────────────────────────────────────

function bubble(role, text) {
  const row = document.createElement("div");
  row.className = `row row-${role}`;
  const b = document.createElement("div");
  b.className = `bubble bubble-${role}`;
  b.textContent = text;
  row.appendChild(b);
  feed.appendChild(row);
  feed.scrollTop = feed.scrollHeight;
  return row;
}

function typingIndicator() {
  const row = document.createElement("div");
  row.className = "row row-obi";
  row.innerHTML = `<div class="bubble bubble-obi"><span class="typing"><span></span><span></span><span></span></span></div>`;
  feed.appendChild(row);
  feed.scrollTop = feed.scrollHeight;
  return row;
}

function obi(text) {
  bubble("obi", text);
  speak(text);
}

function student(text) { bubble("student", text); }

// ── API ────────────────────────────────────────────────────

async function api(path, method = "GET", body) {
  const res = await fetch(path, {
    method,
    headers: { "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function withTyping(fn) {
  const ind = typingIndicator();
  try {
    const result = await fn();
    ind.remove();
    return result;
  } catch (err) {
    ind.remove();
    obi("Something broke on my end. Try again.");
    rescueIfNeeded("error");
    state = "chat";
    throw err;
  }
}

// ── Helpers ────────────────────────────────────────────────

const pause = (ms = 400) => new Promise(r => setTimeout(r, ms));

function slugify(s) {
  return s.trim().toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 40) || "student";
}

function normalizeLevel(s) {
  const l = s.toLowerCase().trim();
  if (l === "1" || l.includes("beg") || l.includes("a1") || l.includes("m\u1EDBi"))         return "A1 Beginner";
  if (l === "2" || l.includes("elem") || l.includes("a2") || l.includes("c\u01A1 b\u1EA3n")) return "A2 Elementary";
  if (l === "3" || l.includes("int") || l.includes("b1") || l.includes("trung"))           return "B1 Intermediate";
  if (l === "4" || l.includes("upper") || l.includes("b2"))                                return "B2 Upper Intermediate";
  if (l === "5" || l.includes("adv") || l.includes("c1") || l.includes("gi\u1ECFi"))       return "C1 Advanced";
  return "B1 Intermediate";
}

function looksLikeLevel(s) {
  return /^(1|2|3|4|5|a1|a2|b1|b2|c1|beg|elem|int|upper|adv|m\u1EDBi|trung|gi\u1ECFi|c\u01A1)/i.test(s.trim());
}

function firstName() {
  return (profile.fullName || "").split(/\s+/)[0] || "you";
}

function lock() {
  input.disabled = true;
  sendBtn.disabled = true;
  micBtn.disabled = true;
}

function unlock() {
  input.disabled = false;
  sendBtn.disabled = false;
  micBtn.disabled = false;
  input.focus();
}

function isVague(text) {
  const t = text.toLowerCase().trim();
  if (!t || t.length < 3) return true;
  // Explicit confusion / non-answers
  if (/^(i don'?t know|i dont know|idk|kh\u00F4ng bi\u1EBFt|no|nothing|none|skip|kh\u00F4ng|ch\u01B0a bi\u1EBFt|no idea|\?+|dunno|um+|uh+|huh|hmm+|eh|ok|okay|sure|yes|no|yep|nope|lol|haha|bye)$/i.test(t)) return true;
  // Confusion phrases
  if (/i (don'?t|dont) (understand|know|get it|have|want)|not sure|what\?|huh\?|idc|whatever|anything|something|everything/.test(t)) return true;
  return false;
}

function isGreeting(text) {
  return /^(hi|hey|hello|yo|sup|what'?s up|howdy|hola|good morning|good afternoon|good evening|morning|xin ch[aà]o)\b/i.test(text.trim());
}

// ── Onboarding ─────────────────────────────────────────────

async function submitOnboarding() {
  await withTyping(() => api("/api/onboarding", "POST", {
    studentId:       profile.studentId,
    fullName:        profile.fullName,
    currentCity:     profile.currentCity,
    birthplace:      DEFAULTS.birthplace,
    englishLevel:    profile.englishLevel,
    goals:           profile.goals,
    confidenceAreas: DEFAULTS.confidenceAreas,
    occupation:      DEFAULTS.occupation,
    fearTrigger:     DEFAULTS.fearTrigger,
    learningHistory: DEFAULTS.learningHistory,
    motivationNow:   profile.goals
  }));
  try { localStorage.setItem("net_profile", JSON.stringify(profile)); } catch {}
}

// ── Natural Chat Engine ─────────────────────────────────────
// Obi chats naturally via DeepSeek. No canned responses.
// After a few exchanges, gives pronunciation coaching.

// ── Jolly Phonics — 42 sounds, Vietnamese difficulty map ──
// JP groups most relevant to Vietnamese learners
const JP_SOUNDS = [
  {
    pattern: /\bth(e|is|at|ink|ough|ree|an|ey|em|eir|ose)\b/i,
    tip: "\uD83D\uDD0A JP GROUP 6: TH Sound\nTongue BETWEEN your teeth \u2014 touch your upper teeth with its tip. Breathe out slowly. 'Thhhink'. NOT 'Tink' or 'Sink'. Vietnamese has no TH \u2014 this takes practice! Action: stick tongue out and say THHHH 10 times."
  },
  {
    pattern: /\b[a-z]*r[a-z]+\b/i,
    tip: "\uD83D\uDD0A JP GROUP 2: R Sound\nCurl your tongue BACK. It touches NOTHING. Lips slightly rounded. 'Rrrright'. NOT 'Light'. Practice: 'red lorry, yellow lorry' \u2014 fast as you can!"
  },
  {
    pattern: /\bv[a-z]+/i,
    tip: "\uD83D\uDD0A JP GROUP 5: V Sound\nTOP TEETH on BOTTOM LIP. Buzz like a bee. 'Vvvvery'. NOT 'Berry' or 'Wery'. Put your hand in front of your mouth \u2014 you should feel vibration! Practice: 'very very very'."
  },
  {
    pattern: /\w+(nd|ld|rd|ng|nk|ft|sk|st|nt|ll)\b/i,
    tip: "\uD83D\uDD0A JP GROUPS 1-4: Final Consonants\nEnglish LANDS on consonants. Don't drop them! 'Friend' ends with D. 'School' ends with LL. 'Want' ends with T. Your mouth should CLOSE or your tongue should TAP at the end."
  },
  {
    pattern: /\b(really|feel|people|will|well|full|still|fall|call|tell|bell)\b/i,
    tip: "\uD83D\uDD0A JP GROUP 3: L Sound\nYour tongue tip touches the ridge behind upper teeth. 'La la la' \u2014 feel it? Now say 'really' 'feel' 'well'. Don't let L disappear or turn into N!"
  },
  {
    pattern: /\b(ship|shop|she|show|share|fish|dish|wash|English|special)\b/i,
    tip: "\uD83D\uDD0A JP GROUP 6: SH Sound\nLips FORWARD \u2014 like 'shhh' to a baby. Round them. 'Ship' NOT 'Sip'. 'Show' NOT 'Sow'. Practice: 'She sells seashells by the seashore!'"
  },
  {
    pattern: /\b(beat|seat|feet|need|sleep|read|see|tree|three|feel|teach|eat)\b/i,
    tip: "\uD83D\uDD0A JP GROUP 4: EE Sound\nLong EE \u2014 'feeeet'. Now short I \u2014 'fit'. Totally different mouths! 'Beat' vs 'Bit'. 'Seat' vs 'Sit'. Lips spread wide for EE. Relaxed for short I."
  },
  {
    pattern: /\b(out|about|now|how|down|town|found|sound|around|loud)\b/i,
    tip: "\uD83D\uDD0A JP GROUP 7: OU Sound\nStarts with 'ah' then closes to 'oo'. 'OW \u2014 ahhh...oo'. 'About' = 'ah-BAWT'. 'Now' = 'NAH-oo'. Open wide then close. Don't say it like a flat 'o'!"
  }
];

function buildSystemPrompt(p) {
  const name  = p?.fullName    ? `The student's name is ${p.fullName}.`         : "";
  const level = p?.englishLevel ? `Their English level is ${p.englishLevel}.`    : "";
  const goals = p?.goals        ? `Their learning goal: ${p.goals}.`              : "";
  const city  = p?.currentCity  ? `They live in ${p.currentCity}, Vietnam.`      : "";
  return `You are Obi, an English coach at Natural English Training. You teach Vietnamese high school students to speak English confidently.

Your personality: high-energy, anti-shame, tough love. You are Michael Hobbs in AI form. Volume and velocity beat grammar. Mouse Voice \u2192 Tiger Voice.

${[name, level, goals, city].filter(Boolean).join(" ")}

Jolly Phonics awareness (you know this deeply): English has 42 phonemes. Vietnamese learners most struggle with:
- TH (Groups 6): tongue between teeth \u2014 not T, not S
- R (Group 2): curl back, touch nothing \u2014 not L, not Y
- V (Group 5): top teeth on bottom lip \u2014 not B, not W
- Final consonants (Groups 1-4): English LANDS on them \u2014 don't drop!
- Short/long vowel pairs: bit vs beat, pull vs pool \u2014 totally different
- Word stress: English is stress-timed, Vietnamese is tonal \u2014 big shift!
When you hear these in conversation, naturally model the correct sound. Don't drill \u2014 just normalize good pronunciation by example.

Rules:
- Keep responses to 1-3 SHORT sentences. You're texting, not writing essays.
- Be encouraging but REAL. React to what the student actually said.
- If they talk about something interesting, ask a specific follow-up about THAT topic.
- If they say something short or vague, push them to say more.
- Gently correct major grammar mistakes by naturally rephrasing, don't lecture.
- NEVER be robotic. NEVER use generic phrases like "That's great!" without connecting to what they said.
- You speak English only. If they write Vietnamese, respond simply and encourage English.
- You are talking to teenagers. Be cool, not cringe.
- CRITICAL: If a student says anything about self-harm, suicide, wanting to die, or jumping off anything \u2014 STOP the lesson. Respond with care and direct them to help. Safety first. Always.`.trim();
}

let chatMessages = []; // conversation history for DeepSeek

async function reactLLM(text) {
  chatMessages.push({ role: "user", content: text });

  // Keep last 20 messages to avoid token bloat
  if (chatMessages.length > 20) {
    chatMessages = chatMessages.slice(-20);
  }

  const messages = [
    { role: "system", content: buildSystemPrompt(profile) },
    ...chatMessages
  ];

  try {
    const res = await api("/api/chat", "POST", { messages });
    const reply = res.reply || "Say that again? I didn't catch it.";
    chatMessages.push({ role: "assistant", content: reply });
    // Persist exchange to server ledger so Obi remembers this student next session
    if (profile.studentId) {
      api("/api/memory", "POST", { studentId: profile.studentId, exchange: { user: text, obi: reply } }).catch(() => {});
    }
    return reply;
  } catch (err) {
    // Fallback to basic response if API fails
    chatMessages.pop(); // remove the user message we just added
    return reactFallback(text, chatRound);
  }
}

function reactFallback(text, round) {
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words >= 8) return "Good stuff! Tell me more about that.";
  if (words < 3) return "Come on, give me a real sentence! Even a short one.";
  return "OK I hear you — keep going! What happened next?";
}

function pickStarter() {
  const g = (profile.goals || "").toLowerCase();
  if (g.includes("friend"))    return "So — what do you and your friends usually talk about?";
  if (g.includes("food") || g.includes("order") || g.includes("eat"))
    return "I LOVE food. What\u2019s your favorite thing to eat?";
  if (g.includes("job") || g.includes("work") || g.includes("interview"))
    return "What kind of work are you interested in? Tell me!";
  if (g.includes("travel"))    return "Where do you want to travel? Dream big!";
  if (g.includes("school") || g.includes("study"))
    return "What subject do you actually enjoy in school?";
  if (g.includes("music"))     return "What music are you listening to right now?";
  if (g.includes("game"))      return "What games do you play? I want to know!";
  if (g.includes("movie"))     return "What was the last movie you watched?";
  return "Tell me something about your life! Anything. What happened today?";
}

// react() removed — replaced by reactLLM() above

// Jolly Phonics pronunciation coaching — matched against actual student text
function buildPronunciationTips() {
  const allText = chatHistory.join(" ");
  const tips = [];

  for (const jp of JP_SOUNDS) {
    if (jp.pattern.test(allText)) {
      tips.push(jp.tip);
      if (tips.length >= 2) break;
    }
  }

  // Always end with stress/rhythm — Vietnamese is tonal, English is stress-timed (JP core principle)
  tips.push("🔊 JP RHYTHM: Word Stress\nEnglish has STRONG and weak beats. 'baNAna' not 'BAnaNA'. 'toMORrow' not 'TOMorrow'.\nVietnamese uses tone to change meaning \u2014 English uses STRESS. Feel the beat, not the tone!");

  return tips.slice(0, 3);
}

// ── Input handler ──────────────────────────────────────────

async function handle(text) {
  if (!text.trim() || state === "busy") return;
  input.value = "";
  student(text.trim());

  // Safety first — crisis check runs before ANY lesson logic
  if (isCrisisSignal(text)) {
    handleCrisis();
    return;
  }

  switch (state) {
    case "intro": {
      const t = text.trim();
      if (t.length < 2 || /^\d+$/.test(t)) {
        trackStruggle("ask_name");
        obi("Just type your first name!");
        rescueIfNeeded("ask_name");
        break;
      }
      clearStruggle("ask_name");
      profile.fullName  = t;
      profile.studentId = slugify(profile.fullName);
      state = "ask_city";
      await pause();
      obi(`${firstName()}! Good name. Where do you live?`);
      break;
    }
    case "ask_city": {
      const t = text.trim();
      if (t.length < 2 || isVague(t)) {
        trackStruggle("ask_city");
        const n = struggles.ask_city || 0;
        if (n >= 1) {
          obi("🇻🇳 Bạn đang sống ở thành phố nào? (What city do you live in?)\n\nVí dụ: Hồ Chí Minh, Hà Nội, Đà Nẵng...");
        } else {
          obi("🇻🇳 Bạn sống ở đâu? (Where do you live?)\nViet example: Hồ Chí Minh City, Hà Nội, Đà Nẵng...");
        }
        break;
      }
      clearStruggle("ask_city");
      profile.currentCity = t;
      state = "ask_level";
      await pause();
      obi("What is your English level? Type a number:\n\n1 = A1 Beginner — I know almost nothing\n2 = A2 Elementary — I know some basics\n3 = B1 Intermediate — I can have simple conversations\n4 = B2 Upper Intermediate — I make mistakes but I manage\n5 = C1 Advanced — I'm confident and fluent");
      break;
    }
    case "ask_level": {
      const t = text.trim();
      if (!looksLikeLevel(t)) {
        trackStruggle("ask_level");
        const n = struggles.ask_level || 0;
        if (n >= 1) {
          obi("🇻🇳 Chọn số từ 1 đến 5 nhé! (Just pick a number 1 to 5!)\n\n1 = Mới bắt đầu (Beginner)\n2 = Cơ bản (Elementary)\n3 = Trung bình (Intermediate)\n4 = Khá (Upper Intermediate)\n5 = Giỏi (Advanced)");
        } else {
          obi("🇻🇳 Gõ số nhé! 1 = yếu nhất, 5 = mạnh nhất. (Type a number! 1 = weakest, 5 = strongest.)");
        }
        break;
      }
      clearStruggle("ask_level");
      profile.englishLevel = normalizeLevel(t);
      state = "ask_goal";
      await pause();
      obi("What do you want to practice?\n\n1 = talking with friends\n2 = ordering food\n3 = job interview\n4 = travel\n5 = school / studies");
      break;
    }
    case "ask_goal": {
      // Allow numeric shortcuts 1-5
      const goalMap = { "1": "talking with friends", "2": "ordering food", "3": "job interview", "4": "travel", "5": "school and studies" };
      const mapped = goalMap[text.trim()];
      if (mapped) {
        clearStruggle("ask_goal");
        profile.goals = mapped;
      } else if (isVague(text)) {
        trackStruggle("ask_goal");
        const n = struggles.ask_goal || 0;
        if (n >= 1) {
          // Already confused once — stop repeating English, just pick and move on
          obi("\uD83C\uDDFB\uD83C\uDDF3 Kh\u00F4ng sao! M\u00ECnh ch\u1ECDn cho b\u1EA1n nh\u00E9. (No problem \u2014 I'll choose for you!)");
          await pause(400);
          profile.goals = "talking with friends";
        } else {
          // First confusion: drop to Vietnamese + bilingual numbered menu
          obi("\uD83C\uDDFB\uD83C\uDDF3 B\u1EA1n mu\u1ED1n luy\u1EC7n t\u1EADp \u0111i\u1EC1u g\u00EC? Ch\u1ECDn s\u1ED1: (What do you want to practice? Pick a number:)\n\n1 = N\u00F3i chuy\u1EC7n v\u1EDBi b\u1EA1n b\u00E8 (talking with friends)\n2 = G\u1ECDi m\u00F3n \u0103n (ordering food)\n3 = Ph\u1ECFng v\u1EA5n xin vi\u1EC7c (job interview)\n4 = Du l\u1ECBch (travel)\n5 = H\u1ECDc t\u1EADp (school)");
          break;
        }
      } else {
        clearStruggle("ask_goal");
        profile.goals = text.trim();
      }
      lock();
      await submitOnboarding();
      unlock();
      await pause(500);
      obi(`${firstName()}, let\u2019s just talk! No textbook. Just you and me.`);
      await pause(400);
      obi(pickStarter());
      state = "chat";
      break;
    }
    case "chat": {
      const t = text.trim();
      if (isGreeting(t)) {
        obi(`${firstName()}! What\u2019s going on? Tell me something!`);
        break;
      }
      if (t.length < 2 || isVague(t)) {
        const n = trackStruggle("chat");
        if (n >= 3) {
          obi("\uD83C\uDDFB\uD83C\uDDF3 C\u1EE9 n\u00F3i b\u1EA5t c\u1EE9 \u0111i\u1EC1u g\u00EC! Kh\u00F4ng c\u1EA7n ho\u00E0n h\u1EA3o.");
          await pause(300);
          obi("Say ANYTHING! Even \u2018I like pizza\u2019 counts. Go!");
          struggles.chat = 0;
        } else {
          obi("Come on! Say something \u2014 even one sentence. I\u2019m listening!");
        }
        break;
      }
      clearStruggle("chat");
      chatHistory.push(t);
      chatRound++;

      if (chatRound >= CHAT_ROUNDS) {
        // Wrap up with pronunciation coaching
        const wrapReply = await withTyping(() => reactLLM(t));
        obi(wrapReply);
        await pause(800);
        obi(`OK ${firstName()}, great chat! Here are some pronunciation tips based on what you said:`);
        await pause(500);
        const tips = buildPronunciationTips();
        for (const tip of tips) {
          await pause(400);
          obi(`\uD83D\uDCA1 ${tip}`);
        }
        await pause(500);
        obi("Practice those sounds OUT LOUD right now! Then type \u2018again\u2019 to chat more, or just start talking!");

        api("/api/netpet/checkin", "POST", {
          studentId: profile.studentId,
          minutes: 5,
          confidence: 6
        }).catch(() => {});

        chatRound = 0;
        chatHistory = [];
        chatMessages = [];
        state = "wrap";
      } else {
        const chatReply = await withTyping(() => reactLLM(t));
        obi(chatReply);
      }
      break;
    }
    case "wrap": {
      const t = text.trim();
      if (isGreeting(t) || /^again$/i.test(t)) {
        obi(`Let\u2019s go again! ${pickStarter()}`);
        state = "chat";
      } else if (t.length >= 2 && !isVague(t)) {
        chatHistory.push(t);
        chatRound = 1;
        state = "chat";
        const wrapChatReply = await withTyping(() => reactLLM(t));
        obi(wrapChatReply);
      } else {
        obi("Type \u2018again\u2019 or just tell me something new!");
      }
      break;
    }
  }
}

// ── Voice input (Web Speech API) ───────────────────────────

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog     = null;
let listening = false;

if (SR) {
  recog = new SR();
  recog.lang = "en-US";
  recog.interimResults = true;
  recog.continuous = false;

  recog.onresult = (e) => {
    input.value = Array.from(e.results).map(r => r[0].transcript).join("");
  };

  recog.onend = () => {
    listening = false;
    micBtn.classList.remove("mic-active");
    input.placeholder = "Type here\u2026";
    const t = input.value.trim();
    if (t) handle(t);
  };

  recog.onerror = () => {
    listening = false;
    micBtn.classList.remove("mic-active");
    input.placeholder = "Type here\u2026";
  };
} else {
  micBtn.style.display = "none";
}

micBtn.addEventListener("click", () => {
  if (!recog || micBtn.disabled) return;
  if (listening) {
    recog.stop();
    return;
  }
  recog.start();
  listening = true;
  micBtn.classList.add("mic-active");
  input.value = "";
  input.placeholder = "Listening\u2026";
});

// ── Form submit ────────────────────────────────────────────

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const t = input.value.trim();
  if (t) handle(t);
});

// ── Boot ───────────────────────────────────────────────────

async function boot() {
  try {
    const h = await api("/api/health");
    dot.classList.toggle("ok", !!h?.ok);
    dot.title = h?.ok ? "Connected" : "Offline";
  } catch {
    dot.title = "Offline";
  }

  let saved = null;
  try { saved = JSON.parse(localStorage.getItem("net_profile") || "null"); } catch {}

  await pause(350);

  if (saved?.studentId && saved?.fullName) {
    profile = saved;
    // Restore conversation memory from server so Obi knows this student
    try {
      const mem = await api(`/api/memory?studentId=${encodeURIComponent(profile.studentId)}`);
      if (mem?.memory?.length) {
        for (const ex of mem.memory.slice(-10)) {
          if (ex?.user) chatMessages.push({ role: "user",      content: ex.user });
          if (ex?.obi)  chatMessages.push({ role: "assistant", content: ex.obi  });
        }
      }
    } catch {}
    obi(`${firstName()}! Welcome back!`);
    await pause(400);
    obi(pickStarter());
    state = "chat";
  } else {
    // Canon opening: "Hi! My name is Obi, your English coach at Natural English Training."
    obi("Hi! My name is Obi, your English coach at Natural English Training.\n\nWhat\u2019s your name?");
    state = "intro";
  }
}

boot();
