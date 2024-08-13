import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

import { useState, useEffect } from 'react'
export default function Home() {
    
    const [search,setSearch]=useState('');

    const [foodCat, setFoodcat] = useState([]);
    const [foodItem, setFooditem] = useState([]);
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setFooditem(response.sample); // Assuming response.sample contains the food items
        setFoodcat(response.foodCategory);
    }


    useEffect(() => {
        loadData()
    }, [])//dependency..[]1st render then all func run..if u specify somthing u mean that something is dependend on something..like footer shud change only if something changes








    return (
        <div>
            <div>
                <Navbar></Navbar>

            </div>
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg" className="d-block w-100" alt="..." style={{ height: '800px', objectFit: 'contain !important' }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.ytimg.com/vi/jx4AhF_KPOs/maxresdefault.jpg" className="d-block w-100" alt="..." style={{ height: '800px', objectFit: 'contain !important' }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.dailymail.co.uk/i/pix/2017/11/08/16/4623608900000578-0-image-a-9_1510156892900.jpg" className="d-block w-100" alt="..." style={{ height: '800px', objectFit: 'contain !important' }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://ranveerbrar.com/wp-content/uploads/2022/06/Veg-crispy.jpg" className="d-block w-100" alt="..." style={{ height: '800px', objectFit: 'contain !important' }} />
                        </div>

                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>







                {foodCat != [] ? foodCat.map((data) => {
                    return (
                        <div className='row mb-3'>
                            <div key={data._id} className='fs-3 m-3'>{data.CategoryName}
                            </div>
                            <hr />
                            {foodItem != [] ? foodItem.filter((item) =>
                                ((item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))).map(filterItems => {
                                    return (
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                            <Card
                                            foodItem={filterItems}
                                                //foodName={filterItems.name}
                                                options={filterItems.options[0]}
                                                //img={filterItems.img}
                                                //des={filterItems.description}



                                            ></Card>
                                        </div>

                                    )
                                })







                                : <div>No such data found</div>

                            }
                        </div>
                    );
                }
                ) : <div>Loading</div>}









            </div>

            <div>
                <Footer></Footer>
            </div>

        </div>
    );

}