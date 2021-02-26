import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { challengesContext } from './ChallengeContexts';

const initialTime = (25 * 60);

interface CountdownContext {
    restartCountdown: () => void;
    time: number;
    isActive: boolean;
    hasFinished: boolean;
}

let intervalId: NodeJS.Timeout;

export const countdownContext = createContext({} as CountdownContext);

export function CountdownProvider({ children }) {
    const { startNewChallenge } = useContext(challengesContext);

    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    function restartCountdown() {
        setHasFinished(false);
        setTime(initialTime);
        setIsActive(!isActive);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            let timeLeft = time;
            intervalId = setInterval(() => {
                setTime(--timeLeft);
                if (timeLeft < 1) {
                    startNewChallenge();
                    setHasFinished(true);
                    clearInterval(intervalId);
                }
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
    }, [isActive])

    return (
        <countdownContext.Provider value={{
            restartCountdown,
            time,
            isActive,
            hasFinished,
        }}>
            {children}
        </countdownContext.Provider>
    )
}