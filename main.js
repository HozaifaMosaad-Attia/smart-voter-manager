const theName = document.getElementById("name");
const tel = document.getElementById("tel");
const locations = document.getElementById("location");
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const tbodyOne = document.getElementById("tbody-one");

let divNumberOne = document.querySelector(".number-one");
let divNumberTwo = document.querySelector(".number-two");
let divNumberThree = document.querySelector(".number-three");
let tmp;
let mood = 'create';

let dataPro = [];
if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}

function clearData() {
    theName.value = '';
    tel.value = '';
    locations.value = '';
}

submit.onclick = function() {
    if(theName.value !== "") {
        let isDuplicate = false;
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].theName === theName.value && dataPro[i].tel === tel.value && i !== tmp) {
                isDuplicate = true;
                break; 
            }
        }
        if (isDuplicate) {
            alert("هذه البيانات (الاسم والرقم) موجودة بالفعل في سجلاتك!");
            return; 
        }

        let newpro = {
            theName: theName.value,
            tel: tel.value,
            locations: locations.value,
            status: mood === 'update' ? dataPro[tmp].status : 'pending',
        }

        if(mood === "create") {
            dataPro.push(newpro);
        } else {
            dataPro[tmp] = newpro;
            mood = "create";
            submit.innerHTML = `حفظ`; 
        }
        localStorage.setItem("product", JSON.stringify(dataPro));
        clearData();
        showData();
    } else {
        theName.style.border = "1px solid #ee6767ff";
    }
}

function showData() {
    renderTables(dataPro);
}

function renderTables(dataArray) {
    let pending = "", entered = "", notEntered = "";
    let countP = 0, countE = 0, countNE = 0;

    for(let i = 0; i < dataArray.length; i++) {
        let originalIndex = dataPro.indexOf(dataArray[i]);
        if(dataArray[i].status === "pending" || !dataArray[i].status){
            countP++;
            pending += `<tr>
                <td>${countP}</td>
                <td>${dataArray[i].theName}</td>
                <td>${dataArray[i].tel} <a href="tel:${dataArray[i].tel}" class="call-btn"><i class="fa-solid fa-phone"></i></a></td>
                <td>${dataArray[i].locations}</td>
                <td>
                    <label><input type="radio" onclick="setEntered(${originalIndex})"> دخل</label>
                    <label><input type="radio" onclick="setNotEntered(${originalIndex})"> لم يدخل</label>
                </td>
                <td><button class="update" onclick="updateData(${originalIndex})"><i class="fa-solid fa-pen-to-square"></i> تعديل</button></td>
                <td><button class="delete" onclick="deleteData(${originalIndex})"><i class="fa-solid fa-trash-can"></i> حذف</button></td>
            </tr>`;
        } else if(dataArray[i].status === "entered") {
            countE++;
            entered += `<tr>
                <td>${countE}</td>
                <td>${dataArray[i].theName}</td>
                <td>${dataArray[i].tel}</td>
                <td>${dataArray[i].locations}</td>
                <td>
                    <button class="update-two" onclick="updateData(${originalIndex})">تعديل</button>
                    <button class="delete" onclick="deleteData(${originalIndex})">حذف</button>
                </td>
            </tr>`;
        } else if(dataArray[i].status === "notEntered") {
            countNE++;
            notEntered += `<tr>
                <td>${countNE}</td>
                <td>${dataArray[i].theName}</td>
                <td>${dataArray[i].tel}</td>
                <td>${dataArray[i].locations}</td>
                <td>
                    <button class="update-two" onclick="updateData(${originalIndex})">تعديل</button>
                    <button class="delete" onclick="deleteData(${originalIndex})">حذف</button>
                </td>
            </tr>`;
        }
    }
    document.getElementById("tbody-one").innerHTML = pending;
    document.getElementById("tbody-two").innerHTML = entered;
    document.getElementById("tbody-three").innerHTML = notEntered;
    divNumberOne.innerHTML = `العدد الحالي: ${countP}`;
    divNumberTwo.innerHTML = `تم الدخول: ${countE}`;
    divNumberThree.innerHTML = `لم يتم الدخول: ${countNE}`;
}

function searchData(value) {
    let filteredData = dataPro.filter(item => 
        item.theName.toLowerCase().includes(value.toLowerCase())
    );
    renderTables(filteredData);
}

function setEntered(index) {
    dataPro[index].status = "entered";
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function setNotEntered(index) {
    dataPro[index].status = "notEntered";
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function updateData(i) {
    theName.value = dataPro[i].theName;
    tel.value = dataPro[i].tel;
    locations.value = dataPro[i].locations;
    tmp = i;
    mood = "update";
    submit.innerHTML = `تحديث`;
    window.scrollTo({ top: 0, behavior: "smooth" });
}
showData();

let upBtn = document.querySelector(".up");
window.onscroll = function () {
    if (window.scrollY >= 800) {
        upBtn.classList.add("show");
    } else {
        upBtn.classList.remove("show");
    }
};

upBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};