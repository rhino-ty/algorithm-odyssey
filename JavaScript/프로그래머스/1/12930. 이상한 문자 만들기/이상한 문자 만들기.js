function solution(s) {
  let arr = s.split(" ");
  let result = [];
  for (i = 0; i < arr.length; i++) {
    result.push(
      arr[i]
        .split("")
        .map((pre, idx) => {
          return idx % 2 === 0 ? pre.toUpperCase() : pre.toLowerCase();
        })
        .join("")
    );
  }
  return result.join(" ");
}