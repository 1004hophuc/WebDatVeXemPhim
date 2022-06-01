import { Route } from 'react-router-dom'
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer'
import { useEffect } from 'react';

export const HomeTemplate = (props) => {

    const { Component, ...restProps } = props;

    // Gọi sự kiện cuộn lên top mỗi khi vào trang
    useEffect(() => {

        window.scrollTo(0, 0);

        return () => {
        }
    })


    return <Route {...restProps} render={(propsRoute) => {
        return <>
            <Header {...propsRoute} />

            <Component {...propsRoute} />
            <Footer {...propsRoute} />
            {/* <footer className="bg-black h-10 text-[white]">Đây là footer</footer> */}
        </>
    }} />
}