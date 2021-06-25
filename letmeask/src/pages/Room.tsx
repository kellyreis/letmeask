import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { useParams, Link } from 'react-router-dom'
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { type } from 'os';

type RoomParams = {
    id: string;
}

type Questions = {
    id: string;
    author: {
        name: string,
        avatar: string,
    }
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;

}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    }
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;

}>
export function Room() {

    const { user } = useAuth();
    const [newQuestion, setnewQuestion] = useState('');
    const [questions, setnewQuestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState('');
    const params = useParams<RoomParams>();
    const roomId = params.id;

    useEffect(() => {
        const roomfe = database.ref(`/rooms/${roomId}`);
        roomfe.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parseQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {

                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }

            })
            setTitle(databaseRoom.title);
            setnewQuestions(parseQuestion);
        })
    }, [roomId])

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
                    <RoomCode code={roomId}></RoomCode>

                </div>
            </header>
            <main >
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <form onSubmit={HandleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar"
                        onChange={event => setnewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">

                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>

                            </div>) : (<span>Para enviar uma pergunta, <button> faça seu login</button>.</span>)}
                        <Button disabled={!user} type="submit">Enviar Pergunta</Button>
                    </div>
                </form>

                {
                    JSON.stringify(questions)
                }


            </main>
        </div>
    )
}