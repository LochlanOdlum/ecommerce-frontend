import { useState, useEffect } from 'react';
import ordersApi from '../../api/ordersApi';

const ImageDownload = ({ endpoint }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    let objectURL;

    const fetchImage = async () => {
      objectURL = await ordersApi.fetchSecureImage(endpoint);
      setImageObjectURL(objectURL);
      console.log(objectURL);
    };

    fetchImage();

    return () => {
      URL.revokeObjectURL(objectURL);
    };
  }, [endpoint]);

  return <div style={{ backgroundImage: `url('${imageObjectURL}')` }} className='mpp-photo-img' />;
};

export default ImageDownload;
