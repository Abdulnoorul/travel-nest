import React, { useState } from 'react'
import './App.css'
import { jsPDF } from "jsPDF"
import 'jspdf-autotable'

function App() {

  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [pname, setPname] = useState('')
  const [age, setAge] = useState('')
  const [date, setDate] = useState('')
  const [mob, setMob] = useState('')
  const [mail, setMail] = useState('')

  const swapstat = () => {
  const temp = source;
  setSource(destination);
  setDestination(temp);
  };

  const download = () => {
    if (source == destination) {
      alert('From city and Destination city cannot be same')
    }
    else if (source == "" || destination == "" || pname == "" || age == "" || date == "" || mob == "" || mail == "") {
      alert('Fill all the details to book the ticket')
    }
    else {
      const ticket = new jsPDF();
      // Add Logo (with error handling)
      try {
        ticket.addImage('/logo-TN.png', 'PNG', 10, 10, 16, 13); // Adjusted path for public folder
      } catch (imgError) {
        console.warn('Logo image failed to load:', imgError);
        ticket.text('[Logo Placeholder]', 10, 15); // Fallback text
      }

      // Header
      ticket.setFont('helvetica', 'bold');
      ticket.setFontSize(20);
      ticket.setTextColor(0, 102, 204);
      ticket.text('Travel Nest Confirmed Ticket', 55, 20,);

      // Subheader
      ticket.setFontSize(12);
      ticket.setTextColor(0, 0, 0);
      ticket.setFont('helvetica', 'normal');
      ticket.text('Thank you for booking with Travel Nest!', 68, 30);

      //passenger
      ticket.setFontSize(10);
      ticket.text("Passenger Details", 88, 40)
      ticket.rect(15, 43, 180, 49, 'S');
      ticket.text(`Name: ${pname}`, 20, 49)
      ticket.text(`Age: ${age}`, 88, 49)
      ticket.text(`Mob: ${mob}`, 150, 49)
      ticket.rect(15, 52, 180, 0.1, 'S');
      ticket.text(`Email: ${mail}`, 20, 58)
      ticket.text(`Date: ${date}`, 88, 58)
      ticket.rect(15, 61, 180, 0.1, 'S');
      ticket.text(`Boarding Point: ${source}`, 20, 68)
      ticket.text('---->', 96, 68)
      ticket.text(`Dropping Point: ${destination}`, 150, 68)
      ticket.rect(15, 72, 180, 0.11, 'S');

      //Note
      ticket.setFontSize(5);
      ticket.text("Note:", 15.2, 80)
      ticket.text("1: This operator accepts mTicket, you need not carry a print out", 15.2, 82.5)
      ticket.text("2: Carry your Orhinal Documents for Verification", 15.2, 84.6)
      ticket.text("3: Travel Nest is an online ticketing platform. It does not operate busservices of its own.", 15.2, 86.8)
      ticket.text("4: Change of bus: In case the bus operator changes the type of bus due tosome reason, redBus will refund the differential amount to the customerupon being intimated by the customers in 24 hours of the journey.", 15.2, 88.9)
      
      

      // Footer
      const finalY = ticket.lastAutoTable?.finalY || 40;
      ticket.setFontSize(10);
      ticket.setTextColor(100, 100, 100);
      ticket.text('Travel Nest - Your Journey, Our Care', 10, finalY + 245);
      ticket.text('Contact: support@travelnest.com | +91 123 456 7890', 10, finalY + 250);

      // Border
      ticket.setDrawColor(0, 102, 204);
      ticket.setLineWidth(0.5);
      ticket.rect(5, 5, 200, 287, 'S');


      ticket.save("Travel-Nest.pdf")
    }
  }

  return (
    <>
      
      <div className="main">
        
        <div className="head">
          <img src="./logo-TN.png" alt="logo" id='logo' />
          <h1 className="tite">Travel Nest</h1>
          
        </div>

        <div className="ticketbook" id='tb1'>
          <h2 className="secondhead">Book your ride here</h2>

          <div className="form">
            
            <div className="journey">
              
              <select name="" id="fromcity" value={source} onChange={(event)=>{setSource(event.target.value)}} >
                <option value="">From City</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Vizag">Vizag</option>
                <option value="Chennai">Chennai</option>
                <option value="Bhubaneshwar">Bhubaneshwar</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Pune">Pune</option>
              </select>

              <img src="./swap.png" alt="" onClick={swapstat} id='swa' />
              
              <select name="" id="tocity" value={destination} onChange={(event)=>{setDestination(event.target.value)}} >
                <option value="">Destination City</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Vizag">Vizag</option>
                <option value="Chennai">Chennai</option>
                <option value="Bhubaneshwar">Bhubaneshwar</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            <input type="date" id='dat' value={date} onChange={(event)=>{setDate(event.target.value)}} min={new Date().toISOString().split('T')[0]} />

            <div className="Pdetails">
              <input className='detal' type="text" placeholder='Enter Passanger Name' value={pname} onChange={(event)=>{setPname(event.target.value)}} />
              <input className='detal' type="tel" placeholder='Enter Age' value={age} onChange={(event)=>{setAge(event.target.value)}} />
            </div>

            <input type="tel" className='millic' placeholder='Contact Number' value={mob} onChange={(event)=>{setMob(event.target.value)}} />

            <input type="email" className='millic' placeholder='Enter Email' value={mail} onChange={(event)=>{setMail(event.target.value)}} />

            <button className="btn" onClick={download} >Download Ticket</button>

          </div>
        </div>
      
      </div>

    </>
  )
}

export default App
