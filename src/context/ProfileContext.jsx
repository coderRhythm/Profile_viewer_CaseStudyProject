import { createContext, useContext, useState } from 'react';
import { profiles as initialProfiles } from '../data/profiles';

// Create context
const ProfileContext = createContext();

// Profile provider component
export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Add a new profile
  const addProfile = (profileData) => {
    setLoading(true);
    try {
      const newProfile = {
        id: Date.now().toString(),
        name: profileData.name,
        image: profileData.image,
        description: profileData.description,
        location: {
          address: profileData.address,
          lat: profileData.lat,
          lng: profileData.lng,
        },
        details: profileData.details,
      };
      
      setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing profile
  const updateProfile = (id, profileData) => {
    setLoading(true);
    try {
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === id
            ? {
                ...profile,
                name: profileData.name,
                image: profileData.image,
                description: profileData.description,
                location: {
                  address: profileData.address,
                  lat: profileData.lat,
                  lng: profileData.lng,
                },
                details: profileData.details,
              }
            : profile
        )
      );

      if (selectedProfile?.id === id) {
        setSelectedProfile({
          ...selectedProfile,
          name: profileData.name,
          image: profileData.image,
          description: profileData.description,
          location: {
            address: profileData.address,
            lat: profileData.lat,
            lng: profileData.lng,
          },
          details: profileData.details,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete a profile
  const deleteProfile = (id) => {
    setLoading(true);
    try {
      setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));
      
      if (selectedProfile?.id === id) {
        setSelectedProfile(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    profiles,
    selectedProfile,
    setSelectedProfile,
    addProfile,
    updateProfile,
    deleteProfile,
    loading,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

// Custom hook to use the profile context
export function useProfiles() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
} 