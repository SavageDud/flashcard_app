const { app, BrowserWindow , ipcMain} = require('electron')
const path = require('path')
const fs = require("fs")




const { session } = require('electron')







//info to
const USER_DOC_DIR = app.getPath("documents")
const APP_DIR_NAME = "\\simple_flash_cards_VS\\"

const SAVE_DIR_NAME =  "\\files\\"
//this file contains all the info about the app . flashcards folder , user name , blablabla
const MAIN_FILE_NAME = "root.json"



console.log(USER_DOC_DIR + APP_DIR_NAME)

const CURRENT_VERSION = "0.1"





//these functions are for loading file

const purify_file = (file) => {
   return file
   
}



const delete_save = (path) => {
    // check if it exist
    if (fs.existsSync(USER_DOC_DIR + APP_DIR_NAME + path)){
      fs.unlink(USER_DOC_DIR + APP_DIR_NAME + path , ()=> {} )
    }
} 


const Load_json = async (name , callback_) => {
  
  if(!fs.existsSync(USER_DOC_DIR+APP_DIR_NAME)){
    console.log("path does not exist")
     fs.mkdir(USER_DOC_DIR+APP_DIR_NAME , ()=> {})
     fs.mkdir(USER_DOC_DIR+APP_DIR_NAME + SAVE_DIR_NAME , ()=> {})
  }
  if(!fs.existsSync(USER_DOC_DIR+APP_DIR_NAME + SAVE_DIR_NAME)){
    fs.mkdir(USER_DOC_DIR+APP_DIR_NAME + SAVE_DIR_NAME , ()=> {})
  }
  if(fs.existsSync(USER_DOC_DIR+APP_DIR_NAME+name)){
      await fs.readFile(USER_DOC_DIR+APP_DIR_NAME+name ,cb = (err, data)=>{if(!err){callback_(purify_file(data))}})
  }
  return null
}


const write_json_file = (data , file_name) => {
    return write_file(JSON.stringify(data , null , 2) , file_name)
}


const write_file = (data , file_name) => {
   fs.writeFile(USER_DOC_DIR + APP_DIR_NAME + file_name , data , (err) => {
    if (err) {
      return false
    } else {
      return true
    }
  })
}

const Load_Main_file =  (callback)=>{
   let file =  Load_json(MAIN_FILE_NAME , callback)
   
   console.log(file)
   if (file == null) {
       return null
   }
   return file
}


const is_xls_safe = ()=> { 
   
   return true
}

const Check_file_security_integrity = ()=> {
     
}
const create_unique_name = (all_names , new_name)=> {
   let allnames_dict ={}
   all_names.forEach((element) => {
      allnames_dict[element] = null;
   });
   let unique_number = 0

   if(!(new_name in allnames_dict)){

    return new_name
   }

   new_name = new_name + "_"
   let Max_iteration = all_names.length + 1
  
   while (unique_number <= Max_iteration){
    if(!((new_name + unique_number.toString()) in allnames_dict)){
      return (new_name + unique_number.toString())
    }
    unique_number++
   }
   unique_number++
   return (new_name + unique_number.toString())
}
// this function will verify the integrity of local files



// this function is called when user saves the file in the editor
// in the editor the user can change the name of the file so 
// if the did we delete old and write a new , else we just write it
const Write_Save_Data = (file_name, old_file_name , file) => {
    if(file_name == old_file_name){
        write_json_file(file , SAVE_DIR_NAME + file_name)
    }
    else{
      // 1 delete old_file_name replace white new
      if(fs.existsSync(USER_DOC_DIR + APP_DIR_NAME + SAVE_DIR_NAME+ old_file_name)){
        fs.unlink(USER_DOC_DIR + APP_DIR_NAME + SAVE_DIR_NAME+ old_file_name , ()=>{})
        write_json_file(file , SAVE_DIR_NAME + file_name)
      }
      write_json_file(file , SAVE_DIR_NAME + file_name)
    }
}




const createWindow =  () => {


   
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        
      }
    })
    win.setMenu(null)
    const load_home = ()=>{
      win.loadFile('home.html')
    }

    // first we check if we have a main file , if we dont we send hime to tutorial
    // load the main file

    var main_settings = Load_Main_file((data) => {main_settings = JSON.parse(data); if(data != null ) {load_home();}})


    if(main_settings == null || main_settings.version != CURRENT_VERSION ){
      win.loadFile('tutorial.html')
    }
    else{
      win.loadFile('home.html')
    }

    
    // this logic is for the flashcard viewer
    

    //these variable are for the handling the saves
    var currentsave = { name: "",
                      content: []}

    var current_save_index = 0

    //handlers for data transmition and manipulation
    
    ipcMain.handle('basic:get_name' , () => {
      return main_settings.usernam
    })
    ipcMain.handle("change_name" , (caller , new_name)=> {
      main_settings.usernam = new_name
      write_json_file(main_settings , MAIN_FILE_NAME)
      return true
    })

    ipcMain.handle('basic:get_saves', ()=> {
      return { 
        content : main_settings.flashcards_sets,
        color_profiles : main_settings.color_profiles,
        }
    })
    
    ipcMain.handle("viewer:get_data", ()=>{
      return currentsave
    })
    ipcMain.handle("editor:save" , (sender,content)=> {
       // get the index of the thing
       // [old_name , new_name , data]
       new_name = content[1]
       currentsave.content = content[2]
       
       
       if(content[0] != new_name){
         new_name = create_unique_name( main_settings.flashcards_sets , content[1])
         main_settings.flashcards_sets[current_save_index] = new_name
         main_settings.paths[current_save_index] = SAVE_DIR_NAME + new_name + ".json"       
       }
       currentsave.name = new_name
       Write_Save_Data(new_name+ ".json" , content[0] + ".json" , content[2])
       write_json_file(main_settings , MAIN_FILE_NAME)
       return true
    })


    ipcMain.handle("home:createsave" , ()=> {
        //updating
        let new_name = create_unique_name(main_settings.flashcards_sets , "new_file")
        main_settings.flashcards_sets.push(new_name)
        main_settings.paths.push(SAVE_DIR_NAME + new_name + ".json")
        main_settings.color_profiles.push({background : "#FFBBBB" , border : "#EE0000" ,font : "#220000"})

        //writing
        write_json_file(main_settings , MAIN_FILE_NAME)
        write_json_file([["new save" , "blank"]] ,  SAVE_DIR_NAME + new_name +".json")

        // opning
        currentsave = { name: new_name,
        content: [["4+4" , "8"],["1+2" , "3"],["abc","d"]]}
        current_save_index =  main_settings.flashcards_sets.length - 1

        win.loadFile("editor.html")
        
       
    })
    ipcMain.handle("editor:delete_save" , ()=> {
       
       delete_save(main_settings.paths[current_save_index])
       
       main_settings.paths.splice(current_save_index , 1)
       main_settings.flashcards_sets.splice(current_save_index , 1)
       main_settings.color_profiles.splice(current_save_index , 1)
       write_json_file(main_settings , MAIN_FILE_NAME)
       win.loadFile("home.html")
    })
    ipcMain.handle("editor:update_color_profil" , (caller , data)=> { 
       main_settings.color_profiles[current_save_index] = data
       write_json_file(main_settings , MAIN_FILE_NAME)
    })
    ipcMain.handle("get_current_color_profile" , ()=> { 
      return main_settings.color_profiles[current_save_index]
    })


    // ####################################
    //
    // these handlers are for switching pages 
    ipcMain.handle('page-handler:editor' , (caller, index)=> {

      console.log(index)
      current_save_index = index
      currentsave.name = main_settings.flashcards_sets[index]
      Load_json(main_settings.paths[index], (data)=>{
        console.log("file is loaded")
       currentsave.content = JSON.parse(data);
       win.loadFile("editor.html");
      })
   })


   ipcMain.handle('page-handler:viewer' , (caller, index)=> {

    console.log(index)
    current_save_index = index
    currentsave.name = main_settings.flashcards_sets[index]
    Load_json(main_settings.paths[index], (data)=>{
      console.log("file is loaded")
     currentsave.content = JSON.parse(data);
     win.loadFile("index.html");
    })
 })


    //handlers for the tutorial page 
    ipcMain.handle('tutorial:start' , (sender,param)=> {
        // we create the start file
        console.log(param)
        main_settings = {
          usernam : param,
          paths : [],
          flashcards_sets : [],
          version : CURRENT_VERSION,
          color_profiles : [] ,
        }
        write_json_file(main_settings , MAIN_FILE_NAME)
        win.loadFile("home.html")
    })
    // handlers for the viewer page 
    
    // home button viewer
    ipcMain.handle('page-handler:Home' , () => {
      win.loadFile("home.html")
    })
    ipcMain.handle("go_to_tutorial_page" , ()=> { 
      win.loadFile("user_manual.html")
    })
    ipcMain.handle("load_settings_page" , ()=> {
      win.loadFile("settings.html")
    })
    

}


app.on("ready" , createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })