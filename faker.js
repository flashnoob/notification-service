import { nanoid } from "nanoid";

// Function to generate a random user object
export function createRandomUser() {
    return {
      userId: nanoid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  }