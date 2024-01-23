import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORY = gql`
  query ($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          reviews {
            data {
              id
              attributes {
                title
                rating
                body
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
      }
    }
  }
`;

const Category = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <div>
      <h2>{data.category.data.attributes.name}</h2>
      {data.category.data.attributes.reviews.data.map(({ id, attributes }) => (
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
};

export default Category;
