export const calculatePayout = (articles, rate) => {
  if (!articles || !rate) return 0;
  return (articles.length * parseFloat(rate)).toFixed(2);
};

// Additional helper to calculate payouts per author
export const calculatePayoutsByAuthor = (articles, rate) => {
  if (!articles || !rate) return [];

  const authorCounts = articles.reduce((acc, article) => {
    const author = article.author || 'Unknown';
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(authorCounts).map(([author, count]) => ({
    author,
    articles: count,
    rate: parseFloat(rate),
    payout: (count * parseFloat(rate)).toFixed(2),
  }));
};
