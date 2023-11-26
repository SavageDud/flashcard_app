const Load_exit_animation = ()=> {
    document.getElementById("in_n_out_animation").className = "close_animation"
}

document.getElementById("submit_button").addEventListener("click", ()=> {
    
    
        Load_exit_animation()
        setTimeout(()=> {window.mainapp.home()} , 450)

})