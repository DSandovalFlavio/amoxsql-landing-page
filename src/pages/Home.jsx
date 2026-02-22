import React from 'react';
import Hero from '../components/Hero';
import TechStrip from '../components/TechStrip';
import FeatureShowcase from '../components/FeatureShowcase';
import AiSection from '../components/AiSection';
import UseCases from '../components/UseCases';
import OriginStory from '../components/OriginStory';
import DownloadCTA from '../components/DownloadCTA';

const Home = () => {
    return (
        <main>
            <Hero />
            <TechStrip />
            <FeatureShowcase />
            <AiSection />
            <UseCases />
            <OriginStory />
            <DownloadCTA />
        </main>
    );
};

export default Home;
