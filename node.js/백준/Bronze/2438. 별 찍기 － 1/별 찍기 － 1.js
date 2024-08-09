const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input;

readline.on('line', function(line) {
    input = parseInt(line)
}).on('close', function(){ 
    // 이 안에 솔루션 코드 작성
    const result = [];
    
    for (let i = 1; i <= input; i++) {
        result.push('*'.repeat(i))
    }
    
    console.log(result.join('\n'));
});