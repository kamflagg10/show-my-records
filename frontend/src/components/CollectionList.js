import React, { useState, useRef } from 'react';
import Card from './UI/Card';
import Filters from './Filters';
import CollectionItem from './CollectionItem';
import './CollectionList.css';
import loadingGif from '../images/loading.gif';

const CollectionList = (props) => {
  const [items, setItems] = useState([[]]);
  const [isLoading, setIsLoading] = useState(false);
  const emptyFolderSelected = useRef(false);

  const gridItems = [];
  for (let itemPage of items) {
    for (let item of itemPage) {
      gridItems.push(
        <CollectionItem
          key={item.id * Math.random()} //avoid duplicate keys
          image={item.image}
          title={item.title}
          artist={item.artist}
          year={item.year}
        ></CollectionItem>
      );
    }
  }

  const filterChangeHandler = async (selectedFolderID) => {
    setIsLoading(true);
    let result = [];
    if (selectedFolderID === 'choose-folder') {
      emptyFolderSelected.current = false;
    } else {
      try {
        const data = await fetch(
          `http://localhost:5000/get-folder-items/${selectedFolderID}`
        );

        result = (await data.json()).pages;
      } catch (error) {
        console.log(`problem fetching items. error: ${error.message}`);
      }
      console.log(result[0]);

      if (result[0].length === 0) {
        emptyFolderSelected.current = true;
      }
    }
    setIsLoading(false);
    setItems(result);
  };

  const content =
    gridItems.length > 0 ? (
      <div className="collection-item-grid">{gridItems}</div>
    ) : emptyFolderSelected.current ? (
      <h2 className="no-items">No items in current folder.</h2>
    ) : (
      <h2 className="no-items">Choose a Folder.</h2>
    );

  return (
    <Card className="collection-list">
      <Filters onChange={filterChangeHandler}></Filters>
      {isLoading ? (
        <div className="no-items">
          <img src={loadingGif} alt="Loading Selected Folder" />
        </div>
      ) : (
        content
      )}
    </Card>
  );
};

export default CollectionList;
