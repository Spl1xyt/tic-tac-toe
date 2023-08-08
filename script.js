const allCase = document.querySelectorAll('div[class^=case]');
const winnerPrint = document.getElementById('result');
const restart = document.getElementById('restart')

const gameBoard = (() => {

    const setBoard = (() => {
        board = ['', '', '', '', '', '', '', '', ''];
    })();


    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        for (let i = 0; i < allCase.length; i++) {
            allCase[i].textContent = '';
        }
        playable = true;
        winnerPrint.textContent = '';
    };

    restart.addEventListener('click', () => {
        popUp();
        resetBoard()
    });

    return { board }
})();

const gameLogic = (() => {
    const player = (name, marker) => {          
        return { name, marker };
    };
    const player1 = player('player', 'x');
    const player2 = player('ia', 'o');


    const picking = (whichCase, mark) => {
        const sett = document.createElement('img');
        sett.src = './image/' + mark.marker + '.png';
        allCase[whichCase].appendChild(sett);
        board[whichCase] = mark.marker;
        console.log(mark.marker)
    };

    let countx = 0;
    let counto = 0;
    let turn = 0; // 0 = player1 turn - 1 = player2 turn
    const checkTurn = (whichCases) => {
        if (board[whichCases] === ''){
            if (turn === 0) {
                picking(whichCases, player1);
                countx++;
                checkWinner(player1);
                turn = 1;
            } else if (turn === 1) {
                picking(whichCases, player2);
                counto++;
                checkWinner(player2);
                turn = 0;
            };
        };
    };
    
    let playable = true;
    for (let i = 0; i < allCase.length; i++) {
        allCase[i].addEventListener('click', () => {
            if (playable === true) {
                checkTurn(i)
            }
        });
    }


    const checkWinner = (whichPlayer) => {
        if ((board[0] === whichPlayer.marker && board[1] === whichPlayer.marker && board[2] === whichPlayer.marker) || // row 1
            (board[3] === whichPlayer.marker && board[4] === whichPlayer.marker && board[5] === whichPlayer.marker) || // row 2
            (board[6] === whichPlayer.marker && board[7] === whichPlayer.marker && board[8] === whichPlayer.marker) || // row 3
                                                                                                                       //           What the board looke like :
            (board[0] === whichPlayer.marker && board[3] === whichPlayer.marker && board[6] === whichPlayer.marker) || // column 1          [0, 1, 2]
            (board[1] === whichPlayer.marker && board[4] === whichPlayer.marker && board[7] === whichPlayer.marker) || // column 2          [3, 4, 5]
            (board[2] === whichPlayer.marker && board[5] === whichPlayer.marker && board[8] === whichPlayer.marker) || // column 3          [6, 7, 8]

            (board[0] === whichPlayer.marker && board[4] === whichPlayer.marker && board[8] === whichPlayer.marker) || // diag 1
            (board[2] === whichPlayer.marker && board[4] === whichPlayer.marker && board[6] === whichPlayer.marker)) { // diag 2
                winner(whichPlayer);
            } else if (counto === 4 && countx === 5){
                isTie()
            };
    };


    const winner = (whichPlayer) => {
        playable = false;
        winnerPrint.textContent = whichPlayer.marker
        popUp();
    };

    const isTie = () => {
        playable = false;
        winnerPrint.textContent = "it's a tie !"
        popUp();
    }

    restart.addEventListener('click', () => {
        playable = true;
        countx = 0;
        counto = 0;
    });
})();

function popUp() {
    let popup = document.getElementById("popup_result").classList.toggle("show");
    let body = document.querySelector("body").classList.toggle("blur");
}