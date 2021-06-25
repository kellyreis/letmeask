import '../styles/button.scss';
import { ButtonHTMLAttributes } from 'react';

type Buttonprops = ButtonHTMLAttributes<HTMLButtonElement> & {

    isOutline?: boolean
}

export function Button({ isOutline = false, ...props }: Buttonprops) {

    return (
        <button className={`button ${isOutline ? 'outlined' : ''}`}

            {...props}

        />
    )
}