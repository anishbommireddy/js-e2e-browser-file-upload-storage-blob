// ./src/App.tsx
import './App.css'
import React, { useState } from 'react';
import Path from 'path';
import uploadFileToBlob, { isStorageConfigured } from './azure-storage-blob';
import VideoEmbed from './VideoEmbed';


const storageConfigured = isStorageConfigured();

const App = (): JSX.Element => {
  // all blobs in container
  const [blobList, setBlobList] = useState<string[]>([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState(null);

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  const onFileChange = (event: any) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    // prepare UI
    setUploading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer: string[] = await uploadFileToBlob(fileSelected);

    // prepare UI for results
    setBlobList(blobsInContainer);

    // reset state/form
    setFileSelected(null);
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };


  // display form
  const DisplayForm = () => (
    <div className = "Upload">
      <input type="file" onChange={onFileChange} key={inputKey || ''} />
      <button className = "Button" type="submit" onClick={onFileUpload}>
        Upload
          </button>
    </div>
  )

  // display file name and image
  // const DisplayVideosFromContainer = () => (
  //   <div>
  //     <h2>Container items</h2>
  //     <ul>
  //       {blobList.map((item) => {
  //         return (
  //           <li key={item}>
  //             <div>
  //               {Path.basename(item)}
  //               <br />
  //               <video src={item} controls height="200" width = "300" />
  //             </div>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );

  return (
    <div>
      <h1 className = "heading">Upload Your Session</h1>
      {storageConfigured && !uploading && DisplayForm()}
      {storageConfigured && uploading && <div>Uploading</div>}
      {storageConfigured && blobList.length > 0 && <div>
        <VideoEmbed blobItem = {blobList[blobList.length - 1]} />
        </div>}
      {!storageConfigured && <div>Storage is not configured.</div>}
    </div>
  );
};

export default App;


