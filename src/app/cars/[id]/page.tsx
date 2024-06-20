'use client'
import { formattedNumber } from "@/app/libs";
import { CarDetail } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';


type TProps = {
    id: number;
};

const GetCarDetails = async (id: number): Promise<CarDetail> => {
    const response = await fetch(
        `https://test.taxivoshod.ru/api/test/?w=catalog-car&id=${id}`
    );

    const responseJson = await response.json();

    return responseJson;
};

const page = async ({ params }: { params: { id: number } }) => {
    const carDetails = await GetCarDetails(params.id);
    const data = carDetails as CarDetail;
    const car = data.item;

    //606569

    return (
        <div className="bg-white text-black min-h-screen w-full flex justify-between">
            <div className="w-1/2 flex-col justify-start items-center px-4">
                <Link href="/">
                    <div className="flex justify-start items-center gap-4 m-4 cursor-pointer">
                        <p>←</p>
                        <p className="text-[#606569]">ВЕРНУТЬСЯ В КАТАЛОГ</p>
                    </div>
                </Link>
                <div className="flex justify-between gap-2">
                    <div className="w-48 h-58 flex flex-col justify-start gap-2">
                        {car?.images?.map((image, index) => {
                            return (
                                <Image
                                    key={index}
                                    src={image.image}
                                    width={500}
                                    height={500}
                                    alt={`${car.brand} ${car.model}`}
                                    className="rounded-lg object-cover"
                                />
                            );
                        })}
                    </div>
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                        {car?.images?.map((image, index) => (
                            <SwiperSlide>
                                <Image
                                    key={index}
                                    src={image.image}
                                    width={600}
                                    height={600}
                                    alt={`${car.brand} ${car.model}`}
                                    className="rounded-lg object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="w-1/2 flex-col justify-center items-center px-4 py-8">
                <div className="flex justify-start items-center gap-4 m-8">
                    <p className="text-[#484848] font-semibold text-4xl">{car?.brand}</p>{" "}
                    <p className="text-[#ff585d] font-semibold text-4xl">{car?.model}</p>
                </div>
                <div className="bg-[#ff585d] w-[10%] p-1 rounded-lg m-8">
                    <p className="text-white text-center">{car.tarif}</p>
                </div>
                <div className="flex-col justify-center items-center gap-2 m-8">
                    <p className="text-[#606569] font-semibold text-2xl">Стоймость:</p>
                    <p className="text-[#484848] font-semibold text-4xl">
                        {formattedNumber(car?.price)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;
