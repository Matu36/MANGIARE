import React from "react";
import style from "../FormUser/formUser.module.css"
//import { useDispatch } from "react-redux";

export default function CreateUser () {

    let [input, setInput] = React.useState ({
name: "",
lastName: "",
document: "",
phoneNumber: "",
adress: "",
email: "",
password: ""

});

let letHandleOnChange = (e) => {
    e.preventDefault();
    console.log (e);
    setInput ((prev) => ({...prev, [e.target.name] : e.target.value}))
}

//let dispatch = useDispatch ();

let handleSubmit = (e) => {
    e.preventDefault();
//dispatch (createUser(input));
    setInput ({name: "", lastName: "", document: "", phoneNumber: "",
adress: "", email: "", password: ""})

}

return (
    <div className= {style.container}>
    <div className= {style.form}>

<form onSubmit={(e) => handleSubmit(e)}>
<div>
    <label className= {style.label}> Nombre </label>
    <input className= {style.input} type= {"text"} name = {'name'}  value= {input.name} 
    onChange= {(e) => letHandleOnChange (e)}/>
</div>
<div>
<label className= {style.label}> Apellido </label>
    <input className= {style.input} type= {"text"} name = {'lastName'}  value= {input.lastName} 
    onChange= {(e) => letHandleOnChange (e)}/>
</div>
<div>
    <label className= {style.label}> Documento </label>
    <input className= {style.input} type= {"text"} name = {'document'}  value= {input.document} 
    onChange= {(e) => letHandleOnChange (e)}/>
</div>
<div>
    <label className= {style.label}> Telefono </label>
    <input className= {style.input} type= {"text"} name = {'phoneNumber'}  value= {input.phoneNumber} 
    onChange= {(e) => letHandleOnChange (e)}/>
</div>
<div>
    <label className= {style.label}>Direccion </label>
    <input className= {style.input} type= {"text"} name = {'adress'}  value= {input.adress} 
    onChange= {(e) => letHandleOnChange (e)}/>
</div>
<div>
    <label className= {style.label}> Email </label>
    <input className= {style.input} type= {"text"} name = {'email'}  value= {input.email} 
    onChange= {(e) => letHandleOnChange (e)}/>
</div>
<div>
    <label className= {style.label}> Contraseña </label>
    <input className= {style.input} type= {"text"} name = {'password'}  value= {input.password} 
    onChange= {(e) => letHandleOnChange (e)}/>
</div>
 <br/>

 <input type={'submit'} value = {'Enviar'}/>


</form>

</div>
</div>
)


    
}