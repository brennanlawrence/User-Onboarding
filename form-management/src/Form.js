import React, { useState, useEffect, setButtonDisabled } from "react";


export default function Form(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props;
    
    function onChange(evt) {
        const { name, value, type, checked } = evt.target;
        const newValue = type === "checkbox" ? checked : value;
        change(name, newValue);
    }
    
    function onSubmit(event) {
        event.preventDefault();
        submit();
    }


    return(
       <div>
           <form onSubmit={onSubmit}>
               <div>
                   <h2>Add New User</h2>
                    <button disabled={disabled}>Submit</button>
                    <div>
                        <div>{errors.name}</div>
                        <div>{errors.email}</div>
                        <div>{errors.password}</div>
                        <div>{errors.terms}</div> 
                    </div>  
               </div>
               <label>
                   Name
                   <input 
                    type="text" 
                    name="name" 
                    onChange={onChange}
                    value={values.name}
                    placeholder="Name Here">
                   </input>
               </label>
               <label>
                   Email
                   <input 
                    type="email" 
                    name="email" 
                    onChange={onChange}
                    value={values.email}
                    placeholder="Email Here">
                   </input>
               </label>
               <label>
                   Password
                   <input 
                    type="password" 
                    name="password" 
                    onChange={onChange}
                    value={values.password}
                    placeholder="Set Password">
                   </input>
               </label>
               <label>
                   I Agree to the Terms of Service
                   <input
                    type="checkbox"
                    name="terms"
                    checked={values.terms}
                    onChange={onChange}
                    >
                   </input>
               </label>
               
           </form>
       </div> 
    )
}