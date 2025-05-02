import '@css/recipe-generator.scss';
import {useState} from "react";
import Recipe from "@components/recipe/Recipe.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const RecipeGenerator = ({ingredients}) => {

    const minIngredientsRequired = 2;
    const [recipes, setRecipes] = useState(null);
    const [totalRecipeCount, setTotalRecipeCount] = useState(0);
    const [nextRecipesLink, setNextRecipesLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function getRecipes(e) {
        e.preventDefault();
        try {
            await fetchRecipes(ingredients);
        } catch (error) {

        }

    }


    //fetch recipes from the API
    async function fetchRecipes(ingredients, nextLink = null) {

        let searchTerms = ingredients.join(" ");
        let encodedSearchTerm = encodeURIComponent(searchTerms);
        setLoading(true);  // Set a loading state

        try {

            //determine backend endpoint based off env file
            const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}/api/recipes?query=${encodedSearchTerm}`;
            //get data from backend API
            const response = await fetch(apiUrl);
            console.log(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            //collect the total number of recipes
            setTotalRecipeCount(data.count);

            // Search through all returned data to extract the recipes
            let recipes = [];
            if (data.hits && data.hits.length > 0) {
                recipes = data.hits.map(item => item.recipe);
            }

            //set recipe data for display
            setRecipes(recipes);

        } catch (error) {
            console.error("Failed to fetch recipes:", error);
            setError("Failed to load recipes. Please try again later."); // Set an error message
        } finally {
            setLoading(false); // Set loading state to false after fetching
        }

    }

    ///Called when we have a recipe to show!
    function getRecipeSection() {

        //recipes never searched, return
        if (recipes == null) {
            return;
        }

        //we have 1 or more recipes, return them for display
        if (recipes.length > 0) {
            return recipes.map((item, index) => {
                const keyname = `recipe-item-${index}`;
                return <Recipe data={item} key={keyname}/>
            })
        }
        //show an error message
        else {
            return (
                <p>there were no recipes found!</p>
            )
        }
    }

    function subtitleText() {

        let value;

        if (ingredients.length >= minIngredientsRequired) {
            value = <span>
                Generate a recipe from your list of ingredients. We will search for a recipe with your <strong>{ingredients.length}</strong> ingredients
            </span>;
        } else {
            value = <span>Enter a few more ingredients from the search box above to get started</span>
        }
        return value;
    }

    function titleText() {
        let value

        if (ingredients.length >= minIngredientsRequired) {
            value = <span>Ready for a recipe?</span>
        } else {
            value =
                <span>You're just <strong>{minIngredientsRequired - ingredients.length}</strong> ingredients away from a recipe!</span>;
        }

        return value;
    }

    return (
        <>
            {ingredients.length > 0 &&
                <article>
                    <section className="recipe-generator">
                        <form>
                            <div className="primary">
                                <p className="title">{titleText()}</p>
                                <p className="subtitle">{subtitleText()}</p>
                            </div>
                            {ingredients.length >= minIngredientsRequired &&
                                <div className="secondary">
                                    <button
                                        onClick={getRecipes}
                                        className={`recipe-button ${loading ? 'loading' : ''}`}
                                    >
                                        <FontAwesomeIcon className="icon" icon={['fas', 'book']} />Get a Recipe!
                                    </button>
                                </div>
                            }
                        </form>
                    </section>
                    {recipes != null && recipes.length > 0 &&
                        <section className="recipes-section">
                            <h2>Look at all these recipes!</h2>
                            <p>We've been able to find <strong>{totalRecipeCount}</strong> recipes that match your
                                ingredients above. Listed below are <strong>{recipes.length}</strong> of them</p>
                            {getRecipeSection()}
                        </section>
                    }
                    {error.length > 0 &&
                        <p>There was an error fetching data!</p>
                    }
                </article>

            }
        </>
    )
}
export default RecipeGenerator
