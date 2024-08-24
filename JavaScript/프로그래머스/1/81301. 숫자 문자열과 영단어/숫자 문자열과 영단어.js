function solution(s) {
  // 1. 나누기 기준 설정 - 객체 키?
  // 2. 문자열 대로 나누기 - 반복
  // 3. 나눈 대로 숫자로 치환하기
  // 4. 빈그릇에 담기
    let nums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    for(let i = 0; i < nums.length; i++) { 
        // "23four5six7", i = 4, s.split(nums[i]) = [23] [5six7], 
        // let newArr = s.split(nums[i]);
        s = s.split(nums[i]).join(i);
    }
    return Number(s);
}
