import React, { useState } from 'react';

import { useQuery } from 'containers/ApiConnector/apollo/fetchers';

import NewsFeed from './NewsFeed';
import { NEWS_FEEDS_QUERY } from './graphql';

export default function NewsFeeds() {
  const [newsFeeds, setNewsFeeds] = useState([]);

  useQuery(NEWS_FEEDS_QUERY, {
    onCompleted: (data) => {
      setNewsFeeds(data.newsFeeds);
    },
  });

  const renderNewsFeeds = () =>
    newsFeeds.map((newsFeed) => (
      <NewsFeed key={newsFeed.id} newsFeed={newsFeed} />
    ));

  return <div>{renderNewsFeeds()}</div>;
}
