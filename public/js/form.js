//form loading animation
const form = [...document.querySelector('.form').children];
form.forEach((item,i)=>{
    setTimeout(()=>{
        item.style.opacity = 1;
    },i*100)
})






//form validation
const name = document.querySelector('.name')|| null;
const email = document.querySelector('.emial');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');





if(name == null){
    //means login page is open

}else{
    //means register page is open
    submitBtn.addEventListener('click',()=>{
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            })

        })
        .then(res => res.json())
        .then(data => {
            if(data.name){
                alert('register successful');
            }else{
                alert(data);
            }
            // console.log(data);
            // alert(data.message);
            // window.location.href = '/login';
        })
       


})}