import React, { useState } from 'react';


const Transport = () => {
  const transportData = [
    {
      state: 'Punjab',
      routes: [
        { destination: 'Kandla Port', price: '155-160' },
        { destination: 'Mundra Port', price: '170-175' },
      ],
    },
    {
      state: 'Haryana',
      routes: [
        { destination: 'Tohana/Sirsa - Kandla Port', price: '150-155' },
        { destination: 'Tohana/Sirsa - Mundra Port', price: '165-170' },
        { destination: 'Sonipat/Karnal - Mundra Port', price: '165-170' },
        { destination: 'Cheeka - Kandla Port', price: '150-155' },
        { destination: 'Cheeka - Mundra Port', price: '165-170' },
      ],
    },
    {
      state: 'Rajasthan',
      routes: [
        { destination: 'Bundi - Kandla Port', price: '130-135' },
        { destination: 'Bundi - Mundra Port', price: '155-160' },
        { destination: 'Kota - Kandla Port', price: '130-135' },
        { destination: 'Kota - Mundra Port', price: '155-160' },
      ],
    },
    {
      state: 'Madhya Pradesh',
      routes: [
        { destination: 'Mandideep - Kandla Port', price: '175-180' },
        { destination: 'Mandideep - Mundra Port', price: '200-205' },
        { destination: 'Mandideep - Nhava Sheva', price: '225-230' },
        { destination: 'Pipariya - Kandla Port', price: '200-205' },
        { destination: 'Pipariya - Mundra Port', price: '230-235' },
        { destination: 'Pipariya - Nhava Sheva', price: '260-265' },
      ],
    },
    {
      state: 'Uttar Pradesh',
      routes: [
        { destination: 'Kandla Port', price: '175-180' },
        { destination: 'Mundra Port', price: '195-200' },
        { destination: 'Nhava Sheva', price: '265-270' },
      ],
    },
    {
      state: 'Gujarat',
      routes: [
        { destination: 'Kandla Port', price: '105-110' },
        { destination: 'Mundra Port', price: '110-115' },
      ],
    },
    {
      state: 'West Bengal',
      routes: [
        { destination: 'Mundra Port', price: '400-405' },
      ],
    },
  ];

  const [selectedState, setSelectedState] = useState(transportData[0].state);

  const handleStateClick = (state) => {
    console.log('Button clicked:', state);
    setSelectedState(state);
  };

  const selectedStateData = transportData.find((data) => data.state === selectedState);

  return (
    <div className="transport-wrapper">
      <h1 className="transport-title">Transportation Pricing (in Quintals)</h1>
      <div className="state-buttons">
        {transportData.map((stateData) => (
          <button
            key={stateData.state}
            onClick={() => handleStateClick(stateData.state)}
            className={`state-btn ${selectedState === stateData.state ? 'active' : ''}`}
          >
            {stateData.state}
          </button>
        ))}
      </div>
      {selectedStateData && (
        <div className="transport-details">
          <h2 className="state-name">{selectedStateData.state}</h2>
          <table className="transport-table">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Price (Qtls)</th>
              </tr>
            </thead>
            <tbody>
              {selectedStateData.routes.map((route, index) => (
                <tr key={index}>
                  <td>{route.destination}</td>
                  <td>{route.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transport;