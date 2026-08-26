import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

import snakePlant from './assets/snake-plant.jpg';
import spiderPlant from './assets/spider-plant.jpg';
import peaceLily from './assets/peace-lily.jpg';
import lavender from './assets/lavender.jpg';
import jasmine from './assets/jasmine.jpg';
import aloeVera from './assets/aloe-vera.jpg';
import basil from './assets/basil.jpg';
import zzPlant from './assets/zz-plant.jpg';
import pothos from './assets/pothos.jpg';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        image: snakePlant,
        description: 'Filters indoor air around the clock and thrives on neglect.',
        cost: '$15',
      },
      {
        name: 'Spider Plant',
        image: spiderPlant,
        description: 'Removes airborne toxins and sends out easy-to-share pups.',
        cost: '$12',
      },
      {
        name: 'Peace Lily',
        image: peaceLily,
        description: 'Elegant white blooms with excellent humidity balancing.',
        cost: '$18',
      },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      {
        name: 'Lavender',
        image: lavender,
        description: 'Calming scent that fills a sunny windowsill all summer.',
        cost: '$20',
      },
      {
        name: 'Jasmine',
        image: jasmine,
        description: 'Delicate white flowers with a sweet evening perfume.',
        cost: '$22',
      },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      {
        name: 'Aloe Vera',
        image: aloeVera,
        description: 'Soothing gel-filled leaves for burns and dry skin.',
        cost: '$14',
      },
      {
        name: 'Basil',
        image: basil,
        description: 'Fresh kitchen herb with digestive and aromatic benefits.',
        cost: '$10',
      },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      {
        name: 'ZZ Plant',
        image: zzPlant,
        description: 'Glossy foliage that shrugs off low light and missed watering.',
        cost: '$16',
      },
      {
        name: 'Golden Pothos',
        image: pothos,
        description: 'Fast-trailing vine that grows almost anywhere indoors.',
        cost: '$13',
      },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleHome = (e) => {
    e.preventDefault();
    setShowCart(false);
    if (onHomeClick) onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-brand" onClick={handleHome}>
          <span className="brand-mark">PN</span>
          <div>
            <h3>Paradise Nursery</h3>
            <p>Where Green Meets Serenity</p>
          </div>
        </div>
        <div className="navbar-links">
          <a href="#" onClick={handleHome}>
            Home
          </a>
          <a href="#" onClick={handlePlantsClick}>
            Plants
          </a>
          <a href="#" className="cart-link" onClick={handleCartClick} aria-label="Cart">
            <svg
              className="cart-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
              <path d="M2 3h2.2l2.6 12.2h11.4l2.2-8.4H6" />
            </svg>
            <span className="cart-count">{calculateTotalQuantity()}</span>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h1>{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                      loading="lazy"
                      width={800}
                      height={800}
                    />
                    <div className="product-body">
                      <div className="product-title">{plant.name}</div>
                      <div className="product-description">{plant.description}</div>
                      <div className="product-cost">{plant.cost}</div>
                      <button
                        className={`product-button ${addedToCart[plant.name] ? 'added-to-cart' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={!!addedToCart[plant.name]}
                      >
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;