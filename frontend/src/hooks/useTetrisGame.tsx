import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {canMoveExcessToLeft, collideOnTheBottom, collideOnTheRight, collideOnTheLeft, createEmptyBoard, getRightOverflow, initialPieceState, insertPieceToBoard, randomPiece, removeCompletedRows, rotateShapeToLeft, pieceFitInTheBoard, getDifficulty } from "../utils/tetrisLogic";
import { PieceBagType, PieceType } from "../types";
import { DIFFICULTIES, FPS, INITIAL_GAME_STATE, SCORE } from "../constants";
import { UserContext } from "../context/UserContext";
import { updateUserStats } from "../services/user";

export function useTetrisGame() {

    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const [board, setBoard] = useState<string[][]>(createEmptyBoard());
    
    const [currentPiece, setCurrentPiece] = useState<PieceType>(initialPieceState(randomPiece()));
    const [nextPieces, setNextPieces] = useState<PieceBagType[]>([randomPiece(), randomPiece()]);
    
    const [tick, setTick] = useState(0);
    
    const animationInterval = useRef<number | null>(null);
    const dropFrameInterval = useRef<number>(Math.round(DIFFICULTIES[gameState.difficulty] / (1000 / FPS))); 

    const isPlaying = () => !gameState.isGameOver && !gameState.isGamePaused;

    const moveLeft = () => {
        if (!collideOnTheLeft(currentPiece, board) && isPlaying()) {
            setCurrentPiece(prevPiece => ({
                ...prevPiece,
                position: {
                    ...prevPiece?.position,
                    x: (prevPiece?.position.x ?? 0) - 1,
                },
            }));
        }
    }

    const moveRight = () => {

        if (!collideOnTheRight(currentPiece, board) && isPlaying()) {
            setCurrentPiece(prevPiece => ({
                ...prevPiece,
                position: {
                  ...prevPiece?.position, 
                  x: (prevPiece?.position.x ?? 0) + 1, 
                },
            }));        
        }

    }

    const softDrop = () => {
        
        if (!collideOnTheBottom(currentPiece, board)){
            drop()
        }

    }

    const rotate = () => {

        if (!isPlaying()) return;

        const rotatedShape = rotateShapeToLeft(currentPiece.shape)
    
        const rotatedPiece = {
            shape: rotatedShape,
            position: {...currentPiece.position}
        }
    
        const rightOverflow = getRightOverflow(rotatedPiece, board)
    
        if (rightOverflow > 0 && canMoveExcessToLeft(rotatedPiece, board, rightOverflow)) {
            setCurrentPiece(prevPiece => ({
                shape: rotatedShape,
                position: {
                  ...prevPiece?.position, 
                  x: (prevPiece?.position.x ?? 0) - rightOverflow, 
                },
            })); 
        } else if (rightOverflow <= 0) {
            setCurrentPiece(rotatedPiece); 
        }

    }
    
    const drop = useCallback(() => {

        setCurrentPiece(prevPiece => ({
            ...prevPiece,
            position: {
                ...prevPiece?.position,
                y: (prevPiece?.position.y ?? 0) + 1,
            },
        }));
    
    }, []); 

    const hardDrop = () => {

        if (gameState.isGameOver || gameState.isGamePaused) return;

        const newPiece = JSON.parse(JSON.stringify(currentPiece)) as PieceType;
        const originalY = newPiece.position.y;

        for (let i = 0; i < board.length; i++) {

            newPiece.position.y = originalY + i;
            if (collideOnTheBottom(newPiece, board)) {
                setCurrentPiece(newPiece)
                return;
            }

        }
    
    }

    const stopAnimation = useCallback(() => {

        if (animationInterval.current) {
            cancelAnimationFrame(animationInterval.current);
            animationInterval.current = null;
        }

    }, []);

    const {setUserData} = useContext(UserContext)

    const spawnNextPiece = useCallback(async () => {
        const newPiece = initialPieceState(nextPieces[0]);

        if (collideOnTheBottom(newPiece, board)) {
            setGameState(prev => ({ ...prev, isGameOver: true }));

            const token = sessionStorage.getItem("token")
            if (token) {
                const payload = {
                    score: gameState.score,
                    linesCleared: gameState.linesCleared,
                    xpGained: 35
                }
                const updatedUserData = await updateUserStats(token, payload)
                setUserData(updatedUserData)
            }

            stopAnimation()

            return;
        }

        setCurrentPiece(newPiece);

        const [, ...rest] = nextPieces;
        setNextPieces([...rest, randomPiece()]);

    }, [nextPieces, board, stopAnimation, gameState.score, gameState.linesCleared, setUserData]);

    
    const lockPiece = useCallback(() => {
        
        const newBoard = insertPieceToBoard(currentPiece, board);
        const {board: clearedBoard, completedRows} = removeCompletedRows(newBoard);

        if (pieceFitInTheBoard(currentPiece)) {


            setGameState(prevGameState => {

                const newScore = prevGameState.score + (completedRows * SCORE)

                return {
                    ...prevGameState,
                    score: newScore,
                    linesCleared: prevGameState.linesCleared + completedRows,
                    difficulty: getDifficulty(newScore)
                }
            })

        } else {

            setGameState(prevGameState => ({
                ...prevGameState,
                isGameOver: true
            }))

            stopAnimation()

        }

        setBoard(clearedBoard);

        spawnNextPiece();

    }, [currentPiece, board, spawnNextPiece, stopAnimation]);

    const gameLoop = useCallback(() => {
        setTick(prevTick => prevTick + 1);

        if (tick % dropFrameInterval.current === 0 && !gameState.isGamePaused) {
            if (!collideOnTheBottom(currentPiece, board)) {
                drop();
            } else {
                lockPiece();
            }
        }

        animationInterval.current = requestAnimationFrame(gameLoop);

    }, [tick, gameState.isGamePaused, currentPiece, board, drop, lockPiece]);

    const startAnimation = useCallback(() => {

        if (!animationInterval.current) {
            animationInterval.current = requestAnimationFrame(gameLoop);
        }

    }, [gameLoop]);

    const pauseGame = () => {
        setGameState(prevGameState => ({
            ...prevGameState,
            isGamePaused: !prevGameState.isGamePaused
        }))
    }

    const newGame = () => {
        setGameState(INITIAL_GAME_STATE)
        setBoard(createEmptyBoard())
        setCurrentPiece(initialPieceState(randomPiece()))
        setNextPieces([randomPiece(), randomPiece()])
        startAnimation()
    }

    useEffect(() => {

        startAnimation();
        return () => stopAnimation();

    }, [startAnimation, stopAnimation]);


    useEffect(() => {

        dropFrameInterval.current = Math.round(DIFFICULTIES[gameState.difficulty] / (1000 / FPS));
        
    }, [gameState.difficulty]);
    

    return {
      gameState,
      board,
      currentPiece,
      nextPieces,
      setCurrentPiece,
      moveLeft,
      moveRight,
      rotate,
      lockPiece,
      drop,
      hardDrop,
      removeCompletedRows,
      pauseGame,
      newGame,
      softDrop
    };
}
