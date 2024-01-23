import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

const REVIEW = gql`
  query getReview($id: ID!) {
    review(id: $id) {
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

const ReviewDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
  return (
    <div>
      <div key={id} className="review-card">
        <div className="rating">{data.review.data.attributes.rating}</div>
        <h2>{data.review.data.attributes.title}</h2>
        {data.review.data.attributes.categories.data.map(
          ({ id, attributes }) => (
            <small key={id}>{attributes.name}</small>
          )
        )}
        <ReactMarkdown>
          {data.review.data.attributes.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ReviewDetails;
