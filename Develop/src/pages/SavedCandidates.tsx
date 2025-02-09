import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <div key={candidate.id}>
            <img src={candidate.avatar_url} alt={candidate.name} width="100" />
            <h2>{candidate.name || 'N/A'}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location || 'Unknown'}</p>
            <p>Email: {candidate.email || 'Not Provided'}</p>
            <p>Company: {candidate.company || 'Not Available'}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          </div>
        ))
      ) : (
        <p>No candidates have been accepted.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
