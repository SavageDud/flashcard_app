const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mainapp', {

    // these are for data interaction , like store delete and get data

    get_saves : () => ipcRenderer.invoke('basic:get_saves'),
    tutorial : (param) => ipcRenderer.invoke('tutorial:start' , param), // the tutorial will ask the user stuff and save it 
    get_save_data : () => ipcRenderer.invoke("viewer:get_data"),
    create_new_save : () => ipcRenderer.invoke("home:createsave"),
    name : () => ipcRenderer.invoke('basic:get_name'),
    update_save_data : (content) => ipcRenderer.invoke("editor:save",content),
    delete_save : () => ipcRenderer.invoke("editor:delete_save"),
    update_save_color_profile : (data)=> ipcRenderer.invoke("editor:update_color_profil" , data),
    get_current_color_profile : ()=> ipcRenderer.invoke("get_current_color_profile"),
    change_name : (name)=> ipcRenderer.invoke("change_name" , name),
    

    // these will be to move between pages
    load_save_editor : (index) => ipcRenderer.invoke('page-handler:editor' , index),
    load_save_viewer : (index) => ipcRenderer.invoke('page-handler:viewer' , index),
    home: () => ipcRenderer.invoke('page-handler:Home'),
    load_tutorial : ()=> ipcRenderer.invoke("go_to_tutorial_page"),
    load_settings : ()=> ipcRenderer.invoke("load_settings_page"),

  })
