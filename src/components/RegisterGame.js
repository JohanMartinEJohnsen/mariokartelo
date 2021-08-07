import Swal from "sweetalert2";
// Denne er ikke i bruk lenger

function RegisterGame(){
    return(
   Swal.mixin({
  input: 'text',
  confirmButtonText: 'Next &rarr;',
  showCancelButton: true,
  progressSteps: ['1', '2', '3']
}).queue([
  {
    title: 'Question 1',
    text: 'Chaining swal2 modals is easy'
  },
  'Question 2',
  'Question 3'
]).then((result) => {
  if (result.value) {
    const answers = JSON.stringify(result.value)
    Swal.fire({
      title: 'All done!',
      html: `
        Your answers:
        <pre><code>${answers}</code></pre>
      `,
      confirmButtonText: 'Lovely!'
    })
  }
})

    )}

export default RegisterGame;
