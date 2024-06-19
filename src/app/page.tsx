'use client'
import React, { useEffect, useState } from 'react'
import CardCard from './components/CardCar'
import { Car } from './types'
import axios from 'axios'
import SelectComponent from './components/Select'
import { Checkbox, Pagination } from 'antd';
import Loading from './components/Loading'

const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [tariffs, setTariffs] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string>();
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTariffs, setSelectedTariffs] = useState<string[]>([]);
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
      } catch (error) {
        console.error("Error fetching cars", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [selectedBrands, selectedModels, selectedTariffs, page]);

  const handleBrandChange = (value: string) => {
    setSelectedBrands(value);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedModels(selected);
  };

  const handleTariffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedTariffs(selected);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className='bg-white min-h-screen px-8 py-4'>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="container mx-auto p-4">
          <div className='m-4 flex-col justify-between gap-4 text-black'>
            <h3>БЫСТРАЯ АРЕНДА АВТОМОБИЛЕЙ</h3>
          </div>
          <div className='w-full flex justify-between gap-4'>
            <div className='w-[20%] p-4 flex-col justify-between gap-4'>
              <div className='border'></div>
              <h3 className='text-black'>Марки</h3>
              {brands.map(brand =>
                <Checkbox>{brand}</Checkbox>
              )}
              <div className='border'></div>
              <h3 className='text-black'>Модели</h3>
              <div className='border'></div>
            </div>
            <div className='w-[80%]'>
              {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cars.map(car => (
              <CardCard car={car} isLoading={isLoading} />
            ))}
          </div>
          <div className="flex justify-center my-4 text-black">
            <button className="mx-2 px-4 py-2 bg-gray-300 rounded" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
            <p>{page}</p>
            <button className="mx-2 px-4 py-2 bg-gray-300 rounded" onClick={() => handlePageChange(page + 1)}>Next</button>
          </div> */}
              <div className='flex justify-start items-center gap-4 text-sm my-4 text-black'>
                <p className='px-4 py-2 border border-[#ff585d] rounded-lg'>Все</p>
                <p className='px-4 py-2 border border-[#ff585d] rounded-lg'>Комфорт</p>
                <p className='px-4 py-2 border border-[#ff585d] rounded-lg'>Комфорт+</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {cars.map(car => (
                  <CardCard car={car} isLoading={isLoading} />
                ))}
              </div>
              <Pagination defaultCurrent={page} total={page} />
            </div>

          </div>
        </main>
      )
      }
    </section >
  );
}

export default HomePage

