import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';

import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';


export default function Header() {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    const { t, i18n } = useTranslation();
    const { Option } = Select;

    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>

                <button onClick={() => {
                    history.push('/login')
                }} className="self-center border-2 mr-2 px-4 py-1 font-semibold  rounded hover:text-black hover:bg-white">{t('SignIn')}</button>

                <button onClick={() => {
                    history.push('/register')
                }} className="self-center border-2 mr-2 px-4 py-1 font-semibold rounded hover:text-black     dark:text-coolGray-900 hover:bg-white">{t('SignUp')}</button>

            </Fragment>
        } else {
            return <Fragment>

                <button onClick={() => {
                    history.push('/profile')
                }} className="self-center px-8 py-3 rounded">{userLogin.hoTen}</button>
                <button onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    history.push('/home');
                    window.location.reload();
                }} className="text-yellow-500 mr-5">{t('Logout')}</button>

            </Fragment>
        }
    }


    return (
        <header className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-opacity-40 bg-black text-white fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex text-white text-2xl items-center p-2">
                    LOGO
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink activeStyle={{ borderBottomColor: 'white' }} rel="noopener noreferrer" to="/home" className="flex text-white items-center px-4 -mb-1 border-b-2 dark:border-transparent">{t('Home')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink activeStyle={{ borderBottomColor: 'white' }} rel="noopener noreferrer" to="/contact" className="flex text-white items-center px-4 -mb-1 border-b-2 dark:border-transparent">{t('Contact')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink activeStyle={{ borderBottomColor: 'white' }} rel="noopener noreferrer" to="/news" className="flex text-white items-center px-4 -mb-1 border-b-2 dark:border-transparent">{t('News')}</NavLink>
                    </li>
                    {/* <li className="flex">
                        <NavLink rel="noopener noreferrer" to="/login" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Login</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" to="/register" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Register</NavLink>
                    </li> */}
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">

                    {renderLogin()}

                    <Select defaultValue="vi" style={{ width: 80 }} onChange={handleChange}>
                        <Option value="vi">Vie</Option>
                        <Option value="en">Eng</Option>
                    </Select>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
