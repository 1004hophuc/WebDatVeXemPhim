import React from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { history } from "../../App";
import './Film_Flip.css'

export default function Film_Flip(props) {

    const { phim } = props;

    return (
        <div className="flip-card mt-2 mb-20">
            <div className="flip-card-inner" style={{ width: 250 }}>
                <div className="flip-card-front" style={{ width: 250 }}>

                    <img src={phim.hinhAnh} alt="Avatar" style={{ width: 250, height: 300 }} onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }} />
                </div>
                <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0 }} >
                        <img src={phim.hinhAnh} alt="Avatar" style={{ width: 250, height: 300 }} onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/250/300'; }} />
                    </div>
                    <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <div className="rounded-full cursor-pointer"><span><a href={phim.trailer}><PlayCircleOutlined style={{ fontSize: '50px' }} /></a></span></div>
                            <div className="text-2xl mt-2 font-bold">{phim.tenPhim}</div>
                        </div>
                    </div>

                </div>
            </div>
            <div onClick={() => {
                history.push(`/detail/${phim.maPhim}`)
            }} style={{ width: 250 }} className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold">ĐẶT VÉ</div>
        </div>

    )
}