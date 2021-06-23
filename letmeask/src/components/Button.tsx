import '../styles/button.scss';
import { ButtonHTMLAttributes } from 'react';

type Buttonprops = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: Buttonprops) {

    return (
        <button className="button"

            {...props}

        />
    )
}