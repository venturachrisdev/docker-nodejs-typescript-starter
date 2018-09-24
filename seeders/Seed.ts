import DatabaseConnection from '../src/application/core/data/DatabaseConnection';
import UserSeeder from './UserSeeder';

class Seed {

  async run() {
    await DatabaseConnection.connect(true);
    const userSeeder: UserSeeder = new UserSeeder();

    await userSeeder.init();
    await userSeeder.seed();
  }
}

new Seed().run();
