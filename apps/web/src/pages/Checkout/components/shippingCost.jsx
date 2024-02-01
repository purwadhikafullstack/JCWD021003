import {  Box,  Flex,  Icon,  Radio,  RadioGroup,  Select,  Text,} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getShippingCost } from '../services/ShippingCostApi';
import { CheckIcon } from '@heroicons/react/24/outline';
import currencyFormatter from 'currency-formatter';
// import './style.css';

function ShippingCost({
  nearestWarehouse,
  selectedAddress,
  updateShippingCost,
}) {
  const [shippingCost, setShippingCost] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState('');
  const [courierService, setCourierService] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [costResult, setCostResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (nearestWarehouse && selectedAddress && selectedCourier) {
        try {
          const shippingCostData = await getShippingCost(
            nearestWarehouse,
            selectedAddress?.cityId,
            1000,
            selectedCourier,
          );
          console.log('shipping', shippingCostData);
          setShippingCost(shippingCostData.rajaongkir.results);
        } catch (err) {
          console.error(err.message);
        }
      }
    };
    fetchData();
  }, [nearestWarehouse, selectedAddress, selectedCourier]);

  useEffect(() => {
    const courierCosts = shippingCost?.find(
      (result) => result.code === selectedCourier,
    )?.costs;
    setCourierService(courierCosts || []);
  }, [selectedCourier, shippingCost]);

  useEffect(() => {
    const cost = courierService.find((cost) => cost.service === selectedService)
      ?.cost[0].value;
    setCostResult(cost);
    updateShippingCost(cost);
    console.log(cost);
  }, [selectedService, courierService]);

  useEffect(() => {
    const selectedCost = courierService.find(
      (cost) => cost.service === selectedService,
    )?.cost[0].value;

    if (selectedCost !== undefined) {
      setCostResult(selectedCost);
      updateShippingCost(selectedCost);
    }

    console.log(selectedCost);
  }, [selectedService, courierService, updateShippingCost]);

  console.log('cek', courierService);
  return (
    <>
      <Flex
        borderRadius={'12px'}
        border={'1px solid #818181'}
        bg={'white'}
        padding={'24px'}
        mt={'10px'}
        flexDir={'column'}
        w={'100%'}
      >
        <Select
          w={'250px'}
          border={'1px solid #818181'}
          borderRadius={'10px'}
          padding={'10px'}
          name="courier"
          variant={'flushed'}
          fontSize={'18px'}
          fontWeight={'700'}
          mb={'24px'}
          value={selectedCourier}
          onChange={(e) => setSelectedCourier(e.target.value)}
          initialValue={''}
          size={'md'}
        >
          <option value="" disabled> Select Courier </option>
          <option value="jne">JNE</option>
          <option value="tiki">TIKI</option>
          <option value="pos">POS INDONESIA</option>
        </Select>
        <RadioGroup onChange={setSelectedService} value={selectedService}>
          {courierService.length > 0 && (
            <Text mb={'15px'} fontWeight={'700'}>
              Choose Service
            </Text>
          )}
          {courierService.map((result, index) => (
            <Box
              key={result.service + index}
              borderRadius={'10px'}
              mb={'15px'}
              p={'0 10px 10px'}
              border={
                selectedService === result.service ? 'none' : '1px solid green'
              }
              bg={selectedService === result.service ? 'green' : 'white'}
            >
              <Radio
                value={result.service}
                display={'flex'}
                flexDir={'column'}
                opacity={'0'}
                alignItems={'flex-start'}
              >
                <Flex gap={'24px'} align={'center'}>
                  <Box minW={'250px'}>
                    <Text
                      color={
                        selectedService === result.service ? 'white' : 'green'
                      }
                      fontSize={'18px'}
                      fontWeight={'700'}
                    >
                      {result.service}
                    </Text>
                    <Text
                      color={
                        selectedService === result.service ? 'white' : 'green'
                      }
                    >
                      {result.description}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize={'18px'}
                      fontWeight={'700'}
                      color={
                        selectedService === result.service ? 'white' : 'green'
                      }
                    >
                      {currencyFormatter.format(result.cost[0].value, {
                        code: 'IDR',
                      })}
                    </Text>
                    <Text
                      color={
                        selectedService === result.service ? 'white' : 'green'
                      }
                    >
                      Estimasi tiba {result.cost[0].etd} hari
                    </Text>
                  </Box>
                  <Icon
                    as={CheckIcon}
                    boxSize={'24px'}
                    color={'white'}
                    display={
                      selectedService === result.service ? 'block' : 'none'
                    }
                  />
                </Flex>
              </Radio>
            </Box>
          ))}
        </RadioGroup>

        <Box mt="20px">
          <Text fontWeight={700} display={costResult > 0 ? 'block' : 'none'}>
            Cost: {currencyFormatter.format(costResult, { code: 'IDR' })}
          </Text>
        </Box>
      </Flex>
    </>
  );
}

export default ShippingCost;
