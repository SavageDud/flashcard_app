const LOAD_Template= document.getElementById("Load_box")
var Load_box = document.getElementById("LoadBox")

var list_box = ["Math", "Chemisty", "French"]

const CREATE_FILE_BUTTON = "<div class = 'Flashcard_set_block' id = 'Create_Save_file_btn'> <p>+</p> </div>"



var Parser = new DOMParser()


const Load_exit_animation = ()=> {
    document.getElementById("in_n_out_animation").className = "close_animation"
}
// these function are for communicating with main process


//this function will be to load the save in the editor when the user click on edit 
const Load_file_editor = (param) => {
    Load_exit_animation()
    setTimeout(()=> {window.mainapp.load_save_editor(param)} , 450)
    
}
const Load_file_viewer = (param) => {
    Load_exit_animation()
    setTimeout(()=> {window.mainapp.load_save_viewer(param)} , 450)
    
}

//this finction call main.js to get the list of a all save names
const Load_save_list = async () => {
    let promis__ = window.mainapp.get_saves();
    promis__.then((data)=> { 
        list_box = data
        CreateTemplates();
    })
    
}

// this function loads the name
const Load_name = async() => {
    const name = await window.mainapp.name();
    document.getElementById("name_display").textContent = name
}


// this is function is only trigered when the use clicks on the + 
const Create_new_Save_= () => {
     Load_exit_animation()
     setTimeout(()=> {window.mainapp.create_new_save()} , 450)
}



Load_name()




const Create_Save_box = (name ,background_color , fontcolor  , bordercolor , index_) => {
    let simple_template = LOAD_Template.cloneNode(true)
    let id = "Load_" + name


    // id

    simple_template.style.backgroundColor = background_color
    simple_template.style.bordercolor = bordercolor
    simple_template.style.color = fontcolor

    simple_template.firstChild.textContent = name
    simple_template.id = id
    simple_template.querySelector("#run").id = name + "run"
    simple_template.querySelector("#setting").id = name+"settings"
    //add to world
    Load_box.appendChild(simple_template)
    document.getElementById(name + "run").addEventListener("click",  ()=> {Load_file_editor(index_)})
    document.getElementById( name+"settings").addEventListener("click",  ()=> {Load_file_viewer(index_)})
    
}

const Create_create_new_save_btn = () => {
    Load_box.appendChild((Parser.parseFromString(CREATE_FILE_BUTTON , "text/html")).body.firstChild)
    document.getElementById("Create_Save_file_btn").addEventListener("click" , ()=> {Create_new_Save_()})
}

const CreateTemplates = ()=>{
     while (Load_box.hasChildNodes()){
        Load_box.removeChild(Load_box.firstChild)
     }
     // now we create the boxs
     let index = 0;
     list_box.content.forEach((value , index)=>{
        Create_Save_box(value , list_box.color_profiles[index].background , list_box.color_profiles[index].font  , list_box.color_profiles[index].border , index)})
     Create_create_new_save_btn()
}

document.getElementById("load_option_btn_parent").firstChild.addEventListener("click"  , ()=> {
    Load_exit_animation()
    setTimeout(()=> {window.mainapp.load_settings()} , 450)
})
document.getElementById("load_tutorial_btn_parent").firstChild.addEventListener("click"  , ()=> {
    Load_exit_animation()
    setTimeout(()=> {window.mainapp.load_tutorial()} , 450)
})

Load_save_list()