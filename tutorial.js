console.log("hello world")

document.getElementById("submit_button").addEventListener("click" , async()=> {
     console.log("hello world")
     await window.mainapp.tutorial(document.getElementById("name").value);
})

