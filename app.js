var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    sparepart = document.getElementById("sparepart"),
    plat = document.getElementById("plat"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    harga = document.getElementById("harga"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./image/Profile Icon.webp"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.customerDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="customerDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.customerName}</td>
            <td>${element.customerSparepart}</td>
            <td>${element.customerPlat}</td>
            <td>${element.customerEmail}</td>
            <td>${element.customerPhone}</td>
            <td>${element.customerHarga}</td>
            <td>${element.startDate}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.customerName}', '${element.customerSparepart}', '${element.customerPlat}', '${element.customerEmail}', '${element.customerPhone}', '${element.customerHarga}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.customerName}', '${element.customerSparepart}', '${element.customerPlat}', '${element.customerEmail}', '${element.customerPhone}', '${element.customerHarga}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic, name, sparepart, plat, email, phone, harga, sDate){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showSparepart").value = sparepart,
    document.querySelector("#showPlat").value = plat,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showPhone").value = phone,
    document.querySelector("#showHarga").value = harga,
    document.querySelector("#showsDate").value = sDate
}


function editInfo(index, pic, name, Sparepart, Plat, Email, Phone, Harga, Sdate){
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    sparepart.value = Sparepart
    plat.value = Plat
    email.value = Email,
    phone.value = Phone,
    harga.value = Harga,
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        customerName: userName.value,
        customerSparepart: sparepart.value,
        customerPlat: plat.value,
        customerEmail: email.value,
        customerPhone: phone.value,
        customerHarga: harga.value,
        startDate: sDate.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "./image/Profile Icon.webp"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})