import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      email: "richard@dognosis.tech",
    },
    update: {},
    create: {
      name: "Richard",
      email: "richard@dognosis.tech",
    },
  });

  await prisma.user.upsert({
    where: {
      email: "itamar@dognosis.tech",
    },
    update: {},
    create: {
      name: "Itamar",
      email: "itamar@dognosis.tech",
    },
  });

  const dogs = [
    {
      name: "Whiskey",
      breed: "Beagle",
      sex: "Female",
      training_start: new Date("March-2024").toISOString(),
      birthday: null,
      last_heat: new Date("May-2024").toISOString(),
    },
    {
      name: "Billi",
      breed: "Beagle",
      sex: "Female",
      training_start: new Date("March-2024").toISOString(),
      birthday: null,
      last_heat: null,
    },
    {
      name: "Cheetah",
      breed: "Beagle",
      sex: "Female",
      training_start: new Date("March-2024").toISOString(),
      birthday: null,
      last_heat: null,
    },
    {
      name: "Iggy",
      breed: "Beagle",
      sex: "Female",
      training_start: new Date("March-2024").toISOString(),
      birthday: null,
      last_heat: new Date("June-2024").toISOString(),
    },
    {
      name: "Rose",
      breed: "Beagle",
      sex: "Female",
      training_start: new Date("March-2024").toISOString(),
      birthday: null,
      last_heat: new Date("May-2024").toISOString(),
    },
    {
      name: "Snow",
      breed: "Beagle",
      sex: "Female",
      training_start: new Date("April-2024").toISOString(),
      birthday: null,
      last_heat: new Date("May-2024").toISOString(),
    },
    {
      name: "Bane",
      breed: "Dutch Shepherd",
      sex: "Male",
      training_start: new Date("April-2024").toISOString(),
      birthday: new Date("Jan 1").toISOString(),
      last_heat: null,
    },
    {
      name: "Joker",
      breed: "Dutch Shepherd",
      sex: "Male",
      training_start: new Date("April-2024").toISOString(),
      birthday: new Date("Jan 1").toISOString(),
      last_heat: null,
    },
    {
      name: "Jessie",
      breed: "Labrador",
      sex: "Female",
      training_start: new Date("April-2024").toISOString(),
      birthday: null,
      last_heat: null,
    },
    {
      name: "Chloe",
      breed: "Labrador",
      sex: "Female",
      training_start: new Date("April-2024").toISOString(),
      birthday: null,
      last_heat: null,
    },
  ];

  const dogPromises: Promise<any>[] = [];

  for (let index = 0; index < dogs.length; index++) {
    const dog = dogs[index];

    const dogPromise = prisma.dog.upsert({
      where: {
        name: dog.name,
      },
      create: dog,
      update: {
        training_start: dog.training_start,
        birthday: dog.birthday,
        last_heat: dog.last_heat,
      },
    });

    dogPromises.push(dogPromise);
  }

  await Promise.all(dogPromises);

  console.log("DB Seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
