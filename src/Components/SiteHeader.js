import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

const SiteHeader = () => {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="site-header">
      <Link to="/">
        <h1>Game Reviews</h1>
      </Link>
      <nav className="categories">
        <span>Filter Reviews By Category : </span>
        {data.categories.data.map(({ id, attributes }) => (
          <Link key={id} to={`/category/${id}`}>
            {attributes.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SiteHeader;
