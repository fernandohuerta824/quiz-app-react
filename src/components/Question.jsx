import PropTypes from 'prop-types'
import { useState } from 'react'

import QuestionTimer from './QuestionTimer.jsx'
import Answers from './Answers.jsx'

const Question = ({
    questionText,
    answers,
    onSelectAnswer,
    onTimeout,
}) => {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        answerState: null,
    })

    const handleSelectAnswer = newAnswer => {
        if(answer.selectedAnswer) {
            return
        }

        setAnswer({
            selectedAnswer: newAnswer,
            answerState: 'answered',
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: newAnswer,
                answerState: newAnswer === answers[0] ? 'correct' : 'wrong',
            })

            setTimeout(() => {
                onSelectAnswer(newAnswer)
            }, 2000)
        },1000)
    }

    return (
        <div id='question'>
            <QuestionTimer
                time={20}
                onTimeout={onTimeout}
            />
            <h2>{questionText}</h2>
            <Answers
                answers={answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answer.answerState}
                onSelectAnswer={handleSelectAnswer}
            />
        </div>
    )
}

Question.propTypes = {
    questionText: PropTypes.string.isRequired,
    answerState: PropTypes.string.isRequired,
    selectedAnswer: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
    onTimeout: PropTypes.func.isRequired,
}

export default Question
