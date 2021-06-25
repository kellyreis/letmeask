import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { useParams, Link } from 'react-router-dom'
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Question } from '../components/Question/Question';
import { UseRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string;
}

export function AdminRoom() {

    const { user } = useAuth();
    const [newQuestion, setnewQuestion] = useState('');
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = UseRoom(roomId);

    async function HandleSendQuestion(event: FormEvent) {

        event.preventDefault()
        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        }

        await database.ref(`/rooms/${roomId}/questions`).push(question)
        setnewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div className="">
                        <RoomCode code={roomId}></RoomCode>
                        <Button>Encerrar Sala</Button>
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
                                />
                            )
                        })
                    }
                </div>

            </main>
        </div>
    )
}