import React from "react"
function Input(props){
    
    function handleInputChange(e){
        props.onFormChange(e)
    }
    
    function handleFormSubmit(e){
        props.onFormSubmit(e)
    }

    return(
        <div>
            <form onSubmit={handleFormSubmit} className="form">
                <label className="label" htmlFor="todoInput">
                    Enter city name below :
                </label><p/>
                <input className="input"
                    type="text"
                    name="todoInput"
                    required={true}
                    onChange={handleInputChange}/>
                <input className="btn" type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Input