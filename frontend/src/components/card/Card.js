
import styles from "./Card.module.scss"
const Card = ({children, cardClass}) => {
  return (
    <div className={`${styles.card} ${cardClass}`}>
        {children}
    </div>
  )
}

export default Card
/*
children est une prop spéciale qui représente tout le contenu JSX situé entre les balises d'ouverture et de fermeture du composant.
cardClass est une prop supplémentaire qui vous permet de passer des classes CSS supplémentaires au composant pour personnaliser son style.
Le composant Card renvoie une div contenant le contenu passé via children, ainsi que des classes CSS définies dans le fichier de style Sass associé.

*/