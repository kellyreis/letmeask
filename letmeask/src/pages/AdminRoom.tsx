import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
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

                                >

                                    <button type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImg} alt="Remover pergunta" />
                                    </button>
                                </Question>
                            )
                        })
                    }
                </div>

            </main>
        </div>
    )
}