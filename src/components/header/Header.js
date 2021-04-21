import React from 'react'
import classes from './Header.module.css'

import useRouter from '../../hooks/useRouter'

const Header = () => {

    const {history} = useRouter()

    return (
        <div className={classes.header}>
            <div className={[classes.header__content, "container"].join(" ")}>
                <h1 className="heading" onClick={()=> history.push('/')}>Todo App</h1>
                <h3>Welcome, Khattak01</h3>
            </div>
        </div>
    )
}

export default Header
