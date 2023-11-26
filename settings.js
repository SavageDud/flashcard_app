
load_name_request = window.mainapp.name()

const Load_exit_animation = ()=> {
    document.getElementById("in_n_out_animation").className = "close_animation"
}

load_name_request.then((nickname) => { 
    document.getElementById("name_input").value = nickname
})

document.getElementById("submit_button").addEventListener("click", ()=> {
    let request_ =  window.mainapp.change_name(document.getElementById("name_input").value)
    request_.then(()=> {
        Load_exit_animation()
        setTimeout(()=> {window.mainapp.home()} , 450)
    })
})
