new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            let damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            if (this.checkWinner()) {
                return;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            this.monsterAttack();
        },
        specialAttack: function() {
            let damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            if (this.checkWinner()) {
                return;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster with special attack for ' + damage
            });
            this.monsterAttack();
        },
        heal: function() {
            if (this.playerHealth <= 90 ) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttack();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterAttack: function() {
            let damage = this.calculateDamage(5,12)
            this.playerHealth -= damage;
            this.checkWinner();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) +1 ,min);
        },
        checkWinner: function() {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                if(confirm("You won! Should we start a new game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                if(confirm("You lost! Should we start a new game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});