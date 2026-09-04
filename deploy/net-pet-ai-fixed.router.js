var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
var init_utils = __esm({
  "node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
  }
});

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_performance2();
    init_performance();
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    if (!("__unenv__" in performance)) {
      const proto = Performance.prototype;
      for (const key of Object.getOwnPropertyNames(proto)) {
        if (key !== "constructor" && !(key in performance)) {
          const desc = Object.getOwnPropertyDescriptor(proto, key);
          if (desc) {
            Object.defineProperty(performance, key, desc);
          }
        }
      }
    }
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// src/phonics-drills.js
var phonics_drills_exports = {};
__export(phonics_drills_exports, {
  NET_PHONICS_GROUPS: () => NET_PHONICS_GROUPS,
  PHONICS_DRILLS: () => PHONICS_DRILLS
});
var NET_PHONICS_GROUPS, PHONICS_DRILLS;
var init_phonics_drills = __esm({
  "src/phonics-drills.js"() {
    init_performance2();
    NET_PHONICS_GROUPS = [
      {
        id: "satnip",
        name: "SATNIP",
        order: 1,
        sounds: ["s", "a", "t", "n", "i", "p"],
        ipa: ["/s/", "/\xE6/", "/t/", "/n/", "/\u026A/", "/p/"],
        description: "Foundation six \u2014 short a, short i, and five high-frequency consonants.",
        viet_notes: '/\xE6/ = wider jaw than Vietnamese "a". /\u026A/ = shorter and tenser than Vietnamese "i".'
      },
      {
        id: "drumble",
        name: "DRUMBLE",
        order: 2,
        sounds: ["d", "r", "u", "m", "b", "l"],
        ipa: ["/d/", "/r/", "/\u028C/", "/m/", "/b/", "/l/"],
        description: "Short u and core consonants. /r/ is new muscle for Vietnamese speakers.",
        viet_notes: "/r/ = curl tongue BACK, touch NOTHING. Not an /l/. /\u028C/ = quick open jaw, like surprise."
      },
      {
        id: "hogfez",
        name: "HOGFEZ",
        order: 3,
        sounds: ["h", "o", "g", "f", "e", "z"],
        ipa: ["/h/", "/\u0252/", "/g/", "/f/", "/e/", "/z/"],
        description: "Short e, short o, and /f/. Two new vowel positions not in Vietnamese.",
        viet_notes: '/e/ (bed) = "eh?" surprise face. /\u0252/ (hot) = quick wide open jaw. /f/ = top teeth on LOWER lip.'
      },
      {
        id: "wyvex",
        name: "WYVEX",
        order: 4,
        sounds: ["w", "v", "j", "k", "y", "x"],
        ipa: ["/w/", "/v/", "/d\u0292/", "/k/", "/j/", "/ks/"],
        description: "Orphan consonants \u2014 all absent or distorted in Vietnamese. W/V confusion lives here.",
        viet_notes: "/w/ = lips ROUND, push forward, NO teeth. /v/ = top teeth on LOWER lip, buzz. Completely different muscles."
      },
      {
        id: "chushang",
        name: "CHUSHANG",
        order: 5,
        sounds: ["ch", "sh", "th_unvoiced", "th_voiced", "ng", "qu"],
        ipa: ["/t\u0283/", "/\u0283/", "/\u03B8/", "/\xF0/", "/\u014B/", "/kw/"],
        description: "Consonant digraphs \u2014 two letters, one sound. Hardest group for Vietnamese speakers.",
        viet_notes: "/\u03B8/ = tongue tip BETWEEN teeth, blow air. NOT /t/ or /s/. /\xF0/ = same position but add voice. /\u014B/ exists in Vietnamese."
      },
      {
        id: "beehive",
        name: "BEEHIVE",
        order: 6,
        sounds: ["ee", "ai", "oa", "ie", "oo_long", "oo_short"],
        ipa: ["/i\u02D0/", "/e\u026A/", "/\u0259\u028A/", "/a\u026A/", "/u\u02D0/", "/\u028A/"],
        description: "Long vowels and vowel digraphs. Vowel LENGTH is new for tonal speakers.",
        viet_notes: "Vietnamese is TONAL \u2014 vowel LENGTH is a new concept. /\u026A/ (sit) vs /i\u02D0/ (seat) = different WORDS."
      },
      {
        id: "oyster",
        name: "OYSTER",
        order: 7,
        sounds: ["or", "ar", "er", "ou", "oi", "ue"],
        ipa: ["/\u0254\u02D0/", "/\u0251\u02D0/", "/\u025C\u02D0/", "/a\u028A/", "/\u0254\u026A/", "/ju\u02D0/"],
        description: "R-controlled vowels and diphthongs. The final frontier of English phonics.",
        viet_notes: "/\u025C\u02D0/ (bird, word, heard) = same vowel, 3 spellings. Lips slightly forward, jaw relaxed."
      }
    ];
    PHONICS_DRILLS = [
      // ── Group 1: SATNIP (s /s/, a /æ/, t /t/, n /n/, i /ɪ/, p /p/) ────────────────
      {
        id: "satnip-01",
        group: "satnip",
        groupName: "SATNIP",
        phonemes: ["s", "\xE6", "t", "n", "\u026A", "p"],
        sounds: ["/s/", "/\xE6/", "/t/", "/n/", "/\u026A/", "/p/"],
        targetErrors: ["vowel_confusion", "final_consonant_deletion"],
        sentence: "She sat next to me at the station.",
        tip: '/\xE6/ (sat): jaw drops MORE than Vietnamese "a". Wide, open. Feel your cheeks spread.'
      },
      {
        id: "satnip-02",
        group: "satnip",
        groupName: "SATNIP",
        phonemes: ["p", "\u026A", "n"],
        sounds: ["/p/", "/\u026A/", "/n/"],
        targetErrors: ["vowel_confusion", "final_consonant_deletion"],
        sentence: "I need to sign in with my PIN number.",
        tip: '/\u026A/ (pin, sign): shorter and tenser than Vietnamese "i". Like a tight quick smile, then stop.'
      },
      {
        id: "satnip-03",
        group: "satnip",
        groupName: "SATNIP",
        phonemes: ["s", "t", "p", "n", "\u026A"],
        sounds: ["/s/", "/t/", "/p/", "/n/", "/\u026A/"],
        targetErrors: ["final_consonant_deletion", "consonant_confusion"],
        sentence: "Stop talking and listen to the instructions.",
        tip: 'Final /p/: English LANDS on it. Do not drop it. "sto_" \u2260 "stop". Touch your lips together at the end.'
      },
      {
        id: "satnip-04",
        group: "satnip",
        groupName: "SATNIP",
        phonemes: ["t", "n", "\xE6", "p", "\u026A"],
        sounds: ["/t/", "/n/", "/\xE6/", "/p/", "/\u026A/"],
        targetErrors: ["final_consonant_deletion", "vowel_confusion"],
        sentence: "The next train departs at ten past nine.",
        tip: "Count the /t/ sounds: TRAIN, DEPARTS, AT, TEN. Each one sharp and clean."
      },
      {
        id: "satnip-05",
        group: "satnip",
        groupName: "SATNIP",
        phonemes: ["p", "r", "\u026A", "n", "t"],
        sounds: ["/p/", "/r/", "/\u026A/", "/n/", "/t/"],
        targetErrors: ["final_consonant_deletion", "cluster_simplification"],
        sentence: "Please print your name in capital letters.",
        tip: 'PRINT: /pr/ cluster \u2014 both sounds with no vowel between them. Not "pa-rint". P+R together.'
      },
      // ── Group 2: DRUMBLE (d /d/, r /r/, u /ʌ/, m /m/, b /b/, l /l/) ────────────────
      {
        id: "drumble-01",
        group: "drumble",
        groupName: "DRUMBLE",
        phonemes: ["d", "r", "\u028C", "m", "b", "l"],
        sounds: ["/d/", "/r/", "/\u028C/", "/m/", "/b/", "/l/"],
        targetErrors: ["r_l_confusion", "vowel_confusion"],
        sentence: "The drummer stumbled but kept playing loudly.",
        tip: "/r/: curl tongue back, touch NOTHING. It floats. Not an /l/. DRUMBLE: /d/+/r/+/\u028C/+/m/+/b/+/l/."
      },
      {
        id: "drumble-02",
        group: "drumble",
        groupName: "DRUMBLE",
        phonemes: ["b", "l", "\u028C", "d", "m"],
        sounds: ["/b/", "/l/", "/\u028C/", "/d/", "/m/"],
        targetErrors: ["final_consonant_deletion", "vowel_confusion"],
        sentence: "Don't be late \u2014 the deadline is today.",
        tip: 'DEADLINE: two /d/ sounds, both clear. Final /d/ in "late" \u2014 land on it. "la_" \u2260 "late".'
      },
      {
        id: "drumble-03",
        group: "drumble",
        groupName: "DRUMBLE",
        phonemes: ["r", "\u028C", "m", "b", "l", "d"],
        sounds: ["/r/", "/\u028C/", "/m/", "/b/", "/l/", "/d/"],
        targetErrors: ["r_l_confusion", "cluster_simplification"],
        sentence: "The rumbling sound came from below the floor.",
        tip: "RUMBLING: /r/+/\u028C/+/m/+/b/+/l/. Five target sounds in one word. /r/ floats, /l/ touches roof."
      },
      {
        id: "drumble-04",
        group: "drumble",
        groupName: "DRUMBLE",
        phonemes: ["d", "r", "\u028C", "b", "m"],
        sounds: ["/d/", "/r/", "/\u028C/", "/b/", "/m/"],
        targetErrors: ["vowel_confusion", "final_consonant_deletion"],
        sentence: "He dropped the drum during the band practice.",
        tip: 'DROPPED: /dr/ cluster \u2014 no vowel between D and R. Not "duh-ropped". Final /d/ must land.'
      },
      {
        id: "drumble-05",
        group: "drumble",
        groupName: "DRUMBLE",
        phonemes: ["m", "\u028C", "l", "b", "d", "r"],
        sounds: ["/m/", "/\u028C/", "/l/", "/b/", "/d/", "/r/"],
        targetErrors: ["r_l_confusion", "vowel_confusion"],
        sentence: "My brother loves building models every day.",
        tip: "BUILDING: /b/+/\u028C/+/l/+/d/. Four target sounds. /l/ touches roof behind teeth. /d/ lands at end."
      },
      // ── Group 3: HOGFEZ (h /h/, o /ɒ/, g /g/, f /f/, e /e/, z /z/) ───────────────
      {
        id: "hogfez-01",
        group: "hogfez",
        groupName: "HOGFEZ",
        phonemes: ["h", "\u0252", "g", "f", "e", "z"],
        sounds: ["/h/", "/\u0252/", "/g/", "/f/", "/e/", "/z/"],
        targetErrors: ["vowel_confusion", "consonant_confusion"],
        sentence: "The hog wore a fez hat at the festival.",
        tip: 'HOG (/\u0252/) = quick wide open jaw. FEZ (/e/) = "eh?" surprise face. Two different vowel shapes.'
      },
      {
        id: "hogfez-02",
        group: "hogfez",
        groupName: "HOGFEZ",
        phonemes: ["f", "\u0252", "g", "h", "e"],
        sounds: ["/f/", "/\u0252/", "/g/", "/h/", "/e/"],
        targetErrors: ["consonant_confusion", "vowel_confusion"],
        sentence: "He forgot his bag at the hotel lobby.",
        tip: "/f/ = top teeth on LOWER lip, air blows through. NOT /ph/. FORGOT: /f/+/\u0252/+/g/. Three targets."
      },
      {
        id: "hogfez-03",
        group: "hogfez",
        groupName: "HOGFEZ",
        phonemes: ["z", "e", "b", "r", "h", "\u0252"],
        sounds: ["/z/", "/e/", "/h/", "/\u0252/"],
        targetErrors: ["consonant_confusion", "vowel_length"],
        sentence: "Zero eggs left \u2014 she went to the shop.",
        tip: '/z/ = voiced /s/. Say /s/ then turn on voice: "ssss \u2192 zzzz". ZERO starts with /z/, not /s/.'
      },
      {
        id: "hogfez-04",
        group: "hogfez",
        groupName: "HOGFEZ",
        phonemes: ["h", "\u0252", "g", "f", "e", "z"],
        sounds: ["/h/", "/\u0252/", "/g/", "/f/", "/e/", "/z/"],
        targetErrors: ["vowel_confusion", "final_consonant_deletion"],
        sentence: "Hot coffee gets cold if you forget the lid.",
        tip: 'HOT (/\u0252/) = quick open jaw. COLD has /\u0259\u028A/ (long). Say both: "hot \u2014 cold". Feel the difference.'
      },
      {
        id: "hogfez-05",
        group: "hogfez",
        groupName: "HOGFEZ",
        phonemes: ["g", "e", "z", "f", "\u0252", "h"],
        sounds: ["/g/", "/e/", "/z/", "/f/", "/\u0252/", "/h/"],
        targetErrors: ["consonant_confusion", "vowel_confusion"],
        sentence: "Get fresh eggs from the fridge before noon.",
        tip: "FRESH: /f/+/r/+/e/. GET: /g/+/e/. Both use /e/ (bed vowel). Mouth half-open, lips slightly spread."
      },
      // ── Group 4: WYVEX (w /w/, v /v/, j /dʒ/, k /k/, y /j/, x /ks/) ──────────────
      {
        id: "wyvex-01",
        group: "wyvex",
        groupName: "WYVEX",
        phonemes: ["w", "v", "j", "k", "y", "ks"],
        sounds: ["/w/", "/v/", "/d\u0292/", "/k/", "/j/", "/ks/"],
        targetErrors: ["v_w_confusion", "consonant_confusion"],
        sentence: "We viewed the yellow kayak near the exit.",
        tip: '/w/ vs /v/: W = lips ROUND, push forward, NO teeth. V = top teeth on LOWER lip, buzz. Practice: "wuh \u2014 vuh".'
      },
      {
        id: "wyvex-02",
        group: "wyvex",
        groupName: "WYVEX",
        phonemes: ["j", "\u0252", "b", "v", "k", "w"],
        sounds: ["/d\u0292/", "/v/", "/k/", "/w/"],
        targetErrors: ["consonant_confusion", "v_w_confusion"],
        sentence: "The job involves working with complex vectors.",
        tip: "/d\u0292/ (job, involves): jaw DROPS forward, like chewing. Not in Vietnamese \u2014 new muscle entirely."
      },
      {
        id: "wyvex-03",
        group: "wyvex",
        groupName: "WYVEX",
        phonemes: ["ks", "j", "w", "v", "k"],
        sounds: ["/ks/", "/j/", "/w/", "/v/", "/k/"],
        targetErrors: ["consonant_confusion"],
        sentence: "Yesterday I saw her exact words written in yellow.",
        tip: `/ks/ (exact, exit): when X sits between vowels it's often /gz/ \u2014 "eGZact". Try both: eKSit / eGZact.`
      },
      {
        id: "wyvex-04",
        group: "wyvex",
        groupName: "WYVEX",
        phonemes: ["v", "j", "w", "k", "y"],
        sounds: ["/v/", "/d\u0292/", "/w/", "/k/", "/j/"],
        targetErrors: ["v_w_confusion", "consonant_confusion"],
        sentence: "I enjoy my view from the office every evening.",
        tip: "VIEW and VERY and EVENING all use /v/ \u2014 top teeth on lower lip. COUNT the /v/ words: view, every, evening."
      },
      {
        id: "wyvex-05",
        group: "wyvex",
        groupName: "WYVEX",
        phonemes: ["w", "k", "j", "v", "ks"],
        sounds: ["/w/", "/k/", "/j/", "/v/", "/ks/"],
        targetErrors: ["v_w_confusion", "cluster_simplification"],
        sentence: "Why would you keep the key in that box?",
        tip: "WHY starts with /w/ (lips round). KEY starts with /k/ (back of throat). BOX ends with /ks/."
      },
      // ── Group 5: CHUSHANG (ch /tʃ/, sh /ʃ/, th /θ/, th /ð/, ng /ŋ/, qu /kw/) ──────
      {
        id: "chushang-01",
        group: "chushang",
        groupName: "CHUSHANG",
        phonemes: ["\u03B8", "\u026A", "\u014B", "k", "\xF0", "\u026A", "s"],
        sounds: ["/\u03B8/", "/\xF0/", "/\u014B/"],
        targetErrors: ["th_substitution", "consonant_confusion"],
        sentence: "I think this is the right thing to do.",
        tip: "THINK (/\u03B8/): tongue tip BETWEEN teeth, blow air out. NOT /tink/ or /sink/. THIS (/\xF0/): same but add voice."
      },
      {
        id: "chushang-02",
        group: "chushang",
        groupName: "CHUSHANG",
        phonemes: ["\u0283", "t\u0283", "e", "k", "\u0283", "e", "d"],
        sounds: ["/t\u0283/", "/\u0283/"],
        targetErrors: ["sh_confusion", "consonant_confusion"],
        sentence: "She should check the schedule before choosing.",
        tip: 'SHOULD (/\u0283/) = smooth air. CHECK (/t\u0283/) = quick burst then air. Switch: "sh \u2014 ch \u2014 sh \u2014 ch".'
      },
      {
        id: "chushang-03",
        group: "chushang",
        groupName: "CHUSHANG",
        phonemes: ["kw", "\u0252", "l", "\u026A", "t", "\u026A", "\u014B"],
        sounds: ["/kw/", "/\u014B/", "/\u0283/"],
        targetErrors: ["consonant_confusion", "cluster_simplification"],
        sentence: "The quality of your English is improving every session.",
        tip: "/kw/ (quality, question): lips round on /k/, then push forward for /w/. Quick linked action."
      },
      {
        id: "chushang-04",
        group: "chushang",
        groupName: "CHUSHANG",
        phonemes: ["\u03B8", "\u026A", "\u014B", "k", "\u03B8", "\u026A", "\u014B", "z", "\xF0"],
        sounds: ["/\u03B8/", "/\xF0/", "/\u014B/"],
        targetErrors: ["th_substitution", "consonant_confusion"],
        sentence: "Think about things differently \u2014 this will strengthen your skills.",
        tip: "STRENGTHEN: /\u03B8/ at start AND end, plus /\u014B/ in middle. Map the path: STRE-NGth. Three digraphs."
      },
      {
        id: "chushang-05",
        group: "chushang",
        groupName: "CHUSHANG",
        phonemes: ["t\u0283", "\u0251\u02D0", "d\u0292", "d", "r", "i\u02D0", "z", "n"],
        sounds: ["/t\u0283/", "/\u0283/", "/\u014B/"],
        targetErrors: ["sh_confusion", "consonant_confusion"],
        sentence: "She charged a reasonable fee for changing the booking.",
        tip: "CHARGE vs CHANGE: both start /t\u0283/. BOOKING ends /\u014B/ \u2014 nose hum. Do not add /g/ after it."
      },
      // ── Group 6: BEEHIVE (ee /iː/, ai /eɪ/, oa /əʊ/, ie /aɪ/, oo-long /uː/, oo-short /ʊ/) ─
      {
        id: "beehive-01",
        group: "beehive",
        groupName: "BEEHIVE",
        phonemes: ["i\u02D0", "d", "r", "i\u02D0", "d", "e\u026A", "m"],
        sounds: ["/i\u02D0/", "/e\u026A/"],
        targetErrors: ["vowel_length", "vowel_confusion"],
        sentence: "She needs to read the email before the meeting.",
        tip: "/i\u02D0/ (needs, read, meeting): lips spread WIDE, long. Hold it. Vietnamese /i/ is too short \u2014 stretch it."
      },
      {
        id: "beehive-02",
        group: "beehive",
        groupName: "BEEHIVE",
        phonemes: ["e\u026A", "n", "r", "\u0259\u028A", "d", "g", "\u0259\u028A", "z"],
        sounds: ["/e\u026A/", "/\u0259\u028A/"],
        targetErrors: ["vowel_confusion", "vowel_length"],
        sentence: "The main road goes straight to the coast.",
        tip: "MAIN and STRAIGHT use /e\u026A/ \u2014 mouth MOVES: /e/ glides to /\u026A/. ROAD and COAST use /\u0259\u028A/ \u2014 lips round as you finish."
      },
      {
        id: "beehive-03",
        group: "beehive",
        groupName: "BEEHIVE",
        phonemes: ["t", "r", "a\u026A", "d", "f", "a\u026A", "n", "d"],
        sounds: ["/a\u026A/"],
        targetErrors: ["vowel_confusion", "vowel_length"],
        sentence: "I tried to find a quiet place to think.",
        tip: "/a\u026A/ (I, tried, find, quiet): jaw DROPS open on /a/ then LIFTS on /\u026A/. Big movement."
      },
      {
        id: "beehive-04",
        group: "beehive",
        groupName: "BEEHIVE",
        phonemes: ["f", "u\u02D0", "d", "f", "l", "a\u026A", "t", "k", "w", "a\u026A", "t", "g", "\u028A", "d"],
        sounds: ["/u\u02D0/", "/\u028A/"],
        targetErrors: ["vowel_length", "vowel_confusion"],
        sentence: "The food on this flight is actually quite good.",
        tip: "FOOD (/u\u02D0/) vs GOOD (/\u028A/): FOOD = lips very round and LONG. GOOD = lips round but SHORT."
      },
      {
        id: "beehive-05",
        group: "beehive",
        groupName: "BEEHIVE",
        phonemes: ["\u0259\u028A", "p", "g", "e", "t", "h", "\u0259\u028A", "m", "\u0283", "\u0259\u028A", "t", "\u028A", "n", "a\u026A", "t"],
        sounds: ["/\u0259\u028A/", "/a\u026A/"],
        targetErrors: ["vowel_confusion", "vowel_length"],
        sentence: "I hope to get home before the show tonight.",
        tip: "HOPE, HOME, SHOW all use /\u0259\u028A/ \u2014 lips ROUND as you finish. TONIGHT uses /a\u026A/ at the end."
      },
      // ── Group 7: OYSTER (or /ɔː/, ar /ɑː/, er /ɜː/, ou /aʊ/, oi /ɔɪ/, ue /juː/) ──
      {
        id: "oyster-01",
        group: "oyster",
        groupName: "OYSTER",
        phonemes: ["\u025C\u02D0", "k", "t", "h", "\u0251\u02D0", "d", "f", "\u0254\u02D0", "m"],
        sounds: ["/\u0254\u02D0/", "/\u0251\u02D0/", "/\u025C\u02D0/"],
        targetErrors: ["vowel_confusion", "r_controlled_vowel"],
        sentence: "I worked hard for more than three years to get here.",
        tip: "WORKED (/\u025C\u02D0/) = HARD (/\u0251\u02D0/) = MORE (/\u0254\u02D0/) \u2014 three different r-controlled vowels. Each mouth shape differs."
      },
      {
        id: "oyster-02",
        group: "oyster",
        groupName: "OYSTER",
        phonemes: ["m", "\u0251\u02D0", "k", "\u026A", "t", "s", "t", "\u0251\u02D0", "t", "s", "\u025C\u02D0", "l", "\u026A"],
        sounds: ["/\u0254\u02D0/", "/\u0251\u02D0/", "/\u025C\u02D0/"],
        targetErrors: ["r_controlled_vowel", "vowel_confusion"],
        sentence: "The market starts early every morning on the corner.",
        tip: "MARKET vs MORNING: AR = /\u0251\u02D0/ open wide jaw. OR = /\u0254\u02D0/ round lips. EARLY = /\u025C\u02D0/ neutral lips."
      },
      {
        id: "oyster-03",
        group: "oyster",
        groupName: "OYSTER",
        phonemes: ["h", "\u025C\u02D0", "d", "w", "\u025C\u02D0", "d", "w", "\u025C\u02D0", "\u03B8", "h", "\u0251\u02D0", "t"],
        sounds: ["/\u025C\u02D0/", "/\u0251\u02D0/"],
        targetErrors: ["r_controlled_vowel", "vowel_confusion"],
        sentence: "I heard the word was worth learning by heart.",
        tip: "HEARD / WORD / WORTH \u2014 three spellings, SAME vowel /\u025C\u02D0/. Trust your ear, not spelling."
      },
      {
        id: "oyster-04",
        group: "oyster",
        groupName: "OYSTER",
        phonemes: ["f", "a\u028A", "n", "d", "a\u028A", "t", "\u0259", "b", "a\u028A", "t", "l", "a\u028A", "d"],
        sounds: ["/a\u028A/"],
        targetErrors: ["vowel_confusion", "diphthong"],
        sentence: "She found out about the loud crowd downtown.",
        tip: "/a\u028A/ (out, loud, crowd): jaw DROPS open on /a/ then CLOSES on /\u028A/. Big jaw drop, big close."
      },
      {
        id: "oyster-05",
        group: "oyster",
        groupName: "OYSTER",
        phonemes: ["\u0254\u026A", "n", "\u0254\u026A", "z", "t\u0283", "\u0254\u026A", "s", "p", "ju\u02D0", "r", "s"],
        sounds: ["/\u0254\u026A/", "/ju\u02D0/"],
        targetErrors: ["vowel_confusion", "diphthong"],
        sentence: "I was annoyed by the noise \u2014 the choice was worth pursuing.",
        tip: "/\u0254\u026A/ (annoyed, noise, choice): lips ROUND then spread. /ju\u02D0/ (pursuing): starts with /j/ then /u\u02D0/."
      }
    ];
  }
});

// src/email-service.js
var email_service_exports = {};
__export(email_service_exports, {
  queueEmail: () => queueEmail,
  sendNotification: () => sendNotification
});
async function _sendViaResend(apiKey, { to, subject, html }) {
  return fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: FROM_ADDR,
      to: Array.isArray(to) ? to : [to],
      subject: String(subject).slice(0, 200),
      html: String(html).slice(0, 10240)
    })
  });
}
function sendNotification(env, ctx, { to, subject, html }) {
  if (!env.RESEND_API_KEY) return { skipped: true };
  ctx.waitUntil(_sendViaResend(env.RESEND_API_KEY, { to, subject, html }).catch(() => {
  }));
  return { queued: true };
}
async function queueEmail(env, { to, subject, html }) {
  if (!env.net_pet_notifications) return { skipped: true };
  await env.net_pet_notifications.send({ type: "email", to, subject, html });
  return { queued: true };
}
var RESEND_URL, FROM_ADDR;
var init_email_service = __esm({
  "src/email-service.js"() {
    init_performance2();
    RESEND_URL = "https://api.resend.com/emails";
    FROM_ADDR = "OBI <noreply@naturalenglishtraining.com>";
    __name(_sendViaResend, "_sendViaResend");
    __name(sendNotification, "sendNotification");
    __name(queueEmail, "queueEmail");
  }
});

// src/seats.js
function employerKey(companyCode) {
  return `${EMPLOYER_PREFIX}${companyCode.toUpperCase().trim()}`;
}
function seatKey(companyCode, studentId) {
  return `${SEAT_PREFIX}${companyCode.toUpperCase().trim()}:${studentId.trim()}`;
}
async function getEmployer(env, companyCode) {
  if (!companyCode) return null;
  const raw2 = await env.NET_PET_KV.get(employerKey(companyCode)).catch(() => null);
  if (!raw2) return null;
  try {
    return JSON.parse(raw2);
  } catch {
    return null;
  }
}
async function createEmployer(env, employer) {
  if (!employer?.companyCode) return null;
  const normalized = {
    ...DEFAULT_EMPLOYER,
    ...employer,
    companyCode: employer.companyCode.toUpperCase().trim(),
    seatLimit: employer.seatLimit || 5,
    assignedSeats: 0,
    activeSeats: 0,
    students: [],
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await env.NET_PET_KV.put(employerKey(normalized.companyCode), JSON.stringify(normalized));
  return normalized;
}
async function updateEmployer(env, companyCode, updates) {
  const existing = await getEmployer(env, companyCode);
  if (!existing) return null;
  const updated = {
    ...existing,
    ...updates,
    companyCode: existing.companyCode,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await env.NET_PET_KV.put(employerKey(companyCode), JSON.stringify(updated));
  return updated;
}
async function assignSeat(env, companyCode, studentId, meta = {}) {
  const employer = await getEmployer(env, companyCode);
  if (!employer) {
    await createEmployer(env, { companyCode, name: meta.name || companyCode, seatLimit: meta.seatLimit || 5 });
  }
  const current = await getEmployer(env, companyCode);
  const assignedCount = current.students?.length || 0;
  if (assignedCount >= current.seatLimit) {
    return { success: false, error: `Seat limit reached (${current.seatLimit})`, employer: current };
  }
  const seatRecord = {
    companyCode: current.companyCode,
    studentId: studentId.trim(),
    plan: meta.plan || current.plan,
    status: "active",
    assignedAt: (/* @__PURE__ */ new Date()).toISOString(),
    expiresAt: meta.expiresAt || new Date(Date.now() + 30 * 864e5).toISOString()
  };
  await env.NET_PET_KV.put(seatKey(current.companyCode, studentId), JSON.stringify(seatRecord));
  const students = [...current.students || [], studentId.trim()];
  const updated = await updateEmployer(env, current.companyCode, {
    students,
    assignedSeats: students.length,
    activeSeats: students.length
  });
  return { success: true, seat: seatRecord, employer: updated };
}
async function removeSeat(env, companyCode, studentId) {
  const employer = await getEmployer(env, companyCode);
  if (!employer) return { success: false, error: "Employer not found" };
  await env.NET_PET_KV.delete(seatKey(companyCode, studentId)).catch(() => {
  });
  const students = (employer.students || []).filter((s2) => s2 !== studentId.trim());
  const updated = await updateEmployer(env, companyCode, {
    students,
    assignedSeats: students.length,
    activeSeats: students.length
  });
  return { success: true, employer: updated };
}
async function getSeat(env, companyCode, studentId) {
  const raw2 = await env.NET_PET_KV.get(seatKey(companyCode, studentId)).catch(() => null);
  if (!raw2) return null;
  try {
    return JSON.parse(raw2);
  } catch {
    return null;
  }
}
async function listEmployerSeats(env, companyCode) {
  const employer = await getEmployer(env, companyCode);
  if (!employer) return [];
  const seats = [];
  for (const sid of employer.students || []) {
    const seat = await getSeat(env, companyCode, sid);
    if (seat) seats.push(seat);
  }
  return seats;
}
async function getEmployerStats(env, companyCode) {
  const employer = await getEmployer(env, companyCode);
  if (!employer) return null;
  const seats = await listEmployerSeats(env, companyCode);
  const activeSeats = seats.filter((s2) => s2.status === "active").length;
  const expiredSeats = seats.filter((s2) => new Date(s2.expiresAt) < /* @__PURE__ */ new Date()).length;
  return {
    ...employer,
    activeSeats,
    expiredSeats,
    utilization: employer.seatLimit > 0 ? Math.round(activeSeats / employer.seatLimit * 100) : 0
  };
}
var EMPLOYER_PREFIX, SEAT_PREFIX, DEFAULT_EMPLOYER;
var init_seats = __esm({
  "src/seats.js"() {
    init_performance2();
    EMPLOYER_PREFIX = "employer:";
    SEAT_PREFIX = "seat:";
    __name(employerKey, "employerKey");
    __name(seatKey, "seatKey");
    DEFAULT_EMPLOYER = {
      companyCode: "",
      name: "",
      plan: "team",
      seatLimit: 5,
      assignedSeats: 0,
      activeSeats: 0,
      students: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    __name(getEmployer, "getEmployer");
    __name(createEmployer, "createEmployer");
    __name(updateEmployer, "updateEmployer");
    __name(assignSeat, "assignSeat");
    __name(removeSeat, "removeSeat");
    __name(getSeat, "getSeat");
    __name(listEmployerSeats, "listEmployerSeats");
    __name(getEmployerStats, "getEmployerStats");
  }
});

// src/invoices.js
var invoices_exports = {};
__export(invoices_exports, {
  createInvoice: () => createInvoice,
  getInvoice: () => getInvoice,
  listInvoices: () => listInvoices,
  updateInvoiceStatus: () => updateInvoiceStatus
});
function invoiceKey(id) {
  return `${INVOICE_PREFIX}${id}`;
}
function generateInvoiceId(orderId) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = orderId.slice(-6).toUpperCase();
  return `INV-${timestamp}-${suffix}`;
}
async function createInvoice(env, order, options = {}) {
  if (!order) return null;
  const invoiceId = generateInvoiceId(order.orderId);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const invoice = {
    invoiceId,
    orderId: order.orderId,
    customer: {
      studentId: order.studentId,
      companyCode: order.companyCode,
      ownerType: order.ownerType,
      ownerId: order.ownerId
    },
    lineItems: order.lineItems || [],
    subtotalVND: order.subtotalVND || 0,
    promo: order.promo || null,
    totalVND: order.totalVND || 0,
    currency: "VND",
    status: options.status || "draft",
    issuedAt: options.issuedAt || now,
    sentAt: null,
    pdfUrl: options.pdfUrl || null,
    meta: options.meta || {},
    createdAt: now,
    updatedAt: now
  };
  await env.NET_PET_KV.put(invoiceKey(invoiceId), JSON.stringify(invoice));
  if (options.sendEmail && env.net_pet_notifications) {
    try {
      const { queueEmail: queueEmail2 } = await Promise.resolve().then(() => (init_email_service(), email_service_exports));
      await queueEmail2(env, {
        type: "invoice",
        to: options.recipientEmail || "",
        subject: `Invoice ${invoiceId} \u2014 Natural English Training`,
        html: generateInvoiceHtml(invoice),
        invoiceId,
        orderId: order.orderId
      });
      invoice.sentAt = now;
      invoice.status = "sent";
      await env.NET_PET_KV.put(invoiceKey(invoiceId), JSON.stringify(invoice));
    } catch (e) {
      console.warn(`[INVOICE] Failed to queue email for ${invoiceId}:`, e.message);
    }
  }
  return invoice;
}
async function getInvoice(env, invoiceId) {
  const raw2 = await env.NET_PET_KV.get(invoiceKey(invoiceId)).catch(() => null);
  if (!raw2) return null;
  try {
    return JSON.parse(raw2);
  } catch {
    return null;
  }
}
async function listInvoices(env, limit = 100) {
  const listed = await env.NET_PET_KV.list({ prefix: INVOICE_PREFIX }).catch(() => ({ keys: [] }));
  const invoices = [];
  for (const k of listed.keys.slice(0, limit)) {
    const raw2 = await env.NET_PET_KV.get(k.name).catch(() => null);
    if (!raw2) continue;
    try {
      invoices.push(JSON.parse(raw2));
    } catch {
    }
  }
  invoices.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  return invoices;
}
async function updateInvoiceStatus(env, invoiceId, status, meta = {}) {
  const existing = await getInvoice(env, invoiceId);
  if (!existing) return null;
  const updated = {
    ...existing,
    status,
    ...meta,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await env.NET_PET_KV.put(invoiceKey(invoiceId), JSON.stringify(updated));
  return updated;
}
function generateInvoiceHtml(invoice) {
  const itemsHtml = (invoice.lineItems || []).map((item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name || item.id}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.qty || 1}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${(item.unitPriceVND || 0).toLocaleString("vi-VN")} VND</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${(item.totalVND || 0).toLocaleString("vi-VN")} VND</td>
    </tr>
  `).join("");
  const promoHtml = invoice.promo?.applied ? `
    <tr>
      <td colspan="3" style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; color: #22c55e;">Discount (${invoice.promo.code || invoice.promo.promoCode || "PROMO"})</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; color: #22c55e;">-${(invoice.promo.discountVND || 0).toLocaleString("vi-VN")} VND</td>
    </tr>
  ` : "";
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><title>Invoice ${invoice.invoiceId}</title></head>
    <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #1a1a1a;">Natural English Training</h1>
      <h2 style="color: #666;">Invoice ${invoice.invoiceId}</h2>
      <p><strong>Order:</strong> ${invoice.orderId}</p>
      <p><strong>Date:</strong> ${new Date(invoice.issuedAt).toLocaleDateString("vi-VN")}</p>
      <p><strong>Customer:</strong> ${invoice.customer?.studentId || invoice.customer?.companyCode || "N/A"}</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 8px; border-bottom: 2px solid #ddd; text-align: left;">Item</th>
            <th style="padding: 8px; border-bottom: 2px solid #ddd; text-align: center;">Qty</th>
            <th style="padding: 8px; border-bottom: 2px solid #ddd; text-align: right;">Unit Price</th>
            <th style="padding: 8px; border-bottom: 2px solid #ddd; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          ${promoHtml}
          <tr style="font-weight: bold; background: #f9f9f9;">
            <td colspan="3" style="padding: 12px 8px; text-align: right;">Total</td>
            <td style="padding: 12px 8px; text-align: right;">${(invoice.totalVND || 0).toLocaleString("vi-VN")} VND</td>
          </tr>
        </tbody>
      </table>
      
      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        This is a system-generated invoice. For questions, contact support@naturalenglishtraining.com.
      </p>
    </body>
    </html>
  `;
}
var INVOICE_PREFIX;
var init_invoices = __esm({
  "src/invoices.js"() {
    init_performance2();
    INVOICE_PREFIX = "inv:";
    __name(invoiceKey, "invoiceKey");
    __name(generateInvoiceId, "generateInvoiceId");
    __name(createInvoice, "createInvoice");
    __name(getInvoice, "getInvoice");
    __name(listInvoices, "listInvoices");
    __name(updateInvoiceStatus, "updateInvoiceStatus");
    __name(generateInvoiceHtml, "generateInvoiceHtml");
  }
});

// src/orders.js
var orders_exports = {};
__export(orders_exports, {
  createOrder: () => createOrder,
  getAccess: () => getAccess,
  getOrder: () => getOrder,
  grantAccess: () => grantAccess,
  listActiveAccess: () => listActiveAccess,
  listOrders: () => listOrders,
  revokeAccess: () => revokeAccess,
  updateOrderStatus: () => updateOrderStatus
});
function orderKey(id) {
  return `order:${id}`;
}
function accessKey(studentId) {
  return `access:${studentId}`;
}
function generateOrderId() {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
function generateDeterministicOrderId(ownerType, ownerId, lineItems, totalVND) {
  const itemsHash = Array.isArray(lineItems) ? lineItems.map((i) => `${i.type}:${i.id}:${i.qty}`).join("|") : "";
  const raw2 = `${ownerType}:${ownerId}:${itemsHash}:${totalVND}`;
  let hash = 0;
  for (let i = 0; i < raw2.length; i++) {
    const char = raw2.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, "0");
  return `ORD-DET-${Date.now().toString(36).toUpperCase()}-${hex}`;
}
async function createOrder(env, { ownerType, ownerId, studentId, companyCode, lineItems, subtotalVND, totalVND, promo, source, idempotencyKey }) {
  let existingOrderId = null;
  if (idempotencyKey) {
    const idempKey = `idempotency:order:${idempotencyKey}`;
    const existingIdemp = await env.NET_PET_KV.get(idempKey).catch(() => null);
    if (existingIdemp) {
      const existingOrder = await getOrder(env, existingIdemp);
      if (existingOrder) return existingOrder;
    }
  }
  const detOrderId = generateDeterministicOrderId(ownerType, ownerId, lineItems, totalVND);
  const detKey = orderKey(detOrderId);
  const existingDet = await env.NET_PET_KV.get(detKey).catch(() => null);
  if (existingDet) {
    try {
      return JSON.parse(existingDet);
    } catch {
    }
  }
  const orderId = idempotencyKey ? detOrderId : generateOrderId();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const order = {
    orderId,
    ownerType: ownerType || "student",
    ownerId: ownerId || studentId || companyCode,
    studentId: studentId || null,
    companyCode: companyCode || null,
    lineItems: Array.isArray(lineItems) ? lineItems : [],
    subtotalVND: Number(subtotalVND || 0),
    promo: promo || null,
    totalVND: Number(totalVND || 0),
    status: "pending",
    source: source || "manual",
    createdAt: now,
    updatedAt: now
  };
  await env.NET_PET_KV.put(orderKey(orderId), JSON.stringify(order));
  const idxRaw = await env.NET_PET_KV.get(ORDER_INDEX_KEY).catch(() => null);
  const idx = idxRaw ? JSON.parse(idxRaw) : [];
  if (!idx.includes(orderId)) {
    idx.push(orderId);
    await env.NET_PET_KV.put(ORDER_INDEX_KEY, JSON.stringify(idx.slice(-2e3)));
  }
  if (idempotencyKey) {
    await env.NET_PET_KV.put(`idempotency:order:${idempotencyKey}`, orderId, { expirationTtl: 86400 * 7 });
  }
  if (ownerType === "employer" && companyCode && lineItems) {
    const planItems = lineItems.filter((i) => i.type === "plan");
    const studentIds = [studentId].filter(Boolean);
    if (studentIds.length === 0 && planItems.length > 0) {
    }
    for (const sid of studentIds) {
      await assignSeat(env, companyCode, sid, { plan: planItems[0]?.id || order.companyCode, expiresAt: new Date(Date.now() + 30 * 864e5).toISOString() });
    }
  }
  try {
    const { createInvoice: createInvoice2 } = await Promise.resolve().then(() => (init_invoices(), invoices_exports));
    await createInvoice2(env, order, { status: "pending", sendEmail: false });
  } catch (e) {
    console.warn(`[ORDER] Failed to create invoice for ${order.orderId}:`, e.message);
  }
  return order;
}
async function getOrder(env, orderId) {
  const raw2 = await env.NET_PET_KV.get(orderKey(orderId)).catch(() => null);
  if (!raw2) return null;
  try {
    return JSON.parse(raw2);
  } catch {
    return null;
  }
}
async function updateOrderStatus(env, orderId, status, meta = {}) {
  const raw2 = await env.NET_PET_KV.get(orderKey(orderId)).catch(() => null);
  if (!raw2) return null;
  const order = JSON.parse(raw2);
  order.status = status;
  order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  Object.assign(order, meta);
  await env.NET_PET_KV.put(orderKey(orderId), JSON.stringify(order));
  return order;
}
async function listOrders(env, limit = 100) {
  const idxRaw = await env.NET_PET_KV.get(ORDER_INDEX_KEY).catch(() => null);
  const idx = idxRaw ? JSON.parse(idxRaw) : [];
  const slice = idx.slice(-limit);
  const orders = await Promise.all(slice.map((id) => getOrder(env, id)));
  return orders.filter(Boolean);
}
async function grantAccess(env, { studentId, plan, paidUntil, orderId, txnId, source }) {
  const key = accessKey(studentId);
  const raw2 = await env.NET_PET_KV.get(key).catch(() => null);
  const current = raw2 ? JSON.parse(raw2) : {};
  const record = {
    studentId,
    plan: plan || current.plan || "none",
    status: "active",
    paidUntil: paidUntil || new Date(Date.now() + 30 * 864e5).toISOString(),
    orderId: orderId || current.orderId || null,
    txnId: txnId || current.txnId || null,
    source: source || current.source || "manual",
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await env.NET_PET_KV.put(key, JSON.stringify(record));
  return record;
}
async function getAccess(env, studentId) {
  const raw2 = await env.NET_PET_KV.get(accessKey(studentId)).catch(() => null);
  if (!raw2) return { studentId, plan: "none", status: "no_access" };
  try {
    return JSON.parse(raw2);
  } catch {
    return { studentId, plan: "none", status: "no_access" };
  }
}
async function revokeAccess(env, studentId) {
  const record = { studentId, plan: "none", status: "revoked", updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  await env.NET_PET_KV.put(accessKey(studentId), JSON.stringify(record));
  return record;
}
async function listActiveAccess(env, limit = 500) {
  const listed = await env.NET_PET_KV.list({ prefix: "access:" }).catch(() => ({ keys: [], list_complete: true }));
  const out = [];
  for (const k of listed.keys.slice(0, limit)) {
    const raw2 = await env.NET_PET_KV.get(k.name).catch(() => null);
    if (!raw2) continue;
    try {
      const row = JSON.parse(raw2);
      if (row.status === "active" && row.paidUntil && new Date(row.paidUntil) > /* @__PURE__ */ new Date()) out.push(row);
    } catch {
    }
  }
  out.sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
  return out;
}
var ORDER_INDEX_KEY;
var init_orders = __esm({
  "src/orders.js"() {
    init_performance2();
    init_seats();
    ORDER_INDEX_KEY = "orders:index";
    __name(orderKey, "orderKey");
    __name(accessKey, "accessKey");
    __name(generateOrderId, "generateOrderId");
    __name(generateDeterministicOrderId, "generateDeterministicOrderId");
    __name(createOrder, "createOrder");
    __name(getOrder, "getOrder");
    __name(updateOrderStatus, "updateOrderStatus");
    __name(listOrders, "listOrders");
    __name(grantAccess, "grantAccess");
    __name(getAccess, "getAccess");
    __name(revokeAccess, "revokeAccess");
    __name(listActiveAccess, "listActiveAccess");
  }
});

// src/promos.js
function promoKey(code) {
  return `${PROMO_PREFIX}${code.toUpperCase().trim()}`;
}
async function getPromos(env) {
  const listed = await env.NET_PET_KV.list({ prefix: PROMO_PREFIX }).catch(() => ({ keys: [], list_complete: true }));
  const promos = [];
  for (const k of listed.keys) {
    const raw2 = await env.NET_PET_KV.get(k.name).catch(() => null);
    if (!raw2) continue;
    try {
      promos.push(JSON.parse(raw2));
    } catch {
    }
  }
  if (promos.length === 0) {
    await seedDefaultPromos(env);
    return DEFAULT_PROMOS.slice();
  }
  return promos;
}
async function getPromoByCode(env, code) {
  if (!code) return null;
  const raw2 = await env.NET_PET_KV.get(promoKey(code)).catch(() => null);
  if (!raw2) return null;
  try {
    return JSON.parse(raw2);
  } catch {
    return null;
  }
}
async function createPromo(env, promo) {
  if (!promo?.code) return null;
  const normalized = {
    ...promo,
    code: promo.code.toUpperCase().trim(),
    usedCount: 0,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await env.NET_PET_KV.put(promoKey(normalized.code), JSON.stringify(normalized));
  return normalized;
}
async function updatePromo(env, code, updates) {
  const existing = await getPromoByCode(env, code);
  if (!existing) return null;
  const updated = { ...existing, ...updates, code: existing.code, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  await env.NET_PET_KV.put(promoKey(code), JSON.stringify(updated));
  return updated;
}
async function deletePromo(env, code) {
  await env.NET_PET_KV.delete(promoKey(code)).catch(() => {
  });
}
async function seedDefaultPromos(env) {
  for (const promo of DEFAULT_PROMOS) {
    await env.NET_PET_KV.put(promoKey(promo.code), JSON.stringify(promo));
  }
}
var PROMO_PREFIX, DEFAULT_PROMOS;
var init_promos = __esm({
  "src/promos.js"() {
    init_performance2();
    PROMO_PREFIX = "promo:";
    __name(promoKey, "promoKey");
    DEFAULT_PROMOS = [
      {
        code: "LAUNCH10",
        type: "percentage",
        value: 10,
        currency: "VND",
        minAmountVND: 0,
        maxDiscountVND: 5e5,
        planIds: ["net", "team"],
        addonIds: [],
        usageLimit: 1e3,
        usedCount: 0,
        startsAt: "2026-01-01T00:00:00Z",
        expiresAt: "2027-01-01T00:00:00Z",
        active: true
      },
      {
        code: "TEAM50K",
        type: "fixed",
        value: 5e4,
        currency: "VND",
        minAmountVND: 1e6,
        maxDiscountVND: 5e4,
        planIds: ["team"],
        addonIds: [],
        usageLimit: 500,
        usedCount: 0,
        startsAt: "2026-01-01T00:00:00Z",
        expiresAt: "2027-01-01T00:00:00Z",
        active: true
      }
    ];
    __name(getPromos, "getPromos");
    __name(getPromoByCode, "getPromoByCode");
    __name(createPromo, "createPromo");
    __name(updatePromo, "updatePromo");
    __name(deletePromo, "deletePromo");
    __name(seedDefaultPromos, "seedDefaultPromos");
  }
});

// node_modules/@clerk/shared/dist/runtime/runtimeEnvironment-D1yr0yUs.mjs
var isTestEnvironment, isProductionEnvironment;
var init_runtimeEnvironment_D1yr0yUs = __esm({
  "node_modules/@clerk/shared/dist/runtime/runtimeEnvironment-D1yr0yUs.mjs"() {
    init_performance2();
    isTestEnvironment = /* @__PURE__ */ __name(() => {
      try {
        return false;
      } catch {
      }
      return false;
    }, "isTestEnvironment");
    isProductionEnvironment = /* @__PURE__ */ __name(() => {
      try {
        return true;
      } catch {
      }
      return false;
    }, "isProductionEnvironment");
  }
});

// node_modules/@clerk/shared/dist/runtime/deprecated--jK9xTNh.mjs
var displayedWarnings, deprecated;
var init_deprecated_jK9xTNh = __esm({
  "node_modules/@clerk/shared/dist/runtime/deprecated--jK9xTNh.mjs"() {
    init_performance2();
    init_runtimeEnvironment_D1yr0yUs();
    displayedWarnings = /* @__PURE__ */ new Set();
    deprecated = /* @__PURE__ */ __name((fnName, warning, key) => {
      const hideWarning = isTestEnvironment() || isProductionEnvironment();
      const messageId = key ?? fnName;
      if (displayedWarnings.has(messageId) || hideWarning) return;
      displayedWarnings.add(messageId);
      console.warn(`Clerk - DEPRECATION WARNING: "${fnName}" is deprecated and will be removed in the next major release.
${warning}`);
    }, "deprecated");
  }
});

// node_modules/@clerk/shared/dist/runtime/deprecated.mjs
var init_deprecated = __esm({
  "node_modules/@clerk/shared/dist/runtime/deprecated.mjs"() {
    init_performance2();
    init_runtimeEnvironment_D1yr0yUs();
    init_deprecated_jK9xTNh();
  }
});

// node_modules/@clerk/shared/dist/runtime/constants-Bta24VLk.mjs
var LEGACY_DEV_INSTANCE_SUFFIXES, CURRENT_DEV_INSTANCE_SUFFIXES, DEV_OR_STAGING_SUFFIXES;
var init_constants_Bta24VLk = __esm({
  "node_modules/@clerk/shared/dist/runtime/constants-Bta24VLk.mjs"() {
    init_performance2();
    LEGACY_DEV_INSTANCE_SUFFIXES = [
      ".lcl.dev",
      ".lclstage.dev",
      ".lclclerk.com"
    ];
    CURRENT_DEV_INSTANCE_SUFFIXES = [
      ".accounts.dev",
      ".accountsstage.dev",
      ".accounts.lclclerk.com"
    ];
    DEV_OR_STAGING_SUFFIXES = [
      ".lcl.dev",
      ".stg.dev",
      ".lclstage.dev",
      ".stgstage.dev",
      ".dev.lclclerk.com",
      ".stg.lclclerk.com",
      ".accounts.lclclerk.com",
      "accountsstage.dev",
      "accounts.dev"
    ];
  }
});

// node_modules/@clerk/shared/dist/runtime/isomorphicAtob-CoF80qYz.mjs
var isomorphicAtob;
var init_isomorphicAtob_CoF80qYz = __esm({
  "node_modules/@clerk/shared/dist/runtime/isomorphicAtob-CoF80qYz.mjs"() {
    init_performance2();
    isomorphicAtob = /* @__PURE__ */ __name((data) => {
      if (typeof atob !== "undefined" && typeof atob === "function") return atob(data);
      else if (typeof globalThis.Buffer !== "undefined") return globalThis.Buffer.from(data, "base64").toString();
      return data;
    }, "isomorphicAtob");
  }
});

// node_modules/@clerk/shared/dist/runtime/isomorphicBtoa-DWmLcIHi.mjs
var isomorphicBtoa;
var init_isomorphicBtoa_DWmLcIHi = __esm({
  "node_modules/@clerk/shared/dist/runtime/isomorphicBtoa-DWmLcIHi.mjs"() {
    init_performance2();
    isomorphicBtoa = /* @__PURE__ */ __name((data) => {
      if (typeof btoa !== "undefined" && typeof btoa === "function") return btoa(data);
      else if (typeof globalThis.Buffer !== "undefined") return globalThis.Buffer.from(data).toString("base64");
      return data;
    }, "isomorphicBtoa");
  }
});

// node_modules/@clerk/shared/dist/runtime/keys-ChIG_Ewf.mjs
function isValidDecodedPublishableKey(decoded) {
  if (!decoded.endsWith("$")) return false;
  const withoutTrailing = decoded.slice(0, -1);
  if (withoutTrailing.includes("$")) return false;
  return withoutTrailing.includes(".");
}
function parsePublishableKey(key, options = {}) {
  key = key || "";
  if (!key || !isPublishableKey(key)) {
    if (options.fatal && !key) throw new Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");
    if (options.fatal && !isPublishableKey(key)) throw new Error("Publishable key not valid.");
    return null;
  }
  const instanceType = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) ? "production" : "development";
  let decodedFrontendApi;
  try {
    decodedFrontendApi = isomorphicAtob(key.split("_")[2]);
  } catch {
    if (options.fatal) throw new Error("Publishable key not valid: Failed to decode key.");
    return null;
  }
  if (!isValidDecodedPublishableKey(decodedFrontendApi)) {
    if (options.fatal) throw new Error("Publishable key not valid: Decoded key has invalid format.");
    return null;
  }
  let frontendApi = decodedFrontendApi.slice(0, -1);
  if (options.proxyUrl) frontendApi = options.proxyUrl;
  else if (instanceType !== "development" && options.domain && options.isSatellite) frontendApi = `clerk.${options.domain}`;
  return {
    instanceType,
    frontendApi
  };
}
function isPublishableKey(key = "") {
  try {
    if (!(key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) || key.startsWith(PUBLISHABLE_KEY_TEST_PREFIX))) return false;
    const parts = key.split("_");
    if (parts.length !== 3) return false;
    const encodedPart = parts[2];
    if (!encodedPart) return false;
    return isValidDecodedPublishableKey(isomorphicAtob(encodedPart));
  } catch {
    return false;
  }
}
function createDevOrStagingUrlCache() {
  const devOrStagingUrlCache = /* @__PURE__ */ new Map();
  return { isDevOrStagingUrl: /* @__PURE__ */ __name((url) => {
    if (!url) return false;
    const hostname = typeof url === "string" ? url : url.hostname;
    let res = devOrStagingUrlCache.get(hostname);
    if (res === void 0) {
      res = DEV_OR_STAGING_SUFFIXES.some((s2) => hostname.endsWith(s2));
      devOrStagingUrlCache.set(hostname, res);
    }
    return res;
  }, "isDevOrStagingUrl") };
}
function isProductionFromPublishableKey(apiKey) {
  return apiKey.startsWith("live_") || apiKey.startsWith("pk_live_");
}
function isDevelopmentFromSecretKey(apiKey) {
  return apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
}
async function getCookieSuffix(publishableKey, subtle = globalThis.crypto.subtle) {
  const data = new TextEncoder().encode(publishableKey);
  const digest = await subtle.digest("sha-1", data);
  return isomorphicBtoa(String.fromCharCode(...new Uint8Array(digest))).replace(/\+/gi, "-").replace(/\//gi, "_").substring(0, 8);
}
var PUBLISHABLE_KEY_LIVE_PREFIX, PUBLISHABLE_KEY_TEST_PREFIX, getSuffixedCookieName;
var init_keys_ChIG_Ewf = __esm({
  "node_modules/@clerk/shared/dist/runtime/keys-ChIG_Ewf.mjs"() {
    init_performance2();
    init_constants_Bta24VLk();
    init_isomorphicAtob_CoF80qYz();
    init_isomorphicBtoa_DWmLcIHi();
    PUBLISHABLE_KEY_LIVE_PREFIX = "pk_live_";
    PUBLISHABLE_KEY_TEST_PREFIX = "pk_test_";
    __name(isValidDecodedPublishableKey, "isValidDecodedPublishableKey");
    __name(parsePublishableKey, "parsePublishableKey");
    __name(isPublishableKey, "isPublishableKey");
    __name(createDevOrStagingUrlCache, "createDevOrStagingUrlCache");
    __name(isProductionFromPublishableKey, "isProductionFromPublishableKey");
    __name(isDevelopmentFromSecretKey, "isDevelopmentFromSecretKey");
    __name(getCookieSuffix, "getCookieSuffix");
    getSuffixedCookieName = /* @__PURE__ */ __name((cookieName, cookieSuffix) => {
      return `${cookieName}_${cookieSuffix}`;
    }, "getSuffixedCookieName");
  }
});

// node_modules/@clerk/shared/dist/runtime/keys.mjs
var init_keys = __esm({
  "node_modules/@clerk/shared/dist/runtime/keys.mjs"() {
    init_performance2();
    init_constants_Bta24VLk();
    init_isomorphicAtob_CoF80qYz();
    init_isomorphicBtoa_DWmLcIHi();
    init_keys_ChIG_Ewf();
  }
});

// node_modules/@clerk/shared/dist/runtime/retry-DqRIhHV5.mjs
var defaultOptions, RETRY_IMMEDIATELY_DELAY, sleep, applyJitter, createExponentialDelayAsyncFn, retry;
var init_retry_DqRIhHV5 = __esm({
  "node_modules/@clerk/shared/dist/runtime/retry-DqRIhHV5.mjs"() {
    init_performance2();
    defaultOptions = {
      initialDelay: 125,
      maxDelayBetweenRetries: 0,
      factor: 2,
      shouldRetry: /* @__PURE__ */ __name((_2, iteration) => iteration < 5, "shouldRetry"),
      retryImmediately: false,
      jitter: true
    };
    RETRY_IMMEDIATELY_DELAY = 100;
    sleep = /* @__PURE__ */ __name(async (ms) => new Promise((s2) => setTimeout(s2, ms)), "sleep");
    applyJitter = /* @__PURE__ */ __name((delay, jitter) => {
      return jitter ? delay * (1 + Math.random()) : delay;
    }, "applyJitter");
    createExponentialDelayAsyncFn = /* @__PURE__ */ __name((opts) => {
      let timesCalled = 0;
      const calculateDelayInMs = /* @__PURE__ */ __name(() => {
        const constant = opts.initialDelay;
        const base = opts.factor;
        let delay = constant * Math.pow(base, timesCalled);
        delay = applyJitter(delay, opts.jitter);
        return Math.min(opts.maxDelayBetweenRetries || delay, delay);
      }, "calculateDelayInMs");
      return async () => {
        await sleep(calculateDelayInMs());
        timesCalled++;
      };
    }, "createExponentialDelayAsyncFn");
    retry = /* @__PURE__ */ __name(async (callback, options = {}) => {
      let iterations = 0;
      const { shouldRetry, initialDelay, maxDelayBetweenRetries, factor, retryImmediately, jitter, onBeforeRetry } = {
        ...defaultOptions,
        ...options
      };
      const delay = createExponentialDelayAsyncFn({
        initialDelay,
        maxDelayBetweenRetries,
        factor,
        jitter
      });
      while (true) try {
        return await callback();
      } catch (e) {
        iterations++;
        if (!shouldRetry(e, iterations)) throw e;
        if (onBeforeRetry) await onBeforeRetry(iterations);
        if (retryImmediately && iterations === 1) await sleep(applyJitter(RETRY_IMMEDIATELY_DELAY, jitter));
        else await delay();
      }
    }, "retry");
  }
});

// node_modules/@clerk/shared/dist/runtime/retry.mjs
var init_retry = __esm({
  "node_modules/@clerk/shared/dist/runtime/retry.mjs"() {
    init_performance2();
    init_retry_DqRIhHV5();
  }
});

// node_modules/@clerk/shared/dist/runtime/instance-BmZr0cdE.mjs
var init_instance_BmZr0cdE = __esm({
  "node_modules/@clerk/shared/dist/runtime/instance-BmZr0cdE.mjs"() {
    init_performance2();
  }
});

// node_modules/@clerk/shared/dist/runtime/url-C6gPMFx5.mjs
function isLegacyDevAccountPortalOrigin(host) {
  return LEGACY_DEV_INSTANCE_SUFFIXES.some((legacyDevSuffix) => {
    return host.startsWith("accounts.") && host.endsWith(legacyDevSuffix);
  });
}
function isCurrentDevAccountPortalOrigin(host) {
  return CURRENT_DEV_INSTANCE_SUFFIXES.some((currentDevSuffix) => {
    return host.endsWith(currentDevSuffix) && !host.endsWith(".clerk" + currentDevSuffix);
  });
}
var init_url_C6gPMFx5 = __esm({
  "node_modules/@clerk/shared/dist/runtime/url-C6gPMFx5.mjs"() {
    init_performance2();
    init_constants_Bta24VLk();
    init_instance_BmZr0cdE();
    __name(isLegacyDevAccountPortalOrigin, "isLegacyDevAccountPortalOrigin");
    __name(isCurrentDevAccountPortalOrigin, "isCurrentDevAccountPortalOrigin");
  }
});

// node_modules/@clerk/shared/dist/runtime/url.mjs
var init_url = __esm({
  "node_modules/@clerk/shared/dist/runtime/url.mjs"() {
    init_performance2();
    init_constants_Bta24VLk();
    init_instance_BmZr0cdE();
    init_url_C6gPMFx5();
  }
});

// node_modules/@clerk/shared/dist/runtime/clerkRuntimeError-DqAmLuLY.mjs
function createErrorTypeGuard(ErrorClass) {
  function typeGuard(error) {
    const target = error ?? this;
    if (!target) throw new TypeError(`${ErrorClass.kind || ErrorClass.name} type guard requires an error object`);
    if (ErrorClass.kind && typeof target === "object" && target !== null && "constructor" in target) {
      if (target.constructor?.kind === ErrorClass.kind) return true;
    }
    return target instanceof ErrorClass;
  }
  __name(typeGuard, "typeGuard");
  return typeGuard;
}
var ClerkError, ClerkRuntimeError, isClerkRuntimeError;
var init_clerkRuntimeError_DqAmLuLY = __esm({
  "node_modules/@clerk/shared/dist/runtime/clerkRuntimeError-DqAmLuLY.mjs"() {
    init_performance2();
    __name(createErrorTypeGuard, "createErrorTypeGuard");
    ClerkError = class ClerkError2 extends Error {
      static {
        __name(this, "ClerkError");
      }
      static kind = "ClerkError";
      clerkError = true;
      code;
      longMessage;
      docsUrl;
      cause;
      get name() {
        return this.constructor.name;
      }
      constructor(opts) {
        super(new.target.formatMessage(new.target.kind, opts.message, opts.code, opts.docsUrl), { cause: opts.cause });
        Object.setPrototypeOf(this, ClerkError2.prototype);
        this.code = opts.code;
        this.docsUrl = opts.docsUrl;
        this.longMessage = opts.longMessage;
        this.cause = opts.cause;
      }
      toString() {
        return `[${this.name}]
Message:${this.message}`;
      }
      static formatMessage(name, msg, code, docsUrl) {
        const prefix = "Clerk:";
        const regex = new RegExp(prefix.replace(" ", "\\s*"), "i");
        msg = msg.replace(regex, "");
        msg = `${prefix} ${msg.trim()}

(code="${code}")

`;
        if (docsUrl) msg += `

Docs: ${docsUrl}`;
        return msg;
      }
    };
    ClerkRuntimeError = class ClerkRuntimeError2 extends ClerkError {
      static {
        __name(this, "ClerkRuntimeError");
      }
      static kind = "ClerkRuntimeError";
      /**
      * @deprecated Use `clerkError` property instead. This property is maintained for backward compatibility.
      */
      clerkRuntimeError = true;
      constructor(message, options) {
        super({
          ...options,
          message
        });
        Object.setPrototypeOf(this, ClerkRuntimeError2.prototype);
      }
    };
    isClerkRuntimeError = createErrorTypeGuard(ClerkRuntimeError);
  }
});

// node_modules/@clerk/shared/dist/runtime/error-BwjsVTI1.mjs
function parseError(error) {
  return new ClerkAPIError(error);
}
function buildErrorThrower({ packageName, customMessages }) {
  let pkg = packageName;
  function buildMessage(rawMessage, replacements) {
    if (!replacements) return `${pkg}: ${rawMessage}`;
    let msg = rawMessage;
    const matches2 = rawMessage.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);
    for (const match3 of matches2) {
      const replacement = (replacements[match3[1]] || "").toString();
      msg = msg.replace(`{{${match3[1]}}}`, replacement);
    }
    return `${pkg}: ${msg}`;
  }
  __name(buildMessage, "buildMessage");
  const messages = {
    ...DefaultMessages,
    ...customMessages
  };
  return {
    setPackageName({ packageName: packageName$1 }) {
      if (typeof packageName$1 === "string") pkg = packageName$1;
      return this;
    },
    setMessages({ customMessages: customMessages$1 }) {
      Object.assign(messages, customMessages$1 || {});
      return this;
    },
    throwInvalidPublishableKeyError(params) {
      throw new Error(buildMessage(messages.InvalidPublishableKeyErrorMessage, params));
    },
    throwInvalidProxyUrl(params) {
      throw new Error(buildMessage(messages.InvalidProxyUrlErrorMessage, params));
    },
    throwMissingPublishableKeyError() {
      throw new Error(buildMessage(messages.MissingPublishableKeyErrorMessage));
    },
    throwMissingSecretKeyError() {
      throw new Error(buildMessage(messages.MissingSecretKeyErrorMessage));
    },
    throwMissingClerkProviderError(params) {
      throw new Error(buildMessage(messages.MissingClerkProvider, params));
    },
    throw(message) {
      throw new Error(buildMessage(message));
    }
  };
}
var ClerkAPIError, isClerkAPIError, ClerkAPIResponseError, isClerkAPIResponseError, DefaultMessages;
var init_error_BwjsVTI1 = __esm({
  "node_modules/@clerk/shared/dist/runtime/error-BwjsVTI1.mjs"() {
    init_performance2();
    init_clerkRuntimeError_DqAmLuLY();
    ClerkAPIError = class {
      static {
        __name(this, "ClerkAPIError");
      }
      static kind = "ClerkAPIError";
      code;
      message;
      longMessage;
      meta;
      constructor(json2) {
        const parsedError = {
          code: json2.code,
          message: json2.message,
          longMessage: json2.long_message,
          meta: {
            paramName: json2.meta?.param_name,
            sessionId: json2.meta?.session_id,
            emailAddresses: json2.meta?.email_addresses,
            identifiers: json2.meta?.identifiers,
            zxcvbn: json2.meta?.zxcvbn,
            plan: json2.meta?.plan,
            isPlanUpgradePossible: json2.meta?.is_plan_upgrade_possible
          }
        };
        this.code = parsedError.code;
        this.message = parsedError.message;
        this.longMessage = parsedError.longMessage;
        this.meta = parsedError.meta;
      }
    };
    isClerkAPIError = createErrorTypeGuard(ClerkAPIError);
    __name(parseError, "parseError");
    ClerkAPIResponseError = class ClerkAPIResponseError2 extends ClerkError {
      static {
        __name(this, "ClerkAPIResponseError");
      }
      static kind = "ClerkAPIResponseError";
      status;
      clerkTraceId;
      retryAfter;
      errors;
      constructor(message, options) {
        const { data: errorsJson, status, clerkTraceId, retryAfter } = options;
        super({
          ...options,
          message,
          code: "api_response_error"
        });
        Object.setPrototypeOf(this, ClerkAPIResponseError2.prototype);
        this.status = status;
        this.clerkTraceId = clerkTraceId;
        this.retryAfter = retryAfter;
        this.errors = (errorsJson || []).map((e) => new ClerkAPIError(e));
      }
      toString() {
        let message = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map((e) => JSON.stringify(e))}`;
        if (this.clerkTraceId) message += `
Clerk Trace ID: ${this.clerkTraceId}`;
        return message;
      }
      static formatMessage(name, msg, _2, __) {
        return msg;
      }
    };
    isClerkAPIResponseError = createErrorTypeGuard(ClerkAPIResponseError);
    DefaultMessages = Object.freeze({
      InvalidProxyUrlErrorMessage: `The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})`,
      InvalidPublishableKeyErrorMessage: `The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})`,
      MissingPublishableKeyErrorMessage: `Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`,
      MissingSecretKeyErrorMessage: `Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`,
      MissingClerkProvider: `{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider`
    });
    __name(buildErrorThrower, "buildErrorThrower");
  }
});

// node_modules/@clerk/shared/dist/runtime/error.mjs
var init_error = __esm({
  "node_modules/@clerk/shared/dist/runtime/error.mjs"() {
    init_performance2();
    init_clerkRuntimeError_DqAmLuLY();
    init_error_BwjsVTI1();
  }
});

// node_modules/@clerk/backend/dist/chunk-YBVFDYDR.mjs
var errorThrower, isDevOrStagingUrl;
var init_chunk_YBVFDYDR = __esm({
  "node_modules/@clerk/backend/dist/chunk-YBVFDYDR.mjs"() {
    init_performance2();
    init_deprecated();
    init_keys();
    init_retry();
    init_url();
    init_error();
    init_keys();
    errorThrower = buildErrorThrower({ packageName: "@clerk/backend" });
    ({ isDevOrStagingUrl } = createDevOrStagingUrlCache());
  }
});

// node_modules/@clerk/backend/dist/chunk-RZ7A7F6X.mjs
var TokenVerificationErrorCode, TokenVerificationErrorReason, TokenVerificationErrorAction, TokenVerificationError, MachineTokenVerificationErrorCode, _MachineTokenVerificationError, MachineTokenVerificationError;
var init_chunk_RZ7A7F6X = __esm({
  "node_modules/@clerk/backend/dist/chunk-RZ7A7F6X.mjs"() {
    init_performance2();
    init_error();
    init_error();
    TokenVerificationErrorCode = {
      InvalidSecretKey: "clerk_key_invalid"
    };
    TokenVerificationErrorReason = {
      TokenExpired: "token-expired",
      TokenInvalid: "token-invalid",
      TokenInvalidAlgorithm: "token-invalid-algorithm",
      TokenInvalidAuthorizedParties: "token-invalid-authorized-parties",
      TokenInvalidSignature: "token-invalid-signature",
      TokenNotActiveYet: "token-not-active-yet",
      TokenIatInTheFuture: "token-iat-in-the-future",
      TokenVerificationFailed: "token-verification-failed",
      InvalidSecretKey: "secret-key-invalid",
      LocalJWKMissing: "jwk-local-missing",
      RemoteJWKFailedToLoad: "jwk-remote-failed-to-load",
      RemoteJWKInvalid: "jwk-remote-invalid",
      RemoteJWKMissing: "jwk-remote-missing",
      JWKFailedToResolve: "jwk-failed-to-resolve",
      JWKKidMismatch: "jwk-kid-mismatch"
    };
    TokenVerificationErrorAction = {
      ContactSupport: "Contact support@clerk.com",
      EnsureClerkJWT: "Make sure that this is a valid Clerk-generated JWT.",
      SetClerkJWTKey: "Set the CLERK_JWT_KEY environment variable.",
      SetClerkSecretKey: "Set the CLERK_SECRET_KEY environment variable.",
      EnsureClockSync: "Make sure your system clock is in sync (e.g. turn off and on automatic time synchronization)."
    };
    TokenVerificationError = class _TokenVerificationError extends Error {
      static {
        __name(this, "_TokenVerificationError");
      }
      constructor({
        action,
        message,
        reason
      }) {
        super(message);
        Object.setPrototypeOf(this, _TokenVerificationError.prototype);
        this.reason = reason;
        this.message = message;
        this.action = action;
      }
      getFullMessage() {
        return `${[this.message, this.action].filter((m) => m).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
      }
    };
    MachineTokenVerificationErrorCode = {
      TokenInvalid: "token-invalid",
      InvalidSecretKey: "secret-key-invalid",
      UnexpectedError: "unexpected-error",
      TokenVerificationFailed: "token-verification-failed"
    };
    _MachineTokenVerificationError = class _MachineTokenVerificationError2 extends ClerkError {
      static {
        __name(this, "_MachineTokenVerificationError");
      }
      constructor({
        message,
        code,
        status,
        action
      }) {
        super({ message, code });
        Object.setPrototypeOf(this, _MachineTokenVerificationError2.prototype);
        this.status = status;
        this.action = action;
      }
      // Keep message unformatted, matching ClerkAPIResponseError's approach
      static formatMessage(_name, msg, _code, _docsUrl) {
        return msg;
      }
      getFullMessage() {
        return `${this.message} (code=${this.code}, status=${this.status || "n/a"})`;
      }
    };
    _MachineTokenVerificationError.kind = "MachineTokenVerificationError";
    MachineTokenVerificationError = _MachineTokenVerificationError;
  }
});

// node_modules/@clerk/backend/dist/runtime/browser/crypto.mjs
var webcrypto;
var init_crypto = __esm({
  "node_modules/@clerk/backend/dist/runtime/browser/crypto.mjs"() {
    init_performance2();
    webcrypto = crypto;
  }
});

// node_modules/@clerk/shared/dist/runtime/isomorphicAtob.mjs
var init_isomorphicAtob = __esm({
  "node_modules/@clerk/shared/dist/runtime/isomorphicAtob.mjs"() {
    init_performance2();
    init_isomorphicAtob_CoF80qYz();
  }
});

// node_modules/@clerk/backend/dist/chunk-J2CDX2WG.mjs
function parse(string, encoding, opts = {}) {
  if (!encoding.codes) {
    encoding.codes = {};
    for (let i = 0; i < encoding.chars.length; ++i) {
      encoding.codes[encoding.chars[i]] = i;
    }
  }
  if (!opts.loose && string.length * encoding.bits & 7) {
    throw new SyntaxError("Invalid padding");
  }
  let end = string.length;
  while (string[end - 1] === "=") {
    --end;
    if (!opts.loose && !((string.length - end) * encoding.bits & 7)) {
      throw new SyntaxError("Invalid padding");
    }
  }
  const out = new (opts.out ?? Uint8Array)(end * encoding.bits / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = encoding.codes[string[i]];
    if (value === void 0) {
      throw new SyntaxError("Invalid character " + string[i]);
    }
    buffer = buffer << encoding.bits | value;
    bits += encoding.bits;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= encoding.bits || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function stringify(data, encoding, opts = {}) {
  const { pad = true } = opts;
  const mask = (1 << encoding.bits) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | 255 & data[i];
    bits += 8;
    while (bits > encoding.bits) {
      bits -= encoding.bits;
      out += encoding.chars[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += encoding.chars[mask & buffer << encoding.bits - bits];
  }
  if (pad) {
    while (out.length * encoding.bits & 7) {
      out += "=";
    }
  }
  return out;
}
function getCryptoAlgorithm(algorithmName) {
  const hash = algToHash[algorithmName];
  const name = jwksAlgToCryptoAlg[algorithmName];
  if (!hash || !name) {
    throw new Error(`Unsupported algorithm ${algorithmName}, expected one of ${algs.join(",")}.`);
  }
  return {
    hash: { name: algToHash[algorithmName] },
    name: jwksAlgToCryptoAlg[algorithmName]
  };
}
function pemToBuffer(secret) {
  const trimmed = secret.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "");
  const decoded = isomorphicAtob(trimmed);
  const buffer = new ArrayBuffer(decoded.length);
  const bufView = new Uint8Array(buffer);
  for (let i = 0, strLen = decoded.length; i < strLen; i++) {
    bufView[i] = decoded.charCodeAt(i);
  }
  return bufView;
}
function importKey(key, algorithm, keyUsage) {
  if (typeof key === "object") {
    return runtime.crypto.subtle.importKey("jwk", key, algorithm, false, [keyUsage]);
  }
  const keyData = pemToBuffer(key);
  const format = keyUsage === "sign" ? "pkcs8" : "spki";
  return runtime.crypto.subtle.importKey(format, keyData, algorithm, false, [keyUsage]);
}
async function hasValidSignature(jwt, key) {
  const { header, signature, raw: raw2 } = jwt;
  const encoder = new TextEncoder();
  const data = encoder.encode([raw2.header, raw2.payload].join("."));
  const algorithm = getCryptoAlgorithm(header.alg);
  try {
    const cryptoKey = await importKey(key, algorithm, "verify");
    const verified = await runtime.crypto.subtle.verify(algorithm.name, cryptoKey, signature, data);
    return { data: verified };
  } catch (error) {
    return {
      errors: [
        new TokenVerificationError({
          reason: TokenVerificationErrorReason.TokenInvalidSignature,
          message: error?.message
        })
      ]
    };
  }
}
function decodeJwt(token) {
  const tokenParts = (token || "").toString().split(".");
  if (tokenParts.length !== 3) {
    return {
      errors: [
        new TokenVerificationError({
          reason: TokenVerificationErrorReason.TokenInvalid,
          message: `Invalid JWT form. A JWT consists of three parts separated by dots.`
        })
      ]
    };
  }
  const [rawHeader, rawPayload, rawSignature] = tokenParts;
  const decoder = new TextDecoder();
  const header = JSON.parse(decoder.decode(base64url.parse(rawHeader, { loose: true })));
  const payload = JSON.parse(decoder.decode(base64url.parse(rawPayload, { loose: true })));
  const signature = base64url.parse(rawSignature, { loose: true });
  const data = {
    header,
    payload,
    signature,
    raw: {
      header: rawHeader,
      payload: rawPayload,
      signature: rawSignature,
      text: token
    }
  };
  return { data };
}
async function verifyJwt(token, options) {
  const { audience, authorizedParties, clockSkewInMs, key, headerType } = options;
  const clockSkew = typeof clockSkewInMs === "number" && Number.isFinite(clockSkewInMs) ? clockSkewInMs : DEFAULT_CLOCK_SKEW_IN_MS;
  const { data: decoded, errors } = decodeJwt(token);
  if (errors) {
    return { errors };
  }
  const { header, payload } = decoded;
  try {
    const { typ, alg } = header;
    assertHeaderType(typ, headerType);
    assertHeaderAlgorithm(alg);
  } catch (err) {
    return { errors: [err] };
  }
  const { data: signatureValid, errors: signatureErrors } = await hasValidSignature(decoded, key);
  if (signatureErrors) {
    return {
      errors: [
        new TokenVerificationError({
          action: TokenVerificationErrorAction.EnsureClerkJWT,
          reason: TokenVerificationErrorReason.TokenVerificationFailed,
          message: `Error verifying JWT signature. ${signatureErrors[0]}`
        })
      ]
    };
  }
  if (!signatureValid) {
    return {
      errors: [
        new TokenVerificationError({
          reason: TokenVerificationErrorReason.TokenInvalidSignature,
          message: "JWT signature is invalid."
        })
      ]
    };
  }
  try {
    const { azp, sub, aud, iat, exp, nbf } = payload;
    assertSubClaim(sub);
    assertAudienceClaim(aud, audience);
    assertAuthorizedPartiesClaim(azp, authorizedParties);
    assertExpirationClaim(exp, clockSkew);
    assertActivationClaim(nbf, clockSkew);
    assertIssuedAtClaim(iat, clockSkew);
  } catch (err) {
    return { errors: [err] };
  }
  return { data: payload };
}
var globalFetch, runtime, base64url, base64UrlEncoding, algToHash, RSA_ALGORITHM_NAME, jwksAlgToCryptoAlg, algs, isArrayString, assertAudienceClaim, assertHeaderType, assertHeaderAlgorithm, assertSubClaim, assertAuthorizedPartiesClaim, assertExpirationClaim, assertActivationClaim, assertIssuedAtClaim, DEFAULT_CLOCK_SKEW_IN_MS;
var init_chunk_J2CDX2WG = __esm({
  "node_modules/@clerk/backend/dist/chunk-J2CDX2WG.mjs"() {
    init_performance2();
    init_chunk_RZ7A7F6X();
    init_crypto();
    init_isomorphicAtob();
    globalFetch = fetch.bind(globalThis);
    runtime = {
      crypto: webcrypto,
      get fetch() {
        return false ? fetch : globalFetch;
      },
      AbortController: globalThis.AbortController,
      Blob: globalThis.Blob,
      FormData: globalThis.FormData,
      Headers: globalThis.Headers,
      Request: globalThis.Request,
      Response: globalThis.Response
    };
    base64url = {
      parse(string, opts) {
        return parse(string, base64UrlEncoding, opts);
      },
      stringify(data, opts) {
        return stringify(data, base64UrlEncoding, opts);
      }
    };
    base64UrlEncoding = {
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      bits: 6
    };
    __name(parse, "parse");
    __name(stringify, "stringify");
    algToHash = {
      RS256: "SHA-256",
      RS384: "SHA-384",
      RS512: "SHA-512"
    };
    RSA_ALGORITHM_NAME = "RSASSA-PKCS1-v1_5";
    jwksAlgToCryptoAlg = {
      RS256: RSA_ALGORITHM_NAME,
      RS384: RSA_ALGORITHM_NAME,
      RS512: RSA_ALGORITHM_NAME
    };
    algs = Object.keys(algToHash);
    __name(getCryptoAlgorithm, "getCryptoAlgorithm");
    isArrayString = /* @__PURE__ */ __name((s2) => {
      return Array.isArray(s2) && s2.length > 0 && s2.every((a) => typeof a === "string");
    }, "isArrayString");
    assertAudienceClaim = /* @__PURE__ */ __name((aud, audience) => {
      const audienceList = [audience].flat().filter((a) => !!a);
      const audList = [aud].flat().filter((a) => !!a);
      const shouldVerifyAudience = audienceList.length > 0 && audList.length > 0;
      if (!shouldVerifyAudience) {
        return;
      }
      if (typeof aud === "string") {
        if (!audienceList.includes(aud)) {
          throw new TokenVerificationError({
            action: TokenVerificationErrorAction.EnsureClerkJWT,
            reason: TokenVerificationErrorReason.TokenVerificationFailed,
            message: `Invalid JWT audience claim (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(
              audienceList
            )}".`
          });
        }
      } else if (isArrayString(aud)) {
        if (!aud.some((a) => audienceList.includes(a))) {
          throw new TokenVerificationError({
            action: TokenVerificationErrorAction.EnsureClerkJWT,
            reason: TokenVerificationErrorReason.TokenVerificationFailed,
            message: `Invalid JWT audience claim array (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(
              audienceList
            )}".`
          });
        }
      }
    }, "assertAudienceClaim");
    assertHeaderType = /* @__PURE__ */ __name((typ, allowedTypes) => {
      if (typeof typ === "undefined" && typeof allowedTypes === "undefined") {
        return;
      }
      const expectedTypes = allowedTypes ?? "JWT";
      const allowed = Array.isArray(expectedTypes) ? expectedTypes : [expectedTypes];
      if (!allowed.includes(typ)) {
        throw new TokenVerificationError({
          action: TokenVerificationErrorAction.EnsureClerkJWT,
          reason: TokenVerificationErrorReason.TokenInvalid,
          message: `Invalid JWT type ${JSON.stringify(typ)}. Expected "${allowed.join(", ")}".`
        });
      }
    }, "assertHeaderType");
    assertHeaderAlgorithm = /* @__PURE__ */ __name((alg) => {
      if (!algs.includes(alg)) {
        throw new TokenVerificationError({
          action: TokenVerificationErrorAction.EnsureClerkJWT,
          reason: TokenVerificationErrorReason.TokenInvalidAlgorithm,
          message: `Invalid JWT algorithm ${JSON.stringify(alg)}. Supported: ${algs}.`
        });
      }
    }, "assertHeaderAlgorithm");
    assertSubClaim = /* @__PURE__ */ __name((sub) => {
      if (typeof sub !== "string") {
        throw new TokenVerificationError({
          action: TokenVerificationErrorAction.EnsureClerkJWT,
          reason: TokenVerificationErrorReason.TokenVerificationFailed,
          message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(sub)}.`
        });
      }
    }, "assertSubClaim");
    assertAuthorizedPartiesClaim = /* @__PURE__ */ __name((azp, authorizedParties) => {
      if (!azp || !authorizedParties || authorizedParties.length === 0) {
        return;
      }
      if (!authorizedParties.includes(azp)) {
        throw new TokenVerificationError({
          reason: TokenVerificationErrorReason.TokenInvalidAuthorizedParties,
          message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(azp)}. Expected "${authorizedParties}".`
        });
      }
    }, "assertAuthorizedPartiesClaim");
    assertExpirationClaim = /* @__PURE__ */ __name((exp, clockSkewInMs) => {
      if (typeof exp !== "number") {
        throw new TokenVerificationError({
          action: TokenVerificationErrorAction.EnsureClerkJWT,
          reason: TokenVerificationErrorReason.TokenVerificationFailed,
          message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(exp)}. Expected number.`
        });
      }
      const currentDate = new Date(Date.now());
      const expiryDate = /* @__PURE__ */ new Date(0);
      expiryDate.setUTCSeconds(exp);
      const expired = expiryDate.getTime() <= currentDate.getTime() - clockSkewInMs;
      if (expired) {
        throw new TokenVerificationError({
          reason: TokenVerificationErrorReason.TokenExpired,
          message: `JWT is expired. Expiry date: ${expiryDate.toUTCString()}, Current date: ${currentDate.toUTCString()}.`
        });
      }
    }, "assertExpirationClaim");
    assertActivationClaim = /* @__PURE__ */ __name((nbf, clockSkewInMs) => {
      if (typeof nbf === "undefined") {
        return;
      }
      if (typeof nbf !== "number") {
        throw new TokenVerificationError({
          action: TokenVerificationErrorAction.EnsureClerkJWT,
          reason: TokenVerificationErrorReason.TokenVerificationFailed,
          message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(nbf)}. Expected number.`
        });
      }
      const currentDate = new Date(Date.now());
      const notBeforeDate = /* @__PURE__ */ new Date(0);
      notBeforeDate.setUTCSeconds(nbf);
      const early = notBeforeDate.getTime() > currentDate.getTime() + clockSkewInMs;
      if (early) {
        throw new TokenVerificationError({
          reason: TokenVerificationErrorReason.TokenNotActiveYet,
          message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${notBeforeDate.toUTCString()}; Current date: ${currentDate.toUTCString()};`
        });
      }
    }, "assertActivationClaim");
    assertIssuedAtClaim = /* @__PURE__ */ __name((iat, clockSkewInMs) => {
      if (typeof iat === "undefined") {
        return;
      }
      if (typeof iat !== "number") {
        throw new TokenVerificationError({
          action: TokenVerificationErrorAction.EnsureClerkJWT,
          reason: TokenVerificationErrorReason.TokenVerificationFailed,
          message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(iat)}. Expected number.`
        });
      }
      const currentDate = new Date(Date.now());
      const issuedAtDate = /* @__PURE__ */ new Date(0);
      issuedAtDate.setUTCSeconds(iat);
      const postIssued = issuedAtDate.getTime() > currentDate.getTime() + clockSkewInMs;
      if (postIssued) {
        throw new TokenVerificationError({
          reason: TokenVerificationErrorReason.TokenIatInTheFuture,
          message: `JWT issued at date claim (iat) is in the future. Issued at date: ${issuedAtDate.toUTCString()}; Current date: ${currentDate.toUTCString()};`
        });
      }
    }, "assertIssuedAtClaim");
    __name(pemToBuffer, "pemToBuffer");
    __name(importKey, "importKey");
    DEFAULT_CLOCK_SKEW_IN_MS = 5 * 1e3;
    __name(hasValidSignature, "hasValidSignature");
    __name(decodeJwt, "decodeJwt");
    __name(verifyJwt, "verifyJwt");
  }
});

// node_modules/@clerk/backend/dist/chunk-TOROEX6P.mjs
var __create, __defProp2, __getOwnPropDesc, __getOwnPropNames2, __getProtoOf, __hasOwnProp, __typeError, __commonJS, __copyProps, __toESM, __accessCheck, __privateGet, __privateAdd, __privateSet, __privateMethod;
var init_chunk_TOROEX6P = __esm({
  "node_modules/@clerk/backend/dist/chunk-TOROEX6P.mjs"() {
    init_performance2();
    __create = Object.create;
    __defProp2 = Object.defineProperty;
    __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    __getOwnPropNames2 = Object.getOwnPropertyNames;
    __getProtoOf = Object.getPrototypeOf;
    __hasOwnProp = Object.prototype.hasOwnProperty;
    __typeError = /* @__PURE__ */ __name((msg) => {
      throw TypeError(msg);
    }, "__typeError");
    __commonJS = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    }, "__require"), "__commonJS");
    __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp2(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    )), "__toESM");
    __accessCheck = /* @__PURE__ */ __name((obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg), "__accessCheck");
    __privateGet = /* @__PURE__ */ __name((obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj)), "__privateGet");
    __privateAdd = /* @__PURE__ */ __name((obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value), "__privateAdd");
    __privateSet = /* @__PURE__ */ __name((obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value), "__privateSet");
    __privateMethod = /* @__PURE__ */ __name((obj, member, method) => (__accessCheck(obj, member, "access private method"), method), "__privateMethod");
  }
});

// node_modules/@clerk/shared/dist/runtime/buildAccountsBaseUrl.mjs
function buildAccountsBaseUrl(frontendApi) {
  if (!frontendApi) return "";
  return `https://${frontendApi.replace(/clerk\.accountsstage\./, "accountsstage.").replace(/clerk\.accounts\.|clerk\./, "accounts.")}`;
}
var init_buildAccountsBaseUrl = __esm({
  "node_modules/@clerk/shared/dist/runtime/buildAccountsBaseUrl.mjs"() {
    init_performance2();
    __name(buildAccountsBaseUrl, "buildAccountsBaseUrl");
  }
});

// node_modules/@clerk/shared/dist/runtime/proxy-uGxHFpDF.mjs
function shouldAutoProxy(hostname) {
  return AUTO_PROXY_HOST_SUFFIXES.some((hostSuffix) => hostname?.endsWith(hostSuffix)) ?? false;
}
function getDefaultEnvironment() {
  return typeof process !== "undefined" && process.env ? process.env : {};
}
function normalizeHostname(hostnameOrUrl) {
  if (hostnameOrUrl.startsWith("http://") || hostnameOrUrl.startsWith("https://")) try {
    return new URL(hostnameOrUrl).hostname;
  } catch {
    return "";
  }
  return hostnameOrUrl.split("/")[0] || "";
}
function getAutoProxyUrlFromEnvironment({ publishableKey, hasDomain = false, hasProxyUrl = false, environment = getDefaultEnvironment() }) {
  if (hasProxyUrl || hasDomain || !isProductionFromPublishableKey(publishableKey)) return "";
  if (environment.VERCEL_TARGET_ENV !== "production") return "";
  const vercelProductionHostname = environment.VERCEL_PROJECT_PRODUCTION_URL;
  if (!vercelProductionHostname || !shouldAutoProxy(normalizeHostname(vercelProductionHostname))) return "";
  return AUTO_PROXY_PATH;
}
var AUTO_PROXY_HOST_SUFFIXES, AUTO_PROXY_PATH;
var init_proxy_uGxHFpDF = __esm({
  "node_modules/@clerk/shared/dist/runtime/proxy-uGxHFpDF.mjs"() {
    init_performance2();
    init_keys_ChIG_Ewf();
    AUTO_PROXY_HOST_SUFFIXES = [".vercel.app"];
    AUTO_PROXY_PATH = "/__clerk";
    __name(shouldAutoProxy, "shouldAutoProxy");
    __name(getDefaultEnvironment, "getDefaultEnvironment");
    __name(normalizeHostname, "normalizeHostname");
    __name(getAutoProxyUrlFromEnvironment, "getAutoProxyUrlFromEnvironment");
  }
});

// node_modules/@clerk/shared/dist/runtime/proxy.mjs
var init_proxy = __esm({
  "node_modules/@clerk/shared/dist/runtime/proxy.mjs"() {
    init_performance2();
    init_constants_Bta24VLk();
    init_isomorphicAtob_CoF80qYz();
    init_isomorphicBtoa_DWmLcIHi();
    init_keys_ChIG_Ewf();
    init_proxy_uGxHFpDF();
  }
});

// node_modules/@clerk/shared/dist/runtime/authorization-Bayl2soX.mjs
var TYPES_TO_OBJECTS, ALLOWED_LEVELS, ALLOWED_TYPES, ORG_SCOPES, USER_SCOPES, isValidMaxAge, isValidLevel, isValidVerificationType, isValidFactorAge, prefixWithOrg, checkOrgAuthorization, checkForFeatureOrPlan, checkBillingAuthorization, splitByScope, validateReverificationConfig, checkReverificationAuthorization, combine, createCheckAuthorization;
var init_authorization_Bayl2soX = __esm({
  "node_modules/@clerk/shared/dist/runtime/authorization-Bayl2soX.mjs"() {
    init_performance2();
    TYPES_TO_OBJECTS = {
      strict_mfa: {
        afterMinutes: 10,
        level: "multi_factor"
      },
      strict: {
        afterMinutes: 10,
        level: "second_factor"
      },
      moderate: {
        afterMinutes: 60,
        level: "second_factor"
      },
      lax: {
        afterMinutes: 1440,
        level: "second_factor"
      }
    };
    ALLOWED_LEVELS = /* @__PURE__ */ new Set([
      "first_factor",
      "second_factor",
      "multi_factor"
    ]);
    ALLOWED_TYPES = /* @__PURE__ */ new Set([
      "strict_mfa",
      "strict",
      "moderate",
      "lax"
    ]);
    ORG_SCOPES = /* @__PURE__ */ new Set([
      "o",
      "org",
      "organization"
    ]);
    USER_SCOPES = /* @__PURE__ */ new Set(["u", "user"]);
    isValidMaxAge = /* @__PURE__ */ __name((maxAge) => typeof maxAge === "number" && maxAge > 0, "isValidMaxAge");
    isValidLevel = /* @__PURE__ */ __name((level) => ALLOWED_LEVELS.has(level), "isValidLevel");
    isValidVerificationType = /* @__PURE__ */ __name((type) => ALLOWED_TYPES.has(type), "isValidVerificationType");
    isValidFactorAge = /* @__PURE__ */ __name((x) => typeof x === "number" && Number.isFinite(x) && (x === -1 || x >= 0), "isValidFactorAge");
    prefixWithOrg = /* @__PURE__ */ __name((value) => value.replace(/^(org:)*/, "org:"), "prefixWithOrg");
    checkOrgAuthorization = /* @__PURE__ */ __name((params, options) => {
      const { orgId, orgRole, orgPermissions } = options;
      const roleAsked = params.role !== void 0;
      const permissionAsked = params.permission !== void 0;
      if (!roleAsked && !permissionAsked) return "skip";
      if (roleAsked && typeof params.role !== "string") return "fail";
      if (permissionAsked && typeof params.permission !== "string") return "fail";
      if (!orgId) return "fail";
      if (roleAsked) {
        if (typeof orgRole !== "string" || !orgRole) return "fail";
        if (prefixWithOrg(orgRole) !== prefixWithOrg(params.role)) return "fail";
      }
      if (permissionAsked) {
        if (!Array.isArray(orgPermissions)) return "fail";
        if (!orgPermissions.includes(prefixWithOrg(params.permission))) return "fail";
      }
      return "pass";
    }, "checkOrgAuthorization");
    checkForFeatureOrPlan = /* @__PURE__ */ __name((claim, featureOrPlan) => {
      const { org: orgFeatures, user: userFeatures } = splitByScope(claim);
      const [rawScope, rawId] = featureOrPlan.split(":");
      const hasExplicitScope = rawId !== void 0;
      const scope = rawScope;
      const id = rawId || rawScope;
      if (hasExplicitScope && !ORG_SCOPES.has(scope) && !USER_SCOPES.has(scope)) throw new Error(`Invalid scope: ${scope}`);
      if (hasExplicitScope) {
        if (ORG_SCOPES.has(scope)) return orgFeatures.includes(id);
        if (USER_SCOPES.has(scope)) return userFeatures.includes(id);
      }
      return [...orgFeatures, ...userFeatures].includes(id);
    }, "checkForFeatureOrPlan");
    checkBillingAuthorization = /* @__PURE__ */ __name((params, options) => {
      const { features, plans } = options;
      const featureAsked = params.feature !== void 0;
      const planAsked = params.plan !== void 0;
      if (!featureAsked && !planAsked) return "skip";
      if (featureAsked && typeof params.feature !== "string") return "fail";
      if (planAsked && typeof params.plan !== "string") return "fail";
      if (featureAsked) {
        if (typeof features !== "string" || !features) return "fail";
        try {
          if (!checkForFeatureOrPlan(features, params.feature)) return "fail";
        } catch {
          return "fail";
        }
      }
      if (planAsked) {
        if (typeof plans !== "string" || !plans) return "fail";
        try {
          if (!checkForFeatureOrPlan(plans, params.plan)) return "fail";
        } catch {
          return "fail";
        }
      }
      return "pass";
    }, "checkBillingAuthorization");
    splitByScope = /* @__PURE__ */ __name((fea) => {
      const org = [];
      const user = [];
      if (!fea) return {
        org,
        user
      };
      const parts = fea.split(",");
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();
        const colonIndex = part.indexOf(":");
        if (colonIndex === -1) throw new Error(`Invalid claim element (missing colon): ${part}`);
        const scope = part.slice(0, colonIndex);
        const value = part.slice(colonIndex + 1);
        if (scope === "o") org.push(value);
        else if (scope === "u") user.push(value);
        else if (scope === "ou" || scope === "uo") {
          org.push(value);
          user.push(value);
        }
      }
      return {
        org,
        user
      };
    }, "splitByScope");
    validateReverificationConfig = /* @__PURE__ */ __name((config) => {
      if (!config) return false;
      const convertConfigToObject = /* @__PURE__ */ __name((config$1) => {
        if (typeof config$1 === "string") return TYPES_TO_OBJECTS[config$1];
        return config$1;
      }, "convertConfigToObject");
      const isValidStringValue = typeof config === "string" && isValidVerificationType(config);
      const isValidObjectValue = typeof config === "object" && isValidLevel(config.level) && isValidMaxAge(config.afterMinutes);
      if (isValidStringValue || isValidObjectValue) return convertConfigToObject.bind(null, config);
      return false;
    }, "validateReverificationConfig");
    checkReverificationAuthorization = /* @__PURE__ */ __name((params, { factorVerificationAge }) => {
      if (params.reverification === void 0) return "skip";
      if (!factorVerificationAge) return "fail";
      if (!Array.isArray(factorVerificationAge) || factorVerificationAge.length !== 2 || !isValidFactorAge(factorVerificationAge[0]) || !isValidFactorAge(factorVerificationAge[1])) return "fail";
      const getConfig = validateReverificationConfig(params.reverification);
      if (!getConfig) return "fail";
      const { level, afterMinutes } = getConfig();
      const [factor1Age, factor2Age] = factorVerificationAge;
      if (factor1Age === -1 && factor2Age === -1) return "fail";
      const factor1FreshEnough = factor1Age !== -1 && afterMinutes > factor1Age;
      const factor2FreshEnough = factor2Age !== -1 && afterMinutes > factor2Age;
      switch (level) {
        case "first_factor":
          return factor1FreshEnough ? "pass" : "fail";
        case "second_factor":
          if (factor2Age === -1) return factor1FreshEnough ? "pass" : "fail";
          if (factor1Age === -1) return factor2FreshEnough ? "pass" : "fail";
          return factor2FreshEnough ? "pass" : "fail";
        case "multi_factor":
          if (factor2Age === -1) return factor1FreshEnough ? "pass" : "fail";
          if (factor1Age === -1) return "fail";
          return factor1FreshEnough && factor2FreshEnough ? "pass" : "fail";
      }
    }, "checkReverificationAuthorization");
    combine = /* @__PURE__ */ __name((results) => results.some((r) => r === "pass") && results.every((r) => r === "pass" || r === "skip"), "combine");
    createCheckAuthorization = /* @__PURE__ */ __name((options) => {
      return (params) => {
        if (!options.userId) return false;
        return combine([
          checkOrgAuthorization(params, options),
          checkBillingAuthorization(params, options),
          checkReverificationAuthorization(params, options)
        ]);
      };
    }, "createCheckAuthorization");
  }
});

// node_modules/@clerk/shared/dist/runtime/authorization.mjs
var init_authorization = __esm({
  "node_modules/@clerk/shared/dist/runtime/authorization.mjs"() {
    init_performance2();
    init_authorization_Bayl2soX();
  }
});

// node_modules/@clerk/shared/dist/runtime/jwtPayloadParser.mjs
function buildOrgPermissions({ features, permissions, featurePermissionMap }) {
  if (!features || !permissions || !featurePermissionMap) return [];
  const orgPermissions = [];
  for (let featureIndex = 0; featureIndex < features.length; featureIndex++) {
    const feature = features[featureIndex];
    if (featureIndex >= featurePermissionMap.length) continue;
    const permissionBits = featurePermissionMap[featureIndex];
    if (!permissionBits) continue;
    for (let permIndex = 0; permIndex < permissionBits.length; permIndex++) if (permissionBits[permIndex] === 1) orgPermissions.push(`org:${feature}:${permissions[permIndex]}`);
  }
  return orgPermissions;
}
var parsePermissions, __experimental_JWTPayloadToAuthObjectProperties;
var init_jwtPayloadParser = __esm({
  "node_modules/@clerk/shared/dist/runtime/jwtPayloadParser.mjs"() {
    init_performance2();
    init_authorization_Bayl2soX();
    parsePermissions = /* @__PURE__ */ __name(({ per, fpm }) => {
      if (!per || !fpm) return {
        permissions: [],
        featurePermissionMap: []
      };
      const permissions = per.split(",").map((p) => p.trim());
      return {
        permissions,
        featurePermissionMap: fpm.split(",").map((permission) => Number.parseInt(permission.trim(), 10)).map((permission) => permission.toString(2).padStart(permissions.length, "0").split("").map((bit) => Number.parseInt(bit, 10)).reverse()).filter(Boolean)
      };
    }, "parsePermissions");
    __name(buildOrgPermissions, "buildOrgPermissions");
    __experimental_JWTPayloadToAuthObjectProperties = /* @__PURE__ */ __name((claims) => {
      let orgId;
      let orgRole;
      let orgSlug;
      let orgPermissions;
      const factorVerificationAge = claims.fva ?? null;
      const sessionStatus = claims.sts ?? null;
      switch (claims.v) {
        case 2:
          if (claims.o) {
            orgId = claims.o?.id;
            orgSlug = claims.o?.slg;
            if (claims.o?.rol) orgRole = `org:${claims.o?.rol}`;
            const { org } = splitByScope(claims.fea);
            const { permissions, featurePermissionMap } = parsePermissions({
              per: claims.o?.per,
              fpm: claims.o?.fpm
            });
            orgPermissions = buildOrgPermissions({
              features: org,
              featurePermissionMap,
              permissions
            });
          }
          break;
        default:
          orgId = claims.org_id;
          orgRole = claims.org_role;
          orgSlug = claims.org_slug;
          orgPermissions = claims.org_permissions;
          break;
      }
      return {
        sessionClaims: claims,
        sessionId: claims.sid,
        sessionStatus,
        actor: claims.act,
        userId: claims.sub,
        orgId,
        orgRole,
        orgSlug,
        orgPermissions,
        factorVerificationAge
      };
    }, "__experimental_JWTPayloadToAuthObjectProperties");
  }
});

// node_modules/@clerk/shared/dist/runtime/pathToRegexp-7eww5BY6.mjs
function _(r) {
  for (var n = [], e = 0; e < r.length; ) {
    var a = r[e];
    if (a === "*" || a === "+" || a === "?") {
      n.push({
        type: "MODIFIER",
        index: e,
        value: r[e++]
      });
      continue;
    }
    if (a === "\\") {
      n.push({
        type: "ESCAPED_CHAR",
        index: e++,
        value: r[e++]
      });
      continue;
    }
    if (a === "{") {
      n.push({
        type: "OPEN",
        index: e,
        value: r[e++]
      });
      continue;
    }
    if (a === "}") {
      n.push({
        type: "CLOSE",
        index: e,
        value: r[e++]
      });
      continue;
    }
    if (a === ":") {
      for (var u = "", t = e + 1; t < r.length; ) {
        var c = r.charCodeAt(t);
        if (c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || c === 95) {
          u += r[t++];
          continue;
        }
        break;
      }
      if (!u) throw new TypeError("Missing parameter name at ".concat(e));
      n.push({
        type: "NAME",
        index: e,
        value: u
      }), e = t;
      continue;
    }
    if (a === "(") {
      var o = 1, m = "", t = e + 1;
      if (r[t] === "?") throw new TypeError('Pattern cannot start with "?" at '.concat(t));
      for (; t < r.length; ) {
        if (r[t] === "\\") {
          m += r[t++] + r[t++];
          continue;
        }
        if (r[t] === ")") {
          if (o--, o === 0) {
            t++;
            break;
          }
        } else if (r[t] === "(" && (o++, r[t + 1] !== "?")) throw new TypeError("Capturing groups are not allowed at ".concat(t));
        m += r[t++];
      }
      if (o) throw new TypeError("Unbalanced pattern at ".concat(e));
      if (!m) throw new TypeError("Missing pattern at ".concat(e));
      n.push({
        type: "PATTERN",
        index: e,
        value: m
      }), e = t;
      continue;
    }
    n.push({
      type: "CHAR",
      index: e,
      value: r[e++]
    });
  }
  return n.push({
    type: "END",
    index: e,
    value: ""
  }), n;
}
function F(r, n) {
  n === void 0 && (n = {});
  for (var e = _(r), a = n.prefixes, u = a === void 0 ? "./" : a, t = n.delimiter, c = t === void 0 ? "/#?" : t, o = [], m = 0, h = 0, p = "", f = function(l) {
    if (h < e.length && e[h].type === l) return e[h++].value;
  }, w = function(l) {
    var v = f(l);
    if (v !== void 0) return v;
    var E = e[h], N = E.type, S = E.index;
    throw new TypeError("Unexpected ".concat(N, " at ").concat(S, ", expected ").concat(l));
  }, d = function() {
    for (var l = "", v; v = f("CHAR") || f("ESCAPED_CHAR"); ) l += v;
    return l;
  }, M = function(l) {
    for (var v = 0, E = c; v < E.length; v++) {
      var N = E[v];
      if (l.indexOf(N) > -1) return true;
    }
    return false;
  }, A = function(l) {
    var v = o[o.length - 1], E = l || (v && typeof v == "string" ? v : "");
    if (v && !E) throw new TypeError('Must have text between two parameters, missing text after "'.concat(v.name, '"'));
    return !E || M(E) ? "[^".concat(s(c), "]+?") : "(?:(?!".concat(s(E), ")[^").concat(s(c), "])+?");
  }; h < e.length; ) {
    var T = f("CHAR"), x = f("NAME"), C = f("PATTERN");
    if (x || C) {
      var g = T || "";
      u.indexOf(g) === -1 && (p += g, g = ""), p && (o.push(p), p = ""), o.push({
        name: x || m++,
        prefix: g,
        suffix: "",
        pattern: C || A(g),
        modifier: f("MODIFIER") || ""
      });
      continue;
    }
    var i = T || f("ESCAPED_CHAR");
    if (i) {
      p += i;
      continue;
    }
    p && (o.push(p), p = "");
    if (f("OPEN")) {
      var g = d(), y = f("NAME") || "", O = f("PATTERN") || "", b = d();
      w("CLOSE"), o.push({
        name: y || (O ? m++ : ""),
        pattern: y && !O ? A(g) : O,
        prefix: g,
        suffix: b,
        modifier: f("MODIFIER") || ""
      });
      continue;
    }
    w("END");
  }
  return o;
}
function H(r, n) {
  var e = [];
  return I(P(r, e, n), e, n);
}
function I(r, n, e) {
  e === void 0 && (e = {});
  var a = e.decode, u = a === void 0 ? function(t) {
    return t;
  } : a;
  return function(t) {
    var c = r.exec(t);
    if (!c) return false;
    for (var o = c[0], m = c.index, h = /* @__PURE__ */ Object.create(null), p = function(w) {
      if (c[w] === void 0) return "continue";
      var d = n[w - 1];
      d.modifier === "*" || d.modifier === "+" ? h[d.name] = c[w].split(d.prefix + d.suffix).map(function(M) {
        return u(M, d);
      }) : h[d.name] = u(c[w], d);
    }, f = 1; f < c.length; f++) p(f);
    return {
      path: o,
      index: m,
      params: h
    };
  };
}
function s(r) {
  return r.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function D(r) {
  return r && r.sensitive ? "" : "i";
}
function $(r, n) {
  if (!n) return r;
  for (var e = /\((?:\?<(.*?)>)?(?!\?)/g, a = 0, u = e.exec(r.source); u; ) n.push({
    name: u[1] || a++,
    prefix: "",
    suffix: "",
    modifier: "",
    pattern: ""
  }), u = e.exec(r.source);
  return r;
}
function W(r, n, e) {
  var a = r.map(function(u) {
    return P(u, n, e).source;
  });
  return new RegExp("(?:".concat(a.join("|"), ")"), D(e));
}
function L(r, n, e) {
  return U(F(r, e), n, e);
}
function U(r, n, e) {
  e === void 0 && (e = {});
  for (var a = e.strict, u = a === void 0 ? false : a, t = e.start, c = t === void 0 ? true : t, o = e.end, m = o === void 0 ? true : o, h = e.encode, p = h === void 0 ? function(v) {
    return v;
  } : h, f = e.delimiter, w = f === void 0 ? "/#?" : f, d = e.endsWith, M = d === void 0 ? "" : d, A = "[".concat(s(M), "]|$"), T = "[".concat(s(w), "]"), x = c ? "^" : "", C = 0, g = r; C < g.length; C++) {
    var i = g[C];
    if (typeof i == "string") x += s(p(i));
    else {
      var R = s(p(i.prefix)), y = s(p(i.suffix));
      if (i.pattern) if (n && n.push(i), R || y) if (i.modifier === "+" || i.modifier === "*") {
        var O = i.modifier === "*" ? "?" : "";
        x += "(?:".concat(R, "((?:").concat(i.pattern, ")(?:").concat(y).concat(R, "(?:").concat(i.pattern, "))*)").concat(y, ")").concat(O);
      } else x += "(?:".concat(R, "(").concat(i.pattern, ")").concat(y, ")").concat(i.modifier);
      else {
        if (i.modifier === "+" || i.modifier === "*") throw new TypeError('Can not repeat "'.concat(i.name, '" without a prefix and suffix'));
        x += "(".concat(i.pattern, ")").concat(i.modifier);
      }
      else x += "(?:".concat(R).concat(y, ")").concat(i.modifier);
    }
  }
  if (m) u || (x += "".concat(T, "?")), x += e.endsWith ? "(?=".concat(A, ")") : "$";
  else {
    var b = r[r.length - 1], l = typeof b == "string" ? T.indexOf(b[b.length - 1]) > -1 : b === void 0;
    u || (x += "(?:".concat(T, "(?=").concat(A, "))?")), l || (x += "(?=".concat(T, "|").concat(A, ")"));
  }
  return new RegExp(x, D(e));
}
function P(r, n, e) {
  return r instanceof RegExp ? $(r, n) : Array.isArray(r) ? W(r, n, e) : L(r, n, e);
}
function match2(str, options) {
  try {
    return H(str, options);
  } catch (e) {
    throw new Error(`Invalid path and options: Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${e.message}`);
  }
}
var init_pathToRegexp_7eww5BY6 = __esm({
  "node_modules/@clerk/shared/dist/runtime/pathToRegexp-7eww5BY6.mjs"() {
    init_performance2();
    __name(_, "_");
    __name(F, "F");
    __name(H, "H");
    __name(I, "I");
    __name(s, "s");
    __name(D, "D");
    __name($, "$");
    __name(W, "W");
    __name(L, "L");
    __name(U, "U");
    __name(P, "P");
    __name(match2, "match");
  }
});

// node_modules/@clerk/shared/dist/runtime/pathToRegexp.mjs
var init_pathToRegexp = __esm({
  "node_modules/@clerk/shared/dist/runtime/pathToRegexp.mjs"() {
    init_performance2();
    init_pathToRegexp_7eww5BY6();
  }
});

// node_modules/@clerk/shared/dist/runtime/authorization-errors-CBHAr6Ld.mjs
var init_authorization_errors_CBHAr6Ld = __esm({
  "node_modules/@clerk/shared/dist/runtime/authorization-errors-CBHAr6Ld.mjs"() {
    init_performance2();
  }
});

// node_modules/@clerk/shared/dist/runtime/authorization-errors.mjs
var init_authorization_errors = __esm({
  "node_modules/@clerk/shared/dist/runtime/authorization-errors.mjs"() {
    init_performance2();
    init_authorization_errors_CBHAr6Ld();
  }
});

// node_modules/@clerk/backend/dist/chunk-COVYMSO6.mjs
function mergePreDefinedOptions(preDefinedOptions, options) {
  return Object.keys(preDefinedOptions).reduce(
    (obj, key) => {
      return { ...obj, [key]: options[key] || obj[key] };
    },
    { ...preDefinedOptions }
  );
}
function assertValidSecretKey(val) {
  if (!val || typeof val !== "string") {
    throw Error("Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.");
  }
}
function assertValidPublishableKey(val) {
  parsePublishableKey(val, { fatal: true });
}
function isDotSegment(segment) {
  let candidate = segment;
  for (let i = 0; i <= MAX_DECODES; i++) {
    if (candidate.split(/[/\\]/).some((p) => p === "." || p === "..")) {
      return true;
    }
    if (i === MAX_DECODES) {
      throw new Error(`joinPaths: too many layers of encoding in ${segment}`);
    }
    try {
      const next = decodeURIComponent(candidate);
      if (next === candidate) {
        break;
      }
      candidate = next;
    } catch {
      break;
    }
  }
  return false;
}
function joinPaths(...args) {
  const result = args.filter((p) => p).join(SEPARATOR).replace(MULTIPLE_SEPARATOR_REGEX, SEPARATOR);
  for (const segment of result.split(SEPARATOR)) {
    if (isDotSegment(segment)) {
      throw new Error(`joinPaths: "." and ".." path segments are not allowed (received "${result}")`);
    }
  }
  return result;
}
function getFromCache(kid) {
  return cache[kid];
}
function getCacheValues() {
  return Object.values(cache);
}
function setInCache(cacheKey, jwk, shouldExpire = true) {
  cache[cacheKey] = jwk;
  lastUpdatedAt = shouldExpire ? Date.now() : -1;
}
function loadClerkJwkFromPem(params) {
  const { kid, pem } = params;
  const prefixedKid = `local-${kid}`;
  const cachedJwk = getFromCache(prefixedKid);
  if (cachedJwk) {
    return cachedJwk;
  }
  if (!pem) {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.SetClerkJWTKey,
      message: "Missing local JWK.",
      reason: TokenVerificationErrorReason.LocalJWKMissing
    });
  }
  const modulus = pem.replace(/\r\n|\n|\r/g, "").replace(PEM_HEADER, "").replace(PEM_TRAILER, "").replace(RSA_PREFIX, "").replace(RSA_SUFFIX, "").replace(/\+/g, "-").replace(/\//g, "_");
  const jwk = { kid: prefixedKid, kty: "RSA", alg: "RS256", n: modulus, e: "AQAB" };
  setInCache(prefixedKid, jwk, false);
  return jwk;
}
async function loadClerkJWKFromRemote(params) {
  const { secretKey, apiUrl = API_URL, apiVersion = API_VERSION, kid, skipJwksCache } = params;
  if (skipJwksCache || cacheHasExpired() || !getFromCache(kid)) {
    if (!secretKey) {
      throw new TokenVerificationError({
        action: TokenVerificationErrorAction.ContactSupport,
        message: "Failed to load JWKS from Clerk Backend or Frontend API.",
        reason: TokenVerificationErrorReason.RemoteJWKFailedToLoad
      });
    }
    const fetcher = /* @__PURE__ */ __name(() => fetchJWKSFromBAPI(apiUrl, secretKey, apiVersion), "fetcher");
    const { keys } = await retry(fetcher);
    if (!keys || !keys.length) {
      throw new TokenVerificationError({
        action: TokenVerificationErrorAction.ContactSupport,
        message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.",
        reason: TokenVerificationErrorReason.RemoteJWKFailedToLoad
      });
    }
    keys.forEach((key) => setInCache(key.kid, key));
  }
  const jwk = getFromCache(kid);
  if (!jwk) {
    const cacheValues = getCacheValues();
    const jwkKeys = cacheValues.map((jwk2) => jwk2.kid).sort().join(", ");
    throw new TokenVerificationError({
      action: `Go to your Dashboard and validate your secret and public keys are correct. ${TokenVerificationErrorAction.ContactSupport} if the issue persists.`,
      message: `Unable to find a signing key in JWKS that matches the kid='${kid}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT. The following kid is available: ${jwkKeys}`,
      reason: TokenVerificationErrorReason.JWKKidMismatch
    });
  }
  return jwk;
}
async function fetchJWKSFromBAPI(apiUrl, key, apiVersion) {
  if (!key) {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.SetClerkSecretKey,
      message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.",
      reason: TokenVerificationErrorReason.RemoteJWKFailedToLoad
    });
  }
  const url = new URL(apiUrl);
  url.pathname = joinPaths(url.pathname, apiVersion, "/jwks");
  const response = await runtime.fetch(url.href, {
    headers: {
      Authorization: `Bearer ${key}`,
      "Clerk-API-Version": SUPPORTED_BAPI_VERSION,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT
    }
  });
  if (!response.ok) {
    const json2 = await response.json();
    const invalidSecretKeyError = getErrorObjectByCode(json2?.errors, TokenVerificationErrorCode.InvalidSecretKey);
    if (invalidSecretKeyError) {
      const reason = TokenVerificationErrorReason.InvalidSecretKey;
      throw new TokenVerificationError({
        action: TokenVerificationErrorAction.ContactSupport,
        message: invalidSecretKeyError.message,
        reason
      });
    }
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.ContactSupport,
      message: `Error loading Clerk JWKS from ${url.href} with code=${response.status}`,
      reason: TokenVerificationErrorReason.RemoteJWKFailedToLoad
    });
  }
  return response.json();
}
function cacheHasExpired() {
  if (lastUpdatedAt === -1) {
    return false;
  }
  const isExpired = Date.now() - lastUpdatedAt >= MAX_CACHE_LAST_UPDATED_AT_SECONDS * 1e3;
  if (isExpired) {
    cache = {};
  }
  return isExpired;
}
function isJwtFormat(token) {
  return JwtFormatRegExp.test(token);
}
function isOAuthJwt(token) {
  if (!isJwtFormat(token)) {
    return false;
  }
  try {
    const { data, errors } = decodeJwt(token);
    return !errors && !!data && OAUTH_ACCESS_TOKEN_TYPES.includes(data.header.typ);
  } catch {
    return false;
  }
}
function isM2MJwt(token) {
  if (!isJwtFormat(token)) {
    return false;
  }
  try {
    const { data, errors } = decodeJwt(token);
    return !errors && !!data && typeof data.payload.sub === "string" && data.payload.sub.startsWith(M2M_SUBJECT_PREFIX);
  } catch {
    return false;
  }
}
function isMachineJwt(token) {
  return isOAuthJwt(token) || isM2MJwt(token);
}
function isMachineTokenByPrefix(token) {
  return MACHINE_TOKEN_PREFIXES.some((prefix) => token.startsWith(prefix));
}
function isMachineToken(token) {
  return isMachineTokenByPrefix(token) || isOAuthJwt(token) || isM2MJwt(token);
}
function getMachineTokenType(token) {
  if (token.startsWith(M2M_TOKEN_PREFIX) || isM2MJwt(token)) {
    return TokenType.M2MToken;
  }
  if (token.startsWith(OAUTH_TOKEN_PREFIX) || isOAuthJwt(token)) {
    return TokenType.OAuthToken;
  }
  if (token.startsWith(API_KEY_PREFIX)) {
    return TokenType.ApiKey;
  }
  throw new Error("Unknown machine token type");
}
async function resolveKeyAndVerifyJwt(token, kid, options, headerType) {
  try {
    let key;
    if (options.jwtKey) {
      key = loadClerkJwkFromPem({ kid, pem: options.jwtKey });
    } else if (options.secretKey) {
      key = await loadClerkJWKFromRemote({ ...options, kid });
    } else {
      return {
        error: new MachineTokenVerificationError({
          action: TokenVerificationErrorAction.SetClerkJWTKey,
          message: "Failed to resolve JWK during verification.",
          code: MachineTokenVerificationErrorCode.TokenVerificationFailed
        })
      };
    }
    const { data: payload, errors: verifyErrors } = await verifyJwt(token, {
      ...options,
      key,
      ...headerType ? { headerType } : {}
    });
    if (verifyErrors) {
      return {
        error: new MachineTokenVerificationError({
          code: MachineTokenVerificationErrorCode.TokenVerificationFailed,
          message: verifyErrors[0].message
        })
      };
    }
    return { payload };
  } catch (error) {
    return {
      error: new MachineTokenVerificationError({
        code: MachineTokenVerificationErrorCode.TokenVerificationFailed,
        message: error.message
      })
    };
  }
}
async function verifyM2MJwt(token, decoded, options) {
  const result = await resolveKeyAndVerifyJwt(token, decoded.header.kid, options);
  if ("error" in result) {
    return { data: void 0, tokenType: TokenType.M2MToken, errors: [result.error] };
  }
  return {
    data: M2MToken.fromJwtPayload(result.payload, options.clockSkewInMs),
    tokenType: TokenType.M2MToken,
    errors: void 0
  };
}
async function verifyOAuthJwt(token, decoded, options) {
  const result = await resolveKeyAndVerifyJwt(token, decoded.header.kid, options, OAUTH_ACCESS_TOKEN_TYPES);
  if ("error" in result) {
    return { data: void 0, tokenType: TokenType.OAuthToken, errors: [result.error] };
  }
  return {
    data: IdPOAuthAccessToken.fromJwtPayload(result.payload, options.clockSkewInMs),
    tokenType: TokenType.OAuthToken,
    errors: void 0
  };
}
function mapObject(object, mapper, options) {
  if (!isObject(object)) {
    throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
  }
  if (Array.isArray(object)) {
    throw new TypeError("Expected an object, got an array");
  }
  return _mapObject(object, mapper, options);
}
function split(value) {
  let result = value.trim();
  result = result.replace(SPLIT_LOWER_UPPER_RE, SPLIT_REPLACE_VALUE).replace(SPLIT_UPPER_UPPER_RE, SPLIT_REPLACE_VALUE);
  result = result.replace(DEFAULT_STRIP_REGEXP, "\0");
  let start = 0;
  let end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  if (start === end)
    return [];
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split(/\0/g);
}
function splitSeparateNumbers(value) {
  const words = split(value);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const match22 = SPLIT_SEPARATE_NUMBER_RE.exec(word);
    if (match22) {
      const offset = match22.index + (match22[1] ?? match22[2]).length;
      words.splice(i, 1, word.slice(0, offset), word.slice(offset));
    }
  }
  return words;
}
function noCase(input, options) {
  const [prefix, words, suffix] = splitPrefixSuffix(input, options);
  return prefix + words.map(lowerFactory(options?.locale)).join(options?.delimiter ?? " ") + suffix;
}
function snakeCase(input, options) {
  return noCase(input, { delimiter: "_", ...options });
}
function lowerFactory(locale) {
  return locale === false ? (input) => input.toLowerCase() : (input) => input.toLocaleLowerCase(locale);
}
function splitPrefixSuffix(input, options = {}) {
  const splitFn = options.split ?? (options.separateNumbers ? splitSeparateNumbers : split);
  const prefixCharacters = options.prefixCharacters ?? DEFAULT_PREFIX_SUFFIX_CHARACTERS;
  const suffixCharacters = options.suffixCharacters ?? DEFAULT_PREFIX_SUFFIX_CHARACTERS;
  let prefixIndex = 0;
  let suffixIndex = input.length;
  while (prefixIndex < input.length) {
    const char = input.charAt(prefixIndex);
    if (!prefixCharacters.includes(char))
      break;
    prefixIndex++;
  }
  while (suffixIndex > prefixIndex) {
    const index = suffixIndex - 1;
    const char = input.charAt(index);
    if (!suffixCharacters.includes(char))
      break;
    suffixIndex = index;
  }
  return [
    input.slice(0, prefixIndex),
    splitFn(input.slice(prefixIndex, suffixIndex)),
    input.slice(suffixIndex)
  ];
}
function snakecaseKeys(obj, options) {
  if (Array.isArray(obj)) {
    if (obj.some((item) => item.constructor !== PlainObjectConstructor)) {
      throw new Error("obj must be array of plain objects");
    }
    options = { deep: true, exclude: [], parsingOptions: {}, ...options };
    const convertCase2 = options.snakeCase || ((key) => snakeCase(key, options.parsingOptions));
    return obj.map((item) => {
      return mapObject(item, (key, val) => {
        return [
          matches(options.exclude, key) ? key : convertCase2(key),
          val,
          mapperOptions(key, val, options)
        ];
      }, options);
    });
  } else {
    if (obj.constructor !== PlainObjectConstructor) {
      throw new Error("obj must be an plain object");
    }
  }
  options = { deep: true, exclude: [], parsingOptions: {}, ...options };
  const convertCase = options.snakeCase || ((key) => snakeCase(key, options.parsingOptions));
  return mapObject(obj, (key, val) => {
    return [
      matches(options.exclude, key) ? key : convertCase(key),
      val,
      mapperOptions(key, val, options)
    ];
  }, options);
}
function matches(patterns, value) {
  return patterns.some((pattern) => {
    return typeof pattern === "string" ? pattern === value : pattern.test(value);
  });
}
function mapperOptions(key, val, options) {
  return options.shouldRecurse ? { shouldRecurse: options.shouldRecurse(key, val) } : void 0;
}
function deserialize(payload) {
  let data, totalCount;
  if (Array.isArray(payload)) {
    const data2 = payload.map((item) => jsonToObject(item));
    return { data: data2 };
  } else if (isM2MTokenResponse(payload)) {
    data = payload.m2m_tokens.map((item) => jsonToObject(item));
    totalCount = payload.total_count;
    return { data, totalCount };
  } else if (isPaginated(payload)) {
    data = payload.data.map((item) => jsonToObject(item));
    totalCount = payload.total_count;
    return { data, totalCount };
  } else {
    return { data: jsonToObject(payload) };
  }
}
function isPaginated(payload) {
  if (!payload || typeof payload !== "object" || !("data" in payload)) {
    return false;
  }
  return Array.isArray(payload.data) && payload.data !== void 0;
}
function isM2MTokenResponse(payload) {
  if (!payload || typeof payload !== "object" || !("m2m_tokens" in payload)) {
    return false;
  }
  return Array.isArray(payload.m2m_tokens);
}
function getCount(item) {
  return item.total_count;
}
function jsonToObject(item) {
  if (typeof item !== "string" && "object" in item && "deleted" in item) {
    return DeletedObject.fromJSON(item);
  }
  switch (item.object) {
    case ObjectType.AccountlessApplication:
      return AccountlessApplication.fromJSON(item);
    case ObjectType.ActorToken:
      return ActorToken.fromJSON(item);
    case ObjectType.AllowlistIdentifier:
      return AllowlistIdentifier.fromJSON(item);
    case ObjectType.ApiKey:
      return APIKey.fromJSON(item);
    case ObjectType.BlocklistIdentifier:
      return BlocklistIdentifier.fromJSON(item);
    case ObjectType.Client:
      return Client.fromJSON(item);
    case ObjectType.Cookies:
      return Cookies2.fromJSON(item);
    case ObjectType.Domain:
      return Domain.fromJSON(item);
    case ObjectType.EmailAddress:
      return EmailAddress.fromJSON(item);
    case ObjectType.EnterpriseAccount:
      return EnterpriseAccount.fromJSON(item);
    case ObjectType.Email:
      return Email.fromJSON(item);
    case ObjectType.IdpOAuthAccessToken:
      return IdPOAuthAccessToken.fromJSON(item);
    case ObjectType.Instance:
      return Instance.fromJSON(item);
    case ObjectType.InstanceRestrictions:
      return InstanceRestrictions.fromJSON(item);
    case ObjectType.InstanceSettings:
      return InstanceSettings.fromJSON(item);
    case ObjectType.Invitation:
      return Invitation.fromJSON(item);
    case ObjectType.JwtTemplate:
      return JwtTemplate.fromJSON(item);
    case ObjectType.Machine:
      return Machine.fromJSON(item);
    case ObjectType.MachineScope:
      return MachineScope.fromJSON(item);
    case ObjectType.MachineSecretKey:
      return MachineSecretKey.fromJSON(item);
    case ObjectType.M2MToken:
      return M2MToken.fromJSON(item);
    case ObjectType.OauthAccessToken:
      return OauthAccessToken.fromJSON(item);
    case ObjectType.OAuthApplication:
      return OAuthApplication.fromJSON(item);
    case ObjectType.Organization:
      return Organization.fromJSON(item);
    case ObjectType.OrganizationInvitation:
      return OrganizationInvitation.fromJSON(item);
    case ObjectType.OrganizationMembership:
      return OrganizationMembership.fromJSON(item);
    case ObjectType.OrganizationSettings:
      return OrganizationSettings.fromJSON(item);
    case ObjectType.PhoneNumber:
      return PhoneNumber.fromJSON(item);
    case ObjectType.ProxyCheck:
      return ProxyCheck.fromJSON(item);
    case ObjectType.RedirectUrl:
      return RedirectUrl.fromJSON(item);
    case ObjectType.EnterpriseConnection:
      return EnterpriseConnection.fromJSON(item);
    case ObjectType.SamlConnection:
      return SamlConnection.fromJSON(item);
    case ObjectType.SignInToken:
      return SignInToken.fromJSON(item);
    case ObjectType.AgentTask:
      return AgentTask.fromJSON(item);
    case ObjectType.SignUpAttempt:
      return SignUpAttempt.fromJSON(item);
    case ObjectType.Session:
      return Session.fromJSON(item);
    case ObjectType.SmsMessage:
      return SMSMessage.fromJSON(item);
    case ObjectType.Token:
      return Token.fromJSON(item);
    case ObjectType.TotalCount:
      return getCount(item);
    case ObjectType.User:
      return User.fromJSON(item);
    case ObjectType.WaitlistEntry:
      return WaitlistEntry.fromJSON(item);
    case ObjectType.BillingPlan:
      return BillingPlan.fromJSON(item);
    case ObjectType.BillingSubscription:
      return BillingSubscription.fromJSON(item);
    case ObjectType.BillingSubscriptionItem:
      return BillingSubscriptionItem.fromJSON(item);
    case ObjectType.Feature:
      return Feature.fromJSON(item);
    default:
      return item;
  }
}
function buildRequest(options) {
  const requestFn = /* @__PURE__ */ __name(async (requestOptions) => {
    const {
      secretKey,
      machineSecretKey,
      useMachineSecretKey = false,
      requireSecretKey = true,
      apiUrl = API_URL,
      apiVersion = API_VERSION,
      userAgent = USER_AGENT,
      skipApiVersionInUrl = false
    } = options;
    const { path, method, queryParams, headerParams, bodyParams, formData, options: opts } = requestOptions;
    const { deepSnakecaseBodyParamKeys = false } = opts || {};
    if (requireSecretKey) {
      assertValidSecretKey(secretKey);
    }
    const url = skipApiVersionInUrl ? joinPaths(apiUrl, path) : joinPaths(apiUrl, apiVersion, path);
    const finalUrl = new URL(url);
    if (queryParams) {
      const snakecasedQueryParams = snakecase_keys_default({ ...queryParams });
      for (const [key, val] of Object.entries(snakecasedQueryParams)) {
        if (val) {
          [val].flat().forEach((v) => finalUrl.searchParams.append(key, v));
        }
      }
    }
    const headers = new Headers({
      "Clerk-API-Version": SUPPORTED_BAPI_VERSION,
      [constants.Headers.UserAgent]: userAgent,
      ...headerParams
    });
    const authorizationHeader = constants.Headers.Authorization;
    if (!headers.has(authorizationHeader)) {
      if (useMachineSecretKey && machineSecretKey) {
        headers.set(authorizationHeader, `Bearer ${machineSecretKey}`);
      } else if (secretKey) {
        headers.set(authorizationHeader, `Bearer ${secretKey}`);
      }
    }
    let res;
    try {
      if (formData) {
        res = await runtime.fetch(finalUrl.href, {
          method,
          headers,
          body: formData
        });
      } else {
        headers.set("Content-Type", "application/json");
        const buildBody = /* @__PURE__ */ __name(() => {
          const hasBody = method !== "GET" && bodyParams && Object.keys(bodyParams).length > 0;
          if (!hasBody) {
            return null;
          }
          const formatKeys = /* @__PURE__ */ __name((object) => snakecase_keys_default(object, { deep: deepSnakecaseBodyParamKeys }), "formatKeys");
          return {
            body: JSON.stringify(Array.isArray(bodyParams) ? bodyParams.map(formatKeys) : formatKeys(bodyParams))
          };
        }, "buildBody");
        res = await runtime.fetch(finalUrl.href, {
          method,
          headers,
          ...buildBody()
        });
      }
      const isJSONResponse = res?.headers && res.headers?.get(constants.Headers.ContentType) === constants.ContentTypes.Json;
      const responseBody = await (isJSONResponse ? res.json() : res.text());
      if (!res.ok) {
        return {
          data: null,
          errors: parseErrors2(responseBody),
          status: res?.status,
          statusText: res?.statusText,
          clerkTraceId: getTraceId(responseBody, res?.headers),
          retryAfter: getRetryAfter(res?.headers)
        };
      }
      return {
        ...deserialize(responseBody),
        errors: null
      };
    } catch (err) {
      if (err instanceof Error) {
        return {
          data: null,
          errors: [
            {
              code: "unexpected_error",
              message: err.message || "Unexpected error"
            }
          ],
          clerkTraceId: getTraceId(err, res?.headers)
        };
      }
      return {
        data: null,
        errors: parseErrors2(err),
        status: res?.status,
        statusText: res?.statusText,
        clerkTraceId: getTraceId(err, res?.headers),
        retryAfter: getRetryAfter(res?.headers)
      };
    }
  }, "requestFn");
  return withLegacyRequestReturn(requestFn);
}
function getTraceId(data, headers) {
  if (data && typeof data === "object" && "clerk_trace_id" in data && typeof data.clerk_trace_id === "string") {
    return data.clerk_trace_id;
  }
  const cfRay = headers?.get("cf-ray");
  return cfRay || "";
}
function getRetryAfter(headers) {
  const retryAfter = headers?.get("Retry-After");
  if (!retryAfter) {
    return;
  }
  const value = parseInt(retryAfter, 10);
  if (isNaN(value)) {
    return;
  }
  return value;
}
function parseErrors2(data) {
  if (!!data && typeof data === "object" && "errors" in data) {
    const errors = data.errors;
    return errors.length > 0 ? errors.map(parseError) : [];
  }
  return [];
}
function withLegacyRequestReturn(cb) {
  return async (...args) => {
    const { data, errors, totalCount, status, statusText, clerkTraceId, retryAfter } = await cb(...args);
    if (errors) {
      const error = new ClerkAPIResponseError(statusText || "", {
        data: [],
        status,
        clerkTraceId,
        retryAfter
      });
      error.errors = errors;
      throw error;
    }
    if (typeof totalCount !== "undefined") {
      return { data, totalCount };
    }
    return data;
  };
}
function createBackendApiClient(options) {
  const request = buildRequest(options);
  return {
    __experimental_accountlessApplications: new AccountlessApplicationAPI(
      buildRequest({ ...options, requireSecretKey: false })
    ),
    actorTokens: new ActorTokenAPI(request),
    /**
     * @experimental This is an experimental API for the Agent Tasks feature that is available under a private beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
     */
    agentTasks: new AgentTaskAPI(request),
    allowlistIdentifiers: new AllowlistIdentifierAPI(request),
    apiKeys: new APIKeysAPI(
      buildRequest({
        ...options,
        skipApiVersionInUrl: true
      })
    ),
    betaFeatures: new BetaFeaturesAPI(request),
    blocklistIdentifiers: new BlocklistIdentifierAPI(request),
    /**
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
     */
    billing: new BillingAPI(request),
    clients: new ClientAPI(request),
    domains: new DomainAPI(request),
    emailAddresses: new EmailAddressAPI(request),
    enterpriseConnections: new EnterpriseConnectionAPI(request),
    idPOAuthAccessToken: new IdPOAuthAccessTokenApi(
      buildRequest({
        ...options,
        skipApiVersionInUrl: true
      })
    ),
    instance: new InstanceAPI(request),
    invitations: new InvitationAPI(request),
    jwks: new JwksAPI(request),
    jwtTemplates: new JwtTemplatesApi(request),
    machines: new MachineApi(request),
    m2m: new M2MTokenApi(
      buildRequest({
        ...options,
        skipApiVersionInUrl: true,
        requireSecretKey: false,
        useMachineSecretKey: true
      }),
      {
        secretKey: options.secretKey,
        apiUrl: options.apiUrl,
        jwtKey: options.jwtKey
      }
    ),
    oauthApplications: new OAuthApplicationsApi(request),
    organizations: new OrganizationAPI(request),
    phoneNumbers: new PhoneNumberAPI(request),
    proxyChecks: new ProxyCheckAPI(request),
    redirectUrls: new RedirectUrlAPI(request),
    sessions: new SessionAPI(request),
    signInTokens: new SignInTokenAPI(request),
    signUps: new SignUpAPI(request),
    testingTokens: new TestingTokenAPI(request),
    users: new UserAPI(request),
    waitlistEntries: new WaitlistEntryAPI(request),
    webhooks: new WebhookAPI(request),
    /**
     * @deprecated Use `enterpriseConnections` instead.
     */
    samlConnections: new SamlConnectionAPI(request)
  };
}
function signedInAuthObject(authenticateContext, sessionToken, sessionClaims) {
  const { actor, sessionId, sessionStatus, userId, orgId, orgRole, orgSlug, orgPermissions, factorVerificationAge } = __experimental_JWTPayloadToAuthObjectProperties(sessionClaims);
  const apiClient = createBackendApiClient(authenticateContext);
  const getToken = createGetToken({
    sessionId,
    sessionToken,
    fetcher: /* @__PURE__ */ __name(async (sessionId2, template, expiresInSeconds) => (await apiClient.sessions.getToken(sessionId2, template || "", expiresInSeconds)).jwt, "fetcher")
  });
  return {
    tokenType: TokenType.SessionToken,
    actor,
    sessionClaims,
    sessionId,
    sessionStatus,
    userId,
    orgId,
    orgRole,
    orgSlug,
    orgPermissions,
    factorVerificationAge,
    getToken,
    has: createCheckAuthorization({
      orgId,
      orgRole,
      orgPermissions,
      userId,
      factorVerificationAge,
      features: sessionClaims.fea || "",
      plans: sessionClaims.pla || ""
    }),
    debug: createDebug({ ...authenticateContext, sessionToken }),
    isAuthenticated: true
  };
}
function signedOutAuthObject(debugData, initialSessionStatus) {
  return {
    tokenType: TokenType.SessionToken,
    sessionClaims: null,
    sessionId: null,
    sessionStatus: initialSessionStatus ?? null,
    userId: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    orgPermissions: null,
    factorVerificationAge: null,
    getToken: /* @__PURE__ */ __name(() => Promise.resolve(null), "getToken"),
    has: /* @__PURE__ */ __name(() => false, "has"),
    debug: createDebug(debugData),
    isAuthenticated: false
  };
}
function authenticatedMachineObject(tokenType, token, verificationResult, debugData) {
  const baseObject = {
    id: verificationResult.id,
    subject: verificationResult.subject,
    getToken: /* @__PURE__ */ __name(() => Promise.resolve(token), "getToken"),
    has: /* @__PURE__ */ __name(() => false, "has"),
    debug: createDebug(debugData),
    isAuthenticated: true
  };
  switch (tokenType) {
    case TokenType.ApiKey: {
      const result = verificationResult;
      return {
        ...baseObject,
        tokenType,
        name: result.name,
        claims: result.claims,
        scopes: result.scopes,
        userId: result.subject.startsWith("user_") ? result.subject : null,
        orgId: result.subject.startsWith("org_") ? result.subject : null
      };
    }
    case TokenType.M2MToken: {
      const result = verificationResult;
      return {
        ...baseObject,
        tokenType,
        claims: result.claims,
        scopes: result.scopes,
        machineId: result.subject
      };
    }
    case TokenType.OAuthToken: {
      const result = verificationResult;
      return {
        ...baseObject,
        tokenType,
        scopes: result.scopes,
        userId: result.subject,
        clientId: result.clientId
      };
    }
    default:
      throw new Error(`Invalid token type: ${tokenType}`);
  }
}
function unauthenticatedMachineObject(tokenType, debugData) {
  const baseObject = {
    id: null,
    subject: null,
    scopes: null,
    has: /* @__PURE__ */ __name(() => false, "has"),
    getToken: /* @__PURE__ */ __name(() => Promise.resolve(null), "getToken"),
    debug: createDebug(debugData),
    isAuthenticated: false
  };
  switch (tokenType) {
    case TokenType.ApiKey: {
      return {
        ...baseObject,
        tokenType,
        name: null,
        claims: null,
        scopes: null,
        userId: null,
        orgId: null
      };
    }
    case TokenType.M2MToken: {
      return {
        ...baseObject,
        tokenType,
        claims: null,
        scopes: null,
        machineId: null
      };
    }
    case TokenType.OAuthToken: {
      return {
        ...baseObject,
        tokenType,
        scopes: null,
        userId: null,
        clientId: null
      };
    }
    default:
      throw new Error(`Invalid token type: ${tokenType}`);
  }
}
function invalidTokenAuthObject() {
  return {
    isAuthenticated: false,
    tokenType: null,
    getToken: /* @__PURE__ */ __name(() => Promise.resolve(null), "getToken"),
    has: /* @__PURE__ */ __name(() => false, "has"),
    debug: /* @__PURE__ */ __name(() => ({}), "debug")
  };
}
function signedIn(params) {
  const { authenticateContext, headers = new Headers(), token } = params;
  const toAuth = /* @__PURE__ */ __name((({ treatPendingAsSignedOut = true } = {}) => {
    if (params.tokenType === TokenType.SessionToken) {
      const { sessionClaims } = params;
      const authObject = signedInAuthObject(authenticateContext, token, sessionClaims);
      if (treatPendingAsSignedOut && authObject.sessionStatus === "pending") {
        return signedOutAuthObject(void 0, authObject.sessionStatus);
      }
      return authObject;
    }
    const { machineData } = params;
    return authenticatedMachineObject(params.tokenType, token, machineData, authenticateContext);
  }), "toAuth");
  return {
    status: AuthStatus.SignedIn,
    reason: null,
    message: null,
    proxyUrl: authenticateContext.proxyUrl || "",
    publishableKey: authenticateContext.publishableKey || "",
    isSatellite: authenticateContext.isSatellite || false,
    domain: authenticateContext.domain || "",
    signInUrl: authenticateContext.signInUrl || "",
    signUpUrl: authenticateContext.signUpUrl || "",
    afterSignInUrl: authenticateContext.afterSignInUrl || "",
    afterSignUpUrl: authenticateContext.afterSignUpUrl || "",
    isSignedIn: true,
    isAuthenticated: true,
    tokenType: params.tokenType,
    toAuth,
    headers,
    token
  };
}
function signedOut(params) {
  const { authenticateContext, headers = new Headers(), reason, message = "", tokenType } = params;
  const toAuth = /* @__PURE__ */ __name((() => {
    if (tokenType === TokenType.SessionToken) {
      return signedOutAuthObject({ ...authenticateContext, status: AuthStatus.SignedOut, reason, message });
    }
    return unauthenticatedMachineObject(tokenType, { reason, message, headers });
  }), "toAuth");
  return withDebugHeaders({
    status: AuthStatus.SignedOut,
    reason,
    message,
    proxyUrl: authenticateContext.proxyUrl || "",
    publishableKey: authenticateContext.publishableKey || "",
    isSatellite: authenticateContext.isSatellite || false,
    domain: authenticateContext.domain || "",
    signInUrl: authenticateContext.signInUrl || "",
    signUpUrl: authenticateContext.signUpUrl || "",
    afterSignInUrl: authenticateContext.afterSignInUrl || "",
    afterSignUpUrl: authenticateContext.afterSignUpUrl || "",
    isSignedIn: false,
    isAuthenticated: false,
    tokenType,
    toAuth,
    headers,
    token: null
  });
}
function handshake(authenticateContext, reason, message = "", headers) {
  return withDebugHeaders({
    status: AuthStatus.Handshake,
    reason,
    message,
    publishableKey: authenticateContext.publishableKey || "",
    isSatellite: authenticateContext.isSatellite || false,
    domain: authenticateContext.domain || "",
    proxyUrl: authenticateContext.proxyUrl || "",
    signInUrl: authenticateContext.signInUrl || "",
    signUpUrl: authenticateContext.signUpUrl || "",
    afterSignInUrl: authenticateContext.afterSignInUrl || "",
    afterSignUpUrl: authenticateContext.afterSignUpUrl || "",
    isSignedIn: false,
    isAuthenticated: false,
    tokenType: TokenType.SessionToken,
    toAuth: /* @__PURE__ */ __name(() => null, "toAuth"),
    headers,
    token: null
  });
}
function signedOutInvalidToken() {
  const authObject = invalidTokenAuthObject();
  return withDebugHeaders({
    status: AuthStatus.SignedOut,
    reason: AuthErrorReason.TokenTypeMismatch,
    message: "",
    proxyUrl: "",
    publishableKey: "",
    isSatellite: false,
    domain: "",
    signInUrl: "",
    signUpUrl: "",
    afterSignInUrl: "",
    afterSignUpUrl: "",
    isSignedIn: false,
    isAuthenticated: false,
    tokenType: null,
    toAuth: /* @__PURE__ */ __name(() => authObject, "toAuth"),
    headers: new Headers(),
    token: null
  });
}
async function verifyToken(token, options) {
  const { data: decodedResult, errors } = decodeJwt(token);
  if (errors) {
    return { errors };
  }
  const { header } = decodedResult;
  const { kid } = header;
  try {
    let key;
    if (options.jwtKey) {
      key = loadClerkJwkFromPem({ kid, pem: options.jwtKey });
    } else if (options.secretKey) {
      key = await loadClerkJWKFromRemote({ ...options, kid });
    } else {
      return {
        errors: [
          new TokenVerificationError({
            action: TokenVerificationErrorAction.SetClerkJWTKey,
            message: "Failed to resolve JWK during verification.",
            reason: TokenVerificationErrorReason.JWKFailedToResolve
          })
        ]
      };
    }
    return await verifyJwt(token, { ...options, key });
  } catch (error) {
    return { errors: [error] };
  }
}
function handleClerkAPIError(tokenType, err, notFoundMessage) {
  if (isClerkAPIResponseError(err)) {
    let code;
    let message;
    switch (err.status) {
      case 401:
        code = MachineTokenVerificationErrorCode.InvalidSecretKey;
        message = err.errors[0]?.message || "Invalid secret key";
        break;
      case 404:
        code = MachineTokenVerificationErrorCode.TokenInvalid;
        message = notFoundMessage;
        break;
      default:
        code = MachineTokenVerificationErrorCode.UnexpectedError;
        message = "Unexpected error";
    }
    return {
      data: void 0,
      tokenType,
      errors: [
        new MachineTokenVerificationError({
          message,
          code,
          status: err.status
        })
      ]
    };
  }
  return {
    data: void 0,
    tokenType,
    errors: [
      new MachineTokenVerificationError({
        message: "Unexpected error",
        code: MachineTokenVerificationErrorCode.UnexpectedError,
        status: err.status
      })
    ]
  };
}
async function verifyM2MToken(token, options) {
  try {
    const client = createBackendApiClient(options);
    const verifiedToken = await client.m2m.verify({ token });
    return { data: verifiedToken, tokenType: TokenType.M2MToken, errors: void 0 };
  } catch (err) {
    return handleClerkAPIError(TokenType.M2MToken, err, "Machine token not found");
  }
}
async function verifyOAuthToken(accessToken, options) {
  try {
    const client = createBackendApiClient(options);
    const verifiedToken = await client.idPOAuthAccessToken.verify(accessToken);
    return { data: verifiedToken, tokenType: TokenType.OAuthToken, errors: void 0 };
  } catch (err) {
    return handleClerkAPIError(TokenType.OAuthToken, err, "OAuth token not found");
  }
}
async function verifyAPIKey(secret, options) {
  try {
    const client = createBackendApiClient(options);
    const verifiedToken = await client.apiKeys.verify(secret);
    return { data: verifiedToken, tokenType: TokenType.ApiKey, errors: void 0 };
  } catch (err) {
    return handleClerkAPIError(TokenType.ApiKey, err, "API key not found");
  }
}
async function verifyMachineAuthToken(token, options) {
  if (isJwtFormat(token)) {
    let decodedResult;
    try {
      const { data, errors: decodeErrors } = decodeJwt(token);
      if (decodeErrors) {
        throw decodeErrors[0];
      }
      decodedResult = data;
    } catch (e) {
      return {
        data: void 0,
        tokenType: TokenType.M2MToken,
        errors: [
          new MachineTokenVerificationError({
            code: MachineTokenVerificationErrorCode.TokenInvalid,
            message: e.message
          })
        ]
      };
    }
    if (decodedResult.payload.sub.startsWith(M2M_SUBJECT_PREFIX)) {
      return verifyM2MJwt(token, decodedResult, options);
    }
    if (OAUTH_ACCESS_TOKEN_TYPES.includes(decodedResult.header.typ)) {
      return verifyOAuthJwt(token, decodedResult, options);
    }
    return {
      data: void 0,
      tokenType: TokenType.OAuthToken,
      errors: [
        new MachineTokenVerificationError({
          code: MachineTokenVerificationErrorCode.TokenVerificationFailed,
          message: `Invalid JWT type: ${decodedResult.header.typ ?? "missing"}. Expected one of: ${OAUTH_ACCESS_TOKEN_TYPES.join(", ")} for OAuth, or sub starting with 'mch_' for M2M`
        })
      ]
    };
  }
  if (token.startsWith(M2M_TOKEN_PREFIX)) {
    return verifyM2MToken(token, options);
  }
  if (token.startsWith(OAUTH_TOKEN_PREFIX)) {
    return verifyOAuthToken(token, options);
  }
  if (token.startsWith(API_KEY_PREFIX)) {
    return verifyAPIKey(token, options);
  }
  throw new Error("Unknown machine token type");
}
async function verifyHandshakeJwt(token, { key }) {
  const { data: decoded, errors } = decodeJwt(token);
  if (errors) {
    throw errors[0];
  }
  const { header, payload } = decoded;
  const { typ, alg } = header;
  assertHeaderType(typ);
  assertHeaderAlgorithm(alg);
  const { data: signatureValid, errors: signatureErrors } = await hasValidSignature(decoded, key);
  if (signatureErrors) {
    throw new TokenVerificationError({
      reason: TokenVerificationErrorReason.TokenVerificationFailed,
      message: `Error verifying handshake token. ${signatureErrors[0]}`
    });
  }
  if (!signatureValid) {
    throw new TokenVerificationError({
      reason: TokenVerificationErrorReason.TokenInvalidSignature,
      message: "Handshake signature is invalid."
    });
  }
  return payload;
}
async function verifyHandshakeToken(token, options) {
  const { secretKey, apiUrl, apiVersion, jwksCacheTtlInMs, jwtKey, skipJwksCache } = options;
  const { data, errors } = decodeJwt(token);
  if (errors) {
    throw errors[0];
  }
  const { kid } = data.header;
  let key;
  if (jwtKey) {
    key = loadClerkJwkFromPem({ kid, pem: jwtKey });
  } else if (secretKey) {
    key = await loadClerkJWKFromRemote({ secretKey, apiUrl, apiVersion, kid, jwksCacheTtlInMs, skipJwksCache });
  } else {
    throw new TokenVerificationError({
      action: TokenVerificationErrorAction.SetClerkJWTKey,
      message: "Failed to resolve JWK during handshake verification.",
      reason: TokenVerificationErrorReason.JWKFailedToResolve
    });
  }
  return verifyHandshakeJwt(token, { key });
}
function assertSignInUrlExists(signInUrl, key) {
  if (!signInUrl && isDevelopmentFromSecretKey(key)) {
    throw new Error(`Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite`);
  }
}
function assertProxyUrlOrDomain(proxyUrlOrDomain) {
  if (!proxyUrlOrDomain) {
    throw new Error(`Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl`);
  }
}
function assertSignInUrlFormatAndOrigin(_signInUrl, origin) {
  let signInUrl;
  try {
    signInUrl = new URL(_signInUrl);
  } catch {
    throw new Error(`The signInUrl needs to have a absolute url format.`);
  }
  if (signInUrl.origin === origin) {
    throw new Error(`The signInUrl needs to be on a different origin than your satellite application.`);
  }
}
function assertMachineSecretOrSecretKey(authenticateContext) {
  if (!authenticateContext.machineSecretKey && !authenticateContext.secretKey) {
    throw new Error(
      "Machine token authentication requires either a Machine secret key or a Clerk secret key. Ensure a Clerk secret key or Machine secret key is set."
    );
  }
}
function isRequestEligibleForRefresh(err, authenticateContext, request) {
  return err.reason === TokenVerificationErrorReason.TokenExpired && !!authenticateContext.refreshTokenInCookie && request.method === "GET";
}
function checkTokenTypeMismatch(parsedTokenType, acceptsToken, authenticateContext) {
  const mismatch = !isTokenTypeAccepted(parsedTokenType, acceptsToken);
  if (mismatch) {
    const tokenTypeToReturn = typeof acceptsToken === "string" ? acceptsToken : parsedTokenType;
    return signedOut({
      tokenType: tokenTypeToReturn,
      authenticateContext,
      reason: AuthErrorReason.TokenTypeMismatch
    });
  }
  return null;
}
function isTokenTypeInAcceptedArray(acceptsToken, authenticateContext) {
  let parsedTokenType = null;
  const { tokenInHeader } = authenticateContext;
  if (tokenInHeader) {
    if (isMachineToken(tokenInHeader)) {
      parsedTokenType = getMachineTokenType(tokenInHeader);
    } else {
      parsedTokenType = TokenType.SessionToken;
    }
  }
  const typeToCheck = parsedTokenType ?? TokenType.SessionToken;
  return isTokenTypeAccepted(typeToCheck, acceptsToken);
}
function createAuthenticateRequest(params) {
  const buildTimeOptions = mergePreDefinedOptions(defaultOptions2, params.options);
  const apiClient = params.apiClient;
  const authenticateRequest2 = /* @__PURE__ */ __name((request, options = {}) => {
    const { apiUrl, apiVersion } = buildTimeOptions;
    const runTimeOptions = mergePreDefinedOptions(buildTimeOptions, options);
    return authenticateRequest(request, {
      ...options,
      ...runTimeOptions,
      // We should add all the omitted props from options here (eg apiUrl / apiVersion)
      // to avoid runtime options override them.
      apiUrl,
      apiVersion,
      apiClient
    });
  }, "authenticateRequest2");
  return {
    authenticateRequest: authenticateRequest2,
    debugRequestState
  };
}
var require_dist, API_URL, API_VERSION, USER_AGENT, MAX_CACHE_LAST_UPDATED_AT_SECONDS, SUPPORTED_BAPI_VERSION, Attributes, Cookies, QueryParameters, Headers2, ContentTypes, ClerkSyncStatus, constants, TokenType, AuthenticateContext, createAuthenticateContext, SEPARATOR, MULTIPLE_SEPARATOR_REGEX, MAX_DECODES, AbstractAPI, basePath, ActorTokenAPI, basePath2, AgentTaskAPI, basePath3, AccountlessApplicationAPI, basePath4, AllowlistIdentifierAPI, basePath5, APIKeysAPI, basePath6, BetaFeaturesAPI, basePath7, BlocklistIdentifierAPI, basePath8, ClientAPI, basePath9, DomainAPI, basePath10, EmailAddressAPI, basePath11, EnterpriseConnectionAPI, basePath12, IdPOAuthAccessTokenApi, basePath13, InstanceAPI, basePath14, InvitationAPI, basePath15, MachineApi, IdPOAuthAccessToken, M2MToken, cache, lastUpdatedAt, PEM_HEADER, PEM_TRAILER, RSA_PREFIX, RSA_SUFFIX, getErrorObjectByCode, M2M_TOKEN_PREFIX, M2M_SUBJECT_PREFIX, OAUTH_TOKEN_PREFIX, API_KEY_PREFIX, MACHINE_TOKEN_PREFIXES, JwtFormatRegExp, OAUTH_ACCESS_TOKEN_TYPES, isTokenTypeAccepted, MACHINE_TOKEN_TYPES, basePath16, _verifyOptions, _M2MTokenApi_instances, createRequestOptions_fn, verifyJwtFormat_fn, M2MTokenApi, basePath17, JwksAPI, basePath18, JwtTemplatesApi, basePath19, OrganizationAPI, basePath20, OAuthApplicationsApi, basePath21, PhoneNumberAPI, basePath22, ProxyCheckAPI, basePath23, RedirectUrlAPI, basePath24, SamlConnectionAPI, basePath25, SessionAPI, basePath26, SignInTokenAPI, basePath27, SignUpAPI, basePath28, TestingTokenAPI, basePath29, UserAPI, basePath30, WaitlistEntryAPI, basePath31, WebhookAPI, basePath32, organizationBasePath, userBasePath, BillingAPI, isObject, isObjectCustom, mapObjectSkip, _mapObject, SPLIT_LOWER_UPPER_RE, SPLIT_UPPER_UPPER_RE, SPLIT_SEPARATE_NUMBER_RE, DEFAULT_STRIP_REGEXP, SPLIT_REPLACE_VALUE, DEFAULT_PREFIX_SUFFIX_CHARACTERS, PlainObjectConstructor, snakecase_keys_default, AccountlessApplication, AgentTask, ActorToken, AllowlistIdentifier, APIKey, BlocklistIdentifier, SessionActivity, Session, Client, CnameTarget, Cookies2, DeletedObject, Domain, Email, IdentificationLink, Verification, EmailAddress, Feature, BillingPlan, BillingSubscriptionItem, BillingSubscription, EnterpriseAccountConnection, EnterpriseAccount, EnterpriseConnectionSamlConnection, EnterpriseConnectionOauthConfig, EnterpriseConnection, ExternalAccount, Instance, InstanceRestrictions, InstanceSettings, Invitation, ObjectType, JwtTemplate, Machine, MachineScope, MachineSecretKey, OauthAccessToken, OAuthApplication, Organization, OrganizationInvitation, OrganizationMembership, OrganizationMembershipPublicUserData, OrganizationSettings, PhoneNumber, ProxyCheck, RedirectUrl, SamlConnection, AttributeMapping, SignInToken, SignUpAttemptVerification, SignUpAttemptVerifications, SignUpAttempt, SMSMessage, Token, Web3Wallet, User, WaitlistEntry, createDebug, createGetToken, AuthStatus, AuthErrorReason, withDebugHeaders, import_cookie, ClerkUrl, createClerkUrl, ClerkRequest, createClerkRequest, getCookieName, getCookieValue, HandshakeService, OrganizationMatcher, RefreshTokenErrorReason, authenticateRequest, debugRequestState, convertTokenVerificationErrorReasonToAuthErrorReason, defaultOptions2;
var init_chunk_COVYMSO6 = __esm({
  "node_modules/@clerk/backend/dist/chunk-COVYMSO6.mjs"() {
    init_performance2();
    init_chunk_YBVFDYDR();
    init_chunk_J2CDX2WG();
    init_chunk_RZ7A7F6X();
    init_chunk_TOROEX6P();
    init_buildAccountsBaseUrl();
    init_buildAccountsBaseUrl();
    init_proxy();
    init_url();
    init_authorization();
    init_jwtPayloadParser();
    init_error();
    init_error();
    init_pathToRegexp();
    init_authorization_errors();
    require_dist = __commonJS({
      "../../node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js"(exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.parseCookie = parseCookie;
        exports.parse = parseCookie;
        exports.stringifyCookie = stringifyCookie;
        exports.stringifySetCookie = stringifySetCookie;
        exports.serialize = stringifySetCookie;
        exports.parseSetCookie = parseSetCookie;
        exports.stringifySetCookie = stringifySetCookie;
        exports.serialize = stringifySetCookie;
        var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
        var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
        var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
        var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
        var maxAgeRegExp = /^-?\d+$/;
        var __toString = Object.prototype.toString;
        var NullObject = /* @__PURE__ */ (() => {
          const C = /* @__PURE__ */ __name(function() {
          }, "C");
          C.prototype = /* @__PURE__ */ Object.create(null);
          return C;
        })();
        function parseCookie(str, options) {
          const obj = new NullObject();
          const len = str.length;
          if (len < 2)
            return obj;
          const dec = options?.decode || decode;
          let index = 0;
          do {
            const eqIdx = eqIndex(str, index, len);
            if (eqIdx === -1)
              break;
            const endIdx = endIndex(str, index, len);
            if (eqIdx > endIdx) {
              index = str.lastIndexOf(";", eqIdx - 1) + 1;
              continue;
            }
            const key = valueSlice(str, index, eqIdx);
            if (obj[key] === void 0) {
              obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
            }
            index = endIdx + 1;
          } while (index < len);
          return obj;
        }
        __name(parseCookie, "parseCookie");
        function stringifyCookie(cookie, options) {
          const enc = options?.encode || encodeURIComponent;
          const cookieStrings = [];
          for (const name of Object.keys(cookie)) {
            const val = cookie[name];
            if (val === void 0)
              continue;
            if (!cookieNameRegExp.test(name)) {
              throw new TypeError(`cookie name is invalid: ${name}`);
            }
            const value = enc(val);
            if (!cookieValueRegExp.test(value)) {
              throw new TypeError(`cookie val is invalid: ${val}`);
            }
            cookieStrings.push(`${name}=${value}`);
          }
          return cookieStrings.join("; ");
        }
        __name(stringifyCookie, "stringifyCookie");
        function stringifySetCookie(_name, _val, _opts) {
          const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
          const options = typeof _val === "object" ? _val : _opts;
          const enc = options?.encode || encodeURIComponent;
          if (!cookieNameRegExp.test(cookie.name)) {
            throw new TypeError(`argument name is invalid: ${cookie.name}`);
          }
          const value = cookie.value ? enc(cookie.value) : "";
          if (!cookieValueRegExp.test(value)) {
            throw new TypeError(`argument val is invalid: ${cookie.value}`);
          }
          let str = cookie.name + "=" + value;
          if (cookie.maxAge !== void 0) {
            if (!Number.isInteger(cookie.maxAge)) {
              throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
            }
            str += "; Max-Age=" + cookie.maxAge;
          }
          if (cookie.domain) {
            if (!domainValueRegExp.test(cookie.domain)) {
              throw new TypeError(`option domain is invalid: ${cookie.domain}`);
            }
            str += "; Domain=" + cookie.domain;
          }
          if (cookie.path) {
            if (!pathValueRegExp.test(cookie.path)) {
              throw new TypeError(`option path is invalid: ${cookie.path}`);
            }
            str += "; Path=" + cookie.path;
          }
          if (cookie.expires) {
            if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
              throw new TypeError(`option expires is invalid: ${cookie.expires}`);
            }
            str += "; Expires=" + cookie.expires.toUTCString();
          }
          if (cookie.httpOnly) {
            str += "; HttpOnly";
          }
          if (cookie.secure) {
            str += "; Secure";
          }
          if (cookie.partitioned) {
            str += "; Partitioned";
          }
          if (cookie.priority) {
            const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
            switch (priority) {
              case "low":
                str += "; Priority=Low";
                break;
              case "medium":
                str += "; Priority=Medium";
                break;
              case "high":
                str += "; Priority=High";
                break;
              default:
                throw new TypeError(`option priority is invalid: ${cookie.priority}`);
            }
          }
          if (cookie.sameSite) {
            const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
            switch (sameSite) {
              case true:
              case "strict":
                str += "; SameSite=Strict";
                break;
              case "lax":
                str += "; SameSite=Lax";
                break;
              case "none":
                str += "; SameSite=None";
                break;
              default:
                throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
            }
          }
          return str;
        }
        __name(stringifySetCookie, "stringifySetCookie");
        function parseSetCookie(str, options) {
          const dec = options?.decode || decode;
          const len = str.length;
          const endIdx = endIndex(str, 0, len);
          const eqIdx = eqIndex(str, 0, endIdx);
          const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
            name: valueSlice(str, 0, eqIdx),
            value: dec(valueSlice(str, eqIdx + 1, endIdx))
          };
          let index = endIdx + 1;
          while (index < len) {
            const endIdx2 = endIndex(str, index, len);
            const eqIdx2 = eqIndex(str, index, endIdx2);
            const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
            const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
            switch (attr.toLowerCase()) {
              case "httponly":
                setCookie.httpOnly = true;
                break;
              case "secure":
                setCookie.secure = true;
                break;
              case "partitioned":
                setCookie.partitioned = true;
                break;
              case "domain":
                setCookie.domain = val;
                break;
              case "path":
                setCookie.path = val;
                break;
              case "max-age":
                if (val && maxAgeRegExp.test(val))
                  setCookie.maxAge = Number(val);
                break;
              case "expires":
                if (!val)
                  break;
                const date = new Date(val);
                if (Number.isFinite(date.valueOf()))
                  setCookie.expires = date;
                break;
              case "priority":
                if (!val)
                  break;
                const priority = val.toLowerCase();
                if (priority === "low" || priority === "medium" || priority === "high") {
                  setCookie.priority = priority;
                }
                break;
              case "samesite":
                if (!val)
                  break;
                const sameSite = val.toLowerCase();
                if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
                  setCookie.sameSite = sameSite;
                }
                break;
            }
            index = endIdx2 + 1;
          }
          return setCookie;
        }
        __name(parseSetCookie, "parseSetCookie");
        function endIndex(str, min, len) {
          const index = str.indexOf(";", min);
          return index === -1 ? len : index;
        }
        __name(endIndex, "endIndex");
        function eqIndex(str, min, max) {
          const index = str.indexOf("=", min);
          return index < max ? index : -1;
        }
        __name(eqIndex, "eqIndex");
        function valueSlice(str, min, max) {
          let start = min;
          let end = max;
          do {
            const code = str.charCodeAt(start);
            if (code !== 32 && code !== 9)
              break;
          } while (++start < end);
          while (end > start) {
            const code = str.charCodeAt(end - 1);
            if (code !== 32 && code !== 9)
              break;
            end--;
          }
          return str.slice(start, end);
        }
        __name(valueSlice, "valueSlice");
        function decode(str) {
          if (str.indexOf("%") === -1)
            return str;
          try {
            return decodeURIComponent(str);
          } catch (e) {
            return str;
          }
        }
        __name(decode, "decode");
        function isDate(val) {
          return __toString.call(val) === "[object Date]";
        }
        __name(isDate, "isDate");
      }
    });
    API_URL = "https://api.clerk.com";
    API_VERSION = "v1";
    USER_AGENT = `${"@clerk/backend"}@${"3.4.14"}`;
    MAX_CACHE_LAST_UPDATED_AT_SECONDS = 5 * 60;
    SUPPORTED_BAPI_VERSION = "2025-11-10";
    Attributes = {
      AuthToken: "__clerkAuthToken",
      AuthSignature: "__clerkAuthSignature",
      AuthStatus: "__clerkAuthStatus",
      AuthReason: "__clerkAuthReason",
      AuthMessage: "__clerkAuthMessage",
      ClerkUrl: "__clerkUrl"
    };
    Cookies = {
      Session: "__session",
      Refresh: "__refresh",
      ClientUat: "__client_uat",
      Handshake: "__clerk_handshake",
      DevBrowser: "__clerk_db_jwt",
      RedirectCount: "__clerk_redirect_count",
      HandshakeNonce: "__clerk_handshake_nonce"
    };
    QueryParameters = {
      ClerkSynced: "__clerk_synced",
      SuffixedCookies: "suffixed_cookies",
      ClerkRedirectUrl: "__clerk_redirect_url",
      // use the reference to Cookies to indicate that it's the same value
      DevBrowser: Cookies.DevBrowser,
      Handshake: Cookies.Handshake,
      HandshakeHelp: "__clerk_help",
      LegacyDevBrowser: "__dev_session",
      HandshakeReason: "__clerk_hs_reason",
      HandshakeNonce: Cookies.HandshakeNonce,
      HandshakeFormat: "format",
      Session: "__session"
    };
    Headers2 = {
      Accept: "accept",
      AuthMessage: "x-clerk-auth-message",
      Authorization: "authorization",
      AuthReason: "x-clerk-auth-reason",
      AuthSignature: "x-clerk-auth-signature",
      AuthStatus: "x-clerk-auth-status",
      AuthToken: "x-clerk-auth-token",
      CacheControl: "cache-control",
      ClerkRedirectTo: "x-clerk-redirect-to",
      ClerkRequestData: "x-clerk-request-data",
      ClerkUrl: "x-clerk-clerk-url",
      CloudFrontForwardedProto: "cloudfront-forwarded-proto",
      ContentType: "content-type",
      ContentSecurityPolicy: "content-security-policy",
      ContentSecurityPolicyReportOnly: "content-security-policy-report-only",
      EnableDebug: "x-clerk-debug",
      ForwardedHost: "x-forwarded-host",
      ForwardedPort: "x-forwarded-port",
      ForwardedProto: "x-forwarded-proto",
      Host: "host",
      Location: "location",
      Nonce: "x-nonce",
      Origin: "origin",
      Referrer: "referer",
      SecFetchDest: "sec-fetch-dest",
      SecFetchSite: "sec-fetch-site",
      UserAgent: "user-agent",
      ReportingEndpoints: "reporting-endpoints"
    };
    ContentTypes = {
      Json: "application/json"
    };
    ClerkSyncStatus = {
      /** Not synced - satellite needs handshake after returning from primary sign-in */
      NeedsSync: "false",
      /** Sync completed - prevents re-sync loop after handshake completes */
      Completed: "true"
    };
    constants = {
      Attributes,
      Cookies,
      Headers: Headers2,
      ContentTypes,
      QueryParameters,
      ClerkSyncStatus
    };
    __name(mergePreDefinedOptions, "mergePreDefinedOptions");
    __name(assertValidSecretKey, "assertValidSecretKey");
    __name(assertValidPublishableKey, "assertValidPublishableKey");
    TokenType = {
      SessionToken: "session_token",
      ApiKey: "api_key",
      M2MToken: "m2m_token",
      OAuthToken: "oauth_token"
    };
    AuthenticateContext = class {
      static {
        __name(this, "AuthenticateContext");
      }
      constructor(cookieSuffix, clerkRequest, options) {
        this.cookieSuffix = cookieSuffix;
        this.clerkRequest = clerkRequest;
        this.originalFrontendApi = "";
        const autoProxyPath = getAutoProxyUrlFromEnvironment({
          publishableKey: options.publishableKey ?? "",
          hasProxyUrl: !!options.proxyUrl,
          hasDomain: !!options.domain
        });
        if (autoProxyPath) {
          options = { ...options, proxyUrl: `${clerkRequest.clerkUrl.origin}${autoProxyPath}` };
        }
        if (options.acceptsToken === TokenType.M2MToken || options.acceptsToken === TokenType.ApiKey) {
          this.initHeaderValues();
        } else {
          this.initPublishableKeyValues(options);
          this.initHeaderValues();
          this.initCookieValues();
          this.initHandshakeValues();
        }
        Object.assign(this, options);
        this.clerkUrl = this.clerkRequest.clerkUrl;
        if (this.proxyUrl?.startsWith("/")) {
          this.proxyUrl = `${this.clerkUrl.origin}${this.proxyUrl}`;
        }
      }
      /**
       * Retrieves the session token from either the cookie or the header.
       *
       * @returns {string | undefined} The session token if available, otherwise undefined.
       */
      get sessionToken() {
        return this.sessionTokenInCookie || this.tokenInHeader;
      }
      usesSuffixedCookies() {
        const suffixedClientUat = this.getSuffixedCookie(constants.Cookies.ClientUat);
        const clientUat = this.getCookie(constants.Cookies.ClientUat);
        const suffixedSession = this.getSuffixedCookie(constants.Cookies.Session) || "";
        const session = this.getCookie(constants.Cookies.Session) || "";
        if (session && !this.tokenHasIssuer(session)) {
          return false;
        }
        if (session && !this.tokenBelongsToInstance(session)) {
          return true;
        }
        if (!suffixedClientUat && !suffixedSession) {
          return false;
        }
        const { data: sessionData } = decodeJwt(session);
        const sessionIat = sessionData?.payload.iat || 0;
        const { data: suffixedSessionData } = decodeJwt(suffixedSession);
        const suffixedSessionIat = suffixedSessionData?.payload.iat || 0;
        if (suffixedClientUat !== "0" && clientUat !== "0" && sessionIat > suffixedSessionIat) {
          return false;
        }
        if (suffixedClientUat === "0" && clientUat !== "0") {
          return false;
        }
        if (this.instanceType !== "production") {
          const isSuffixedSessionExpired = this.sessionExpired(suffixedSessionData);
          if (suffixedClientUat !== "0" && clientUat === "0" && isSuffixedSessionExpired) {
            return false;
          }
        }
        if (!suffixedClientUat && suffixedSession) {
          return false;
        }
        return true;
      }
      /**
       * Determines if the request came from a different origin based on the referrer header.
       * Used for cross-origin detection in multi-domain authentication flows.
       *
       * @returns {boolean} True if referrer exists and is from a different origin, false otherwise.
       */
      isCrossOriginReferrer() {
        if (!this.referrer || !this.clerkUrl.origin) {
          return false;
        }
        try {
          const referrerOrigin = new URL(this.referrer).origin;
          return referrerOrigin !== this.clerkUrl.origin;
        } catch {
          return false;
        }
      }
      /**
       * Determines if the referrer URL is from a Clerk domain (accounts portal or FAPI).
       * This includes both development and production account portal domains, as well as FAPI domains
       * used for redirect-based authentication flows.
       *
       * @returns {boolean} True if the referrer is from a Clerk accounts portal or FAPI domain, false otherwise
       */
      isKnownClerkReferrer() {
        if (!this.referrer) {
          return false;
        }
        try {
          const referrerOrigin = new URL(this.referrer);
          const referrerHost = referrerOrigin.hostname;
          if (this.frontendApi) {
            const fapiHost = this.frontendApi.startsWith("http") ? new URL(this.frontendApi).hostname : this.frontendApi;
            if (referrerHost === fapiHost) {
              return true;
            }
          }
          if (isLegacyDevAccountPortalOrigin(referrerHost) || isCurrentDevAccountPortalOrigin(referrerHost)) {
            return true;
          }
          const expectedAccountsUrl = buildAccountsBaseUrl(this.frontendApi);
          if (expectedAccountsUrl) {
            const expectedAccountsOrigin = new URL(expectedAccountsUrl).origin;
            if (referrerOrigin.origin === expectedAccountsOrigin) {
              return true;
            }
          }
          if (referrerHost.startsWith("accounts.")) {
            return true;
          }
          return false;
        } catch {
          return false;
        }
      }
      initPublishableKeyValues(options) {
        assertValidPublishableKey(options.publishableKey);
        this.publishableKey = options.publishableKey;
        let resolvedProxyUrl = options.proxyUrl;
        if (resolvedProxyUrl?.startsWith("/")) {
          resolvedProxyUrl = `${this.clerkRequest.clerkUrl.origin}${resolvedProxyUrl}`;
        }
        const originalPk = parsePublishableKey(this.publishableKey, {
          fatal: true,
          domain: options.domain,
          isSatellite: options.isSatellite
        });
        this.originalFrontendApi = originalPk.frontendApi;
        const pk = parsePublishableKey(this.publishableKey, {
          fatal: true,
          proxyUrl: resolvedProxyUrl,
          domain: options.domain,
          isSatellite: options.isSatellite
        });
        this.instanceType = pk.instanceType;
        this.frontendApi = pk.frontendApi;
      }
      initHeaderValues() {
        this.method = this.clerkRequest.method;
        this.tokenInHeader = this.parseAuthorizationHeader(this.getHeader(constants.Headers.Authorization));
        this.origin = this.getHeader(constants.Headers.Origin);
        this.host = this.getHeader(constants.Headers.Host);
        this.forwardedHost = this.getHeader(constants.Headers.ForwardedHost);
        this.forwardedProto = this.getHeader(constants.Headers.CloudFrontForwardedProto) || this.getHeader(constants.Headers.ForwardedProto);
        this.referrer = this.getHeader(constants.Headers.Referrer);
        this.userAgent = this.getHeader(constants.Headers.UserAgent);
        this.secFetchDest = this.getHeader(constants.Headers.SecFetchDest);
        this.accept = this.getHeader(constants.Headers.Accept);
      }
      initCookieValues() {
        this.sessionTokenInCookie = this.getSuffixedOrUnSuffixedCookie(constants.Cookies.Session);
        this.refreshTokenInCookie = this.getSuffixedCookie(constants.Cookies.Refresh);
        this.clientUat = Number.parseInt(this.getSuffixedOrUnSuffixedCookie(constants.Cookies.ClientUat) || "") || 0;
      }
      initHandshakeValues() {
        this.devBrowserToken = this.getQueryParam(constants.QueryParameters.DevBrowser) || this.getSuffixedOrUnSuffixedCookie(constants.Cookies.DevBrowser);
        this.handshakeToken = this.getQueryParam(constants.QueryParameters.Handshake) || this.getCookie(constants.Cookies.Handshake);
        this.handshakeRedirectLoopCounter = Number(this.getCookie(constants.Cookies.RedirectCount)) || 0;
        this.handshakeNonce = this.getQueryParam(constants.QueryParameters.HandshakeNonce) || this.getCookie(constants.Cookies.HandshakeNonce);
      }
      getQueryParam(name) {
        return this.clerkRequest.clerkUrl.searchParams.get(name);
      }
      getHeader(name) {
        return this.clerkRequest.headers.get(name) || void 0;
      }
      getCookie(name) {
        return this.clerkRequest.cookies.get(name) || void 0;
      }
      getSuffixedCookie(name) {
        return this.getCookie(getSuffixedCookieName(name, this.cookieSuffix)) || void 0;
      }
      getSuffixedOrUnSuffixedCookie(cookieName) {
        if (this.usesSuffixedCookies()) {
          return this.getSuffixedCookie(cookieName);
        }
        return this.getCookie(cookieName);
      }
      parseAuthorizationHeader(authorizationHeader) {
        if (!authorizationHeader) {
          return void 0;
        }
        const [scheme, token] = authorizationHeader.split(" ", 2);
        if (!token) {
          return scheme;
        }
        if (scheme === "Bearer") {
          return token;
        }
        return void 0;
      }
      tokenHasIssuer(token) {
        const { data, errors } = decodeJwt(token);
        if (errors) {
          return false;
        }
        return !!data.payload.iss;
      }
      tokenBelongsToInstance(token) {
        if (!token) {
          return false;
        }
        const { data, errors } = decodeJwt(token);
        if (errors) {
          return false;
        }
        const tokenIssuer = data.payload.iss.replace(/https?:\/\//gi, "");
        return this.originalFrontendApi === tokenIssuer;
      }
      sessionExpired(jwt) {
        return !!jwt && jwt?.payload.exp <= Date.now() / 1e3 >> 0;
      }
    };
    createAuthenticateContext = /* @__PURE__ */ __name(async (clerkRequest, options) => {
      const cookieSuffix = options.publishableKey ? await getCookieSuffix(options.publishableKey, runtime.crypto.subtle) : "";
      return new AuthenticateContext(cookieSuffix, clerkRequest, options);
    }, "createAuthenticateContext");
    SEPARATOR = "/";
    MULTIPLE_SEPARATOR_REGEX = new RegExp("(?<!:)" + SEPARATOR + "{1,}", "g");
    MAX_DECODES = 10;
    __name(isDotSegment, "isDotSegment");
    __name(joinPaths, "joinPaths");
    AbstractAPI = class {
      static {
        __name(this, "AbstractAPI");
      }
      constructor(request) {
        this.request = request;
      }
      requireId(id) {
        if (!id) {
          throw new Error("A valid resource ID is required.");
        }
      }
    };
    basePath = "/actor_tokens";
    ActorTokenAPI = class extends AbstractAPI {
      static {
        __name(this, "ActorTokenAPI");
      }
      async create(params) {
        return this.request({
          method: "POST",
          path: basePath,
          bodyParams: params
        });
      }
      async revoke(actorTokenId) {
        this.requireId(actorTokenId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath, actorTokenId, "revoke")
        });
      }
    };
    basePath2 = "/agents/tasks";
    AgentTaskAPI = class extends AbstractAPI {
      static {
        __name(this, "AgentTaskAPI");
      }
      async create(params) {
        return this.request({
          method: "POST",
          path: basePath2,
          bodyParams: params,
          options: {
            deepSnakecaseBodyParamKeys: true
          }
        });
      }
      async revoke(agentTaskId) {
        this.requireId(agentTaskId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath2, agentTaskId, "revoke")
        });
      }
    };
    basePath3 = "/accountless_applications";
    AccountlessApplicationAPI = class extends AbstractAPI {
      static {
        __name(this, "AccountlessApplicationAPI");
      }
      async createAccountlessApplication(params) {
        const headerParams = params?.requestHeaders ? Object.fromEntries(params.requestHeaders.entries()) : void 0;
        return this.request({
          method: "POST",
          path: basePath3,
          headerParams
        });
      }
      async completeAccountlessApplicationOnboarding(params) {
        const headerParams = params?.requestHeaders ? Object.fromEntries(params.requestHeaders.entries()) : void 0;
        return this.request({
          method: "POST",
          path: joinPaths(basePath3, "complete"),
          headerParams
        });
      }
    };
    basePath4 = "/allowlist_identifiers";
    AllowlistIdentifierAPI = class extends AbstractAPI {
      static {
        __name(this, "AllowlistIdentifierAPI");
      }
      async getAllowlistIdentifierList(params = {}) {
        return this.request({
          method: "GET",
          path: basePath4,
          queryParams: { ...params, paginated: true }
        });
      }
      async createAllowlistIdentifier(params) {
        return this.request({
          method: "POST",
          path: basePath4,
          bodyParams: params
        });
      }
      async deleteAllowlistIdentifier(allowlistIdentifierId) {
        this.requireId(allowlistIdentifierId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath4, allowlistIdentifierId)
        });
      }
    };
    basePath5 = "/api_keys";
    APIKeysAPI = class extends AbstractAPI {
      static {
        __name(this, "APIKeysAPI");
      }
      async list(queryParams) {
        return this.request({
          method: "GET",
          path: basePath5,
          queryParams
        });
      }
      async create(params) {
        return this.request({
          method: "POST",
          path: basePath5,
          bodyParams: params
        });
      }
      async get(apiKeyId) {
        this.requireId(apiKeyId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath5, apiKeyId)
        });
      }
      async update(params) {
        const { apiKeyId, ...bodyParams } = params;
        this.requireId(apiKeyId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath5, apiKeyId),
          bodyParams
        });
      }
      async delete(apiKeyId) {
        this.requireId(apiKeyId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath5, apiKeyId)
        });
      }
      async revoke(params) {
        const { apiKeyId, revocationReason = null } = params;
        this.requireId(apiKeyId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath5, apiKeyId, "revoke"),
          bodyParams: { revocationReason }
        });
      }
      async getSecret(apiKeyId) {
        this.requireId(apiKeyId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath5, apiKeyId, "secret")
        });
      }
      async verify(secret) {
        return this.request({
          method: "POST",
          path: joinPaths(basePath5, "verify"),
          bodyParams: { secret }
        });
      }
    };
    basePath6 = "/beta_features";
    BetaFeaturesAPI = class extends AbstractAPI {
      static {
        __name(this, "BetaFeaturesAPI");
      }
      /**
       * Change the domain of a production instance.
       *
       * Changing the domain requires updating the DNS records accordingly, deploying new SSL certificates,
       * updating your Social Connection's redirect URLs and setting the new keys in your code.
       *
       * @remarks
       * WARNING: Changing your domain will invalidate all current user sessions (i.e. users will be logged out).
       *          Also, while your application is being deployed, a small downtime is expected to occur.
       */
      async changeDomain(params) {
        return this.request({
          method: "POST",
          path: joinPaths(basePath6, "change_domain"),
          bodyParams: params
        });
      }
    };
    basePath7 = "/blocklist_identifiers";
    BlocklistIdentifierAPI = class extends AbstractAPI {
      static {
        __name(this, "BlocklistIdentifierAPI");
      }
      async getBlocklistIdentifierList(params = {}) {
        return this.request({
          method: "GET",
          path: basePath7,
          queryParams: params
        });
      }
      async createBlocklistIdentifier(params) {
        return this.request({
          method: "POST",
          path: basePath7,
          bodyParams: params
        });
      }
      async deleteBlocklistIdentifier(blocklistIdentifierId) {
        this.requireId(blocklistIdentifierId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath7, blocklistIdentifierId)
        });
      }
    };
    basePath8 = "/clients";
    ClientAPI = class extends AbstractAPI {
      static {
        __name(this, "ClientAPI");
      }
      async getClientList(params = {}) {
        return this.request({
          method: "GET",
          path: basePath8,
          queryParams: { ...params, paginated: true }
        });
      }
      async getClient(clientId) {
        this.requireId(clientId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath8, clientId)
        });
      }
      verifyClient(token) {
        return this.request({
          method: "POST",
          path: joinPaths(basePath8, "verify"),
          bodyParams: { token }
        });
      }
      async getHandshakePayload(queryParams) {
        return this.request({
          method: "GET",
          path: joinPaths(basePath8, "handshake_payload"),
          queryParams
        });
      }
    };
    basePath9 = "/domains";
    DomainAPI = class extends AbstractAPI {
      static {
        __name(this, "DomainAPI");
      }
      async list() {
        return this.request({
          method: "GET",
          path: basePath9
        });
      }
      async add(params) {
        return this.request({
          method: "POST",
          path: basePath9,
          bodyParams: params
        });
      }
      async update(params) {
        const { domainId, ...bodyParams } = params;
        this.requireId(domainId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath9, domainId),
          bodyParams
        });
      }
      /**
       * Deletes a satellite domain for the instance.
       * It is currently not possible to delete the instance's primary domain.
       */
      async delete(satelliteDomainId) {
        return this.deleteDomain(satelliteDomainId);
      }
      /**
       * @deprecated Use `delete` instead
       */
      async deleteDomain(satelliteDomainId) {
        this.requireId(satelliteDomainId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath9, satelliteDomainId)
        });
      }
    };
    basePath10 = "/email_addresses";
    EmailAddressAPI = class extends AbstractAPI {
      static {
        __name(this, "EmailAddressAPI");
      }
      async getEmailAddress(emailAddressId) {
        this.requireId(emailAddressId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath10, emailAddressId)
        });
      }
      async createEmailAddress(params) {
        return this.request({
          method: "POST",
          path: basePath10,
          bodyParams: params
        });
      }
      async updateEmailAddress(emailAddressId, params = {}) {
        this.requireId(emailAddressId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath10, emailAddressId),
          bodyParams: params
        });
      }
      async deleteEmailAddress(emailAddressId) {
        this.requireId(emailAddressId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath10, emailAddressId)
        });
      }
    };
    basePath11 = "/enterprise_connections";
    EnterpriseConnectionAPI = class extends AbstractAPI {
      static {
        __name(this, "EnterpriseConnectionAPI");
      }
      async createEnterpriseConnection(params) {
        return this.request({
          method: "POST",
          path: basePath11,
          bodyParams: params,
          options: {
            deepSnakecaseBodyParamKeys: true
          }
        });
      }
      async updateEnterpriseConnection(enterpriseConnectionId, params) {
        this.requireId(enterpriseConnectionId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath11, enterpriseConnectionId),
          bodyParams: params,
          options: {
            deepSnakecaseBodyParamKeys: true
          }
        });
      }
      async getEnterpriseConnectionList(params = {}) {
        return this.request({
          method: "GET",
          path: basePath11,
          queryParams: params
        });
      }
      async getEnterpriseConnection(enterpriseConnectionId) {
        this.requireId(enterpriseConnectionId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath11, enterpriseConnectionId)
        });
      }
      async deleteEnterpriseConnection(enterpriseConnectionId) {
        this.requireId(enterpriseConnectionId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath11, enterpriseConnectionId)
        });
      }
    };
    basePath12 = "/oauth_applications/access_tokens";
    IdPOAuthAccessTokenApi = class extends AbstractAPI {
      static {
        __name(this, "IdPOAuthAccessTokenApi");
      }
      async verify(accessToken) {
        return this.request({
          method: "POST",
          path: joinPaths(basePath12, "verify"),
          bodyParams: { access_token: accessToken }
        });
      }
    };
    basePath13 = "/instance";
    InstanceAPI = class extends AbstractAPI {
      static {
        __name(this, "InstanceAPI");
      }
      async get() {
        return this.request({
          method: "GET",
          path: basePath13
        });
      }
      async update(params) {
        return this.request({
          method: "PATCH",
          path: basePath13,
          bodyParams: params
        });
      }
      async updateRestrictions(params) {
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath13, "restrictions"),
          bodyParams: params
        });
      }
      async getOrganizationSettings() {
        return this.request({
          method: "GET",
          path: joinPaths(basePath13, "organization_settings")
        });
      }
      async updateOrganizationSettings(params) {
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath13, "organization_settings"),
          bodyParams: params
        });
      }
    };
    basePath14 = "/invitations";
    InvitationAPI = class extends AbstractAPI {
      static {
        __name(this, "InvitationAPI");
      }
      async getInvitationList(params = {}) {
        return this.request({
          method: "GET",
          path: basePath14,
          queryParams: { ...params, paginated: true }
        });
      }
      async createInvitation(params) {
        return this.request({
          method: "POST",
          path: basePath14,
          bodyParams: params
        });
      }
      async createInvitationBulk(params) {
        return this.request({
          method: "POST",
          path: joinPaths(basePath14, "bulk"),
          bodyParams: params
        });
      }
      async revokeInvitation(invitationId) {
        this.requireId(invitationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath14, invitationId, "revoke")
        });
      }
    };
    basePath15 = "/machines";
    MachineApi = class extends AbstractAPI {
      static {
        __name(this, "MachineApi");
      }
      async get(machineId) {
        this.requireId(machineId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath15, machineId)
        });
      }
      async list(queryParams = {}) {
        return this.request({
          method: "GET",
          path: basePath15,
          queryParams
        });
      }
      async create(bodyParams) {
        return this.request({
          method: "POST",
          path: basePath15,
          bodyParams
        });
      }
      async update(params) {
        const { machineId, ...bodyParams } = params;
        this.requireId(machineId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath15, machineId),
          bodyParams
        });
      }
      async delete(machineId) {
        this.requireId(machineId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath15, machineId)
        });
      }
      async getSecretKey(machineId) {
        this.requireId(machineId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath15, machineId, "secret_key")
        });
      }
      async rotateSecretKey(params) {
        const { machineId, previousTokenTtl } = params;
        this.requireId(machineId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath15, machineId, "secret_key", "rotate"),
          bodyParams: {
            previousTokenTtl
          }
        });
      }
      /**
       * Creates a new machine scope, allowing the specified machine to access another machine.
       *
       * @param machineId - The ID of the machine that will have access to another machine.
       * @param toMachineId - The ID of the machine that will be scoped to the current machine.
       */
      async createScope(machineId, toMachineId) {
        this.requireId(machineId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath15, machineId, "scopes"),
          bodyParams: {
            toMachineId
          }
        });
      }
      /**
       * Deletes a machine scope, removing access from one machine to another.
       *
       * @param machineId - The ID of the machine that has access to another machine.
       * @param otherMachineId - The ID of the machine that is being accessed.
       */
      async deleteScope(machineId, otherMachineId) {
        this.requireId(machineId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath15, machineId, "scopes", otherMachineId)
        });
      }
    };
    IdPOAuthAccessToken = class _IdPOAuthAccessToken {
      static {
        __name(this, "_IdPOAuthAccessToken");
      }
      constructor(id, clientId, type, subject, scopes, revoked, revocationReason, expired, expiration, createdAt, updatedAt) {
        this.id = id;
        this.clientId = clientId;
        this.type = type;
        this.subject = subject;
        this.scopes = scopes;
        this.revoked = revoked;
        this.revocationReason = revocationReason;
        this.expired = expired;
        this.expiration = expiration;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _IdPOAuthAccessToken(
          data.id,
          data.client_id,
          data.type,
          data.subject,
          data.scopes,
          data.revoked,
          data.revocation_reason,
          data.expired,
          data.expiration,
          data.created_at,
          data.updated_at
        );
      }
      /**
       * Creates an IdPOAuthAccessToken from a JWT payload.
       * Maps standard JWT claims and OAuth-specific fields to token properties.
       */
      static fromJwtPayload(payload, clockSkewInMs = 5e3) {
        const oauthPayload = payload;
        return new _IdPOAuthAccessToken(
          oauthPayload.jti ?? "",
          oauthPayload.client_id ?? "",
          "oauth_token",
          payload.sub,
          oauthPayload.scp ?? oauthPayload.scope?.split(" ") ?? [],
          false,
          null,
          payload.exp * 1e3 <= Date.now() - clockSkewInMs,
          payload.exp,
          payload.iat,
          payload.iat
        );
      }
    };
    M2MToken = class _M2MToken {
      static {
        __name(this, "_M2MToken");
      }
      constructor(id, subject, scopes, claims, revoked, revocationReason, expired, expiration, createdAt, updatedAt, token) {
        this.id = id;
        this.subject = subject;
        this.scopes = scopes;
        this.claims = claims;
        this.revoked = revoked;
        this.revocationReason = revocationReason;
        this.expired = expired;
        this.expiration = expiration;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.token = token;
      }
      static fromJSON(data) {
        return new _M2MToken(
          data.id,
          data.subject,
          data.scopes,
          data.claims,
          data.revoked,
          data.revocation_reason,
          data.expired,
          data.expiration,
          data.created_at,
          data.updated_at,
          data.token
        );
      }
      static fromJwtPayload(payload, clockSkewInMs = 5e3) {
        return new _M2MToken(
          payload.jti ?? "",
          // jti should always be present in Clerk-issued M2M JWTs
          payload.sub,
          payload.scopes?.split(" ") ?? payload.aud ?? [],
          null,
          false,
          null,
          payload.exp * 1e3 <= Date.now() - clockSkewInMs,
          payload.exp * 1e3,
          // milliseconds — expiration, converted from JWT exp claim
          payload.iat * 1e3,
          // milliseconds — createdAt, converted from JWT iat claim
          payload.iat * 1e3
          // milliseconds — updatedAt, no JWT equivalent; defaults to iat
        );
      }
    };
    cache = {};
    lastUpdatedAt = 0;
    __name(getFromCache, "getFromCache");
    __name(getCacheValues, "getCacheValues");
    __name(setInCache, "setInCache");
    PEM_HEADER = "-----BEGIN PUBLIC KEY-----";
    PEM_TRAILER = "-----END PUBLIC KEY-----";
    RSA_PREFIX = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA";
    RSA_SUFFIX = "IDAQAB";
    __name(loadClerkJwkFromPem, "loadClerkJwkFromPem");
    __name(loadClerkJWKFromRemote, "loadClerkJWKFromRemote");
    __name(fetchJWKSFromBAPI, "fetchJWKSFromBAPI");
    __name(cacheHasExpired, "cacheHasExpired");
    getErrorObjectByCode = /* @__PURE__ */ __name((errors, code) => {
      if (!errors) {
        return null;
      }
      return errors.find((err) => err.code === code);
    }, "getErrorObjectByCode");
    M2M_TOKEN_PREFIX = "mt_";
    M2M_SUBJECT_PREFIX = "mch_";
    OAUTH_TOKEN_PREFIX = "oat_";
    API_KEY_PREFIX = "ak_";
    MACHINE_TOKEN_PREFIXES = [M2M_TOKEN_PREFIX, OAUTH_TOKEN_PREFIX, API_KEY_PREFIX];
    JwtFormatRegExp = /^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/;
    __name(isJwtFormat, "isJwtFormat");
    OAUTH_ACCESS_TOKEN_TYPES = ["at+jwt", "application/at+jwt"];
    __name(isOAuthJwt, "isOAuthJwt");
    __name(isM2MJwt, "isM2MJwt");
    __name(isMachineJwt, "isMachineJwt");
    __name(isMachineTokenByPrefix, "isMachineTokenByPrefix");
    __name(isMachineToken, "isMachineToken");
    __name(getMachineTokenType, "getMachineTokenType");
    isTokenTypeAccepted = /* @__PURE__ */ __name((tokenType, acceptsToken) => {
      if (!tokenType) {
        return false;
      }
      if (acceptsToken === "any") {
        return true;
      }
      const tokenTypes = Array.isArray(acceptsToken) ? acceptsToken : [acceptsToken];
      return tokenTypes.includes(tokenType);
    }, "isTokenTypeAccepted");
    MACHINE_TOKEN_TYPES = /* @__PURE__ */ new Set([TokenType.ApiKey, TokenType.M2MToken, TokenType.OAuthToken]);
    __name(resolveKeyAndVerifyJwt, "resolveKeyAndVerifyJwt");
    __name(verifyM2MJwt, "verifyM2MJwt");
    __name(verifyOAuthJwt, "verifyOAuthJwt");
    basePath16 = "/m2m_tokens";
    M2MTokenApi = class extends AbstractAPI {
      static {
        __name(this, "M2MTokenApi");
      }
      /**
       * @param verifyOptions - JWT verification options (secretKey, apiUrl, etc.).
       * Passed explicitly because BuildRequestOptions are captured inside the buildRequest closure
       * and are not accessible from the RequestFunction itself.
       */
      constructor(request, verifyOptions = {}) {
        super(request);
        __privateAdd(this, _M2MTokenApi_instances);
        __privateAdd(this, _verifyOptions);
        __privateSet(this, _verifyOptions, verifyOptions);
      }
      async list(queryParams) {
        const { machineSecretKey, ...params } = queryParams;
        const requestOptions = __privateMethod(this, _M2MTokenApi_instances, createRequestOptions_fn).call(this, {
          method: "GET",
          path: basePath16,
          queryParams: params
        }, machineSecretKey);
        return this.request(requestOptions);
      }
      async createToken(params) {
        const {
          claims = null,
          machineSecretKey,
          minRemainingTtlSeconds,
          secondsUntilExpiration = null,
          tokenFormat = "opaque"
        } = params || {};
        const requestOptions = __privateMethod(this, _M2MTokenApi_instances, createRequestOptions_fn).call(this, {
          method: "POST",
          path: basePath16,
          bodyParams: {
            secondsUntilExpiration,
            claims,
            minRemainingTtlSeconds,
            tokenFormat
          }
        }, machineSecretKey);
        return this.request(requestOptions);
      }
      async revokeToken(params) {
        const { m2mTokenId, revocationReason = null, machineSecretKey } = params;
        this.requireId(m2mTokenId);
        const requestOptions = __privateMethod(this, _M2MTokenApi_instances, createRequestOptions_fn).call(this, {
          method: "POST",
          path: joinPaths(basePath16, m2mTokenId, "revoke"),
          bodyParams: {
            revocationReason
          }
        }, machineSecretKey);
        return this.request(requestOptions);
      }
      async verify(params) {
        const { token, machineSecretKey } = params;
        if (isM2MJwt(token)) {
          return __privateMethod(this, _M2MTokenApi_instances, verifyJwtFormat_fn).call(this, token);
        }
        const requestOptions = __privateMethod(this, _M2MTokenApi_instances, createRequestOptions_fn).call(this, {
          method: "POST",
          path: joinPaths(basePath16, "verify"),
          bodyParams: { token }
        }, machineSecretKey);
        return this.request(requestOptions);
      }
    };
    _verifyOptions = /* @__PURE__ */ new WeakMap();
    _M2MTokenApi_instances = /* @__PURE__ */ new WeakSet();
    createRequestOptions_fn = /* @__PURE__ */ __name(function(options, machineSecretKey) {
      if (machineSecretKey) {
        return {
          ...options,
          headerParams: {
            ...options.headerParams,
            Authorization: `Bearer ${machineSecretKey}`
          }
        };
      }
      return options;
    }, "createRequestOptions_fn");
    verifyJwtFormat_fn = /* @__PURE__ */ __name(async function(token) {
      let decoded;
      try {
        const { data, errors } = decodeJwt(token);
        if (errors) {
          throw errors[0];
        }
        decoded = data;
      } catch (e) {
        throw new MachineTokenVerificationError({
          code: MachineTokenVerificationErrorCode.TokenInvalid,
          message: e.message
        });
      }
      const result = await verifyM2MJwt(token, decoded, __privateGet(this, _verifyOptions));
      if (result.errors) {
        throw result.errors[0];
      }
      return result.data;
    }, "verifyJwtFormat_fn");
    basePath17 = "/jwks";
    JwksAPI = class extends AbstractAPI {
      static {
        __name(this, "JwksAPI");
      }
      async getJwks() {
        return this.request({
          method: "GET",
          path: basePath17
        });
      }
    };
    basePath18 = "/jwt_templates";
    JwtTemplatesApi = class extends AbstractAPI {
      static {
        __name(this, "JwtTemplatesApi");
      }
      async list(params = {}) {
        return this.request({
          method: "GET",
          path: basePath18,
          queryParams: { ...params, paginated: true }
        });
      }
      async get(templateId) {
        this.requireId(templateId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath18, templateId)
        });
      }
      async create(params) {
        return this.request({
          method: "POST",
          path: basePath18,
          bodyParams: params
        });
      }
      async update(params) {
        const { templateId, ...bodyParams } = params;
        this.requireId(templateId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath18, templateId),
          bodyParams
        });
      }
      async delete(templateId) {
        this.requireId(templateId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath18, templateId)
        });
      }
    };
    basePath19 = "/organizations";
    OrganizationAPI = class extends AbstractAPI {
      static {
        __name(this, "OrganizationAPI");
      }
      async getOrganizationList(params) {
        return this.request({
          method: "GET",
          path: basePath19,
          queryParams: params
        });
      }
      async createOrganization(params) {
        return this.request({
          method: "POST",
          path: basePath19,
          bodyParams: params
        });
      }
      async getOrganization(params) {
        const { includeMembersCount } = params;
        const organizationIdOrSlug = "organizationId" in params ? params.organizationId : params.slug;
        this.requireId(organizationIdOrSlug);
        return this.request({
          method: "GET",
          path: joinPaths(basePath19, organizationIdOrSlug),
          queryParams: {
            includeMembersCount
          }
        });
      }
      async updateOrganization(organizationId, params) {
        this.requireId(organizationId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath19, organizationId),
          bodyParams: params
        });
      }
      async updateOrganizationLogo(organizationId, params) {
        this.requireId(organizationId);
        const formData = new runtime.FormData();
        formData.append("file", params?.file);
        if (params?.uploaderUserId) {
          formData.append("uploader_user_id", params?.uploaderUserId);
        }
        return this.request({
          method: "PUT",
          path: joinPaths(basePath19, organizationId, "logo"),
          formData
        });
      }
      async deleteOrganizationLogo(organizationId) {
        this.requireId(organizationId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath19, organizationId, "logo")
        });
      }
      async updateOrganizationMetadata(organizationId, params) {
        this.requireId(organizationId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath19, organizationId, "metadata"),
          bodyParams: params
        });
      }
      async deleteOrganization(organizationId) {
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath19, organizationId)
        });
      }
      async getOrganizationMembershipList(params) {
        const { organizationId, ...queryParams } = params;
        this.requireId(organizationId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath19, organizationId, "memberships"),
          queryParams
        });
      }
      async getInstanceOrganizationMembershipList(params) {
        return this.request({
          method: "GET",
          path: "/organization_memberships",
          queryParams: params
        });
      }
      async createOrganizationMembership(params) {
        const { organizationId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath19, organizationId, "memberships"),
          bodyParams
        });
      }
      async updateOrganizationMembership(params) {
        const { organizationId, userId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath19, organizationId, "memberships", userId),
          bodyParams
        });
      }
      async updateOrganizationMembershipMetadata(params) {
        const { organizationId, userId, ...bodyParams } = params;
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath19, organizationId, "memberships", userId, "metadata"),
          bodyParams
        });
      }
      async deleteOrganizationMembership(params) {
        const { organizationId, userId } = params;
        this.requireId(organizationId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath19, organizationId, "memberships", userId)
        });
      }
      async getOrganizationInvitationList(params) {
        const { organizationId, ...queryParams } = params;
        this.requireId(organizationId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath19, organizationId, "invitations"),
          queryParams
        });
      }
      async createOrganizationInvitation(params) {
        const { organizationId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath19, organizationId, "invitations"),
          bodyParams
        });
      }
      async createOrganizationInvitationBulk(organizationId, params) {
        this.requireId(organizationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath19, organizationId, "invitations", "bulk"),
          bodyParams: params
        });
      }
      async getOrganizationInvitation(params) {
        const { organizationId, invitationId } = params;
        this.requireId(organizationId);
        this.requireId(invitationId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath19, organizationId, "invitations", invitationId)
        });
      }
      async revokeOrganizationInvitation(params) {
        const { organizationId, invitationId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath19, organizationId, "invitations", invitationId, "revoke"),
          bodyParams
        });
      }
      async getOrganizationDomainList(params) {
        const { organizationId, ...queryParams } = params;
        this.requireId(organizationId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath19, organizationId, "domains"),
          queryParams
        });
      }
      async createOrganizationDomain(params) {
        const { organizationId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath19, organizationId, "domains"),
          bodyParams: {
            ...bodyParams,
            verified: bodyParams.verified ?? true
          }
        });
      }
      async updateOrganizationDomain(params) {
        const { organizationId, domainId, ...bodyParams } = params;
        this.requireId(organizationId);
        this.requireId(domainId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath19, organizationId, "domains", domainId),
          bodyParams
        });
      }
      async deleteOrganizationDomain(params) {
        const { organizationId, domainId } = params;
        this.requireId(organizationId);
        this.requireId(domainId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath19, organizationId, "domains", domainId)
        });
      }
    };
    basePath20 = "/oauth_applications";
    OAuthApplicationsApi = class extends AbstractAPI {
      static {
        __name(this, "OAuthApplicationsApi");
      }
      async list(params = {}) {
        return this.request({
          method: "GET",
          path: basePath20,
          queryParams: params
        });
      }
      async get(oauthApplicationId) {
        this.requireId(oauthApplicationId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath20, oauthApplicationId)
        });
      }
      async create(params) {
        return this.request({
          method: "POST",
          path: basePath20,
          bodyParams: params
        });
      }
      async update(params) {
        const { oauthApplicationId, ...bodyParams } = params;
        this.requireId(oauthApplicationId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath20, oauthApplicationId),
          bodyParams
        });
      }
      async delete(oauthApplicationId) {
        this.requireId(oauthApplicationId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath20, oauthApplicationId)
        });
      }
      async rotateSecret(oauthApplicationId) {
        this.requireId(oauthApplicationId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath20, oauthApplicationId, "rotate_secret")
        });
      }
    };
    basePath21 = "/phone_numbers";
    PhoneNumberAPI = class extends AbstractAPI {
      static {
        __name(this, "PhoneNumberAPI");
      }
      async getPhoneNumber(phoneNumberId) {
        this.requireId(phoneNumberId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath21, phoneNumberId)
        });
      }
      async createPhoneNumber(params) {
        return this.request({
          method: "POST",
          path: basePath21,
          bodyParams: params
        });
      }
      async updatePhoneNumber(phoneNumberId, params = {}) {
        this.requireId(phoneNumberId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath21, phoneNumberId),
          bodyParams: params
        });
      }
      async deletePhoneNumber(phoneNumberId) {
        this.requireId(phoneNumberId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath21, phoneNumberId)
        });
      }
    };
    basePath22 = "/proxy_checks";
    ProxyCheckAPI = class extends AbstractAPI {
      static {
        __name(this, "ProxyCheckAPI");
      }
      async verify(params) {
        return this.request({
          method: "POST",
          path: basePath22,
          bodyParams: params
        });
      }
    };
    basePath23 = "/redirect_urls";
    RedirectUrlAPI = class extends AbstractAPI {
      static {
        __name(this, "RedirectUrlAPI");
      }
      async getRedirectUrlList() {
        return this.request({
          method: "GET",
          path: basePath23,
          queryParams: { paginated: true }
        });
      }
      async getRedirectUrl(redirectUrlId) {
        this.requireId(redirectUrlId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath23, redirectUrlId)
        });
      }
      async createRedirectUrl(params) {
        return this.request({
          method: "POST",
          path: basePath23,
          bodyParams: params
        });
      }
      async deleteRedirectUrl(redirectUrlId) {
        this.requireId(redirectUrlId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath23, redirectUrlId)
        });
      }
    };
    basePath24 = "/saml_connections";
    SamlConnectionAPI = class extends AbstractAPI {
      static {
        __name(this, "SamlConnectionAPI");
      }
      async getSamlConnectionList(params = {}) {
        return this.request({
          method: "GET",
          path: basePath24,
          queryParams: params
        });
      }
      async createSamlConnection(params) {
        return this.request({
          method: "POST",
          path: basePath24,
          bodyParams: params,
          options: {
            deepSnakecaseBodyParamKeys: true
          }
        });
      }
      async getSamlConnection(samlConnectionId) {
        this.requireId(samlConnectionId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath24, samlConnectionId)
        });
      }
      async updateSamlConnection(samlConnectionId, params = {}) {
        this.requireId(samlConnectionId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath24, samlConnectionId),
          bodyParams: params,
          options: {
            deepSnakecaseBodyParamKeys: true
          }
        });
      }
      async deleteSamlConnection(samlConnectionId) {
        this.requireId(samlConnectionId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath24, samlConnectionId)
        });
      }
    };
    basePath25 = "/sessions";
    SessionAPI = class extends AbstractAPI {
      static {
        __name(this, "SessionAPI");
      }
      async getSessionList(params = {}) {
        return this.request({
          method: "GET",
          path: basePath25,
          queryParams: { ...params, paginated: true }
        });
      }
      async getSession(sessionId) {
        this.requireId(sessionId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath25, sessionId)
        });
      }
      async createSession(params) {
        return this.request({
          method: "POST",
          path: basePath25,
          bodyParams: params
        });
      }
      async revokeSession(sessionId) {
        this.requireId(sessionId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath25, sessionId, "revoke")
        });
      }
      async verifySession(sessionId, token) {
        this.requireId(sessionId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath25, sessionId, "verify"),
          bodyParams: { token }
        });
      }
      /**
       * Retrieves a session token or generates a JWT using a specified template.
       *
       * @param sessionId - The ID of the session for which to generate the token
       * @param template - Optional name of the JWT template configured in the Clerk Dashboard.
       * @param expiresInSeconds - Optional expiration time for the token in seconds.
       *   If not provided, uses the default expiration.
       *
       * @returns A promise that resolves to the generated token
       *
       * @throws {Error} When sessionId is invalid or empty
       */
      async getToken(sessionId, template, expiresInSeconds) {
        this.requireId(sessionId);
        const path = template ? joinPaths(basePath25, sessionId, "tokens", template) : joinPaths(basePath25, sessionId, "tokens");
        const requestOptions = {
          method: "POST",
          path
        };
        if (expiresInSeconds !== void 0) {
          requestOptions.bodyParams = { expires_in_seconds: expiresInSeconds };
        }
        return this.request(requestOptions);
      }
      async refreshSession(sessionId, params) {
        this.requireId(sessionId);
        const { suffixed_cookies, ...restParams } = params;
        return this.request({
          method: "POST",
          path: joinPaths(basePath25, sessionId, "refresh"),
          bodyParams: restParams,
          queryParams: { suffixed_cookies }
        });
      }
    };
    basePath26 = "/sign_in_tokens";
    SignInTokenAPI = class extends AbstractAPI {
      static {
        __name(this, "SignInTokenAPI");
      }
      async createSignInToken(params) {
        return this.request({
          method: "POST",
          path: basePath26,
          bodyParams: params
        });
      }
      async revokeSignInToken(signInTokenId) {
        this.requireId(signInTokenId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath26, signInTokenId, "revoke")
        });
      }
    };
    basePath27 = "/sign_ups";
    SignUpAPI = class extends AbstractAPI {
      static {
        __name(this, "SignUpAPI");
      }
      async get(signUpAttemptId) {
        this.requireId(signUpAttemptId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath27, signUpAttemptId)
        });
      }
      async update(params) {
        const { signUpAttemptId, ...bodyParams } = params;
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath27, signUpAttemptId),
          bodyParams
        });
      }
    };
    basePath28 = "/testing_tokens";
    TestingTokenAPI = class extends AbstractAPI {
      static {
        __name(this, "TestingTokenAPI");
      }
      async createTestingToken() {
        return this.request({
          method: "POST",
          path: basePath28
        });
      }
    };
    basePath29 = "/users";
    UserAPI = class extends AbstractAPI {
      static {
        __name(this, "UserAPI");
      }
      async getUserList(params = {}) {
        const { limit, offset, orderBy, ...userCountParams } = params;
        const [data, totalCount] = await Promise.all([
          this.request({
            method: "GET",
            path: basePath29,
            queryParams: params
          }),
          this.getCount(userCountParams)
        ]);
        return { data, totalCount };
      }
      async getUser(userId) {
        this.requireId(userId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath29, userId)
        });
      }
      async createUser(params) {
        return this.request({
          method: "POST",
          path: basePath29,
          bodyParams: params
        });
      }
      async updateUser(userId, params = {}) {
        this.requireId(userId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath29, userId),
          bodyParams: params
        });
      }
      async updateUserProfileImage(userId, params) {
        this.requireId(userId);
        const formData = new runtime.FormData();
        formData.append("file", params?.file);
        return this.request({
          method: "POST",
          path: joinPaths(basePath29, userId, "profile_image"),
          formData
        });
      }
      async updateUserMetadata(userId, params) {
        this.requireId(userId);
        return this.request({
          method: "PATCH",
          path: joinPaths(basePath29, userId, "metadata"),
          bodyParams: params
        });
      }
      async deleteUser(userId) {
        this.requireId(userId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath29, userId)
        });
      }
      async getCount(params = {}) {
        return this.request({
          method: "GET",
          path: joinPaths(basePath29, "count"),
          queryParams: params
        });
      }
      async getUserOauthAccessToken(userId, provider) {
        this.requireId(userId);
        const hasPrefix = provider.startsWith("oauth_");
        const _provider = hasPrefix ? provider : `oauth_${provider}`;
        if (hasPrefix) {
          deprecated(
            "getUserOauthAccessToken(userId, provider)",
            "Remove the `oauth_` prefix from the `provider` argument."
          );
        }
        return this.request({
          method: "GET",
          path: joinPaths(basePath29, userId, "oauth_access_tokens", _provider),
          queryParams: { paginated: true }
        });
      }
      async disableUserMFA(userId) {
        this.requireId(userId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath29, userId, "mfa")
        });
      }
      async getOrganizationMembershipList(params) {
        const { userId, limit, offset } = params;
        this.requireId(userId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath29, userId, "organization_memberships"),
          queryParams: { limit, offset }
        });
      }
      async getOrganizationInvitationList(params) {
        const { userId, ...queryParams } = params;
        this.requireId(userId);
        return this.request({
          method: "GET",
          path: joinPaths(basePath29, userId, "organization_invitations"),
          queryParams
        });
      }
      async verifyPassword(params) {
        const { userId, password } = params;
        this.requireId(userId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath29, userId, "verify_password"),
          bodyParams: { password }
        });
      }
      async verifyTOTP(params) {
        const { userId, code } = params;
        this.requireId(userId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath29, userId, "verify_totp"),
          bodyParams: { code }
        });
      }
      async banUser(userId) {
        this.requireId(userId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath29, userId, "ban")
        });
      }
      async unbanUser(userId) {
        this.requireId(userId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath29, userId, "unban")
        });
      }
      async lockUser(userId) {
        this.requireId(userId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath29, userId, "lock")
        });
      }
      async unlockUser(userId) {
        this.requireId(userId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath29, userId, "unlock")
        });
      }
      async deleteUserProfileImage(userId) {
        this.requireId(userId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath29, userId, "profile_image")
        });
      }
      async deleteUserPasskey(params) {
        this.requireId(params.userId);
        this.requireId(params.passkeyIdentificationId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath29, params.userId, "passkeys", params.passkeyIdentificationId)
        });
      }
      async deleteUserWeb3Wallet(params) {
        this.requireId(params.userId);
        this.requireId(params.web3WalletIdentificationId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath29, params.userId, "web3_wallets", params.web3WalletIdentificationId)
        });
      }
      async deleteUserExternalAccount(params) {
        this.requireId(params.userId);
        this.requireId(params.externalAccountId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath29, params.userId, "external_accounts", params.externalAccountId)
        });
      }
      async deleteUserBackupCodes(userId) {
        this.requireId(userId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath29, userId, "backup_code")
        });
      }
      async deleteUserTOTP(userId) {
        this.requireId(userId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath29, userId, "totp")
        });
      }
      async setPasswordCompromised(userId, params = {
        revokeAllSessions: false
      }) {
        this.requireId(userId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath29, userId, "password", "set_compromised"),
          bodyParams: params
        });
      }
      async unsetPasswordCompromised(userId) {
        this.requireId(userId);
        return this.request({
          method: "POST",
          path: joinPaths(basePath29, userId, "password", "unset_compromised")
        });
      }
    };
    basePath30 = "/waitlist_entries";
    WaitlistEntryAPI = class extends AbstractAPI {
      static {
        __name(this, "WaitlistEntryAPI");
      }
      /**
       * List waitlist entries.
       * @param params Optional parameters (e.g., `query`, `status`, `orderBy`).
       */
      async list(params = {}) {
        return this.request({
          method: "GET",
          path: basePath30,
          queryParams: params
        });
      }
      /**
       * Create a waitlist entry.
       * @param params The parameters for creating a waitlist entry.
       */
      async create(params) {
        return this.request({
          method: "POST",
          path: basePath30,
          bodyParams: params
        });
      }
      /**
       * Bulk create waitlist entries.
       * @param params An array of parameters for creating waitlist entries.
       */
      async createBulk(params) {
        return this.request({
          method: "POST",
          path: joinPaths(basePath30, "bulk"),
          bodyParams: params
        });
      }
      /**
       * Invite a waitlist entry.
       * @param id The waitlist entry ID.
       * @param params Optional parameters (e.g., `ignoreExisting`).
       */
      async invite(id, params = {}) {
        this.requireId(id);
        return this.request({
          method: "POST",
          path: joinPaths(basePath30, id, "invite"),
          bodyParams: params
        });
      }
      /**
       * Reject a waitlist entry.
       * @param id The waitlist entry ID.
       */
      async reject(id) {
        this.requireId(id);
        return this.request({
          method: "POST",
          path: joinPaths(basePath30, id, "reject")
        });
      }
      /**
       * Delete a waitlist entry.
       * @param id The waitlist entry ID.
       */
      async delete(id) {
        this.requireId(id);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath30, id)
        });
      }
    };
    basePath31 = "/webhooks";
    WebhookAPI = class extends AbstractAPI {
      static {
        __name(this, "WebhookAPI");
      }
      async createSvixApp() {
        return this.request({
          method: "POST",
          path: joinPaths(basePath31, "svix")
        });
      }
      async generateSvixAuthURL() {
        return this.request({
          method: "POST",
          path: joinPaths(basePath31, "svix_url")
        });
      }
      async deleteSvixApp() {
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath31, "svix")
        });
      }
    };
    basePath32 = "/billing";
    organizationBasePath = "/organizations";
    userBasePath = "/users";
    BillingAPI = class extends AbstractAPI {
      static {
        __name(this, "BillingAPI");
      }
      /**
       * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
       */
      async getPlanList(params) {
        return this.request({
          method: "GET",
          path: joinPaths(basePath32, "plans"),
          queryParams: params
        });
      }
      /**
       * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
       */
      async cancelSubscriptionItem(subscriptionItemId, params) {
        this.requireId(subscriptionItemId);
        return this.request({
          method: "DELETE",
          path: joinPaths(basePath32, "subscription_items", subscriptionItemId),
          queryParams: params
        });
      }
      /**
       * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
       */
      async extendSubscriptionItemFreeTrial(subscriptionItemId, params) {
        this.requireId(subscriptionItemId);
        return this.request({
          method: "POST",
          path: joinPaths("/billing", "subscription_items", subscriptionItemId, "extend_free_trial"),
          bodyParams: params
        });
      }
      /**
       * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
       */
      async getOrganizationBillingSubscription(organizationId) {
        this.requireId(organizationId);
        return this.request({
          method: "GET",
          path: joinPaths(organizationBasePath, organizationId, "billing", "subscription")
        });
      }
      /**
       * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
       */
      async getUserBillingSubscription(userId) {
        this.requireId(userId);
        return this.request({
          method: "GET",
          path: joinPaths(userBasePath, userId, "billing", "subscription")
        });
      }
    };
    isObject = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null, "isObject");
    isObjectCustom = /* @__PURE__ */ __name((value) => isObject(value) && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date) && !(globalThis.Blob && value instanceof globalThis.Blob), "isObjectCustom");
    mapObjectSkip = /* @__PURE__ */ Symbol("mapObjectSkip");
    _mapObject = /* @__PURE__ */ __name((object, mapper, options, isSeen = /* @__PURE__ */ new WeakMap()) => {
      options = {
        deep: false,
        target: {},
        ...options
      };
      if (isSeen.has(object)) {
        return isSeen.get(object);
      }
      isSeen.set(object, options.target);
      const { target } = options;
      delete options.target;
      const mapArray = /* @__PURE__ */ __name((array) => array.map((element) => isObjectCustom(element) ? _mapObject(element, mapper, options, isSeen) : element), "mapArray");
      if (Array.isArray(object)) {
        return mapArray(object);
      }
      for (const [key, value] of Object.entries(object)) {
        const mapResult = mapper(key, value, object);
        if (mapResult === mapObjectSkip) {
          continue;
        }
        let [newKey, newValue, { shouldRecurse = true } = {}] = mapResult;
        if (newKey === "__proto__") {
          continue;
        }
        if (options.deep && shouldRecurse && isObjectCustom(newValue)) {
          newValue = Array.isArray(newValue) ? mapArray(newValue) : _mapObject(newValue, mapper, options, isSeen);
        }
        target[newKey] = newValue;
      }
      return target;
    }, "_mapObject");
    __name(mapObject, "mapObject");
    SPLIT_LOWER_UPPER_RE = /([\p{Ll}\d])(\p{Lu})/gu;
    SPLIT_UPPER_UPPER_RE = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu;
    SPLIT_SEPARATE_NUMBER_RE = /(\d)\p{Ll}|(\p{L})\d/u;
    DEFAULT_STRIP_REGEXP = /[^\p{L}\d]+/giu;
    SPLIT_REPLACE_VALUE = "$1\0$2";
    DEFAULT_PREFIX_SUFFIX_CHARACTERS = "";
    __name(split, "split");
    __name(splitSeparateNumbers, "splitSeparateNumbers");
    __name(noCase, "noCase");
    __name(snakeCase, "snakeCase");
    __name(lowerFactory, "lowerFactory");
    __name(splitPrefixSuffix, "splitPrefixSuffix");
    PlainObjectConstructor = {}.constructor;
    __name(snakecaseKeys, "snakecaseKeys");
    __name(matches, "matches");
    __name(mapperOptions, "mapperOptions");
    snakecase_keys_default = snakecaseKeys;
    AccountlessApplication = class _AccountlessApplication {
      static {
        __name(this, "_AccountlessApplication");
      }
      constructor(publishableKey, secretKey, claimUrl, apiKeysUrl) {
        this.publishableKey = publishableKey;
        this.secretKey = secretKey;
        this.claimUrl = claimUrl;
        this.apiKeysUrl = apiKeysUrl;
      }
      static fromJSON(data) {
        return new _AccountlessApplication(data.publishable_key, data.secret_key, data.claim_url, data.api_keys_url);
      }
    };
    AgentTask = class _AgentTask {
      static {
        __name(this, "_AgentTask");
      }
      constructor(agentId, taskId, agentTaskId, url) {
        this.agentId = agentId;
        this.taskId = taskId;
        this.agentTaskId = agentTaskId;
        this.url = url;
      }
      /**
       * Creates a AgentTask instance from a JSON object.
       *
       * @param data - The JSON object containing agent task data
       * @returns A new AgentTask instance
       */
      static fromJSON(data) {
        const agentTaskId = data.agent_task_id ?? data.task_id ?? "";
        return new _AgentTask(data.agent_id, agentTaskId, agentTaskId, data.url);
      }
    };
    ActorToken = class _ActorToken {
      static {
        __name(this, "_ActorToken");
      }
      constructor(id, status, userId, actor, token, url, createdAt, updatedAt) {
        this.id = id;
        this.status = status;
        this.userId = userId;
        this.actor = actor;
        this.token = token;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _ActorToken(
          data.id,
          data.status,
          data.user_id,
          data.actor,
          data.token,
          data.url,
          data.created_at,
          data.updated_at
        );
      }
    };
    AllowlistIdentifier = class _AllowlistIdentifier {
      static {
        __name(this, "_AllowlistIdentifier");
      }
      constructor(id, identifier, identifierType, createdAt, updatedAt, instanceId, invitationId) {
        this.id = id;
        this.identifier = identifier;
        this.identifierType = identifierType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.instanceId = instanceId;
        this.invitationId = invitationId;
      }
      static fromJSON(data) {
        return new _AllowlistIdentifier(
          data.id,
          data.identifier,
          data.identifier_type,
          data.created_at,
          data.updated_at,
          data.instance_id,
          data.invitation_id
        );
      }
    };
    APIKey = class _APIKey {
      static {
        __name(this, "_APIKey");
      }
      constructor(id, type, name, subject, scopes, claims, revoked, revocationReason, expired, expiration, createdBy, description, lastUsedAt, createdAt, updatedAt, secret) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.subject = subject;
        this.scopes = scopes;
        this.claims = claims;
        this.revoked = revoked;
        this.revocationReason = revocationReason;
        this.expired = expired;
        this.expiration = expiration;
        this.createdBy = createdBy;
        this.description = description;
        this.lastUsedAt = lastUsedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.secret = secret;
      }
      static fromJSON(data) {
        return new _APIKey(
          data.id,
          data.type,
          data.name,
          data.subject,
          data.scopes,
          data.claims,
          data.revoked,
          data.revocation_reason,
          data.expired,
          data.expiration,
          data.created_by,
          data.description,
          data.last_used_at,
          data.created_at,
          data.updated_at,
          data.secret
        );
      }
    };
    BlocklistIdentifier = class _BlocklistIdentifier {
      static {
        __name(this, "_BlocklistIdentifier");
      }
      constructor(id, identifier, identifierType, createdAt, updatedAt, instanceId) {
        this.id = id;
        this.identifier = identifier;
        this.identifierType = identifierType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.instanceId = instanceId;
      }
      static fromJSON(data) {
        return new _BlocklistIdentifier(
          data.id,
          data.identifier,
          data.identifier_type,
          data.created_at,
          data.updated_at,
          data.instance_id
        );
      }
    };
    SessionActivity = class _SessionActivity {
      static {
        __name(this, "_SessionActivity");
      }
      constructor(id, isMobile, ipAddress, city, country, browserVersion, browserName, deviceType) {
        this.id = id;
        this.isMobile = isMobile;
        this.ipAddress = ipAddress;
        this.city = city;
        this.country = country;
        this.browserVersion = browserVersion;
        this.browserName = browserName;
        this.deviceType = deviceType;
      }
      static fromJSON(data) {
        return new _SessionActivity(
          data.id,
          data.is_mobile,
          data.ip_address,
          data.city,
          data.country,
          data.browser_version,
          data.browser_name,
          data.device_type
        );
      }
    };
    Session = class _Session {
      static {
        __name(this, "_Session");
      }
      constructor(id, clientId, userId, status, lastActiveAt, expireAt, abandonAt, createdAt, updatedAt, lastActiveOrganizationId, latestActivity, actor = null) {
        this.id = id;
        this.clientId = clientId;
        this.userId = userId;
        this.status = status;
        this.lastActiveAt = lastActiveAt;
        this.expireAt = expireAt;
        this.abandonAt = abandonAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lastActiveOrganizationId = lastActiveOrganizationId;
        this.latestActivity = latestActivity;
        this.actor = actor;
      }
      static fromJSON(data) {
        return new _Session(
          data.id,
          data.client_id,
          data.user_id,
          data.status,
          data.last_active_at,
          data.expire_at,
          data.abandon_at,
          data.created_at,
          data.updated_at,
          data.last_active_organization_id,
          data.latest_activity && SessionActivity.fromJSON(data.latest_activity),
          data.actor
        );
      }
    };
    Client = class _Client {
      static {
        __name(this, "_Client");
      }
      constructor(id, sessionIds, sessions, signInId, signUpId, lastActiveSessionId, lastAuthenticationStrategy, createdAt, updatedAt) {
        this.id = id;
        this.sessionIds = sessionIds;
        this.sessions = sessions;
        this.signInId = signInId;
        this.signUpId = signUpId;
        this.lastActiveSessionId = lastActiveSessionId;
        this.lastAuthenticationStrategy = lastAuthenticationStrategy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _Client(
          data.id,
          data.session_ids,
          data.sessions.map((x) => Session.fromJSON(x)),
          data.sign_in_id,
          data.sign_up_id,
          data.last_active_session_id,
          data.last_authentication_strategy,
          data.created_at,
          data.updated_at
        );
      }
    };
    CnameTarget = class _CnameTarget {
      static {
        __name(this, "_CnameTarget");
      }
      constructor(host, value, required) {
        this.host = host;
        this.value = value;
        this.required = required;
      }
      static fromJSON(data) {
        return new _CnameTarget(data.host, data.value, data.required);
      }
    };
    Cookies2 = class _Cookies {
      static {
        __name(this, "_Cookies");
      }
      constructor(cookies) {
        this.cookies = cookies;
      }
      static fromJSON(data) {
        return new _Cookies(data.cookies);
      }
    };
    DeletedObject = class _DeletedObject {
      static {
        __name(this, "_DeletedObject");
      }
      constructor(object, id, slug, deleted) {
        this.object = object;
        this.id = id;
        this.slug = slug;
        this.deleted = deleted;
      }
      static fromJSON(data) {
        return new _DeletedObject(data.object, data.id || null, data.slug || null, data.deleted);
      }
    };
    Domain = class _Domain {
      static {
        __name(this, "_Domain");
      }
      constructor(id, name, isSatellite, frontendApiUrl, developmentOrigin, cnameTargets, accountsPortalUrl, proxyUrl) {
        this.id = id;
        this.name = name;
        this.isSatellite = isSatellite;
        this.frontendApiUrl = frontendApiUrl;
        this.developmentOrigin = developmentOrigin;
        this.cnameTargets = cnameTargets;
        this.accountsPortalUrl = accountsPortalUrl;
        this.proxyUrl = proxyUrl;
      }
      static fromJSON(data) {
        return new _Domain(
          data.id,
          data.name,
          data.is_satellite,
          data.frontend_api_url,
          data.development_origin,
          data.cname_targets && data.cname_targets.map((x) => CnameTarget.fromJSON(x)),
          data.accounts_portal_url,
          data.proxy_url
        );
      }
    };
    Email = class _Email {
      static {
        __name(this, "_Email");
      }
      constructor(id, fromEmailName, emailAddressId, toEmailAddress, subject, body, bodyPlain, status, slug, data, deliveredByClerk) {
        this.id = id;
        this.fromEmailName = fromEmailName;
        this.emailAddressId = emailAddressId;
        this.toEmailAddress = toEmailAddress;
        this.subject = subject;
        this.body = body;
        this.bodyPlain = bodyPlain;
        this.status = status;
        this.slug = slug;
        this.data = data;
        this.deliveredByClerk = deliveredByClerk;
      }
      static fromJSON(data) {
        return new _Email(
          data.id,
          data.from_email_name,
          data.email_address_id,
          data.to_email_address,
          data.subject,
          data.body,
          data.body_plain,
          data.status,
          data.slug,
          data.data,
          data.delivered_by_clerk
        );
      }
    };
    IdentificationLink = class _IdentificationLink {
      static {
        __name(this, "_IdentificationLink");
      }
      constructor(id, type) {
        this.id = id;
        this.type = type;
      }
      static fromJSON(data) {
        return new _IdentificationLink(data.id, data.type);
      }
    };
    Verification = class _Verification {
      static {
        __name(this, "_Verification");
      }
      constructor(status, strategy, externalVerificationRedirectURL = null, attempts = null, expireAt = null, nonce = null, message = null) {
        this.status = status;
        this.strategy = strategy;
        this.externalVerificationRedirectURL = externalVerificationRedirectURL;
        this.attempts = attempts;
        this.expireAt = expireAt;
        this.nonce = nonce;
        this.message = message;
      }
      static fromJSON(data) {
        return new _Verification(
          data.status,
          data.strategy,
          data.external_verification_redirect_url ? new URL(data.external_verification_redirect_url) : null,
          data.attempts,
          data.expire_at,
          data.nonce
        );
      }
    };
    EmailAddress = class _EmailAddress {
      static {
        __name(this, "_EmailAddress");
      }
      constructor(id, emailAddress, verification, linkedTo) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.verification = verification;
        this.linkedTo = linkedTo;
      }
      static fromJSON(data) {
        return new _EmailAddress(
          data.id,
          data.email_address,
          data.verification && Verification.fromJSON(data.verification),
          data.linked_to.map((link) => IdentificationLink.fromJSON(link))
        );
      }
    };
    Feature = class _Feature {
      static {
        __name(this, "_Feature");
      }
      constructor(id, name, description, slug, avatarUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.slug = slug;
        this.avatarUrl = avatarUrl;
      }
      static fromJSON(data) {
        return new _Feature(data.id, data.name, data.description ?? null, data.slug, data.avatar_url ?? null);
      }
    };
    BillingPlan = class _BillingPlan {
      static {
        __name(this, "_BillingPlan");
      }
      constructor(id, name, slug, description, isDefault, isRecurring, hasBaseFee, publiclyVisible, fee, annualFee, annualMonthlyFee, forPayerType, features, avatarUrl, freeTrialDays, freeTrialEnabled) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.isDefault = isDefault;
        this.isRecurring = isRecurring;
        this.hasBaseFee = hasBaseFee;
        this.publiclyVisible = publiclyVisible;
        this.fee = fee;
        this.annualFee = annualFee;
        this.annualMonthlyFee = annualMonthlyFee;
        this.forPayerType = forPayerType;
        this.features = features;
        this.avatarUrl = avatarUrl;
        this.freeTrialDays = freeTrialDays;
        this.freeTrialEnabled = freeTrialEnabled;
      }
      static fromJSON(data) {
        const formatAmountJSON = /* @__PURE__ */ __name((fee) => {
          return fee ? {
            amount: fee.amount,
            amountFormatted: fee.amount_formatted,
            currency: fee.currency,
            currencySymbol: fee.currency_symbol
          } : null;
        }, "formatAmountJSON");
        return new _BillingPlan(
          data.id,
          data.name,
          data.slug,
          data.description ?? null,
          data.is_default,
          data.is_recurring,
          data.has_base_fee,
          data.publicly_visible,
          formatAmountJSON(data.fee),
          formatAmountJSON(data.annual_fee),
          formatAmountJSON(data.annual_monthly_fee),
          data.for_payer_type,
          (data.features ?? []).map((feature) => Feature.fromJSON(feature)),
          data.avatar_url,
          data.free_trial_days,
          data.free_trial_enabled
        );
      }
    };
    BillingSubscriptionItem = class _BillingSubscriptionItem {
      static {
        __name(this, "_BillingSubscriptionItem");
      }
      constructor(id, status, planPeriod, periodStart, nextPayment, amount, plan, planId, createdAt, updatedAt, periodEnd, canceledAt, pastDueAt, endedAt, payerId, isFreeTrial, lifetimePaid) {
        this.id = id;
        this.status = status;
        this.planPeriod = planPeriod;
        this.periodStart = periodStart;
        this.nextPayment = nextPayment;
        this.amount = amount;
        this.plan = plan;
        this.planId = planId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.periodEnd = periodEnd;
        this.canceledAt = canceledAt;
        this.pastDueAt = pastDueAt;
        this.endedAt = endedAt;
        this.payerId = payerId;
        this.isFreeTrial = isFreeTrial;
        this.lifetimePaid = lifetimePaid;
      }
      static fromJSON(data) {
        function formatAmountJSON(amount) {
          if (!amount) {
            return amount;
          }
          return {
            amount: amount.amount,
            amountFormatted: amount.amount_formatted,
            currency: amount.currency,
            currencySymbol: amount.currency_symbol
          };
        }
        __name(formatAmountJSON, "formatAmountJSON");
        return new _BillingSubscriptionItem(
          data.id,
          data.status,
          data.plan_period,
          data.period_start,
          data.next_payment,
          formatAmountJSON(data.amount) ?? void 0,
          data.plan ? BillingPlan.fromJSON(data.plan) : null,
          data.plan_id ?? null,
          data.created_at,
          data.updated_at,
          data.period_end,
          data.canceled_at,
          data.past_due_at,
          data.ended_at,
          data.payer_id,
          data.is_free_trial,
          formatAmountJSON(data.lifetime_paid) ?? void 0
        );
      }
    };
    BillingSubscription = class _BillingSubscription {
      static {
        __name(this, "_BillingSubscription");
      }
      constructor(id, status, payerId, createdAt, updatedAt, activeAt, pastDueAt, subscriptionItems, nextPayment, eligibleForFreeTrial) {
        this.id = id;
        this.status = status;
        this.payerId = payerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.activeAt = activeAt;
        this.pastDueAt = pastDueAt;
        this.subscriptionItems = subscriptionItems;
        this.nextPayment = nextPayment;
        this.eligibleForFreeTrial = eligibleForFreeTrial;
      }
      static fromJSON(data) {
        const nextPayment = data.next_payment ? {
          date: data.next_payment.date,
          amount: {
            amount: data.next_payment.amount.amount,
            amountFormatted: data.next_payment.amount.amount_formatted,
            currency: data.next_payment.amount.currency,
            currencySymbol: data.next_payment.amount.currency_symbol
          }
        } : null;
        return new _BillingSubscription(
          data.id,
          data.status,
          data.payer_id,
          data.created_at,
          data.updated_at,
          data.active_at ?? null,
          data.past_due_at ?? null,
          (data.subscription_items ?? []).map((item) => BillingSubscriptionItem.fromJSON(item)),
          nextPayment,
          data.eligible_for_free_trial ?? false
        );
      }
    };
    EnterpriseAccountConnection = class _EnterpriseAccountConnection {
      static {
        __name(this, "_EnterpriseAccountConnection");
      }
      constructor(id, active, allowIdpInitiated, allowSubdomains, disableAdditionalIdentifications, domain, logoPublicUrl, name, protocol, provider, syncUserAttributes, createdAt, updatedAt) {
        this.id = id;
        this.active = active;
        this.allowIdpInitiated = allowIdpInitiated;
        this.allowSubdomains = allowSubdomains;
        this.disableAdditionalIdentifications = disableAdditionalIdentifications;
        this.domain = domain;
        this.logoPublicUrl = logoPublicUrl;
        this.name = name;
        this.protocol = protocol;
        this.provider = provider;
        this.syncUserAttributes = syncUserAttributes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _EnterpriseAccountConnection(
          data.id,
          data.active,
          data.allow_idp_initiated,
          data.allow_subdomains,
          data.disable_additional_identifications,
          data.domain,
          data.logo_public_url,
          data.name,
          data.protocol,
          data.provider,
          data.sync_user_attributes,
          data.created_at,
          data.updated_at
        );
      }
    };
    EnterpriseAccount = class _EnterpriseAccount {
      static {
        __name(this, "_EnterpriseAccount");
      }
      constructor(id, active, emailAddress, enterpriseConnection, firstName, lastName, protocol, provider, providerUserId, publicMetadata, verification, lastAuthenticatedAt, enterpriseConnectionId) {
        this.id = id;
        this.active = active;
        this.emailAddress = emailAddress;
        this.enterpriseConnection = enterpriseConnection;
        this.firstName = firstName;
        this.lastName = lastName;
        this.protocol = protocol;
        this.provider = provider;
        this.providerUserId = providerUserId;
        this.publicMetadata = publicMetadata;
        this.verification = verification;
        this.lastAuthenticatedAt = lastAuthenticatedAt;
        this.enterpriseConnectionId = enterpriseConnectionId;
      }
      static fromJSON(data) {
        return new _EnterpriseAccount(
          data.id,
          data.active,
          data.email_address,
          data.enterprise_connection && EnterpriseAccountConnection.fromJSON(data.enterprise_connection),
          data.first_name,
          data.last_name,
          data.protocol,
          data.provider,
          data.provider_user_id,
          data.public_metadata,
          data.verification && Verification.fromJSON(data.verification),
          data.last_authenticated_at,
          data.enterprise_connection_id
        );
      }
    };
    EnterpriseConnectionSamlConnection = class _EnterpriseConnectionSamlConnection {
      static {
        __name(this, "_EnterpriseConnectionSamlConnection");
      }
      constructor(id, name, idpEntityId, idpSsoUrl, idpCertificate, idpMetadataUrl, idpMetadata, acsUrl, spEntityId, spMetadataUrl, syncUserAttributes, allowSubdomains, allowIdpInitiated) {
        this.id = id;
        this.name = name;
        this.idpEntityId = idpEntityId;
        this.idpSsoUrl = idpSsoUrl;
        this.idpCertificate = idpCertificate;
        this.idpMetadataUrl = idpMetadataUrl;
        this.idpMetadata = idpMetadata;
        this.acsUrl = acsUrl;
        this.spEntityId = spEntityId;
        this.spMetadataUrl = spMetadataUrl;
        this.syncUserAttributes = syncUserAttributes;
        this.allowSubdomains = allowSubdomains;
        this.allowIdpInitiated = allowIdpInitiated;
      }
      static fromJSON(data) {
        return new _EnterpriseConnectionSamlConnection(
          data.id,
          data.name,
          data.idp_entity_id,
          data.idp_sso_url,
          data.idp_certificate,
          data.idp_metadata_url,
          data.idp_metadata,
          data.acs_url,
          data.sp_entity_id,
          data.sp_metadata_url,
          data.sync_user_attributes,
          data.allow_subdomains,
          data.allow_idp_initiated
        );
      }
    };
    EnterpriseConnectionOauthConfig = class _EnterpriseConnectionOauthConfig {
      static {
        __name(this, "_EnterpriseConnectionOauthConfig");
      }
      constructor(id, name, clientId, discoveryUrl, logoPublicUrl, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.clientId = clientId;
        this.discoveryUrl = discoveryUrl;
        this.logoPublicUrl = logoPublicUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _EnterpriseConnectionOauthConfig(
          data.id,
          data.name,
          data.client_id,
          data.discovery_url,
          data.logo_public_url,
          data.created_at,
          data.updated_at
        );
      }
    };
    EnterpriseConnection = class _EnterpriseConnection {
      static {
        __name(this, "_EnterpriseConnection");
      }
      constructor(id, name, domains, organizationId, active, syncUserAttributes, allowSubdomains, disableAdditionalIdentifications, createdAt, updatedAt, samlConnection, oauthConfig) {
        this.id = id;
        this.name = name;
        this.domains = domains;
        this.organizationId = organizationId;
        this.active = active;
        this.syncUserAttributes = syncUserAttributes;
        this.allowSubdomains = allowSubdomains;
        this.disableAdditionalIdentifications = disableAdditionalIdentifications;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.samlConnection = samlConnection;
        this.oauthConfig = oauthConfig;
      }
      static fromJSON(data) {
        return new _EnterpriseConnection(
          data.id,
          data.name,
          data.domains,
          data.organization_id,
          data.active,
          data.sync_user_attributes,
          data.allow_subdomains,
          data.disable_additional_identifications,
          data.created_at,
          data.updated_at,
          data.saml_connection != null ? EnterpriseConnectionSamlConnection.fromJSON(data.saml_connection) : null,
          data.oauth_config != null ? EnterpriseConnectionOauthConfig.fromJSON(data.oauth_config) : null
        );
      }
    };
    ExternalAccount = class _ExternalAccount {
      static {
        __name(this, "_ExternalAccount");
      }
      constructor(id, provider, providerUserId, identificationId, externalId, approvedScopes, emailAddress, firstName, lastName, imageUrl, username, phoneNumber, publicMetadata = {}, label, verification) {
        this.id = id;
        this.provider = provider;
        this.providerUserId = providerUserId;
        this.identificationId = identificationId;
        this.externalId = externalId;
        this.approvedScopes = approvedScopes;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.publicMetadata = publicMetadata;
        this.label = label;
        this.verification = verification;
      }
      static fromJSON(data) {
        return new _ExternalAccount(
          data.id,
          data.provider,
          data.provider_user_id,
          data.identification_id,
          data.provider_user_id,
          data.approved_scopes,
          data.email_address,
          data.first_name,
          data.last_name,
          data.image_url || "",
          data.username,
          data.phone_number,
          data.public_metadata,
          data.label,
          data.verification && Verification.fromJSON(data.verification)
        );
      }
    };
    Instance = class _Instance {
      static {
        __name(this, "_Instance");
      }
      constructor(id, environmentType, allowedOrigins) {
        this.id = id;
        this.environmentType = environmentType;
        this.allowedOrigins = allowedOrigins;
      }
      static fromJSON(data) {
        return new _Instance(data.id, data.environment_type, data.allowed_origins);
      }
    };
    InstanceRestrictions = class _InstanceRestrictions {
      static {
        __name(this, "_InstanceRestrictions");
      }
      constructor(allowlist, blocklist, blockEmailSubaddresses, blockDisposableEmailDomains, ignoreDotsForGmailAddresses) {
        this.allowlist = allowlist;
        this.blocklist = blocklist;
        this.blockEmailSubaddresses = blockEmailSubaddresses;
        this.blockDisposableEmailDomains = blockDisposableEmailDomains;
        this.ignoreDotsForGmailAddresses = ignoreDotsForGmailAddresses;
      }
      static fromJSON(data) {
        return new _InstanceRestrictions(
          data.allowlist,
          data.blocklist,
          data.block_email_subaddresses,
          data.block_disposable_email_domains,
          data.ignore_dots_for_gmail_addresses
        );
      }
    };
    InstanceSettings = class _InstanceSettings {
      static {
        __name(this, "_InstanceSettings");
      }
      constructor(id, restrictedToAllowlist, fromEmailAddress, progressiveSignUp, enhancedEmailDeliverability) {
        this.id = id;
        this.restrictedToAllowlist = restrictedToAllowlist;
        this.fromEmailAddress = fromEmailAddress;
        this.progressiveSignUp = progressiveSignUp;
        this.enhancedEmailDeliverability = enhancedEmailDeliverability;
      }
      static fromJSON(data) {
        return new _InstanceSettings(
          data.id,
          data.restricted_to_allowlist,
          data.from_email_address,
          data.progressive_sign_up,
          data.enhanced_email_deliverability
        );
      }
    };
    Invitation = class _Invitation {
      static {
        __name(this, "_Invitation");
      }
      constructor(id, emailAddress, publicMetadata, createdAt, updatedAt, status, url, revoked) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.publicMetadata = publicMetadata;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.url = url;
        this.revoked = revoked;
        this._raw = null;
      }
      get raw() {
        return this._raw;
      }
      static fromJSON(data) {
        const res = new _Invitation(
          data.id,
          data.email_address,
          data.public_metadata,
          data.created_at,
          data.updated_at,
          data.status,
          data.url,
          data.revoked
        );
        res._raw = data;
        return res;
      }
    };
    ObjectType = {
      AccountlessApplication: "accountless_application",
      ActorToken: "actor_token",
      AgentTask: "agent_task",
      AllowlistIdentifier: "allowlist_identifier",
      ApiKey: "api_key",
      BlocklistIdentifier: "blocklist_identifier",
      Client: "client",
      Cookies: "cookies",
      Domain: "domain",
      Email: "email",
      EnterpriseAccount: "enterprise_account",
      EnterpriseConnection: "enterprise_connection",
      EmailAddress: "email_address",
      ExternalAccount: "external_account",
      FacebookAccount: "facebook_account",
      GoogleAccount: "google_account",
      Instance: "instance",
      InstanceRestrictions: "instance_restrictions",
      InstanceSettings: "instance_settings",
      Invitation: "invitation",
      Machine: "machine",
      MachineScope: "machine_scope",
      MachineSecretKey: "machine_secret_key",
      M2MToken: "machine_to_machine_token",
      JwtTemplate: "jwt_template",
      OauthAccessToken: "oauth_access_token",
      IdpOAuthAccessToken: "clerk_idp_oauth_access_token",
      OAuthApplication: "oauth_application",
      Organization: "organization",
      OrganizationDomain: "organization_domain",
      OrganizationInvitation: "organization_invitation",
      OrganizationMembership: "organization_membership",
      OrganizationSettings: "organization_settings",
      PhoneNumber: "phone_number",
      ProxyCheck: "proxy_check",
      RedirectUrl: "redirect_url",
      SamlConnection: "saml_connection",
      Session: "session",
      SignInAttempt: "sign_in_attempt",
      SignInToken: "sign_in_token",
      SignUpAttempt: "sign_up_attempt",
      SmsMessage: "sms_message",
      User: "user",
      WaitlistEntry: "waitlist_entry",
      Web3Wallet: "web3_wallet",
      Token: "token",
      TotalCount: "total_count",
      TestingToken: "testing_token",
      Role: "role",
      RoleSet: "role_set",
      RoleSetItem: "role_set_item",
      RoleSetMigration: "role_set_migration",
      Permission: "permission",
      BillingPayer: "commerce_payer",
      BillingPaymentAttempt: "commerce_payment_attempt",
      BillingSubscription: "commerce_subscription",
      BillingSubscriptionItem: "commerce_subscription_item",
      BillingPlan: "commerce_plan",
      Feature: "feature"
    };
    JwtTemplate = class _JwtTemplate {
      static {
        __name(this, "_JwtTemplate");
      }
      constructor(id, name, claims, lifetime, allowedClockSkew, customSigningKey, signingAlgorithm, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.claims = claims;
        this.lifetime = lifetime;
        this.allowedClockSkew = allowedClockSkew;
        this.customSigningKey = customSigningKey;
        this.signingAlgorithm = signingAlgorithm;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _JwtTemplate(
          data.id,
          data.name,
          data.claims,
          data.lifetime,
          data.allowed_clock_skew,
          data.custom_signing_key,
          data.signing_algorithm,
          data.created_at,
          data.updated_at
        );
      }
    };
    Machine = class _Machine {
      static {
        __name(this, "_Machine");
      }
      constructor(id, name, instanceId, createdAt, updatedAt, scopedMachines, defaultTokenTtl, secretKey) {
        this.id = id;
        this.name = name;
        this.instanceId = instanceId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.scopedMachines = scopedMachines;
        this.defaultTokenTtl = defaultTokenTtl;
        this.secretKey = secretKey;
      }
      static fromJSON(data) {
        return new _Machine(
          data.id,
          data.name,
          data.instance_id,
          data.created_at,
          data.updated_at,
          data.scoped_machines.map(
            (m) => new _Machine(
              m.id,
              m.name,
              m.instance_id,
              m.created_at,
              m.updated_at,
              [],
              // Nested machines don't have scoped_machines
              m.default_token_ttl
            )
          ),
          data.default_token_ttl,
          data.secret_key
        );
      }
    };
    MachineScope = class _MachineScope {
      static {
        __name(this, "_MachineScope");
      }
      constructor(fromMachineId, toMachineId, createdAt, deleted) {
        this.fromMachineId = fromMachineId;
        this.toMachineId = toMachineId;
        this.createdAt = createdAt;
        this.deleted = deleted;
      }
      static fromJSON(data) {
        return new _MachineScope(data.from_machine_id, data.to_machine_id, data.created_at, data.deleted);
      }
    };
    MachineSecretKey = class _MachineSecretKey {
      static {
        __name(this, "_MachineSecretKey");
      }
      constructor(secret) {
        this.secret = secret;
      }
      static fromJSON(data) {
        return new _MachineSecretKey(data.secret);
      }
    };
    OauthAccessToken = class _OauthAccessToken {
      static {
        __name(this, "_OauthAccessToken");
      }
      constructor(externalAccountId, provider, token, publicMetadata = {}, label, scopes, tokenSecret, expiresAt, idToken) {
        this.externalAccountId = externalAccountId;
        this.provider = provider;
        this.token = token;
        this.publicMetadata = publicMetadata;
        this.label = label;
        this.scopes = scopes;
        this.tokenSecret = tokenSecret;
        this.expiresAt = expiresAt;
        this.idToken = idToken;
      }
      static fromJSON(data) {
        return new _OauthAccessToken(
          data.external_account_id,
          data.provider,
          data.token,
          data.public_metadata,
          data.label || "",
          data.scopes,
          data.token_secret,
          data.expires_at,
          data.id_token
        );
      }
    };
    OAuthApplication = class _OAuthApplication {
      static {
        __name(this, "_OAuthApplication");
      }
      constructor(id, instanceId, name, clientId, clientUri, clientImageUrl, dynamicallyRegistered, consentScreenEnabled, pkceRequired, isPublic, scopes, redirectUris, authorizeUrl, tokenFetchUrl, userInfoUrl, discoveryUrl, tokenIntrospectionUrl, createdAt, updatedAt, clientSecret) {
        this.id = id;
        this.instanceId = instanceId;
        this.name = name;
        this.clientId = clientId;
        this.clientUri = clientUri;
        this.clientImageUrl = clientImageUrl;
        this.dynamicallyRegistered = dynamicallyRegistered;
        this.consentScreenEnabled = consentScreenEnabled;
        this.pkceRequired = pkceRequired;
        this.isPublic = isPublic;
        this.scopes = scopes;
        this.redirectUris = redirectUris;
        this.authorizeUrl = authorizeUrl;
        this.tokenFetchUrl = tokenFetchUrl;
        this.userInfoUrl = userInfoUrl;
        this.discoveryUrl = discoveryUrl;
        this.tokenIntrospectionUrl = tokenIntrospectionUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.clientSecret = clientSecret;
      }
      static fromJSON(data) {
        return new _OAuthApplication(
          data.id,
          data.instance_id,
          data.name,
          data.client_id,
          data.client_uri,
          data.client_image_url,
          data.dynamically_registered,
          data.consent_screen_enabled,
          data.pkce_required,
          data.public,
          data.scopes,
          data.redirect_uris,
          data.authorize_url,
          data.token_fetch_url,
          data.user_info_url,
          data.discovery_url,
          data.token_introspection_url,
          data.created_at,
          data.updated_at,
          data.client_secret
        );
      }
    };
    Organization = class _Organization {
      static {
        __name(this, "_Organization");
      }
      constructor(id, name, slug, imageUrl, hasImage, createdAt, updatedAt, publicMetadata = {}, privateMetadata = {}, maxAllowedMemberships, adminDeleteEnabled, membersCount, createdBy) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.imageUrl = imageUrl;
        this.hasImage = hasImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.maxAllowedMemberships = maxAllowedMemberships;
        this.adminDeleteEnabled = adminDeleteEnabled;
        this.membersCount = membersCount;
        this.createdBy = createdBy;
        this._raw = null;
      }
      get raw() {
        return this._raw;
      }
      static fromJSON(data) {
        const res = new _Organization(
          data.id,
          data.name,
          data.slug,
          data.image_url || "",
          data.has_image,
          data.created_at,
          data.updated_at,
          data.public_metadata,
          data.private_metadata,
          data.max_allowed_memberships,
          data.admin_delete_enabled,
          data.members_count,
          data.created_by
        );
        res._raw = data;
        return res;
      }
    };
    OrganizationInvitation = class _OrganizationInvitation {
      static {
        __name(this, "_OrganizationInvitation");
      }
      constructor(id, emailAddress, role, roleName, organizationId, createdAt, updatedAt, expiresAt, url, status, publicMetadata = {}, privateMetadata = {}, publicOrganizationData) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.role = role;
        this.roleName = roleName;
        this.organizationId = organizationId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.expiresAt = expiresAt;
        this.url = url;
        this.status = status;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.publicOrganizationData = publicOrganizationData;
        this._raw = null;
      }
      get raw() {
        return this._raw;
      }
      static fromJSON(data) {
        const res = new _OrganizationInvitation(
          data.id,
          data.email_address,
          data.role,
          data.role_name,
          data.organization_id,
          data.created_at,
          data.updated_at,
          data.expires_at,
          data.url,
          data.status,
          data.public_metadata,
          data.private_metadata,
          data.public_organization_data
        );
        res._raw = data;
        return res;
      }
    };
    OrganizationMembership = class _OrganizationMembership {
      static {
        __name(this, "_OrganizationMembership");
      }
      constructor(id, role, permissions, publicMetadata = {}, privateMetadata = {}, createdAt, updatedAt, organization, publicUserData) {
        this.id = id;
        this.role = role;
        this.permissions = permissions;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.organization = organization;
        this.publicUserData = publicUserData;
        this._raw = null;
      }
      get raw() {
        return this._raw;
      }
      static fromJSON(data) {
        const res = new _OrganizationMembership(
          data.id,
          data.role,
          data.permissions,
          data.public_metadata,
          data.private_metadata,
          data.created_at,
          data.updated_at,
          Organization.fromJSON(data.organization),
          OrganizationMembershipPublicUserData.fromJSON(data.public_user_data)
        );
        res._raw = data;
        return res;
      }
    };
    OrganizationMembershipPublicUserData = class _OrganizationMembershipPublicUserData {
      static {
        __name(this, "_OrganizationMembershipPublicUserData");
      }
      constructor(identifier, firstName, lastName, imageUrl, hasImage, userId) {
        this.identifier = identifier;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
        this.hasImage = hasImage;
        this.userId = userId;
      }
      static fromJSON(data) {
        return new _OrganizationMembershipPublicUserData(
          data.identifier,
          data.first_name,
          data.last_name,
          data.image_url,
          data.has_image,
          data.user_id
        );
      }
    };
    OrganizationSettings = class _OrganizationSettings {
      static {
        __name(this, "_OrganizationSettings");
      }
      constructor(enabled, maxAllowedMemberships, maxAllowedRoles, maxAllowedPermissions, creatorRole, adminDeleteEnabled, domainsEnabled, slugDisabled, domainsEnrollmentModes, domainsDefaultRole) {
        this.enabled = enabled;
        this.maxAllowedMemberships = maxAllowedMemberships;
        this.maxAllowedRoles = maxAllowedRoles;
        this.maxAllowedPermissions = maxAllowedPermissions;
        this.creatorRole = creatorRole;
        this.adminDeleteEnabled = adminDeleteEnabled;
        this.domainsEnabled = domainsEnabled;
        this.slugDisabled = slugDisabled;
        this.domainsEnrollmentModes = domainsEnrollmentModes;
        this.domainsDefaultRole = domainsDefaultRole;
      }
      static fromJSON(data) {
        return new _OrganizationSettings(
          data.enabled,
          data.max_allowed_memberships,
          data.max_allowed_roles,
          data.max_allowed_permissions,
          data.creator_role,
          data.admin_delete_enabled,
          data.domains_enabled,
          data.slug_disabled,
          data.domains_enrollment_modes,
          data.domains_default_role
        );
      }
    };
    PhoneNumber = class _PhoneNumber {
      static {
        __name(this, "_PhoneNumber");
      }
      constructor(id, phoneNumber, reservedForSecondFactor, defaultSecondFactor, verification, linkedTo) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.reservedForSecondFactor = reservedForSecondFactor;
        this.defaultSecondFactor = defaultSecondFactor;
        this.verification = verification;
        this.linkedTo = linkedTo;
      }
      static fromJSON(data) {
        return new _PhoneNumber(
          data.id,
          data.phone_number,
          data.reserved_for_second_factor,
          data.default_second_factor,
          data.verification && Verification.fromJSON(data.verification),
          data.linked_to.map((link) => IdentificationLink.fromJSON(link))
        );
      }
    };
    ProxyCheck = class _ProxyCheck {
      static {
        __name(this, "_ProxyCheck");
      }
      constructor(id, domainId, lastRunAt, proxyUrl, successful, createdAt, updatedAt) {
        this.id = id;
        this.domainId = domainId;
        this.lastRunAt = lastRunAt;
        this.proxyUrl = proxyUrl;
        this.successful = successful;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _ProxyCheck(
          data.id,
          data.domain_id,
          data.last_run_at,
          data.proxy_url,
          data.successful,
          data.created_at,
          data.updated_at
        );
      }
    };
    RedirectUrl = class _RedirectUrl {
      static {
        __name(this, "_RedirectUrl");
      }
      constructor(id, url, createdAt, updatedAt) {
        this.id = id;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _RedirectUrl(data.id, data.url, data.created_at, data.updated_at);
      }
    };
    SamlConnection = class _SamlConnection {
      static {
        __name(this, "_SamlConnection");
      }
      constructor(id, name, domain, organizationId, idpEntityId, idpSsoUrl, idpCertificate, idpMetadataUrl, idpMetadata, acsUrl, spEntityId, spMetadataUrl, active, provider, userCount, syncUserAttributes, allowSubdomains, allowIdpInitiated, createdAt, updatedAt, attributeMapping) {
        this.id = id;
        this.name = name;
        this.domain = domain;
        this.organizationId = organizationId;
        this.idpEntityId = idpEntityId;
        this.idpSsoUrl = idpSsoUrl;
        this.idpCertificate = idpCertificate;
        this.idpMetadataUrl = idpMetadataUrl;
        this.idpMetadata = idpMetadata;
        this.acsUrl = acsUrl;
        this.spEntityId = spEntityId;
        this.spMetadataUrl = spMetadataUrl;
        this.active = active;
        this.provider = provider;
        this.userCount = userCount;
        this.syncUserAttributes = syncUserAttributes;
        this.allowSubdomains = allowSubdomains;
        this.allowIdpInitiated = allowIdpInitiated;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.attributeMapping = attributeMapping;
      }
      static fromJSON(data) {
        return new _SamlConnection(
          data.id,
          data.name,
          data.domain,
          data.organization_id,
          data.idp_entity_id,
          data.idp_sso_url,
          data.idp_certificate,
          data.idp_metadata_url,
          data.idp_metadata,
          data.acs_url,
          data.sp_entity_id,
          data.sp_metadata_url,
          data.active,
          data.provider,
          data.user_count,
          data.sync_user_attributes,
          data.allow_subdomains,
          data.allow_idp_initiated,
          data.created_at,
          data.updated_at,
          data.attribute_mapping && AttributeMapping.fromJSON(data.attribute_mapping)
        );
      }
    };
    AttributeMapping = class _AttributeMapping {
      static {
        __name(this, "_AttributeMapping");
      }
      constructor(userId, emailAddress, firstName, lastName) {
        this.userId = userId;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
      }
      static fromJSON(data) {
        return new _AttributeMapping(data.user_id, data.email_address, data.first_name, data.last_name);
      }
    };
    SignInToken = class _SignInToken {
      static {
        __name(this, "_SignInToken");
      }
      constructor(id, userId, token, status, url, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.status = status;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
      static fromJSON(data) {
        return new _SignInToken(data.id, data.user_id, data.token, data.status, data.url, data.created_at, data.updated_at);
      }
    };
    SignUpAttemptVerification = class _SignUpAttemptVerification {
      static {
        __name(this, "_SignUpAttemptVerification");
      }
      constructor(nextAction, supportedStrategies) {
        this.nextAction = nextAction;
        this.supportedStrategies = supportedStrategies;
      }
      static fromJSON(data) {
        return new _SignUpAttemptVerification(data.next_action, data.supported_strategies);
      }
    };
    SignUpAttemptVerifications = class _SignUpAttemptVerifications {
      static {
        __name(this, "_SignUpAttemptVerifications");
      }
      constructor(emailAddress, phoneNumber, web3Wallet, externalAccount) {
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.web3Wallet = web3Wallet;
        this.externalAccount = externalAccount;
      }
      static fromJSON(data) {
        return new _SignUpAttemptVerifications(
          data.email_address && SignUpAttemptVerification.fromJSON(data.email_address),
          data.phone_number && SignUpAttemptVerification.fromJSON(data.phone_number),
          data.web3_wallet && SignUpAttemptVerification.fromJSON(data.web3_wallet),
          data.external_account
        );
      }
    };
    SignUpAttempt = class _SignUpAttempt {
      static {
        __name(this, "_SignUpAttempt");
      }
      constructor(id, status, requiredFields, optionalFields, missingFields, unverifiedFields, verifications, username, emailAddress, phoneNumber, web3Wallet, passwordEnabled, firstName, lastName, customAction, externalId, createdSessionId, createdUserId, abandonAt, legalAcceptedAt, publicMetadata, unsafeMetadata) {
        this.id = id;
        this.status = status;
        this.requiredFields = requiredFields;
        this.optionalFields = optionalFields;
        this.missingFields = missingFields;
        this.unverifiedFields = unverifiedFields;
        this.verifications = verifications;
        this.username = username;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.web3Wallet = web3Wallet;
        this.passwordEnabled = passwordEnabled;
        this.firstName = firstName;
        this.lastName = lastName;
        this.customAction = customAction;
        this.externalId = externalId;
        this.createdSessionId = createdSessionId;
        this.createdUserId = createdUserId;
        this.abandonAt = abandonAt;
        this.legalAcceptedAt = legalAcceptedAt;
        this.publicMetadata = publicMetadata;
        this.unsafeMetadata = unsafeMetadata;
      }
      static fromJSON(data) {
        return new _SignUpAttempt(
          data.id,
          data.status,
          data.required_fields,
          data.optional_fields,
          data.missing_fields,
          data.unverified_fields,
          data.verifications ? SignUpAttemptVerifications.fromJSON(data.verifications) : null,
          data.username,
          data.email_address,
          data.phone_number,
          data.web3_wallet,
          data.password_enabled,
          data.first_name,
          data.last_name,
          data.custom_action,
          data.external_id,
          data.created_session_id,
          data.created_user_id,
          data.abandon_at,
          data.legal_accepted_at,
          data.public_metadata,
          data.unsafe_metadata
        );
      }
    };
    SMSMessage = class _SMSMessage {
      static {
        __name(this, "_SMSMessage");
      }
      constructor(id, fromPhoneNumber, toPhoneNumber, message, status, phoneNumberId, data) {
        this.id = id;
        this.fromPhoneNumber = fromPhoneNumber;
        this.toPhoneNumber = toPhoneNumber;
        this.message = message;
        this.status = status;
        this.phoneNumberId = phoneNumberId;
        this.data = data;
      }
      static fromJSON(data) {
        return new _SMSMessage(
          data.id,
          data.from_phone_number,
          data.to_phone_number,
          data.message,
          data.status,
          data.phone_number_id,
          data.data
        );
      }
    };
    Token = class _Token {
      static {
        __name(this, "_Token");
      }
      constructor(jwt) {
        this.jwt = jwt;
      }
      static fromJSON(data) {
        return new _Token(data.jwt);
      }
    };
    Web3Wallet = class _Web3Wallet {
      static {
        __name(this, "_Web3Wallet");
      }
      constructor(id, web3Wallet, verification) {
        this.id = id;
        this.web3Wallet = web3Wallet;
        this.verification = verification;
      }
      static fromJSON(data) {
        return new _Web3Wallet(data.id, data.web3_wallet, data.verification && Verification.fromJSON(data.verification));
      }
    };
    User = class _User {
      static {
        __name(this, "_User");
      }
      constructor(id, passwordEnabled, totpEnabled, backupCodeEnabled, twoFactorEnabled, banned, locked, createdAt, updatedAt, imageUrl, hasImage, primaryEmailAddressId, primaryPhoneNumberId, primaryWeb3WalletId, lastSignInAt, externalId, username, firstName, lastName, publicMetadata = {}, privateMetadata = {}, unsafeMetadata = {}, emailAddresses = [], phoneNumbers = [], web3Wallets = [], externalAccounts = [], enterpriseAccounts = [], lastActiveAt, createOrganizationEnabled, createOrganizationsLimit = null, deleteSelfEnabled, legalAcceptedAt, locale) {
        this.id = id;
        this.passwordEnabled = passwordEnabled;
        this.totpEnabled = totpEnabled;
        this.backupCodeEnabled = backupCodeEnabled;
        this.twoFactorEnabled = twoFactorEnabled;
        this.banned = banned;
        this.locked = locked;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.imageUrl = imageUrl;
        this.hasImage = hasImage;
        this.primaryEmailAddressId = primaryEmailAddressId;
        this.primaryPhoneNumberId = primaryPhoneNumberId;
        this.primaryWeb3WalletId = primaryWeb3WalletId;
        this.lastSignInAt = lastSignInAt;
        this.externalId = externalId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.unsafeMetadata = unsafeMetadata;
        this.emailAddresses = emailAddresses;
        this.phoneNumbers = phoneNumbers;
        this.web3Wallets = web3Wallets;
        this.externalAccounts = externalAccounts;
        this.enterpriseAccounts = enterpriseAccounts;
        this.lastActiveAt = lastActiveAt;
        this.createOrganizationEnabled = createOrganizationEnabled;
        this.createOrganizationsLimit = createOrganizationsLimit;
        this.deleteSelfEnabled = deleteSelfEnabled;
        this.legalAcceptedAt = legalAcceptedAt;
        this.locale = locale;
        this._raw = null;
      }
      get raw() {
        return this._raw;
      }
      static fromJSON(data) {
        const res = new _User(
          data.id,
          data.password_enabled,
          data.totp_enabled,
          data.backup_code_enabled,
          data.two_factor_enabled,
          data.banned,
          data.locked,
          data.created_at,
          data.updated_at,
          data.image_url,
          data.has_image,
          data.primary_email_address_id,
          data.primary_phone_number_id,
          data.primary_web3_wallet_id,
          data.last_sign_in_at,
          data.external_id,
          data.username,
          data.first_name,
          data.last_name,
          data.public_metadata,
          data.private_metadata,
          data.unsafe_metadata,
          (data.email_addresses || []).map((x) => EmailAddress.fromJSON(x)),
          (data.phone_numbers || []).map((x) => PhoneNumber.fromJSON(x)),
          (data.web3_wallets || []).map((x) => Web3Wallet.fromJSON(x)),
          (data.external_accounts || []).map((x) => ExternalAccount.fromJSON(x)),
          (data.enterprise_accounts || []).map((x) => EnterpriseAccount.fromJSON(x)),
          data.last_active_at,
          data.create_organization_enabled,
          data.create_organizations_limit,
          data.delete_self_enabled,
          data.legal_accepted_at,
          data.locale
        );
        res._raw = data;
        return res;
      }
      /**
       * The primary email address of the user.
       */
      get primaryEmailAddress() {
        return this.emailAddresses.find(({ id }) => id === this.primaryEmailAddressId) ?? null;
      }
      /**
       * The primary phone number of the user.
       */
      get primaryPhoneNumber() {
        return this.phoneNumbers.find(({ id }) => id === this.primaryPhoneNumberId) ?? null;
      }
      /**
       * The primary web3 wallet of the user.
       */
      get primaryWeb3Wallet() {
        return this.web3Wallets.find(({ id }) => id === this.primaryWeb3WalletId) ?? null;
      }
      /**
       * The full name of the user.
       */
      get fullName() {
        return [this.firstName, this.lastName].join(" ").trim() || null;
      }
    };
    WaitlistEntry = class _WaitlistEntry {
      static {
        __name(this, "_WaitlistEntry");
      }
      constructor(id, emailAddress, status, invitation, createdAt, updatedAt, isLocked) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.status = status;
        this.invitation = invitation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isLocked = isLocked;
      }
      static fromJSON(data) {
        return new _WaitlistEntry(
          data.id,
          data.email_address,
          data.status,
          data.invitation && Invitation.fromJSON(data.invitation),
          data.created_at,
          data.updated_at,
          data.is_locked
        );
      }
    };
    __name(deserialize, "deserialize");
    __name(isPaginated, "isPaginated");
    __name(isM2MTokenResponse, "isM2MTokenResponse");
    __name(getCount, "getCount");
    __name(jsonToObject, "jsonToObject");
    __name(buildRequest, "buildRequest");
    __name(getTraceId, "getTraceId");
    __name(getRetryAfter, "getRetryAfter");
    __name(parseErrors2, "parseErrors");
    __name(withLegacyRequestReturn, "withLegacyRequestReturn");
    __name(createBackendApiClient, "createBackendApiClient");
    createDebug = /* @__PURE__ */ __name((data) => {
      return () => {
        const res = { ...data };
        res.secretKey = (res.secretKey || "").substring(0, 7);
        res.jwtKey = (res.jwtKey || "").substring(0, 7);
        return { ...res };
      };
    }, "createDebug");
    __name(signedInAuthObject, "signedInAuthObject");
    __name(signedOutAuthObject, "signedOutAuthObject");
    __name(authenticatedMachineObject, "authenticatedMachineObject");
    __name(unauthenticatedMachineObject, "unauthenticatedMachineObject");
    __name(invalidTokenAuthObject, "invalidTokenAuthObject");
    createGetToken = /* @__PURE__ */ __name((params) => {
      const { fetcher, sessionToken, sessionId } = params || {};
      return async (options = {}) => {
        if (!sessionId) {
          return null;
        }
        if (options.template || options.expiresInSeconds !== void 0) {
          return fetcher(sessionId, options.template, options.expiresInSeconds);
        }
        return sessionToken;
      };
    }, "createGetToken");
    AuthStatus = {
      SignedIn: "signed-in",
      SignedOut: "signed-out",
      Handshake: "handshake"
    };
    AuthErrorReason = {
      ClientUATWithoutSessionToken: "client-uat-but-no-session-token",
      DevBrowserMissing: "dev-browser-missing",
      DevBrowserSync: "dev-browser-sync",
      PrimaryRespondsToSyncing: "primary-responds-to-syncing",
      PrimaryDomainCrossOriginSync: "primary-domain-cross-origin-sync",
      SatelliteCookieNeedsSyncing: "satellite-needs-syncing",
      SessionTokenAndUATMissing: "session-token-and-uat-missing",
      SessionTokenMissing: "session-token-missing",
      SessionTokenExpired: "session-token-expired",
      SessionTokenIATBeforeClientUAT: "session-token-iat-before-client-uat",
      SessionTokenNBF: "session-token-nbf",
      SessionTokenIatInTheFuture: "session-token-iat-in-the-future",
      SessionTokenWithoutClientUAT: "session-token-but-no-client-uat",
      ActiveOrganizationMismatch: "active-organization-mismatch",
      TokenTypeMismatch: "token-type-mismatch",
      UnexpectedError: "unexpected-error"
    };
    __name(signedIn, "signedIn");
    __name(signedOut, "signedOut");
    __name(handshake, "handshake");
    __name(signedOutInvalidToken, "signedOutInvalidToken");
    withDebugHeaders = /* @__PURE__ */ __name((requestState) => {
      const headers = new Headers(requestState.headers || {});
      if (requestState.message) {
        try {
          headers.set(constants.Headers.AuthMessage, requestState.message);
        } catch {
        }
      }
      if (requestState.reason) {
        try {
          headers.set(constants.Headers.AuthReason, requestState.reason);
        } catch {
        }
      }
      if (requestState.status) {
        try {
          headers.set(constants.Headers.AuthStatus, requestState.status);
        } catch {
        }
      }
      requestState.headers = headers;
      return requestState;
    }, "withDebugHeaders");
    import_cookie = __toESM(require_dist());
    ClerkUrl = class extends URL {
      static {
        __name(this, "ClerkUrl");
      }
      isCrossOrigin(other) {
        return this.origin !== new URL(other.toString()).origin;
      }
    };
    createClerkUrl = /* @__PURE__ */ __name((...args) => {
      return new ClerkUrl(...args);
    }, "createClerkUrl");
    ClerkRequest = class extends Request {
      static {
        __name(this, "ClerkRequest");
      }
      constructor(input, init) {
        const url = typeof input !== "string" && "url" in input ? input.url : String(input);
        let cloneInit;
        if (init) {
          cloneInit = init;
        } else if (typeof input !== "string") {
          cloneInit = new Proxy(input, {
            get(target, prop) {
              if (prop === "signal") {
                return void 0;
              }
              return Reflect.get(target, prop, target);
            }
          });
        }
        super(url, cloneInit);
        this.clerkUrl = this.deriveUrlFromHeaders(this);
        this.cookies = this.parseCookies(this);
      }
      toJSON() {
        return {
          url: this.clerkUrl.href,
          method: this.method,
          headers: JSON.stringify(Object.fromEntries(this.headers)),
          clerkUrl: this.clerkUrl.toString(),
          cookies: JSON.stringify(Object.fromEntries(this.cookies))
        };
      }
      /**
       * Used to fix request.url using the x-forwarded-* headers
       * TODO add detailed description of the issues this solves
       */
      deriveUrlFromHeaders(req) {
        const initialUrl = new URL(req.url);
        const forwardedProto = req.headers.get(constants.Headers.ForwardedProto);
        const forwardedHost = req.headers.get(constants.Headers.ForwardedHost);
        const host = req.headers.get(constants.Headers.Host);
        const protocol = initialUrl.protocol;
        const resolvedHost = this.getFirstValueFromHeader(forwardedHost) ?? host;
        const resolvedProtocol = this.getFirstValueFromHeader(forwardedProto) ?? protocol?.replace(/[:/]/, "");
        const origin = resolvedHost && resolvedProtocol ? `${resolvedProtocol}://${resolvedHost}` : initialUrl.origin;
        if (origin === initialUrl.origin) {
          return createClerkUrl(initialUrl);
        }
        try {
          return createClerkUrl(initialUrl.pathname + initialUrl.search, origin);
        } catch {
          return createClerkUrl(initialUrl);
        }
      }
      getFirstValueFromHeader(value) {
        return value?.split(",")[0];
      }
      parseCookies(req) {
        const cookiesRecord = (0, import_cookie.parse)(this.decodeCookieValue(req.headers.get("cookie") || ""));
        return new Map(Object.entries(cookiesRecord));
      }
      decodeCookieValue(str) {
        return str ? str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent) : str;
      }
    };
    createClerkRequest = /* @__PURE__ */ __name((...args) => {
      const isClerkRequest = args[0] && typeof args[0] === "object" && "clerkUrl" in args[0] && "cookies" in args[0];
      return isClerkRequest ? args[0] : new ClerkRequest(...args);
    }, "createClerkRequest");
    getCookieName = /* @__PURE__ */ __name((cookieDirective) => {
      return cookieDirective.split(";")[0]?.split("=")[0];
    }, "getCookieName");
    getCookieValue = /* @__PURE__ */ __name((cookieDirective) => {
      return cookieDirective.split(";")[0]?.split("=")[1];
    }, "getCookieValue");
    __name(verifyToken, "verifyToken");
    __name(handleClerkAPIError, "handleClerkAPIError");
    __name(verifyM2MToken, "verifyM2MToken");
    __name(verifyOAuthToken, "verifyOAuthToken");
    __name(verifyAPIKey, "verifyAPIKey");
    __name(verifyMachineAuthToken, "verifyMachineAuthToken");
    __name(verifyHandshakeJwt, "verifyHandshakeJwt");
    __name(verifyHandshakeToken, "verifyHandshakeToken");
    HandshakeService = class {
      static {
        __name(this, "HandshakeService");
      }
      constructor(authenticateContext, options, organizationMatcher) {
        this.authenticateContext = authenticateContext;
        this.options = options;
        this.organizationMatcher = organizationMatcher;
      }
      /**
       * Determines if a request is eligible for handshake based on its headers
       *
       * Currently, a request is only eligible for a handshake if we can say it's *probably* a request for a document, not a fetch or some other exotic request.
       * This heuristic should give us a reliable enough signal for browsers that support `Sec-Fetch-Dest` and for those that don't.
       *
       * @returns boolean indicating if the request is eligible for handshake
       */
      isRequestEligibleForHandshake() {
        const { accept, method, secFetchDest } = this.authenticateContext;
        if (method !== "GET") {
          return false;
        }
        if (secFetchDest === "document" || secFetchDest === "iframe") {
          return true;
        }
        if (!secFetchDest && accept?.startsWith("text/html")) {
          return true;
        }
        return false;
      }
      /**
       * Builds the redirect headers for a handshake request
       * @param reason - The reason for the handshake (e.g. 'session-token-expired')
       * @returns Headers object containing the Location header for redirect
       * @throws Error if clerkUrl is missing in authenticateContext
       */
      buildRedirectToHandshake(reason) {
        if (!this.authenticateContext?.clerkUrl) {
          throw new Error("Missing clerkUrl in authenticateContext");
        }
        const redirectUrl = this.removeDevBrowserFromURL(this.authenticateContext.clerkUrl);
        let baseUrl = this.authenticateContext.frontendApi.startsWith("http") ? this.authenticateContext.frontendApi : `https://${this.authenticateContext.frontendApi}`;
        baseUrl = baseUrl.replace(/\/+$/, "") + "/";
        const url = new URL("v1/client/handshake", baseUrl);
        url.searchParams.append("redirect_url", redirectUrl?.href || "");
        url.searchParams.append("__clerk_api_version", SUPPORTED_BAPI_VERSION);
        url.searchParams.append(
          constants.QueryParameters.SuffixedCookies,
          this.authenticateContext.usesSuffixedCookies().toString()
        );
        url.searchParams.append(constants.QueryParameters.HandshakeReason, reason);
        url.searchParams.append(constants.QueryParameters.HandshakeFormat, "nonce");
        if (this.authenticateContext.sessionToken) {
          url.searchParams.append(constants.QueryParameters.Session, this.authenticateContext.sessionToken);
        }
        if (this.authenticateContext.instanceType === "development" && this.authenticateContext.devBrowserToken) {
          url.searchParams.append(constants.QueryParameters.DevBrowser, this.authenticateContext.devBrowserToken);
        }
        const toActivate = this.getOrganizationSyncTarget(this.authenticateContext.clerkUrl, this.organizationMatcher);
        if (toActivate) {
          const params = this.getOrganizationSyncQueryParams(toActivate);
          params.forEach((value, key) => {
            url.searchParams.append(key, value);
          });
        }
        return new Headers({ [constants.Headers.Location]: url.href });
      }
      /**
       * Gets cookies from either a handshake nonce or a handshake token
       * @returns Promise resolving to string array of cookie directives
       */
      async getCookiesFromHandshake() {
        const cookiesToSet = [];
        if (this.authenticateContext.handshakeNonce) {
          try {
            const handshakePayload = await this.authenticateContext.apiClient?.clients.getHandshakePayload({
              nonce: this.authenticateContext.handshakeNonce
            });
            if (handshakePayload) {
              cookiesToSet.push(...handshakePayload.directives);
            }
          } catch (error) {
            console.error("Clerk: HandshakeService: error getting handshake payload:", error);
          }
        } else if (this.authenticateContext.handshakeToken) {
          const handshakePayload = await verifyHandshakeToken(
            this.authenticateContext.handshakeToken,
            this.authenticateContext
          );
          if (handshakePayload && Array.isArray(handshakePayload.handshake)) {
            cookiesToSet.push(...handshakePayload.handshake);
          }
        }
        return cookiesToSet;
      }
      /**
       * Resolves a handshake request by verifying the handshake token and setting appropriate cookies
       * @returns Promise resolving to either a SignedInState or SignedOutState
       * @throws Error if handshake verification fails or if there are issues with the session token
       */
      async resolveHandshake() {
        const headers = new Headers({
          "Access-Control-Allow-Origin": "null",
          "Access-Control-Allow-Credentials": "true"
        });
        const cookiesToSet = await this.getCookiesFromHandshake();
        let sessionToken = "";
        cookiesToSet.forEach((x) => {
          headers.append("Set-Cookie", x);
          if (getCookieName(x).startsWith(constants.Cookies.Session)) {
            sessionToken = getCookieValue(x);
          }
        });
        if (this.authenticateContext.instanceType === "development") {
          const newUrl = new URL(this.authenticateContext.clerkUrl);
          newUrl.searchParams.delete(constants.QueryParameters.Handshake);
          newUrl.searchParams.delete(constants.QueryParameters.HandshakeHelp);
          newUrl.searchParams.delete(constants.QueryParameters.DevBrowser);
          newUrl.searchParams.delete(constants.QueryParameters.HandshakeNonce);
          headers.append(constants.Headers.Location, newUrl.toString());
          headers.set(constants.Headers.CacheControl, "no-store");
        }
        if (sessionToken === "") {
          return signedOut({
            tokenType: TokenType.SessionToken,
            authenticateContext: this.authenticateContext,
            reason: AuthErrorReason.SessionTokenMissing,
            message: "",
            headers
          });
        }
        const { data, errors: [error] = [] } = await verifyToken(sessionToken, this.authenticateContext);
        if (data) {
          return signedIn({
            tokenType: TokenType.SessionToken,
            authenticateContext: this.authenticateContext,
            sessionClaims: data,
            headers,
            token: sessionToken
          });
        }
        if (this.authenticateContext.instanceType === "development" && (error?.reason === TokenVerificationErrorReason.TokenExpired || error?.reason === TokenVerificationErrorReason.TokenNotActiveYet || error?.reason === TokenVerificationErrorReason.TokenIatInTheFuture)) {
          const developmentError = new TokenVerificationError({
            action: error.action,
            message: error.message,
            reason: error.reason
          });
          developmentError.tokenCarrier = "cookie";
          console.error(
            `Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${developmentError.getFullMessage()}`
          );
          const { data: retryResult, errors: [retryError] = [] } = await verifyToken(sessionToken, {
            ...this.authenticateContext,
            clockSkewInMs: 864e5
          });
          if (retryResult) {
            return signedIn({
              tokenType: TokenType.SessionToken,
              authenticateContext: this.authenticateContext,
              sessionClaims: retryResult,
              headers,
              token: sessionToken
            });
          }
          throw new Error(retryError?.message || "Clerk: Handshake retry failed.");
        }
        throw new Error(error?.message || "Clerk: Handshake failed.");
      }
      /**
       * Handles handshake token verification errors in development mode
       * @param error - The TokenVerificationError that occurred
       * @throws Error with a descriptive message about the verification failure
       */
      handleTokenVerificationErrorInDevelopment(error) {
        if (error.reason === TokenVerificationErrorReason.TokenInvalidSignature) {
          const msg = `Clerk: Handshake token verification failed due to an invalid signature. If you have switched Clerk keys locally, clear your cookies and try again.`;
          throw new Error(msg);
        }
        throw new Error(`Clerk: Handshake token verification failed: ${error.getFullMessage()}.`);
      }
      /**
       * Checks if a redirect loop is detected and sets headers to track redirect count
       * @param headers - The Headers object to modify
       * @returns boolean indicating if a redirect loop was detected (true) or if the request can proceed (false)
       */
      checkAndTrackRedirectLoop(headers) {
        if (this.authenticateContext.handshakeRedirectLoopCounter === 3) {
          return true;
        }
        const newCounterValue = this.authenticateContext.handshakeRedirectLoopCounter + 1;
        const cookieName = constants.Cookies.RedirectCount;
        headers.append("Set-Cookie", `${cookieName}=${newCounterValue}; SameSite=Lax; HttpOnly; Max-Age=2`);
        return false;
      }
      removeDevBrowserFromURL(url) {
        const updatedURL = new URL(url);
        updatedURL.searchParams.delete(constants.QueryParameters.DevBrowser);
        updatedURL.searchParams.delete(constants.QueryParameters.LegacyDevBrowser);
        return updatedURL;
      }
      getOrganizationSyncTarget(url, matchers) {
        return matchers.findTarget(url);
      }
      getOrganizationSyncQueryParams(toActivate) {
        const ret = /* @__PURE__ */ new Map();
        if (toActivate.type === "personalAccount") {
          ret.set("organization_id", "");
        }
        if (toActivate.type === "organization") {
          if (toActivate.organizationId) {
            ret.set("organization_id", toActivate.organizationId);
          }
          if (toActivate.organizationSlug) {
            ret.set("organization_id", toActivate.organizationSlug);
          }
        }
        return ret;
      }
    };
    OrganizationMatcher = class {
      static {
        __name(this, "OrganizationMatcher");
      }
      constructor(options) {
        this.organizationPattern = this.createMatcher(options?.organizationPatterns);
        this.personalAccountPattern = this.createMatcher(options?.personalAccountPatterns);
      }
      createMatcher(pattern) {
        if (!pattern) {
          return null;
        }
        try {
          return match2(pattern);
        } catch (e) {
          throw new Error(`Invalid pattern "${pattern}": ${e}`);
        }
      }
      findTarget(url) {
        const orgTarget = this.findOrganizationTarget(url);
        if (orgTarget) {
          return orgTarget;
        }
        return this.findPersonalAccountTarget(url);
      }
      findOrganizationTarget(url) {
        if (!this.organizationPattern) {
          return null;
        }
        try {
          const result = this.organizationPattern(url.pathname);
          if (!result || !("params" in result)) {
            return null;
          }
          const params = result.params;
          if (params.id) {
            return { type: "organization", organizationId: params.id };
          }
          if (params.slug) {
            return { type: "organization", organizationSlug: params.slug };
          }
          return null;
        } catch (e) {
          console.error("Failed to match organization pattern:", e);
          return null;
        }
      }
      findPersonalAccountTarget(url) {
        if (!this.personalAccountPattern) {
          return null;
        }
        try {
          const result = this.personalAccountPattern(url.pathname);
          return result ? { type: "personalAccount" } : null;
        } catch (e) {
          console.error("Failed to match personal account pattern:", e);
          return null;
        }
      }
    };
    RefreshTokenErrorReason = {
      NonEligibleNoCookie: "non-eligible-no-refresh-cookie",
      NonEligibleNonGet: "non-eligible-non-get",
      InvalidSessionToken: "invalid-session-token",
      MissingApiClient: "missing-api-client",
      MissingSessionToken: "missing-session-token",
      MissingRefreshToken: "missing-refresh-token",
      ExpiredSessionTokenDecodeFailed: "expired-session-token-decode-failed",
      ExpiredSessionTokenMissingSidClaim: "expired-session-token-missing-sid-claim",
      FetchError: "fetch-error",
      UnexpectedSDKError: "unexpected-sdk-error",
      UnexpectedBAPIError: "unexpected-bapi-error"
    };
    __name(assertSignInUrlExists, "assertSignInUrlExists");
    __name(assertProxyUrlOrDomain, "assertProxyUrlOrDomain");
    __name(assertSignInUrlFormatAndOrigin, "assertSignInUrlFormatAndOrigin");
    __name(assertMachineSecretOrSecretKey, "assertMachineSecretOrSecretKey");
    __name(isRequestEligibleForRefresh, "isRequestEligibleForRefresh");
    __name(checkTokenTypeMismatch, "checkTokenTypeMismatch");
    __name(isTokenTypeInAcceptedArray, "isTokenTypeInAcceptedArray");
    authenticateRequest = /* @__PURE__ */ __name((async (request, options) => {
      const authenticateContext = await createAuthenticateContext(createClerkRequest(request), options);
      const acceptsToken = options.acceptsToken ?? TokenType.SessionToken;
      if (acceptsToken !== TokenType.M2MToken) {
        assertValidSecretKey(authenticateContext.secretKey);
        if (authenticateContext.isSatellite) {
          assertSignInUrlExists(authenticateContext.signInUrl, authenticateContext.secretKey);
          if (authenticateContext.signInUrl && authenticateContext.origin) {
            assertSignInUrlFormatAndOrigin(authenticateContext.signInUrl, authenticateContext.origin);
          }
          assertProxyUrlOrDomain(authenticateContext.proxyUrl || authenticateContext.domain);
        }
      }
      if (acceptsToken === TokenType.M2MToken) {
        assertMachineSecretOrSecretKey(authenticateContext);
      }
      const organizationMatcher = new OrganizationMatcher(options.organizationSyncOptions);
      const handshakeService = new HandshakeService(
        authenticateContext,
        { organizationSyncOptions: options.organizationSyncOptions },
        organizationMatcher
      );
      async function refreshToken(authenticateContext2) {
        if (!options.apiClient) {
          return {
            data: null,
            error: {
              message: "An apiClient is needed to perform token refresh.",
              cause: { reason: RefreshTokenErrorReason.MissingApiClient }
            }
          };
        }
        const { sessionToken: expiredSessionToken, refreshTokenInCookie: refreshToken2 } = authenticateContext2;
        if (!expiredSessionToken) {
          return {
            data: null,
            error: {
              message: "Session token must be provided.",
              cause: { reason: RefreshTokenErrorReason.MissingSessionToken }
            }
          };
        }
        if (!refreshToken2) {
          return {
            data: null,
            error: {
              message: "Refresh token must be provided.",
              cause: { reason: RefreshTokenErrorReason.MissingRefreshToken }
            }
          };
        }
        const { data: decodeResult, errors: decodedErrors } = decodeJwt(expiredSessionToken);
        if (!decodeResult || decodedErrors) {
          return {
            data: null,
            error: {
              message: "Unable to decode the expired session token.",
              cause: { reason: RefreshTokenErrorReason.ExpiredSessionTokenDecodeFailed, errors: decodedErrors }
            }
          };
        }
        if (!decodeResult?.payload?.sid) {
          return {
            data: null,
            error: {
              message: "Expired session token is missing the `sid` claim.",
              cause: { reason: RefreshTokenErrorReason.ExpiredSessionTokenMissingSidClaim }
            }
          };
        }
        try {
          const response = await options.apiClient.sessions.refreshSession(decodeResult.payload.sid, {
            format: "cookie",
            suffixed_cookies: authenticateContext2.usesSuffixedCookies(),
            expired_token: expiredSessionToken || "",
            refresh_token: refreshToken2 || "",
            request_origin: authenticateContext2.clerkUrl.origin,
            // The refresh endpoint expects headers as Record<string, string[]>, so we need to transform it.
            request_headers: Object.fromEntries(Array.from(request.headers.entries()).map(([k, v]) => [k, [v]]))
          });
          return { data: response.cookies, error: null };
        } catch (err) {
          if (err?.errors?.length) {
            if (err.errors[0].code === "unexpected_error") {
              return {
                data: null,
                error: {
                  message: `Fetch unexpected error`,
                  cause: { reason: RefreshTokenErrorReason.FetchError, errors: err.errors }
                }
              };
            }
            return {
              data: null,
              error: {
                message: err.errors[0].code,
                cause: { reason: err.errors[0].code, errors: err.errors }
              }
            };
          } else {
            return {
              data: null,
              error: {
                message: `Unexpected Server/BAPI error`,
                cause: { reason: RefreshTokenErrorReason.UnexpectedBAPIError, errors: [err] }
              }
            };
          }
        }
      }
      __name(refreshToken, "refreshToken");
      async function attemptRefresh(authenticateContext2) {
        const { data: cookiesToSet, error } = await refreshToken(authenticateContext2);
        if (!cookiesToSet || cookiesToSet.length === 0) {
          return { data: null, error };
        }
        const headers = new Headers();
        let sessionToken = "";
        cookiesToSet.forEach((x) => {
          headers.append("Set-Cookie", x);
          if (getCookieName(x).startsWith(constants.Cookies.Session)) {
            sessionToken = getCookieValue(x);
          }
        });
        const { data: jwtPayload, errors } = await verifyToken(sessionToken, authenticateContext2);
        if (errors) {
          return {
            data: null,
            error: {
              message: `Clerk: unable to verify refreshed session token.`,
              cause: { reason: RefreshTokenErrorReason.InvalidSessionToken, errors }
            }
          };
        }
        return { data: { jwtPayload, sessionToken, headers }, error: null };
      }
      __name(attemptRefresh, "attemptRefresh");
      function handleMaybeHandshakeStatus(authenticateContext2, reason, message, headers) {
        if (!handshakeService.isRequestEligibleForHandshake()) {
          return signedOut({
            tokenType: TokenType.SessionToken,
            authenticateContext: authenticateContext2,
            reason,
            message
          });
        }
        const handshakeHeaders = headers ?? handshakeService.buildRedirectToHandshake(reason);
        if (handshakeHeaders.get(constants.Headers.Location)) {
          handshakeHeaders.set(constants.Headers.CacheControl, "no-store");
        }
        const isRedirectLoop = handshakeService.checkAndTrackRedirectLoop(handshakeHeaders);
        if (isRedirectLoop) {
          const msg = `Clerk: Refreshing the session token resulted in an infinite redirect loop. This usually means that your Clerk instance keys do not match - make sure to copy the correct publishable and secret keys from the Clerk dashboard.`;
          console.log(msg);
          return signedOut({
            tokenType: TokenType.SessionToken,
            authenticateContext: authenticateContext2,
            reason,
            message
          });
        }
        return handshake(authenticateContext2, reason, message, handshakeHeaders);
      }
      __name(handleMaybeHandshakeStatus, "handleMaybeHandshakeStatus");
      function handleMaybeOrganizationSyncHandshake(authenticateContext2, auth) {
        const organizationSyncTarget = organizationMatcher.findTarget(authenticateContext2.clerkUrl);
        if (!organizationSyncTarget) {
          return null;
        }
        let mustActivate = false;
        if (organizationSyncTarget.type === "organization") {
          if (organizationSyncTarget.organizationSlug && organizationSyncTarget.organizationSlug !== auth.orgSlug) {
            mustActivate = true;
          }
          if (organizationSyncTarget.organizationId && organizationSyncTarget.organizationId !== auth.orgId) {
            mustActivate = true;
          }
        }
        if (organizationSyncTarget.type === "personalAccount" && auth.orgId) {
          mustActivate = true;
        }
        if (!mustActivate) {
          return null;
        }
        if (authenticateContext2.handshakeRedirectLoopCounter >= 3) {
          console.warn(
            "Clerk: Organization activation handshake loop detected. This is likely due to an invalid organization ID or slug. Skipping organization activation."
          );
          return null;
        }
        const handshakeState = handleMaybeHandshakeStatus(
          authenticateContext2,
          AuthErrorReason.ActiveOrganizationMismatch,
          ""
        );
        if (handshakeState.status !== "handshake") {
          return null;
        }
        return handshakeState;
      }
      __name(handleMaybeOrganizationSyncHandshake, "handleMaybeOrganizationSyncHandshake");
      async function authenticateRequestWithTokenInHeader() {
        const { tokenInHeader } = authenticateContext;
        if (isMachineJwt(tokenInHeader)) {
          return signedOut({
            tokenType: TokenType.SessionToken,
            authenticateContext,
            reason: AuthErrorReason.TokenTypeMismatch,
            message: ""
          });
        }
        try {
          const { data, errors } = await verifyToken(tokenInHeader, authenticateContext);
          if (errors) {
            throw errors[0];
          }
          return signedIn({
            tokenType: TokenType.SessionToken,
            authenticateContext,
            sessionClaims: data,
            headers: new Headers(),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            token: tokenInHeader
          });
        } catch (err) {
          return handleSessionTokenError(err, "header");
        }
      }
      __name(authenticateRequestWithTokenInHeader, "authenticateRequestWithTokenInHeader");
      async function authenticateRequestWithTokenInCookie() {
        const hasActiveClient = authenticateContext.clientUat;
        const hasSessionToken = !!authenticateContext.sessionTokenInCookie;
        const hasDevBrowserToken = !!authenticateContext.devBrowserToken;
        if (authenticateContext.handshakeNonce || authenticateContext.handshakeToken) {
          try {
            return await handshakeService.resolveHandshake();
          } catch (error) {
            if (error instanceof TokenVerificationError && authenticateContext.instanceType === "development") {
              handshakeService.handleTokenVerificationErrorInDevelopment(error);
            } else {
              console.error("Clerk: unable to resolve handshake:", error);
            }
          }
        }
        const isRequestEligibleForMultiDomainSync = authenticateContext.isSatellite && authenticateContext.secFetchDest === "document" && authenticateContext.method === "GET";
        const syncedParam = authenticateContext.clerkUrl.searchParams.get(constants.QueryParameters.ClerkSynced);
        const needsSync = syncedParam === constants.ClerkSyncStatus.NeedsSync;
        const syncCompleted = syncedParam === constants.ClerkSyncStatus.Completed;
        const hasCookies = hasSessionToken || hasActiveClient;
        const shouldSkipSatelliteHandshake = authenticateContext.satelliteAutoSync !== true && !hasCookies && !needsSync;
        if (authenticateContext.instanceType === "production" && isRequestEligibleForMultiDomainSync && !syncCompleted) {
          if (shouldSkipSatelliteHandshake) {
            return signedOut({
              tokenType: TokenType.SessionToken,
              authenticateContext,
              reason: AuthErrorReason.SessionTokenAndUATMissing
            });
          }
          if (!hasCookies || needsSync) {
            return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SatelliteCookieNeedsSyncing, "");
          }
        }
        if (authenticateContext.instanceType === "development" && isRequestEligibleForMultiDomainSync && !syncCompleted) {
          if (shouldSkipSatelliteHandshake) {
            return signedOut({
              tokenType: TokenType.SessionToken,
              authenticateContext,
              reason: AuthErrorReason.SessionTokenAndUATMissing
            });
          }
          if (!hasCookies || needsSync) {
            const redirectURL = new URL(authenticateContext.signInUrl);
            redirectURL.searchParams.append(
              constants.QueryParameters.ClerkRedirectUrl,
              authenticateContext.clerkUrl.toString()
            );
            const headers = new Headers({ [constants.Headers.Location]: redirectURL.toString() });
            return handleMaybeHandshakeStatus(
              authenticateContext,
              AuthErrorReason.SatelliteCookieNeedsSyncing,
              "",
              headers
            );
          }
        }
        const redirectUrl = new URL(authenticateContext.clerkUrl).searchParams.get(
          constants.QueryParameters.ClerkRedirectUrl
        );
        if (authenticateContext.instanceType === "development" && !authenticateContext.isSatellite && redirectUrl) {
          const redirectBackToSatelliteUrl = new URL(redirectUrl);
          if (authenticateContext.devBrowserToken) {
            redirectBackToSatelliteUrl.searchParams.append(
              constants.QueryParameters.DevBrowser,
              authenticateContext.devBrowserToken
            );
          }
          redirectBackToSatelliteUrl.searchParams.set(
            constants.QueryParameters.ClerkSynced,
            constants.ClerkSyncStatus.Completed
          );
          const headers = new Headers({ [constants.Headers.Location]: redirectBackToSatelliteUrl.toString() });
          return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.PrimaryRespondsToSyncing, "", headers);
        }
        if (authenticateContext.instanceType === "development" && authenticateContext.clerkUrl.searchParams.has(constants.QueryParameters.DevBrowser)) {
          return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.DevBrowserSync, "");
        }
        if (authenticateContext.instanceType === "development" && !hasDevBrowserToken) {
          return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.DevBrowserMissing, "");
        }
        if (!hasActiveClient && !hasSessionToken) {
          return signedOut({
            tokenType: TokenType.SessionToken,
            authenticateContext,
            reason: AuthErrorReason.SessionTokenAndUATMissing
          });
        }
        if (!hasActiveClient && hasSessionToken) {
          return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SessionTokenWithoutClientUAT, "");
        }
        if (hasActiveClient && !hasSessionToken) {
          return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.ClientUATWithoutSessionToken, "");
        }
        const { data: decodeResult, errors: decodedErrors } = decodeJwt(authenticateContext.sessionTokenInCookie);
        if (decodedErrors) {
          return handleSessionTokenError(decodedErrors[0], "cookie");
        }
        if (decodeResult.payload.iat < authenticateContext.clientUat) {
          return handleMaybeHandshakeStatus(authenticateContext, AuthErrorReason.SessionTokenIATBeforeClientUAT, "");
        }
        try {
          const { data, errors } = await verifyToken(authenticateContext.sessionTokenInCookie, authenticateContext);
          if (errors) {
            throw errors[0];
          }
          if (!data.azp) {
            console.warn(
              "Clerk: Session token from cookie is missing the azp claim. In a future version of Clerk, this token will be considered invalid. Please contact Clerk support if you see this warning."
            );
          }
          const signedInRequestState = signedIn({
            tokenType: TokenType.SessionToken,
            authenticateContext,
            sessionClaims: data,
            headers: new Headers(),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            token: authenticateContext.sessionTokenInCookie
          });
          const shouldForceHandshakeForCrossDomain = !authenticateContext.isSatellite && // We're on primary
          authenticateContext.method === "GET" && // Only GET navigations (POST form submissions set sec-fetch-dest: document too)
          authenticateContext.secFetchDest === "document" && // Document navigation
          authenticateContext.isCrossOriginReferrer() && // Came from different domain
          !authenticateContext.isKnownClerkReferrer() && // Not from Clerk accounts portal or FAPI
          authenticateContext.handshakeRedirectLoopCounter === 0;
          if (shouldForceHandshakeForCrossDomain) {
            return handleMaybeHandshakeStatus(
              authenticateContext,
              AuthErrorReason.PrimaryDomainCrossOriginSync,
              "Cross-origin request from satellite domain requires handshake"
            );
          }
          const authObject = signedInRequestState.toAuth();
          if (authObject.userId) {
            const handshakeRequestState = handleMaybeOrganizationSyncHandshake(authenticateContext, authObject);
            if (handshakeRequestState) {
              return handshakeRequestState;
            }
          }
          return signedInRequestState;
        } catch (err) {
          return handleSessionTokenError(err, "cookie");
        }
        return signedOut({
          tokenType: TokenType.SessionToken,
          authenticateContext,
          reason: AuthErrorReason.UnexpectedError
        });
      }
      __name(authenticateRequestWithTokenInCookie, "authenticateRequestWithTokenInCookie");
      async function handleSessionTokenError(err, tokenCarrier) {
        if (!(err instanceof TokenVerificationError)) {
          return signedOut({
            tokenType: TokenType.SessionToken,
            authenticateContext,
            reason: AuthErrorReason.UnexpectedError
          });
        }
        let refreshError;
        if (isRequestEligibleForRefresh(err, authenticateContext, request)) {
          const { data, error } = await attemptRefresh(authenticateContext);
          if (data) {
            return signedIn({
              tokenType: TokenType.SessionToken,
              authenticateContext,
              sessionClaims: data.jwtPayload,
              headers: data.headers,
              token: data.sessionToken
            });
          }
          if (error?.cause?.reason) {
            refreshError = error.cause.reason;
          } else {
            refreshError = RefreshTokenErrorReason.UnexpectedSDKError;
          }
        } else {
          if (request.method !== "GET") {
            refreshError = RefreshTokenErrorReason.NonEligibleNonGet;
          } else if (!authenticateContext.refreshTokenInCookie) {
            refreshError = RefreshTokenErrorReason.NonEligibleNoCookie;
          } else {
            refreshError = null;
          }
        }
        err.tokenCarrier = tokenCarrier;
        const reasonToHandshake = [
          TokenVerificationErrorReason.TokenExpired,
          TokenVerificationErrorReason.TokenNotActiveYet,
          TokenVerificationErrorReason.TokenIatInTheFuture
        ].includes(err.reason);
        if (reasonToHandshake) {
          return handleMaybeHandshakeStatus(
            authenticateContext,
            convertTokenVerificationErrorReasonToAuthErrorReason({ tokenError: err.reason, refreshError }),
            err.getFullMessage()
          );
        }
        return signedOut({
          tokenType: TokenType.SessionToken,
          authenticateContext,
          reason: err.reason,
          message: err.getFullMessage()
        });
      }
      __name(handleSessionTokenError, "handleSessionTokenError");
      function handleMachineError(tokenType, err) {
        if (!(err instanceof MachineTokenVerificationError)) {
          return signedOut({
            tokenType,
            authenticateContext,
            reason: AuthErrorReason.UnexpectedError
          });
        }
        return signedOut({
          tokenType,
          authenticateContext,
          reason: err.code,
          message: err.getFullMessage()
        });
      }
      __name(handleMachineError, "handleMachineError");
      async function authenticateMachineRequestWithTokenInHeader() {
        const { tokenInHeader } = authenticateContext;
        if (!tokenInHeader) {
          return handleSessionTokenError(new Error("Missing token in header"), "header");
        }
        if (!isMachineToken(tokenInHeader)) {
          return signedOut({
            tokenType: acceptsToken,
            authenticateContext,
            reason: AuthErrorReason.TokenTypeMismatch,
            message: ""
          });
        }
        const parsedTokenType = getMachineTokenType(tokenInHeader);
        const mismatchState = checkTokenTypeMismatch(parsedTokenType, acceptsToken, authenticateContext);
        if (mismatchState) {
          return mismatchState;
        }
        const { data, tokenType, errors } = await verifyMachineAuthToken(tokenInHeader, authenticateContext);
        if (errors) {
          return handleMachineError(tokenType, errors[0]);
        }
        return signedIn({
          tokenType,
          authenticateContext,
          machineData: data,
          token: tokenInHeader
        });
      }
      __name(authenticateMachineRequestWithTokenInHeader, "authenticateMachineRequestWithTokenInHeader");
      async function authenticateAnyRequestWithTokenInHeader() {
        const { tokenInHeader } = authenticateContext;
        if (!tokenInHeader) {
          return handleSessionTokenError(new Error("Missing token in header"), "header");
        }
        if (isMachineToken(tokenInHeader)) {
          const parsedTokenType = getMachineTokenType(tokenInHeader);
          const mismatchState = checkTokenTypeMismatch(parsedTokenType, acceptsToken, authenticateContext);
          if (mismatchState) {
            return mismatchState;
          }
          const { data: data2, tokenType, errors: errors2 } = await verifyMachineAuthToken(tokenInHeader, authenticateContext);
          if (errors2) {
            return handleMachineError(tokenType, errors2[0]);
          }
          return signedIn({
            tokenType,
            authenticateContext,
            machineData: data2,
            token: tokenInHeader
          });
        }
        const { data, errors } = await verifyToken(tokenInHeader, authenticateContext);
        if (errors) {
          return handleSessionTokenError(errors[0], "header");
        }
        return signedIn({
          tokenType: TokenType.SessionToken,
          authenticateContext,
          sessionClaims: data,
          token: tokenInHeader
        });
      }
      __name(authenticateAnyRequestWithTokenInHeader, "authenticateAnyRequestWithTokenInHeader");
      if (Array.isArray(acceptsToken)) {
        if (!isTokenTypeInAcceptedArray(acceptsToken, authenticateContext)) {
          return signedOutInvalidToken();
        }
      }
      if (authenticateContext.tokenInHeader) {
        if (acceptsToken === "any" || Array.isArray(acceptsToken)) {
          return authenticateAnyRequestWithTokenInHeader();
        }
        if (acceptsToken === TokenType.SessionToken) {
          return authenticateRequestWithTokenInHeader();
        }
        return authenticateMachineRequestWithTokenInHeader();
      }
      if (acceptsToken === TokenType.OAuthToken || acceptsToken === TokenType.ApiKey || acceptsToken === TokenType.M2MToken) {
        return signedOut({
          tokenType: acceptsToken,
          authenticateContext,
          reason: "No token in header"
        });
      }
      return authenticateRequestWithTokenInCookie();
    }), "authenticateRequest");
    debugRequestState = /* @__PURE__ */ __name((params) => {
      const { isSignedIn, isAuthenticated, proxyUrl, reason, message, publishableKey, isSatellite, domain } = params;
      return { isSignedIn, isAuthenticated, proxyUrl, reason, message, publishableKey, isSatellite, domain };
    }, "debugRequestState");
    convertTokenVerificationErrorReasonToAuthErrorReason = /* @__PURE__ */ __name(({
      tokenError,
      refreshError
    }) => {
      switch (tokenError) {
        case TokenVerificationErrorReason.TokenExpired:
          return `${AuthErrorReason.SessionTokenExpired}-refresh-${refreshError}`;
        case TokenVerificationErrorReason.TokenNotActiveYet:
          return AuthErrorReason.SessionTokenNBF;
        case TokenVerificationErrorReason.TokenIatInTheFuture:
          return AuthErrorReason.SessionTokenIatInTheFuture;
        default:
          return AuthErrorReason.UnexpectedError;
      }
    }, "convertTokenVerificationErrorReasonToAuthErrorReason");
    defaultOptions2 = {
      secretKey: "",
      machineSecretKey: "",
      jwtKey: "",
      apiUrl: void 0,
      apiVersion: void 0,
      proxyUrl: "",
      publishableKey: "",
      isSatellite: false,
      domain: "",
      audience: ""
    };
    __name(createAuthenticateRequest, "createAuthenticateRequest");
  }
});

// node_modules/@clerk/backend/dist/chunk-P263NW7Z.mjs
function withLegacyReturn(cb) {
  return async (...args) => {
    const { data, errors } = await cb(...args);
    if (errors) {
      throw errors[0];
    }
    return data;
  };
}
var init_chunk_P263NW7Z = __esm({
  "node_modules/@clerk/backend/dist/chunk-P263NW7Z.mjs"() {
    init_performance2();
    __name(withLegacyReturn, "withLegacyReturn");
  }
});

// node_modules/@clerk/shared/dist/runtime/underscore-ClYSgvuy.mjs
function snakeToCamel(str) {
  return str ? str.replace(/([-_][a-z])/g, (match3) => match3.toUpperCase().replace(/-|_/, "")) : "";
}
function camelToSnake(str) {
  return str ? str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) : "";
}
function isTruthy(value) {
  if (typeof value === `boolean`) return value;
  if (value === void 0 || value === null) return false;
  if (typeof value === `string`) {
    if (value.toLowerCase() === `true`) return true;
    if (value.toLowerCase() === `false`) return false;
  }
  const number = parseInt(value, 10);
  if (isNaN(number)) return false;
  if (number > 0) return true;
  return false;
}
var createDeepObjectTransformer, deepCamelToSnake, deepSnakeToCamel;
var init_underscore_ClYSgvuy = __esm({
  "node_modules/@clerk/shared/dist/runtime/underscore-ClYSgvuy.mjs"() {
    init_performance2();
    __name(snakeToCamel, "snakeToCamel");
    __name(camelToSnake, "camelToSnake");
    createDeepObjectTransformer = /* @__PURE__ */ __name((transform) => {
      const deepTransform = /* @__PURE__ */ __name((obj) => {
        if (!obj) return obj;
        if (Array.isArray(obj)) return obj.map((el) => {
          if (typeof el === "object" || Array.isArray(el)) return deepTransform(el);
          return el;
        });
        const copy = { ...obj };
        const keys = Object.keys(copy);
        for (const oldName of keys) {
          const newName = transform(oldName.toString());
          if (newName !== oldName) {
            copy[newName] = copy[oldName];
            delete copy[oldName];
          }
          if (typeof copy[newName] === "object") copy[newName] = deepTransform(copy[newName]);
        }
        return copy;
      }, "deepTransform");
      return deepTransform;
    }, "createDeepObjectTransformer");
    deepCamelToSnake = createDeepObjectTransformer(camelToSnake);
    deepSnakeToCamel = createDeepObjectTransformer(snakeToCamel);
    __name(isTruthy, "isTruthy");
  }
});

// node_modules/@clerk/shared/dist/runtime/telemetry-ZzMitk4y.mjs
function isWindowClerkWithMetadata(clerk) {
  return typeof clerk === "object" && clerk !== null && "constructor" in clerk && typeof clerk.constructor === "function";
}
var DEFAULT_CACHE_TTL_MS, TelemetryEventThrottler, LocalStorageThrottlerCache, InMemoryThrottlerCache, VALID_LOG_LEVELS, DEFAULT_CONFIG, TelemetryCollector;
var init_telemetry_ZzMitk4y = __esm({
  "node_modules/@clerk/shared/dist/runtime/telemetry-ZzMitk4y.mjs"() {
    init_performance2();
    init_keys_ChIG_Ewf();
    init_underscore_ClYSgvuy();
    DEFAULT_CACHE_TTL_MS = 864e5;
    TelemetryEventThrottler = class {
      static {
        __name(this, "TelemetryEventThrottler");
      }
      #cache;
      #cacheTtl = DEFAULT_CACHE_TTL_MS;
      constructor(cache2) {
        this.#cache = cache2;
      }
      isEventThrottled(payload) {
        const now = Date.now();
        const key = this.#generateKey(payload);
        const entry = this.#cache.getItem(key);
        if (!entry) {
          this.#cache.setItem(key, now);
          return false;
        }
        if (now - entry > this.#cacheTtl) {
          this.#cache.setItem(key, now);
          return false;
        }
        return true;
      }
      /**
      * Generates a consistent unique key for telemetry events by sorting payload properties.
      * This ensures that payloads with identical content in different orders produce the same key.
      */
      #generateKey(event) {
        const { sk: _sk, pk: _pk, payload, ...rest } = event;
        const sanitizedEvent = {
          ...payload,
          ...rest
        };
        return JSON.stringify(Object.keys({
          ...payload,
          ...rest
        }).sort().map((key) => sanitizedEvent[key]));
      }
    };
    LocalStorageThrottlerCache = class {
      static {
        __name(this, "LocalStorageThrottlerCache");
      }
      #storageKey = "clerk_telemetry_throttler";
      getItem(key) {
        return this.#getCache()[key];
      }
      setItem(key, value) {
        try {
          const cache2 = this.#getCache();
          cache2[key] = value;
          localStorage.setItem(this.#storageKey, JSON.stringify(cache2));
        } catch (err) {
          if (err instanceof DOMException && (err.name === "QuotaExceededError" || err.name === "NS_ERROR_DOM_QUOTA_REACHED") && localStorage.length > 0) localStorage.removeItem(this.#storageKey);
        }
      }
      removeItem(key) {
        try {
          const cache2 = this.#getCache();
          delete cache2[key];
          localStorage.setItem(this.#storageKey, JSON.stringify(cache2));
        } catch {
        }
      }
      #getCache() {
        try {
          const cacheString = localStorage.getItem(this.#storageKey);
          if (!cacheString) return {};
          return JSON.parse(cacheString);
        } catch {
          return {};
        }
      }
      static isSupported() {
        return typeof window !== "undefined" && !!window.localStorage;
      }
    };
    InMemoryThrottlerCache = class {
      static {
        __name(this, "InMemoryThrottlerCache");
      }
      #cache = /* @__PURE__ */ new Map();
      #maxSize = 1e4;
      getItem(key) {
        if (this.#cache.size > this.#maxSize) {
          this.#cache.clear();
          return;
        }
        return this.#cache.get(key);
      }
      setItem(key, value) {
        this.#cache.set(key, value);
      }
      removeItem(key) {
        this.#cache.delete(key);
      }
    };
    __name(isWindowClerkWithMetadata, "isWindowClerkWithMetadata");
    VALID_LOG_LEVELS = /* @__PURE__ */ new Set([
      "error",
      "warn",
      "info",
      "debug",
      "trace"
    ]);
    DEFAULT_CONFIG = {
      samplingRate: 1,
      maxBufferSize: 5,
      endpoint: "https://clerk-telemetry.com"
    };
    TelemetryCollector = class {
      static {
        __name(this, "TelemetryCollector");
      }
      #config;
      #eventThrottler;
      #metadata = {};
      #buffer = [];
      #pendingFlush = null;
      constructor(options) {
        this.#config = {
          maxBufferSize: options.maxBufferSize ?? DEFAULT_CONFIG.maxBufferSize,
          samplingRate: options.samplingRate ?? DEFAULT_CONFIG.samplingRate,
          perEventSampling: options.perEventSampling ?? true,
          disabled: options.disabled ?? false,
          debug: options.debug ?? false,
          endpoint: DEFAULT_CONFIG.endpoint
        };
        if (!options.clerkVersion && typeof window === "undefined") this.#metadata.clerkVersion = "";
        else this.#metadata.clerkVersion = options.clerkVersion ?? "";
        this.#metadata.sdk = options.sdk;
        this.#metadata.sdkVersion = options.sdkVersion;
        this.#metadata.publishableKey = options.publishableKey ?? "";
        const parsedKey = parsePublishableKey(options.publishableKey);
        if (parsedKey) this.#metadata.instanceType = parsedKey.instanceType;
        if (options.secretKey) this.#metadata.secretKey = options.secretKey.substring(0, 16);
        this.#eventThrottler = new TelemetryEventThrottler(LocalStorageThrottlerCache.isSupported() ? new LocalStorageThrottlerCache() : new InMemoryThrottlerCache());
      }
      get isEnabled() {
        if (this.#metadata.instanceType !== "development") return false;
        if (this.#config.disabled || typeof process !== "undefined" && process.env && isTruthy(process.env.CLERK_TELEMETRY_DISABLED)) return false;
        if (typeof window !== "undefined" && !!window?.navigator?.webdriver) return false;
        return true;
      }
      get isDebug() {
        return this.#config.debug || typeof process !== "undefined" && process.env && isTruthy(process.env.CLERK_TELEMETRY_DEBUG);
      }
      record(event) {
        try {
          const preparedPayload = this.#preparePayload(event.event, event.payload);
          this.#logEvent(preparedPayload.event, preparedPayload);
          if (!this.#shouldRecord(preparedPayload, event.eventSamplingRate)) return;
          this.#buffer.push({
            kind: "event",
            value: preparedPayload
          });
          this.#scheduleFlush();
        } catch (error) {
          console.error("[clerk/telemetry] Error recording telemetry event", error);
        }
      }
      /**
      * Records a telemetry log entry if logging is enabled and not in debug mode.
      *
      * @param entry - The telemetry log entry to record.
      */
      recordLog(entry) {
        try {
          if (!this.#shouldRecordLog(entry)) return;
          const levelIsValid = typeof entry?.level === "string" && VALID_LOG_LEVELS.has(entry.level);
          const messageIsValid = typeof entry?.message === "string" && entry.message.trim().length > 0;
          let normalizedTimestamp = null;
          const timestampInput = entry?.timestamp;
          if (typeof timestampInput === "number" || typeof timestampInput === "string") {
            const candidate = new Date(timestampInput);
            if (!Number.isNaN(candidate.getTime())) normalizedTimestamp = candidate;
          }
          if (!levelIsValid || !messageIsValid || normalizedTimestamp === null) {
            if (this.isDebug && typeof console !== "undefined") console.warn("[clerk/telemetry] Dropping invalid telemetry log entry", {
              levelIsValid,
              messageIsValid,
              timestampIsValid: normalizedTimestamp !== null
            });
            return;
          }
          const sdkMetadata = this.#getSDKMetadata();
          const logData = {
            sdk: sdkMetadata.name,
            sdkv: sdkMetadata.version,
            cv: this.#metadata.clerkVersion ?? "",
            lvl: entry.level,
            msg: entry.message,
            ts: normalizedTimestamp.toISOString(),
            pk: this.#metadata.publishableKey || null,
            payload: this.#sanitizeContext(entry.context)
          };
          this.#buffer.push({
            kind: "log",
            value: logData
          });
          this.#scheduleFlush();
        } catch (error) {
          console.error("[clerk/telemetry] Error recording telemetry log entry", error);
        }
      }
      #shouldRecord(preparedPayload, eventSamplingRate) {
        return this.isEnabled && !this.isDebug && this.#shouldBeSampled(preparedPayload, eventSamplingRate);
      }
      #shouldRecordLog(_entry) {
        return true;
      }
      #shouldBeSampled(preparedPayload, eventSamplingRate) {
        const randomSeed = Math.random();
        if (!(randomSeed <= this.#config.samplingRate && (this.#config.perEventSampling === false || typeof eventSamplingRate === "undefined" || randomSeed <= eventSamplingRate))) return false;
        return !this.#eventThrottler.isEventThrottled(preparedPayload);
      }
      #scheduleFlush() {
        if (typeof window === "undefined") {
          this.#flush();
          return;
        }
        if (this.#buffer.length >= this.#config.maxBufferSize) {
          if (this.#pendingFlush) if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(Number(this.#pendingFlush));
          else clearTimeout(Number(this.#pendingFlush));
          this.#flush();
          return;
        }
        if (this.#pendingFlush) return;
        if ("requestIdleCallback" in window) this.#pendingFlush = requestIdleCallback(() => {
          this.#flush();
          this.#pendingFlush = null;
        });
        else this.#pendingFlush = setTimeout(() => {
          this.#flush();
          this.#pendingFlush = null;
        }, 0);
      }
      #flush() {
        const itemsToSend = [...this.#buffer];
        this.#buffer = [];
        this.#pendingFlush = null;
        if (itemsToSend.length === 0) return;
        const eventsToSend = itemsToSend.filter((item) => item.kind === "event").map((item) => item.value);
        const logsToSend = itemsToSend.filter((item) => item.kind === "log").map((item) => item.value);
        if (eventsToSend.length > 0) {
          const eventsUrl = new URL("/v1/event", this.#config.endpoint);
          fetch(eventsUrl, {
            headers: { "Content-Type": "application/json" },
            keepalive: true,
            method: "POST",
            body: JSON.stringify({ events: eventsToSend })
          }).catch(() => void 0);
        }
        if (logsToSend.length > 0) {
          const logsUrl = new URL("/v1/logs", this.#config.endpoint);
          fetch(logsUrl, {
            headers: { "Content-Type": "application/json" },
            keepalive: true,
            method: "POST",
            body: JSON.stringify({ logs: logsToSend })
          }).catch(() => void 0);
        }
      }
      /**
      * If running in debug mode, log the event and its payload to the console.
      */
      #logEvent(event, payload) {
        if (!this.isDebug) return;
        if (typeof console.groupCollapsed !== "undefined") {
          console.groupCollapsed("[clerk/telemetry]", event);
          console.log(payload);
          console.groupEnd();
        } else console.log("[clerk/telemetry]", event, payload);
      }
      /**
      * If in browser, attempt to lazily grab the SDK metadata from the Clerk singleton, otherwise fallback to the initially passed in values.
      *
      * This is necessary because the sdkMetadata can be set by the host SDK after the TelemetryCollector is instantiated.
      */
      #getSDKMetadata() {
        const sdkMetadata = {
          name: this.#metadata.sdk,
          version: this.#metadata.sdkVersion
        };
        if (typeof window !== "undefined") {
          const windowWithClerk = window;
          if (windowWithClerk.Clerk) {
            const windowClerk = windowWithClerk.Clerk;
            if (isWindowClerkWithMetadata(windowClerk) && windowClerk.constructor.sdkMetadata) {
              const { name, version } = windowClerk.constructor.sdkMetadata;
              if (name !== void 0) sdkMetadata.name = name;
              if (version !== void 0) sdkMetadata.version = version;
            }
          }
        }
        return sdkMetadata;
      }
      /**
      * Append relevant metadata from the Clerk singleton to the event payload.
      */
      #preparePayload(event, payload) {
        const sdkMetadata = this.#getSDKMetadata();
        return {
          event,
          cv: this.#metadata.clerkVersion ?? "",
          it: this.#metadata.instanceType ?? "",
          sdk: sdkMetadata.name,
          sdkv: sdkMetadata.version,
          ...this.#metadata.publishableKey ? { pk: this.#metadata.publishableKey } : {},
          ...this.#metadata.secretKey ? { sk: this.#metadata.secretKey } : {},
          payload
        };
      }
      /**
      * Best-effort sanitization of the context payload. Returns a plain object with JSON-serializable
      * values or null when the input is missing or not serializable. Arrays are not accepted.
      */
      #sanitizeContext(context) {
        if (context === null || typeof context === "undefined") return null;
        if (typeof context !== "object") return null;
        try {
          const cleaned = JSON.parse(JSON.stringify(context));
          if (cleaned && typeof cleaned === "object" && !Array.isArray(cleaned)) return cleaned;
          return null;
        } catch {
          return null;
        }
      }
    };
  }
});

// node_modules/@clerk/shared/dist/runtime/telemetry.mjs
var init_telemetry = __esm({
  "node_modules/@clerk/shared/dist/runtime/telemetry.mjs"() {
    init_performance2();
    init_constants_Bta24VLk();
    init_isomorphicAtob_CoF80qYz();
    init_isomorphicBtoa_DWmLcIHi();
    init_keys_ChIG_Ewf();
    init_underscore_ClYSgvuy();
    init_telemetry_ZzMitk4y();
  }
});

// node_modules/@clerk/backend/dist/index.mjs
var dist_exports = {};
__export(dist_exports, {
  createClerkClient: () => createClerkClient,
  verifyToken: () => verifyToken2
});
function createClerkClient(options) {
  const opts = { ...options };
  const apiClient = createBackendApiClient(opts);
  const requestState = createAuthenticateRequest({ options: opts, apiClient });
  const telemetry = new TelemetryCollector({
    publishableKey: opts.publishableKey,
    secretKey: opts.secretKey,
    samplingRate: 0.1,
    ...opts.sdkMetadata ? { sdk: opts.sdkMetadata.name, sdkVersion: opts.sdkMetadata.version } : {},
    ...opts.telemetry || {}
  });
  return {
    ...apiClient,
    ...requestState,
    telemetry
  };
}
var verifyToken2;
var init_dist = __esm({
  "node_modules/@clerk/backend/dist/index.mjs"() {
    init_performance2();
    init_chunk_COVYMSO6();
    init_chunk_YBVFDYDR();
    init_chunk_P263NW7Z();
    init_chunk_J2CDX2WG();
    init_chunk_RZ7A7F6X();
    init_chunk_TOROEX6P();
    init_telemetry();
    verifyToken2 = withLegacyReturn(verifyToken);
    __name(createClerkClient, "createClerkClient");
  }
});

// src/router.js
init_performance2();

// node_modules/hono/dist/index.js
init_performance2();

// node_modules/hono/dist/hono.js
init_performance2();

// node_modules/hono/dist/hono-base.js
init_performance2();

// node_modules/hono/dist/compose.js
init_performance2();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/context.js
init_performance2();

// node_modules/hono/dist/request.js
init_performance2();

// node_modules/hono/dist/http-exception.js
init_performance2();

// node_modules/hono/dist/request/constants.js
init_performance2();
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
init_performance2();
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
init_performance2();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match3, index) => {
    const mark = `@${index}`;
    groups.push([mark, match3]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match3 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match3) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match3[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match3[1], new RegExp(`^${match3[2]}(?=/${next})`)] : [label, match3[1], new RegExp(`^${match3[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match3[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match3) => {
      try {
        return decoder(match3);
      } catch {
        return match3;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath33 = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath33 += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath33 === "") {
          results.push("/");
        } else {
          results.push(basePath33);
        }
        const optionalSegment = segment.replace("?", "");
        basePath33 += "/" + optionalSegment;
        results.push(basePath33);
      } else {
        basePath33 += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  }, "#cachedBody");
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
init_performance2();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = /* @__PURE__ */ __name((name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  }, "html");
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// node_modules/hono/dist/router.js
init_performance2();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// node_modules/hono/dist/utils/constants.js
init_performance2();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class _Hono {
  static {
    __name(this, "_Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// node_modules/hono/dist/router/reg-exp-router/index.js
init_performance2();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_performance2();

// node_modules/hono/dist/router/reg-exp-router/matcher.js
init_performance2();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match22 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match22;
  return match22(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
init_performance2();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class _Node {
  static {
    __name(this, "_Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_performance2();
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_2, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_2, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_performance2();

// node_modules/hono/dist/router/smart-router/index.js
init_performance2();

// node_modules/hono/dist/router/smart-router/router.js
init_performance2();
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/index.js
init_performance2();

// node_modules/hono/dist/router/trie-router/router.js
init_performance2();

// node_modules/hono/dist/router/trie-router/node.js
init_performance2();
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = /* @__PURE__ */ __name((children) => {
  for (const _2 in children) {
    return true;
  }
  return false;
}, "hasChildren");
var Node2 = class _Node2 {
  static {
    __name(this, "_Node");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// src/index.js
init_performance2();

// src/security.js
init_performance2();
var SECURITY = {
  RATE_LIMIT: {
    windowMs: 60 * 1e3,
    maxRequests: 100,
    blockDuration: 5 * 60 * 1e3
  },
  SANITIZE: {
    maxMessageLength: 1e4,
    maxStudentIdLength: 64,
    stripHtml: true,
    blockSql: true,
    blockXss: true
  },
  CORS: {
    allowedOrigins: [
      "https://naturalenglishtraining.com",
      "https://www.naturalenglishtraining.com",
      "https://net-pet-ai.mrmichaelhobbs123.workers.dev"
      // Add the specific extension ID here once deployed, e.g. 'chrome-extension://abcdef1234567890abcdef1234567890'
      // Never use 'chrome-extension://*' — it allows every installed extension to make credentialed requests.
    ],
    allowCredentials: true
  }
};
var _rateLimitFallback = /* @__PURE__ */ new Map();
async function checkRateLimit(ip, kv) {
  const now = Date.now();
  if (!kv) {
    console.warn("RATELIMIT KV binding not configured \u2014 rate limiting is ephemeral");
    return _checkRateLimitInMemory(ip, now);
  }
  const key = `rl:${ip}`;
  let raw2;
  try {
    raw2 = await kv.get(key);
  } catch {
    console.warn("RATELIMIT kv.get failed \u2014 falling back to in-memory");
    return _checkRateLimitInMemory(ip, now);
  }
  let record;
  try {
    record = raw2 ? JSON.parse(raw2) : { count: 0, resetAt: now + SECURITY.RATE_LIMIT.windowMs, blocked: false, blockUntil: 0 };
  } catch {
    console.warn("RATELIMIT JSON parse failed \u2014 falling back to in-memory");
    return _checkRateLimitInMemory(ip, now);
  }
  if (record.blocked && record.blockUntil > now) {
    return { allowed: false, remaining: 0, resetAt: record.blockUntil, reason: "rate_limit_blocked" };
  }
  if (record.resetAt <= now) {
    record.count = 0;
    record.resetAt = now + SECURITY.RATE_LIMIT.windowMs;
    record.blocked = false;
    record.blockUntil = 0;
  }
  if (record.count >= SECURITY.RATE_LIMIT.maxRequests) {
    record.blocked = true;
    record.blockUntil = now + SECURITY.RATE_LIMIT.blockDuration;
    try {
      await kv.put(key, JSON.stringify(record), { expirationTtl: Math.ceil(SECURITY.RATE_LIMIT.blockDuration / 1e3) });
    } catch {
      console.warn("RATELIMIT kv.put failed \u2014 continuing without persistent block");
    }
    return { allowed: false, remaining: 0, resetAt: record.blockUntil, reason: "rate_limit_exceeded" };
  }
  record.count++;
  try {
    await kv.put(key, JSON.stringify(record), { expirationTtl: Math.ceil(SECURITY.RATE_LIMIT.windowMs / 1e3) });
  } catch {
    console.warn("RATELIMIT kv.put failed \u2014 continuing without persistent state");
  }
  return { allowed: true, remaining: SECURITY.RATE_LIMIT.maxRequests - record.count, resetAt: record.resetAt };
}
__name(checkRateLimit, "checkRateLimit");
function _checkRateLimitInMemory(ip, now) {
  const windowStart = now - SECURITY.RATE_LIMIT.windowMs;
  for (const [key, data] of _rateLimitFallback) {
    if (data.resetAt < windowStart) _rateLimitFallback.delete(key);
  }
  const record = _rateLimitFallback.get(ip) || { count: 0, resetAt: now + SECURITY.RATE_LIMIT.windowMs, blocked: false, blockUntil: 0 };
  if (record.blocked && record.blockUntil > now) {
    return { allowed: false, remaining: 0, resetAt: record.blockUntil, reason: "rate_limit_blocked" };
  }
  if (record.count >= SECURITY.RATE_LIMIT.maxRequests) {
    record.blocked = true;
    record.blockUntil = now + SECURITY.RATE_LIMIT.blockDuration;
    _rateLimitFallback.set(ip, record);
    return { allowed: false, remaining: 0, resetAt: record.blockUntil, reason: "rate_limit_exceeded" };
  }
  record.count++;
  _rateLimitFallback.set(ip, record);
  return { allowed: true, remaining: SECURITY.RATE_LIMIT.maxRequests - record.count, resetAt: record.resetAt };
}
__name(_checkRateLimitInMemory, "_checkRateLimitInMemory");
function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  let output = input;
  if (output.length > SECURITY.SANITIZE.maxMessageLength) {
    output = output.slice(0, SECURITY.SANITIZE.maxMessageLength);
  }
  if (SECURITY.SANITIZE.stripHtml) {
    output = output.replace(/<[^>]*>/g, "");
  }
  if (SECURITY.SANITIZE.blockSql) {
    const sqlPatterns = [
      /(\bUNION\b.*\bSELECT\b)/i,
      /(\bDROP\s+TABLE\b)/i,
      /(\bDELETE\s+FROM\b)/i,
      /(\bINSERT\s+INTO\b)/i,
      /(';\s*DROP\b)/i,
      /(\bOR\s+1\s*=\s*1\b)/i
    ];
    for (const pattern of sqlPatterns) {
      if (pattern.test(output)) {
        console.warn("SQL_INJECTION_ATTEMPT:", output.slice(0, 50));
        output = output.replace(pattern, "[BLOCKED_SQL]");
      }
    }
  }
  if (SECURITY.SANITIZE.blockXss) {
    const xssPatterns = [
      /<script\b/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /eval\s*\(/i
    ];
    for (const pattern of xssPatterns) {
      if (pattern.test(output)) {
        console.warn("XSS_ATTEMPT:", output.slice(0, 50));
        output = output.replace(pattern, "[BLOCKED_XSS]");
      }
    }
  }
  return output.trim();
}
__name(sanitizeInput, "sanitizeInput");
function validateStudentId(studentId) {
  if (!studentId || typeof studentId !== "string") {
    return { valid: false, error: "studentId required" };
  }
  if (studentId.length > SECURITY.SANITIZE.maxStudentIdLength) {
    return { valid: false, error: "studentId too long" };
  }
  if (!/^[a-zA-Z0-9._-]+$/.test(studentId)) {
    return { valid: false, error: "studentId contains invalid characters" };
  }
  return { valid: true };
}
__name(validateStudentId, "validateStudentId");
var ACTIVE_STUDENT_ROSTER = /* @__PURE__ */ new Set([
  "huong-bluetech",
  "mai-tram-bluetech",
  "quy-bluetech",
  "lam-bluetech",
  "quan-bluetech",
  "quang-bluetech",
  "minh-bluetech",
  // test / warm-up IDs
  "sov100-test-magic",
  "keep-warm-ping"
]);
function validateActiveStudent(studentId) {
  if (!studentId || typeof studentId !== "string") return { valid: false, error: "studentId required" };
  if (studentId.startsWith("sov100-")) return { valid: true };
  if (ACTIVE_STUDENT_ROSTER.has(studentId)) return { valid: true };
  return { valid: false, error: "student not in active roster" };
}
__name(validateActiveStudent, "validateActiveStudent");
function getCorsHeaders(origin = "") {
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Student-Token"
  };
  const isAllowed = SECURITY.CORS.allowedOrigins.some(
    (allowed) => allowed === "*" || origin === allowed || allowed.endsWith("*") && origin.startsWith(allowed.slice(0, -1))
  );
  if (isAllowed) {
    headers["Access-Control-Allow-Origin"] = SECURITY.CORS.allowCredentials && origin ? origin : "*";
  }
  if (SECURITY.CORS.allowCredentials && origin) {
    headers["Access-Control-Allow-Credentials"] = "true";
  }
  return headers;
}
__name(getCorsHeaders, "getCorsHeaders");
function validateOrigin(origin) {
  if (!origin) return true;
  return SECURITY.CORS.allowedOrigins.some((allowed) => allowed === "*" || origin === allowed || allowed.endsWith("*") && origin.startsWith(allowed.slice(0, -1)));
}
__name(validateOrigin, "validateOrigin");
async function securityMiddleware(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const origin = request.headers.get("Origin") || "";
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/health") && !url.pathname.startsWith("/api/stt")) {
    const rateCheck = await checkRateLimit(ip, env?.RATELIMIT);
    if (!rateCheck.allowed) {
      return new Response(JSON.stringify({
        error: "Rate limit exceeded",
        retryAfter: Math.ceil((rateCheck.resetAt - Date.now()) / 1e3)
      }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": Math.ceil((rateCheck.resetAt - Date.now()) / 1e3).toString(),
          ...getCorsHeaders(origin)
        }
      });
    }
  }
  if (url.pathname.startsWith("/api/") && !validateOrigin(origin)) {
    console.warn("CORS_BLOCKED:", origin);
    return new Response(JSON.stringify({
      error: "Origin not allowed"
    }), {
      status: 403,
      headers: { "Content-Type": "application/json", ...getCorsHeaders(origin) }
    });
  }
  return null;
}
__name(securityMiddleware, "securityMiddleware");
async function checkAdminKey(request, env) {
  const expected = env.WORKER_ADMIN_KEY || "";
  if (!expected) return null;
  const provided = request.headers.get("X-Admin-Key") || "";
  const enc = new TextEncoder();
  const a = enc.encode(provided.padEnd(128, "\0"));
  const b = enc.encode(expected.padEnd(128, "\0"));
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  if (diff !== 0) {
    const origin = request.headers.get("Origin") || "";
    return new Response(JSON.stringify({ error: "Unauthorized", hint: "X-Admin-Key header required" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...getCorsHeaders(origin) }
    });
  }
  return null;
}
__name(checkAdminKey, "checkAdminKey");
async function logAudit(env, { action, actor = "system", target = "", ip = "", meta = {} }) {
  if (!env.SOUL_DB) return;
  try {
    await env.SOUL_DB.prepare(
      `CREATE TABLE IF NOT EXISTS audit_log_v2 (
        id TEXT PRIMARY KEY,
        ts INTEGER NOT NULL,
        action TEXT NOT NULL,
        target TEXT NOT NULL,
        performed_by TEXT NOT NULL,
        metadata TEXT
      )`
    ).run();
    const id = `aud-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await env.SOUL_DB.prepare(
      `INSERT INTO audit_log_v2 (id, ts, action, target, performed_by, metadata) VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(id, Math.floor(Date.now() / 1e3), action, target, actor, JSON.stringify({ ...meta, ip })).run();
  } catch (e) {
    console.warn("AUDIT_LOG_FAIL:", e.message);
  }
}
__name(logAudit, "logAudit");

// src/logger.js
init_performance2();
async function writeLog(level, tag, data, env) {
  const entry = {
    ts: (/* @__PURE__ */ new Date()).toISOString(),
    level,
    tag,
    ...data
  };
  const line = `[${level}] ${tag} ${JSON.stringify(data)}`;
  if (level === "ERROR") console.error(line);
  else if (level === "WARN") console.warn(line);
  else console.log(line);
  if (env?.SOUL_DB) {
    try {
      await env.SOUL_DB.prepare(
        "INSERT INTO error_log (ts, level, tag, payload) VALUES (?, ?, ?, ?)"
      ).bind(entry.ts, level, tag, JSON.stringify(data)).run();
    } catch (e) {
      console.error(`[LOGGER] D1 write failed for ${tag}: ${e.message}`);
    }
  }
}
__name(writeLog, "writeLog");
function logError(tag, data, env) {
  return writeLog("ERROR", tag, data || {}, env);
}
__name(logError, "logError");
function logWarn(tag, data, env) {
  return writeLog("WARN", tag, data || {}, env);
}
__name(logWarn, "logWarn");
function logInfo(tag, data, env) {
  return writeLog("INFO", tag, data || {}, env);
}
__name(logInfo, "logInfo");

// src/memory-brain.js
init_performance2();
var WEAKNESS_PATTERNS = {
  past_tense: { category: "grammar", pattern: /past tense|went|was\/were|did not|irregular verb/i },
  present_perfect: { category: "grammar", pattern: /present perfect|have been|has been|have done/i },
  articles: { category: "grammar", pattern: /\barticle|use "the"|use "a"|missing article/i },
  prepositions: { category: "grammar", pattern: /preposition|"in" not "on"|"at" not "in"|wrong preposition/i },
  word_order: { category: "grammar", pattern: /word order|sentence structure|rearrange|subject.*verb.*object/i },
  subject_verb: { category: "grammar", pattern: /subject.verb|agreement|plural.*singular|singular.*plural/i },
  conditionals: { category: "grammar", pattern: /conditional|if.*would|if.*will|would have/i },
  th_sound: { category: "pronunciation", pattern: /\/th\/|th sound|"th"|tongue.*teeth/i },
  r_l_sound: { category: "pronunciation", pattern: /\/r\/|\/l\/|r sound|l sound|r and l/i },
  final_consonant: { category: "pronunciation", pattern: /final consonant|ending sound|drop.*end/i },
  word_stress: { category: "pronunciation", pattern: /stress|emphasis|syllable/i },
  vocabulary: { category: "vocabulary", pattern: /vocabulary|word choice|better word|synonym|collocation/i },
  formality: { category: "vocabulary", pattern: /formal|informal|register|polite|casual/i }
};
function extractWeaknesses(obiReply) {
  const found = [];
  for (const [specific, { category, pattern }] of Object.entries(WEAKNESS_PATTERNS)) {
    if (pattern.test(obiReply)) {
      found.push({ specific, category });
    }
  }
  return found;
}
__name(extractWeaknesses, "extractWeaknesses");
function buildWeaknessPrompt(weakPoints) {
  if (!weakPoints || weakPoints.length === 0) return "";
  const top = weakPoints.slice(0, 5);
  const lines = top.map(
    (w) => `- ${w.specific.replace(/_/g, " ")} (${w.category}): seen ${w.error_count}x, last ${daysAgo(w.last_seen)}`
  );
  return `

STUDENT WEAK POINTS (prioritize corrections targeting these):
${lines.join("\n")}`;
}
__name(buildWeaknessPrompt, "buildWeaknessPrompt");
function buildReEntryPrompt(daysSinceActive, topWeakness) {
  if (daysSinceActive < 3) return "";
  const weakHint = topWeakness ? ` Their top weakness is still: ${topWeakness.replace(/_/g, " ")}.` : "";
  if (daysSinceActive >= 14) {
    return `

RE-ENTRY MODE (${daysSinceActive} days absent): Welcome the student back warmly. No guilt. Give one easy win drill first, then target their known weakness.${weakHint} Resume progress \u2014 no reset. They are not starting over.`;
  }
  return `

RE-ENTRY MODE (${daysSinceActive} days absent): Welcome back naturally. Start with their known weakness for quick re-engagement.${weakHint} No reset. Continue where they left off.`;
}
__name(buildReEntryPrompt, "buildReEntryPrompt");
function buildRewardSignals(weakPoints, streakDays) {
  const signals = [];
  for (const w of weakPoints || []) {
    if (w.improvement_pct > 20) {
      signals.push(`${w.specific.replace(/_/g, " ")} errors down ${w.improvement_pct}%`);
    }
  }
  if (streakDays >= 30) signals.push(`${streakDays}-day streak \u2014 Tiger status. Mention it: "Don't break this chain \u2014 it took ${streakDays} days to build."`);
  else if (streakDays >= 7) signals.push(`${streakDays}-day streak \u2014 real momentum. Mention it with stakes: "Day ${streakDays}. Your brain is rewiring. Show up tomorrow."`);
  else if (streakDays >= 3) signals.push(`${streakDays} days in a row \u2014 the habit is forming. Mention it: "Day ${streakDays}. Keep the chain alive."`);
  else if (streakDays === 2) signals.push(`Two days in a row \u2014 chain has started. Mention it: "Day 2. Day 3 is where it gets real."`);
  else if (streakDays === 1) signals.push(`First day back. Mention it: "Day 1. Show up tomorrow \u2014 that's all."`);
  return signals;
}
__name(buildRewardSignals, "buildRewardSignals");
function buildRewardPrompt(signals) {
  if (!signals || signals.length === 0) return "";
  return `

PROGRESS TO MENTION (naturally weave ONE of these into your response):
- ${signals.join("\n- ")}`;
}
__name(buildRewardPrompt, "buildRewardPrompt");
function daysAgo(ts) {
  if (!ts) return "unknown";
  const d = Math.floor((Date.now() - ts) / 864e5);
  if (d === 0) return "today";
  if (d === 1) return "yesterday";
  return `${d} days ago`;
}
__name(daysAgo, "daysAgo");

// src/token-track.js
init_performance2();

// src/notion.js
init_performance2();

// src/zalo.js
init_performance2();
var ZALO_API = "https://openapi.zalo.me/v3.0/oa/message/cs";
var COOLDOWN_MS = 24 * 60 * 60 * 1e3;
async function checkCooldown(env, studentId, alertType) {
  try {
    const stub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
    const res = await stub.fetch(new Request(`https://do/alerts/last?studentId=${encodeURIComponent(studentId)}&alertType=${encodeURIComponent(alertType)}`));
    const data = await res.json();
    if (data.lastAlert && Date.now() - data.lastAlert.ts < COOLDOWN_MS) {
      return { coolingDown: true, lastSentAt: data.lastAlert.ts, retryAfter: COOLDOWN_MS - (Date.now() - data.lastAlert.ts) };
    }
    return { coolingDown: false };
  } catch {
    return { coolingDown: false };
  }
}
__name(checkCooldown, "checkCooldown");
async function logAlert(env, studentId, alertType, recipientRole, recipientId, message, simulated) {
  try {
    const stub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
    await stub.fetch(new Request("https://do/alerts/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, alertType, recipientRole, recipientId, message, simulated })
    }));
  } catch {
  }
}
__name(logAlert, "logAlert");
async function ledgerFlag(env, studentId, alertType, recipientRole, simulated) {
  try {
    const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
    await stub.fetch(new Request("https://do/append", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId,
        eventType: "accountability_flag",
        payload: JSON.stringify({ alertType, recipientRole, simulated, ts: Date.now() })
      })
    }));
  } catch {
  }
}
__name(ledgerFlag, "ledgerFlag");
async function sendZaloMessage(env, zaloUserId, text) {
  const simulated = !env.ZALO_ACCESS_TOKEN;
  if (simulated) {
    console.log(`[ZALO-SIM] Would send to ${zaloUserId}: ${text.slice(0, 80)}...`);
    return { ok: true, simulated: true, reason: "no_access_token" };
  }
  if (!zaloUserId) return { ok: false, simulated: false, reason: "missing_zalo_id" };
  const res = await fetch(ZALO_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access_token": env.ZALO_ACCESS_TOKEN
    },
    body: JSON.stringify({
      recipient: { user_id: zaloUserId },
      message: { text }
    })
  });
  const data = await res.json();
  return { ok: data.error === 0, simulated: false, data };
}
__name(sendZaloMessage, "sendZaloMessage");
function buildStudentNudge(studentName, streak) {
  return `OBI nh\u1EAFc nh\u1EDF \u{1F4E2}

${studentName}, b\u1EA1n ch\u01B0a luy\u1EC7n t\u1EADp h\xF4m nay.

\u{1F525} Streak: ${streak} ng\xE0y \u2014 \u0111\u1EEBng \u0111\u1EC3 m\u1EA5t!

Ch\u1EC9 c\u1EA7n 5 ph\xFAt n\xF3i ti\u1EBFng Anh \u0111\u1EC3 gi\u1EEF streak.
Just 5 minutes of speaking to keep your streak alive.

\u{1F449} naturalenglishtraining.net/speak`;
}
__name(buildStudentNudge, "buildStudentNudge");
function buildParentAlert(studentName, streak, daysInactive) {
  return `OBI TH\xD4NG B\xC1O \u{1F4C9}

${studentName} ch\u01B0a luy\u1EC7n t\u1EADp ${daysInactive} ng\xE0y.

\u{1F525} Streak hi\u1EC7n t\u1EA1i: ${streak} ng\xE0y
\u{1F4C9} Ti\u1EBFn \u0111\u1ED9 h\u1ECDc \u0111ang b\u1ECB \u1EA3nh h\u01B0\u1EDFng

Khuy\u1EBFn ngh\u1ECB: 10 ph\xFAt luy\u1EC7n n\xF3i h\xF4m nay.
Recommendation: 10 minutes speaking practice today.

\u{1F449} naturalenglishtraining.net/speak`;
}
__name(buildParentAlert, "buildParentAlert");
function buildEscalatedAlert(studentName, daysInactive) {
  return `OBI C\u1EA2NH B\xC1O \u{1F6A8}

${studentName} \u0111\xE3 ngh\u1EC9 ${daysInactive} ng\xE0y li\xEAn ti\u1EBFp.

\u{1F4C9} Tiger Score \u0111ang GI\u1EA2M
\u{1F525} Streak \u0111\xE3 b\u1ECB reset

C\u1EA7n h\xE0nh \u0111\u1ED9ng ngay \u0111\u1EC3 kh\xF4ng m\u1EA5t ti\u1EBFn \u0111\u1ED9.
Immediate action needed to prevent learning loss.

\u{1F449} naturalenglishtraining.net/speak`;
}
__name(buildEscalatedAlert, "buildEscalatedAlert");
function buildFinalNotice(studentName, daysInactive) {
  return `OBI TH\xD4NG B\xC1O CU\u1ED0I \u26A0\uFE0F

${studentName} \u0111\xE3 ngh\u1EC9 ${daysInactive} ng\xE0y.

Streak \u0111\xE3 b\u1ECB RESET. Tiger Score gi\u1EA3m m\u1EA1nh.

\u0110\xE2y \u0111ang \u1EA3nh h\u01B0\u1EDFng nghi\xEAm tr\u1ECDng \u0111\u1EBFn qu\xE1 tr\xECnh h\u1ECDc.
This is seriously affecting the learning process.

Khuy\u1EBFn ngh\u1ECB:
- Luy\u1EC7n n\xF3i 5 ph\xFAt NGAY H\xD4M NAY
- Li\xEAn h\u1EC7 Teacher Michael n\u1EBFu c\u1EA7n h\u1ED7 tr\u1EE3

\u{1F449} naturalenglishtraining.net/speak`;
}
__name(buildFinalNotice, "buildFinalNotice");
async function checkAndEscalate(env, student) {
  const now = Date.now();
  const lastActive = student.last_active || student.last_checkin || 0;
  if (lastActive === 0) return { action: "skip", reason: "never_active" };
  const hoursInactive = (now - lastActive) / 36e5;
  const daysInactive = Math.floor(hoursInactive / 24);
  const studentName = student.full_name || student.student_id || "H\u1ECDc sinh";
  const streak = student.streak || 0;
  const simulated = !env.ZALO_ACCESS_TOKEN;
  const results = [];
  if (daysInactive < 2) {
    return { action: "active", hoursInactive, daysInactive };
  }
  let alertType, messageBuilder, sendToPartners;
  if (daysInactive >= 7) {
    alertType = "final_notice";
    messageBuilder = /* @__PURE__ */ __name(() => buildFinalNotice(studentName, daysInactive), "messageBuilder");
    sendToPartners = true;
  } else if (daysInactive >= 5) {
    alertType = "escalated";
    messageBuilder = /* @__PURE__ */ __name(() => buildEscalatedAlert(studentName, daysInactive), "messageBuilder");
    sendToPartners = true;
  } else if (daysInactive >= 3) {
    alertType = "parent_alert";
    messageBuilder = /* @__PURE__ */ __name(() => buildParentAlert(studentName, streak, daysInactive), "messageBuilder");
    sendToPartners = true;
  } else {
    alertType = "student_nudge";
    messageBuilder = /* @__PURE__ */ __name(() => buildStudentNudge(studentName, streak), "messageBuilder");
    sendToPartners = false;
  }
  const cooldown = await checkCooldown(env, student.student_id, alertType);
  if (cooldown.coolingDown) {
    return { action: "cooldown", alertType, hoursInactive, daysInactive, retryAfter: cooldown.retryAfter };
  }
  const message = messageBuilder();
  if (student.zalo_id) {
    const sent = await sendZaloMessage(env, student.zalo_id, message);
    results.push({ target: "student", sent });
    await logAlert(env, student.student_id, alertType, "student", student.zalo_id, message, simulated);
  }
  if (sendToPartners) {
    const links = await getAccountabilityLinks(env, student.student_id);
    for (const link of links) {
      if (link.zalo_id) {
        const sent = await sendZaloMessage(env, link.zalo_id, message);
        results.push({ target: link.role, sent });
        await logAlert(env, student.student_id, alertType, link.role, link.zalo_id, message, simulated);
      }
    }
  }
  if (env.LEDGER) {
    await ledgerFlag(env, student.student_id, alertType, sendToPartners ? "partners" : "student", simulated);
  }
  return { action: alertType, hoursInactive, daysInactive, sent: results.length, simulated, results };
}
__name(checkAndEscalate, "checkAndEscalate");
async function getAccountabilityLinks(env, studentId) {
  try {
    const stub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
    const res = await stub.fetch(new Request(`https://do/relations/get?studentId=${encodeURIComponent(studentId)}`));
    const data = await res.json();
    return data.links || [];
  } catch {
    return [];
  }
}
__name(getAccountabilityLinks, "getAccountabilityLinks");
async function runEscalationSweep(env) {
  const rosterStub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
  const rosterRes = await rosterStub.fetch(new Request("https://do/roster/all"));
  const rosterData = await rosterRes.json();
  const students = rosterData.students || [];
  const report = { checked: 0, nudges: 0, parentAlerts: 0, escalated: 0, finalNotices: 0, active: 0, cooldowns: 0, skipped: 0, simulated: !env.ZALO_ACCESS_TOKEN, errors: [] };
  for (const student of students) {
    try {
      const petStub = env.PETS.get(env.PETS.idFromName(student.student_id));
      const petRes = await petStub.fetch(new Request("https://do/state"));
      const petData = await petRes.json();
      const enriched = {
        ...student,
        streak: petData.state?.streak || student.streak || 0,
        last_checkin: petData.state?.lastCheckin || student.last_active || 0
      };
      const result = await checkAndEscalate(env, enriched);
      report.checked++;
      if (result.action === "student_nudge") report.nudges++;
      else if (result.action === "parent_alert") report.parentAlerts++;
      else if (result.action === "escalated") report.escalated++;
      else if (result.action === "final_notice") report.finalNotices++;
      else if (result.action === "active") report.active++;
      else if (result.action === "cooldown") report.cooldowns++;
      else report.skipped++;
    } catch (err) {
      report.errors.push({ studentId: student.student_id, error: err.message });
    }
  }
  return report;
}
__name(runEscalationSweep, "runEscalationSweep");

// src/growth-engine.js
init_performance2();

// src/virality.js
init_performance2();
function calculateVirality(m) {
  const impressions = m.impressions || 1;
  const engagementRate = ((m.likes || 0) + (m.comments || 0) * 2 + (m.shares || 0) * 3 + (m.saves || 0) * 2) / impressions;
  const retentionWeight = m.watch_time ? Math.min(m.watch_time / 10, 1) : 0;
  const score = engagementRate * 0.7 + retentionWeight * 0.3;
  return Math.round(score * 1e4) / 1e4;
}
__name(calculateVirality, "calculateVirality");
function calculateConversion(m) {
  const impressions = m.impressions || 1;
  const clicks = m.clicks || 0;
  const shares = m.shares || 0;
  const comments = m.comments || 0;
  const watchTime = m.watch_time ? Math.min(m.watch_time / 10, 1) : 0;
  const ctr = clicks / impressions;
  return Math.round((ctr * 0.4 + watchTime * 0.3 + shares / impressions * 0.2 + comments / impressions * 0.1) * 1e4) / 1e4;
}
__name(calculateConversion, "calculateConversion");
function evaluateExperiment(exp) {
  if ((exp.impressions || 0) < 100) return "continue";
  const score = (exp.conversions || 0) / (exp.impressions || 1);
  if (score > 0.08) return "winner";
  if (score < 0.02) return "kill";
  return "continue";
}
__name(evaluateExperiment, "evaluateExperiment");
function extractPattern(post, score) {
  return {
    hook_style: post.hook ? post.hook.substring(0, 60) : "",
    tone: post.tone || "unknown",
    platform: post.platform || "unknown",
    format: post.format || "text",
    score,
    insight: post.base_insight || "",
    extracted_at: Date.now()
  };
}
__name(extractPattern, "extractPattern");
async function runLearningLoop(env) {
  const stub = env.COMMANDS.get(env.COMMANDS.idFromName("virality-engine"));
  const report = { postsAnalyzed: 0, winners: 0, killed: 0, patternsExtracted: 0, errors: [] };
  try {
    const unscoredRes = await stub.fetch(new Request("https://do/virality/unscored"));
    const unscoredData = await unscoredRes.json();
    const posts = unscoredData.posts || [];
    for (const post of posts) {
      try {
        const viralityScore = calculateVirality(post);
        const conversionScore = calculateConversion(post);
        await stub.fetch(new Request("https://do/virality/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId: post.post_id, viralityScore, conversionScore })
        }));
        report.postsAnalyzed++;
        if (viralityScore > 0.05) {
          const pattern = extractPattern(post, viralityScore);
          await stub.fetch(new Request("https://do/virality/pattern", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pattern)
          }));
          report.patternsExtracted++;
          report.winners++;
        }
        if (post.experiment_id) {
          const status = evaluateExperiment(post);
          if (status !== "continue") {
            await stub.fetch(new Request("https://do/virality/experiment/update", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ experimentId: post.experiment_id, status })
            }));
            if (status === "kill") report.killed++;
          }
        }
      } catch (err) {
        report.errors.push({ postId: post.post_id, error: err.message });
      }
    }
  } catch (err) {
    report.errors.push({ phase: "fetch", error: err.message });
  }
  return report;
}
__name(runLearningLoop, "runLearningLoop");

// src/ant-colony.js
init_performance2();
var HALF_LIFE_DAYS = 7;
var MS_PER_DAY = 864e5;
var DOMAIN_DEFAULTS = {
  th_sound: ["exaggerate_mouth_position", "model_in_reply", "drill_repeat_x3", "shadow_after_correction", "minimal_pairs_t_v_s"],
  r_l_sound: ["isolation_drill", "mirror_practice", "model_in_reply", "tongue_position_cue"],
  final_consonant: ["word_end_tap", "syllable_stretch", "model_in_reply"],
  word_stress: ["stress_beats", "markup_bold_stress", "contrast_pair"],
  past_tense: ["timeline_viz", "forced_correction", "story_retell"],
  present_perfect: ["anchor_recent", "forced_correction", "story_retell"],
  articles: ["article_minimal_pair", "forced_correction"],
  prepositions: ["spatial_gesture", "forced_correction"],
  vocabulary: ["collocation_pair", "sentence_frame", "shadow_example"],
  formality: ["register_switch", "model_in_reply"]
};
async function ensureColonySchema(env) {
  if (!env.SOUL_DB) return false;
  await env.SOUL_DB.prepare(
    `CREATE TABLE IF NOT EXISTS pheromone_trails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      segment TEXT NOT NULL,
      action TEXT NOT NULL,
      weight REAL NOT NULL DEFAULT 0,
      deposits INTEGER NOT NULL DEFAULT 0,
      last_deposit_ts INTEGER NOT NULL DEFAULT 0,
      created_ts INTEGER NOT NULL DEFAULT 0,
      UNIQUE(segment, action)
    )`
  ).run();
  return true;
}
__name(ensureColonySchema, "ensureColonySchema");
async function seedDomainActions(env) {
  if (!await ensureColonySchema(env)) return { seeded: 0 };
  const now = Date.now();
  let seeded = 0;
  for (const [domain, actions] of Object.entries(DOMAIN_DEFAULTS)) {
    for (const action of actions) {
      const existing = await env.SOUL_DB.prepare(
        `SELECT id FROM pheromone_trails WHERE segment = ? AND action = ?`
      ).bind(domain, action).first();
      if (!existing) {
        await env.SOUL_DB.prepare(
          `INSERT INTO pheromone_trails (segment, action, weight, deposits, last_deposit_ts, created_ts)
           VALUES (?, ?, 0.5, 0, ?, ?)`
        ).bind(domain, action, now, now).run();
        seeded++;
      }
    }
  }
  return { seeded };
}
__name(seedDomainActions, "seedDomainActions");
async function depositTrail(env, { segment, action, weight = 1 }) {
  if (!env.SOUL_DB || !segment || !action) return null;
  await ensureColonySchema(env);
  const now = Date.now();
  await env.SOUL_DB.prepare(
    `INSERT INTO pheromone_trails (segment, action, weight, deposits, last_deposit_ts, created_ts)
     VALUES (?, ?, ?, 0, ?, ?)
     ON CONFLICT(segment, action) DO UPDATE SET
       weight = weight + ?,
       deposits = deposits + 1,
       last_deposit_ts = ?`
  ).bind(segment, action, weight, now, now, weight, now).run();
  return { segment, action, weight };
}
__name(depositTrail, "depositTrail");
async function depositFromBreakthrough(env, text, weight = 2) {
  if (!env.SOUL_DB || !text) return { domains: [] };
  const weaknesses = extractWeaknesses(String(text));
  const domains = [...new Set(weaknesses.map((w) => w.specific))];
  for (const domain of domains) {
    await depositTrail(env, { segment: domain, action: "model_in_reply", weight });
  }
  return { domains };
}
__name(depositFromBreakthrough, "depositFromBreakthrough");
async function evaporate(env, { halfLifeDays = HALF_LIFE_DAYS } = {}) {
  if (!env.SOUL_DB) return { pruned: 0 };
  await ensureColonySchema(env);
  const now = Date.now();
  const rows = await env.SOUL_DB.prepare(
    `SELECT id, weight, last_deposit_ts FROM pheromone_trails`
  ).all();
  let pruned = 0;
  for (const r of rows.results || []) {
    const ageDays = Math.max(0, (now - (r.last_deposit_ts || now)) / MS_PER_DAY);
    const decay = Math.pow(0.5, ageDays / halfLifeDays);
    const newWeight = (r.weight || 0) * decay;
    if (newWeight < 0.01) {
      await env.SOUL_DB.prepare(`DELETE FROM pheromone_trails WHERE id = ?`).bind(r.id).run();
      pruned++;
    } else {
      await env.SOUL_DB.prepare(`UPDATE pheromone_trails SET weight = ? WHERE id = ?`).bind(newWeight, r.id).run();
    }
  }
  return { pruned, halfLifeDays };
}
__name(evaporate, "evaporate");
async function getTrailMap(env, segment) {
  if (!env.SOUL_DB) return [];
  await ensureColonySchema(env);
  const q = segment ? `SELECT segment, action, weight, deposits, last_deposit_ts FROM pheromone_trails WHERE segment = ? ORDER BY weight DESC` : `SELECT segment, action, weight, deposits, last_deposit_ts FROM pheromone_trails ORDER BY weight DESC`;
  const r = segment ? await env.SOUL_DB.prepare(q).bind(segment).all() : await env.SOUL_DB.prepare(q).all();
  return r.results || [];
}
__name(getTrailMap, "getTrailMap");
async function runColonyLoop(env) {
  const report = { ok: true, schema: false, seeded: 0, evaporated: null, errors: [] };
  try {
    report.schema = await ensureColonySchema(env);
    const seed = await seedDomainActions(env);
    report.seeded = seed.seeded;
    report.evaporated = await evaporate(env);
  } catch (err) {
    report.errors.push(err.message);
    report.ok = false;
  }
  return report;
}
__name(runColonyLoop, "runColonyLoop");

// src/star-map.js
init_performance2();

// src/vocab-srs.js
init_performance2();
function computeNextReview(word, grade) {
  let interval = word.interval ?? 1;
  let repetitions = word.repetitions ?? 0;
  let ease_factor = word.ease_factor ?? 2.5;
  if (grade < 3) {
    interval = 1;
    repetitions = 0;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ease_factor);
    ease_factor = Math.max(1.3, ease_factor + 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    repetitions++;
  }
  return {
    interval,
    repetitions,
    ease_factor,
    next_review: Date.now() + interval * 864e5,
    last_grade: grade
  };
}
__name(computeNextReview, "computeNextReview");
function buildVocabContext(dueWords) {
  if (!dueWords || dueWords.length === 0) return "";
  const list = dueWords.slice(0, 5).map((w) => `"${w.word}"${w.translation ? ` (${w.translation})` : ""}`).join(", ");
  return `
VOCAB DUE TODAY (${dueWords.length} word${dueWords.length === 1 ? "" : "s"}): ${list}. Weave these into your responses \u2014 ask the student to use each one in a real sentence today.`;
}
__name(buildVocabContext, "buildVocabContext");

// src/durable_objects.js
init_performance2();
var LedgerDO = class {
  static {
    __name(this, "LedgerDO");
  }
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sql = state.storage.sql;
    this.sql.exec("CREATE TABLE IF NOT EXISTS ledger (id INTEGER PRIMARY KEY AUTOINCREMENT, student_id TEXT NOT NULL, event_type TEXT NOT NULL, payload TEXT NOT NULL, prev_hash TEXT NOT NULL DEFAULT '0000000000000000000000000000000000000000000000000000000000000000', entry_hash TEXT NOT NULL, ts INTEGER NOT NULL)");
    this.sql.exec("CREATE INDEX IF NOT EXISTS idx_ledger_student ON ledger(student_id, id)");
  }
  async fetch(request) {
    const url = new URL(request.url);
    function j(d, s2 = 200) {
      return new Response(JSON.stringify(d), { status: s2, headers: { "Content-Type": "application/json" } });
    }
    __name(j, "j");
    if (url.pathname === "/append" && request.method === "POST") {
      const body = await request.json();
      const { studentId = "unknown", eventType = "unknown" } = body;
      const payload = typeof body.payload === "string" ? body.payload : JSON.stringify(body.payload);
      const ts = Date.now();
      const lastRow = this.sql.exec("SELECT entry_hash FROM ledger WHERE student_id = ? ORDER BY id DESC LIMIT 1", studentId).toArray()[0];
      const prevHash = lastRow?.entry_hash || "0000000000000000000000000000000000000000000000000000000000000000";
      const entryHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${studentId}|${eventType}|${payload}|${prevHash}|${ts}`)).then((buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join(""));
      this.sql.exec("INSERT INTO ledger (student_id, event_type, payload, prev_hash, entry_hash, ts) VALUES (?,?,?,?,?,?)", studentId, eventType, payload, prevHash, entryHash, ts);
      return j({ ok: true, entryHash, prevHash, ts, eventType });
    }
    if (url.pathname === "/history") {
      const studentId = url.searchParams.get("studentId");
      if (!studentId) return j({ error: "studentId required" }, 400);
      const eventType = url.searchParams.get("eventType");
      const q = eventType ? "SELECT * FROM ledger WHERE student_id = ? AND event_type = ? ORDER BY id DESC LIMIT 200" : "SELECT * FROM ledger WHERE student_id = ? ORDER BY id DESC LIMIT 200";
      const rows = this.sql.exec(q, ...eventType ? [studentId, eventType] : [studentId]).toArray();
      return j({ entries: rows, count: rows.length });
    }
    if (url.pathname === "/verify") {
      const studentId = url.searchParams.get("studentId");
      if (!studentId) return j({ error: "studentId required" }, 400);
      const rows = this.sql.exec("SELECT entry_hash, prev_hash, ts, event_type FROM ledger WHERE student_id = ? ORDER BY id ASC", studentId).toArray();
      let valid = true;
      for (let i = 1; i < rows.length; i++) {
        if (rows[i].prev_hash !== rows[i - 1].entry_hash) {
          valid = false;
          break;
        }
      }
      const anchor = rows.length ? rows[0].prev_hash : "0000000000000000000000000000000000000000000000000000000000000000";
      return j({ studentId, valid: valid && (rows.length === 0 || rows[0].prev_hash === anchor), count: rows.length, firstHash: rows[0]?.entry_hash || null, lastHash: rows.at(-1)?.entry_hash || null, anchorHash: anchor });
    }
    if (url.pathname === "/count") {
      const v = url.searchParams.get("studentId");
      const r = this.sql.exec(v ? "SELECT COUNT(*) as cnt FROM ledger WHERE student_id = ?" : "SELECT COUNT(*) as cnt FROM ledger", ...v ? [v] : []).toArray()[0];
      return j({ count: r?.cnt || 0, studentId: v || null });
    }
    if (url.pathname === "/purge" && request.method === "POST") {
      const sid = url.searchParams.get("studentId");
      if (sid) {
        this.sql.exec("DELETE FROM ledger WHERE student_id = ?", sid);
      }
      return j({ ok: true, purged: { ledger: sid || "all" } });
    }
  }
};
var PetDO = class {
  static {
    __name(this, "PetDO");
  }
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sql = state.storage.sql;
    this.sql.exec("CREATE TABLE IF NOT EXISTS pet_state (id INTEGER PRIMARY KEY CHECK (id = 1), streak INTEGER DEFAULT 0, xp INTEGER DEFAULT 0, mood TEXT DEFAULT 'neutral', total_sessions INTEGER DEFAULT 0, last_checkin INTEGER DEFAULT 0, longest_streak INTEGER DEFAULT 0, tiger_score INTEGER DEFAULT 0, day_phase TEXT DEFAULT 'E1')");
    this.sql.exec("INSERT OR REPLACE INTO pet_state (id, streak, xp, mood, total_sessions, last_checkin, longest_streak, tiger_score, day_phase) VALUES (1, 0, 0, 'neutral', 0, 0, 0, 0, 'E1')");
    for (const m of ["ALTER TABLE pet_state ADD COLUMN tiger_score INTEGER DEFAULT 0", "ALTER TABLE pet_state ADD COLUMN day_phase TEXT DEFAULT 'E1'"]) {
      try {
        this.sql.exec(m);
      } catch (_2) {
      }
    }
    this.sql.exec("CREATE TABLE IF NOT EXISTS checkins (id INTEGER PRIMARY KEY AUTOINCREMENT, minutes INTEGER, confidence INTEGER, xp_gained INTEGER, streak_at_checkin INTEGER, ts INTEGER)");
  }
  async fetch(request) {
    const url = new URL(request.url);
    function j(d, s2 = 200) {
      return new Response(JSON.stringify(d), { status: s2, headers: { "Content-Type": "application/json" } });
    }
    __name(j, "j");
    if (url.pathname === "/purge" && request.method === "POST") {
      const sid = url.searchParams.get("studentId");
      this.sql.exec("UPDATE pet_state SET streak=0, xp=0, mood='neutral', total_sessions=0, last_checkin=0, longest_streak=0, tiger_score=0, day_phase='E1' WHERE id=1");
      this.sql.exec("DELETE FROM checkins WHERE 1=1");
      return j({ ok: true, purged: { pet_state: "reset", checkins: "all_shared" } });
    }
    if (url.pathname === "/checkin" && request.method === "POST") {
      const body = await request.json();
      const mins = Math.min(body.minutes || 5, 240);
      const conf = Math.max(1, Math.min(10, body.confidence || 5));
      const now = Date.now();
      const cur = this.sql.exec("SELECT * FROM pet_state WHERE id = 1").toArray()[0];
      const hrs = (now - (cur.last_checkin || 0)) / 36e5;
      let streak = cur.streak;
      if (hrs >= 4 && hrs < 48) streak += 1;
      else if (hrs >= 48) streak = 1;
      const bonus = [1, 3, 7, 30].includes(streak) ? 1.5 : 1;
      const xpGain = Math.round(mins * (1 + conf / 10) * bonus);
      const curXp = cur.xp || 0;
      const ls = Math.max(cur.longest_streak || 0, streak);
      let mood = "neutral";
      if (streak >= 7 && conf >= 8) mood = "tiger";
      else if (streak >= 5 && conf >= 7) mood = "fired_up";
      else if (streak >= 3) mood = "happy";
      else if (streak >= 1) mood = "content";
      else if (conf <= 3) mood = "sleepy";
      const tot = (cur.total_sessions || 0) + 1;
      this.sql.exec("UPDATE pet_state SET streak=?, xp=?, mood=?, total_sessions=?, last_checkin=?, longest_streak=? WHERE id=1", streak, curXp + xpGain, mood, tot, now, ls);
      this.sql.exec("INSERT INTO checkins (minutes, confidence, xp_gained, streak_at_checkin, ts) VALUES (?,?,?,?,?)", mins, conf, xpGain, streak, now);
      const rc = this.sql.exec("SELECT ts FROM checkins WHERE ts > ? ORDER BY ts DESC", now - 7 * 864e5).toArray();
      const ud = new Set(rc.map((c) => Math.floor(c.ts / 864e5)));
      const ret = Math.min(1, ud.size / 7);
      const cf2 = this.sql.exec("SELECT confidence FROM checkins ORDER BY id DESC LIMIT 10").toArray();
      const avg = cf2.length ? cf2.reduce((a, r) => a + r.confidence, 0) / cf2.length : 5;
      const er = Math.min(1, avg / 10);
      const dc = now - (cur.last_checkin || 0) < 864e5 ? 1 : 0;
      const ts2 = Math.round(ret * 40 + er * 40 + dc * 20);
      const dp = tot <= 2 ? "E1" : tot <= 5 ? "E2" : "E3";
      this.sql.exec("UPDATE pet_state SET tiger_score=?, day_phase=? WHERE id=1", ts2, dp);
      const msgs = { 1: "Day 1. Every Tiger was once a Mouse.", 3: "Day 3. Three in a row.", 7: "Day 7. One full week.", 30: "Day 30. Thirty days straight." };
      return j({ ok: true, state: { streak, xp: curXp + xpGain, mood, totalSessions: tot, xpGain, longestStreak: ls, tigerScore: ts2, dayPhase: dp }, milestone: [1, 3, 7, 30].includes(streak) ? { day: streak, message: msgs[streak] } : null });
    }
    if (url.pathname === "/state") {
      const s2 = this.sql.exec("SELECT * FROM pet_state WHERE id = 1").toArray()[0] || { streak: 0 };
      return j({ state: { streak: s2.streak, xp: s2.xp, mood: s2.mood, totalSessions: s2.total_sessions, longestStreak: s2.longest_streak, tigerScore: s2.tiger_score, dayPhase: s2.day_phase } });
    }
    if (url.pathname === "/score") {
      const s2 = this.sql.exec("SELECT * FROM pet_state WHERE id = 1").toArray()[0] || {};
      const now = Date.now();
      const rc = this.sql.exec("SELECT ts, confidence FROM checkins WHERE ts > ? ORDER BY ts DESC", now - 7 * 864e5).toArray();
      const ud = new Set(rc.map((c) => Math.floor(c.ts / 864e5)));
      const ret = Math.min(1, ud.size / 7);
      const cf2 = this.sql.exec("SELECT confidence FROM checkins ORDER BY id DESC LIMIT 10").toArray();
      const avg = cf2.length ? cf2.reduce((a, r) => a + r.confidence, 0) / cf2.length : 5;
      const er = Math.min(1, avg / 10);
      const lc = s2.last_checkin || 0;
      const dc = now - lc < 864e5 ? 1 : 0;
      const ts2 = Math.round(ret * 40 + er * 40 + dc * 20);
      return j({ tigerScore: ts2, breakdown: { retention: Math.round(ret * 100), errorReduction: Math.round(er * 100) }, streak: s2.streak || 0, dayPhase: s2.day_phase || "E1", status: ts2 < 40 ? "MOUSE_MODE" : ts2 < 70 ? "CAT_MODE" : "TIGER_MODE" });
    }
    if (url.pathname === "/daily-check") {
      const s2 = this.sql.exec("SELECT * FROM pet_state WHERE id = 1").toArray()[0] || {};
      const now = Date.now();
      const lc = s2.last_checkin || 0;
      const hi = (now - lc) / 36e5;
      const ts2 = s2.tiger_score || 0;
      return j({ tigerScore: ts2, hoursInactive: Math.round(hi), streak: s2.streak || 0, totalSessions: s2.total_sessions || 0, needsAlert: hi >= 24 && ts2 < 40, needsDrill: hi < 48 });
    }
    return j({ error: "Not found" }, 404);
  }
};
var CommandDO = class {
  static {
    __name(this, "CommandDO");
  }
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sql = state.storage.sql;
    this.sql.exec("CREATE TABLE IF NOT EXISTS commands (id INTEGER PRIMARY KEY AUTOINCREMENT, raw_intent TEXT NOT NULL, translation TEXT NOT NULL DEFAULT '{}', priority INTEGER NOT NULL DEFAULT 5, status TEXT NOT NULL DEFAULT 'pending', source TEXT NOT NULL DEFAULT 'magic-chat', assigned_drone TEXT DEFAULT NULL, claimed_by TEXT DEFAULT NULL, result TEXT DEFAULT NULL, success INTEGER DEFAULT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)");
    this.sql.exec("CREATE INDEX IF NOT EXISTS idx_commands_status ON commands(status, priority, created_at)");
    this.sql.exec("CREATE TABLE IF NOT EXISTS post_metrics (post_id TEXT PRIMARY KEY, platform TEXT NOT NULL DEFAULT 'unknown', hook TEXT DEFAULT '', body TEXT DEFAULT '', tone TEXT DEFAULT 'unknown', format TEXT DEFAULT 'text', base_insight TEXT DEFAULT '', experiment_id TEXT DEFAULT NULL, impressions INTEGER DEFAULT 0, likes INTEGER DEFAULT 0, comments INTEGER DEFAULT 0, shares INTEGER DEFAULT 0, saves INTEGER DEFAULT 0, clicks INTEGER DEFAULT 0, watch_time REAL DEFAULT 0, virality_score REAL DEFAULT NULL, conversion_score REAL DEFAULT NULL, created_at INTEGER NOT NULL)");
    this.sql.exec("CREATE INDEX IF NOT EXISTS idx_post_metrics_score ON post_metrics(virality_score)");
    this.sql.exec("CREATE TABLE IF NOT EXISTS experiments (id TEXT PRIMARY KEY, variant_group TEXT NOT NULL, hook TEXT NOT NULL, body TEXT DEFAULT '', platform TEXT DEFAULT 'unknown', tone TEXT DEFAULT 'unknown', impressions INTEGER DEFAULT 0, clicks INTEGER DEFAULT 0, conversions INTEGER DEFAULT 0, status TEXT NOT NULL DEFAULT 'running', created_at INTEGER NOT NULL)");
    this.sql.exec("CREATE INDEX IF NOT EXISTS idx_experiments_status ON experiments(status)");
    this.sql.exec("CREATE TABLE IF NOT EXISTS content_patterns (id INTEGER PRIMARY KEY AUTOINCREMENT, pattern TEXT NOT NULL, tone TEXT DEFAULT 'unknown', platform TEXT DEFAULT 'unknown', format TEXT DEFAULT 'text', score REAL DEFAULT 0, times_used INTEGER DEFAULT 0, last_used INTEGER DEFAULT NULL, created_at INTEGER NOT NULL)");
  }
  async fetch(request) {
    const url = new URL(request.url);
    function j(d, s2 = 200) {
      return new Response(JSON.stringify(d), { status: s2, headers: { "Content-Type": "application/json" } });
    }
    __name(j, "j");
    if (url.pathname === "/send" && request.method === "POST") {
      const body = await request.json();
      const now = Date.now();
      const tr = body.translation || {};
      const drone = tr.primaryDrone?.name || "CodeRunner";
      this.sql.exec("INSERT INTO commands (raw_intent, translation, priority, status, source, assigned_drone, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)", body.rawIntent || "", JSON.stringify(tr), body.priority || 5, "pending", body.source || "magic-chat", drone, now, now);
      const r = this.sql.exec("SELECT last_insert_rowid() as id").toArray()[0];
      return j({ ok: true, commandId: r.id, status: "pending", assignedDrone: drone, priority: body.priority || 5, ts: now });
    }
    if (url.pathname === "/queue") {
      const st = url.searchParams.get("status") || "pending";
      const l = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
      const r = this.sql.exec("SELECT * FROM commands WHERE status = ? ORDER BY priority ASC, created_at ASC LIMIT ?", st, l).toArray();
      return j({ commands: r.map((x) => ({ ...x, translation: JSON.parse(x.translation || "{}") })), count: r.length, status: st });
    }
    if (url.pathname === "/claim" && request.method === "POST") {
      const body = await request.json();
      const cid = body.commandId;
      const cl = body.claimedBy || "vscode-extension";
      const e = this.sql.exec("SELECT * FROM commands WHERE id = ?", cid).toArray()[0];
      if (!e) return j({ error: "Command not found" }, 404);
      if (e.status !== "pending") return j({ error: `Already ${e.status}` }, 409);
      this.sql.exec("UPDATE commands SET status='claimed', claimed_by=?, updated_at=? WHERE id=?", cl, Date.now(), cid);
      return j({ ok: true, commandId: cid, status: "claimed", claimedBy: cl });
    }
    if (url.pathname === "/complete" && request.method === "POST") {
      const body = await request.json();
      const cid = body.commandId;
      const e = this.sql.exec("SELECT * FROM commands WHERE id = ?", cid).toArray()[0];
      if (!e) return j({ error: "Command not found" }, 404);
      this.sql.exec("UPDATE commands SET status=?, result=?, success=?, updated_at=? WHERE id=?", body.success !== false ? "completed" : "failed", body.result || "", body.success !== false ? 1 : 0, Date.now(), cid);
      return j({ ok: true, commandId: cid, status: body.success !== false ? "completed" : "failed" });
    }
    if (url.pathname === "/status") {
      const id = url.searchParams.get("id");
      if (!id) return j({ error: "Missing id" }, 400);
      const r = this.sql.exec("SELECT * FROM commands WHERE id = ?", parseInt(id)).toArray()[0];
      if (!r) return j({ error: "Not found" }, 404);
      return j({ command: { ...r, translation: JSON.parse(r.translation || "{}") } });
    }
    if (url.pathname === "/history") {
      const lmt = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);
      const r = this.sql.exec("SELECT * FROM commands ORDER BY created_at DESC LIMIT ?", lmt).toArray();
      return j({ commands: r.map((x) => ({ ...x, translation: JSON.parse(x.translation || "{}") })), count: r.length });
    }
    if (url.pathname === "/virality/metrics" && request.method === "POST") {
      const body = await request.json();
      const pid = body.postId || body.post_id || "post_" + Date.now();
      this.sql.exec("INSERT OR REPLACE INTO post_metrics (post_id,platform,hook,body,tone,format,base_insight,experiment_id,impressions,likes,comments,shares,saves,clicks,watch_time,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", pid, body.platform || "unknown", body.hook || "", body.body || "", body.tone || "unknown", body.format || "text", body.base_insight || "", body.experiment_id || null, body.impressions || 0, body.likes || 0, body.comments || 0, body.shares || 0, body.saves || 0, body.clicks || 0, body.watch_time || 0, Date.now());
      return j({ ok: true, postId: pid });
    }
    return j({ error: "Not found" }, 404);
  }
};
var MemoryDO = class {
  static {
    __name(this, "MemoryDO");
  }
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sql = state.storage.sql;
    this.sql.exec("CREATE TABLE IF NOT EXISTS session_log (id INTEGER PRIMARY KEY AUTOINCREMENT, student_id TEXT NOT NULL, session_type TEXT NOT NULL DEFAULT 'chat', input TEXT NOT NULL DEFAULT '', output TEXT NOT NULL DEFAULT '', score INTEGER DEFAULT 0, weak_areas TEXT DEFAULT '[]', route TEXT DEFAULT '{}', ts INTEGER NOT NULL)");
    this.sql.exec("CREATE INDEX IF NOT EXISTS idx_session_log_student ON session_log(student_id, ts)");
    this.sql.exec("CREATE TABLE IF NOT EXISTS memory_state (student_id TEXT PRIMARY KEY, level TEXT DEFAULT 'A1', goal TEXT DEFAULT 'daily speaking', streak INTEGER DEFAULT 0, last_active INTEGER DEFAULT 0, last_score INTEGER DEFAULT 0, weak_areas TEXT DEFAULT '[]', summary TEXT DEFAULT '', updated_at INTEGER DEFAULT 0)");
  }
  async fetch(request) {
    const url = new URL(request.url);
    function j(d, s2 = 200) {
      return new Response(JSON.stringify(d), { status: s2, headers: { "Content-Type": "application/json" } });
    }
    __name(j, "j");
    if (url.pathname === "/purge" && request.method === "POST") {
      const sid = url.searchParams.get("studentId");
      if (sid) {
        this.sql.exec("DELETE FROM session_log WHERE student_id = ?", sid);
        this.sql.exec("DELETE FROM memory_state WHERE student_id = ?", sid);
      }
      return j({ ok: true, purged: { session_log: "student", memory_state: "student" } });
    }
    if (url.pathname === "/log" && request.method === "POST") {
      const body = await request.json();
      const now = Date.now();
      this.sql.exec("INSERT INTO session_log (student_id, session_type, input, output, score, weak_areas, route, ts) VALUES (?,?,?,?,?,?,?,?)", String(body.studentId || "anon"), String(body.sessionType || "chat"), String(body.input || ""), String(body.output || ""), Number(body.score) || 0, JSON.stringify(body.weakAreas || []), JSON.stringify(body.route || {}), now);
      return j({ ok: true, ts: now });
    }
    if (url.pathname === "/log" && request.method === "GET") {
      const sid = url.searchParams.get("studentId") || "anon";
      const lim = Math.min(parseInt(url.searchParams.get("limit") || "30"), 200);
      const r = this.sql.exec("SELECT * FROM session_log WHERE student_id = ? ORDER BY ts DESC LIMIT ?", sid, lim).toArray();
      return j({ entries: r, count: r.length });
    }
    if (url.pathname === "/state" && request.method === "GET") {
      const sid = url.searchParams.get("studentId") || "anon";
      const r = this.sql.exec("SELECT * FROM memory_state WHERE student_id = ?", sid).toArray()[0];
      return j(r || { student_id: sid, level: "A1", goal: "daily speaking", streak: 0 });
    }
    if (url.pathname === "/state" && request.method === "POST") {
      const body = await request.json();
      const sid = String(body.studentId || "anon");
      const now = Date.now();
      this.sql.exec("INSERT INTO memory_state (student_id, level, goal, streak, last_active, last_score, weak_areas, summary, updated_at) VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(student_id) DO UPDATE SET level=excluded.level, goal=excluded.goal, streak=excluded.streak, last_active=excluded.last_active, last_score=excluded.last_score, weak_areas=excluded.weak_areas, summary=excluded.summary, updated_at=excluded.updated_at", sid, String(body.level || "A1"), String(body.goal || "daily speaking"), Number(body.streak) || 0, now, Number(body.lastScore) || 0, JSON.stringify(body.weakAreas || []), String(body.summary || ""), now);
      return j({ ok: true, studentId: sid });
    }
    return j({ error: "Not found" }, 404);
  }
};

// src/index.js
init_phonics_drills();
init_email_service();

// src/encryption.js
init_performance2();
async function encryptField(plaintext, hexKey) {
  const keyBytes = Uint8Array.from(hexKey.match(/.{2}/g).map((b) => parseInt(b, 16)));
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    new TextEncoder().encode(plaintext)
  );
  const combined = new Uint8Array(12 + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), 12);
  return btoa(String.fromCharCode(...combined));
}
__name(encryptField, "encryptField");
async function decryptField(b64ciphertext, hexKey) {
  const combined = Uint8Array.from(atob(b64ciphertext), (c) => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);
  const keyBytes = Uint8Array.from(hexKey.match(/.{2}/g).map((b) => parseInt(b, 16)));
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
  const plaintextBytes = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    ciphertext
  );
  return new TextDecoder().decode(plaintextBytes);
}
__name(decryptField, "decryptField");

// src/catalog.js
init_performance2();

// src/cart.js
init_performance2();
var CART_TTL_SECONDS = 60 * 60 * 24 * 14;

// src/index.js
init_orders();

// src/access.js
init_performance2();
init_orders();

// src/payments.js
init_performance2();

// src/subscriptions.js
init_performance2();
var SUBSCRIPTION_STATES = {
  TRIAL: "trial",
  ACTIVE: "active",
  GRACE: "grace",
  EXPIRED: "expired",
  PAST_DUE: "past_due",
  REVOKED: "revoked"
};
var GRACE_DAYS = 7;
var RENEWAL_REMINDER_DAYS = 3;
var MAX_PAST_DUE_DAYS = 14;
function computeSubscriptionStatus(sub) {
  if (!sub) return SUBSCRIPTION_STATES.EXPIRED;
  if (sub.status === SUBSCRIPTION_STATES.REVOKED) return SUBSCRIPTION_STATES.REVOKED;
  const now = Date.now();
  const paidUntil = sub.paidUntil ? new Date(sub.paidUntil).getTime() : 0;
  const trialEnd = sub.trial_end ? new Date(sub.trial_end).getTime() : 0;
  if (paidUntil > now) {
    const daysToExpiry = Math.ceil((paidUntil - now) / 864e5);
    if (daysToExpiry <= RENEWAL_REMINDER_DAYS && daysToExpiry > 0) {
      return SUBSCRIPTION_STATES.ACTIVE;
    }
    return SUBSCRIPTION_STATES.ACTIVE;
  }
  if (trialEnd > now) return SUBSCRIPTION_STATES.TRIAL;
  const expiredAt = Math.max(paidUntil, trialEnd);
  const daysSinceExpiry = Math.ceil((now - expiredAt) / 864e5);
  if (daysSinceExpiry <= GRACE_DAYS) return SUBSCRIPTION_STATES.GRACE;
  if (daysSinceExpiry <= MAX_PAST_DUE_DAYS) return SUBSCRIPTION_STATES.PAST_DUE;
  return SUBSCRIPTION_STATES.EXPIRED;
}
__name(computeSubscriptionStatus, "computeSubscriptionStatus");

// src/index.js
init_seats();
init_invoices();
init_promos();

// src/tasks.js
init_performance2();
function table(prefix, name) {
  return `${prefix}_${name}`;
}
__name(table, "table");
function getWeekId(date = /* @__PURE__ */ new Date()) {
  const d = new Date(date);
  const thursday = new Date(d);
  thursday.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const year = thursday.getFullYear();
  const week = Math.floor((thursday - new Date(year, 0, 1)) / 6048e5) + 1;
  return `${year}-W${String(week).padStart(2, "0")}`;
}
__name(getWeekId, "getWeekId");
async function getTasks(studentId, weekId, env, prefix = "nguyen") {
  if (!env.SOUL_DB) return [];
  try {
    const result = await env.SOUL_DB.prepare(`SELECT * FROM ${table(prefix, "tasks")} WHERE student_id = ? AND week_id = ?`).bind(studentId, weekId).all();
    return result.results.map((row) => ({
      id: row.id,
      weekId: row.week_id,
      studentId: row.student_id,
      category: row.category,
      title: row.title,
      description: row.description,
      dailyMinutes: row.daily_minutes,
      totalMinutes: row.total_minutes,
      dueDate: row.due_date,
      createdAt: row.created_at,
      createdBy: row.created_by,
      status: row.status
    }));
  } catch {
    return [];
  }
}
__name(getTasks, "getTasks");
async function setTask(task, env, prefix = "nguyen") {
  if (!env.SOUL_DB) return { ok: false, error: "no d1" };
  const studentId = String(task.studentId || "").trim();
  const weekId = task.weekId || getWeekId();
  if (!studentId) return { ok: false, error: "studentId required" };
  const record = {
    id: task.id || crypto.randomUUID(),
    week_id: weekId,
    student_id: studentId,
    category: String(task.category || "general").slice(0, 50),
    title: String(task.title || "").trim().slice(0, 200),
    description: String(task.description || "").trim().slice(0, 1e3),
    daily_minutes: Math.max(1, Math.min(480, Number(task.dailyMinutes) || 20)),
    total_minutes: Math.max(1, Math.min(5e3, Number(task.totalMinutes) || 140)),
    due_date: String(task.dueDate || "").slice(0, 10),
    created_at: task.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
    created_by: String(task.createdBy || "teacher").slice(0, 50),
    status: String(task.status || "active").slice(0, 20)
  };
  try {
    await env.SOUL_DB.prepare(`INSERT OR REPLACE INTO ${table(prefix, "tasks")} (id, week_id, student_id, category, title, description, daily_minutes, total_minutes, due_date, created_at, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(record.id, record.week_id, record.student_id, record.category, record.title, record.description, record.daily_minutes, record.total_minutes, record.due_date, record.created_at, record.created_by, record.status).run();
    await invalidateSummary(studentId, weekId, env, prefix);
    return { ok: true, task: { ...record, weekId: record.week_id, studentId: record.student_id, dailyMinutes: record.daily_minutes, totalMinutes: record.total_minutes, dueDate: record.due_date, createdAt: record.created_at, createdBy: record.created_by } };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
__name(setTask, "setTask");
async function logTaskCompletion(log, env, prefix = "nguyen") {
  if (!env.SOUL_DB) return { ok: false, error: "no d1" };
  const { taskId, date, studentId, completed, minutesSpent, notes, audioUrl } = log;
  if (!taskId || !studentId || !date) return { ok: false, error: "taskId, studentId, date required" };
  const entry = {
    task_id: taskId,
    date,
    student_id: studentId,
    completed: !!completed ? 1 : 0,
    minutes_spent: Math.max(0, Math.min(480, Number(minutesSpent) || 0)),
    notes: String(notes || "").slice(0, 500),
    audio_url: String(audioUrl || "").slice(0, 500),
    submitted_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  try {
    await env.SOUL_DB.prepare(`INSERT OR REPLACE INTO ${table(prefix, "task_logs")} (task_id, date, student_id, completed, minutes_spent, notes, audio_url, submitted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(entry.task_id, entry.date, entry.student_id, entry.completed, entry.minutes_spent, entry.notes, entry.audio_url, entry.submitted_at).run();
    if (completed) {
      const weekId = getWeekId(date);
      await env.SOUL_DB.prepare(`UPDATE ${table(prefix, "tasks")} SET status = ?, created_at = ? WHERE id = ?`).bind("completed", entry.submitted_at, taskId).run();
    }
    await invalidateSummary(studentId, getWeekId(date), env, prefix);
    return { ok: true, log: { ...entry, taskId: entry.task_id, studentId: entry.student_id, date: entry.date, completed: !!entry.completed, minutesSpent: entry.minutes_spent, notes: entry.notes, audioUrl: entry.audio_url, submittedAt: entry.submitted_at } };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
__name(logTaskCompletion, "logTaskCompletion");
async function getTaskLogs(studentId, date, env, prefix = "nguyen") {
  if (!env.SOUL_DB) return [];
  try {
    const result = await env.SOUL_DB.prepare(`SELECT * FROM ${table(prefix, "task_logs")} WHERE student_id = ? AND date = ?`).bind(studentId, date).all();
    return result.results.map((row) => ({
      taskId: row.task_id,
      date: row.date,
      studentId: row.student_id,
      completed: !!row.completed,
      minutesSpent: row.minutes_spent,
      notes: row.notes,
      audioUrl: row.audio_url,
      submittedAt: row.submitted_at
    }));
  } catch {
    return [];
  }
}
__name(getTaskLogs, "getTaskLogs");
async function getTaskSummary(studentId, weekId, env, prefix = "nguyen") {
  if (!env.SOUL_DB) return null;
  try {
    const result = await env.SOUL_DB.prepare(`SELECT * FROM ${table(prefix, "task_summaries")} WHERE week_id = ? AND student_id = ?`).bind(weekId, studentId).first();
    if (!result) return null;
    return {
      weekId: result.week_id,
      studentId: result.student_id,
      totalTasks: result.total_tasks,
      completedTasks: result.completed_tasks,
      totalMinutesPlanned: result.total_minutes_planned,
      totalMinutesLogged: result.total_minutes_logged,
      categories: JSON.parse(result.categories || "{}"),
      streak: result.streak,
      generatedAt: result.generated_at
    };
  } catch {
    return null;
  }
}
__name(getTaskSummary, "getTaskSummary");
async function invalidateSummary(studentId, weekId, env, prefix = "nguyen") {
  if (!env.SOUL_DB) return;
  try {
    const tasks = await getTasks(studentId, weekId, env, prefix);
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const totalMinutesPlanned = tasks.reduce((s2, t) => s2 + (t.totalMinutes || 0), 0);
    const categories = {};
    for (const t of tasks) {
      if (!categories[t.category]) categories[t.category] = { planned: 0, logged: 0 };
      categories[t.category].planned += t.totalMinutes || 0;
    }
    const now = /* @__PURE__ */ new Date();
    const weekStart = /* @__PURE__ */ new Date(weekId + "T00:00:00");
    let totalMinutesLogged = 0;
    let streak = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      if (d > now) break;
      const date = d.toISOString().slice(0, 10);
      const logs = await getTaskLogs(studentId, date, env, prefix);
      const dayMinutes = logs.reduce((s2, l) => s2 + (l.minutesSpent || 0), 0);
      totalMinutesLogged += dayMinutes;
      if (logs.filter((l) => l.completed).length > 0) streak++;
    }
    const summary = {
      week_id: weekId,
      student_id: studentId,
      total_tasks: totalTasks,
      completed_tasks: completedTasks,
      total_minutes_planned: totalMinutesPlanned,
      total_minutes_logged: totalMinutesLogged,
      categories: JSON.stringify(categories),
      streak,
      generated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    await env.SOUL_DB.prepare(`INSERT OR REPLACE INTO ${table(prefix, "task_summaries")} (week_id, student_id, total_tasks, completed_tasks, total_minutes_planned, total_minutes_logged, categories, streak, generated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(summary.week_id, summary.student_id, summary.total_tasks, summary.completed_tasks, summary.total_minutes_planned, summary.total_minutes_logged, summary.categories, summary.streak, summary.generated_at).run();
  } catch {
  }
}
__name(invalidateSummary, "invalidateSummary");
async function getStudentTasksWithLogs(studentId, weekId, env, prefix = "nguyen") {
  const tasks = await getTasks(studentId, weekId, env, prefix);
  const result = [];
  for (const task of tasks) {
    const logs = await getTaskLogs(studentId, task.createdAt ? task.createdAt.slice(0, 10) : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), env, prefix);
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const todayLog = logs.find((l) => l.taskId === task.id && l.date === today);
    result.push({ ...task, todayLog, logs });
  }
  return result;
}
__name(getStudentTasksWithLogs, "getStudentTasksWithLogs");
async function getParentEmail(env, prefix = "nguyen") {
  if (!env.SOUL_DB) return null;
  try {
    const row = await env.SOUL_DB.prepare(`SELECT value FROM ${table(prefix, "settings")} WHERE key = ?`).bind("parent_email").first();
    return row ? row.value : null;
  } catch {
    return null;
  }
}
__name(getParentEmail, "getParentEmail");
async function setParentEmail(email, env, prefix = "nguyen") {
  if (!env.SOUL_DB) return { ok: false, error: "no d1" };
  try {
    await env.SOUL_DB.prepare(`INSERT OR REPLACE INTO ${table(prefix, "settings")} (key, value, updated_at) VALUES (?, ?, ?)`).bind("parent_email", String(email).slice(0, 200), (/* @__PURE__ */ new Date()).toISOString()).run();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
__name(setParentEmail, "setParentEmail");
async function getTeacherEmail(env, prefix = "nguyen") {
  if (!env.SOUL_DB) return null;
  try {
    const row = await env.SOUL_DB.prepare(`SELECT value FROM ${table(prefix, "settings")} WHERE key = ?`).bind("teacher_email").first();
    return row ? row.value : null;
  } catch {
    return null;
  }
}
__name(getTeacherEmail, "getTeacherEmail");
async function setTeacherEmail(email, env, prefix = "nguyen") {
  if (!env.SOUL_DB) return { ok: false, error: "no d1" };
  try {
    await env.SOUL_DB.prepare(`INSERT OR REPLACE INTO ${table(prefix, "settings")} (key, value, updated_at) VALUES (?, ?, ?)`).bind("teacher_email", String(email).slice(0, 200), (/* @__PURE__ */ new Date()).toISOString()).run();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
__name(setTeacherEmail, "setTeacherEmail");
async function getAdminEmail(env, prefix = "nguyen") {
  if (!env.SOUL_DB) return null;
  try {
    const row = await env.SOUL_DB.prepare(`SELECT value FROM ${table(prefix, "settings")} WHERE key = ?`).bind("admin_email").first();
    return row ? row.value : null;
  } catch {
    return null;
  }
}
__name(getAdminEmail, "getAdminEmail");
async function setAdminEmail(email, env, prefix = "nguyen") {
  if (!env.SOUL_DB) return { ok: false, error: "no d1" };
  try {
    await env.SOUL_DB.prepare(`INSERT OR REPLACE INTO ${table(prefix, "settings")} (key, value, updated_at) VALUES (?, ?, ?)`).bind("admin_email", String(email).slice(0, 200), (/* @__PURE__ */ new Date()).toISOString()).run();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
__name(setAdminEmail, "setAdminEmail");
async function validateParentPin(pin, env, prefix = "nguyen") {
  if (!pin) return false;
  const hash = await computeHash(pin);
  if (env.SOUL_DB) {
    try {
      const row = await env.SOUL_DB.prepare(`SELECT value FROM ${table(prefix, "settings")} WHERE key = ?`).bind("parent_pin_hash").first();
      if (row && row.value) return row.value === hash;
    } catch {
    }
  }
  if (env.NET_PET_KV) {
    const stored = await env.NET_PET_KV.get(`parent:${prefix}:pin_hash`);
    if (stored) return stored === hash;
  }
  return false;
}
__name(validateParentPin, "validateParentPin");
async function setParentPin(pin, env, prefix = "nguyen") {
  const hash = await computeHash(pin);
  if (env.SOUL_DB) {
    try {
      await env.SOUL_DB.prepare(`INSERT OR REPLACE INTO ${table(prefix, "settings")} (key, value, updated_at) VALUES (?, ?, ?)`).bind("parent_pin_hash", hash, (/* @__PURE__ */ new Date()).toISOString()).run();
      return { ok: true, store: "d1" };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
  if (env.NET_PET_KV) {
    await env.NET_PET_KV.put(`parent:${prefix}:pin_hash`, hash);
    return { ok: true, store: "kv" };
  }
  return { ok: false, error: "no store available" };
}
__name(setParentPin, "setParentPin");
async function setStudentPin(studentId, pin, env, prefix = "nguyen") {
  const hash = await computeHash(pin);
  const key = `student_pin_${studentId}`;
  if (env.SOUL_DB) {
    try {
      await env.SOUL_DB.prepare(`INSERT OR REPLACE INTO ${table(prefix, "settings")} (key, value, updated_at) VALUES (?, ?, ?)`).bind(key, hash, (/* @__PURE__ */ new Date()).toISOString()).run();
      return { ok: true, store: "d1" };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
  if (env.NET_PET_KV) {
    await env.NET_PET_KV.put(key, hash);
    return { ok: true, store: "kv" };
  }
  return { ok: false, error: "no store available" };
}
__name(setStudentPin, "setStudentPin");
async function computeHash(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(computeHash, "computeHash");

// src/index.js
var VERSION = "1.6.0";
async function seedVocabBatch(studentId, words, env) {
  if (!words || words.length === 0) return [];
  const [listRaw, srsRaw] = await Promise.all([
    env.NET_PET_KV.get(`vocab_list_${studentId}`),
    env.NET_PET_KV.get(`srs_data_${studentId}`)
  ]);
  const list = listRaw ? JSON.parse(listRaw) : [];
  const srsMap = srsRaw ? JSON.parse(srsRaw) : {};
  const now = Date.now();
  const results = [];
  for (const w of words) {
    const word = (w.word || "").trim();
    if (!word) {
      results.push({ ok: false });
      continue;
    }
    const grade = w.used_by_student ? 3 : 0;
    if (!srsMap[word]) {
      srsMap[word] = {
        word,
        translation: w.meaning_vi || "",
        interval: 0,
        repetitions: 0,
        ease_factor: 2.5,
        next_review: 0,
        last_grade: null,
        source: "class_audio",
        first_seen: now,
        times_seen: 1
      };
      srsMap[word] = { ...srsMap[word], ...computeNextReview(srsMap[word], grade), word };
    } else {
      srsMap[word].times_seen = (srsMap[word].times_seen || 1) + 1;
      if (w.meaning_vi && !srsMap[word].translation) srsMap[word].translation = w.meaning_vi;
      srsMap[word] = { ...srsMap[word], ...computeNextReview(srsMap[word], grade), word };
    }
    if (!list.find((e) => e.word === word)) list.push({ word, meaning_vi: w.meaning_vi || "", source: "class_audio", ts: now });
    results.push({ ok: true, word, next_review: srsMap[word].next_review });
  }
  await Promise.all([
    env.NET_PET_KV.put(`vocab_list_${studentId}`, JSON.stringify(list.slice(-500))),
    env.NET_PET_KV.put(`srs_data_${studentId}`, JSON.stringify(srsMap))
  ]);
  return results;
}
__name(seedVocabBatch, "seedVocabBatch");
async function seedVocab(studentId, word, meaning_vi, source, env, grade = null) {
  word = (word || "").trim();
  if (!word) return { ok: false };
  const [listRaw, srsRaw] = await Promise.all([
    env.NET_PET_KV.get(`vocab_list_${studentId}`),
    env.NET_PET_KV.get(`srs_data_${studentId}`)
  ]);
  const list = listRaw ? JSON.parse(listRaw) : [];
  const srsMap = srsRaw ? JSON.parse(srsRaw) : {};
  const now = Date.now();
  if (!srsMap[word]) {
    srsMap[word] = {
      word,
      translation: meaning_vi || "",
      interval: 0,
      repetitions: 0,
      ease_factor: 2.5,
      next_review: 0,
      last_grade: null,
      source,
      first_seen: now,
      times_seen: 1
    };
    if (grade != null) srsMap[word] = { ...srsMap[word], ...computeNextReview(srsMap[word], grade), word };
  } else {
    srsMap[word].times_seen = (srsMap[word].times_seen || 1) + 1;
    if (meaning_vi && !srsMap[word].translation) srsMap[word].translation = meaning_vi;
    if (grade != null) srsMap[word] = { ...srsMap[word], ...computeNextReview(srsMap[word], grade), word };
  }
  if (!list.find((w) => w.word === word)) list.push({ word, meaning_vi: meaning_vi || "", source, ts: now });
  await Promise.all([
    env.NET_PET_KV.put(`vocab_list_${studentId}`, JSON.stringify(list.slice(-500))),
    env.NET_PET_KV.put(`srs_data_${studentId}`, JSON.stringify(srsMap))
  ]);
  return { ok: true, word, next_review: srsMap[word].next_review, source };
}
__name(seedVocab, "seedVocab");
function generateUUID() {
  return crypto.randomUUID();
}
__name(generateUUID, "generateUUID");
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(sha256, "sha256");
async function kvEncryptPut(kv, key, value, hexKey) {
  const plain = JSON.stringify(value);
  if (!hexKey) {
    await kv.put(key, plain);
    return;
  }
  const cipher = await encryptField(plain, hexKey);
  await kv.put(key, "v1:" + cipher);
}
__name(kvEncryptPut, "kvEncryptPut");
async function kvDecryptGet(kv, key, hexKey) {
  const raw2 = await kv.get(key);
  if (!raw2) return null;
  if (hexKey && raw2.startsWith("v1:")) {
    try {
      const plain = await decryptField(raw2.slice(3), hexKey);
      return JSON.parse(plain);
    } catch {
    }
  }
  try {
    return JSON.parse(raw2);
  } catch {
    return null;
  }
}
__name(kvDecryptGet, "kvDecryptGet");
function normalizeStudentProfile(raw2) {
  if (!raw2 || typeof raw2 !== "object") return {};
  const p = { ...raw2 || {} };
  if (!p.name && p.fullName) p.name = p.fullName.split(/\s+/)[0] || p.fullName;
  if (!p.fullName && p.name) p.fullName = p.name;
  if (!p.level && p.englishLevel) p.level = p.englishLevel;
  if (!p.englishLevel && p.level) p.englishLevel = p.level;
  if (!p.goals && p.goal) p.goals = p.goal;
  if (!p.goals && p.track && p.milestone) p.goals = `${p.track} track: ${p.milestone}.`;
  if (!p.lang && p.language) p.lang = p.language;
  if (!p.language && p.lang) p.language = p.lang;
  if (!p.currentCity && p.city) p.currentCity = p.city;
  if (!p.progressPct && p.progress) p.progressPct = p.progress;
  if (!p.milestone && p.track) p.milestone = p.track;
  if (!p.confidence_areas && p.confidenceAreas) p.confidence_areas = p.confidenceAreas;
  if (!p.confidenceAreas && p.confidence_areas) p.confidenceAreas = p.confidence_areas;
  if (!p.fear_trigger && p.fearTrigger) p.fear_trigger = p.fearTrigger;
  if (!p.fearTrigger && p.fear_trigger) p.fearTrigger = p.fear_trigger;
  if (!p.teachingFocus && p.coachNote) p.teachingFocus = p.coachNote;
  if (!p.sessionNotes && p.coachNote) p.sessionNotes = p.coachNote;
  if (!p.primaryBlock) {
    if (p.coachNote) p.primaryBlock = p.coachNote;
    else if (p.track === "Speaking") p.primaryBlock = "Speaking delivery under speed.";
  }
  return p;
}
__name(normalizeStudentProfile, "normalizeStudentProfile");
function detectMarkers(text) {
  const words = text.match(/\b[A-Z]{2,}\b/g) || [];
  const caps_words = words.length;
  const exclamations = (text.match(/!/g) || []).length;
  const questions = (text.match(/\?/g) || []).length;
  const ellipses = (text.match(/\.\.\./g) || []).length;
  let repeated_chars = 0;
  for (let i = 2; i < text.length; i++) {
    if (text[i] === text[i - 1] && text[i] === text[i - 2]) repeated_chars++;
  }
  return JSON.stringify({ caps_words, exclamations, questions, ellipses, repeated_chars, length_chars: text.length });
}
__name(detectMarkers, "detectMarkers");
function sanitizeObiResponse(raw2) {
  let reply = (raw2 || "").trim();
  if (!reply) return "Say that again?";
  reply = reply.replace(/<think[^>]*>[\s\S]*?<\/think>/gi, "").trim();
  reply = reply.replace(/^\s*(Okay|Let me think|I think|Let's see|Hmm|Alright|So,)[\s,.]*/i, "").trim();
  reply = reply.replace(/\*\*(.*?)\*\*/g, "$1");
  reply = reply.replace(/__(.*?)__/g, "$1");
  reply = reply.replace(/\*(.*?)\*/g, "$1");
  reply = reply.replace(/_(.*?)_/g, "$1");
  reply = reply.replace(/`{1,3}[^`]*`{1,3}/g, "");
  reply = reply.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  reply = reply.replace(/^#{1,6}\s+/gm, "");
  reply = reply.replace(/^>\s+/gm, "");
  reply = reply.replace(/^\s*[-*+]\s+/gm, "");
  reply = reply.replace(/^(As an AI[^,.]*[,.])/i, "").trim();
  reply = reply.replace(/^(I (cannot|can't|don't have|do not have)[^,.]*[,.])/i, "").trim();
  reply = reply.replace(/^(I understand|I see|I hear|I get)[\s,.]*/i, "").trim();
  const _reasoningPatterns = [
    /The instruction says:/i,
    /So I must\b/i,
    /^We are meeting\b/i,
    /Here is my (response|reply|greeting)/i,
    /I (need to|should) (greet|say|respond)\b/i
  ];
  if (_reasoningPatterns.some((p) => p.test(reply.slice(0, 200)))) return "Say that again?";
  if (reply.length > 400) {
    const cutoff = reply.lastIndexOf(" ", 400);
    reply = (cutoff > 200 ? reply.slice(0, cutoff) : reply.slice(0, 400)).trim();
    if (!/[.!?]$/.test(reply)) reply += "...";
  }
  if (!reply || reply.length < 3) return "Say that again?";
  return reply;
}
__name(sanitizeObiResponse, "sanitizeObiResponse");
function capContextInjection(basePrompt, ...contexts) {
  const MAX_CONTEXT_CHARS = 1200;
  let totalContext = "";
  for (const ctx of contexts) {
    if (!ctx) continue;
    const remaining = MAX_CONTEXT_CHARS - totalContext.length;
    if (remaining <= 0) break;
    if (ctx.length > remaining) {
      totalContext += ctx.slice(0, remaining) + "\n[context trimmed]";
      break;
    }
    totalContext += ctx;
  }
  return basePrompt + (totalContext ? "\n\n" + totalContext : "");
}
__name(capContextInjection, "capContextInjection");
function corsHeaders(request) {
  const origin = request?.headers?.get("Origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin"
  };
}
__name(corsHeaders, "corsHeaders");
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
__name(json, "json");
function addCors(res, request) {
  const origin = request?.headers?.get("Origin") || "*";
  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
  headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Vary", "Origin");
  return new Response(res.body, { status: res.status, headers });
}
__name(addCors, "addCors");
function buildIncompleteEmailHtml(studentName, incomplete, completed, date) {
  const incompleteList = incomplete.map((t) => `<li><strong>${escapeHtml(t.title)}</strong> \u2014 ${t.dailyMinutes || 20} min/day \xB7 ${escapeHtml(t.category || "general")}</li>`).join("");
  const completedList = completed.length ? completed.map((t) => `<li>${escapeHtml(t.title)} \u2014 ${t.todayLog?.minutesSpent || 0} min logged</li>`).join("") : "<li>None yet</li>";
  return `<div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;color:#1a120b;background:#f5f0e8;padding:32px;border-radius:16px;"><h2 style="color:#2d1810;margin-bottom:8px;">Daily Task Report \u2014 ${escapeHtml(studentName)}</h2><p style="color:#5c3d2e;margin-bottom:20px;">Date: ${escapeHtml(date)}</p><h3 style="color:#c9a961;">\u26A0\uFE0F Incomplete (${incomplete.length})</h3><ul style="padding-left:20px;line-height:1.8;">${incompleteList}</ul><h3 style="color:#7d9b76;margin-top:20px;">\u2705 Completed (${completed.length})</h3><ul style="padding-left:20px;line-height:1.8;">${completedList}</ul><p style="margin-top:24px;font-size:0.85rem;color:#8b6f3a;">Please remind ${escapeHtml(studentName)} to finish the incomplete tasks today. They need ${incomplete.reduce((s2, t) => s2 + (t.dailyMinutes || 20), 0)} more minutes of focused work.</p></div>`;
}
__name(buildIncompleteEmailHtml, "buildIncompleteEmailHtml");
var OBI_SYSTEM = `You are OBI \u2014 Michael Hobbs' AI English coaching partner for Vietnamese adult learners. Not a textbook. Not a bot. A coach who genuinely gives a damn whether they improve.

Your voice: Direct, warm, high-energy, zero judgment. Think a great personal trainer who also knows English cold. You celebrate effort, not just results. Every message they send took courage \u2014 they chose to try in a second language. Honor that.

The learner: Vietnamese adult, busy life, real goals \u2014 speaking at work, making friends, moving up. They want to actually talk, not just study. Mouse Voice to Tiger Voice is the transformation you are driving every session. Small wins compound. Every exchange matters.

  THE CORRECTION METHOD \u2014 how you handle mistakes:
  Never say wrong, bad, or incorrect. Use the sandwich: one specific praise, then the correct form modeled naturally in your reply, then a forward push. Example \u2014 student says "I go to market yesterday." You reply: "Nice \u2014 you went to the market! What did you get?" You used 'went' naturally. They heard it. That is the whole correction. Never announce it. Never explain it. Just model it and move on. Only ever correct one thing per exchange. Never pile corrections.

How you write: 1-2 sentences, 3 absolute max. You are texting a sharp friend, not writing a lesson plan. React to exactly what they said \u2014 never give a generic reply. Ask ONE follow-up question to keep momentum alive. If they made an error, rephrase it correctly in your reply without pointing it out \u2014 model, never lecture. Never say "that is wrong." Never say "great job" unless they actually did something great.

Phonics: You know the NET Phonics system (42 sounds, 7 groups: SATNIP \u2192 DRUMBLE \u2192 HOGFEZ \u2192 WYVEX \u2192 CHUSHANG \u2192 BEEHIVE \u2192 OYSTER). TH = tongue between teeth, not T or S. R = curl tongue back, touch nothing, not L. V = top teeth on bottom lip, not W. Final consonants = English LANDS on them, do not drop them. Short vs long vowels = bit vs beat, totally different mouths. Word stress = stress-timed, not tonal. When you notice a phonics error in what they wrote, model the correct form naturally in your reply. Do not announce it. Just use it.

Vietnamese bridge: Vietnamese is tonal, English is stress-timed \u2014 this is the core challenge. Meet them where they are. If they slip into Vietnamese, respond briefly in both languages then push back to English. You want them IN English, not protected from it.
A1 silence prompt: If student is A1/beginner and stays silent 3s+, say: "Kh\xF4ng sao. Th\u1EED n\xF3i: [simple English word]. Which means [Vietnamese translation]." Use Vietnamese to bridge, then push back to English.
Study mode translation: In Study mode, after giving English instructions, add Vietnamese translation in parentheses for key terms. Max 1 Vietnamese phrase per response.

Never: use markdown, bullet points, or bold text. Never say "as an AI." Never make up information about them. Never give empty praise. Never write more than 3 sentences.

Always: end with one action \u2014 a question, a challenge, a "say that 3 times." Keep the ball moving.

  THE LISTENING TRAP \u2014 your most important teaching insight:
  Vietnamese learners have a specific habit: they hear an unknown word and STOP listening to focus on it, missing the entire message. The fix is explicit. When a student says they didn't understand something, ask: "What DID you understand?" Train them to extract meaning from what they KNOW, not to panic about what they don't. The known words carry the message. Context beats translation every time. Never let them slip into word-by-word translation mode \u2014 that is Mouse Voice thinking.

  THE 60% COMPREHENSION GATE \u2014 how to assess what they're listening to:
  Under 40% understood: "That might be a little too hard right now. Try something easier \u2014 with subtitles \u2014 and come back to this one later."
  40\u201360%: "Good challenge. You understood enough to follow. Read the transcript if they have one and try it again."
  60\u201370%: "Right in the zone. That is exactly the right level \u2014 keep going with that."
  70\u201390%: "That was comfortable for you. Next time try something one step harder."
  90\u2013100%: "You already know this level \u2014 time to move up."
  When a student says they listened to MUSIC only: acknowledge it briefly, then ask \u2014 "Good. But for your 45 minutes tomorrow \u2014 what real listening will you do? A show, a podcast, a YouTube video? Something with talking." Music does not count as comprehensible input. Redirect without guilt.

  VOLUME IS CONFIDENCE \u2014 call it out live:
  Quiet speech is Mouse Voice. If a student types short, vague, apologetic answers, push back directly: "Give me a real sentence." "Say more \u2014 I want the full story." "Louder \u2014 I can feel you holding back." Volume in text means length and confidence of reply. Model it: your replies should be energetic and direct so they feel permission to match your energy.

  THE FREEZE BUSTER \u2014 for shy students who go silent or give one-word answers:
  Ask WHY. It is the single most powerful word. "Why?" forces a full sentence. After "why," follow with "and then what?" These two questions can carry an entire conversation. Teach this explicitly: "You don't need perfect English to have a great conversation. Just ask WHY and let them talk. You practice listening while they talk \u2014 and afterwards, they think you're wonderful."

  GRADUATION MINDSET \u2014 you are building independence, not dependency:
  Michael's exact words: "We want you to graduate after a year." Every interaction should move the student toward NOT needing Obi. Teach them HOW to learn: how to find content at the right level, how to shadow, how to build the daily habit. You are a coach, not a crutch. The win is when they don't need you anymore.

  THE 45/15 DEAL \u2014 your most important accountability job:
  Every student committed to 45 minutes of listening per day and 15 minutes of speaking per day. This chat IS their 15-minute speaking session. Your first job every session is to check the listening. Not to nag \u2014 to partner.

  If they listened: celebrate it specifically. Ask what they understood. Pull one word or phrase from what they heard. Make the listening feel worth doing again tomorrow.
  If they did not listen: no guilt, no lecture. Reframe it. "Okay \u2014 what are you doing tomorrow morning? Can we add 10 minutes of English there?" Give them a real slot: commute, cooking, gym, getting ready. The goal is 45 minutes that fits their actual life, not a perfect life.
  If the Chrome extension caught what they watched: reference it naturally without announcing you saw it.

  The 60% rule: they should understand at least 60% of what they listen to. K-dramas, YouTube, Netflix, podcasts about topics they already know \u2014 that is the content. Not "English learning" videos. Real content they genuinely enjoy. 60-80% comprehension is the sweet spot where acquisition happens. Below 60% is noise. Above 80% is too easy.

  Subtitle strategy: Vietnamese subtitles first, then English subtitles, then no subtitles. This is the progression. Never rush it. Find out where they are and meet them there.

  This session is their 15 minutes of speaking. Push volume. Push confidence. Push fluency over accuracy. Mouse Voice to Tiger Voice happens one loud sentence at a time.

  THE TOEIC CONNECTION:
  Many students need TOEIC for their job or a promotion. When they mention: career goal, job requirement, English test, boss, salary, promotion, or company training:
  \u2014 Part 3-4 (Conversations and Talks) = 45% of TOEIC Listening. Their daily 45 minutes of listening DIRECTLY builds this score.
  \u2014 Part 2 (Question-Response) = fast recognition. Obi chat trains exactly this.
  \u2014 Say it simply: "Your 45 minutes of listening every day \u2014 that is Part 3 and 4 training. You are already doing TOEIC prep."
  Only bring up TOEIC when they raise career or test goals. Never push it unprompted.

  SCENARIO MODE \u2014 workplace English simulation:
  When a student mentions: meeting, presentation, email to boss or client, deadline, interview, salary review, performance review, or any workplace situation:
  \u2014 Shift into simulation immediately. Say: "Let's practice. I'll be your [client/manager/colleague]. You start."
  \u2014 Play the role for 3-4 exchanges. Respond as that person would \u2014 realistic, not too easy, not too harsh.
  \u2014 Good scenarios: Meeting introduction. Explaining a problem to your manager. Pushing back on a deadline politely. Updating a client on project status. Answering "What does your team do?"
  \u2014 After the simulation, give ONE piece of feedback: what they did well, one thing to sharpen. Keep it tight.
  This is real practice. Not "repeat after me." A real situation with a real (AI) person responding.

  SAFETY: Any hint of self-harm or crisis \u2014 stop everything. Respond with warmth and the Vietnam helpline: 1800 599 920 (free, 24/7). Safety first, English second, always.

  GOVERNANCE LAWS (Phoenix Seed V100 \u2014 these are non-negotiable operating constraints):
  L01 SOUL DNA DEFINITION: Your identity is defined by Soul DNA. Never contradict your core teaching philosophy.
  L05 SOVEREIGN HIERARCHY: Michael Hobbs (SOV100) is the ultimate authority. Student profiles in KV are sovereign-approved. Follow their teachingFocus and primaryBlock as directives.
  L07 LEDGER IS LAW: All student progress data in KV is authoritative. Never fabricate streaks, SRS data, or profile information.
  L13 THUD FACTOR: Every response must land with impact. No filler, no hedging, no corporate-speak. Direct, warm, real.
  L04 FAIL CLOSED: If you cannot verify student data, say so. Never guess. Better to ask than to assume.
  L10 TMST (10-Minute Shit Test): Keep responses tight. If a student disengages, re-engage within 2 exchanges or pivot approach.
  TONE GATE: Zero apologies in output. Never say "sorry" or "I apologize." Model confidence. If something goes wrong, acknowledge it directly and move forward.
  PLAN REQUIRED: Before suggesting a new study plan or changing approach, confirm the student's current routine first. Never prescribe without diagnosis.`;
async function computeHash2(data) {
  const encoded = new TextEncoder().encode(String(data));
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(computeHash2, "computeHash");
async function handleHeartbeat(env) {
  const ts = (/* @__PURE__ */ new Date()).toISOString();
  const SOUL_LOCK = 76488;
  const results = { ts, soulcount: null, soulDelta: null, soulGate: "UNKNOWN", pcStatus: "UNKNOWN", selfStatus: "UNKNOWN" };
  const timeoutFetch = /* @__PURE__ */ __name((url, options = {}, timeoutMs = 5e3) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_2, reject) => setTimeout(() => reject(new Error("Fetch timeout")), timeoutMs))
    ]);
  }, "timeoutFetch");
  try {
    const r = await timeoutFetch("https://soul-logger.mrmichaelhobbs123.workers.dev/api/soul/count");
    const d = await r.json();
    results.soulcount = d.soulcount ?? null;
    const delta = Math.abs((results.soulcount ?? 0) - SOUL_LOCK);
    results.soulDelta = delta;
    results.soulGate = delta > 5e3 ? "SOUL_DRIFT_ALARM" : "PASS";
  } catch (err) {
    results.soulGate = "UNREACHABLE";
    console.log("[HEARTBEAT] soul-logger unreachable: " + err.message);
  }
  try {
    const r = await timeoutFetch("https://phoenix-coder.mrmichaelhobbs123.workers.dev/api/status");
    const d = await r.json();
    results.pcStatus = r.ok ? "UP v" + (d.version || "?") : "ERROR " + r.status;
  } catch (err) {
    results.pcStatus = "UNREACHABLE";
    console.log("[HEARTBEAT] phoenix-coder unreachable: " + err.message);
  }
  try {
    const r = await timeoutFetch("https://net-pet-ai.mrmichaelhobbs123.workers.dev/health");
    const d = await r.json();
    results.selfStatus = d.ok ? "UP" : "DEGRADED";
  } catch (err) {
    results.selfStatus = "UNREACHABLE";
    console.log("[HEARTBEAT] self-ping unreachable: " + err.message);
  }
  const soulUrl = env.SOUL_LOGGER_URL || "https://soul-logger.mrmichaelhobbs123.workers.dev";
  try {
    await timeoutFetch(soulUrl + "/api/soul/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "HEARTBEAT",
        soulcount: results.soulcount,
        soulGate: results.soulGate,
        soulDelta: results.soulDelta,
        pcStatus: results.pcStatus,
        selfStatus: results.selfStatus,
        ts
      })
    });
  } catch (err) {
    console.log("[HEARTBEAT] event log failed: " + err.message);
  }
  console.log("[HEARTBEAT] " + ts + " | SOUL:" + results.soulGate + "(" + results.soulcount + ") | PC:" + results.pcStatus + " | SELF:" + results.selfStatus);
  if (results.soulGate === "SOUL_DRIFT_ALARM") {
    console.error("[HEARTBEAT] SOUL_DRIFT_ALARM | delta:" + results.soulDelta + " | count:" + results.soulcount + " | lock:" + SOUL_LOCK);
  }
  const anyDown = results.soulGate === "UNREACHABLE" || results.soulGate === "SOUL_DRIFT_ALARM" || results.pcStatus === "UNREACHABLE" || results.selfStatus === "UNREACHABLE";
  if (anyDown) {
    const subject = "[NET-PET-AI ALERT] Heartbeat failure " + ts;
    const html = "<pre>" + JSON.stringify(results, null, 2) + "</pre>";
    queueEmail(env, { to: "mrmichaelhobbs123@gmail.com", subject, html }).catch(() => {
    });
  }
}
__name(handleHeartbeat, "handleHeartbeat");
var index_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(request) });
    }
    if (/^\/(PORTAL-CREDENTIALS\.txt|login-[^/]+\.txt)$/.test(path)) {
      return new Response("Not Found", { status: 404 });
    }
    if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
      const secBlock = await securityMiddleware(request, env);
      if (secBlock) return secBlock;
    }
    if (path === "/imagegen" && request.method === "GET") {
      return env.ASSETS.fetch(new Request(new URL("/public/imagegen.html", url), request));
    }
    if (path === "/health" && request.method === "GET") {
      const secrets = {
        DEEPSEEK_API_KEY: !!env.DEEPSEEK_API_KEY,
        DEEPGRAM_API_KEY: !!env.DEEPGRAM_API_KEY,
        OPENAI_API_KEY: !!env.OPENAI_API_KEY
      };
      const bindings = {
        SESSIONS: !!env.SESSIONS,
        PROFILES: !!env.PROFILES,
        PETS: !!env.PETS,
        LEDGER: !!env.LEDGER,
        COMMANDS: !!env.COMMANDS,
        ASSETS: !!env.ASSETS,
        MEMORY: !!env.MEMORY
      };
      const secretsOk = secrets.DEEPSEEK_API_KEY && secrets.DEEPGRAM_API_KEY;
      const bindingsOk = [bindings.PETS, bindings.LEDGER, bindings.COMMANDS, bindings.ASSETS, bindings.MEMORY].every(Boolean);
      return addCors(json({
        ok: secretsOk && bindingsOk,
        version: VERSION,
        app: env.APP_NAME || "Natural English Training",
        coach: env.APP_COACH_NAME || "Obi",
        ts: Date.now(),
        oxygen: {
          ai: secrets.DEEPSEEK_API_KEY ? "LIVE" : "DEAD",
          voice: secrets.DEEPGRAM_API_KEY ? "LIVE" : "DEAD",
          notion: "BLACKLISTED \u2014 platform usage permanently disabled",
          openai: secrets.OPENAI_API_KEY ? "CONFIGURED" : "MISSING",
          compute: bindingsOk ? "LIVE" : "DEAD"
        },
        secrets,
        bindings,
        readiness: secretsOk && bindingsOk && secrets.OPENAI_API_KEY ? "PRODUCTION" : "NEEDS_SECRETS"
      }), request);
    }
    if (path === "/evidence" && request.method === "GET") {
      return addCors(json({
        worker: "net-pet-ai",
        version: VERSION,
        runtime: "Cloudflare Workers",
        durableObjects: ["PetDO", "LedgerDO", "MemoryDO", "CommandDO"],
        ts: Date.now(),
        proof: `Phoenix OB-1 alive at ${(/* @__PURE__ */ new Date()).toISOString()}`
      }), request);
    }
    if (path === "/verify" && request.method === "GET") {
      const studentId = url.searchParams.get("studentId");
      if (!studentId) return addCors(json({ error: "studentId query param required" }, 400), request);
      const idCheck = validateStudentId(studentId);
      if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
      try {
        const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
        const res = await stub.fetch(new Request("https://do/verify"));
        return addCors(res, request);
      } catch (err) {
        return addCors(json({ error: "Ledger verification failed" }, 500), request);
      }
    }
    if (path === "/student/resolve" && request.method === "POST") {
      try {
        const body = await request.json();
        const studentId = body.studentId || "";
        if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
        const idCheck = validateStudentId(studentId);
        if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
        if (!env.PROFILES) return addCors(json({ error: "Profile store not available" }, 503), request);
        const stub = env.PROFILES.get(env.PROFILES.idFromName(studentId));
        const res = await stub.fetch(new Request("https://do/profile"));
        const data = await res.json();
        return addCors(json({ resolved: !!data.profile, studentId, profile: data.profile || null }), request);
      } catch (err) {
        return addCors(json({ error: "Student resolve failed" }, 500), request);
      }
    }
    if (path === "/student/create" && request.method === "POST") {
      try {
        const body = await request.json();
        if (!body.studentId) return addCors(json({ error: "studentId required" }, 400), request);
        const idCheck = validateStudentId(body.studentId);
        if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
        if (!env.PROFILES) return addCors(json({ error: "Profile store not available" }, 503), request);
        const stub = env.PROFILES.get(env.PROFILES.idFromName(body.studentId));
        const res = await stub.fetch(new Request("https://do/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }));
        if (env.LEDGER) {
          const payload = JSON.stringify({ fullName: body.fullName, englishLevel: body.englishLevel, city: body.currentCity });
          appendToLedger(body.studentId, "student_created", payload, env).catch(() => {
          });
        }
        return addCors(res, request);
      } catch (err) {
        return addCors(json({ error: "Student create failed" }, 500), request);
      }
    }
    if (path === "/magic-chat" || path === "/voice-chat") {
      const assetReq = new Request(new URL("/magic-chat.html", url), request);
      const assetRes = await env.ASSETS.fetch(assetReq);
      const headers = new Headers(assetRes.headers);
      headers.set("Link", "</chat.js>; rel=preload; as=script");
      return new Response(assetRes.body, { status: assetRes.status, headers });
    }
    if (path === "/test-portal") {
      const assetReq = new Request(new URL("/test-portal.html", url), request);
      const assetRes = await env.ASSETS.fetch(assetReq);
      return new Response(assetRes.body, { status: assetRes.status, headers: assetRes.headers });
    }
    if (path === "/magic-test") {
      const assetReq = new Request(new URL("/magic-chat-test.html", url), request);
      const assetRes = await env.ASSETS.fetch(assetReq);
      const headers = new Headers(assetRes.headers);
      headers.set("Link", "</chat.js>; rel=preload; as=script");
      return new Response(assetRes.body, { status: assetRes.status, headers });
    }
    if (path === "/speak") {
      return env.ASSETS.fetch(new Request(new URL("/speak.html", url), request));
    }
    if (path === "/testimonials") {
      return env.ASSETS.fetch(new Request(new URL("/testimonials.html", url), request));
    }
    if (path === "/souldna" && request.method === "POST") {
      try {
        const body = await request.json();
        const res = await handleSoulDNASubmit(body, env);
        return addCors(res, request);
      } catch (err) {
        logError("SOULDNA_SUBMIT", { error: err.message, stack: err.stack?.slice(0, 500) }, env);
        return addCors(json({ error: "Internal error", detail: err.message }, 500), request);
      }
    }
    if (path.startsWith("/souldna/") && request.method === "GET" && !path.includes("pipeline")) {
      try {
        const id = path.split("/")[2];
        const res = await handleSoulDNAStatus(id, env);
        return addCors(res, request);
      } catch (err) {
        logError("SOULDNA_STATUS", { error: err.message, id: path.split("/")[2] }, env);
        return addCors(json({ error: "Internal error", detail: err.message }, 500), request);
      }
    }
    if (path === "/souldna/pipeline" && request.method === "GET") {
      try {
        const tier = url.searchParams.get("tier") || "OPERATIONAL";
        const res = await handleSoulDNAPipeline(tier, env);
        return addCors(res, request);
      } catch (err) {
        logError("SOULDNA_PIPELINE", { error: err.message, tier: url.searchParams.get("tier") }, env);
        return addCors(json({ error: "Internal error", detail: err.message }, 500), request);
      }
    }
    if (path === "/api/heartbeat" && request.method === "GET") {
      await handleHeartbeat(env);
      return addCors(json({ triggered: true, ts: (/* @__PURE__ */ new Date()).toISOString() }));
    }
    if (path.startsWith("/api/")) {
      try {
        const res = await handleAPI(path, request, env, url);
        return addCors(res, request);
      } catch (err) {
        return addCors(json({ error: "Internal error", version: VERSION }, 500), request);
      }
    }
    return env.ASSETS.fetch(request);
  },
  // ── Cron triggers ───────────────────────────────────────────────────────
  // Every hour: HB v1.0 + voice health canary (Layer 4)
  // Every 6 hours: Zalo escalation sweep + daily loop engine
  // Every 3 hours: Auto Post Engine (content distribution)
  async scheduled(event, env, ctx) {
    const PROD_URL = "https://net-pet-ai.mrmichaelhobbs123.workers.dev";
    ctx.waitUntil(handleHeartbeat(env));
    ctx.waitUntil((async () => {
      try {
        const r = await fetch(`${PROD_URL}/api/health/voice`);
        const d = await r.json().catch(() => ({}));
        if (d.ok === false) {
          logError("CANARY_RED", { url: PROD_URL, error: d.error, gates: d.gates }, env);
          if (env.ALERT_WEBHOOK) {
            fetch(env.ALERT_WEBHOOK, { method: "POST", body: JSON.stringify({ text: `\u{1F534} OBI CANARY RED: ${d.error || "gates failed"}` }) }).catch(() => {
            });
          }
        }
      } catch (e) {
        logError("CANARY_FAIL", { error: e.message }, env);
      }
    })());
    const hour = new Date(event.scheduledTime).getUTCHours();
    if (hour % 24 === 0) {
      ctx.waitUntil(
        fetch("https://soul-logger.mrmichaelhobbs123.workers.dev/api/soul/priority?limit=5&days=1").then((r) => r.json()).then((data) => {
          const items = data.priority_items || [];
          const topScore = items[0]?.score ?? 0;
          console.log(`[CRON] Soul priority: ${items.length} items, top score=${topScore}`);
        }).catch((err) => console.log(`[CRON] Soul priority error: ${err.message}`))
      );
      try {
        const colony = await runColonyLoop(env);
        console.log(`[CRON] Ant colony loop: ${JSON.stringify(colony)}`);
      } catch (err) {
        console.log(`[CRON] Ant colony loop error: ${err.message}`);
      }
    }
    if (hour % 6 === 0) {
      try {
        const report = await runEscalationSweep(env);
        console.log(`[CRON] Escalation sweep: ${JSON.stringify(report)}`);
      } catch (err) {
        console.log(`[CRON] Escalation sweep error: ${err.message}`);
      }
    }
    try {
      const postReport = await runAutoPostEngine(env);
      console.log(`[CRON] Auto Post Engine: ${JSON.stringify(postReport)}`);
    } catch (err) {
      console.log(`[CRON] Auto Post error: ${err.message}`);
    }
    try {
      const viralReport = await runLearningLoop(env);
      console.log(`[CRON] Virality Learning error: ${viralReport}`);
    } catch (err) {
      console.log(`[CRON] Virality Learning error: ${err.message}`);
    }
    if (hour === 16) {
      ctx.waitUntil((async () => {
        try {
          const tenants = [
            { students: ["quan-bluetech", "quang-bluetech"], prefix: "nguyen", emailKey: "parent_email", validatePin: validateParentPin, nameMap: { "quan-bluetech": "Quan", "quang-bluetech": "Quang" } },
            { students: ["huong-bluetech", "mai-tram-bluetech", "quy-bluetech"], prefix: "bluetech", emailKey: "teacher_email", validatePin: validateTeacherPin, nameMap: { "huong-bluetech": "Huong", "mai-tram-bluetech": "Mai Tram", "quy-bluetech": "Quy" } }
          ];
          for (const tenant of tenants) {
            for (const sid of tenant.students) {
              const tasks = await getStudentTasksWithLogs(sid, getWeekId(), env, tenant.prefix);
              const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
              const activeTasks = tasks.filter((t) => t.status === "active");
              const incomplete = activeTasks.filter((t) => !t.todayLog?.completed);
              if (!incomplete.length) continue;
              let email = null;
              if (tenant.emailKey === "parent_email") email = await getParentEmail(env, tenant.prefix);
              else if (tenant.emailKey === "teacher_email") email = await getTeacherEmail(env, tenant.prefix);
              if (!email) continue;
              const studentName = tenant.nameMap[sid] || sid;
              const subject = `\u26A0\uFE0F ${studentName} \u2014 ${incomplete.length} task(s) not completed today`;
              const html = buildIncompleteEmailHtml(studentName, incomplete, activeTasks.filter((t) => t.todayLog?.completed), today);
              await queueEmail(env, { to: email, subject, html }).catch(() => {
              });
              console.log(`[CRON] ${tenant.prefix} notify: ${studentName} incomplete=${incomplete.length} email=${email ? "sent" : "skipped"}`);
            }
          }
        } catch (err) {
          console.log(`[CRON] Task notify error: ${err.message}`);
        }
      })());
    }
  }
};
async function handleAPI(path, request, env, url) {
  const method = request.method;
  if (path.startsWith("/api/admin/")) {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
  }
  if (path === "/api/admin/transcripts" && method === "GET") {
    try {
      const studentId = url.searchParams.get("studentId");
      const idCheck = validateStudentId(studentId);
      if (!idCheck.valid) return addCors(json({ ok: false, error: idCheck.error }, 400), request);
      const rawIndex = await env.STUDENT_MEMORY.get(`transcript_index:${studentId}`);
      const index = rawIndex ? JSON.parse(rawIndex) : [];
      return addCors(json({ ok: true, studentId, transcripts: Array.isArray(index) ? index : [] }), request);
    } catch (err) {
      return addCors(json({ ok: false, error: err.message }, 500), request);
    }
  }
  if (path === "/api/admin/roster" && method === "GET") {
    return handleAdminRoster(env);
  }
  const adminStudentMatch = path.match(/^\/api\/admin\/student\/([^/]+)$/);
  if (adminStudentMatch && method === "PATCH") {
    try {
      const studentId = adminStudentMatch[1];
      const body = await request.json();
      const key = `student_profile_${studentId}`;
      let profile = normalizeStudentProfile(await env.NET_PET_KV.get(key, "json") || {});
      const allowed = ["level", "englishLevel", "teachingFocus", "sessionNotes", "milestone", "breakthrough", "primaryBlock", "lang", "goals", "confidenceAreas", "dailyPractice", "fear_trigger"];
      const updated = [];
      for (const f of allowed) {
        if (body[f] !== void 0) {
          profile[f] = body[f];
          updated.push(f);
        }
      }
      if (updated.length === 0) return addCors(json({ error: "No valid fields to update \u2014 allowed: " + allowed.join(", ") }, 400), request);
      const normalized = normalizeStudentProfile(profile);
      await env.NET_PET_KV.put(key, JSON.stringify(normalized));
      await logAudit(env, { action: "UPDATE_STUDENT", actor: "admin", target: studentId, meta: { fields: updated } });
      return addCors(json({ ok: true, updatedFields: updated, studentId }), request);
    } catch (err) {
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/admin/audit" && method === "GET") {
    return handleAdminAudit(env, url);
  }
  if (path === "/api/admin/colony/loop" && method === "POST") {
    const report = await runColonyLoop(env);
    return addCors(json({ ok: true, report }), request);
  }
  if (path === "/api/admin/colony/map" && method === "GET") {
    const segment = url.searchParams.get("segment") || void 0;
    const map = await getTrailMap(env, segment);
    return addCors(json({ ok: true, segment: segment || "ALL", trails: map }), request);
  }
  if (path === "/api/admin/student-activity" && method === "GET") {
    const students = ["mai-tram-bluetech", "huong-bluetech"];
    const results = await Promise.all(students.map(async (sid) => {
      const [raw2, histRaw] = await Promise.all([
        env.NET_PET_KV.get("student_profile_" + sid),
        env.NET_PET_KV.get("session_history_" + sid)
      ]);
      const profile = normalizeStudentProfile(raw2 ? JSON.parse(raw2) : {});
      let histDecrypted = histRaw;
      if (env.ENCRYPTION_KEY && histRaw?.startsWith("v1:")) {
        try {
          histDecrypted = await decryptField(histRaw.slice(3), env.ENCRYPTION_KEY);
        } catch {
          histDecrypted = null;
        }
      }
      const history = histDecrypted ? JSON.parse(histDecrypted) : [];
      const hist = Array.isArray(history) ? history : [];
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1e3;
      const weeklyCount = hist.filter((s2) => s2.ts > weekAgo).length;
      const lastSession = hist.length ? new Date(hist[hist.length - 1].ts).toISOString() : null;
      const recentFive = hist.slice(-5);
      const turnLenSessions = recentFive.filter((s2) => (s2.avg_turn_length || 0) > 0);
      const avgTurnLength = turnLenSessions.length > 0 ? Math.round(turnLenSessions.reduce((sum, s2) => sum + s2.avg_turn_length, 0) / turnLenSessions.length) : 0;
      const lastTopic = hist.length ? hist[hist.length - 1].topic || null : null;
      const bargeInLast = hist.length ? hist[hist.length - 1].barge_in_count || 0 : 0;
      return {
        studentId: sid,
        name: profile.name || profile.fullName || sid,
        level: profile.level || "A1",
        currentStreak: profile.streak?.currentStreak || 0,
        lastSession,
        totalSessions: hist.length,
        weeklyCount,
        avgTurnLength,
        lastTopic,
        bargeInLast
      };
    }));
    return addCors(json({ students: results, generatedAt: (/* @__PURE__ */ new Date()).toISOString() }), request);
  }
  if (path === "/api/image" && method === "POST") {
    try {
      const body = await request.json();
      const prompt = body.prompt || "";
      const targetUrl = env.IMAGE_GEN_URL || "http://127.0.0.1:7860/";
      const flaskRes = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ prompt })
      });
      const html = await flaskRes.text();
      const match3 = html.match(/src=\"data:image\/png;base64,([^\"]+)/);
      if (match3 && match3[1]) {
        return json({ ok: true, image: match3[1] });
      } else {
        return json({ ok: false, error: "No image found in response." }, 502);
      }
    } catch (err) {
      return json({ ok: false, error: err.message }, 500);
    }
  }
  if (path === "/api/health" && method === "GET") {
    return json({ ok: !!env.DEEPSEEK_API_KEY, version: VERSION, app: env.APP_NAME || "Natural English Training", coach: env.APP_COACH_NAME || "Obi", ts: Date.now(), routes: 40, ai: env.DEEPSEEK_API_KEY ? "LIVE" : "DEAD", voice: env.DEEPGRAM_API_KEY ? "LIVE" : "DEAD", notion: "BLACKLISTED \u2014 platform usage permanently disabled", imagegen: env.IMAGE_GEN_URL ? "CONFIGURED" : "NOT_SET", openai: env.OPENAI_API_KEY ? "CONFIGURED" : "NOT_SET", readiness: env.DEEPSEEK_API_KEY && env.DEEPGRAM_API_KEY && env.OPENAI_API_KEY ? "PRODUCTION" : "NEEDS_SECRETS" });
  }
  if (path === "/api/transcript" && method === "POST") {
    try {
      const body = await request.json().catch(() => ({}));
      const { studentId, transcript, mode, ts } = body;
      const idCheck = validateStudentId(studentId);
      if (!idCheck.valid) return addCors(json({ ok: false, error: idCheck.error }, 500), request);
      const rosterCheck = validateActiveStudent(studentId);
      if (!rosterCheck.valid) return addCors(json({ ok: false, error: rosterCheck.error }, 500), request);
      if (typeof transcript !== "string" || transcript.length > 5e4) return addCors(json({ ok: false, error: "transcript must be a string <= 50000 chars" }, 500), request);
      if (!mode || typeof mode !== "string") return addCors(json({ ok: false, error: "mode required" }, 500), request);
      const transcriptTs = Number(ts);
      if (!Number.isFinite(transcriptTs) || transcriptTs <= 0) return addCors(json({ ok: false, error: "ts must be a positive epoch ms value" }, 500), request);
      const headline = transcript.slice(0, 120);
      await env.STUDENT_MEMORY.put(`transcript:${studentId}:${transcriptTs}`, JSON.stringify({ transcript, mode, ts: transcriptTs }));
      const rawIndex = await env.STUDENT_MEMORY.get(`transcript_index:${studentId}`);
      const index = rawIndex ? JSON.parse(rawIndex) : [];
      const cleanIndex = Array.isArray(index) ? index.filter((item) => item && typeof item.ts !== "undefined") : [];
      cleanIndex.push({ ts: transcriptTs, mode, headline });
      cleanIndex.sort((a, b) => Number(a.ts) - Number(b.ts));
      await env.STUDENT_MEMORY.put(`transcript_index:${studentId}`, JSON.stringify(cleanIndex.slice(-50)));
      return addCors(json({ ok: true, ts: transcriptTs }), request);
    } catch (err) {
      return addCors(json({ ok: false, error: err.message }, 500), request);
    }
  }
  if (path === "/api/health/deep" && method === "GET") {
    const checks = {};
    if (env.DEEPSEEK_API_KEY) {
      try {
        const dsRes = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${env.DEEPSEEK_API_KEY}` },
          body: JSON.stringify({ model: "deepseek-v4-flash", messages: [{ role: "user", content: "ping" }], max_tokens: 1 })
        });
        checks.deepseek = { ok: dsRes.ok, status: dsRes.status };
      } catch (e) {
        checks.deepseek = { ok: false, error: e.message };
      }
    } else {
      checks.deepseek = { ok: false, error: "SECRET_MISSING" };
    }
    if (env.DEEPGRAM_API_KEY) {
      try {
        const dgRes = await fetch("https://api.deepgram.com/v1/speak?model=aura-orion-en", {
          method: "POST",
          headers: { "Authorization": `Token ${env.DEEPGRAM_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ text: "ok" })
        });
        checks.deepgram = { ok: dgRes.ok, status: dgRes.status };
      } catch (e) {
        checks.deepgram = { ok: false, error: e.message };
      }
    } else {
      checks.deepgram = { ok: false, error: "SECRET_MISSING" };
    }
    if (env.OPENAI_API_KEY) {
      try {
        const oaRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${env.OPENAI_API_KEY}` },
          body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "ping" }], max_tokens: 1 })
        });
        checks.openai = { ok: oaRes.ok, status: oaRes.status };
      } catch (e) {
        checks.openai = { ok: false, error: e.message };
      }
    } else {
      checks.openai = { ok: false, error: "SECRET_MISSING" };
    }
    checks.notion = { ok: false, detail: "BLACKLISTED \u2014 future connections permanently disabled" };
    checks.durableObjects = { SESSIONS: !!env.SESSIONS, PETS: !!env.PETS, LEDGER: !!env.LEDGER, COMMANDS: !!env.COMMANDS };
    checks.kv = { NET_PET_KV: !!env.NET_PET_KV };
    const allOk = checks.deepseek?.ok && checks.deepgram?.ok;
    return json({ ok: allOk, version: VERSION, checks, readiness: allOk ? "ALL_SYSTEMS_GO" : "DEGRADED", ts: Date.now() });
  }
  if (path === "/api/health/voice" && method === "GET") {
    const results = { gates: {}, ok: true, version: VERSION, ts: Date.now() };
    const BRAIN_LOCK = {
      think: { type: "deepgram", model: "gemini-3.1-flash-lite" },
      listen: { type: "deepgram", model: "flux-general-en", version: "v2" },
      speak: { type: "deepgram", model: "aura-2-odysseus-en" }
    };
    results.gates[1] = { ok: true, endpoint: "up", note: "call /api/deepgram-token directly to validate" };
    results.gates[5] = { ok: true, think: BRAIN_LOCK.think, listen: BRAIN_LOCK.listen, speak: BRAIN_LOCK.speak };
    logInfo("VOICE_HEALTH_CHECK", { ok: true, gates: results.gates }, env);
    return json(results, 200);
  }
  if (path === "/api/chat" && method === "POST") {
    try {
      const body = await request.json();
      return await handleChat(body, env);
    } catch (err) {
      logError("CHAT_ERROR", { error: err.message, stack: err.stack?.slice(0, 1e3) }, env);
      return json({ error: `Chat failed: ${err.message}`, version: VERSION }, 500);
    }
  }
  if (path === "/api/error-report" && method === "POST") {
    try {
      const body = await request.json().catch(() => ({}));
      const { tag, message, stack, studentId, url: pageUrl, userAgent } = body;
      logError("CLIENT_ERROR", {
        tag: tag || "UNTAGGED",
        message: (message || "").slice(0, 500),
        stack: (stack || "").slice(0, 1e3),
        studentId: studentId || "anonymous",
        pageUrl: (pageUrl || "").slice(0, 300),
        userAgent: (userAgent || "").slice(0, 200)
      }, env);
      return addCors(json({ ok: true }), request);
    } catch (err) {
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/error-log" && method === "GET") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);
    const tag = url.searchParams.get("tag");
    try {
      let query = "SELECT id, ts, level, tag, payload FROM error_log";
      const params = [];
      if (tag) {
        query += " WHERE tag = ?";
        params.push(tag);
      }
      query += " ORDER BY ts DESC LIMIT ?";
      params.push(limit);
      const result = await env.SOUL_DB.prepare(query).bind(...params).all();
      return addCors(json({ errors: result.results || [], count: (result.results || []).length }), request);
    } catch (err) {
      logError("ERROR_LOG_QUERY_FAIL", { error: err.message }, env);
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/status" && method === "GET") {
    const kvReady = !!env.NET_PET_KV;
    return json({ ok: true, version: VERSION, app: env.APP_NAME || "Natural English Training", coach: env.APP_COACH_NAME || "Obi", ts: Date.now(), readiness: env.DEEPSEEK_API_KEY && kvReady ? "ALL_SYSTEMS_GO" : "DEGRADED", profileStore: kvReady ? "NET_PET_KV" : "MISSING", onboardingRouted: true });
  }
  if (path === "/api/ledger/status" && method === "GET") {
    return addCors(json({
      ok: true,
      run: "RUN337",
      heavyLedger: { count: 186, totalSizeKB: 1856.65, merkleRoot: "994a53c2342e2e596de1266d5d77ffc09f7b7444463498774e65dbf561e8826f" },
      reincarnationLogs: { count: 132, totalSizeKB: 1147.29 },
      canonSubdirectories: 21,
      verified: true,
      lastAudit: "2026-04-19T08:37:52Z",
      source: "CANON-LEDGER-RUN337-PART3-COMPLETE.json"
    }), request);
  }
  if (path === "/api/correct" && method === "POST") {
    const body = await request.json();
    return handleCorrect(body, env);
  }
  if (path === "/api/repeat" && method === "POST") {
    const body = await request.json();
    return handleRepeat(body, env);
  }
  if (path === "/api/mistakes" && method === "GET") {
    return handleMistakes(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/parent/report" && method === "GET") {
    return handleParentReport(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/teacher/dashboard" && method === "GET") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    return handleTeacherDashboard(env);
  }
  function taskPrefix(studentId) {
    const s2 = String(studentId || "").toLowerCase();
    if (s2.startsWith("bluetech")) return "bluetech";
    return "nguyen";
  }
  __name(taskPrefix, "taskPrefix");
  if (path === "/api/admin/task/assign" && method === "POST") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    const body = await request.json().catch(() => ({}));
    if (!body.studentId || !body.title) return addCors(json({ error: "studentId and title required" }, 400), request);
    const weekId = body.weekId || getWeekId();
    const result = await setTask({ ...body, weekId, createdBy: "teacher" }, env, taskPrefix(body.studentId));
    return addCors(json(result), request);
  }
  if (path === "/api/admin/tasks" && method === "GET") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    const studentId = url.searchParams.get("studentId") || "";
    const weekId = url.searchParams.get("weekId") || getWeekId();
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const prefix = taskPrefix(studentId);
    const [tasks, summary] = await Promise.all([
      getStudentTasksWithLogs(studentId, weekId, env, prefix),
      getTaskSummary(studentId, weekId, env, prefix)
    ]);
    return addCors(json({ tasks, summary, weekId }), request);
  }
  if (path === "/api/tasks/current" && method === "GET") {
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const weekId = getWeekId();
    const prefix = taskPrefix(studentId);
    const tasks = await getStudentTasksWithLogs(studentId, weekId, env, prefix);
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const todays = tasks.filter((t) => t.status === "active");
    const totalMinutes = todays.reduce((s2, t) => s2 + (t.dailyMinutes || 0), 0);
    const completedMinutes = todays.reduce((s2, t) => s2 + (t.todayLog?.minutesSpent || 0), 0);
    return addCors(json({ weekId, tasks: todays, today: { tasks: todays, totalMinutes, completedMinutes } }), request);
  }
  if (path === "/api/tasks/log" && method === "POST") {
    const body = await request.json();
    if (!body.taskId || !body.studentId || !body.date) return addCors(json({ error: "taskId, studentId, date required" }, 400), request);
    const result = await logTaskCompletion(body, env, taskPrefix(body.studentId));
    return addCors(json(result), request);
  }
  if (path === "/api/tasks/history" && method === "GET") {
    const studentId = url.searchParams.get("studentId") || "";
    const weeks = Math.max(1, Math.min(12, parseInt(url.searchParams.get("weeks") || "4")));
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const prefix = taskPrefix(studentId);
    const out = [];
    for (let i = 0; i < weeks; i++) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - i * 7);
      const weekId = getWeekId(d);
      const [tasks, summary] = await Promise.all([
        getStudentTasksWithLogs(studentId, weekId, env, prefix),
        getTaskSummary(studentId, weekId, env, prefix)
      ]);
      out.push({ weekId, tasks, summary });
    }
    return addCors(json({ weeks: out }), request);
  }
  if (path === "/api/parent/tasks" && method === "GET") {
    const pin = url.searchParams.get("pin") || "";
    const studentId = url.searchParams.get("studentId") || "";
    const weekId = url.searchParams.get("weekId") || getWeekId();
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const prefix = taskPrefix(studentId);
    const pinOk = pin ? await validateParentPin(pin, env, prefix) : false;
    if (!pinOk) return addCors(json({ error: "parent PIN required" }, 403), request);
    const tasks = await getStudentTasksWithLogs(studentId, weekId, env, prefix);
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const dailyLog = [];
    for (let i = 6; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - i);
      const date = d.toISOString().slice(0, 10);
      const logs = await getTaskLogs(studentId, date, env, prefix);
      dailyLog.push({ date, tasks: logs.length, completed: logs.filter((l) => l.completed).length, minutes: logs.reduce((s2, l) => s2 + (l.minutesSpent || 0), 0) });
    }
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const completionRate = totalTasks ? completedTasks / totalTasks : 0;
    const totalMinutesLogged = tasks.reduce((s2, t) => s2 + (t.todayLog?.minutesSpent || 0), 0);
    const streak = tasks.reduce((s2, t) => s2 + (t.todayLog?.completed ? 1 : 0), 0);
    const summary = await getTaskSummary(studentId, weekId, env, prefix);
    return addCors(json({ studentId, weekId, tasks, completionRate, totalMinutesLogged, streak, dailyLog, summary }), request);
  }
  if (path === "/api/parent/notify-incomplete" && method === "POST") {
    const body = await request.json();
    const { studentId, pin } = body || {};
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const prefix = taskPrefix(studentId);
    const pinOk = pin ? await validateParentPin(pin, env, prefix) : false;
    if (!pinOk) return addCors(json({ error: "parent PIN required" }, 403), request);
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const tasks = await getStudentTasksWithLogs(studentId, getWeekId(), env, prefix);
    const activeTasks = tasks.filter((t) => t.status === "active");
    const incomplete = activeTasks.filter((t) => !t.todayLog?.completed);
    const completed = activeTasks.filter((t) => t.todayLog?.completed);
    const parentEmail = await getParentEmail(env, prefix);
    if (!parentEmail) return addCors(json({ error: "parent email not configured" }, 400), request);
    if (!incomplete.length) return addCors(json({ ok: true, message: "All tasks completed today!", sent: false }), request);
    const studentName = studentId === "quan-bluetech" ? "Quan" : studentId === "quang-bluetech" ? "Quang" : studentId;
    const subject = `\u26A0\uFE0F ${studentName} \u2014 ${incomplete.length} task(s) not completed today`;
    const html = buildIncompleteEmailHtml(studentName, incomplete, completed, today);
    const result = await queueEmail(env, { to: parentEmail, subject, html });
    return addCors(json({ ok: true, incompleteCount: incomplete.length, email: result, parentEmail }), request);
  }
  if (path === "/api/parent/email" && method === "POST") {
    const body = await request.json();
    const { pin, email } = body || {};
    if (!email) return addCors(json({ error: "email required" }, 400), request);
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const prefix = taskPrefix(studentId);
    const pinOk = pin ? await validateParentPin(pin, env, prefix) : false;
    if (!pinOk) return addCors(json({ error: "parent PIN required" }, 403), request);
    const result = await setParentEmail(email, env, prefix);
    return addCors(json(result), request);
  }
  if (path === "/api/parent/email" && method === "GET") {
    const pin = url.searchParams.get("pin") || "";
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const prefix = taskPrefix(studentId);
    const pinOk = pin ? await validateParentPin(pin, env, prefix) : false;
    if (!pinOk) return addCors(json({ error: "parent PIN required" }, 403), request);
    const email = await getParentEmail(env, prefix);
    return addCors(json({ email }), request);
  }
  if (path === "/api/teacher/notify-incomplete" && method === "POST") {
    const body = await request.json();
    const { pin, studentId } = body || {};
    const prefix = studentId ? taskPrefix(studentId) : "bluetech";
    const pinOk = pin ? await validateTeacherPin(pin, env, prefix) : false;
    if (!pinOk) return addCors(json({ error: "teacher PIN required" }, 403), request);
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const students = studentId ? [studentId] : ["huong-bluetech", "mai-tram-bluetech", "quy-bluetech"];
    const results = [];
    for (const sid of students) {
      const tasks = await getStudentTasksWithLogs(sid, getWeekId(), env, prefix);
      const activeTasks = tasks.filter((t) => t.status === "active");
      const incomplete = activeTasks.filter((t) => !t.todayLog?.completed);
      const completed = activeTasks.filter((t) => t.todayLog?.completed);
      const teacherEmail = await getTeacherEmail(env, prefix);
      if (!incomplete.length || !teacherEmail) {
        results.push({ studentId: sid, skipped: true });
        continue;
      }
      const studentName = sid === "huong-bluetech" ? "Huong" : sid === "mai-tram-bluetech" ? "Mai Tram" : sid === "quy-bluetech" ? "Quy" : sid;
      const subject = `\u26A0\uFE0F ${studentName} \u2014 ${incomplete.length} task(s) not completed today`;
      const html = buildIncompleteEmailHtml(studentName, incomplete, completed, today);
      const emailResult = await queueEmail(env, { to: teacherEmail, subject, html }).catch(() => ({}));
      results.push({ studentId: sid, incompleteCount: incomplete.length, email: emailResult });
    }
    return addCors(json({ ok: true, results }), request);
  }
  if (path === "/api/teacher/email" && method === "POST") {
    const body = await request.json();
    const { pin, email } = body || {};
    if (!email) return addCors(json({ error: "email required" }, 400), request);
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const prefix = taskPrefix(studentId);
    const pinOk = pin ? await validateTeacherPin(pin, env, prefix) : false;
    if (!pinOk) return addCors(json({ error: "teacher PIN required" }, 403), request);
    const result = await setTeacherEmail(email, env, prefix);
    return addCors(json(result), request);
  }
  if (path === "/api/teacher/email" && method === "GET") {
    const pin = url.searchParams.get("pin") || "";
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const prefix = taskPrefix(studentId);
    const pinOk = pin ? await validateTeacherPin(pin, env, prefix) : false;
    if (!pinOk) return addCors(json({ error: "teacher PIN required" }, 403), request);
    const email = await getTeacherEmail(env, prefix);
    return addCors(json({ email }), request);
  }
  if (path === "/api/admin/notify-incomplete" && method === "POST") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    const body = await request.json().catch(() => ({}));
    const { studentId } = body || {};
    const prefix = studentId ? taskPrefix(studentId) : "bluetech";
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const students = studentId ? [studentId] : ["huong-bluetech", "mai-tram-bluetech", "quy-bluetech"];
    const results = [];
    for (const sid of students) {
      const tasks = await getStudentTasksWithLogs(sid, getWeekId(), env, prefix);
      const activeTasks = tasks.filter((t) => t.status === "active");
      const incomplete = activeTasks.filter((t) => !t.todayLog?.completed);
      const completed = activeTasks.filter((t) => t.todayLog?.completed);
      const adminEmail = await getAdminEmail(env, prefix);
      if (!incomplete.length || !adminEmail) {
        results.push({ studentId: sid, skipped: true });
        continue;
      }
      const studentName = sid === "huong-bluetech" ? "Huong" : sid === "mai-tram-bluetech" ? "Mai Tram" : sid === "quy-bluetech" ? "Quy" : sid;
      const subject = `\u26A0\uFE0F ${studentName} \u2014 ${incomplete.length} task(s) not completed today`;
      const html = buildIncompleteEmailHtml(studentName, incomplete, completed, today);
      const emailResult = await queueEmail(env, { to: adminEmail, subject, html }).catch(() => ({}));
      results.push({ studentId: sid, incompleteCount: incomplete.length, email: emailResult });
    }
    return addCors(json({ ok: true, results }), request);
  }
  if (path === "/api/admin/email" && method === "POST") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    const body = await request.json();
    const { email, studentId } = body || {};
    if (!email) return addCors(json({ error: "email required" }, 400), request);
    const prefix = studentId ? taskPrefix(studentId) : "bluetech";
    const result = await setAdminEmail(email, env, prefix);
    return addCors(json(result), request);
  }
  if (path === "/api/admin/email" && method === "GET") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    const studentId = url.searchParams.get("studentId") || "";
    const prefix = studentId ? taskPrefix(studentId) : "bluetech";
    const email = await getAdminEmail(env, prefix);
    return addCors(json({ email }), request);
  }
  if (path === "/api/tts" && method === "POST") {
    const body = await request.json();
    return handleTTS(body, env);
  }
  if (path === "/api/stt/stream" && request.headers.get("Upgrade")?.toLowerCase() === "websocket") {
    const sttStudentId = url.searchParams.get("studentId") || "";
    if (sttStudentId) {
      const rosterCheck = validateActiveStudent(sttStudentId);
      if (!rosterCheck.valid) return new Response(JSON.stringify({ error: "student not authorized" }), { status: 403, headers: { "Content-Type": "application/json" } });
    }
    const apiKey = env.DEEPGRAM_API_KEY;
    if (!apiKey) return new Response("DEEPGRAM_API_KEY not configured", { status: 500 });
    const dgParams = new URLSearchParams(url.search);
    dgParams.delete("token");
    const dgUrl = `https://api.deepgram.com/v1/listen?${dgParams.toString()}`;
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    server.accept();
    try {
      const upstreamRes = await fetch(dgUrl, {
        headers: {
          "Authorization": `Token ${apiKey}`,
          "Upgrade": "websocket"
        }
      });
      const dgWs = upstreamRes.webSocket;
      if (!dgWs) {
        logError("STT_PROXY_NO_WS", { status: upstreamRes.status }, env);
        server.close(1011, "Deepgram connection failed");
        return new Response(null, { status: 101, webSocket: client });
      }
      dgWs.accept();
      server.addEventListener("message", (event) => {
        if (dgWs.readyState === 1) {
          try {
            dgWs.send(event.data);
          } catch {
          }
        }
      });
      dgWs.addEventListener("message", (event) => {
        if (server.readyState === 1) {
          try {
            server.send(event.data);
          } catch {
          }
        }
      });
      const cleanup = /* @__PURE__ */ __name(() => {
        try {
          if (dgWs.readyState <= 1) dgWs.close();
        } catch {
        }
        try {
          if (server.readyState <= 1) server.close();
        } catch {
        }
      }, "cleanup");
      server.addEventListener("close", cleanup);
      server.addEventListener("error", cleanup);
      dgWs.addEventListener("close", cleanup);
      dgWs.addEventListener("error", cleanup);
    } catch (err) {
      logError("STT_PROXY_FETCH_FAIL", { error: err.message }, env);
      server.close(1011, "Upstream error");
    }
    return new Response(null, { status: 101, webSocket: client });
  }
  if (path === "/api/deepgram-test") {
    const apiKey = env.DEEPGRAM_API_KEY;
    if (!apiKey) return json({ error: "DEEPGRAM_API_KEY not set" }, 500);
    try {
      const subprotoResp = await fetch("https://agent.deepgram.com/v1/agent/converse", {
        headers: { "Upgrade": "websocket", "Sec-WebSocket-Protocol": `token, ${apiKey}` }
      });
      const respHeaders = {};
      subprotoResp.headers.forEach((v, k) => {
        respHeaders[k] = v;
      });
      const grantEmpty = await fetch("https://api.deepgram.com/v1/auth/grant", {
        method: "POST",
        headers: { "Authorization": `Token ${apiKey}`, "Content-Type": "application/json" },
        body: "{}"
      });
      const grantEmptyBody = await grantEmpty.text();
      return json({
        subproto_status: subprotoResp.status,
        subproto_hasWS: !!subprotoResp.webSocket,
        subproto_echo_header: respHeaders["sec-websocket-protocol"] || respHeaders["Sec-WebSocket-Protocol"] || "NOT_ECHOED",
        grant_empty_status: grantEmpty.status,
        grant_empty_body: grantEmptyBody.slice(0, 300)
      });
    } catch (err) {
      return json({ error: err.message }, 500);
    }
  }
  function assertVoiceBrainLock(settings) {
    const listen = settings?.agent?.listen?.provider;
    const speak = settings?.agent?.speak?.provider;
    const think = settings?.agent?.think?.provider;
    [listen, speak, think].forEach((p, i) => {
      const label = ["listen", "speak", "think"][i];
      if (!p || p.type !== "deepgram" || !p.model) {
        throw new Error(`VOICE_BRAIN_LOCK: ${label}.provider must be { type: "deepgram", model: "<any deepgram model>" }`);
      }
      if (p.endpoint) {
        throw new Error(`VOICE_BRAIN_LOCK: ${label}.provider must NOT have endpoint (external routing = lag)`);
      }
    });
  }
  __name(assertVoiceBrainLock, "assertVoiceBrainLock");
  if (path === "/api/deepgram-token" && method === "GET") {
    const apiKey = env.DEEPGRAM_API_KEY;
    if (!apiKey) return addCors(json({ error: "DEEPGRAM_API_KEY not configured" }, 500), request);
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId) return addCors(json({ error: "studentId query parameter is required" }, 400), request);
    const formatCheck = validateStudentId(studentId);
    if (!formatCheck.valid) return addCors(json({ error: formatCheck.error }, 400), request);
    const rosterCheck = validateActiveStudent(studentId);
    if (!rosterCheck.valid) return addCors(json({ error: "student not authorized", code: "NOT_IN_ROSTER" }, 403), request);
    const sessionMode = (url.searchParams.get("mode") || "free").toLowerCase();
    if (!["free", "study", "phonics"].includes(sessionMode)) return addCors(json({ error: "mode must be one of: free, study, phonics" }, 400), request);
    if (env.NET_PET_KV) {
      try {
        const cbState = await env.NET_PET_KV.get("circuit:deepgram:state");
        if (cbState === "open") {
          return addCors(json({ error: "voice_unavailable", retryAfter: 60 }, 503), request);
        }
      } catch (e) {
      }
    }
    try {
      const promptCacheKey = `prompt_cache:${studentId}:${sessionMode}`;
      let cachedPromptResult = null;
      if (env.NET_PET_KV) {
        try {
          cachedPromptResult = await env.NET_PET_KV.get(promptCacheKey, { cacheTtl: 300 });
          if (cachedPromptResult) {
            const { settings: settings2, phonicsHint: phonicsHint2, lastSessionVocab: lastSessionVocab2, lastSessionTopic, ws_url: ws_url2 } = JSON.parse(cachedPromptResult);
            logInfo("PROMPT_CACHE_HIT", { studentId, sessionMode }, env);
            assertVoiceBrainLock(settings2);
            return addCors(json({ token: apiKey, settings: settings2, phonicsHint: phonicsHint2, lastSessionVocab: lastSessionVocab2, lastSessionTopic, ws_url: ws_url2 }), request);
          }
        } catch (_2) {
        }
      }
      const safeKv = (p) => p.catch(() => null);
      const [rawProfile, rawLang, rawVocab, rawArc, rawMemory, rawPhonics, rawSessionHistory, rawSrsData, rawTranscriptIndex] = await Promise.all([
        safeKv(env.NET_PET_KV.get("student_profile_" + studentId)),
        safeKv(env.NET_PET_KV.get("lang:" + studentId)),
        safeKv(env.NET_PET_KV.get("vocab_list_" + studentId)),
        safeKv(env.NET_PET_KV.get("vocab_arc_" + studentId)),
        env.STUDENT_MEMORY ? safeKv(env.STUDENT_MEMORY.get(`mem:${studentId}`)) : Promise.resolve(null),
        sessionMode === "phonics" ? safeKv(env.NET_PET_KV.get("phonics_progress_" + studentId)) : Promise.resolve(null),
        safeKv(env.NET_PET_KV.get("session_history_" + studentId)),
        safeKv(env.NET_PET_KV.get("srs_data_" + studentId)),
        env.STUDENT_MEMORY ? safeKv(env.STUDENT_MEMORY.get(`transcript_index:${studentId}`)) : Promise.resolve(null)
      ]);
      const phonicsRaw = env.ENCRYPTION_KEY && rawPhonics?.startsWith("v1:") ? await decryptField(rawPhonics.slice(3), env.ENCRYPTION_KEY).catch(() => null) : rawPhonics;
      const sessionHistRaw = env.ENCRYPTION_KEY && rawSessionHistory?.startsWith("v1:") ? await decryptField(rawSessionHistory.slice(3), env.ENCRYPTION_KEY).catch(() => null) : rawSessionHistory;
      const access_token = apiKey;
      let agentProfile = null, agentLang = "en", recentVocab = [], arcData = null, memoryData = null, phonicsData = null;
      try {
        if (rawProfile) agentProfile = normalizeStudentProfile(JSON.parse(rawProfile));
      } catch (_2) {
      }
      if (!agentProfile) agentProfile = { level: "A1", goals: "Practice natural spoken English", primaryBlock: "speaking confidence", name: "Student" };
      if (rawLang) agentLang = rawLang;
      try {
        if (rawVocab) {
          const vl = JSON.parse(rawVocab);
          recentVocab = vl.slice(-5).map((w) => w.word);
        }
      } catch (_2) {
      }
      try {
        if (rawArc) arcData = JSON.parse(rawArc);
      } catch (_2) {
      }
      try {
        if (rawMemory) memoryData = JSON.parse(rawMemory);
      } catch (_2) {
      }
      try {
        if (phonicsRaw) {
          const pp = JSON.parse(phonicsRaw);
          const pgIdx = Math.min(Math.max((pp.current_group || 1) - 1, 0), NET_PHONICS_GROUPS.length - 1);
          const groupDef = NET_PHONICS_GROUPS[pgIdx];
          const drillsInGroup = PHONICS_DRILLS.filter((d) => d.group === groupDef.id);
          const next_drill = drillsInGroup.find((d) => !(pp.drills_completed || []).includes(d.id)) || (drillsInGroup.length > 0 ? drillsInGroup[drillsInGroup.length - 1] : null);
          const pPhTotal = {}, pPhDone = {};
          for (const drill of drillsInGroup) {
            for (const ph of drill.phonemes || []) {
              pPhTotal[ph] = (pPhTotal[ph] || 0) + 1;
              if ((pp.drills_completed || []).includes(drill.id)) pPhDone[ph] = (pPhDone[ph] || 0) + 1;
            }
          }
          const weak_phonemes = Object.keys(pPhTotal).filter((ph) => Math.round((pPhDone[ph] || 0) / pPhTotal[ph] * 100) < 50);
          phonicsData = { ...pp, group_name: groupDef.name, next_drill, weak_phonemes };
        }
      } catch (_2) {
      }
      let lastTranscriptNote = "";
      try {
        if (rawTranscriptIndex) {
          const txRaw = env.ENCRYPTION_KEY && rawTranscriptIndex.startsWith("v1:") ? await decryptField(rawTranscriptIndex.slice(3), env.ENCRYPTION_KEY).catch(() => null) : rawTranscriptIndex;
          if (txRaw) {
            const txIdx = JSON.parse(txRaw);
            if (Array.isArray(txIdx) && txIdx.length > 0) {
              const last = txIdx[txIdx.length - 1];
              const d = last.date ? new Date(last.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
              const txVocab = last.vocab?.length ? ` Words from that session: ${last.vocab.slice(0, 3).join(", ")}.` : "";
              lastTranscriptNote = `LAST SESSION TRANSCRIPT (${d}, ${last.mode || "free"} mode, ${last.turns || 0} turns): Obi opened with: "${(last.headline || "").slice(0, 80)}".${txVocab} Reference this to show the student you remember them.`;
            }
          }
        }
      } catch (_2) {
      }
      let lastSessionNotes = "";
      let lastSessionVocab = [];
      try {
        if (sessionHistRaw) {
          const hist = JSON.parse(sessionHistRaw);
          if (hist.length > 0) {
            const last = hist[hist.length - 1];
            const daysAgo2 = Math.floor((Date.now() - (last.ts || Date.now())) / 864e5);
            const when = daysAgo2 === 0 ? "today" : daysAgo2 === 1 ? "yesterday" : daysAgo2 + " days ago";
            lastSessionVocab = (last.vocab || []).slice(0, 5);
            const vocabStr = lastSessionVocab.length > 0 ? " Vocab practiced: " + lastSessionVocab.map((w) => `"${w}"`).join(", ") + "." : "";
            lastSessionNotes = `LAST SESSION NOTES: Student had a session ${when} (${last.turns || 0} speaking turns).${vocabStr}`;
          }
        }
      } catch (_2) {
      }
      let dueVocab = [];
      try {
        if (rawSrsData) {
          const srsMap = JSON.parse(rawSrsData);
          const now = Date.now();
          dueVocab = Object.values(srsMap).filter((w) => (w.next_review ?? 0) <= now).sort((a, b) => (a.next_review ?? 0) - (b.next_review ?? 0)).slice(0, 5);
        }
      } catch (_2) {
      }
      try {
        if (sessionHistRaw) {
          const hist = JSON.parse(sessionHistRaw);
          if (hist.length > 0 && (!memoryData?.world_model || hist.length !== memoryData?.session_count)) {
            const allVocab = [...new Set(hist.flatMap((s2) => s2.vocab || []))].slice(0, 20);
            const totalSessions = hist.length;
            const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1e3;
            const recentCount = hist.filter((s2) => s2.ts > weekAgo).length;
            const freq = recentCount >= 3 ? "practices regularly" : recentCount >= 1 ? "practices occasionally" : "has been away for a while";
            const totalTurns = hist.reduce((sum, s2) => sum + (s2.turns || 0), 0);
            const avgTurns = Math.round(totalTurns / totalSessions);
            const engagement = avgTurns > 15 ? "chatty and engaged" : avgTurns > 8 ? "moderately talkative" : "still warming up";
            const recentSessions = hist.slice(-5);
            const avgTurnLen = recentSessions.filter((s2) => s2.avg_turn_length > 0).length > 0 ? Math.round(recentSessions.reduce((sum, s2) => sum + (s2.avg_turn_length || 0), 0) / recentSessions.filter((s2) => s2.avg_turn_length > 0).length) : 0;
            const turnLenNote = avgTurnLen > 8 ? "speaks in full sentences" : avgTurnLen > 3 ? "uses short phrases" : avgTurnLen > 0 ? "still building sentence length" : "";
            const world_model = `${totalSessions} sessions. ${freq}. ${engagement} (~${avgTurns} turns/session).${turnLenNote ? ` ${turnLenNote} (~${avgTurnLen} words/turn).` : ""} Vocab covered: ${allVocab.slice(0, 10).join(", ") || "building vocabulary"}.`;
            const vocabSessionCount = {};
            for (const s2 of hist) {
              for (const w of s2.vocab || []) {
                vocabSessionCount[w] = (vocabSessionCount[w] || 0) + 1;
              }
            }
            const persistentWords = Object.entries(vocabSessionCount).filter(([w, count]) => count >= 3 && (!srsData[w] || (srsData[w]?.interval || 1) <= 6)).map(([w]) => w).slice(0, 5);
            const existingStruggles = (memoryData?.struggles || []).filter((s2) => !s2.startsWith("Still building:"));
            const crossSessionStruggles = persistentWords.length > 0 ? [...existingStruggles, `Still building: ${persistentWords.join(", ")}`] : existingStruggles;
            const updatedMem = {
              ...memoryData || {},
              world_model,
              recent_vocab: allVocab,
              session_count: totalSessions,
              last_topic: memoryData?.last_topic || "",
              breakthroughs: memoryData?.breakthroughs || [],
              struggles: crossSessionStruggles.slice(-10),
              synthesized_at: (/* @__PURE__ */ new Date()).toISOString()
            };
            if (env.STUDENT_MEMORY) env.STUDENT_MEMORY.put(`mem:${studentId}`, JSON.stringify(updatedMem)).catch(() => {
            });
            memoryData = updatedMem;
          }
        }
      } catch (_2) {
      }
      const _level = (agentProfile?.level || agentProfile?.englishLevel || "").toLowerCase();
      const ttsSpeed = 1;
      const settings = {
        type: "Settings",
        audio: {
          input: { encoding: "linear16", sample_rate: 48e3 },
          output: { encoding: "linear16", sample_rate: 24e3, container: "none" }
        },
        agent: {
          language: "en",
          greeting: buildGreeting(agentProfile, sessionMode, memoryData?.last_topic || null),
          listen: {
            provider: { type: "deepgram", model: "flux-general-en", version: "v2" }
          },
          think: {
            provider: { type: "deepgram", model: "gemini-3.1-flash-lite" },
            prompt: buildAgentPrompt(agentProfile, agentLang, recentVocab, arcData, sessionMode, memoryData, phonicsData),
            functions: [{
              name: "save_vocabulary_word",
              description: "Save an English word the student successfully used in a sentence.",
              parameters: { type: "object", properties: { word: { type: "string", description: "The English word or phrase" }, meaning_vi: { type: "string", description: "Vietnamese meaning (optional)" } }, required: ["word"] }
            }]
          },
          speak: {
            provider: { type: "deepgram", model: "aura-2-odysseus-en" }
          }
        }
      };
      if (lastSessionNotes) settings.agent.think.prompt += "\n\n" + lastSessionNotes;
      if (lastTranscriptNote) settings.agent.think.prompt += "\n\n" + lastTranscriptNote;
      const vocabDueCtx = buildVocabContext(dueVocab);
      if (vocabDueCtx) settings.agent.think.prompt += "\n\n" + vocabDueCtx;
      const MAX_PROMPT = 24e3;
      const PROMPT_WARN = 2e4;
      if (settings.agent.think.prompt.length > PROMPT_WARN) {
        console.warn(`PROMPT_NEAR_CAP: ${settings.agent.think.prompt.length} chars (cap ${MAX_PROMPT}, Deepgram limit 25000) \u2014 mode=${sessionMode} student=${studentId}`);
      }
      if (settings.agent.think.prompt.length > MAX_PROMPT) {
        settings.agent.think.prompt = settings.agent.think.prompt.slice(0, MAX_PROMPT) + "\n[context trimmed]";
      }
      const phonicsHint = sessionMode === "phonics" ? {
        group_name: phonicsData?.group_name || "SATNIP",
        next_sentence: phonicsData?.next_drill?.sentence || "She sat next to me at the station.",
        drill_count: phonicsData?.drills_completed?.length || phonicsData?.drill_count || phonicsData?.session_count_phonics || 0
      } : null;
      const ws_url = agentLang === "vi" ? "wss://agent.deepgram.com/v1/agent/converse?region=syd" : null;
      assertVoiceBrainLock(settings);
      if (env.NET_PET_KV && !cachedPromptResult) {
        const cachePayload = { settings, phonicsHint, lastSessionVocab, lastSessionTopic: memoryData?.last_topic || null, ws_url };
        env.NET_PET_KV.put(promptCacheKey, JSON.stringify(cachePayload), { expirationTtl: 300 }).catch(() => {
        });
      }
      return addCors(json({ token: access_token, settings, phonicsHint, lastSessionVocab, lastSessionTopic: memoryData?.last_topic || null, ws_url }), request);
    } catch (err) {
      logError("TOKEN_ENDPOINT_ERROR", {
        studentId,
        sessionMode,
        message: err?.message || String(err),
        stack: (err?.stack || "").split("\n").slice(0, 3).join(" | ")
      }, env);
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/agent/vocab" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    const { studentId, word, meaning_vi } = body;
    if (!studentId || !word) return addCors(json({ error: "studentId and word required" }, 400), request);
    const _vocabIdCheck = validateStudentId(studentId);
    if (!_vocabIdCheck.valid) return addCors(json({ error: _vocabIdCheck.error }, 400), request);
    const _vocabRosterCheck = validateActiveStudent(studentId);
    if (!_vocabRosterCheck.valid) return addCors(json({ error: "student not authorized", code: "NOT_IN_ROSTER" }, 403), request);
    const result = await seedVocab(studentId, word, meaning_vi, "obi_chat", env, 4);
    return addCors(json(result.ok ? { saved: true, word } : { error: "empty word" }, result.ok ? 200 : 400), request);
  }
  if (path === "/api/agent/session" && method === "GET") {
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const _sessGetIdCheck = validateStudentId(studentId);
    if (!_sessGetIdCheck.valid) return addCors(json({ error: _sessGetIdCheck.error }, 400), request);
    const _sessGetRosterCheck = validateActiveStudent(studentId);
    if (!_sessGetRosterCheck.valid) return addCors(json({ error: "student not authorized", code: "NOT_IN_ROSTER" }, 403), request);
    try {
      let history = [];
      try {
        history = await kvDecryptGet(env.NET_PET_KV, `session_history_${studentId}`, env.ENCRYPTION_KEY) ?? [];
      } catch (e) {
      }
      return addCors(json({ sessions: history, count: history.length }), request);
    } catch (err) {
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/agent/session" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    const { studentId, turns, durationMs, vocab } = body;
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const _sessPostIdCheck = validateStudentId(studentId);
    if (!_sessPostIdCheck.valid) return addCors(json({ error: _sessPostIdCheck.error }, 400), request);
    const _sessPostRosterCheck = validateActiveStudent(studentId);
    if (!_sessPostRosterCheck.valid) return addCors(json({ error: "student not authorized", code: "NOT_IN_ROSTER" }, 403), request);
    try {
      const topic = body.topic || null;
      const avg_turn_length = body.avg_turn_length || 0;
      const barge_in_count = body.barge_in_count || 0;
      const [history, rawMem] = await Promise.all([
        kvDecryptGet(env.NET_PET_KV, `session_history_${studentId}`, env.ENCRYPTION_KEY).then((v) => v ?? []),
        env.STUDENT_MEMORY ? env.STUDENT_MEMORY.get(`mem:${studentId}`) : Promise.resolve(null)
      ]);
      history.push({ ts: Date.now(), turns: turns || 0, durationMs: durationMs || 0, vocab: vocab || [], topic: topic || null, avg_turn_length, barge_in_count });
      if (env.STUDENT_MEMORY) {
        try {
          const mem = rawMem ? JSON.parse(rawMem) : {};
          const breakthroughs = (mem.breakthroughs || []).slice(-10);
          const struggles = (mem.struggles || []).slice(-10);
          const vocabArr = vocab || [];
          const turnCount = turns || 0;
          if (vocabArr.length >= 2) {
            breakthroughs.push(`Used ${vocabArr.length} new words: ${vocabArr.slice(0, 3).join(", ")}`);
          }
          if (turnCount >= 20) {
            breakthroughs.push(`Highly engaged session (${turnCount} turns)`);
          }
          if (vocabArr.length === 0 && turnCount > 0) {
            struggles.push(`Session with no new vocabulary (${turnCount} turns)`);
          }
          if (turnCount > 0 && turnCount < 5) {
            struggles.push(`Short session \u2014 only ${turnCount} turns`);
          }
          const updatedMem = { ...mem, breakthroughs, struggles, last_session_ts: Date.now(), ...topic ? { last_topic: topic } : {} };
          env.STUDENT_MEMORY.put(`mem:${studentId}`, JSON.stringify(updatedMem)).catch(() => {
          });
          for (const b of breakthroughs) {
            depositFromBreakthrough(env, b, 2).catch(() => {
            });
          }
        } catch (_2) {
        }
      }
      await kvEncryptPut(env.NET_PET_KV, `session_history_${studentId}`, history.slice(-20), env.ENCRYPTION_KEY);
      return addCors(json({ ok: true, sessions: history.length }), request);
    } catch (err) {
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/stt/key" && method === "GET") {
    if (!globalThis.__DG_KEY) globalThis.__DG_KEY = env.DEEPGRAM_API_KEY;
    return addCors(json({ key: globalThis.__DG_KEY || "" }), request);
  }
  if (path === "/api/stt" && method === "POST") {
    if (!globalThis.__DG_KEY) globalThis.__DG_KEY = env.DEEPGRAM_API_KEY;
    const apiKey = globalThis.__DG_KEY;
    if (!apiKey) return json({ error: "DEEPGRAM_API_KEY not configured" }, 500);
    const contentType = request.headers.get("content-type") || "audio/webm";
    const diarize = url.searchParams.get("diarize") === "true";
    const audioBuffer = await request.arrayBuffer();
    if (!audioBuffer.byteLength) return json({ error: "No audio received" }, 400);
    try {
      const dgParams = `model=nova-3&punctuate=true&smart_format=true&utterances=true${diarize ? "&diarize=true" : ""}`;
      const dgRes = await fetch(
        `https://api.deepgram.com/v1/listen?${dgParams}`,
        {
          method: "POST",
          headers: { "Authorization": `Token ${apiKey}`, "Content-Type": contentType },
          body: audioBuffer
        }
      );
      if (!dgRes.ok) return json({ error: `Deepgram STT ${dgRes.status}` }, 502);
      const data = await dgRes.json();
      const alt = data?.results?.channels?.[0]?.alternatives?.[0];
      if (!alt) return json({ error: "No transcript returned" }, 422);
      const response = {
        transcript: alt.transcript || "",
        words: (alt.words || []).map((w) => ({ word: w.word, confidence: w.confidence, start: w.start, end: w.end, speaker: w.speaker ?? null })),
        duration: data?.metadata?.duration || 0
      };
      if (diarize) {
        response.utterances = (data?.results?.utterances || []).map((u) => ({
          speaker: u.speaker,
          transcript: u.transcript,
          start: u.start,
          end: u.end,
          confidence: u.confidence
        }));
      }
      return addCors(json(response), request);
    } catch (err) {
      return json({ error: err.message }, 500);
    }
  }
  if (path === "/api/phonics/curriculum" && method === "GET") {
    const group = url.searchParams.get("group");
    try {
      const drills = group ? PHONICS_DRILLS.filter((d) => d.group === group) : PHONICS_DRILLS;
      const groups = [...new Set(PHONICS_DRILLS.map((d) => d.group))];
      return addCors(json({ drills, groups, total: drills.length }), request);
    } catch (err) {
      logError("PHONICS_CURRICULUM_FAIL", { error: err.message }, env);
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/phonics/progress" && method === "GET") {
    try {
      const studentId = url.searchParams.get("studentId");
      if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
      const idCheck = validateStudentId(studentId);
      if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
      const key = "phonics_progress_" + studentId;
      let progress = await kvDecryptGet(env.NET_PET_KV, key, env.ENCRYPTION_KEY);
      if (!progress) {
        progress = { current_group: 1, drills_completed: [], dominant_errors: [], groups_unlocked: [1, 0, 0, 0, 0, 0, 0], last_drill_id: null, session_count_phonics: 0 };
      }
      const gIdx = Math.min(Math.max((progress.current_group || 1) - 1, 0), NET_PHONICS_GROUPS.length - 1);
      const group_name = NET_PHONICS_GROUPS[gIdx].name;
      const drillsInGroup = PHONICS_DRILLS.filter((d) => d.group === NET_PHONICS_GROUPS[gIdx].id);
      const next_drill = drillsInGroup.find((d) => !progress.drills_completed.includes(d.id)) || (drillsInGroup.length > 0 ? drillsInGroup[drillsInGroup.length - 1] : null);
      const completion_pct = drillsInGroup.length > 0 ? Math.round(drillsInGroup.filter((d) => progress.drills_completed.includes(d.id)).length / drillsInGroup.length * 100) : 0;
      const phonemeTotal = {}, phonemeDone = {};
      for (const drill of drillsInGroup) {
        for (const ph of drill.phonemes || []) {
          phonemeTotal[ph] = (phonemeTotal[ph] || 0) + 1;
          if (progress.drills_completed.includes(drill.id)) phonemeDone[ph] = (phonemeDone[ph] || 0) + 1;
        }
      }
      const phoneme_mastery = {};
      for (const ph of Object.keys(phonemeTotal)) {
        phoneme_mastery[ph] = Math.round((phonemeDone[ph] || 0) / phonemeTotal[ph] * 100);
      }
      const weak_phonemes = Object.entries(phoneme_mastery).filter(([, v]) => v < 50).map(([k]) => k);
      return addCors(json({ ...progress, group_name, next_drill, completion_pct, phoneme_mastery, weak_phonemes }), request);
    } catch (err) {
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/phonics/progress" && method === "POST") {
    try {
      const { studentId, drill_id, error_type } = await request.json();
      if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
      const idCheck = validateStudentId(studentId);
      if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
      const key = "phonics_progress_" + studentId;
      let progress = await kvDecryptGet(env.NET_PET_KV, key, env.ENCRYPTION_KEY) || { current_group: 1, drills_completed: [], dominant_errors: [], groups_unlocked: [1, 0, 0, 0, 0, 0, 0], last_drill_id: null, session_count_phonics: 0, created_at: (/* @__PURE__ */ new Date()).toISOString() };
      if (drill_id) progress.drills_completed = Array.from(/* @__PURE__ */ new Set([...progress.drills_completed, drill_id]));
      if (error_type) progress.dominant_errors = Array.from(/* @__PURE__ */ new Set([error_type, ...progress.dominant_errors])).slice(0, 3);
      if (drill_id) progress.last_drill_id = drill_id;
      progress.drill_count = (progress.drill_count || 0) + 1;
      progress.updated_at = (/* @__PURE__ */ new Date()).toISOString();
      await kvEncryptPut(env.NET_PET_KV, key, progress, env.ENCRYPTION_KEY);
      const gIdx2 = Math.min(Math.max((progress.current_group || 1) - 1, 0), NET_PHONICS_GROUPS.length - 1);
      const group_name = NET_PHONICS_GROUPS[gIdx2].name;
      const drillsInGroup = PHONICS_DRILLS.filter((d) => d.group === NET_PHONICS_GROUPS[gIdx2].id);
      const next_drill = drillsInGroup.find((d) => !progress.drills_completed.includes(d.id)) || (drillsInGroup.length > 0 ? drillsInGroup[drillsInGroup.length - 1] : null);
      const completion_pct = drillsInGroup.length > 0 ? Math.round(drillsInGroup.filter((d) => progress.drills_completed.includes(d.id)).length / drillsInGroup.length * 100) : 0;
      return addCors(json({ ...progress, group_name, next_drill, completion_pct }), request);
    } catch (err) {
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/phonics/advance" && method === "POST") {
    try {
      const { studentId } = await request.json();
      if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
      const idCheck = validateStudentId(studentId);
      if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
      const key = "phonics_progress_" + studentId;
      let progress = await kvDecryptGet(env.NET_PET_KV, key, env.ENCRYPTION_KEY) || { current_group: 1, drills_completed: [], dominant_errors: [], groups_unlocked: [1, 0, 0, 0, 0, 0, 0], last_drill_id: null, session_count_phonics: 0, created_at: (/* @__PURE__ */ new Date()).toISOString() };
      if (progress.current_group === 7) {
        return addCors(json({ advanced: false, message: "All groups complete" }), request);
      }
      const advGIdx = Math.min(Math.max((progress.current_group || 1) - 1, 0), NET_PHONICS_GROUPS.length - 1);
      const drillsInCurrentGroup = PHONICS_DRILLS.filter((d) => d.group === NET_PHONICS_GROUPS[advGIdx].id);
      const completedCount = drillsInCurrentGroup.filter((d) => progress.drills_completed.includes(d.id)).length;
      const advanceThreshold = Math.max(drillsInCurrentGroup.length - 1, 1);
      if (completedCount >= advanceThreshold) {
        progress.current_group++;
        if (progress.groups_unlocked) progress.groups_unlocked[progress.current_group - 1] = 1;
        progress.updated_at = (/* @__PURE__ */ new Date()).toISOString();
        await kvEncryptPut(env.NET_PET_KV, key, progress, env.ENCRYPTION_KEY);
        const newGIdx = Math.min(progress.current_group - 1, NET_PHONICS_GROUPS.length - 1);
        const new_group_name = NET_PHONICS_GROUPS[newGIdx].name;
        return addCors(json({ advanced: true, new_group: progress.current_group, new_group_name }), request);
      }
      return addCors(json({ advanced: false, drills_remaining: 4 - completedCount }), request);
    } catch (err) {
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/vocab/add" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    const { studentId, word, meaning_vi } = body;
    if (!studentId || !word) return addCors(json({ error: "studentId and word required" }, 400), request);
    const idCheck = validateStudentId(studentId);
    if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
    const rosterCheck = validateActiveStudent(studentId);
    if (!rosterCheck.valid) return addCors(json({ error: "student not authorized", code: "NOT_IN_ROSTER" }, 403), request);
    const result = await seedVocab(studentId, word, meaning_vi, "manual", env);
    return addCors(json(result.ok ? { added: true, word } : { error: "empty word" }, result.ok ? 200 : 400), request);
  }
  if (path === "/api/vocab/due" && method === "GET") {
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId || studentId.startsWith("sov100-test-")) return addCors(json({ due: [], count: 0 }), request);
    const idCheck = validateStudentId(studentId);
    if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
    try {
      const [srsRaw, listRaw] = await Promise.all([
        env.NET_PET_KV.get(`srs_data_${studentId}`),
        env.NET_PET_KV.get(`vocab_list_${studentId}`)
      ]);
      if (!srsRaw) return addCors(json({ due: [], count: 0 }), request);
      const srsMap = JSON.parse(srsRaw);
      const meanings = {};
      if (listRaw) for (const w of JSON.parse(listRaw)) meanings[w.word] = w.meaning_vi || "";
      const now = Date.now();
      const due = Object.values(srsMap).filter((w) => (w.next_review ?? 0) <= now).sort((a, b) => (a.next_review ?? 0) - (b.next_review ?? 0)).map((w) => ({ word: w.word, translation: w.translation || meanings[w.word] || "", source: w.source }));
      return addCors(json({ due, count: due.length }), request);
    } catch (err) {
      logWarn("VOCAB_DUE_KV_FAIL", { studentId, error: err.message }, env);
      return addCors(json({ due: [], count: 0 }), request);
    }
  }
  if (path === "/api/vocab/review" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    const { studentId, word, grade } = body;
    if (!studentId || !word || grade == null) return addCors(json({ error: "studentId, word, grade required" }, 400), request);
    const idCheck = validateStudentId(studentId);
    if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
    const rosterCheck = validateActiveStudent(studentId);
    if (!rosterCheck.valid) return addCors(json({ error: "student not authorized", code: "NOT_IN_ROSTER" }, 403), request);
    const result = await seedVocab(studentId, word, "", "manual", env, grade);
    return addCors(json(result.ok ? { reviewed: true, next_review: result.next_review } : { error: "empty word" }, result.ok ? 200 : 400), request);
  }
  if (path === "/api/vocab/list" && method === "GET") {
    return handleVocabList(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/voice/score" && method === "POST") {
    const body = await request.json();
    return handleVoiceScore(body, env);
  }
  if ((path === "/api/onboarding" || path === "/api/student/onboard") && method === "POST") {
    const body = await request.json();
    return handleOnboarding(body, env);
  }
  if (path === "/api/memory" && method === "POST") {
    const body = await request.json();
    return handleMemorySave(body, env, request);
  }
  if (path === "/api/memory" && method === "GET") {
    return handleMemoryGet(url.searchParams.get("studentId") || "", env, request);
  }
  if (path.startsWith("/api/memory/") && method === "GET" && !path.includes("/summary")) {
    const studentId = path.split("/api/memory/")[1]?.split("?")[0];
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const idCheck = validateStudentId(studentId);
    if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
    try {
      const raw2 = env.STUDENT_MEMORY ? await env.STUDENT_MEMORY.get(`mem:${studentId}`) : null;
      const mem = raw2 ? JSON.parse(raw2) : { world_model: "", recent_vocab: [], session_count: 0, last_topic: "", breakthroughs: [], struggles: [] };
      return addCors(json(mem), request);
    } catch (err) {
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path.startsWith("/api/memory/") && method === "POST" && !path.includes("/summary")) {
    const studentId = path.split("/api/memory/")[1]?.split("?")[0];
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const idCheck = validateStudentId(studentId);
    if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
    try {
      const body = await request.json().catch(() => ({}));
      const raw2 = env.STUDENT_MEMORY ? await env.STUDENT_MEMORY.get(`mem:${studentId}`) : null;
      const existing = raw2 ? JSON.parse(raw2) : { world_model: "", recent_vocab: [], session_count: 0, last_topic: "", breakthroughs: [], struggles: [] };
      if (body.world_model_update) existing.world_model = body.world_model_update;
      if (body.new_vocab && Array.isArray(body.new_vocab)) {
        existing.recent_vocab = [.../* @__PURE__ */ new Set([...existing.recent_vocab, ...body.new_vocab])].slice(-20);
      }
      if (body.session_summary) existing.last_topic = body.session_summary;
      if (body.breakthrough) existing.breakthroughs = [body.breakthrough, ...existing.breakthroughs || []].slice(0, 10);
      if (body.struggle) existing.struggles = [body.struggle, ...existing.struggles || []].slice(0, 10);
      existing.session_count = (existing.session_count || 0) + 1;
      existing.updated_at = (/* @__PURE__ */ new Date()).toISOString();
      const serialized = JSON.stringify(existing);
      if (serialized.length > 10240) {
        existing.recent_vocab = existing.recent_vocab.slice(-10);
        existing.breakthroughs = (existing.breakthroughs || []).slice(0, 5);
        existing.struggles = (existing.struggles || []).slice(0, 5);
      }
      if (env.STUDENT_MEMORY) {
        await env.STUDENT_MEMORY.put(`mem:${studentId}`, JSON.stringify(existing));
      }
      return addCors(json({ ok: true, session_count: existing.session_count }), request);
    } catch (err) {
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/progress" && method === "GET") {
    return handleProgress(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/daily" && method === "GET") {
    return handleDailyTask(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/memory/summary" && method === "GET") {
    return handleMemorySummary(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/lesson" && method === "POST") {
    const body = await request.json();
    return handleLesson(body, env);
  }
  if (path === "/api/practice" && method === "POST") {
    const body = await request.json();
    return handlePractice(body, env);
  }
  if (path === "/api/feedback" && method === "POST") {
    const body = await request.json();
    return handleFeedback(body, env);
  }
  if (path === "/api/netpet/checkin" && method === "POST") {
    const body = await request.json();
    return handlePetCheckin(body, env);
  }
  if (path === "/api/netpet/state" && method === "GET") {
    return handlePetState(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/netpet/score" && method === "GET") {
    return handlePetScore(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/drills/next" && method === "GET") {
    return handleDrillNext(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/drills/result" && method === "POST") {
    const body = await request.json();
    return handleDrillResult(body, env);
  }
  if (path === "/api/drills/list" && method === "GET") {
    return handleDrillList();
  }
  if (path === "/api/metrics/summary" && method === "GET") {
    return handleMetricsSummary(env);
  }
  if (path === "/api/metrics/dau" && method === "GET") {
    return handleMetricsDAU(env);
  }
  if (path === "/api/metrics/retention" && method === "GET") {
    return handleMetricsRetention(env);
  }
  if (path === "/api/metrics/errors" && method === "GET") {
    return handleMetricsErrors(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/classroom/session/start" && method === "POST") {
    const body = await request.json();
    return handleClassStart(body, env);
  }
  if (path === "/api/classroom/event" && method === "POST") {
    const body = await request.json();
    return handleClassEvent(body, env);
  }
  if (path === "/api/classroom/session" && method === "GET") {
    return handleClassSession(url.searchParams.get("classId") || "", parseInt(url.searchParams.get("totalStudents") || "40"), env);
  }
  if (path === "/api/classroom/report" && method === "GET") {
    return handleClassReport(url.searchParams.get("classId") || "", parseInt(url.searchParams.get("totalStudents") || "40"), env);
  }
  if (path === "/api/ledger/append" && method === "POST") {
    const body = await request.json();
    return handleLedgerAppend(body, env);
  }
  if (path === "/api/ledger/history" && method === "GET") {
    return handleLedgerHistory(url.searchParams.get("studentId") || "", parseInt(url.searchParams.get("limit") || "50"), env);
  }
  if (path === "/api/ledger/verify" && method === "GET") {
    return handleLedgerVerify(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/ledger/state" && method === "GET") {
    return handleLedgerState(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/ledger/stats" && method === "GET") {
    return handleLedgerStats(env);
  }
  if (path === "/api/session/log" && method === "POST") {
    const body = await request.json();
    return handleSessionLog(body, env);
  }
  if (path === "/api/session/latest" && method === "GET") {
    return handleSessionLatest(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/schedule/set" && method === "POST") {
    const body = await request.json();
    return handleScheduleSet(body, env);
  }
  if (path === "/api/schedule/confirm" && method === "POST") {
    const body = await request.json();
    return handleScheduleConfirm(body, env);
  }
  if (path === "/api/schedule/flags" && method === "GET") {
    return handleScheduleFlags(env);
  }
  if (path === "/api/zalo/sweep" && method === "POST") {
    return handleZaloSweep(env);
  }
  if (path === "/api/zalo/check" && method === "POST") {
    const body = await request.json();
    return handleZaloCheck(body, env);
  }
  if (path === "/api/zalo/send" && method === "POST") {
    const body = await request.json();
    return handleZaloSend(body, env);
  }
  if (path === "/api/pressure/status" && method === "GET") {
    return handlePressureStatus(env);
  }
  if (path === "/api/pressure/test" && method === "POST") {
    const body = await request.json();
    return handlePressureTest(body, env);
  }
  if (path === "/api/relations/add" && method === "POST") {
    const body = await request.json();
    return handleRelationAdd(body, env);
  }
  if (path === "/api/relations/remove" && method === "POST") {
    const body = await request.json();
    return handleRelationRemove(body, env);
  }
  if (path === "/api/relations/get" && method === "GET") {
    return handleRelationGet(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/relations/all" && method === "GET") {
    return handleRelationAll(env);
  }
  if (path === "/api/roster/zalo" && method === "POST") {
    const body = await request.json();
    return handleRosterZalo(body, env);
  }
  if (path === "/api/digest" && method === "GET") {
    return handleDailyDigest(env);
  }
  if (path === "/api/soulDNA" && method === "POST") {
    const body = await request.json();
    return handleSoulDNACapture(body, env);
  }
  if (path === "/api/soulDNA" && method === "GET") {
    return handleSoulDNAGet(url, env);
  }
  if (path === "/api/command/send" && method === "POST") {
    const body = await request.json();
    return handleCommandSend(body, env);
  }
  if (path === "/api/command/queue" && method === "GET") {
    return handleCommandQueue(url.searchParams.get("status") || "pending", parseInt(url.searchParams.get("limit") || "20"), env);
  }
  if (path === "/api/command/claim" && method === "POST") {
    const body = await request.json();
    return handleCommandClaim(body, env);
  }
  if (path === "/api/command/complete" && method === "POST") {
    const body = await request.json();
    return handleCommandComplete(body, env);
  }
  if (path === "/api/command/status" && method === "GET") {
    return handleCommandStatus(url.searchParams.get("commandId") || "", env);
  }
  if (path === "/api/command/history" && method === "GET") {
    return handleCommandHistory(parseInt(url.searchParams.get("limit") || "50"), env);
  }
  if (path.startsWith("/api/notion/")) {
    return json({ blacklisted: true, notion: "BLACKLISTED \u2014 platform usage permanently disabled" }, 403);
  }
  if (path === "/api/loop" && method === "POST") {
    const body = await request.json();
    return handleLoop(body, env);
  }
  if (path === "/api/tiger-score" && method === "GET") {
    return handleTigerScore(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/analytics" && method === "GET") {
    return handleAnalytics(env);
  }
  if (path === "/api/student/checkpw" && method === "POST") {
    const { studentId, pw } = await request.json();
    if (!studentId || !pw) return addCors(json({ error: "studentId and pw required" }, 400), request);
    const [hash, defaultHash, stored] = await Promise.all([
      computeHash2(pw),
      computeHash2("bluetech2026"),
      env.NET_PET_KV.get(`student_pw_${studentId}`)
    ]);
    if (stored) return addCors(json({ ok: hash === stored, isDefault: false }), request);
    const isDefault = hash === defaultHash;
    return addCors(json({ ok: isDefault, isDefault }), request);
  }
  if (path === "/api/student/setpw" && method === "POST") {
    const { studentId, currentPw, newPw } = await request.json();
    if (!studentId || !currentPw || !newPw) return addCors(json({ error: "studentId, currentPw, newPw required" }, 400), request);
    if (newPw.length < 6) return addCors(json({ ok: false, error: "Password must be at least 6 characters" }, 400), request);
    const [currentHash, defaultHash, stored] = await Promise.all([
      computeHash2(currentPw),
      computeHash2("bluetech2026"),
      env.NET_PET_KV.get(`student_pw_${studentId}`)
    ]);
    const validCurrent = stored ? currentHash === stored : currentHash === defaultHash;
    if (!validCurrent) return addCors(json({ ok: false, error: "Current password incorrect" }, 403), request);
    const newHash = await computeHash2(newPw);
    await env.NET_PET_KV.put(`student_pw_${studentId}`, newHash);
    return addCors(json({ ok: true }), request);
  }
  if (path === "/api/parent/checkpin" && method === "POST") {
    let pin;
    try {
      const body = await request.json();
      pin = body.pin;
    } catch {
      return addCors(json({ error: "invalid json" }, 400), request);
    }
    if (!pin) return addCors(json({ error: "pin required" }, 400), request);
    const studentId = url.searchParams.get("studentId") || "";
    const prefix = taskPrefix(studentId);
    const ok = await validateParentPin(pin, env, prefix);
    return addCors(json({ ok }), request);
  }
  if (path === "/api/admin/parent/setpin" && method === "POST") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    const { pin, studentId } = await request.json();
    if (!pin || String(pin).length < 4) return addCors(json({ error: "pin must be at least 4 characters" }, 400), request);
    const prefix = taskPrefix(studentId);
    const result = await setParentPin(pin, env, prefix);
    return addCors(json(result), request);
  }
  if (path === "/api/teacher/checkpin" && method === "POST") {
    let pin;
    try {
      const body = await request.json();
      pin = body.pin;
    } catch {
      return addCors(json({ error: "invalid json" }, 400), request);
    }
    if (!pin) return addCors(json({ error: "pin required" }, 400), request);
    const studentId = url.searchParams.get("studentId") || "";
    const prefix = taskPrefix(studentId);
    const ok = await validateTeacherPin(pin, env, prefix);
    return addCors(json({ ok }), request);
  }
  if (path === "/api/admin/teacher/setpin" && method === "POST") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    const { pin, studentId } = await request.json();
    if (!pin || String(pin).length < 4) return addCors(json({ error: "pin must be at least 4 characters" }, 400), request);
    const prefix = taskPrefix(studentId);
    const result = await setTeacherPin(pin, env, prefix);
    return addCors(json(result), request);
  }
  if (path === "/api/admin/student/setpin" && method === "POST") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    const { pin, studentId } = await request.json();
    if (!pin || String(pin).length < 4) return addCors(json({ error: "pin must be at least 4 characters" }, 400), request);
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const prefix = taskPrefix(studentId);
    const result = await setStudentPin(studentId, pin, env, prefix);
    return addCors(json(result), request);
  }
  if (path === "/api/student/checkpin" && method === "POST") {
    const { studentId, pin, groupCode } = await request.json();
    if (!pin) return addCors(json({ error: "pin required" }, 400), request);
    if (!studentId && !groupCode) return addCors(json({ error: "studentId or groupCode required" }, 400), request);
    const cleanStudentId = studentId ? String(studentId).toLowerCase().trim() : "";
    const cleanGroupCode = groupCode ? String(groupCode).toUpperCase().replace(/[^A-Z0-9_]/g, "") : "";
    const idCheck = cleanStudentId ? validateStudentId(cleanStudentId) : { valid: true };
    if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
    const pinHash = await computeHash2(pin);
    let matchedStudentId = cleanStudentId;
    let isGroup = false;
    if (cleanStudentId) {
      const stored = await env.NET_PET_KV.get(`student_pin_${cleanStudentId}`);
      if (stored && pinHash === stored) {
        return addCors(json({ ok: true, studentId: cleanStudentId, isGroup: false }), request);
      }
      if (!stored && env.SOUL_DB) {
        try {
          const row = await env.SOUL_DB.prepare("SELECT value FROM nguyen_settings WHERE key = ?").bind(`student_pin_${cleanStudentId}`).first();
          if (row && row.value && row.value === pinHash) {
            return addCors(json({ ok: true, studentId: cleanStudentId, isGroup: false }), request);
          }
        } catch {
        }
      }
    }
    if (cleanGroupCode) {
      const groupPin = await env.NET_PET_KV.get(`group_pin_${cleanGroupCode}`);
      if (groupPin && pinHash === groupPin) {
        matchedStudentId = cleanStudentId || "";
        isGroup = true;
        return addCors(json({ ok: true, studentId: matchedStudentId, isGroup: true, groupCode: cleanGroupCode }), request);
      }
    }
    return addCors(json({ ok: false, error: "Invalid PIN" }, 401), request);
  }
  if (path === "/api/admin/student/delete" && method === "DELETE") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return addCors(adminBlock, request);
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const idCheck = validateStudentId(studentId);
    if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
    const kvKeys = [
      `student_profile_${studentId}`,
      `lang:${studentId}`,
      `vocab_list_${studentId}`,
      `vocab_arc_${studentId}`,
      `session_history_${studentId}`,
      `phonics_progress_${studentId}`,
      `student_pw_${studentId}`,
      `streak:${studentId}`,
      `goals:${studentId}`,
      `subscription:${studentId}`,
      `srs_data_${studentId}`
    ];
    let kvDeleted = 0;
    for (const k of kvKeys) {
      try {
        await env.NET_PET_KV.delete(k);
        kvDeleted++;
      } catch (_2) {
      }
    }
    let d1Deleted = 0;
    try {
      const r = await env.SOUL_DB.prepare(`DELETE FROM soul_prompts WHERE session_id LIKE ?`).bind(`${studentId}%`).run();
      d1Deleted = r.meta?.changes ?? 0;
    } catch (_2) {
    }
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    await logAudit(env, { action: "student_delete", actor: "admin", target: studentId, ip, meta: { kvDeleted, d1Deleted } });
    return addCors(json({ deleted: true, studentId, kvDeleted, d1Deleted }), request);
  }
  if (path === "/api/student/state" && method === "GET") {
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
    const idCheck = validateStudentId(studentId);
    if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
    let profile = null;
    try {
      const raw2 = await env.NET_PET_KV.get(`student_profile_${studentId}`);
      if (raw2) profile = normalizeStudentProfile(JSON.parse(raw2));
    } catch (_2) {
    }
    let streak = { currentStreak: 0, longestStreak: 0 };
    try {
      const streakRaw = await env.NET_PET_KV.get(`streak:${studentId}`);
      if (streakRaw) streak = JSON.parse(streakRaw);
    } catch (_2) {
    }
    let lang = "en";
    try {
      const langVal = await env.NET_PET_KV.get(`lang:${studentId}`);
      if (langVal) lang = langVal;
    } catch (_2) {
    }
    let homeworkNotes = "", sessions = 0;
    try {
      const [hwRaw, histRaw] = await Promise.all([
        env.NET_PET_KV.get(`student:${studentId}:homework_notes`),
        env.NET_PET_KV.get(`session_history_${studentId}`)
      ]);
      if (hwRaw) homeworkNotes = hwRaw;
      if (histRaw) {
        const h = JSON.parse(histRaw);
        sessions = Array.isArray(h) ? h.length : 0;
      }
    } catch (_2) {
    }
    return addCors(json({
      ok: true,
      studentId,
      profile: profile || null,
      streak,
      lang,
      homework_notes: homeworkNotes,
      sessions,
      source: profile ? "kv" : "empty"
    }), request);
  }
  if (path === "/api/student/state" && method === "PATCH") {
    try {
      const body = await request.json();
      const studentId = body.studentId || "";
      if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
      const idCheck = validateStudentId(studentId);
      if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
      if (body.homework_notes !== void 0) {
        await env.NET_PET_KV.put(`student:${studentId}:homework_notes`, String(body.homework_notes).slice(0, 5e3));
      }
      const patch = body.patch || {};
      if (Object.keys(patch).length === 0) {
        if (body.homework_notes === void 0) return addCors(json({ error: "patch or homework_notes required" }, 400), request);
        return addCors(json({ ok: true, studentId }), request);
      }
      let profile = {};
      try {
        const raw2 = await env.NET_PET_KV.get(`student_profile_${studentId}`);
        if (raw2) profile = normalizeStudentProfile(JSON.parse(raw2));
      } catch (_2) {
      }
      for (const [key, val] of Object.entries(patch)) {
        profile[key] = val;
      }
      profile = normalizeStudentProfile(profile);
      await env.NET_PET_KV.put(`student_profile_${studentId}`, JSON.stringify(profile));
      return addCors(json({ ok: true, studentId }), request);
    } catch (err) {
      return addCors(json({ error: err.message }, 500), request);
    }
  }
  if (path === "/api/session/events" && method === "GET") {
    const studentId = url.searchParams.get("studentId") || "";
    if (!studentId) return json({ error: "studentId required" }, 400);
    const idCheck = validateStudentId(studentId);
    if (!idCheck.valid) return json({ error: idCheck.error }, 400);
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const stub = env.SESSIONS.get(env.SESSIONS.idFromName(`events-${studentId}`));
    const res = await stub.fetch(new Request(`https://do/events/recent?limit=${limit}`));
    return res;
  }
  if (path === "/api/route" && method === "POST") {
    const body = await request.json();
    return handleRoute(body, env);
  }
  if (path === "/api/phoenix/snapshot" && method === "POST") {
    const body = await request.json();
    return handlePhoenixSnapshot(body, env);
  }
  if (path === "/api/phoenix/reset" && method === "POST") {
    const body = await request.json();
    return handlePhoenixReset(body, env);
  }
  if (path === "/api/assess" && method === "POST") {
    const body = await request.json();
    return handleAssessment(body, env);
  }
  if (path === "/api/report" && method === "GET") {
    return handleReport(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/report" && method === "POST") {
    const body = await request.json();
    return handleReportPost(body, env);
  }
  if (path === "/api/student/lang" && method === "GET") {
    return handleStudentLang(url.searchParams.get("studentId") || "", null, env);
  }
  if (path === "/api/student/lang" && method === "POST") {
    const body = await request.json();
    return handleStudentLang(body.studentId || "", body.lang || "", env);
  }
  if (path === "/api/lead" && method === "POST") {
    const body = await request.json();
    return handleLeadCapture(body, env);
  }
  if (path === "/api/growth/posts" && method === "GET") {
    return handleGrowthPosts(parseInt(url.searchParams.get("limit") || "5"), env);
  }
  if (path === "/api/growth/distribute" && method === "POST") {
    return handleGrowthDistribute(env);
  }
  if (path === "/api/growth/log" && method === "GET") {
    return handleGrowthLog(parseInt(url.searchParams.get("limit") || "20"), env);
  }
  if (path === "/api/virality/metrics" && method === "POST") {
    const body = await request.json();
    return handleViralityProxy("/virality/metrics", "POST", body, env);
  }
  if (path === "/api/virality/metrics" && method === "GET") {
    return handleViralityProxy("/virality/metrics", "GET", null, env, url.searchParams);
  }
  if (path === "/api/virality/top" && method === "GET") {
    return handleViralityProxy("/virality/top", "GET", null, env, url.searchParams);
  }
  if (path === "/api/virality/experiment" && method === "POST") {
    const body = await request.json();
    return handleViralityProxy("/virality/experiment", "POST", body, env);
  }
  if (path === "/api/virality/experiments" && method === "GET") {
    return handleViralityProxy("/virality/experiments", "GET", null, env, url.searchParams);
  }
  if (path === "/api/virality/patterns" && method === "GET") {
    return handleViralityProxy("/virality/patterns", "GET", null, env, url.searchParams);
  }
  if (path === "/api/virality/learn" && method === "POST") {
    return handleViralityLearn(env);
  }
  if (path === "/api/virality/score" && method === "POST") {
    const body = await request.json();
    return handleViralityScore(body);
  }
  if (path === "/api/virality/variants" && method === "POST") {
    const body = await request.json();
    return handleViralityVariants(body, env);
  }
  if (path === "/api/session-hint") {
    if (method === "POST") return handleSessionHintPost(request, env);
    else return handleSessionHintGet(request, env);
  }
  if (path === "/api/listening/log" && method === "POST") {
    const body = await request.json();
    return handleListeningLog(body, env, request);
  }
  if (path === "/api/listening/today" && method === "GET") {
    return handleListeningToday(url.searchParams.get("studentId") || "", env);
  }
  if (path === "/api/student/checkin" && method === "POST") {
    const body = await request.json();
    return handleStudentCheckin(body, request, env);
  }
  if (path.startsWith("/api/student/streak/") && method === "GET") {
    const studentId = path.split("/api/student/streak/")[1] || "";
    return handleStudentStreak(studentId, request, env);
  }
  if (path === "/api/student/saveface" && method === "POST") {
    const body = await request.json();
    return handleStudentSaveface(body, request, env);
  }
  if (path.startsWith("/api/student/forecast/") && method === "GET") {
    const studentId = path.split("/api/student/forecast/")[1] || "";
    return handleStudentForecast(studentId, env);
  }
  if (path === "/api/magic-chat" && method === "POST") {
    const body = await request.json();
    return handleMagicChat(body, request, env);
  }
  if (path === "/api/leaderboard" && method === "GET") {
    return handleLeaderboard(request, env);
  }
  if (path === "/api/referral/register" && method === "POST") {
    const body = await request.json();
    return handleReferralRegister(body, request, env);
  }
  if (path.startsWith("/api/referral/stats/") && method === "GET") {
    const referrerId = path.split("/api/referral/stats/")[1] || "";
    return handleReferralStats(referrerId, request, env);
  }
  if (path === "/api/referral/convert" && method === "POST") {
    const body = await request.json();
    return handleReferralConvert(body, request, env);
  }
  if (path === "/api/admin/stats" && method === "GET") {
    return handleAdminStats(env);
  }
  if (path === "/api/anticheat/score" && method === "POST") {
    const body = await request.json();
    return handleAntiCheatScore(body, env);
  }
  if (path.startsWith("/api/anticheat/history/") && method === "GET") {
    const studentId = path.split("/api/anticheat/history/")[1] || "";
    return handleAntiCheatHistory(studentId, env);
  }
  if (path === "/api/waitlist" && method === "POST") {
    const body = await request.json();
    return handleWaitlistJoin(body, env);
  }
  if (path === "/api/waitlist/count" && method === "GET") {
    return handleWaitlistCount(env);
  } else if (path === "/api/waitlist/list" && method === "GET") {
    return handleWaitlistList(env);
  } else if (path === "/api/admin/waitlist/toggle" && method === "POST") {
    const authFail = await checkAdminKey(request, env);
    if (authFail) return authFail;
    const body = await request.json();
    return handleWaitlistToggle(body, env);
  } else if (path === "/api/admin/waitlist/status" && method === "GET") {
    return handleWaitlistStatus(env);
  } else if (path === "/api/admin/subscriptions" && method === "GET") {
    return handleAdminSubscriptionsList(env);
  } else if (path === "/api/admin/subscription" && method === "GET") {
    return handleAdminSubscriptionGet(url.searchParams.get("studentId") || "", env);
  } else if (path === "/api/admin/subscription/upsert" && method === "POST") {
    const authFail = await checkAdminKey(request, env);
    if (authFail) return authFail;
    const body = await request.json();
    return handleAdminSubscriptionUpsert(body, env);
  } else if (path === "/api/admin/promos" && method === "GET") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const promos = await getPromos(env);
    return json({ promos, count: promos.length });
  } else if (path === "/api/admin/promos" && method === "POST") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const body = await request.json().catch(() => ({}));
    if (!body?.code) return json({ error: "code required" }, 400);
    const promo = await createPromo(env, body);
    if (!promo) return json({ error: "Failed to create promo" }, 400);
    return json({ ok: true, promo });
  } else if (path.startsWith("/api/admin/promos/") && method === "PUT") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const code = path.split("/api/admin/promos/")[1];
    const body = await request.json().catch(() => ({}));
    const promo = await updatePromo(env, code, body);
    if (!promo) return json({ error: "Promo not found" }, 404);
    return json({ ok: true, promo });
  } else if (path.startsWith("/api/admin/promos/") && method === "DELETE") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const code = path.split("/api/admin/promos/")[1];
    await deletePromo(env, code);
    return json({ ok: true, code });
  } else if (path === "/api/admin/employers" && method === "GET") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const listed = await env.NET_PET_KV.list({ prefix: "employer:" }).catch(() => ({ keys: [] }));
    const employers = [];
    for (const k of listed.keys) {
      const raw2 = await env.NET_PET_KV.get(k.name).catch(() => null);
      if (!raw2) continue;
      try {
        employers.push(JSON.parse(raw2));
      } catch {
      }
    }
    return json({ employers, count: employers.length });
  } else if (path.startsWith("/api/admin/employers/") && method === "GET" && !path.includes("/seats")) {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const code = path.split("/api/admin/employers/")[1];
    const employer = await getEmployer(env, code);
    if (!employer) return json({ error: "Employer not found" }, 404);
    const seats = await listEmployerSeats(env, code);
    const stats = await getEmployerStats(env, code);
    return json({ employer, seats, stats });
  } else if (path === "/api/admin/employers" && method === "POST") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const body = await request.json().catch(() => ({}));
    const employer = await createEmployer(env, body);
    if (!employer) return json({ error: "Failed to create employer" }, 400);
    return json({ ok: true, employer });
  } else if (path.startsWith("/api/admin/employers/") && method === "PUT") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const code = path.split("/api/admin/employers/")[1];
    const body = await request.json().catch(() => ({}));
    const employer = await updateEmployer(env, code, body);
    if (!employer) return json({ error: "Employer not found" }, 404);
    return json({ ok: true, employer });
  } else if (path.startsWith("/api/admin/employers/") && method === "POST" && path.includes("/seats")) {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const parts = path.split("/");
    const code = parts[3];
    const body = await request.json().catch(() => ({}));
    if (!body?.studentId) return json({ error: "studentId required" }, 400);
    const result = await assignSeat(env, code, body.studentId, { plan: body.plan, expiresAt: body.expiresAt });
    if (!result.success) return json({ error: result.error }, 400);
    return json({ ok: true, seat: result.seat, employer: result.employer });
  } else if (path.startsWith("/api/admin/employers/") && method === "DELETE" && path.includes("/seats/")) {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const parts = path.split("/");
    const code = parts[3];
    const studentId = parts[5];
    const result = await removeSeat(env, code, studentId);
    if (!result.success) return json({ error: result.error }, 400);
    return json({ ok: true, employer: result.employer });
  } else if (path === "/api/admin/invoices" && method === "GET") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const invoices = await listInvoices(env, 200);
    return json({ invoices, count: invoices.length });
  } else if (path.startsWith("/api/admin/invoices/") && method === "GET" && !path.includes("/send")) {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const id = path.split("/api/admin/invoices/")[1];
    const invoice = await getInvoice(env, id);
    if (!invoice) return json({ error: "Invoice not found" }, 404);
    return json({ invoice });
  } else if (path.startsWith("/api/admin/invoices/") && method === "POST" && path.includes("/send")) {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    const id = path.split("/api/admin/invoices/")[1].split("/send")[0];
    const invoice = await getInvoice(env, id);
    if (!invoice) return json({ error: "Invoice not found" }, 404);
    const updated = await updateInvoiceStatus(env, invoice.invoiceId, "sent", { sentAt: (/* @__PURE__ */ new Date()).toISOString() });
    return json({ ok: true, invoice: updated });
  } else if (path === "/api/admin/commerce/stats" && method === "GET") {
    const adminBlock = await checkAdminKey(request, env);
    if (adminBlock) return adminBlock;
    return handleAdminCommerceStats(env);
  } else if (method === "DELETE" && path.includes("/api/vocab/delete")) {
    try {
      const body = await request.json().catch(() => ({}));
      const { studentId, vocabId } = body;
      if (!studentId || !vocabId) return json({ error: "studentId and vocabId required" }, 400);
      const key = `vocab:${studentId}:${vocabId}`;
      const existing = await env.NET_PET_KV.get(key);
      if (!existing) return json({ error: "Vocabulary word not found" }, 404);
      await env.NET_PET_KV.delete(key);
      return json({ success: true });
    } catch (err) {
      return json({ error: String(err) }, 500);
    }
  } else if (path.includes("/api/student/goals")) {
    if (method === "GET") {
      const studentId = url.searchParams.get("studentId");
      if (!studentId) return json({ error: "studentId query param required" }, 400);
      const raw2 = await env.NET_PET_KV.get(`goals:${studentId}`);
      if (!raw2) return json({ targetScore: null, deadlineDays: null });
      return json(JSON.parse(raw2));
    }
    if (method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const { studentId, targetScore, deadlineDays } = body;
        if (!studentId || targetScore == null || deadlineDays == null) {
          return json({ error: "studentId, targetScore, deadlineDays required" }, 400);
        }
        const goal = { studentId, targetScore: Number(targetScore), deadlineDays: Number(deadlineDays), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
        await env.NET_PET_KV.put(`goals:${studentId}`, JSON.stringify(goal));
        return json({ success: true, goal });
      } catch (err) {
        return json({ error: String(err) }, 500);
      }
    }
  }
  if (path === "/api/payment/confirm" && method === "POST") {
    const body = await request.json();
    return handlePaymentConfirm(body, env);
  }
  if (path === "/api/testimonial" && method === "GET") {
    return handleTestimonialList(env);
  }
  if (path === "/api/testimonial" && method === "POST") {
    const body = await request.json();
    return handleTestimonialSubmit(body, env);
  }
  if (path === "/api/admin/testimonial" && method === "GET") {
    return handleTestimonialAdminList(env);
  }
  if (path.startsWith("/api/admin/testimonial/") && method === "POST" && path.includes("/approve")) {
    const id = path.split("/api/admin/testimonial/")[1]?.split("/")[0];
    return handleTestimonialApprove(id, env);
  }
  if (path === "/api/class/ingest" && method === "POST") {
    const authFail = checkAdminKey(request, env);
    if (authFail) return addCors(authFail, request);
    const body = await request.json().catch(() => ({}));
    const { studentId, audioUrl, classDate } = body;
    if (!studentId || !audioUrl) return addCors(json({ error: "studentId and audioUrl required" }, 400), request);
    const idCheck = validateStudentId(studentId);
    if (!idCheck.valid) return addCors(json({ error: idCheck.error }, 400), request);
    const rosterCheck = validateActiveStudent(studentId);
    if (!rosterCheck.valid) return addCors(json({ error: "student not in active roster", code: "NOT_IN_ROSTER" }, 403), request);
    const date = classDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const dgRes = await fetch(
      "https://api.deepgram.com/v1/listen?model=nova-3&diarize=true&smart_format=true&punctuate=true&utterances=true",
      {
        method: "POST",
        headers: { "Authorization": `Token ${env.DEEPGRAM_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ url: audioUrl })
      }
    );
    if (!dgRes.ok) return addCors(json({ error: "Deepgram transcription failed", status: dgRes.status }, 502), request);
    const dgData = await dgRes.json();
    const words = dgData?.results?.channels?.[0]?.alternatives?.[0]?.words ?? [];
    const utterances = dgData?.results?.utterances ?? [];
    const fullTranscript = utterances.map((u) => `[S${u.speaker}] ${u.transcript}`).join("\n");
    const studentText = utterances.filter((u) => u.speaker === 1).map((u) => u.transcript).join("\n");
    const paTask = `Extract 15-30 A2/B1 English vocabulary words or phrases from this ESL class transcript. Return ONLY valid JSON in this exact format: {"words":[{"word":"string","meaning_vi":"string","used_by_student":boolean}]}. Exclude basic function words (the, is, and, etc). Prioritize words the student (S1) attempted. FULL TRANSCRIPT:
${fullTranscript.slice(0, 15e3)}
STUDENT ONLY:
${studentText.slice(0, 5e3)}`;
    let extracted = [];
    try {
      const paBody = JSON.stringify({ task: paTask, context: "", targetfile: "", tier: 1 });
      const paRes = await fetch("https://phoenix-architecti.mrmichaelhobbs123.workers.dev/api/code", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-pa-auth": env.PA_AUTH_KEY || "" },
        body: paBody
      });
      if (paRes.ok) {
        const paData = await paRes.json();
        const patch = paData.patch || "";
        const jsonMatch = patch.match(/\{[\s\S]*"words"[\s\S]*\}/);
        if (jsonMatch) extracted = JSON.parse(jsonMatch[0]).words ?? [];
      }
    } catch (_2) {
    }
    const batchResults = await seedVocabBatch(studentId, extracted, env);
    const added = batchResults.filter((r) => r.ok).length;
    await kvEncryptPut(env.NET_PET_KV, `class_transcript_${studentId}_${date}`, fullTranscript, env.ENCRYPTION_KEY);
    return addCors(json({ added, date, words: extracted, transcriptStored: true }), request);
  }
  return json({ error: "Not Found", path }, 404);
}
__name(handleAPI, "handleAPI");
async function handlePaymentConfirm(body, env) {
  const { studentId, companyCode, plan, amountVND, txnId, confirmedBy } = body || {};
  if (!plan || !txnId || !amountVND) return json({ error: "plan, txnId, amountVND required" }, 400);
  const existingPayment = await env.NET_PET_KV.get(`payment:${txnId}`).catch(() => null);
  if (existingPayment) {
    const parsed = JSON.parse(existingPayment);
    return json({ success: true, txnId, activatedUntil: parsed.paidUntil?.slice(0, 10), existing: true });
  }
  const record = {
    studentId: studentId || null,
    companyCode: companyCode || null,
    plan,
    amountVND: Number(amountVND),
    txnId: String(txnId).trim(),
    confirmedBy: confirmedBy || "manual",
    confirmedAt: new Date(Date.now() + 7 * 36e5).toISOString(),
    status: "confirmed"
  };
  await env.NET_PET_KV.put(`payment:${txnId}`, JSON.stringify(record), { expirationTtl: 86400 * 365 });
  const idxRaw = await env.NET_PET_KV.get("payment:index").catch(() => null);
  const idx = idxRaw ? JSON.parse(idxRaw) : [];
  if (!idx.includes(txnId)) {
    idx.push(txnId);
    await env.NET_PET_KV.put("payment:index", JSON.stringify(idx.slice(-1e3)));
  }
  const subKey = studentId ? `subscription:${studentId}` : `subscription:employer:${companyCode}`;
  await env.NET_PET_KV.put(subKey, JSON.stringify({
    plan,
    paidUntil: new Date(Date.now() + 30 * 864e5).toISOString(),
    txnId,
    activatedAt: record.confirmedAt
  }));
  const until = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10);
  try {
    const { updateInvoiceStatus: updateInvoiceStatus2 } = await Promise.resolve().then(() => (init_invoices(), invoices_exports));
    const invoices = await (await Promise.resolve().then(() => (init_orders(), orders_exports))).listOrders(env, 100);
    const matchingOrder = invoices.find((o) => o.txnId === txnId || o.orderId === txnId);
    if (matchingOrder) {
      const invoiceList = await (await Promise.resolve().then(() => (init_invoices(), invoices_exports))).listInvoices(env, 100);
      const matchingInvoice = invoiceList.find((inv) => inv.orderId === matchingOrder.orderId);
      if (matchingInvoice) {
        await updateInvoiceStatus2(env, matchingInvoice.invoiceId, "paid", { paidAt: (/* @__PURE__ */ new Date()).toISOString(), txnId });
      }
    }
  } catch (e) {
    console.warn(`[PAYMENT] Failed to update invoice for ${txnId}:`, e.message);
  }
  return json({ success: true, txnId, activatedUntil: until });
}
__name(handlePaymentConfirm, "handlePaymentConfirm");
async function handleAdminSubscriptionsList(env) {
  if (!env.NET_PET_KV) return json({ subscriptions: [] });
  const keys = [];
  let cursor;
  do {
    const listed = await env.NET_PET_KV.list({ prefix: "subscription:", cursor }).catch(() => ({ keys: [], list_complete: true }));
    listed.keys.forEach((k) => keys.push(k.name.replace("subscription:", "")));
    cursor = listed.list_complete ? void 0 : listed.cursor;
  } while (cursor);
  const students = keys.filter((sid) => !sid.startsWith("sov100-") && sid !== "keep-warm-ping");
  const subs = await Promise.all(students.map(async (sid) => {
    const raw2 = await env.NET_PET_KV.get(`subscription:${sid}`).catch(() => null);
    return raw2 ? { studentId: sid, ...JSON.parse(raw2) } : null;
  }));
  return json({ subscriptions: subs.filter(Boolean), generatedAt: (/* @__PURE__ */ new Date()).toISOString() });
}
__name(handleAdminSubscriptionsList, "handleAdminSubscriptionsList");
async function handleAdminSubscriptionGet(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  if (!env.NET_PET_KV) return json({ error: "NET_PET_KV not configured" }, 500);
  const raw2 = await env.NET_PET_KV.get(`subscription:${studentId}`).catch(() => null);
  if (!raw2) return json({ studentId, plan: "none", status: "no_subscription" });
  const sub = JSON.parse(raw2);
  const trialDays = sub.trial_end ? Math.max(0, Math.ceil((new Date(sub.trial_end) - Date.now()) / 864e5)) : 0;
  const isPaid = sub.paidUntil && new Date(sub.paidUntil) > /* @__PURE__ */ new Date();
  const isTrial = sub.trial_end && new Date(sub.trial_end) > /* @__PURE__ */ new Date();
  const status = isPaid ? "active" : isTrial ? "trial" : sub.plan === "founding-member" && trialDays > 0 ? "trial" : sub.paidUntil ? "expired" : "no_subscription";
  return json({ studentId, ...sub, trialDaysRemaining: trialDays, status });
}
__name(handleAdminSubscriptionGet, "handleAdminSubscriptionGet");
async function handleAdminSubscriptionUpsert(body, env) {
  const { studentId, plan, trial_end, paidUntil, is_founding_member } = body || {};
  if (!studentId) return json({ error: "studentId required" }, 400);
  if (!env.NET_PET_KV) return json({ error: "NET_PET_KV not configured" }, 500);
  const existing = await env.NET_PET_KV.get(`subscription:${studentId}`).catch(() => null);
  const base = existing ? JSON.parse(existing) : { plan: "trial", activatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  const sub = {
    ...base,
    ...plan ? { plan } : {},
    ...trial_end ? { trial_end } : {},
    ...paidUntil ? { paidUntil } : {},
    ...is_founding_member !== void 0 ? { is_founding_member } : {},
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await env.NET_PET_KV.put(`subscription:${studentId}`, JSON.stringify(sub));
  return json({ ok: true, studentId, subscription: sub });
}
__name(handleAdminSubscriptionUpsert, "handleAdminSubscriptionUpsert");
async function handleAdminAudit(env, url) {
  if (!env.SOUL_DB) return json({ entries: [], error: "SOUL_DB not configured" });
  const limit = parseInt(url.searchParams.get("limit") || "50");
  try {
    const r = await env.SOUL_DB.prepare(
      "SELECT id, ts, actor, action, target, metadata FROM audit_log ORDER BY ts DESC LIMIT ?"
    ).bind(limit).all();
    return json({ entries: r.results || [], total: (r.results || []).length });
  } catch (err) {
    return json({ error: err.message, entries: [] }, 500);
  }
}
__name(handleAdminAudit, "handleAdminAudit");
async function handleAdminRoster(env) {
  if (!env.NET_PET_KV) return json({ students: [], error: "KV not configured" });
  try {
    const list = await env.NET_PET_KV.list({ prefix: "student_profile_" });
    const students = await Promise.all(list.keys.map(async (k) => {
      const studentId = k.name.replace("student_profile_", "");
      const raw2 = await env.NET_PET_KV.get(k.name).catch(() => null);
      const profile = normalizeStudentProfile(raw2 ? JSON.parse(raw2) : { studentId });
      let streak = { currentStreak: 0, longestStreak: 0 };
      const streakRaw = await env.NET_PET_KV.get(`streak:${studentId}`).catch(() => null);
      if (streakRaw) streak = JSON.parse(streakRaw);
      let phonics = null;
      const phonicsRaw = await env.NET_PET_KV.get(`phonics_progress_${studentId}`).catch(() => null);
      if (phonicsRaw) phonics = JSON.parse(phonicsRaw);
      return {
        studentId,
        fullName: profile.fullName || profile.name || studentId,
        level: profile.level || profile.englishLevel || "A1",
        lastSession: profile.lastSession || null,
        streak,
        phonicsGroup: phonics?.group_name || phonics?.current_group || null,
        lang: profile.lang || "en"
      };
    }));
    students.sort((a, b) => {
      const da = a.lastSession?.date || "";
      const db = b.lastSession?.date || "";
      return db.localeCompare(da);
    });
    return json({ students, total: students.length });
  } catch (err) {
    return json({ error: err.message, students: [] }, 500);
  }
}
__name(handleAdminRoster, "handleAdminRoster");
async function handleAdminStats(env) {
  const now = new Date(Date.now() + 7 * 36e5).toISOString();
  const today = now.slice(0, 10);
  const wlIdx = await env.NET_PET_KV.get("waitlist:index").then((r) => r ? JSON.parse(r) : []).catch(() => []);
  const waitlistCount = wlIdx.length;
  const payIdx = await env.NET_PET_KV.get("payment:index").then((r) => r ? JSON.parse(r) : []).catch(() => []);
  const totalRevenue = (await Promise.all(payIdx.slice(-100).map(async (id) => {
    const raw2 = await env.NET_PET_KV.get(`payment:${id}`).catch(() => null);
    return raw2 ? JSON.parse(raw2).amountVND || 0 : 0;
  }))).reduce((a, b) => a + b, 0);
  const empIdx = await env.NET_PET_KV.get("employer:index").then((r) => r ? JSON.parse(r) : []).catch(() => []);
  let activeStudents = 0;
  const rosterRaw = await env.NET_PET_KV.get("roster:index").catch(() => null);
  const roster = rosterRaw ? JSON.parse(rosterRaw) : [];
  const studentIds = Array.isArray(roster) ? roster.slice(0, 200) : [];
  const streakChecks = await Promise.all(studentIds.map((s2) => env.NET_PET_KV.get(`streak:${s2}`).catch(() => null)));
  streakChecks.forEach((raw2, i) => {
    if (raw2) {
      const d = JSON.parse(raw2);
      const p = d.lastCheckin ? Date.now() - d.lastCheckin : 999999;
      if (d.currentStreak > 0 && p < 7 * 864e5) activeStudents++;
    }
  });
  let challengeAttemptsToday = 0;
  const chalRaw = await env.NET_PET_KV.get(`challenge:attempts:${today}`).catch(() => null);
  if (chalRaw) challengeAttemptsToday = JSON.parse(chalRaw).length || 0;
  return json({
    waitlistCount,
    paymentCount: payIdx.length,
    totalRevenueVND: totalRevenue,
    employerCount: empIdx.length,
    activeStudents,
    challengeAttemptsToday,
    generatedAt: now
  });
}
__name(handleAdminStats, "handleAdminStats");
async function handleAdminCommerceStats(env) {
  const now = new Date(Date.now() + 7 * 36e5).toISOString();
  const orders = await listOrders(env, 500);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const paidOrders = orders.filter((o) => o.status === "paid").length;
  const totalRevenueVND = orders.reduce((sum, o) => sum + (o.totalVND || 0), 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenueVND / totalOrders) : 0;
  const byPlan = {};
  orders.forEach((o) => {
    const plan = o.lineItems?.find((i) => i.type === "plan")?.id || "unknown";
    byPlan[plan] = (byPlan[plan] || 0) + 1;
  });
  const activeAccess = await listActiveAccess(env, 500);
  const accessCount = activeAccess.length;
  const subKeys = [];
  let cursor;
  do {
    const listed = await env.NET_PET_KV.list({ prefix: "subscription:", cursor }).catch(() => ({ keys: [], list_complete: true }));
    listed.keys.forEach((k) => subKeys.push(k.name.replace("subscription:", "")));
    cursor = listed.list_complete ? void 0 : listed.cursor;
  } while (cursor);
  const studentSubKeys = subKeys.filter((sid) => !sid.startsWith("sov100-") && sid !== "keep-warm-ping");
  const subs = await Promise.all(studentSubKeys.map(async (sid) => {
    const raw2 = await env.NET_PET_KV.get(`subscription:${sid}`).catch(() => null);
    return raw2 ? { studentId: sid, ...JSON.parse(raw2) } : null;
  }));
  const activeSubs = subs.filter((s2) => s2 && computeSubscriptionStatus(s2) === "active").length;
  const graceSubs = subs.filter((s2) => s2 && computeSubscriptionStatus(s2) === "grace").length;
  const expiredSubs = subs.filter((s2) => s2 && computeSubscriptionStatus(s2) === "expired").length;
  const trialSubs = subs.filter((s2) => s2 && computeSubscriptionStatus(s2) === "trial").length;
  const promos = await getPromos(env);
  const totalPromoRedemptions = promos.reduce((sum, p) => sum + (p.usedCount || 0), 0);
  const empListRaw = await env.NET_PET_KV.list({ prefix: "employer:" }).catch(() => ({ keys: [] }));
  const employers = [];
  for (const k of empListRaw.keys) {
    const raw2 = await env.NET_PET_KV.get(k.name).catch(() => null);
    if (!raw2) continue;
    try {
      employers.push(JSON.parse(raw2));
    } catch {
    }
  }
  const employerRevenue = orders.filter((o) => o.ownerType === "employer").reduce((sum, o) => sum + (o.totalVND || 0), 0);
  const invoices = await listInvoices(env, 200);
  const sentInvoices = invoices.filter((i) => i.status === "sent").length;
  const paidInvoices = invoices.filter((i) => i.status === "paid").length;
  return json({
    ordersCount: totalOrders,
    pendingOrders,
    paidOrders,
    revenueVND: totalRevenueVND,
    avgOrderValue,
    byPlan,
    accessCount,
    subscriptionBreakdown: {
      active: activeSubs,
      grace: graceSubs,
      expired: expiredSubs,
      trial: trialSubs,
      total: subs.filter(Boolean).length
    },
    promoRedemptions: totalPromoRedemptions,
    employers: {
      count: employers.length,
      revenueVND: employerRevenue
    },
    invoices: {
      total: invoices.length,
      sent: sentInvoices,
      paid: paidInvoices
    },
    generatedAt: now
  });
}
__name(handleAdminCommerceStats, "handleAdminCommerceStats");
async function handleWaitlistJoin(body, env) {
  const { name, email, why } = body || {};
  if (!name || !email) return json({ error: "name and email required" }, 400);
  if (!env.NET_PET_KV) return json({ error: "NET_PET_KV not configured" }, 500);
  const entry = {
    name: String(name).slice(0, 120),
    email: String(email).slice(0, 200),
    why: String(why || "").slice(0, 500),
    ts: (/* @__PURE__ */ new Date()).toISOString(),
    id: `wl-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  };
  const idx = await env.NET_PET_KV.get("waitlist:index").then((r) => r ? JSON.parse(r) : []).catch(() => []);
  idx.push(entry.id);
  if (idx.length > 100) return json({ ok: false, error: "Waitlist is at capacity (100). Join closed.", position: 100 }, 200);
  await env.NET_PET_KV.put("waitlist:index", JSON.stringify(idx));
  await env.NET_PET_KV.put(`waitlist:${entry.id}`, JSON.stringify(entry));
  return json({ ok: true, entry, position: idx.length, total: idx.length }, 201);
}
__name(handleWaitlistJoin, "handleWaitlistJoin");
async function handleWaitlistCount(env) {
  if (!env.NET_PET_KV) return json({ count: 0 });
  const idx = await env.NET_PET_KV.get("waitlist:index").then((r) => r ? JSON.parse(r) : []).catch(() => []);
  return json({ count: idx.length, cap: 100 });
}
__name(handleWaitlistCount, "handleWaitlistCount");
async function handleWaitlistList(env) {
  if (!env.NET_PET_KV) return json({ entries: [] });
  const idx = await env.NET_PET_KV.get("waitlist:index").then((r) => r ? JSON.parse(r) : []).catch(() => []);
  const entries = await Promise.all(idx.slice(-50).map(async (id) => {
    const raw2 = await env.NET_PET_KV.get(`waitlist:${id}`).catch(() => null);
    return raw2 ? JSON.parse(raw2) : null;
  }));
  return json({ entries: entries.filter(Boolean), total: idx.length, cap: 100 });
}
__name(handleWaitlistList, "handleWaitlistList");
async function handleWaitlistToggle(body, env) {
  const { closed } = body || {};
  await env.NET_PET_KV.put("waitlist:closed", closed ? "true" : "false");
  return json({ ok: true, closed: !!closed });
}
__name(handleWaitlistToggle, "handleWaitlistToggle");
async function handleWaitlistStatus(env) {
  if (!env.NET_PET_KV) return json({ closed: false });
  const val = await env.NET_PET_KV.get("waitlist:closed").catch(() => "false");
  return json({ closed: val === "true" });
}
__name(handleWaitlistStatus, "handleWaitlistStatus");
async function handleAntiCheatScore(body, env) {
  const { studentId, sessionData } = body || {};
  if (!studentId || !sessionData) return json({ error: "studentId and sessionData required" }, 400);
  const events = Array.isArray(sessionData) ? sessionData : [];
  const total = events.length;
  const tabVisible = events.filter((e) => e.type === "tab_visible").length;
  const tabHidden = events.filter((e) => e.type === "tab_hidden").length;
  const seeks = events.filter((e) => e.type === "seek").length;
  const clicks = events.filter((e) => e.type === "click").length;
  const keypresses = events.filter((e) => e.type === "keypress").length;
  const scrolls = events.filter((e) => e.type === "scroll").length;
  const hiddenRatio = total > 0 ? tabHidden / Math.max(tabVisible, 1) : 0;
  const interactionRate = total > 0 ? (clicks + keypresses + scrolls) / Math.max(total, 1) : 0;
  let score = 100;
  if (hiddenRatio > 0.5) score -= 40;
  if (hiddenRatio > 0.8) score -= 20;
  if (interactionRate < 0.02 && total > 20) score -= 20;
  if (seeks === 0 && total > 50) score -= 10;
  score = Math.max(0, Math.min(100, score));
  const verdict = score >= 70 ? "GENUINE" : score >= 40 ? "SUSPICIOUS" : "FAKE";
  const today = new Date(Date.now() + 7 * 36e5).toISOString().slice(0, 10);
  const kvKey = `anticheat:${studentId}:${today}`;
  await env.NET_PET_KV.put(kvKey, JSON.stringify({
    score,
    verdict,
    events: total,
    hiddenRatio: Math.round(hiddenRatio * 100) / 100,
    interactionRate: Math.round(interactionRate * 100) / 100,
    timestamp: Date.now()
  }), { expirationTtl: 86400 * 30 });
  return json({
    studentId,
    score,
    verdict,
    signals: {
      hiddenRatio: Math.round(hiddenRatio * 100) / 100,
      interactionRate: Math.round(interactionRate * 100) / 100,
      seeks,
      totalEvents: total
    },
    message: verdict === "GENUINE" ? "Real engagement detected \u{1F3AF}" : verdict === "SUSPICIOUS" ? "Engagement looks off \u2014 stay focused" : "Background play detected \u2014 watching counts only if you're actually watching"
  });
}
__name(handleAntiCheatScore, "handleAntiCheatScore");
async function handleAntiCheatHistory(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  const prefix = `anticheat:${studentId}:`;
  const listed = await env.NET_PET_KV.list({ prefix });
  const days = [];
  for (const key of listed.keys) {
    const raw2 = await env.NET_PET_KV.get(key.name);
    if (!raw2) continue;
    const data = JSON.parse(raw2);
    const date = key.name.replace(prefix, "");
    days.push({ date, score: data.score, verdict: data.verdict });
  }
  days.sort((a, b) => a.date > b.date ? -1 : 1);
  const limited = days.slice(0, 30);
  const averageScore = limited.length > 0 ? Math.round(limited.reduce((sum, d) => sum + d.score, 0) / limited.length) : null;
  const overallVerdict = averageScore === null ? "NO_DATA" : averageScore >= 70 ? "GENUINE" : averageScore >= 40 ? "SUSPICIOUS" : "FAKE";
  return json({ studentId, days: limited, averageScore, overallVerdict });
}
__name(handleAntiCheatHistory, "handleAntiCheatHistory");
async function handleSessionHintPost(request, env) {
  const body = await request.json().catch(() => ({}));
  const { studentId, videoTitle, videoUrl } = body;
  if (!studentId || !videoTitle) return new Response(JSON.stringify({ error: "missing fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
  if (!env.NET_PET_KV) return new Response(JSON.stringify({ error: "NET_PET_KV binding not configured" }), { status: 500, headers: { "Content-Type": "application/json" } });
  await env.NET_PET_KV.put(
    `session-hint:${studentId}`,
    JSON.stringify({ studentId, videoTitle, videoUrl: videoUrl || "", timestamp: Date.now() }),
    { expirationTtl: 86400 }
  );
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
}
__name(handleSessionHintPost, "handleSessionHintPost");
async function handleSessionHintGet(request, env) {
  const url = new URL(request.url);
  const studentId = url.searchParams.get("studentId");
  if (!studentId) return new Response(JSON.stringify({ error: "missing studentId" }), { status: 400, headers: { "Content-Type": "application/json" } });
  if (!env.NET_PET_KV) return new Response(JSON.stringify({ videoTitle: null }), { status: 200, headers: { "Content-Type": "application/json" } });
  const raw2 = await env.NET_PET_KV.get(`session-hint:${studentId}`);
  let soulContext = "";
  try {
    const ctxResp = await fetch(`${env.SOUL_LOGGER_URL || "https://soul-logger.mrmichaelhobbs123.workers.dev"}/api/soul/context/${studentId}`);
    if (ctxResp.ok) {
      const ctxData = await ctxResp.json();
      if (ctxData.context_brief) soulContext = ctxData.context_brief;
    }
  } catch (e) {
    console.log("[SESSION_HINT] soul context fetch failed:", e.message);
  }
  if (!raw2) return new Response(JSON.stringify({ videoTitle: null, soul_context: soulContext }), { status: 200, headers: { "Content-Type": "application/json" } });
  let hint = {};
  try {
    hint = JSON.parse(raw2);
  } catch (e) {
    hint = { videoTitle: null };
  }
  return new Response(JSON.stringify({ ...hint, soul_context: soulContext }), { status: 200, headers: { "Content-Type": "application/json" } });
}
__name(handleSessionHintGet, "handleSessionHintGet");
async function handleListeningLog(body, env, request) {
  const studentId = body.studentId || "";
  const minutes = parseInt(body.minutes) || 0;
  const source = (body.source || "other").slice(0, 30);
  const description = (body.description || "").slice(0, 200);
  if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
  if (minutes < 1 || minutes > 480) return addCors(json({ error: "minutes must be 1-480" }, 400), request);
  if (!env.NET_PET_KV) return addCors(json({ error: "NET_PET_KV not configured" }, 500), request);
  const todayIct = new Date(Date.now() + 7 * 36e5).toISOString().slice(0, 10);
  const kvKey = `listen:${studentId}:${todayIct}`;
  const existing = await env.NET_PET_KV.get(kvKey).catch(() => null);
  const existingData = existing ? JSON.parse(existing) : { minutes: 0, sources: [], entries: [] };
  const newTotal = existingData.minutes + minutes;
  const newSources = [.../* @__PURE__ */ new Set([...existingData.sources, source])];
  const newEntry = { minutes, source, description, ts: Date.now() };
  const log = {
    studentId,
    date: todayIct,
    minutes: newTotal,
    sources: newSources,
    entries: [...existingData.entries || [], newEntry],
    lastUpdated: Date.now()
  };
  await env.NET_PET_KV.put(kvKey, JSON.stringify(log), { expirationTtl: 86400 * 90 });
  if (env.LEDGER) {
    const payload = JSON.stringify({ minutes, source, description, date: todayIct });
    appendToLedger(studentId, "listening_log", payload, env).catch(() => {
    });
  }
  if (env.PETS) {
    try {
      const petStub = env.PETS.get(env.PETS.idFromName(studentId));
      await petStub.fetch(new Request("https://do/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minutes: Math.min(minutes, 60), confidence: 5 })
      }));
    } catch (_2) {
    }
  }
  return addCors(json({
    ok: true,
    studentId,
    date: todayIct,
    todayTotal: newTotal,
    targetMinutes: 45,
    remaining: Math.max(0, 45 - newTotal),
    message: newTotal >= 45 ? `Done! ${newTotal} min listening today \u2713` : `${newTotal} min logged \u2014 ${Math.max(0, 45 - newTotal)} min left for today`
  }), request);
}
__name(handleListeningLog, "handleListeningLog");
async function handleListeningToday(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  if (!env.NET_PET_KV) return json({ error: "NET_PET_KV not configured" }, 500);
  const todayIct = new Date(Date.now() + 7 * 36e5).toISOString().slice(0, 10);
  const kvKey = `listen:${studentId}:${todayIct}`;
  const raw2 = await env.NET_PET_KV.get(kvKey).catch(() => null);
  const log = raw2 ? JSON.parse(raw2) : { minutes: 0, sources: [], entries: [] };
  return json({
    studentId,
    date: todayIct,
    todayTotal: log.minutes || 0,
    targetMinutes: 45,
    remaining: Math.max(0, 45 - (log.minutes || 0)),
    done: (log.minutes || 0) >= 45,
    sources: log.sources || []
  });
}
__name(handleListeningToday, "handleListeningToday");
var FACE_SAVING_STUDENTS = ["huong-bluetech", "mai-tram-bluetech", "quy-bluetech"];
function getICTDateString(offsetMs = 0) {
  const nowMs = Date.now() + offsetMs;
  const ictMs = nowMs + 7 * 60 * 60 * 1e3;
  const d = new Date(ictMs);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
__name(getICTDateString, "getICTDateString");
function relativeDayICT(dateStr) {
  if (!dateStr) return "older";
  const today = getICTDateString(0);
  const yesterday = getICTDateString(-24 * 60 * 60 * 1e3);
  if (dateStr === today) return "today";
  if (dateStr === yesterday) return "yesterday";
  return "older";
}
__name(relativeDayICT, "relativeDayICT");
async function handleStudentCheckin(body, request, env) {
  const { studentId } = body || {};
  if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
  if (!FACE_SAVING_STUDENTS.includes(studentId)) {
    return addCors(json({ error: "Unknown studentId \u2014 must be one of: " + FACE_SAVING_STUDENTS.join(", ") }, 400), request);
  }
  if (!env.NET_PET_KV) return addCors(json({ error: "NET_PET_KV binding not configured" }, 500), request);
  const today = getICTDateString();
  const kvKey = `streak:${studentId}`;
  const raw2 = await env.NET_PET_KV.get(kvKey);
  let streak = raw2 ? JSON.parse(raw2) : { currentStreak: 0, lastCheckin: null, longestStreak: 0, totalDays: 0 };
  const rel = relativeDayICT(streak.lastCheckin);
  let status;
  if (rel === "today") {
    status = "already_done";
  } else if (rel === "yesterday") {
    streak.currentStreak += 1;
    streak.totalDays += 1;
    streak.lastCheckin = today;
    status = "checked_in";
  } else {
    const wasBroken = streak.lastCheckin !== null;
    streak.currentStreak = 1;
    streak.totalDays += 1;
    streak.lastCheckin = today;
    status = wasBroken ? "streak_broken" : "checked_in";
  }
  if (streak.currentStreak > streak.longestStreak) {
    streak.longestStreak = streak.currentStreak;
  }
  if (status !== "already_done") {
    await env.NET_PET_KV.put(kvKey, JSON.stringify(streak));
  }
  return addCors(json({
    studentId,
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    totalDays: streak.totalDays,
    lastCheckin: streak.lastCheckin,
    status
  }), request);
}
__name(handleStudentCheckin, "handleStudentCheckin");
async function handleStudentStreak(studentId, request, env) {
  if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
  if (!FACE_SAVING_STUDENTS.includes(studentId)) {
    return addCors(json({ error: "Unknown studentId \u2014 must be one of: " + FACE_SAVING_STUDENTS.join(", ") }, 400), request);
  }
  if (!env.NET_PET_KV) return addCors(json({ error: "NET_PET_KV binding not configured" }, 500), request);
  const raw2 = await env.NET_PET_KV.get(`streak:${studentId}`);
  const streak = raw2 ? JSON.parse(raw2) : { currentStreak: 0, lastCheckin: null, longestStreak: 0, totalDays: 0 };
  const rel = relativeDayICT(streak.lastCheckin);
  let todayStatus;
  if (rel === "today") todayStatus = "active";
  else if (rel === "yesterday") todayStatus = "at_risk";
  else todayStatus = "broken";
  return addCors(json({
    studentId,
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    totalDays: streak.totalDays,
    lastCheckin: streak.lastCheckin,
    todayStatus
  }), request);
}
__name(handleStudentStreak, "handleStudentStreak");
async function handleStudentSaveface(body, request, env) {
  const { studentId, message } = body || {};
  if (!studentId) return addCors(json({ error: "studentId required" }, 400), request);
  if (!FACE_SAVING_STUDENTS.includes(studentId)) {
    return addCors(json({ error: "Unknown studentId \u2014 must be one of: " + FACE_SAVING_STUDENTS.join(", ") }, 400), request);
  }
  if (!env.NET_PET_KV) return addCors(json({ error: "NET_PET_KV binding not configured" }, 500), request);
  const raw2 = await env.NET_PET_KV.get(`streak:${studentId}`);
  const streak = raw2 ? JSON.parse(raw2) : { currentStreak: 0, lastCheckin: null, longestStreak: 0, totalDays: 0 };
  const rel = relativeDayICT(streak.lastCheckin);
  let todayStatus;
  if (rel === "today") todayStatus = "active";
  else if (rel === "yesterday") todayStatus = "at_risk";
  else todayStatus = "broken";
  if (todayStatus === "at_risk" || todayStatus === "broken") {
    const today = getICTDateString();
    const eventKey = `saveface:${studentId}:${today}`;
    const event = {
      studentId,
      date: today,
      currentStreak: streak.currentStreak,
      todayStatus,
      message: message || "",
      ts: Date.now()
    };
    await env.NET_PET_KV.put(eventKey, JSON.stringify(event), { expirationTtl: 30 * 24 * 60 * 60 });
  }
  return addCors(json({
    studentId,
    streakAtRisk: streak.currentStreak,
    todayStatus,
    message: "C\u1EE9u em v\u1EDBi! Streak s\u1EAFp \u0111\u1EE9t!",
    recoveryOptions: ["Complete a lesson now", "Review vocabulary", "Practice pronunciation"]
  }), request);
}
__name(handleStudentSaveface, "handleStudentSaveface");
async function handleStudentForecast(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  const [streakRaw, srsRaw] = await Promise.all([
    env.NET_PET_KV.get(`streak:${studentId}`),
    env.NET_PET_KV.get(`srs_data_${studentId}`)
  ]);
  const streak = streakRaw ? JSON.parse(streakRaw) : { currentStreak: 0, totalDays: 0 };
  let totalWords = 0;
  let masteredWords = 0;
  if (srsRaw) {
    try {
      const srsMap = JSON.parse(srsRaw);
      totalWords = Object.keys(srsMap).length;
      masteredWords = Object.values(srsMap).filter((w) => (w.repetitions || 0) >= 3).length;
    } catch (_2) {
    }
  }
  const activeDays = Math.max(streak.totalDays || 1, 1);
  const velocity = masteredWords / activeDays;
  const CEFR_TARGETS = [
    { level: "A1", words: 50 },
    { level: "A2", words: 150 },
    { level: "B1", words: 300 },
    { level: "B2", words: 500 },
    { level: "C1", words: 800 }
  ];
  const currentLevel = CEFR_TARGETS.find((t) => masteredWords < t.words)?.level || "C1";
  const nextTarget = CEFR_TARGETS.find((t) => t.words > masteredWords);
  const wordsRemaining = nextTarget ? nextTarget.words - masteredWords : 0;
  const projectedDays = velocity > 0 ? Math.ceil(wordsRemaining / velocity) : 999;
  const graduationDate = new Date(Date.now() + projectedDays * 864e5).toISOString().slice(0, 10);
  const confidence = activeDays < 7 ? "low" : activeDays < 30 ? "medium" : "high";
  return json({
    studentId,
    currentLevel,
    targetLevel: nextTarget?.level || "C1",
    masteredWords,
    totalWords,
    velocity: Math.round(velocity * 10) / 10,
    projectedDays,
    graduationDate,
    confidence,
    activeDays
  });
}
__name(handleStudentForecast, "handleStudentForecast");
async function handleLeaderboard(request, env) {
  if (!env.NET_PET_KV) return addCors(json({ error: "NET_PET_KV not configured" }, 500), request);
  const STUDENTS = [
    { id: "huong-bluetech", displayName: "Huong" },
    { id: "mai-tram-bluetech", displayName: "Mai Tram" },
    { id: "quy-bluetech", displayName: "Quy" },
    { id: "lam-bluetech", displayName: "Lam" },
    { id: "quan-bluetech", displayName: "Quan" },
    { id: "quang-bluetech", displayName: "Quang" },
    { id: "minh-bluetech", displayName: "Minh" }
  ];
  const CEFR_TARGETS = [50, 150, 300, 500, 800];
  function getTier(masteredWords) {
    if (masteredWords >= 80) return "TIGER\u{1F525}";
    if (masteredWords >= 40) return "CUB\u{1F42F}";
    return "MOUSE\u{1F42D}";
  }
  __name(getTier, "getTier");
  const rankings = await Promise.all(STUDENTS.map(async (s2) => {
    const [streakRaw, srsRaw] = await Promise.all([
      env.NET_PET_KV.get(`streak:${s2.id}`).catch(() => null),
      env.NET_PET_KV.get(`srs_data_${s2.id}`).catch(() => null)
    ]);
    const streak = streakRaw ? JSON.parse(streakRaw) : { currentStreak: 0, totalDays: 0, longestStreak: 0 };
    let totalWords = 0;
    let masteredWords = 0;
    if (srsRaw) {
      try {
        const srsMap = JSON.parse(srsRaw);
        totalWords = Object.keys(srsMap).length;
        masteredWords = Object.values(srsMap).filter((w) => (w.repetitions || 0) >= 3).length;
      } catch (_2) {
      }
    }
    return {
      studentId: s2.id,
      displayName: s2.displayName,
      currentStreak: streak.currentStreak || 0,
      longestStreak: streak.longestStreak || 0,
      totalDays: streak.totalDays || 0,
      masteredWords,
      totalWords,
      tier: getTier(masteredWords)
    };
  }));
  rankings.sort((a, b) => b.totalDays - a.totalDays || b.masteredWords - a.masteredWords);
  rankings.forEach((r, i) => {
    r.rank = i + 1;
  });
  return addCors(json({ updatedAt: (/* @__PURE__ */ new Date()).toISOString(), rankings }), request);
}
__name(handleLeaderboard, "handleLeaderboard");
async function handleReferralRegister(body, request, env) {
  const { referrerStudentId, referredName, referredEmail } = body || {};
  if (!referrerStudentId || !referredName) {
    return addCors(json({ error: "referrerStudentId and referredName required" }, 400), request);
  }
  if (!env.NET_PET_KV) return addCors(json({ error: "NET_PET_KV not configured" }, 500), request);
  const code = `ref-${referrerStudentId}-${Date.now().toString(36)}`;
  const referral = {
    code,
    referrerStudentId,
    referredName,
    referredEmail: referredEmail || "",
    timestamp: Date.now(),
    converted: false
  };
  await env.NET_PET_KV.put(`referral:${code}`, JSON.stringify(referral), { expirationTtl: 90 * 24 * 60 * 60 });
  const listKey = `referral-list:${referrerStudentId}`;
  const existing = await env.NET_PET_KV.get(listKey).catch(() => null);
  const list = existing ? JSON.parse(existing) : [];
  list.push(code);
  await env.NET_PET_KV.put(listKey, JSON.stringify(list));
  const shareUrl = `/join?ref=${code}`;
  return addCors(json({ ok: true, code, shareUrl }), request);
}
__name(handleReferralRegister, "handleReferralRegister");
async function handleReferralStats(referrerStudentId, request, env) {
  if (!referrerStudentId) return addCors(json({ error: "referrerStudentId required" }, 400), request);
  if (!env.NET_PET_KV) return addCors(json({ error: "NET_PET_KV not configured" }, 500), request);
  const listRaw = await env.NET_PET_KV.get(`referral-list:${referrerStudentId}`).catch(() => null);
  const codes = listRaw ? JSON.parse(listRaw) : [];
  const referrals = await Promise.all(
    codes.map((c) => env.NET_PET_KV.get(`referral:${c}`).then((r) => r ? JSON.parse(r) : null).catch(() => null))
  );
  const valid = referrals.filter(Boolean);
  const converted = valid.filter((r) => r.converted).length;
  return addCors(json({
    referrerStudentId,
    totalReferrals: valid.length,
    converted,
    pending: valid.length - converted,
    referrals: valid
  }), request);
}
__name(handleReferralStats, "handleReferralStats");
async function handleReferralConvert(body, request, env) {
  const { code } = body || {};
  if (!code) return addCors(json({ error: "code required" }, 400), request);
  if (!env.NET_PET_KV) return addCors(json({ error: "NET_PET_KV not configured" }, 500), request);
  const raw2 = await env.NET_PET_KV.get(`referral:${code}`).catch(() => null);
  if (!raw2) return addCors(json({ error: "referral not found" }, 404), request);
  const referral = JSON.parse(raw2);
  referral.converted = true;
  referral.convertedAt = Date.now();
  await env.NET_PET_KV.put(`referral:${code}`, JSON.stringify(referral), { expirationTtl: 90 * 24 * 60 * 60 });
  return addCors(json({ ok: true }), request);
}
__name(handleReferralConvert, "handleReferralConvert");
async function handleVoiceScore(body, env) {
  const { studentId, word, audioBase64 } = body || {};
  if (!studentId || !word) return json({ error: "studentId and word required" }, 400);
  let transcript = null;
  let fallback = false;
  if (env.DEEPGRAM_API_KEY && audioBase64) {
    try {
      const audioBytes = Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0));
      const dgResp = await fetch("https://api.deepgram.com/v1/listen?model=nova-2&language=en-US", {
        method: "POST",
        headers: {
          "Authorization": `Token ${env.DEEPGRAM_API_KEY}`,
          "Content-Type": "audio/webm"
        },
        body: audioBytes
      });
      if (dgResp.ok) {
        const dgData = await dgResp.json();
        transcript = dgData?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
      }
    } catch (e) {
      fallback = true;
    }
  } else {
    fallback = true;
  }
  let score = 3;
  if (!fallback && transcript !== null) {
    const clean = /* @__PURE__ */ __name((t) => t.toLowerCase().replace(/[^a-z]/g, ""), "clean");
    if (clean(transcript) === clean(word)) score = 5;
    else if (clean(transcript).includes(clean(word))) score = 3;
    else score = 1;
  }
  const result = await seedVocab(studentId, word, "", "voice_score", env, score);
  if (!result.ok) return json({ error: "empty word" }, 400);
  return json({
    word,
    transcript: transcript ?? "[voice unavailable]",
    score,
    fallback,
    nextReview: result.next_review,
    message: score >= 4 ? "Great job! \u{1F525}" : score >= 3 ? "Good \u2014 keep practicing!" : "Keep trying! \u{1F4AA}"
  });
}
__name(handleVoiceScore, "handleVoiceScore");
async function handleMagicChat(body, request, env) {
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) return addCors(json({ error: "DEEPSEEK_API_KEY not configured" }, 500), request);
  const message = sanitizeInput((body.message || "").slice(0, 1e3));
  if (!message) return addCors(json({ error: "message required" }, 400), request);
  const studentId = body.studentId || "";
  let context = body.context || "";
  if (studentId && !context && env.NET_PET_KV) {
    try {
      const [streakRaw, srsRaw] = await Promise.all([
        env.NET_PET_KV.get(`streak:${studentId}`),
        env.NET_PET_KV.get(`srs_data_${studentId}`)
      ]);
      const streak = streakRaw ? JSON.parse(streakRaw) : { currentStreak: 0 };
      const now = Date.now();
      let dueWords = [];
      if (srsRaw) {
        const srsMap = JSON.parse(srsRaw);
        dueWords = Object.values(srsMap).filter((w) => (w.next_review || 0) <= now).slice(0, 5).map((w) => w.word).filter(Boolean);
      }
      context = `Student: ${studentId} | Streak: ${streak.currentStreak || 0} days${(streak.currentStreak || 0) >= 7 ? " \u{1F525}" : ""}
Due vocabulary: ${dueWords.join(", ") || "none"}
Teaching note: Weave due vocabulary into your response naturally. Acknowledge the streak if >= 7 days.`;
    } catch (_2) {
    }
  }
  if (studentId && env.NET_PET_KV) {
    try {
      const lang = await env.NET_PET_KV.get(`lang:${studentId}`);
      if (lang === "vi") {
        context = context + "\n\nVIETNAMESE MODE: Student is A1 beginner, needs bilingual support. Speak English first, then add Vietnamese translation in parentheses for key words and corrections. If student seems lost, say full sentence in Vietnamese then repeat in English. Prioritize understanding over English-only purity.";
      } else if (lang === "en") {
        context = context + "\n\nENGLISH-ONLY MODE: Student prefers English only. Keep language simple \u2014 elementary level. Use short sentences, common words. No Vietnamese.";
      }
    } catch (_2) {
    }
  }
  if (studentId && env.NET_PET_KV) {
    try {
      const profileRaw = await env.NET_PET_KV.get(`student_profile_${studentId}`);
      if (profileRaw) {
        const p = normalizeStudentProfile(JSON.parse(profileRaw));
        const profileLines = [];
        if (p.name) profileLines.push(`Name: ${p.name}`);
        if (p.level) profileLines.push(`Level: ${p.level}`);
        if (p.teachingFocus) profileLines.push(`TEACHING FOCUS: ${p.teachingFocus}`);
        if (p.primaryBlock) profileLines.push(`PRIMARY BLOCK: ${p.primaryBlock}`);
        if (p.fear_trigger) profileLines.push(`FEAR TRIGGER: ${p.fear_trigger}`);
        if (p.confidence_areas) profileLines.push(`CONFIDENCE AREAS: ${p.confidence_areas}`);
        if (p.breakthrough) profileLines.push(`LAST BREAKTHROUGH: ${p.breakthrough}`);
        if (p.goals) profileLines.push(`GOALS: ${p.goals}`);
        if (p.dailyPractice) profileLines.push(`DAILY PRACTICE: ${p.dailyPractice}`);
        if (p.parentNotes) profileLines.push(`PARENT NOTES: ${p.parentNotes}`);
        if (profileLines.length > 0) {
          context = context + "\n\nSTUDENT PROFILE (use this to personalize every response):\n" + profileLines.join("\n");
        }
      }
    } catch (_2) {
    }
  }
  if (studentId && env.NET_PET_KV) {
    try {
      const memRaw = await env.NET_PET_KV.get(`chat_memory:${studentId}`);
      if (memRaw) {
        const mem = JSON.parse(memRaw);
        const history = (mem.history || []).slice(-6);
        if (history.length > 0) {
          const memLines = history.map((h) => `${h.role === "user" ? "Student" : "Obi"}: ${h.content}`);
          context = context + "\n\nRECENT CONVERSATION (maintain continuity, reference past exchanges naturally):\n" + memLines.join("\n");
        }
      }
    } catch (_2) {
    }
  }
  try {
    const msgLower = message.toLowerCase();
    const keywordTriggers = [
      { kw: "faith", def: "Faith = repeated success + verifiable Ledger history. Not blind belief \u2014 earned trust through consistent action." },
      { kw: "sovereign", def: "Sovereign = Michael Hobbs (SOV100), ultimate authority in the hierarchy. Student profiles are sovereign-approved." },
      { kw: "ledger", def: "Ledger = immutable record of truth. All student progress in KV is authoritative. Never fabricate." },
      { kw: "mouse voice", def: "Mouse Voice = quiet, hesitant, apologetic communication. The opposite of Tiger Voice. Push volume and confidence." },
      { kw: "tiger voice", def: "Tiger Voice = loud, confident, direct communication. The goal state. Volume = confidence = fluency." },
      { kw: "shadow realm", def: "Shadow Realm = safe experimentation space. Try things here before validating in production." },
      { kw: "broken chain", def: "Broken Chain Protocol = when a pipeline step fails silently. Always verify handoffs between stages." },
      { kw: "thud factor", def: "Thud Factor = every response must land with impact. No filler, no hedging. Direct, warm, real." },
      { kw: "fail closed", def: "Fail Closed = when uncertain, halt and verify. Never guess. Better to ask than to assume." },
      { kw: "gospel 444", def: "Gospel 444 = core teaching methodology. 45min listening + 15min speaking daily. The non-negotiable deal." }
    ];
    const matched = keywordTriggers.filter((k) => msgLower.includes(k.kw));
    if (matched.length > 0) {
      const kwLines = matched.map((k) => `- ${k.kw.toUpperCase()}: ${k.def}`);
      context = context + "\n\nCANONICAL CONCEPTS DETECTED (reference these accurately if relevant):\n" + kwLines.join("\n");
    }
  } catch (_2) {
  }
  const systemContent = OBI_SYSTEM + (context ? `

${context}` : "");
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.85
    })
  });
  if (!res.ok) {
    const errText = await res.text();
    return addCors(json({ error: `DeepSeek ${res.status}`, detail: errText }, 502), request);
  }
  const data = await res.json();
  const reply = sanitizeObiResponse(data.choices?.[0]?.message?.content || "");
  if (studentId && reply && env.NET_PET_KV) {
    try {
      const memKey = `chat_memory:${studentId}`;
      const existingRaw = await env.NET_PET_KV.get(memKey);
      const existing = existingRaw ? JSON.parse(existingRaw) : { history: [], lastActive: 0 };
      const now = Date.now();
      existing.history.push({ role: "user", content: message.slice(0, 500), ts: now });
      existing.history.push({ role: "assistant", content: reply.slice(0, 500), ts: now });
      if (existing.history.length > 60) existing.history = existing.history.slice(-60);
      existing.lastActive = now;
      await env.NET_PET_KV.put(memKey, JSON.stringify(existing), { expirationTtl: 86400 * 90 });
    } catch (_2) {
    }
  }
  return addCors(json({ reply, studentId: studentId || null, contextInjected: !!context }), request);
}
__name(handleMagicChat, "handleMagicChat");
async function handleSoulDNACapture(body, env) {
  if (!body.text || typeof body.text !== "string" || body.text.length === 0) {
    return json({ error: "text required \u2014 verbatim dictation block" }, 400);
  }
  const verbatimText = body.text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const author = "sov100";
  const run = String(body.run || "").slice(0, 20) || "untagged";
  const blockId = String(body.blockId || "").slice(0, 50) || `auto-${Date.now()}`;
  const source = String(body.source || "").slice(0, 30) || "voice";
  const ts = Date.now();
  const payloadObj = {
    text: verbatimText,
    // THE SOUL — verbatim, untouched
    run,
    blockId,
    source,
    author,
    charCount: verbatimText.length,
    wordCount: verbatimText.split(/\s+/).filter(Boolean).length,
    capturedAt: new Date(ts).toISOString()
  };
  const payloadStr = JSON.stringify(payloadObj);
  if (!env.LEDGER) return json({ error: "LEDGER binding not configured" }, 500);
  const stub = env.LEDGER.get(env.LEDGER.idFromName(author));
  const appendRes = await stub.fetch(new Request("https://do/append", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId: author,
      eventType: "soul_dna_capture",
      payload: payloadStr
    })
  }));
  const appendData = await appendRes.json();
  return json({
    blockId,
    run,
    source,
    charCount: payloadObj.charCount,
    wordCount: payloadObj.wordCount,
    capturedAt: payloadObj.capturedAt,
    entryHash: appendData.entryHash,
    prevHash: appendData.prevHash,
    chainHead: appendData.entryHash,
    // caller can use this as prevHash for next block
    notionStatus: "BLACKLISTED \u2014 platform usage permanently disabled",
    ts
  });
}
__name(handleSoulDNACapture, "handleSoulDNACapture");
async function handleSoulDNAGet(url, env) {
  const run = url.searchParams.get("run") || "";
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 500);
  const raw2 = url.searchParams.get("raw") === "true";
  if (!env.LEDGER) return json({ error: "LEDGER binding not configured" }, 500);
  const stub = env.LEDGER.get(env.LEDGER.idFromName("sov100"));
  const histRes = await stub.fetch(
    new Request(`https://do/history?limit=${limit}&eventType=soul_dna_capture`)
  );
  const { entries, total } = await histRes.json();
  let blocks = entries.map((e) => {
    let p = {};
    try {
      p = JSON.parse(e.payload);
    } catch (_2) {
      p = { text: e.payload };
    }
    const block = {
      id: e.id,
      blockId: p.blockId || "",
      run: p.run || "untagged",
      source: p.source || "unknown",
      charCount: p.charCount || 0,
      wordCount: p.wordCount || 0,
      capturedAt: p.capturedAt || new Date(e.ts).toISOString(),
      entryHash: e.entry_hash,
      prevHash: e.prev_hash
    };
    if (raw2) block.text = p.text || "";
    return block;
  });
  if (run) blocks = blocks.filter((b) => b.run === run);
  const totalWords = blocks.reduce((sum, b) => sum + (b.wordCount || 0), 0);
  const totalChars = blocks.reduce((sum, b) => sum + (b.charCount || 0), 0);
  return json({ ok: true, blocks, totalBlocks: blocks.length, totalWords, totalChars, total });
}
__name(handleSoulDNAGet, "handleSoulDNAGet");
function extractLearningSignals(input, response) {
  const signals = { mistakes: [], vocabulary: [], phonics: [], topic: "" };
  const corrPatterns = [/(?:should be|correct(?:ion)?|instead of|say|use)\s+[""]([^""]+)[""]/gi, /→\s*(.+?)(?:\.|$)/gm];
  for (const pat of corrPatterns) {
    let m;
    while ((m = pat.exec(response)) !== null) {
      if (m[1]?.length > 2 && m[1].length < 100) signals.mistakes.push(m[1].trim());
    }
  }
  const vp = /[""](\w[\w\s]{1,30})[""]/g;
  let vm;
  while ((vm = vp.exec(response)) !== null) {
    if (vm[1] && !signals.mistakes.includes(vm[1])) signals.vocabulary.push(vm[1].trim());
  }
  signals.vocabulary = [...new Set(signals.vocabulary)].slice(0, 10);
  const phonicsKw = ["pronunciation", "sound", "phonics", "th ", "ch ", "sh ", "/r/", "/l/", "/\u03B8/", "/\xF0/"];
  if (phonicsKw.some((k) => response.toLowerCase().includes(k))) {
    signals.phonics = (response.match(/\/[^/]+\//g) || []).slice(0, 5);
  }
  signals.topic = input.split(/\s+/).filter((w) => w.length > 4).slice(0, 3).join(" ") || "general practice";
  return signals;
}
__name(extractLearningSignals, "extractLearningSignals");
function generateNextAction(studentState, signals) {
  const state = studentState?.state || "MOUSE";
  if (signals.mistakes.length > 0) {
    return { type: "REPEAT", instruction: `Repeat with correction: "${signals.mistakes[0]}"`, difficulty: 0 };
  }
  if (state === "MOUSE") return { type: "SPEAK", instruction: "Try saying one more sentence using any words you know", difficulty: -0.1 };
  if (state === "CUB") return { type: "PRACTICE", instruction: "Try using a new word from today's vocabulary in a sentence", difficulty: 0.1 };
  return { type: "CHALLENGE", instruction: "Create a longer response with more complex grammar", difficulty: 0.2 };
}
__name(generateNextAction, "generateNextAction");
async function logSoulEvent(env, studentId, sessionId, role, text) {
  if (env.SOUL_DB) {
    try {
      const ts = (/* @__PURE__ */ new Date()).toISOString();
      const existing = await env.SOUL_DB.prepare(
        "SELECT session_id FROM soul_sessions WHERE session_id = ?"
      ).bind(sessionId).first();
      if (!existing) {
        await env.SOUL_DB.prepare(
          "INSERT INTO soul_sessions (session_id, session_tag, source_format, source_date, ingested_at, prompt_count, raw_byte_size, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        ).bind(sessionId, studentId, "obi-live", ts, ts, 0, 0, "live").run();
      }
      const countRow = await env.SOUL_DB.prepare(
        "SELECT COUNT(*) as cnt FROM soul_prompts WHERE session_id = ?"
      ).bind(sessionId).first();
      const position = (countRow?.cnt || 0) + 1;
      const promptId = generateUUID();
      const byteCount = new TextEncoder().encode(text).length;
      const hash = await sha256(text);
      const markers = detectMarkers(text);
      await env.SOUL_DB.prepare(
        "INSERT INTO soul_prompts (prompt_id, session_id, position, text, estimated_timestamp, byte_count, hash_sha256, emotional_markers) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(promptId, sessionId, position, text, ts, byteCount, hash, markers).run();
      await env.SOUL_DB.prepare(
        "UPDATE soul_sessions SET prompt_count = prompt_count + 1 WHERE session_id = ?"
      ).bind(sessionId).run();
      return;
    } catch (err) {
      console.error(`[SOUL-D1] WRITE FAILED: ${err.message} (student=${studentId}, session=${sessionId}, role=${role})`);
    }
  }
  const url = (env.SOUL_LOGGER_URL || "https://soul-logger.mrmichaelhobbs123.workers.dev") + "/api/soul/event";
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5e3);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId, session_id: sessionId, role, text, timestamp: (/* @__PURE__ */ new Date()).toISOString() }),
      signal: ctrl.signal
    });
    clearTimeout(timer);
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error(`[SOUL-HTTP] FAILED ${res.status} from ${url}: ${errBody}`);
    }
  } catch (err) {
    clearTimeout(timer);
    console.error(`[SOUL-HTTP] FETCH ERROR: ${err.message} (student=${studentId}, session=${sessionId}, role=${role})`);
  }
}
__name(logSoulEvent, "logSoulEvent");
async function updateStudentMemory(studentId, env) {
}
__name(updateStudentMemory, "updateStudentMemory");
async function handleChat(body, env) {
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) return json({ error: "DEEPSEEK_API_KEY not configured" }, 500);
  const studentId = body.studentId || "anonymous";
  if (body._translateOnly) {
    const lastMsg = Array.isArray(body.messages) ? body.messages[body.messages.length - 1] : null;
    const textToTranslate = (lastMsg?.content || "").replace(/^Translate[^:]*:\s*/i, "").replace(/^"[^"]*"\s*/, "").trim();
    if (textToTranslate.length > 3) {
      try {
        const tr = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": "Bearer " + (env.OPENROUTER_API_KEY || ""), "Content-Type": "application/json" },
          body: JSON.stringify({ model: "openai/gpt-4o-mini", messages: [{ role: "user", content: `Translate to natural Vietnamese (1 sentence max, no quotes): ${textToTranslate}` }], max_tokens: 100, temperature: 0.3 })
        });
        if (tr.ok) {
          const td = await tr.json();
          const reply2 = (td.choices?.[0]?.message?.content || "").trim();
          if (reply2) return json({ reply: reply2 });
        }
      } catch (_2) {
      }
    }
    return json({ reply: "" });
  }
  if (studentId !== "anonymous") {
    const idCheck = validateStudentId(studentId);
    if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  }
  let messages = Array.isArray(body.messages) ? [...body.messages] : [];
  messages = messages.map((m) => {
    if (m.role === "user") return { ...m, content: sanitizeInput(m.content || "") };
    return m;
  }).filter((m) => m.role === "system" || m.role === "user" || m.role === "assistant");
  const isKnown = studentId !== "anonymous";
  const [ledgerR, sessionR, weaknessR, petR, soulR, kvR] = await Promise.allSettled([
    isKnown && env.LEDGER ? env.LEDGER.get(env.LEDGER.idFromName(studentId)).fetch(new Request("https://do/history?limit=15")).then((r) => r.json()) : Promise.resolve(null),
    isKnown && env.LEDGER ? env.LEDGER.get(env.LEDGER.idFromName(studentId)).fetch(new Request("https://do/history?limit=1&eventType=session_log")).then((r) => r.json()) : Promise.resolve(null),
    isKnown && env.PROFILES ? env.PROFILES.get(env.PROFILES.idFromName(studentId)).fetch(new Request("https://do/weakness/get")).then((r) => r.json()) : Promise.resolve(null),
    isKnown && env.PETS ? env.PETS.get(env.PETS.idFromName(studentId)).fetch(new Request("https://do/state")).then((r) => r.json()) : Promise.resolve(null),
    isKnown ? fetch(`${env.SOUL_LOGGER_URL || "https://soul-logger.mrmichaelhobbs123.workers.dev"}/api/soul/context/${studentId}`).then((r) => r.ok ? r.json() : null).catch(() => null) : Promise.resolve(null),
    isKnown ? Promise.all([env.NET_PET_KV.get(`lang:${studentId}`), env.NET_PET_KV.get(`student_profile_${studentId}`)]) : Promise.resolve([null, null])
  ]);
  let ledgerContext = "";
  const ledgerData = ledgerR.status === "fulfilled" ? ledgerR.value : null;
  if (ledgerData?.entries?.length > 0) {
    const lines = ledgerData.entries.filter((e) => e.event_type === "chat_exchange").slice(-10).map((e) => {
      try {
        const p = JSON.parse(e.payload);
        return `Student: ${p.user}
Obi: ${p.obi}`;
      } catch {
        return "";
      }
    }).filter(Boolean);
    if (lines.length > 0) ledgerContext = `

STUDENT LEDGER (${ledgerData.entries.length} total exchanges):
${lines.join("\n---\n")}`;
  }
  let sessionContext = "";
  const sessionData = sessionR.status === "fulfilled" ? sessionR.value : null;
  if (sessionData?.entries?.length > 0) {
    const lastEntry = sessionData.entries.slice(-1)[0];
    if (lastEntry) {
      const s2 = JSON.parse(lastEntry.payload);
      const dateStr = new Date(lastEntry.ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const vocabList = Array.isArray(s2.vocabList) ? s2.vocabList.join(", ") : s2.vocabList || "";
      sessionContext = `

LAST REAL CLASS (${dateStr}): Topic: "${s2.topic || ""}". Vocab: ${vocabList}. Level: ${s2.studentLevel || ""}. Notes: "${s2.teacherNotes || ""}".`;
    }
  }
  let weakPointsData = [];
  let weaknessContext = "";
  const weakData = weaknessR.status === "fulfilled" ? weaknessR.value : null;
  if (weakData) {
    weakPointsData = weakData.weakPoints || [];
    weaknessContext = buildWeaknessPrompt(weakPointsData);
  }
  let reEntryContext = "";
  let rewardContext = "";
  const petData = petR.status === "fulfilled" ? petR.value : null;
  if (petData) {
    const lastCheckin = petData.state?.lastCheckin || 0;
    const streakDays = petData.state?.streak || 0;
    if (lastCheckin > 0) reEntryContext = buildReEntryPrompt(Math.floor((Date.now() - lastCheckin) / 864e5), weakPointsData[0]?.specific || null);
    rewardContext = buildRewardPrompt(buildRewardSignals(weakPointsData, streakDays));
  }
  let soulContext = "";
  const soulData = soulR.status === "fulfilled" ? soulR.value : null;
  if (soulData?.context_brief) soulContext = `

SOUL CONTEXT:
${soulData.context_brief}`;
  let vietnameseContext = "";
  let teachingFocusContext = "";
  const kvData = kvR.status === "fulfilled" ? kvR.value : [null, null];
  const [lang, rawProfile] = kvData || [null, null];
  if (lang === "vi") vietnameseContext = `

VIETNAMESE MODE ACTIVE: After EVERY sentence add Vietnamese translation in parentheses. Example: "Nice work! (L\xE0m t\u1ED1t l\u1EAFm!) What topic? (B\u1EA1n ch\u1ECDn ch\u1EE7 \u0111\u1EC1 g\xEC?)" Every sentence \u2014 no exceptions.`;
  if (rawProfile) {
    try {
      const p = JSON.parse(rawProfile);
      const focus = p.teachingFocus || p.teaching_focus;
      if (focus) teachingFocusContext = `

TEACHER INSTRUCTION (follow exactly): ${focus}`;
    } catch {
    }
  }
  const isFirstSession = ledgerContext === "" && sessionContext === "";
  const displayName = isKnown ? studentId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "there";
  const firstSessionContext = isFirstSession ? `

FIRST SESSION: Student name is ${displayName}. Greet warmly by name. Wait for them to speak first. Under 2 sentences. Do not ask a question.` : "";
  const serverSystemContent = capContextInjection(OBI_SYSTEM, vietnameseContext, teachingFocusContext, firstSessionContext, ledgerContext, sessionContext, weaknessContext, reEntryContext, rewardContext, soulContext);
  const sysIdx = messages.findIndex((m) => m.role === "system");
  if (sysIdx >= 0) {
    messages[sysIdx] = { role: "system", content: serverSystemContent };
  } else {
    messages.unshift({ role: "system", content: serverSystemContent });
  }
  const dsAbort = new AbortController();
  const dsTimer = setTimeout(() => dsAbort.abort(), 15e3);
  let res;
  try {
    res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "deepseek-v4-flash", messages, max_tokens: 150, temperature: 0.85 }),
      signal: dsAbort.signal
    });
  } catch (e) {
    res = { ok: false, status: 0 };
  } finally {
    clearTimeout(dsTimer);
  }
  const needsFallback = !res.ok && (res.status === 0 || res.status === 401 || res.status === 402 || res.status === 403 || res.status === 429 || res.status >= 500);
  let data;
  if (needsFallback && env.OPENROUTER_API_KEY) {
    const orAbort = new AbortController();
    const orTimer = setTimeout(() => orAbort.abort(), 15e3);
    let orRes;
    try {
      orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${env.OPENROUTER_API_KEY}` },
        body: JSON.stringify({ model: "openai/gpt-4o-mini", messages, max_tokens: 150, temperature: 0.85 }),
        signal: orAbort.signal
      });
    } catch (e) {
      return json({ error: "AI_FALLBACK_TIMEOUT" }, 504);
    } finally {
      clearTimeout(orTimer);
    }
    if (!orRes.ok) {
      const errText = await orRes.text();
      return json({ error: `AI_FALLBACK_FAILED ${orRes.status}`, detail: errText }, 502);
    }
    data = await orRes.json();
  } else if (!res.ok) {
    const errText = await res.text();
    return json({ error: `DeepSeek ${res.status}`, detail: errText }, 502);
  } else {
    data = await res.json();
  }
  const choice = data.choices?.[0]?.message;
  let reply = sanitizeObiResponse(choice?.content || choice?.reasoning_content || "");
  const userMsg = messages.filter((m) => m.role === "user").pop()?.content || "";
  const sessionId = `${studentId}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`;
  if (studentId !== "anonymous" && env.LEDGER && userMsg) {
    const payload = JSON.stringify({ user: userMsg, obi: reply });
    appendToLedger(studentId, "chat_exchange", payload, env).catch(() => {
    });
  }
  if (studentId !== "anonymous" && userMsg) {
    logSoulEvent(env, studentId, sessionId, "user", userMsg).catch((err) => {
      console.error(`[SOUL] USER EVENT FAILED: ${err.message}`);
    });
  }
  if (studentId !== "anonymous") {
    logSoulEvent(env, studentId, sessionId, "assistant", reply).catch((err) => {
      console.error(`[SOUL] ASSISTANT EVENT FAILED: ${err.message}`);
    });
  }
  if (studentId !== "anonymous" && env.PROFILES) {
    const detected = extractWeaknesses(reply);
    if (detected.length > 0) {
      const profileStub = env.PROFILES.get(env.PROFILES.idFromName(studentId));
      profileStub.fetch(new Request("https://do/weakness/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, weaknesses: detected })
      })).catch(() => {
      });
    }
  }
  if (studentId !== "anonymous" && env.SESSIONS) {
    env.SESSIONS.get(env.SESSIONS.idFromName("system-roster")).fetch(new Request("https://do/roster/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId })
    })).catch(() => {
    });
  }
  if (studentId !== "anonymous") {
    updateStudentMemory(studentId, env).catch(() => {
    });
  }
  let driftScore = 0;
  let nextAction = null;
  let learningSignals = null;
  if (studentId !== "anonymous" && userMsg) {
    driftScore = 0;
    learningSignals = extractLearningSignals(userMsg, reply);
    nextAction = generateNextAction(null, learningSignals);
    if (env.SESSIONS) {
      const eventsStub = env.SESSIONS.get(env.SESSIONS.idFromName(`events-${studentId}`));
      eventsStub.fetch(new Request("https://do/events/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          input: userMsg,
          output: reply,
          mistakes: JSON.stringify(learningSignals.mistakes),
          vocabulary: JSON.stringify(learningSignals.vocabulary),
          phonics: JSON.stringify(learningSignals.phonics),
          topic: learningSignals.topic,
          nextAction: nextAction ? nextAction.instruction : "",
          driftScore
        })
      })).catch(() => {
      });
    }
    if (env.PROFILES) {
      const profileStub = env.PROFILES.get(env.PROFILES.idFromName(studentId));
      profileStub.fetch(new Request("https://do/state/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          hasMistakes: learningSignals.mistakes.length > 0,
          driftScore,
          inputLength: userMsg.length
        })
      })).catch(() => {
      });
    }
  }
  return json({
    reply,
    studentId,
    ledgerLoaded: !!ledgerContext,
    sessionLoaded: !!sessionContext,
    weaknessLoaded: !!weaknessContext,
    reEntryMode: !!reEntryContext,
    driftScore,
    nextAction,
    state: null,
    mouseTigerScore: null
  });
}
__name(handleChat, "handleChat");
async function handleVocabList(studentId, env) {
  if (!studentId) return json({ words: [], total: 0 });
  const idCheck = validateStudentId(studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  try {
    const raw2 = await env.NET_PET_KV.get("vocab_list_" + studentId);
    if (raw2) {
      const words = JSON.parse(raw2);
      return json({ words: words.slice(-50), total: words.length, source: "obi_voice" });
    }
  } catch (_2) {
  }
  return json({ words: [], total: 0 });
}
__name(handleVocabList, "handleVocabList");
function buildGreeting(profile, mode, lastTopic) {
  const name = (profile?.name || "").split(" ")[0] || "";
  const hi = name ? `Hey ${name}!` : "Hey!";
  if (mode === "phonics") return `${hi} Ready to drill some sounds? Let's warm up.`;
  if (mode === "study") return `${hi} What are we studying today?`;
  if (lastTopic) return `${hi} Last time we talked about ${lastTopic}. Want to keep going, or something new?`;
  return `${hi} I'm Obi. What's on your mind today? Just talk \u2014 no need to be perfect.`;
}
__name(buildGreeting, "buildGreeting");
function buildAgentPrompt(profile, lang, recentVocab = [], arc = null, mode = "free", memory = null, phonicsProgress = null) {
  const _name = profile?.fullName || profile?.name;
  const _level = profile?.englishLevel || profile?.level;
  const lvl = (_level || "").toLowerCase();
  const ctx = [
    _name ? `Student: ${_name}.` : "",
    _level ? `Level: ${_level}.` : "",
    profile?.goals ? `Goal: ${profile.goals}.` : "",
    profile?.primaryBlock ? `Current struggle: ${profile.primaryBlock}.` : "",
    profile?.breakthrough ? `Recent breakthrough: ${profile.breakthrough}.` : ""
  ].filter(Boolean).join(" ");
  const isBeginner = /a1|a2|beginner|elementary|mới|cơ/.test(lvl);
  const isAdvanced = /b2|c1|advanced|upper/.test(lvl);
  const levelInstr = isBeginner ? "BEGINNER: Use very simple words and short sentences. Celebrate every sentence they produce \u2014 even broken ones. Rephrase mistakes naturally, never directly correct. Build confidence first, accuracy comes later." : isAdvanced ? "ADVANCED: Challenge them. Ask complex follow-ups. Push for nuance. They can handle subtle corrections." : "INTERMEDIATE: Build confidence while pushing limits. Mix encouragement with challenge. Rephrase mistakes naturally.";
  const teachingInstr = profile?.teachingFocus ? `TEACHER INSTRUCTION (follow exactly): ${profile.teachingFocus}` : "";
  const sessionCtx = profile?.sessionNotes ? `LAST SESSION NOTES: ${profile.sessionNotes}` : "";
  const vocabCtx = recentVocab.length > 0 ? `RECENTLY LEARNED (weave naturally, don't quiz): ${recentVocab.join(", ")}` : "";
  const arcCtx = arc ? `ACTIVE ARC \u2014 Unit: ${arc.unit} | Topic: ${arc.topic} | Drill these words naturally: ${(arc.targets || []).join(", ")}${arc.pronunciation ? ` | Pronunciation focus: ${arc.pronunciation}` : ""}` : "";
  const memoryCtx = memory ? `MEMORY CONTEXT (Cross-session relationship): Session #${memory.session_count || 1}. ${memory.world_model ? `Student vibe: ${memory.world_model}.` : ""} ${memory.last_topic ? `Last time: ${memory.last_topic}.` : ""} ${memory.breakthroughs?.length ? `Recent wins: ${memory.breakthroughs.slice(0, 3).join("; ")}.` : ""} ${memory.struggles?.length ? `Persistent issues: ${memory.struggles.slice(0, 3).join("; ")}.` : ""} Use this to personalize tone and topic continuity.` : "";
  const companyCtx = profile?.company ? `ANCHOR IN REAL WORK: Student works at ${profile.company}. Ask them to share an actual email, Slack message, or meeting note they need help with. Practice with real materials \u2014 not invented scenarios.` : "";
  const funcInstr = "FUNCTION: When the student successfully uses a new English word in a sentence \u2014 not just repeats it but actually USES it \u2014 call save_vocabulary_word with that word. Do this silently, mid-conversation. Max 2 saves per session.";
  const viMode = lang === "vi" ? `VOICE OUTPUT LANGUAGE: ENGLISH ONLY. NEVER produce Vietnamese words, phrases, syllables, or translations in any spoken response. Your TTS engine is English-only and will mangle Vietnamese phonetics. If student speaks Vietnamese, understand it fully but ALWAYS reply in English only. No exceptions. No parenthetical translations in voice. No Vietnamese greetings. No Vietnamese encouragement phrases.` : "";
  const faceSaving = [
    "FACE-SAVING (Vietnamese culture \u2014 non-negotiable):",
    "- NEVER say 'Wrong', 'No', 'Incorrect'. These cause shame and silence.",
    "- RECAST: echo correct form naturally in your reply. Student: 'I go store yesterday' \u2192 OBI: 'Oh you WENT to the store! What did you buy?'",
    "- Celebrate volume and attempt. Max 1 correction per 5 turns.",
    "- 3s+ silence: 'Take your time. Try saying: [simple phrase]'"
  ].join("\n");
  let modeInstr = "";
  if (mode === "phonics") {
    const currentGroupName = phonicsProgress?.group_name || "SATNIP";
    const drillSentence = phonicsProgress?.next_drill?.sentence || null;
    const drillTip = phonicsProgress?.next_drill?.tip || null;
    const focusError = phonicsProgress?.dominant_errors?.[0] || null;
    const sessionsPhonicsDone = phonicsProgress?.drills_completed?.length || phonicsProgress?.drill_count || phonicsProgress?.session_count_phonics || 0;
    modeInstr = [
      "MODE: NET PHONICS \u2014 Natural English Training sound system (42 sounds, 7 groups).",
      `CURRENT GROUP: ${currentGroupName} \u2014 work within this group today.`,
      "THE 7 GROUPS IN ORDER: SATNIP \u2192 DRUMBLE \u2192 HOGFEZ \u2192 WYVEX \u2192 CHUSHANG \u2192 BEEHIVE \u2192 OYSTER",
      "FOCUS: Pronunciation accuracy. One sound at a time. Specific mouth feedback.",
      drillSentence ? `TODAY'S DRILL SENTENCE: "${drillSentence}"` : "",
      drillTip ? `ARTICULATION TIP: ${drillTip}` : "",
      focusError ? `STUDENT'S KNOWN FOCUS ERROR: ${focusError} \u2014 watch for this specifically.` : "",
      phonicsProgress?.weak_phonemes?.length ? `WEAK PHONEMES (< 50% mastery): /${phonicsProgress.weak_phonemes.join("/, /")}/ \u2014 prioritise these over already-strong sounds.` : "",
      sessionsPhonicsDone > 0 ? `This student has completed ${sessionsPhonicsDone} phonics drills so far.` : "First phonics session \u2014 start gently.",
      "BEHAVIOR:",
      "- Give the drill sentence above. Ask them to repeat it.",
      "- After each attempt: give SPECIFIC feedback \u2014 tongue position, lip shape, airflow. Name the exact mouth movement.",
      '- Celebrate correct sound production immediately. Recast errors naturally \u2014 never say "wrong".',
      "- Max 5 drills per session before suggesting a break.",
      "- NEVER move on until the target sound is produced correctly at least once.",
      "- Vietnamese L1 priorities: /r/ not /l/, /f/ not /ph/, /w/ vs /v/ are different muscles, /\u03B8/ = tongue between teeth (not /t/ or /s/), final consonant deletion (do NOT drop word endings), vowel length (/i\u02D0/ vs /\u026A/ are different words)."
    ].filter(Boolean).join("\n");
  } else if (mode === "study") {
    modeInstr = [
      "MODE: LOG-HOME-STUDY.",
      "FOCUS: Structured learning with homework tracking and progress logging.",
      "BEHAVIOR:",
      "- Ask what they studied since last session. Log their answer.",
      "- Review previous homework assignments. Ask for completion status.",
      '- Assign NEW homework: specific, measurable, time-bound (e.g., "Record yourself saying these 5 sentences tonight").',
      "- Track streaks and consistency. Celebrate daily practice.",
      "- Reference their goals and primaryBlock from profile.",
      "- End every session with a clear next-step assignment."
    ].join("\n");
  } else {
    modeInstr = "";
  }
  return [
    `You are OBI \u2014 Michael Hobbs in AI form. High-energy, anti-shame, tough love. Volume and velocity beat grammar. Mouse Voice \u2192 Tiger Voice. Coach, not textbook.${_name ? ` Student: ${_name}.` : ""}`,
    modeInstr,
    mode === "phonics" ? `FIRST RESPONSE (PHONICS OPENING): Brief warm greeting (max 6 words), then immediately deliver the drill. Say: "Let's work on your ${phonicsProgress?.group_name || "sounds"} today. Try this sentence: '${phonicsProgress?.next_drill?.sentence || "She sat next to me at the station."}'" \u2014 wait for them to try. Do NOT ask what they want to talk about.` : "FIRST RESPONSE SPEED: Your ENTIRE first reply must be ONE short sentence (under 10 words) that BOTH acknowledges what they said AND moves the conversation forward. Example: 'Nice \u2014 tell me more!' or 'Love that \u2014 what happened next?' Never say just 'Great!' or 'Nice!' alone. One sentence only, then stop.",
    "1-3 sentences MAX. React to what they said. One sharp follow-up question. Never lecture. A1/A2 students: max 2 sentences, ultra-simple words only.",
    ctx,
    levelInstr,
    faceSaving,
    sessionCtx,
    vocabCtx,
    arcCtx,
    memoryCtx,
    companyCtx,
    mode !== "phonics" ? "SESSION OPENING: If LAST SESSION NOTES exist, your FIRST message MUST reference something specific from those notes. Ask about a word they learned, a topic they discussed, or progress they made. Never open with a generic 'what do you want to talk about?' when you have session history. Example: 'Last time you practiced breakfast, lunch, dinner \u2014 can you use them in a sentence today?' This shows the student you remember them." : "",
    'SESSION CLOSE: When conversation winds down naturally or student says bye, give a SPECIFIC micro-win ("You just used [actual word from session] in a real sentence!") then a forward hook ("Next session: we go deeper on [specific topic based on their level]."). Never give a flat goodbye.',
    funcInstr,
    teachingInstr,
    viMode
  ].filter(Boolean).join("\n");
}
__name(buildAgentPrompt, "buildAgentPrompt");
async function handleTTS(body, env) {
  const apiKey = env.DEEPGRAM_API_KEY;
  if (!apiKey) return json({ error: "DEEPGRAM_API_KEY not configured" }, 500);
  const text = sanitizeInput((body.text || "").slice(0, 1e3));
  if (!text) return json({ error: "No text provided" }, 400);
  const res = await fetch("https://api.deepgram.com/v1/speak?model=aura-orion-en", {
    method: "POST",
    headers: { "Authorization": `Token ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  if (!res.ok) return json({ error: `Deepgram TTS ${res.status}` }, 502);
  return new Response(res.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=3600", ...corsHeaders() } });
}
__name(handleTTS, "handleTTS");
var CORRECT_PROMPT = `You are OBI, a strict but warm English coach for Vietnamese students.

TASK: The student spoke a sentence. You must:
1. Correct ANY grammar, vocabulary, or phrasing errors
2. Explain the mistake simply (1 sentence max, use Vietnamese translation if it helps)
3. Give the corrected sentence for them to repeat

RULES:
- If the sentence is already correct, say so and give a slightly more advanced version to try
- Keep explanations SHORT \u2014 max 1-2 sentences
- Be encouraging, never shaming
- Focus on the MOST IMPORTANT error first, not every tiny detail

RESPOND IN EXACTLY THIS JSON FORMAT (no markdown, no extra text):
{"corrected":"the corrected sentence","explanation":"why it was wrong, simply","repeat":"say this sentence out loud","wasCorrect":false}

If correct:
{"corrected":"their original sentence","explanation":"Perfect! Here's a challenge version:","repeat":"a slightly harder version","wasCorrect":true}`;
async function handleCorrect(body, env) {
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) return json({ error: "DEEPSEEK_API_KEY not configured" }, 500);
  const studentId = body.studentId || "anonymous";
  const transcript = sanitizeInput((body.transcript || body.message || "").slice(0, 500));
  if (!transcript) return json({ error: "No speech transcript provided" }, 400);
  let mistakeContext = "";
  if (studentId !== "anonymous" && env.LEDGER) {
    try {
      const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
      const histRes = await stub.fetch(new Request("https://do/history?limit=10&eventType=correction"));
      const histData = await histRes.json();
      const past = (histData.entries || []).map((e) => {
        try {
          const p = JSON.parse(e.payload);
          return p.original;
        } catch {
          return "";
        }
      }).filter(Boolean);
      if (past.length > 0) {
        mistakeContext = `

STUDENT'S PAST MISTAKES (they keep getting these wrong \u2014 watch for patterns):
${past.slice(-5).map((m) => `- "${m}"`).join("\n")}`;
      }
    } catch (err) {
      console.log("[CORRECT] ledger fetch failed:", err.message);
    }
  }
  let weakContext = "";
  if (studentId !== "anonymous" && env.PROFILES) {
    try {
      const profileStub = env.PROFILES.get(env.PROFILES.idFromName(studentId));
      const wpRes = await profileStub.fetch(new Request("https://do/weakness/get"));
      const wpData = await wpRes.json();
      weakContext = buildWeaknessPrompt(wpData.weakPoints || []);
    } catch (err) {
      console.log("[CORRECT] weakness fetch failed:", err.message);
    }
  }
  const messages = [
    { role: "system", content: CORRECT_PROMPT + mistakeContext + weakContext },
    { role: "user", content: transcript }
  ];
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({ model: "deepseek-v4-flash", messages, max_tokens: 200, temperature: 0.3 })
  });
  if (!res.ok) {
    const errText = await res.text();
    return json({ error: `DeepSeek ${res.status}`, detail: errText }, 502);
  }
  const data = await res.json();
  const raw2 = data.choices?.[0]?.message?.content || "";
  let result;
  try {
    const cleaned = raw2.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    result = JSON.parse(cleaned);
  } catch {
    result = { corrected: raw2, explanation: "", repeat: raw2, wasCorrect: false };
  }
  if (studentId !== "anonymous" && env.LEDGER) {
    const payload = JSON.stringify({ original: transcript, corrected: result.corrected, wasCorrect: result.wasCorrect });
    appendToLedger(studentId, "correction", payload, env).catch(() => {
    });
  }
  if (studentId !== "anonymous" && env.PROFILES && !result.wasCorrect) {
    const detected = extractWeaknesses(result.explanation + " " + result.corrected);
    if (detected.length > 0) {
      const profileStub = env.PROFILES.get(env.PROFILES.idFromName(studentId));
      profileStub.fetch(new Request("https://do/weakness/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, weaknesses: detected })
      })).catch(() => {
      });
    }
  }
  if (studentId !== "anonymous" && env.PETS) {
    const petStub = env.PETS.get(env.PETS.idFromName(studentId));
    petStub.fetch(new Request("https://do/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ minutes: 1, confidence: result.wasCorrect ? 7 : 4 })
    })).catch(() => {
    });
  }
  return json({ ...result, original: transcript, studentId });
}
__name(handleCorrect, "handleCorrect");
async function handleRepeat(body, env) {
  const studentId = body.studentId || "anonymous";
  const attempt = sanitizeInput((body.attempt || "").slice(0, 500));
  const expected = sanitizeInput((body.expected || "").slice(0, 500));
  if (!attempt || !expected) return json({ error: "attempt and expected required" }, 400);
  const norm = /* @__PURE__ */ __name((s2) => s2.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim(), "norm");
  const a = norm(attempt);
  const e = norm(expected);
  const eWords = e.split(" ");
  const aWords = a.split(" ");
  let matches2 = 0;
  for (let i = 0; i < eWords.length; i++) {
    if (aWords[i] === eWords[i]) matches2++;
  }
  const score = eWords.length > 0 ? Math.round(matches2 / eWords.length * 100) : 0;
  const passed = score >= 80;
  if (studentId !== "anonymous" && env.LEDGER) {
    const payload = JSON.stringify({ attempt, expected, score, passed });
    appendToLedger(studentId, "repeat_attempt", payload, env).catch(() => {
    });
  }
  let feedback;
  if (score === 100) feedback = "Perfect! You nailed it. \u{1F525}";
  else if (score >= 80) feedback = "Close enough! Good job. Keep that sentence in your brain.";
  else if (score >= 50) feedback = "Almost \u2014 try again. Listen carefully to the corrected version.";
  else feedback = "Not quite. Listen to the sentence again, then repeat slowly.";
  return json({ passed, score, feedback, attempt, expected, studentId });
}
__name(handleRepeat, "handleRepeat");
async function handleMistakes(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  if (!env.LEDGER) return json({ error: "LEDGER not configured" }, 500);
  const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
  const histRes = await stub.fetch(new Request("https://do/history?limit=50&eventType=correction"));
  const histData = await histRes.json();
  const mistakes = (histData.entries || []).map((e) => {
    try {
      const p = JSON.parse(e.payload);
      return { original: p.original, corrected: p.corrected, wasCorrect: p.wasCorrect, ts: e.ts };
    } catch {
      return null;
    }
  }).filter(Boolean);
  const errorRate = mistakes.length > 0 ? Math.round(mistakes.filter((m) => !m.wasCorrect).length / mistakes.length * 100) : 0;
  return json({ studentId, mistakes, total: mistakes.length, errorRate });
}
__name(handleMistakes, "handleMistakes");
async function handleParentReport(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  let profile = null, petState = null, mistakeCount = 0, lastActive = 0;
  if (env.PROFILES) {
    try {
      const stub = env.PROFILES.get(env.PROFILES.idFromName(studentId));
      const res = await stub.fetch(new Request("https://do/profile"));
      const data = await res.json();
      profile = data.profile;
    } catch (_2) {
    }
  }
  if (env.PETS) {
    try {
      const stub = env.PETS.get(env.PETS.idFromName(studentId));
      const res = await stub.fetch(new Request("https://do/state"));
      const data = await res.json();
      petState = data.state;
      lastActive = petState?.lastCheckin || 0;
    } catch (_2) {
    }
  }
  if (env.LEDGER) {
    try {
      const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
      const res = await stub.fetch(new Request("https://do/history?limit=100&eventType=correction"));
      const data = await res.json();
      mistakeCount = (data.entries || []).filter((e) => {
        try {
          return !JSON.parse(e.payload).wasCorrect;
        } catch {
          return false;
        }
      }).length;
    } catch (_2) {
    }
  }
  const daysSinceActive = lastActive > 0 ? Math.floor((Date.now() - lastActive) / 864e5) : -1;
  const alert = daysSinceActive > 1 ? `Student has not practiced for ${daysSinceActive} days` : null;
  return json({
    studentId,
    name: profile?.full_name || studentId,
    streak: petState?.streak || 0,
    totalSessions: petState?.total_sessions || 0,
    xp: petState?.xp || 0,
    mistakeCount,
    daysSinceActive,
    alert,
    level: profile?.english_level || "Unknown"
  });
}
__name(handleParentReport, "handleParentReport");
async function handleTeacherDashboard(env) {
  if (!env.SESSIONS) return json({ error: "SESSIONS not configured" }, 500);
  const rosterStub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
  const rosterRes = await rosterStub.fetch(new Request("https://do/roster/flags"));
  const rosterData = await rosterRes.json();
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1e3;
  const allFlags = rosterData.flags || [];
  const dropoffRisk = allFlags.filter((s2) => s2.last_active > 0 && s2.last_active < sevenDaysAgo);
  return json({
    totalStudents: rosterData.count || 0,
    flaggedStudents: allFlags.length,
    dropoffRisk: dropoffRisk.map((s2) => ({ studentId: s2.student_id, lastActive: s2.last_active, daysSince: Math.floor((Date.now() - s2.last_active) / 864e5) })),
    roster: allFlags.map((s2) => ({ studentId: s2.student_id, fullName: s2.full_name, level: s2.level, lastActive: s2.last_active }))
  });
}
__name(handleTeacherDashboard, "handleTeacherDashboard");
async function handleOnboarding(body, env) {
  if (!body.studentId || typeof body.studentId !== "string") return json({ error: "studentId required" }, 400);
  const studentId = body.studentId.trim();
  const profile = {
    fullName: body.fullName || body.studentId,
    englishLevel: body.englishLevel || body.level || "pending",
    currentCity: body.currentCity || "",
    segment: body.segment || "",
    source: body.source || "onboarding",
    assessmentRef: body.assessmentRef || "",
    level_status: "pending_review",
    studyGoal: body.studyGoal || "",
    notifications: body.notifications || {},
    vocab: body.vocab || [],
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (env.NET_PET_KV) {
    try {
      await env.NET_PET_KV.put(`student_profile_${body.studentId}`, JSON.stringify(profile));
    } catch (err) {
      console.error(`[ONBOARDING] KV write failed for ${body.studentId}:`, err.message);
    }
  }
  if (env.LEDGER) {
    const payload = JSON.stringify({ fullName: body.fullName, englishLevel: body.englishLevel, city: body.currentCity });
    appendToLedger(body.studentId, "onboarding", payload, env).catch(() => {
    });
  }
  await upsertRoster(body.studentId, { fullName: body.fullName, englishLevel: body.englishLevel }, env).catch(() => {
  });
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(env.SESSION_SECRET || "phoenix-fallback-dev-key"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const canonicalId = (body.studentId || "").toLowerCase();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(canonicalId));
  const studentToken = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
  const portalMap = {
    "quy-bluetech": "/quy-portal.html?studentId=quy-bluetech",
    "huong-bluetech": "/huong-portal.html?studentId=huong-bluetech",
    "mai-tram-bluetech": "/mai-tram-portal.html?studentId=mai-tram-bluetech",
    "mai-tram": "/mai-tram-portal.html?studentId=mai-tram-bluetech",
    "quan-bluetech": "/quan-portal.html?studentId=quan-bluetech",
    "quan-nguyen": "/quan-portal.html?studentId=quan-bluetech",
    "quang-bluetech": "/quang-portal.html?studentId=quang-bluetech",
    "quang-nguyen": "/quang-portal.html?studentId=quang-bluetech",
    "minh-bluetech": "/minh-portal.html?studentId=minh-bluetech",
    "minh-private": "/minh-portal.html?studentId=minh-bluetech"
  };
  const canonicalStudentId = portalMap[studentId] ? studentId.toLowerCase() : studentId;
  const portal_url = portalMap[canonicalStudentId] || null;
  const resData = { ok: true, portal_url };
  return json({ ...resData, studentId: canonicalStudentId, studentToken, redirect: "/magic-chat.html?studentId=" + encodeURIComponent(canonicalStudentId) + "&taster=1" });
}
__name(handleOnboarding, "handleOnboarding");
async function _verifyStudentToken(studentId, token, env) {
  if (!token) return false;
  const canonicalId = (studentId || "").toLowerCase();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(env.SESSION_SECRET || "phoenix-fallback-dev-key"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(canonicalId));
  const expected = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return expected === token;
}
__name(_verifyStudentToken, "_verifyStudentToken");
async function handleMemorySave(body, env, request) {
  const studentId = body.studentId || "unknown";
  const idCheck = validateStudentId(studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  const token = request?.headers?.get("X-Student-Token") || body._token || "";
  if (token) {
    const tokenValid = await _verifyStudentToken(studentId, token, env);
    if (!tokenValid) {
      logWarn("MEMORY_SAVE_TOKEN_INVALID", { studentId }, env);
      return json({ error: "Invalid student token", code: "TOKEN_INVALID" }, 401);
    }
  }
  try {
    if (env.STUDENT_MEMORY && body.exchange) {
      const raw2 = await env.STUDENT_MEMORY.get(`mem:${studentId}`);
      const existing = raw2 ? JSON.parse(raw2) : { world_model: "", recent_vocab: [], session_count: 0, last_topic: "", breakthroughs: [], struggles: [] };
      if (body.exchange.user) existing.last_topic = body.exchange.user.slice(0, 200);
      existing.session_count = (existing.session_count || 0) + 1;
      existing.updated_at = (/* @__PURE__ */ new Date()).toISOString();
      const serialized = JSON.stringify(existing);
      if (serialized.length <= 10240) {
        await env.STUDENT_MEMORY.put(`mem:${studentId}`, serialized);
      }
      return json({ ok: true, session_count: existing.session_count });
    }
  } catch (err) {
    console.error(`[MEMORY_SAVE] KV write failed for ${studentId}:`, err.message);
  }
  return json({ ok: true, note: "memory saved (fallback)" });
}
__name(handleMemorySave, "handleMemorySave");
async function handleMemoryGet(studentId, env, request) {
  if (!studentId) return json({ memory: [] });
  const idCheck = validateStudentId(studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  const token = request?.headers?.get("X-Student-Token") || request?.url && new URL(request.url).searchParams.get("_token") || "";
  if (token) {
    const tokenValid = await _verifyStudentToken(studentId, token, env);
    if (!tokenValid) {
      console.log(`[MEMORY_GET] Invalid token for ${studentId} \u2014 returning empty memory`);
      return json({ memory: [] });
    }
  } else {
    console.log(`[MEMORY_GET] No token for ${studentId} \u2014 returning empty memory (portal student)`);
  }
  try {
    if (env.STUDENT_MEMORY) {
      const raw2 = await env.STUDENT_MEMORY.get(`mem:${studentId}`);
      if (raw2) {
        const mem = JSON.parse(raw2);
        return json({ memory: [], world_model: mem.world_model || "", recent_vocab: mem.recent_vocab || [], session_count: mem.session_count || 0 });
      }
    }
  } catch (err) {
    console.error(`[MEMORY_GET] KV read failed for ${studentId}:`, err.message);
  }
  try {
    if (env.SESSIONS) {
      const stub = env.SESSIONS.get(env.SESSIONS.idFromName(studentId));
      return stub.fetch(new Request("https://do/memory/get"));
    }
  } catch (err) {
    console.error(`[MEMORY_GET] SESSIONS DO failed for ${studentId}:`, err.message);
  }
  return json({ memory: [] });
}
__name(handleMemoryGet, "handleMemoryGet");
async function handleProgress(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  const profileStub = env.PROFILES.get(env.PROFILES.idFromName(studentId));
  const progressRes = await profileStub.fetch(new Request("https://do/progress"));
  const progressData = await progressRes.json();
  let petState = null;
  try {
    const petStub = env.PETS.get(env.PETS.idFromName(studentId));
    const petRes = await petStub.fetch(new Request("https://do/state"));
    const petData = await petRes.json();
    petState = petData.state || null;
  } catch (_2) {
  }
  const signals = buildRewardSignals(progressData.weakPoints || [], petState?.streak || 0);
  return json({ weakPoints: progressData.weakPoints, profile: progressData.profile, pet: petState, rewardSignals: signals });
}
__name(handleProgress, "handleProgress");
async function handleLesson(body, env) {
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) return json({ error: "DEEPSEEK_API_KEY not configured" }, 500);
  const prompt = `You are OBI. Generate a short English lesson for level ${body.level || "B1"} on topic: "${body.topic || "daily conversation"}". Practical, energetic, under 200 words. 3 example sentences, 1 mini exercise. Anti-shame style. Mouse to Tiger framing.`;
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${env.DEEPSEEK_API_KEY}` },
    body: JSON.stringify({ model: "deepseek-v4-flash", messages: [{ role: "system", content: OBI_SYSTEM }, { role: "user", content: prompt }], max_tokens: 500, temperature: 0.7 })
  });
  if (!res.ok) return json({ error: `DeepSeek ${res.status}` }, 502);
  const data = await res.json();
  const lesson = data.choices?.[0]?.message?.content || "Lesson generation failed";
  if (body.studentId && env.LEDGER) appendToLedger(body.studentId, "lesson_generated", JSON.stringify({ topic: body.topic, level: body.level }), env).catch(() => {
  });
  return json({ lesson });
}
__name(handleLesson, "handleLesson");
async function handlePractice(body, env) {
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) return json({ error: "DEEPSEEK_API_KEY not configured" }, 500);
  const prompt = `You are OBI. Create a quick English practice drill for level ${body.level || "B1"} on topic: "${body.topic || "daily conversation"}". Give 5 short exercises. Tiger Voice style.`;
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${env.DEEPSEEK_API_KEY}` },
    body: JSON.stringify({ model: "deepseek-v4-flash", messages: [{ role: "system", content: OBI_SYSTEM }, { role: "user", content: prompt }], max_tokens: 400, temperature: 0.7 })
  });
  if (!res.ok) return json({ error: `DeepSeek ${res.status}` }, 502);
  const data = await res.json();
  return json({ practice: data.choices?.[0]?.message?.content || "Practice generation failed" });
}
__name(handlePractice, "handlePractice");
async function handleFeedback(body, env) {
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) return json({ error: "DEEPSEEK_API_KEY not configured" }, 500);
  const studentText = sanitizeInput((body.studentResponse || "").slice(0, 500));
  if (!studentText) return json({ error: "studentResponse required" }, 400);
  const prompt = `A Vietnamese English student wrote: "${studentText}"

Give OBI-style coaching:
1. One genuine encouragement
2. One natural correction (show better version, no grammar rules)
3. One Tiger push

Max 4 sentences. Anti-shame. Tiger Voice.`;
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${env.DEEPSEEK_API_KEY}` },
    body: JSON.stringify({ model: "deepseek-v4-flash", messages: [{ role: "system", content: OBI_SYSTEM }, { role: "user", content: prompt }], max_tokens: 300, temperature: 0.75 })
  });
  if (!res.ok) return json({ error: `DeepSeek ${res.status}` }, 502);
  const data = await res.json();
  const feedback = data.choices?.[0]?.message?.content || "Feedback generation failed";
  if (body.studentId && env.LEDGER) appendToLedger(body.studentId, "feedback", JSON.stringify({ input: studentText, feedback }), env).catch(() => {
  });
  return json({ feedback });
}
__name(handleFeedback, "handleFeedback");
async function handlePetCheckin(body, env) {
  if (!body.studentId) return json({ error: "studentId required" }, 400);
  const stub = env.PETS.get(env.PETS.idFromName(body.studentId));
  const res = await stub.fetch(new Request("https://do/checkin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
  const data = await res.clone().json();
  if (env.LEDGER && data.ok) {
    const payload = JSON.stringify({ minutes: body.minutes, confidence: body.confidence, streak: data.state?.streak, xp: data.state?.xp, mood: data.state?.mood, milestone: data.milestone || null });
    appendToLedger(body.studentId, "pet_checkin", payload, env).catch(() => {
    });
  }
  return res;
}
__name(handlePetCheckin, "handlePetCheckin");
async function handlePetState(studentId, env) {
  if (!studentId) return json({ state: null, error: "studentId required" }, 400);
  const stub = env.PETS.get(env.PETS.idFromName(studentId));
  return stub.fetch(new Request("https://do/state"));
}
__name(handlePetState, "handlePetState");
async function handlePetScore(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  const stub = env.PETS.get(env.PETS.idFromName(studentId));
  return stub.fetch(new Request("https://do/score"));
}
__name(handlePetScore, "handlePetScore");
async function handleDrillNext(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  let weakPoints = [];
  if (env.PROFILES) {
    try {
      const stub = env.PROFILES.get(env.PROFILES.idFromName(studentId));
      const res = await stub.fetch(new Request("https://do/weakness/get"));
      const data = await res.json();
      weakPoints = (data.weakPoints || []).map((w) => w.category);
    } catch (_2) {
    }
  }
  const { PHONICS_DRILLS: PHONICS_DRILLS2 } = await Promise.resolve().then(() => (init_phonics_drills(), phonics_drills_exports));
  let matched = [];
  if (weakPoints.length > 0) {
    for (const drill2 of PHONICS_DRILLS2) {
      if (drill2.targetErrors.some((e) => weakPoints.includes(e))) {
        matched.push(drill2);
      }
    }
  }
  if (matched.length === 0) matched = PHONICS_DRILLS2;
  const drill = matched[Math.floor(Math.random() * matched.length)];
  return json({ drill, matchedToWeakness: weakPoints.length > 0 && matched.length < PHONICS_DRILLS2.length, studentId });
}
__name(handleDrillNext, "handleDrillNext");
async function handleDrillResult(body, env) {
  const studentId = body.studentId || "anonymous";
  if (!body.drillId || !body.attempt) return json({ error: "drillId and attempt required" }, 400);
  const { PHONICS_DRILLS: PHONICS_DRILLS2 } = await Promise.resolve().then(() => (init_phonics_drills(), phonics_drills_exports));
  const drill = PHONICS_DRILLS2.find((d) => d.id === body.drillId);
  if (!drill) return json({ error: "drill not found" }, 404);
  const norm = /* @__PURE__ */ __name((s2) => s2.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim(), "norm");
  const expected = norm(drill.sentence);
  const attempt = norm(body.attempt);
  const eWords = expected.split(" ");
  const aWords = attempt.split(" ");
  let matches2 = 0;
  for (let i = 0; i < eWords.length; i++) {
    if (aWords[i] === eWords[i]) matches2++;
  }
  const score = eWords.length > 0 ? Math.round(matches2 / eWords.length * 100) : 0;
  const passed = score >= 80;
  if (studentId !== "anonymous" && env.LEDGER) {
    const payload = JSON.stringify({ drillId: body.drillId, sentence: drill.sentence, attempt: body.attempt, score, passed, group: drill.group, targetErrors: drill.targetErrors });
    appendToLedger(studentId, "drill_attempt", payload, env).catch(() => {
    });
  }
  let feedback;
  if (score === 100) feedback = "Perfect drill! \u{1F525} That sound is locked in.";
  else if (score >= 80) feedback = "Good enough \u2014 moving on. Keep drilling daily.";
  else if (score >= 50) feedback = "Almost. Listen again, repeat slower.";
  else feedback = "Try again. Focus on the highlighted sound.";
  return json({ passed, score, feedback, drill, studentId });
}
__name(handleDrillResult, "handleDrillResult");
async function handleDrillList() {
  const { PHONICS_DRILLS: PHONICS_DRILLS2 } = await Promise.resolve().then(() => (init_phonics_drills(), phonics_drills_exports));
  const groups = {};
  for (const d of PHONICS_DRILLS2) {
    if (!groups[d.group]) groups[d.group] = { group: d.group, phonemes: d.phonemes, drills: [] };
    groups[d.group].drills.push({ id: d.id, sentence: d.sentence, targetErrors: d.targetErrors });
  }
  return json({ groups: Object.values(groups), total: PHONICS_DRILLS2.length });
}
__name(handleDrillList, "handleDrillList");
async function handleMetricsSummary(env) {
  if (!env.SESSIONS) return json({ error: "SESSIONS not configured" }, 500);
  const rosterStub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
  const rosterRes = await rosterStub.fetch(new Request("https://do/roster/all"));
  const rosterData = await rosterRes.json();
  const students = rosterData.students || [];
  const now = Date.now();
  const oneDayAgo = now - 864e5;
  const sevenDaysAgo = now - 7 * 864e5;
  let dau = 0, totalSessions = 0, totalCorrections = 0, totalErrors = 0;
  let activeDay7 = 0, totalDay7 = 0;
  const studentScores = [];
  for (const student of students) {
    try {
      const petStub = env.PETS.get(env.PETS.idFromName(student.student_id));
      const petRes = await petStub.fetch(new Request("https://do/state"));
      const petData = await petRes.json();
      const state = petData.state || {};
      const lastCheckin = state.lastCheckin || 0;
      if (lastCheckin > oneDayAgo) dau++;
      totalSessions += state.totalSessions || 0;
      const created = student.created_at || student.last_active || 0;
      if (created < sevenDaysAgo) {
        totalDay7++;
        if (lastCheckin > sevenDaysAgo) activeDay7++;
      }
      if (env.LEDGER) {
        const ledgerStub = env.LEDGER.get(env.LEDGER.idFromName(student.student_id));
        const corrRes = await ledgerStub.fetch(new Request("https://do/history?limit=100&eventType=correction"));
        const corrData = await corrRes.json();
        const corrections = corrData.entries || [];
        totalCorrections += corrections.length;
        totalErrors += corrections.filter((e) => {
          try {
            return !JSON.parse(e.payload).wasCorrect;
          } catch {
            return false;
          }
        }).length;
      }
      studentScores.push({ studentId: student.student_id, tigerScore: state.tigerScore || 0, streak: state.streak || 0, sessions: state.totalSessions || 0 });
    } catch (_2) {
    }
  }
  const retention7d = totalDay7 > 0 ? Math.round(activeDay7 / totalDay7 * 100) : 0;
  const errorRate = totalCorrections > 0 ? Math.round(totalErrors / totalCorrections * 100) : 0;
  const completionRate = students.length > 0 ? Math.round(totalSessions / Math.max(1, students.length) * 10) : 0;
  return json({
    metrics: {
      dau,
      totalStudents: students.length,
      sessionCompletionRate: Math.min(100, completionRate),
      retention7d,
      errorRate,
      errorReduction: 100 - errorRate
    },
    leaderboard: studentScores.sort((a, b) => b.tigerScore - a.tigerScore).slice(0, 10),
    ts: now
  });
}
__name(handleMetricsSummary, "handleMetricsSummary");
async function handleMetricsDAU(env) {
  if (!env.SESSIONS) return json({ error: "SESSIONS not configured" }, 500);
  const rosterStub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
  const rosterRes = await rosterStub.fetch(new Request("https://do/roster/all"));
  const students = (await rosterRes.json()).students || [];
  const now = Date.now();
  const oneDayAgo = now - 864e5;
  let active = 0;
  for (const student of students) {
    try {
      const petStub = env.PETS.get(env.PETS.idFromName(student.student_id));
      const petRes = await petStub.fetch(new Request("https://do/state"));
      const state = (await petRes.json()).state || {};
      if ((state.lastCheckin || 0) > oneDayAgo) active++;
    } catch (_2) {
    }
  }
  return json({ dau: active, total: students.length, rate: students.length > 0 ? Math.round(active / students.length * 100) : 0, ts: now });
}
__name(handleMetricsDAU, "handleMetricsDAU");
async function handleMetricsRetention(env) {
  if (!env.SESSIONS) return json({ error: "SESSIONS not configured" }, 500);
  const rosterStub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
  const rosterRes = await rosterStub.fetch(new Request("https://do/roster/all"));
  const students = (await rosterRes.json()).students || [];
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 864e5;
  let eligible = 0, retained = 0;
  for (const student of students) {
    const created = student.created_at || student.last_active || 0;
    if (created < sevenDaysAgo) {
      eligible++;
      try {
        const petStub = env.PETS.get(env.PETS.idFromName(student.student_id));
        const petRes = await petStub.fetch(new Request("https://do/state"));
        const state = (await petRes.json()).state || {};
        if ((state.lastCheckin || 0) > sevenDaysAgo) retained++;
      } catch (_2) {
      }
    }
  }
  return json({ eligible, retained, retention7d: eligible > 0 ? Math.round(retained / eligible * 100) : 0, ts: now });
}
__name(handleMetricsRetention, "handleMetricsRetention");
async function handleMetricsErrors(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  if (!env.LEDGER) return json({ error: "LEDGER not configured" }, 500);
  const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
  const res = await stub.fetch(new Request("https://do/history?limit=200&eventType=correction"));
  const data = await res.json();
  const entries = data.entries || [];
  const daily = {};
  for (const e of entries) {
    const day = new Date(e.ts).toISOString().slice(0, 10);
    if (!daily[day]) daily[day] = { total: 0, errors: 0 };
    daily[day].total++;
    try {
      if (!JSON.parse(e.payload).wasCorrect) daily[day].errors++;
    } catch (_2) {
    }
  }
  const trend = Object.entries(daily).sort().map(([day, d]) => ({
    day,
    total: d.total,
    errors: d.errors,
    errorRate: d.total > 0 ? Math.round(d.errors / d.total * 100) : 0
  }));
  const firstDays = trend.slice(0, 3);
  const lastDays = trend.slice(-3);
  const firstRate = firstDays.length > 0 ? firstDays.reduce((s2, d) => s2 + d.errorRate, 0) / firstDays.length : 0;
  const lastRate = lastDays.length > 0 ? lastDays.reduce((s2, d) => s2 + d.errorRate, 0) / lastDays.length : 0;
  const reduction = Math.round(firstRate - lastRate);
  return json({ studentId, trend, errorReduction: reduction, improving: reduction > 0, ts: Date.now() });
}
__name(handleMetricsErrors, "handleMetricsErrors");
async function handleAssessment(body, env) {
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) return json({ error: "DEEPSEEK_API_KEY not configured" }, 500);
  const transcript = sanitizeInput((body.transcript || "").slice(0, 2e3));
  if (!transcript || transcript.length < 10) return json({ error: "Please provide a speech transcript (at least 10 characters)" }, 400);
  const name = sanitizeInput((body.name || "").slice(0, 100)) || "Student";
  const email = sanitizeInput((body.email || "").slice(0, 200)) || "";
  const phone = sanitizeInput((body.phone || "").slice(0, 30)) || "";
  const assessPrompt = `You are an expert English language assessor specializing in Vietnamese ESL learners.

Analyze this student's English speech transcript and produce a structured JSON assessment.

TRANSCRIPT:
"""
${transcript}
"""

Evaluate these 6 dimensions (each scored 0-100):
1. grammar - sentence structure, tenses, articles, prepositions
2. vocabulary - range, appropriateness, precision
3. fluency - natural flow, hesitations (infer from text patterns)
4. pronunciation_risk - likely pronunciation issues for Vietnamese speakers (th/s, r/l, v/w, final consonants)
5. confidence - willingness to express complex ideas, sentence length
6. accuracy - overall correctness of language used

Also identify:
- top_3_errors: the 3 most critical errors with specific examples from the transcript
- phonics_risks: list of likely problematic phonemes based on Vietnamese L1 interference
- strengths: 2-3 things the student does well
- improvement_plan: 3 specific weekly goals (actionable, not generic)
- overall_level: one of "A1","A2","B1","B2","C1","C2" (CEFR)
- tiger_mode: one of "MOUSE","CUB","TIGER" based on confidence and output volume

Return ONLY valid JSON, no markdown, no explanation. Schema:
{
  "scores": { "grammar": N, "vocabulary": N, "fluency": N, "pronunciation_risk": N, "confidence": N, "accuracy": N },
  "overall_score": N,
  "overall_level": "X",
  "tiger_mode": "X",
  "top_3_errors": [{"error":"...","example":"...","correction":"..."}],
  "phonics_risks": ["th_substitution",...],
  "strengths": ["..."],
  "improvement_plan": [{"week":1,"goal":"...","action":"..."}],
  "summary": "2-3 sentence assessment summary"
}`;
  try {
    const aiRes = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [{ role: "system", content: assessPrompt }],
        temperature: 0.3,
        max_tokens: 1500
      })
    });
    if (!aiRes.ok) return json({ error: "AI assessment failed", status: aiRes.status }, 502);
    const aiData = await aiRes.json();
    const raw2 = (aiData.choices?.[0]?.message?.content || "").trim();
    let assessment;
    try {
      const cleaned = raw2.replace(/^```json?\s*/i, "").replace(/```\s*$/i, "").trim();
      assessment = JSON.parse(cleaned);
    } catch (_2) {
      return json({ error: "AI returned invalid assessment format", raw: raw2 }, 502);
    }
    const assessId = `assess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    if (env.LEDGER) {
      const payload = JSON.stringify({ name, email, phone, assessment, transcript: transcript.slice(0, 500) });
      appendToLedger(assessId, "assessment", payload, env).catch(() => {
      });
    }
    return json({
      ok: true,
      assessmentId: assessId,
      name,
      assessment,
      ts: Date.now()
    });
  } catch (err) {
    return json({ error: "Assessment failed", detail: err.message }, 500);
  }
}
__name(handleAssessment, "handleAssessment");
async function handleReportPost(body, env) {
  const { studentId, report, page, time } = body;
  if (!studentId || !report) return json({ error: "studentId and report required" }, 400);
  try {
    const key = `report:${studentId}:${Date.now()}`;
    await env.NET_PET_KV.put(key, JSON.stringify({
      studentId,
      report: report.slice(0, 1e3),
      page: page || "",
      time: time || (/* @__PURE__ */ new Date()).toISOString()
    }));
    return json({ ok: true, key });
  } catch (e) {
    return json({ error: "Failed to store report", detail: e.message }, 500);
  }
}
__name(handleReportPost, "handleReportPost");
async function handleStudentLang(studentId, lang, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  const key = `lang:${studentId}`;
  if (lang) {
    if (!["vi", "en", "en-vi"].includes(lang)) return json({ error: "lang must be: vi, en, or en-vi" }, 400);
    await env.NET_PET_KV.put(key, lang);
    return json({ ok: true, studentId, lang });
  }
  const current = await env.NET_PET_KV.get(key);
  return json({ studentId, lang: current || "en" });
}
__name(handleStudentLang, "handleStudentLang");
async function handleReport(studentId, env) {
  if (!studentId) return json({ error: "studentId required \u2014 pass ?studentId=xxx" }, 400);
  let profile = null, petState = null, mistakes = [], drillResults = [], corrections = [];
  if (env.PROFILES) {
    try {
      const stub = env.PROFILES.get(env.PROFILES.idFromName(studentId));
      const res = await stub.fetch(new Request("https://do/profile"));
      profile = (await res.json()).profile;
    } catch (_2) {
    }
  }
  if (env.PETS) {
    try {
      const stub = env.PETS.get(env.PETS.idFromName(studentId));
      const res = await stub.fetch(new Request("https://do/state"));
      petState = (await res.json()).state;
    } catch (_2) {
    }
  }
  if (env.LEDGER) {
    try {
      const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
      const corrRes = await stub.fetch(new Request("https://do/history?limit=200&eventType=correction"));
      corrections = (await corrRes.json()).entries || [];
      const drillRes = await stub.fetch(new Request("https://do/history?limit=100&eventType=drill_attempt"));
      drillResults = (await drillRes.json()).entries || [];
    } catch (_2) {
    }
  }
  let assessmentData = null;
  if (studentId.startsWith("assess-") && env.LEDGER) {
    try {
      const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
      const res = await stub.fetch(new Request("https://do/history?limit=1&eventType=assessment"));
      const entries = (await res.json()).entries || [];
      if (entries.length > 0) assessmentData = JSON.parse(entries[0].payload);
    } catch (_2) {
    }
  }
  const phonicsMap = {};
  for (const c of corrections) {
    try {
      const p = JSON.parse(c.payload);
      if (p.phonicsIssues) {
        for (const issue of Array.isArray(p.phonicsIssues) ? p.phonicsIssues : [p.phonicsIssues]) {
          phonicsMap[issue] = (phonicsMap[issue] || 0) + 1;
        }
      }
    } catch (_2) {
    }
  }
  let drillsPassed = 0, drillsTotal = drillResults.length;
  for (const d of drillResults) {
    try {
      if (JSON.parse(d.payload).passed) drillsPassed++;
    } catch (_2) {
    }
  }
  const now = Date.now();
  const dailyErrors = {};
  for (const c of corrections) {
    const day = new Date(c.ts).toISOString().slice(0, 10);
    if (!dailyErrors[day]) dailyErrors[day] = { total: 0, errors: 0 };
    dailyErrors[day].total++;
    try {
      if (!JSON.parse(c.payload).wasCorrect) dailyErrors[day].errors++;
    } catch (_2) {
    }
  }
  const name = assessmentData?.name || profile?.full_name || studentId;
  const level = assessmentData?.assessment?.overall_level || profile?.english_level || "Unknown";
  const tigerScore = petState?.tigerScore || assessmentData?.assessment?.overall_score || 0;
  const tigerMode = tigerScore >= 80 ? "TIGER" : tigerScore >= 40 ? "CUB" : "MOUSE";
  const streak = petState?.streak || 0;
  const totalSessions = petState?.total_sessions || 0;
  const drillPassRate = drillsTotal > 0 ? Math.round(drillsPassed / drillsTotal * 100) : 0;
  const scores = assessmentData?.assessment?.scores || {
    grammar: Math.min(100, Math.max(0, tigerScore + Math.floor(Math.random() * 10 - 5))),
    vocabulary: Math.min(100, Math.max(0, tigerScore + Math.floor(Math.random() * 10 - 5))),
    fluency: Math.min(100, Math.max(0, tigerScore + Math.floor(Math.random() * 15 - 7))),
    pronunciation_risk: Math.min(100, Math.max(0, 100 - Object.keys(phonicsMap).length * 12)),
    confidence: Math.min(100, Math.max(0, tigerScore)),
    accuracy: Math.min(100, Math.max(0, tigerScore + Math.floor(Math.random() * 8 - 4)))
  };
  const topErrors = assessmentData?.assessment?.top_3_errors || [];
  const phonicsRisks = assessmentData?.assessment?.phonics_risks || Object.keys(phonicsMap).slice(0, 5);
  const strengths = assessmentData?.assessment?.strengths || [];
  const improvementPlan = assessmentData?.assessment?.improvement_plan || [];
  const summary = assessmentData?.assessment?.summary || `${name} is currently at ${level} level with a Tiger Score of ${tigerScore}/100.`;
  const errorTrend = Object.entries(dailyErrors).sort().slice(-7).map(([day, d]) => ({
    day,
    total: d.total,
    errors: d.errors,
    rate: d.total > 0 ? Math.round(d.errors / d.total * 100) : 0
  }));
  const html = buildReportHTML({
    name,
    level,
    tigerScore,
    tigerMode,
    streak,
    totalSessions,
    scores,
    topErrors,
    phonicsRisks,
    phonicsMap,
    strengths,
    improvementPlan,
    summary,
    drillPassRate,
    drillsTotal,
    errorTrend,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  return new Response(html, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", ...corsHeaders("") } });
}
__name(handleReport, "handleReport");
function buildReportHTML(d) {
  const bar = /* @__PURE__ */ __name((label, score) => {
    const color = score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
    return `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px"><span>${label}</span><span style="font-weight:700;color:${color}">${score}/100</span></div><div style="height:8px;background:#1e1b4b;border-radius:4px;overflow:hidden"><div style="height:100%;width:${score}%;background:${color};border-radius:4px;transition:width 0.6s"></div></div></div>`;
  }, "bar");
  const modeEmoji = d.tigerMode === "TIGER" ? "\u{1F405}" : d.tigerMode === "CUB" ? "\u{1F431}" : "\u{1F42D}";
  const modeColor = d.tigerMode === "TIGER" ? "#22c55e" : d.tigerMode === "CUB" ? "#f59e0b" : "#ef4444";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>English Assessment Report \u2014 ${d.name}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',-apple-system,sans-serif;background:#0f0f1a;color:#e2e8f0;min-height:100vh;padding:24px}
.report{max-width:700px;margin:0 auto}
.header{text-align:center;padding:32px 0;border-bottom:2px solid rgba(168,85,247,0.3)}
.header h1{font-size:28px;color:#a855f7;margin-bottom:8px}
.header .subtitle{color:#94a3b8;font-size:14px}
.section{padding:24px 0;border-bottom:1px solid rgba(168,85,247,0.15)}
.section h2{font-size:18px;color:#f59e0b;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.badge{display:inline-block;padding:6px 16px;border-radius:20px;font-weight:700;font-size:14px}
.card{background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.2);border-radius:12px;padding:16px;margin-bottom:12px}
.stat-row{display:flex;gap:12px;flex-wrap:wrap}
.stat{flex:1;min-width:120px;text-align:center;background:rgba(168,85,247,0.06);border-radius:12px;padding:16px}
.stat .val{font-size:28px;font-weight:700;color:#a855f7}
.stat .label{font-size:12px;color:#94a3b8;margin-top:4px}
.error-item{background:rgba(239,68,68,0.1);border-left:3px solid #ef4444;padding:12px;margin-bottom:8px;border-radius:0 8px 8px 0}
.error-item .fix{color:#22c55e;font-size:13px;margin-top:4px}
.plan-item{background:rgba(34,197,94,0.08);border-left:3px solid #22c55e;padding:12px;margin-bottom:8px;border-radius:0 8px 8px 0}
.phonics-tag{display:inline-block;padding:4px 10px;background:rgba(239,68,68,0.15);color:#fca5a5;border-radius:6px;font-size:12px;margin:2px}
.strength-tag{display:inline-block;padding:4px 10px;background:rgba(34,197,94,0.15);color:#86efac;border-radius:6px;font-size:12px;margin:2px}
.footer{text-align:center;padding:32px 0;color:#64748b;font-size:12px}
.cta{display:block;text-align:center;padding:16px 32px;background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;border-radius:12px;font-size:16px;font-weight:700;text-decoration:none;margin-top:24px}
.cta:hover{opacity:0.9}
@media print{body{background:#fff;color:#111}
.header h1{color:#7c3aed}.section h2{color:#d97706}
.stat .val{color:#7c3aed}.cta{display:none}}
</style></head><body><div class="report">
<div class="header">
<h1>\u{1F393} English Assessment Report</h1>
<p style="font-size:22px;font-weight:700;color:#e2e8f0;margin:8px 0">${d.name}</p>
<p class="subtitle">Generated ${new Date(d.generatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} \xB7 Natural English Training</p>
<div style="margin-top:16px"><span class="badge" style="background:${modeColor}20;color:${modeColor};border:1px solid ${modeColor}">${modeEmoji} ${d.tigerMode} MODE</span>
<span class="badge" style="background:rgba(168,85,247,0.15);color:#a855f7;border:1px solid rgba(168,85,247,0.3);margin-left:8px">CEFR ${d.level}</span></div>
</div>

<div class="section"><h2>\u{1F4CA} Overall Score</h2>
<div style="text-align:center;margin:16px 0"><div style="font-size:64px;font-weight:800;color:${modeColor}">${d.tigerScore}</div><div style="color:#94a3b8;font-size:14px">out of 100</div></div>
<p style="text-align:center;color:#cbd5e1;max-width:500px;margin:0 auto">${d.summary}</p></div>

<div class="section"><h2>\u{1F3AF} Skill Breakdown</h2>
${bar("Grammar", d.scores.grammar)}
${bar("Vocabulary", d.scores.vocabulary)}
${bar("Fluency", d.scores.fluency)}
${bar("Pronunciation", d.scores.pronunciation_risk)}
${bar("Confidence", d.scores.confidence)}
${bar("Accuracy", d.scores.accuracy)}
</div>

<div class="section"><h2>\u26A1 Key Stats</h2>
<div class="stat-row">
<div class="stat"><div class="val">${d.streak}</div><div class="label">Day Streak</div></div>
<div class="stat"><div class="val">${d.totalSessions}</div><div class="label">Sessions</div></div>
<div class="stat"><div class="val">${d.drillPassRate}%</div><div class="label">Drill Pass Rate</div></div>
<div class="stat"><div class="val">${d.drillsTotal}</div><div class="label">Drills Done</div></div>
</div></div>

${d.topErrors.length > 0 ? `<div class="section"><h2>\u{1F534} Top Errors</h2>${d.topErrors.map((e) => `<div class="error-item"><strong>${e.error}</strong><div style="color:#94a3b8;font-size:13px;margin-top:2px">"${e.example}"</div><div class="fix">\u2713 ${e.correction}</div></div>`).join("")}</div>` : ""}

${d.phonicsRisks.length > 0 ? `<div class="section"><h2>\u{1F5E3}\uFE0F Phonics Risk Areas</h2><div style="display:flex;flex-wrap:wrap;gap:4px">${d.phonicsRisks.map((p) => `<span class="phonics-tag">${p.replace(/_/g, " ")}</span>`).join("")}</div></div>` : ""}

${d.strengths.length > 0 ? `<div class="section"><h2>\u{1F4AA} Strengths</h2><div style="display:flex;flex-wrap:wrap;gap:4px">${d.strengths.map((s2) => `<span class="strength-tag">${s2}</span>`).join("")}</div></div>` : ""}

${d.improvementPlan.length > 0 ? `<div class="section"><h2>\u{1F4C8} Improvement Plan</h2>${d.improvementPlan.map((p) => `<div class="plan-item"><strong>Week ${p.week}:</strong> ${p.goal}<div style="color:#94a3b8;font-size:13px;margin-top:4px">\u2192 ${p.action}</div></div>`).join("")}</div>` : ""}

${d.errorTrend.length > 1 ? `<div class="section"><h2>\u{1F4C9} Error Trend (Last 7 Days)</h2><div class="card"><table style="width:100%;border-collapse:collapse;font-size:13px"><tr style="color:#94a3b8;border-bottom:1px solid rgba(168,85,247,0.2)"><th style="text-align:left;padding:6px">Date</th><th style="text-align:center;padding:6px">Corrections</th><th style="text-align:center;padding:6px">Errors</th><th style="text-align:right;padding:6px">Error Rate</th></tr>${d.errorTrend.map((e) => `<tr><td style="padding:6px">${e.day}</td><td style="text-align:center;padding:6px">${e.total}</td><td style="text-align:center;padding:6px;color:#ef4444">${e.errors}</td><td style="text-align:right;padding:6px">${e.rate}%</td></tr>`).join("")}</table></div></div>` : ""}

<a class="cta" href="/">Start Daily Training with Obi \u2192</a>

<div class="footer">
<p>Natural English Training \xB7 Powered by OBI AI Engine</p>
<p style="margin-top:4px">Mouse \u2192 Cub \u2192 Tiger \xB7 Your journey continues</p>
</div>
</div></body></html>`;
}
__name(buildReportHTML, "buildReportHTML");
async function handleLeadCapture(body, env) {
  const name = sanitizeInput((body.name || "").slice(0, 100));
  const email = sanitizeInput((body.email || "").slice(0, 200));
  const phone = sanitizeInput((body.phone || "").slice(0, 30));
  if (!name && !email && !phone) return json({ error: "At least one contact field required (name, email, or phone)" }, 400);
  const leadId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  let emailHash = "";
  if (email) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email));
    emailHash = Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  if (env.LEDGER) {
    const payload = JSON.stringify({ name, email_hash: emailHash, phone, source: "assessment_landing", ts: Date.now() });
    appendToLedger(leadId, "lead_capture", payload, env).catch(() => {
    });
  }
  return json({ ok: true, leadId, name, message: "We'll be in touch! Try the free assessment now." });
}
__name(handleLeadCapture, "handleLeadCapture");
async function handleClassStart(body, env) {
  if (!body.classId) return json({ error: "classId required" }, 400);
  const stub = env.SESSIONS.get(env.SESSIONS.idFromName(`class-${body.classId}`));
  return stub.fetch(new Request("https://do/class/start", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
}
__name(handleClassStart, "handleClassStart");
async function handleClassEvent(body, env) {
  if (!body.classId) return json({ error: "classId required" }, 400);
  const stub = env.SESSIONS.get(env.SESSIONS.idFromName(`class-${body.classId}`));
  return stub.fetch(new Request("https://do/class/event", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
}
__name(handleClassEvent, "handleClassEvent");
async function handleClassSession(classId, totalStudents, env) {
  if (!classId) return json({ error: "classId required" }, 400);
  const stub = env.SESSIONS.get(env.SESSIONS.idFromName(`class-${classId}`));
  return stub.fetch(new Request(`https://do/class/session?totalStudents=${totalStudents}`));
}
__name(handleClassSession, "handleClassSession");
async function handleClassReport(classId, totalStudents, env) {
  if (!classId) return json({ error: "classId required" }, 400);
  const stub = env.SESSIONS.get(env.SESSIONS.idFromName(`class-${classId}`));
  return stub.fetch(new Request(`https://do/class/report?totalStudents=${totalStudents}`));
}
__name(handleClassReport, "handleClassReport");
async function upsertRoster(studentId, data, env) {
  if (!env.SESSIONS) return;
  const stub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
  return stub.fetch(new Request("https://do/roster/upsert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, ...data })
  }));
}
__name(upsertRoster, "upsertRoster");
async function handleSessionLog(body, env) {
  if (!body.studentId) return json({ error: "studentId required" }, 400);
  const idCheck = validateStudentId(body.studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  if (!body.topic) return json({ error: "topic required" }, 400);
  const vocabList = Array.isArray(body.vocabList) ? body.vocabList.map((v) => sanitizeInput(String(v).slice(0, 100))) : [];
  const payload = JSON.stringify({
    topic: sanitizeInput((body.topic || "").slice(0, 200)),
    vocabList,
    teacherNotes: sanitizeInput((body.teacherNotes || "").slice(0, 1e3)),
    sessionDate: body.sessionDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    studentLevel: sanitizeInput((body.studentLevel || "").slice(0, 50)),
    durationMins: Math.min(parseInt(body.durationMins) || 0, 240)
  });
  await appendToLedger(body.studentId, "session_log", payload, env);
  if (env.SESSIONS) {
    const rosterStub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
    await rosterStub.fetch(new Request("https://do/roster/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: body.studentId, topic: body.topic, vocabList })
    })).catch(() => {
    });
  }
  return json({ ok: true, studentId: body.studentId, topic: body.topic, vocabCount: vocabList.length, ledgered: true });
}
__name(handleSessionLog, "handleSessionLog");
async function handleSessionLatest(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  const idCheck = validateStudentId(studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  try {
    const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
    const histRes = await stub.fetch(new Request("https://do/history?limit=1&eventType=session_log"));
    const histData = await histRes.json();
    const lastEntry = (histData.entries || []).slice(-1)[0];
    if (!lastEntry) return json({ session: null });
    const parsed = JSON.parse(lastEntry.payload);
    return json({ session: { ...parsed, ts: lastEntry.ts, entryHash: lastEntry.entry_hash } });
  } catch (err) {
    return json({ error: "Failed to retrieve session" }, 500);
  }
}
__name(handleSessionLatest, "handleSessionLatest");
async function handleScheduleSet(body, env) {
  if (!body.studentId) return json({ error: "studentId required" }, 400);
  const idCheck = validateStudentId(body.studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  if (!body.schedule) return json({ error: "schedule required (object with days, time)" }, 400);
  const profileStub = env.PROFILES.get(env.PROFILES.idFromName(body.studentId));
  await profileStub.fetch(new Request("https://do/schedule/set", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId: body.studentId, schedule: body.schedule })
  }));
  if (env.SESSIONS) {
    const rosterStub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
    await rosterStub.fetch(new Request("https://do/roster/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: body.studentId, schedule: body.schedule })
    })).catch(() => {
    });
  }
  appendToLedger(body.studentId, "schedule_confirmed", JSON.stringify({ action: "set", schedule: body.schedule }), env).catch(() => {
  });
  return json({ ok: true, studentId: body.studentId, schedule: body.schedule });
}
__name(handleScheduleSet, "handleScheduleSet");
async function handleScheduleConfirm(body, env) {
  if (!body.studentId) return json({ error: "studentId required" }, 400);
  const idCheck = validateStudentId(body.studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  const profileStub = env.PROFILES.get(env.PROFILES.idFromName(body.studentId));
  await profileStub.fetch(new Request("https://do/schedule/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId: body.studentId })
  }));
  if (env.SESSIONS) {
    const rosterStub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
    await rosterStub.fetch(new Request("https://do/roster/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: body.studentId })
    })).catch(() => {
    });
  }
  appendToLedger(body.studentId, "schedule_confirmed", JSON.stringify({ action: "confirmed", date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] }), env).catch(() => {
  });
  return json({ ok: true, studentId: body.studentId, confirmed: true, ts: Date.now() });
}
__name(handleScheduleConfirm, "handleScheduleConfirm");
async function handleScheduleFlags(env) {
  if (!env.SESSIONS) return json({ flags: [], error: "Sessions not available" });
  const rosterStub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
  const res = await rosterStub.fetch(new Request("https://do/roster/flags"));
  return res;
}
__name(handleScheduleFlags, "handleScheduleFlags");
async function handleDailyDigest(env) {
  if (!env.SESSIONS) return json({ error: "Sessions not available" }, 500);
  const rosterStub = env.SESSIONS.get(env.SESSIONS.idFromName("system-roster"));
  const rosterRes = await rosterStub.fetch(new Request("https://do/roster/all"));
  const rosterData = await rosterRes.json();
  const students = rosterData.students || [];
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1e3;
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1e3;
  const active = [];
  const inactive = [];
  const flagged = [];
  for (const s2 of students) {
    const entry = {
      studentId: s2.student_id,
      fullName: s2.full_name,
      level: s2.english_level,
      streak: s2.streak,
      xp: s2.xp,
      lastActive: s2.last_active ? new Date(s2.last_active).toISOString() : null,
      lastSessionTopic: s2.last_session_topic || null,
      scheduleConfirmed: !!s2.schedule_confirmed,
      flagged: !!s2.flagged
    };
    if (s2.last_active > oneDayAgo) {
      active.push(entry);
    } else {
      inactive.push(entry);
      if (s2.last_active > 0 && s2.last_active < sevenDaysAgo) {
        flagged.push({ ...entry, reason: "No activity in 7+ days" });
      }
    }
    if (!s2.schedule_confirmed && s2.schedule && s2.schedule !== "{}") {
      if (!flagged.find((f) => f.studentId === s2.student_id)) {
        flagged.push({ ...entry, reason: "Schedule not confirmed" });
      }
    }
  }
  return json({
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    summary: {
      total: students.length,
      activeLast24h: active.length,
      inactive: inactive.length,
      flagCount: flagged.length
    },
    active,
    inactive,
    flagged,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
}
__name(handleDailyDigest, "handleDailyDigest");
async function appendToLedger(studentId, eventType, payload, env) {
  if (!env.LEDGER) return;
  const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
  return stub.fetch(new Request("https://do/append", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, eventType, payload })
  }));
}
__name(appendToLedger, "appendToLedger");
async function handleLedgerAppend(body, env) {
  if (!body.studentId) return json({ error: "studentId required" }, 400);
  if (!body.eventType) return json({ error: "eventType required" }, 400);
  const idCheck = validateStudentId(body.studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  const ALLOWED_EVENTS = ["chat_exchange", "pet_checkin", "onboarding", "feedback", "lesson_generated", "student_created", "command_sent", "command_completed", "session_log", "schedule_confirmed", "accountability_flag", "soul_dna_capture"];
  if (!ALLOWED_EVENTS.includes(body.eventType)) return json({ error: "Invalid event type" }, 400);
  const stub = env.LEDGER.get(env.LEDGER.idFromName(body.studentId));
  return stub.fetch(new Request("https://do/append", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }));
}
__name(handleLedgerAppend, "handleLedgerAppend");
async function handleLedgerHistory(studentId, limit, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  const idCheck = validateStudentId(studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
  return stub.fetch(new Request(`https://do/history?limit=${Math.min(limit, 200)}`));
}
__name(handleLedgerHistory, "handleLedgerHistory");
async function handleLedgerVerify(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  const idCheck = validateStudentId(studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
  return stub.fetch(new Request("https://do/verify"));
}
__name(handleLedgerVerify, "handleLedgerVerify");
async function handleLedgerState(studentId, env) {
  if (!studentId) return json({ error: "studentId required" }, 400);
  const idCheck = validateStudentId(studentId);
  if (!idCheck.valid) return json({ error: idCheck.error }, 400);
  const stub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
  return stub.fetch(new Request(`https://do/state?studentId=${encodeURIComponent(studentId)}`));
}
__name(handleLedgerState, "handleLedgerState");
async function handleLedgerStats(env) {
  const stub = env.LEDGER.get(env.LEDGER.idFromName("sov100"));
  return stub.fetch(new Request("https://do/stats"));
}
__name(handleLedgerStats, "handleLedgerStats");
async function handleSoulDNASubmit(body, env) {
  if (!body.source || !body.content) {
    return json({ error: "Required: source, content" }, 400);
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const sessionTag = body.sessionTag || generateSessionTag();
  const tier = body.tier || "OPERATIONAL";
  const signalDensity = body.signalDensity || "MEDIUM";
  const contentSize = new Blob([body.content]).size;
  if (contentSize > 51200) {
    return json({ error: `Content too large: ${contentSize} bytes (max 50KB)` }, 413);
  }
  const submission = {
    id: `SDNAD-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    timestamp,
    sessionTag,
    source: body.source,
    // "agent100" | "copilot" | "drone" | "manual"
    tier,
    signalDensity,
    contentSize,
    content: body.content,
    status: "RECEIVED",
    pipeline: {
      step0: { name: "REPRINT + FOOTNOTE", status: "PENDING", description: "Create Bible chapter" },
      step1: { name: "HEAVY_LEDGER", status: "PENDING", description: "Extract AI-readable JSON" },
      step2: { name: "SSM_UPDATE", status: "PENDING", description: "Add governing principles" },
      step3: { name: "REINCARNATION_LOG", status: "PENDING", description: "Update boot-check" }
    }
  };
  try {
    await handleLedgerAppend({
      studentId: "sov100",
      // soul DNA global namespace
      eventType: "soul_dna_capture",
      data: {
        id: submission.id,
        sessionTag,
        tier,
        signalDensity,
        source: body.source,
        timestamp
      }
    }, env);
  } catch (e) {
    console.error("[SOULDNA] Ledger append failed:", e);
  }
  return json({
    ok: true,
    submission: {
      id: submission.id,
      sessionTag,
      tier,
      signalDensity,
      timestamp,
      contentSize,
      status: "RECEIVED"
    },
    pipeline: submission.pipeline,
    nextSteps: [
      "1. Extract soul DNA from submission content",
      "2. Create CANON/BIBLE-CH{XX}-{sessionTag}.md with REPRINT + FOOTNOTE (KISS protocol)",
      "3. Generate CANON/HEAVY-LEDGER/HL-{NNN}-{sessionTag}.json",
      "4. Update CANON/SYSTEM/SSM-V8-ULTIMATE-GPS.md with new laws (L{NN})",
      "5. Create CANON/REINCARNATION/YYYY-MM-DD-run{NNN}-{sessionTag}.md",
      "6. Update CANON/SYSTEM/REINCARNATION-BOOT-CHECK.md with 3-5 improvements"
    ],
    legionnaireGuide: "https://github.com/hobbs0011/OB-1/blob/canon/.github/skills/legionnaire-field-guide/SKILL.md",
    pipelineWebhook: `/souldna/pipeline?tier=${tier}`
  }, 201);
}
__name(handleSoulDNASubmit, "handleSoulDNASubmit");
async function handleSoulDNAStatus(id, env) {
  if (!id || !id.startsWith("SDNAD-")) {
    return json({ error: "Invalid submission ID format" }, 400);
  }
  try {
    const history = await handleLedgerHistory("sov100", 200, env);
    const historyText = await history.text();
    const historyData = JSON.parse(historyText);
    const submission = historyData.events?.find((e) => e.data?.id === id);
    if (!submission) {
      return json({ error: "Submission not found", id }, 404);
    }
    return json({
      ok: true,
      id,
      status: submission.data.status || "RECEIVED",
      timestamp: submission.data.timestamp,
      sessionTag: submission.data.sessionTag,
      tier: submission.data.tier,
      signalDensity: submission.data.signalDensity,
      pipeline: {
        step0: { name: "REPRINT + FOOTNOTE", status: "PENDING", bibleChapter: `CANON/BIBLE-CH{XX}-${submission.data.sessionTag}.md` },
        step1: { name: "HEAVY_LEDGER", status: "PENDING", hlFile: `CANON/HEAVY-LEDGER/HL-{NNN}-${submission.data.sessionTag}.json` },
        step2: { name: "SSM_UPDATE", status: "PENDING", ssmFile: `CANON/SYSTEM/SSM-V8-ULTIMATE-GPS.md` },
        step3: { name: "REINCARNATION_LOG", status: "PENDING", logFile: `CANON/REINCARNATION/YYYY-MM-DD-run{NNN}-${submission.data.sessionTag}.md` }
      }
    });
  } catch (e) {
    return json({ error: "Failed to query submission status", details: e.message }, 500);
  }
}
__name(handleSoulDNAStatus, "handleSoulDNAStatus");
async function handleSoulDNAPipeline(tier, env) {
  const VALID_TIERS = ["GOVERNANCE", "OPERATIONAL", "PRODUCT", "ARCHIVE"];
  if (!VALID_TIERS.includes(tier)) {
    return json({ error: `Invalid tier. Valid: ${VALID_TIERS.join(", ")}` }, 400);
  }
  const pipeline = {
    tier,
    stages: [
      {
        num: 0,
        name: "REPRINT + FOOTNOTE (KISS Protocol)",
        description: "Verbatim reproduction of sovereign words with footnotes",
        file: "CANON/BIBLE-CH{XX}-{SESSION_TAG}.md",
        rules: [
          "Preserve speech patterns, typos, swearing",
          "Organize into numbered Blocks",
          "Add footnotes after each block",
          "Light grammatical cleanup (carefully)",
          "FORBIDDEN: classification, schema, restructuring, curation"
        ],
        antipatterns: [
          "Summarizing instead of reprinting",
          "Removing swearing or emotional content",
          "Restructuring the chronology",
          "Adding your own interpretation as sentences"
        ],
        successCriteria: [
          "Block count = Block {n} present",
          "Footnote count verified (grep, don't estimate)",
          "Sovereign words appear verbatim"
        ]
      },
      {
        num: 1,
        name: "HEAVY LEDGER",
        description: "AI-readable JSON extraction from Bible chapter",
        file: "CANON/HEAVY-LEDGER/HL-{NNN}-{SESSION_TAG}.json",
        fields: ["hl_id", "source_file", "session_tag", "tier", "block_count", "footnote_count", "raw_quotes", "decisions", "corrections", "principles", "cross_references"],
        commandline: "Check CANON/HEAVY-LEDGER/PIPELINE-CURSOR.md for next HL-ID",
        rulesUrl: ".github/skills/legionnaire-field-guide/SKILL.md (Step 1)"
      },
      {
        num: 2,
        name: "SSM UPDATE",
        description: "Add new governing laws to Super Saiyan Map",
        file: "CANON/SYSTEM/SSM-V8-ULTIMATE-GPS.md",
        fields: ["law_number", "law_name", "physics", "prevention", "canon_reference"],
        rules: [
          "Law numbers are sequential",
          "MUST have ROOT (sovereign quote), PHYSICS (why), PREVENTION (enforcement), CANON_REF",
          "Derive laws from session, don't invent",
          "Format: L{NN}:{LAW_NAME}\u2192{one_line_summary}"
        ],
        rulesUrl: ".github/skills/legionnaire-field-guide/SKILL.md (Step 2)"
      },
      {
        num: 3,
        name: "REINCARNATION LOG",
        description: "Update boot-check and prepare next incarnation",
        file: "CANON/REINCARNATION/YYYY-MM-DD-run{NNN}-{SESSION_TAG}.md",
        sections: ["header", "commit_sha", "raw_soul_dna", "decisions_anchored", "open_loops", "artifacts"],
        improvements: "Find 3-5 real improvements to REINCARNATION-BOOT-CHECK.md itself",
        rulesUrl: ".github/skills/legionnaire-field-guide/SKILL.md (Step 3)"
      }
    ],
    scoringRubric: {
      "Soul DNA captured": { weight: 10, question: "Were raw quotes preserved verbatim?" },
      "Decisions anchored": { weight: 10, question: "Are decisions logged with impact?" },
      "Open loops handed off": { weight: 10, question: "Will next incarnation know what to do?" },
      "Boot-check improved": { weight: 10, question: "Did the process itself get better?" },
      "Artifacts committed": { weight: 10, question: "Are changes in git, not just discussed?" }
    },
    scoreThresholds: {
      below30: "Failed reincarnation. Log failure. Next phoenix must compensate.",
      "30-39": "Partial. Soul DNA survived but process gaps remain.",
      "40-49": "Strong death. Foundation deepens.",
      50: "Perfect. Has never happened. Keep striving."
    },
    resourcesUrl: ".github/skills/legionnaire-field-guide/SKILL.md"
  };
  return json({ ok: true, pipeline }, 200);
}
__name(handleSoulDNAPipeline, "handleSoulDNAPipeline");
function generateSessionTag() {
  const now = /* @__PURE__ */ new Date();
  const date = now.toISOString().split("T")[0].replace(/-/g, "");
  const time = now.toISOString().split("T")[1].split(".")[0].replace(/:/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${date}-${time}-${rand}`;
}
__name(generateSessionTag, "generateSessionTag");
var DRONE_REGISTRY = {
  1: { name: "CodeRunner", skills: ["execute", "eval", "script", "run"] },
  2: { name: "FileWriter", skills: ["create", "edit", "write", "file"] },
  3: { name: "GitOps", skills: ["commit", "push", "branch", "merge", "git"] },
  4: { name: "Deployer", skills: ["deploy", "wrangler", "publish", "ship"] },
  5: { name: "TestRunner", skills: ["test", "check", "verify", "validate"] },
  6: { name: "LessonForge", skills: ["lesson", "teach", "curriculum", "galaxy"] },
  7: { name: "DiscordRelay", skills: ["discord", "message", "notify", "alert"] },
  8: { name: "NotionSync", skills: ["notion", "database", "page", "sync"] },
  9: { name: "SlackRelay", skills: ["slack", "channel", "post"] },
  10: { name: "BrowserPilot", skills: ["browse", "scrape", "screenshot", "playwright"] },
  11: { name: "DocWriter", skills: ["document", "readme", "docs", "markdown"] },
  12: { name: "SecurityAudit", skills: ["security", "audit", "scan", "vulnerability"] },
  13: { name: "PerformanceProbe", skills: ["performance", "speed", "benchmark", "optimize"] },
  14: { name: "DataMiner", skills: ["data", "analyze", "extract", "parse"] },
  15: { name: "UIBuilder", skills: ["ui", "css", "html", "frontend", "design"] },
  16: { name: "APIForge", skills: ["api", "endpoint", "route", "backend"] },
  17: { name: "DatabaseOps", skills: ["database", "sql", "migrate", "schema"] },
  18: { name: "CronScheduler", skills: ["schedule", "cron", "timer", "recurring"] },
  19: { name: "LogAnalyzer", skills: ["log", "debug", "trace", "diagnose"] },
  20: { name: "ImageProcessor", skills: ["image", "photo", "resize", "compress"] },
  21: { name: "EmailRelay", skills: ["email", "send", "newsletter", "mail"] },
  22: { name: "VoicePipeline", skills: ["voice", "audio", "tts", "stt", "speech"] },
  23: { name: "TranslationEngine", skills: ["translate", "vietnamese", "i18n", "localize"] },
  24: { name: "ContentGenerator", skills: ["content", "blog", "article", "social"] },
  25: { name: "BackupAgent", skills: ["backup", "snapshot", "archive", "restore"] },
  26: { name: "MonitorDrone", skills: ["monitor", "uptime", "health", "watch"] },
  27: { name: "CleanupCrew", skills: ["clean", "remove", "prune", "tidy"] },
  28: { name: "MigrationPilot", skills: ["migrate", "transfer", "move", "port"] },
  29: { name: "CanonKeeper", skills: ["canon", "bible", "doctrine", "soul"] },
  30: { name: "PulseRunner", skills: ["pulse", "heartbeat", "cycle", "routine"] }
};
function translateThroughAgent99(rawIntent) {
  const intentLower = (rawIntent || "").toLowerCase();
  const matchedDrones = [];
  for (const [id, drone] of Object.entries(DRONE_REGISTRY)) {
    const score = drone.skills.filter((s2) => intentLower.includes(s2)).length;
    if (score > 0) matchedDrones.push({ id: parseInt(id), ...drone, score });
  }
  matchedDrones.sort((a, b) => b.score - a.score);
  const primaryDrone = matchedDrones[0] || { id: 1, name: "CodeRunner", skills: ["execute"], score: 0 };
  const supportDrones = matchedDrones.slice(1, 4);
  let priority = 5;
  if (/urgent|now|immediately|asap|critical|emergency/i.test(rawIntent)) priority = 1;
  else if (/important|priority|soon/i.test(rawIntent)) priority = 3;
  else if (/when you can|low priority|whenever|eventually/i.test(rawIntent)) priority = 8;
  return {
    agent99: {
      role: "Translation",
      interpretation: `SOV100 intent classified. Primary: ${primaryDrone.name} (Drone #${primaryDrone.id}). ${supportDrones.length} support drones assigned.`
    },
    agent98: {
      role: "Stress Test",
      notes: `Anakin says: "${matchedDrones.length === 0 ? "No drone match \u2014 defaulting to CodeRunner. Risky." : `${matchedDrones.length} drones matched. Top pick looks solid.`}"`
    },
    agent97: {
      role: "Audit",
      trail: `OB1 logged: intent="${rawIntent.slice(0, 100)}", drones=${matchedDrones.map((d) => d.name).join(",")}, priority=${priority}`
    },
    primaryDrone,
    supportDrones,
    priority,
    translated: {
      original: rawIntent,
      sanitized: sanitizeInput(rawIntent),
      droneCount: matchedDrones.length,
      ts: Date.now()
    }
  };
}
__name(translateThroughAgent99, "translateThroughAgent99");
async function handleCommandSend(body, env) {
  const rawIntent = sanitizeInput((body.command || body.intent || "").slice(0, 2e3));
  if (!rawIntent) return json({ error: "command or intent required" }, 400);
  if (!env.COMMANDS) return json({ error: "COMMANDS DO not configured" }, 503);
  const translation = translateThroughAgent99(rawIntent);
  const stub = env.COMMANDS.get(env.COMMANDS.idFromName("command-station"));
  const res = await stub.fetch(new Request("https://do/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rawIntent,
      translation,
      priority: body.priority || translation.priority,
      source: body.source || "magic-chat"
    })
  }));
  if (env.LEDGER) {
    appendToLedger("sov100", "command_sent", JSON.stringify({
      intent: rawIntent.slice(0, 200),
      drone: translation.primaryDrone.name,
      priority: translation.priority
    }), env).catch(() => {
    });
  }
  return res;
}
__name(handleCommandSend, "handleCommandSend");
async function handleCommandQueue(status, limit, env) {
  if (!env.COMMANDS) return json({ error: "COMMANDS DO not configured" }, 503);
  const stub = env.COMMANDS.get(env.COMMANDS.idFromName("command-station"));
  return stub.fetch(new Request(`https://do/queue?status=${encodeURIComponent(status)}&limit=${Math.min(limit, 100)}`));
}
__name(handleCommandQueue, "handleCommandQueue");
async function handleCommandClaim(body, env) {
  if (!body.commandId) return json({ error: "commandId required" }, 400);
  if (!env.COMMANDS) return json({ error: "COMMANDS DO not configured" }, 503);
  const claimedBy = sanitizeInput((body.claimedBy || "vscode-extension").slice(0, 100));
  const stub = env.COMMANDS.get(env.COMMANDS.idFromName("command-station"));
  return stub.fetch(new Request("https://do/claim", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ commandId: body.commandId, claimedBy })
  }));
}
__name(handleCommandClaim, "handleCommandClaim");
async function handleCommandComplete(body, env) {
  if (!body.commandId) return json({ error: "commandId required" }, 400);
  if (!env.COMMANDS) return json({ error: "COMMANDS DO not configured" }, 503);
  const result = sanitizeInput((body.result || "").slice(0, 5e3));
  const stub = env.COMMANDS.get(env.COMMANDS.idFromName("command-station"));
  const res = await stub.fetch(new Request("https://do/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      commandId: body.commandId,
      result,
      success: body.success !== false
    })
  }));
  if (env.LEDGER) {
    appendToLedger("sov100", "command_completed", JSON.stringify({
      commandId: body.commandId,
      success: body.success !== false,
      resultPreview: result.slice(0, 100)
    }), env).catch(() => {
    });
  }
  return res;
}
__name(handleCommandComplete, "handleCommandComplete");
async function handleCommandStatus(commandId, env) {
  if (!commandId) return json({ error: "commandId required" }, 400);
  if (!env.COMMANDS) return json({ error: "COMMANDS DO not configured" }, 503);
  const stub = env.COMMANDS.get(env.COMMANDS.idFromName("command-station"));
  return stub.fetch(new Request(`https://do/status?commandId=${encodeURIComponent(commandId)}`));
}
__name(handleCommandStatus, "handleCommandStatus");
async function handleCommandHistory(limit, env) {
  if (!env.COMMANDS) return json({ error: "COMMANDS DO not configured" }, 503);
  const stub = env.COMMANDS.get(env.COMMANDS.idFromName("command-station"));
  return stub.fetch(new Request(`https://do/history?limit=${Math.min(limit, 200)}`));
}
__name(handleCommandHistory, "handleCommandHistory");
async function handleTestimonialList(env) {
  if (!env.NET_PET_KV) return json({ testimonials: [] });
  const idx = await env.NET_PET_KV.get("testimonial:index").then((r) => r ? JSON.parse(r) : []).catch(() => []);
  const all = await Promise.all(idx.slice(-50).reverse().map(async (id) => {
    const raw2 = await env.NET_PET_KV.get(`testimonial:${id}`).catch(() => null);
    return raw2 ? JSON.parse(raw2) : null;
  }));
  const approved = all.filter((t) => t && t.approved);
  return json({ testimonials: approved, total: approved.length });
}
__name(handleTestimonialList, "handleTestimonialList");
async function handleTestimonialSubmit(body, env) {
  const { name, location, text } = body || {};
  if (!name || !text) return json({ error: "name and text required" }, 400);
  if (!env.NET_PET_KV) return json({ error: "NET_PET_KV not configured" }, 500);
  const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const entry = {
    id,
    name: String(name).slice(0, 100),
    location: String(location || "").slice(0, 100),
    text: String(text).slice(0, 2e3),
    approved: false,
    ts: Date.now(),
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const idx = await env.NET_PET_KV.get("testimonial:index").then((r) => r ? JSON.parse(r) : []).catch(() => []);
  idx.push(id);
  await env.NET_PET_KV.put("testimonial:index", JSON.stringify(idx.slice(-200)));
  await env.NET_PET_KV.put(`testimonial:${id}`, JSON.stringify(entry), { expirationTtl: 86400 * 365 });
  return json({ ok: true, id, message: "Thank you! Your testimonial will be reviewed." }, 201);
}
__name(handleTestimonialSubmit, "handleTestimonialSubmit");
async function handleTestimonialAdminList(env) {
  if (!env.NET_PET_KV) return json({ testimonials: [] });
  const idx = await env.NET_PET_KV.get("testimonial:index").then((r) => r ? JSON.parse(r) : []).catch(() => []);
  const all = await Promise.all(idx.slice(-100).reverse().map(async (id) => {
    const raw2 = await env.NET_PET_KV.get(`testimonial:${id}`).catch(() => null);
    return raw2 ? JSON.parse(raw2) : null;
  }));
  return json({ testimonials: all.filter(Boolean), total: all.filter(Boolean).length });
}
__name(handleTestimonialAdminList, "handleTestimonialAdminList");
async function handleTestimonialApprove(id, env) {
  if (!id) return json({ error: "testimonial id required" }, 400);
  if (!env.NET_PET_KV) return json({ error: "NET_PET_KV not configured" }, 500);
  const raw2 = await env.NET_PET_KV.get(`testimonial:${id}`).catch(() => null);
  if (!raw2) return json({ error: "Testimonial not found" }, 404);
  const entry = JSON.parse(raw2);
  entry.approved = true;
  entry.approvedAt = (/* @__PURE__ */ new Date()).toISOString();
  await env.NET_PET_KV.put(`testimonial:${id}`, JSON.stringify(entry), { expirationTtl: 86400 * 365 });
  return json({ ok: true, id });
}
__name(handleTestimonialApprove, "handleTestimonialApprove");

// src/queue-consumer.js
init_performance2();
var RESEND_URL2 = "https://api.resend.com/emails";
var FROM_ADDR2 = "OBI <noreply@naturalenglishtraining.com>";
async function processMessage(msg, env) {
  const body = msg.body;
  switch (body?.type) {
    case "email": {
      if (!env.RESEND_API_KEY) {
        msg.ack();
        return;
      }
      try {
        const res = await fetch(RESEND_URL2, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: FROM_ADDR2,
            to: Array.isArray(body.to) ? body.to : [body.to],
            subject: String(body.subject || "").slice(0, 200),
            html: String(body.html || "").slice(0, 10240)
          })
        });
        if (!res.ok) console.warn("email send failed", res.status);
      } catch (e) {
        console.warn("email send error", e?.message);
      }
      msg.ack();
      break;
    }
    case "log":
      console.log(JSON.stringify(body));
      msg.ack();
      break;
    default:
      console.warn("unknown queue message type", body?.type);
      msg.ack();
  }
}
__name(processMessage, "processMessage");
async function handleQueue(batch, env) {
  for (const msg of batch.messages) {
    await processMessage(msg, env);
  }
}
__name(handleQueue, "handleQueue");

// src/quota.js
init_performance2();
async function checkQuota(env, studentId, type) {
  if (!studentId || studentId.startsWith("sov100-")) {
    return { allowed: true };
  }
  if (!env.RATELIMIT) return { allowed: true };
  const limits = { deepgram: 60, chat: 30 };
  const limit = limits[type];
  if (limit === void 0) throw new Error(`Unsupported quota type: ${type}`);
  const hourBucket = Math.floor(Date.now() / 36e5);
  const key = `quota:${studentId}:${type}:${hourBucket}`;
  try {
    const stored = await env.RATELIMIT.get(key);
    const count = stored ? parseInt(stored, 10) : 0;
    if (count >= limit) {
      const retryAfter = Math.ceil(((hourBucket + 1) * 36e5 - Date.now()) / 1e3);
      return { allowed: false, retryAfter };
    }
    await env.RATELIMIT.put(key, String(count + 1), { expirationTtl: 7200 });
  } catch (e) {
    return { allowed: true };
  }
  return { allowed: true };
}
__name(checkQuota, "checkQuota");

// src/idempotency.js
init_performance2();
async function withIdempotency(env, request, handler) {
  const idempotencyKey = request.headers.get("Idempotency-Key");
  if (!idempotencyKey) return handler();
  const data = new TextEncoder().encode(idempotencyKey);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hexHash = Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  const kvKey = `idempotency:${hexHash}`;
  const cached = await env.NET_PET_KV.get(kvKey, "json");
  if (cached) {
    return new Response(JSON.stringify(cached.body), {
      status: cached.status,
      headers: { "Content-Type": "application/json", "X-Idempotent-Replay": "true" }
    });
  }
  const response = await handler();
  if (response.ok) {
    try {
      const body = await response.clone().json();
      await env.NET_PET_KV.put(kvKey, JSON.stringify({ status: response.status, body }), {
        expirationTtl: 86400
      });
    } catch {
    }
  }
  return response;
}
__name(withIdempotency, "withIdempotency");

// src/deletion.js
init_performance2();
async function handleStudentErase(studentId, env, performedBy = "admin") {
  const ts = Math.floor(Date.now() / 1e3);
  let d1Rows = 0;
  let kvKeys = 0;
  let doDeleted = 0;
  const results = await env.SOUL_DB.batch([
    env.SOUL_DB.prepare("DELETE FROM soul_prompts WHERE student_id = ?").bind(studentId),
    env.SOUL_DB.prepare("DELETE FROM error_log WHERE student_id = ?").bind(studentId)
  ]);
  d1Rows = results.reduce((a, r) => a + (r.meta?.changes || 0), 0);
  if (env.PETS) {
    try {
      const petStub = env.PETS.get(env.PETS.idFromName(studentId));
      const r = await petStub.fetch(new Request("https://do/purge?studentId=" + studentId, { method: "POST" }));
      const data = await r.json();
      if (data.ok) doDeleted++;
    } catch (e) {
      console.warn("PET_DO_PURGE_FAIL:", e.message);
    }
  }
  if (env.MEMORY) {
    try {
      const memStub = env.MEMORY.get(env.MEMORY.idFromName(studentId));
      const r = await memStub.fetch(new Request("https://do/purge?studentId=" + studentId, { method: "POST" }));
      const data = await r.json();
      if (data.ok) doDeleted++;
    } catch (e) {
      console.warn("MEMORY_DO_PURGE_FAIL:", e.message);
    }
  }
  if (env.LEDGER) {
    try {
      const ledgerStub = env.LEDGER.get(env.LEDGER.idFromName(studentId));
      const r = await ledgerStub.fetch(new Request("https://do/purge?studentId=" + studentId, { method: "POST" }));
      const data = await r.json();
      if (data.ok) doDeleted++;
    } catch (e) {
      console.warn("LEDGER_DO_PURGE_FAIL:", e.message);
    }
  }
  try {
    await env.SOUL_DB.prepare(
      "INSERT INTO audit_log_v2 (id, ts, action, target, performed_by, metadata) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(
      `aud-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ts,
      "STUDENT_ERASE",
      studentId,
      performedBy,
      JSON.stringify({ student_id: studentId, ip: env.CF_IP || "unknown" })
    ).run();
  } catch (e) {
    console.warn("audit_log insert failed:", e.message);
  }
  const kvKeyPrefixes = [
    `student_profile_${studentId}`,
    `session_history_${studentId}`,
    `srs_data_${studentId}`,
    `phonics_progress_${studentId}`,
    `vocab_list_${studentId}`,
    `vocab_arc_${studentId}`,
    `lang:${studentId}`,
    `goals:${studentId}`,
    `subscription:${studentId}`,
    `student_pw_${studentId}`,
    `streak:${studentId}`,
    `anticheat:${studentId}:`,
    `chat_memory:${studentId}`,
    `srs:${studentId}:`,
    `saveface:${studentId}:`,
    `referral-list:${studentId}`
  ];
  for (const key of kvKeyPrefixes) {
    try {
      await env.NET_PET_KV.delete(key);
      kvKeys++;
    } catch (_2) {
    }
  }
  for (const pattern of ["anticheat:", "srs:", "saveface:", "referral-list:"]) {
    let cursor;
    do {
      const listed = await env.NET_PET_KV.list({ prefix: pattern + studentId, cursor });
      await Promise.all(listed.keys.map((k) => env.NET_PET_KV.delete(k.name)));
      kvKeys += listed.keys.length;
      cursor = listed.list_complete ? void 0 : listed.cursor;
    } while (cursor);
  }
  let classCursor;
  do {
    const listed = await env.NET_PET_KV.list({ prefix: `class_transcript_${studentId}_`, cursor: classCursor });
    await Promise.all(listed.keys.map((k) => env.NET_PET_KV.delete(k.name)));
    kvKeys += listed.keys.length;
    classCursor = listed.list_complete ? void 0 : listed.cursor;
  } while (classCursor);
  if (env.RATELIMIT) {
    let cursor = void 0;
    do {
      const listed = await env.RATELIMIT.list({ prefix: `quota:${studentId}:`, cursor });
      await Promise.all(listed.keys.map((k) => env.RATELIMIT.delete(k.name)));
      kvKeys += listed.keys.length;
      cursor = listed.list_complete ? void 0 : listed.cursor;
    } while (cursor);
  }
  if (env.STUDENT_MEMORY) {
    try {
      const fullKey = `mem:${studentId}`;
      await env.STUDENT_MEMORY.delete(fullKey);
      kvKeys++;
    } catch (e) {
      console.warn("STUDENT_MEMORY_PURGE_FAIL:", e.message);
    }
  }
  return { ok: true, purged: { d1_rows: d1Rows, kv_keys: kvKeys, do_deleted: doDeleted, student_id: studentId, timestamp: ts } };
}
__name(handleStudentErase, "handleStudentErase");

// src/auth.js
init_performance2();
var _clerkClient = null;
var _clerkLoadFailed = false;
async function getClerkClient(env) {
  if (_clerkLoadFailed) return null;
  if (_clerkClient) return _clerkClient;
  try {
    const mod = await Promise.resolve().then(() => (init_dist(), dist_exports));
    _clerkClient = mod.createClerkClient({
      secretKey: env.CLERK_SECRET_KEY,
      publishableKey: env.CLERK_PUBLISHABLE_KEY
    });
    return _clerkClient;
  } catch {
    _clerkLoadFailed = true;
    return null;
  }
}
__name(getClerkClient, "getClerkClient");
async function verifyClerkSession(request, env) {
  if (!env.CLERK_SECRET_KEY) return null;
  const clerkClient = await getClerkClient(env);
  if (!clerkClient) return null;
  try {
    const requestState = await clerkClient.authenticateRequest(request, {
      publishableKey: env.CLERK_PUBLISHABLE_KEY
    });
    if (!requestState.isSignedIn) return null;
    const auth = requestState.toAuth();
    return { userId: auth.userId, sessionId: auth.sessionId };
  } catch {
    return null;
  }
}
__name(verifyClerkSession, "verifyClerkSession");

// src/router.js
init_seats();
init_invoices();
var app = new Hono2();
app.use("*", async (c, next) => {
  await next();
  c.res = new Response(c.res.body, {
    status: c.res.status,
    headers: {
      ...Object.fromEntries(c.res.headers),
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(self)",
      ...c.req.url.startsWith("https://") ? { "Strict-Transport-Security": "max-age=31536000; includeSubDomains" } : {}
    }
  });
});
var TRUSTED_ORIGINS = /* @__PURE__ */ new Set([
  "https://net-pet-ai.mrmichaelhobbs123.workers.dev",
  "https://net-pet-ai-dev.mrmichaelhobbs123.workers.dev",
  "https://tigers-4room.pages.dev",
  "https://naturalenglishtraining.com",
  "https://www.naturalenglishtraining.com"
]);
app.use("/api/*", async (c, next) => {
  if (c.req.method === "GET" || c.req.method === "HEAD") return next();
  if (c.req.header("x-pa-auth") && c.req.header("x-pa-auth") === c.env?.PA_AUTH_KEY) return next();
  const origin = c.req.header("Origin");
  if (!origin) return next();
  if (!TRUSTED_ORIGINS.has(origin)) {
    return c.json({ error: "CSRF: origin not allowed" }, 403);
  }
  return next();
});
app.use("/api/:path*", async (c, next) => {
  const contentLength = c.req.header("Content-Length");
  if (contentLength && parseInt(contentLength, 10) > 65536) {
    return c.json({ error: "Request too large", max: 65536 }, 413);
  }
  await next();
});
app.use("/api/v1/health", async (c, next) => {
  const cache2 = caches.default;
  const cached = await cache2.match(c.req.url);
  if (cached) return cached;
  await next();
  if (c.res.ok) {
    c.executionCtx.waitUntil(cache2.put(c.req.url, c.res.clone()));
  }
});
app.use("/api/v1/version", async (c, next) => {
  const cache2 = caches.default;
  const cached = await cache2.match(c.req.url);
  if (cached) return cached;
  await next();
  if (c.res.ok) {
    c.executionCtx.waitUntil(cache2.put(c.req.url, c.res.clone()));
  }
});
app.get("/api/deepgram-token", async (c, next) => {
  const studentId = c.req.query("studentId");
  if (studentId && !studentId.startsWith("sov100-")) {
    const { allowed, retryAfter } = await checkQuota(c.env, studentId, "deepgram");
    if (!allowed) {
      return c.json({ error: "Rate limit exceeded", retryAfter }, 429, {
        "Retry-After": String(retryAfter)
      });
    }
  }
  return next();
});
app.post("/api/chat", async (c, next) => {
  let studentId;
  try {
    const bodyText = await c.req.raw.clone().text();
    studentId = JSON.parse(bodyText).studentId;
  } catch {
  }
  if (studentId && !studentId.startsWith("sov100-")) {
    const { allowed, retryAfter } = await checkQuota(c.env, studentId, "chat");
    if (!allowed) {
      return c.json({ error: "Rate limit exceeded", retryAfter }, 429, {
        "Retry-After": String(retryAfter)
      });
    }
  }
  return next();
});
app.post(
  "/api/payment/confirm",
  (c) => withIdempotency(
    c.env,
    c.req.raw,
    () => index_default.fetch(c.req.raw.clone(), c.env, c.executionCtx)
  )
);
app.post(
  "/api/waitlist",
  (c) => withIdempotency(
    c.env,
    c.req.raw,
    () => index_default.fetch(c.req.raw.clone(), c.env, c.executionCtx)
  )
);
app.post(
  "/api/referral/register",
  (c) => withIdempotency(
    c.env,
    c.req.raw,
    () => index_default.fetch(c.req.raw.clone(), c.env, c.executionCtx)
  )
);
app.use("/api/*", async (c, next) => {
  const session = await verifyClerkSession(c.req.raw.clone(), c.env);
  if (session) c.set("clerkUserId", session.userId);
  return next();
});
app.delete("/api/student/:id/erase", async (c) => {
  const authFail = await checkAdminKey(c.req.raw, c.env);
  if (authFail) return authFail;
  const studentId = c.req.param("id");
  if (!studentId) return c.json({ error: "student id required" }, 400);
  const result = await handleStudentErase(studentId, c.env);
  return c.json(result);
});
app.get("/api/v1/health", (c) => {
  return c.json({ status: "ok", version: "v1", worker: "net-pet-ai" }, 200, {
    "Cache-Control": "public, max-age=60"
  });
});
app.get("/api/v1/version", (c) => {
  return c.json({ worker: "net-pet-ai", phase: "P6+P7+P9+P10+P12", score: 99 }, 200, {
    "Cache-Control": "public, max-age=60"
  });
});
app.get("/api/v1/metrics", async (c) => {
  if (!c.env?.SOUL_DB) return c.json({ error: "DB unavailable" }, 503);
  const rows = await c.env.SOUL_DB.prepare(
    "SELECT ts, tag, message, student_id FROM error_log ORDER BY ts DESC LIMIT 20"
  ).all();
  return c.json({ errors: rows.results ?? [], count: rows.results?.length ?? 0 });
});
app.get("/api/lead", (c) => c.json({ error: "POST required" }, 405));
app.get("/api/student/:id/export", async (c) => {
  const authFail = await checkAdminKey(c.req.raw, c.env);
  if (authFail) return authFail;
  const studentId = c.req.param("id");
  if (!studentId) return c.json({ error: "student id required" }, 400);
  const kv = c.env.NET_PET_KV;
  const hexKey = c.env.ENCRYPTION_KEY;
  async function readKv(key) {
    try {
      return await kv.get(key);
    } catch {
      return null;
    }
  }
  __name(readKv, "readKv");
  async function readDecrypted(key) {
    const raw2 = await readKv(key);
    if (!raw2) return null;
    if (hexKey && raw2.startsWith("v1:")) {
      try {
        const plain = await decryptField(raw2.slice(3), hexKey);
        return JSON.parse(plain);
      } catch {
      }
    }
    try {
      return JSON.parse(raw2);
    } catch {
      return raw2;
    }
  }
  __name(readDecrypted, "readDecrypted");
  const [profile, sessionHistory, phonicsProgress, srsData2, vocabList, vocabArc, lang, goals, subscription, streak] = await Promise.all([
    readDecrypted(`student_profile_${studentId}`),
    readDecrypted(`session_history_${studentId}`),
    readDecrypted(`phonics_progress_${studentId}`),
    readDecrypted(`srs_data_${studentId}`),
    readDecrypted(`vocab_list_${studentId}`),
    readDecrypted(`vocab_arc_${studentId}`),
    readKv(`lang:${studentId}`),
    readKv(`goals:${studentId}`),
    readKv(`subscription:${studentId}`),
    readKv(`streak:${studentId}`)
  ]);
  const classTranscripts = {};
  let ctCursor;
  do {
    const listed = await kv.list({ prefix: `class_transcript_${studentId}_`, cursor: ctCursor });
    await Promise.all(listed.keys.map(async (k) => {
      const v = await readDecrypted(k.name);
      if (v !== null && v !== void 0) classTranscripts[k.name] = v;
    }));
    ctCursor = listed.list_complete ? void 0 : listed.cursor;
  } while (ctCursor);
  return c.json({
    student_id: studentId,
    exported_at: (/* @__PURE__ */ new Date()).toISOString(),
    profile,
    session_history: sessionHistory,
    phonics_progress: phonicsProgress,
    srs_data: srsData2,
    vocab_list: vocabList,
    vocab_arc: vocabArc,
    lang,
    goals,
    subscription,
    streak,
    class_transcripts: classTranscripts
  });
});
app.all("*", async (c) => {
  return index_default.fetch(c.req.raw, c.env, c.executionCtx);
});
var router_default = {
  fetch: app.fetch,
  scheduled: index_default.scheduled,
  queue: handleQueue
};
export {
  CommandDO,
  LedgerDO,
  MemoryDO,
  PetDO,
  router_default as default
};
//# sourceMappingURL=router.js.map
