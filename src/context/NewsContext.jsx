import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchNews } from '../services/newsApi';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    author: '',
    startDate: '',
    endDate: '',
    search: '',
    type: 'all'
  });

  useEffect(() => {
    loadNews();
  }, [filters]);

  const loadNews = async () => {
    setLoading(true);
    try {
      const articles = await fetchNews(filters);
      setNews(articles);
    } catch (error) {
      console.error('Error loading news:', error);
    }
    setLoading(false);
  };

  return (
    <NewsContext.Provider value={{ 
      news, 
      loading, 
      filters, 
      setFilters, 
      loadNews 
    }}>
      {children}
    </NewsContext.Provider>
  );
};
