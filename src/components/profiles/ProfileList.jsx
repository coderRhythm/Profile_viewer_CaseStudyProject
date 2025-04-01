import { useState, useEffect } from 'react';
import { useProfiles } from '../../context/ProfileContext';
import ProfileCard from './ProfileCard';

const styles = {
  container: {
    margin: '0 0 24px 0'
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px'
  },
  searchInputWrapper: {
    position: 'relative',
    flex: 1
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  },
  searchInput: {
    width: '100%',
    padding: '10px 12px 10px 36px',
    borderRadius: '4px',
    border: '1px solid #E2E8F0',
    fontSize: '16px'
  },
  filterSelect: {
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1px solid #E2E8F0',
    fontSize: '16px',
    width: '100%'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '40px 0',
    minHeight: '200px'
  },
  loadingSpinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeft: '4px solid #3182CE',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite'
  },
  noResultsMessage: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#718096',
    margin: '40px 0'
  },
  profileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  }
};

const addSpinnerAnimation = () => {
  if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
  }
};

function ProfileList() {
  const { profiles, loading } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [isDesktop, setIsDesktop] = useState(false);

  if (typeof window !== 'undefined') {
    addSpinnerAnimation();
  }

  // Set up media query for responsive design
  useEffect(() => {
    const checkMediaQuery = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };

    checkMediaQuery();

    const mediaQueryList = window.matchMedia('(min-width: 768px)');
    mediaQueryList.addEventListener('change', checkMediaQuery);

    return () => {
      mediaQueryList.removeEventListener('change', checkMediaQuery);
    };
  }, []);

  const filteredProfiles = profiles.filter((profile) => {
    const searchLower = searchTerm.toLowerCase();
    
    switch (filterBy) {
      case 'name':
        return profile.name.toLowerCase().includes(searchLower);
      case 'location':
        return profile.location.address.toLowerCase().includes(searchLower);
      case 'description':
        return profile.description.toLowerCase().includes(searchLower);
      default:
        return true;
    }
  });

  return (
    <div className="container mb-5">
      <h2 className="mb-4">Profiles</h2>
      
      <div className={`d-flex ${isDesktop ? 'flex-row' : 'flex-column'} gap-3 mb-4`}>
        <div className="position-relative flex-grow-1">
          <span className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            🔍
          </span>
          <input
            className="form-control"
            style={{ paddingLeft: '36px' }}
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="form-control"
          style={{ width: isDesktop ? '200px' : '100%' }}
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="name">By Name</option>
          <option value="location">By Location</option>
          <option value="description">By Description</option>
        </select>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center my-5" style={{ minHeight: '200px' }}>
          <div className="spinner"></div>
        </div>
      ) : filteredProfiles.length === 0 ? (
        <p className="text-center my-5" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-gray-600)' }}>
          No profiles match your search criteria.
        </p>
      ) : (
        <div className="row g-2">
          {filteredProfiles.map((profile) => (
            <div key={profile.id} className="col-12 col-md-6 col-lg-4 mb-3">
              <ProfileCard profile={profile} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileList; 