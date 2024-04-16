// 새로 로드시 화면 맨 위로 이동하기 ////
window.addEventListener("load", () => window.scrollTo(0, 0));

// 한번작동 상태변수
let isOnce = false;

// 페이지 이동시 이벤트
// 자바스크립트 구역
window.addEventListener("wheel", startScroll, { passive: false });
function startScroll(e) {
  if (isOnce) return;
  // 5초후 잠금설정
  setTimeout(() => {
    isOnce = true;
  }, 3000);

  e.preventDefault();
  console.log("스크롤");
  document.querySelector(".pg1").classList.add("on");
}
//   document.querySelectorAll('.pg')
//   .forEach(ele=>{
//     ele.onclick = ()=>{
//       ele.classList.add('on');
//     }; /// click
//   }); /// forEach ///

window.addEventListener("load", () => {
    const target = document.querySelectorAll('.work');
    target.forEach(ele=>{
        const tg = ele.querySelector("ul");
        setInterval(() => {
          tg.appendChild(tg.querySelectorAll("li")[0]);
        }, 3000);
    })
});

// 1. 전역변수 설정하기 /////////////////
// 1-1. 페이지변수
let pgNum = 0;
// 1-2. 휠상태변수(true는 막기/false는 통과)
let stsWheel = false;
// 1-3. .page 클래스 요소
const elePage = document.querySelectorAll(".page");
// 1-4. 전체 페이지 수
const totalCnt = elePage.length;
console.log("대상:", elePage, totalCnt, "개");

/********************************************************
    메뉴 클릭시 이벤트 처리하기
********************************************************/
// 이벤트 대상 : .gnb a
const gnb = document.querySelectorAll(".gnb a");
// 이벤트 대상 : .indic a
const indic = document.querySelectorAll(".indic a");
console.log("gnb:", gnb, "/indic:", indic);
// 이벤트 설정 + 기능 구현하기
gnb.forEach((ele, idx) => {
  ele.onclick = () => {
    // 메뉴 변경 함수 호출
    chgMenu(idx);
  }; /// click 함수 ///
}); //// forEach ////
indic.forEach((ele, idx) => {
  ele.onclick = () => {
    // 메뉴 변경 함수 호출
    chgMenu(idx);
  }; /// click 함수 ///
}); //// forEach ////

// [메뉴 변경 함수 : .gnb + .indic] ////
function chgMenu(idx) {
  // idx - 순번
  // 클릭시 자신의 순번 찍기
  console.log("순번:", idx);

  // 1. 전역페이지변수에 순번 업데이트
  pgNum = idx;

  // 2. 전체 메뉴에 on 빼기
  gnb.forEach((ele, seq) => {
    // ele - a요소 / seq - 순번
    if (idx === seq) {
      // 선택순번과 같으면 on 넣기
      gnb[seq].parentElement.classList.add("on");
    } /// if ///
    else {
      // 기타 경우 on 지우기
      gnb[seq].parentElement.classList.remove("on");
    } /// else ///
  }); /// forEach ///

  // 2. 전체 메뉴에 on 빼기
  indic.forEach((ele, seq) => {
    // ele - a요소 / seq - 순번
    if (idx === seq) {
      // 선택순번과 같으면 on 넣기
      ele.parentElement.classList.add("on");
      indic[seq].parentElement.classList.add("on");
    } /// if ///
    else {
      // 기타 경우 on 지우기
      ele.parentElement.classList.remove("on");
      indic[seq].parentElement.classList.remove("on");
    } /// else ///
  }); /// forEach ///
  // for(let x of gnb){
  //     x.parentElement.classList.remove('on');
  // } /// for of ///
}




//////// 마우스 휠 작동시 페이지 이동하기 //////
// 마우스 광휠막기
let wheelSts = false;

window.addEventListener('wheel',(e)=>{

    // 광휠막기 /////
    if(wheelSts) return;
    wheelSts = true;
    setTimeout(() => {
        wheelSts = false;
    }, 600);

    console.log(e.deltaY);
    if(!isOnce) return;
    // 휠방향 :  event.deltaY (양수:아랫쪽,음수:윗쪽)
    if(e.deltaY > 0){
        pgNum++;
        if(pgNum>5)pgNum=5;
    }
    else{
        pgNum--;
        if(pgNum<0)pgNum=0;
    }
    console.log('페이지번호:', pgNum);

    // 페이지 이동 : scrollTo(x축이동,y축이동)
    window.scrollTo(0,window.innerHeight*pgNum);

    // 인디케이터 변경하기
    chgMenu(pgNum);
})
