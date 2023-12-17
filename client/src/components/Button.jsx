import { Link } from 'react-router-dom';

export default function Button({ className, link, content }) {

    return (
        <Link to={`../${link}`} className={!className ? 'button' : `button ${className}`}>
            {content}
        </Link>
    );
}
