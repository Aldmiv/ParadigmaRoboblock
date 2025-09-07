(function () {
  // список фраз робота
const robotPhrases = [
  "Классно получается!",
  "А ты, смотрю, разбираешься!",
  "Бип-буп! Я в восторге!",
  "Ты — чемпион проводков!",
  "Вжух — и ещё шаг к победе!",
  "Ошибки — топливо для прогресса!",
  "Ого! Мозги кипят, как чайник!",
  "Ты кодишь быстрее, чем я моргаю!",
  "Твоя логика — как лазер: точная!",
  "Фантастика!",
  "Ещё чуть-чуть — и заработает!",
  "Ты приручил электричество!",
  "Оп-па! Вот это апгрейд мозга!",
  "Сегодня — маленький шаг, завтра — гигантский робот!",
  "Ты творишь технологическую магию!",
  "Бип! Обнаружен талант!",
  "У тебя всё под контроллером!",
  "У тебя золотые руки и платиновый мозг!",
  "Ты быстрее, чем загрузка драйвера!",
  "Вау!",
  "Уровень: гений!",
  "Пик-пик!",
  "Так держать! Вперёд к сборке мечты!",
  "Клавиатура гордится каждым нажатием!",
  "Похоже, ты прирождённый инженер!",
  "Ультра-режим включён!",
  "Я бы прыгал от счастья, если б мог!",
  "Пинов много, хорошо что ты не запутался!",
  "Прямо сейчас ты умнее, чем минуту назад!",
  "У-у-у! Взрыв креатива!",
  "Даже резисторы не сопротивляются твоему таланту!",
  "Ты — супер программист!",
  "Бип! Идеальная компиляция настроения!",
  "Ого, как ровно всё работает!",
  "Я проверил — это гениально!",
  "Давай ещё — у тебя отлично выходит!",
  "Бип-боп! Мотивация обновлена!",
  "Я уже фанат твоего кода!",
  "Как много кнопок! И ты все понял? Супер!",
  "Легендарно! Так делают мастера!",
  "Внутри тебя живёт инженер-волшебник!",
  "Лови похвалу пакетами: 1024 «молодцов»!",
  "Твоя смекалка — суперсила!",
  "Вау! Протокол успеха установлен!",
  "С таким подходом любая плата оживёт!",
  "Бип! У тебя дар создавать будущее!",
  "Мне бы твой талант!",
  "Потрясающе!",
  "Я бы сам занялся программированием, но больше люблю бегать",
  "Продолжай! Твоё будущее сияет ярче LED!"
];

  // Приветствия
  const robotGreetings = [
    "Привет! Я уже скучал по схемам!",
    "Бип-буп! Прилетел помогать!",
    "Соскучился?",
    "Я тут! Давай нажимать на кнопки!"
  ];

  // Прощания (новые)
  const robotFarewells = [
    "Не скучай!",
    "Бип! Не забудь сохранить проект.",
    "Бип! Я рядом, зови когда нужен!",
    "Уполз на зарядку. До встречи!",
    "Скрылся в тени компилятора…"
  ];

  // ============== СТИЛИ ==============
  const css = `
  #robowalk {
    position: fixed;
    left: 0; right: 0; bottom: 6px;
    height: 110px;
    pointer-events: none;
    z-index: 2;
    overflow: visible;
    transition: transform .25s ease, opacity .2s ease;
  }
  #robowalk.rb-hidden{
    transform: translateY(120%);
    opacity: 0;
  }
  #robowalk .path {
    position: absolute;
    left: -10vw;
    bottom: 0;
    animation: rw-roam-x 18s linear infinite alternate;
    pointer-events: auto;
  }
  #robowalk .robot {
    width: 100px;
    height: 80px;
    transform-origin: 50% 100%;
    animation: rw-face-dir 18s linear infinite, rw-bob 1.6s ease-in-out infinite;
    filter: drop-shadow(0 2px 2px rgba(0,0,0,.35));
  }
  #robowalk .leg { transform-origin: 20px 10px; animation: rw-step 0.6s ease-in-out infinite alternate; }
  #robowalk .leg.back { animation-delay: .3s; }
  #robowalk .eye { animation: rw-blink 4s infinite; }

  #robotSpeech{
    position: absolute;
    left: 50%;
    bottom: 88px;
    transform: translateX(-50%);
    background: rgba(255,255,255,.96);
    color: #111;
    font: 14px/1.25 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    padding: 6px 10px;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0,0,0,.25);
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity .18s ease, transform .18s ease;
  }
  #robotSpeech::after{
    content:'';
    position:absolute;
    left:50%;
    bottom:-6px;
    transform: translateX(-50%);
    border:6px solid transparent;
    border-top-color: rgba(255,255,255,.96);
  }
  #robotSpeech.show{
    opacity: 1;
    transform: translateX(-50%) translateY(-2px);
  }

  #robotToggleBtn{
    position: fixed;
    left: 25px;
    bottom: 10px;
    z-index: 0;
    background: #2b2b2b;
    color: #e8ffe0;
    border: 0;
    border-radius: 8px;
    padding: 8px 12px;
    font: 600 13px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    box-shadow: 0 6px 20px rgba(0,0,0,.35);
    cursor: pointer;
    transition: transform .08s ease, opacity .2s ease;
  }
  #robotToggleBtn:hover{ transform: translateY(-1px); }

  @media (prefers-reduced-motion: reduce) {
    #robowalk { display: none; }
    #robotToggleBtn { display: none; }
  }

  @keyframes rw-roam-x { 0%{transform:translateX(0)} 100%{transform:translateX(calc(100vw + 20vw))} }
  @keyframes rw-face-dir { 0%,49%{transform:scaleX(1)} 50%,100%{transform:scaleX(-1)} }
  @keyframes rw-bob { 0%,100%{transform-origin:50% 100%} 50%{transform-origin:50% 98%} }
  @keyframes rw-step { from{transform:rotate(14deg)} to{transform:rotate(-18deg)} }
  @keyframes rw-blink { 0%,92%,100%{opacity:1} 94%,96%{opacity:0} }
  `;

  // ============== ВСТАВКА СТИЛЕЙ ==============
  if (!document.getElementById('robot-walker-style')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'robot-walker-style';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  // ============== РАЗМЕТКА РОБОТА ==============
  let wrapper = document.getElementById('robowalk');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'robowalk';
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.innerHTML = `
      <div class="path">
        <div id="robotSpeech"></div>
        <svg class="robot" viewBox="0 0 140 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Robo helper">
          <ellipse cx="70" cy="102" rx="28" ry="6" fill="rgba(0,0,0,.25)"/>
          <g class="leg back">
            <rect x="58" y="70" width="8" height="24" rx="4" fill="#6c6f7a"/>
            <rect x="58" y="92" width="14" height="6" rx="3" fill="#8c909b"/>
          </g>
          <g class="leg">
            <rect x="74" y="70" width="8" height="24" rx="4" fill="#7a7f89"/>
            <rect x="68" y="92" width="14" height="6" rx="3" fill="#9aa0ab"/>
          </g>
          <rect x="40" y="40" width="60" height="38" rx="10" fill="#aeb6c3" stroke="#5b606b" stroke-width="2"/>
          <rect x="48" y="18" width="44" height="26" rx="8" fill="#c7cfda" stroke="#5b606b" stroke-width="2"/>
          <circle class="eye" cx="60" cy="31" r="3.5" fill="#00ffd0"/>
          <circle class="eye" cx="80" cy="31" r="3.5" fill="#00ffd0"/>
          <line x1="70" y1="18" x2="70" y2="10" stroke="#5b606b" stroke-width="2"/>
          <circle cx="70" cy="7" r="3" fill="#ff4d6d"/>
          <rect x="50" y="50" width="40" height="16" rx="4" fill="#dfe6ef" stroke="#5b606b" stroke-width="1.5"/>
          <circle cx="56" cy="58" r="3" fill="#7bdc00"/>
          <circle cx="66" cy="58" r="3" fill="#ffd166"/>
          <rect x="74" y="54" width="12" height="8" rx="2" fill="#9aa0ab"/>
        </svg>
      </div>
    `;
    document.body.appendChild(wrapper);
  }

  // Кнопка призвать/отозвать
  let toggleBtn = document.getElementById('robotToggleBtn');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'robotToggleBtn';
    document.body.appendChild(toggleBtn);
  }

  // ============== ЛОГИКА ==============
  const path = wrapper.querySelector('.path');
  const bubble = wrapper.querySelector('#robotSpeech');

  let hideTimeout = null;
  let autoTimer = null;
  let visible = true; // по умолчанию робот виден

  const rPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function showPhrase(text, visibleMs = 3000){
    bubble.textContent = text || rPick(robotPhrases);
    bubble.classList.add('show');
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => bubble.classList.remove('show'), visibleMs);
  }

  function setBtnText() {
    toggleBtn.textContent = visible ? "Отозвать робота" : "Позвать робота";
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
      if (visible) showPhrase(rPick(robotPhrases), 3000);
    }, 60000);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }

  function summon() {
    wrapper.classList.remove('rb-hidden');
    visible = true;
    setBtnText();
    showPhrase(rPick(robotGreetings), 3000);
    startAuto();
  }

  function dismiss() {
    // скажем прощание, затем уедем
    showPhrase(rPick(robotFarewells), 6000);
    setTimeout(() => {
      wrapper.classList.add('rb-hidden');
      visible = false;
      setBtnText();
      stopAuto();
    }, 900);
  }

  function toggle() {
    if (visible) { dismiss(); } else { summon(); }
  }

  // События
  path.addEventListener('mouseenter', () => {
    showPhrase(rPick(robotPhrases), 3000);
  });
  path.addEventListener('mouseleave', () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => bubble.classList.remove('show'), 3000);
  });
  path.addEventListener('click', () => showPhrase(rPick(robotPhrases), 3000));
  toggleBtn.addEventListener('click', toggle);

  // Старт
  setBtnText();
  startAuto();
  showPhrase(rPick(robotGreetings), 3000);
})();
