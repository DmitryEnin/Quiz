/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  const btnSubmit = document.querySelector('#btnSubmit');
  const btnReset = document.querySelector('#btnReset');
  const time = document.querySelector('#time');
  const showScore = document.querySelector('#score');
  let counterTimer;

  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    startTimer(60);
  });

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'Who writes JavaScript language?',
      o: ['Brendan Eich', 'Guido van Rossum', 'John Berners-Lee', 'Rasmus Lerdorf'],
      a: 1,
    },
    {
      q: 'What is considered the official birthday of the Internet.',
      o: ['January 1, 1983', 'January 1, 1975', 'January 1, 1970', 'January 1, 1990'],
      a: 2,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Question - ${quizItem.q}
                    <li class="list-group-item mt-2" style="font-size:1.5rem;" id="li_${index}_0"><input style="margin-right: 0.8rem;" type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" style="font-size:1.5rem;" id="li_${index}_1"><input style="margin-right: 0.8rem;" type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item" style="font-size:1.5rem;"  id="li_${index}_2"><input style="margin-right: 0.8rem;" type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item" style="font-size:1.5rem;"  id="li_${index}_3"><input  type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  btnReset.addEventListener('click', () => {
    window.location.reload();
  });

  btnSubmit.addEventListener('click', () => {
    calculateScore();
    clearInterval(counterTimer);
    const allRadioInputs = document.querySelectorAll('input[type = radio]');
    allRadioInputs.forEach(radio => {
      radio.display = true;
    });
  });

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      const selectedRadioElement = document.querySelector(`input[name=radio${index}] : checked`);
      if (selectedRadioElement === null) {
        const correctAnswer = document.getElementById(`radio_${index}${quizItem.a}`);
        correctAnswer.parentElement.style.backgroundColor = '#77d278';
      } 
      if (selectedRadioElement) {
        for (let i = 0; i < 4; i++) {
          //highlight the li if it is the correct answer
          let li = `li_${index}_${i}`;
          let r = `radio_${index}_${i}`;
          liElement = document.querySelector('#' + li);
          radioElement = document.querySelector('#' + r);

          if (quizItem.a == i) {
            //change background color of li element here
            liElement.style.backgroundColor = '#77d278';
          }

          if (radioElement.checked) {
            // code for task 1 goes here
            if (radioElement.value == quizArray[index].a){
              score++;
            } else {
              liElement.style.backgroundColor = '#db4d4d';
            }
          }
        }
      }

      
    });
    showScore.innerHTML = `<span style="font-size: 2.5rem; font-weight:bold">Hey, your score is ${score} out of ${quizArray.length}!</span>`
  };

  const startTimer = counter => {
    counterTimer = setInterval(() => {
      counter--;
      if (counter <= 9) {
        time.innerHTML = '0' + counter;
      } else {
        time.innerHTML = counter;
      }
      if (counter <= 0) {
        time.innerHTML = '00';
        clearInterval(counterTimer);

        alert('Check your score, time is up!');

        calculateScore();

        const allRadioInputs = document.querySelectorAll('input[type = radio]');
        allRadioInputs.forEach(radio => {
          radio.disabled = true;
        });
      }
    }, 1000);
  };




  // call the displayQuiz function
  displayQuiz();
});
