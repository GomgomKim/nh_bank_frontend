import React from 'react';

const ClickSwitch = ({
    flag,
    className,
    onChange
}) => {
    return (
        <div className={className === undefined ? "pos-element-block-content-img" : className}>
            <img onClick={() => {
                onChange(!flag);
            }}
                src={flag ?
                    require('../../img/body/onbtn.png').default : require('../../img/body/offbtn.png').default} alt="" />
        </div>
    )
}

export default ClickSwitch;