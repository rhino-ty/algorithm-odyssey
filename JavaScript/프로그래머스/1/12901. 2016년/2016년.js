function solution(a, b) {
  const dayWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const date = new Date(2016, a - 1, b);
  return dayWeek[date.getDay(date)];
}
