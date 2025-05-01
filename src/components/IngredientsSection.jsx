import IngredientList from "@components/IngredientList.jsx";
import IngredientPicker from "@components/IngredientPicker.jsx";
import RecipeGenerator from "@components/RecipeGenerator.jsx";
import {useState} from "react";
import ingredient from "@components/Ingredient.jsx";

const IngredientsSection = () => {

    //holds all currently selected ingredients
    const [ingredients, setIngredients] = useState(["Apple", "Sugar", "Honey"]);

    //called by IngredientPicker when submitting the form, to select a new ingredient
    function handleAddItem(newItem) {
        setIngredients(function(prevIngredients) {
            return [...prevIngredients, newItem];
        });
    }

    //called by Ingredient when user selects the x button to remove the ingredient from the list
    function handleRemoveItem(item) {
        setIngredients(function(prevIngredients) {
            return prevIngredients.filter(ingredient => ingredient != item);
        });
    }

    return (
        <>
            <div className="ingredients-section">
                <IngredientPicker onAddItem={handleAddItem} ingredients={ingredients}/>
                <IngredientList onRemoveItem={handleRemoveItem} ingredients={ingredients}/>
                <RecipeGenerator ingredients={ingredients}/>
            </div>
        </>
    )
}
export default IngredientsSection
