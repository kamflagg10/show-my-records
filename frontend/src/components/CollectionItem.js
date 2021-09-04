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

/*
when song title is too long maybe make it so user can hover over and be shown the full name.
also probably an argument for having the user click on something so they can see more details?

need to implement the play button. might have to make the entire botton section
of the card be a div or maybe use flexbox idk. might be able to use a grid and allow the 
play button to span two cells. 
*/
