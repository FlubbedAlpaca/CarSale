import { useState } from 'react';
import './Gallery.css';


// natural sort helper for filenames like car1.jpg, car2.jpg ... car650.jpg
function naturalCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

const imageModules = import.meta.glob('./assets/images/*.jpg', { eager: true });

const images = Object.entries(imageModules)
  .sort(([a], [b]) => naturalCompare(a, b))
  .map(([, mod]) => mod.default);



export default function Gallery() {
  const [selected, setSelected] = useState(null);


  return (
    <div className="page-container">
      <div className="gallery-container">
        <div className="image-grid">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Car ${index + 1}`}
              loading="lazy"
              className="grid-image"
              onClick={() => setSelected(src)}
            />
          ))}
        </div>
      </div>

      <footer className="footer">
        <p className="copy">
          <strong>📩Inquiries & Offers:</strong> Please send all inquiries by <strong>email</strong> to <a className="email-link" href="mailto:CarProjectForSale@gmail.com">CarProjectForSale@gmail.com</a><br />
          Be sure to include your <strong>name</strong>, <strong>phone number</strong>, and any <strong>inquiries or offers</strong> you have about the car. We'll get back to you as soon as possible!
        </p>
      </footer>

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <p className="index">{selected.slice(19)}</p>
          <img src={selected.slice()} alt="Enlarged" className="enlarged-image" />
          <img src="./public/R.png" alt="Arrow" className="enlarged-arrow-left" onClick={(e) => {e.stopPropagation();
          setSelected(parseInt(selected.slice(22,-4))-1>0 ? selected.slice(0, 22)+String(parseInt(selected.slice(22,-4))-1)+'.jpg' : selected)}}/>
          <img src="./public/R.png" alt="Arrow" className="enlarged-arrow-right" onClick={(e) => {e.stopPropagation();
          console.log(selected);
          setSelected(parseInt(selected.slice(22,-4))+1 <= images.length ? selected.slice(0, 22)+String(parseInt(selected.slice(22,-4))+1)+'.jpg' : selected)}}/>
        </div> 
      )}
    </div>
  );
}