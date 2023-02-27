const form = document.getElementById('form');
const username = document.getElementById('username');
const bs = document.getElementById('bs');
const hra = document.getElementById('hra');
const ta = document.getElementById('ta');
const da = document.getElementById('da');
const sd = document.getElementById('sd');

function gotoForm()
{
    window.location.href="#form";
    window.scroll(0,780);
}
form.addEventListener('submit', (event) =>{
    event.preventDefault();

   var checker = Validate();
   if(checker===true){
    calcTax();
    swal("Hello " + username.value , "You owe ₹ "+tax+"/- Income tax", "success");
}
})

function Validate(){
    const usernameVal = username.value.trim();
    var x = true;
    //username
    if(usernameVal === ""){
        setErrorMsg(username, 'Username cannot be blank');
        swal("Hey user ", "Username cannot be blank", "error");
        x = false;
    }
    else if(usernameVal.length <=2){
        setErrorMsg(username, 'min 3 char');
        swal("Hey user" , "Username must include minimum 3 characters", "error");
        x = false;
    }
    else{
        setSuccessMsg(username);
        x = true;
    }
    return x;
}

function setErrorMsg(input, errormsgs){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control error";
    small.innerText = errormsgs;
}


function setSuccessMsg(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}


function setBgColor(x)
{
    if(x === 1)
    {
        document.body.style.backgroundImage = "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)";
    }
    if(x === 2)
    {
        document.body.style.backgroundImage = "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)";
    }
    if(x === 3)
    {
        document.body.style.backgroundImage = "linear-gradient(to top, #30cfd0 0%, #330867 100%)";
    }
    if(x === 0)
    {
        document.body.style.backgroundImage= "linear-gradient(to right, #fa709a 0%, #fee140 100%)";
    }   
}

function calcTax()
{
    var name="";
    var basicV,hraV,taV,daV,sdV,sum1,sum2,sum3;
    name = username.value;
    basicV = parseInt(bs.value);
    hraV = parseInt(hra.value);
    taV = parseInt(ta.value);
    daV = parseInt(da.value);
    sdV = parseInt(sd.value);
    /* Calculations */
    sum1 =  basicV+hraV;
    sum2 =  taV+daV;
    sum3 = sum1+sum2;
    Net = sum3-sdV; 
    tax = 0;
    var output = document.querySelector("#output tbody");
    if(Net<=300000)
    {
        tax=0;
    }
    if(Net>300000 && Net<=600000)
    {
        diff=Net-300000;
        tax=15000+(0.05*diff);
    }
    if(Net>600000 && Net<=900000)
    {
        diff=Net-600000;
        tax=30000+(0.10*diff);
    }
    if(Net>900000 && Net<=1200000)
    {
        diff=Net-900000;
        tax=45000+(0.15*diff);
    }
    if(Net>1200000 && Net<=1500000)
    {
        diff=Net-1200000;
        tax=60000+(0.20*diff);
    }
    if(Net>1500000)
    {
        diff=Net-1500000;
        tax=150000+(0.30*diff);
    }
    tax=tax+(tax*0.04);

    output.innerHTML +="<tr><td>"+name+"</td><td class='right'>"+basicV+"</td><td class='right'>"+hraV+"</td><td class='right'>"+taV+"</td><td class='right'>"+daV+"</td><td class='right'>"+sdV+"</td><td class='right'>₹ "+tax+"/-</td></tr>";
}