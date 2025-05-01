import '@css/recipe-generator.scss';
import {useState} from "react";
import Recipe from "@components/recipe/Recipe.jsx";

const RecipeGenerator = ({ingredients}) => {

    const minIngredientsRequired = 2;
    const [recipes, setRecipes] = useState(null);
    const [totalRecipeCount, setTotalRecipeCount] = useState(0);
    const [nextRecipesLink, setNextRecipesLink] = useState("");

    function getRecipes(e) {
        e.preventDefault();
        fetchRecipes(ingredients);

    }

    //called from the button to load more, will use the nextrecipe link to load the next set of data
    function getMoreRecipes(e){
        e.preventDefault();
        fetchRecipes(ingredients, nextRecipesLink)
    }

    //fetch recipes from the API
    function fetchRecipes(ingredients, nextLink = null) {

        let searchterm = ingredients.join(" ");

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Edamam-Account-User': 'scodrington'
        }
        let baseUrl = "https://api.edamam.com/api/recipes/v2";
        let appId = "4e1c40ce";
        let appKey = "cdec51cf61393d7a2a90f499218fa03c";

        //no next link, build url
        let requestUrl = '';
        if(nextLink == null){
            requestUrl = `${baseUrl}?q=${searchterm}&app_id=${appId}&app_key=${appKey}&type=public`;
        }
        //next link provided, just use that
        else{
            requestUrl = nextLink;
        }

        //fetch from the API recipes that relate to those ingredients
        try {

            const response = fetch(requestUrl, {
                'headers': headers,
                'method': 'GET'
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            }).then(data => {

                setTotalRecipeCount(data.count);
                setNextRecipesLink(data._links.next.href);

                let recipes = []
                if (data.hits.length > 0) {
                    data.hits.map(item => {
                        let recipe = item.recipe;
                        let links = item._links;
                        recipes.push(recipe);
                    })
                }
                //set the recipes
                setRecipes(recipes);
            })
        } catch (error) {
            throw new Error(`HTTP error! Status: ${error.message}`);
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
            return recipes.map((item,index) => {
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
                                    <button onClick={getRecipes}>Get a Recipe!</button>
                                </div>
                            }
                        </form>
                    </section>
                    {recipes != null && recipes.length > 0 &&
                        <section className="recipes-section">
                            <h2>Look at all these recipes!</h2>
                            <p>We've been able to find <strong>{totalRecipeCount}</strong> recipes that match your ingredients above. Listed below are <strong>{recipes.length}</strong> of them</p>
                            {getRecipeSection()}
                            <button onClick={getMoreRecipes}>Get more recipes!</button>
                        </section>
                    }
                </article>

            }
        </>
    )
}
export default RecipeGenerator
