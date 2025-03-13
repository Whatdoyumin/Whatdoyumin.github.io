const score = localStorage.getItem('score') || 0; // 기본값 0 설정
const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || Array(10).fill('none');
const title = document.getElementById('title');
const scoreContent = document.getElementById('score');
const resultContainer = document.getElementById('resultContainer');
const correctButton = document.getElementById('correctBtn'); // 맞은 문제 버튼
const incorrectButton = document.getElementById('incorrectBtn'); // 틀린 문제 버튼

title.innerHTML = '퀴즈 결과';
scoreContent.innerHTML = `총점: <span style="color: green; font-weight: bold;">${score}/10</span>`;

// 문제 목록
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

const problemCorrect = ['2', '4', '2', '1', '2', '3', '1', '4', '2', '4']; // 정답 인덱스 (1부터 시작)

let correctQuestions = []; // 맞은 문제 번호 저장
let incorrectQuestions = []; // 틀린 문제 번호 저장

// 맞은 문제와 틀린 문제를 미리 분류하여 저장
for (let i = 0; i < problemTitle.length; i++) {
  let userAnswerIndex = userAnswers[i]; // 사용자의 답변 인덱스 (로컬 스토리지에서 가져온 값)
  let correctAnswerIndex = problemCorrect[i]; // 정답 인덱스

  if (userAnswerIndex === 'none' || isNaN(userAnswerIndex)) {
    userAnswerIndex = -1; // 응답 안 한 경우
  }

  if (userAnswerIndex === correctAnswerIndex) {
    correctQuestions.push(i); // 맞은 문제 번호 저장
  } else {
    incorrectQuestions.push(i); // 틀린 문제 번호 저장
  }
}

// 문제 출력 함수
function renderProblems(questionList) {
  // 기존 `resultContainer`가 있으면 삭제
  let oldContainer = document.getElementById('resultContainer');
  if (oldContainer) {
    oldContainer.remove();
  }

  let resultContainer = document.createElement('div');
  resultContainer.id = 'resultContainer';
  resultContainer.classList.add('result-container'); // 기존 CSS 스타일 유지

  if (questionList.length === 0) {
    resultContainer.innerHTML = `<p style="font-size: 18px; font-weight: bold; color: gray; text-align: center;">출력할 문제가 없습니다.</p>`;
  }

  for (let index of questionList) {
    const userAnswerIndex = parseInt(userAnswers[index]);
    const correctAnswerIndex = parseInt(problemCorrect[index]);
    const isCorrect = userAnswerIndex === correctAnswerIndex;

    const questionDiv = document.createElement('div');

    questionDiv.classList.add('question-box', isCorrect ? 'correct' : 'incorrect');

    // 사용자가 응답하지 않은 경우 '선택 안함'으로 표시
    const userAnswer =
      isNaN(userAnswerIndex) || userAnswerIndex === -1
        ? '선택 안함'
        : problemWord[index][userAnswerIndex - 1];

    questionDiv.innerHTML = `
          <h3>문제 ${index + 1}: ${problemTitle[index]}</h3>
          <p><strong>내 정답:</strong> ${userAnswer}</p>
          <p style="color: ${isCorrect ? 'green' : 'red'};"><strong>${
      problemAnswer[index]
    }</strong></p>
      `;

    resultContainer.appendChild(questionDiv);
  }
  document.body.appendChild(resultContainer);
}

// 버튼 클릭 이벤트 추가
correctButton.addEventListener('click', () => renderProblems(correctQuestions)); // 맞은 문제 출력
incorrectButton.addEventListener('click', () => renderProblems(incorrectQuestions)); // 틀린 문제 출력

// 처음에는 전체 문제 출력 X (필요하면 renderProblems() 호출 가능)

// 처음으로 돌아가기 버튼
function handleStart() {
  localStorage.clear(); // 모든 데이터 초기화
  window.location.href = '../index.html';
}
