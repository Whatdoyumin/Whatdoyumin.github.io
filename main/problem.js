const problemTitle = [
  '1. 다음 중 아이디 선택자를 사용한 것은?',
  '2. 내용이 요소의 크기를 벗어날 때 자동으로 스크롤이 되는 속성의 값은?',
  '3. flex에서 justify-content : space-between을 적용할 경우 발생하는 일은?',
  '4. div 요소의 높이는 몇 픽셀인가?',
  '5. 다음 코드의 실행 결과로 옳은 것은? <br><br> function sum(a, b) { <br>&emsp; return a + b; <br> } <br> let result = sum(20); <br> console.log(result);',
  '6. 다음 중 제목과 본문 글자 태그가 아닌 것은?',
  '7. 다음 중 &lt;h1&gt;제목 글자 태그 1&lt;/h1&gt; 부터 &lt;h6&gt;제목 글자 태그 6&lt;/h6&gt;까지 생성하는 Emmet 단축 코드는?(VScode기준)',
  '8. HTML 목록을 만들 때 내용이 틀린 태그는?',
  '9. 다음 중 &lt;audio&gt; 태그와 &lt;video&gt; 태그 내부에 넣어, 웹 브라우저가 재생할 수 있는 파일 확장자 관련 문제를 해결할 때 사용하는 태그는?',
  '10. 다음 중 HTTP 상태 코드가 올바른 것은?',
];

const problemWord = [
  ['1. *', '2. #header', '3. .header', '4. h1'],
  [
    '1. overflow : hidden;',
    '2. overflow : auto;',
    '3. overflow : visible;',
    '4. overflow : scroll;',
  ],
  [
    '1. 모든 요소가 가운데 정렬된다.',
    '2. 요소들 사이에 동일한 간격이 생기지만, 양 끝에는 여백이 없다.',
    '3. 모든 요소가 앞에서부터 정렬된다.',
    '4. 모든 요소가 끝쪽으로 정렬된다.',
  ],
  ['1. 100px', '2. 140px', '3. 160px', '4. 120px'],
  ['1. 20', '2. NaN', '3. undefined', '4. TypeError'],
  [
    '1. h : 제목을 나타내는 태그',
    '2. p : 단락을 나타내는 태그',
    '3. br : 미리 서식이 지정된 텍스트를 의미',
    '4. hr : 수평 줄을 그리는 태그',
  ],
  ['1. h${제목$}*6', '2. h&{제목&}*6', '3. h#{제목#}*6', '4. h%{제목%}*6'],
  [
    '1. ul : 순서가 없는 목록 생성',
    '2. ol : 순서가 있는 목록 생성',
    '3. li : 목록 요소 생성',
    '4. dl : 제목 표시',
  ],
  ['1. src', '2. sorce', '3. content', '4. media'],
  ['1. 1xx(성공)', '2. 2xx(리다이렉션)', '3. 3xx(클라이언트 오류)', '4. 5xx(서버 오류)'],
];

const problemAnswer = [
  `아이디 선택자를 사용할 때는 '#' 기호를 사용합니다.`,
  '영역을 벗어나는 부분을 scroll로 만드는 속성 키워드는 scroll 입니다.',
  'justify-content: space-between;은 첫 번째 요소는 왼쪽 끝, 마지막 요소는 오른쪽 끝에 배치되고 나머지 요소들 사이에 동일한 간격 발생',
  'box-sizing: border-box;을 설정하면 padding과 border가 포함된 크기로 적용되므로 height: 100px; 그대로 유지',
  'sum(20)에서 b 값이 undefined가 되고, 20+undefined는 NaN이 됨.',
  'br 태그 (줄 바꿈 태그, 오답 설명)미리 서식이 지정된 텍스트를 의미하는 것이 아니라, 줄 바꿈을 삽입하는 태그입니다.예를 들어 <br>을 사용하면 <p> 태그처럼 블록 단위가 아니라, 단순히 한 줄만 내려갑니다.',
  'h$ -> h1~h6 태그 자동 생성 , {제목$} ->$가 자동 증가하여 제목1~제목6 생성, *6 ->6번 반복',
  '답 4번, dl은 제목을 표시하는 태그가 아니라 설명 목록을 만드는 태그이므로, 4번이 틀린 설명입니다!',
  '<audio> 및 <video> 태그는 브라우저마다 지원하는 파일 형식이 다를 수 있습니다. 이를 해결하기 위해 <source> 태그를 사용하여 여러 개의 미디어 파일을 지정할 수 있습니다.',
  ' 1xx(정보) 2xx(성공) 3xx(리다이렉션) 4xx(클라이언트 오류)',
];

const problemCorrect = ['2', '4', '2', '1', '2', '3', '1', '4', '2', '4'];

const userScore = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];

let number = 0;
let count = 0;

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');

button1.innerHTML = problemWord[number][0];
button2.innerHTML = problemWord[number][1];
button3.innerHTML = problemWord[number][2];
button4.innerHTML = problemWord[number][3];

const title = document.getElementById('problemTitle');
title.innerHTML = problemTitle[number];

// 문제 번호 초기 선택 상태 처리
const problemNumbers = document.querySelectorAll('#problemNumber');
problemNumbers[0].style.backgroundColor = 'rgb(255, 233, 255)';

// 문제 답변 선택 (오답일 경우에만 해석 표시)
function handleButton(x) {
  const buttons = [button1, button2, button3, button4];
  buttons.forEach((button) => {
    button.style.backgroundColor = ''; // 이전 선택된 배경 색 초기화
  });

  const modal = document.getElementById('modal');

  let resultButton = document.getElementById('result');
  let answer = document.getElementById('answer');

  if (!resultButton) {
    resultButton = document.createElement('div');
    resultButton.id = 'result';
    modal.appendChild(resultButton);
  }

  if (!answer) {
    answer = document.createElement('div');
    answer.id = 'answer';
    modal.appendChild(answer);
  }

  if (x == problemCorrect[number]) {
    resultButton.innerHTML = '정답입니다';
    resultButton.style.color = 'rgb(0, 200, 0)';
    answer.innerHTML = '';
    userScore[number] = 'correct';
  } else {
    resultButton.innerHTML = '오답입니다';
    resultButton.style.color = 'red';
    answer.innerHTML = problemAnswer[number];
  }
  openModal();

  //수정한 부분
  // 사용자의 선택 저장
  let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || Array(10).fill('none');
  userAnswers[number] = x; // 사용자의 선택한 답 저장
  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

  // 클릭된 버튼에 배경색 변경
  if (x === 1) button1.style.backgroundColor = 'rgb(255, 233, 255)';
  if (x === 2) button2.style.backgroundColor = 'rgb(255, 233, 255)';
  if (x === 3) button3.style.backgroundColor = 'rgb(255, 233, 255)';
  if (x === 4) button4.style.backgroundColor = 'rgb(255, 233, 255)';
}

// 제출 함수
const submit_btn = document.getElementById('submit_btn');
submit_btn.addEventListener('click', () => {
  console.log(userScore.length);
  score = 0;

  for (i = 0; i < userScore.length; i++) {
    if (userScore[i] == 'correct') {
      score = score + 1;
    }
  }
  localStorage.setItem('score', score);
  window.location.href = '../result/resultPage.html';
});

// 이전 문제로 돌아가기
const history_btn = document.getElementById('history_problem');
history_btn.addEventListener('click', () => {
  number = number - 1;
  updateQuestion();
  closeModal();
});

// 다음 문제로 가기
const next_btn = document.getElementById('next_problem');
next_btn.addEventListener('click', () => {
  number = number + 1;
  updateQuestion();
  closeModal();
});

// 최종 결과 보기 버튼 추가
const final_result_btn = document.createElement('button');
final_result_btn.id = 'final_result';
final_result_btn.innerText = '최종 결과 보기';
final_result_btn.style.display = 'none'; // 기본적으로 숨김
document.querySelector('.modalBtnContainer').appendChild(final_result_btn);

final_result_btn.addEventListener('click', () => {
  window.location.href = '../result/resultPage.html';
});

// 문제 문항 업데이트 함수
function updateQuestion() {
  const button1 = document.getElementById('button1');
  const button2 = document.getElementById('button2');
  const button3 = document.getElementById('button3');
  const button4 = document.getElementById('button4');

  button1.innerHTML = problemWord[number][0];
  button2.innerHTML = problemWord[number][1];
  button3.innerHTML = problemWord[number][2];
  button4.innerHTML = problemWord[number][3];

  const title = document.getElementById('problemTitle');
  title.innerHTML = problemTitle[number];

  // 문제 번호에 해당하는 버튼 색칠
  initButtonWhite();
  handleProblemNumber(number + 1); // 현재 문제에 맞는 버튼 색 변경

  // 이전/다음 문제로 넘어가면 결과 내용은 사라짐
  const resultButton = document.getElementById('result');
  const answer = document.getElementById('answer');
  resultButton.innerHTML = '';
  answer.innerHTML = '';

  // 모달 버튼 상태 업데이트
  updateModalButtons();
}

// 문제 번호 클릭시 해당 문제로 이동
function handleProblemNumber(problem_number) {
  number = problem_number - 1;

  const button1 = document.getElementById('button1');
  const button2 = document.getElementById('button2');
  const button3 = document.getElementById('button3');
  const button4 = document.getElementById('button4');
  const problemNumbers = document.querySelectorAll('#problemNumber');

  button1.innerHTML = problemWord[number][0];
  button2.innerHTML = problemWord[number][1];
  button3.innerHTML = problemWord[number][2];
  button4.innerHTML = problemWord[number][3];

  const title = document.getElementById('problemTitle');
  title.innerHTML = problemTitle[number];

  initButtonWhite();

  problemNumbers.forEach((btn, index) => {
    if (index === problem_number - 1) {
      btn.style.backgroundColor = 'rgb(255, 233, 255)';
    } else {
      btn.style.backgroundColor = '';
    }
  });
}

// 모달 버튼 상태 업데이트
function updateModalButtons() {
  if (number === 0) {
    // 첫 번째 문제
    history_btn.disabled = true;
    history_btn.style.backgroundColor = 'gray';
  } else {
    history_btn.disabled = false;
    history_btn.style.backgroundColor = ''; // 기본 색상
  }

  if (number === problemTitle.length - 1) {
    // 마지막 문제
    next_btn.style.display = 'none';
    final_result_btn.style.display = 'inline-block';
  } else {
    next_btn.style.display = 'block';
    final_result_btn.style.display = 'none';
  }
}

// 초기 로딩 시 버튼 상태 업데이트
updateModalButtons();

// 버튼 배경색 white로 변경 함수
function initButtonWhite() {
  button1.style.backgroundColor = 'white';
  button2.style.backgroundColor = 'white';
  button3.style.backgroundColor = 'white';
  button4.style.backgroundColor = 'white';
}

// 모달 열기
function openModal() {
  document.querySelector('.modal-overlay').style.display = 'flex';
}

// 모달 닫기 (필요하면 추가)
function closeModal() {
  document.querySelector('.modal-overlay').style.display = 'none';
}
