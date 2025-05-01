import '@css/recipe.scss';

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

        let content = ingredients.map((item, index) => {
            const keyname = `recipe-ingredient-${index}`;
            return <li key={keyname}>{item.text}</li>
        });

        return <ul>{content}</ul>;
    }

    return (
        <article className="recipe">
            <section className="info-section">
                <h2>{label}</h2>
                <p>Cuisine Type: {cuisineType.join(", ")}</p>
                <p>Dish Type: {dishType.join(", ")}</p>
                <p>Class: {co2EmissionsClass}</p>
                <section className="recipe-ingredient-list">
                    <h3>Ingredient List</h3>
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
