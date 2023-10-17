
// ! ||--------------------------------------------------------------------------------||
// ! ||                              BOTÃO DE START GERAL                              ||
// ! ||--------------------------------------------------------------------------------||

// ! ||--------------------------------------------------------------------------------||
// ! ||                        TELA VERMELHA QUANDO ZERAR O TAKT                       ||
// ! ||--------------------------------------------------------------------------------||

var timerElement = document.getElementById('timer');
var bodyElement = document.body;
var intervalId_takt;


const startBtn = document.getElementById('botao');
let isTimerRunning = false;
let isAnyRunning = false;



let minutos_takt = 0;
let segundos_takt = 0;
let intervalId;

function inserirTempo() {
    const tempoInput = prompt("Insira o tempo desejado (minutos e segundos separados por espaço, ex: 3 30):");

    if (tempoInput !== null) {
        const tempoArray = tempoInput.split(" ");
        if (tempoArray.length === 2) {
            minutos_takt = parseInt(tempoArray[0]);
            segundos_takt = parseInt(tempoArray[1]);

            if (!isNaN(minutos_takt) && !isNaN(segundos_takt)) {
                const tempoFormatado = formatarTempo(minutos_takt, segundos_takt);
                timerElement.textContent = tempoFormatado;
            } else {
                alert("Por favor, insira um tempo válido.");
            }
        } else {
            alert("Formato inválido. Insira minutos e segundos separados por espaço.");
        }
    }
}

function formatarTempo(min, sec) {
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}



function startCountdown() {
  if (isTimerRunning) {
      return; // Timer is already running, do nothing
    }
  if (minutos_takt === 0 && segundos_takt === 0) {
    alert("Por favor, insira um tempo antes de iniciar o cronômetro.");
    return;
  }
  intervalId_takt = setInterval(updateCountdown, 1000);
  isTimerRunning = true;

}

function updateCountdown() {
  if (minutos_takt === 0 && segundos_takt === 0) {
    if (isAnyRunning) {
      console.log('Takt Acabou Com Um Andon Ativo, Stop Time Iniciado !');
      alert('Takt Acabou Com Um Andon Ativo, Stop Time Iniciado !');
      isTimerRunning = false;
      startstoptime();
    } else {
      console.log('Takt Acabou Com Nenhum Andon Ativo, Simulação Redefinida !');
      alert('Takt Acabou Com Nenhum Andon Ativo, Simulação Redefinida !');
      resetCountdown();
    }
  } else {
    console.log('Timing...');
    if (segundos_takt === 0) {
      minutos_takt--;
      segundos_takt = 59;
    } else {
        segundos_takt--;
    }
    timerElement.textContent = formatarTempo(minutos_takt, segundos_takt);
  }
}



// ! ||--------------------------------------------------------------------------------||
// ! ||                          FUNÇÃO DE START DO STOP TIME                          ||
// ! ||--------------------------------------------------------------------------------||

var timerElement_stoptime = document.getElementById('stoptime');
var stoptime_ativo = document.querySelector('.box2');
var intervalId_stoptime;
var minutes_stoptime = 0, seconds_stoptime = 0;
let isStopTimeRunning = false;

function startstoptime() {
  StopAndon_StopTime();
  clearInterval(intervalId_takt);
  timerElement.textContent = '00:00';
  bodyElement.classList.add('red-background');
  stoptime_ativo.classList.add('stoptime-ativo');

  const tabsToDisable = document.querySelectorAll('.boxtab');
  const abas = document.querySelectorAll('.print-tab');
  const nav = document.querySelectorAll('.nav');
  tabsToDisable.forEach(tab => {
    tab.classList.add('disabled-tab');
  });
  abas.forEach(tab => {
    tab.classList.add('disabled-tab-2');
  });
  nav.forEach(tab => {
    tab.classList.add('nav-disabled');
  });


    if (isStopTimeRunning) {
      return; // Timer is already running, do nothing
    }
    isStopTimeRunning = true;
    intervalId_stoptime = setInterval(updatestoptime, 1000);

}

function updatestoptime() {
    seconds_stoptime++;
    if (seconds_stoptime >= 60) {
        seconds_stoptime = 0;
        minutes_stoptime++;
    }

    timerElement_stoptime.textContent = pad(minutes_stoptime) + ':' + pad(seconds_stoptime);
};


// ! ||--------------------------------------------------------------------------------||
// ! ||                           ANIMAÇÃO DOS BOTÕES DO MENU                          ||
// ! ||--------------------------------------------------------------------------------||

const btns = document.querySelectorAll('.btn');
let activeBtn = null;

btns.forEach(btn => {
  btn.addEventListener('click', animation);
});

function animation() {
  if (activeBtn === this) {
    return; // Clicked on the same button again, no action needed
  }

  if (activeBtn) {
    activeBtn.classList.remove('active');
    document.getElementById("botao").disabled = false;
  }

  this.classList.add('active');
  document.getElementById("botao").disabled = true;
  activeBtn = this;
};


// ! ||--------------------------------------------------------------------------------||
// ! ||                              BOTÃO DE RESET GERAL                              ||
// ! ||--------------------------------------------------------------------------------||

function resetCountdown(){
  const buttons = [];
  const intervalIds = [];
  
  for (let i = 1; i <= 8; i++) {
    if (intervalIds[i - 1] !== null) {
      clearInterval(i);
      CorTelaNormal(i);
      intervalIds[i - 1] = null;
      const cronometro = document.getElementById(`andon${i}`);
      const cronometro_tabs = document.getElementById(`andontab${i}`);
      cronometro.textContent = '00:00';
      cronometro_tabs.textContent = '00:00';

      temposCronometros[i] = { segundos: 0, minutos: 0 };

      const botao = document.querySelector(`.btn_andon${i}`);
      botao.classList.remove('animating');
      botao.classList.remove('active');
      
      buttons.push(botao);
    }
  }

  isAnyRunning = false;
  isTimerRunning = false;
  isStopTimeRunning = false;
  bodyElement.classList.remove('red-background');

  clearInterval(intervalId_takt);  
  clearInterval(intervalId_stoptime);

  minutes_stoptime = 0;
  seconds_stoptime = 0;
  timerElement_stoptime.textContent = '00:00';

  totalSeconds = 7 * 60; 
  timerElement.textContent = '07:00';

  segundos = 0;
  minutos = 0;

  const tabsToDisable = document.querySelectorAll('.boxtab');
  const abas = document.querySelectorAll('.print-tab');
  const nav = document.querySelectorAll('.nav');
  tabsToDisable.forEach(tab => {
    tab.classList.remove('disabled-tab');
  });
  abas.forEach(tab => {
    tab.classList.remove('disabled-tab-2');
  });
  nav.forEach(tab => {
    tab.classList.remove('nav-disabled');
  });

  location.reload();
}
    





// ! ||--------------------------------------------------------------------------------||
// ! ||                              BOTÃO DE PAUSE GERAL                              ||
// ! ||--------------------------------------------------------------------------------||

function stopCountdown() {
  stopAllCronometros();
  isAnyRunning = false;
  isTimerRunning = false;
  isStopTimeRunning = false;
  clearInterval(intervalId_stoptime);
  clearInterval(intervalId_takt);

  console.log("Pause");

  for (let i = 1; i <= 8; i++) {
    const botao = document.querySelector(`.btn_andon${i}`);
    let intervalId;

    const turnOn = () => {
      botao.classList.add('active');
    }
    
    const turnOff = () => {
      botao.classList.remove('active');
    }
    
    const toggleAnimation = () => {
      botao.classList.remove('animating');
      intervalId ? turnOn() : turnOff();
    };

    if (!intervalId) {
      clearInterval(i);
      intervalId = null;
    } else {
      console.log("Iniciar O Andon Primeiro !");
    }
    
    botao.classList.add('animating');
    botao.addEventListener('animationend', toggleAnimation);
  }
};


function stopAllCronometros() {
  for (let i = 0; i < intervalIds.length; i++) {
    if (intervalIds[i]) {

      temposCronometros[i + 1].segundos = segundos;
      temposCronometros[i + 1].minutos = minutos;

      pararCronometro(intervalIds[i], i + 1);
      CorTelaNormal(i + 1);
      intervalIds[i] = null;
    }
  }
}








function StopAndon_StopTime() {
  stopAllCronometros();

  console.log("Pause Andon");

  for (let i = 1; i <= 8; i++) {
    const botao = document.querySelector(`.btn_andon${i}`);
    let intervalId;

    const turnOn = () => {
      botao.classList.add('active');
    }
    
    const turnOff = () => {
      botao.classList.remove('active');
    }
    
    const toggleAnimation = () => {
      botao.classList.remove('animating');
      intervalId ? turnOn() : turnOff();
    };

    if (!intervalId) {
      clearInterval(i);
      intervalId = null;
    } else {
      console.log("Iniciar O Andon Primeiro !");
    }
    
    botao.classList.add('animating');
    botao.addEventListener('animationend', toggleAnimation);
  }
};


function stopAllCronometros() {
  for (let i = 0; i < intervalIds.length; i++) {
    if (intervalIds[i]) {

      temposCronometros[i + 1].segundos = segundos;
      temposCronometros[i + 1].minutos = minutos;

      pararCronometro(intervalIds[i], i + 1);
      CorTelaNormal(i + 1);
      intervalIds[i] = null;
    }
  }
}




// ! ||--------------------------------------------------------------------------------||
// ! ||                                   FUNÇÃO PAD                                   ||
// ! ||--------------------------------------------------------------------------------||

function pad(value) {
  return value < 10 ? '0' + value : value;
}




// ! ||--------------------------------------------------------------------------------||
// ! ||                             BOTÕES DE INICIO ANDON                             ||
// ! ||--------------------------------------------------------------------------------||
let segundos = 0;
let minutos = 0;

const intervalIds = [];

const temposCronometros = {};

function iniciarCronometro(id) {
  const cronometro = document.getElementById(`andon${id}`);
  const cronometro_tabs = document.getElementById(`andontab${id}`);
  const boxtab = document.getElementById(`boxtab-ativo${id}`);
  const boxandon = document.getElementById(`boxandon-ativo${id}`);

  if (!temposCronometros[id]) {
    temposCronometros[id] = { segundos: 0, minutos: 0 };
  }


  const atualizarCronometro = () => {
    temposCronometros[id].segundos++;
    if (temposCronometros[id].segundos === 60) {
      temposCronometros[id].segundos = 0;
      temposCronometros[id].minutos++;
    }
    const { segundos, minutos } = temposCronometros[id];
    cronometro.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    cronometro_tabs.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    isAnyRunning = true;
  };

  boxtab.classList.add('boxtab-ativo');
  boxandon.classList.add('boxandon-ativo');
  atualizarCronometro();
  const intervalId = setInterval(atualizarCronometro, 1000);
  return intervalId;
}



function pararCronometro(intervalId) {
  clearInterval(intervalId);
}

function CorTelaNormal(id) {
  const boxtab = document.getElementById(`boxtab-ativo${id}`);
  const boxandon = document.getElementById(`boxandon-ativo${id}`);

  boxtab.classList.remove('boxtab-ativo');
  boxandon.classList.remove('boxandon-ativo');
}

function chaveAndon(id) {

}


for (let i = 1; i <= 8; i++) {
  const botao = document.querySelector(`.btn_andon${i}`);
  let intervalId;

  const turnOn = () => {
    botao.classList.add('active');
  }
    
  const turnOff = () => {
    botao.classList.remove('active');
  }
    
  const toggleAnimation = () => {
    botao.classList.remove('animating');
    intervalId ? turnOn() : turnOff();
  };


  botao.addEventListener('click', () => {
    if (intervalId) {
      pararCronometro(intervalId, i);
      CorTelaNormal(i);
      intervalId = null;
      isAnyRunning = false;
    } else {
      intervalId = iniciarCronometro(i);
      intervalIds[i - 1] = intervalId;
    }
    botao.classList.add('animating');
    botao.addEventListener('animationend', toggleAnimation);
  });
}
