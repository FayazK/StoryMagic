import React, { useEffect, useState } from 'react';

/**
 * Component to display the database status
 * This is mainly for development purposes, but could be used in a settings page
 */
const DatabaseStatus = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDatabaseStatus = async () => {
      try {
        setIsLoading(true);
        // Call the API to check if the database is initialized
        const initialized = await window.api.database.isInitialized();
        setIsInitialized(initialized);
      } catch (error) {
        console.error('Failed to check database status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkDatabaseStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        <span>Checking database status...</span>
      </div>
    );
  }

  return (
    <div className="text-sm">
      <span className="font-medium">Database Status:</span>{' '}
      {isInitialized ? (
        <span className="text-green-600">Initialized</span>
      ) : (
        <span className="text-red-600">Not Initialized</span>
      )}
    </div>
  );
};

export default DatabaseStatus;
