import * as Yup from "yup"

export default Yup.object().shape({
        name: Yup
            .string()
            .required("Don't forget your name!"),
        email: Yup
            .string()
            .email("This must be a valid email address.")
            .required("Don't forget your email!"), 
        password: Yup
            .string()
            .required("You forgot to input a password")
            .min(3, "Passwords have to be at least 3 characters long."),
        terms: Yup
            .boolean()
            .oneOf([true], "You must accept the Terms and Conditions")
    })