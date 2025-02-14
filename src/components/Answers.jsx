import PropTypes from 'prop-types'
import { useMemo } from 'react'

const Answers = ({ answers, selectedAnswer ,answerState, onSelectAnswer }) => {
    const shuffledAnswers = useMemo(() => [...answers].sort(() => Math.random() - .5), [answers])

    return (
        <ul id='answers'>
            {shuffledAnswers.map(answer => {
                const isSelected = selectedAnswer === answer
                let cssClases = ''

                if (answerState === 'answered' && isSelected) {
                    cssClases += 'selected'
                }

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClases += answerState
                }

                return (
                    <li key={answer} className='answer'>
                        <button
                            className={cssClases}
                            onClick={() => onSelectAnswer(answer)}
                            disabled={selectedAnswer}
                        >
                            {answer}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

Answers.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedAnswer: PropTypes.string.isRequired,
    answerState: PropTypes.string.isRequired,
    onSelectAnswer: PropTypes.string.isRequired,
}

export default Answers
