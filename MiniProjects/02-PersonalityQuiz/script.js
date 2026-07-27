const questions = [
    {
      question: "Your group has a college project. What do you naturally do?",
      options: [
        { text: "Organize the work and keep everyone on track", trait: "ambitious" },
        { text: "Research the topic thoroughly", trait: "analytical" },
        { text: "Design the presentation", trait: "creative" },
        { text: "Keep everyone motivated and involved", trait: "social" }
      ]
    },
    {
      question: "Which activity sounds the most enjoyable?",
      options: [
        { text: "Solving puzzles", trait: "analytical" },
        { text: "Painting or writing", trait: "creative" },
        { text: "Working toward a challenging personal goal", trait: "ambitious" },
        { text: "Going on a trip with friends", trait: "social" }
      ]
    },
    {
      question: "When facing a difficult problem, what is your first instinct?",
      options: [
        { text: "Break it into smaller parts", trait: "analytical" },
        { text: "Think of a unique solution", trait: "creative" },
        { text: "Discuss ideas with others", trait: "social" },
        { text: "Make a plan and start working immediately", trait: "ambitious" }
      ]
    },
    {
      question: "Which compliment would make you happiest?",
      options: [
        { text: "You're very smart.", trait: "analytical" },
        { text: "You're so creative.", trait: "creative" },
        { text: "People love being around you.", trait: "social" },
        { text: "You're incredibly determined.", trait: "ambitious" }
      ]
    },
    {
      question: "If you could learn a new skill, what would you choose?",
      options: [
        { text: "Coding or mathematics", trait: "analytical" },
        { text: "Photography or music", trait: "creative" },
        { text: "Entrepreneurship or investing", trait: "ambitious" },
        { text: "Learning new languages", trait: "social" }
      ]
    },
    {
      question: "How do you usually make important decisions?",
      options: [
        { text: "Analyze all the facts", trait: "analytical" },
        { text: "Follow your imagination", trait: "creative" },
        { text: "Listen to everyone's opinion", trait: "social" },
        { text: "Choose the option that moves you closer to your goals", trait: "ambitious" }
      ]
    },
    {
      question: "Which role fits you best during a team activity?",
      options: [
        { text: "The Problem Solver", trait: "analytical" },
        { text: "The Idea Generator", trait: "creative" },
        { text: "The Team Connector", trait: "social" },
        { text: "The Goal Setter", trait: "ambitious" }
      ]
    },
    {
      question: "How do you prefer spending your free time?",
      options: [
        { text: "Reading books", trait: "analytical" },
        { text: "Creating art or writing", trait: "creative" },
        { text: "Working on a personal project", trait: "ambitious" },
        { text: "Meeting friends or family", trait: "social" }
      ]
    }
];

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const currentQuestionNumber = document.getElementById("current-question-number");
const totalQuestionNumber = document.getElementById("total-question-number");
const progressFill = document.getElementById("progress-fill");
const progressPercentage = document.getElementById("progress-percentage");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const restartBtn = document.getElementById("restart-btn");
const resultIcon = document.getElementById("result-icon");
const scoreList = document.getElementById("score-list");
const traitIcons = {
  analytical: "🧠",
  creative: "🎨",
  social: "🤝",
  ambitious: "🚀"
};


let currentQs = 0;
let selectedAnswers = [];

function loadQuestion() {

    const question = questions[currentQs];

    questionText.textContent = question.question;
    currentQuestionNumber.textContent = currentQs + 1;
    totalQuestionNumber.textContent = questions.length;

    const progress = Math.round(((currentQs + 1) / questions.length) * 100);
    progressFill.style.width = `${progress}%`;
    progressPercentage.textContent = `${progress}%`;

    optionsContainer.innerHTML = ""; //Empty options for each qs before loading them

    nextBtn.disabled = selectedAnswers[currentQs] ? false : true; // nextBtn enables only after option selected
    prevBtn.disabled = currentQs === 0; //PrevBtn disabled for first question

    question.options.forEach((option) => {

        const button = document.createElement("button");

        button.classList.add("option-btn");
        button.textContent = option.text;
        button.dataset.trait = option.trait;

        // Restore previous selection
        if (selectedAnswers[currentQs] === option.trait) {
            button.classList.add("selected");
        }
        // every option button gets its own click event.
        button.addEventListener("click", function () {
            //a - find all buttons
            const allOptions = optionsContainer.querySelectorAll(".option-btn");
            // b - removing selected class for all buttons
            allOptions.forEach((btn) => {
                btn.classList.remove("selected");
            });
            //c -Add the selected class only to the clicked button.
            button.classList.add("selected");
            selectedAnswers[currentQs] = option.trait; //d - saving trait
            nextBtn.disabled = false; // enabling next button
        });

        optionsContainer.appendChild(button);

    });
    // specially for the last qs
    if (currentQs === questions.length - 1) {
        nextBtn.textContent = "Finish";
    } else {
        nextBtn.textContent = "Next";
    }
}

// NEXT BUTTON
nextBtn.addEventListener("click", function () {
    if (currentQs < questions.length - 1) {
        currentQs++;
        loadQuestion();
    } else {
        showResults();
    }
});

// PREVIOUS BUTTON
prevBtn.addEventListener("click", function () {
    if (currentQs > 0) {
        currentQs--;
        loadQuestion();
    }
});

loadQuestion();


const personalities = {
    analytical: {
        title: "The Analytical Thinker",
        description:
            "You enjoy solving problems, thinking logically, and understanding how things work. People trust your reasoning and attention to detail."
    },

    creative: {
        title: "The Creative Mind",
        description:
            "You love expressing ideas in unique ways. Your imagination and originality help you see opportunities that others often miss."
    },

    social: {
        title: "The Social Connector",
        description:
            "You enjoy meeting people, building relationships, and creating positive energy wherever you go. Teamwork comes naturally to you."
    },

    ambitious: {
        title: "The Goal Achiever",
        description:
            "You are driven by goals and enjoy challenging yourself. Your determination helps you stay focused and keep moving forward."
    }
};

function showResults(){

    const scores = {
        analytical: 0,
        creative: 0,
        social: 0,
        ambitious: 0
    };

    selectedAnswers.forEach((trait) =>{
        scores[trait]++;  // trait here is the key and scores[trait]: value
    });

    const traits = Object.keys(scores);
    const winner = traits.reduce((bestTrait, currentTrait) => {

        if (scores[currentTrait] > scores[bestTrait]) {
            return currentTrait;
        }
        return bestTrait;
    });
    
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    resultIcon.textContent = traitIcons[winner];
    resultTitle.textContent = personalities[winner].title;
    resultDescription.textContent = personalities[winner].description;


    scoreList.innerHTML = "";

    traits
        .slice()
        .sort((a, b) => scores[b] - scores[a]) // highest score first
        .forEach((trait) => {
            const percent = Math.round((scores[trait] / questions.length) * 100);

            const li = document.createElement("li");
            li.classList.add("score-item");
            li.dataset.trait = trait; // keeps your CSS color-per-trait selectors working

            const label = document.createElement("span");
            label.classList.add("score-label");
            label.textContent = trait.charAt(0).toUpperCase() + trait.slice(1);

            const track = document.createElement("span");
            track.classList.add("score-track");

            const fill = document.createElement("span");
            fill.classList.add("score-fill");
            fill.style.width = `${percent}%`;

            const value = document.createElement("span");
            value.classList.add("score-value");
            value.textContent = scores[trait];

            track.appendChild(fill);
            li.append(label, track, value);
            scoreList.appendChild(li);
        });
}


// for restart button
restartBtn.addEventListener("click", function () {
    currentQs = 0;
    selectedAnswers = [];

    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    loadQuestion();

});

