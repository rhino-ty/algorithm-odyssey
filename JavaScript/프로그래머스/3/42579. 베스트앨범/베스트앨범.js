function solution(genres, plays) {
  const allRecord = genres.map((el, idx) => ({ genre: el, playCount: plays[idx], unique: idx }));
  const countObj = {};
  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const play = plays[i];
    countObj[genre] = (countObj[genre] || 0) + play;
  }
  const objToArr = Object.entries(countObj);
  objToArr.sort((a, b) => b[1] - a[1]);
  const result = [];
  objToArr.forEach((el) => {
    let bestGenre = [];
    for (let j = 0; j < allRecord.length; j++) {
      if (el[0] === allRecord[j].genre) {
        bestGenre.push(allRecord[j]);
      }
    }
    bestGenre.sort((a, b) => b.playCount - a.playCount);
    bestGenre.forEach((el, idx) => {
      if (idx < 2) {
        result.push(el.unique);
      }
    });
  });
  return result;
}
