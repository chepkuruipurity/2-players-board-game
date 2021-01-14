let board = [];
let obstacles = 12;

this.allMoves = null;

let grid = $('.grid');



let player1 = new Player('player1', 100, defaultWeapon);
let player2 = new Player('player2', 100, defaultWeapon);

let game = new Game(10, 10, player1, player2);

//get position of current element
function getPosition(item) {
    return Number($(`.${item}`).attr('id'));

}

function getId(item) {
    return $(`[id = ${item}]`);
}

function getMoves(activePlayer) {

    this.moves = [];
    this.leftDivs = [];
    this.rightDivs = [];
    this.upDivs = [];
    this.downDivs = [];

    let pos = getPosition(activePlayer);
    let posRow = Math.floor(pos / game.row);

    //left,right, up, down divs
    for (let i = 1; i <= 3; i++) {

        let leftDiv = pos - i;
        if (Math.floor(leftDiv / game.row) == posRow) {
            this.leftDivs.push(leftDiv);
        }

        let rightDiv = Number(pos) + i;
        if (Math.floor(rightDiv / game.row) == posRow) {
            this.rightDivs.push(rightDiv);
        }

        let upDiv = pos - (game.col * i);
        this.upDivs.push(upDiv);


        let downDiv = Number(pos) + (game.col * i);
        this.downDivs.push(downDiv);

    }

    filterArray(this.leftDivs);
    filterArray(this.rightDivs);
    filterArray(this.upDivs);
    filterArray(this.downDivs);

    this.allMoves = this.moves.filter((i) => { return i >= 0 && i < game.size })

    for (let move of this.allMoves) {
        getId(move).addClass('highlight')
    }
    return this.allMoves;

}

function filterArray(array) {
    for (let i = 0; i < array.length; i++) {
        let divId = getId(array[i]);

        if (divId.hasClass('obstacle') === false && divId.hasClass('player') === false) {
            this.moves.push(array[i]);
        } else { break; }
    }
    return this.moves;
}


function movePlayer(activePlayer) {

    $(`.${activePlayer}`).removeClass('player').removeClass(`${activePlayer}`)

    for (let i of this.allMoves) {
        getId(i).removeClass('highlight');

    }
}


// fight scene
//adjacent squares

function fightScene(activePlayer) {
    let adjacent = [];
    let pos = Number($(`.${activePlayer}`).attr('id'));
    let up = pos - game.col * 1;
    let down = pos + game.col * 1;
    let left = pos - 1;
    let right = pos + 1;
    adjacent.push(up, down, left, right);
    //check for player class
    for (let i of adjacent) {
        if (getId(i).hasClass('player')) {
            alert('Let the fight begin!')
            return true;
            break;

        }
    }

}



function changeScore(activePlayer, passivePlayer) {
    if (passivePlayer.health <= 0) {
        $(`.${passivePlayer.name}Health`).text(0)
        $(`#${activePlayer.name}Buttons`).css('display', 'none');
        gameOver(activePlayer, passivePlayer);
    } else {
        $(`.${game.passivePlayer.name}Health`).text(game.passivePlayer.health)
    }
}

function gameOver(activePlayer, passivePlayer) {

    $('#gameModal').css('display', 'block')
    $('#winner').text('Congratulations' + ' ' + activePlayer.name + '!' + ' ' + 'You have won the game!')
    $('#loser').text(passivePlayer.name + ' ' + 'You have lost the game! Good luck next time.')
    $('#yes').click(() => {

        reloadGame();
        $('.modal').css('display', 'none')
    })
    $('#no').click(() => { $('.modal').css('display', 'none') })

}

function switchAttackButtons() {

    $(`#${game.activePlayer.name}Buttons`).css('display', 'none');
    game.changePlayer()
    $(`#${game.activePlayer.name}Buttons`).css('display', 'block');

}

function startFight() {

    $(`#${game.activePlayer.name}Buttons`).css('display', 'block');

    let defend = () => $(`.${game.activePlayer.name}`).addClass('defender');

    let attack = () => {
        if ($(`.${game.passivePlayer.name}`).hasClass('defender')) {

            game.passivePlayer.health = game.passivePlayer.health - (game.activePlayer.weapon.damage * 0.5);
        } else {
            game.passivePlayer.health = game.passivePlayer.health - (game.activePlayer.weapon.damage);

        }
    }
    $('.attack').click(() => {
        if ($(`.${game.activePlayer.name}`).hasClass('defender')) {
            $(`.${game.activePlayer.name}`).removeClass('defender');
        }
        attack()
        changeScore(game.activePlayer, game.passivePlayer)
        switchAttackButtons()

    })

    $('.defend').click(() => {
        defend()
        changeScore(game.activePlayer, game.passivePlayer)
        switchAttackButtons()

    })



}

// play game
function playGame() {
    getMoves(game.activePlayer.name);

    $('.div').click((e) => {

        if ($(e.target).hasClass('highlight')) {

            movePlayer(game.activePlayer.name);

            $(e.target).addClass('player').addClass(`${game.activePlayer.name}`);

            changePlayerWeapon(game.activePlayer);

            game.changePlayer();

            if (fightScene(game.activePlayer.name) === true) {
                startFight()

            } else {

                getMoves(game.activePlayer.name);

            }

        }
    })
}