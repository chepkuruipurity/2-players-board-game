class Game {
    constructor(row, col, active, passive) {
        this.row = row;
        this.col = col;
        this.size = row * col;
        this.activePlayer = active;
        this.passivePlayer = passive;
        this.create2DBoard();
    }

    addItems() {

        let weaponArr = this.addWeapons();
        let obstacleArray = Array(obstacles).fill('obstacle')
        let emptArr = Array(this.size - obstacles - weaponArr.length)
            .fill('div empty ');
        let b = emptArr.concat(obstacleArray, weaponArr);

        return b.sort(() => Math.random() - 0.5);

    }

    create2DBoard() {

        let shuffledArray = this.addItems();

        for (let i = 0; i < this.row; i++) {

            for (let j = 0; j < this.col; j++) {

                let ids = Number(i + '' + j);
                let square = $('<div>').addClass(shuffledArray[ids]).attr('id', ids);

                grid.append(square);
                board.push(square);

            }

        }
        this.addPlayers()

    }


    addWeapons() {
        let lion = Array(1).fill('div weapon lion ')
        let elephant = Array(1).fill('div weapon elephant ')
        let giraffe = Array(1).fill('div weapon giraffe ')
        let dog = Array(1).fill('div weapon dog ')
        let weaponArr = lion.concat(elephant, giraffe, dog);
        return weaponArr;
    }
    addPlayers() {
        $('.empty:first').addClass('player player1')
        $('.empty:last').addClass('player player2')
    }

    changePlayer() {

        let currentPlayer = this.activePlayer;
        this.activePlayer = this.passivePlayer;
        this.passivePlayer = currentPlayer;
        return this.activePlayer;
    }

}