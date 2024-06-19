'use client'
import React, { useEffect, useState } from 'react'
import CardCard from './components/CardCar'
import { Car } from './types'
import axios from 'axios'
import SelectComponent from './components/Select'
import { Checkbox, Pagination } from 'antd';
import Loading from './components/Loading'
import { useRouter } from 'next/navigation'

type TModels = {
  brand: string
  models: string[]
}

const HomePage = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [tariffs, setTariffs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedTariffs, setSelectedTariffs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://test.taxivoshod.ru/api/test/?w=catalog-filter');
        const { brands, models, tariffs } = response.data;
        setBrands(brands.values);
        setModels(models.values);
        setTariffs(tariffs);
      } catch (error) {
        console.error("Error fetching filters", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const updateURL = () => {
    const params = new URLSearchParams();
    if (selectedBrands) {
      params.append('brand', selectedBrands);
    }
    selectedModels.forEach(model => params.append('model', model));
    selectedTariffs.forEach(tariff => params.append('tariff', tariff));
    params.append('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    updateURL();
  }, [selectedBrands, selectedModels, selectedTariffs, page]);

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedBrands) {
          params.append('brand', selectedBrands);
        }
        selectedModels.forEach(model => params.append('model[]', model));
        selectedTariffs.forEach(tariff => params.append('tariff[]', tariff));
        params.append('page', page.toString());
        const response = await axios.get(`https://test.taxivoshod.ru/api/test/?w=catalog-cars&${params.toString()}`);
        setCars(response.data.list);
        console.log(response.data.pages);
      } catch (error) {
        console.error("Error fetching cars", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [selectedBrands, selectedModels, selectedTariffs, page]);

  const handleModelChange = (model) => {
    setSelectedModels((prevSelectedModels) => {
      if (prevSelectedModels.includes(model)) {
        return prevSelectedModels.filter((m) => m !== model);
      } else {
        return [...prevSelectedModels, model];
      }
    });
  };

  const handleTariffChange = (tariff) => {
    setSelectedTariffs((prevSelectedTariffs) => {
      if (prevSelectedTariffs.includes(tariff)) {
        return prevSelectedTariffs.filter((t) => t !== tariff);
      } else {
        return [...prevSelectedTariffs, tariff];
      }
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // If you need to handle brand changes as well
  const handleBrandChange = (e) => {
    const value = e.target.value;
    setSelectedBrands(value);
  };

  return (
    <section className='bg-white min-h-screen px-8 py-4'>

      <main className="container mx-auto p-4">
        <div className='m-4 flex-col justify-between gap-4 text-black'>
          <h3>БЫСТРАЯ АРЕНДА АВТОМОБИЛЕЙ</h3>
        </div>
        <div className='w-full flex justify-between gap-4'>
          <div className='w-[20%] p-4 flex-col justify-between gap-4'>
            <div className='border'></div>
            <div className='my-4'>
              <h3 className='text-black text-2xl my-2'>Марки</h3>
              {brands.map((brand, index) =>
                <Checkbox
                  key={index}
                  value={brand}
                  onChange={handleBrandChange}
                  checked={selectedBrands === brand}
                >
                  {brand}
                </Checkbox>
              )}
            </div>
            <div className='border'></div>
            <div className='my-4'>
              <h3 className='text-black text-2xl my-2'>Модели</h3>
              {models.map((brand, index) => (
                <div key={index}>
                  <p className='text-[#ff585d] text-lg'>{brand.brand}</p>
                  <div style={{ paddingLeft: '20px' }}>
                    {brand.models.map((model, index) => (
                      <Checkbox
                        key={index}
                        onChange={() => handleModelChange(model)}
                        checked={selectedModels.includes(model)}
                      >
                        {model}
                      </Checkbox>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className='border'></div>
          </div>
          {isLoading ? (
            <p className='text-black'>Loading...</p>
          ) : (
            <div className='w-[80%]'>
              {/* <div className='flex justify-start items-center gap-4 text-sm my-4 text-black'>
                {tariffs.map((tariff, index) => (
                  <p
                    key={index}
                    className={`px-4 py-2 border border-[#ff585d] rounded-lg ${selectedTariffs.includes(tariff) ? 'bg-[#ff585d] text-white' : ''}`}
                    onClick={() => handleTariffChange({ target: { options: [{ selected: !selectedTariffs.includes(tariff), value: tariff }] } })}
                  >
                    {tariff}
                  </p>
                ))}
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {cars.map((car, index) => (
                  <CardCard car={car} isLoading={isLoading} key={index} />
                ))}
              </div>
              <div className="flex justify-center my-4 text-black">
                <button className="mx-2 px-4 py-2 bg-gray-300 rounded" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                <p>{page}</p>
                <button className="mx-2 px-4 py-2 bg-gray-300 rounded" onClick={() => handlePageChange(page + 1)}>Next</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </section>
  );
}

export default HomePage

