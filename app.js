// Lecture-to-Flashcards Tutor
// Card generation is extractive and runs entirely in the browser:
// sentences are scored by key-word frequency, the most important ones
// are picked, and each becomes a definition, number, or fill-in-the-blank
// card. No API, no model, no upload.

const STOPWORDS = new Set(("a,an,the,and,or,but,if,then,else,when,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,down,in,out,on,off,over,under,again,further,once,here,there,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,can,will,just,should,now,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,would,could,shall,may,might,must,this,that,these,those,i,you,he,she,it,we,they,my,your,his,her,its,our,their,what,which,who,whom,how,why,as,an,across,among,within,without,toward,towards,around,behind,beyond,per,via,upon,onto,along,amid,despite,except,also,mainly,mostly,nearly,almost,often,usually,first,second,third,new,old,large,small,great,main,different,another,several,many,much,less,least,able,likely,possible,using,used,make,made,take,got,give,find,know,see,say,go,come").split(","));

const SAMPLE_LECTURE = `Photosynthesis is the process by which green plants convert sunlight, water and carbon dioxide into glucose and oxygen. It takes place mainly in the leaves, inside tiny organelles called chloroplasts. Chlorophyll is the green pigment that absorbs light energy, mostly from the blue and red parts of the spectrum. The light-dependent reactions happen on the thylakoid membranes inside the chloroplast. During these reactions, water molecules are split, releasing oxygen as a by-product. The energy captured from light is stored in two molecules called ATP and NADPH. The second stage is the Calvin cycle, which takes place in the stroma of the chloroplast. In the Calvin cycle, carbon dioxide from the air is fixed into organic molecules using the ATP and NADPH made in the first stage. The main product of the cycle is a three-carbon sugar called glyceraldehyde-3-phosphate, which the plant uses to build glucose and starch. Photosynthesis supplies nearly all the oxygen in Earth's atmosphere. It also forms the base of almost every food chain, because plants convert light energy into chemical energy that animals can use. Factors that affect the rate of photosynthesis include light intensity, carbon dioxide concentration and temperature. When light intensity is low, the rate is limited by the lack of energy. When carbon dioxide is scarce, the Calvin cycle slows down. Most plants photosynthesise fastest at temperatures between 25 and 35 degrees Celsius, because the enzymes involved work best in that range.`;

function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.split(/\s+/).length >= 4);
}

function contentWords(sentence) {
  return (sentence.toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter(w => w.length > 2 && !STOPWORDS.has(w));
}

function wordFrequencies(sentences) {
  const freq = {};
  for (const s of sentences) {
    for (const w of contentWords(s)) freq[w] = (freq[w] || 0) + 1;
  }
  return freq;
}

function scoreSentence(sentence, freq) {
  const words = contentWords(sentence);
  if (!words.length) return 0;
  const sum = words.reduce((a, w) => a + (freq[w] || 0), 0);
  return sum / Math.sqrt(words.length);
}

function makeDefinitionCard(sentence) {
  // Skip sentences that open with a subordinate clause ("When X is...").
  if (/^(When|If|While|Because|Although|Though|During|After|Before|As|In|On|At|For|With|By)\b/i.test(sentence)) return null;
  const m = sentence.match(/^([A-Z][A-Za-z0-9 ,'\-]{1,45}?)\s+(is|are|refers to|means)\b/);
  if (!m) return null;
  const subject = m[1].trim();
  const verb = m[2] === "are" ? "are" : "is";
  const wordCount = subject.split(/\s+/).length;
  if (wordCount < 1 || wordCount > 4) return null;
  if (subject.includes(",")) return null;
  return {
    type: "Definition",
    question: `What ${verb} ${subject}?`,
    answer: sentence
  };
}

function makeNumberCard(sentence) {
  // Standalone numbers only: skip digits inside hyphenated words
  // (e.g. the "3" in glyceraldehyde-3-phosphate).
  const m = sentence.match(/(?<![A-Za-z0-9-])\d+(?:\.\d+)?%?(?![A-Za-z0-9-])/);
  if (!m) return null;
  const num = m[0];
  const blanked = sentence.replace(num, "____");
  if (blanked === sentence) return null;
  return {
    type: "Number",
    question: blanked,
    answer: `${num} — ${sentence}`
  };
}

function makeClozeCard(sentence, freq) {
  const words = contentWords(sentence);
  if (!words.length) return null;
  let best = null, bestScore = 0;
  for (const w of new Set(words)) {
    if (w.length < 4) continue;
    const s = freq[w] || 0;
    if (s > bestScore) { bestScore = s; best = w; }
  }
  if (!best) return null;
  const re = new RegExp(`\\b${best}\\b`, "i");
  const blanked = sentence.replace(re, "____");
  if (blanked === sentence) return null;
  return {
    type: "Fill in the blank",
    question: blanked,
    answer: `${best} — ${sentence}`
  };
}

function generateCards(text, count) {
  const sentences = splitSentences(text);
  if (sentences.length < 3) return { error: "Paste a longer lecture — at least 3 sentences, so there is something to turn into cards." };
  const freq = wordFrequencies(sentences);
  const ranked = sentences
    .map(s => ({ sentence: s, score: scoreSentence(s, freq) }))
    .sort((a, b) => b.score - a.score);
  const cards = [];
  const seen = new Set();
  for (const { sentence } of ranked) {
    if (cards.length >= count) break;
    const card = makeDefinitionCard(sentence)
      || makeNumberCard(sentence)
      || makeClozeCard(sentence, freq);
    if (!card) continue;
    const key = card.question.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    cards.push(card);
  }
  if (!cards.length) return { error: "Could not make cards from this text. Try a lecture with more plain sentences." };
  return { cards };
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---- UI ----
if (typeof document !== "undefined") {
const $ = id => document.getElementById(id);
let deck = [], index = 0, known = 0, unknown = 0, flipped = false, unknownCards = [];

function showStep(name) {
  ["input-step", "study-step", "result-step"].forEach(id => {
    $(id).hidden = id !== name;
  });
}

function renderCard() {
  const card = deck[index];
  flipped = false;
  $("card").classList.remove("flipped");
  $("card-type").textContent = card.type;
  $("card-text").textContent = card.question;
  $("card-hint").textContent = "Tap the card to flip it";
  $("progress-text").textContent = `Card ${index + 1} of ${deck.length}`;
  $("score-text").textContent = `Known ${known} · Unknown ${unknown}`;
}

function flipCard() {
  const card = deck[index];
  flipped = !flipped;
  $("card").classList.toggle("flipped", flipped);
  $("card-text").textContent = flipped ? card.answer : card.question;
  $("card-hint").textContent = flipped ? "Tap to hide the answer" : "Tap the card to flip it";
}

function mark(isKnown) {
  if (isKnown) known++; else { unknown++; unknownCards.push(deck[index]); }
  index++;
  if (index >= deck.length) {
    $("result-text").textContent = `You marked ${known} known and ${unknown} unknown out of ${deck.length} cards.`;
    $("retry-unknown-btn").style.display = unknown ? "" : "none";
    showStep("result-step");
  } else {
    renderCard();
  }
}

$("lecture-input").addEventListener("input", e => {
  const words = e.target.value.trim().split(/\s+/).filter(Boolean).length;
  $("word-count").textContent = e.target.value.trim() ? `${words} words` : "";
});

$("sample-btn").addEventListener("click", () => {
  $("lecture-input").value = SAMPLE_LECTURE;
  $("lecture-input").dispatchEvent(new Event("input"));
  $("input-error").hidden = true;
});

$("file-input").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    $("lecture-input").value = reader.result;
    $("lecture-input").dispatchEvent(new Event("input"));
  };
  reader.readAsText(file);
});

$("make-btn").addEventListener("click", () => {
  const text = $("lecture-input").value.trim();
  const count = parseInt($("card-count").value, 10);
  if (!text) {
    $("input-error").textContent = "Paste some lecture text first, upload a file, or try the sample lecture.";
    $("input-error").hidden = false;
    return;
  }
  const result = generateCards(text, count);
  if (result.error) {
    $("input-error").textContent = result.error;
    $("input-error").hidden = false;
    return;
  }
  $("input-error").hidden = true;
  deck = shuffle(result.cards);
  index = 0; known = 0; unknown = 0; unknownCards = [];
  showStep("study-step");
  renderCard();
});

$("card").addEventListener("click", flipCard);
$("card").addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipCard(); }
});
$("known-btn").addEventListener("click", () => mark(true));
$("unknown-btn").addEventListener("click", () => mark(false));
$("shuffle-btn").addEventListener("click", () => {
  deck = shuffle(deck);
  index = 0;
  renderCard();
});
$("restart-btn").addEventListener("click", () => showStep("input-step"));
$("retry-unknown-btn").addEventListener("click", () => {
  deck = shuffle(unknownCards);
  index = 0; known = 0; unknown = 0; unknownCards = [];
  showStep("study-step");
  renderCard();
});
$("new-btn").addEventListener("click", () => showStep("input-step"));
}

// Exported for the Node test harness (no effect in the browser).
if (typeof module !== "undefined") {
  module.exports = { generateCards, splitSentences, scoreSentence, SAMPLE_LECTURE };
}
