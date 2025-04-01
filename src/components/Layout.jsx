import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import MapComponent from './map/MapComponent';
import { useProfiles } from '../context/ProfileContext';

// Custom styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px'
  },
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '12px 0'
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#333',
    cursor: 'pointer'
  },
  flexGap: {
    display: 'flex',
    gap: '12px'
  },
  buttonPrimary: {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block'
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    color: '#2C7A7B',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block'
  },
  mainContent: {
    padding: '32px 0'
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '400px',
    backgroundColor: 'white',
    boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    overflow: 'hidden'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999
  },
  drawerHeader: {
    padding: '16px',
    borderBottom: '1px solid #eaeaea'
  },
  drawerTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: 0
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  },
  mapContainer: {
    height: 'calc(100vh - 200px)'
  },
  profileInfo: {
    padding: '16px'
  },
  profileName: {
    fontWeight: 'bold',
    margin: '0 0 4px 0'
  },
  profileDescription: {
    color: '#666',
    fontSize: '0.9rem',
    margin: '0 0 16px 0'
  },
  divider: {
    height: '1px',
    backgroundColor: '#eaeaea',
    margin: '12px 0'
  },
  profileAddress: {
    margin: 0
  }
};

function Layout() {
  const { selectedProfile, setSelectedProfile } = useProfiles();
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      {/* Navigation Header */}
      <div style={styles.nav}>
        <div style={styles.container}>
          <div style={styles.flexBetween}>
            <Link to="/" style={styles.heading}>
              Profile Explorer
            </Link>
            
            <div style={styles.flexGap}>
              <Link to="/" style={styles.buttonGhost}>
                Home
              </Link>
              <Link to="/admin/new" style={styles.buttonPrimary}>
                Add Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.mainContent}>
          <Outlet />
        </div>
      </div>
      
      {/* Custom Map Drawer */}
      {selectedProfile && (
        <>
          {/* Overlay */}
          <div 
            style={styles.overlay} 
            onClick={() => setSelectedProfile(null)}
          />
          
          {/* Drawer */}
          <div style={styles.drawer}>
            {/* Drawer Header */}
            <div style={styles.drawerHeader}>
              <div style={styles.flexBetween}>
                <h3 style={styles.drawerTitle}>{selectedProfile.name}'s Location</h3>
                <button 
                  style={styles.closeButton}
                  onClick={() => setSelectedProfile(null)}
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Drawer Body */}
            <div>
              <div style={styles.mapContainer}>
                <MapComponent location={selectedProfile.location} height="100%" />
              </div>
              
              <div style={styles.profileInfo}>
                <p style={styles.profileName}>{selectedProfile.name}</p>
                <p style={styles.profileDescription}>{selectedProfile.description}</p>
                <div style={styles.divider}></div>
                <p style={styles.profileAddress}>📍 {selectedProfile.location.address}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Layout; 