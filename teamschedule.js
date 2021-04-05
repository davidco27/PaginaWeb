getSchedule();    
function getSchedule(){
    var seasons= document.getElementsByName("temporadas")[0];
  var year=seasons.options[seasons.selectedIndex].value;
  var weeks= document.getElementsByName("semanas")[0];
  var week=weeks.options[weeks.selectedIndex].value;
  var semana= week+","+year;
  var url = 'http://localhost:8080/api/home/games?week='+week+'&year='+year ;
  fetch(url, {
    method: 'GET',
    headers: {
    'X-Originating-IP': '176.85.245.192'}}
  )
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response =>setSchedule(response.week.games));}
  function setSchedule(games){
      var html='';
      games.forEach(game => {
        let local = game.home.name.toLowerCase().replace(' ','-').replace(' ','-');
        let visitante = game.away.name.toLowerCase().replace(' ','-').replace(' ','-');
       var fecha= game.scheduled.substring(0,game.scheduled.indexOf('T')).split('-');
          var linea= '<div class="card d-inline-block" style="width: 30%;margin-left: 2%; margin-bottom: 1%;">'+
          '<div class="card-header">'+ fecha[2]+'-'+fecha[1]+'-'+fecha[0]+" "+game.venue.name+", "+ game.venue.city+'</div><div class="card-body"><div class="local">'
          +'<img class "d-inline-block" width=15% height=10% src="//loodibee.com/wp-content/uploads/nfl-'+local+'-team-logo-2-350x350.png">'
          +'<p class="d-inline-block card-text"><strong>'+ game.home.name+'</strong></p>'
          +'<p  style="margin-top: 5%;" class="d-inline-block float-right">'+game.scoring.home_points+'</p></div><div class="visitante">'
          +'<img class "d-inline-block" width=15% height=10% src="//loodibee.com/wp-content/uploads/nfl-'+visitante+'-team-logo-2-350x350.png"><p class="d-inline-block card-text"><strong>'+ game.away.name+'</strong></p>'
          +'<p  style="margin-top: 5%;" class="d-inline-block float-right">'+game.scoring.away_points+'</p></div>'
          +'<a class="stretched-link" href="stats.html?gameId='+game.id+'"></a></div></div>';
          html=html+linea;
          
      });
      document.getElementById("games").innerHTML=html;

  }

    
  