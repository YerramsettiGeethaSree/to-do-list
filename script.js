let inputs = document.getElementById("inp");
let text = document.querySelector(".text");
let doneCount = document.getElementById("done-count");
let totalCount = document.getElementById("total-count");
let completionMessage = document.getElementById("completion-message");
let container = document.querySelector('.container');

function updateCounts() {
    let totalTasks = text.getElementsByTagName("ul").length;
    let doneTasks = text.querySelectorAll("input[type='checkbox']:checked").length;
    totalCount.textContent = `Total: ${totalTasks}`;
    doneCount.textContent = `Done: ${doneTasks}`;

    if (totalTasks > 0 && doneTasks === totalTasks) {
        completionMessage.style.display = 'block';
        triggerConfetti();
    } else {
        completionMessage.style.display = 'none';
    }
}



function triggerConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const { top, left, width, height } = container.getBoundingClientRect();

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 90,
            spread: 55,
            origin: { x: (left + width / 4) / window.innerWidth, y: (top + height) / window.innerHeight }
        });
        confetti({
            particleCount: 5,
            angle: 90,
            spread: 55,
            origin: { x: (left + (3 * width) / 4) / window.innerWidth, y: (top + height) / window.innerHeight }
            
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}





function Add(){
    if(inputs.value == ""){
        alert("Please Enter a Task")
    }else{


        let newEle = document.createElement("ul");
        newEle.classList.add("task-item");
        newEle.innerHTML = `<input type="checkbox" class="task-checkbox"> <span class="task-text">${inputs.value}</span> <i class="fa-solid fa-trash"></i><i class="fa-solid fa-edit"></i>`;
        text.appendChild(newEle);
        inputs.value="";

        newEle.querySelector(".fa-trash").addEventListener("click", remove);
        newEle.querySelector(".fa-edit").addEventListener("click",edit);
        newEle.querySelector(".task-checkbox").addEventListener("change", updateCounts);
        
        function remove(){
            newEle.remove();   
            updateCounts();         
        }
        
        function edit(){
            let taskTextElement = newEle.querySelector(".task-text");
            let currentText = taskTextElement.textContent.trim();
            let newText = prompt("Edit your task:", currentText);
            if (newText !== null && newText !== "") {
                taskTextElement.textContent = newText;
           
                
            }
        }
        updateCounts();
    }
}