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
    if (typeof text !== 'string') {
      return false;
    }

    // at here: we can call service like check user exists
    return text === text?.toUpperCase();
  }
}

export class CreateUserDto {
  @Validate(isUpperCase, { message: 'First name is uppercase' })
  @Length(2, 255, { message: 'Please input first name at least 2 characters' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Length(2)
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
