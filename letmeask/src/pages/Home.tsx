import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase';


export function Home() {

    const { user, signInWithGoogle } = useAuth();
    const history = useHistory();
    const [roomCode, setRoomCode] = useState('');
    async function handleCreatRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }
        //Busca se a sala existe e pega os registros dessa sala
        const roomRef = await database.ref(`/rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('room does not exists');
            return;
        }
        if (roomRef.val().endedAt) {
            alert('room already closed');
            return;
        }

        history.push(`/rooms/${roomCode}`)



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
                    <button onClick={handleCreatRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit"
                        >
                            ENTRAR NA SALA
                        </Button>
                    </form>
                </div>
            </main>
        </div>


    )
}