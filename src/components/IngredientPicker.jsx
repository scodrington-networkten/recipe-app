import '@css/ingredient-picker.scss';
import {useContext, useState} from "react";
import {UserContext} from "@components/UserContext.jsx";

const IngredientPicker = ({onAddItem, ingredients}) => {

    //state of the input value
    const [inputValue, setInputValue] = useState("");
    const [inputInvalid, setInputInvalid] = useState(false);

    const {user} = useContext(UserContext);

    //action for form, provided with formdata
    function submit(formData) {
        validateInput(formData.get("ingredient_picker"));
    }

    //validate the new input
    function validateInput(inputValue) {

        let isInvalidInput = false;

        //test for empty
        if (!inputValue) {
            isInvalidInput = true;
        }

        //check each ingredient and compare its lower case version against the input, if it exists its not valid
        if (ingredients.some(item => {
            return item.toLowerCase() === inputValue.toLowerCase();
        }) === true) {
            isInvalidInput = true;
        }

        //set input state based on tests
        setInputInvalid(isInvalidInput);

        //if input is valid, add to list
        if (isInvalidInput === false) {
            onAddItem(inputValue);
        }

        //clear out the input value
        setInputValue("");
    }

    return (
        <>
            <form className="ingredient-form" action={submit}>
                <div className="ingredient-picker">
                    <div className="primary">
                        <input
                            placeholder="Search for ingredient"
                            type="text"
                            name="ingredient_picker"
                            id="ingredient_picker"
                            aria-label="Search for ingredient"
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button>+ Add Ingredient</button>
                    </div>
                    {inputInvalid && <div className="secondary">
                        <p className="error-message">That ingredient is invalid. Please select another ingredient</p>
                    </div>}
                </div>
            </form>
        </>
    )
}

export default IngredientPicker;
