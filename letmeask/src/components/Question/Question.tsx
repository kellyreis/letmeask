import './styles.scss';
import { ReactNode } from 'react'
import cx from 'classnames'

type QuestionsProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnsWered?: boolean;
    isHighlighted?: boolean;
}

export function Question({ content, author, children, isAnsWered = false, isHighlighted = false }: QuestionsProps) {
    return (
        <div className={cx('question', { isAnsWered: isAnsWered }, { isAnsWered: isAnsWered && !isAnsWered })}>
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
        </div >
    );
}