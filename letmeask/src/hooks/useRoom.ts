
import { useState, useEffect } from 'react';
import { database } from '../services/firebase';
type QuestionsType = {
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



export function UseRoom(roomId: string) {
    const [questions, setnewQuestions] = useState<QuestionsType[]>([]);
    const [title, setTitle] = useState('');

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

    return {
        questions, title
    }
}