window.contractInfo = {
  "address":"0xFE21FBb7cbed10F2562CeBa9B9ea0003B88d427E",
  "abi":[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "givenPricePerPiece",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "givenWithdrawalAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "newTokenUriBase",
				"type": "string"
			}
		],
		"name": "MetadataUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Purchase",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "end",
				"type": "uint256"
			}
		],
		"name": "getOwners",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxNumberOfPieces",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "preMint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "preSaleActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "preSaleMinted",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pricePerPiece",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"name": "setPresaleActive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "givenPrice",
				"type": "uint256"
			}
		],
		"name": "setPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"name": "setSaleActive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "users",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "allowedMint",
				"type": "uint256[]"
			}
		],
		"name": "setWhitelistAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "givenWithdrawalAddress",
				"type": "address"
			}
		],
		"name": "setWithdrawalAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "standardSaleActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "whitelisted",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawEth",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawalAddress",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

}
// 0x5ec1dbb919d81a5d3f8578bf10123b7f3ad7b801
window.demoHashes = [670, 426, 688, 486, 692, 565, 143, 702, 689, 839, 690, 510, 4, 222, 776, 680, 236, 766, 942, 80, 371, 88, 801, 468, 97, 962, 71, 656, 91, 8, 384, 218, 946, 23, 210, 319, 574, 605, 502, 265, 820, 809, 756, 971, 517, 770, 803, 978, 100, 798,  377,750,455,458,597,966,511,494,305,834,279,58,959,64,805,635,945,188,787,313,333,717,347,557,138,568,95,82,573,773,337,545,687,398,661,694,283,464,294,89, 15,734,487,549,740,224,783,792,613,938,946,753,553,783,534,914,766,29,109,901,317,349,154,993,315,852,466,307,95,14,902,854,570,622,679,990,338,776,175,79,724,267,649,43,317,411,825,139,568,679,443,478,768,180,867,16,548,264,639,313,539,436,48,107,907,498,698,476,207,213,84,719,698,426,204,86,990,607,606,853,416,115,590,530,996,450,553,178,38,51,759,935,770,795,275,890,768,612,31,698,228,349,961,970,252,884,150,692,928,216,42,707,205,435,301,514,981,955,463,438,144,106,73,32,849,367,270,784,707,538,758,111,979,894,236,671,450,912,990,267,37,183,125,539,885,758,418,904,714,761,38,223,227,39,170,193,634,174,30,465,683,765,528,835,19,440,446,542,696,264,943,603,774,518,50,588,408,334,778,737,154,105,848,439,906,490,379,568,935,651,910,270,55,331,609,962,72,545,417,178,434,205,299,632,730,411,760,233,277,47,937,219,260,15,380,478,224,19,562,498,526,580,244,132,153,650,631,350,190,421,641,534,259,149,339,237,169,30,787,210,454,348,84,43,473,266,671,523,222,299,86,997,772,113,61,29,154,323,253,600,347,318,9,597,178,246,348,230,418,83,703,86,569,169,629,224,438,819,383,307,574,142,907,906,479,832,272,501,594,889,644,888,100,489,137,207,196,993,388,91,54,536,468,451,279,509,192,540,850,690,202,953,829,875,33,867,204,675,165,753,108,576,372,790,573,290,733,617,534,421,317,236,877,856,445,920,74,671,300,984,545,535,12,814,677,922,68,537,604,897,694,532,833,676,866,556,252,564,120,549,18,938,741,344,714,619,949,105,355,843,856,680,951,51,187,452,140,481,19,228,79,837,995,878,955,512,516,560,289,386,11,33,991,167,893,677,84,856,534,827,853,225,630,323,411,852,628,769,903,954,997,535,540,605,328,793,565,300,758,160,605,913,189,248,240,153,912,36,124,970,276,5,651,440,110,711,757,317,642,103,590,410,280,926,306,603,768,371,702,797,920,306,26,436,265,888,68,261,797,584,269,985,661,681,135,457,594,635,401,783,35,309,156,919,20,912,214,986,714,552,892,422,356,326,498,71,714,590,315,583,517,102,305,110,646,8,403,264,269,144,790,145,412,802,691,228,807,498,440,544,693,783,257,258,618,834,372,737,752,672,182,882,581,153,99,977,132,406,549,432,685,140,58,352,205,724,470,632,539,857,133,536,449,67,891,106,810,444,489,537,371,747,92,565,601,709,686,4,555,328,615,246,418,8,869,438,819,671,475,230,213,648,306,582,539,189,496,805,801,343,452,277,83,899,810,896,350,160,676,152,268,290,968,340,531,542,206,493,752,642,576,279,825,155,755,39,863,69,82,392,160,539,813,144,455,36,461,871,69,782,892,912,685,863,962,766,786,279,941,639,319,748,862,238,28,713,582,10,839,554,659,190,381,199,402,504,324,624,635,78,102,47,266,377,215,694,484,335,382,601,876,410,820,974,412,1,549,838,506,745,998,1,816,974,949,117,149,750,784,907,679,558,139,823,458,638,59,266,392,670,657,782,975,827,252,437,172,740,598,733,816,414,860,982,440,385,208,972,710,521,879,883,804,899,393,752,104,149,98,149,733,477,404,297,443,655,650,141,57,667,639,297,473,928,891,56,92,643,261,442,622,172,501,105,591,692,966,708,53,369,673,839,799,637,352,249,415,538,295,683,169,656,532,6,780,746,794,990,256,367,548,18,169,910,538,450,507,912,388,207,884,668,224,862,974,768,896,992,801,687,852,398,125,77,560,743,393,960,474,184,150,437,60,251,868,28,370,221,503,767,188,295,813,729,374,101,148,933,975,381,231,898,611,411,752,525,233,161,627,48,337,832,261,544,951,158,501,320,809,763,795,130,367,215,552,413,46,783,938,572,805,125,67,766,862,174,118,360,104,457,194,54,907,234,751,368,556,208,649,946,9,533,126,817,95,926,523,538,22,779,479,219,142,769,704,461,900,681,709,821,646,718,57,112,974,550,801,851,193,322,842,946,685,557,897,413,468,848,399,570 ];

window.whitelistAddresses = [0xEC6d36A487d85CF562B7b8464CE8dc60637362AC, 0x2D63a6Ee734287955Edc1201ef3344E5Fe7E2847, 0x202eCa424A8Db90924a4DaA3e6BCECd9311F668e, 0xb4ff5331cc6f3Bbd1743234ef9bE4B61b2B0aa77, 0xf930b0a0500d8f53b2e7efa4f7bcb5cc0c71067e, 0x6301Add4fb128de9778B8651a2a9278B86761423, 0x17fFe0B00ff5194827b69E469BD938be59c1B10c, 0x853C6b9A02BB87fad5625485d6835692a8230773, 0x5BA02f4Ff6Af1d9d2Af8774D10fD32Eb57d4E2E6, 0xAbc837FEeEb448D36173d92d9563F324bC3a273f, 0xc70b0B44e47E8604B4234F2d2D8E79540B0CF64B,0xA9838826d5Ef448e8D01f603eE3725039fea6351, 0xf5c1d55e94726962b4b517C949120C42D646e455,0x17fFe0B00ff5194827b69E469BD938be59c1B10c, 0x7BD4fB369068F29A15c159b27fA66f3E628eeFd4,0x26d3CB8579C68481982325f369d963Af35804995,0x06f4DB783097c632B888669032B2905F70e08105,0xa21FeD132341f41c7f96Cd9A5CDb3965bc0b74B0];
