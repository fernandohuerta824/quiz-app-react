import { useState, useCallback } from 'react'

import questions from './../questions.js'
import quizCompleteImg from './../assets/quiz-complete.png'
import Question from './Question.jsx'

const Quiz = () => {

    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length
    const quizIsComplete = activeQuestionIndex === questions.length
    const activeQuestion = questions[activeQuestionIndex]

    const handleSelectAnswer = useCallback(newAnswer => {
        setUserAnswers(prevAnswers => [...prevAnswers, newAnswer])
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quizIsComplete) {
        return (
            <div id='summary'>
                <img src={quizCompleteImg} alt="Trophy Question" />
                <h2>Quiz completed</h2>
            </div>
        )
    }

    return (
        <div id='quiz'>
            <Question
                key={activeQuestion.id}
                questionText={activeQuestion.text}
                answers={activeQuestion.answers}
                onSelectAnswer={handleSelectAnswer}
                onTimeout={handleSkipAnswer}
            />
        </div>
    )
}

export default Quiz
