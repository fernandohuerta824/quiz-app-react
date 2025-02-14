import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const QuestionTimer = ({ time, onTimeout }) => {
    const timeout = time * 1000
    const [remainingTime, setRemainingTime] = useState(timeout)

    //Timeout para establecer un limite para responder una pregunta
    //onTimeout actualiza el estado por lo que se re-renderiza
    //Las dependencias que se usan es porque se estan usando dentro del useEffect
    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout)

        return () => clearTimeout(timer)
    }, [timeout, onTimeout])

    //Intervalo que se ejecuta para mostrar una barra de progreso
    useEffect(() => {
        const interval = setInterval(() => setRemainingTime(prevTime => prevTime - 200), 200)

        return () => clearInterval(interval)
    }, [])

    return (
        <progress id='question-time' value={remainingTime} max={timeout} />
    )
}

QuestionTimer.propTypes = {
    time: PropTypes.number.isRequired,
    onTimeout: PropTypes.number.isRequired,
}

export default QuestionTimer
