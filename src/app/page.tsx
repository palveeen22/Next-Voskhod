'use client'
import React, { useEffect, useState } from 'react'
import CardCard from './components/CardCar'
import { Car } from './types'
import axios from 'axios'
import SelectComponent from './components/Select'

const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [tariffs, setTariffs] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
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
        setModels(models);
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
        const brandParams = selectedBrands.map(brand => `brand[]=${brand}`).join('&');
        const modelParams = selectedModels.map(model => `model[]=${model}`).join('&');
        const tariffParams = selectedTariffs.map(tariff => `tariff[]=${tariff}`).join('&');
        const response = await axios.get(`https://test.taxivoshod.ru/api/test/?w=catalog-cars&page=${page}&${brandParams}&${modelParams}&${tariffParams}`);
        console.log(tariffParams);
        setCars(response.data.list);
      } catch (error) {
        console.error("Error fetching cars", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [selectedBrands, selectedModels, selectedTariffs, page]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedBrands(selected);
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

  console.log(cars);
  // console.log(brands.values, "<<<");
  // console.log(models.values, "<<<");
  // console.log(brands?.values, "<<<");


  return (
    <section className='bg-white min-h-screen px-8 py-4'>
      {isLoading ? (
        <div className='flex justify-center items-center min-h-screen'>
          <p className='text-black '>Loading...</p>
        </div>
      ) : (
        <main className="container mx-auto p-4">
          <div className='m-4 flex-col justify-between gap-4 text-black'>
            <h3>БЫСТРАЯ АРЕНДА АВТОМОБИЛЕЙ</h3>
            {/* <div className='flex justify-start items-center gap-4 text-sm'>
              <p>Все</p>
              <p>Комфорт</p>
              <p>Комфорт+</p>
            </div> */}
            <div className='flex justify-end items-center gap-4 text-sm'>
              <SelectComponent placeholder="Brand" />
              <SelectComponent placeholder="Model" />
              <SelectComponent placeholder="Tarif" />

            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cars.map(car => (
              <CardCard car={car} isLoading={isLoading} />
            ))}
          </div>
          <div className="flex justify-center my-4 text-black">
            <button className="mx-2 px-4 py-2 bg-gray-300 rounded" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
            <p>{page}</p>
            <button className="mx-2 px-4 py-2 bg-gray-300 rounded" onClick={() => handlePageChange(page + 1)}>Next</button>
          </div>
        </main>
      )}
    </section>
  );
}

export default HomePage
