import { Route } from 'react-router';
import { USER_LOGIN } from '../../util/settings/config';
import { Redirect } from 'react-router';
import { useEffect } from 'react';

export const BookingTemplate = (props) => {

    const { Component, ...restProps } = props;

    // Gọi sự kiện cuộn lên top mỗi khi vào trang
    useEffect(() => {

        window.scrollTo(0, 0);

        return () => {
        }
    })

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />
    }

    return <Route {...restProps} render={(propsRoute) => {
        return <>

            <Component {...propsRoute} />

        </>
    }} />
}