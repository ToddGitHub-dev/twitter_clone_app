(function(){
    let loginBtn = document.getElementById("login")
    let errMsg = document.getElementById("errMsg")
    let userInput = document.getElementById("userInput")
    let passInput = document.getElementById("passInput")
    if(errMsg.innerText === "Incorrect Username or Password"){
        userInput.style.border = "1px solid red"
        passInput.style.border = "1px solid red"
    }
})();