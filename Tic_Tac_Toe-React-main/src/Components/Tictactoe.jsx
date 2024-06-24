import React, { useEffect, useState } from "react";
import './Tictactoe.css';
import patterns from './pattern';

const init = ["", "", "", "", "", "", "", "", ""];

export default function Tictactoe() {

    const [board, setBoard] = useState([...init]);
    const [player, setPlayer] = useState('X');
    const [lidx, setLidx] = useState(-1);
    const [gameWon, setGameWon] = useState(false); 

    const changeTile = (idx) => {
        if (board[idx] !== '' || gameWon) return; 
        setLidx(idx);
        setBoard(board.map((val, i) => {
            if (i === idx) return player;
            return val;
        }));
        setPlayer(player === 'X' ? 'O' : 'X');
    };

    const checkWin = () => {
        if (lidx < 0 || gameWon) return; 
        const checkArr = patterns[lidx];
        const prevPlayer = player === 'X' ? 'O' : 'X';
        checkArr.forEach(arr => {
            if (board[arr[0]] === prevPlayer && board[arr[1]] === prevPlayer && board[arr[2]] === prevPlayer) {
                setGameWon(true); 
                setBoard(board.map((val, i) => (arr.includes(i) ? prevPlayer : val)));
                setTimeout(() => {
                    alert(`${prevPlayer} Won the game`);
                    reset();
                }, 100);
            }
        });
    };

    const reset = () => {
        setBoard([...init]);
        setPlayer('X');
        setLidx(-1);
        setGameWon(false); 
    };

    useEffect(() => {
        checkWin();
    }, [board, player, gameWon]); 

    return (
        <>
            <h1 className="h1">Tic Tac Toe</h1>
            <p className="para" >Player {player}'s Turn </p>
            <div className="board">
                {
                    board.map((sq, i) => {
                        return <div key={i} className="board-tiles" onClick={() => changeTile(i)}>{sq}</div>
                    })
                }
            </div>
            <button className="btn" onClick={reset}>Reset</button>
        </>
    );
}
