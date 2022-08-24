import React from 'react'
import {AiOutlineStar } from 'react-icons/ai'
import img1 from '../img/1.jpeg'
import img2 from '../img/2.jpg'
import img3 from '../img/3.jpg'
import img4 from '../img/4.jpg'
import img5 from '../img/5.jpg'
const Review = () => {
  return (
    <div className='container flex gap-2 shadow-xl shadow-black/10 '>
        <div className=" scroll overflow-y-auto overflow-x-hidden h-72 p-10   ">
            <div className="comment text-sm  mb-5">
                <div className="heder flex justify-between items-center bg-slate-300 rounded-md p-2">
                    <img className='w-10 h-10 rounded-full' src={img1} alt="" />
                    <div className="userNameAndReview grid items-center ">
                        <p>omer Hamd</p>
                        <span>4.0</span>
                    </div>
                    <div className="time">
                        1 day
                    </div>
                </div>
                <div className="desc justify-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sint doloribus a, quae ex consectetur distinctio necessitatibus. Ipsa aliquid nisi laboriosam quibusdam temporibus possimus magni, obcaecati, provident quod unde inventore.
                </div>
            </div>

            <div className="comment text-sm  mb-5">
                <div className="heder flex justify-between items-center bg-slate-300 rounded-md p-2">
                    <img className='w-10 h-10 rounded-full' src={img2} alt="" />
                    <div className="userNameAndReview grid items-center ">
                        <p>abubakar</p>
                        <span>4.0</span>
                    </div>
                    <div className="time">
                        1 day
                    </div>
                </div>
                <div className="desc justify-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sint doloribus a, quae ex consectetur distinctio necessitatibus. Ipsa aliquid nisi laboriosam quibusdam temporibus possimus magni, obcaecati, provident quod unde inventore.
                </div>
            </div>

            <div className="comment text-sm  mb-5">
                <div className="heder flex justify-between items-center bg-slate-300 rounded-md p-2">
                    <img className='w-10 h-10 rounded-full' src={img3} alt="" />
                    <div className="userNameAndReview grid items-center ">
                        <p>omer Hamd</p>
                        <span>4.0</span>
                    </div>
                    <div className="time">
                        2 day
                    </div>
                </div>
                <div className="desc justify-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sint doloribus a, quae ex consectetur distinctio necessitatibus. Ipsa aliquid nisi laboriosam quibusdam temporibus possimus magni, obcaecati, provident quod unde inventore.
                </div>
            </div>

            <div className="comment text-sm  mb-5">
                <div className="heder flex justify-between items-center bg-slate-300 rounded-md p-2">
                    <img className='w-10 h-10 rounded-full' src={img4} alt="" />
                    <div className="userNameAndReview grid items-center ">
                        <p>mhmd Hamd</p>
                        <span>3.0</span>
                    </div>
                    <div className="time">
                        5 day
                    </div>
                </div>
                <div className="desc justify-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sint doloribus a, quae ex consectetur distinctio necessitatibus. Ipsa aliquid nisi laboriosam quibusdam temporibus possimus magni, obcaecati, provident quod unde inventore.
                </div>
            </div>

            <div className="comment text-sm  mb-5">
                <div className="heder flex justify-between items-center bg-slate-300 rounded-md p-2">
                    <img className='w-10 h-10 rounded-full' src={img5} alt="" />
                    <div className="userNameAndReview grid items-center ">
                        <p> Hamd</p>
                        <span>3.0</span>
                    </div>
                    <div className="time">
                        7 day
                    </div>
                </div>
                <div className="desc justify-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sint doloribus a, quae ex consectetur distinctio necessitatibus. Ipsa aliquid nisi laboriosam quibusdam temporibus possimus magni, obcaecati, provident quod unde inventore.
                </div>
            </div>
        </div>
        <div className="addRev container grid  basis-1/4">
        <div className="flex items-center justify-center text-2xl text-yellow-500  ">
              <AiOutlineStar className='cursor-pointer' />
              <AiOutlineStar className='cursor-pointer' />
              <AiOutlineStar className='cursor-pointer' />
              <AiOutlineStar className='cursor-pointer' />
              <AiOutlineStar className='cursor-pointer' />
                
        </div>

       <form action="" className='grid w-60 mx-auto gap-4'>
       <textarea name="" id="" cols="30" className='border-2 border-gray-400 bg-slate-100 p-2 text-md' rows="10"></textarea>
        <input type="submit" className='btn-primary' />
       </form>
        
        </div>
    </div>
  )
}

export default Review