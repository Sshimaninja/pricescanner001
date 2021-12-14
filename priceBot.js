const axios = require('axios');

  //Get USDC Pairs (Note: Don't use checksum address for whatever reason.)
  //Note: Token0 == USDC so we don't need to call it here and compare it to itself to find a good arbitrage deal
  function priceBot() {
    const uniswapv3Prices = async () => {
      try{
        const result = await axios.post(
          'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
          {   
            query:`
            {
              pools(
                orderBy: volumeUSD, 
                orderDirection: desc, 
                first: 10,
              where: {
                token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
                liquidity_gt: 0
              }
            )
              {
                token1{symbol}
                token0Price
                liquidity
                feeTier
              }
            }     
            `
          }    
        );
        console.log('UNISWAP POOLS');
        console.log(result.data.data.pools);
      } catch(error){
        console.error(error);
      }
    }
    uniswapv3Prices();

    const sushiPrices = async () => {
      try{
        const result = await axios.post(
          'https://gateway.thegraph.com/api/[api-key]/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0',
          {   
            query:`
            {
              pairs(
              first: 10
              orderBy: volumeUSD
              orderDirection: desc
              where: {
                token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
                reserve1_gt: 0
                }
              ) {
              token1{symbol}
              reserve1
              token0Price
              }
            }
            `
          }    
        );
        console.log('SUSHISWAP POOLS');      
        console.log(result.data.data.pairs);
      } catch(error){
        console.error(error);
      }
    }
    sushiPrices();
  }  
priceBot(); 

