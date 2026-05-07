import type { Car, NhtsaModel } from '../types/car';

const LUXURY_MAKES = ['Lamborghini', 'Ferrari', 'Porsche', 'Bugatti', 'Nissan', 'Tesla'];

const curatedInfo: Record<string, { image: string; price: number; description: string }> = {
  Lamborghini: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Geneva_MotorShow_2013_-_Lamborghini_Veneno_1.jpg',
    price: 499000,
    description: 'Raw power meets Italian craftsmanship in this iconic supercar.',
  },
  Ferrari: {
    image: 'https://media.wired.com/photos/5ceeed5b0bdd96c34c6174a3/master/w_1600%2Cc_limit/01_Ferrari_SF90_03.jpg',
    price: 524000,
    description: 'Hybrid hypercar that redefines the boundaries of speed and technology.',
  },
  Porsche: {
    image: 'https://images-porsche.imgix.net/-/media/6B2A3296BE1044869D8BD2FE8438A6C5_C04A2CE460B74DF1A33195993B4165A3_EX25W12IX0001-911-carrera-gts-front-desktop?w=999&q=85&auto=format',
    price: 207000,
    description: 'Timeless design with blistering performance and precision handling.',
  },
  Bugatti: {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPMDbNerfX5A-wvhrgdZ27vXC_vPrvH-R56Q&s',
    price: 2990000,
    description: 'The ultimate expression of luxury and velocity in perfect harmony.',
  },
  Nissan: {
    image: 'https://wieck-nissanao-production.s3.amazonaws.com/photos/0f1f7c57cbc0c093ecd008d5c8f973bd2c9c8bb5/preview-928x522.jpg',
    price: 220000,
    description: 'Japanese engineering excellence with race-bred DNA.',
  },
  Tesla: {
    image: 'https://topelectricsuv.com/wp-content/uploads/2025/11/Tesla-Roadster-2.0-front-three-quarters.jpg',
    price: 129000,
    description: 'Electric innovation meets ludicrous speed and cutting-edge technology.',
  },
};

const fallbackModels: Record<string, string[]> = {
  Lamborghini: ['Aventador', 'Urus'],
  Ferrari: ['SF90 Stradale', '296 GTB'],
  Porsche: ['911 Turbo S', 'Cayenne'],
  Bugatti: ['Chiron', 'Veyron'],
  Nissan: ['GT-R Nismo', 'Z'],
  Tesla: ['Model S Plaid', 'Model 3'],
};

async function fetchModelsForMake(make: string): Promise<NhtsaModel[]> {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${encodeURIComponent(make)}?format=json`
  );
  if (!res.ok) throw new Error(`Failed to fetch models for ${make}`);
  const data = await res.json();
  return data.Results || [];
}

export async function fetchCars(): Promise<Car[]> {
  const results = await Promise.allSettled(
    LUXURY_MAKES.map((make) => fetchModelsForMake(make))
  );

  const cars: Car[] = [];
  let id = 1;

  LUXURY_MAKES.forEach((make, index) => {
    const info = curatedInfo[make];
    const result = results[index];

    let models: string[];

    if (result.status === 'fulfilled' && result.value.length > 0) {
      models = result.value.slice(0, 2).map((m) => m.Model_Name);
    } else {
      models = fallbackModels[make] || [];
    }

    models.forEach((model) => {
      cars.push({
        id: id++,
        name: model,
        brand: make,
        image: info.image,
        price: info.price,
        description: info.description,
        year: 2025,
      });
    });
  });

  return cars;
}

export async function fetchCarById(id: number): Promise<Car | undefined> {
  const all = await fetchCars();
  return all.find((c) => c.id === id);
}
