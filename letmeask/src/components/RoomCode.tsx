
import { type } from 'os';
import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodePROPS = {
    code: string;
}

export function RoomCode(props: RoomCodePROPS) {

    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(props.code)
    }

    return (

        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}