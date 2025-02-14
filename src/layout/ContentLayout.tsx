import FooterBar from 'components/FooterBar';
import NavBar from 'components/NavBar';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const ContentLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default ContentLayout;