var startPrice;
var startBlock;
var offerPriceDecrement;
var endPrice;
var currentPrice;
var dutchSaleActive;
var saleActive;
var preSaleActive;
var timer;


var provider;

var ethersContract;

const ownerNames = new Map();


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

function getSha(value) {
  var obj = new jsSHA("SHA3-256", "TEXT");
  obj.update(value);
  var hexHash = obj.getHash("HEX");
  var dec = parseInt(hexHash, 16);
  var decModulo = dec % 999;
  return decModulo;
}

function getTokenHash() {
  // var tokenRand = (Math.random()*1000).toFixed(0);
  // var sr = tokenRand + '';
  // var s = "RANDOM" + tokenRand.toString();
  // var hash = getSha(s);

  var demoRand = (Math.random() * (window.demoHashes.length - 1)).toFixed(0);
  while(demoRand == 420 || demoRand == 69){
    demoRand = (Math.random() * (window.demoHashes.length - 1)).toFixed(0);
  }

  var output = demoRand + ", " + window.demoHashes[demoRand];
  return output
}

async function generateSvgs() {
  // var svg1 =
  document.getElementById("svg1").textContent = getTokenHash();
  document.getElementById("svg2").textContent = getTokenHash();
  document.getElementById("svg3").textContent = getTokenHash();
  document.getElementById("svg4").textContent = getTokenHash();
  document.getElementById("svg5").textContent = getTokenHash();
  document.getElementById("svg6").textContent = getTokenHash();

  // svg1.setAttribute("textContent",output);
}

generateSvgs();

function handleEthereum() {
  const {
    ethereum
  } = window;
  if (ethereum && ethereum.isMetaMask) {
    console.log('Ethereum successfully detected!');
    // Access the decentralized web!
  } else {
    console.log('Please install MetaMask!');
  }
}

async function loadWeb3() {

  // For MetaMask or Mist compatibility:


  if (window.ethereum) {

    getCurrentAccount();

    window.web3 = new Web3(window.ethereum);

    //ENS provider
    provider = new ethers.providers.Web3Provider(window.ethereum)


    const network = "homestead";
    provider = ethers.getDefaultProvider(network, {
      etherscan: "QUIA2G2DDEUE527S3FF3ENP3FZYE7Z5ZBC",
      infura: "d7597cd29eec44f9987c10c446edfaca",
      alchemy: "b1q6TScVzZvCa849Vvn3Bz6i-gBgEwFd"
    })

    ethersContract = new ethers.Contract(window.contractInfo.address, window.contractInfo.abi, provider);


    var subscriptionId = window.web3.eth.subscribe('newBlockHeaders', function(error, result) {
      if (!error) {
        return;
      }
      console.error(error);
    }).on("connected", function(subscriptionId) {
      console.log("subscribed as: ", subscriptionId);
    }).on("data", function(blockHeader) {

      // updatePriceContract();
      getTokensSold();
      updateTokenToClaim();

    }).on("error", console.error);

  } else {

    window.addEventListener('ethereum#initialized', handleEthereum, {
      once: true,
    });

    setTimeout(handleEthereum, 3000); // 3 seconds

    // console.log("cant load window.ethereum");

  }

}

async function connect() {
  await loadWeb3();
  // await tryConnectPop();
  window.contract = await loadContract();
  getTokensSold();

  // await getPriceVariables();
  // updatePriceLocal();
  // updatePriceContract();
}

async function load() {

  //testing to see if this will work after connectino
  // if(window.ethereum){
  //   // loadWeb3();
  // if (window.ethereum) {
  //   var acct = await getCurrentAccount();
  //   console.log("current acct :", acct);
  //   if(acct != null){
  //     getTokensSold();
  //   }
  // }
  // window.web3.eth.getAccounts(function(err, accounts){
  //   if (err != null) console.error("An error occurred: "+err);
  //   else if (accounts.length == 0) console.log("User is not logged in to MetaMask");
  //   else console.log("User is logged in to MetaMask");
  // });
  //   getCurrentAccount();
  // //
  // }
  // getCurrentAccount();

  await loadWeb3();

  window.contract = await loadContract();
  getTokensSold();

  // await getPriceVariables();

  // updatePriceContract();
  updateTokenToClaim();
}


async function updateTokenToClaim() {

  saleActive = await window.contract.methods.standardSaleActive().call();
  preSaleActive = await window.contract.methods.preSaleActive().call();
  // var tokenToClaim = await window.contract.methods.totalSupply().call();

  // let tokenCounter = document.getElementById('tokencounter');
  // let counterText  = tokenToClaim + "/1000";
  // tokenCounter.innerHTML = counterText;


  var saleInfo;

  if (preSaleActive) {
    var tokenToClaim = await window.contract.methods.totalSupply().call();
    var currentPrice = await window.contract.methods.pricePerPiece().call();
    const ethPrice = web3.utils.fromWei(currentPrice.toString(), 'ether');
    // saleInfo = "Purchase for " + Number.parseFloat(ethPrice).toPrecision(6) + " ETH";
    if (tokenToClaim > 1000) {
      saleInfo = "Sold out! 1000/1000";
    } else {
      saleInfo = "Mint token " + tokenToClaim + " for " + ethPrice + " ETH";
    }
  } else {
    saleInfo = "Presale mint paused "
  }

  let preSaleButton = document.getElementById('preSaleMintButton');
  if(preSaleButton != null){
    preSaleButton.innerHTML = saleInfo;
  }

  if (saleActive) {
    var tokenToClaim = await window.contract.methods.totalSupply().call();
    var currentPrice = await window.contract.methods.pricePerPiece().call();
    const ethPrice = web3.utils.fromWei(currentPrice.toString(), 'ether');
    if (tokenToClaim > 1000) {
      saleInfo = "Sold out! 1000/1000";
    } else {
      saleInfo = "Mint token " + tokenToClaim + " for " + ethPrice + " ETH";
    }
  } else {
    saleInfo = "Minting Closed "
  }

  let publicButton = document.getElementById('publicMintButton');
  if(publicButton != null){
    publicButton.innerHTML = saleInfo;
  }

  // currentPrices[0].innerHTML = saleInfo;


}

async function getTokensSold() {

  var numMinted = await window.contract.methods.totalSupply().call();
  var owners = await window.contract.methods.getOwners(0, numMinted).call();
  var elements = document.getElementById('numbersPurchased').getElementsByTagName('tbody');
  // var table = document.getElementById('numbersPurchased');

  //Add rows
  while (elements[0].rows.length < owners.length) {
    elements[0].insertRow(0);
  }

  //Update data
  for (var i = 0; i < elements[0].rows.length; i++) {
    var hash = window.demoHashes[i];
    if( i == 69 ){
      hash = 420;
    }
    if( i == 420){
      hash = 69;
    }
    var output = '<td class="alignright">' + i + '</td> <td class="alignleft">' + hash + '</td>  <td class="ellipsis"><span> <a href="https://opensea.io/' + owners[i] + '?search[sortBy]=LISTING_DATE&search[query]=token%20hash" target="_blank">' + owners[i] + '</a></span></td> ';
    elements[0].rows[elements[0].rows.length - 1 - i].innerHTML = output;
  }

  //Update names
  // for (var i = 0; i < elements[0].rows.length; i++) {
  //   var output = "";
  //   if (ownerNames.has(owners[i])) {
  //      output = '<td class="alignright">' + i + '</td> <td class="alignleft">' + window.demoHashes[i] + '</td>  <td class="ellipsis"><span> <a href="https://opensea.io/' + owners[i] + '?search[sortBy]=LISTING_DATE&search[query]=token%20hash" target="_blank">' + ownerNames.get(owners[i]) + '</a></span></td> ';
  //   } else {
  //     provider.lookupAddress(owners[i]).then(function(err, res) {
  //       //Save the name and set the button text
  //       var hash = "temp value";
  //       if (res != null) {
  //         ownerNames.set(owners[i], res);
  //         output = '<td class="alignright">' + i + '</td> <td class="alignleft">' + window.demoHashes[i] + '</td>  <td class="ellipsis"><span> <a href="https://opensea.io/' + owners[i] + '?search[sortBy]=LISTING_DATE&search[query]=token%20hash" target="_blank">' + res + '</a></span></td> ';
  //
  //         // output = '<td>' + i + '</td> <td>' + window.demoHashes[i] + '</td> <td>' + res + '</td> '
  //       } else {
  //         ownerNames.set(owners[i], owners[i]);
  //         output = '<td class="alignright">' + i + '</td> <td class="alignleft">' + window.demoHashes[i] + '</td>  <td class="ellipsis"><span> <a href="https://opensea.io/' + owners[i] + '?search[sortBy]=LISTING_DATE&search[query]=token%20hash" target="_blank">' + owners[i] + '</a></span></td> ';
  //
  //         // output = '<td>' + i + '</td> <td>' + window.demoHashes[i] + '</td> <td>' + owners[i] + '</td> '
  //       }
  //     });
  //   }
  //   elements[0].rows[elements[0].rows.length - 1 - i].innerHTML = output;
  // }


}

//ENs name stuff for list
// var id=document.getElementById('addrow').getElementsByTagName('tbody')[0];
// var i = 0;


//Only update the list if we have new owners - this will mean that the list won't update if someone just moves or buys a token
// if( owners.length > elements[0].rows.length){
//
//   for(var owner of owners){
//   // for(var i=0; i < owners.length; i ++){
//   // owners.forEach(function (owner, i){
//      //check for ENS name
//      if(ownerNames.has(owners[i])){
//        output = '<td>'+i+'</td> <td>'+hash+'</td> <td>'+ownerNames.get(owners[i])+'</td> '
//      }else{
//           provider.lookupAddress(owners[i]).then(function(err, res){
//           //Save the name and set the button text
//           var hash  = "temp value";
//           if(res != null){
//            ownerNames.set(owners[i], res);
//            output = '<td>'+i+'</td> <td>'+hash+'</td> <td>'+res+'</td> '
//          }else{
//            ownerNames.set(owners[i], owners[i]);
//            output = '<td>'+i+'</td> <td>'+hash+'</td> <td>'+owners[i]+'</td> '
//          }
//         })
//
//      }
//
//        //Generate hash
//       //  window.contract.methods.generateHash(i).call().then(function (err, hash){
//       //   if( i < elements[0].rows.length){
//       //     elements[0].rows[i].innerHTML = output; //<td> <a href=https://testnets.opensea.io/assets/0x1fd6e8026c44956d7994926a70981fb34919419d'+owners[i]+' target="_blank">Bid</a></td>
//       //   }else{
//       //     var newrow = elements[0].insertRow();
//       //     newrow.innerHTML = output;  //<td> <a href=https://testnets.opensea.io/assets/0x1fd6e8026c44956d7994926a70981fb34919419d'+owners[i]+' target="_blank">Bid</a></td>
//       //   }
//       // });
//    }
// }



function updateStatus(status) {
  const statusEl = document.getElementById('connectButton');
  statusEl.innerHTML = status;
  console.log(status);
}

async function loadContract() {
  return await new window.web3.eth.Contract(contractInfo.abi, contractInfo.address); // "0xd2bD647DF33d0A87D01d90333eBE68F64B8a6279"); //
}

//
// async function mintDutch(tokenId) {
//
//   if (dutchSaleActive) {
//
//     const account = await getCurrentAccount();
//     const price = await window.contract.methods.getDutchPrice().call();
//     // console.log(price);
//     const t = await window.contract.methods.buyDutch(tokenId).send({
//       // value: web3.utils.toWei("0.5", 'ether'),
//       value: price,
//       from: account
//     }, function(error, transactionHash) {
//       if (!error) {
//         console.log(transactionHash);
//
//         if (window.confirm(`Congratulations! ${tokenNames.get(tokenId)} is yours, and will arrive in your wallet shortly. Click OK to view the transaction on Etherscan`)) {
//            window.open(`http://etherscan.io/tx/${transactionHash}`, target="_blank");
//         };
//         // alert(`Congratulations! ${tokenNames.get(tokenId)} is yours, and will arrive in your wallet shortly. Transaction hash: ` + transactionHash);
//       } else {
//         console.log(error);
//       }
//     });
//
//     getTokensSold();
//
//   }
// }

async function preSaleMint() {

  const account = await getCurrentAccount();

  console.log(window.whitelistAddresses);
  console.log(parseInt(account));

  if (!window.whitelistAddresses.includes(parseInt(account, 16))) {

    alert(`Account address ${account} is not in the whitelist!`);

  } else {

    var currentPrice = await window.contract.methods.pricePerPiece().call();
    const t = await window.contract.methods.preMint().send({
      value: currentPrice,
      from: account
    }, function(error, transactionHash) {
      if (!error) {
        console.log(transactionHash);

        if (window.confirm(`Congratulations! Your token will arrive in your wallet shortly. Click OK to view the transaction on Etherscan`)) {
          window.open(`http://etherscan.io/tx/${transactionHash}`, target = "_blank");
        };
        // alert(`Congratulations! ${tokenNames.get(tokenId)} is yours, and will arrive in your wallet shortly. Transaction hash: ` + transactionHash);
      } else {
        console.log(error);
      }
    });

    updateTokenToClaim();
    getTokensSold();

  }

}

async function publicMint() {

  const account = await getCurrentAccount();
  var currentPrice = await window.contract.methods.pricePerPiece().call();

  const t = await window.contract.methods.mint().send({
    value: currentPrice,
    from: account
  }, function(error, transactionHash) {
    if (!error) {
      console.log(transactionHash);
      if (window.confirm(`Congratulations! Your token will arrive in your wallet shortly. Click OK to view the transaction on Etherscan`)) {
        window.open(`http://etherscan.io/tx/${transactionHash}`, target = "_blank");
      };
      // alert(`Congratulations! ${tokenNames.get(tokenId)} is yours, and will arrive in your wallet shortly. Transaction hash: ` + transactionHash);
    } else {
      console.log(error);
    }
  });

  updateTokenToClaim();
  getTokensSold();

}

ethereum.on('accountsChanged', handleAccountsChanged);

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else {
    getCurrentAccount();
  }
}

async function getCurrentAccount() {

  // ethereum
  //   .request({ method: 'eth_requestAccounts' })
  //   .then(handleAccountsChanged)
  //   .catch((err) => {
  //     if (err.code === 4001) {
  //       // EIP-1193 userRejectedRequest error
  //       // If this happens, the user rejected the connection request.
  //       console.log('Please connect to MetaMask.');
  //     } else {
  //       console.error(err);
  //     }
  //   });

  const accounts = await ethereum.request({
    method: 'eth_requestAccounts'
  });
  updateStatus("Connected to: " + accounts[0].substr(1, 8));
  // const accounts = await window.web3.eth.getAccounts();
  return accounts[0];
}

//this calls a bunch of web3 functions at start, but opens metamask without prompting so a bit messy
load();
