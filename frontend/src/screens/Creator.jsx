import React, { useState, useEffect, useCallback } from 'react'
// import data from '../data.js'
import {useParams} from "react-router-dom"
import Navbar from '../components/Navbar.jsx';
import axios from 'axios';
import{Link} from 'react-router-dom'
import '../css/creator.css'

const Creator = () => {

    const { id } = useParams();

    const [data, setData] = useState([])
    const [ytlink, setYtLink] = useState('')
    const [instlink, setINSTLink] = useState('')
    const [msg_id, setMSGid] = useState('')

    const GET_CC_ONEPOST_URL = "http://localhost:8000/content/getonepost"
    const GET_HH_ONEPOST_URL = "http://localhost:8000/hiring/getonepost"
    const userid = localStorage.getItem('user_id');
    const contentCreatorType = localStorage.getItem("user")
    
    const getData = useCallback(async () => {
        console.log(id)
        if(contentCreatorType==="CC"){
            await axios.get(GET_CC_ONEPOST_URL, {
                params: {
                    id: id,
                    user_id: userid
                }, 
            })
            .then((response) => {
                console.log(response.data.data[0])
                setMSGid(response.data.data[0].userid)
                setYtLink(response.data.data[0].youtube_link)
                setINSTLink(response.data.data[0].instagram_link)
                setData(response.data.data)
            })
        }else if(contentCreatorType==="HH"){
            await axios.get(GET_HH_ONEPOST_URL, {
                params: {
                    id: id,
                    user_id: userid
                }, 
            })
            .then((response) => {
                console.log(response.data.data)
                setMSGid(response.data.data[0].userid)
                setYtLink(response.data.data[0].youtube_link)
                setINSTLink(response.data.data[0].instagram_link)
                setData(response.data.data)
            })
        }
    }, [id, userid,contentCreatorType])
    

    useEffect(() => {
        getData()
    },[getData])


    return (
        <>
            <Navbar />
            <div className="creator">
                <div className="creator-details">
                    {data && data.length > 0 && (
                        <>
                            <img src={data[0].image_url} alt="" className="creator-image" />
                            <p><b>{data[0].title}</b></p>
                            <p><b>Content type:</b></p>
                            <div className='card-content-type'>
                                { data[0].contenttypes.map((type, index) => (
                                    <p key={index}>#{type}</p>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="creator-desc">
                    {data && data.length > 0 && data[0].description}
                    <p><b>Social Media Handles</b></p>
                    <Link to={ytlink} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg></Link>
                    <Link to={instlink} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></Link>
                    <Link to={`/singlechat/${msg_id}`}><button className="card-button">Message</button></Link>
                </div>
            </div>
        </>
    );
}    

export default Creator;
