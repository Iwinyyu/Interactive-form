const btn = document.getElementById("confirm");

const error1 = "Wrong format, numbers only";
const error2 = "Wrong format, letters only";
const error3 = "Can't be blank";
const error5 = "Too many spaces";



const holder_name = document.getElementById("name");
const number = document.getElementById("card-number");
const month = document.getElementById("month");
const year = document.getElementById("year");
const cvc = document.getElementById("cvc");

const inputfield = document.querySelector("#inputfield");
const right = document.querySelector("#right-section");
const all_div = document.querySelectorAll("#right-section div");
const all_div_inputs = document.querySelectorAll("#right-section input");

const div_card_name = document.querySelector("#div-card-name");
const div_card_number = document.querySelector("#div-card-num");
const MY_input = document.querySelector("#MY-input");
const CVC = document.querySelector("#CVC");
const CheckArray = [div_card_name,div_card_number,MY_input,CVC];

const card_number = document.getElementById("number")
const card_name = document.getElementById("name-card")
const card_date = document.getElementById("date")
const card_cvc = document.getElementById("cvc-card")

let listened_number = [];



function check_blank(input, warning){
        let i = true;
        normal_style(input, warning);
      if(input.value === ""){
        i = false;
        warning_style(input, warning, error3);
      }
  return i;
  }


function check_name_format(input, warning){
  normal_style(input, warning)
let text = input.value.trim().replace(/" "+/, " ").split(" ").length <= 2;
if (text){
  if (input.value.search(/\d/g) !== -1){
    warning_style(input, warning, error1)
  }
}else{
  warning_style(input, warning, error5)
}
}

function check_number_length(input, warning){
  let i = true;
  normal_style(input, warning)
  let length = input.maxLength;

  if (length === 19){
    length = 16;
  }
  if (input.value.length !== input.maxLength){
    warning_style(input, warning, `${length} digits are required`)
    i = false;
  }
  if (input === year && month.value.length !== 2){
    warning.style.visibility ="visible";
  }else if (input === month && year.value.length !== 2){
    warning.style.visibility ="visible";
  }
return i;
}

function check_number_format(input, warning){
  normal_style(input, warning)
  let rawtext = input.value.replace(/\s+/g, "").search(/\D/g) !== -1;
  if (rawtext){
    warning_style(input, warning, error1)
  }
}

function check_number_format_plus(input, warning){
  normal_style(input, warning);

  let rawtext = input.value.replace(/\s+/g, "").length === input.maxLength;
  if (rawtext){
    let allD = input.value.replace(/\s+/g, "").search(/\D/g) !== -1;
    console.log(allD)
    if(allD){
      rawtext = false;
    }
  }
  if(rawtext === false){
    warning_style(input, warning, error1)
  }
}


function warning_style(input, warning, type){
  input.style.borderColor = "red";
  input.style.outlineColor = "transparent";
  warning.textContent = type;
  warning.style.visibility = "visible";
}
function normal_style(input, warning){
  warning.style.visibility = "hidden";
  input.style.outlineColor = "var(--Very-dark-violet)";
  input.style.border = "1.5px solid var(--Light-grayish-violet)";
}

all_div_inputs.forEach(input => {

  input.addEventListener("focusout", (e)=>{
    switch(input){
      case holder_name:
        let warning1 = document.querySelector("#div-card-name .name")
        if (check_blank(holder_name, warning1)){
          check_name_format(holder_name, warning1);
        }
        break;
      case number:
        let warning2 = document.querySelector("#div-card-num .number")
        if (check_blank(number, warning2)){
          if (check_number_length(number, warning2)){
            check_number_format(number, warning2);
          }
        }
        break;
      case month:
        let warning3 = document.querySelector("#MY-input .date")
        if (check_blank(month , warning3)){
          if (check_number_length(month, warning3)){
            check_number_format_plus(month, warning3);
          }
        }
        break;
      case year:
        let warning4 = document.querySelector("#MY-input .date")
        if (check_blank(year, warning4)){
          if (check_number_length(year, warning4)){
            check_number_format_plus(year, warning4);
          }
        }
        break;
      case cvc:
        let warning5 = document.querySelector("#CVC .cvc")
        if (check_blank(cvc, warning5)){
          if (check_number_length(cvc, warning5)){
            check_number_format_plus(cvc, warning5);
          }
        }  
      break;

    }
  })
})






btn.addEventListener('click', ()=>{
  let confirm = true;
  CheckArray.forEach(div => {
    let inputs = div.querySelectorAll("input");
    let warning = div.querySelector(".warning");
    inputs.forEach(input => {
     check_blank(input, warning) 
     if (input.style.borderColor === "red"){
       confirm = false;
       input.classList.toggle("shake")
     }
    })
  })
  if(confirm){
    card_number.textContent = number.value;
    card_name.textContent = holder_name.value;
    card_date.textContent = `${month.value}/${year.value}`;
    card_cvc.textContent = cvc.value;

    let temp = document.querySelector("template");
    let clone = temp.content;
    let continue1 = clone.getElementById("continue");
    right.style.visibility= "hidden";
    inputfield.appendChild(clone)
    continue1.addEventListener("click", ()=>{
      location.reload()
    
    })
    
  }
})




function number_format(){
  listened_number.splice(4,0," ");
  listened_number.splice(9,0," ");
  listened_number.splice(14,0," ");
}
number.addEventListener("input",  e => {
  let caret_pos = number.selectionStart;
  let variable = 0;
  listened_number = number.value.replace(/\s+/g,"").split('');

  if(e.data === null){
    variable = -1;
  }else{
    variable = 1;
  }


  number_format();
  number.value = listened_number.reduce((pv, cv) => pv + cv).trim();
  switch(caret_pos){
    case 5:
    setSelection(5 + variable);
    break;
    case 10:
    setSelection(10 + variable);
    break;
    case 15:
    setSelection(15 + variable);
    break;
    default:
      setSelection(caret_pos);
  }
})

function setSelection(caretPos){
  number.setSelectionRange(caretPos,caretPos);
  number.focus();
}









