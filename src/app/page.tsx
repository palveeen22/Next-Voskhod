'use client'
import React, { useEffect, useState } from 'react';
import CardCard from './components/CardCar';
import { Car, TModel, Tariff } from './types';
import axios from 'axios';
import { Checkbox } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';



const HomePage: React.FC = () => {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<TModel[]>([]);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTariffs, setSelectedTariffs] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const searchQuery = useSearchParams()
  const [isReady, setIsReady] = useState(false)


  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://test.taxivoshod.ru/api/test/?w=catalog-filter');
        const { brands, models, tariffs } = response.data;
        setBrands(brands.values);
        setModels(models.values);
        setTariffs(Object.entries(tariffs.values).map(([id, name]) => ({ id, name })));
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
    const pageParams = searchQuery.get("page")
    console.log(pageParams, "params")
    if (selectedBrands.length > 0) {
      selectedBrands.forEach(brand => params.append('brand', brand));
    }
    if (selectedModels.length > 0) {
      selectedModels.forEach(model => params.append('model', model));
    }
    if (selectedTariffs.length > 0) {
      selectedTariffs.forEach(tariff => params.append('tariff', tariff));
    }
    params.append('page', page.toString());
    if (isReady) {
      router.push(`?${params.toString()}`, { scroll: false });

    }
    setIsReady(true)
  };

  const consumeParams = () => {
    const pageParams = parseInt(searchQuery.get("page")!!)
    const brandParams = searchQuery.getAll("brand")
    const modelParams = searchQuery.getAll("model")

    setSelectedBrands(brandParams)
    setSelectedModels(modelParams)
  }

  useEffect(() => {
    consumeParams();
  }, []);


  useEffect(() => {
    updateURL();
  }, [selectedBrands, selectedModels, selectedTariffs, page]);

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedBrands.length > 0) {
          selectedBrands.forEach(brand => params.append('brand[]', brand));
        }
        if (selectedModels.length > 0) {
          selectedModels.forEach(model => params.append('model[]', model));
        }
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

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter((b) => b !== brand);
      } else {
        return [...prevSelectedBrands, brand];
      }
    });
  };

  const handleModelChange = (model: string) => {
    setSelectedModels((prevSelectedModels) => {
      if (prevSelectedModels.includes(model)) {
        return prevSelectedModels.filter((m) => m !== model);
      } else {
        return [...prevSelectedModels, model];
      }
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className='bg-white min-h-screen px-8 py-4'>
      <main className="container mx-auto p-4">
        <div className='m-4 flex-col justify-between gap-4 text-black'>
          <div className='flex justify-between items-center'>
            <h3>БЫСТРАЯ АРЕНДА АВТОМОБИЛЕЙ</h3>
            <div className="flex justify-center items-center text-black">
              <button className="mx-2 px-4  bg-gray-300 rounded" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>←</button>
              <p>{page}</p>
              <button className="mx-2 px-4  bg-gray-300 rounded" onClick={() => handlePageChange(page + 1)}>→</button>
            </div>
          </div>
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
                  onChange={() => handleBrandChange(brand)}
                  checked={selectedBrands.includes(brand)}
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
            <div className='flex justify-center items-center w-full h-full'>
              <p className='text-black'>Loading...</p>
            </div>
          ) : (
            <div className='w-[80%]'>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {cars.map((car, index) => (
                  <CardCard car={car} isLoading={isLoading} key={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default HomePage;
