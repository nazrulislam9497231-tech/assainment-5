function login(){

let user=document.getElementById("username").value
let pass=document.getElementById("password").value

if(user==="admin" && pass==="admin123"){

document.getElementById("loginPage").classList.add("hidden")
document.getElementById("mainPage").classList.remove("hidden")

loadIssues()

}else{

alert("Invalid login")

}

}


async function loadIssues(type="all"){

let spinner=document.getElementById("loading")
spinner.classList.remove("hidden")

let res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
let data=await res.json()

let issues=data.data

if(type==="open"){
issues=issues.filter(issue=>issue.status==="open")
}

if(type==="closed"){
issues=issues.filter(issue=>issue.status==="closed")
}

displayIssues(issues)

spinner.classList.add("hidden")

}


function displayIssues(issues){

let container=document.getElementById("issuesContainer")
container.innerHTML=""

issues.forEach(issue=>{

container.innerHTML+=`

<div class="card ${issue.status}" onclick="showIssue(${issue.id})">

<h3>${issue.title}</h3>

<p>${issue.description}</p>

<p>Status: ${issue.status}</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Label: ${issue.label}</p>

<p>${issue.createdAt}</p>

</div>
`
})

}

function changeTab(type,btn){

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"))

btn.classList.add("active")

loadIssues(type)

}


async function searchIssue(){

let text=document.getElementById("searchInput").value

let res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

let data=await res.json()

displayIssues(data.data)

}

async function showIssue(id) {
    let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    let data = await res.json();
    let issue = data.data;

    document.getElementById("modal-title").innerText = issue.title;
    document.getElementById("modal-description").innerHTML = `
        <p>${issue.description}</p>
        <p><strong>Status:</strong> ${issue.status}</p>
        <p><strong>Author:</strong> ${issue.author}</p>
        <p><strong>Priority:</strong> ${issue.priority}</p>
        <p><strong>Label:</strong> ${issue.label}</p>
        <p><strong>Date:</strong> ${issue.createdAt}</p>
    `;

   
    document.getElementById("modal").classList.remove("hidden");
}


function closeModal(){

document.getElementById("modal").classList.add("hidden")

}

const cardHTML = `
    <div class="card">
        <h3>${issue.title}</h3>
        <p>${issue.description}</p>
        </div>
`;