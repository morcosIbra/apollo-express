import React, { Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Header, LaunchTile, Loading, Button } from '../components';
import { GET_LAUNCHES } from '../utils/launches';
import { useTranslation } from 'react-i18next';

const Launches = () => {
  
  const { data, loading, error, fetchMore } = useQuery(GET_LAUNCHES);
  console.log(data, loading, error);
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header />
      
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
      {data.launches &&
        data.launches.hasMore && (
          <Button
            onClick={() =>

              fetchMore({
                variables: {
                  after: data.launches.cursor,
                },

                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                  if (!fetchMoreResult) return prev;
                  return {
                    ...fetchMoreResult,
                    launches: {
                      ...fetchMoreResult.launches,
                      launches: [
                        ...prev.launches.launches,
                        ...fetchMoreResult.launches.launches,
                      ],
                    },
                  };
                },
              })
            }
          >
            Load More
          </Button>
        )
      }
    </Fragment>
  );
};

export default Launches;
