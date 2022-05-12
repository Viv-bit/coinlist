import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import bitcoinIcon from "../assets/icons8-bitcoin-48.png";
import ethereumIcon from "../assets/icons8-ethereum-48.png";
import dashIcon from "../assets/icons8-dash-64.png";
import tronIcon from "../assets/icons8-tron-64.png";
import bnbIcon from "..//assets/1839.png";
import cusdIcon from "../assets/7236.png";
import fusdIcon from "../assets/fusd.png";
import busdIcon from "../assets/binance-usd-busd-logo.png";
import usdtIcon from "../assets/825.png"

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function CoinTable() {
  const coins = [
    {
      key: "BTC",
      label: "Bitcoin",
      image: bitcoinIcon,
    },
    {
      key: "BNB",
      label: "Binance Coin",
      image: bnbIcon,
    },
    {
      key: "CUSD",
      label: "Celo Dollar",
      image: cusdIcon,
    },
    {
      key: "DASH",
      label: "Dash Coin",
      image: dashIcon,
    },
    {
      key: "ETH",
      label: "Ethereum",
      image: ethereumIcon,
    },
    {
      key: "FBUSD",
      label: "FomoBUSD",
      image: "",
    },
    {
      key: "FCUSD",
      label: "Bitcoin",
      image: "",
    },
    {
      key: "FTRON_USDT",
      label: "Tron",
      image: "",
    },
    {
      key: "TBTC",
      label: "Bitcoin",
      image: "",
    },
    {
      key: "FUSD",
      label: "Fantom USD",
      image: fusdIcon,
    },
    {
      key: "TDASH",
      label: "Dash Coin",
      image: "",
    },
    {
      key: "TETH",
      label: "Bitcoin",
      image: "",
    },
    {
      key: "TRON_USDT",
      label: "Tron",
      image: tronIcon,
    },
    {
      key: "BUSD",
      label: "Binance USD",
      image: busdIcon,
    },
    {
      key: "NGN",
      label: "Naira",
      image: "",
    },
    {
      key: "USDT",
      label: "Tether",
      image: usdtIcon,
    },
    {
      key: "USD",
      label: "Dollar",
      image: "",
    },
  ];

  const [coinList, setCoinList] = useState([]);
  const [coinFilteredList, setCoinFilterList] = useState([]);

  const handleChange = event => {
    filteredCoin(event.target.value.trim().toLowerCase());
  }

  const getCoinList = async () => {
    const response = await (
      await fetch(`https://staging-biz.coinprofile.co/v3/currency/rate`)
    ).json();

    const finalCoinList = [];

    Object.keys(response.data.rates).filter((rateKey) => {
      const sourceCoinIndex = coins.findIndex(({ key }) => {
        return rateKey.includes(key);
      });

      if (sourceCoinIndex >= 0) {
        if (rateKey.split(coins[sourceCoinIndex].key)[0] == "") {
          const destinationCoinIndex = coins.findIndex(({ key }) => {
            return key == rateKey.split(coins[sourceCoinIndex].key)[1];
          });

          const exchange = {
            source: coins[sourceCoinIndex],
            destination: !!coins[destinationCoinIndex]
              ? coins[destinationCoinIndex]
              : coins[sourceCoinIndex],
            rate: response.data.rates[rateKey].rate,
          };
          finalCoinList.push(exchange);
        }
      }

    });

    setCoinList(finalCoinList);
    setCoinFilterList(finalCoinList);
  };

const filteredCoin = (searchKey) => {
  if(searchKey == ""){
    setCoinFilterList(coinList);
  }
  let searchCoin = coinList.filter(coin => {
    const coinKey = coin.source.key.toLowerCase();
    const coinLabel = coin.source.label.toLowerCase();
    return coinKey.includes(searchKey) || coinLabel.includes(searchKey)
  })
  setCoinFilterList(searchCoin)
}

  useEffect(() => {
    getCoinList();
  }, []);
  return (
    <div className="App">
      <Search handleChange={handleChange} />

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Coin List </TableCaption>
          <Thead>
            <Tr>
              <Th>Source</Th>
              <Th>Destination</Th>
              <Th isNumeric>Rates</Th>
            </Tr>
          </Thead>
          <Tbody>
            {coinFilteredList.map(({ source, rate, destination }) => {
              return (
                <Tr>
                <Td className="coin-name"> <img className="coin-img" src={source.image} alt="Icon" /> <span> {source.key}  <p className="coin-label">{source.label}</p> </span> </Td>
                <Td> {destination.key} </Td>
                <Td isNumeric> {rate}</Td>
              </Tr>
              )
            })}
           
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CoinTable;
