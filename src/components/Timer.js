import React, {useState, useEffect} from 'react';
import moment from 'moment'

// REBASE CONTRACT DETAILS
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"RebaseFail","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"delta","type":"uint256"}],"name":"RebaseSuccess","type":"event"},{"inputs":[],"name":"_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_rebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"canOperateRebase","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_t","type":"uint256"}],"name":"changePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"changePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"changeToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentExchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"guarded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastExchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRebase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextSupplyDelta","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"contract IUniswapV2Pair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"refresh","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"exchangeRate","type":"uint256"}],"name":"shouldRebase","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeBetweenRebases","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IRebaseableERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferTokenOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unguard","outputs":[],"stateMutability":"nonpayable","type":"function"}]

// V0.1
// rebaseAddress: '0x8ceb211a7567cf399e1ee01e6974bf4a13b64c04',
// V0.2
// rebaseAddress: '0x8bfd055a49a162b595530a9aaa30e9b736f5b619',
// V0.3 ?
// rebaseAddress: '0x68d95dfcd2916cf76a72d1dee5b7bcecf14adb44',
//const rebaseAddress = '0x68D95Dfcd2916cf76a72d1dEe5b7BcEcf14aDb44';
//
//const callRebase = (props) => {
//    if (window.ethereum) {
//      if (window.web3.currentProvider.isMetaMask) {
//        if (props.tob_canRebase) {
//          const transactionParameters = {
//            to: rebaseAddress,
//            from: window.ethereum.selectedAddress,
//            data:'0xaf14052c',
//          }
//          window.ethereum.request({method:'eth_sendTransaction',params:[transactionParameters]})
//            .then(res => {
//              console.log(res)
//              this.setState({
//                msg:'View transaction here.',
//                hash:res,
//                success:true
//              });
//            })
//            .catch(err => {
//              console.log(err);
//              this.setState({
//                msg:'Failed to go through.',
//                timeout: 10000
//              });
//            })
//        } else {
//           this.setState({
//             msg:'You must wait until the timer above is expired.',
//             timeout: 10000
//           });
//        }
//      }
//      else {
//        this.setState({msg:'You must connect to metamask.'})
//      }
//    } else {
//      this.setState({msg:'You must connect to metamask.'})
//    }
//};
//

const GetRebaseDisplay = (props) => {
  const diffTime = props.tob_nextRebaseDate ? props.tob_nextRebaseDate.toDate() - new Date() : new Date()
  const duration = moment.duration(diffTime)

  console.log('total seconds_left', duration.asSeconds())
  if(!props.tob_canRebase && duration.asSeconds() > 0.0 ) {
      return (
          <div className='targetRebase'>
            <p className='infoRebase'>Time Until Next Possible Rebase</p>
            <p className='timerRebase'>{duration.hours()} hours {duration.minutes()} minutes {duration.seconds()} seconds</p>
            <p className='infoRebase'>Or price needs to reach: {props.tob_lastExchangeRate}</p>

              <button className='rebaseButtonDisabled' disabled>
                    <div className='innerButtonDiv'>
                        <div></div>
                            <span className='rebaseSpan'>Rebase Disabled</span>
                        <div></div>
                    </div>
                </button>
          </div>
      )
  }
  else {
      return (
        <div className='innerPriceDiv'>
            <p className='priceP'>Rebase can be called.</p>

            {/*
                <button className='rebaseButton' onClick=callRebase/>
            */}
            <button className='rebaseButton'>
                <div className='innerButtonDiv'>
                    <div></div>
                        <span className='rebaseSpan'>Call Rebase</span>
                    <div></div>
                </div>
            </button>
        </div>
      )
  }
};

const Timer = (props) => {
  const [seconds, setSeconds] = useState((new Date().getTime()));
  useEffect(() => {
    let interval = null;
      interval = setInterval(() => {
        // :: removed seconds => since it can reference the one set in state on line 4
        setSeconds(seconds - 1);
      }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  // :: All components need to have a parent. you cant have many siblings on the render root else react would prob throw an error. you can use fragments <></> or if importing Fragment <Fragment></Fragment>
  return(
    <>
      <GetRebaseDisplay
        // :: is tob_canRebase being passed into timer?
        tob_canRebase={props.data.tob_canRebase}
        tob_lastExchangeRate={props.data.tob_lastExchangeRate}
        tob_nextRebaseDate={props.data.tob_nextRebaseDate}
      />
    </>
  )
}

export default Timer