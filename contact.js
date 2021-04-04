var form = document.getElementById("contact");
    form.addEventListener("submit",function(event){
        event.preventDefault();
    var cuerpo= '{ "name" : "'+form.firstname.value +
                '", "lastname" : "'+form.lastname.value + '",'
                +'"email" : "'+form.email.value+'",'
                +'"message" : "'+form.subject.value + '" }' ;
    document.getElementById("namelbl").innerHTML= "";
    document.getElementById("lastnamelbl").innerHTML= "";
    document.getElementById("emaillbl").innerHTML= "";
    document.getElementById("messagelbl").innerHTML= "";            
    fetch("http://localhost:8080/api/contact",{
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'},
        body : cuerpo
    })
    .then(res=>{
        if(res.ok){
            document.getElementsByClassName("contenedor")[0].innerHTML= '<h1 class="tituloContacto">Message sent</h1><p class="parrafoPrincipal">'+
            "Thanks for your message,"+ form.firstname.value+". We will try to answer as soon as possible</p>";
        }
        else if (res.status==500){
            return res.json();
          }
        })
        .then(r=>{
            console.log(r);
            r.errors.forEach(error => {
                document.getElementById(error.field+"lbl").innerHTML= error.message;
            }); 
        })   
    .catch(e=>{
   console.log(e);
    }) 
    return false;
});