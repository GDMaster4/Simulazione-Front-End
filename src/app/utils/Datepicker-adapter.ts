import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class DateAdapter extends NgbDateAdapter<string>
{
    fromModel(value: string | null): NgbDateStruct | null
    {
        if (value)
        {
            const date = value.split("-");
            return {
                day: parseInt(date[2], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[0], 10),
            };
        }
        return null;
    }

    toModel(date: NgbDateStruct | null): string | null {
        return date ? date.year + "-" + date.month + "-" + date.day : null;
    }
}

/**
* This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
*/
@Injectable({
    providedIn: 'root'
})
export class DateParserFormatter extends NgbDateParserFormatter
{
    parse(value: string): NgbDateStruct | null
    {
        if (value)
        {
            const date = value.split("-");
            return {
                day: parseInt(date[2], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[0], 10),
            };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        return date ? date.year + "-" + date.month + "-" + date.day : '';
    }
}