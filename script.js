// ============================================
// THEME TOGGLE (persisted)
// ============================================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ============================================
// TYPING EFFECT (hero eyebrow)
// ============================================
const phrases = [
  'const developer = "Neha Pande";',
  'status: open to work',
  'building with React + Claude API'
];
const typedEl = document.getElementById('typed');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 55);
}
typeLoop();

// ============================================
// ACTIVE TAB HIGHLIGHTING ON SCROLL
// ============================================
const sections = document.querySelectorAll('.section');
const tabs = document.querySelectorAll('.tab');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => observer.observe(section));

// (Skill tag highlight is now handled purely via CSS :hover — no JS needed)

// ============================================
// VISITOR COUNTER (unique profiles vs total visits)
// Uses CounterAPI (counterapi.dev) — a free, keyless counter service.
// "Unique" increments once per browser (gated by localStorage).
// "Total" increments on every page load/visit.
// ============================================
(async function visitorCounter() {
  const WORKSPACE = 'nehapande09-portfolio';
  const TOTAL_COUNTER = 'total-visits';
  const UNIQUE_COUNTER = 'unique-visitors';
  const base = `https://api.counterapi.dev/v1/${WORKSPACE}`;
  const el = document.getElementById('visitorCounter');

  try {
    // Always bump total visits
    const totalRes = await fetch(`${base}/${TOTAL_COUNTER}/up`);
    const totalData = await totalRes.json();
    const totalCount = totalData.count ?? totalData.value ?? '—';

    // Bump unique visitors only once per browser
    let uniqueCount;
    const alreadyVisited = localStorage.getItem('np_portfolio_visited');
    if (!alreadyVisited) {
      const uniqueRes = await fetch(`${base}/${UNIQUE_COUNTER}/up`);
      const uniqueData = await uniqueRes.json();
      uniqueCount = uniqueData.count ?? uniqueData.value ?? '—';
      localStorage.setItem('np_portfolio_visited', '1');
    } else {
      const uniqueRes = await fetch(`${base}/${UNIQUE_COUNTER}`);
      const uniqueData = await uniqueRes.json();
      uniqueCount = uniqueData.count ?? uniqueData.value ?? '—';
    }

    el.textContent = `// ${uniqueCount} unique visitors · ${totalCount} total visits`;
  } catch (err) {
    el.textContent = '// visitor stats unavailable right now';
  }
})();

// ============================================
// QUIZ GAME
// ============================================
const quizQuestions = [
  {
    q: 'What does `useEffect` run after, by default?',
    options: ['Before every render', 'After every render', 'Only once, ever', 'Only on unmount'],
    answer: 1
  },
  {
    q: 'In Python, what does `*args` let a function accept?',
    options: ['A single keyword argument', 'A fixed number of arguments', 'Any number of positional arguments', 'Only string arguments'],
    answer: 2
  },
  {
    q: 'What does REST stand for?',
    options: ['Rapid State Transfer', 'Representational State Transfer', 'Remote Endpoint State Transfer', 'Resource State Transformation'],
    answer: 1
  },
  {
    q: 'Which hook lets you skip re-running expensive calculations on every render?',
    options: ['useRef', 'useMemo', 'useState', 'useContext'],
    answer: 1
  },
  {
    q: 'In SQL, what\'s the key difference between WHERE and HAVING?',
    options: [
      'They are exactly the same',
      'WHERE filters rows before grouping, HAVING filters after grouping',
      'HAVING filters rows before grouping, WHERE filters after',
      'WHERE only works with numbers'
    ],
    answer: 1
  }
];

let quizIndex = 0;
let quizScore = 0;

const quizQuestionEl = document.getElementById('quizQuestion');
const quizOptionsEl = document.getElementById('quizOptions');
const quizProgressEl = document.getElementById('quizProgress');
const quizScoreEl = document.getElementById('quizScore');
const quizResultEl = document.getElementById('quizResult');
const quizResultTextEl = document.getElementById('quizResultText');
const quizRestartBtn = document.getElementById('quizRestart');
const quizCardEl = document.getElementById('quizCard');

function renderQuizQuestion() {
  const current = quizQuestions[quizIndex];
  quizProgressEl.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
  quizScoreEl.textContent = `Score: ${quizScore}`;
  quizQuestionEl.textContent = current.q;
  quizOptionsEl.innerHTML = '';

  current.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleQuizAnswer(i, btn));
    quizOptionsEl.appendChild(btn);
  });
}

function handleQuizAnswer(selectedIndex, btnEl) {
  const current = quizQuestions[quizIndex];
  const allBtns = quizOptionsEl.querySelectorAll('.quiz-option');
  allBtns.forEach(b => b.disabled = true);

  if (selectedIndex === current.answer) {
    btnEl.classList.add('correct');
    quizScore++;
  } else {
    btnEl.classList.add('incorrect');
    allBtns[current.answer].classList.add('correct');
  }

  quizScoreEl.textContent = `Score: ${quizScore}`;

  setTimeout(() => {
    quizIndex++;
    if (quizIndex < quizQuestions.length) {
      renderQuizQuestion();
    } else {
      showQuizResult();
    }
  }, 900);
}

function showQuizResult() {
  quizQuestionEl.style.display = 'none';
  quizOptionsEl.style.display = 'none';
  quizProgressEl.parentElement.style.display = 'none';
  quizResultEl.hidden = false;
  quizResultTextEl.textContent = `You scored ${quizScore} out of ${quizQuestions.length}!`;
}

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizQuestionEl.style.display = '';
  quizOptionsEl.style.display = '';
  quizProgressEl.parentElement.style.display = '';
  quizResultEl.hidden = true;
  renderQuizQuestion();
}

quizRestartBtn.addEventListener('click', restartQuiz);
renderQuizQuestion();

// ============================================
// FOOTER YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();