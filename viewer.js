var card_data = []
var current_card_index = 0;
var current_side_index = 0;

const first_side = document.getElementById('flash_one')
const second_side = document.getElementById('flash_two')



const LoadCurrentCard = ()=> { 
   first_side.textContent = card_data[current_card_index][0]
   second_side.textContent = card_data[current_card_index][1]
}


const Load_data = ()=>{
   let promise__ = window.mainapp.get_save_data()
   promise__.then((data)=>{
    card_data = data.content
    LoadCurrentCard()
   })
}

const Update_card_index = (direction)=> {
   let new_index = direction + current_card_index
   if(new_index >= 0 && new_index < card_data.length){
     current_card_index = new_index
     let flip_side = false
     if(current_side_index == 1){
       Flip_btn()
       flip_side = true
       
     }
     if(first_side){
      setTimeout(()=> {LoadCurrentCard()} , 200)
     }
     else{
       LoadCurrentCard()
     }
     
   } 
}


document.getElementById('prev_button').addEventListener('click', async () => {
    Update_card_index(-1)
  })
document.getElementById('next_button').addEventListener('click', async () => {
    Update_card_index(1)
})

document.getElementById('GoHome').addEventListener('click', async  () => {

   Load_exit_animation()
   setTimeout(()=> {window.mainapp.home()} , 450)

})


const Flip_btn = ()=> { 
   current_side_index= [1,0][current_side_index]
   if(current_side_index == 0){
      second_side.style.left = "-100vh";
      console.log("hello world")
      return

   }
   second_side.style.left = 0;
}

document.getElementById("flip_btn").addEventListener("click" , ()=> {
   Flip_btn()
})
const Load_exit_animation = ()=> {
   document.getElementById("in_n_out_animation").className = "close_animation"
}

Load_data()