
function validation({value,name},inputsDetails, formType){

    const newErrors = []
    let inValid = false
    const {validations} = inputsDetails[name]

    if(name==="firstName" || name==="lastName" || name === "email"){
        value = value.trim()
    }
    
    if(validations.required && !value){
      newErrors.push(`נדרש - ${inputsDetails[name].name}`)
      inValid = true
    }

    if(validations.pattern && !validations.pattern.test(value)){
          newErrors.push(`${inputsDetails[name].name} - ${inputsDetails[name].appropriateError}`)
          inValid = true
    }

    if(name==="confirmPassword" && inputsDetails["password"].value !== value){
        newErrors.push("אין התאמה לסיסמא שנבחרה")
        inValid = true
    }


    if((formType === "register" || formType === "resetPassword") && name === "password" && inputsDetails["confirmPassword"].value && inputsDetails["confirmPassword"].value !== value && inputsDetails["confirmPassword"].errors.length === 0){
        inputsDetails["confirmPassword"].errors.push("אין התאמה לסיסמא שנבחרה")
        inputsDetails["confirmPassword"].inValid = true

    } else if((formType === "register" || formType === "resetPassword") && name === "password" && inputsDetails["confirmPassword"].value && inputsDetails["confirmPassword"].value === value){
        inputsDetails["confirmPassword"].errors = []
        inputsDetails["confirmPassword"].inValid = false
    }
    
    inputsDetails[name].inValid = inValid
    inputsDetails[name].value = value
    inputsDetails[name].errors = newErrors

   return  {...inputsDetails}

}

// validation objects to form

const firstName = {
    value: '', 
    name:"שם פרטי",
    inValid:false,
    appropriateError:"אותיות בלבד",
    errors: [], 
    validations: {
        required: true, 
        pattern: /^[a-z \u0590-\u05fe]+$/i
    }
}

const lastName = {
    value: '',
    name:"שם משפחה",
    inValid:false,
    appropriateError:"אותיות בלבד",
    errors:[], 
    validations:{
        required: true, 
        pattern: /^[a-z \u0590-\u05fe]+$/i
    }
}

const email = {
    value: '',
    name:"דואר אלקטרוני",
    inValid:false,
    appropriateError:"לא תקין", 
    errors:[], 
    validations:{
        required: true, 
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    }
} 

const password = {
    value: '',
    name:"סיסמא",
    inValid:false,
    appropriateError:"לפחות 6 תווים עם אות (אנגלית) וספרה",
    errors:[], 
    validations:{
        required: true, 
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/ 
    }
}

const confirmPassword = {
    value: '',
    name:"אימות סיסמא",
    inValid:false,
    errors:[], 
    validations:{
        required: true, 
    }
}


export {validation, firstName, lastName, email, password, confirmPassword}