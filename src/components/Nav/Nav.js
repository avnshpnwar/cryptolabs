import React, { Component } from 'react'
import NavItem from '../Nav/NavItem'
import Logger from '../../Utils/Logger'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            XlateClass: 'nav-item active',
            JwtClass: 'nav-item'
        }
        this.toggleActiveClass = this.toggleActiveClass.bind(this)
    }

    toggleActiveClass(event) {
        let tempState = this.state
        for (let classOf in tempState) {
            tempState[classOf] = 'nav-item'
        }

        switch(event.target.id) {
            case 'xlate':
                tempState.XlateClass = 'nav-item active'
                break
            case 'hash':
                tempState.JwtClass = 'nav-item active'
                break
            default:
                Logger.warn('unknown item in navbar ' + event.target)
                break
        }
        this.setState(tempState)
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">CryptoLabs</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <NavItem onItemClick={this.toggleActiveClass} props={{name: 'Xlate', id: 'xlate', route: '/cryptolabs/xlate', cls:this.state.XlateClass}} />
                            <NavItem onItemClick={this.toggleActiveClass} props={{name: 'Jwt', id: 'jwt', route: '/cryptolabs/jwt', cls:this.state.JwtClass}} />
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;