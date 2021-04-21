import React from 'react'
import classes from './Input.module.css'
import { capitalizeString } from '../../utils/methods'

const Input = (props) => {

    const style = {
        borderColor: "#FFABD3"
    }

    return (
        <div className={[classes.input__box, props?.className].join(' ')}>
            <label htmlFor={props?.label}>{capitalizeString(props.label)}</label>
            <input
                style={props?.value?.length > 0 ? { ...style } : {}}
                onChange={props?.onChange}
                placeholder={props.placeholder}
                id={props?.label}
                name={props?.name}
                value={props?.value}
                {...props}
            />
        </div>
    )
}

export default Input