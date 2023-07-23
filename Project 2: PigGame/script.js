"use strict";

const rollDice = {
  'dice' : document.querySelector('.dice'),                   
  'diceNum' : document.querySelector('.dice .num'),           
  'winnerScoreEl' : document.querySelector('.winner-score'),  
  'turn' : 1,                                           
  'btns' : {
    'roll' : document.querySelector('.btn-roll'),             
    'hold' : document.querySelector('.btn-hold'),            
  },
  'player' : {                                           
    1:{
      'total' : document.querySelector('.player1 .total-score .num'),
      'current' : document.querySelector('.player1 .current-score .num'),
    },
    2:{
      'total' : document.querySelector('.player2 .total-score .num'),
      'current' : document.querySelector('.player2 .current-score .num'),
    },
  },
  'init' : function(){
    const self = rollDice;
    self.diceNum.textContent = 0
    self.winnerScoreEl.value = 100
    self.winnerScoreEl.disabled = false
    self.turn = 1
    self.turnChange(1)
    self.btns.roll.hidden = false
    self.btns.hold.hidden = false
    for (let i = 0; i < 2; i++) {
      self.player[i + 1].total.textContent = 0
      self.player[i + 1].current.textContent = 0
      document.querySelector('.player' + (i + 1) + ' .name').textContent = 'PLAYER' + ' ' + (i + 1)
      document.querySelector('.player' + (i + 1)).className = 'player' + (i + 1)
    }
    document.querySelector('.player1').classList.add('turn')
  },
  'turnChange' : null,
  'scoreSum' : null,
  'winnerCheck' : null,
  'diceRoll' : null,
};

// dice roll event
rollDice.btns.roll.addEventListener('click', function(){
  const rollResult = rollDice.diceRoll()
  rollDice.winnerScoreEl.disabled = true
  rollDice.diceNum.textContent = rollResult
  if (rollResult == 0) {
    rollDice.dice.classList.add('oops')
    setTimeout(function(){
      rollDice.dice.classList.remove('oops')
    }, 1000)
    rollDice.turnChange()
  }
  rollDice.player[rollDice.turn].current.textContent = Number(rollDice.player[rollDice.turn].current.textContent) + rollResult;
});

// dice hold Event
rollDice.btns.hold.addEventListener('click', function(){
  const endGame = rollDice.winnerCheck(rollDice.scoreSum())
  if (endGame) return false
  rollDice.turnChange()
});

// dice start Event
document.querySelector('.btn-start').addEventListener('click', rollDice.init)

rollDice.turnChange = function(num){
  let playerPanels = document.querySelectorAll('[class^="player"]')
  for (let i = 0; i < playerPanels.length; i++) {
    playerPanels[i].classList.remove('turn')
  }
  rollDice.player[rollDice.turn].current.textContent = 0

  if (num === undefined) {
    rollDice.turn === 1 ? rollDice.turn = 2 : rollDice.turn = 1
  } else {
    rollDice.turn = num
  }
  document.querySelector('.player' + rollDice.turn).classList.add('turn')
}

rollDice.scoreSum = function(){
  let sumScore = Number(rollDice.player[rollDice.turn].total.textContent) + Number(rollDice.player[rollDice.turn].current.textContent)
  rollDice.player[rollDice.turn].current.textContent = 0
  rollDice.player[rollDice.turn].total.textContent = sumScore
  return sumScore;
}

rollDice.winnerCheck = function(totalScore){
  if (totalScore >= Number(rollDice.winnerScoreEl.value)) {
    const tempNum = rollDice.turn === 1 ? 2 : 1
    document.querySelector('.player' + rollDice.turn).classList.add('winner')
    document.querySelector('.player' + rollDice.turn).querySelector('.name').textContent += ' - WINNER !!!'
    rollDice.btns.roll.hidden = true
    rollDice.btns.hold.hidden = true
    return true;
  }
}

rollDice.diceRoll = function(){
  let currentScore = 0;
  const dice = Math.trunc(Math.random() * 6) + 1;
  if (dice !== 1) {
    currentScore += dice;
  } else {
    currentScore = 0;
  }
  return currentScore;
}