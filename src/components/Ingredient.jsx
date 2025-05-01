import crossIcon from '@image-assets/cross-white.png';
import '@css/ingredient.scss';

const Ingredient = ({data, onRemoveItem}) => {

    //called when we want to remove this item, call remove method
    const onRemoveButton = () => {
        onRemoveItem(data.name);
    }

    return (
        <>
            <div className="ingredient-item">
                <p>
                    <span className="remove-item" onClick={onRemoveButton}>
                        <img src={crossIcon} alt="remove ingredient"/>
                    </span>
                    <span className="name">{data.name}</span>
                </p>
            </div>
        </>
    )
}
export default Ingredient
