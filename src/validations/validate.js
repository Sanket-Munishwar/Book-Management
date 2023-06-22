const titleCheck = (str)=>{
    let arr = ["Mr", "Mrs", "Miss"]
    if(arr.includes(str)) return true
    return false
}

const passwordCheck = (str)=>{
    if(str.length < 8 || str.length > 15) return false
    return true
}

const ratingRange = (rating)=>{
    rating = Number(rating)
    if(rating < 1 || rating > 5) return false
    return true
}




//======================================= Name Regex Validation ========================================//
const validateName = (name) => {
    return (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name));
}

//====================================== Email Regex Validation =======================================//
const validateEmail = (email) => {
    return (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(email));
}

//===================================== Password Regex Validation ====================================//
const validatePassword = (password) => {
    return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password));
}

//==================================== Number Regex Validation ======================================//
const validateMobileNo = (Number) => {
    return ((/^((\+91)?|91)?[6789][0-9]{9}$/g).test(Number));
}

//===================================== Pincode Regex Validation ===================================//
const validatePincode = (pincode) => {
    return (/^[1-9][0-9]{5}$/).test(pincode);
}

//==================================== ISBN Regex Validation =======================================//
const validateISBN = (ISBN) => {
    return (/^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/g).test(ISBN);
}

//===================================== Place Regex Validation ===================================//
const validatePlace = (value) => {
    return (/^[^\W\d_]+\.?(?:[-\s'’][^\W\d_]+\.?)*$/).test(value);
}

module.exports = {
    titleCheck,
    passwordCheck,
    ratingRange,
    validateName,
    validateEmail, 
    validatePassword, 
    validateMobileNo, 
    validatePincode, 
    validateISBN, 
    validatePlace 
}