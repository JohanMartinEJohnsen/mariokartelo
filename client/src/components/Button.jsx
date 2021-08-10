import { AwesomeButton } from "react-awesome-button";
import axios from 'axios'
import "react-awesome-button/dist/styles.css";
import Swal from "sweetalert2";
import updateScore from "../Scoring_functions"


function Button({users}) {
  return <AwesomeButton type="primary" className="button" onPress={()=> RegisterGame(users)}  >Registrer spill</AwesomeButton>;
}

function RegisterGame(users){
    const names = users.map(({name}) => name);
    names.unshift("ingen")
    Swal.mixin({
  input: 'text',
  confirmButtonText: 'Next &rarr;',
  showCancelButton: true,
  progressSteps: ['1', '2', '3', '4']
}).queue([
  {
    title: 'Hvem fikk første plass?',
    input: "select",
    inputOptions: names,
    backdrop: `
    rgba(11,163,216,0.4)
    url("http://pa1.narvii.com/6688/6ff062afd890df9fd7135e6090983e1b3ac2c9e5_00.gif")
    left top
    no-repeat`
    
  },
  {
    title: 'Hvem fikk andre plass?',
    input: "select",
    inputOptions: names,
    backdrop: 
    `
    rgba(11,163,216,0.4)
    url("https://4.bp.blogspot.com/-9NjYtb9BGuw/WYKAGbNFZoI/AAAAAAABC_0/7ZQSM_ZAtOMY-l9HzoDP4nKuvle-AtV1gCLcBGAs/s1600/AS002913_13.gif")
    left top
    no-repeat`
  },
  {
    title: 'Hvem fikk tredje plass?',
    input: "select",
    inputOptions: names,
    backdrop: 
    `
    rgba(11,163,216,0.4)
    url("https://1.bp.blogspot.com/-exbls8ggUng/WYKAHws-K0I/AAAAAAABDAA/0jYXa_Kit2gUzZTiaPsEYVCO8K2CGeFJwCLcBGAs/s1600/AS002913_16.gif")
    left top
    no-repeat`
  },{
    title: 'Hvem fikk fjerde plass?',
    input: "select",
    inputOptions: names,
    backdrop: 
    `
    rgba(11,163,216,0.4)
    url("https://thumbs.gfycat.com/AccomplishedPoliteJackal-max-1mb.gif")
    left top
    no-repeat`
    
  }
  
  
]).then((result) => {
  if (result.value) {
    const answers = [];
    answers.push(names[result.value[0]]);
    answers.push(names[result.value[1]]);
    answers.push(names[result.value[2]]);
    answers.push(names[result.value[3]]);

    var updated_scores = updateScore(answers, users)
    updateScoresOnServer(updated_scores, users)
    console.log('updated_scores: ' + updated_scores)

    const string= JSON.stringify(answers);

    Swal.fire({
      title: 'Spillet er registrert!',
      html: `
        Resultatet ble:
        <pre><code>${string}</code></pre>
      `,
      confirmButtonText: 'Lovely!'
    })
  }
})
}

function updateScoresOnServer(users, org_users){
  const numPlayers = users.length
  for (var player = 0; player < numPlayers; player++){
    var url = '/users/' + users[player].name
    axios.patch(url, {rating: users[player].rating, races: org_users[player].races + 1})
  }
  
}


export default Button;