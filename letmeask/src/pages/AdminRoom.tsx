import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { useHistory, useParams } from 'react-router-dom'
import { Question } from '../components/Question/Question';
import { UseRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = UseRoom(roomId);

    async function handleDeleteQuestion(questionid: string) {

        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {

            await database.ref(`/rooms/${roomId}/questions/${questionid}`).remove();
        }
    }

    async function HandleEndRoom() {

        await database.ref(`/rooms/${roomId}`).update({
            endedAt: new Date()
        });

        history.push('/')
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        })
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div className="">
                        <RoomCode code={roomId}></RoomCode>
                        <Button isOutline onClick={HandleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {
                        questions.map(question => {
                            return (
                                <Question
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                    isAnsWered={question.isAnswered}
                                    isHighlighted={question.isHighLighted}

                                >

                                    <button type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImg} alt="Remover pergunta" />
                                    </button>
                                    {!question.isAnswered && (
                                        <>
                                            <button type="button"
                                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                            >
                                                <img src={checkImg} alt="Checkar pergunta" />
                                            </button>
                                            <button type="button"
                                                onClick={() => handleHighlightQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Remover pergunta" />
                                            </button>
                                        </>
                                    )}
                                </Question>
                            )
                        })
                    }
                </div>

            </main>
        </div>
    )
}