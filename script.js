const questions = [
    {
      question: "Who is known as the 'God of Cricket'?",
      options: ["Virat Kohli", "Sachin Tendulkar", "MS Dhoni", "Ricky Ponting"],
      answer: "Sachin Tendulkar"
    },
    {
      question: "Which country won the first ICC Cricket World Cup?",
      options: ["Australia", "West Indies", "India", "England"],
      answer: "West Indies"
    },
    {
      question: "What is the highest individual score in an ODI match?",
      options: ["264", "200", "189", "300"],
      answer: "264"
    },
    
    {
      question: "Which player has scored the fastest century in ODI cricket?",
      options: ["AB de Villiers", "Chris Gayle", "Corey Anderson", "Virat Kohli"],
      answer: "AB de Villiers"
    },
    {
      question: "Who is the only bowler to take 10 wickets in a Test innings?",
      options: ["Jim Laker", "Anil Kumble", "Shane Warne", "Muttiah Muralitharan"],
      answer: "Jim Laker"
    },
    {
      question: "Which team has won the most ICC Cricket World Cups?",
      options: ["Australia", "India", "West Indies", "England"],
      answer: "Australia"
    },
    {
      question: "Who is the fastest bowler to reach 100 wickets in ODIs?",
      options: ["Mitchell Starc", "Rashid Khan", "Saqlain Mushtaq", "Shane Warne"],
      answer: "Rashid Khan"
    },
    {
      question: "Who scored the first double century in ODI cricket?",
      options: ["Sachin Tendulkar", "Rohit Sharma", "Virender Sehwag", "Chris Gayle"],
      answer: "Sachin Tendulkar"
    },
    {
      question: "Which player has the most runs in international cricket?",
      options: ["Ricky Ponting", "Virat Kohli", "Sachin Tendulkar", "Kumar Sangakkara"],
      answer: "Sachin Tendulkar"
    },
    {
      question: "Who is the only player to score 100 international centuries?",
      options: ["Ricky Ponting", "Virat Kohli", "Sachin Tendulkar", "Kumar Sangakkara"],
      answer: "Sachin Tendulkar"
    },
    {
      question: "Which team won the 2019 ICC Cricket World Cup?",
      options: ["India", "Australia", "England", "New Zealand"],
      answer: "England"
    },
    {
      question: "Who is the fastest batsman to score 10,000 runs in ODIs?",
      options: ["Virat Kohli", "Sachin Tendulkar", "Ricky Ponting", "AB de Villiers"],
      answer: "Virat Kohli"
    },
    
    {
      question: "Who is the highest run-scorer in T20 Internationals?",
      options: ["Virat Kohli", "Rohit Sharma", "Martin Guptill", "Ab De Villiers"],
      answer: "Virat Kohli"
    },
   
    
    {
      question: "Who is the only player to score 500 runs in a Test series?",
      options: ["Don Bradman", "Virat Kohli", "Steve Smith", "Kumar Sangakkara"],
      answer: "Don Bradman"
    },
    {
      question: "Who is the only player to score 1000 runs in a single World Cup?",
      options: ["Sachin Tendulkar", "Rohit Sharma", "Virat Kohli", "Kumar Sangakkara"],
      answer: "Sachin Tendulkar"
    },
    {
      question: "Who is the only player to score 200 in a World Cup match?",
      options: ["Martin Guptill", "Chris Gayle", "Rohit Sharma", "Aaron Finch"],
      answer: "Martin Guptill"
    },
    
    {
        question: "Which team played most IPL finals?",
        options: ["Chennai Super Kings","Royal Challengers Bangalore","Sunrisers HYderabad","Mumbai Indians"],
        answer: "Chennai Super Kings"
    },
    {
        question: "Who was the Man of the Match in 2015 ODI World Cup Final?",
        options: ["Mitchell Starc","Steve Smith","James Faulkner","Glenn Maxwell"],
        answer: "James Faulkner"
    },
    {
        question: "Who is the only captain to win three ICC Cricket World Cups?",
        options: ["Ricky Ponting", "MS Dhoni", "Clive Lloyd", "Steve Waugh"],
        answer: "Ricky Ponting"
    },
    {
        question: "Which team has won the most number of Champions Trophy?",
        options: ["Pakistan","Australia","Sri Lanka","India"],
        answer: "India"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft;
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const resultElement = document.getElementById("result");
  const nextButton = document.getElementById("next-button");
  const restartButton = document.getElementById("restart-button");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("timer");
  const progress = document.querySelector('.progress'); // Fixed progress bar reference
  
  function loadQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      questionElement.textContent = currentQuestion.question;
      optionsElement.innerHTML = "";
      
      currentQuestion.options.forEach(option => {
          const button = document.createElement("button");
          button.textContent = option;
          button.addEventListener("click", () => checkAnswer(option));
          optionsElement.appendChild(button);
      });
  
      // Reset timer and progress bar
      clearInterval(timer);
      timeLeft = 10;
      timerElement.textContent = `${timeLeft}s`;
      timerElement.classList.remove("timer-warning");
      progress.style.width = "100%";
  
      // Start the countdown
      timer = setInterval(() => {
          timeLeft--;
          timerElement.textContent = `${timeLeft}s`;
          progress.style.width = `${(timeLeft/10)*100}%`;
  
          if(timeLeft <= 5) {
              timerElement.classList.add("timer-warning");
          }
  
          if(timeLeft <= 0) {
              clearInterval(timer);
              resultElement.textContent = `Time's up! Correct answer was ${currentQuestion.answer}`;
              nextButton.style.display = "block";
              disableOptions();
          }
      }, 1000);
  }
  
  function disableOptions() {
      const buttons = optionsElement.querySelectorAll("button");
      buttons.forEach(button => {
          button.disabled = true;
          if(button.textContent === questions[currentQuestionIndex].answer) {
              button.classList.add("correct");
          }
      });
  }
  
  function checkAnswer(selectedOption) {
      clearInterval(timer);
      disableOptions();
      const currentQuestion = questions[currentQuestionIndex];
      if (selectedOption === currentQuestion.answer) {
          resultElement.textContent = "Correct!";
          score++;
      } else {
          resultElement.textContent = `Wrong! The correct answer is ${currentQuestion.answer}.`;
      }
      scoreElement.textContent = `Score: ${score}`;
      nextButton.style.display = "block";
  }
  
  function nextQuestion() {
      currentQuestionIndex++;
      timerElement.classList.remove("timer-warning");
      if (currentQuestionIndex < questions.length) {
          loadQuestion();
          resultElement.textContent = "";
          nextButton.style.display = "none";
      } else {
          endQuiz();
      }
  }
  
  function endQuiz() {
      questionElement.textContent = "Quiz Over!";
      optionsElement.innerHTML = "";
      resultElement.textContent = `Your final score is ${score}/${questions.length}.`;
      nextButton.style.display = "none";
      restartButton.style.display = "block";
      clearInterval(timer);
  }
  
  function restartQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      timerElement.classList.remove("timer-warning");
      loadQuestion();
      resultElement.textContent = "";
      scoreElement.textContent = `Score: ${score}`;
      restartButton.style.display = "none";
      progress.style.width = "100%";
  }
  
  // Event listeners
  nextButton.addEventListener("click", nextQuestion);
  restartButton.addEventListener("click", restartQuiz);
  
  // Initial load
  loadQuestion();