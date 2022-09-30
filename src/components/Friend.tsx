import { useNavigate } from 'react-router-dom';
import style from '../css_modules/borderRound.module.css';
import { characters } from '../utils/constants';

interface Props {
    friend: string,
    number: number
}

const Friend = ({ friend, number }: Props) => {
    
    const navigate = useNavigate();

    let friendStyle = 'col-4 p-1 ';

    if (number === 7) {
        friendStyle += style.bottomLeft;
    }
    if (number === 9) {
        friendStyle += style.bottomRight;
    }
    return (
        <img onClick={() => navigate(`/home/${friend}`)} className={friendStyle} src={characters[friend].img} alt={characters[friend].name} />
    )
}

export default Friend