import { AbstractControl, ValidationErrors } from "@angular/forms";

export function usernameValidator(control: AbstractControl): ValidationErrors | null {
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!usernameRegex.test(control.value)) {
        return { invalidUsername: true };
    }
    return null;
}

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/;
    if (!passwordRegex.test(control.value)) {
        return { invalidPassword: true };
    }
    return null;
}