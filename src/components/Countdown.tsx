import { useContext } from 'react';
import { countdownContext, CountdownProvider } from '../contexts/CountdownContexts';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const {
        time,
        isActive,
        hasFinished,
        restartCountdown,
    } = useContext(countdownContext);

    const [minuteLeft, minuteRight] = String(Math.floor(time / 60))
        .padStart(2, '0')
        .split('');

    const [secondLeft, secondRight] = String(time % 60)
        .padStart(2, '0')
        .split('');

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            <button
                disabled={hasFinished}
                type="button"
                className={`${styles.countdownButton} ${isActive && styles.countdownButtonActive}`}
                onClick={restartCountdown}
            >
                {isActive ?
                    'Abandonar ciclo' : (hasFinished ?
                        'Ciclo encerrado' : 'Iniciar um ciclo')
                }
            </button>
        </div>
    )
}