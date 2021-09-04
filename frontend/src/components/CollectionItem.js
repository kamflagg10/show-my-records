import React from 'react';
import Card from './UI/Card';
import './CollectionItem.css';
import noImageFound from '../images/record.jpg';

const CollectionItem = (props) => {
  const image = props.image || noImageFound;
  const altText = `${props.title} by ${props.artist}`;

  return (
    <Card className="collection-item">
      <img className="item-image" src={image} alt={altText} />
      <p className="item-title">{props.title}</p>
      <p className="item-artist">{props.artist}</p>
    </Card>
  );
};

export default CollectionItem;
