import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import Timer from './Timer';
import RebaseInfo from './RebaseInfo';
import './Info.css';
import Icon from './images/flame'

const Rebase = (props) => {
  const [toggle, setToggle] = useState(false);
  const toggleOff = () => {
    setToggle(false);
  }
  const [hash,setHash] = useState({
    msg:'',
    hash:'',
    success:false,
  })
  const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"RebaseFail","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"delta","type":"uint256"}],"name":"RebaseSuccess","type":"event"},{"inputs":[],"name":"_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_rebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_a","type":"address"}],"name":"canOperateRebase","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_t","type":"uint256"}],"name":"changePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"changePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"changeToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentExchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"guarded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastExchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRebase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextSupplyDelta","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"contract IUniswapV2Pair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"refresh","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"exchangeRate","type":"uint256"}],"name":"shouldRebase","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeBetweenRebases","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IRebaseableERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferTokenOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unguard","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const address = '0xa42a8c0b4a9e789f775d9a6361b554ead338498e';
  const [data, setData] = useState({
    fetch:false,
    date: {},
    rate:0,
    contract:{},
  })
  const setTime = () => {
    setTimeout(() => {
      setHash({msg:''})
    },10000)
  }

  const callRebase= () => {
    if (window.ethereum) {
      if (window.web3.currentProvider.isMetaMask) {
        if (new Date(new Date(data.date).getTime() + 60 * 60 * 12 * 1000) < new Date().getTime()) {
          const transactionParameters = {
            to: address,
            from: window.ethereum.selectedAddress,
            data:'0xaf14052c',
          }
          window.ethereum.request({method:'eth_sendTransaction',params:[transactionParameters]})
            .then(res => {
              console.log(res)
              setHash({
                msg:'View transaction here.',
                hash:res,
                success:true
              });
            })
            .catch(err => {
              console.log(err);
              setHash({
                msg:'Failed to go through.'
              })
              setTime();
            })
        } else {
           setHash({
             msg:'You must wait until the timer above is expired.'
           })
           setTime();
        }
      }
      else {
        setHash({msg:'You must connected to metamask.'})
      }

    } else {
      setHash({msg:'You must connected to metamask.'})
    }
  }
  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
  },[]);
  useEffect(() => {
    if (!data.fetch) {
      const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/8d642eca56e045bd9d0518db58c8e2ef"));
      console.log(web3.utils)
      const contract = new web3.eth.Contract(abi, address);
      contract.methods.lastRebase().call()
        .then(res => {
          let date = new Date(res*1000)
          contract.methods.lastExchangeRate().call()
            .then(res => {
              console.log('$' + res/10000000000)
              setData({
                fetch:true,
                date:date,
                rate:(res/10000000000).toFixed(6),
                web3:web3,
                contract:contract,
              })
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        })

    }
  }, [data, abi]);
  const now = new Date();




  return(
    <div className='rebaseDiv'>
      {/* PRINCE INFO */}
      {!data.fetch ? null :
        <div className='priceDiv'>
          <div className='innerPriceDiv'>
            <p className='priceP'>${props.price.toFixed(6)} USD</p>
            <p className='infoP'>$TOB Current Price</p>
          </div>
          <div className='innerPriceDiv'>
            <p className='priceP rebaseP'>${data.rate} USD</p>
            <p className='infoP'>$TOB Last Rebase Price</p>
          </div>
        </div>
      }

      {/* Rebase Description + Selling Myself = Drummond's Slut */}
      <RebaseInfo info={data} handleClick={toggleOff} supply={props.supply} date={new Date(new Date(data.date).getTime() + 60 * 60 * 12 * 1000)}/>

      {/* Rebase Output / Completion */}
      {new Date(new Date(data.date).getTime() + 60 * 60 * 12 * 1000) > now.getTime() ?
        <Timer end={new Date(new Date(data.date).getTime() + 60 * 60 * 12 * 1000)}/> :
        <div>
          <p className='infoP'>Rebase eligible to be called</p>
        </div>
      }
      {hash.msg.length === 0 ?
        null : !hash.success ?
        <div className='alert errorAlert'><p className='alertText'>{hash.msg}</p></div> :
        <div className='alert successAlert'>
          <a className=' attLink alertText alertA' href={'https://etherscan.io/tx/' + hash.hash} target='_blank' rel='noopener noreferrer'>{hash.msg}</a>
          <p className='txNum'>Transaction Number: {hash.hash}</p>
        </div>
      }

      {/* Rebase Button */}
      <button className='rebaseButton' onClick={callRebase}><div className='innerButtonDiv'><div></div><span className='rebaseSpan'>Call Rebase</span><div></div></div></button>

      {/* Rebase Info
          {!toggle ?
            <p className='clickP' onClick={() => setToggle(true)}>More Info</p> :
            <RebaseInfo info={data} handleClick={toggleOff} supply={props.supply} date={new Date(new Date(data.date).getTime() + 60 * 60 * 12 * 1000)}/>
          }
      */}

    </div>
  )
}

export default Rebase;
