import React, { useEffect } from 'react';
import { LanguageProvider } from './i18n';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Bento from './components/Bento';
import LocalBand from './components/LocalBand';
import Downloads from './components/Downloads';
import Footer from './components/Footer';

/** Revela las secciones .animate-fade-in al entrar en viewport. */
function useScrollReveal() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('.animate-fade-in').forEach((el) => el.classList.add('appear'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.animate-fade-in').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

function Landing() {
    useScrollReveal();
    return (
        <>
            <Nav />
            <main>
                <Hero />
                <Bento />
                <LocalBand />
                <Downloads />
            </main>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <LanguageProvider>
            <Landing />
        </LanguageProvider>
    );
}
