import React, {useState, useEffect, Component} from 'react'
import axios from 'axios'

import Rebase from './Rebase';
import './Info.css';
import fetchData from './functions/fetchCoinGecko';

//import {getTokenSupply, getBurnedSupply} from './functions/etherScan';
import commas from './functions/commas';

import {appValues} from './AppValues'
import {secrets} from './Secrets'

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supply_start: 4012101,
            supply_burned: 2000000,
            supply_vested: 601815.16,
            remaining_total_supply: 0,
            remaining_vested_1_supply: 0,
            remaining_vested_2_supply: 0,
            remaining_burned_supply: 0
        };
    }

    // Only executed once
    // Perfect for requests
    async componentDidMount() {
        const token_supply_request = `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${appValues['CONTRACT_TOB_0x']}&apikey=${secrets['ETHERSCAN_API_KEY']}`;
        const burned_supply_request = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${appValues['CONTRACT_TOB_0x']}&address=${appValues['CONTRACT_BURN_0x']}&tag=latest&apikey=${secrets['ETHERSCAN_API_KEY']}`;
        const vested_supply_1_request = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${appValues['CONTRACT_TOB_0x']}&address=${appValues['CONTRACT_TOB_VESTED_1_0x']}&tag=latest&apikey=${secrets['ETHERSCAN_API_KEY']}`;
        const vested_supply_2_request = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${appValues['CONTRACT_TOB_0x']}&address=${appValues['CONTRACT_TOB_VESTED_2_0x']}&tag=latest&apikey=${secrets['ETHERSCAN_API_KEY']}`;

        await axios.get(token_supply_request)
            .then(res => {
                this.setState({
                    remaining_total_supply: res.data.result / Math.pow(10,appValues['CONTRACT_TOB_DECIMALS'])
                });
                console.log(res);
            })

        await axios.get(burned_supply_request)
            .then(res => {
                this.setState({
                    remaining_burned_supply: res.data.result / Math.pow(10,appValues['CONTRACT_TOB_DECIMALS'])
                });
                console.log(res.data.result);
            });

        await axios.get(vested_supply_1_request)
            .then(res => {
                this.setState({
                    remaining_vested_1_supply: res.data.result / Math.pow(10,appValues['CONTRACT_TOB_DECIMALS'])
                });
                console.log(res.data.result);
            });

        await axios.get(vested_supply_2_request)
            .then(res => {
                this.setState({
                    remaining_vested_2_supply: res.data.result / Math.pow(10,appValues['CONTRACT_TOB_DECIMALS'])
                });
                console.log(res.data.result);
            });
    }

    render() {
        return (
            <div className='outerDiv'>
                <div className='burnDiv innerDiv'>
                    <h2> Supply Data </h2>
                    <h5>
                        TOB is a highly deflationary asset.<br/>
                        Total supply dwindles to 1 coin, divisible by 9 decimal points, at around 750 Burns.
                    </h5>

                    <h4>
                        Supply Start: {commas(this.state.supply_start)} <br/>
                        Supply Burned: {commas(this.state.supply_burned)} <br/>
                        Supply Vested: {commas(this.state.supply_vested)} <br/>
                    </h4>

                    <h4>
                        Supply Adjusted: {commas(this.state.remaining_total_supply.toFixed(2))}<br/>
                        Supply Burned: {commas(this.state.remaining_burned_supply.toFixed(2))} ({((this.state.remaining_burned_supply/this.state.remaining_total_supply)*100).toFixed(2)}%)<br/>
                        Supply Vested: {commas((this.state.remaining_vested_1_supply + this.state.remaining_vested_2_supply).toFixed(2))}<br/>
                        Supply Remaining: {commas((this.state.remaining_total_supply -
                                                    (this.state.remaining_burned_supply +
                                                     this.state.remaining_vested_1_supply +
                                                     this.state.remaining_vested_2_supply)).toFixed(2))}<br/>
                    </h4>

                    <h5>
                        Dev vesting period of 8 months, locked into contract.<br/>
                        Dev can withdraw at steady rate once per block, divided by number of blocks mined over 8 months.<br/>
                        Duration: 1,382,400 blocks. Roughly 240 days.<br/>
                        <a className='innerLink' href='https://etherscan.io/address/0xa44cc80840f205fb2bf001765c012476766fae13' target='_blank' rel='noopener noreferrer'> First vesting deposit @ 541,633.64 $TOB</a><br/>
                        <a className='innerLink' href='https://etherscan.io/address/0x3474ea3e41372efecbdc1b41a3c92df293370aa8' target='_blank' rel='noopener noreferrer'> Second vesting deposit @ 60,181.52 $TOB</a>
                    </h5>

                    <Rebase data={this.state} />
                </div>
            </div>
        )
    }
}

export default Info;
