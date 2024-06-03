import React, { useState } from 'react';
import './Feed.css';
import MapComponent from './MapComponent'; // Import your map component
import AddressComponent from './AddressComponent'; // Import your address detection component

const Feed = () => {
  const [formData, setFormData] = useState({
    description: '',
    scamType: '',
    location: { lat: null, lng: null },
    address: '',
    multimedia: [],
    anonymous: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLocationSelect = (location) => {
    setFormData({ ...formData, location });

    // Automatically fetch and set the address based on the location
    // This is a placeholder; you would replace this with an actual geocoding API call
    const detectedAddress = `Detected address for coordinates: (${location.lat}, ${location.lng})`;
    setFormData({ ...formData, location, address: detectedAddress });
  };

  const handleAddressSelect = (address) => {
    setFormData({ ...formData, address });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.scamType || !formData.location.lat || !formData.location.lng || !formData.address) {
      alert('Please fill out all required fields.');
      return;
    }

    // Example of submission with fetch (assumes backend endpoint exists)
    // fetch('/api/report-scam', {
    //   method: 'POST',
    //   body: formDataToSubmit,
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));

    console.log('Form Data Submitted:', formData);
  };

  const handleMultimediaEdit = (index, updatedFile) => {
    const updatedMultimedia = [...formData.multimedia];
    updatedMultimedia[index] = updatedFile;
    setFormData({ ...formData, multimedia: updatedMultimedia });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Report a Scam</h2>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="scamType">Scam Type</label>
          <select
            id="scamType"
            name="scamType"
            value={formData.scamType}
            onChange={handleChange}
            required
          >
            <option value="">Select Scam Type</option>
            <option value="phishing">Phishing</option>
            <option value="identity-theft">Identity Theft</option>
            <option value="financial">Financial</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <MapComponent onLocationSelect={handleLocationSelect} />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <AddressComponent address={formData.address} onAddressSelect={handleAddressSelect} />
        </div>

        <div className="form-group">
          <label htmlFor="multimedia">Upload Photos or Videos</label>
          <input
            type="file"
            id="multimedia"
            name="multimedia"
            accept="image/*,video/*"
            multiple
            onChange={handleChange}
          />
          <div className="multimedia-preview">
            {formData.multimedia.map((file, index) => (
              <div key={index} className="multimedia-item">
                {file.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(file)} alt="uploaded" />
                ) : (
                  <video src={URL.createObjectURL(file)} controls />
                )}
                <button type="button" onClick={() => handleMultimediaEdit(index, file)}>Edit</button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="anonymous">
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
            />
            Submit Anonymously
          </label>
        </div>

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default Feed;
