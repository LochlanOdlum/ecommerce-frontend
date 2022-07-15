import { useState, useEffect } from 'react';
import ordersApi from '../../api/ordersApi';

import './ImageDownload.css';

const ImageDownload = ({ endpoint, paddingBottom }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    let objectURL;

    const fetchImage = async () => {
      objectURL = await ordersApi.fetchSecureImage(endpoint);
      setImageObjectURL(objectURL);
    };

    fetchImage();

    return () => {
      URL.revokeObjectURL(objectURL);
    };
  }, [endpoint]);

  return <div style={{ backgroundImage: `url('${imageObjectURL}')`, paddingBottom }} className='mpp-photo-img' />;
};

export default ImageDownload;
