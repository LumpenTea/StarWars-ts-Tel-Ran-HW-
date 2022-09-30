import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { defaultHero, friends } from '../utils/constants'
import DreamTeam from './DreamTeam'
import FarGalaxy from './FarGalaxy'
import Hero from './Hero'

interface Props {
    changeHero: (heroId: string) => void;
}

type heroType = {
    heroId: string
}

const Home = ({ changeHero }: Props) => {
    let { heroId } = useParams<heroType>();
    const heroCode = heroId ? heroId : 'luke';
    if (!friends.includes(heroCode)) {
        heroId = defaultHero;
    }

    useEffect(() => {
        changeHero(heroCode);
    }, [heroCode, changeHero])

    return (
        <main className="clearfix">
            <Hero hero={heroCode} />
            <DreamTeam hero={heroCode} />
            <FarGalaxy />
        </main>
    )
}

export default Home