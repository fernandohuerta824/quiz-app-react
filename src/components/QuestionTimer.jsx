import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const QuestionTimer = ({ time, onTimeout, mode }) => {
    const timeout = time * 1000
    const [remainingTime, setRemainingTime] = useState(timeout)

    useEffect(() => {
        const timer = setTimeout(!mode ? onTimeout : () => {}, timeout)

        return () => clearTimeout(timer)
    }, [timeout, onTimeout, mode])

    useEffect(() => {
        const interval = setInterval(() => setRemainingTime(prevTime => prevTime - 200), 200)

        return () => clearInterval(interval)
    }, [])

    return (
        <progress
            id='question-time'
            value={remainingTime}
            max={timeout}
            className={mode}
        />
    )
}

QuestionTimer.propTypes = {
    time: PropTypes.number.isRequired,
    onTimeout: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
}

export default QuestionTimer
