const ATMDeposit = ({handleChange, eventSelected, isDeposit}) =>{
  const choice = ["Deposit", "Cash Back"];
  console.log(eventSelected);
  if (eventSelected) {
    return(
      <label className="label huge">
        <h3>{choice[Number(!isDeposit)]}</h3>
        <input id="inputValue" type="number" placeholder="Amount" onChange={handleChange}></input>
        <button className="btn btn-primary" type="submit" value="submit">Submit</button>
        
      </label>
    )
  } else{
    return(
      <label className="label huge">
        <h3>Select operation</h3>
      </label>
    )
  }
 
}

const Account = () => {
  const [totalState, setTotalState] = React.useState(4000);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [eventSelected, setEventSelected] = React.useState(false);
  let transactionState = 0; // state of this transaction
  let status = `Account Balance $${totalState}`;

  const handleChange = event => {
    //console.log(`handleChange ${event.target.value}`);
    transactionState = Number(event.target.value);
  };

  const handleSubmit = (e) => {
    document.getElementById("inputValue").value = null;
    if(transactionState%20 && !isDeposit){
      alert("Use multiples of $20!");
      e.preventDefault();
      return;
    }
    if(transactionState>totalState && !isDeposit){
      alert("Insuficient funds!");
      e.preventDefault();
      return;
    }
    let newTotal = isDeposit ? totalState + transactionState : totalState - transactionState;
    setTotalState(newTotal);
    e.preventDefault();
  }

  return(
    <form className="container app" onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <div className="buttons">
        <button className="button" onClick={()=> {setIsDeposit(true); setEventSelected(true)}}>Deposit</button>
        <button className="button" onClick={()=> {setIsDeposit(false); setEventSelected(true)}}>Cash Back</button>
      </div>
      <div><ATMDeposit handleChange={handleChange} eventSelected={eventSelected} isDeposit={isDeposit} /></div>
    </form>
  ) 
}


ReactDOM.render(<Account />, document.getElementById("root"));