
    var form = document.getElementById("login");
    const user =form.username;
    const password =form.password;
    form.addEventListener("submit",function(event){
        event.preventDefault();
    var cuerpo= '{ "username" : "'+form.username.value +
                '", "password" : "'+form.password.value + '"}'; 
                document.getElementById("usernamelbl").innerHTML= "";
    document.getElementById("passwordlbl").innerHTML= "";
    fetch("http://localhost:8080/api/login",{
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'},
        body : cuerpo
    })
    .then(res=>{
        if(res.ok){
            document.location.href="home.html";
        }
        else if(res.status==500){
            return res.json();
        }
        else{
            alert("Username or password introduced is incorrect")
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
