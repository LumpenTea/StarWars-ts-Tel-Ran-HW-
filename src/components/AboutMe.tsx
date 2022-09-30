import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "../css_modules/aboutMe.module.css";
import { characters, periodMonth } from "../utils/constants";

interface Props {
  changeHero: React.Dispatch<React.SetStateAction<string>>
}

interface heroInfo {
  time: number,
  hero: {
    name: string,
    height: number,
    mass: number,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: number,
    gender: string
  }
}

type heroType = {
  heroId: string,
}

const AboutMe = ({ changeHero }: Props) => {

  const { heroId } = useParams<heroType>();

  const [state, setState] = useState<heroInfo>({
    time: 0,
    hero: {
      name: '',
      height: 0,
      mass: 0,
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: 0,
      gender: ''
    }
  });

  useEffect(() => {
    const storageHero = localStorage.getItem(heroId || '');
    let hero: heroInfo = storageHero ? JSON.parse(storageHero) : '';
    if (!hero || (Date.now() - hero.time) > periodMonth) {
      changeHero(heroId || 'luke');
      fetch(characters[heroId || 'luke'].url)
        .then(response => response.json())
        .then(data => {
          let info = {
            name: data.name,
            height: data.height,
            mass: data.mass,
            hair_color: data.hair_color,
            skin_color: data.skin_color,
            eye_color: data.eye_color,
            birth_year: data.birth_year,
            gender: data.gender
          };
          setState({ time: hero.time, hero: info });
          hero = {
            hero: info,
            time: Date.now()
          };
          localStorage.setItem(heroId || 'luke', JSON.stringify(hero));
        });
    } else {
      setState({ time: hero.time, hero: hero.hero });
    }
    return () => console.log('Component AboutMe unmounted');
  }, [])


  return (
    <div>
      {(state.hero) &&
        <div className={`farGalaxy ${styles.hero_box}`}>
          <p><span className={styles.hero_titles}>name:</span> {state.hero.name}</p>
          <p><span className={styles.hero_titles}>height:</span> {state.hero.height}</p>
          <p><span className={styles.hero_titles}>birth year:</span> {state.hero.birth_year}</p>
          <p><span className={styles.hero_titles}>gender:</span> {state.hero.gender}</p>
          <p><span className={styles.hero_titles}>mass:</span> {state.hero.mass}</p>
          <p><span className={styles.hero_titles}>hair color:</span> {state.hero.hair_color}</p>
          <p><span className={styles.hero_titles}>skin color:</span> {state.hero.skin_color}</p>
          <p><span className={styles.hero_titles}>eye color:</span> {state.hero.eye_color}</p>
        </div>
      }
    </div>
  )


}

export default AboutMe;