const SignupForm = () => {


    function signup(formData) {
        let newData = {
            ...Object.fromEntries(formData),
            dietaryRestrictions: formData.getAll("dietaryRestrictions")
        }
        console.log(newData);
    }

    return (
        <>
            <div className="signup-form">
                <form action={signup}>
                    <p>
                        <label htmlFor="email">Email:</label>
                        <input id="email" defaultValue="joe@schmoe.com" type="text" name="email"
                               placeholder="joe@schmoe.com"/>
                    </p>
                    <p>
                        <label htmlFor="password">Password:</label>
                        <input id="password" defaultValue="password123" type="password" name="password"/>
                    </p>
                    <p>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description"></textarea>
                    </p>
                    <fieldset>
                        <legend>Employment Status:</legend>
                        <label>
                            <input type="radio" name="employmentStatus" value="unemployed"/>
                            Unemployed
                        </label>
                        <label>
                            <input type="radio" name="employmentStatus" value="part-time"/>
                            Part-time
                        </label>
                        <label>
                            <input type="radio" name="employmentStatus" defaultChecked={true} value="full-time"/>
                            Full-time
                        </label>
                    </fieldset>
                    <fieldset>
                        <legend>Dietary restrictions:</legend>
                        <label>
                            <input type="checkbox" name="dietaryRestrictions" value="kosher"/>
                            Kosher
                        </label>
                        <label>
                            <input type="checkbox" name="dietaryRestrictions" value="vegan"/>
                            Vegan
                        </label>
                        <label>
                            <input type="checkbox" name="dietaryRestrictions" defaultChecked={true}
                                   value="gluten-free"/>
                            Gluten-free
                        </label>
                    </fieldset>

                    <p>
                        <button>Submit</button>
                    </p>
                </form>
            </div>
        </>
    )
}
export default SignupForm
