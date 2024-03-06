import React from 'react';

export default function Home() {
  return (
    <div className="container">
      <div className='py-4'>
        <h2>Vítejte v bankovním systému</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Informace o bankovním účtu</h5>
            <p className="card-text">Číslo účtu: 123456789</p>
            <p className="card-text">Zůstatek: $1000</p>
            <p className="card-text">Typ účtu: Běžný účet</p>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Informace o klientovi</h5>
            <p className="card-text">Jméno: John Doe</p>
            <p className="card-text">Email: john@example.com</p>
            <p className="card-text">Telefon: 123-456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
}