function solution(n, memo = []) {
  // 1, 2, 3, 5, 8
  // 피보나치 memoization 적용
  if (n <= 2) return n;
  if (memo[n]) return memo[n];
  const result = (memo[n] = solution(n - 1, memo) + solution(n - 2, memo));
  return result % 1234567;
}
