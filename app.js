const startButton = document.getElementById("start-btn")
const questionContainer = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const ansButton = document.getElementById("answers")
const nextButton = document.getElementById("next-btn")
const pointElement = document.getElementById("point")
let shuffleQuestion, currentQuestionIndex;

let point = 0;

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
    message.innerHTML = '';
})


function startGame() {
    startButton.classList.add('hide');  // Ẩn startButton
    questionContainer.classList.remove('hide'); // Hiện quesionQuiz
    shuffleQuestion = questions.sort(() => Math.random() - 0.5) // random question
    currentQuestionIndex = 0;
    setNextQuestion();
    point = 0;
    pointElement.innerHTML = point;
}


// $(document).ready(function() {
//     $(".start-btn").click(function() {
//         $(".start-btn").addClass('hide');
//         $(".question-container").removeClass('hide');
//     });
// });


function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestion[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${question.question}`; // Gán câu hỏi vào thẻ questionID

    //Duyệt mảng đáp án của câu hỏi trên
    question.answers.forEach(ans => {
        const button = document.createElement('button') // Với mỗi đáp án của câu hỏi sẽ tạo ra một button tương ứng
        button.classList.add('btn')
        button.innerText = ans.text
        if (ans.correct) {
            button.dataset.correct = ans.correct // Nếu là đáp án đúng thì thêm trường data-correct = 'true' vào button đó
        }
        button.addEventListener('click', selectAnswer) // Với mỗi button đều có sự kiện click selectAnswer()
        ansButton.appendChild(button); //Thêm button đó vào trong ansButton
    });
}

// Xóa hết các đáp án của câu hỏi trước đó
function resetState() {
    nextButton.classList.add('hide')
    while (ansButton.firstChild) {
        ansButton.removeChild(ansButton.firstChild)
    }
}
function selectAnswer(event) {
    // Xác định đáp án (button) nào được click
    const selectButton = event.target; // Xác định Node nào được click khi 'click' event diễn ra
    selectButton.classList.add('selected')
    if (selectButton.dataset.correct) {
        point++;
        pointElement.innerHTML = point;
        selectButton.classList.remove('selected')
    }

    Array.from(ansButton.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        button.removeEventListener('click', selectAnswer) // Không được chọn lại - bỏ sự kiện click
    })

    // Nếu vẫn còn câu hỏi thì vẫn hiện nextButton ngược lại thì restart
    if (shuffleQuestion.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

// Thiết lập trạng thái đúng hay sai cho từng đáp án 
// Tương ứng sẽ thêm class='correct' hay 'wrong' vào từng thẻ answer button
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

// Clear trạng thái của đáp án
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Lưu trữ Q&A trong 1 mảng
const questions = [
    {
        question: "Tham gia vào",
        answers: [
            { text: 'A. Participate in/ Take part in', correct: true },
            { text: 'B. Delight in sth ', correct: false },
            { text: 'C. Employ in sth', correct: false },
            { text: 'D. Invest in', correct: false }
        ]
    },
    {
        question: "Đầu tư vào",
        answers: [
            { text: 'A. Participate in', correct: false },
            { text: 'B. To delight in sth ', correct: false },
            { text: 'C. To employ in sth', correct: false },
            { text: 'D. Invest in', correct: true}
        ]
    },
    {
        question: "Hồ hởi về",
        answers: [
            { text: 'A. Participate in/ Take part in', correct: false },
            { text: 'B. To delight in sth ', correct: true },
            { text: 'C. To employ in sth', correct: false },
            { text: 'D. Invest in', correct: false }
        ]
    },
    {
        question: "Sử dụng vào cái gì",
        answers: [
            { text: 'A. Participate in/ Take part in', correct: false },
            { text: 'B. To delight in sth ', correct: false },
            { text: 'C. To employ in sth', correct: true},
            { text: 'D. Invest in', correct: false}
        ]
    },
    {
        question: "Xấu hổ về",
        answers: [
            { text: 'A. Afraid of', correct: false },
            { text: 'B. Ahead of ', correct: false },
            { text: 'C. Aware of', correct: false },
            { text: 'D. Ashamed of', correct: true}
        ]
    },
    {
        question: "Sợ, e ngại",
        answers: [
            { text: 'A. Afraid of', correct: true },
            { text: 'B. Ahead of ', correct: false },
            { text: 'C. Aware of', correct: false },
            { text: 'D. Ashamed of', correct: false}
        ]
    },
    {
        question: "Tin tưởng",
        answers: [
            { text: 'A. Afraid of', correct: false },
            { text: 'B. Confident of ', correct: true },
            { text: 'C. Aware of', correct: false },
            { text: 'D. Ashamed of', correct: false}

        ]
    },
    {
        question: "Nghi ngờ",
        answers: [
            { text: 'A. Afraid of', correct: false },
            { text: 'B. Confident of ', correct: false },
            { text: 'C. Doubtful of', correct: true },
            { text: 'D. Ashamed of', correct: false}
            
        ]
    },
    {
        question: "Ganh tỵ với",
        answers: [
            { text: 'A. Afraid of', correct: false },
            { text: 'B. Sick of', correct: false },
            { text: 'C. Aware of', correct: false },
            { text: 'D. Jealous of', correct: true}
            
        ]
    },
    {
        question: "Vui mừng vì",
        answers: [
            { text: 'A. Joyful of', correct: true },
            { text: 'B. Suspicious of', correct: false },
            { text: 'C. Aware of', correct: false },
            { text: 'D. Ashamed of', correct: false}
            
        ]
    },
    {
        question: "Chán nản vì",
        answers: [
            { text: 'A. Afraid of', correct: false },
            { text: 'B. Confident of ', correct: false },
            { text: 'C. Aware of', correct: false },
            { text: 'D. Sick of', correct: true}
            
        ]
    },
    // 
]