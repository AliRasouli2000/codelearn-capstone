'use client';

import { useEffect, useState } from 'react';

export const CatFacts = () => {
    const [fact, setFact] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFact = async () => {
            try {
                const res = await fetch('https://catfact.ninja/fact');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setFact(data.fact);
            } catch {
                setFact('Cats can rotate their ears 180 degrees to better detect sounds around them.');
            } finally {
                setLoading(false);
            }
        };
        fetchFact();
    }, []);
    
  return (
    <div className="cat-facts-container">
        <h3 className="cat-facts-title">🐱 Cat Fact of the Day!</h3>
                <p className="cat-facts-text">{loading ? 'Loading...' : fact}</p>
        <p className="cat-facts-note">✨ Fetched from API</p>
    </div>
    );
};
