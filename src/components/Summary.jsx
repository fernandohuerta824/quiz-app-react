import PropTypes from 'prop-types'

import quizCompleteImg from './../assets/quiz-complete.png'

const Summary = ({ userAnswers, questions }) => {
    const skipped = Math.round((userAnswers.filter(a => a === null).length / userAnswers.length) * 100)
    const correct = Math.round((userAnswers.filter((a, i) => a === questions[i].answers[0]).length / userAnswers.length) * 100)
    const wrong = 100 - skipped - correct

    return (
        <div id='summary'>
            <img src={quizCompleteImg} alt="Trophy Question" />
            <h2>Quiz completed</h2>

            <div id="summary-stats">
                <p>
                    <span className='number'>{skipped}%</span>
                    <span className='text'>skipped</span>
                </p>

                <p>
                    <span className='number'>{correct}%</span>
                    <span className='text'>correctly</span>
                </p>

                <p>
                    <span className='number'>{wrong}%</span>
                    <span className='text'>answered incorrectly</span>
                </p>
            </div>

            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClases = 'user-answer'

                    if(!answer) {
                        cssClases += ' skipped'
                    }

                    if(answer === questions[index].answers[0]) {
                        cssClases += ' correct'
                    } else {
                        cssClases += ' wrong'
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className='question'>{questions[index].text}</p>
                            <p className={cssClases}>{answer || 'Not answered'}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

Summary.propTypes = {
    userAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
    questions: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Summary
