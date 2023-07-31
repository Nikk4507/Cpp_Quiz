const questions = [

    {
        question: "How is an array initialized in C language?",
        answers:[
            {
                text:"int a = {1,2,3}",correct:false
            },
            {
                text:"int a[3] = {1,2,3}",correct:true
            },
            {
                text:"int a[] = new int[3]",correct:false
            },
            {
                text:"int a(3) = {1,2,3}",correct:false
            },
        ]
    },
    {
        question: "How is the 3rd element in an array accessed based on pointer notation?",
        answers:[
            {
                text:"*a + 3",correct:false
            },
            {
                text:"*(a + 3)",correct:true
            },
            {
                text:"*(*a + 3)",correct:false
            },
            {
                text:"&(a + 3)",correct:false
            },
        ]
    },
    {
        question: "How are String represented in memory in C?",
        answers:[
            {text:"An array of characters.",correct:true},
            {
                text:"The object of some class.",correct:false
            },
            {
                text:"Same as other primitive data types.",correct:false
            },
            {
                text:"Linked List of characters.",correct:false
            },
        ]
    },
    {
        question: "What does the following declaration indicate? int x:8;",
        answers:[
            {
                text:"x stores a value of 8.",correct:false
            },
            {
                text:"x is an 8-bit integer.",correct:true
            },
            {
                text:"Both A and B",correct:false
            },
            {
                text:"None of the above",correct:false
            },
        ]
    }
];

const questionELement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score=0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionELement.innerHTML = questionNo + ". "+currentQuestion.question;


    //for ans
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            //true or false
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    })

}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionELement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

