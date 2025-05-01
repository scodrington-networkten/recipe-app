import Ingredient from "@components/Ingredient.jsx";
import {useState} from "react";
import ingredientList from "@components/IngredientList.jsx";

const IngredientList = ({ingredients, onRemoveItem}) => {

    const getContent = () => {

        //extract data about the ingredients
        let components = ingredients.map((item, index) => {
            const keyname = `ingredient-${index}`;
            return <li key={keyname}>
                <Ingredient data={{name: item}} onRemoveItem={onRemoveItem}/>
            </li>
        });

        if(ingredients.length > 0){
            return <>
                <h2>Here are all our ingredient</h2>
                <ul>
                    {components}
                </ul>
            </>
        }else{
            return <>
                <h2>Enter ingredients above to get started</h2>
            </>
        }
    };

    return (
        <div className="ingredient-list">
            {getContent()}
        </div>
    )
}
export default IngredientList
