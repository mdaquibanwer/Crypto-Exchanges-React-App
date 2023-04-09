import { Box, Container, HStack, Image, Radio, RadioGroup, Stat, StatLabel, StatNumber, StatHelpText, Text, VStack, StatArrow, Badge, Progress } from '@chakra-ui/react';
import React, {useState,useEffect} from 'react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '..';
import ErrorComponent from './ErrorComponent';

const CoinDetails = () => {
  
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$";

  
    

  const params = useParams();
  
  useEffect(() => {
    const fetchCoin = async ()=>{
      try {
        const {data} = await axios.get(`${server}/coins/${params.id}`);
        setCoin(data);
        console.log(data)
        setLoading(false)
      } catch (error) {
        setError(true);
        setLoading(false)
      }
    }
    fetchCoin();
  }, [params.id])

  if(error) return(
    < ErrorComponent message={"Error while fetching coins"}/>
  )
  
  return (
    <Container maxW={"container.xl"}>
      { 
        loading ? < Loader /> : <>
          <RadioGroup value={currency} onChange={setCurrency} p={"4"}>
            <HStack spacing={"4"} justifyContent={"flex-end"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"eur"}>EURO</Radio>
              <Radio value={"usd"}>USD</Radio>
            </HStack>
          </RadioGroup>
          <VStack p={"16"} spacing={"4"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.8"}>Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}</Text>
            <Image src={coin.image.large} h={"16"} w={"16"} objectFit={"contain"} />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.market_cap_change_percentage_24h > 0 ? "increase" : "decrease"} />
                {coin.market_data.market_cap_change_percentage_24h}
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>{`#${coin.market_data.market_cap_rank}`}</Badge>
            <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />
            <Box w={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply}/>
              <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
              <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
              <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
              <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
            </Box>
          </VStack>
        </>
      }
    </Container>
  )
}

const Item = ({title,value})=>(
  <HStack w={"full"} my={"4"} justifyContent={"space-between"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({high,low})=>(
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"}/>
    <HStack w={"full"} justifyContent={"space-between"}>
      <Badge children={low} colorScheme={"red"}/>
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"}/>
    </HStack>
  </VStack>
)

export default CoinDetails;