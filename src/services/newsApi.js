import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (filters) => {
  try {
    const params = {
      apiKey: API_KEY,
      q: filters.search || 'technology',
      pageSize: 50,
      sortBy: 'publishedAt'
    };

    if (filters.author) params.q += ` author:${filters.author}`;
    if (filters.startDate) params.from = filters.startDate;
    if (filters.endDate) params.to = filters.endDate;

    const response = await axios.get(`${BASE_URL}/everything`, { params });
    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
