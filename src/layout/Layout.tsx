import FooterBar from 'components/FooterBar';
import NavBar from 'components/NavBar';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <NavBar />
            <div className="content">{children}</div>
            <FooterBar/>
        </div>
    );
};

export default Layout;