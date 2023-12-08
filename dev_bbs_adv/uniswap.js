require('dotenv').config()
const { ethers } = require('ethers')

const ALCHEMY_MAINNET_URL = process.env.ALCHEMY_MAINNET_URL
const PRIV_KEY = process.env.PRIV_KEY
const PUB_KEY = process.env.PUB_KEY
const ALCHEMY_MAINNET_KEY = process.env.ALCHEMY_MAINNET_KEY
const ETHS_API_KEY = process.env.ETHS_API_KEY
const WETHAdress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

//const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_MAINNET_URL)
const provider = new ethers.providers.WebSocketProvider(`wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_MAINNET_KEY}`)
const wallet = new ethers.Wallet(PRIV_KEY)
const connectedWallet = wallet.connect(provider)

//address uniswap router contract 
const factoryInstance = new ethers.Contract('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
 ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
 connectedWallet
 )

//address teamfinance locker  
 /*const TeamfinanceInstance = new ethers.Contract('0xE2fE530C047f2d85298b07D9333C05737f1435fB',
 ['event Deposit(uint256 id, address, indexed tokenAddress, address indexed withdrawalAddress, uit256 amount, uint256 inlockTime)',
 'event LockDurationExtended(uint id, uint unLockTime)'],
 )

//address unicrypt locker 
 const UnicryptInstance = new ethers.Contract('0x663a5c229c09b049e36dcc11a9b0d4a8eb9db214',
 ['event onDeposit(address lpToken, address user, uint256 amount, uint256 lockDate, uint256 unlockDate)']
 )
 //address pinklock2 locker 
 const pinkLockInstance = new ethers.Contract('0x71b5759d73262fbb223956913ecf4ecc51057641',
 ['event LockedAdded(uit256 indexed id, address token, address owner, uint256 amount, uint256 unlockDate)']
 )
 */
 

//const getBalance = async () => {
//const balance = await provider.getBalance(PUB_KEY)
//console.log('your balance is :', balance.toBigInt())
//}

const getTotalSupply = async (contractAddress) => {
    const res = await fetch(`https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${ETHS_API_KEY}`)
    if(res.ok) {
        const data = await res.json()
        console.log('total supply', data.result)
    }
    
}

const getContractABI = async (contractAddress) => {
    const res = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ETHS_API_KEY}`)
    if(res.ok) {
        const data = await res.json()
        console.log('is contract verified:', data.status)
//        if(data.status) {
//            console.log(data.result)
//        }
    }
}

const getTotalLPToken = async (pairAddress) => {
    const res = await fetch(`https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${pairAddress}&apikey=${ETHS_API_KEY}`)
    if(res.ok) {
        const data = await res.json()
        console.log('total amount LP token is:', parseInt(data.result))
        return parseInt(data.result)
    }
}

const getWETHinPairAddress = async (pairAddress) => {
    const res = await fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${pairAddress}&address=${WETHAdress}&tag=latest&apikey=${ETHS_API_KEY}`)
    if(res.ok) {
        const data = await res.json()
        console.log('total amount WETH in pair address:', parseInt(data.result))
        return parseInt(data.result)
    }
}

//const getWETHLocked = async (pairAddress, LptokenAmount) => {
// const amount = LptokenAmount * await getWETHinPairAddress(pairAddress) / await getTotalLPToken(pairAddress)
// console.log('amount locked', amount)
// return parseInt(amount)
// }

//getBalance()
//getTotalSupply(WETHAdress)
//getContractABI(WETHAdress)

//created pair event listner
factoryInstance.on('PairCreated', async (token0, token1, pairAddress) => {
console.log(`
New Pair detected
=================
token0: ${token0}
token1: ${token1}
pairAddress: ${pairAddress}
`)
if(token0 != WETHAdress) {
    await getTotalSupply(token0) 
    await getContractABI(token0)
    await getTotalLPToken(pairAddress)
    await getWETHinPairAddress(pairAddress)
 } else if
    (token1 != WETHAdress) {
        await getTotalSupply(token1) 
        await getContractABI(token1)
        await getTotalLPToken(pairAddress)
        await getWETHinPairAddress(pairAddress)
} else
        console.log('no WETH detected in the pair')
})
