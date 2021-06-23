import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth';


export function Home() {

    const { user, signInWithGoogle } = useAuth();
    const history = useHistory();

    async function handleCreatRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new')
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
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
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