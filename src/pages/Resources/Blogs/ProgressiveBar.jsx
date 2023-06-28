import React, { useState, useEffect } from 'react';
import './Bar.css'
const ProgressiveBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
        setScrollProgress(scrolled);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="progressive-bar-container">
            <div className="progressive-bar" style={{ width: `${scrollProgress}%` }} />
        </div>
    );
};

export default ProgressiveBar;
