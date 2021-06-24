import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, serNewRoom] = useState('');
    async function HandleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRom = await roomRef.push({

            title: newRoom,
            authorId: user?.id

        });

        history.push(`/rooms/${firebaseRom.key}`)
    }

    return (

        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;E ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetmeAsk" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={HandleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => serNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique Aqui</Link></p>
                </div>
            </main>
        </div>


    )
}