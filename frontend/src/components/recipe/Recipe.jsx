import '@css/recipe.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

const Recipe = ({data}) => {

    //extract data from our dataset
    let {
        label,
        ingredients = [],
        digest = [],
        image,
        images = [],
        uri,
        url,
        cuisineType = [],
        calories,
        dishType,
        instructions = [],
        co2EmissionsClass,
        source
    } = data;

    const getIngredients = () => {

        if(instructionsHidden) return;

        let content = ingredients.map((item, index) => {
            const keyname = `recipe-ingredient-${index}`;
            return <li key={keyname}>{item.text}</li>
        });

        return <ul>{content}</ul>;
    }

    const toggleRecipeInstructions = () => {
        setInstructionsHidden(prevState => {
            return !prevState;
        })
    }

    const [instructionsHidden, setInstructionsHidden] = useState(true);

    return (
        <article className="recipe">
            <section className="info-section">
                <h2>{label}</h2>
                <div className="recipe-summary">
                    <span><FontAwesomeIcon className="icon" icon={['fas', 'earth-americas']} /> {cuisineType.join(", ")}</span>
                    <span><FontAwesomeIcon className="icon" icon={['fas', 'utensils']} /> {dishType.join(", ")}</span>
                    <span><FontAwesomeIcon className="icon" icon={['fas', 'star']} /> {co2EmissionsClass}</span>
                </div>

                <section className="recipe-instructions">
                    <h3>Instructions
                        <div className="instructions-toggle">
                            <button onClick={toggleRecipeInstructions} className="simple">
                                <FontAwesomeIcon alt="Hide or show the recipe instructions" className="icon" icon={['fas', instructionsHidden ? 'chevron-down' : 'chevron-up']} />
                            </button>

                        </div>
                    </h3>
                    {getIngredients()}

                </section>
                <a href={url} alt="link to recipe">View this recipe externally on <strong>{source}</strong></a>
            </section>

            <section className="image-section">
                <img src={image} alt="recipe image"/>
            </section>

        </article>
    )
}
export default Recipe;
