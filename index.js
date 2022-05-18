var input = document.getElementById("file-input");
var upbtn = document.getElementById("file-up");
var flsc = document.getElementById("file-scan");
var close = document.getElementById("cl");
var copy = document.getElementById("cp");

/*


close.addEventListener('click',() => {
    document.getElementById("qr-contents").classList.remove("Expand");
    document.getElementById("QR-Box").style.height = "220px";
    document.getElementById("qr-code").style.display = "none";
})

copy.addEventListener('click', () => {
    var input = document.getElementById("qr-text");
    input.select();
    navigator.clipboard.writeText(input.value);
    alert("Copied Text " + input.value);
})

upbtn.addEventListener('click',() => {
    input.click();
  //  document.getElementById("qr-code").style.display = "flex";
  //  document.getElementById("QR-Box").style.height = "360px";
});

function expand(){
    if(input.files.length == 0){
        alert("Choose a QR");
    }
    else{
        document.getElementById("qr-contents").classList.add("Expand");
        document.getElementById("QR-Box").style.height = "500px";
        document.getElementById("qr-code").style.display = "flex";
    }
}


*/
function expand(){
    if(input.files.length == 0){
        alert("Choose a QR");
    }
    else
    document.getElementById("qr-contents").classList.add("Expand");
}

close.addEventListener('click', () => {
    document.getElementById("qr-contents").classList.remove("Expand");
    document.getElementById("qr-code").classList.remove("Expand-QR");
    document.getElementById("qr-text").value = "Hello World"
    input.value = null;
})
    

copy.addEventListener('click', () => {
    var input = document.getElementById("qr-text");
    input.select();
    navigator.clipboard.writeText(input.value);
    alert("Copied Text " + input.value);
})

upbtn.addEventListener('click',() => {
    input.click();
    
});

input.addEventListener('change', e => {
    let myfile = e.target.files[0];
    console.log(myfile); 
    let formData = new FormData();
    formData.append("file",myfile);

    fetchRequest(formData,myfile);
})

function fetchRequest(formData,myfile){
    fetch("https://api.qrserver.com/v1/read-qr-code/",{
        method : "POST" , body : formData 
    }).then(res => res.json()).then(d => {
        console.log(d[0].symbol[0].data);
        document.getElementById("qr-code").classList.add("Expand-QR");
        document.getElementById("qr-img").src = URL.createObjectURL(myfile);
        document.getElementById("qr-text").value = d[0].symbol[0].data;
    });
}
