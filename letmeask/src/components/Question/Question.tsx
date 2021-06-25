import './styles.scss';
import { ReactNode } from 'react'

type QuestionsProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
}

export function Question({ content, author, children }: QuestionsProps) {
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
            </footer>
            <div>
                {
                    children
                }
            </div>
        </div>
    );
}