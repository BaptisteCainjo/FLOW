import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <section className="page-404">
            <p>Mauvaise page : <Link to='./'>Page d'acceuil</Link></p>
        </section>
    );
} 
