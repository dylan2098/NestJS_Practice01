import {
  IsNotEmpty,
  IsString,
  Length,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// custom validation
@ValidatorConstraint({ name: 'customText', async: false })
export class isUpperCase implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    console.log(args);
    // at here: we can call service like check user exists
    return text === text.toUpperCase();
  }
}

export class CreateUserDto {
  @Length(2, 255, { message: 'Please input first name at least 2 characters' })
  @IsNotEmpty()
  @IsString()
  @Validate(isUpperCase, { message: 'First name is uppercase' })
  firstName: string;

  @Length(2)
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
