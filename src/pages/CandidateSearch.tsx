import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    return JSON.parse(localStorage.getItem('savedCandidates') || '[]');
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const users = await searchGithub();
    if (users.length > 0) {
      const user = await searchGithubUser(users[0].login);
      setCandidates(users.slice(1));
      setCurrentCandidate(user);
    } else {
      setCurrentCandidate(null);
    }
  };

  const handleSaveCandidate = () => {
    if (currentCandidate) {
      const updatedSaved = [...savedCandidates, currentCandidate];
      setSavedCandidates(updatedSaved);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSaved));
    }
    getNextCandidate();
  };

  const getNextCandidate = async () => {
    if (candidates.length > 0) {
      const user = await searchGithubUser(candidates[0].login);
      setCandidates(candidates.slice(1));
      setCurrentCandidate(user);
    } else {
      setCurrentCandidate(null);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.name} width="100" />
          <h2>{currentCandidate.name || 'N/A'}</h2>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location || 'Unknown'}</p>
          <p>Email: {currentCandidate.email || 'Not Provided'}</p>
          <p>Company: {currentCandidate.company || 'Not Available'}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          <div>
            <button onClick={handleSaveCandidate}>+</button>
            <button onClick={getNextCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;

 