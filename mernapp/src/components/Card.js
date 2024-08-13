import React, { useState ,useEffect,useRef} from 'react'
import { useDispatchCart,useCart} from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data=useCart()
    let options=props.options;
    const priceRef=useRef();
    let priceOptions=Object.keys(options)
    const [qty,setQty]=useState(1)
    const [size,setSize]=useState("");

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])


    const handleAddtoCart  = async()=>{
        let food=[]
        for(const item of data)
            {
                if(item.id === props.foodItem._id)
                    {
                        food=item;
                        break; 
                    }
            }
            if(food!=[])
                {
                    if(food.size === size)
                        {
                            await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty});
                            return;
                        }
                        else if(food.size!==size)
                            {
                                
                                await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price:finalPrice ,qty:qty,size:size})
                                return;

                            }
                            return;
                }
                
                                await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price:finalPrice ,qty:qty,size:size})
        
            //console.log('Item added:', { id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty, size, img: props.foodItem.img });
           
        
        
        
        
    }
    
    const finalPrice=qty*parseInt(options[size]);

    console.log('Cart data:', data);




  return (
    <div> 
        <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "450px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"150px",objectFit:"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <p className="card-text">{props.foodItem.destination}</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100  bg-success'onChange={(e)=>setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} >{i + 1}

                                        </option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded'  ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                                {priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })}

                            </select>
                            <div className='d-inline h-100 fs-5'>
                                Rs.{finalPrice}/-

                            </div>
                            <hr></hr>
                            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddtoCart}>Add to cart</button>
                            

                        </div>

                    </div>
                </div>
            </div>
      
    </div>
  )
}