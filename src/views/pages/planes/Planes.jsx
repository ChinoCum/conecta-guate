import React from 'react'
import PropTypes from 'prop-types'
import PublicFooter from '../global/PublicFooter';
import HeaderImage from './HeaderImage';
import PublicHeader from '../global/PublicHeader';
import PlanesInfo from './PlanesInfo';



function Planes(props) {
    return (
        <>
            <PublicHeader />
            <HeaderImage />
            <PlanesInfo />
            <PublicFooter />
        </>
    )
}

Planes.propTypes = {

}

export default Planes

