import { PersonDto } from './dto/person.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  async welcome(person: PersonDto): Promise<string> {
    let msg: string;
    if (person.year) {
      const current_year = new Date().getFullYear();
      console.log(`Welcome ${person.name} - your birthday is ${person.year}`);
      msg = `Welcome ${person.name} - your are ${
        current_year - person.year
      } years old!`;
    } else {
      console.log(`Welcome ${person.name} - your birthday is Undefined`);
      msg = `Welcome ${person.name} - your birthday is Undefined!!!`;
    }
    return msg;
  }
}
