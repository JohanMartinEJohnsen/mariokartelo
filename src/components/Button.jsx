import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
//import RegisterGame from "./RegisterGame";
import Swal from "sweetalert2";
import members from "../data/MOCK_DATA.json";

function Button() {
  return <AwesomeButton type="primary" className="button" onPress={()=> RegisterGame()}  >Registrer spill</AwesomeButton>;
}

function RegisterGame(){
    const names = members.map(({name})=> name);
    names.push("ingen")
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
    rgba(0,0,123,0.4)
    url("https://media.giphy.com/media/FMapondVtL2Fi/giphy.gif")
    left top
    no-repeat`
    
  },
  {
    title: 'Hvem fikk andre plass?',
    input: "select",
    inputOptions: names
  },
  {
    title: 'Hvem fikk tredje plass?',
    input: "select",
    inputOptions: names
  },{
    title: 'Hvem fikk fjerde plass?',
    input: "select",
    inputOptions: names,
    backdrop: 
    `
    rgba(0,0,123,0.4)
    url("https://mario.wiki.gallery/images/thumb/6/67/MK8-Line-Luigi-Blooper.gif/200px-MK8-Line-Luigi-Blooper.gif")
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

export default Button;