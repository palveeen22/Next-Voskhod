'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Car {
    id: number;
    brand: string;
    model: string;
    registration_number: string;
    price: number;
    tariff: string;
    image: string;
}

const Home = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [tariffs, setTariffs] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [selectedTariffs, setSelectedTariffs] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    const router = useRouter();

    useEffect(() => {
        axios.get('https://test.taxivoshod.ru/api/test/?w=catalog-filter').then(response => {
            const { brands, models, tariffs } = response.data;
            setBrands(brands);
            setModels(models);
            setTariffs(tariffs);
        });
    }, []);

    useEffect(() => {
        const fetchCars = async () => {
            const brandParams = selectedBrands.map(b => `brand[]=${b}`).join('&');
            const modelParams = selectedModels.map(m => `model[]=${m}`).join('&');
            const tariffParams = selectedTariffs.map(t => `tariff[]=${t}`).join('&');
            const response = await axios.get(`https://test.taxivoshod.ru/api/test/?w=catalog-cars&page=${page}&${brandParams}&${modelParams}&${tariffParams}`);
            setCars(response.data);
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

    return (
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 my-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Brands</label>
                    <select multiple className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleBrandChange}>
                        {brands.map((brand, index) => (
                            <option key={index} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Models</label>
                    <select multiple className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleModelChange}>
                        {models.filter(model => selectedBrands.includes(model)).map((model, index) => (
                            <option key={index} value={model}>{model}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Tariffs</label>
                    <select multiple className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleTariffChange}>
                        {tariffs.map((tariff, index) => (
                            <option key={index} value={tariff}>{tariff}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cars.map(car => (
                    <div key={car.id} className="border rounded-lg shadow-sm">
                        <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h2 className="text-lg font-bold">{car.brand} {car.model}</h2>
                            <p>Registration Number: {car.registration_number}</p>
                            <p>Price: {car.price}</p>
                            <p>Tariff: {car.tariff}</p>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => router.push(`/car/${car.id}`)}>View Details</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-4">
                <button className="mx-2 px-4 py-2 bg-gray-300 rounded" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                <button className="mx-2 px-4 py-2 bg-gray-300 rounded" onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default Home;
