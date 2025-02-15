import { useState, useCallback } from 'react'

import questions from './../questions.js'
import Question from './Question.jsx'
import Summary from './Summary.jsx'

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
            <Summary
                userAnswers={userAnswers}
                questions={questions}
            />
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
