
import { useState, useEffect } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';
type QuestionsType = {
    id: string;
    author: {
        name: string,
        avatar: string,
    }
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
    LikeCount: number;
    likeId: string | undefined


}
type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    }
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
    likes: Record<string, {
        authorId: string
    }>
}>



export function UseRoom(roomId: string) {
    const { user } = useAuth();
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
                    isAnswered: value.isAnswered,
                    LikeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }

            })
            setTitle(databaseRoom.title);
            setnewQuestions(parseQuestion);
        })

        return () => {
            roomfe.off('value');
        }

    }, [roomId, user?.id])

    return {
        questions, title
    }
}