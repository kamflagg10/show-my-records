import React, { useState, useRef } from 'react';
import Button from './UI/Button';
import './Filters.css';

const Filters = (props) => {
  const [selectedOption, setSelectedOption] = useState();
  const [userFolders, setUserFolders] = useState([]);
  const hideFolderRef = useRef();

  const options = userFolders.map((folder, idx) => {
    return (
      <option value={folder.name} id={folder.id} key={idx}>
        {`${folder.name} (${folder.count})`}
      </option>
    );
  });

  const fetchUserFolders = async () => {
    let folderData = [];
    try {
      const response = await fetch('http://localhost:5000/get-folder-list');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      folderData = (await response.json()).folders;
      hideFolderRef.current.classList.remove('hide');
      setTimeout(() => {
        hideFolderRef.current.classList.add('hide');
        console.log('Folders loaded!');
      }, 1500);
    } catch (error) {
      console.log(`Something went wrong: ${error.message}`);
    }
    setUserFolders(folderData);
  };

  const selectedOptionHandler = (event) => {
    const newFolderSelected = event.target;
    const folderID = newFolderSelected.selectedOptions['0'].id;

    if (
      newFolderSelected.value !== selectedOption //option already selected
    ) {
      props.onChange(folderID);
      setSelectedOption(newFolderSelected.value);
    }
  };

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <select onChange={selectedOptionHandler}>
          <option value="choose-folder" id="choose-folder">
            Choose/Load Folders
          </option>
          {options}
        </select>
        <Button className="load-folders" onClick={fetchUserFolders}>
          Load Folders
        </Button>
        <p ref={hideFolderRef} className="folders-loaded hide">
          Folders Loaded!
        </p>
      </form>
    </div>
  );
};

export default Filters;
