import React from 'react'
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {

const links = [
    { href: '/about', text: 'About' },
    { href: '/products', text: 'Nos produits' },
    { href: '/dashboard', text: 'Connexion' }
];
const navigate = useNavigate();

    return (
        <nav>
            <h1>Boutique Pokémon</h1>
            <ul>
                {links.map(link => (
                    <li key={link.href}
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(link.href)}>
                        {link.text}
                    </li>
                )
                )}
            </ul>
        </nav>
    );
};

export default NavBar;