import React from 'react';
import { Car } from '../types';
import Link from 'next/link';
import { formattedNumber } from '../libs';

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
                        {/* <p>{car.tarif}</p> */}
                        <h2 className="text-lg font-bold">{car.brand} {car.model}</h2>
                        <p>{car.number}</p>
                        <p>{formattedNumber(car.price)}</p>
                        {/* <p>{car.tarif}</p> */}
                        <Link href={`/cars/${car?.id}`}>
                            <button className="mt-4 bg-[#7362BC] text-white px-4 py-2 rounded">View Details</button>

                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CardCar;
