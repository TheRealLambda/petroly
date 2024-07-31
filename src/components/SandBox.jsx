const SandBox = () => {
  // let now = new Date();
  // now.setHours(0, 0, 0, 0)
  // let onejan = new Date(now.getFullYear(), 0, 1);
  // onejan.setHours(0, 0, 0, 0)
  // let week1 = Math.floor((((now.getTime() - onejan.getTime()) / 86400000) ) / 7)
  // console.log(now);
  // console.log(onejan);
  // console.log(week1);

  const firstDayOfYear = new Date(2022, 1-1, 1)
  const a = new Date(firstDayOfYear)
  a.setDate(a.getDate() - a.getDay()) 
  console.log(a);
}

export default SandBox