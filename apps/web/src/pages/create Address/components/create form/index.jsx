import { Box, Button, Flex, Grid, Input, Select, Text, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CreateUserAddress } from '../../services/index.js'
import { getCity, getProvinceWarehouse } from '../../../Admin dashboard/warehouse management/services/getWarehouse.js'
import toast from 'react-hot-toast'

function FormCreateAddress({ address, lat, lng }) {
  const [selectedCity, setSelectedCity] = useState('')
  const [citylist, setCityList] = useState([])
  const [provinceList, setProvinceList] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const navigate = useNavigate()
  const user = useSelector((state) => state.AuthReducer.user);

  useEffect(() => {
    if (address && address.city) {
      setSelectedProvince(address.city.provinceId)
      setSelectedCity(address.city.id)
    }

    const fetchProvinceData = async () => {
      try {
        const data = await getProvinceWarehouse()
        setProvinceList(data)
      } catch (error) {
        console.error('Error fetching province data:', error)
      }
    }
    fetchProvinceData()

    const fetchCityData = async () => {
      if (address?.city?.provinceId) {
        try {
          const cityData = await getCity(address.city.provinceId)
          setCityList(cityData)
        } catch (error) {
          console.error('Error fetching city data:', error)
        }
      }
    }
    fetchCityData()
  }, [address])

  const formik = useFormik({
    initialValues: {
      location: '',
      cityId: null,
      postalCode: '',
      name: '',
      phoneNumber:'',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await CreateUserAddress(
          user.id,
          values.location,
          values.cityId,
          values.name,
          values.phoneNumber,
          values.postalCode,
          lat,
          lng,
        )
        navigate(-1, { state: { warehouseCreated: true } })
        toast.success('Address successfully created')
      } catch (err) {
        toast.error('Fill form correctly')
        console.log(err.message)
      }
      resetForm({
        values: {
          location: '',
          cityId: null,
          postalCode: '',
          name: '',
          phoneNumber: '',
        },
      })
    },
  })
  let locationValue = '';
  if (address.address) {
    locationValue = '';
    if (address.address.road && address.address.road !== 'unnamed road') {
        locationValue += address.address.road;
      }
    if (address.address.village) {
      locationValue += (locationValue ? ', ' : '') + address.address.village;
    }
    if (address.address.municipality) {
      locationValue += (locationValue ? ', ' : '') + address.address.municipality;
    }
  }

  const postalCode = address.address.postcode || address.city.postal_code;

useEffect(() => {
    const fetchData = async () => {
        try {
            if (address) {
                if (locationValue) {
                    formik.setFieldValue('location', locationValue);
                }
                if (postalCode) {
                    formik.setFieldValue('postalCode', postalCode);
                }
                if (address.city && address.city.id) {
                    formik.setFieldValue('cityId', `${address.city.id}`);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again later.');
        }
    };

    fetchData();
}, [address, locationValue, postalCode, formik.setFieldValue]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid width={'100%'} gap={{base: '24px', md: '68px'}} gridTemplateColumns={{base: '1fr', md: '1fr 1fr', }}>
          <Box>
            <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              FullName
            </Text>
            <Input              name="name"              placeholder="Type Fullname here"              _placeholder={{ color: 'brand.grey350' }}              bg={'brand.grey100'}
              variant={'filled'}
              mb={'32px'}              value={formik.values.name}              onChange={formik.handleChange}            />
               <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              Phone Number
            </Text>
            <Input              name="phoneNumber"              placeholder="Phone number here"              _placeholder={{ color: 'brand.grey350' }}              bg={'brand.grey100'}
              variant={'filled'}
              mb={'32px'}              value={formik.values.phoneNumber}              onChange={formik.handleChange}            />            
          <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              Address Location
            </Text>
            <Textarea
              placeholder="Type Address location"              name="location"              _placeholder={{ color: 'brand.grey350' }}              bg={'brand.grey100'}
              variant={'filled'}              h={'210px'}              value={formik.values.location}              onChange={formik.handleChange}            />
          </Box>
        
          <Box>
            <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              Province
            </Text>
            <Select
              placeholder="Select a Province"              bg={'brand.grey100'}              variant={'filled'}              color={'brand.grey350'}              mb={'24px'}              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}            >
              {provinceList?.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </Select>
            <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              City
            </Text>
            <Select
              value={selectedCity}              placeholder="Select a City"              bg={'brand.grey100'}              color={'brand.grey350'}              variant={'filled'}
              mb={'24px'}              name="cityId"
              onChange={(e) => {
                setSelectedCity(e.target.value)
                formik.handleChange(e)
              }}
            >
              {citylist?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Select>
            <Text fontSize={'16px'} fontWeight={'700'} color={'brand.grey350'} mb={'8px'}>
              Postal Code
            </Text>
            <Input
              placeholder="Type a postal code"              _placeholder={{ color: 'brand.grey350' }}              bg={'brand.grey100'}              variant={'filled'}
              mb={'24px'}              name="postalCode"              value={formik.values.postalCode}              onChange={formik.handleChange}            />
          </Box>
        </Grid>
        <Flex justifyContent={'flex-end'} mt={'40px'} gap={'16px'}>
          <Button            width={'168px'}            padding={'12px 16px'}            bgColor={'white'}            color={'green'}            variant={'outline'}
            borderColor={'green'}            _hover={{ borderColor: '#f50f5a', color: '#f50f5a' }}            _active={{ opacity: '70%' }}
            onClick={() => navigate('/manage-address')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            width={'168px'}
            padding={'12px 16px'}
            bgColor={'green'}
            color={'white'}
            _hover={{ bg: '#f50f5a' }}
            _active={{ opacity: '70%' }}
          >
            Create
          </Button>
        </Flex>
      </form>
    </>
  )
}

export default FormCreateAddress