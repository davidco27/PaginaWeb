

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('gameId');
var local;
var visitante;
var url= 'http://localhost:8080/api/home/games/'+ id;
    fetch(url, {
      method: 'GET',
      headers: {
      'X-Originating-IP': '176.85.245.192'}}
    )
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response =>setGame(response));
  function setGame(game){
      let cityAw =game.summary.away.market;
      let cityHm =game.summary.home.market;
      let nameAw =game.summary.away.name;
      let nameHm =game.summary.home.name;
    let cityVis=cityAw.toLowerCase().replace(' ','-');
    let nameVis=nameAw.toLowerCase().replace(' ','-');
    let cityLoc=cityHm.toLowerCase().replace(' ','-');
    let nameLoc=nameHm.toLowerCase().replace(' ','-');
    var html= '<img class="d-inline-block" style="margin-left : 1%" width=15% height=15% src="http://loodibee.com/wp-content/uploads/nfl-'+cityVis+'-'+nameVis+'-team-logo-2-350x350.png">'
    +'<p id="equipo" class="d-inline-block"><strong>'+cityAw.toUpperCase()+" "+nameAw.toUpperCase()+'</strong></p>'
    +'<div style="margin-top: 4%;" class="float-right"><p id="marcador"><strong>'+game.summary.away.points+'</strong></p><div>'
    document.getElementById("scoreboard-visitante").innerHTML=html;
    html='<span class="d-inline-block" id="marcador" style="margin-top: 6%; margin-left: 5%"><strong>'+game.summary.home.points+'</strong></span>'
    +'<p id="equipo" class="d-inline-block" style="margin-left: 8%;" ><strong>'+cityHm.toUpperCase()+" "+nameHm.toUpperCase()+'</strong></p>'
    + '<img class="d-inline-block"  width=15% height=15% src="http://loodibee.com/wp-content/uploads/nfl-'+cityLoc+'-'+nameLoc+'-team-logo-2-350x350.png">'
    document.getElementById("scoreboard-local").innerHTML=html;
    document.getElementById("btnVisitante").innerHTML= nameAw;
    document.getElementById("btnLocal").innerHTML= nameHm;     local=game.statistics.home;
    visitante=game.statistics.away;
    local=game.statistics.home;
    setVisitante();
  }
  function setTeam(rushing,passing,receiving){
   let html="";
  rushing.players.forEach(player => {
   html=html+"<tr><td>"+ player.name+ "</td><td>" + player.attempts + "</td><td>" + player.yards + "</td><td>" + player.touchdowns  + "</td><td>" + player.avg_yards  + "</td></tr>";  
  });
  html=html+"<tr><td><strong>TOTAL</strong></td><td><strong>" + rushing.totals.attempts + "</strong></td><td><strong>" + rushing.totals.yards + "</strong></td><td><strong>" + rushing.totals.touchdowns
  + "</strong></td><td><strong>" + rushing.totals.avg_yards + "</strong></td></tr>";  
  document.getElementById("rushing").innerHTML=html;  
  html="";
  passing.players.forEach(player => {
   html=html+"<tr><td>"+ player.name+ "</td><td>" + player.completions+"/" + player.attempts + "</td><td>" + player.yards + "</td><td>" + player.touchdowns  + "</td><td>" + player.interceptions + "</td>"
   +"<td>" + player.rating + "</td></tr>";  
  });
  html=html+"<tr><td><strong>TOTAL</strong></td><td><strong>" + passing.totals.completions+"/" + passing.totals.attempts+ "</strong></td><td><strong>" + passing.totals.yards + "</strong></td><td><strong>" + passing.totals.touchdowns
  + "</strong></td><td><strong>" + passing.totals.interceptions + "</strong></td><td><strong>" + passing.totals.rating + "</strong></td></tr>";  
  document.getElementById("passing").innerHTML=html;  
   html="";
 receiving.players.forEach(player => {
  html=html+"<tr><td>"+ player.name+ "</td><td>" + player.receptions + "</td><td>" + player.yards + "</td><td>" + player.touchdowns  + "</td><td>" + player.targets + "</td></tr>";  
 });
 html=html+"<tr><td><strong>TOTAL</strong></td><td><strong>" + receiving.totals.receptions + "</strong></td><td><strong>" + receiving.totals.yards + "</strong></td><td><strong>" + receiving.totals.touchdowns
 + "</strong></td><td><strong>" + receiving.totals.targets + "</strong></td></tr>";  
 document.getElementById("receiving").innerHTML=html;

}
function setLocal(){
  setTeam(local.rushing,local.passing,local.receiving);
}
  function setVisitante(){
    setTeam(visitante.rushing,visitante.passing,visitante.receiving);
  }