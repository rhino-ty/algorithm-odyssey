// function solution(n, m) {
//     // 최대 공약수 (GCD)
//     let gcd = 1;
//     for (let i = 2; i <= Math.min(n, m); i++) {
//         if (n % i === 0 && m % i === 0) {
//             gcd = i;
//         }
//     }
    
//     // 최소 공배수 (LCM) = n * m / 최대공약수
//     let lcm = (n * m) / gcd;
    
//     return [gcd, lcm];
// }

function solution(n, m) {
    // 유클리드 호제법을 이용한 최대공약수 (GCD) 계산
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    
    // 최대공약수 계산
    const greatestCommonDivisor = gcd(n, m);
    
    // 최소공배수 (LCM) = n * m / 최대공약수
    const leastCommonMultiple = (n * m) / greatestCommonDivisor;
    
    return [greatestCommonDivisor, leastCommonMultiple];
}