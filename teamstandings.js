

fetch("http://localhost:8080/api/home/standings", {
  method: 'GET',
  headers: {
  'X-Originating-IP': '176.85.245.192'},
  }
)
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response =>setStandings(response.conferences));

function setStandings(conferences){
  let i=0;
  conferences.forEach(conference => {
    var lineas=[];
    conference.divisions.forEach(divisions=>{
      divisions.teams.forEach(team=>{
        let city=team.market.toLowerCase().replace(' ','-');
        let name=team.name.toLowerCase().replace(' ','-');
        let linea= '<tr><th scope="row"><img src="http://loodibee.com/wp-content/uploads/nfl-'+city+'-'+name+'-team-logo-2-350x350.png" width=100px height=100px alt="'+team.name+' logo">'+team.market+' '+team.name+'</th><td>'
        +team.wins+'</td><td>'+team.losses+'</td><td>'+team.ties+'</td></tr>';
        lineas.push({wins : team.losses,code: linea});
      }
        )
    }
      )
      lineas.sort(function(a,b){
        return a.wins-b.wins;
       });
       var html='';
      lineas.forEach(objeto => {
        html=html+objeto.code;
       });
       document.getElementsByTagName("tbody")[i].innerHTML=html;
       i++;
  });

}