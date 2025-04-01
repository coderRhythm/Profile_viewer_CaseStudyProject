import { Link } from 'react-router-dom';
import { useProfiles } from '../../context/ProfileContext';
import React from 'react';

// Custom styles for the ProfileCard
const styles = {
  card: {
    border: 'none',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    backgroundColor: 'white',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '24px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  cardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)'
  },
  imageContainer: {
    position: 'relative',
    height: '240px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  imageHover: {
    transform: 'scale(1.05)'
  },
  contentBox: {
    padding: '24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#1a202c',
    letterSpacing: '-0.5px',
    lineHeight: '1.3'
  },
  description: {
    color: '#4a5568',
    marginBottom: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.6',
    fontSize: '15px'
  },
  address: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: 'auto'
  },
  primaryButton: {
    backgroundColor: '#3182CE',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 2px 4px rgba(49, 130, 206, 0.2)'
  },
  primaryButtonHover: {
    backgroundColor: '#2C5282',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(49, 130, 206, 0.3)'
  },
  outlineButton: {
    backgroundColor: 'transparent',
    color: '#3182CE',
    border: '2px solid #3182CE',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },
  outlineButtonHover: {
    backgroundColor: 'rgba(49, 130, 206, 0.1)',
    transform: 'translateY(-2px)'
  },
  loadingButton: {
    opacity: 0.7,
    position: 'relative',
    cursor: 'not-allowed'
  },
  loadingDot: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: 'white',
    animation: 'pulse 1s infinite'
  },
  badge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#2D3748',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(4px)'
  }
};

// Add the pulse animation
const addPulseAnimation = () => {
  if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes pulse {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(styleSheet);
  }
};

function ProfileCard({ profile }) {
  const { setSelectedProfile, loading } = useProfiles();
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Add animation styles for the loading indicator
  if (typeof window !== 'undefined') {
    addPulseAnimation();
  }

  // Function to get a random tech leader image based on gender
  const getRandomTechImage = (gender) => {
    const maleImages = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=300&fit=crop'
    ];

    const femaleImages = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&h=300&fit=crop',
      'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=500&h=300&fit=crop'
    ];

    const images = gender === 'female' ? femaleImages : maleImages;
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div 
      className="card fade-in"
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img 
          src={profile.image || getRandomTechImage(profile.gender)} 
          alt={profile.name} 
          style={{
            ...styles.image,
            ...(isHovered ? styles.imageHover : {})
          }}
          onError={(e) => {
            e.target.src = getRandomTechImage(profile.gender);
          }}
        />
        <div style={styles.badge}>
          {profile.gender === 'female' ? '👩‍💻' : '👨‍💻'} Tech Leader
        </div>
      </div>
      
      <div style={styles.contentBox}>
        <h3 style={styles.title}>{profile.name}</h3>
        <p style={styles.description}>
          {profile.description}
        </p>
        
        <p style={styles.address}>
          <span>📍</span> {profile.location.address}
        </p>
        
        <div style={styles.buttonContainer}>
          <button 
            style={{
              ...styles.primaryButton,
              ...(isHovered ? styles.primaryButtonHover : {}),
              ...(loading ? styles.loadingButton : {})
            }}
            onClick={() => setSelectedProfile(profile)}
            disabled={loading}
          >
            <span>🗺️</span> View on Map
            {loading && (
              <span style={styles.loadingDot}></span>
            )}
          </button>
          
          <Link 
            to={`/profile/${profile.id}`}
            style={{
              ...styles.outlineButton,
              ...(isHovered ? styles.outlineButtonHover : {})
            }}
          >
            <span>👤</span> Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard; 