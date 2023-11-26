

const Load_save_data = ()=> {
    let save = window.mainapp.get_save_data();

    save.then((result_)=>
    {
        
        data = result_.content
        initial_name = result_.name
        new_name = initial_name
        name_container.firstChild.textContent = new_name
        
        render_window()

    })
}



var data = {name : "loading" ,}
var card_index = 0
var side_index = 0




const COLOR_PREVIEW_OBJ = document.getElementById("color_preview_box")






const SETTING_DISPLAY = document.getElementById("setting_overlay")

var initial_name = data.name
var new_name = initial_name
var is_editing_name = 0

var Parser = new DOMParser()

// variable for controlling panels 
var is_setting_panel_open = false

const name_container = document.getElementById("name_container")
const flip_bttn = document.getElementById("edit_name_buttn")




const ReturntoMenu = ()=>{
   document.getElementById("in_n_out_animation").className = "Big_Overlay_Exit"
   setTimeout(()=> { window.mainapp.home()} , 1000)
}

var color_profile = {background : "#FFBBBB" , border : "#EE0000" ,font : "#220000"}
//the input listiners 
const background_color_input = document.getElementById("color_bg_input")
const font_color_input = document.getElementById("font_color_input_")
const border_color_input = document.getElementById("border_color_input_")

const hex_char = {
    A: null ,
    B : null ,
    C : null , 
    D : null ,
    E : null ,
    F : null ,
 }


 
const Save_color_profil = ()=> { 
    window.mainapp.update_save_color_profile(color_profile)
}

document.getElementById("save_colors_btn").addEventListener("click" , ()=>{
    Save_color_profil()
})


const Load_profile_preview = ()=> {
    COLOR_PREVIEW_OBJ.style.backgroundColor = color_profile.background
    COLOR_PREVIEW_OBJ.style.borderColor = color_profile.border
    COLOR_PREVIEW_OBJ.style.color = color_profile.font
    background_color_input.value =  color_profile.background.substring(1)
    font_color_input.value = color_profile.font.substring(1)
    border_color_input.value = color_profile.border.substring(1)
}

const IsHexData = (string__) =>{
    
    for(let char_ind ; char_ind < string__.length ; char_ind++){
        let current_char = string__.charAt(char_ind)
        if(! (current_char in hex_char) && isNaN(parseInt(current_char))){
            return false;
        }
    }
    return true;
}


const IsString_Valid_Color_code = (string_)=> {
    if(string_.length == 6){
        if(IsHexData(string_)){
            return true
        }
    }
    return false
}

background_color_input.addEventListener("input" , ()=> {
    let cur_value = background_color_input.value
    if(IsString_Valid_Color_code(cur_value)){
       color_profile.background = "#"+cur_value
       COLOR_PREVIEW_OBJ.style.backgroundColor = color_profile.background
    }
})
border_color_input.addEventListener("input" , () => {
    let cur_value = border_color_input.value
    if(IsString_Valid_Color_code(cur_value)){
        color_profile.border= "#"+cur_value
        COLOR_PREVIEW_OBJ.style.borderColor = color_profile.border
        
     }
})


font_color_input.addEventListener("input" , ()=> { 
    let cur_value = font_color_input.value
    if(IsString_Valid_Color_code(cur_value)){
        color_profile.font= "#"+cur_value
        COLOR_PREVIEW_OBJ.style.color = color_profile.font
     }
})



const Load_color_profile = ()=> {
    let promise__ = window.mainapp.get_current_color_profile()
    promise__.then((data)=> {
        color_profile = data
        Load_profile_preview()
    })
}

Load_profile_preview()



const close_settings_tab = ()=>{
    let main_container = document.getElementById("setting_overlay")
    document.getElementById("overlay_container_main").style.animationName = "close_Overlay_content";
    main_container.style.zIndex = 0;
    main_container.style.animationName = "fadeOut";
}


const open_settings_tab = ()=>{
  let main_container = document.getElementById("setting_overlay")
  document.getElementById("overlay_container_main").style.animationName = "Overlay_content";
  main_container.style.zIndex = 2;
  main_container.style.animationName = "fadeInd";
}



const close_colors_tab = ()=>{
    let main_container = document.getElementById("color_tab")
    document.getElementById("color_main_tab").style.animationName = "close_Overlay_content";
    main_container.style.zIndex = 0;
    main_container.style.animationName = "fadeOut";
}


const open_colors_tab = ()=>{
  let main_container = document.getElementById("color_tab")
  document.getElementById("color_main_tab").style.animationName = "Overlay_content";
  main_container.style.zIndex = 2;
  main_container.style.animationName = "fadeInd";
}





// when the user clicks open settings

const Open_Setting_Panel = ()=>{
  if(is_setting_panel_open){
     return
  }
  console.log("Opening setting panel")

  
  open_settings_tab()
  is_setting_panel_open = true
}

document.getElementById("open_setting_btn").addEventListener("click" , ()=>{
    Open_Setting_Panel()
})

document.getElementById("edit_display_color").addEventListener("click", ()=> {
    if(is_setting_panel_open){
       close_settings_tab()
       open_colors_tab()
    }
})

document.getElementById('close_colors_btn').addEventListener("click" ,  ()=> { 
    
    close_colors_tab()
    open_settings_tab()
    
})



// when the user clicks close settings
const Close_Setting_Panel = ()=>{
    if(!is_setting_panel_open){
        return;
    }

    close_settings_tab()
    
  

    is_setting_panel_open = false;
    
    
}

document.getElementById("close_settings_btn").addEventListener("click" , ()=>{
    Close_Setting_Panel()
})

document.getElementById("delete_bttn").addEventListener("click" , ()=>{
    if(is_setting_panel_open){
        window.mainapp.delete_save()
    }

})

document.getElementById('')

/// now we will figure out how the editor will work
// first only one card we be displayed at the time 
// we will also be abble to render multiple type of object
// like images , text , bullet points

// Another thing is that we want to make a way to provide answer
// so the user if he wants can put a quiz befor the card flip
//
const wrap_p_tags = (_tar_ , class_ = "" , id_ = "") => {
   
    return  (Parser.parseFromString("<p class = '"+class_+"'  id = '"+id_+"'>" + _tar_ +" </p>" , "text/html")).body.firstChild
 }

const wrap_textarea_tags = (_tar_ , class_ = "" , id_ = "") => {
   
   return  (Parser.parseFromString("<textarea type = 'text' class = '"+class_+"'  id = '"+id_+"'>"+_tar_ +" </textarea>" , "text/html")).body.firstChild
}

const wrap_input_tags = (_tar_ , class_ = "" , id_ = "") => {
   
    return  (Parser.parseFromString("<input type = 'text' class = '"+class_+"' value = '" + _tar_+ "' id = '"+id_+"'> </input>" , "text/html")).body.firstChild
 }
const save_file = () => {

}


const switch_rename_stat= ()=>{
    
    if(is_setting_panel_open){
        return
     }

     // if the user finished editing we set the value of name to name
    if(is_editing_name){
        new_name = name_container.firstChild.value
    }
    // switch the state
    is_editing_name = [1 , 0][is_editing_name]
    flip_bttn.textContent = ["edit" , "save"][is_editing_name]

    while (name_container.hasChildNodes()){
        name_container.removeChild(name_container.firstChild)
     }
     if(is_editing_name){
        name_container.appendChild(wrap_input_tags(new_name))
        return
     }
     name_container.appendChild(wrap_p_tags(new_name))
}

flip_bttn.addEventListener("click" , ()=>{

    switch_rename_stat()
})


const editor_window_object =document.getElementById("editor_window_main")


const get_current_card = ()=> {

}




const render_card_on_container = (elements)=>{
    while (editor_window_object.hasChildNodes()){
        editor_window_object.removeChild(editor_window_object.firstChild)
     }
    elements.forEach((element) => {
        render_text(element)
    });
}

const get_editor_data = ()=>{
    let editor_data = []
    for (let i = 0; i < editor_window_object.children.length; i++) {
        const childElement = editor_window_object.children[i];
        editor_data.push(childElement.value)
        // Do something with the childElement
      }
    return editor_data
}





const render_text = (text)=> {
   
    editor_window_object.appendChild(wrap_textarea_tags(text , "text_zone"))
}

const render_window = ()=> {
   
    render_card_on_container([data[card_index][side_index]])
}




// add button 
const add_button = ()=> {
   // inject a new [[] , []] after current index
   card_index+=1;
   data.splice(card_index,0,["",""])
   render_window()
}
document.getElementById("add_card_btn").addEventListener("click" , ()=> {
    
    if(is_setting_panel_open){
        return
    }

    add_button()
})


// remove card btn
const remove_button = ()=>{
      //if lenght = 1, errase and replace with [[],[]]
      //if lenght > 1 , remove from 
      if(data.length == 1){
        data = [["",""]]
        render_window()
        return
      }
      data.splice(card_index,1)
      if(card_index > 0){
        card_index -=1
      }
      render_window()
}



document.getElementById("remove_card_btn").addEventListener("click" , ()=> {
    
    if(is_setting_panel_open){
        return
     }
    remove_button()
})

document.getElementById("next_button").addEventListener("click" , ()=> {
    
    if(is_setting_panel_open){
        return
     }

    if(card_index < data.length-1){
        data[card_index][side_index] = get_editor_data()
        card_index+=1
        render_window()
    }
})

document.getElementById("prev_button").addEventListener("click" , ()=> {
    
    if(is_setting_panel_open){
        return
     }

    if(card_index > 0){
        data[card_index][side_index] = get_editor_data()
        card_index-=1
        render_window()
    }
})

document.getElementById("flip_button").addEventListener("click" , ()=> {
    
    if(is_setting_panel_open){
        return
     }

    data[card_index][side_index] = get_editor_data()
    side_index = [1,0][side_index]
    editor_window_object.className = ["Main_display_editor" , "Main_display_editor_back"][side_index]
    render_window()
})




document.getElementById("save_and_exit").addEventListener("click",()=>{

    if(is_setting_panel_open){
        return
     }

    data[card_index][side_index] = get_editor_data()
    let confirmation = window.mainapp.update_save_data([initial_name , new_name , data]);
    confirmation.then((response__) => {
        if(response__){
            ReturntoMenu()
        }
    })

})
document.getElementById('exit_bttn').addEventListener("click" , ()=> { 
    if(is_setting_panel_open){
        ReturntoMenu()
    }
})
document.getElementById("save_button").addEventListener("click" , ()=>{
    data[card_index][side_index] = get_editor_data()
    let confirmation = window.mainapp.update_save_data([initial_name , new_name , data]);
    confirmation.then((response__)=> { 
        if(response__){
            if(is_editing_name){
                switch_rename_stat()
            }
            Load_save_data()
            
        }
    })
})

Load_save_data()