import { useState, useCallback, useMemo } from 'react'

import questions from './../questions.js'
import quizCompleteImg from './../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx'

const Quiz = () => {
    const [answerState, setAnswerState] = useState(null)
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = !answerState ? userAnswers.length : userAnswers.length - 1
    const quizIsComplete = activeQuestionIndex === questions.length
    const activeQuestion = questions[activeQuestionIndex]
    const shuffledAnswers = useMemo(() => {
        if(quizIsComplete) {
            return null
        }

        return [...activeQuestion.answers].sort(() => Math.random() - .5)
    }, [activeQuestion, quizIsComplete])

    //Como esta funcion se usa como dependencia en el useCallback de abajo se necesita congelar
    //ya que sino esta cambiaria de referencia de nuevo en cada render por lo que seria lo mismo
    //que no tener un useCallback en handleSkipAnswer cosa que no queremos
    const handleSelectAnswer = useCallback(newAnswer => {
        if(answerState) {
            return
        }

        setAnswerState('answered')
        setUserAnswers(prevAnswers => [...prevAnswers, newAnswer])
        setTimeout(() => {
            if(newAnswer === activeQuestion.answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState(null)
            }, 2000)
        }, 1000)
    }, [activeQuestion, answerState])

    //Como esta funcion se usa como dependecia en un hijo
    // se necesita congelar la referencia para que el hijo no se
    // actualize inncesariamente cuando se re-rendirece este componente
    // y como esta funcion usa a handleSelectAnswer se le tiene que pasar
    // como dependencia
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
            <div id='question'>
                <QuestionTimer
                    time={20}
                    key={activeQuestion.id}
                    onTimeout={handleSkipAnswer}
                />
                <h2>{activeQuestion.text}</h2>
                <ul id='answers'>
                    {shuffledAnswers.map(answer => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer
                        let cssClases = ''

                        if(answerState === 'answered' && isSelected) {
                            cssClases += 'selected'
                        }

                        if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClases += answerState
                        }

                        return (
                            <li key={answer} className='answer'>
                                <button
                                    className={cssClases}
                                    onClick={() => handleSelectAnswer(answer)}
                                >
                                    {answer}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Quiz
