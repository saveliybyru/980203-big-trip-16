import dayjs from 'dayjs';


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const generateTypePoint = () => {
  const typesPoint=[
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
  const randomIndex = getRandomInteger(0, typesPoint.length - 1);

  return typesPoint[randomIndex];
};

const generateCity = () => {
  const city = [
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
  const randomIndex = getRandomInteger(0, city.length - 1);

  return city[randomIndex];
};

const generateDescription = () => {
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
  const DESCRIPTION_COUNT = getRandomInteger(1, 5);
  let description = '';

  for (let i = 0; i < DESCRIPTION_COUNT; i++) {

    const randomIndex = getRandomInteger(0, descriptions.length - 1);

    description = description + String(descriptions[randomIndex]);
  }


  return description;
};

const generatePhotos = () => {
  const PHOTO_COUNT = getRandomInteger(1, 8);
  const photos = [];
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

const generateDateTime = () => {

  const DAYGAP = 5;
  const dateGap = getRandomInteger(-DAYGAP, DAYGAP);
  const gapToday = dayjs().add(dateGap, 'd').toDate();
  const date = dayjs(gapToday).format('MMM D');

  const MINUTEGAP = 38;
  const timeGap = getRandomInteger(-MINUTEGAP, MINUTEGAP);
  const startTimeUnformat = dayjs(gapToday).add(timeGap, 'm').toDate();
  const startTime = dayjs(startTimeUnformat).format('HH:mm');
  const endTimeUnformat = dayjs(startTimeUnformat).add(timeGap, 'm');
  const endTime = dayjs(endTimeUnformat).format('HH:mm');
  const timePeriod = 10;

  const time = [date, startTime, endTime, timePeriod];

  return time;
};


const generatePoint = () => {
  const point = {
    date: generateDateTime()[0],
    continueTime: generateDateTime()[3],
    type: generateTypePoint(),
    city: generateCity(),
    price: getRandomInteger(100, 1000),
    options:'2',
    description: generateDescription(),
    photo: generatePhotos(),
    timeStart: generateDateTime()[1],
    timeEnd: generateDateTime()[2],
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
  return point;
};

export{generatePoint};
