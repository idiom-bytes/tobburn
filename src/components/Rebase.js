import CoinGecko from 'coingecko-api';
import React, {useState, Component} from 'react';
import Web3 from 'web3';
import Timer from './Timer';
import moment from 'moment'
import RebaseInfo from './RebaseInfo';
import './Info.css';
import Price from './Price';

//import fetchData from './functions/fetchCoinGecko';

// const firebaseFunctions = require('firebase-functions')

// REBASE CONTRACT DETAILS
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"RebaseFail","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"delta","type":"uint256"}],"name":"RebaseSuccess","type":"event"},{"inputs":[],"name":"_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_rebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"canOperateRebase","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_t","type":"uint256"}],"name":"changePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"changePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"changeToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentExchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"guarded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastExchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRebase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextSupplyDelta","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"contract IUniswapV2Pair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"refresh","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"exchangeRate","type":"uint256"}],"name":"shouldRebase","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeBetweenRebases","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IRebaseableERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferTokenOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unguard","outputs":[],"stateMutability":"nonpayable","type":"function"}]

// V0.1
// rebaseAddress: '0x8ceb211a7567cf399e1ee01e6974bf4a13b64c04',
// V0.2
// rebaseAddress: '0x8bfd055a49a162b595530a9aaa30e9b736f5b619',
// V0.3 ?
// rebaseAddress: '0x68d95dfcd2916cf76a72d1dee5b7bcecf14adb44',
const rebaseAddress = '0x68D95Dfcd2916cf76a72d1dEe5b7BcEcf14aDb44';

//const Rebase = (props) => {
class Rebase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tob_currentExchangeRate: 0,
            tob_lastExchangeRate: 0,
            tob_lastRebaseDate: 0,
            tob_timeBetweenRebases: 0,
            tob_nextRebaseDate: null,
            tob_lastRebaseDateString: '',
            tob_nextRebaseDateString: '',
            tob_canRebaseDate: false,
            tob_canRebaseRate: false,
            tob_canRebase: false,

            // Rebase Call related states
            msg: '',
            hash: '',
            success: '',
            timeout: 0,
            metamaskInstalled: false,
            ethereumEnabled: false,
        }
    };

    // Only executed once
    // Perfect for requests
    async componentDidMount() {
        // GET INFURA/WEB3 INTERFACE
        // DEV
        const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/02b71bfb96f94097a2df9ae5566a2f20"));
        // PROD
        // const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/8d642eca56e045bd9d0518db58c8e2ef"));
        // ENV CONFIG
        //const web3 = new Web3(new Web3.providers.HttpProvider(firebaseFunctions.config().firebase.url));
        console.log(web3.utils)
        const tobContract = new web3.eth.Contract(abi, rebaseAddress);

        // CODE FROM TG BOT
        // TOB TOB TOB
        // Today's Date
        const now = new Date();

        // STEP #1
        // TOB PRICE LOGIC
        // Price in USD
        await tobContract.methods.currentExchangeRate().call()
        .then(res => {
            this.setState({tob_currentExchangeRate: (res/10000000000).toFixed(6)});
        })
        console.log('TOB-currenctExchangeRate: ', this.state.tob_currentExchangeRate);

        await tobContract.methods.lastExchangeRate().call()
        .then(res => {
            this.setState({tob_lastExchangeRate: (res/10000000000).toFixed(6)});
        })
        console.log('TOB-lastRebaseRate: ', this.state.tob_lastExchangeRate);

        // STEP #2
        // TOB DATE LGOIC
        // Last Rebase Date - Moment Date
        await tobContract.methods.lastRebase().call()
        .then(async (res) => {
          this.setState({tob_lastRebaseDate: moment(new Date(res * 1000))});
        })
        console.log('TOB-lastRebaseDate: ', this.state.tob_lastRebaseDate);

        // Time Between Rebases - In Seconds
        await tobContract.methods.timeBetweenRebases().call()
        .then(async (res) => {
            var timeBetweenRebases = res;

            console.log('this.state.tob_lastRebaseDate ', this.state.tob_lastRebaseDate)

            var nextRebaseDate = this.state.tob_lastRebaseDate.clone();
            nextRebaseDate.add(timeBetweenRebases, 'seconds')

            // DEBUG LOGIC TO SIMULATE REBASE COUNTDOWN
            // var nextRebaseDate = moment(new Date())
            // nextRebaseDate.add(10, 'seconds')

            var lastRebaseDateString = this.state.tob_lastRebaseDate.format('MM/DD/YYYY HH:mm:ss');
            var nextRebaseDateString = nextRebaseDate.format('MM/DD/YYYY HH:mm:ss');

            this.setState({
                tob_timeBetweenRebases: timeBetweenRebases,
                tob_nextRebaseDate: nextRebaseDate,
                tob_lastRebaseDateString: lastRebaseDateString,
                tob_nextRebaseDateString: nextRebaseDateString,
            });
        })
        console.log('TOB-timeBetweenRebase: ', this.state.tob_timeBetweenRebases);
        console.log('TOB-nextRebaseDate: ', this.state.tob_nextRebaseDate);
        console.log('TOB-nextRebaseDate as date: ', this.state.tob_nextRebaseDate.toDate().getTime());
        console.log('Now time: ', now.getTime());

        // STEP #3
        // TOB CAN REBASE LOGIC
        this.setState({
            tob_canRebaseDate: now.getTime() > this.state.tob_nextRebaseDate,
            tob_canRebasePrice: this.state.tob_currentExchangeRate > this.state.tob_lastExchangeRate,
            tob_canRebase: this.state.tob_canRebaseDate === true || this.state.tob_canRebasePrice === true
        })
        console.log('TOB-canRebaseDate: ', this.state.tob_canRebaseDate);
        console.log('TOB-canRebasePrice: ', this.state.tob_canRebasePrice);
        console.log('TOB-canRebase: ', this.state.tob_canRebase);
    };

    setTimeOut = () => {
        this.setState({
            msg: '',
            timeout: 10000
        })
    }

    callRebase = () => {
        const diffTime = this.state.tob_nextRebaseDate ? this.state.tob_nextRebaseDate.toDate() - new Date() : new Date()
        const duration = moment.duration(diffTime)

        if (window.ethereum) {
            if (window.web3.currentProvider.isMetaMask && window.ethereum.selectedAddress !== null) {
                if (this.state.tob_canRebase || duration.asSeconds() < 0.0) {
                    const transactionParameters = {
                        to: rebaseAddress,
                        from: window.ethereum.selectedAddress,
                        data: '0xaf14052c',
                    }
                    window.ethereum.request({method: 'eth_sendTransaction', params: [transactionParameters]})
                        .then(res => {
                            console.log(res)
                            this.setState({
                                msg: 'View transaction here.',
                                hash: res,
                                success: true
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            this.setState({
                                msg: 'Failed to go through.',
                                timeout: 10000
                            });
                        })
                } else {
                    this.setState({
                        msg: 'You must wait until the timer above is expired.',
                        timeout: 10000
                    });
                }
            } else {
                // If ethereum/web3 is enabled, we should be able to turn on Metamask
                this.connectMetaMask();
            }
        } else {
            // If etherum/web3 is not enabled, send them to metamask
            window.open('https://metamask.io/')
        }
    };

    connectMetaMask = () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        }
    };

    getRebaseButton = () => {
        if (typeof window.ethereum === 'undefined') {
            return (
                <div>
                    <a href='https://metamask.io/' target='_blank' rel='noopener noreferrer'>
                        <button className='rebaseButtonDisabled' onClick={this.connectMetaMask}>
                            Please install Metamask and reload
                        </button>
                    </a>

                    <Timer data={this.state} callRebase={this.callRebase}/>
                </div>
            )
        } else {
            if( window.ethereum.selectedAddress === null ) {
                return (
                    <div>
                        <button className='rebaseButton' disabled>
                            Please connect to Metamask
                        </button>

                        <Timer data={this.state} callRebase={this.callRebase}/>
                    </div>
                )
            } else {
                return (
                    <Timer data={this.state} callRebase={this.callRebase}/>
                )
            }
        }
    };

    render() {
      return(
        <div className='rebaseDiv'>

            {/* Rebase Description + Selling Myself = Drummond's Slut */}
            <RebaseInfo data={this.state}/>

            <div className='priceDiv'>
                <div className='innerPriceDiv'>
                    <p className='priceP'>${this.state.tob_currentExchangeRate} USD</p>
                    <p className='infoP'>Current Price</p>
                </div>
                <div className='innerPriceDiv'>
                    <p className='priceP'>${this.state.tob_lastExchangeRate} USD</p>
                    <p className='infoP'>Rebase Target Price</p>
                </div>

                <div className='innerPriceDiv'>
                    <p className='priceP'>{this.state.tob_lastRebaseDateString}</p>
                    <p className='infoP'>Last Rebased Date</p>
                </div>
                <div className='innerPriceDiv'>
                    <p className='priceP'>{this.state.tob_nextRebaseDateString}</p>
                    <p className='infoP'>Next Rebase Date</p>
                </div>
            </div>

            {this.getRebaseButton()}

            <Price />
        </div>
      )
    }
}

export default Rebase;
