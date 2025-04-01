import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfiles } from '../../context/ProfileContext';
import MapComponent from '../map/MapComponent';
import React from 'react';

const addStyleSheet = () => {
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = `
      .profile-form-container {
        padding: 28px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .profile-form-heading {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 30px;
        color: #1A365D;
        border-bottom: 3px solid #2B6CB0;
        padding-bottom: 12px;
      }
      
      .profile-form {
        width: 100%;
      }
      
      .profile-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 36px;
        margin-bottom: 40px;
      }
      
      @media (min-width: 992px) {
        .profile-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      
      .profile-section {
        display: flex;
        flex-direction: column;
        gap: 22px;
        background-color: #F7FAFC;
        padding: 28px;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid #E2E8F0;
      }
      
      .form-control {
        margin-bottom: 20px;
      }
      
      .form-label {
        display: block;
        margin-bottom: 10px;
        font-weight: 600;
        color: #2D3748;
        font-size: 16px;
      }
      
      .required {
        color: #E53E3E;
        margin-left: 3px;
      }
      
      .input-field {
        width: 100%;
        padding: 12px 16px;
        font-size: 16px;
        border: 2px solid #CBD5E0;
        border-radius: 8px;
        outline: none;
        transition: all 0.3s ease;
        background-color: #FFFFFF;
        color: #2D3748;
      }
      
      .input-field::placeholder {
        color: #A0AEC0;
      }
      
      .input-field:focus {
        border-color: #3182CE !important;
        box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2) !important;
      }
      
      .input-error {
        border-color: #E53E3E;
      }
      
      .textarea-field {
        min-height: 120px;
        resize: vertical;
      }
      
      .error-message {
        color: #E53E3E;
        font-size: 14px;
        margin-top: 6px;
        font-weight: 500;
      }
      
      .divider {
        height: 2px;
        background-color: #EDF2F7;
        margin: 20px 0;
        width: 100%;
      }
      
      .flex {
        display: flex;
      }
      
      .input-group {
        display: flex;
        position: relative;
        width: 100%;
      }
      
      .input-with-button {
        padding-right: 90px;
      }
      
      .input-right-element {
        position: absolute;
        right: 4px;
        top: 4px;
        height: calc(100% - 8px);
        display: flex;
        align-items: center;
      }
      
      .btn {
        display: inline-block;
        font-weight: 600;
        text-align: center;
        padding: 12px 20px;
        font-size: 16px;
        line-height: 1.5;
        border-radius: 8px;
        transition: all 0.3s ease;
        cursor: pointer;
        letter-spacing: 0.3px;
        border: none;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
      }
      
      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
      }
      
      .btn:active {
        transform: translateY(0);
      }
      
      .btn-primary {
        background-color: #3182CE;
        color: white;
      }
      
      .btn-primary:hover {
        background-color: #2B6CB0;
      }
      
      .btn-small {
        padding: 8px 16px;
        font-size: 14px;
        border-radius: 6px;
      }
      
      .btn-outline {
        background-color: transparent;
        color: #3182CE;
        border: 2px solid #3182CE;
      }
      
      .btn-outline:hover {
        background-color: rgba(49, 130, 206, 0.1);
      }
      
      .btn-teal {
        background-color: #38B2AC;
        color: white;
      }
      
      .btn-teal:hover {
        background-color: #319795;
      }
      
      .btn-outline-red {
        background-color: transparent;
        color: #E53E3E;
        border: 2px solid #E53E3E;
      }
      
      .btn-outline-red:hover {
        background-color: rgba(229, 62, 62, 0.1);
      }
      
      .interest-tag {
        display: inline-flex;
        align-items: center;
        background-color: #E6FFFA;
        color: #285E61;
        border: 1px solid #81E6D9;
        border-radius: 30px;
        padding: 6px 14px;
        margin-right: 8px;
        margin-bottom: 8px;
        font-size: 14px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .interest-tag:hover {
        background-color: #B2F5EA;
      }
      
      .flex-wrap {
        display: flex;
        flex-wrap: wrap;
        margin-top: 12px;
      }
      
      .gap-4 {
        gap: 20px;
      }
      
      .map-container {
        height: 320px;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 16px;
        border: 2px solid #E2E8F0;
      }
      
      .tip-box {
        font-size: 14px;
        color: #4A5568;
        margin-top: 20px;
        background-color: #EBF8FF;
        padding: 16px;
        border-radius: 8px;
        border-left: 5px solid #3182CE;
      }
      
      .button-container {
        display: flex;
        justify-content: space-between;
        margin-top: 32px;
        padding: 24px;
        background-color: #F7FAFC;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid #E2E8F0;
      }
      
      .loading-button {
        opacity: 0.7;
        position: relative;
      }
      
      .loading-dot {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 13px;
        margin-left: 10px;
      }
      
      .loading-dot div {
        position: absolute;
        top: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: white;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      
      .loading-dot div:nth-child(1) {
        left: 8px;
        animation: loading-dot1 0.6s infinite;
      }
      
      .loading-dot div:nth-child(2) {
        left: 8px;
        animation: loading-dot2 0.6s infinite;
      }
      
      .loading-dot div:nth-child(3) {
        left: 32px;
        animation: loading-dot2 0.6s infinite;
      }
      
      .loading-dot div:nth-child(4) {
        left: 56px;
        animation: loading-dot3 0.6s infinite;
      }
      
      @keyframes loading-dot1 {
        0% { transform: scale(0); }
        100% { transform: scale(1); }
      }
      
      @keyframes loading-dot2 {
        0% { transform: translate(0, 0); }
        100% { transform: translate(24px, 0); }
      }
      
      @keyframes loading-dot3 {
        0% { transform: scale(1); }
        100% { transform: scale(0); }
      }
    `;
    document.head.appendChild(styleElement);
  }
};

const initialFormState = {
  name: '',
  image: '',
  description: '',
  address: '',
  lat: 0,
  lng: 0,
  details: {
    email: '',
    phone: '',
    interests: []
  }
};

function ProfileForm() {
  const { id } = useParams();
  const { profiles, addProfile, updateProfile, loading } = useProfiles();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [previewMap, setPreviewMap] = useState(false);
  const [interestInput, setInterestInput] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    addStyleSheet();
  }, []);
  
  useEffect(() => {
    if (id) {
      const profileToEdit = profiles.find(p => p.id === id);
      if (profileToEdit) {
        setFormData({
          id: profileToEdit.id,
          name: profileToEdit.name,
          image: profileToEdit.image,
          description: profileToEdit.description,
          address: profileToEdit.location.address,
          lat: profileToEdit.location.lat,
          lng: profileToEdit.location.lng,
          details: {
            email: profileToEdit.details?.email || '',
            phone: profileToEdit.details?.phone || '',
            interests: profileToEdit.details?.interests || []
          }
        });
        setPreviewMap(true);
      }
    }
  }, [id, profiles]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.lat) newErrors.lat = 'Latitude is required';
    if (!formData.lng) newErrors.lng = 'Longitude is required';
    
    if (formData.details?.email && !/^\S+@\S+\.\S+$/.test(formData.details.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email' || name === 'phone') {
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const addInterest = () => {
    if (interestInput.trim()) {
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          interests: [...(prev.details?.interests || []), interestInput.trim()]
        }
      }));
      setInterestInput('');
    }
  };

  const removeInterest = (index) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        interests: prev.details?.interests?.filter((_, i) => i !== index) || []
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        if (id) {
          updateProfile(id, formData);
          alert(`${formData.name}'s profile has been updated.`);
        } else {
          addProfile(formData);
          alert(`${formData.name}'s profile has been added.`);
        }
        navigate('/');
      } catch (error) {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  const FormControl = ({ label, error, required, children }) => (
    <div className="form-control">
      {label && (
        <label className="form-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      {children}
      {error && <div className="error-message">{error}</div>}
    </div>
  );

  return (
    <div className="profile-form-container">
      <h1 className="profile-form-heading">{id ? 'Edit Profile' : 'Add New Profile'}</h1>
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-grid">
          <div className="profile-section">
            <FormControl label="Name" error={errors.name} required>
              <input 
                className={`input-field ${errors.name ? 'input-error' : ''}`}
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </FormControl>

            <FormControl label="Profile Image URL" error={errors.image} required>
              <input 
                className={`input-field ${errors.image ? 'input-error' : ''}`}
                name="image" 
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </FormControl>

            <FormControl label="Description" error={errors.description} required>
              <textarea 
                className={`input-field textarea-field ${errors.description ? 'input-error' : ''}`} 
                name="description" 
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a brief description"
                rows={3}
              />
            </FormControl>

            <div className="divider"></div>

            <FormControl label="Email" error={errors.email}>
              <input 
                className={`input-field ${errors.email ? 'input-error' : ''}`}
                name="email" 
                value={formData.details?.email}
                onChange={handleChange}
                placeholder="Enter email address"
                type="email"
              />
            </FormControl>

            <FormControl label="Phone">
              <input 
                className="input-field"
                name="phone" 
                value={formData.details?.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </FormControl>

            <FormControl label="Interests">
              <div className="input-group">
                <input 
                  className="input-field input-with-button"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="Add an interest"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addInterest();
                    }
                  }}
                />
                <div className="input-right-element">
                  <button 
                    type="button"
                    className="btn btn-primary btn-small"
                    onClick={addInterest}
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {formData.details?.interests && formData.details.interests.length > 0 && (
                <div className="flex-wrap">
                  {formData.details.interests.map((interest, index) => (
                    <button 
                      key={index} 
                      type="button"
                      className="interest-tag"
                      onClick={() => removeInterest(index)}
                    >
                      {interest} ×
                    </button>
                  ))}
                </div>
              )}
            </FormControl>
          </div>

          <div className="profile-section">
            <FormControl label="Address" error={errors.address} required>
              <input 
                className={`input-field ${errors.address ? 'input-error' : ''}`}
                name="address" 
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
              />
            </FormControl>

            <div className="flex gap-4">
              <FormControl label="Latitude" error={errors.lat} required>
                <input 
                  className={`input-field ${errors.lat ? 'input-error' : ''}`}
                  name="lat" 
                  value={formData.lat || ''}
                  onChange={handleNumberChange}
                  placeholder="Enter latitude"
                  type="number"
                  step="any"
                />
              </FormControl>

              <FormControl label="Longitude" error={errors.lng} required>
                <input 
                  className={`input-field ${errors.lng ? 'input-error' : ''}`}
                  name="lng" 
                  value={formData.lng || ''}
                  onChange={handleNumberChange}
                  placeholder="Enter longitude"
                  type="number"
                  step="any"
                />
              </FormControl>
            </div>

            <button 
              type="button"
              onClick={() => setPreviewMap(!previewMap)} 
              className={`btn ${previewMap ? 'btn-outline-red' : 'btn-teal'}`}
            >
              {previewMap ? "Hide Map Preview" : "Show Map Preview"}
            </button>

            {previewMap && formData.lat && formData.lng && (
              <div className="map-container">
                <MapComponent 
                  location={{
                    address: formData.address,
                    lat: formData.lat,
                    lng: formData.lng
                  }}
                  height="320px"
                />
              </div>
            )}

            <p className="tip-box">
              <strong>Tip:</strong> You can find latitude and longitude coordinates by searching for the address on Google Maps, 
              right-clicking on the location, and selecting "What's here?".
            </p>
          </div>
        </div>

        <div className="button-container">
          <button 
            type="button"
            onClick={() => navigate('/')} 
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={`btn btn-primary ${loading ? 'loading-button' : ''}`}
            disabled={loading}
          >
            {id ? 'Update Profile' : 'Create Profile'}
            {loading && (
              <span className="loading-dot">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm; 