

var startPrice;
var startBlock;
var offerPriceDecrement;
var endPrice;
var currentPrice;
var dutchSaleActive;
var timer;
let tokenNames = new Map();
var provider;
tokenNames.set(0, "1x1 Binary");
tokenNames.set(1, "2x2 Binary");
tokenNames.set(2, "4x4 Binary");
tokenNames.set(3, "8x8 Binary");
tokenNames.set(4, "16x16 Binary");
tokenNames.set(5, "32x32 Binary");
tokenNames.set(6, "64x64 Binary");
tokenNames.set(7, "128x128 Binary");
tokenNames.set(8, "256x256 Binary");
tokenNames.set(9, "512x512 Binary");

tokenNames.set(10, "1x1 Blue Duration");
tokenNames.set(11, "2x2 Blue Duration");
tokenNames.set(12, "4x4 Blue Duration");
tokenNames.set(13, "8x8 Blue Duration");
tokenNames.set(14, "16x16 Blue Duration");
tokenNames.set(15, "32x32 Blue Duration");
tokenNames.set(16, "64x64 Blue Duration");
tokenNames.set(17, "128x128 Blue Duration");


// if (window.ethereum) {
//   handleEthereum();
// } else {
//   window.addEventListener('ethereum#initialized', handleEthereum, {
//     once: true,
//   });
//
//   // If the event is not dispatched by the end of the timeout,
//   // the user probably doesn't have MetaMask installed.
//   setTimeout(handleEthereum, 3000); // 3 seconds
// }
//
// function handleEthereum() {
//   const { ethereum } = window;
//   if (ethereum && ethereum.isMetaMask) {
//     console.log('Ethereum successfully detected!');
//     // Access the decentralized web!
//   } else {
//     console.log('Please install MetaMask!');
//   }
// }

async function loadWeb3() {

      // For MetaMask or Mist compatibility:


  if (window.ethereum) {

    getCurrentAccount();

    window.web3 = new Web3(window.ethereum);

    //ENS provider
    provider = new ethers.providers.Web3Provider(window.ethereum)

    // .then(function(res) {
    //   updateStatus("Connected to: " + res.substr(1, 8));
    // }, function(err) {
    //   console.log(err)
    // })

    var subscriptionId = window.web3.eth.subscribe('newBlockHeaders', function(error, result) {
      if (!error) {
        return;
      }
      console.error(error);
    }).on("connected", function(subscriptionId) {
      console.log("subscribed as: ", subscriptionId);
    }).on("data", function(blockHeader) {
      // let elapsed = Date.now()-timer;
      // console.log(elapsed);
      // timer = Date.now();
      // console.log("block ",blockHeader);
      // console.log(blockHeader.number);
      // updatePriceLocal(blockHeader.number);
      updatePriceContract();
      getTokensSold();
    }).on("error", console.error);
  }else{
    console.log("cant load window.ethereum");
  }

}

async function connect() {
  await loadWeb3();
  // await tryConnectPop();
  window.contract = await loadContract();
  getTokensSold();

  await getPriceVariables();
  // updatePriceLocal();
  updatePriceContract();
}

async function load() {


  await loadWeb3();
  // await tryConnectPop();
  window.contract = await loadContract();
  getTokensSold();
  // updatePrice();
  await getPriceVariables();
  // updatePriceLocal();
  updatePriceContract();
}

async function getPriceVariables() {
  dutchSaleActive = await window.contract.methods.dutchAuctionActive().call();
  startPrice = await window.contract.methods.startPrice().call();
  startBlock = await window.contract.methods.startBlock().call();
  offerPriceDecrement = await window.contract.methods.offerPriceDecrement().call();
  endPrice = await window.contract.methods.endPrice().call();
  console.log(startPrice, startBlock, offerPriceDecrement, endPrice);
}

function updatePriceLocal(blockNumber) {

  // calculate price for previous block, so price is always

  currentPrice = startPrice - (blockNumber - startBlock) * offerPriceDecrement;
  if (currentPrice < endPrice || currentPrice > startPrice) {
    currentPrice = endPrice;
  }
  console.log(currentPrice);

  var saleInfo;

  if (dutchSaleActive) {
    // const weiPrice = await window.contract.methods.getDutchPrice().call();
    // if( !isNaN(currentPrice) ){
      const ethPrice = web3.utils.fromWei(currentPrice.toString(), 'ether');
    // }
    // console.log(ethPrice);
    saleInfo = "Purchase for " + Number.parseFloat(ethPrice).toPrecision(6) + " ETH";
  } else {
    saleInfo = " Purchasing paused "
  }

  let currentPrices = document.getElementsByClassName('currentPrice');
  for (var i = 0; i < currentPrices.length; i++) {
    currentPrices[i].innerHTML = saleInfo;
  }
}

async function updatePriceContract() {

  dutchSaleActive = await window.contract.methods.dutchAuctionActive().call();
  var saleInfo;

  if (dutchSaleActive) {
    const weiPrice = await window.contract.methods.getDutchPrice().call();
    const ethPrice = web3.utils.fromWei(weiPrice, 'ether');
    // console.log(ethPrice);
    saleInfo = "Purchase for " + Number.parseFloat(ethPrice).toPrecision(6) + " ETH";
  } else {
    saleInfo = " Purchasing paused "
  }

  let currentPrices = document.getElementsByClassName('currentPrice');
  for (var i = 0; i < currentPrices.length; i++) {
    currentPrices[i].innerHTML = saleInfo;
  }
}

async function getTokensSold() {
  let buttons = document.getElementsByClassName('buybutton');

  for(var button of buttons){
    // console.log(button.id);

    try{
     //this will throw an error if the token isn't minted
     var isMinted = await window.contract.methods.isTokenMinted(button.id).call();
     // console.log(isMinted);
     if(isMinted){
       var tokenOwner = await window.contract.methods.ownerOf(button.id).call();
       // button.innerHTML = "Collected by ";
       var ensName = await provider.lookupAddress(tokenOwner);
       if(ensName != null){
         button.innerHTML = "Collected by "+ `<a href=https://etherscan.io/address/${tokenOwner} target="_blank" >` + ensName + "</a>";
       }else{
         button.innerHTML = "Collected by "+ `<a href=https://etherscan.io/address/${tokenOwner} target="_blank" >` + tokenOwner.substr(1, 8) + "</a>";
         // button.innerHTML =
       }
       // button.onclick = "";
       // var clickLink = `window.open("https://etherscan.io/address/${tokenOwner}", "_blank");`

       // console.log(targetLink);
       //This works, it just keeps adding links tho!

       // var link = document.createElement("a");
       // link.href = `https://etherscan.io/address/${tokenOwner}`;
       // link.target = "_blank";
       // // var link =
       // button.parentNode.insertBefore(link, button);
       // button.parentNode.removeChild(button);
       // link.appendChild(button);



      //  button.onclick = function() {
      //   // location.href= targetLink;
      //   // let link = targetLink;
      //   window.contract.methods.ownerOf(button.id).call().then(function(res) {
      //     var targetLink = `https://etherscan.io/address/${res}`
      //     window.open(targetLink);
      //     }, function(err) {
      //       console.log(err)
      //     })
      // };
       button.classList.add("sold");
    }
    }catch(err){
     console.log(err);
    }

  }

}

// async function Reverse(address) {
//
//   // var hash = namehash.hash('foo.eth')
//
//     var lookup=address.toLowerCase().substr(2) + '.addr.reverse'
//     var ResolverContract=await web3.eth.ens.getResolver(lookup);
//     // console.log(ResolverContract)
//     var nh= namehash(lookup);
//     var name=await ResolverContract.methods.name(nh).call()
//     console.log(name);
//     return name;
// }

function updateStatus(status) {
  const statusEl = document.getElementById('connectButton');
  statusEl.innerHTML = status;
  console.log(status);
}

async function loadContract() {
  return await new window.web3.eth.Contract(contractInfo.abi, contractInfo.address); // "0xd2bD647DF33d0A87D01d90333eBE68F64B8a6279"); //
}


async function mintDutch(tokenId) {

  if (dutchSaleActive) {

    const account = await getCurrentAccount();
    const price = await window.contract.methods.getDutchPrice().call();
    // console.log(price);
    const t = await window.contract.methods.buyDutch(tokenId).send({
      // value: web3.utils.toWei("0.5", 'ether'),
      value: price,
      from: account
    }, function(error, transactionHash) {
      if (!error) {
        console.log(transactionHash);

        if (window.confirm(`Congratulations! ${tokenNames.get(tokenId)} is yours, and will arrive in your wallet shortly. Click OK to view the transaction on Etherscan`)) {
           window.open(`http://etherscan.io/tx/${transactionHash}`, target="_blank");
        };
        // alert(`Congratulations! ${tokenNames.get(tokenId)} is yours, and will arrive in your wallet shortly. Transaction hash: ` + transactionHash);
      } else {
        console.log(error);
      }
    });

    getTokensSold();

  }
}

// async function mintToken(tokenId) {
//
//   const account = await getCurrentAccount();
//
//   const t = await window.contract.methods.buy(tokenId).send({
//     value: 1000000000000000000,
//     from: account
//   }, function(error, transactionHash) {
//     if (!error) {
//       console.log(transactionHash);
//     } else {
//       console.log(error);
//     }
//   });
//
//   getTokensSold();
//
// }

async function getCurrentAccount() {
  const accounts = await window.ethereum.send('eth_requestAccounts');
  updateStatus("Connected to: " + accounts.result[0].substr(1, 8));
  // const accounts = await window.web3.eth.getAccounts();
  return accounts.result[0];
}

load();
