// 4 buttons Dynamic
const buttonsCatagory =async ()=>{
    
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
 
    dispalyButtons (data.categories);
    
}
//remove active btn 
function removeBtn (){
    const removeContainer = document.getElementsByClassName('active')
    for (let btn of removeContainer){
        btn.classList.remove('active')
    }
}
// Display btn api
const dispalyBtn = async(catagories)=>{
    document.getElementById("allpetsContainer").innerHTML=''
    document.getElementById('spinner').classList.remove('hidden')
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${catagories}`)
    const data = await res.json()
    function btn(){
        const activeBtn = document.getElementById(`btn-${catagories}`)
        removeBtn()
        activeBtn.classList.add('active')
        setTimeout(() => {
            document.getElementById('spinner').classList.add('hidden')
            displayAllPets(data.data);
        },2000);        
    }
    btn()
}

// all pets ay 
const handleProgres= (catagory)=>{
    document.getElementById('spinner').classList.remove('hidden')
    setTimeout(() => {
        loadAllPet(catagory)
       
    },2000);
}
handleProgres()

// Daynamic btn create
const dispalyButtons =(catagory)=>{
    // console.log(catagory);
    catagory.forEach(catagories => {
        // console.log(catagories);
        const buttonsDisplay = document.getElementById("buttonsDisplay")
        const btnContainer = document.createElement('div')
        btnContainer.innerHTML= `
          <div id="btn-${catagories.category}" onclick="dispalyBtn('${catagories.category}')" class='text-white'>
            <div  class=" btn border bg-transparent flex justify-center items-center gap-2 rounded-lg hover:rounded-full hover:border-primary">
                <img class='py-2 w-8 h-8 lg:w-12 lg:h-12' src=${catagories.category_icon}/>
                <h1 class="px-2 lg:px-6 py-2 text-xl lg:text-2xl font-bold">${catagories.category}</h1>
            </div>
          </div>

        `
        buttonsDisplay.appendChild(btnContainer)
    });   
}

// catagory all api
const loadAllPet = async()=>{
    document.getElementById('spinner').classList.add('hidden')
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json();
    // console.log(data);
    displayAllPets(data.pets);  
}
// display all catagpry section
const displayAllPets =(pets)=>{
    const petsAllContainer = document.getElementById("allpetsContainer")
    
    petsAllContainer.innerHTML=''
    if(pets.length==0){
        petsAllContainer.classList.remove('grid')
        petsAllContainer.classList.add('bg-base-200','rounded-xl','pb-4')
        document.getElementById("allpetsContainer").innerHTML =`
            <div class= "min-h-[400px] px-2 flex flex-col justify-center items-center gap-5">
            <img src= "images/error.webp" />
            <h1 class="  text-4xl font-bold text-center" >No Information Available</h1>
            <p class=" w-full lg:w-[500px] text-xs text-gray-500 text-center" >It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
            its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `
    }
    else{
        petsAllContainer.classList.add('grid')  
    }
    pets.forEach(pet => {
        // console.log(pet);
        const {image,pet_name,breed,date_of_birth,gender,price,petId} = pet
        
        const petContainer = document.createElement("div")
        petContainer.innerHTML=`
          <div class=" border rounded-xl ">
                  <figure class="px-4 pt-4">
                    <img
                      src=${image}
                      alt="Pets"
                      class="rounded-xl" />
                  </figure>
                  <div class=" card-body px-4 pb-3 ">
                    <h2 class="text-2xl font-bold">${pet_name?pet_name:"Not Avilable"}</h2>
                    <p class='text-gray-500 text-[14px] flex gap-2 items-center'><img class='w-5 h-5' src="https://img.icons8.com/?size=80&id=78343&format=png" alt=""> Breed: ${breed?breed:'Not Availble'}</p>

                    <p class='text-gray-500 text-[14px] flex gap-2 items-center'><img class='w-5 h-5' src="https://img.icons8.com/?size=80&id=GlEOr5x0aJpH&format=png" alt=""> Birth: ${date_of_birth?date_of_birth:"Not Availble"}</p>

                    <p class='text-gray-500 text-[14px] flex items-center gap-2 '><i class="fa-solid fa-mercury"></i> Gender: ${gender?gender:"Not Availble"}</p>

                    <p class='text-gray-500 text-[14px] flex gap-2 items-center'><i class="fa-solid fa-dollar-sign"></i> Price: ${price?price:"Not Availble"} $</p>
                    <p class="border border-base-200"></p>
                     <div class='pt-4  flex justify-evenly lg:justify-center  gap-5 items-center'>

                        <button onclick="imagesButton('${image}')" class="px-4 py-2 border rounded-lg  hover:border-primary " ><i class="fa-solid fa-thumbs-up"></i> </button>

                        <button id='button${pet_name}' onclick= "StartCount('${pet_name}')" class="px-3 py-2 border border-primary rounded-lg text-primary font-bold hover:bg-primary hover:text-white">Adopt</button>

                        <button onclick="dispalyDetails('${petId}')" class="px-3 py-2 border border-primary  rounded-lg text-primary font-bold hover:bg-primary hover:text-white">Details</button>
                    </div>
                  </div>  
            </div>
        `
        petsAllContainer.appendChild(petContainer)
    });
}
//image added right shigt 
const imagesButton = (image)=>{
    const imageContainer = document.getElementById('imageContainer')
    const divContainer = document.createElement("div")
    divContainer.innerHTML = `
    <div class="border rounded-lg  lg:px-3 py-3 ">
            <img
            class='w-full rounded-xl'
            src=${image}
            alt="Shoes"
            class="rounded-xl"/>
     </div>
    `
    imageContainer.appendChild(divContainer)
}

// pet_details details btn ay click korly modal show hbe
const dispalyDetails = async (petId)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const data = await res.json()
    showDetails(data.petData)
}
function showDetails(pets){
    const modalContainer = document.getElementById("modalContainer")
       modalContainer.innerHTML= `
          <dialog id="my_modal_1" class="modal">
           <div class="modal-box">
               <div class='flex justify-center py-2'>
                    <img class='rounded-2xl' src=${pets.image} alt="">
               </div>
               <h1 class="text-3xl font-bold space-y-3 px-6 pb-3"> ${pets.pet_name}</h1>
                <div class='px-6 flex gap-5 pb-4'>
                    <div class='space-y-2'>
                         <p class='text-gray-500 text-[12px] lg:text-[14px] flex gap-2 items-center'><img class='w-5 h-5' src="https://img.icons8.com/?size=80&id=78343&format=png" alt=""> Breed: ${pets.breed ? pets.breed:"Not Avilble"}</p>
                        <p class='text-gray-500 text-[12px]  lg:text-[14px] flex items-center gap-2'><i class="fa-solid fa-mercury"></i> Gender: ${pets.gender ? pets.gender:"Not Availble"}</p>
                        <p class='text-gray-500 text-[12px] lg:text-[14px] flex items-center gap-2 '><i class="fa-solid fa-mercury"></i> vaccinated_status: ${pets.vaccinated_status ? pets.vaccinated_status:"Not Availble"}</p>
                    </div>
                    <div class='space-y-2'>
                        <p class='text-gray-500 text-[12px]  flex gap-2 items-center'><img class='w-5 h-5' src="https://img.icons8.com/?size=80&id=GlEOr5x0aJpH&format=png" alt=""> Birth: ${pets.date_of_birth ? pets.date_of_birth:"Not Avialble"}</p>
                        <p class='text-gray-500 text-[12px]  flex gap-2 items-center'><i class="fa-solid fa-dollar-sign"></i> Price: ${pets.price?pets.price: "Not Availble"}$</p>
                    </div>
                </div>
                <div class='px-6 pb-7' >
                    <h1 class='text-2xl font-bold'>Details Information</h1>
                    <p class="text-gray-500 text-[14px]">${pets.pet_details ? pets.pet_details:"Not Availble"}<p>
                </div>
                <form method="dialog">
                    <div class='text-center'>
                        <button class="w-full border pt-3 pb-4 btn text-[20px] bg-primary text-white">Cancle</button>
                    </div>   
                </form>
          </div>
          </dialog>
      `
      document.getElementById('my_modal_1').showModal()
}
// CountDown Modal
const StartCount =(peddy)=>{
    const countContainer = document.getElementById("countContainer")
    const div = document.createElement('div')
    div.innerHTML= `
    <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
        <div class='text-center w-28 mx-auto pt-2'>
            <img class="" src='https://img.icons8.com/?size=48&id=q6BlPrJZmxHV&format=png'/>
        </div>
        <h1 class='text-center text-3xl font-bold'>Congrates</h1>
        <p class="py-4 text-center text-xl font-semibold">Adoption process is Start For you Pet</p>
        <div class=" text-center">
            <p class="countdown text-8xl font-bold text-black" id="countdown">3</p>
        </div>
    </div>
    </dialog>
    `
    const AdoptBtnChange = document.getElementById(`button${peddy}`)
    AdoptBtnChange.innerText ='Adopted'
    AdoptBtnChange.classList.add('bg-gray-200','border-none','text-gray-300')
    AdoptBtnChange.classList.remove('hover:bg-primary', 'hover:text-white','text-primary')
    AdoptBtnChange.disabled = true;
    countContainer.append(div)
    document.getElementById('my_modal_2').showModal()
    const countStart = document.getElementById('countdown')
    let countNumbers = 3
    const interVal = setInterval(()=>{
        if(countNumbers === 1){
            clearInterval(interVal)
            document.getElementById("countContainer").innerHTML=""
           
        }
        else{
            countNumbers--
            countStart.innerText = countNumbers
        }
        
    },1000)
    countStart.addEventListener('click',()=>{
        countNumbers = 3;
        StartCount()
    })
    
}

// Sort By price 
const sortPetByPrices = (data)=>{
    return data.sort((a,b)=> b.price - a.price);
}
const sortByPrice= async ()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await res.json()
    const sortPets = sortPetByPrices(data.pets)
    document.getElementById("allpetsContainer").innerHTML=''
    document.getElementById('spinner').classList.remove('hidden')
    setTimeout(() => {
        document.getElementById('spinner').classList.add('hidden')
        displayAllPets(sortPets);
    },2000); 

    
}

// 
buttonsCatagory()
