import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: string;
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    challengeCompleted: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest
}: ChallengeProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [islevelUpModalOpen, setLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio(`/notification.mp3`).play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio \u{1F389}', {
                body: `valendo ${challenge.amount}xp`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function challengeCompleted() {
        if (!activeChallenge) { return }

        let finalExperience = currentExperience + activeChallenge.amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            setLevel(level + 1);
            setLevelUpModalOpen(true);
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function closeLevelUpModal() {
        setLevelUpModalOpen(false);
    }

    return (
        <challengesContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            challengeCompleted,
            closeLevelUpModal,
        }}>
            {children}

            { islevelUpModalOpen && < LevelUpModal />}
        </challengesContext.Provider>
    )
}