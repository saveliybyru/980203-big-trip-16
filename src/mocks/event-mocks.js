import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { offers } from './offers-mocks.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const eventsType = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const cities = [
  'Valkla',
  'Laagna',
  'Rannakula',
  'Viimsi',
  'Laagri',
  'Rapla',
  'Viimsi',
  'Lavassaare',
  'Roosta',
  'Viljandi',
  'Laulasmaa',
  'Ruusma',
  'Vihterpalu',
  'Lilby',
  'Räpina',
  'Vihula',
  'Lihula',
  'Vyru',
  'Loksa',
  'Saku',
  'Vykhma',
  'Lohusuu',
  'Salme',
  'Värska',
  'Luunya',
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateTypeEvent = (events) => {
  const randomIndex = getRandomInteger(0, events.length - 1);
  return events[randomIndex];
};

const generateCity = (citiesList) => {
  const randomIndex = getRandomInteger(0, citiesList.length - 1);
  return cities[randomIndex];
};

const generateDescription = (descriptionsList) => {
  const descriptionCount = getRandomInteger(1, 5);
  let description = '';
  for (let i = 0; i < descriptionCount; i++) {
    const randomIndex = getRandomInteger(0, descriptionsList.length - 1);
    description += String(descriptionsList[randomIndex]);
  }
  return description;
};

const generatePhotos = () => {
  const photosCount = getRandomInteger(1, 8);
  const photos = [];
  for (let i = 0; i < photosCount; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

const generateDateTime = () => {
  const DAYGAP = 5;
  const dateGap = getRandomInteger(DAYGAP, DAYGAP*2);
  const HOURGAP = 5;
  const timeGap = getRandomInteger(HOURGAP, HOURGAP*2);
  const startTime = dayjs(dayjs().add(dateGap, 'd').toDate())
    .add(timeGap, 'h')
    .toDate();
  const endTime = dayjs(startTime).add(timeGap, 'h').toDate();
  const durationTime = dayjs.duration(dayjs(endTime).diff(dayjs(startTime))).format('D[D] HH[H] mm[M]');
  const time = [startTime, endTime, durationTime];
  return time;
};

const generateOffers = (offersList) => {
  const offersObject = {};
  offersList.forEach((typeOffers) => {
    offersObject[typeOffers.type] = typeOffers.offers;
  });
  return offersObject;
};

const generateEvent = () => {
  const eventType = generateTypeEvent(eventsType);
  const event = {
    id: nanoid(),
    type: eventType,
    city: generateCity(cities),
    price: getRandomInteger(100, 1000),
    offers: generateOffers(offers),
    description: generateDescription(descriptions),
    photo: generatePhotos(),
    timeStart: generateDateTime()[0],
    timeEnd: generateDateTime()[1],
    durationTime: generateDateTime()[2],
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
  return event;
};

export { generateEvent };
