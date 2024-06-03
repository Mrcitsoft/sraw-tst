import React, { useEffect, useState } from 'react';

const AddressComponent = ({ address, onAddressSelect }) => {
  const [localAddress, setLocalAddress] = useState(address);

  useEffect(() => {
    setLocalAddress(address);
  }, [address]);

  const handleChange = (e) => {
    const newAddress = e.target.value;
    setLocalAddress(newAddress);
    onAddressSelect(newAddress);
  };

  return (
    <div className="form-group">
      <label htmlFor="address-input">Address</label>
      <input
        type="text"
        id="address-input"
        name="address"
        value={localAddress}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddressComponent;
