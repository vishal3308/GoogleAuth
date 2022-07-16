import React from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
export default function Home() {
    return (
        <div className='home'>
            <div className="header">
                <div className="row">
                    <div className="col-2" id="col-2">
                        <h1>Change Your Outfit<br />A New Style</h1>
                        <p>Let go off your past and open the door to your future</p>
                        <Link to="#">Explore Now &#8594;</Link>
                    </div>
                    <div className="col-2"><img src="images/image1.png" alt="image" /></div>
                </div>
            </div>
            {/* <!-- -----------------------------------Featured product section  -- --> */}
            <div className="category">
                <div className="small-container">
                    <div className="row">
                        <div className="col-3">
                            <img src="images/category-1.jpg" alt="categories" />
                        </div>
                        <div className="col-3">
                            <img src="images/category-2.jpg" alt="categories" />
                        </div>
                        <div className="col-3">
                            <img src="images/category-3.jpg" alt="category" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="small-container">
                <h4>Featured Product</h4>
                <div className="row">
                    <div className="col-4"><Link to="singleproduct.php"><img src="images/product-1.jpg" alt="" />
                        <div className="rating">
                            <StarIcon color='success' />
                            <StarIcon color='success' />
                            <StarIcon color='success' />
                            <StarHalfIcon color='success' />
                            <StarOutlineIcon color='success' />

                        </div>
                        <p>Red Printed T-shirt by HRX</p>
                        <p>₹199</p>
                    </Link>
                    </div>
                    <div className="col-4"><Link to="product-2.php"><img src="images/product-2.jpg" alt="" />
                        <div className="rating">
                            <StarIcon color='success' />
                            <StarIcon color='success' />
                            <StarIcon color='success' />
                            <StarOutlineIcon color='success' />
                            <StarOutlineIcon color='success' />
                        </div>
                        <p>HRX Sport shoes</p>
                        <p>₹499</p>
                    </Link>
                    </div>
                    <div className="col-4"><Link to="#"><img src="images/product-3.jpg" alt="" />
                        <div className="rating">
                            <StarIcon color='success' />
                            <StarIcon color='success' />
                            <StarIcon color='success' />
                            <StarHalfIcon color='success' />
                            <StarOutlineIcon color='success' />
                        </div>
                        <p>HRX Gray Trackpants</p>
                        <p>₹399</p>
                    </Link>
                    </div>
                    <div className="col-4"><Link to="#"><img src="images/Girl's Fassion.jpg" height="410px" />
                        <div className="rating">
                            <StarIcon color='success' />
                            <StarIcon color='success' />
                            <StarIcon color='success' />
                            <StarIcon color='success' />
                            <StarIcon color='success' />
                        </div>
                        <p>Girl's dresses</p>
                        <p>₹199</p>
                    </Link>
                    </div>
                </div>
            </div>
            {/* <!-- ----------------------------------letest product--------------------- --> */}
            <div className="small-container">
                <h4>Letest Product</h4>
                <div className="row">
                    <div className="col-5">
                        <Link to="singleproduct.php">
                            <img src="images/product-1.jpg" alt="product" />
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarHalfIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <p>Red Printed T-shirt</p>
                            <p>₹199</p>
                        </Link></div>
                    <div className="col-5">
                        <Link to="product-2.php">
                            <img src="images/product-2.jpg" alt="product" />
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarHalfIcon color='success' />
                                <StarOutlineIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <p>HRX sport shoes</p>
                            <p>₹499</p>
                        </Link>
                    </div>
                    <div className="col-5">
                        <Link to=""> <img src="images/product-3.jpg" alt="product" />
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarHalfIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <p>Snicker Shoes</p>
                            <p>₹200</p>
                        </Link>
                    </div>
                    <div className="col-5">
                        <Link to=""><img src="images/product-4.jpg" alt="product" />
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarHalfIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <p>Light blue Printed Puma T-shirt</p>
                            <p>₹499</p>
                        </Link> </div>
                    <div className="col-5">
                        <Link to=""> <img src="images/product-5.jpg" alt="product" />
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarHalfIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <p>Spark Sport Shoes</p>
                            <p>₹899</p>
                        </Link>
                    </div>
                    <div className="col-5">
                        <Link to=""><img src="images/product-6.jpg" alt="product" />
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarHalfIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <p>PUMA Black T-Shirt</p>
                            <p>₹498</p>
                        </Link>
                    </div>
                    <div className="col-5">
                        <Link to=""><img src="images/product-7.jpg" alt="product" />
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarOutlineIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <p>HRX Black and White Shoes</p>
                            <p>₹699</p>
                        </Link>
                    </div>
                    <div className="col-5">
                        <Link to="product-8.php"> <img src="images/product-8.jpg" alt="product" />
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarHalfIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <p>FOSSIL Watch</p>
                            <p>₹349</p>
                        </Link></div>
                </div>
            </div>
            {/* <!-- -----------------------------Exclusive Product --> */}
            <div className="header">
                <div className="small-container">
                    <div className="row">
                        <div className="col-6"><img src="images/exclusive.png" alt="exclusive" />
                        </div>
                        <div className="col-6">
                            <p>Exclusive Product Available on Vishal Store</p>
                            <h1>Smart Band 4</h1>
                            <p>The Mi Smart Brand and feature a 39.9% larger (than Mi Band 3) AMOLED color
                                full-touch display with adjustable brightness ,so everything is clear.</p>
                            <Link to="#">Buy Now &#8594;</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- -----------------------testimonial ----------------- --> */}
            <div className="testimonial">
                <div className="small-container">
                    <div className="row">
                        <div className="col-3">
                            <i className="fa fa-quote-left"></i>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque et molestiae quis tempora nemo
                                tempore
                                possimus aperiam ratione est aliquam?
                            </p>
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarHalfIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <img src="images/user-1.png" />
                            <h3>Shishen Watson</h3>
                        </div>
                        <div className="col-3">
                            <i className="fa fa-quote-left"></i>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ut doloribus mollitia obcaecati
                                eius
                                accusantium, aliquam exercitationem nam possimus deleniti?</p>
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarHalfIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <img src="images/user-2.png" />
                            <h3>Haishon Mike</h3>
                        </div>
                        <div className="col-3">
                            <i className="fa fa-quote-left"></i>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque molestias in ab, sed aliquid
                                voluptatibus qui error nesciunt dicta doloribus?</p>
                            <div className="rating">
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarIcon color='success' />
                                <StarHalfIcon color='success' />
                                <StarOutlineIcon color='success' />
                            </div>
                            <img src="images/user-3.png" />
                            <h3>Allen Wood</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="brand">
                <div className="small-container">
                    <div className="row">
                        <div className="col-7"><img src="images/logo-godrej.png" alt="" /></div>
                        <div className="col-7"><img src="images/logo-oppo.png" alt="" /></div>
                        <div className="col-7"><img src="images/logo-paypal.png" alt="" /></div>
                        <div className="col-7"><img src="images/logo-philips.png" alt="" /></div>
                        <div className="col-7"><img src="images/logo-coca-cola.png" alt="" /></div>
                    </div>
                </div>
            </div>

        </div>
    )
}
