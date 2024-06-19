import React from 'react';
import { Car } from '../types';

type TProps = {
    car: Car;
    isLoading: boolean;
};

const CardCar = ({ car, isLoading }: TProps) => {
    return (
        <div key={car.id} className="border rounded-lg shadow-sm text-black">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <img
                        src={car.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-bold">{car.brand} {car.model}</h2>
                        <p>Registration Number: {car.registration_number}</p>
                        <p>Price: {car.price}</p>
                        <p>Tariff: {car.tarif}</p>
                        {/* <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => router.push(`/car/${car.id}`)}>View Details</button> */}
                    </div>
                </>
            )}
        </div>
    );
};

export default CardCar;
