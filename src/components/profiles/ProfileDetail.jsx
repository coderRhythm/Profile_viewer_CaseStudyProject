import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProfiles } from '../../context/ProfileContext';
import MapComponent from '../map/MapComponent';
import React from 'react';

// Custom styles
const styles = {
  container: {
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
    }
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  description: {
    color: '#718096',
    marginTop: '8px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
  primaryButton: {
    backgroundColor: '#3182CE',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: '500',
  },
  dangerButton: {
    backgroundColor: '#E53E3E',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
    marginBottom: '40px',
    '@media (min-width: 992px)': {
      gridTemplateColumns: '2fr 3fr',
    }
  },
  imageContainer: {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    '@media (max-width: 768px)': {
      height: '250px',
    }
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '24px',
    alignItems: 'flex-start',
  },
  linkText: {
    color: '#3182CE',
    textDecoration: 'none',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: '8px',
  },
  badgeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  badge: {
    backgroundColor: '#319795',
    color: 'white',
    borderRadius: '9999px',
    padding: '4px 12px',
    fontSize: '14px',
  },
  locationContainer: {
    marginBottom: '24px',
  },
  subheading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  mapContainer: {
    borderRadius: '6px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    height: '400px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#E2E8F0',
    margin: '24px 0',
  },
  backButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  backButton: {
    backgroundColor: '#319795',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    borderTop: '4px solid #3182CE',
    animation: 'spin 1s linear infinite',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
  },
  notFound: {
    textAlign: 'center',
    padding: '40px 24px',
  },
  notFoundHeading: {
    fontSize: '32px',
    fontWeight: 'bold',
    display: 'inline-block',
  },
  notFoundText: {
    margin: '12px 0 24px 0',
  }
};

// Add the spinner animation
const addSpinAnimation = () => {
  if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @media (min-width: 768px) {
        .header { flex-direction: row; }
      }
      @media (min-width: 992px) {
        .grid { grid-template-columns: 2fr 3fr; }
      }
      @media (max-width: 768px) {
        .image { height: 250px; }
      }
    `;
    document.head.appendChild(styleSheet);
  }
};

function ProfileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles, deleteProfile, loading } = useProfiles();
  
  // Add animation styles
  if (typeof window !== 'undefined') {
    addSpinAnimation();
  }
  
  // Find the profile based on the URL parameter
  const profile = profiles.find(p => p.id === id);
  
  // Display loading spinner while fetching data
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner"></div>
      </div>
    );
  }
  
  // Handle profile not found
  if (!profile) {
    return (
      <div className="container text-center py-5">
        <h1 className="mb-3">Profile Not Found</h1>
        <p className="mb-4">
          The profile you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Back
        </Link>
      </div>
    );
  }

  // Handle profile deletion
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(profile.id);
      alert(`${profile.name}'s profile has been removed.`);
      navigate('/');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h1 className="mb-2">{profile.name}</h1>
          <p className="text-gray-600">{profile.description}</p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <Link to={`/admin/edit/${profile.id}`} className="btn btn-primary">
            Edit Profile
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
          <div className="card mb-4">
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="w-100"
              style={{ 
                height: '350px', 
                objectFit: 'cover',
                objectPosition: 'center',
                imageRendering: 'high-quality',
                width: '100%'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/350x250?text=No+Image';
              }}
            />
          </div>
          
          <div className="card card-body">
            {profile.details?.email && (
              <div className="mb-2">
                <span className="fw-bold me-2">Email:</span>
                <a href={`mailto:${profile.details.email}`} className="text-primary">
                  {profile.details.email}
                </a>
              </div>
            )}
            
            {profile.details?.phone && (
              <div className="mb-2">
                <span className="fw-bold me-2">Phone:</span>
                <span>{profile.details.phone}</span>
              </div>
            )}
            
            {profile.details?.interests && profile.details.interests.length > 0 && (
              <div>
                <div className="fw-bold mb-2">Interests:</div>
                <div className="d-flex flex-wrap gap-2">
                  {profile.details.interests.map((interest, index) => (
                    <span key={index} className="badge bg-info text-dark">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="col-12 col-lg-8">
          <div className="card card-body mb-4">
            <h3 className="mb-3">Location</h3>
            <p className="mb-3">📍 {profile.location.address}</p>
            <div style={{ height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
              <MapComponent location={profile.location} height="400px" zoom={14} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <Link to="/" className="btn btn-lg btn-secondary">
          ← Back to All Profiles
        </Link>
      </div>
    </div>
  );
}

export default ProfileDetail; 