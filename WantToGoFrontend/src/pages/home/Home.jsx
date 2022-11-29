import React from 'react';
import './Home.css';
import Header from './components/header/Header';
import { useAuth } from '../../utils/context/authContext';
import RestaurantCard from '../../components/restaurantCard/RestaurantCard';

const Home = ({changePath, visibleRestaurants, getVisibleRestaurants}) => {
  const { user } = useAuth();
  return (
    <>
    <Header user={user.dbUser} changePath={changePath}/>
    <div className="restaurants">
      {visibleRestaurants.map(res => <RestaurantCard restaurant={res} key={res.id} />)}
    </div>
    <div className="more" onClick={() => getVisibleRestaurants()}>
      Load More
    </div>
    </>
  )
}

export default Home