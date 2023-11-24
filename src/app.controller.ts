/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Post, Render, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { registrationDto } from './registration.dto';
import { User } from './user';
import { Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const users: User[] = [new User('admin@example.com', '123456789', 25)];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  @Get('register')
  @Render('registerForm')
  registerForm() {
    return { errors: [] };
  }

  @Post('register')
  @HttpCode(200)
  @Render('registerForm')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(@Body() registration: registrationDto, @Res() res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const errors: string[] = [];
    if (!registration.email.includes('@')) {
      errors.push('Az email cím formátuma nem megfelelő!');
    }
    if (
      registration.password.length < 8 ||
      registration.password_again.length < 8
    ) {
      errors.push('A jelszó legalább 8 karakter legyen!');
    }
    if (registration.password !== registration.password_again) {
      errors.push('A két jelszó nem egyezik!');
    }
    const age = parseInt(registration.age);
    if (age < 18 || isNaN(age)) {
      errors.push('Az életkornak legalább 18-nál nagyobb számnak kell lennie!');
    }
    if (errors.length > 0) {
      return { errors };
    } else {
      users.push(new User(registration.email, registration.password, age));
      console.log(users);
      res.redirect('/');
    }
  }
}
