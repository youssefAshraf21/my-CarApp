import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './Hero1.css';

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  border: none;
  padding: 14px 36px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.02em;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(249, 115, 22, 0.4);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 12px 36px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.02em;
  &:hover {
    border-color: #f97316;
    color: #f97316;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(249, 115, 22, 0.15);
  }
`;

function Hero1() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Premium Automotive Collection
          </div>
          <h1 className="hero-heading">
            Drive Your <span className="accent">Dream</span> Car
          </h1>
          <p className="hero-description">
            Experience premium performance and modern design with our luxury collection.
            Find the perfect vehicle that matches your passion for the open road.
          </p>
          <div className="hero-buttons">
            <PrimaryButton onClick={() => navigate('/cars')}>
              Explore Cars
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate('/contact')}>
              Learn More
            </SecondaryButton>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80"
            alt="Luxury sports car"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero1;
