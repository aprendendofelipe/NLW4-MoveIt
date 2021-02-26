import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengeContexts';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(challengesContext);


    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}