import React, { useState, useEffect } from "react";
import './App.css';
import Form from "./Form";
import * as yup from "yup";
import formSchema from "./validation/formSchema";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";


/////////INITIAL STATES//////////

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  terms: false,
}

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  terms: false,
  }

  const initialUsers = [];
  const initialDisabled = true;

function App() {

  ////////////////STATES///////////// 

  const [ users, setUsers ] = useState(initialUsers);
  const [ formValues, setFormValues ] = useState(initialFormValues);
  const [ formErrors, setFormErrors ] = useState(initialFormErrors);
  const [ disabled, setDisabled ] = useState(initialDisabled);

  ///////////////HELPERS////////////////////

  const postNewUser = (newUser) => {
    //AXIOS HERE//
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
        setFormValues(initialFormValues);
      })
      .catch(err => {
        console.log(err);
        debugger;
      })
  }

  ///////////////EVENT HANDLERS///////////////

  const inputChange = (name, value) => {
    //VALIDATION WITH YUP//
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({...formErrors, [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({...formErrors, [name]: err.errors[0],
        })
      })

      setFormValues({
        ...formValues,
        [name]: value
      })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms,
    }

    postNewUser(newUser);
    console.log(users);
  }

  //////////////SIDE EFFECTS////////////////

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    })
  }, [formValues]);


  

  return (
    <div className="App">
      <header><h1>New User</h1></header>
      
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
        />

        {
          users.map(user => {
            return (
            <div>
              <h3>{user.name}</h3>
              <ul>
                <li key={uuidv4()}>Email: {user.email}</li>
                <li key={uuidv4()}>Password: {user.password}</li>
                <li key={uuidv4()}>Terms: {user.terms}</li>
              </ul>
            </div>
            ) 
          })
        }
    </div>
  );
}

export default App;
