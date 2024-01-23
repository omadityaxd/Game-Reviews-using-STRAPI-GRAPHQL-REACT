import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEW = gql`
  query {
    reviews {
      data {
        id
        attributes {
          title
          body
          rating
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEW);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <div>
      {data.reviews.data.map(({ id, attributes }) => (
        <div key={id} className="review-card">
          <div className="rating">{attributes.rating}</div>
          <h2>{attributes.title}</h2>

          {attributes.categories.data.map(({ id, attributes }) => (
            <small key={id}>{attributes.name}</small>
          ))}

          <p>{attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
